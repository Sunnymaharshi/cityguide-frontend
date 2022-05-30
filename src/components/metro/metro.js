
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from "../accordion/Accordion";
import "./metro.css"
const tabs=["map", "lines", "schedule"];

const Map=()=> {
  return (
      <div className="mapimg-div">
        <img className="mapdata" src="https://english.bmrc.co.in/AllImages/Gallery/adbc89Gallery.jpg" alt="no data"/>
      </div>
  );
}
const Lines=()=>{
  const [expanded, setExpanded] = useState(0);
  const [lines, setLines] = useState([{title: "green line",img:"https://routemaps.info/images/green-line-bangalore-metro-map.png"}, {title: "purple line",img:"data:image/png;base64,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"}])
  return lines.map((line,i) => (
    <Accordion i={i} expanded={expanded} setExpanded={setExpanded} line={line} key={i}/>
  ));
}
const Schedule=()=>{
  const [expanded, setExpanded] = useState(0);
  const [lineschedule, setLineschedule] = useState([{title: "green line",img:"https://routemaps.info/images/green-line-bangalore-metro-map.png"}, {title: "purple line",img:"data:image/png;base64,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"}])
  return lineschedule.map((line,i) => (
    <Accordion i={i} expanded={expanded} setExpanded={setExpanded} line={line} key={i}/>
  ));
}
export default function Metro(){

    const [selectedTab, setSelectedTab] = useState(tabs[0]);

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
              { item }

              

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
            {selectedTab==="map" && <Map/> }
            {selectedTab==="lines" && <Lines/> }
            {selectedTab==="schedule" && <Schedule/> }



          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );

}