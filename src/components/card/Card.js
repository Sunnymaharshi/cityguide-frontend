import React, { useEffect, useState } from "react";
import "./Card.css";
import { motion } from "framer-motion";
import { getImages } from "../../services/dashboard/dashboard.service";
import { IMG_ATTR_TYPE, IMG_RES_TYPE } from "../../common/data";
import Skeleton from "@mui/material/Skeleton";

const Card = ({ details }) => {
  const [img_url, setImg_url] = useState(null);
  useEffect(() => {
    if (details.res_id) {
      getImages(IMG_RES_TYPE, details.res_id).then((res) => {
        if (res.data.length > 0) {
          setImg_url(res.data[0].img_url);
        }
      });
    } else {
      getImages(IMG_ATTR_TYPE, details.attr_id).then((res) => {
        if (res.data.length > 0) {
          setImg_url(res.data[0].img_url);
        }
      });
    }
  }, []);

  return (
    <div className="card">
      <div>
        {details.res_name && (
          <>
            <div className="card-image">
              {img_url === null && (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={299}
                  height={149}
                />
              )}
              {img_url && <img alt="card" src={img_url} />}
            </div>
            <p className="card-title">{details.res_name}</p>
            <p className="loc">{details.res_location}</p>
            <p className="description">{details.description}</p>
          </>
        )}
        {details.attr_name && (
          <>
            <div className="card-image">
              <img alt="card" src={img_url} />
            </div>
            <p className="card-title">{details.attr_name}</p>
            <p className="loc">{details.attr_loc}</p>
            <p className="description">{details.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
