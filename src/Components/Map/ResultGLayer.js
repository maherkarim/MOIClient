import React from "react";
import { loadModules } from "esri-loader";
import { MarkerSymbol, LineSymbol, FillSymbol, PointSymbol } from "./Symbols";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import strings from "../Localizations/Localizations";
import { useModal } from "../Context/modal-context";
import IdentifyView from "../UI/IdentifyView";

const getColor = (theme) => [153, 0, 0];

const InitGraphicsLayer = (view) => {
  loadModules(["esri/layers/GraphicsLayer"]).then(([GraphicsLayer]) => {
    const resultGL = new GraphicsLayer({
      id: "resultGL",
    });
    const geometryGL = new GraphicsLayer({
      id: "geometryGL",
    });
    const highLightGL = new GraphicsLayer({
      id: "highLightGL",
    });
    const myLocation = new GraphicsLayer({
      id: "myLocation",
    });
    const rendererGL = new GraphicsLayer({
      id: "rendererGL",
    });
    view.map.add(resultGL);
    view.map.add(geometryGL);
    view.map.add(highLightGL);
    view.map.add(myLocation);
    view.map.add(rendererGL);
    view.map.reorder(resultGL, 3);
    view.map.reorder(highLightGL, 4);
    view.map.reorder(geometryGL, 5);
    view.map.reorder(myLocation, 6);
    view.map.reorder(rendererGL, 6);
  });
};

const ClearView = (view) => {
  const geometryGL = view.map.findLayerById("geometryGL");
  if (geometryGL) geometryGL.removeAll();
  const highLightGL = view.map.findLayerById("highLightGL");
  if (highLightGL) highLightGL.removeAll();
  const resultGL = view.map.findLayerById("resultGL");
  if (resultGL) resultGL.removeAll();
  const rendererGL = view.map.findLayerById("rendererGL");
  if (rendererGL) rendererGL.removeAll();
};

const HighLightPoint = (view, document) => {
  ClearHighLightPoint(view);
  loadModules(["esri/Graphic", "esri/geometry/Point"]).then(
    ([Graphic, Point]) => {
      let layer = view.map.findLayerById("highLightGL");
      if (layer) {
        const grap = new Graphic({
          geometry: new Point(document.X, document.Y),
          symbol: MarkerSymbol(30, getColor("dark")),
          attributes: document,
        });
        layer.graphics.add(grap);
      }
    }
  );
};

const ClearHighLightPoint = (view) => {
  const layer = view.map.findLayerById("highLightGL");
  if (layer) layer.removeAll();
};

const DrawShapeJson = (view, shapeJSON, document) => {
  loadModules([
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/support/jsonUtils",
  ]).then(([Graphic, Point, geometryJsonUtils]) => {
    let layer = view.map.findLayerById("geometryGL");
    if (layer)
      if (shapeJSON && shapeJSON[0]) {
        layer.removeAll();
        let geometry = geometryJsonUtils.fromJSON(shapeJSON[0].ShapeJSON);
        if (geometry.type === "polyline") {
          const grap = new Graphic({
            geometry: geometry,
            symbol: LineSymbol(),
            attributes: document,
          });
          layer.graphics.add(grap);
          view.center = [geometry.extent.center.x, geometry.extent.center.y];
          view.goTo(geometry.extent.expand(5));
        } else if (geometry.type === "polygon") {
          const grap = new Graphic({
            geometry: geometry,
            symbol: FillSymbol(),
            attributes: document,
          });
          layer.graphics.add(grap);
          view.goTo(geometry.extent.expand(5));
        } else {
          const point = new Point(
            shapeJSON[0].ShapeJSON.x,
            shapeJSON[0].ShapeJSON.y
          );
          const grap = new Graphic({
            geometry: point,
            symbol: MarkerSymbol(30, getColor("dark")),
            attributes: document,
          });
          layer.graphics.add(grap);
          view.goTo({ target: grap, zoom: 18 });
        }
        //   ClearHighLightPoint(view);
        // SetLayerOpacity("resultGL", view, 0.5);
      } else {
        console.log(document);
        const point = new Point(document.X, document.Y);
        const grap = new Graphic({
          geometry: point,
          symbol: MarkerSymbol(30, getColor("dark")),
          attributes: document,
        });
        layer.graphics.add(grap);
        view.goTo({ target: grap, zoom: 18 });
      }
  });
};

