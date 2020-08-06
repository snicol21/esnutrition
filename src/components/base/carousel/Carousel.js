import React from "react"
import { useCarousel } from "./useCarousel"

export const CarouselContainer = ({ children, slidesPresented = 1, interval = 5000 }) => {
  const slides = React.Children.toArray(children)
  const length = slides.length
  const numActive = Math.min(length, slidesPresented)
  const [active, setActive, handlers, style] = useCarousel(length, interval, { slidesPresented: numActive })
  const beforeIndices = makeIndices(slides.length - 1, -1, numActive)
  const afterIndices = makeIndices(0, +1, numActive)

  return (
    length > 0 && (
      <div className="relative overflow-hidden">
        <ol className="absolute right-0 bottom-0 left-0 z-10 flex justify-center pl-0 list-none m-auto">
          {slides.map((_, index) => (
            <li onClick={() => setActive(index)} key={index} className={`${active === index ? "cursor-default" : ""} relative flex-initial cursor-pointer`} />
          ))}
        </ol>
        <div {...handlers} style={style} className="flex flex-row flex-no-wrap overflow-hidden relative">
          {beforeIndices.map(i => (
            <CarouselChild key={i}>{slides[i]}</CarouselChild>
          ))}
          {slides.map((slide, index) => (
            <CarouselChild key={index}>{slide}</CarouselChild>
          ))}
          {afterIndices.map(i => (
            <CarouselChild key={i}>{slides[i]}</CarouselChild>
          ))}
        </div>
      </div>
    )
  )
}

export const CarouselChild = ({ children }) => <div className="w-full">{children}</div>

function makeIndices(start, delta, num) {
  const indices = []
  while (indices.length < num) {
    indices.push(start)
    start += delta
  }
  return indices
}
