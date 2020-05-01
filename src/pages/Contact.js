import React from 'react';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div className="contact-container">
      <Title title="contact us" />
      <form className="contact-form" method="POST" name="contact">
        <input type="hidden" name="form-name" value="contact" />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="number">Phone Number</label>
          <input type="number" name="number" id="number" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message"></textarea>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default Contact;
