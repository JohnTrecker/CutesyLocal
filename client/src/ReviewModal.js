import React from 'react';
import { Accordion, Button, Checkbox, Form, Icon, Modal, Rating, TextArea } from 'semantic-ui-react'

const index = require('./lib/helpers').ammenities;

class ReviewModal extends React.Component {
  render(props) {
    const { handleChange, marker, open, toggleModal, submitReview,  } = this.props
    if (!marker) return (<div></div>)
    return (
      <div>
        <Modal dimmer='blurring' open={ open } onClose={ toggleModal }>
          <Modal.Header>Leave a Review</Modal.Header>
          <Modal.Content>
            <ReviewCategories ammenities={marker.accommodations} handleChange={ handleChange }/>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color='black'
              content='No thanks'
              onClick={ toggleModal } />
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Submit'
              onClick={ submitReview } />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const ReviewCategories = (props) => (
  <Accordion styled fluid>
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
      Ammenities
    </Accordion.Title>
    <Accordion.Content>

      {Object.keys(props.ammenities).map(function(val, i){

        let prop = index[val];
        return <Checkbox
          key={i}
          className={val}
          label={prop.content}
          onChange={props.handleChange} />

      })}

    </Accordion.Content>
  </Accordion>
)

export default ReviewModal

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
