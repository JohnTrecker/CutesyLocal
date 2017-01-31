import React from 'react';
import Login from './Login';
import './semantic-ui/semantic.min.css';
import './assets/index.css';

class Popup extends React.Component {
  render(){
    if (!this.props.marker) return( <div></div> );
    const venue = this.props.marker;
    const rating = venue.rating * 20;
    const ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
    const showDates = venue.dates !== "null";
    const showReview = venue.reviews !== "[]";
    let loggedIn = this.props.loggedIn;
    const review = showReview === true ? JSON.parse(venue.reviews)[0].review : null;
    const reviewer = showReview === true ? JSON.parse(venue.reviews)[0].reviewer.toLowerCase() : null;

    return (
      <div className="popup-contents ui slide left instant reveal">
        <div className="visible content">
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

          { showReview &&
            <Reviews
              review={ review }
              reviewer={ reviewer }/>
          }
          {
            !showReview && loggedIn &&
            <LeaveReview
              name={ venue.name }
              toggleModal={this.props.toggleModal}
              setUser={this.props.setUser}/>
          }
          { !showReview && !loggedIn &&
            <Login
              name={ venue.name }
              setUser={this.props.setUser}/>
          }

      </div>
    )
  }
};

const Reviews = (props) =>
  <div className="hidden content" >
    <div className="review-image">
      <img id="reviewer" className={ props.reviewer} role="presentation"/>
    </div>
    <div className="review-info">
      <p className="title">{ props.reviewer }</p>
      <p className="address">{ props.review }</p>
    </div>
  </div>

const LeaveReview = (props) =>
  <div className="hidden content no-review">
    <p>Been to { props.name } before?&ensp;</p>
    <a onClick={ props.toggleModal}>Leave a review.</a>
  </div>

export default Popup;