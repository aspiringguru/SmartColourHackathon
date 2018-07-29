console.log("start js")
console.log(document)
var canvas = document.getElementById("canvas");
console.log(canvas)

function getElementPosition(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function getEventLocation(element,event){
    console.log("function getEventLocation:element"+element)
		var pos = getElementPosition(element);

    return {
    		x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function drawImageFromWebUrl(sourceurl){
      var img = new Image();

      img.addEventListener("load", function () {
          // The image can be drawn from any source
          canvas.getContext("2d").drawImage(img, 0, 0, img.width,    img.height, 0, 0, canvas.width, canvas.height);

      });

      img.setAttribute("src", sourceurl);
}

drawImageFromWebUrl("fire_truck.jpg")

console.log("canvas.addEventListener-mousemove")

var hex = ""
var coord = ""

canvas.addEventListener("mousemove",function(e){
	  var eventLocation = getEventLocation(this,e);
    coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;

    // Get the data of the pixel according to the location generate by the getEventLocation function
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += " (Transparent color detected, cannot be converted to HEX)";
    }

    hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);

    // Draw the color and coordinates.
    document.getElementById("status").innerHTML = coord;
    document.getElementById("color").style.backgroundColor = hex;
},false);

console.log("adding mouse click event");
document.addEventListener("click", function(e){
    //use hex from last mousemove, since click can't move much from last move update
    console.log("mouse click event, hex="+hex);
    document.getElementById("selectedColour").innerHTML = "Selected @ "+coord+" colour = "+hex;
    var result = parseColor(hex)
    console.log("result.keys = "+Object.keys(result))
    console.log("red:"+result['r'])
    console.log("green:"+result['g'])
    console.log("blue:"+result['b'])
    console.log("converting "+hex+" to (r,g,b):"+result)
    document.getElementById("canvas").innerHTML = "mouse clicked";
});

console.log("DEFAULT_COLORS:"+DEFAULT_COLORS)
console.log(Object.keys(DEFAULT_COLORS));

for (key in Object.keys(DEFAULT_COLORS)){
  console.log("key:"+ key+", value:"+DEFAULT_COLORS[key])
}
