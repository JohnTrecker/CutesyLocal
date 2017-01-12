import React from 'react';
import './semantic-ui/semantic.min.css';

class Popup extends React.Component {
  slideOut(){
    console.log( 'fired' );
  }
  render(){
    const rating = this.props.marker.rating * 20;
    const ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
    const location = JSON.parse(this.props.marker.location);
    const showDates = Boolean(this.props.marker.dates);
    const showReview = this.props.marker.reviews !== "[]";
    const reviews = JSON.parse(this.props.marker.reviews)
    return (
      <div className="popup-contents ui slide left instant reveal">
        <div className="visible content">
          <div className="image">
            <img className={`pop_${this.props.marker.venue}`} role="presentation"/>
          </div>
          <div className="description">
            <p className="title">{ this.props.marker.name }</p>
            <p className="address">{ location.address1 } </p>
            { showDates && <Dates timeAndDate={this.props.marker.dates} /> }
            <div className="rating">
              <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
              <p className="percentage">&ensp; { rating } </p>
              <p className="dog-friendly">% dog friendly</p>
            </div>
          </div>
        </div>
        <div className="hidden content">
          <div className="review-image">
            <img className="reviewer"/>
          </div>
          <div className="review-info">
            <p className="title">{ showReview && reviews[0].reviewer }</p>
            <p className="address">{ showReview && reviews[0].review }</p>
          </div>
        </div>
      </div>
    )
  }
};

/*
      <div>
        <div className="popup-contents" id="visible-content">
          <div className="image">
            <img className={`pop_${this.props.marker.venue}`} role="presentation"/>
          </div>
          <div className="description">
            <p className="title">{ this.props.marker.name }</p>
            <p className="address">{ location.address1 } </p>
            { showDates && <Dates timeAndDate={this.props.marker.dates} /> }
            <div className="rating">
              <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
              <p className="percentage">&ensp; { rating } </p>
              <p className="dog-friendly">% dog friendly</p>
            </div>
          </div>
          <div className="icon">
            <i className="comments outline icon"></i>
          </div>
          <div className="hidden-content">
            <img className="reviewer"/>
            <p>{ showReview && this.props.marker.reviews[0].reviewer }</p>
            <p>{ showReview && this.props.marker.reviews[0].review }</p>
          </div>
        </div>
      </div>
*/

const Dates = (props) =>
  <p className="dates"> {props.timeAndDate} </p>


export default Popup;