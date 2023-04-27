import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// used for making API calls
// got the code snippet from rapid API
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '0636920cccmsh0cef4d77b53a792p15db21jsn2a7baebd0440',
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
//   };

//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

// can find this code on the redux toolkit documentation https://redux-toolkit.js.org/rtk-query/api/createApi
export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi", // name of our API
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/", // this is always going to be out base query and then different end points are going to be added to it
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "0636920cccmsh0cef4d77b53a792p15db21jsn2a7baebd0440"
      );

      return headers;
    },
  }),
  // building all the endpoints of the API we want to call
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "v1/charts/world" }), // note that query is a function that returs string
    getSchemaCities: builder.query({ query: () => "v1/frame/cities" }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    // track_id is a parameter in the track details API
    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `v1/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSchemaCitiesQuery,
  useGetSongsByGenreQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi; //now we can use getTopcharts as a hook
