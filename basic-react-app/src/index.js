import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
let city = {
  name: "Madrid",
  country: "Spain"
};
root.render(
  // React.createElement("div", {style:{color:"blue"}}, React.createElement("h1", null, "Hello!"))
  <h1 id='heading' className='cool-text'>{city.name} is in {city.country}</h1>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
