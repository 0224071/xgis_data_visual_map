<style lang="scss" >
.popover {
  max-width: none;
  width: 250px;
  ul {
    width: 100%;
    padding: 0;
    list-style-type: none;
  }
  li {
    display: flex;
    justify-content: start;
    word-break: break-all;
    .title {
      width: 100px;
    }
    strong {
      flex: 1 1 0;
    }
  }
}
</style>
<template>
  <div>
    <div
      ref="mapDom"
      class="w-100 h-100"
    >
    </div>
    <div
      id="popup"
      title="屬性"
    ></div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { transform } from "ol/proj";
import Overlay from "ol/Overlay";
import { getCenter } from "ol/extent";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import $ from "jquery";
import {
  getColorArray,
  getStyleFunction,
  highlightStyle,
} from "@/plugin/map.js";
import {
  onMounted,
  ref,
  reactive,
  toRefs,
  watch,
  computed,
  nextTick,
} from "vue";

export default {
  props: {
    datalist: {
      type: Array,
      default: [],
    },
    showAttrs: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const mapDom = ref(null);
    const mapApp = reactive({ map: null });

    const { datalist, showAttrs } = toRefs(props);
    const features = computed(() => {
      return datalist.value.map((data) => {
        return new Feature({
          geometry: new Point(
            transform([data.X, data.Y], "EPSG:4326", "EPSG:3857")
          ),
          info: data,
        });
      });
    });

    const vectorSource = new VectorSource({
      features: features.value,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: getStyleFunction(getColorArray()[0]),
    });

    watch(features, () => {
      vectorSource.clear();
      vectorSource.addFeatures(features.value);
    });

    const hoverSelected = reactive({ value: hoverSelected });

    onMounted(async () => {
      nextTick(() => {
        const map = new Map({
          target: mapDom.value,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            vectorLayer,
          ],

          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
        });
        vectorSource.on("featuresloadstart", () => {
          features.value.length > 0 &&
            map.getView().fit(vectorSource.getExtent());
        });
        vectorSource.on("addfeature", () => {
          features.value.length > 0 &&
            map.getView().fit(vectorSource.getExtent());
        });

        let selected = reactive({ value: null });

        map.on("pointermove", function (e) {
          const element = popup.getElement();
          if (selected.value) {
            // selected.value.setStyle(undefined);
            selected.value = null;
            $(element).popover("hide");
          }
          map.forEachFeatureAtPixel(e.pixel, function (feat) {
            selected.value = feat;

            // feat.setStyle(highlightStyle);

            const extent = feat.getGeometry().getExtent();
            const center = getCenter(extent);

            $(element).popover("dispose");
            popup.setPosition(center);

            let listItemWrapTemplate = showAttrs.value.reduce((acc, attr) => {
              return (
                acc +
                `<li><div class="title">${attr}:</div> <strong>${feat.values_.info[attr]}</strong></li>`
              );
            }, "");
            let listHtmlWrapTemplate = `<ul>${listItemWrapTemplate}</ul>`;
            $(element).popover({
              container: element,
              placement: "top",
              animation: false,
              html: true,
              content: listHtmlWrapTemplate,
            });
            $(element).popover("show");
            return;
          });
        });
        const popup = new Overlay({
          element: document.getElementById("popup"),
        });

        map.addOverlay(popup);
      });
    });

    return { mapDom, mapApp };
  },
};
</script>

