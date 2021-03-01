import * as React from "react";
import { Map } from "@esri/react-arcgis";
import PACIBaseMap from "./PACIBaseMap";
import MapComponents from "./MapComponents";
import ResultGLayer from "./ResultGLayer";
import { useStoreState } from "easy-peasy";
import Identify from "./Identify";

const GetWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
};
export default (props) => {
  const config = useStoreState((state) => state.mainStore.config);
  const isMobile = useStoreState((state) => state.mainStore.isMobile);
  console.log("map");
  return (
    <Map
      loaderOptions={{ css: true }}
      style={{ width: "100%", height: "100vh" }}
      viewProperties={{
        center: [config.mapping.centerX, config.mapping.centerY],
        // zoom: config.mapping.zoom,
        padding: { right: isMobile ? 0 : GetWidth() / 2 },
        constraints: {
          minScale: config.mapping.minimumScale,
          maxScale: config.mapping.maximumScale,
          rotationEnabled: false,
          snapToZoom: true,
        },
        ui: { components: [] },
      }}
    >
      <Identify />
      <PACIBaseMap />
      <MapComponents />
      <ResultGLayer />
    </Map>
  );
};
