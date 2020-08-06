import React from "react"
import Icon from "../Icon"

const ShoppingCartButton = ({ children, disabled = false, onClick, classContainerName = "", className = "" }) => {
  return (
    <>
      <div className={`z-30 ${classContainerName}`}>
        <button disabled={disabled} onClick={onClick} type="button" className={`focus:outline-none ${className}`}>
          <Icon name="shopping-cart" className="h-6 w-6" />
          {children}
        </button>
      </div>
    </>
  )
}
export default ShoppingCartButton
