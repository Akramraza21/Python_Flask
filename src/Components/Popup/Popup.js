import React from 'react'
import classes from './popup.module.css'
const Popup = (props) => (
    <div className={classes.popupBase} onClick={props.clicked}>
        <div className={classes.popupBody} >
        <div className={classes.pupupChildren} >{props.children}</div>
        </div>
    </div>
)
export default Popup;