/* change default application behavior */
var defaultMode = "edit";
var defaultSize = 128;
var defaultDisplay = "both"
var defaultEmoji = 100;
var backgroundColor = "hsb(0, 0%, 94%)";

function Glyph() {
  /*
   * values is an array of 3 numbers: [hue, saturation, lightness]
   *   + hue ranges from 0..360
   *   + saturation ranges from 0..100
   *   + lightness ranges from 0..100
   *
   * size is the number of pixels for width and height
   *
   * use p5.js to draw a round grayscale glyph
   * the glyph should stay within the ellipse [0, 0, width, height]
   * this is a grayscale glyph, so only lightness can be adjusted.
   * the range for lightness is 0..100
   *
   * When setting the lightness of stroke or fill always use either strokeUniform()
   * or fillUniform() calls. Each takes one arguement - the lightness from
   * 0 to 100. Examples:
   *       - fillUniform(50);    // ranges from 0-100
   *       - strokeUniform(100); // white
   */ 
  this.draw = function(values, size) {

    angleMode(DEGREES);
    noFill();

    let hueValue = values[0];
    let satValue = values[1];
    let ligValue = values[2];

    let strokeW = map(satValue,0,100,size/20,size/6);
    let glyphRadius = map(ligValue,0,100,1, size-strokeW);

    translate(size/3,size/3);
    rotate(-90);

    push();
    //ellipse(0,0,size,size);

    strokeWeight(strokeW);
    //ellipse(0, 0, this.radius, this.radius);
    arc(0,0,glyphRadius,glyphRadius,0,hueValue);
    //console.log(this.hueValue);
    strokeWeight(strokeW/4);
    //arc(0,0,glyphRadius,glyphRadius,0,hueValue);
    pop();

  } 
}
