import React from 'react'
import ReviewItem from './ReviewItem';
import { Comment, Segment } from 'semantic-ui-react'

class Reviews extends React.Component {
  render(){
    if (!this.props.marker) return <div style={{display: "none"}}></div>
    const { marker } = this.props
    return (
      <Comment.Group as={Segment} textAlign="left" minimal>

        { marker.reviews.map(function(review){

          return <ReviewItem
            key={review._id || 1}
            image={review.image}
            name={review.reviewer}
            review={review.review}
            rating={review.rating}
            timestamp={review.timestamp} />

        })}

      </Comment.Group>
    )
  }
}

export default Reviews