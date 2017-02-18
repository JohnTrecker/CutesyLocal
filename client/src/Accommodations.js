import React from 'react';
import _ from 'underscore';
import { Label } from 'semantic-ui-react';
const index = require('./lib/helpers').ammenities

class Accommodations extends React.Component {

  render(){
    const { ammenities } = this.props
    return(
      <Label.Group size="small">
        {
          Object.entries(ammenities)
                .filter((arr) => arr[1] === true)
                .map((arr, i) => {
                  const prop = index[arr[0]];
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