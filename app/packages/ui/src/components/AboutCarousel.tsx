"use client";

import React from "react";

function AboutCarouselImpl() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        fontSize: 24
      }}
    >
      About: Hello from UI
    </div>
  );
}

export default AboutCarouselImpl;
export { AboutCarouselImpl as AboutCarousel };
