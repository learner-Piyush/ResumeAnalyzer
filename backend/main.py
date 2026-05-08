from fastapi import FastAPI, File, UploadFile, Form
from utils.parser import extract_text
from model.analyzer import analyze_resume
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Server is running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...), job_desc: str = Form(...)):
    text = await extract_text(file)
    result = analyze_resume(text, job_desc)
    return result