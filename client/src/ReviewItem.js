import React from 'react'
import { Comment, Image } from 'semantic-ui-react'

const ReviewItem = (props) =>
  <Comment>
    <Image
      as='a'
      src={props.image}
      className={props.name}
      size="tiny"
      floated="left"
      shape="rounded"
      bordered={true} />
    <Comment.Content>
      <Comment.Author as='a'>{props.name}</Comment.Author>
      <Comment.Metadata>
        <span>Today at 5:42PM</span>
      </Comment.Metadata>
      <Comment.Text>{props.review}</Comment.Text>
      <Comment.Actions>
        <a>Reply</a>
      </Comment.Actions>
    </Comment.Content>
  </Comment>

export default ReviewItem