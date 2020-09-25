import React from 'react'
const Button = props => (
    <button   onClick={props.clicked} type={props.type} className={props.name}>{props.children}</button>
)
export default Button;