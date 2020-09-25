import React from 'react'
import axios from 'axios'
import classes from './blog.module.css'
import Button from '../Button/Button'
import classe from '../Contact/contact.module.css'
import Popup from '../../Popup/Popup'

class Blog extends React.Component {
    state={"author":"","post":"", "data" : "","popup":false}


    componentDidMount(){
        axios.get("http://0.0.0.0:5000/blog")
            .then(response=> this.setState({data : response.data}))
    }
    postHandler = (event)=> {
        event.preventDefault()
        let date = new Date("2020-03-25");
        const {author,post} = this.state
        axios.post("http://0.0.0.0:5000/blog", {author:author,post:post,date:date})
        .then(resp=>console.log(resp))
        this.setState({popup:true})
    }
    deleteHandler = (arg) => {
        console.log({"_id":arg._id})
        axios.delete("http://0.0.0.0:5000/blog",{"_id":arg._id})
        .then(resp => console.log(resp))
        .catch(error=>console.log(error))
    }

    render(){ 
        // console.log(this.state.popup)
        const { data,popup } = this.state
        // console.log(data)
         return (<React.Fragment>
         {popup ? <Popup clicked={()=>this.setState({popup:false})}>Your post is submited to mongodb database</Popup>:null}
            <div className={classe.div}>
                <h2 className={classe.h2}>Create a post</h2>
                <form onSubmit={this.postHandler}>
                    <label className={classe.label} htmlFor="author" >Author  </label>
                    <input className={classe.input} 
                    onChange={event=>this.setState({author:event.target.value})}
                    id="author" name="author"></input>
                    <label className={classe.label} htmlFor="post">Post </label>
                    <textarea className={classe.input}
                    onChange={event=>this.setState({post:event.target.value})}
                      cols="30" rows="10" id="post" name="post"></textarea>
                    <Button type={"submit"} name={classe.button}>Post</Button>
                </form>
            </div>

            { data ? data.map((item, index) => <div  key={item._id.$oid} className={classes.child}>
            
                                                    <p>{item.post}</p> 
                                                    <p>By: {item.author? (item.author):"N/A"}</p>
                                                    <p>{item.date}</p>
                                                    <Button name={classes.button}>Like</Button>|
                                                    <Button name={classes.button}>Dislike</Button>|
                                                    <Button name={classes.button}>Comment</Button>|
                                                    <Button name={classes.button} clicked={()=>this.deleteHandler(item)} >Delete</Button>
            </div>):null}
            
    
    </React.Fragment>
)}}
export default Blog;