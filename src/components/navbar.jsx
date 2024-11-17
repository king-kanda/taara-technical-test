// import React from 'react'

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className="container mx-auto p-3 flex items-center justify-center">
      <Link to="/">
      <img src="/logo.svg" alt="laara-logo" className="h-50 w-20" />
      </Link>
    </div>
    <hr />
    </>
  )
}

export default Navbar