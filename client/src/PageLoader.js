import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const PageLoader = (props) => (
  <Dimmer active={props.active} page>
    <Loader content='Loading' />
  </Dimmer>
)

export default PageLoader