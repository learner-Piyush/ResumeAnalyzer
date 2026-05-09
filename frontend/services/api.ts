import { AnalysisResult } from "@/types/analysis";

export async function analyzeResume(
  file: File,
  jobDesc: string,
): Promise<AnalysisResult> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("job_desc", jobDesc);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_PROD_URL ||
    (process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_LOCAL_URL || "http://localhost:8000"
      : undefined);

  if (!baseUrl) {
    throw new Error(
      "Missing environment variable NEXT_PUBLIC_API_URL. Set it in Vercel (Production) or your env.",
    );
  }

  const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze resume");
  }

  return res.json();
}
