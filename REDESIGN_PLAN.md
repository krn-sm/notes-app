# API Response & Exception Handling Redesign Plan

## Overview
Standardize all API responses to use a consistent format and implement global exception handling.

## Target Response Format
```json
{
  "status_code": 200,
  "status_message": "Success",
  "error_message": null,
  "response_data": {}
}
```

---

## Step 1: Create Generic Response Schema

**File:** `app/schemas/response.py`

Create a generic `ApiResponse` model that wraps all responses:

```python
from typing import TypeVar, Generic, Optional
from pydantic import BaseModel

T = TypeVar("T")

class ApiResponse(BaseModel, Generic[T]):
    status_code: int
    status_message: str
    error_message: Optional[str] = None
    response_data: Optional[T] = None
```

---

## Step 2: Create Custom Exception Classes

**File:** `app/exceptions.py`

Define custom exceptions for different error types:

```python
class AppException(Exception):
    def __init__(self, status_code: int, status_message: str, error_message: str):
        self.status_code = status_code
        self.status_message = status_message
        self.error_message = error_message

class NotFoundException(AppException):
    def __init__(self, error_message: str = "Resource not found"):
        super().__init__(404, "Not Found", error_message)

class BadRequestException(AppException):
    def __init__(self, error_message: str = "Bad request"):
        super().__init__(400, "Bad Request", error_message)

class UnauthorizedException(AppException):
    def __init__(self, error_message: str = "Unauthorized"):
        super().__init__(401, "Unauthorized", error_message)

class ConflictException(AppException):
    def __init__(self, error_message: str = "Conflict"):
        super().__init__(409, "Conflict", error_message)

class ValidationException(AppException):
    def __init__(self, error_message: str = "Validation error"):
        super().__init__(422, "Validation Error", error_message)
```

---

## Step 3: Create Global Exception Handlers

**File:** `app/exception_handlers.py`

Register handlers for all exception types:

```python
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.schemas.response import ApiResponse

def create_error_response(status_code: int, status_message: str, error_message: str) -> JSONResponse:
    response = ApiResponse(
        status_code=status_code,
        status_message=status_message,
        error_message=error_message,
        response_data=None,
    )
    return JSONResponse(content=response.model_dump(), status_code=status_code)

async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    return create_error_response(exc.status_code, exc.status_message, exc.error_message)

async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    return create_error_response(exc.status_code, "Error", str(exc.detail))

async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    errors = []
    for error in exc.errors():
        field = ".".join(str(loc) for loc in error["loc"] if loc != "body")
        errors.append(f"{field}: {error['msg']}" if field else error["msg"])
    return create_error_response(422, "Validation Error", "; ".join(errors))

async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return create_error_response(500, "Internal Server Error", "An unexpected error occurred")

def register_exception_handlers(app):
    from app.exceptions import AppException
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)
```

---

## Step 4: Update main.py

**File:** `app/main.py`

Register exception handlers:

```python
from app.exception_handlers import register_exception_handlers

app = FastAPI(title="Memoir API")
register_exception_handlers(app)
# ... rest of the code
```

---

## Step 5: Update Routers

### 5.1 Update `app/routers/notes.py`

- Remove `HTTPException` imports
- Import `ApiResponse` and custom exceptions
- Wrap all responses with `ApiResponse`
- Remove manual try/except blocks

**Example transformation:**
```python
# Before
@router.post("", response_model=NoteResponse, status_code=201)
def create_note_endpoint(...):
    try:
        return create_note(db, note_data, current_user.id)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

# After
@router.post("", response_model=ApiResponse[NoteResponse], status_code=201)
def create_note_endpoint(...):
    note = create_note(db, note_data, current_user.id)
    return ApiResponse(
        status_code=201,
        status_message="Note created successfully",
        response_data=note,
    )
```

**All endpoints to update:**

