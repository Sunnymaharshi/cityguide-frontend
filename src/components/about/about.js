import { useEffect, useState } from "react";
import {
  getCityAbout,
  getImages,
} from "../../services/dashboard/dashboard.service";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "./about.css";
import { IMG_CITY_TYPE } from "../../common/data";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
const properties = {
  duration: 2500,
  transitionDuration: 1000,
  indicators: true,
  easing: "ease",
  pauseOnHover: false,
  infinite: true,
};
export default function About({ city }) {
  const [About, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (city !== null) {
      getCityAbout(city)
        .then((res) => {
          setAbout(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
        });
      getImages(IMG_CITY_TYPE, city).then((res) => {
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
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data, { autoClose: 5000 });
        });
      getImages(IMG_CITY_TYPE, city).then((res) => {
        setImages(res.data);
      }).catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
    // eslint-disable-next-line
  }, [city]);

  return (
    <div>
      <div className="ease1">
        <div>
          {images.length > 0 && (
            <Slide {...properties}>
              {images.map((image) => (
                <div key={image.image_id}>
                  <div className="each-slide">
                    <div
                      style={{ backgroundImage: `url(${image.img_url})` }}
                    ></div>
                  </div>
                </div>
              ))}
            </Slide>
          )}
          {images.length === 0 && <Skeleton height={400} />}
        </div>
        {loading && <Skeleton height={50} />}
        {loading && <Skeleton height={150} />}
        {!loading && <h1 className="tagline">{About.city_tagline}</h1>}
        {!loading && <span className="city-desc">{About.city_desc}</span>}
      </div>
    </div>
  );
}
