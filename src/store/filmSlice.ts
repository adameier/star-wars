import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Film } from "../schema";
import * as Rec from "@effect/data/ReadonlyRecord";

export type FilmsState = {
  status?: 'loading' | 'success' | 'error'
  data: Record<string, Film>
  viewedFilmUrl?: string
} 


const initialState: FilmsState = {
  data: {}
}

export const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilmsLoading: (state) => {
      state.status = 'loading'
    },
    setFilmsData: (_, action: PayloadAction<readonly Film[]>) => ({
      status: 'success',
      data: Rec.fromIterable(action.payload, film => [film.url, film])
    }),
    setFilmsError: (state) => {
      state.status = 'error'
    },
    filmsRequestCanceled: (state) => {
      state.status = undefined
    },
    setViewedFilmUrl: (state, action: PayloadAction<string>) => {
      state.viewedFilmUrl = action.payload
    },
    clearViewedFilmUrl: (state) => {
      state.viewedFilmUrl = undefined
    }
  }
})

export const { setFilmsData, setFilmsError, setFilmsLoading, setViewedFilmUrl, clearViewedFilmUrl, filmsRequestCanceled } = filmSlice.actions

export const filmsReducer = filmSlice.reducer