import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

import AppWrap from "@src/wrapper/AppWrap";
import MotionWrap from "@src/wrapper/MotionWrap";
import { urlFor, client } from "../../client";
import "./Testimonial.scss";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {testimonials?.length && (
        <>
          <div className="app__testimonial-item app__flex">
            {testimonials[currentIndex]?.imgurl && (
              <img
                src={`${urlFor(testimonials[currentIndex].imgurl)}`}
                alt={testimonials[currentIndex]?.name}
              />
            )}

            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex]?.feedback}</p>
              <div>
                <h4 className="bold-text">
                  {testimonials[currentIndex]?.name}
                </h4>
                <h5 className="p-text">
                  {testimonials[currentIndex]?.company}
                </h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials?.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands?.map((brand: any) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            {brand?.imgUrl && (
              <img src={`${urlFor(brand.imgUrl)}`} alt={brand?.name} />
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap({
  Component: MotionWrap({
    Component: Testimonial,
    classNames: "app__testimonial",
  }),
  idName: "testimonial",
  classNames: "app__primarybg",
});
