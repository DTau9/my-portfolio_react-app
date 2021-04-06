import React, { Component } from 'react';
import SocialNet from '../socialNet/SocialNet';
import './contacts.css';

export default class Contacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="my-contacts">
        <SocialNet />
        <div className="my-contacts__photo"></div>
      </div>
    )
  }
}
