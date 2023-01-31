import React from 'react'

const Header = ({headerText}) => {
  return (
    <h1 className="font-bold text-4xl text-cyan-500 mt-14">
        {headerText}
    </h1>
  )
}

export default Header