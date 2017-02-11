import React from 'react';
import Login from './Login';
import Reviews from './Reviews';
import Info from './Info';
import { Sidebar } from 'semantic-ui-react'
// import './semantic-ui/semantic.min.css';
// import './assets/index.css';
console.log(Sidebar._meta.props.width);

class Popup extends React.Component {
  // on marker click render Info
  // on `reviews` click render Reviews
  render() {
   const { marker, user, visible } = this.props
    return (
      <Sidebar animation='overlay' direction='bottom' visible={visible}>
        <Info marker={marker} user={user}/>
      </Sidebar>
    )
  }
}
        // <Reviews marker={marker} />

export default Popup;

// class Popup extends React.Component {
//   render(){
//     if (!this.props.marker) return( <div></div> );

//     // const panel = JSON.parse(marker.reviews);

//     return (
//       <div className="popup-contents ui slide left instant reveal">
//         <div className="visible content">
//           <div className="review-icons">
//             <i className="comments outline icon"></i>
//           </div>
//         </div>

//           { showReview &&
//             <Reviews
//               review={ review }
//               reviewer={ reviewer }
//               image={ venue.reviews[0].image } />
//           }
//           {
//             !showReview && loggedIn &&
//             <LeaveReview
//               name={ venue.name }
//               toggleModal={this.props.toggleModal}
//               setUser={this.props.setUser}/>
//           }
//           { !showReview && !loggedIn &&
//             <Login
//               name={ venue.name }
//               setUser={this.props.setUser}/>
//           }

//       </div>
//     )
//   }
// };

// const Reviews = (props) =>
//   <div className="hidden content" >
//     <div className="review-image">
//       <img id="reviewer" src={ props.image } className={ props.reviewer } role="presentation"/>
//     </div>
//     <div className="review-info">
//       <p className="title">{ props.reviewer }</p>
//       <p className="address">{ props.review }</p>
//     </div>
//   </div>

// const LeaveReview = (props) =>
//   <div className="hidden content no-review">
//     <p>Been to { props.name } before?&ensp;</p>
//     <a onClick={ props.toggleModal }>Leave a review.</a>
  // </div>