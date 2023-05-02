import React from "react";

function Footer() {
  return (
    <footer className="flex flex-row justify-evenly text-sm bg-base-200 p-4 text-base-content sm:text-base">
      <div className="flex flex-col">
        <span className="footer-title">Community</span>
        <a
          href="https://www.jockoboards.com/"
          target={"_blank"}
          rel="noreferrer"
          className="link link-hover">Jocko Surboards</a>
        <a
          href="https://loveboatpaddleco.com/"
          target={"_blank"}
          rel="noreferrer"
          className="link link-hover">Loveboat Paddle Co</a>
        <a
          href="https://www.seekqua.com/"
          target={"_blank"}
          rel="noreferrer"
          className="link link-hover">Seekqua</a>
      </div>
      <div className="flex flex-col">
        <span className="footer-title">Contact Me</span>
        <a
          href="https://www.atlasmckinley.com/"
          target={"_blank"}
          rel="noreferrer"
          className="link link-hover">AtlasMcKinley.com</a>
      </div>
    </footer>
  );
}

export default Footer;
