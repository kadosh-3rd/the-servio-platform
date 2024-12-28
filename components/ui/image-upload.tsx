"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  folder?: string;
}

export function ImageUpload({
  onUpload,
  defaultImage,
  className = "",
  aspectRatio = "square",
  folder = "restaurant-images",
}: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(defaultImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const handleUpload = (result: any) => {
    setIsUploading(false);
    setImage(result.info.secure_url);
    onUpload(result.info.secure_url);
  };

  return (
    <div
      className={`relative border rounded-lg overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
      style={{ contain: "paint" }}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt="Uploaded image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <CldUploadWidget
              uploadPreset="servio_preset"
              onUpload={handleUpload}
              options={{
                maxFiles: 1,
                resourceType: "image",
                folder: folder,
                styles: {
                  modal: {
                    zIndex: 100000
                  }
                }
              }}
              onOpen={() => setIsUploading(true)}
              onClose={() => setIsUploading(false)}
            >
              {({ open }) => (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => {
                    setIsUploading(true);
                    open();
                  }}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    "Change Image"
                  )}
                </Button>
              )}
            </CldUploadWidget>
          </div>
        </>
      ) : (
        <CldUploadWidget
          uploadPreset="servio_preset"
          onUpload={handleUpload}
          options={{
            maxFiles: 1,
            resourceType: "image",
            folder: folder,
            styles: {
              modal: {
                zIndex: 100000
              }
            }
          }}
          onOpen={() => setIsUploading(true)}
          onClose={() => setIsUploading(false)}
        >
          {({ open }) => (
            <div
              onClick={() => {
                setIsUploading(true);
                open();
              }}
              className="flex flex-col items-center justify-center w-full h-full bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
            >
              {isUploading ? (
                <Icons.spinner className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Icons.upload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Click to upload image</span>
                </>
              )}
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
