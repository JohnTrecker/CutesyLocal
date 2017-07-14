import React from 'react';

function formatDate() {
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
  let date = new Date();
  let monthIndex = date.getMonth();
  let day = date.getDate();

  return monthNames[monthIndex] + ' ' + day;
}

const Construction = () => (
    <div className="home-temp">
      <div className="banner-temp"></div>
      <div className="gradient-temp">
        <section className="container-temp">
          <h2>Mobile app under scheduled maintainance {formatDate(new Date())}</h2>
          <h4>Visit us on your laptop at cutesylocal.com</h4>
        </section>
        <div className="logo-temp"></div>
      </div>
    </div>
);

export default Construction;