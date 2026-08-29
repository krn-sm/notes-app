from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models import Note, Tag, note_tags


def create_tag(
    db: Session,
    tag: Tag,
) -> Tag:

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return tag


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


def get_tags_with_count(
    db: Session,
    user_id: int,
) -> list[tuple[Tag, int]]:

    statement = (
        select(
            Tag,
            func.count(Note.id).label("note_count"),
        )
        .outerjoin(
            note_tags,
            Tag.id == note_tags.c.tag_id,
        )
        .outerjoin(
            Note,
            (
                Note.id == note_tags.c.note_id
            )
            & (
                Note.is_deleted.is_(False)
            ),
        )
        .where(
            Tag.user_id == user_id,
        )
        .group_by(Tag.id)
        .order_by(
            Tag.name.asc(),
        )
    )

    return list(
        db.execute(statement).all()
    )


def get_top_tags(
    db: Session,
    user_id: int,
    limit: int = 5,
) -> list[tuple[Tag, int]]:

    statement = (
        select(
            Tag,
            func.count(Note.id).label("note_count"),
        )
        .outerjoin(
            note_tags,
            Tag.id == note_tags.c.tag_id,
        )
        .outerjoin(
            Note,
            (
                Note.id == note_tags.c.note_id
            )
            & (
                Note.is_deleted.is_(False)
            ),
        )
        .where(
            Tag.user_id == user_id,
        )
        .group_by(Tag.id)
        .order_by(
            func.count(Note.id).desc(),
            Tag.name.asc(),
        )
        .limit(limit)
    )

    return list(
        db.execute(statement).all()
    )


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