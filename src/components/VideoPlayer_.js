import React, { useState } from 'react'

export default function () {
    const [video,setVideo] = useState(null);
    // console.log(videoUrl)
   
    const handleChange = (e) => {
        setVideo(e.target.files[0])
    } 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', video);
        try {
            const response = await fetch('http://localhost:3001/', {
                mode: 'no-cors',
                method: 'POST',
                body: formData
            });
            console.log(response)
            if (response.ok) {
                // handle successful response from server
                console.log('Video uploaded successfully!');
            } else {
                // handle error response from server
                console.log('Error uploading video!');
            }
            console.log(response)
        } catch (error) {
            // handle network errors
            console.log('Network error:', error);
        }
    }
  return (
    <div>
        <div className='container'>
            <div className='row justify-content-center align-items-center'  style={{height:'600px'}}>
                <div className='col-md-4'>
                    <video width="420" height="300" controls>
                        <source src="movie.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>

                    <form action="" onSubmit={handleSubmit}>
                        <input type='file' accept='video/*' className='my-3' onChange={handleChange}/>

                        <button className='btn btn-primary my-1'>
                            Upload  &nbsp;
                            <i className='fa fa-upload'></i>
                        </button>
                    </form>

                </div>
            </div>
        </div>
    </div>
  )
}
