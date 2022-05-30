
import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./metro.css"
const tabs=["map", "lines", "schedule"];
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
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab ? selectedTab : "😋"}

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );

}