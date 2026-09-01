from sqlalchemy.orm import Session

from math import ceil
from datetime import datetime, timezone

from app.models import Note
from app.schemas.note import NoteCreate, NoteUpdate
from app.repositories import note_repository


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
        tags = note_repository.get_tags_by_ids(
            db,
            note_data.tag_ids,
            user_id,
        )

        if len(tags) != len(set(note_data.tag_ids)):
            raise ValueError(
                "One or more tag IDs do not exist"
            )

        note.tags = tags

    return note_repository.create_note(
        db,
        note,
    )


def get_notes(
    db: Session,
    user_id: int,
    favorite: bool | None = None,
    deleted: bool = False,
    tag_id: int | None = None,
    query: str | None = None,
    page: int = 1,
    limit: int = 12,
):

    notes, total = note_repository.get_notes(
        db=db,
        user_id=user_id,
        favorite=favorite,
        deleted=deleted,
        tag_id=tag_id,
        query=query,
        page=page,
        limit=limit,
    )

    total_pages = ceil(total / limit) if total > 0 else 0

    return {
        "items": notes,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


def get_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> Note | None:

    return note_repository.get_note(
        db,
        note_id,
        user_id,
    )


def update_note(
    db: Session,
    note_id: int,
    user_id: int,
    note_data: NoteUpdate,
) -> Note | None:

    note = note_repository.get_note(
        db,
        note_id,
        user_id,
    )

    if note is None or note.is_deleted:
        return None

    content_updated = False

    if note_data.title is not None:
        note.title = note_data.title
        content_updated = True

    if note_data.content is not None:
        note.content = note_data.content
        content_updated = True

    if note_data.tag_ids is not None:

        if note_data.tag_ids:
            tags = note_repository.get_tags_by_ids(
                db,
                note_data.tag_ids,
                user_id,
            )

            if len(tags) != len(
                set(note_data.tag_ids)
            ):
                raise ValueError(
                    "One or more tag IDs do not exist"
                )

            note.tags = tags

        else:
            note.tags = []

        content_updated = True

    if note_data.is_favorite is not None:
        note.is_favorite = note_data.is_favorite

    if content_updated:
        note.updated_at = datetime.now(timezone.utc)

    return note_repository.update_note(
        db,
        note,
    )


def soft_delete_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> Note | None:

    note = note_repository.get_note(
        db,
        note_id,
        user_id,
    )

    if note is None or note.is_deleted:
        return None

    note.is_deleted = True

    return note_repository.update_note(
        db,
        note,
    )


def restore_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> Note | None:

    note = note_repository.get_note(
        db,
        note_id,
        user_id,
    )

    if note is None or not note.is_deleted:
        return None

    note.is_deleted = False

    return note_repository.update_note(
        db,
        note,
    )


def hard_delete_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> bool:

    note = note_repository.get_note(
        db,
        note_id,
        user_id,
    )

    if note is None or not note.is_deleted:
        return False

    note_repository.hard_delete_note(
        db,
        note,
    )

    return True