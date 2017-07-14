import React from 'react';
import { Button, Container, Image } from 'semantic-ui-react'

class NavMobile extends React.Component {

  render(){
    const venueTypes = [
      ['restaurant','Food','twitter'],
      ['park','Parks','green'],
      ['event','Events','google plus']];
    let { updateVisibleVenues, visibleVenues } = this.props;
    return(
      <Container className="mobile-btns">

          {venueTypes.map((type, i) => {
            let color = visibleVenues.includes(type[0]) ? type[2] : undefined;
            return (
              <Button
                key={i}
                circular
                compact
                className={type[0]}
                color={color}
                onClick={updateVisibleVenues}>
                <Image size="mini" verticalAlign='middle'
                  src={`./assets/icon_btn_${type[0]}.png`}/>
              </Button>
            )})
          }

      </Container>
    )
  }
}

export default NavMobile