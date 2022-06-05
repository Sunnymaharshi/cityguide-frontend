import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from "../accordion/Accordion";
import { toast } from "react-toastify";
import "./metro.css";

import { getMetro } from "../../services/dashboard/dashboard.service";

const tabs = ["Map", "Lines", "Schedule"];

const Map = ({ data }) => {
  return (
    <div className="mapimg-div">
      <img
        className="mapdata"
        src={data.length > 0 ? data[0].metromap_img : ""}
        // src="https://lh5.googleusercontent.com/ca68mb6uJ0rRcZobn9QWKzFETqc4vlvNjGslMu_3G6aYm-HJRCupYguhrV4TTfx4eUDNSQv7epFXFNxzCiBzQuZyKFac6nIqSYpzu1_e3NkdAi-_2ErzWxbGzy4YGMoRS8R8Ueei"
        alt="no data"
      />
    </div>
  );
};
const Lines = ({ data }) => {
  const [expanded, setExpanded] = useState();
  const [lines, setLines] = useState(null);
  useEffect(() => {
    if (data.length > 0) {
      const lines_data = data.filter((l) => l.description.includes("Line"));
      setLines(lines_data);
    }
  }, [data]);

  return lines?.map((line, i) => (
    <Accordion
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
      line={line}
      key={line.metromap_id}
    />
  ));
};
const Schedule = ({ data }) => {
  const [expanded, setExpanded] = useState();
  const [lineschedule, setLineschedule] = useState(null);
  useEffect(() => {
    if (data.length > 0) {
      const schedule_data = data.filter((l) =>
        l.description.includes("Schedule")
      );
      setLineschedule(schedule_data);
    }
  }, [data]);
  return lineschedule?.map((line, i) => (
    <Accordion
      i={i}
      expanded={expanded}
      setExpanded={setExpanded}
      line={line}
      key={i}
    />
  ));
};
export default function Metro({ city }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (city !== null) {
      getMetro(city).then((res) => {
        console.log(res.data);
        setdata(res.data);
      }).catch((err) => {
        toast.error(err.response.data, { autoClose: 5000 });
      });
    }
  }, [city]);

  return (
    <div className="window">
      <nav>
        <ul className="ul">
          {tabs.map((item) => (
            <li
              key={item}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {item}

              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            className="metro-content"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab === "Map" && <Map data={data} />}
            {selectedTab === "Lines" && <Lines data={data} />}
            {selectedTab === "Schedule" && <Schedule data={data} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
