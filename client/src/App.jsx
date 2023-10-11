import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./components/navbar/Navbar"
import Register from "./pages/register/Register"
import Login from "./pages/login/Login"
import Cart from "./pages/cart/Cart"
import Page404 from "./pages/invalid_pages/Page404"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"

const App = () => {
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App