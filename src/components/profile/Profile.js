import React, { Component } from 'react';
import './Profile.css';
import ImgFile from './ImgFile';

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			usuario: {
				nome: this.props.usuario.nome,
				idade: this.props.usuario.idade,
				pet: this.props.usuario.pet	

			},
			validacaoIdade: false
		};
	}

	onFormChange = (event) => {
		switch(event.target.name) {
			case 'nome':
				this.setState({ usuario: {
					...this.state.usuario,
					nome: event.target.value
				}});
				break;
			case 'idade':
				this.setState({ usuario: {
					...this.state.usuario,
					idade: event.target.value
				}});
				break;
			case 'pet':
				this.setState({ usuario: {
					...this.state.usuario,
					pet: event.target.value
				}});
				break;
			default:
				return;
		}
	}

	onProfileUpdate = (data) => {
		if (data.idade === "") {
			data.idade = this.props.usuario.idade;
		}
		if (data.idade === 'Qual a sua idade?') {
			data.idade = undefined;
		}

		fetch(`http://192.168.99.100:3000/profile/${this.props.usuario.id}`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': window.localStorage.getItem('token')
				},
				body: JSON.stringify({ formInput: data })
		}).then(resp => {
			if (resp.status === 200 || resp.status === 304) {
				this.validacaoIdade(resp.status);
				this.props.toggleModal();
				this.props.loadUser({ ...this.props.usuario, ...data });
			} else if (resp.status === 400){
				this.validacaoIdade(resp.status);
			}
		}).catch(console.log);
	}

	validacaoIdade = resp => {
		if (resp === 200 || resp === 304) {
			return this.setState({validacaoIdade: false });
		} else if  (resp === 400) {
			return this.setState({validacaoIdade: true });
		}
		return null;
	}

	render() {
		const { usuario, onChangeImageProfile } = this.props;

		return (
			<div className="profile-modal">
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
						<main className="pa4 black-80 w-80">
							<div>
								<img 
									src={usuario.imgSource}
									className="h3 w3 dib"
									alt="avatar"
								/>
								<ImgFile 
									onChangeImageProfile={onChangeImageProfile}
								/>
							</div>
							<h1>{this.state.usuario.nome}</h1>
							<h4>Postagens: {usuario.postagens}</h4>
							<p>Membro desde: {usuario.inscricao.substring(0, usuario.inscricao.indexOf('T'))}</p>
							<p>Idade: {usuario.idade}</p>
							<p>Animal preferido: {usuario.pet}</p>
							<hr />
							<label className="mt2 fw6" htmlFor="nome">Nome:</label>
								<input
									onChange={this.onFormChange}
									className="b pa2 ba hover-black w-100 b--black black" 
									type="text" 
									name="nome" 
									id="nome"
									placeholder={usuario.nome} 
								/>
								<label className="mt2 fw6" htmlFor="idade">Idade:</label>
								<input
									onChange={this.onFormChange}
									className="b pa2 ba hover-black w-100 b--black black" 
									type="text" 
									name="idade"  
									id="idade"
									placeholder={usuario.idade}
								/>
								{ this.state.validacaoIdade === true &&
									<span className="red bg-light-yellow">
										<i>idade inválida.</i><br/>
									</span>
								}
								<label className="mt2 fw6" htmlFor="pet">Animal preferido:</label>
								<input
									onChange={this.onFormChange}
									className="b pa2 ba hover-black w-100 b--black black" 
									type="text" 
									name="pet"  
									id="pet"
									placeholder={usuario.pet}
								/>
								<div className="mt4" style={{ display: "flex", justifyContent: "space-evenly"}}>
									<button 
										className="b pa2 grow pointer hover-black w-40 bg-light-yellow b--black-20"
										onClick={() => this.onProfileUpdate( this.state.usuario )}
									>
										Salvar
									</button>
									<button 
										className="b pa2 grow pointer hover-black w-40 bg-light-red b--black-20"
										onClick={this.props.toggleModal} 
									>
										Voltar
									</button>
								</div>
						</main>
						<div className="modal-close" onClick={this.props.toggleModal}>&times;</div>
					</article>
			</div>
		);
	}
}

export default Profile;