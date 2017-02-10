import React from 'react';

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
    )
  }
}

export default Info