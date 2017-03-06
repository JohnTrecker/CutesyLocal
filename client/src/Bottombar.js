import React from 'react';
import InfoMobile from './InfoMobile';
import Draggable from 'react-draggable';
import { Input } from 'semantic-ui-react';

class Bottombar extends React.Component {
  constructor(){
    super()
    this.state = {
      position: {x:0, y:-5}
    }
  }

  render(){
    let { marker, user } = this.props;
    const height = window.innerHeight * -.89;
    return(
      <Draggable
        axis="y"
        bounds={{bottom: 0, top: height}}
        position={this.state.position}
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

  componentWillReceiveProps(props){
    this.setState({
      position: props.marker ? null : {x:0, y: -5}
    });
  }
}

export default Bottombar