export class FetchError extends Error {}
export class RequestError extends Error {}
export class DataError extends Error {}

export type ApiError = FetchError | RequestError | DataError