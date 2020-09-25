import React from "react";
import classes from "../footer.module.css";
import classe from "./chatbot.module.css";
const Chatbot = (props) => (
  <div className={classes.chat}>
    <div className={classes.chatHead} onClick={props.clicked}>
      Codiocity Chatbot...
    </div>
    <div className={classes.chatBody}>
      <div className={classe.bots}>It's a bot. nice to see you here</div>
      <div className={classe.nonbot}> Hi! there, I'm human</div>
      <div className={classe.bots}> How may i help you?</div>
      <input className={classe.input} placeholder="Type message..." />
    </div>
  </div>
);

export default Chatbot;
