import { AnalysisResult } from "@/types/analysis";

interface Props {
    result: AnalysisResult;
}

export default function ResultCard({ result }: Props) {

    return (
        <div className="border dark:border-gray-700 rounded-xl p-6 mt-6 bg-white dark:bg-gray-900 shadow-sm transition-colors">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
                ATS Match Score: {result.match_score}%
            </h2>

            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Matched Skills</h3>
                {result.matched_skills.length > 0 ? (
                    <ul className="list-disc ml-5 text-green-700 dark:text-green-400 mt-2">
                        {result.matched_skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic mt-2 text-sm">No matched skills found in the resume.</p>
                )}
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Missing Skills</h3>
                {result.missing_skills.length > 0 ? (
                    <ul className="list-disc ml-5 text-red-600 dark:text-red-400 mt-2">
                        {result.missing_skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic mt-2 text-sm">No missing skills identified.</p>
                )}
            </div>

            <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Suggestions</h3>
                {result.suggestions.length > 0 ? (
                    <ul className="list-disc ml-5 text-blue-700 dark:text-blue-400 mt-2">
                        {result.suggestions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic mt-2 text-sm">No further suggestions.</p>
                )}
            </div>

        </div>
    );
}