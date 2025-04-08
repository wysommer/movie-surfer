import { MovieSearchResponse, MovieDetails } from "@/types/movie"

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY
const OMDB_BASE_URL = "https://www.omdbapi.com"

export async function searchMovies(query: string): Promise<MovieSearchResponse> {
  const response = await fetch(
    `${OMDB_BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`
  )
  const data = await response.json()
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movies")
  }
  
  return data
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails> {
  const response = await fetch(
    `${OMDB_BASE_URL}/?i=${imdbId}&apikey=${OMDB_API_KEY}`
  )
  const data = await response.json()
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details")
  }
  
  return data
} 