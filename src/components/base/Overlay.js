import React from "react"

const overlayTransition = {
  transition: "opacity .5s, visibility .5s",
}

const Overlay = ({ isVisible }) => {
  return (
    <div
      style={overlayTransition}
      className={`${isVisible ? "visible opacity-75" : "invisible opacity-0"} fixed z-30 top-0 left-0 w-screen h-screen bg-gray-900`}
    ></div>
  )
}

export default Overlay
