import { useEffect } from "react";
import { loadModules } from "esri-loader";
import { useStoreActions, useStoreState } from "easy-peasy";
import VectorTileLightThumbnail from "../../Images/VectorTile.png";
import VectorTileDarkThumbnail from "../../Images/dark.png";

const PACIBaseMap = (props) => {
  const { setMapExtent, setMapScale, setAppLoaded } = useStoreActions(
    (actions) => actions.mainStore
  );

  const fetchNeighborhoods = useStoreActions(
    (actions) => actions.mainStore.fetchNeighborhoods
  );
  const language = useStoreState((state) => state.mainStore.language);
  const theme = useStoreState((state) => state.mainStore.theme);
  const config = useStoreState((state) => state.mainStore.config);
  useEffect(() => {
    loadModules([
      "esri/layers/VectorTileLayer",
      "esri/core/urlUtils",
      "esri/Basemap",
      "esri/geometry/support/webMercatorUtils",
      "esri/core/watchUtils",
    ]).then(
      ([VectorTileLayer, urlUtils, Basemap, webMercatorUtils, watchUtils]) => {
        props.view.ui.remove("zoom");

        watchUtils.whenTrue(props.view, "ready", function () {
          const extent = webMercatorUtils.webMercatorToGeographic(
            props.view.extent
          );
          setMapExtent(extent);
          setMapScale(props.view.scale);
          setAppLoaded(true);
        });

        // watchUtils.whenFalse(props.view, "stationary", function (evt) {
        watchUtils.whenTrue(props.view, "stationary", function (evt) {
          const extent = webMercatorUtils.webMercatorToGeographic(
            props.view.extent
          );
          setMapExtent(extent);
          setMapScale(props.view.scale);
        });

        if (config.useProxy)
          config.proxyRules.forEach((proxyRule) => {
            urlUtils.addProxyRule(proxyRule);
          });

        props.view.map.basemap = new Basemap({
          baseLayers: new VectorTileLayer({
            url:
              theme === "dark"
                ? config.mapping.layers.arabic.digital.dark.url
                : config.mapping.layers.arabic.digital.light.url,
          }),
          id: "VectorTileBaseMap",
          thumbnailUrl:
            theme === "dark"
              ? VectorTileDarkThumbnail
              : VectorTileLightThumbnail,
        });

        const digitalLabels = new VectorTileLayer({
          url:
            language === "ar"
              ? theme === "dark"
                ? config.mapping.layers.arabic.digital.dark.labels.url
                : config.mapping.layers.arabic.digital.light.labels.url
              : theme === "dark"
              ? config.mapping.layers.english.digital.dark.labels.url
              : config.mapping.layers.english.digital.light.labels.url,
          id: "DigitalLabels",
        });

        props.view.map.add(digitalLabels);
        props.view.map.reorder(digitalLabels, 1);
      }
    );
  }, []);

  return null;
};

export default PACIBaseMap;
