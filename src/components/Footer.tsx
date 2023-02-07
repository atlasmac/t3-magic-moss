import React from "react";

function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 p-4 text-base-content">
      <div>
        <p>
          Like my site?{" "}
          <a
            href="https://www.buymeacoffee.com/atlasm"
            rel="noreferrer"
            target={"_blank"}
            className="underline"
          >
            Buy me a coffee.
          </a>
        </p>
        <p>
          Contact me at{" "}
          <a
            href="https://www.atlasmckinley.com/"
            rel="noreferrer"
            target={"_blank"}
            className="underline"
          >
            AtlasMckinley.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
