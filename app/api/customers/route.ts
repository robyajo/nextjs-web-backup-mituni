import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import axios from "axios";
import { authOptions } from "../auth/[...nextauth]/options";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Dapatkan session dari server
    const session = await getServerSession(authOptions);

    // Validasi session
    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized - No valid session" },
        { status: 401 }
      );
    }

    // Parse body request
    const body = await request.json();
    const { branch_id } = body;

    // Validasi branch_id
    if (!branch_id) {
      return NextResponse.json(
        { error: "branch_id is required" },
        { status: 400 }
      );
    }

    // Call external API
    const response = await axios.post(
      `${API_URL}/api/customers`,
      {
        branch_id,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-mituni-key": MITUNI_API_KEY,
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    // Return response
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer transactions:", error);

    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || error.message;

      return NextResponse.json({ error: message }, { status });
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
