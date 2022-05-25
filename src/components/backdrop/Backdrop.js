import React from "react";
import { motion } from "framer-motion";
import "./Backdrop.css";
function Backdrop({ children, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="backdrop"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
