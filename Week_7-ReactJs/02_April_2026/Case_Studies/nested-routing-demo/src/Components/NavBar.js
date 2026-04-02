import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MyApp</h2>

      <div>
        <NavLink to="/" style={styles.link} end>
          Home
        </NavLink>

        <NavLink to="/about" style={styles.link}>
          About
        </NavLink>

        <NavLink to="/contact" style={styles.link}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#222",
  },
   logo: {
    margin: 0
  },
  link: ({ isActive }) => ({
    color: isActive ? "red" : "blue",
    textDecoration: "none",
    fontSize: "18px"
  })
};

export default Navbar;