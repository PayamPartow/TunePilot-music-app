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
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
  }),
});

export const { useGetTopChartsQuery, useGetArtistDetailsQuery } = shazamCoreApi; //now we can use getTopcharts as a hook
