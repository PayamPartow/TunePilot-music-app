import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

// if we are playing  AND the activeSong's title is equal to the current list's song title that means we are currently playing it
//  and we want to show the pause icon
const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );

export default PlayPause;
