"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { AuthLoginValues, loginSchema } from "../schema/sch-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useOutletStore } from "@/store/useOutletStore";

export default function FrmLogin() {
  const router = useRouter();
  const form = useForm<AuthLoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuthData = useOutletStore((state) => state.setAuthData);

  const onSubmit = async (data: AuthLoginValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        toast.error(result.error);
        setError(result.error);
      } else {
        // Get the session data which contains the outlet_id_active
        const sessionResponse = await fetch("/api/auth/session");
        const sessionData = await sessionResponse.json();

        if (sessionData?.data?.outlet_id_active) {
          // Update the Zustand store with the outlet_id_active
          setAuthData({
            outlet_id_active: sessionData.data.outlet_id_active.toString(),
          });
        }

        toast.success("Login successful");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="relative">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="pr-12">{error}</AlertDescription>

              {/* Clear error button */}
              <Button
                type="button"
                variant="neutral"
                size="sm"
                className="absolute right-2 top-2 h-6 w-6 p-0"
                onClick={() => setError(null)}
              >
                <span className="sr-only">Tutup</span>×
              </Button>
            </Alert>
          )}

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password"
                        className="pl-10 pr-10"
                        {...field}
                        disabled={isLoading}
                        required
                        autoComplete="current-password"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="noShadow"
                              size={"icon"}
                              className="absolute right-0 top-0 h-full px-3 py-2"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 " />
                              ) : (
                                <Eye className="h-4 w-4 " />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {showPassword
                                ? "Sembunyikan password"
                                : "Tampilkan password"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              Lupa password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Memproses...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
