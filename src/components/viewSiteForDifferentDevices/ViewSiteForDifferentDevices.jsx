import React from 'react';
import './viewSiteForDifferentDevices.css';

const ViewSiteForDifferentDevices = ({ linkToSite, activeDevice }) => {
  return (
    <div className={`site-on-device site-on-device_${activeDevice}`}>
      <div className="iframe-wrapper">
        <iframe src={linkToSite} frameBorder="0"></iframe>
      </div>
    </div>
  )
}

export default ViewSiteForDifferentDevices;
