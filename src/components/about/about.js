import { useRef, useEffect, useState } from "react";
import { getCityAbout } from "../../services/dashboard/dashboard.service";
import { Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';

import "./about.css";
import image1c from "../../assets/image1c.jpg";

const slideImages = [image1c, image1c, image1c,image1c];
const delay = 4000;
const properties = {
  duration: 3000,
  transitionDuration: 1000,
  easing:"ease",
  pauseOnHover:true,
  infinite: true
};
export default function About({ city }) {
  const [About, setAbout] = useState([]);
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

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
  }, []);
  useEffect(() => {
    if (city !== null) {
      getCityAbout(city)
        .then((res) => {
          console.log(res);
          setAbout(res.data);
        })
        .catch((err) => {
          console.log("rest error", err);
        });
    }
    // eslint-disable-next-line
  }, [city]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slideImages.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <>
      {!city && "loading"}
      {/* <div className="App-carousel">
        <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
          <motion.div drag="x"
            dragConstraints={{ "right":0, "left": -width}}
            className="inner-carousel"
          >
            {images.map((image)=>{
              return (
                <motion.div className="item" key={image.text}>
                  <img src={image.photo} alt=""/>
                  <h4>{image.text}</h4>
                  </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div> */}
      <h1 className="tagline">
        {About.city_tagline}
        </h1>
      <div className="ease1">
        <Slide {...properties}>
        {slideImages.map((slideImage, index)=> (
            <><div className="each-slide" key={index}>
            <div style={{ 'backgroundImage': `url(${slideImage})` }}>
            </div>

          </div>
          <span className="city-desc">{About.city_desc}</span>
          </>

          ))} 
          {/* <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[0]})`}}>
              <span>{About.city_name}</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[1]})` }}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{ backgroundImage: `url(${slideImages[2]})` }}>
              <span>Slide 3</span>
            </div>
          </div> */}
        </Slide>

        <div className="slideshowDots">
        {slideImages.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
      </div>
    </>
  );
}
