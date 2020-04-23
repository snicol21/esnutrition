import React from "react"
import { Link } from "gatsby"
import { CloseSvgPath } from "./SvgPaths"

const OffCanvasMenu = ({ isMenuOpen, toggleMenu, menuItems = [], className = "" }) => {
  const closeMenu = () => toggleMenu()
  return (
    <div
      className={`
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        ${className}
        fixed z-3 top-0 right-0 h-full w-4/5 text-black bg-white max-w-sm px-4 py-6 overflow-auto transform
      `}
    >
      <div className="flex justify-end w-full">
        <button onClick={() => closeMenu()} type="button" className="text-black p-2 rounded hover:bg-gray-300 focus:outline-none">
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
  )
}

export default OffCanvasMenu
