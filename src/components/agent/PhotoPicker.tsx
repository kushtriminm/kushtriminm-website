"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, Star, Trash2 } from "lucide-react";

// A photo in the list: either already online (url) or just chosen on this device (file).
export type PhotoItem = { id: string; url: string; file?: File };

export function photoItemsFrom(urls: string[]): PhotoItem[] {
  return urls.map((url) => ({ id: url, url }));
}

// Drop or choose photos, put them in order (the first one is the cover) and remove them.
// Nothing is uploaded here: that happens when you press Save.
export default function PhotoPicker({
  items,
  onChange,
  max = 20,
}: {
  items: PhotoItem[];
  onChange: (items: PhotoItem[]) => void;
  max?: number;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function add(files: FileList | File[]) {
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const room = Math.max(0, max - items.length);
    const added = images.slice(0, room).map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(file),
      file,
    }));
    if (added.length > 0) onChange([...items, ...added]);
  }

  function move(index: number, by: -1 | 1) {
    const next = [...items];
    const target = index + by;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    const item = items[index];
    if (item.file) URL.revokeObjectURL(item.url);
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            input.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          add(e.dataTransfer.files);
        }}
        className={`flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${
          over ? "border-red-500 bg-red-500/10" : "border-white/20 bg-neutral-950 hover:border-white/40"
        }`}
      >
        <ImagePlus size={28} className="text-red-500" aria-hidden="true" />
        <p className="text-sm font-bold text-white">Drop photos here, or tap to choose</p>
        <p className="text-xs text-gray-400">
          {items.length} / {max} photos · they are made smaller automatically before uploading
        </p>
        <input
          ref={input}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) add(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <li key={item.id} className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt="" className="h-full w-full object-cover" />
                {i === 0 && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold">
                    <Star size={11} aria-hidden="true" /> Cover
                  </span>
                )}
                {item.file && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-bold">
                    New
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-1 p-1.5">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move left"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10 disabled:opacity-25"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Remove photo"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/15"
                >
                  <Trash2 size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  aria-label="Move right"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10 disabled:opacity-25"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Uploads the new photos (in order) and returns the final list of addresses.
export async function uploadNew(
  items: PhotoItem[],
  upload: (file: File) => Promise<string>,
  onProgress?: (done: number, total: number) => void
): Promise<string[]> {
  const total = items.filter((i) => i.file).length;
  let done = 0;
  const urls: string[] = [];
  for (const item of items) {
    if (item.file) {
      urls.push(await upload(item.file));
      done += 1;
      onProgress?.(done, total);
    } else {
      urls.push(item.url);
    }
  }
  return urls;
}
