import React from "react";
import "./card.css";

const card = ({ details }) => {
  return (
    <>
      <div className="card">
        <div>
          {details.res_name && (
            <>
              <div className="card-image">
                <img
                  alt="card"
                  src="https://www.mashed.com/img/gallery/the-absolute-best-indian-food-in-the-u-s/l-intro-1643223941.jpg"
                />
              </div>
              <p className="card-title">{details.res_name}</p>
              <p className="loc">{details.res_location}</p>
              <p className="description">{details.description}</p>
            </>
          )}
          {details.attr_name && (
            <>
              <div className="card-image">
                <img
                  alt="card"
                  src="https://pbs.twimg.com/media/EDnLATGW4AIOsnS.jpg"
                />
              </div>
              <p className="card-title">{details.attr_name}</p>
              <p className="loc">{details.attr_loc}</p>
              <p className="description">{details.description}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default card;
