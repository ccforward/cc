const getAverageRGB = function (img, hex, limit) {
  let blockSize = 2, // 每五个像素取样一次，可根据需要调整
    defaultRGB = {
      r: 0,
      g: 0,
      b: 0
    },
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data, width, height,
    i = -4,
    length,
    rgb = {
      r: 0,
      g: 0,
      b: 0
    },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
  width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;

  try {
    context.drawImage(img, 0, 0);
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    // 图片可能存在跨域问题
    console.log(e);
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // 计算色值平均值, ~~ 等于 Math.floor
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  // 限制色值上限，防止颜色过艳
  if (limit) {
    rgb.r = rgb.r <= limit ? rgb.r : limit;
    rgb.g = rgb.g <= limit ? rgb.g : limit;
    rgb.b = rgb.b <= limit ? rgb.b : limit;
  }

  // 转 16 进制
  if (hex) {
    rgb = "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
  }

  return rgb;
}