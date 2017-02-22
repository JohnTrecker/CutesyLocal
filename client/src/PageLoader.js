import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const PageLoader = () => (
  <Dimmer active page>
    <Loader content='Loading' />
  </Dimmer>
)

export default PageLoader