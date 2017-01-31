import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {
  render(props){
    const responseFacebook = (response) => this.props.setUser(response);
    return (
      <div className="hidden content no-review">
        <p>Been to { this.props.name } before?&ensp;</p>
        <FacebookLogin
            appId="1247036205362895"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            icon={ <i className="facebook icon"></i> }
          />
        <p>&ensp;to leave a review.</p>
      </div>
    )
  }
}

export default Login;