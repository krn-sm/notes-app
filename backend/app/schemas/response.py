from typing import TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    status_code: int
    status_message: str
    error_message: str | None = None
    response_data: T | None = None
