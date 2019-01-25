import React from 'react';
import { FormGroup, Input, FormText, FormFeedback} from 'reactstrap';

class ImgFile extends React.Component {

	render(){
	 	return (
			<FormGroup>
			    <Input 
			    	type="file"  
			    	id="imgFile"
			    	bsSize="sm"
			    	invalid= {this.props.errorImagePerfil}
			    	onChange={this.props.onChangeImageProfile}
			    />
			    <FormText color="muted">
			    	Mude aqui sua foto de perfil.
			   	</FormText>
			   	<FormFeedback>
			   		<ErrorMsgFunction props={{...this.props}}/>
			   	</FormFeedback>
			</FormGroup>
		)	
	}
}

export const ErrorMsgFunction = ({props}) => {

		switch(props.errorMsg){
			case 0:
				return <>Esse arquivo não é do formato suportado(png/jpeg/gif).</>;
			case 1:
				return <>Arquivo é muito grande, por favor escolha uma menor que 150 kbytes.</>;
			default:
				return (
					<>
						Erro ao postar a imagem.<span role="img" aria-label="emoji">😱</span>
					</>
				)
		}
	}
export default ImgFile;