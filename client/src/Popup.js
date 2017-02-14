import React from 'react';
import Reviews from './Reviews';
import Info from './Info';
import { Button, Segment, Sidebar } from 'semantic-ui-react'

class Popup extends React.Component {
  render() {
  const { marker, reviewsVisible, showReviews, user, toggleReviewModal, toggleLoginModal, visible } = this.props
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
              user={user}
              reviewsAvailable={marker.reviews.length}
              showReviews={showReviews}
              reviewsVisible={reviewsVisible}
              toggleReviewModal={toggleReviewModal}
              toggleLoginModal={toggleLoginModal} />
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
    { props.user &&
      <Button
        onClick={props.toggleReviewModal}
        content="Leave Review" />
    }
    {
      !props.user &&
      <Button
        onClick={props.toggleLoginModal}
        content="Sign In to Leave Review" />
    }
    <Button disabled>Photos</Button>
  </Button.Group>
)

export default Popup;