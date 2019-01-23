import React from 'react';
import ProfileIcon from '../profile/ProfileIcon';

const Navigation = ({onRouteChange, isSignedIn, toggleModal, imgSource }) => {
	
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<ProfileIcon 
					onRouteChange={onRouteChange}
					toggleModal={toggleModal}
					imgSource={imgSource}
				/>
			</nav>
		);
			
	} else {

		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className ='f3 link dim white underline pa3 pointer' onClick={() => onRouteChange('signin')} >Logue</p>
				<p className ='f3 link dim white underline pa3 pointer' onClick={() => onRouteChange('register')} >Registre-se</p>
			</nav>
		);
	}
}

export default Navigation;