import { motion, AnimatePresence } from "framer-motion";


const Accordion = ({ i, expanded, setExpanded ,line}) => {
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
            <h3>{line.title}</h3>
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
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >

              <img className="metro-line-data" src={line.img} alt="no data"/>

            </motion.section>
          )}
        </AnimatePresence>
      </>
    );
  };

  export default Accordion;