export let LineSymbol = () => {
  return {
    type: "simple-line",
    color: [255, 160, 0],
    width: 2,
    style: "short-dash",
  };
};

export let PointSymbol = (color) => {
  return {
    type: "simple-marker",
    color,
    size: 10,
    outline: {
      color: [153, 0, 0],
      width: 0,
    },
  };
};

export let FillSymbol = () => {
  return {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [255, 0, 0, 0.3],
    outline: {
      color: [255, 0, 0, 0.8],
      width: 1,
    },
  };
};

export let MarkerSymbol = (size, color) => {
  const path =
    "M12,2C8.13,2 5,5.13 5,9c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zM12,11.5c-1.38,0 -2.5,-1.12 -2.5,-2.5s1.12,-2.5 2.5,-2.5 2.5,1.12 2.5,2.5 -1.12,2.5 -2.5,2.5z";
  return {
    type: "simple-marker",
    color: color,
    path: path,
    size: size,
    yoffset: size / 2,
    outline: null,
  };
};

export let GetColor = (val) => {
  const arr = [];
  arr.push({ color: [23, 25, 53, 1], action: "مغلق" });
  arr.push({ color: [0, 153, 51, 1], action: "مفتوح" });
  arr.push({ color: [153, 0, 0, 1], action: "تم التطهير" });
  arr.push({ color: [204, 51, 255, 1], action: "مخالف" });
  arr.push({ color: [102, 102, 153, 1], action: "مراجعة مره اخري" });
  arr.push({ color: [102, 102, 153, 1], action: "تم ابلاغ الصحة" });
  arr.push({ color: [102, 200, 153, 1], action: "تم عمل اللازم من الصحة" });
  arr.push({ color: [255, 0, 0, 1], action: "مفتوح مخالف" });
  arr.push({ color: [255, 255, 0, 1], action: "مسموح مغلق" });
  arr.push({ color: [0, 255, 0, 1], action: "مسموح مفتوح" });
  arr.push({ color: [0, 0, 255, 1], action: "مغلق ملتزم" });
  const t = arr.filter((a) => a.action === val.trim());
  return t[0] ? t[0].color : [0, 0, 0, 1];
};
