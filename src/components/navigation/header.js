import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import StoreContext from "../../context/store-context"

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = items.reduce((acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Header = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <header>
      <div className="header">
        <div className="left">
          <Link to="/" className="link">
            {siteTitle}
          </Link>
          <Link to="/collections/supplements" className="link">
            Supplements
          </Link>
          <Link to="/collections/gear" className="link">
            Gear
          </Link>
        </div>
        <div className="right">
          <Link to="/cart" className="link cart">
            Cart
            {hasItems && <span>{quantity}</span>}
          </Link>
        </div>
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
