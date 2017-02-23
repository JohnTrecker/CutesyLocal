import React from 'react';
import PopupLoader from './PopupLoader';
import Accommodations from './Accommodations';
import { Item, Segment } from 'semantic-ui-react';

class Info extends React.Component{
  state = {loading: true}
  toggleLoader = () => this.setState({loading: !this.state.loading})

  render(){
    if (!this.props.marker) return (<div style={{display: "none"}}></div>)
    // if (this.state.loading) return (<PopupLoader />)

    let venue = this.props.marker;
    let rating = Math.round(venue.rating * 20);
    let ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
    let showDates = venue.dates !== "null";
    return(
      <Segment className="Info left">
        <Item.Image
          floated="left"
          spaced={true}
          size="small"
          src={venue.imageUrl}
          alt={`./assets/img_pop_${venue.venueType}.jpg`} />
        <Item.Content>
          <Item.Header as='a' href={venue.url}>{venue.name}</Item.Header>
          <Item.Meta>
            <span>{venue.address}</span>
            { showDates &&  <span> {venue.dates} </span> }
          </Item.Meta>
          <Item.Description>
            <div className="rating">
              <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
              <p className="percentage">&ensp;{rating}</p>
              <p className="dog-friendly">% dog friendly</p>
            </div>
          <Accommodations ammenities={venue.accommodations}/>
          </Item.Description>
        </Item.Content>
      </Segment>
    )
  }

  componentDidMount(){
    // this.toggleLoader();
  }
}

export default Info

