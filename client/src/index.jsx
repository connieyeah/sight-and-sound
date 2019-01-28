import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));