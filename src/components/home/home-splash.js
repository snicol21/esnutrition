import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const HomeSplash = () => {
  const { carouselImages } = useStaticQuery(graphql`
    {
      carouselImages: allFile(filter: { relativeDirectory: { eq: "home-carousel" } }) {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 910) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      {carouselImages.edges ? (
        carouselImages.edges.map(({ node: { id, childImageSharp } }) => (
          <div key={id}>
            <Img fluid={childImageSharp.fluid} className="home-carousel" />
          </div>
        ))
      ) : (
        <p>No Images found!</p>
      )}
    </div>
  )
}

export default HomeSplash
