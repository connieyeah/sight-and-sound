import React from 'react';
import styles from '../styles/Login.scss'


class Login extends React.Component {
  render() {
    return (
      <div className={styles.container__index}>
        <h1>Who Sampled Playlist Creator</h1>
        <h2>Discover the good stuff! Create playlists of music that your favorite artist has sampled from!</h2>
        <a href="/login"><button className={styles['button__login-spotify']}><i className="fab fa-spotify"></i> Log in with Spotify</button></a>
        <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: '10px' }}>Created by Albert Huynh</div>
      </div>
    )
  }
}

export default Login;