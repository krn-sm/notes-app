from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.auth.dependencies import get_current_user
from app.schemas.note import (
    NoteCreate,
    NoteResponse,
    NoteUpdate,
)
from app.services.note_service import (
    create_note,
    delete_note,
    get_note,
    get_notes,
    search_notes,
    update_note,
)


router = APIRouter(
    prefix="/api/notes",
    tags=["Notes"],
)


@router.post(
    "",
    response_model=NoteResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_note_endpoint(
    note_data: NoteCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_note(
        db,
        note_data,
        current_user.id,
    )


@router.get(
    "",
    response_model=list[NoteResponse],
)
def get_notes_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_notes(db, current_user.id)


@router.get(
    "/search",
    response_model=list[NoteResponse],
)
def search_notes_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    q: str = Query(min_length=1),
):
    return search_notes(db, current_user.id, q)


@router.get(
    "/{note_id}",
    response_model=NoteResponse,
)
def get_note_endpoint(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    note = get_note(db, note_id, current_user.id)

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )

    return note


@router.patch(
    "/{note_id}",
    response_model=NoteResponse,
)
def update_note_endpoint(
    note_id: int,
    note_data: NoteUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    note = update_note(
        db, note_id, current_user.id, note_data
        )

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )

    return note


@router.delete(
    "/{note_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_note_endpoint(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    deleted = delete_note(db, note_id, current_user.id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )
    return None