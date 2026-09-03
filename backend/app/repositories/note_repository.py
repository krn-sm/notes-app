from sqlalchemy import func, select, or_
from sqlalchemy.orm import Session

from app.models import Note, Tag


def get_notes(
    db: Session,
    user_id: int,
    favorite: bool | None = None,
    deleted: bool = False,
    tag_id: int | None = None,
    query: str | None = None,
    page: int = 1,
    limit: int = 12,
) -> tuple[list[Note], int]:

    statement = (
        select(Note)
        .where(
            Note.user_id == user_id,
            Note.is_deleted == deleted,
        )
    )

    #favorites
    if favorite is not None:
        statement = statement.where(
            Note.is_favorite == favorite
        )

    #tag
    if tag_id is not None:
        statement = (
            statement
            .join(Note.tags)
            .where(Tag.id == tag_id)
        )

    # Search
    if query:
        search_term = f"%{query.strip()}%"

        statement = (
            statement
            .outerjoin(Note.tags)
            .where(
                or_(
                    Note.title.ilike(search_term),
                    Note.content.ilike(search_term),
                    Tag.name.ilike(search_term),
                )
            )
        )

    statement = statement.distinct()

    count_statement = (
        select(func.count())
        .select_from(statement.subquery())
    )

    total = db.scalar(count_statement) or 0

    statement = (
        statement
        .order_by(Note.updated_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
    )

    notes = list(
        db.scalars(statement).all()
    )

    return notes, total


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


def hard_delete_note(
    db: Session,
    note: Note,
) -> None:

    db.delete(note)
    db.commit()