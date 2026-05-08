export interface AnalysisResult {
    match_score: number;
    matched_skills: string[];
    missing_skills: string[];
    suggestions: string[];
}