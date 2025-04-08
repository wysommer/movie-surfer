"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { searchMovies } from "@/lib/api"
import { MovieSearchResult } from "@/types/movie"

interface SearchBarProps {
  onSearchResults: (results: MovieSearchResult[]) => void
  onError: (message: string) => void
}

export function SearchBar({ onSearchResults, onError }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const data = await searchMovies(query)
      onSearchResults(data.Search)
    } catch (error) {
      onError(error instanceof Error ? error.message : "Failed to search movies")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-2xl mx-auto gap-2">
      <Input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        disabled={isLoading}
      />
      <Button onClick={handleSearch} disabled={isLoading}>
        <Search className="h-4 w-4 mr-2" />
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </div>
  )
} 