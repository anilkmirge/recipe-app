import React,{useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import VideoPlayer from '../Video/VideoPlayer';


function VideoModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
		<>
    {!props.strYoutube ? 
      <p className='btn btn-danger'>Video not available</p>
      :
      <Button variant='primary' onClick={handleShow}>Watch Video</Button>
    }
			

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton />
				<Modal.Body>
						<VideoPlayer videoUrl={props.strYoutube} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default VideoModal
