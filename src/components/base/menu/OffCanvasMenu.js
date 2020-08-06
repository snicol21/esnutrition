import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import Overlay from "../Overlay"
import CloseButton from "../button/CloseButton"

const OffCanvasMenu = ({ isMenuOpen, toggleMenu, menuItems = [], className = "" }) => {
  const [isMenuClosing, setIsMenuClosing] = useState(false)

  const hideBodyScroll = hide => {
    if (typeof document !== `undefined`) {
      const setOverFlowY = value => (document.getElementsByTagName("body")[0].style.overflowY = value)
      hide ? setOverFlowY("hidden") : setOverFlowY("auto")
    }
  }

  const closeMenu = () => {
    document.getElementById("offCanvasMenu").classList.add("animate__slideOutRight")
    setIsMenuClosing(true)
    hideBodyScroll(false)
    setTimeout(() => {
      toggleMenu()
      setIsMenuClosing(false)
    }, 500)
  }
  const node = useRef()

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
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
        ${isMenuOpen ? "animate__slideInRight translate-x-0" : "translate-x-full"}
        ${className}
        animate__animated animate__faster fixed z-40 top-0 right-0 h-full w-4/5 text-black bg-white max-w-sm px-4 py-6 overflow-auto transform
      `}
      >
        <div className="flex justify-end w-full">
          <CloseButton disabled={!isMenuOpen} onClick={() => closeMenu()} className="text-black p-2 rounded hover:bg-gray-300" />
        </div>
        <ul>
          {menuItems.map((item, key) => (
            <li key={item.id}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      {isMenuOpen && !isMenuClosing && <Overlay className="md:hidden" />}
    </>
  )
}

export default OffCanvasMenu
