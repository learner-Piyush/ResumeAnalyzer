import { AnalysisResult } from "@/types/analysis";

export async function analyzeResume(
    file: File,
    jobDesc: string
): Promise<AnalysisResult> {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("job_desc", jobDesc);

    const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Failed to analyze resume");
    }

    return res.json();
}