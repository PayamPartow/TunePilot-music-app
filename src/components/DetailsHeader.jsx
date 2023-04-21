import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  // const artist = artistData?.artists[artistId]?.attributes;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center ">
        <img
          alt="art"
          src={
            artistId
              ? // using the artist object we created above
                artistData?.data[0].attributes?.artwork?.url
                  // replacing the width and height of the artwork image
                  .replace("{width}", "500")
                  .replace("{height}", "500")
              : songData?.images?.coverart
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black "
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {/* dynamically showuing the song title */}
            {artistId ? artistData?.attributes?.name : songData?.title}
          </p>
          {!artistId && (
            // linking us to artist details page upon clicking on the subtitle
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.subtitle}
              </p>
            </Link>
          )}
          {artistId && (
            // linking us to artist details page upon clicking on the subtitle

            <p className="font-bold text-2xl text-gray-400 mt-2">
              {artistData?.data[0]?.attributes?.name}
            </p>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
