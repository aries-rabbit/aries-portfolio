import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./About.scss";
import AppWrap from "@src/wrapper/AppWrap";
import MotionWrap from "@src/wrapper/MotionWrap";
import { urlFor, client } from "@src/client";

const About = () => {
  const [abouts, setAbouts] = useState<
    { title: string; imgUrl: string; description: string }[]
  >([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            {about?.imgUrl && (
              <img src={`${urlFor(about.imgUrl)}`} alt={about.title} />
            )}
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap({ Component: About, classNames: "app__about" }),
  idName: "about",
  classNames: "app__whitebg",
});
