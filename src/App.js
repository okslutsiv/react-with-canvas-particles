import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import Particles from "./Particles";

const baseColors = [
  "#026592",
  "#94bfd2",
  "#91a4a2",
  "#247067",
  "#38b1d4",
  "#fcffff",
  "#a18999",
  "#95c092",
  "#88dfe4",
];

function App() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    setDimensions({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });

    const handleWindowResize = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [containerRef]);
  return (
    <Main ref={containerRef}>
      <h1>Particles</h1>

      <Particles
        num={Math.min(dimensions.width, dimensions.height) / 5}
        width={dimensions.width}
        height={dimensions.height}
        radius={2}
        colors={baseColors}
        velocity={4}
        minDistance={Math.floor(
          Math.min(dimensions.width, dimensions.height) / 6,
        )}
      ></Particles>
    </Main>
  );
}

const Main = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

  width: 100vw;
  height: 100vh;
  position: relative;
  background: #000033;
  color: white;

  & h1 {
    position: absolute;
    margin: 0;
    top: 50vh;
    left: 50vw;
    font-size: calc(10px + 8vmin);
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    transform: translate(-50%, -50%);
    text-shadow: 0px 0px 2px rgba(0, 0, 0, 1),
      2px 2px 15px rgba(255, 255, 255, 1);
  }
`;
export default App;
