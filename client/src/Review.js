import React from 'react'
import { Accordion, Button, Header, Icon, Image, Modal } from 'semantic-ui-react'

class Review extends React.Component {
  render(props) {
    const { marker, user, open, toggleModal } = this.props

    if (!marker) return (<div></div>)
    const panel = JSON.parse(marker.reviews);

    return (
      <div>
        <Modal dimmer='dimming' open={open} onClose={toggleModal}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content>
            <AccordianExample />
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={toggleModal}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={toggleModal} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}


const AccordianExample = () => (
  <Accordion styled>
    <Accordion.Title>
      <Icon name='dropdown' />
      Upload
    </Accordion.Title>
    <Accordion.Content>
      <p>
        Insert embed photo component here
      </p>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Review
    </Accordion.Title>
    <Accordion.Content>
      <p>
        Insert dialogue box here
      </p>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Perks
    </Accordion.Title>
    <Accordion.Content>
      <p>
        insert check boxes here
      </p>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Text with other modules
    </Accordion.Title>
    <Accordion.Content>
      <Image wrapped size='medium' src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Accordion.Content>

  </Accordion>
)

export default Review


// import React from 'react';
// import './semantic-ui/semantic.min.css';
// class Modal extends React.Component {
//   render(props){
//     return (
//       <div id="login-modal" className="ui small modal">
//         <i className="close icon" onClick={this.props.toggle}></i>
//         <div className="header">Welcome To Cutesy Local</div>
//         <div className="image content">
//           <div className="ui medium image">
//             <img className="pop_restaurant" role="presentation"/>
//           </div>
//           <div className="description">
//             <div className="ui header">Some text</div>
//             <p>Some more text</p>
//           </div>
//         </div>
//         <div className="actions">

//         </div>
//       </div>
//     )
//   }
// }
// export default Modal;