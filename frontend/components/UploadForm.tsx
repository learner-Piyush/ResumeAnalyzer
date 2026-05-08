"use client";

import { useState } from "react";

import { analyzeResume } from "@/services/api";
import { AnalysisResult } from "@/types/analysis";

import Loader from "./Loader";
import ResultCard from "./ResultCard";
import { ThemeToggle } from "./ThemeToggle";

export default function UploadForm() {

    const [file, setFile] = useState<File | null>(null);

    const [jobDesc, setJobDesc] = useState("");

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState<AnalysisResult | null>(null);

    const [error, setError] = useState("");

    async function handleSubmit() {

        if (!file) {
            setError("Please upload a resume");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data = await analyzeResume(file, jobDesc);

            setResult(data);

        } catch (err) {

            setError("Something went wrong");

        } finally {

            setLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold dark:text-white">
                    AI Resume Analyzer
                </h1>
                <ThemeToggle />
            </div>

            <div className="mb-6 relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />
                <div className="pointer-events-none">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        <span className="text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PDF file only</p>
                </div>
            </div>

            {file && (
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-medium truncate">{file.name}</span>
                    <button 
                        onClick={() => setFile(null)} 
                        className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 font-bold px-2"
                        title="Remove file"
                    >
                        &times;
                    </button>
                </div>
            )}

            <textarea
                placeholder="Paste Job Description"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                className="border dark:border-gray-700 w-full p-3 h-40 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            />

            <button
                onClick={handleSubmit}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded mt-4 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                Analyze
            </button>

            {loading && <Loader />}

            {error && (
                <p className="text-red-500 mt-4">
                    {error}
                </p>
            )}

            {result && (
                <ResultCard result={result} />
            )}

        </div>
    );
}