import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Work.scss";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { client, urlFor } from "@src/client";
import AppWrap from "@src/wrapper/AppWrap";
import MotionWrap from "@src/wrapper/MotionWrap";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState<any[]>([]);
  const [filterWork, setFilterWork] = useState<any[]>([]);
  const [isHovered, setHovered] = useState<boolean>(false);
  const [indexHover, setIndexHover] = useState<number>(0);

  const handleHover = (index: number) => {
    setHovered(!isHovered);
    setIndexHover(index);
  };
  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = '*[_type == "works"]';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">
        My creative <span>Projects</span> Section
      </h2>
      <div className="app__work-filter">
        {["All", "Web Showcase", "Web Application", "Web Builder"].map(
          (item, index) => (
            <div
              key={item + index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              {work?.imgUrl && (
                <img
                  src={`${urlFor(work.imgUrl)}`}
                  alt={work.title}
                  style={{ width: "auto" }}
                />
              )}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(index)}
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {work.codeLink && work.codeLink !== "" && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
              <div
                style={{ backgroundColor: "#fdfdfd" }}
                className={`${"app__work-tag app__flex"} ${
                  isHovered && indexHover === index
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              >
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap({ Component: Work, classNames: "app__work" }),
  idName: "work",
  classNames: "app__primarybg",
});
