import React, { Component } from 'react';

// https://api.nasa.gov/planetary/apod?api_key=4In1cPVXWhxLhGd7bNRrQLagiYDqoVeC4e41gVDq

class App extends Component {

  state = {
    baseURL: 'https://images-api.nasa.gov',
    apiKey: 'apikey='
      + '4In1cPVXWhxLhGd7bNRrQLagiYDqoVeC4e41gVDq',
    query: '&t=',
    searchURL: '',
    userInput: '',
    data: []
  }

  // componentDidMount() {
  //   console.log('Mounted App.js')
  //   fetch('https://images-api.nasa.gov')
  //     .then(response => response.json()) // returns second Promise
  //     .then(data => this.setState({ data: data }))
  //     .catch(error => console.error(error))
  // }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      searchURL: this.state.baseURL + this.state.apiKey + this.state.query + this.state.userInput
    }, () => {


      // console.log(this.state.userInput);
      // axios will return a Promise aka a response with some kind of data or error(fulfilled, rejected, pending)
      // axios.get(`https://images-api.nasa.gov/search?q=${this.state.userInput}`)
      // whenever we get a response back, only then will then() run
      fetch('https://images-api.nasa.gov')
        .then(response => response.json())
        // .then(res => this.setState({
        //   data: res.data.collection.items
        // }))
        .then(res => this.setState({ data: res.state }))
        .then(data => this.setState({ data: data.collection.items }))
        .catch(error => console.error(error))
    })
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='userInput'>Search: </label>
          <input
            type='text'
            id='userInput'
            name='userInput'
            onChange={this.handleChange}
            value={this.state.userInput}
          />
          <input type="submit" value='submit' />
        </form>

        <div>
          {
            this.state.data.map((desc, i) => {
              // console.log(desc.links[0].href)
              // if (desc.links) {
              //   console.log('data')

              // } else {
              //   console.log('error, i')
              // }

              // some data for API may not have data for every single 
              return (
                <div key={desc.data[0].nasa_id}>
                  <h3>{desc.data[0].title}</h3>
                  <p>location:{desc.data[0].location}</p>
                  <p>Day-created:{desc.data[0].day_created}</p>
                  {/* <img src={desc.links ? desc.links[0].href : ''} alt="" /> */}
                  <img src={desc.links?.[0].href} alt="" />
                  <p>Description:{desc.data[0].description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;