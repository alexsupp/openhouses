import React, { Component } from 'react';
import './App.css';
import PropertyCard from './components/PropertyCard';
import { generateUuid } from './uuid';
import base64 from 'base-64';
import fire from './firebase';

/**
 * Main container component for bootstrapping the application
 **/
class App extends Component {
  constructor(props) {
    super(props);
    const uuid = localStorage.getItem('uuid') || generateUuid();
    this.state = {
      data: null,
      loading: true,
      uuid: uuid,
      userData: {}
    };
    localStorage.setItem('uuid', uuid);
  }

  componentDidMount = () => {
    this.getAllProperties();
    this.getUserData();
  };

  getAllProperties = () => {
    const headers = new Headers();
    const url = `https://api.simplyrets.com/properties`;
    headers.set(
      'Authorization',
      `Basic ${base64.encode(
        process.env.REACT_APP_SIMPLYRETSUSERNAME +
          ':' +
          process.env.REACT_APP_SIMPLYRETSPASSWORD
      )}`
    );

    fetch(url, { method: 'GET', headers: headers })
      .then(response => response.json())
      .then(data => this.setState({ loading: false, data: data }));
  };

  getUserData = () => {
    let ref = fire.database().ref(`/${this.state.uuid}`);
    ref.once('value', snapshot => {
      const state = snapshot.val() || {};
      this.setState({ userData: state });
    });
  };

  saveUserData = () => {
    let ref = fire.database().ref(`/${this.state.uuid}`);
    ref.set(this.state.userData);
  };

  toggleProperty = mlsId => {
    const userData = this.state.userData;
    if (userData.hasOwnProperty(mlsId)) {
      delete userData[mlsId];
    } else {
      userData[mlsId] = true;
    }
    this.setState({ userData }, () => this.saveUserData());
  };

  renderListings = () => {
    return this.state.loading ? (
      <h1>loading...</h1>
    ) : (
      this.state.data.map((item, index) => (
        <PropertyCard
          metadata={item}
          toggleProperty={this.toggleProperty}
          key={index}
          liked={this.state.userData[item.mlsId]}
        />
      ))
    );
  };

  render() {
    return (
      <div className="app-container">
        <div className="listings-container">{this.renderListings()}</div>
      </div>
    );
  }
}

export default App;
