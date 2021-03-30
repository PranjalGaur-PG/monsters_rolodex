import React, { Component } from 'react';
import logo from './logo.svg';
import { CardList } from './components/card-list/card-list.component'
import './App.css';
import reactDom from 'react-dom';
import { SearchBox, searchBox } from './components/search-box/search-box.component';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  // This is used to fetch data when the page loads for first time. We fetch
  // the information of different monsters in form of Json from an online source. 
  // So, internet connection required to load this information.
  componentDidMount() {          
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users}));
  }
  
  render() {
    // The next few lines of code does the Search Function and looks for the 
    // monsters whose names match with the string typed in the search box
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter( monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    // This chunch of code is the main code that is displayed on the main
    // screen. We fetch information from different files and assemble them here 
    // to get a complete file. This complete file is sent to index.html
    return(
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='Search monsters'
          handleChange = {e => this.setState({ searchField: e.target.value })}
        />
        <CardList monsters = {filteredMonsters}/>
      </div>
    )
  }
}

export default App;
