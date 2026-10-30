const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=ka-GE&page=1`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`ფილმების ჩატვირთვა ვერ მოხერხდა: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?language=ka-GE&page=1`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `მომავალი ფილმების ჩატვირთვა ვერ მოხერხდა: ${response.status}`,
    );
  }

  const data = await response.json();
  return (data.results || []).slice(0, 5);
};

export const getMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?language=ka-GE&sort_by=popularity.desc&page=1`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`ფილმების სიის ჩატვირთვა ვერ მოხერხდა: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};

export const getTvShows = async () => {
  const response = await fetch(`${BASE_URL}/tv/popular?language=ka-GE&page=1`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`სერიალების ჩატვირთვა ვერ მოხერხდა: ${response.status}`);
  }

  const data = await response.json();

  return data.results || [];
};
