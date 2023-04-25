import * as S from "@effect/schema/Schema";

// export const FilmUrlSchema = pipe(
//     S.string,
//     S.brand("FilmUrl")
// )

// export type FilmUrl = S.To<typeof FilmUrlSchema>

// export const CharacterUrlSchema = pipe(
//     S.string,
//     S.brand("CharacterUrl")
// )

// export type CharacterUrl = S.To<typeof CharacterUrlSchema>

// export const SpeciesUrlSchema = pipe(
//     S.string,
//     S.brand("SpeciesUrl")
// )

// export type SpeciesUrl = S.To<typeof SpeciesUrlSchema>

// export const PlanetUrlSchema = pipe(
//     S.string,
//     S.brand("PlanetUrl")
// )

// export type PlanetUrl = S.To<typeof PlanetUrlSchema>

export const FilmSchema = S.struct({
    url: S.string,
    episode_id: S.number,
    title: S.string,
    release_date: S.string,
    director: S.string,
    producer: S.string,
    opening_crawl: S.string,
    characters: S.array(S.string),
    species: S.array(S.string),
    planets: S.array(S.string),
})

export type Film = S.To<typeof FilmSchema>

export const FilmResultsSchema = S.struct({
    results: S.array(FilmSchema)
})

