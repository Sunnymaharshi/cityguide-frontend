import { useEffect, useState } from "react";
import { getCityAbout } from "../../services/dashboard/dashboard.service";
import "./about.css"

export default function About({ city }) {

  const [About, setAbout] = useState([]);
  useEffect(() => {
    getCityAbout(city)
      .then((res) => {
        console.log(res);
        setAbout(res.data);
      })
      .catch((err) => {
        console.log("rest error", err);
      }); // eslint-disable-next-line
  }, [city]);
  return (
    <>
    <div>
    <div className="city_img">
      <img className="img_tag" src="https://www.karnatakatourism.org/wp-content/uploads/2020/05/p25-gallery.jpg" />
    </div>
      <h1 className="city_tagline">{About.city_desc}</h1>
      <p></p>
    </div>
    </>
    );
}
