import React from 'react';

const Button = (props) =>
  <button className={ props.class } onClick={ props.updateVisibleVenues } >
    { props.children }
  </button>

const Image = (props) =>
  <img className={ props.class } role="presentation" />

const Nav = (props) =>
  <div id="nav">
    <Button updateVisibleVenues={props.updateVisibleVenues} class="restaurant">
      <div className="btn-contents"><Image class="restaurant"/> Food/Drink</div>
    </Button>
    <Button updateVisibleVenues={props.updateVisibleVenues} class="park">
      <div className="btn-contents"><Image class="park"/> Parks</div>
    </Button>
    <Button updateVisibleVenues={props.updateVisibleVenues} class="event">
      <div className="btn-contents"><Image class="event"/> Events</div>
    </Button>
  </div>


export default Nav;