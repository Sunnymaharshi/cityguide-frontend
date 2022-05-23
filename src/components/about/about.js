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
      <div>
        <div className="city_img">
          <img
            className="img_tag"
            src="https://www.karnatakatourism.org/wp-content/uploads/2020/05/p25-gallery.jpg"
          />
        </div>
        <h1 className="city_tagline">{About.city_tagline}</h1>
        <p className="city_desc">{About.city_desc}</p>
        <img
          src="https://storage.googleapis.com/download/storage/v1/b/may-cityguide/o/kitten.png?generation=1653037016118901&alt=media"
          alt="cat-mediaurl"
        />
        <img
          src="https://storage.googleapis.com/may-cityguide/kitten.png?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=hu20-gcpserviceaccount1%40us-gcp-ame-con-116-npd-1.iam.gserviceaccount.com%2F20220520%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220520T112439Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=b4fba90631a6e7160506b74d570b350f367bdd5b0527624515c93625020e1e8dc270f58fb4cb1f9c3a44f082bb4eaf7618830d101742c5501294a755054d3a6369789b222cb9cdf4a23a334b0bdd2a9c68c0aa4421c17740643ffe5c9fd6a8bdba70ba0f83e202eb332bd77ab42943c4c847639b007f6a5f00ec72b4353497e75b2a7546d08395da961da50746412e15f0e282680ee1a3e2d13f786e82d2245c480cbc196d9d223fcbc817ae2a6659127de3e269bb6fdbcafb3a357f9166a32639390a5c14aa10604266b7bc3d683ebf719acae1734663ae3ba3148580828d802ada803707b1725dae6ffc0b1242376320c58e431e28ae6714e038228563cdb8"
          alt="cat_authurl"
        />
        <img
          src="https://storage.googleapis.com/download/storage/v1/b/may-cityguide/o/rtt%2Fmyimage.jpeg?generation=1653277169628092&alt=media"
          alt="my-media url"
        />
      </div>
    </>
  );
}
