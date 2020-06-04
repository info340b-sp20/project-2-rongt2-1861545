// import React, { Component } from 'react'; //import React Component
// import Moment from 'react-moment';
// import firebase from 'firebase/app';

// //A list of chirps that have been posted
// export default class TodoList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {todos:[]};
//   }

// componentDidMount() {
//   let chirpsRef = firebase.database().ref('todos');
  
//   chirpsRef.on('value', (snapshot) => {
//     let data = snapshot.val();

//     // if (this.props.todos) {
//       let chirpKeys = Object.keys(data);
//       let chirpArray = chirpKeys.map((key) => {
//         let chirpObj = data[key];
//         chirpObj.id = key;
//         return chirpObj;
//       })
//       this.setState({ todos: chirpArray });
//     // } else {
//     //   return
//     // }
  

//   })
// }

//   render() {
//     if(!this.state.chirps) return null; //if no chirps, don't display

//     /* TODO: produce a list of `<ChirpItems>` to render */
//     let chirpItems = this.state.chirps.map((chirp) => {
//       return <ChirpItem  key={chirp.id} chirp={chirp} currentUser={this.props.currentUser} />
//     })  

//     return (
//       <div className="container">
//           {chirpItems}
//       </div>);
//   }
// }

// //A single Chirp
// class ChirpItem extends Component {

//   likeChirp = () => {
//     /* TODO: update the chirp when it is liked */
//     let chirp = firebase.database().ref('chirps/' + this.props.chirp.id + '/likes');//.child(this.props.chirp.id).child('likes');
//     let current = this.props.chirp.likes;
//     let id = this.props.currentUser.uid;
//     if (current === undefined) {
//       current = {};
//     }
//     if (current[id] !== undefined) {
//       current[id] = null;
//     } else {
//       current[id] = true;
//     }
//     chirp.set(current)
//       .catch((err) => {
//         console.log(err);
//       });
//   }
 
//   render() {
//     let chirp = this.props.chirp; //current chirp (convenience)

//     //counting likes
//     let likeCount = 0; //count likes
//     let userLikes = false; //current user has liked
//     if(chirp.likes){
//       likeCount = Object.keys(chirp.likes).length;
//       if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
//         userLikes = true; //user liked!
//     }

//     return (
//       <div className="row py-4 bg-white border">
//         <div className="col-1">
//           <img className="avatar" src={chirp.userPhoto} alt={chirp.userName+' avatar'} />
//         </div>
//         <div className="col pl-4 pl-lg-1">

//           <span className="handle">{chirp.userName} {/*space*/}</span>

//           <span className="time"><Moment date={chirp.time} fromNow/></span>

//           <div className="chirp">{chirp.text}</div>

//           {/* A section for showing chirp likes */}
//           <div className="likes">          
//             <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.likeChirp} ></i>
//             <span>{/*space*/} {likeCount}</span>
//           </div>
//         </div>
//       </div>      
//     );
//   }
// }
