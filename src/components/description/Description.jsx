import React from 'react';
import './description.css';
import themes from '../../configs/themesToProjects';
import dataProjects from '../../data/dataProjects';

const createList = (el, index) => {
  return (typeof el !== 'string')
    ? <ul key={index}>{el.map((el, index) => createList(el, index))}</ul>
    : <li key={index}>{el}</li>;
}

const Description = ({ currentMenuItem }) => {
  const description = dataProjects.find(item => item.name === currentMenuItem).description

  const viewDescription = description ?
    <div className={`description ${themes[currentMenuItem]}`}>
      {createList(description)}
    </div> :
    null;

  return viewDescription;
}

export default Description;
