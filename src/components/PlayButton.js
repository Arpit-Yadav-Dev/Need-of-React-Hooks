import { memo, useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import "./PlayButton.css";


const PlayButton = memo(function PlayButton({ children, onPlay, onPause }) {
    console.log('playbutton')
    const themecontext = useContext(ThemeContext)

    // let playing = false;
    const [playing, setPlaying] = useState(false)
    function handleclick(e) {
        e.stopPropagation()
        // console.log(message)
        if (playing) onPause()
        else onPlay();
        setPlaying(!playing)
    }

    return (
        <button className={themecontext} onClick={handleclick}>
            {children} {playing ? '||' : '>'}
        </button>
    )
})


export default PlayButton
