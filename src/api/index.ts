import * as S from "@effect/schema/Schema";
// import { FetchError, RequestError } from "./errors";
import { FilmResultsSchema } from "../schema";
import { ofetch, FetchOptions } from 'ofetch'

export class ParseError extends Error {}

export const getFilms = (options: FetchOptions) => ofetch(`https://swapi.dev/api/films`, options)
  .then(body => S.parsePromise(FilmResultsSchema)(body)
    .catch(() => {
      throw new ParseError()
    })
  )
  .then(data => data.results)