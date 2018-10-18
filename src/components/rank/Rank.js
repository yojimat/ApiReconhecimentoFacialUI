import React from 'react';

const Rank = ({nome, postagens}) => {
	return (
		<div>
			<div className='white f3'>
				{`${nome} , você ja postou...`}
			</div>
			<div className='white f1'>
				{`${postagens} fotos.`}
			</div>
		</div>
	);
}

export default Rank;