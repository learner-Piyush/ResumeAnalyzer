# ResumeAnalyzer

![Release](https://img.shields.io/badge/status-beta-blue) ![License](https://img.shields.io/badge/license-ADD--ME-lightgrey)

A professional resume analysis web application that extracts text from uploaded resumes, compares them against job descriptions, and returns a scored analysis and improvement suggestions.

Tech stack: FastAPI (backend) • Next.js + TypeScript (frontend)

Contents

- `backend/` — FastAPI service exposing `/` (health) and `/analyze` (resume analysis).
- `frontend/` — Next.js client that uploads resumes, shows results and recommendations.

Key features

- Extracts text from PDF/DOCX resumes and submitted job descriptions
- Computes skill/keyword overlap and provides scoring and suggestions
- Lightweight API and modern frontend with environment-based configuration

Quick start (local)

Prerequisites

- Python 3.11+
- Node.js 18+ and npm

1. Backend

```bash
cd backend
python -m venv .venv                # optional but recommended
# Windows
.\.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Endpoints

- `GET /` — health check
- `POST /analyze` — multipart form (`file` and `job_desc`) returning analysis JSON

2. Frontend (development)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

Environment variables

The frontend reads API endpoints from environment variables. Recommended configuration:

- `NEXT_PUBLIC_API_URL` — canonical client API URL (preferred for Production)
- `NEXT_PUBLIC_API_PROD_URL` — legacy production URL (fallback)
- `NEXT_PUBLIC_API_LOCAL_URL` — local development backend (default: `http://localhost:8000`)

Create `frontend/.env.local` for development overrides:

```dotenv
NEXT_PUBLIC_API_LOCAL_URL=http://localhost:8000
```

In production (Vercel/Netlify), set `NEXT_PUBLIC_API_URL` to your backend URL and redeploy.

Usage examples

Curl (upload resume):

```bash
curl -F "file=@/path/to/resume.pdf" -F "job_desc=Software Engineer" \
	"${NEXT_PUBLIC_API_URL:-http://localhost:8000}/analyze"
```

Fetch from browser (example):

```js
const form = new FormData();
form.append("file", fileInput.files[0]);
form.append("job_desc", jobDescText);

const base =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_LOCAL_URL ||
  "http://localhost:8000";
const res = await fetch(`${base.replace(/\/+$|\/$/, "")}/analyze`, {
  method: "POST",
  body: form,
});
const data = await res.json();
```

Deployment (Vercel)

1. Set `NEXT_PUBLIC_API_URL` (Production) in Vercel project Environment Variables to your backend URL (e.g. `https://resumeanalyzer.onrender.com`).
2. Optionally set Preview variables for preview deployments.
3. Deploy — verify network requests in browser DevTools.

Security & CORS

- The backend currently has permissive CORS for ease of development. For production, set `ALLOWED_ORIGINS` in the backend environment to a comma-separated list of allowed origins and restrict `allow_methods` and `allow_headers` where possible.
- Never commit secrets to the repo. Use host environment variables or secret managers.

Troubleshooting

- If production still shows requests to `localhost`, confirm that `NEXT_PUBLIC_API_URL` is set in your hosting provider for the Production environment, then redeploy.
- Inspect browser DevTools → Network/Console for runtime errors and request URLs.
- Check backend logs (Render/Vercel logs or your host) for 5xx errors.

Contributing

- Fork the repo, create a feature branch, and open a PR. Describe changes and include tests where applicable.

License

- Add a LICENSE file and replace the badge above. Suggested: MIT, Apache-2.0.

Contact

- Add contact info or maintainer email here.
