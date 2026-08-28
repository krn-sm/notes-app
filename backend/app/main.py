from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.database import Base, engine
from app.routers.notes import router as notes_router
from app.routers.tags import router as tags_router
from app.routers.auth import router as auth_router

app = FastAPI(title="Memoir API")

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

# from sqlalchemy import text
# @app.get("/")
# def root():
#     return {"message": "Notes API is running"}


# @app.get("/health/db")
# def database_health():
#     with engine.connect() as connection:
#         result = connection.execute(
#             text("SELECT current_database()")
#         )

#         database_name = result.scalar()

#     return {
#         "database": database_name,
#         "status": "connected",
#     }