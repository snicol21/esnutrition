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
      <div>
        <div>
          <Link to="/">{siteTitle}</Link>
          <Link to="/collections/supplements">Supplements</Link>
          <Link to="/collections/gear">Gear</Link>
        </div>
        <div>
          <Link to="/cart">
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