const DrawSearchResult = (view, searchResult) => {
  loadModules([
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/geometry/Multipoint",
  ]).then(([Graphic, Point, Multipoint]) => {
    let layer = view.map.findLayerById("resultGL");
    ClearView(view);

    if (searchResult && searchResult.length > 0) {
      let mPoint = new Multipoint();
      for (let i = 0; i < searchResult.length; i++) {
        const p = new Point(
          parseFloat(searchResult[i].X),
          parseFloat(searchResult[i].Y)
        );
        const graphic = new Graphic({
          geometry: p,
          symbol: PointSymbol(getColor()),
          attributes: searchResult[i],
        });
        mPoint.addPoint(p);
        layer.graphics.add(graphic);
      }
      if (mPoint.extent)
        view.goTo({
          target: mPoint.extent.expand(2),
        });
    }
  });
};

const ResultGLayer = ({ view }) => {
  const { setModal } = useModal();

  const isMobile = useStoreState((state) => state.mainStore.isMobile);
  const searchResult = useStoreState((state) => state.mainStore.searchResult);
  const shapeJSON = useStoreState((state) => state.mainStore.shapeJSON);
  const highLightPoint = useStoreState(
    (state) => state.mainStore.highLightPoint
  );
  const myLocation = useStoreState((state) => state.mainStore.myLocation);
  const job = useStoreState((state) => state.mainStore.job);

  const fetchShapeJSON = useStoreActions(
    (actions) => actions.mainStore.fetchShapeJSON
  );

  useEffect(() => {
    InitGraphicsLayer(view);
    view.on("click", function (event) {
      view.hitTest(event).then(function (event) {
        const document = event.results[0].graphic.attributes;
        if (event.results.length !== 0 && document.ID) {
          fetchShapeJSON(document.ID);
          if (document.ID) {
            setModal({
              title: strings.theaddress,
              content: <IdentifyView address={document} />,
              maxWidth: "sm",
              fullScreen: isMobile,
            });
          }
        } else {
          const geometryGL = view.map.findLayerById("geometryGL");
          if (geometryGL) geometryGL.removeAll();
          const highLightGL = view.map.findLayerById("highLightGL");
          if (highLightGL) highLightGL.removeAll();
        }
      });
    });

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (highLightPoint) HighLightPoint(view, highLightPoint);
    else ClearHighLightPoint(view);
  }, [highLightPoint, view]);

  useEffect(() => {
    DrawShapeJson(view, shapeJSON, job);
  }, [shapeJSON, view]);

  useEffect(() => {
    if (!myLocation) return;
    loadModules(["esri/Graphic", "esri/geometry/Point"]).then(
      ([Graphic, Point]) => {
        let layer = view.map.findLayerById("myLocation");
        if (layer) {
          layer.removeAll();
          const grap = new Graphic({
            geometry: new Point(
              myLocation.coords.longitude,
              myLocation.coords.latitude
            ),
            symbol: MarkerSymbol(28, "green"),
          });
          layer.graphics.add(grap);
          view.goTo({
            target: [myLocation.coords.longitude, myLocation.coords.latitude],
            zoom: 18,
          });
        }
      }
    );
  }, [myLocation]);

  useEffect(() => {
    if (searchResult && searchResult.length === 1)
      fetchShapeJSON(searchResult[0].ID);
    else DrawSearchResult(view, searchResult);
  }, [searchResult, view]);

  return null;
};

export default withRouter(ResultGLayer);
