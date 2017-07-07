import React, {Component} from 'react'
import { Link } from 'react-router-dom'

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
          <h1> Moraga July 4th Dog Parade </h1>
          <h2> Every dog registered for the parade receives a special award and a treat! </h2>
          <h2> 9:30am July 4, 2017 </h2>
          <h4> Register at </h4>
          <a href="https://www.eventbrite.com/e/moraga-july-4th-dog-parade-tickets-34941831960?aff=es2">
            <img className="partnerLogo" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F32087499%2F132841432042%2F1%2Foriginal.jpg?h=150&w=300&rect=0%2C26%2C2160%2C1080&s=a307f528a19468bf7f7adf53af93a535" role="presentation"/>
          </a>
        </section>

        <section >
          <Button text="Dog Events"/>
        </section>

        <section>
          <h1> Monday Nights at Zazie's </h1>
          <h2> $10 off any bottle of wine and treats for your pup </h2>
          <h4> as Featured in </h4>
          <a href="https://www.thisdogslife.co/this-san-francisco-bistro-rewards-you-for-bringing-your-dog-with-a-sweet-wine-special/">
            <img className="partnerLogo" src="https://assets.entrepreneur.com/provider/1491862286_New%20Instagram%20Logo%20with%20Buckle%20Entrepreneur%20.jpg" role="presentation"/>
          </a>
        </section>

        <section >
          <Button text="Bars and Restaurants"/>
        </section>

        <section>
          <h1> Pug Sunday </h1>
          <h2> Alta Plaza Park's monthly cuddle puddle </h2>
          <h2> First Sundays, 2:30pm </h2>
          <h4>as Featured in</h4>
          <a href="https://ww2.kqed.org/news/2013/05/07/pug-sunday/">
            <img className="partnerLogo" src="https://ww2.kqed.org/arts/wp-content/themes/KQED-unified/img/hd-kqed-news.png" role="presentation"/>
          </a>
        </section>

        <section className="mask-parks" >
          <Button text="Dog Parks"/>
        </section>

      </div>
    );
  }
}


const Button = (props) => <Link className="btn-map" to='/map'>{props.text}</Link>
export default Home;