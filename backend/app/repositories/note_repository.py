from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from app.models import Note, Tag


def get_notes(
    db: Session,
    user_id: int,
) -> list[Note]:

    statement = (
        select(Note)
        .where(Note.user_id == user_id)
        .order_by(Note.updated_at.desc())
    )

    return list(db.scalars(statement).all())


def get_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> Note | None:

    statement = (
        select(Note)
        .where(
            Note.id == note_id,
            Note.user_id == user_id,
        )
    )

    return db.scalars(statement).first()


def get_tags_by_ids(
    db: Session,
    tag_ids: list[int],
    user_id: int,
) -> list[Tag]:

    statement = (
        select(Tag)
        .where(
            Tag.id.in_(tag_ids),
            Tag.user_id == user_id,
        )
    )

    return list(db.scalars(statement).all())


def create_note(
    db: Session,
    note: Note,
) -> Note:

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


def update_note(
    db: Session,
    note: Note,
) -> Note:

    db.commit()
    db.refresh(note)

    return note


def search_notes(
    db: Session,
    user_id: int,
    query: str,
) -> list[Note]:

    search_term = f"%{query.strip()}%"

    statement = (
        select(Note)
        .where(
            Note.user_id == user_id,
            or_(
                Note.title.ilike(search_term),
                Note.content.ilike(search_term),
            ),
        )
        .order_by(Note.updated_at.desc())
    )

    return list(db.scalars(statement).all())


def delete_note(
    db: Session,
    note: Note,
) -> None:

    db.delete(note)
    db.commit()