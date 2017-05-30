import React, {Component} from 'react'
import { Icon } from 'semantic-ui-react';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class Home extends Component {
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
    let mobile = true
    if (window.innerWidth > 420) mobile = false
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
            href='/map' />
        </div>
        </section>
        <section>
          <h1> Dog Days of Summer </h1>
          <h3> Pre-game parade and costume contest. Then watch the Giants vs. Twins. </h3>
          <h3> June 11, 2017 </h3>
          <h4>Presented by</h4>
          <a href="https://www.thisdogslife.co/this-san-francisco-bistro-rewards-you-for-bringing-your-dog-with-a-sweet-wine-special/">
            <img className="partnerLogo" src="https://static.seekingalpha.com/uploads/2016/11/37462776_14782012598722_rId6.jpg"/>
          </a>
        </section>
        <section>
          <Button text="Dog-Friendly Events"/>
        </section>
        <section>
          <h1> Monday Nights at Zazie's </h1>
          <h3> $10 off any bottle of wine and treats for your pup. </h3>
          <h4> as Featured in </h4>
          <img className="partnerLogo" src="https://assets.entrepreneur.com/provider/1491862286_New%20Instagram%20Logo%20with%20Buckle%20Entrepreneur%20.jpg"/>
        </section>
        <section>
          <Button text="Bars and Restaurants"/>
        </section>
        <section>
          <h1> Pug Sunday </h1>
          <h3> Alta Plaza Park's monthly cuddle puddle </h3>
          <h3> First Sundays, 2:30pm </h3>
          <h4>as Featured in</h4>
          <a href="https://ww2.kqed.org/news/2013/05/07/pug-sunday/">
            <img className="partnerLogo" src="https://ww2.kqed.org/arts/wp-content/themes/KQED-unified/img/hd-kqed-news.png"/>
          </a>
        </section>
        <section>
          <Button text="Dog Parks" style={'color: white'}/>
        </section>
      </div>
    );
  }
}


const Button = (props) => <a className="btn-map" href='/map'>{props.text}</a>
export default Home;