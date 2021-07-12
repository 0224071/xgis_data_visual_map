import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

const rainbow = (stops) => {
  let arr = [];
  for (let i = 0; i < stops; i++) {
    let c = i / stops;
    let color = rainbowStop(c);
    arr.push(`rgb(${color.r},${color.g},${color.b})`);
  }
  return arr;
};
const rainbowStop = (h) => {
  let f = (n, k = (n + h * 12) % 12) =>
    0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let r = Math.round(f(0) * 255);
  let g = Math.round(f(8) * 255);
  let b = Math.round(f(4) * 255);

  return { r, g, b };
};

const getStyle = (color) => {
  // 取得隨機顏色
  //分三成種透明程度
  let color_fill = color;
  let color_half_fill = color.replace(")", ", 0.5)").replace("rgb", "rgba");
  let color_little_fill = color.replace(")", ", 0.2)").replace("rgb", "rgba");

  const point = new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: color_fill,
    }),
    stroke: new Stroke({ color: color_fill, width: 1 }),
  });
  //把顏色塞入 style 裡
  const styles = {
    Point: new Style({
      image: point,
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: color_fill,
        width: 1,
      }),
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: color_fill,
        width: 1,
      }),
    }),
    MultiPoint: new Style({
      image: point,
    }),
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: color_fill,
        width: 1,
      }),
      fill: new Fill({
        color: color_little_fill,
      }),
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: color_fill,
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: color_little_fill,
      }),
    }),
    GeometryCollection: new Style({
      stroke: new Stroke({
        color: color_fill,
        width: 2,
      }),
      fill: new Fill({
        color: color_little_fill,
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: color_little_fill,
        }),
      }),
    }),
    Circle: new Style({
      stroke: new Stroke({
        color: color_fill,
        width: 2,
      }),
      fill: new Fill({
        color: color_little_fill,
      }),
    }),
  };

  return styles;
};
export const highlightStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: "rgba(0,255,255,1 )",
    }),
    stroke: new Stroke({ color: "#3399CC", width: 1 }),
  }),
});

export const getColorArray = (number) => {
  return rainbow(number);
};
export const getStyleFunction = (color = "rgb(255, 0, 0)") => {
  return (feature) => getStyle(color)[feature.getGeometry().getType()];
};
