import { useEffect, useState } from "react";
import {
  getCityAbout,
  getImages,
} from "../../services/dashboard/dashboard.service";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "./about.css";
import { IMG_CITY_TYPE } from "../../common/data";

const properties = {
  duration: 3000,
  transitionDuration: 1000,
  indicators: true,
  easing: "ease",
  pauseOnHover: true,
  infinite: true,
};
export default function About({ city }) {
  const [About, setAbout] = useState([]);
  const [index, setIndex] = useState(0);

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (city !== null) {
      getCityAbout(city)
        .then((res) => {
          setAbout(res.data);
        })
        .catch((err) => {
          console.log("about error", err);
        });
      getImages(IMG_CITY_TYPE, city).then((res) => {
        console.log(res);
        setImages(res.data);
      });
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (city !== null) {
      getCityAbout(city)
        .then((res) => {
          setAbout(res.data);
        })
        .catch((err) => {
          console.log("rest error", err);
        });
    }
    // eslint-disable-next-line
  }, [city]);

  return (
    <>
      {!city && "loading"}

      <div className="ease1">
        <Slide {...properties}>
          {images.map((image) => (
            <div key={image.image_id}>
              <div className="each-slide">
                <div style={{ backgroundImage: `url(${image.img_url})` }}></div>
              </div>
            </div>
          ))}
        </Slide>

        <div className="slideshowDots">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
        <h1 className="tagline">{About.city_tagline}</h1>
        <span className="city-desc">{About.city_desc}</span>
      </div>
    </>
  );
}
