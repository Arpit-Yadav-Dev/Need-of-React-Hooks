import React, {
  useContext,
  useEffect,
  memo,
  useRef,
  useLayoutEffect,
} from "react";
import ThemeContext from "../context/ThemeContext";
import useVideoDispatch from "../hooks/VideoDispatch";
import "./Video.css";

const Video = memo(function Video({
  id,
  title,
  channel,
  views,
  time = "200 year ago",
  verified,
  children,
  editVideo,
}) {
  const themeContext = useContext(ThemeContext);
  const dispatch = useVideoDispatch();
  console.log("playing video", id);

  // useEffect(() => {
  //     const idx = setInterval(() => {
  //         console.log('playing video', id)
  //     }, 3000)

  //     return () => {

  //         clearInterval(idx)
  //     }
  // }, [id])

  const ref = useRef(null);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    console.log(height);
  }, []);
  return (
    <>
      <div ref={ref} className={`container ${themeContext}`}>
        <button
          className="close"
          onClick={() => dispatch({ type: "DELETE", payload: id })}
        >
          x
        </button>
        <button className="edit" onClick={() => editVideo(id)}>
          edit
        </button>
        <div className="pic">
          <img src={`https://picsum.photos/id/${id}/160/90`} alt="dummy" />
        </div>
        <div className="title">{title}</div>
        <div className="channel">
          {channel} {verified && "✅"}
        </div>

        <div className="views">
          {views} views <span>.</span> {time}{" "}
        </div>
        {children}
      </div>
    </>
  );
});

export default Video;
