import React from 'react';
import InfoMobile from './InfoMobile';
import Draggable from 'react-draggable';
import { Input } from 'semantic-ui-react';

class Bottombar extends React.Component {
  render(){
    let { marker, user } = this.props;
    const height = window.innerHeight * -.85;
    return(
      <Draggable
        axis="y"
        bounds={{bottom: 0, top: height}}
        position={marker ? null : {x:0, y:-5}}
        disabled={marker ? false : true}
        onDrag={() => this.setState({position: null})}
        z-index={2}>

        <div id="bottombar">
          <hr/>
          <form>
            <Input
              disabled
              type="text"
              placeholder="Search for a place . . ."
              icon="search"
              iconPosition="left"/>
          </form>

          { marker && <InfoMobile
            marker={marker}
            user={user} /> }

        </div>
      </Draggable>
    )
  }

}

export default Bottombar