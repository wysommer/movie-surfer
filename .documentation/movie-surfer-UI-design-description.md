# Movie Surfer – User Interface Design Document

## Layout Structure

- **Top Navigation Bar**: Fixed at the top, includes app title/logo, a prominent search input, and a filter button or dropdown.
- **Main Search Results Area**: Responsive grid of large movie posters (2–3 columns on desktop, 1 column on mobile).
- **Filter Overlay or Panel**: Slide-in or dropdown panel for genre, rating, and year filters.
- **Movie Detail View**: Full-screen modal or page overlay triggered on movie click, featuring scrollable content with full metadata.
- **Back to Results Control**: Floating back button or "X" icon to close detail view and return to search results.

---

## Core Components

- **Search Bar**: Large, centered input with instant feedback on typing.
- **Filter Controls**: Genre, rating, and year filters via dropdowns or tag-style selectors.
- **Movie Card**:
  - Poster image (dominant visual)
  - Movie title and release year (overlaid or shown on hover)
  - “Learn More” button
- **Movie Detail View**:
  - Large poster image
  - Title, year, genre, runtime, rating
  - Description (plot)
  - Cast and director
  - Styled metadata section with icons or labels

---

## Interaction Patterns

- **Search-as-you-type** with throttling (API call delay for better UX).
- **Hover Effects**: Slight zoom and title overlay on poster cards.
- **Smooth Transitions**: Fade or slide-in animations when switching from search results to movie detail view.
- **Filter Changes**: Instantly re-render the result grid with new matches.
- **Full-screen Modal**: Block scrolling in the background, allow scroll within detail view.

---

## Visual Design Elements & Color Scheme

- **Theme**: Modern and cinematic.
- **Primary Background**: Light (off-white or light beige)
- **Primary Accent Color**: Orange (#f97316 or similar)
- **Secondary Accents**: Muted grays and soft blacks for contrast and text
- **Posters**: High-res images with subtle box shadows
- **Cards**: Rounded corners, soft shadows, hover glow effects

---

## Mobile, Web App, Desktop Considerations

- **Mobile**:
  - Collapsible filters under a button
  - Single-column poster grid
  - Full-screen modal with vertical scroll
- **Web App/Desktop**:
  - Multi-column poster grid (2–3 columns)
  - Inline filters or sidebar for large screens
  - Rich hover effects and transitions
- **Responsiveness**: All layouts must adapt smoothly with fluid spacing and breakpoint-aware design

---

## Typography

- **Primary Font**: Sans-serif (e.g., Inter, Helvetica, or system default)
- **Movie Titles**: Bold, large (20–24px)
- **Metadata**: Regular weight, small caps or label-style
- **Descriptions**: Medium weight, readable line height (~1.5), 16–18px

---

## Accessibility

- **Color Contrast**: High contrast between text and background
- **Keyboard Navigation**: Fully navigable via keyboard (tab, enter, esc)
- **ARIA Labels**: For search input, filters, buttons, and modal
- **Responsive Touch Targets**: Buttons and filters with minimum 44px tap targets
- **Motion Sensitivity**: Reduced motion setting disables transitions where applicable