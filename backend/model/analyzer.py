import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def extract_skills_from_jd(job_desc):
    # Try to split by commas or newlines if the user inputs a list
    if ',' in job_desc or '\n' in job_desc:
        skills = [s.strip() for s in re.split(r'[,\n]', job_desc) if s.strip()]
        # Filter to keep only likely skills (1-4 words)
        skills = [s for s in skills if 0 < len(s.split()) <= 4]
        if skills:
            # Maintain original capitalization but make unique
            return list(dict.fromkeys(skills))
            
    # Fallback to word extraction if no delimiters
    words = re.findall(r'\b[a-zA-Z0-9\.+#]{2,}\b', job_desc)
    stop_words = {'and', 'the', 'for', 'with', 'this', 'that', 'you', 'are', 'your', 'from', 'have', 'has', 'experience', 'skills', 'required'}
    return list(dict.fromkeys(w for w in words if w.lower() not in stop_words))

def analyze_resume(resume, job_desc):
    if resume.strip() == "ERROR_NO_TEXT_EXTRACTED_IMAGE_PDF":
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": ["We couldn't extract any text from this PDF. It appears to be an image or scanned document. Please upload a text-based PDF."]
        }

    if not resume.strip() or not job_desc.strip():
        return {
            "match_score": 0,
            "matched_skills": [],
            "missing_skills": [],
            "suggestions": ["Please provide both resume text and job description."]
        }

    documents = [resume, job_desc]

    try:
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(documents)
        score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    except Exception:
        score = 0.0

    job_skills = extract_skills_from_jd(job_desc)
    resume_text_lower = resume.lower()

    matched = []
    missing = []

    for skill in job_skills:
        # Check if the exact skill phrase exists in the resume text
        if skill.lower() in resume_text_lower:
            matched.append(skill)
        else:
            missing.append(skill)

    # Sort for display
    matched = sorted(matched)[:15]
    missing = sorted(missing)[:15]

    suggestions = []
    if missing:
        suggestions.append(f"Consider adding missing keywords: {', '.join(missing[:5])}")
    if score < 0.5:
        suggestions.append("Tailor your resume more closely to the job description terminology.")
    if not suggestions:
        suggestions.append("Your resume looks like a strong match! Keep up the good work.")

    return {
        "match_score": round(score * 100, 2),
        "matched_skills": matched,
        "missing_skills": missing,
        "suggestions": suggestions
    }
