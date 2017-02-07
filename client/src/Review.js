import React from 'react';
import { Accordion, Button, Checkbox, Form, Icon, Modal, Rating, TextArea } from 'semantic-ui-react'
let saveReview = require('./lib/helpers').saveReview;

class Review extends React.Component {
  constructor(){
    super();
    this.state = {rating:null, review:null, outside:null, inside:null, service:null}
  }

  handleChange(e, el){
    const key = el.className;
    const value = key === 'rating' ? el.rating :
      (key === 'review' ? el.value : el.checked)
    // TODO: validate `value` for XSS prevention
    const newState = {}
    newState[key] = value
    this.setState(newState);
  }

  submitReview(props){
    // compose body
    let body = {};
    [body.user, body.venue, body.review] = [this.props.user, this.props.marker, this.state];
    // update venue
    saveReview(body);
    //
  }

  render(props) {
    const { marker, user, open, toggleModal } = this.props

    if (!marker) return (<div></div>)
    return (
      <div>
        <Modal dimmer='dimming' open={ open } onClose={ toggleModal }>
          <Modal.Header>What did your think?</Modal.Header>
          <Modal.Content>
            <ReviewCategories handleChange={ this.handleChange.bind(this) }/>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={ toggleModal }>Nevermind</Button>
            <Button positive icon='checkmark' labelPosition='right' content="Submit" onClick={this.submitReview.bind(this)} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const ReviewCategories = (props) => (
  <Accordion styled>
    <Accordion.Title>
      <Icon name='dropdown' />
      Review
    </Accordion.Title>
    <Accordion.Content>
      <Rating
        className="rating"
        icon='star'
        size='huge'
        defaultRating={0}
        maxRating={5}
        onRate={props.handleChange} />
      <br/>
      <Form>
        <TextArea
          placeholder='What did you love?'
          className="review"
          onChange={props.handleChange} />
      </Form>
    </Accordion.Content>
    <Accordion.Title>
      <Icon name='dropdown' />
      Perks
    </Accordion.Title>
    <Accordion.Content>
      <Checkbox
        className="outside"
        label="Dogs allowed in patio"
        onChange={props.handleChange} />
      <br/>
      <Checkbox
        className="inside"
        label="Allowed inside"
        onChange={props.handleChange} />
      <br/>
      <Checkbox
        className="service"
        label="Serves water or treats"
        onChange={props.handleChange} />
    </Accordion.Content>
  </Accordion>
)

export default Review

// ========================================================
// Upload Photo component
// ========================================================
    // <Accordion.Title>
    //   <Icon name='dropdown' />
    //   Upload
    // </Accordion.Title>
    // <Accordion.Content>
    //   <Image
    //     wrapped
    //     size='medium'
    //     src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
    //   <Modal.Description>
    //     <Header>Default Profile Image</Header>
    //     <p>We've found the following gravatar image associated with your e-mail address.</p>
    //     <p>Is it okay to use this photo?</p>
    //   </Modal.Description>
    // </Accordion.Content>
