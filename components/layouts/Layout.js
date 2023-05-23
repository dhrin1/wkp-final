import React from 'react'
import Header from '../Header'
import Notify from '../Notify'

const  Layout = ({children}) => {
  return (
      <div className="font-nunito">
        <Header />
        <Notify />
        {children}
      </div>
    
  )
}
export default Layout
