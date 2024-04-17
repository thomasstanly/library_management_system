import React from 'react'

const Loader = () => {
   return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
         <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>
         <div style={{ paddingLeft: '10px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '30px', marginTop: '2px', paddingLeft: '2px' }}>Loading....</p>
         </div>
      </div>
   </div>)
}

export default Loader