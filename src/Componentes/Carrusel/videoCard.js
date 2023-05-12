import styled from "styled-components";
import ReactPlayer from "react-player";

const VideoCard = () =>{
    const VideoBackground = styled.div`
        //position: absolute;
        //top: 0;
        //left: 0;
        //width: 100%;
        //height: 100%;
        //z-index: -1;
        padding: 0 15px;
    `;

    
    //const filteredCards = card.filter(card => card.video === video);
    
    return <VideoBackground >
        <ReactPlayer 
            url={"https://www.youtube.com/watch?v=Qgqk96TJZyI?rel=0"}
            controls
            volume="0.5"
        />
        
        
    </VideoBackground>
       
}

export default VideoCard