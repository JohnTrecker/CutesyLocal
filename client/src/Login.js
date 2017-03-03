import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Button, Modal } from 'semantic-ui-react';

class Login extends React.Component {
  render(){
    const { open, toggleModal, setUser} = this.props;
    const responseFacebook = (response) => setUser(response);
    return (
        <Modal size="small" dimmer='blurring' open={ open } onClose={ toggleModal }>
          <Modal.Header>Welcome to Cutesy Local</Modal.Header>
          <img className="modal-image" src="http://www.koira.cz/zpravy/1370930959.jpg" role="presentation"/>
          <Modal.Actions>
            <Button color='black' onClick={ toggleModal }>No thanks</Button>
            <FacebookLogin
              appId='1247036205362895'
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              icon={ <i className="facebook icon"></i> }
            />
          </Modal.Actions>
        </Modal>
    )
  }
}

export default Login;