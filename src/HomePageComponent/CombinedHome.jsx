import React from 'react'

import HomePage2 from './HomePage2'
import HomePage3 from './HomePage3'
import HomePage1 from './HomePage1'
function CombinedHome() {
  return (
    <div>
    <HomePage1/>
      <HomePage2/>
      <HomePage3/>

    </div>
  )
}

export default CombinedHome
