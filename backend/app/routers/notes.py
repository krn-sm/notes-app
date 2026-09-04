from fastapi import (
    APIRouter,
    Depends,
    Query,
    status,
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.auth.dependencies import get_current_user

from app.schemas.note import (
    NoteCreate,
    PaginatedNotesResponse,
    NoteResponse,
    NoteUpdate,
)
from app.schemas.response import ApiResponse

from app.services.note_service import (
    create_note,
    get_note,
    get_notes,
    update_note,
    soft_delete_note,
    restore_note,
    hard_delete_note,
)


router = APIRouter(
    prefix="/api/notes",
    tags=["Notes"],
)


@router.post(
    "",
    response_model=ApiResponse[NoteResponse],
    status_code=status.HTTP_201_CREATED,
)
def create_note_endpoint(
    note_data: NoteCreate,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    note = create_note(
        db,
        note_data,
        current_user.id,
    )
    return ApiResponse(
        status_code=201,
        status_message="Note created successfully",
        response_data=note,
    )


@router.get(
    "",
    response_model=ApiResponse[PaginatedNotesResponse],
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
        default=8,
        ge=1,
        le=100,
    ),
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    notes = get_notes(
        db=db,
        user_id=current_user.id,
        favorite=favorite,
        deleted=deleted,
        tag_id=tag_id,
        query=q,
        page=page,
        limit=limit,
    )
    return ApiResponse(
        status_code=200,
        status_message="Notes retrieved successfully",
        response_data=notes,
    )


@router.get(
    "/{note_id}",
    response_model=ApiResponse[NoteResponse],
)
def get_note_endpoint(
    note_id: int,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    note = get_note(
        db,
        note_id,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Note retrieved successfully",
        response_data=note,
    )


@router.patch(
    "/{note_id}",
    response_model=ApiResponse[NoteResponse],
)
def update_note_endpoint(
    note_id: int,
    note_data: NoteUpdate,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    note = update_note(
        db,
        note_id,
        current_user.id,
        note_data,
    )
    return ApiResponse(
        status_code=200,
        status_message="Note updated successfully",
        response_data=note,
    )


@router.delete(
    "/{note_id}",
    response_model=ApiResponse[NoteResponse],
)
def soft_delete_note_endpoint(
    note_id: int,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    note = soft_delete_note(
        db,
        note_id,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Note moved to trash successfully",
        response_data=note,
    )


@router.patch(
    "/{note_id}/restore",
    response_model=ApiResponse[NoteResponse],
)
def restore_note_endpoint(
    note_id: int,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    note = restore_note(
        db,
        note_id,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Note restored successfully",
        response_data=note,
    )


@router.delete(
    "/{note_id}/permanent",
    response_model=ApiResponse[None],
)
def hard_delete_note_endpoint(
    note_id: int,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    hard_delete_note(
        db,
        note_id,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Note permanently deleted successfully",
        response_data=None,
    )
