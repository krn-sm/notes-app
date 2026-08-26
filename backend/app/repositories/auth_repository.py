from datetime import datetime

from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from app.models import User, RevokedToken


def get_user_by_email(
    db: Session,
    email: str,
) -> User | None:

    statement = (
        select(User)
        .where(User.email == email)
    )

    return db.scalars(statement).first()


def create_user(
    db: Session,
    user: User,
) -> User:

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def update_user(
    db: Session,
    user: User,
) -> User:

    db.commit()
    db.refresh(user)

    return user


def create_revoked_token(
    db: Session,
    revoked_token: RevokedToken,
) -> None:

    db.add(revoked_token)
    db.commit()


def cleanup_revoked_tokens(
    db: Session,
    now: datetime,
) -> None:

    db.execute(
        delete(RevokedToken).where(
            RevokedToken.expires_at < now
        )
    )

    db.commit()


def get_revoked_token(
    db: Session,
    jti: str,
) -> RevokedToken | None:

    statement = (
        select(RevokedToken)
        .where(RevokedToken.jti == jti)
    )

    return db.scalars(statement).first()