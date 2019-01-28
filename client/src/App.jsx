import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Search from './components/Search.jsx';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenExist: false
    }
  }

  componentWillMount() {
    const params = (new URL(window.location)).searchParams
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    if (access_token !== null && refresh_token !== null) {
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('refreshToken', refresh_token)
      this.setState({tokenExist: true})
    }
  }

  render() {
    const tokenExist = this.state.tokenExist
    return (
      <Router>
        <div>
          {tokenExist ? 
            <Route path="/" exact component={Search} />
            : <Route path="/" exact component={Login} />
          }
        </div>
        
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));