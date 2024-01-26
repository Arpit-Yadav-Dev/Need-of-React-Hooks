import Video from "./Video";
import PlayButton from "./PlayButton";
import useVideos from "../hooks/Videos";
import { useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import useVideoDispatch from "../hooks/VideoDispatch";

function VideoList({ editVideo }) {
  // const [videos, setVideos] = useState([])

  const url = "https://my.api.mockaroo.com/you_tube.json?key=11ab7960";
  const videos = useVideos();

  const dispatch = useVideoDispatch();

  useEffect(() => {
    async function getdata() {
      const res = await axios.get(url);
      console.log(res.data);
      dispatch({ type: "LOAD", payload: res.data });
    }
    getdata();
  }, [dispatch]);

  const play = useCallback(() => console.log("play"), []);
  const Pause = useCallback(() => console.log("Pause"), []);

  const memoButton = useMemo(
    () => (
      <PlayButton onPlay={play} onPause={Pause}>
        Play
      </PlayButton>
    ),
    [Pause, play]
  );

  return (
    <>
      {videos.map((video) => (
        <Video
          key={video.id}
          id={video.id}
          title={video.title}
          views={video.views}
          channel={video.channel}
          time={video.time}
          verified={video.verified}
          editVideo={editVideo}
        >
          {memoButton}
        </Video>
      ))}
    </>
  );
}
export default VideoList;
