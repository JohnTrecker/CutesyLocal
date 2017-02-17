import React from 'react';
import { Button, Image, Segment, Sidebar } from 'semantic-ui-react'

// const Button = (props) =>
//   <button className={ props.class } onClick={ props.updateVisibleVenues } >
//     { props.children }
//   </button>

// const Image = (props) =>
//   <img className={ props.class } role="presentation" />

const venueTypes = [
  ['restaurant','Food','blue'],
  ['park','Parks','green'],
  ['event','Events','red']];

class Nav extends React.Component {
  render(){
    let { visible, updateVisibleVenues } = this.props;
    return(
        <Button.Group attached="top">

          { venueTypes.map((type, i) => {

            return <Button as={Segment} textAlign="center" className={type[0]} key={i} color={type[2]}>
                     <Image size="mini" verticalAlign='middle' src={`./assets/icon_btn_${type[0]}.png`}/> {type[1]}
                   </Button>

          })}

        </Button.Group>

    )
  }
}

export default Nav

      // <div id="nav">
      //   <Button updateVisibleVenues={updateVisibleVenues} class="restaurant">
      //     <div className="btn-contents"><Image class="restaurant"/> Food/Drink</div>
      //   </Button>
      //   <Button updateVisibleVenues={updateVisibleVenues} class="park">
      //     <div className="btn-contents"><Image class="park"/> Parks</div>
      //   </Button>
      //   <Button updateVisibleVenues={updateVisibleVenues} class="event">
      //     <div className="btn-contents"><Image class="event"/> Events</div>
      //   </Button>
      // </div>