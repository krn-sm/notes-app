from datetime import datetime
from app.schemas.tag import TagResponse
from pydantic import BaseModel, ConfigDict, Field, field_validator


class NoteCreate(BaseModel):
    title: str = Field(
        default="",
        max_length=200,
    )
    content: str = Field(
        min_length=1,
    )
    tag_ids: list[int] = Field(
        default_factory=list,
    )

    @field_validator("title")
    def validate_title(
        cls,
        value: str,
    ) -> str:
        return value.strip()

    @field_validator("content")
    def validate_content(
        cls,
        value: str,
    ) -> str:
        return value.strip()


class NoteUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        max_length=200,
    )
    content: str | None = Field(
        default=None,
        min_length=1,
    )
    tag_ids: list[int] | None = None
    is_favorite: bool | None = None

    @field_validator("title")
    def validate_title(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return value
        return value.strip()

    @field_validator("content")
    def validate_content(
        cls,
        value: str | None,
    ) -> str | None:
        if value is None:
            return value
        return value.strip()


class NoteResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str

    is_favorite: bool
    is_deleted: bool

    tags: list[TagResponse] = Field(
        default_factory=list,
    )

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class PaginatedNotesResponse(BaseModel):
    items: list[NoteResponse]
    total: int
    page: int
    limit: int
    total_pages: int
