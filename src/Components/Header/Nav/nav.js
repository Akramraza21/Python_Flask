import React from "react";
import classes from "./navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className={classes.nav}>
    <ul className={classes.ul}>
      <li className={classes.li}>
        <NavLink className={classes.a} to="/">
          Home
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/posts"
        >
          Posts
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/profile"
        >
          Profile
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/sign"
        >
          Sign up
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/login"
        >
          Login
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/colleges"
        >
          Colleges
        </NavLink>
      </li>
      <li className={classes.li}>
        <NavLink
          activeClassName={classes.active}
          className={classes.a}
          to="/create"
        >
          Let US Create
        </NavLink>
      </li>
    </ul>
  </nav>
);
export default Navbar;
