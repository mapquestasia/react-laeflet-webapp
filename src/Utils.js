export const convertJsonToGeoJson = (json) => {
  let geoJson = { type: "FeatureCollection", features: [] };
  for (const marker of json) {
    if (marker["番号"] === "") continue;

    let coordinate = [parseFloat(marker["緯度"]), parseFloat(marker["経度"])];
    let properties = marker;
    delete properties["緯度"];
    delete properties["経度"];
    let feature = {
      type: "Feature",
      geometry: { type: "Point", coordinates: coordinate },
      properties: properties,
    };

    geoJson.features.push(feature);
  }

  return geoJson;
};

export const convertGeoJsonToJson = (geoJson) => {
  const features = geoJson.features;
  let jsonArr = [];
  features.map((feature) => {
    let coords = {
      緯度: feature.geometry.coordinates[0],
      経度: feature.geometry.coordinates[1],
    };
    let jsonObj = { ...feature.properties, ...coords };
    jsonArr.push(jsonObj);
  });

  return jsonArr;
};

export const convertArrayToObject = (array) => {
  let [keys, ...rows] = array;

  let obj = rows.map((val) => {
    return keys.reduce((o, k, i) => {
      //console.log(o[k], [val[i]]);
      o[k] = val[i];
      return o;
    }, {});
  });

  return obj;
};
