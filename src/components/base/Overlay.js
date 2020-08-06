import React from "react"

const Overlay = ({ className = "" }) => {
  return <div id="overlay" className={`${className} fixed z-30 top-0 left-0 w-screen h-screen bg-smoke-dark`}></div>
}

export default Overlay
