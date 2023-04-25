import { useAppSelector } from "./hooks";
import * as Rec from "@effect/data/ReadonlyRecord";
import * as Arr from "@effect/data/ReadonlyArray";
import { pipe } from '@effect/data/Function'
import * as O from "@effect/data/Option";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const useFilms = () => useAppSelector(state => pipe(
    state.films.data,
    Rec.toArray,
    Arr.map(([, f]) => f)
))

export const selectFilms = createSelector(
    (state: RootState) => state.films.data,
    record => pipe(
        record,
        Rec.toArray,
        Arr.map(([, f]) => f)
    )
)

export const useFilm = (url: string) => useAppSelector(state => pipe(
    state.films.data,
    Rec.get(url),
    O.getOrNull
))