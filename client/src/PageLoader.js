import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const PageLoader = (props) => {
  return(
    <Dimmer active={props.loading} inverted page>
      <Loader content='Loading'/>
    </Dimmer>
  )
}

export default PageLoader