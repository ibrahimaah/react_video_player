import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css'
export default function VideoPlayer() {
    
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading , setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const [text,setText] = useState('');

  function handleVideoChange(e) {
    if (e.target.files.length !== 0) {
        let file = URL.createObjectURL(e.target.files[0]);
        setVideoUrl(file);
      } 
  }

  //for performance purposes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [handleVideoChange]);

  function handleTextChange(e){
    setText(e.target.value);
  }

  function handlePlayPause(){
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }
  return (
    <div className='container'>
        <div className='row justify-content-center align-items-center'  style={{height:'600px'}}>
            <div className='col-md-6'>
                <div className='position-relative w-100' style={{height:'300px'}}>
                    {
                        videoUrl && (
                                     <div>
                                        <video className='w-100' height="300" src={videoUrl} ref={videoRef}>
                                            
                                            Your browser does not support the video tag.
                                        </video>
                                        {
                                            text && (
                                                <div className='m-auto mt-1 overlay-layer position-absolute d-flex justify-content-center'>
                                                    <p className='text-light'>{text}</p>
                                                </div>
                                            )
                                        }
                                    </div>) 
                    }
                        
                        
                </div>
                <div className='d-flex justify-content-between'>
                    
                    <div className="custom-file my-3">
                        <input 
                            type="file"
                            accept='video/*'
                            className="custom-file-input"
                            id="customFile" 
                            onChange={handleVideoChange} 
                        />
                        <label 
                            className="custom-file-label" 
                            htmlFor="customFile" >
                            Upload A New Video <i className='fa fa-upload'></i>
                        </label>
                    </div>
                    
                    {
                        videoUrl && (
                            <div className='my-3'>
                                <button 
                                    className='btn btn-success btn-play-pause' 
                                    onClick={handlePlayPause}>
                                        {playing ? (<span>  <i className='fa fa-pause'></i></span>) : (<span>  <i className='fa fa-play'></i></span>)}
                                </button>
                            </div>
                        )
                    }
                </div>
                <div>
                    <input type="text" onChange={handleTextChange} />
                </div>
            </div>
        </div>
    </div>
  );
}

 