import "./SalonView.css";
import salons from "./../../../src/data/salons.json";
import { Link, useParams } from "react-router-dom";
import React from "react";

function SalonView() {
  let { salonId } = useParams();
  const salon = salons.filter((salon) => salon.id === Number(salonId))[0];

  const getRating = (rating) => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        array.push(<img alt="arrow" src="/star-filled.svg" />);
      } else {
        array.push(<img alt="arrow" src="/star-not-filled.svg" />);
      }
    }
    return array;
  };

  return (
    <div className="Container">
      <header
        className="SalonViewHeader"
        style={{ background: `url(/${salon.backgroundImage})` }}
      >
        <div className="TopNavBar">
          <Link to={"/"}>
            <img alt="arrow-left" src="/arrow-left-white.svg" />
          </Link>
          <img alt="heart" src="/heart.svg" />
        </div>

        <div className="SalonInfoTop">
          <h3 className="SalonName">{salon.name}</h3>
          <div className="Rating">
            {getRating(salon.rating)}
            <span className="RatingQuantity">({salon.ratingQuantity})</span>
          </div>
        </div>
      </header>
      <div className="Tabs">
        <a className="Tab SelectedTab">
          <span>Info</span>
        </a>
        <a className="Tab">
          <span>Schema</span>
        </a>
      </div>
      <main>
        <div className="SalonInfo">
          <div className="SalonInfoRow">
            <img alt="pin" src="/pin.svg" />
            <span className="SalonData">
              {salon.address.street}, {salon.address.postalCode}{" "}
              {salon.address.city}
            </span>
          </div>
          <div className="SalonInfoRow">
            <img alt="clock" src="/clock.svg" />
            <span className="SalonData">
              Öppet till{" "}
              {
                salon.openingHours[
                  new Date().toLocaleString("en", { weekday: "long" })
                ].closing
              }{" "}
              idag
            </span>
          </div>
          <div className="SalonInfoRow">
            <img alt="phone" src="/phone.svg" />
            <span className="SalonData">{salon.phone}</span>
          </div>
          <div className="SalonInfoRow">
            <img alt="globe" src="/globe.svg" />
            <span className="SalonData">{salon.website}</span>
          </div>
          <p className="SalonDescription">{salon.description}</p>
        </div>
      </main>
    </div>
  );
}

export default SalonView;
