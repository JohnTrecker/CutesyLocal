import React from 'react';
import Reviews from './Reviews';
import Info from './Info';
import { Button, Segment, Sidebar } from 'semantic-ui-react'

class Popup extends React.Component {
  render() {
  const { marker, visible, reviewsVisible, showReviews, toggleModal } = this.props
  if (!marker) return (<div style={{display: "none"}}></div>)
    return (
      <Sidebar animation='overlay' direction='bottom' visible={visible}>
        <Segment.Group horizontal>
          <Segment >
            { !reviewsVisible && <Info marker={marker} /> }
            { reviewsVisible && <Reviews marker={marker} /> }
          </Segment>

          <Segment textAlign="center">
            <ReviewButtons
              reviewsAvailable={marker.reviews.length}
              showReviews={showReviews}
              reviewsVisible={reviewsVisible}
              toggleModal={toggleModal} />
          </Segment>

        </Segment.Group>
      </Sidebar>
    )
  }
}

const ReviewButtons = (props) => (
  <Button.Group attached='top' vertical>
    <Button
      disabled={!props.reviewsAvailable}
      onClick={props.showReviews}
      content={props.reviewsVisible === true ? "Info" : "Reviews"} />
    <Button
      onClick={props.toggleModal}
      content="Leave Review" />
    <Button disabled>Photos</Button>
  </Button.Group>
)

export default Popup;