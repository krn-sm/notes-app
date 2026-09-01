import api from "./api"

export type Tag = {
  id: number
  name: string
}

export type TagWithCount = Tag & {
  note_count: number
}

type CreateTagData = {
  name: string
}

type UpdateTagData = {
  name: string
}

export const getTags = async (): Promise<
  TagWithCount[]
> => {
  return api<TagWithCount[]>(
    "/api/tags",
  )
}

export const createTag = async (
  data: CreateTagData,
): Promise<Tag> => {
  return api<Tag>(
    "/api/tags",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  )
}

export const updateTag = async (
  tagId: number,
  data: UpdateTagData,
): Promise<Tag> => {
  return api<Tag>(
    `/api/tags/${tagId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  )
}

export const deleteTag = async (
  tagId: number,
): Promise<void> => {
  return api<void>(
    `/api/tags/${tagId}`,
    {
      method: "DELETE",
    },
  )
}