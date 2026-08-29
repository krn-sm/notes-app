from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.auth.dependencies import get_current_user
from app.schemas.note import (
    NoteCreate,
    NoteListResponse,
    NoteResponse,
    NoteUpdate,
)
from app.services.note_service import (
    create_note,
    get_note,
    get_notes,
    update_note,
    soft_delete_note,
    restore_note,
    hard_delete_note
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
    response_model=list[NoteListResponse],
)
def get_notes_endpoint(
    favorite: bool | None = None,
    deleted: bool = False,
    tag_id: int | None = None,
    q: str | None = Query(
        default=None,
        min_length=1,
    ),
    page: int = Query(
        default=1,
        ge=1,
    ),
    limit: int = Query(
        default=12,
        ge=1,
        le=100,
    ),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_notes(
        db=db,
        user_id=current_user.id,
        favorite=favorite,
        deleted=deleted,
        tag_id=tag_id,
        query=q,
        page=page,
        limit=limit,
    )


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
    response_model=NoteResponse,
)
def soft_delete_note_endpoint(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    note = soft_delete_note(
        db,
        note_id,
        current_user.id,
    )

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )

    return note


@router.patch(
    "/{note_id}/restore",
    response_model=NoteResponse,
)
def restore_note_endpoint(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    note = restore_note(
        db,
        note_id,
        current_user.id,
    )

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )

    return note


@router.delete(
    "/{note_id}/permanent",
    status_code=status.HTTP_204_NO_CONTENT,
)
def hard_delete_note_endpoint(
    note_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    deleted = hard_delete_note(
        db,
        note_id,
        current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )

    return None