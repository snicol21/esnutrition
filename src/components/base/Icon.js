import React from "react"

const Icon = ({ name = "", className = "" }) => {
  const getIcon = () => {
    switch (name) {
      case "close":
        return <Close className={className} />
      case "hamburger":
        return <Hamburger className={className} />
      case "shopping-cart":
        return <ShoppingCart className={className} />
      default:
        return <div></div>
    }
  }
  return <>{getIcon()}</>
}
export default Icon

const Close = ({ className }) => {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
    </svg>
  )
}

const Hamburger = ({ className }) => {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
    </svg>
  )
}

const ShoppingCart = ({ className }) => {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
    </svg>
  )
}
