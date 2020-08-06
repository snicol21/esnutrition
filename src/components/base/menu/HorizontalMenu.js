import React from "react"
import { Link } from "gatsby"

const HorizontalMenu = ({ menuItems = [], className = "" }) => {
  return (
    <ul className={`${className}`}>
      {menuItems.map(item => (
        <li key={item.id}>
          <div className="text-white">
            <Link
              to={item.link}
              activeClassName="text-black pt-1 border-b-4 border-theme-primary font-semibold bg-theme-primary-light-75 hover:font-semibold hover:bg-theme-primary-light-75"
              className="flex items-center h-16 px-4 hover:bg-gray-800"
            >
              {item.name}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default HorizontalMenu
