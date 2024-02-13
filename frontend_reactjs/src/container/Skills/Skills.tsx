import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

import AppWrap from "@src/wrapper/AppWrap";
import MotionWrap from "@src/wrapper/MotionWrap";

import { urlFor, client } from "../../client";
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState<[]>([]);
  const [skills, setSkills] = useState<[]>([]);

  const sortedExperiences: any[] = experiences
    ? [...experiences].sort((a: any, b: any) => b.year - a.year)
    : [];

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill: any) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                {skill?.icon && (
                  <img src={`${urlFor(skill.icon)}`} alt={skill.name} />
                )}
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {sortedExperiences.length > 0 &&
            sortedExperiences?.map((experience: any) => (
              <motion.div
                className="app__skills-exp-item"
                key={experience.year}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-works">
                  {experience?.works?.map((work: any) => (
                    <div key={work.name}>
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        data-tip
                        data-tooltip-id={work.name}
                      >
                        <h4 className="bold-text">{work.name}</h4>
                        <p className="p-text">{work.company}</p>
                        {work.demo && work.demo !== "" && (
                          <span className="text-xs text-slate-400 italic">
                            Project: {work.demo}
                          </span>
                        )}
                      </motion.div>
                      {work.desc && work.desc !== "" && (
                        <Tooltip
                          id={work.name}
                          arrowColor="#fff"
                          className="skills-tooltip"
                        >
                          {work.desc}
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap({ Component: Skills, classNames: "app__skills" }),
  idName: "skills",
  classNames: "app__whitebg",
});
