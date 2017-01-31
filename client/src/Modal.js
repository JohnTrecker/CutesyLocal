import React from 'react';
import './semantic-ui/semantic.min.css';

class Modal extends React.Component {
  render(props){
    return (
      <div id="login-modal" className="ui small modal">
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

        </div>
      </div>
    )
  }
}

export default Modal;