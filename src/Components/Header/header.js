import React, { Fragment } from 'react'
import classes from './Header.module.css'
import Navbar from './Nav/nav'





const Header = (props) => {
    return(<Fragment>
    <header className={classes.header}>
    <h1 className={classes.h1}>The Codiocity</h1>
    </header>
        <Navbar />
    </Fragment>)
}
export default Header;