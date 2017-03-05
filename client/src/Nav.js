import React from 'react';
import { Button, Container, Image, Segment } from 'semantic-ui-react'

class Nav extends React.Component {
  render(){
    const venueTypes = [
      ['restaurant','Food','twitter'],
      ['park','Parks','green'],
      ['event','Events','google plus']];
    let { loading, updateVisibleVenues, visibleVenues } = this.props;
    return(
      <Container text textAlign="center">
        <Button.Group attached="top">

          {venueTypes.map((type, i) => {
            let color = visibleVenues.includes(type[0]) ? type[2] : undefined;
            return (
              <Button as={Segment} key={i} textAlign="center"
                className={type[0]}
                color={color}
                onClick={updateVisibleVenues}>
                <Image size="mini" verticalAlign='middle'
                  src={`./assets/icon_btn_${type[0]}.png`}/>
                &nbsp;&nbsp;{type[1]}
              </Button>
            )})
          }

        </Button.Group>
      </Container>
    )
  }
}

export default Nav