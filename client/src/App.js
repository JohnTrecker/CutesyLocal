import React, {Component} from 'react'
import { Button, Icon } from 'semantic-ui-react';
import Map from './Map'

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class App extends Component {
  constructor() {
    super();
    this.state = {
      logoSize: {'fontSize':'200px'},
      tagline: '' }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount(){
    const index = [].concat('Dog friendly places near you', 'Never leave your wingman', 'Bring him along', 'Love is a four-legged word', 'Life is better with a dog');
    let tagline = index[Math.floor(Math.random() * 5)];
    window.scrollTop = 500;
    this.setState({tagline: tagline})
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(event) {
    let scrollTop = event.target.body.scrollTop;

    if (scrollTop < 200) this.refs.logo.className = 'logo'
    if (scrollTop >= 200 && scrollTop < 650) {
      let size = Math.floor( (scrollTop - 800) / -3 );
      let styledSize = {'fontSize': `${size}px`}
      this.refs.logo.className = 'logo-transitioned'
      this.setState({logoSize: styledSize })
    }
    return
  }

  autoscroll(){
    const map = document.getElementById('container');
    map.scrollIntoView({block: "end", behavior: "smooth"})
  }

  render() {
    return (
      <div className='App'>
        <section>
          <p
            ref='logo'
            className='logo'
            style={this.state.logoSize}>
            Cutesy Local
          </p>
          <div className="tagline">
            <p className="tagline-text">{this.state.tagline}</p>
            <Icon
              className="tagline-btn"
              size="huge"
              name="chevron circle down"
              onClick={this.autoscroll.bind(this)}/>
          </div>
        </section>
        <section>
          <Map/>
        </section>
      </div>
    );
  }
}

export default App;