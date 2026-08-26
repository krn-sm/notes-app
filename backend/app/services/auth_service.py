from datetime import datetime, timezone
import jwt
from sqlalchemy.orm import Session

from app.auth.security import (
    ALGORITHM,
    SECRET_KEY,
    hash_password,
    verify_password,
)
from app.models import RevokedToken, User
from app.repositories import auth_repository
from app.schemas.auth import UserCreate, UserUpdate


def create_user(
    db: Session,
    user_data: UserCreate,
) -> User:

    existing_user = auth_repository.get_user_by_email(
        db,
        user_data.email,
    )

    if existing_user:
        raise ValueError("Email already registered")

    hashed_password = hash_password(
        user_data.password
    )

    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password,
    )

    return auth_repository.create_user(
        db,
        user,
    )


def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:

    user = auth_repository.get_user_by_email(
        db,
        email,
    )

    if user and verify_password(
        password,
        user.hashed_password,
    ):
        return user

    return None


def update_user(
    db: Session,
    user: User,
    user_data: UserUpdate,
) -> User:

    user.name = user_data.name.strip()

    return auth_repository.update_user(
        db,
        user,
    )


def revoke_token(
    db: Session,
    token: str,
) -> None:

    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=[ALGORITHM],
    )

    jti = payload.get("jti")
    exp = payload.get("exp")

    if jti is None or exp is None:
        raise ValueError("Invalid token")

    revoked_token = RevokedToken(
        jti=jti,
        expires_at=datetime.fromtimestamp(
            exp,
            tz=timezone.utc,
        ),
    )

    auth_repository.create_revoked_token(
        db,
        revoked_token,
    )


def cleanup_revoked_tokens(
    db: Session,
) -> None:

    auth_repository.cleanup_revoked_tokens(
        db,
        datetime.now(timezone.utc),
    )