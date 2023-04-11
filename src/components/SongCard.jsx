import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

// passing over isPlaying activeSong , i and data objects over from the Discover module
const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  // back to the CAKE analogy from Discover
  // CAKE -> SELECTORS (PIECES)
  // DISPATCH (ADD CHOCOLATE POWDER)
  // DISPATCH (ADD CHOCOLATE DRESSING)
  // basically dispatch lets us add something to the slices and then use them later on
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm 
animate-slideup rounded-lg cursor-pointer"
    >
      {/* relative makes iit the parent */}
      <div className="relative w-full h-56 group">
        {/* checking to see if the song that is currently showing is the song that is currently playing */}
        {/* absolute makes it the relative's child */}
        {/* Use absolute to position an element outside of the normal flow of the document, 
        causing neighboring elements to act as if the element doesn’t exist. */}
        <div
          className={`absolute inset-0 justify-center items-center
       bg-black bg-opacity-50 group-hover:flex ${
         activeSong?.title === song.title
           ? "flex bg-black bg-opacity-70"
           : "hidden"
       }`}
        >
          {/* passing props to playpause including functions that are going to handle playpause functionality */}
          {/* also passing the isPlaying and activeSong property which we passed over from Discover */}
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          className="rounded-lg"
          src={song.images?.coverart}
          alt={song?.title}
        />
      </div>
      <div className="mt-4 flex flex-col">
        {/* truncate cuts off the text and replaces it with ... if its too long */}
        <p className="font-semibold text-lg text-white truncate">
          {/* linking us to a specific songs details page */}
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1 ">
          <Link
            to={
              song.artist
                ? `/artist/${song?.artist[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
