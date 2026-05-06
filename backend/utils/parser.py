from fastapi import UploadFile
import PyPDF2
import io

async def extract_text(file: UploadFile) -> str:
    content = await file.read()
    if file.filename and file.filename.endswith(".pdf"):
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text
    else:
        return content.decode("utf-8", errors="ignore")
