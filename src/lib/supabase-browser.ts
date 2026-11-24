"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PHOTO_BUCKET, SUPABASE_ANON_KEY, SUPABASE_URL } from "./live-types";

// The Supabase connection used by the agent panel in the browser.
// It keeps you logged in on this device until you sign out.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "kushtrimi-agent" },
    });
  }
  return client;
}

// Makes a photo smaller before uploading (fast pages, sharp enough for big screens).
export async function shrinkPhoto(file: File, maxSide = 2000, quality = 0.86): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob"))), "image/jpeg", quality)
  );
}

// Uploads one photo into a folder of the photo storage and returns its public address.
export async function uploadPhoto(sb: SupabaseClient, folder: string, file: File): Promise<string> {
  const blob = await shrinkPhoto(file);
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await sb.storage
    .from(PHOTO_BUCKET)
    .upload(name, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
  if (error) throw error;
  return sb.storage.from(PHOTO_BUCKET).getPublicUrl(name).data.publicUrl;
}

// Deletes photos that were uploaded through the panel (other photos are left alone).
export async function deletePhotos(sb: SupabaseClient, urls: string[]) {
  const marker = `/storage/v1/object/public/${PHOTO_BUCKET}/`;
  const paths = urls
    .filter((url) => url.includes(marker))
    .map((url) => decodeURIComponent(url.split(marker)[1]));
  if (paths.length > 0) await sb.storage.from(PHOTO_BUCKET).remove(paths);
}

// Tells the website to show the change straight away.
export async function refreshSite(sb: SupabaseClient) {
  const { data } = await sb.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  try {
    await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${token}` } });
  } catch {
    // Not a problem: the site updates by itself within a minute.
  }
}
