from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.notes import router as notes_router
from app.routers.tags import router as tags_router
from app.routers.auth import router as auth_router
from app.exception_handlers import (
    register_exception_handlers,
)

app = FastAPI(title="Memoir API")

register_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(notes_router)
app.include_router(tags_router)
