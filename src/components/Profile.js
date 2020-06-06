import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return(
      <div className="tile is-parent profile-card">
        <article className="tile is-child">
          <div className="card is-mobile">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src="img/avatar.jpeg" alt="Small Avatar" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4" id="profile_name">James Kim</p>
                  <p className="subtitle is-6">@jamesk97</p>
                </div>
              </div>
              <div className="is-divider" />
              <div className="accomplishments">
                <span className="tag is-primary is-light"><i className="fas fa-medal" />Kind of a big deal</span>
                <span className="tag is-danger is-light"><i className="far fa-hand-rock" />StayAtHome2020</span>
                {/*<span class="tag is-link is-light"><i class="fas fa-trophy"></i>100TodosCompleted</span>*/}
              </div>
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">todos</p>
                    <p className="title">12</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Goals</p>
                    <p className="title">6</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Likes</p>
                    <p className="title">35</p>
                  </div>
                </div>
              </nav>
              <div className="content">
                <p>TA for info340: client-side programming <a href="/">jamesk97@uw.edu</a>.</p>
                <a href="/">#css</a> <a href="/">#responsive</a>
                <br />
                {/* <time dateTime="2016-1-1">Last seen: few minutes ago</time> */}
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default Profile;
