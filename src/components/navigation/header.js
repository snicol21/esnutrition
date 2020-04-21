import React, { useContext, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import StoreContext from "../../context/store-context"
import { HamburgerSvgPath, CloseSvgPath, ShoppingCartSvgPath } from "../base/SvgPaths"

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = items.reduce((acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!isOpen)
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo-white-no-mark.jpg" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `)
  const [hasItems, quantity] = useQuantity()

  return (
    <header>
      <div className="flex items-center justify-between px-4 py-6">
        <div className="flex items-center align-middle">
          <Link to="/" className="flex items-center mr-5">
            <Img loading="eager" fixed={data.logo.childImageSharp.fixed} />
          </Link>
        </div>
        <div>
          <button onClick={toggleOpen} type="button" className="text-white p-2 rounded hover:bg-gray-700 focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen && <CloseSvgPath />}
              {!isOpen && <HamburgerSvgPath />}
            </svg>
          </button>
          <Link to="/cart">
            <button type="button" className="text-white p-2 rounded hover:bg-gray-700 focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <ShoppingCartSvgPath />
              </svg>
              {hasItems && (
                <span className="absolute -mt-2 ml-2 text-sm bg-red-600 rounded-full font-bold h-6 w-6 flex items-center justify-center">{quantity}</span>
              )}
            </button>
          </Link>
        </div>
      </div>
      <div className={`px-2 pt-2 pb-4 ${isOpen ? "block" : "hidden"}`}>
        <Link to="/collections/supplements" className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">
          Supplements
        </Link>
        <Link to="/collections/gear" className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-800">
          Gear
        </Link>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

/*
<Link to="/cart">
Cart
{hasItems && <span>{quantity}</span>}
</Link>
*/
