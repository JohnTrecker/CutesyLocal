import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const PageLoader = () => (
    <Segment className="loading">
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    </Segment>
)

export default PageLoader