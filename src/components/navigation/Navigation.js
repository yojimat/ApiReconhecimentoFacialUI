import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
	
	if(isSignedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className ='f3 link dim white underline pa3 pointer' onClick={() => onRouteChange('signout')} >sair?</p>
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