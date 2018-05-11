/* change default application behavior */
var defaultMode = "sketch";
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
    // replace this with your own version

    // map lightness to large circle shade
    let color1 = map(values[2], 0, 100, 10, 70)
    strokeUniform(color1);
    fillUniform(color1)
    let s2 = size/2;
    ellipse(s2, s2, size);

    // inner size is set to 30%
    let inner_size = 0.2 + 0.4 * 0.3;
    let s3 = size * inner_size;

    // inner color based on saturation
    let color2 = map(values[1], 0, 100, color1+20, 240)
    fillUniform(color2);
    strokeUniform(color2);

    // hue controls left/right shift
    let shift_frac = (values[0] - 180.0) / 180.0;
    let max_shift = 0.5 * (size - s3);
    let x_shift = shift_frac * max_shift;
    ellipse(s2 + x_shift, s2, s3);  
  }  
}
