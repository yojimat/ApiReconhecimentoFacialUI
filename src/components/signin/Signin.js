import React from 'react';
import './Signin.css';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://frozen-caverns-42300.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				senha: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			} else {
				this.props.onRouteChange('signin');
			}
		});
	}

	render() {
		const { onRouteChange } = this.props;

		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Acesso</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
					        <input  
					        	className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        	onChange={this.onEmailChange}
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Senha</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	onChange={this.onPasswordChange} 
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" type="submit" value="Logue" onClick={this.onSubmitSignIn}/>
					    </div>
					    <div className="lh-copy mt3">
					      <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer">Registre-se</p>
					    </div>
					</div>
				</main>
			</article>
		);
	}	
}
export default Signin;