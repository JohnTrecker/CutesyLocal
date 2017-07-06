import React from 'react';
import Home from "./Home"
import Construction from "./Construction"

const Landing = () => window.innerWidth > 420 ? <Home/> : <Construction/>

export default Landing;