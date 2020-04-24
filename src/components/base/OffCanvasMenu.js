import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import { CloseSvgPath } from "./SvgPaths"
import Overlay from "./Overlay"

const OffCanvasMenu = ({ isMenuOpen, toggleMenu, menuItems = [], className = "" }) => {
  const closeMenu = () => {
    document.getElementById("offCanvasMenu").classList.add("slideOutRight")
    setTimeout(() => {
      toggleMenu()
    }, 500)
  }
  const node = useRef()

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    closeMenu()
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <>
      <div
        id="offCanvasMenu"
        ref={node}
        className={`
        ${isMenuOpen ? "slideInRight translate-x-0" : "translate-x-full"}
        ${className}
        animated faster fixed z-40 top-0 right-0 h-full w-4/5 text-black bg-white max-w-sm px-4 py-6 overflow-auto transform
      `}
      >
        <div className="flex justify-end w-full">
          <button onClick={() => closeMenu()} type="button" className="text-black p-2 rounded hover:bg-gray-400 focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <CloseSvgPath />
            </svg>
          </button>
        </div>
        <ul>
          {menuItems.map((item, key) => (
            <li key={item.id}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && <Overlay />}
    </>
  )
}

export default OffCanvasMenu
