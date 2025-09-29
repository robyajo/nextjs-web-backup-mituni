"use client";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";

interface FileUploadWithPreviewProps {
  label?: string;
  value: File | null;
  previewUrl?: string;
  onChange: (file: File | null, url: string) => void;
  accept?: string;
  disabled?: boolean;
  id?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

export default function FileUploadWithPreview({
  label = "Upload File",
  value,
  previewUrl,
  onChange,
  accept = "image/*",
  disabled = false,
  id = "file-upload",
  width = 64,
  height = 64,
  placeholder = "Upload File",
}: FileUploadWithPreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const url = file ? URL.createObjectURL(file) : "";
    onChange(file, url);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preview on the left */}
      <div className="flex flex-col items-center gap-2">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={width}
            height={height}
            className="rounded-lg object-cover border"
          />
        ) : (
          <div
            className="flex items-center justify-center bg-muted border rounded-lg"
            style={{ width, height }}
          >
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        {/* Cancel/remove button */}
        {value && (
          <Button
            type="button"
            variant="reverse"
            size="sm"
            className="mt-1"
            onClick={() => onChange(null, "")}
            disabled={disabled}
          >
            Hapus
          </Button>
        )}
      </div>

      {/* Upload button on the right */}
      <div className="flex-1">
        <Input
          id={id}
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        <Button
          type="button"
          variant="reverse"
          onClick={() => inputRef.current?.click()}
          className="w-full"
          disabled={disabled}
        >
          <Upload className="w-4 h-4 mr-2" />
          {value ? value.name : placeholder}
        </Button>
      </div>
    </div>
  );
}
