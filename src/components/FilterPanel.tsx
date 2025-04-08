"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MovieSearchResult } from "@/types/movie"
import { X } from "lucide-react"

interface FilterPanelProps {
  movies: MovieSearchResult[]
  onFilterChange: (filteredMovies: MovieSearchResult[]) => void
}

const ALL_YEARS = "all"

export function FilterPanel({ movies, onFilterChange }: FilterPanelProps) {
  const [selectedYear, setSelectedYear] = useState<string>(ALL_YEARS)

  // Get unique years from movies
  const uniqueYears = Array.from(new Set(movies.map(movie => movie.Year)))
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    if (year === ALL_YEARS) {
      onFilterChange(movies) // Reset to show all movies
    } else {
      const filtered = movies.filter(movie => movie.Year === year)
      onFilterChange(filtered)
    }
  }

  const clearFilters = () => {
    setSelectedYear(ALL_YEARS)
    onFilterChange(movies)
  }

  return (
    <div className="flex items-center gap-4 w-full max-w-2xl mx-auto mb-6">
      <div className="flex-1 flex items-center gap-4">
        <Select value={selectedYear} onValueChange={handleYearChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_YEARS}>All Years</SelectItem>
            {uniqueYears.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedYear !== ALL_YEARS && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-orange-600 hover:text-orange-700"
        >
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )
} 