import React from 'react';
import _ from 'underscore';
import { Label } from 'semantic-ui-react';
const index = require('../lib/helpers').ammenities

class Accommodations extends React.Component {

  render(){
    const { ammenities } = this.props
    return(
      <Label.Group size="small">
        {
          Object.keys(ammenities)
            .filter((key) => ammenities[key] === true)
            .map((key, i) => {
              const prop = index[key];
              return <Label
                key={i}
                color={prop.color}
                icon={prop.icon}
                content={prop.content} />
          })
        }
      </Label.Group>
    )
  }
}

export default Accommodations