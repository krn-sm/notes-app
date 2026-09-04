from sqlalchemy.orm import Session

from app.models import Tag
from app.schemas.tag import TagCreate, TagUpdate
from app.repositories import tag_repository
from app.exceptions import (
    NotFoundException,
    ConflictException,
)


def create_tag(
    db: Session,
    tag_data: TagCreate,
    user_id: int,
) -> Tag:

    tag_name = tag_data.name.strip()

    existing_tag = tag_repository.get_tag_by_name(
        db,
        tag_name,
        user_id,
    )

    if existing_tag:
        raise ConflictException(
            "Tag already exists"
        )

    tag = Tag(
        user_id=user_id,
        name=tag_name,
    )

    return tag_repository.create_tag(
        db,
        tag,
    )


def get_tags(
    db: Session,
    user_id: int,
):

    tags = tag_repository.get_tags_with_count(
        db,
        user_id,
    )

    return [
        {
            "id": tag.id,
            "name": tag.name,
            "note_count": note_count,
        }
        for tag, note_count in tags
    ]


def update_tag(
    db: Session,
    tag_id: int,
    tag_data: TagUpdate,
    user_id: int,
) -> Tag | None:

    tag = tag_repository.get_tag(
        db,
        tag_id,
        user_id,
    )

    if tag is None:
        return None

    tag_name = tag_data.name.strip()

    existing_tag = tag_repository.get_tag_by_name(
        db,
        tag_name,
        user_id,
    )

    if (
        existing_tag
        and existing_tag.id != tag_id
    ):
        raise ConflictException(
            "Tag with this name already exists"
        )

    tag.name = tag_name

    return tag_repository.update_tag(
        db,
        tag,
    )


def delete_tag(
    db: Session,
    tag_id: int,
    user_id: int,
) -> bool:

    tag = tag_repository.get_tag(
        db,
        tag_id,
        user_id,
    )

    if tag is None:
        return False

    tag_repository.delete_tag(
        db,
        tag,
    )

    return True