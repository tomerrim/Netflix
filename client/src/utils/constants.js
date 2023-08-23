export const HEADER_ITEMS = [
  { title: "Movies", path: "/movies" },
  { title: "Series", path: "/series" },
];

export const RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

export const FILTERS = [
  "All Genres",
  "Action",
  "Comedy",
  "Fantasy",
  "Detective",
  "Horror",
  "Animation",
];