import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Parallax } from 'react-parallax';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

class Home extends Component {
  constructor() {
    super();
    this.state = {
      logoSize: {'width':'600px'},
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
  adjust(scrollTop, className){
    let size = Math.floor( (-39 * scrollTop) / 99 + 636.36 );
    let styledSize = {'width': `${size}px`}
    this.refs.logo.className = `logo ${className}`;
    this.setState({logoSize: styledSize});
  }
  handleScroll(event) {
    let scrollTop = event.target.body.scrollTop;

    if (scrollTop < 100) this.refs.logo.className = 'logo';
    if (scrollTop >= 100 && scrollTop < 200) this.adjust(scrollTop, 'transitioning');
    if (scrollTop >= 200 && scrollTop < 650) this.adjust(scrollTop, 'transitioned');
    return
  }
  render() {
    return (
      <div className='App'>

        <section>
          <div ref="logo" className="logo" style={this.state.logoSize}></div>
          <p className="tagline">{this.state.tagline}</p>
        </section>

        <section>
          <h1> Summer of Pug </h1>
          <h2> Wine tasting and pug chasing at Wine Makers Studio on Treasure Island </h2>
          <h2> 1-4pm July 9, 2017 </h2>
          <h4> Hosted by </h4>
          <a href="https://www.eventbrite.com/e/summer-of-pug-tickets-35131999757?aff=eiosprexshreclip&ref=eiosprexshreclip">
            <img className="partnerLogo" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F32917952%2F215123113033%2F1%2Foriginal.jpg?w=800&rect=0%2C86%2C612%2C306&s=a71d0e0bcd68729637acd24b019bf5ec" role="presentation"/>
          </a>
        </section>

        <Parallax bgImage="assets/mask_event.jpg" strength={300}>
          <Button text="Dog Events" venue="event"/>
        </Parallax>

        <section>
          <h1> Monday Nights at Zazie's </h1>
          <h2> $10 off any bottle of wine and treats for your pup </h2>
          <h4> as Featured in </h4>
          <a href="https://www.thisdogslife.co/this-san-francisco-bistro-rewards-you-for-bringing-your-dog-with-a-sweet-wine-special/">
            <img className="partnerLogo" src="http://www.tinypawssmalldogrescue.org/images/TinyPawsLogo.png" role="presentation"/>
          </a>
        </section>

        <Parallax bgImage="assets/mask_restaurant.jpg" strength={300}>
          <Button text="Bars and Restaurants" venue="restaurant"/>
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

        <Parallax bgImage="assets/mask_park.jpg" strength={300}>
          <Button text="Dog Parks" venue="park"/>
        </Parallax>

      </div>
    );
  }
}


const Button = (props) => <Link className={`btn-map ${props.venue}`} to='/map'>{props.text}</Link>
export default Home;