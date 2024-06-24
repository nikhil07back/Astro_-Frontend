import React from 'react';
import './common/style/sample.css'; // Import your CSS file
import './index.js'; // Import your JavaScript file

const SinchCallingDemo = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  };

  return (
    <div>
      <div className="sinchheader">
        <a href="index.html">
          <img
            width="165"
            height="69"
            src="./common/style/header-logo-300x125-1.png"
            alt="Sinch"
          />
        </a>
      </div>
      <div className="row">
        <div className="col s12"></div>
        <div className="col s12 m2"></div>
        <div className="col s12 m8">
          <form className="token-input" id="demotype" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                className="form-control"
                type="password"
                name="key"
                id="key"
                placeholder="Application key"
                autoFocus
              />
              <i className="small material-icons prefix cursor-pointer" id="keyVisibility">visibility</i>
            </div>
            <div className="input-field">
              <input
                className="form-control"
                type="password"
                name="secret"
                id="secret"
                placeholder="Secret"
              />
              <i className="small material-icons prefix cursor-pointer" id="secretVisibility">visibility</i>
            </div>
            <input
              placeholder="Enter user id"
              type="text"
              id="userid"
              name="userid"
              className="form-control"
            />
            <button className="waves-effect waves-light btn-small center" id="videocall" type="submit">
              <i className="large material-icons right">video_call</i>video
            </button>
            <button className="waves-effect waves-light btn-small" id="voicecall" type="submit">
              <i className="large material-icons right">phone_android</i>audio
            </button>
            <button className="waves-effect waves-light btn-small" id="numbercall" type="submit">
              <i className="large material-icons right">call</i>phone
            </button>
            <button className="waves-effect waves-light btn-small" id="sipcall" type="submit">
              <i className="large material-icons right">computer</i>SIP
            </button>
          </form>
        </div>
        <div className="col s12 m2"></div>
      </div>
    </div>
  );
};

export default SinchCallingDemo;
