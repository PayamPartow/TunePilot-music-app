// gives us access to the song id we have in our url bar
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
const ArtistDetails = () => {
  //    songid key has been specified in the routing section of App
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // note that if song id is being passed here as destructured object it should also be
  // passed the same way in the API endpoint in shazamCore
  // songData is the song object we get from shazam API using the songid
  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetArtistDetailsQuery(artistId);

  console.log(artistData?.data[0]?.views?.playlists);

  // console.log(songid);

  // handling loader when fetching data
  if (isFetchingArtistDetails) return <Loader title="Loading artist details" />;

  // handling error while fetching data
  // if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistData?.data[0].views["top-songs"]?.data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
