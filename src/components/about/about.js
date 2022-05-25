import { useEffect, useState } from "react";
import { getCityAbout } from "../../services/dashboard/dashboard.service";
import "./about.css";

export default function About({ city }) {
  const [About, setAbout] = useState([]);
  useEffect(() => {
    getCityAbout(city)
      .then((res) => {
        setAbout(res.data);
      })
      .catch((err) => {
        console.log("rest error", err);
      }); // eslint-disable-next-line
  }, [city]);
  return (
    <>
            {!city && "loading"}
      {/* <div>
        <div className="city_img">
          <img
            className="img_tag"
            alt="city"
            src="https://www.karnatakatourism.org/wp-content/uploads/2020/05/p25-gallery.jpg"
          />
        </div>
        <h1 className="city_tagline">{About.city_tagline}</h1>
        <p className="city_desc">{About.city_desc}</p>
      </div> */}

{/* <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner carousel-content">
    <div className="carousel-item active">
      <img src="https://www.fabhotels.com/blog/wp-content/uploads/2019/02/Clubs-with-Dance-Floor.jpg" className="d-block w-100 cover" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div> */}
    </>
  );
}