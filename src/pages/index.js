import React from "react"
import SEO from "../components/seo"
import HomeSplash from "../components/home/home-splash"
import ProductGrid from "../components/product/product-grid"

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <HomeSplash />
    {/* <ProductGrid /> */}
  </>
)

export default IndexPage
