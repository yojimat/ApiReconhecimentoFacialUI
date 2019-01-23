import React from 'react';
import { FormErrors } from '../formErrors/formErrors';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nome: '',
			email: '',
			senha: '',
			formErrors: {Email: '', Password: '', Name: ''},
    		emailValid: false,
    		passwordValid: false,
    		nameValid: false, 
    		formValid: false,
    		avisoContaExistente: false
		}
	}

	onNameChange = (event) => {
		let RegisterNameName = event.target.name;
		let RegisterNamevalue = event.target.value;

		this.setState({nome: event.target.value}, () => { this.validateField(RegisterNameName, RegisterNamevalue ) });
	}

	onEmailChange = (event) => {
		let RegisterEmailName = event.target.name;
		let RegisterEmailvalue = event.target.value;

		this.setState({email: event.target.value}, () => { this.validateField(RegisterEmailName, RegisterEmailvalue ) });
	}

	onPasswordChange = (event) => {
		let RegisterSenhaName = event.target.name;
		let RegisterSenhavalue = event.target.value;

		this.setState({senha: event.target.value}, () => { this.validateField(RegisterSenhaName, RegisterSenhavalue ) });
	}

	validateField(fieldName, value) {
	    let fieldValidationErrors = this.state.formErrors;
	    let emailValid = this.state.emailValid;
	    let passwordValid = this.state.passwordValid;
	    let nameValid = this.state.nameValid;

	    switch(fieldName) {
	      case 'email-address':
	        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
	        fieldValidationErrors.Email = emailValid ? '' : ' Email inválido.';
	        break;
	      case 'password':
	        passwordValid = value.length >= 3;
	        fieldValidationErrors.Password = passwordValid ? '' : 'Insira uma senha maior que 3 dígitos.';
	        break;
	      case 'name':
	        nameValid = value.length !== 0;
	        fieldValidationErrors.Name = nameValid ? '' : ' Insira um nome.';
	        break;
	      default:
	        break;
	    }
	    this.setState({formErrors: fieldValidationErrors,
	                    emailValid: emailValid,
	                    passwordValid: passwordValid,
	                    nameValid: nameValid
	                  }, this.validateForm);
    }

    validateForm() {
    	this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid});
  	}

  	errorClass(error) {
    	return(error.length === 0 ? '' : 'tem algum erro.');
  	}

	onSubmitRegister = () => {
		fetch('http://192.168.99.100:3000/register'/*'https://frozen-caverns-42300.herokuapp.com/register'*/, {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				senha: this.state.senha,
				nome: this.state.nome
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data.userId && data.sucess === 'true') {
				this.saveAuthTokeInSession(data.token);
	            fetch(`http://192.168.99.100:3000/profile/${data.userId}`, {
	              	method: 'get',
	              	headers: {
				        'Content-Type': 'application/json',
				        'Authorization': data.token
	              		}
	            	})
	              	.then(resp => resp.json())
	              	.then(user => {
	                	if (user && user.email) {
				            this.props.loadUser(user);
				            this.props.onRouteChange('home');
	                		}
	              		});
			} else {
				this.avisoContaExistente(true);
				this.props.onRouteChange('register');
			}
		});	
	}

	saveAuthTokeInSession = (token) => {
		window.localStorage.setItem('token', token);
	}

	avisoContaExistente = (bool) => {
		return this.setState({ avisoContaExistente: bool });
	}

	render() {
		return (
			<article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 white-80">
					<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Registro</legend>
					      {this.state.avisoContaExistente === true &&
						      <span className="white">
						      	<i>Conta ja existente!</i>
						      </span>
					      }
					      <div className="f6 f6-m f6-l fw3 w-100 mt0 lh-copy">
          					<FormErrors formErrors={this.state.formErrors} />
          				  </div>
					      <div className={`mt3 ${this.errorClass(this.state.formErrors.Name)}`}>
					        <label className="db fw6 lh-copy f6" htmlFor="name">Nome</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="text" 
					        	name="name" 
					        	id="name"
					        	placeholder="nome"
					        	value={this.state.nome}
					        	onChange={this.onNameChange} 
					        />
					      </div>
					      <div className={`mt3 ${this.errorClass(this.state.formErrors.Email)}`}>
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">E-mail</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					       		type="email" 
					        	name="email-address"  
					        	id="email-address"
					        	placeholder="e-mail"
					        	value={this.state.email}
					        	onChange={this.onEmailChange}
					        />
					      </div>
					      <div className={`mv3 ${this.errorClass(this.state.formErrors.Password)}`}>
					        <label className="db fw6 lh-copy f6" htmlFor="password">Senha</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-white hover-black w-100 b--white white" 
					        	type="password" 
					        	name="password"  
					        	id="password"
					        	placeholder="senha"
					        	value={this.state.senha}
					        	onChange={this.onPasswordChange}
					        />
					      </div>
					    </fieldset>
					    <div className="">
					      <input 
					      	className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Feito!" 
					      	onClick={this.onSubmitRegister}
					      	disabled={!this.state.formValid}
					      />
					    </div>
					</div>
				</main>
			</article>
		);
	}
}
export default Register;