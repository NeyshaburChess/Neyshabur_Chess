"use client";
 
import { useRef, useState } from "react";
 
type Props = {
  onUpload: (file: File) => Promise<void>;
};
 
export default function FileDropzone({
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
 
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
 
 
  async function handleFile(file: File) {
    setUploading(true);
 
    try {
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  }
 
 
  function onDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();
 
    setDragging(false);
 
    const file = e.dataTransfer.files?.[0];
 
    if (file) {
      handleFile(file);
    }
  }
 
 
  function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
 
    if (file) {
      handleFile(file);
    }
  }
 
 
  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
 
        onDragLeave={() =>
          setDragging(false)
        }
 
        onDrop={onDrop}
 
        onClick={() =>
          inputRef.current?.click()
        }
 
        className={`
          cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition
          ${
            dragging
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500"
          }
        `}
      >
 
        {uploading ? (
          <div className="space-y-2">
            <p className="font-bold">
              در حال آماده‌سازی فایل...
            </p>
          </div>
 
        ) : (
 
          <div className="space-y-3">
 
            <div className="text-5xl">
              📄
            </div>
 
            <p className="font-bold">
              فایل فیش واریزی را اینجا رها کنید
            </p>
 
            <p className="text-sm text-gray-500">
              یا برای انتخاب فایل کلیک کنید
            </p>
 
            <p className="text-xs text-gray-400">
              JPG • PNG • PDF
            </p>
 
          </div>
        )}
 
      </div>
 
 
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={onChange}
      />
 
    </>
  );
}
 