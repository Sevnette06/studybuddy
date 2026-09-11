from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.materials import router as materials_router
from app.routes.lecture import router as lecture_router
from app.routes.study import router as study_router

app = FastAPI(title="StudyBuddy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(materials_router)
app.include_router(lecture_router)
app.include_router(study_router)

@app.get("/")
def root():
    return{"message": "StudyBuddy backend is running"}

@app.get("/health")
def health():
    return {"status": "ok"}