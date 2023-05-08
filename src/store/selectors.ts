import * as Rec from "@effect/data/ReadonlyRecord";
import * as Arr from "@effect/data/ReadonlyArray";
import { pipe } from '@effect/data/Function'
import * as O from "@effect/data/Option";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const selectFilms = createSelector(
  (state: RootState) => state.films.data,
  films => pipe(
    films,
    Rec.toArray,
    Arr.map(([, f]) => f)
  )
)

export const selectViewedFilm = createSelector(
  [(state: RootState) => state.films.data, (state: RootState) => state.films.viewedFilmUrl],
  (films, filmUrl) => pipe(
    O.fromNullable(filmUrl),
    O.flatMap(url => Rec.get(films, url)),
    O.getOrNull
  )
)