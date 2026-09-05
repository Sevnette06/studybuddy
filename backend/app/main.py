from fastapi import FastAPI

from app.routes.materials import router as materials_router

app = FastAPI(title="StudyBuddy API")

app.include_router(materials_router)

@app.get("/")
def root():
    return{"message": "StudyBuddy backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}