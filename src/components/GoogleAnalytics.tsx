import Script from "next/script";

function GoogleAnalytics() {
  return (
    <div>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EVG5N3RT3T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-EVG5N3RT3T');
        `}
      </Script>
    </div>
  );
}

export default GoogleAnalytics;
