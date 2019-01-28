import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlSearchInput: ''
    }
  }

  handleChange(event) {
    this.setState({urlSearchInput: event.target.value})
  }

  // function that sends url to clarifai api
  handleSubmit() {
  }


  render() {
    console.log(`search component being rendered...`, this.props)
    return (
      <div>
        <h1>SEARCH</h1>
        <form>
          <label>
            Enter image url
            <input type="text" name="" />
          </label>
        </form>
      </div>
      
    )
  }
}

export default Search;