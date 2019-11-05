import React, { Component, Fragment } from 'react';

class AboutPage extends Component {

    render(){
        return(
            <div className = "about_wrap">
                <div className ="title">
                    <h1>About</h1>
                </div>
                <center className ="txt_area">
                <textarea className ="area" disabled rows="11" cols="70">
          Info here

</textarea>
                </center>
                
            </div>
        )
    }
}


export default AboutPage;
