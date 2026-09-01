import api from "./api"

import type {
  TagWithCount,
} from "./tagService"

export type Note = {
  id: number
  user_id: number
  title: string
  content: string

  is_favorite: boolean
  is_deleted: boolean

  tags: TagWithCount[]

  created_at: string
  updated_at: string
}

export type PaginatedNotesResponse = {
  items: Note[]
  total: number
  page: number
  limit: number
  total_pages: number
}

type GetNotesParams = {
  favorite?: boolean
  deleted?: boolean
  tag_id?: number
  q?: string
  page?: number
  limit?: number
}

type CreateNoteData = {
  title: string
  content: string
  tag_ids?: number[]
}

type UpdateNoteData = {
  title?: string
  content?: string
  tag_ids?: number[]
  is_favorite?: boolean
}

export const getNotes = async (
  params: GetNotesParams = {},
): Promise<PaginatedNotesResponse> => {
  const searchParams =
    new URLSearchParams()

  if (params.favorite !== undefined) {
    searchParams.set(
      "favorite",
      String(params.favorite),
    )
  }

  if (params.deleted !== undefined) {
    searchParams.set(
      "deleted",
      String(params.deleted),
    )
  }

  if (params.tag_id !== undefined) {
    searchParams.set(
      "tag_id",
      String(params.tag_id),
    )
  }

  if (params.q) {
    searchParams.set(
      "q",
      params.q,
    )
  }

  if (params.page !== undefined) {
    searchParams.set(
      "page",
      String(params.page),
    )
  }

  if (params.limit !== undefined) {
    searchParams.set(
      "limit",
      String(params.limit),
    )
  }

  const query =
    searchParams.toString()

  return api<PaginatedNotesResponse>(
    `/api/notes${
      query ? `?${query}` : ""
    }`,
  )
}

export const getNote = async (
  noteId: number,
): Promise<Note> => {
  return api<Note>(
    `/api/notes/${noteId}`,
  )
}

export const createNote = async (
  data: CreateNoteData,
): Promise<Note> => {
  return api<Note>(
    "/api/notes",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  )
}

export const updateNote = async (
  noteId: number,
  data: UpdateNoteData,
): Promise<Note> => {
  return api<Note>(
    `/api/notes/${noteId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  )
}

export const deleteNote = async (
  noteId: number,
): Promise<Note> => {
  return api<Note>(
    `/api/notes/${noteId}`,
    {
      method: "DELETE",
    },
  )
}

export const restoreNote = async (
  noteId: number,
): Promise<Note> => {
  return api<Note>(
    `/api/notes/${noteId}/restore`,
    {
      method: "PATCH",
    },
  )
}

export const permanentlyDeleteNote = async (
  noteId: number,
): Promise<void> => {
  return api<void>(
    `/api/notes/${noteId}/permanent`,
    {
      method: "DELETE",
    },
  )
}