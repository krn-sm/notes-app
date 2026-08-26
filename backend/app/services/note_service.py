from sqlalchemy.orm import Session

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
) -> list[Note]:

    return note_repository.get_notes(
        db,
        user_id,
    )


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

    if note is None:
        return None

    if note_data.title is not None:
        note.title = note_data.title

    if note_data.content is not None:
        note.content = note_data.content

    if note_data.tag_ids is not None:

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

        else:
            note.tags = []

    return note_repository.update_note(
        db,
        note,
    )


def search_notes(
    db: Session,
    user_id: int,
    query: str,
) -> list[Note]:

    return note_repository.search_notes(
        db,
        user_id,
        query,
    )


def delete_note(
    db: Session,
    note_id: int,
    user_id: int,
) -> bool:

    note = note_repository.get_note(
        db,
        note_id,
        user_id,
    )

    if note is None:
        return False

    note_repository.delete_note(
        db,
        note,
    )

    return True