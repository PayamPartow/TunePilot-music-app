import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

// how redux works:
// we have one huge global state think of it as a CAKE
// we have to decide which slice we would like to use
// we do that using the useSelector function
// CAKE = {
//   CHOCO: MUSIC PLAYER FUNCTIONALITY
//   VANILLA: SHAZAM CORE FUNCTIONALITY

// }

const Discover = () => {
  const dispatch = useDispatch();

  // continuing from the redux explanation the state here is like the entire CAKE
  // so its like saying (CAKE)=> CAKE.VANILLA so we are pulling the vanilla slice info from the entire state
  // specifically in this case we want to get activesong and isplaying
  // we know our player state has all of this because if the imported playerSlice from redux-toolkit in features folder
  // now that we have these info we can pass them to our songcard component on the bottom
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop";

  // console.log(data);

  // check to see if we are still fetching data we show a loader component
  if (isFetching) return <Loader title="Loading songs..." />;
  // check to see if we got an error then show the error component
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      Discover
      <div
        className="w-full flex justify-between items-center
        sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={() => {}}
          value="pop"
          className="bg-black text-gray-300 p-3 text-sm rounded-lg 
            outline-none sm:myt-0 mt-5"
        >
          {/* using maping to map the objects in genres to have the option tag */}
          {/* choosing the key to be genre.value so when we select each genre that value is applied */}
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* mapping the data coming from the API response */}
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            // after adding these two properties we can use them in out handlePauseClick and handlePlayClick in the
            // songCard component itself
            isPlaying={isPlaying}
            activeSong={activeSong}
            // also passing the entire data object
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
