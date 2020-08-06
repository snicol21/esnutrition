import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import StoreContext from "../../context/store-context"
import OffCanvasMenu from "../base/OffCanvasMenu"
import Icon from "../base/Icon"

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = items.reduce((acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const [hasItems, quantity] = useQuantity()

  /* replace this with data from graphql */
  const menuItems = [
    { id: 1, name: "Supplements", link: "/collections/supplements" },
    { id: 2, name: "Gear", link: "/collections/gear" },
  ]

  const data = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "logo-white-no-mark.jpg" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      collections: allSitePage(filter: { path: { regex: "/collections/" } }) {
        edges {
          node {
            path
            context {
              handle
              title
            }
          }
        }
      }
    }
  `)

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center align-middle">
          <Link to="/" className="flex items-center mr-5">
            <Img loading="eager" fixed={data.logo.childImageSharp.fixed} />
          </Link>
        </div>
        <div>
          <button disabled={isMenuOpen} onClick={() => toggleMenu()} type="button" className="text-white p-2 rounded hover:bg-gray-700 focus:outline-none">
            <Icon name="hamburger" className="h-6 w-6" />
          </button>
          <Link to="/cart">
            <button type="button" className="text-white p-2 rounded hover:bg-gray-700 focus:outline-none">
              <Icon name="shopping-cart" className="h-6 w-6" />
              {hasItems && (
                <span className="absolute -mt-2 ml-2 text-sm bg-red-600 rounded-full font-bold h-6 w-6 flex items-center justify-center">{quantity}</span>
              )}
            </button>
          </Link>
        </div>
      </div>
      <OffCanvasMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} menuItems={menuItems} />
    </header>
  )
}

export default Header