| Endpoint | Current Response | New Response Model |
|----------|------------------|-------------------|
| POST /api/notes | NoteResponse | ApiResponse[NoteResponse] |
| GET /api/notes | PaginatedNotesResponse | ApiResponse[PaginatedNotesResponse] |
| GET /api/notes/{id} | NoteResponse | ApiResponse[NoteResponse] |
| PATCH /api/notes/{id} | NoteResponse | ApiResponse[NoteResponse] |
| DELETE /api/notes/{id} | NoteResponse | ApiResponse[NoteResponse] |
| PATCH /api/notes/{id}/restore | NoteResponse | ApiResponse[NoteResponse] |
| DELETE /api/notes/{id}/permanent | 204 No Content | ApiResponse[None] |

### 5.2 Update `app/routers/tags.py`

| Endpoint | Current Response | New Response Model |
|----------|------------------|-------------------|
| POST /api/tags | TagResponse | ApiResponse[TagResponse] |
| GET /api/tags | list[TagWithCountResponse] | ApiResponse[list[TagWithCountResponse]] |
| PATCH /api/tags/{id} | TagResponse | ApiResponse[TagResponse] |
| DELETE /api/tags/{id} | 204 No Content | ApiResponse[None] |

### 5.3 Update `app/routers/auth.py`

| Endpoint | Current Response | New Response Model |
|----------|------------------|-------------------|
| POST /api/auth/register | UserResponse | ApiResponse[UserResponse] |
| GET /api/auth/me | UserResponse | ApiResponse[UserResponse] |
| PATCH /api/auth/me | UserResponse | ApiResponse[UserResponse] |
| POST /api/auth/login | 204 No Content | ApiResponse[None] |
| POST /api/auth/logout | 204 No Content | ApiResponse[None] |

---

## Step 6: Update Services to Raise Custom Exceptions

**Files:** `app/services/note_service.py`, `app/services/tag_service.py`, `app/services/auth_service.py`

Replace `ValueError` with appropriate custom exceptions:

```python
# Before
raise ValueError("Note not found")

# After
from app.exceptions import NotFoundException
raise NotFoundException("Note not found")
```

**Exception mapping:**

| Current Error | New Exception |
|---------------|---------------|
| "Note not found" | NotFoundException |
| "Tag not found" | NotFoundException |
| "Email already registered" | ConflictException |
| "Tag already exists" | ConflictException |
| "One or more tags do not exist" | BadRequestException |
| "This note is in Trash..." | BadRequestException |
| "Invalid email or password" | UnauthorizedException |
| "Invalid token" | UnauthorizedException |

---

## Files to Create/Modify

### New Files:
1. `app/schemas/response.py` - Generic response schema
2. `app/exceptions.py` - Custom exception classes
3. `app/exception_handlers.py` - Global exception handlers

### Files to Modify:
1. `app/main.py` - Register exception handlers
2. `app/routers/notes.py` - Update all endpoints
3. `app/routers/tags.py` - Update all endpoints
4. `app/routers/auth.py` - Update all endpoints
5. `app/services/note_service.py` - Use custom exceptions
6. `app/services/tag_service.py` - Use custom exceptions
7. `app/services/auth_service.py` - Use custom exceptions

---

## Example Responses

### Success (200)
```json
{
  "status_code": 200,
  "status_message": "Success",
  "error_message": null,
  "response_data": {
    "id": 1,
    "title": "My Note",
    "content": "Note content"
  }
}
```

### Created (201)
```json
{
  "status_code": 201,
  "status_message": "Note created successfully",
  "error_message": null,
  "response_data": {
    "id": 1,
    "title": "My Note"
  }
}
```

### Not Found (404)
```json
{
  "status_code": 404,
  "status_message": "Not Found",
  "error_message": "Note not found",
  "response_data": null
}
```

### Validation Error (422)
```json
{
  "status_code": 422,
  "status_message": "Validation Error",
  "error_message": "title: Field required; content: Field required",
  "response_data": null
}
```

---

## Implementation Order

1. Create `app/schemas/response.py`
2. Create `app/exceptions.py`
3. Create `app/exception_handlers.py`
4. Update `app/main.py`
5. Update services to use custom exceptions
6. Update routers to use ApiResponse wrapper
7. Test all endpoints
