import React from 'react';
import './semantic-ui/semantic.min.css';
import './assets/index.css';

class Popup extends React.Component {
  render(){
    const rating = this.props.marker.rating * 20;
    const ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
    const showDates = this.props.marker.dates !== "null";
    const showReview = this.props.marker.reviews !== "[]";
    const review = showReview === true ? JSON.parse(this.props.marker.reviews)[0].review : null;
    const reviewer = showReview === true ? JSON.parse(this.props.marker.reviews)[0].reviewer.toLowerCase() : null;
    return (
      <div className="popup-contents ui slide left instant reveal">
        <div className="visible content">
          <div className="image">
            <img className={`pop_${this.props.marker.venueType}`} role="presentation"/>
          </div>
          <div className="description">
            <p className="title">{ this.props.marker.name }</p>
            <p className="address">{ this.props.marker.address }</p>
            { showDates && <Dates timeAndDate={ this.props.marker.dates } /> }
            <div className="rating">
              <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
              <p className="percentage">&ensp; { rating } </p>
              <p className="dog-friendly">% dog friendly</p>
            </div>
          </div>
        </div>
          { showReview && <Reviews review={ review } reviewer={ reviewer }/> }
          { !showReview && <NoReviews name={ this.props.marker.name } toggleModal={this.props.toggleModal}/> }
      </div>
    )
  }
};

const Dates = (props) =>
  <p className="dates"> {props.timeAndDate} </p>

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

const NoReviews = (props) =>
  <p className="hidden content address" style="curser:pointer">
    Been to { props.name } before?&ensp;
    <a onClick={ props.toggleModal }>Leave a review</a>.
  </p>


export default Popup;