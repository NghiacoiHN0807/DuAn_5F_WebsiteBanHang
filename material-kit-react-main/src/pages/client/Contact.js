// Contact.js

import React from 'react';
import '../../scss/Contact.scss';
import mapImage from '../../assets/map.jpg';


const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">CONTACT</h1>
      <p className="contact-description"><i>Fan? Drop a note!</i></p>
      <div className="contact-row">
        <div className="contact-info">
          <p className="info" /><i className="fa fa-map-marker" /> Hà Nội, fpt polytechnic<br />
          <p className="info" /><i className="fa fa-phone" /> Phone: +84 353 200 002<br />
          <p className="info" /><i className="fa fa-envelope" /> Email: mail@mail.com<br />
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-half">
                <input className="form-input" type="text" placeholder="Name" required name="Name" />
              </div>
              <div className="form-half">
                <input className="form-input" type="text" placeholder="Email" required name="Email" />
              </div>
            </div>
            <input className="form-input" type="text" placeholder="Message" required name="Message" />
            <button className="form-button" type="submit">SEND</button>
          </form>
        </div>
      </div>
      <div >
        <img src={mapImage} alt="Map" className="w3-image w3-greyscale-min" style={{ width: '100%' }} />
      </div>
    </div>
  );
};

export default Contact;
