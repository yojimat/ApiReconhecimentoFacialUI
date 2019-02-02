import React from "react";
import { FormGroup, Input, FormText, FormFeedback, Spinner } from "reactstrap";

class ImgFile extends React.Component {
  render() {
    const { isLoadingProfileImage } = this.props;

    return isLoadingProfileImage === false ? (
      <FormGroup>
        <Input
          type="file"
          id="imgFile"
          bsSize="sm"
          invalid={this.props.errorImagePerfil}
          valid={!this.props.errorImagePerfil}
          onChange={this.props.onChangeImageProfile}
        />
        <FormText color="muted">Mude aqui sua foto de perfil.</FormText>
        <FormFeedback valid={!this.props.errorImagePerfil}>
          <ErrorMsgFunction props={{ ...this.props }} />
        </FormFeedback>
      </FormGroup>
    ) : (
      <>
        <Spinner color="danger" />
      </>
    );
  }
}

export const ErrorMsgFunction = ({ props }) => {
  switch (props.errorMsg) {
    case 0:
      return (
        props.errorImagePerfil && (
          <>Esse arquivo não é do formato suportado(png/jpeg/gif).</>
        )
      );
    case 1:
      return (
        props.errorImagePerfil && (
          <>
            Arquivo é muito grande, por favor escolha uma menor que 150 kbytes.
          </>
        )
      );
    case 2:
      return !props.errorImagePerfil && <>Imagem Postada!</>;
    default:
      return (
        <>
          Erro ao postar a imagem.
          <span role="img" aria-label="emoji">
            😱
          </span>
        </>
      );
  }
};
export default ImgFile;
