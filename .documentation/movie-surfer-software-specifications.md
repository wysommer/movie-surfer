# Movie Surfer – Software Requirements Specification (SRS)

## System Design

- Client-side movie search and filter tool
- Fetches data from OMDb API based on user queries
- No user accounts or backend persistence required
- Focus on smooth UI transitions, filter logic, and responsiveness

---

## Architecture Pattern

- **Frontend Architecture**: Component-based using React via Next.js App Router
- **Pages vs Components**:
  - Pages: `/` (Search + Filters + Results), `/movie/[id]` (Movie detail view)
  - Components: `SearchBar`, `FilterPanel`, `MovieCard`, `MovieModal`, `MovieDetails`
- **Data Fetching Strategy**: Client-side fetching via `fetch()` or `useEffect` on query change
- **Routing**: Handled by Next.js App Router

---

## State Management

- **Local State (via React/Next.js hooks)**:
  - Search term
  - Filter values (genre, rating, year)
  - Search results
  - Selected movie details (for modal or route)
- **Transient State Only**: No persistence or global store needed

---

## Data Flow

- User types a movie title → API call to OMDb → Response rendered as cards
- Filters update local state → Filter logic applied to current results
- Click on “Learn More” → Movie data shown via modal or dynamic route
- All logic remains client-side and synchronous to OMDb API responses

---

## Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (optional but recommended)
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI (Radix + Tailwind-based component library)
- **External API**: OMDb API (`https://www.omdbapi.com/`)

---

## Authentication Process

- **None required** (public client app)
- OMDb API Key required (add to `.env.local`)
  - API Key should be used client-side (no secret keys)

---

## Route Design

- `/` – Home/Search page
  - Search input
  - Filters (genre, year, rating)
  - Results grid of 6 movies
- `/movie/[id]` – Movie detail view
  - Full movie info (poster, description, cast, etc.)
- Optional: modal version using shallow routing for detail view without page reload

---

## API Design

- **Search Endpoint**:
  - `https://www.omdbapi.com/?s={title}&apikey={API_KEY}`
  - Returns up to 10 results; only display first 6
- **Detail Endpoint**:
  - `https://www.omdbapi.com/?i={imdbID}&apikey={API_KEY}`
- **Filter Strategy**:
  - Since OMDb has limited filtering, client-side filtering will be applied to results

---

## Database Design ERD

- **No database required**
- All data is retrieved from OMDb API and handled client-side only