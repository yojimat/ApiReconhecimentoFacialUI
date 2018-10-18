import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			email: '',
			senha: ''
		}
	}

	onNameChange = (event) => {
		this.setState({nome: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({senha: event.target.value});
	}

	onSubmitRegister = () => {
		console.log(this.state);
		fetch('https://frozen-caverns-42300.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				senha: this.state.senha,
				nome: this.state.nome
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			});
	}

	render() {
		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Registro</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Nome</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="text" 
					        	name="name" 
					        	id="name"
					        	onChange={this.onNameChange} 
					        />
					      </div>
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
					      <input 
					      	className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Feito!" 
					      	onClick={this.onSubmitRegister}/>
					    </div>
					</div>
				</main>
			</article>
		);
	}
}
export default Register;