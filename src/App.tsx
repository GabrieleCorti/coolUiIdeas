import { Carousel } from "./components/Carousel/Carousel";

function App() {
  return (
    <div style={{ padding: "4rem" }}>
      <Carousel>
        <Carousel.CarouselControlButton movement="forward">
          <button>next</button>
        </Carousel.CarouselControlButton>
        <div style={{ display: "flex", width: "100%", overflow: "hidden" }}>
          <Carousel.CarouselItems>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <img
                style={{
                  width: "1000px",
                  height: "600px",
                  objectFit: "contain",
                }}
                src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg"
              />
            </div>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <img
                style={{
                  width: "1000px",
                  height: "600px",
                  objectFit: "contain",
                }}
                src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1707130800&semt=sph"
              />
            </div>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <img
                style={{
                  width: "1000px",
                  height: "600px",
                  objectFit: "contain",
                }}
                src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg"
              />
            </div>
            <div style={{ width: "100%", marginRight: "10px" }}>
              <img
                style={{
                  width: "1000px",
                  height: "600px",
                  objectFit: "contain",
                }}
                src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_640.jpg"
              />
            </div>
          </Carousel.CarouselItems>
        </div>
        <Carousel.CarouselControlButton movement="backwards">
          <button>prev</button>
        </Carousel.CarouselControlButton>
      </Carousel>
    </div>
  );
}

export default App;
