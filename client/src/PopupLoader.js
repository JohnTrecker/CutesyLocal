import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const PopupLoader = () => (
    <Segment className="loading">
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
)

export default PopupLoader