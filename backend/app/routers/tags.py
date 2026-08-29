from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models import User
from app.schemas.tag import TagCreate, TagResponse, TagUpdate
from app.services.tag_service import (
    create_tag,
    delete_tag,
    get_tags,
    update_tag,
    get_top_tags
)

router = APIRouter(
    prefix="/api/tags",
    tags=["Tags"],
)


@router.post(
    "",
    response_model=TagResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_tag_endpoint(
    tag_data: TagCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        return create_tag(
    db,
    tag_data,
    current_user.id,
)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )


@router.get(
    "",
    response_model=list[TagResponse],
)
def get_tags_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_tags(
    db,
    current_user.id,
)


@router.get(
    "/top",
    response_model=list[TagResponse],
)
def get_top_tags_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_top_tags(
        db,
        current_user.id,
    )


@router.patch(
    "/{tag_id}",
    response_model=TagResponse,
)
def update_tag_endpoint(
    tag_id: int,
    tag_data: TagUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        tag = update_tag(
    db,
    tag_id,
    tag_data,
    current_user.id,
) 
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )
    if tag is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found",
        )

    return tag    


@router.delete(
    "/{tag_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_tag_endpoint(
    tag_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    deleted = delete_tag(
        db,
        tag_id,
        current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Tag not found",
        )

    return None