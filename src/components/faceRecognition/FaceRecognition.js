import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({boxes, imageUrl}) => {
	let box = [];
	for (let i = 0; i < boxes.length; i++) {
		box.push(<div className='bounding-box' style={{top: boxes[i].topRow, right: boxes[i].rightCol, bottom:boxes[i].bottomRow, left:boxes[i].leftCol}} key={i}></div>);
	}
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' src={imageUrl} alt='foto' width='500px' height='auto' className='white' />
				{box}			
			</div>
		</div>
	);
}

export default FaceRecognition;