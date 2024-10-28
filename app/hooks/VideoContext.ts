import { createContext,useContext } from "react";

export type Video = {
    id:number,
    tag_list:string[],
    title:string,
    mux_playback_id:string
}
type Videos = {
    videos:Video[]
}

const VideoContext = createContext<Videos|undefined>(undefined)


export const GetVideoContext=()=>useContext(VideoContext);
export default VideoContext;