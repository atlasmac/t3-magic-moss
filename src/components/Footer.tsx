import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 p-4 text-base-content">
      <div>
        <p>
          Custom surfboards{" "}
          <a
            href="https://www.jockoboards.com/"
            rel="noreferrer"
            target={"_blank"}
            className="underline hover:text-slate-200"
          >
            Jockoboards.com
          </a>
        </p>
        <p>
          Gear, rentals and goodies{" "}
          <a
            href="https://loveboatpaddleco.com/"
            rel="noreferrer"
            target={"_blank"}
            className="underline hover:text-slate-200"
          >
            Loveboatpaddleco.com
          </a>
        </p>
        <p>
          Peer to peer rentals{" "}
          <a
            href="https://www.seekqua.com/"
            rel="noreferrer"
            target={"_blank"}
            className="underline hover:text-slate-200"
          >
            Seekqua.com
          </a>
        </p>
        <p>
          Contact me at{" "}
          <a
            href="https://www.atlasmckinley.com/"
            rel="noreferrer"
            target={"_blank"}
            className="underline hover:text-slate-200"
          >
            AtlasMckinley.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
