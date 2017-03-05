import React from 'react';
import InfoMobile from './InfoMobile';
import NavMobile from './NavMobile';
import Draggable from 'react-draggable';
import { Input } from 'semantic-ui-react';

class Bottombar extends React.Component {
  render(){
    let { marker, updateVisibleVenues, user, visibleVenues } = this.props;
    const height = window.innerHeight * -.75;
    return(
      <Draggable
        axis="y"
        bounds={{bottom: 0, top: height}}
        z-index={4}>

        <div id="bottombar" onMouseDown>
          <hr/>
          <form>
            <Input
              disabled
              type="text"
              placeholder="Search for a place . . ."
              icon="search"
              iconPosition="left"/>
          </form>

          <NavMobile
            updateVisibleVenues={updateVisibleVenues}
            visibleVenues={visibleVenues}/>

          <InfoMobile
            marker={marker}
            user={user}/>
        </div>
      </Draggable>
    )
  }
}

export default Bottombar