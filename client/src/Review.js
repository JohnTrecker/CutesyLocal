import React from 'react';
import { Accordion, Button, Checkbox, Form, Header, Icon, Image, Modal, Rating, TextArea } from 'semantic-ui-react'

class Review extends React.Component {
  render(props) {
    const { marker, user, open, toggleModal } = this.props

    if (!marker) return (<div></div>)
    const panel = JSON.parse(marker.reviews);

    return (
      <div>
        <Modal dimmer='dimming' open={open} onClose={toggleModal}>
          <Modal.Header>What did your think?</Modal.Header>
          <Modal.Content>
            <Sections />
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={toggleModal}>
              Nah
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's it" onClick={toggleModal} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

// do somethign with Textarea.value

const Sections = () => (
  <Accordion styled>
    <Accordion.Title>
      <Icon name='dropdown' />
      Upload
    </Accordion.Title>
    <Accordion.Content>
      <Image wrapped size='medium' src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Review
    </Accordion.Title>
    <Accordion.Content>
      <Rating icon='star' defaultRating={0} maxRating={5} />
      <p></p>
      <Form>
        <TextArea placeholder='What did you love?'/>
      </Form>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Perks
    </Accordion.Title>
    <Accordion.Content>
      <Checkbox label="Dogs allowed in patio"/><br></br>
      <Checkbox label="Allowed inside"/><br></br>
      <Checkbox label="Serves water or treats"/>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Text with other modules
    </Accordion.Title>
    <Accordion.Content>
      <p>
        More modules embed photo component here
      </p>
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