import React from 'react';
import axios from 'axios';

import styles from '../styles/Search.scss';

import Keywords from '../components/Keywords.jsx';

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
      clarifaiData: null,
      spotifyData: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSearchApi = this.getSearchApi.bind(this);
  }

  handleChange(event) {
    this.setState({
      urlSearchInput: 'https:'+event.target.value
    })
  }

  getSearchApi(searchTerm) {
    const accessToken = localStorage.getItem('accessToken');
    // console.log(`this is accessToken`, accessToken)
    // console.log(`this is searchTerm`, searchTerm)
    axios.get('https://api.spotify.com/v1/search?q=' + searchTerm + '&type=track', getReqParams(accessToken))
      .then(response => {
        // var tracks = Object.values(map((response) => (response.data.name)))
        console.log(`response from spotify`, response.data.tracks.items[0].name)
        // console.log(`these are tracks`, tracks)
        this.setState({
          spotifyData: ''
        })
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
      // console.log(`response from clarifai`, response.data[0]);
      this.setState({
        hasSearched: true,
        clarifaiData: response.data
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
      <div className={styles.search__container}>
        {(!hasSearched) ? (
          <div>
          <h1>SEARCH</h1>
          <form>
            <label>
              Enter image url
              <input 
                type="text"
                name=""
                required onChange={this.handleChange}
              />
            </label>
          </form>
          <button onClick={this.handleSubmit}>Submit</button>
          </div>
          ) : (
          <div>
            <img src={this.state.urlSearchInput} />
            <h2>AI visual recognition</h2>
            <span>
            <Keywords words={this.state.clarifaiData} />
            </span>
            <span>
              <h2>Song based off image</h2>
              <div class={styles.embed__container}>
                <iframe src='https://embed.spotify.com/?uri=spotify:track:6oKeVXkFW8W91cyoWVgRHE' frameborder='0' allowtransparency='true'></iframe>
              </div>
            </span>
          </div>
          )
        }
    </div>
    )
  }
}


export default Search;