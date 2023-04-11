// gives us access to the song id we have in our url bar
import { useParams } from "react-router-dom";

const SongDetails = () => {
  //    songid key has been specified in the routing section of App
  const { songid } = useParams();

  console.log(songid);
  return <div>SongDetails</div>;
};

export default SongDetails;
