from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
)


class TagCreate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=50,
    )

    @field_validator("name")
    def validate_name(
        cls,
        value: str,
    ) -> str:
        return value.strip()


class TagUpdate(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=50,
    )

    @field_validator("name")
    def validate_name(
        cls,
        value: str,
    ) -> str:
        return value.strip()


class TagResponse(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(
        from_attributes=True,
    )


class TagWithCountResponse(TagResponse):
    note_count: int
