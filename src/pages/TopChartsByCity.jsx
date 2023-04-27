import { useSelector } from "react-redux";
import {
  Error,
  Loader as LoaderComponent,
  SongCard,
  GoogleMapComponent,
} from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import "tailwindcss/tailwind.css";

import React from "react";

const TopChartsByCity = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  //   passing country as the parameter for our querry
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <LoaderComponent title="Loading Top Charts" />;
  if (error) return <Error />;

  return (
    // <div className="flex flex-col">
    //   <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
    //     Discover Top Charts in
    //   </h2>

    //   <div className="flex flex-wrap sm:justify-start justify-center gap-8">
    //     {data?.map((song, i) => (
    //       <SongCard
    //         key={song.key}
    //         song={song}
    //         i={i}
    //         isPlaying={isPlaying}
    //         activeSong={activeSong}
    //         data={data}
    //       />
    //     ))}
    //   </div>
    //  </div>
    <div className="h-screen mt-10 mb-10 max-h-[32rem] place-items-center">
      <GoogleMapComponent />
    </div>
  );
};

export default TopChartsByCity;
