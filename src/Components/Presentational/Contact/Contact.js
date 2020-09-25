import React from 'react'
import classes from './contact.module.css'
import Button from '../Button/Button'
import axios from 'axios'
import Popup from '../../Popup/Popup'

export default class Contact extends React.Component {
      state = {
            "name":"",
            "email":"",
            "number":"",
            "info":"",
            "submit":false
        }

 
    postHandler=(event) =>{
        event.preventDefault();
        const {name,email,number,info} = this.state
        this.setState({"submit":true})
        const data = {name:name,email:email,number:number,info:info}
        axios.post("http://0.0.0.0:5000/contact",{ data })
            .then((response)=>console.log(response))

    }

    render(){
        const {  submit } = this.state
        return ( <React.Fragment>
            
                {submit ? <Popup clicked={()=>this.setState({submit:false})}>Thank you for connecting with us. <br/>We'll connect you soon... </Popup>: null }
            
            <div className={classes.div}>
                <h2 className={classes.h2}> Get in touch with us</h2 >
                <form  onSubmit={this.postHandler}>
                    <label htmlFor="name" className={classes.label}>Name </label>
                    <input id="name" name="name" 
                    autoComplete="off" required
                        className={classes.input} 
                        onChange={(event)=>this.setState({"name":event.target.value})} /><br/><br/>
                    <label htmlFor="email" className={classes.label}>Email </label>
                    <input id="email" name="email" 
                    autoComplete="off" required
                        className={classes.input} 
                        onChange={(event)=>this.setState({"email":event.target.value})}
                        /><br/><br/>
                    <label htmlFor="number" className={classes.label}>Contact No. </label>
                    <input id="number" name="number" 
                    autoComplete="off" required
                        className={classes.input} 
                        onChange={(event)=>this.setState({"number":event.target.value})}    
                        /><br/><br/>
                    <label htmlFor="info" className={classes.label}>Tell us</label><br/>
                    <textarea id="info" name="info" 
                        className={classes.input} 
                        onChange={(event)=>this.setState({"info":event.target.value})}
                        rows="10" cols="30"/><br/><br/>
                    <Button type={"submit"} name={classes.button}>Send Now</Button>
                </form >
            </div>
            
            </React.Fragment>
        )
    }
    }
