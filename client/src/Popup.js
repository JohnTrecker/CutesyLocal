import React from 'react';

const Popup = function(props){
  const rating = props.marker.rating * 20;
  const ratingClass = rating >= 80 ? 'great' : (rating < 70 ? 'notsogood' : 'good');
  const location = JSON.parse(props.marker.location);
  const showDates = Boolean(props.marker.dates);
  return (
    <div className="popup-contents">
      <div className="image">
        <img className={`pop_${props.marker.venue}`} role="presentation"/>
      </div>
      <div className="description">
        <p className="title">{ props.marker.name }</p>
        <p className="address">{ location.address1 } </p>
        { showDates && <Dates timeAndDate={props.marker.dates} /> }
        <div className="rating">
          <img className={ ratingClass } alt="http://emojipedia-us.s3.amazonaws.com/cache/6b/16/6b164a624288271a884ab2a22f9bb693.png" />
          <p className="percentage">&ensp; { rating } </p>
          <p className="dog-friendly">% dog friendly</p>
        </div>
      </div>
      <div className="icon">
        <img className={`pop-${props.marker.venue}`} role="presentation"/>
      </div>
    </div>
  )
};

const Dates = (props) =>
  <p className="dates"> {props.timeAndDate} </p>


export default Popup;