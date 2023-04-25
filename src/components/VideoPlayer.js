import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css'

const initText = {
  content:'',
  color:'white',
  fontSize:'15px',
  positionLeft:0,
  positionTop:0
};

export default function VideoPlayer() {
    
  const [videoUrl, setVideoUrl] = useState(null);
  // const [loading , setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const [text,setText] = useState(initText);
  console.log(text)

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
    if(e.target.name === 'positionLeft' || e.target.name === 'positionTop'){
        setText(prevText => { return {...prevText,[e.target.name]:e.target.value+'px'} });
    }else{
        setText(prevText => { return {...prevText,[e.target.name]:e.target.value} });
    }
    
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

        <h2 className="display-3 text-success fw-bold text-center">React Video Player App</h2>

        <div className='col-xs-12 col-md-6'>
            <div className='position-relative overflow-hidden w-100' style={{height:'300px'}}>
                
                {
                    videoUrl && (
                                  <div>
                                    <video className='w-100' height="300" src={videoUrl} ref={videoRef}>
                                        
                                        Your browser does not support the video tag.
                                    </video>
                                    {
                                        text.content && (
                                            <div 
                                                className='overlay-layer'
                                                style={{left:text.positionLeft,
                                                        top:text.positionTop,}}>
                                                <p style={{color:text.color}}>{text.content}</p>
                                            </div>
                                        )
                                    }
                                </div>) || (<div className='w-100 init-background'></div>)
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
                        Upload A New Video
                    </label>
                </div>
                
                {
                    videoUrl && (
                        <div className='my-3'>
                            <button 
                                className='btn btn-success btn-play-pause' 
                                onClick={handlePlayPause}>
                                    {playing ? 'Pause' : 'Play'}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
        <div className='col-xs-12 col-md-6 border p-3 my-4'>

              <div className="container">

                <div className="row align-items-center">

                  <div className="col-xs-12 col-md-6">
                    <label className='form-label'>Add Text</label>
                    <input type="text" name='content' className="form-control" onChange={handleTextChange}/>
                  </div>

                  <div className="col-xs-12 col-md-6">                        
                    <label className='form-label'>Position: Top/Bottom</label>
                    <input 
                      type="number"
                      name='positionTop'
                      className="form-control"
                      value={text.top}
                      onChange={handleTextChange}
                    />                                                  
                  </div>

                </div>
              </div>

              <div className="container">
                <div className="row align-items-center">

                  
                  <div className="col-xs-12 col-md-6">
                    <label className='form-label'>Choose Text Color</label>
                    <input 
                        type="color"
                        name='color' 
                        className="form-control form-control-color"
                        value={text.color}
                        onChange={handleTextChange}/>
                    
                  </div>

                  <div className="col-xs-12 col-md-6">
                    <label className='form-label'>Position: Left/Right</label>
                    <input 
                      type="number"
                      name='positionLeft'
                      className="form-control"
                      value={text.left}
                      onChange={handleTextChange}
                    />
                  </div>

                </div>
              </div>
              
        </div>
      </div>
    </div>
  );
}

 