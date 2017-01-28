import React from 'react';
import './semantic-ui/semantic.min.css';
import './assets/index.css';
import { checkLoginState } from './lib/facebook';

class Modal extends React.Component {
  render(props){
    return (
      <div className="ui small modal">
        <i className="close icon" onClick={this.props.toggle}></i>
        <div className="header">Welcome To Cutesy Local</div>
        <div className="image content">
          <div className="ui medium image">
            <img className="pop_restaurant" role="presentation"/>
          </div>
          <div className="description">
            <div className="ui header">Some text</div>
            <p>Some more text</p>
          </div>
        </div>
        <div className="actions">
          <button className="ui facebook button" onClick={this.props.saveToLocal}>
            <i className="facebook icon"></i>
            Login with Facebook
          </button>
        </div>
      </div>
    )
  }
}
          // <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
          // </fb:login-button>


export default Modal;