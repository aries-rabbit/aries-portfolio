import { FaLinkedinIn } from "react-icons/fa";
const SocialMedia = () => {
  return (
    <div className="app__social">
      <div
        onClick={() =>
          window.open("https://www.linkedin.com/in/congthanhdao2703/")
        }
      >
        <FaLinkedinIn />
      </div>
    </div>
  );
};

export default SocialMedia;
