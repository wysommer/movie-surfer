"use client"

import { useState } from "react"
import { SearchBar } from "@/components/SearchBar"
import { MovieGrid } from "@/components/MovieGrid"
import { MovieSearchResult } from "@/types/movie"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AnimatedBackground } from "@/components/AnimatedBackground"

export default function Home() {
  const [movies, setMovies] = useState<MovieSearchResult[]>([])
  const router = useRouter()

  const handleSearchResults = (results: MovieSearchResult[]) => {
    setMovies(results)
  }

  const handleError = (message: string) => {
    toast.error(message)
  }

  const handleViewDetails = (imdbId: string) => {
    router.push(`/movie/${imdbId}`)
  }

  return (
    <>
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
          Movie Surfer
        </h1>
        <SearchBar onSearchResults={handleSearchResults} onError={handleError} />
        {movies.length > 0 && (
          <MovieGrid movies={movies} onViewDetails={handleViewDetails} />
        )}
      </div>
    </>
  )
}
