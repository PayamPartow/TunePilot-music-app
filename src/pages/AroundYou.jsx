import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

import React from "react";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // check to see if we are getting the country in our API response
  console.log(country);

  // to fetch songs around us we need to know where we are (our location)
  // useEffect ran once user visits this page and we recall it once the country changes
  // inside the useEffect we want to make an API call to the geo.ipify.org API
  // get the API key from the My Subscription page on the mentioned website
  useEffect(() => {
    // note: remove the ip address part from the API request
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_2LQrT1uyGzh07YsuhNEGpHBOkYQdX&`
      )
      // our API key is :at_2LQrT1uyGzh07YsuhNEGpHBOkYQdX
      // accessing the country from our response
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      // if the response is successful or if there is an error we are setting the loading to false
      .finally(() => setLoading(false));
  }, [country]);

  //   passing country as the parameter for our querry
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <span className="font-black "> {country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
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
  );
};

export default AroundYou;
