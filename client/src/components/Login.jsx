import React from 'react';
import styles from '../styles/Login.scss'


class Login extends React.Component {
  render() {
    console.log(`HI IM AEAKE LOGIN PAGE`, this.props)
    return (
      <div className={styles.container__index}>
        <h1>Music MVP</h1>
        <h2>Discover music...</h2>
        <a href="/login"><button className={styles['button__login-spotify']}><i className="fab fa-spotify"></i> Log in with Spotify</button></a>
        <div style={{ color: '#FFFFFF', fontWeight: 700, marginTop: '10px' }}>Created by Albert Huynh</div>
      </div>
    )
  }
}

export default Login;