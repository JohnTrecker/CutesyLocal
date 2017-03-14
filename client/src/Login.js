import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Button, Modal } from 'semantic-ui-react';

let fbid;
if (process.env.NODE_ENV === 'production') fbid = process.env.FACEBOOK_CLIENT_ID;
else fbid = '1247056018694247'

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
              appId={fbid}
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