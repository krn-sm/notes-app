from sqlalchemy import select, or_
from sqlalchemy.orm import Session
from app.models import Note, Tag
from app.schemas.note import NoteCreate, NoteUpdate

def create_note(
    db: Session,
    note_data: NoteCreate,
    user_id: int,
) -> Note:
    note = Note(
        user_id=user_id,
        title=note_data.title,
        content=note_data.content,
    )

    if note_data.tag_ids:
        tags = list(
            db.scalars(
                select(Tag).where(
                    Tag.id.in_(note_data.tag_ids),
                    Tag.user_id == user_id,)
            ).all()
        )

        if len(tags) != len(set(note_data.tag_ids)):
            raise ValueError("One or more tag IDs do not exist")

        note.tags = tags

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


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
            Note.user_id == user_id,
            Note.id == note_id,
        )
    )

    return db.scalars(statement).first()


def update_note(
    db: Session,
    note_id: int,
    user_id: int,
    note_data: NoteUpdate,
) -> Note | None:
    
    statement = (
    select(Note)
    .where(
        Note.id == note_id,
        Note.user_id == user_id,
        )
    )

    note = db.scalars(statement).first()

    if note is None:
        return None

    if note_data.title is not None:
        note.title = note_data.title

    if note_data.content is not None:
        note.content = note_data.content

    if note_data.tag_ids is not None:

        if note_data.tag_ids:
            tags = list(
                db.scalars(
                    select(Tag).where(
                        Tag.id.in_(note_data.tag_ids),
                        Tag.user_id == user_id,
                    )
                ).all()
            )

            if len(tags) != len(set(note_data.tag_ids)):
                raise ValueError(
                    "One or more tag IDs do not exist"
                )

            note.tags = tags

        else:
            note.tags = []

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
            )
        )
        .order_by(Note.updated_at.desc())
    )

    return list(db.scalars(statement).all())


def delete_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> bool:
    
    statement = (
    select(Note)
    .where(
        Note.id == note_id,
        Note.user_id == user_id,
        )
    )

    note = db.scalars(statement).first()

    if note is None:
        return False

    db.delete(note)
    db.commit()

    return True
