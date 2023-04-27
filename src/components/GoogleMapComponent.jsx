import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Client } from "@googlemaps/google-maps-services-js";

import { useSelector } from "react-redux";
import { Error, Loader as LoaderComponent, SongCard } from "../components";
import {
  useGetTopChartsQuery,
  useGetSchemaCitiesQuery,
  useGetSongsByCountryQuery,
} from "../redux/services/shazamCore";
import "tailwindcss/tailwind.css";

const GoogleMapComponent = () => {
  const mapRef = useRef(null);
  const apiKey = "AIzaSyCIUu47vWLM1g67l6FogPtO0lEaxlBxeYA"; // Replace with your API key
  const [markerCountry, setMarkerCountry] = useState(null);

  //   Shazam API related consts

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  //   passing country as the parameter for our querry
  const { data, isFetching, error } = useGetTopChartsQuery();

  const {
    data: cityData,
    isFetching: isFetchingCity,
    error: cityError,
  } = useGetSchemaCitiesQuery();

  //   console.log(cityData);
  useEffect(() => {
    const loader = new Loader({
      apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 1,
      });

      map.addListener("click", async (event) => {
        // newMarker.setMap(null);
        const newMarker = new google.maps.Marker({
          position: event.latLng,
          map: map,
        });

        const client = new Client({});

        try {
          const response = await client.reverseGeocode({
            params: {
              latlng: event.latLng.toJSON(),
              key: apiKey,
            },
          });

          const country = response.data.results.find((result) => {
            return result.types.includes("country");
          });

          if (country) {
            // console.log(country.formatted_address);
            // Call your other API with the country name here
            setMarkerCountry(country.formatted_address);
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  }, []);

  //   console.log(markerCountry);
  //   songCard Logic:

  //  passing the markerCountry which we got from google maps API to the shazam API and find the object with
  // the country name to extract the country code
  let markedCountry = cityData?.find(
    (country) => country?.name === markerCountry
  );
  let markedCountryCode = markedCountry?.code;
  //   console.log(markedCountryCode);

  const {
    data: topSongsData,
    isFetching: isFetchingTopSongsData,
    error: errorTopSongsData,
  } = useGetSongsByCountryQuery(markedCountryCode);

  if (isFetching) return <LoaderComponent title="Loading Top Charts" />;
  if (error) return <Error />;

  return (
    <>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Discover Top Charts in
          <span className="font-black "> {markerCountry}</span>
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {topSongsData?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GoogleMapComponent;
