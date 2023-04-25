import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Film } from "../schema";
import * as Rec from "@effect/data/ReadonlyRecord";

export type FilmsState = {
    status?: 'loading' | 'success' | 'error'
    data: Record<string, Film> 
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
        }
    }
})

export const { setFilmsData, setFilmsError, setFilmsLoading } = filmSlice.actions

export const filmsReducer = filmSlice.reducer