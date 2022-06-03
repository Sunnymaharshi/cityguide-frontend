import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getImages } from "../../services/dashboard/dashboard.service";
import { IMG_ATTR_TYPE, IMG_RES_TYPE } from "../../common/data";
const MyCard = ({ details }) => {
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
    // eslint-disable-next-line
  }, []);
  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        component="img"
        height="340"
        image={img_url}
        alt="restaurant"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {details.res_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MyCard;
