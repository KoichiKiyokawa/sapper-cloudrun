type cudAt = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

type ID = string

type RepositoryResponse<T> = { id: ID; data: T }

type DateParsed<T extends Object> = {
  [K in keyof T]: T[K] extends Date ? string : T[K] extends Object ? DateParsed<T[K]> : T[K]
}
type ApiResponse<T> = { id: ID; data: DateParsed<T> }
