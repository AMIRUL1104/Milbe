// Client-side helper for uploading a single image to ImgBB.
// Requires NEXT_PUBLIC_IMGBB_API_KEY to be set in the environment.

export interface ImgBBUploadResult {
  url: string;
  deleteUrl: string;
}

export class ImgBBUploadError extends Error {}

export async function uploadImageToImgBB(
  file: File
): Promise<ImgBBUploadResult> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new ImgBBUploadError(
      "Missing NEXT_PUBLIC_IMGBB_API_KEY environment variable"
    );
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data?.success) {
    const message =
      data?.error?.message ?? "Image upload failed. Please try again.";
    throw new ImgBBUploadError(message);
  }

  return {
    url: data.data.url as string,
    deleteUrl: data.data.delete_url as string,
  };
}
