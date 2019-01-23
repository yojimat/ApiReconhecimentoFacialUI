import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, imageLinkAnterior=false }) => {
	return (
		<div>
			<p className='f3 white'>
				{'Este cérebro mágico detecta rostos nas fotos! Faça um teste. Por enquanto so aceita links que tem na internet(Facebook, Insta, Etc...).'}
			</p>
			{imageLinkAnterior === true &&
				<span className="white">
					<i>Para atualizar as postagens, atualize o link.</i>
				</span>
			}
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 pv2 dib white  bg-orange' onClick={ onPictureSubmit }>
					<span
						role="img"
						aria-label="pesquisa/lupa"
					>
						🔍
					</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;