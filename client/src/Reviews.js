import React from 'react'
import ReviewItem from './ReviewItem';
import { Comment, Header } from 'semantic-ui-react'

class Reviews extends React.Component {
  render(){
    if (!this.props.marker) return <div></div>
    const { marker } = this.props
    return (
      <Comment.Group minimal>
        <Header as='h3' dividing>Comments</Header>

        {marker.reviews.map(function(review){

          return <ReviewItem
            key={review._id || 1}
            image={review.image}
            name={review.reviewer}
            review={review.review}
            rating={review.rating} />
        })}

      </Comment.Group>
    )
  }
}

        // <Form reply onSubmit={e => e.preventDefault()}>
          // <Form.TextArea />
          // <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        // </Form>

export default Reviews