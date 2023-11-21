import {
  About,
  Adds,
  Carousel,
  Locations,
  Welcome,
} from "@/components"
import { Route, Routes } from "react-router-dom"
import Services from "./nested-pages/Services"

const Home = () => {
  return (
    <Routes>
      <Route index element={<Page />} />
      <Route path="/service" element={<Services />} />
    </Routes>
  )
}

const Page = () => (
  <div>
    <Carousel />
    <Welcome />
    <About />
    <Adds />
    <Locations />
  </div>
)

export default Home
