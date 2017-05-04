import React, {Component} from 'react'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Map from './Map'

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class App extends Component {
  constructor() {
    super();
    this.state = {logoSize: {'fontSize':'200px'} }
    this.handleScroll = this.handleScroll.bind(this);
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
        </section>
        <section>
          <Map />
        </section>
      </div>
    );
  }
}

export default App;