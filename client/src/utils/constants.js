export const HEADER_ITEMS = [
  { title: "Movies", path: "/movies" },
  { title: "Series", path: "/series" },
];

export const RESPONSIVE = {
  superLargeDesktop1: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  superLargeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 4,
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