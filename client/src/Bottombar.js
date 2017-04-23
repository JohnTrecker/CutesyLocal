import React from 'react';
import InfoMobile from './InfoMobile';
import Reviews from './Reviews';
import Draggable from 'react-draggable';
import SwipeableViews from 'react-swipeable-views';
import { Input } from 'semantic-ui-react';

const styles = {
  slide: {
    width: '100%'
  },
  info: {
    background: '#FEA900',
  },
  review: {
    background: '#B3DC4A',
  }
};

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

          { marker &&
            <SwipeableViews
              style={Object.assign({}, styles.slide)}>

              <InfoMobile
                style={Object.assign({}, styles.slide)}
                marker={marker}
                user={user} />
              <Reviews
                style={Object.assign({}, styles.slide)}
                marker={marker}/>

            </SwipeableViews>
          }

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