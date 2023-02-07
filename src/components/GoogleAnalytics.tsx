import Script from "next/script";

function GoogleAnalytics() {
  return (
    <div>
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8DV2L6TRVB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-8DV2L6TRVB');
        `}
      </Script>
    </div>
  );
}

export default GoogleAnalytics;
