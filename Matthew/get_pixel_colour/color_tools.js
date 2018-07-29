function parseColor(source) {
  console.log("function parseColor("+source+") called")
  var red, green, blue;

  if (typeof source === 'object') {
    return source;
  }


  var hexMatch = source.match(/^#((?:[0-9a-f]{3}){1,2})$/i);
  if (hexMatch) {
    hexMatch = hexMatch[1];

    if (hexMatch.length === 3) {
      hexMatch = [
        hexMatch.charAt(0) + hexMatch.charAt(0),
        hexMatch.charAt(1) + hexMatch.charAt(1),
        hexMatch.charAt(2) + hexMatch.charAt(2)
      ];

    } else {
      hexMatch = [
        hexMatch.substring(0, 2),
        hexMatch.substring(2, 4),
        hexMatch.substring(4, 6)
      ];
    }

    red = parseInt(hexMatch[0], 16);
    green = parseInt(hexMatch[1], 16);
    blue = parseInt(hexMatch[2], 16);
    console.log("hexMatch : red:"+red+", green:"+green+", blue:"+blue)

    return { r: red, g: green, b: blue };
  }

  var rgbMatch = source.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);
  if (rgbMatch) {
    red = parseComponentValue(rgbMatch[1]);
    green = parseComponentValue(rgbMatch[2]);
    blue = parseComponentValue(rgbMatch[3]);
    console.log("rgbMatch : r: "+red+", g: "+green+", b: "+blue)
    return { r: red, g: green, b: blue };
  }

  return null;
}

console.log("color_tools loaded.")
