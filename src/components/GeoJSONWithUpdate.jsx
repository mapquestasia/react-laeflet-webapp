import { useEffect, useRef } from "react";
import { GeoJSON, useMap } from "react-leaflet";

export const GeoJsonWithUpdate = (props) => {
  const geoJsonLayerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer && props.data) {
      layer.clearLayers().addData(props.data);

      if (props.pathOptions) {
        layer.setStyle(props.pathOptions);
      } else if (props.style) {
        layer.setStyle(props.style);
      }
    }

    if (!props.data) {
      layer.clearLayers();
    }
  }, [props.data, props.pathOptions, props.style]);

  return <GeoJSON {...props} ref={geoJsonLayerRef} />;
};
