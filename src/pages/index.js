import React from "react"
import SEO from "../components/seo"
import ProductGrid from "../components/product/product-grid"

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Shop powered by Gatsby and Shopify.</p>
    <ProductGrid />
  </>
)

export default IndexPage
