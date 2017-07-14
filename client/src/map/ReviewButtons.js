import React from 'react'
import { Button } from 'semantic-ui-react'


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

export default ReviewButtons