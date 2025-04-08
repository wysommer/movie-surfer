"use client"

import { MovieSearchResult } from "@/types/movie"
import { MovieCard } from "./MovieCard"

interface MovieGridProps {
  movies: MovieSearchResult[]
  onViewDetails: (imdbId: string) => void
}

export function MovieGrid({ movies, onViewDetails }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
      {movies.slice(0, 6).map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
} 