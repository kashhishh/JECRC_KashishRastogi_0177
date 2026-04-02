import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link}>Home</NavLink>
        <NavLink to="/about" style={styles.link}>About</NavLink>
        <NavLink to="/contact" style={styles.link}>Contact</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    background: "#333"
  },
  link: ({ isActive }) => ({
    color: isActive ? "red" : "blue",
    textDecoration: "none",
    fontSize: "18px"
  })
};

export default App;