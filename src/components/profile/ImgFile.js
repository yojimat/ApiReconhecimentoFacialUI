import React from 'react';
import { FormGroup, Input, FormText, FormFeedback} from 'reactstrap';

const ImgFile = (props) => {
 	return (
		<FormGroup>
		    	<Input 
		    		type="file"  
		    		id="imgFile"
		    		bsSize="sm"
		    		valid
		    		onChange={props.onChangeImageProfile}
		    	/>
		    <FormText color="muted">
		    	Mude aqui sua foto de perfil.
		   	</FormText>
		   	<FormFeedback valid>Oh noes! that name is already taken</FormFeedback>
		   	<FormFeedback>Nooooooo</FormFeedback>
		</FormGroup>
	)
	// return (
	// 	<input type='file' id='single' onChange={props.onChangeImageProfile} /> 
	// )
}
export default ImgFile;