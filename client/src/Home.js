import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-parallax';

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

    if (scrollTop < 200) this.refs.logo.className = 'logo';
    if (scrollTop >= 200 && scrollTop < 650) {
      let size = Math.floor( (scrollTop - 800) / -3 );
      let styledSize = {'fontSize': `${size}px`}
      this.refs.logo.className = 'logo-transitioned'
      this.setState({logoSize: styledSize})
    }
    return
  }

  render() {
    let mobile = true
    if (window.innerWidth > 420) mobile = false
    return (
      <div className='App'>

        <section>
          <p ref='logo' className='logo' style={this.state.logoSize}> Cutesy Local </p>
          <p ref='tagline' className='tagline'> {this.state.tagline} </p>
        </section>

        <section>
          <h1> Dog Days of Summer </h1>
          <h2> Pre-game parade, costume contest, Giants vs. Twins </h2>
          <h2> June 11, 2017 </h2>
          <h4>Presented by</h4>
          <a href="http://sanfrancisco.giants.mlb.com/sf/fan_forum/experiences/dog-day.jsp">
            <img className="partnerLogo" src="https://static.seekingalpha.com/uploads/2016/11/37462776_14782012598722_rId6.jpg" role="presentation"/>
          </a>
        </section>

        <Parallax bgImage='assets/mask_event.jpg' strength={300}>
          <Button text="Dog Events"/>
        </Parallax>

        <section>
          <h1> Monday Nights at Zazie's </h1>
          <h2> $10 off any bottle of wine and treats for your pup </h2>
          <h4> as Featured in </h4>
          <a href="https://www.thisdogslife.co/this-san-francisco-bistro-rewards-you-for-bringing-your-dog-with-a-sweet-wine-special/">
            <img className="partnerLogo" src="https://assets.entrepreneur.com/provider/1491862286_New%20Instagram%20Logo%20with%20Buckle%20Entrepreneur%20.jpg" role="presentation"/>
          </a>
        </section>

        <Parallax bgImage='assets/mask_restaurant.jpg' strength={300}>
          <Button text="Bars and Restaurants"/>
        </Parallax>

        <section>
          <h1> Pug Sunday </h1>
          <h2> Alta Plaza Park's monthly cuddle puddle </h2>
          <h2> First Sundays, 2:30pm </h2>
          <h4>as Featured in</h4>
          <a href="https://ww2.kqed.org/news/2013/05/07/pug-sunday/">
            <img className="partnerLogo" src="https://ww2.kqed.org/arts/wp-content/themes/KQED-unified/img/hd-kqed-news.png" role="presentation"/>
          </a>
        </section>

        <Parallax bgImage='assets/mask_park.jpg' strength={300}>
          <Button text="Dog Parks"/>
        </Parallax>

      </div>
    );
  }
}


const Button = (props) => <Link className="btn-map" to='/map'>{props.text}</Link>
export default Home;