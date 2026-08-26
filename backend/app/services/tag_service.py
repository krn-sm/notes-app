from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import Tag
from app.schemas.tag import TagCreate, TagUpdate


def create_tag(
    db: Session,
    tag_data: TagCreate,
    user_id: int,
) -> Tag:
    existing_tag = db.scalar(
        select(Tag).where(
            Tag.name == tag_data.name,
            Tag.user_id == user_id,
            )
    )

    if existing_tag:
        raise ValueError("Tag already exists")

    tag = Tag(name=tag_data.name)

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return tag


def get_tags(
    db: Session,
    user_id: int
) -> list[Tag]:
    statement = (
    select(Tag)
    .where(Tag.user_id == user_id)
    .order_by(Tag.name.asc())
)

    return list(db.scalars(statement).all())


def update_tag(
    db: Session,
    tag_id: int,
    tag_data: TagUpdate,
    user_id: int,
) -> Tag | None:
    
    statement = (
        select(Tag).where(
    Tag.id == tag_id,
    Tag.user_id == user_id,
)
)   
    tag_name = tag_data.name.strip()
    tag = db.scalars(statement).first()

    if tag is None:
        return None

    existing_tag = db.scalar(
        select(Tag).where(Tag.name == tag_name, Tag.id != tag_id)
    )

    if existing_tag:
        raise ValueError("Tag with this name already exists")

    tag.name = tag_data.name
    db.commit()
    db.refresh(tag)

    return tag


def delete_tag(
    db: Session,
    tag_id: int,
    user_id: int
) -> bool:
    
    statement = select(Tag).where(
    Tag.id == tag_id,
    Tag.user_id == user_id,
)
    tag = db.scalars(statement).first()

    if tag is None:
        return False
    
    db.delete(tag)
    db.commit()

    return True