import React from 'react'
import TimeAgo from 'timeago-react';
import { Comment, Image } from 'semantic-ui-react'

const ReviewItem = (props) =>
  <Comment>
    <Comment.Avatar as={Image}
      src={props.image}
      alt='assets/alt-img.jpg'
      className={props.name} />
    <Comment.Content>
      <Comment.Author as='a'>{props.name}</Comment.Author>
      <Comment.Metadata>
        <span>
          <TimeAgo datetime={props.timestamp}/>
        </span>
      </Comment.Metadata>
      <Comment.Text>{props.review}</Comment.Text>
      <Comment.Actions>
        <a>Reply</a>
      </Comment.Actions>
    </Comment.Content>
  </Comment>

export default ReviewItem