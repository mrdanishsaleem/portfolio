import { FC, useState, useEffect } from "react";

import type { NowPlayingSong } from "../../@types/now-playing-song.type";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const SpotifyCard: FC = () => {
  const [data, setData] = useState<NowPlayingSong>();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/now-playing");
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="font-sen mb-8 flex flex-row items-center justify-center gap-x-2 rounded-md bg-zinc-800 px-3 py-2 text-center text-lg text-gray-300">
        {data?.isPlaying ? (
          <>
            <Image
              src={data?.albumImageUrl}
              height="50"
              width="50"
              className="rounded-md"
              alt="spotfiy"
            />

            <Link href={data?.songUrl} passHref>
              <p className="w-4/5  cursor-pointer">
                Listening to <span className=" text-white">{data?.title}</span>
                <p>
                  by <span className=" text-white">{data?.artist}</span>
                </p>
              </p>
            </Link>
          </>
        ) : (
          <>
            <Image
              src="/assests/spotify.svg"
              width="20"
              height="20"
              alt="spotify icon"
            />
            <p>Not listening to anything</p>
          </>
        )}
      </div>
    </>
  );
};

export default SpotifyCard;
