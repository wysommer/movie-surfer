"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/SearchBar"
import { MovieGrid } from "@/components/MovieGrid"
import { MovieSearchResult } from "@/types/movie"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { searchMovies } from "@/lib/api"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { FilterPanel } from "@/components/FilterPanel"

// Some popular movies to show as featured
const FEATURED_MOVIE_TITLES = [
  "Inception",
  "The Matrix",
  "Interstellar"
]

export default function Home() {
  const [movies, setMovies] = useState<MovieSearchResult[]>([])
  const [filteredMovies, setFilteredMovies] = useState<MovieSearchResult[]>([])
  const [featuredMovies, setFeaturedMovies] = useState<MovieSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const moviePromises = FEATURED_MOVIE_TITLES.map(title => searchMovies(title))
        const results = await Promise.all(moviePromises)
        // Take the first movie from each search result
        const featured = results.map(result => result.Search[0])
        setFeaturedMovies(featured)
      } catch (error) {
        toast.error("Failed to load featured movies")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedMovies()
  }, [])

  const handleSearchResults = (results: MovieSearchResult[], term: string) => {
    setMovies(results)
    setFilteredMovies(results) // Initialize filtered results with all results
    setSearchTerm(term)
    setIsSearching(true)
  }

  const handleFilterChange = (filtered: MovieSearchResult[]) => {
    setFilteredMovies(filtered)
  }

  const handleError = (message: string) => {
    toast.error(message)
  }

  const handleViewDetails = (imdbId: string) => {
    router.push(`/movie/${imdbId}`)
  }

  const displayedMovies = isSearching ? filteredMovies : featuredMovies

  return (
    <>
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
          Movie Surfer
        </h1>
        <SearchBar onSearchResults={handleSearchResults} onError={handleError} />
        
        {!isSearching && (
          <div className="mt-12 mb-4">
            <h2 className="text-2xl font-semibold text-center mb-6">Featured Movies</h2>
            {isLoading ? (
              <div className="mt-8">
                <LoadingSpinner />
              </div>
            ) : featuredMovies.length > 0 && (
              <MovieGrid movies={featuredMovies} onViewDetails={handleViewDetails} />
            )}
          </div>
        )}

        {isSearching && movies.length > 0 && (
          <>
            <div className="mt-12 mb-4">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Movies with &quot;{searchTerm}&quot; in the title
              </h2>
              <FilterPanel 
                movies={movies} 
                onFilterChange={handleFilterChange}
              />
            </div>
            {filteredMovies.length > 0 ? (
              <MovieGrid movies={filteredMovies} onViewDetails={handleViewDetails} />
            ) : (
              <p className="text-center text-muted-foreground">
                No movies match the selected filters
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
