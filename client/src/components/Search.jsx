import React from 'react';
import axios from 'axios';

// import Keywords from '../components/Keywords.jsx';

const getReqParams = (accessToken) => ({
  dataType: 'json',
  headers: { 'Authorization': 'Bearer ' + accessToken }
})

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
    this.getSearchApi = this.getSearchApi.bind(this);
  }

  handleChange(event) {
    this.setState({
      urlSearchInput: event.target.value
    })
  }


  getSearchApi(searchTerm) {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(`this is accessToken`, accessToken)
    // console.log(`this is searchTerm`, searchTerm)
    axios.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=track', getReqParams(accessToken))
      .then(response => {
        console.log(`response from spotify`, response)
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
      // console.log(`response from clarifai`, response.data[0]);
      // Save the data to state if needed
      this.setState({
        hasSearched: true,
        dataFromClarifai: response.data[0]
      })
      this.getSearchApi(response.data[0])
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
            {/* <Keywords words={this.state.dataFromClarifai} /> */}
          </div>
          )
        }
    </div>
    )
  }
}

export default Search;