import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { CarouselContainer, CarouselChild } from "../base/carousel/Carousel"

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
    <CarouselContainer isSwipeable={false}>
      {carouselImages.edges.map(({ node: { id, childImageSharp } }) => (
        <CarouselChild>
          <Img key={id} fluid={childImageSharp.fluid} className="home-carousel" draggable={false} />
        </CarouselChild>
      ))}
    </CarouselContainer>
  )
}

export default HomeSplash
