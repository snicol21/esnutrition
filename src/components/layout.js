import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import ContextProvider from "../context/context-provider"
import Header from "./navigation/header"

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <div className="bg-black text-white leading-normal tracking-normal min-w-screen min-h-screen overflow-x-hidden">
              <Header
                siteTitle={data.site.siteMetadata.title}
                classContainerName="absolute z-50 w-full header-gradient"
                className="flex items-center justify-between px-4 py-6 pb-24 max-w-6xl m-auto"
              />
              <div>
                {children}
                <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
              </div>
            </div>
          </>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
