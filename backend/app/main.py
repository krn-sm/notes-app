from fastapi import FastAPI
from sqlalchemy import text

from app.database import Base, engine
from app.routers.notes import router as notes_router
from app.routers.tags import router as tags_router
from app.routers.auth import router as auth_router

app = FastAPI(title="Notes API")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(notes_router)
app.include_router(tags_router)


@app.get("/")
def root():
    return {"message": "Notes API is running"}


@app.get("/health/db")
def database_health():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT current_database()")
        )

        database_name = result.scalar()

    return {
        "database": database_name,
        "status": "connected",
    }