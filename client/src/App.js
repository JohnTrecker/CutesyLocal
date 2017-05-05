import React, {Component} from 'react'
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
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
          <p className="tagline">{this.state.tagline}</p>
        </section>
        <section>
          <Map />
        </section>
      </div>
    );
  }
}

export default App;