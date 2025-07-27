import "bootstrap/dist/css/bootstrap.min.css";
import { About, Contact, Home, Menu, NotFoundPage, Orders } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Footer, NavBar } from "./components";

function App() {
  return (
    <>
        <NavBar/>


      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      <Footer/>
    </>
  )
}
export default App;