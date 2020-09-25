import React,{useState} from 'react'
import classes from './footer.module.css'
import Chatbot from './Chatbot/Chatbot'






const Footer = () => {
    const [chat,setchat] = useState({"data":false})
    const clickHandler = () => {
        let presentState = {...chat}
        setchat({data:!presentState.data})

    }
    
    return(

        <div>
            <footer className={classes.foot}>
                <div className={classes.container} >
                    <div className={classes.subcontainer} >
                        <a href="https://www.facebook.com/akram.0000786/"> <img  className={classes.facebook} src={require('./../../Assets/images/facebook.png')} alt='facebook' /> </a>
                        <img  className={classes.facebook} src={require('./../../Assets/images/instagram.png')} alt='Instagram' /> 
                        <img  className={classes.facebook} src={require('./../../Assets/images/linkedin.png')} alt='Linkedin' /> 
                    </div>
                    <div className={classes.subcontainer}>
                        <img  className={classes.facebook} src={require('./../../Assets/images/youtube.png')} alt='youtube' /> 
                        <img  className={classes.facebook} src={require('./../../Assets/images/twitter.png')} alt='twitter' /> 
                        <img  className={classes.facebook} src={require('./../../Assets/images/whatsapp.png')} alt='whatsapp' /> 
                    </div>
                </div>
            </footer>
            {chat.data? <Chatbot clicked={clickHandler} /> :null}
            <div className={classes.div} onClick={clickHandler} >Chat</div>
            </div>
        )
}
export default Footer;
