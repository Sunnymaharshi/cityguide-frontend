import { motion, AnimatePresence } from "framer-motion";
import "react-medium-image-zoom/dist/styles.css";
import Zoom from "react-medium-image-zoom";
import About from "../about/about";
const Accordion = ({ i, expanded, setExpanded, line }) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="metro-header"
      >
        <h3>{line.description}</h3>
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <Zoom overlayBgColorEnd="#000000b0">
              <img
                className="metro-line-data"
                src={line.metromap_img}
                alt="no data"
              />
            </Zoom>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default Accordion;
