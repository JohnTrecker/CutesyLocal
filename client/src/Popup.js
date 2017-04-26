import React from 'react';
import Reviews from './Reviews';
import ReviewButtons from './ReviewButtons';
import Info from './Info';
import { Segment, Sidebar } from 'semantic-ui-react'

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

          <Segment className="bottombar_buttons">
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

export default Popup;