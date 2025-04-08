"use client"

import Image from "next/image"
import { MovieSearchResult } from "@/types/movie"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='450' viewBox='0 0 300 450'%3E%3Crect width='300' height='450' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E"

interface MovieCardProps {
  movie: MovieSearchResult
  onViewDetails: (imdbId: string) => void
}

export function MovieCard({ movie, onViewDetails }: MovieCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm bg-white/50 hover:bg-white/60 border-white/20">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER_IMAGE}
            alt={movie.Title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{movie.Title}</h3>
        <p className="text-sm text-muted-foreground">{movie.Year}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="secondary" 
          className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-700"
          onClick={() => onViewDetails(movie.imdbID)}
        >
          <Info className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
} 