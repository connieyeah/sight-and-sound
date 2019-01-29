import React from 'react';
import axios from 'axios';

import Keywords from '../components/Keywords.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlSearchInput: '',
      hasSearched: false,
      dataFromClarifai: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      urlSearchInput: event.target.value
    })
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
      console.log(`this is response`, response);
      this.setState({
        hasSearched: true,
        dataFromClarifai: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const hasSearched = this.state.hasSearched;
    return (
      <div>
        {(!hasSearched) ? (
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
          ) : (
          <div>
          <h1>Descriptions</h1>
            <Keywords words={this.state.dataFromClarifai} />
          </div>
          )
        }
    </div>
    )
  }
}

export default Search;