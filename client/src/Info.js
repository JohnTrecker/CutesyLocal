import React from 'react';
import { Image, Item, ItemContent, Button, Icon, Image as ImageComponent, Label, Segment } from 'semantic-ui-react';

class Info extends React.Component{
  render(){
    if (!this.props.marker) return (<div></div>)
    let venue = this.props.marker;
    let rating = venue.rating * 20;
    let ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
    let showDates = venue.dates !== "null";
    let showReview = venue.reviews.length !== 0;
    let loggedIn = this.props.user;
    let review = showReview === true ? venue.reviews[0].review : null;
    let reviewer = showReview === true ? venue.reviews[0].reviewer : null;
    return(
      <Segment.Group horizontal raised>
        <Segment>

          <Item.Image floated="left" spaced={true} size="small" src={`./assets/img_pop_${venue.venueType}.jpg`}/>
          <ReviewButtons/>
          <Item.Content>
            <Item.Header as='a' to={venue.url}>{venue.name}</Item.Header>
            <Item.Meta>
              <span>{venue.address}</span>
              { showDates &&  <span> {venue.dates} </span> }
            </Item.Meta>
            <Item.Description>
              <div className="rating">
                <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
                <p className="percentage">&ensp; { rating } </p>
                <p className="dog-friendly">% dog friendly</p>
              </div>
            <Ammenities />
            </Item.Description>
          </Item.Content>

        </Segment>

      </Segment.Group>
    )
  }
}

const ReviewButtons = () => (
  <Button.Group floated="right" attached='top' vertical>
    <Button>Reviews</Button>
    <Button>Leave Review</Button>
    <Button>Photos</Button>
  </Button.Group>
)
const paragraph = <ImageComponent src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
const Ammenities = (props) =>
  <Label.Group size="small">
    <Label
      color='red'
      content='Patio Seating'
      icon='sun' />
    <Label
      color='orange'
      content='Allowed Inside'
      icon='spoon' />
    <Label
      color='teal'
      content='Dog Treats'
      icon='winner' />
  </Label.Group>

export default Info
/*
      <div>
        <div className="image">
          <img className={`pop_${venue.venueType}`} role="presentation"/>
        </div>
        <div className="description">
          <p className="title">{ venue.name }</p>
          <p className="address">{ venue.address }</p>
          { showDates &&  <p className="dates"> {venue.dates} </p> }
          <div className="rating">
            <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
            <p className="percentage">&ensp; { rating } </p>
            <p className="dog-friendly">% dog friendly</p>
          </div>
        </div>
      </div>

      label={{ as: 'a', color: 'red', content: 'Patio Seating', icon: 'sun', corner: true }}
      label={{ as: 'a', color: 'orange', content: 'Allowed Inside', icon: 'spoon', ribbon: true }}
      label={{ as: 'a', color: 'teal', content: 'Doggy Service', icon: 'winner', tag: true }}
*/

