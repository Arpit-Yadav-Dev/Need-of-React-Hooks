import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";

import useVideoDispatch from "../hooks/VideoDispatch";
import "./AddVideo.css";

const initialState = {
  channel: "Coder Dost",
  time: "1 month ago",
  verified: true,
  title: "",
  views: "",
};

const AddVideo = forwardRef(function AddVideo({ editableVideo }, ref) {
  const [video, setVideo] = useState(initialState);
  const dispatch = useVideoDispatch();

  // const inputRef = useRef(null)

  const iRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        jumpTo() {
          iRef.current.focus();
        },
      };
    },
    []
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (editableVideo) {
      dispatch({ type: "UPDATE", payload: video });
    } else {
      dispatch({ type: "ADD", payload: video });
    }
    setVideo(initialState);
  }

  function handleChange(e) {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (editableVideo) {
      setVideo(editableVideo);
    }

    // inputRef.current.focus()
    // inputRef.current.placeholder = ''
    // "type here".split('').forEach((char, i) => {
    //     setTimeout(() => {
    //         inputRef.current.placeholder = inputRef.current.placeholder + char
    //     }, 900 * i)
    // })
  }, [editableVideo]);

  return (
    <form>
      <input
        type="text"
        ref={iRef}
        onChange={handleChange}
        placeholder="Title"
        value={video.title}
        name="title"
      />
      <input
        type="text"
        onChange={handleChange}
        placeholder="views"
        value={video.views}
        name="views"
      />
      <button onClick={handleSubmit}>
        {editableVideo ? "Update" : "Add"} Video
      </button>
    </form>
  );
});

export default AddVideo;
