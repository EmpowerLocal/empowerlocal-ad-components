import { useState, useEffect, useRef } from "react";

const EmpowerlocalAd = ({ zoneId, keyword = "article" }) => {
  const [empAd, setempAd] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    const referrerUrl = encodeURIComponent(window.location.href);

    fetch_empower_ad(zoneId, referrerUrl, keyword).then((response) => {
      if (response.status === "SUCCESS") {
        setempAd(`
          <img src=${response.placements.placement_1.eligible_url} width=1 height=1 />
          <img src=${response.placements.placement_1.viewable_url} width=1 height=1 />
          ${response.placements.placement_1.body}
        `);
      } else {
        console.warn(
          `Issue loading Empower Local Ad\nReason: ${response.status}`
        );
      }
    });
  }, [zoneId, keyword]);

  const fetch_empower_ad = async (zoneId, referrerUrl, keyword) => {
    try {
      const placement = await fetch(
        `https://ads.empowerlocal.co/adserve/;ID=181918;size=0x0;setID=${zoneId};referrer=${referrerUrl};kw=${keyword};type=json;click=CLICK_MACRO_PLACEHOLDER`,
        {}
      );
      const empower_response = await placement.json();
      return empower_response;
    } catch (err) {
      console.error(err);
      return {
        status: "ERROR_IN_FETCH",
        message: err
      };
    }
  };

  useEffect(() => {
    if (!empAd || !divRef.current) return;
    const slotHtml = document.createRange().createContextualFragment(empAd);
    divRef.current.appendChild(slotHtml);
  }, [empAd]);

  return <div ref={divRef}></div>;
};

export default EmpowerlocalAd;
