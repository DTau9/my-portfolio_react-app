import React, { Component } from 'react';

import Contacts from '../contacts/Contacts';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Contacts />
    )
  }
}
