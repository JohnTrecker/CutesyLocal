import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const PopupLoader = () => (
  <Dimmer active inverted>
    <Loader>Loading</Loader>
  </Dimmer>
)

export default PopupLoader