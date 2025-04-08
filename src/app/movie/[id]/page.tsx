"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { MovieDetails } from "@/types/movie"
import { getMovieDetails } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star } from "lucide-react"
import Image from "next/image"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { toast } from "sonner"

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(movieId)
        setMovie(details)
      } catch (error) {
        toast.error("Failed to load movie details")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-muted-foreground">Movie not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] w-full max-w-[300px] mx-auto">
            <Image
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
              alt={movie.Title}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>

          {/* Movie Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.Runtime}</span>
                <span>•</span>
                <span>{movie.Rated}</span>
              </div>
            </div>

            {/* Rating */}
            {movie.imdbRating !== "N/A" && (
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{movie.imdbRating}/10</span>
              </div>
            )}

            {/* Plot */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Plot</h2>
              <p className="text-muted-foreground leading-relaxed">{movie.Plot}</p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Genre */}
              <div>
                <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-1">
                  Genre
                </h2>
                <p>{movie.Genre}</p>
              </div>

              {/* Director */}
              <div>
                <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-1">
                  Director
                </h2>
                <p>{movie.Director}</p>
              </div>

              {/* Cast */}
              <div>
                <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-1">
                  Cast
                </h2>
                <p>{movie.Actors}</p>
              </div>

              {/* Awards */}
              {movie.Awards !== "N/A" && (
                <div>
                  <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-1">
                    Awards
                  </h2>
                  <p>{movie.Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 