import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlSearchInput: '',
      dataFromClarifi: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({urlSearchInput: event.target.value})
  }

  // function that sends url to clarifai api
  handleSubmit() {
    const { urlSearchInput } = this.state
    console.log('photo to be searched', this.state.urlSearchInput)

    axios.post('/clarifai', {
      urlSearchInput,
    })
    .then((response) => {
      // This response should have data from Clarifi Api
      // Save the data to state if needed
      // Clean up the data to a format that Spotify may use
      // Make another API to call to Spotify
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>SEARCH</h1>
        <form>
          <label>
            Enter image url
            <input 
              type="text"
              name=""
              onChange={this.handleChange}
            />
          </label>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
      
    )
  }
}

export default Search;