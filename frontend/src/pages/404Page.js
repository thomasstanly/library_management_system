import animationData from '../Assets/Animation - 1716736335078.json'
import Lottie from 'lottie-react'

import React from 'react'

const NotFoundPage = () => {
  return (
    <>
      <Lottie
        animationData={animationData}
        style={{ width: '100%', height: '100vh', margin: '0 auto' }}
      />
    </>
  )
}

export default NotFoundPage
