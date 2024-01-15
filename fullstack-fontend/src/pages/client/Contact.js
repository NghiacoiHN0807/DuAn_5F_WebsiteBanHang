// Contact.js

import React from 'react';
import '../../scss/Contact.scss';
import { Helmet } from 'react-helmet-async';
import mapImage from '../../assets/map.jpg';


const Contact = () => {

  return (
    <>
      <Helmet>
        <title> 5FStore || Liên Hệ  </title>
      </Helmet>
    <div className="contact-container">
      <h1 className="contact-title">Về Chúng Tôi</h1>
      <p className="contact-description"><i>bạn cần gì? hãy liên hệ!</i></p>
      <div className="contact-row">
        <div className="contact-info">
          <p className="info" /><i className="fa fa-map-marker" />Địa Chỉ : Fpt polytechnic - Trịnh Văn Bô - Nam Từ Liêm - Hà Nội<br />
          <p className="info" /><i className="fa fa-phone" /> Số Điện Thoại : +84 353 200 248<br />
          <p className="info" /><i className="fa fa-envelope" /> Email: 5fstore.contact@gmail.com<br />
        </div>
       
      </div>
      <div >
        <img src={mapImage} alt="Map" className="w3-image w3-greyscale-min" style={{ width: '100%' }} />
      </div>
    </div>
    </>
  );
};

export default Contact;
