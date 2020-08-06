import React, { useContext, useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import StoreContext from "../../context/store-context"
import OffCanvasMenu from "../base/menu/OffCanvasMenu"
import HorizontalMenu from "../base/menu/HorizontalMenu"
import HamburgerButton from "../base/button/HamburgerButton"
import ShoppingCartButton from "../base/button/ShoppingCartButton"

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = items.reduce((acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Header = ({ classContainerName = "", className = "" }) => {
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
      logo: file(relativePath: { eq: "logo-white-no-mark.png" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed_noBase64
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
    <header className={`${classContainerName}`}>
      <div className={`${className}`}>
        <div className="flex items-center align-middle">
          <Link to="/" className="flex items-center mr-5">
            <Img loading="eager" fixed={data.logo.childImageSharp.fixed} />
          </Link>
        </div>
        <HorizontalMenu menuItems={menuItems} className="hidden md:visible md:flex" />
        <div className="flex">
          <HamburgerButton
            disabled={isMenuOpen}
            onClick={() => toggleMenu()}
            classContainerName="md:hidden"
            className="text-white p-2 rounded hover:bg-black hover:bg-opacity-25"
          />
          <Link to="/cart">
            <ShoppingCartButton className="text-white p-2 rounded hover:bg-black hover:bg-opacity-25">
              {hasItems && (
                <span className="absolute -mt-2 ml-2 text-sm bg-red-600 rounded-full font-bold h-6 w-6 flex items-center justify-center">{quantity}</span>
              )}
            </ShoppingCartButton>
          </Link>
        </div>
      </div>
      <OffCanvasMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} menuItems={menuItems} className="md:hidden" />
    </header>
  )
}

export default Header
