import * as S from "@effect/schema/Schema";
import { FetchError, RequestError } from "./errors";
import { FilmResultsSchema } from "../schema";


const swapiFetch = (url: string, signal?: AbortSignal) => fetch(url, {signal})
    .catch(e => {
        throw new FetchError()
    })
    .then(async res => {
        if (res.status === 200 || res.status === 304) {
            try {
                return await (res.json() as Promise<unknown>);
            } catch (e) {
                throw new RequestError();
            }
        }
        throw new RequestError()
    })    
    
    
export const getFilms = (signal?: AbortSignal) => swapiFetch(`https://swapi.dev/api/films`, signal)
    .then(S.parse(FilmResultsSchema))
    .then(data => data.results)
