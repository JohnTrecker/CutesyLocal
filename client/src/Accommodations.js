import React from 'react';
import { Label } from 'semantic-ui-react';
import _ from 'underscore';
const index = require('./lib/helpers').ammenities

class Accommodations extends React.Component {

  render(){
    const { ammenities } = this.props
    console.log('ammenities keys:\n', Object.entries(ammenities));
    return(
      <Label.Group size="small">
        {
          Object.entries(ammenities).map((arr, i) => {
            if (arr[1] === true) {
              const prop = index[arr[0]];
              return <Label
                key={i}
                color={prop.color}
                icon={prop.icon}
                content={prop.content} />
            }
          })
        }
      </Label.Group>
    )
  }
}

      // label={{ as: 'a', color: 'red', content: 'Patio Seating', icon: 'sun', corner: true }}

        // <Label
        //   color='red'
        //   content='Patio Seating'
        //   icon='sun' />
        // <Label
        //   color='orange'
        //   content='Allowed Inside'
        //   icon='spoon' />
        // <Label
        //   color='teal'
        //   content='Dog Treats'
        //   icon='winner' />


export default Accommodations