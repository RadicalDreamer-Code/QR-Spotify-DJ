// TimeSchedule
// 18:00 - 19:00 => 80s
// 19:00 - 20:30 => 90s
// 20:30 - 21:30 => 2000s (Wii Fit 15 min)
// 21:30 - 22:00 => trash
// 22:00 - 23:00 => 2010s
// 23:00 - 24:00 => 2020s
// 24:00 => Spread!/Chill!

import DecadeWheel from "../components/MainPage/DecadeWheel";
import { InfiniteZoomFader } from "infinite-zoom-fader";
import { Fade, Slide } from "react-awesome-reveal";
// import { images } from "./images";

const images = {
  desktop: [
    {
      src: "/slideshow/1.PNG",
      alt: "Image 1 alt",
    },
    {
      src: "/slideshow/2.JPG",
      alt: "Image 1 alt",
    },
  ],
  mobile: [
    {
      src: "/slideshow/mobileImage1Src",
      alt: "Mobile image 1 alt",
    },
  ],
};

const MainPage = () => {
  return (
    <>
      <InfiniteZoomFader
        images={images}
        zoom={"out"}
        zoomScale={0.5}
        zoomTime={10}
        zoomMax={0.25}
        zoomTimingFunction={"linear"}
        transitionTime={1}
      >
        <div className={"intro-container"}>
          <Fade>
            <h1>80s</h1>
          </Fade>
          <Slide cascade damping={0.5}>
            <h1>18:00 bis 19:00</h1>
            <h1>Einzigartge Song-Wünsche: 20</h1>
            {/* <div>
                <h1>80s</h1>
            </div>
            <div>
                <h1>80s</h1>
            </div> */}
          </Slide>
        </div>
      </InfiniteZoomFader>
      <div className="button-container">
        <button className="button">1980s</button>
        <button className="button">1990s</button>
        <button className="button">2000s</button>
        <button className="button">Trash</button>
        <button className="button">2010s</button>
        <button className="button">2020s</button>
        <button className="button">Chill</button>
      </div>
    </>
  );
  return (
    <>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
      <p>18:00 - 19:00 = 90s / 00 unique songs - total time</p>
    </>
  );
};

export default MainPage;
