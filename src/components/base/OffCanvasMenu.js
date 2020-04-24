import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { CloseSvgPath } from "./SvgPaths"
import Overlay from "./Overlay"

const OffCanvasMenu = ({ isMenuOpen, toggleMenu, menuItems = [], className = "" }) => {
  const closeMenu = () => toggleMenu()
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
  }, [isMenuOpen])

  return (
    <>
      <div
        ref={node}
        className={`
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        ${className}
        fixed z-40 top-0 right-0 h-full w-4/5 text-black bg-white max-w-sm px-4 py-6 overflow-auto transform
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
      <Overlay isVisible={isMenuOpen} />
    </>
  )
}

export default OffCanvasMenu
