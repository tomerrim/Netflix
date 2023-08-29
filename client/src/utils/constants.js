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
    breakpoint: { max: 1024, min: 876 },
    items: 4,
  },
  mobile1: {
    breakpoint: {max: 876, min: 400},
    items: 3,
  },
  mobile: {
    breakpoint: { max: 400, min: 0 },
    items: 2,
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