import { FaLinkedinIn, FaGithub, FaGitlab } from "react-icons/fa";
const SocialMedia = () => {
  return (
    <div className="app__social">
      <div onClick={() => window.open("https://github.com/aries-rabbit")}>
        <FaGithub />
      </div>
      <div onClick={() => window.open("https://gitlab.com/ariesrabbit")}>
        <FaGitlab />
      </div>
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
