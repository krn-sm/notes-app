from fastapi import (
    APIRouter,
    Depends,
    status,
)
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database import get_db
from app.models import User
from app.schemas.tag import (
    TagCreate,
    TagResponse,
    TagUpdate,
    TagWithCountResponse,
)
from app.schemas.response import ApiResponse
from app.services.tag_service import (
    create_tag,
    delete_tag,
    get_tags,
    update_tag,
)


router = APIRouter(
    prefix="/api/tags",
    tags=["Tags"],
)


@router.post(
    "",
    response_model=ApiResponse[TagResponse],
    status_code=status.HTTP_201_CREATED,
)
def create_tag_endpoint(
    tag_data: TagCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tag = create_tag(
        db,
        tag_data,
        current_user.id,
    )
    return ApiResponse(
        status_code=201,
        status_message="Tag created successfully",
        response_data=tag,
    )


@router.get(
    "",
    response_model=ApiResponse[list[TagWithCountResponse]],
)
def get_tags_endpoint(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tags = get_tags(
        db,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Tags retrieved successfully",
        response_data=tags,
    )


@router.patch(
    "/{tag_id}",
    response_model=ApiResponse[TagResponse],
)
def update_tag_endpoint(
    tag_id: int,
    tag_data: TagUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    tag = update_tag(
        db,
        tag_id,
        tag_data,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Tag updated successfully",
        response_data=tag,
    )


@router.delete(
    "/{tag_id}",
    response_model=ApiResponse[None],
)
def delete_tag_endpoint(
    tag_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    delete_tag(
        db,
        tag_id,
        current_user.id,
    )
    return ApiResponse(
        status_code=200,
        status_message="Tag deleted successfully",
        response_data=None,
    )
