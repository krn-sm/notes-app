from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import Tag


def get_tag_by_name(
    db: Session,
    name: str,
    user_id: int,
) -> Tag | None:

    statement = (
        select(Tag)
        .where(
            func.lower(Tag.name) == name.lower(),
            Tag.user_id == user_id,
        )
    )

    return db.scalars(statement).first()


def create_tag(
    db: Session,
    tag: Tag,
) -> Tag:

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return tag


def get_tags(
    db: Session,
    user_id: int,
) -> list[Tag]:

    statement = (
        select(Tag)
        .where(Tag.user_id == user_id)
        .order_by(Tag.name.asc())
    )

    return list(db.scalars(statement).all())


def get_tag(
    db: Session,
    tag_id: int,
    user_id: int,
) -> Tag | None:

    statement = (
        select(Tag)
        .where(
            Tag.id == tag_id,
            Tag.user_id == user_id,
        )
    )

    return db.scalars(statement).first()


def update_tag(
    db: Session,
    tag: Tag,
) -> Tag:

    db.commit()
    db.refresh(tag)

    return tag


def delete_tag(
    db: Session,
    tag: Tag,
) -> None:

    db.delete(tag)
    db.commit()