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

    let hueValue = values[0];
    let satValue = values[1];
    let ligValue = values[2];

    let pointNum = map(satValue,0,100,1,18);
    let strokeW = map(ligValue,0,100,size/100,size/20);

    var bounding = new WaveBoundingSphere(hueValue, size);

    translate(size/2,size/2);
    //rotate(-90);

    push();

    noFill();
    stroke(0);
    strokeWeight(strokeW);
    //noStroke();

    var pointX = -size/2;
    var pos = -1;
    beginShape();
    curveVertex(-size/2,0);
    for (var i = 1; i <= pointNum; i++) {
      if(i % 2 == 0){
        var pointY = bounding.returnY(pointX,pos);
        pos = pos * -1;
      } else {
        var pointY = 0;
      }
      curveVertex(pointX, pointY);
      // push();
      // strokeWeight(1);
      // stroke(0);
      // ellipse(pointX,pointY,5,5);
      // pop();
      pointX += size/2/pointNum;
    }
    curveVertex(0,bounding.returnY(0)*pos);
    endShape();

    var pointX = size/2;
    var pos = -1;
    beginShape();
    curveVertex(size/2,0);
    for (var i = 1; i <= pointNum; i++) {
      if(i % 2 == 0){
        var pointY = bounding.returnY(pointX,pos);
        pos = pos * -1;
      } else {
        var pointY = 0;
      }
      curveVertex(pointX, pointY);
      // push();
      // strokeWeight(1);
      // stroke(0);
      // ellipse(pointX,pointY,5,5);
      // pop();
      pointX -= size/2/pointNum;
    }
    curveVertex(0,bounding.returnY(0)*pos);
    endShape();

    pop();

  }

  function WaveBoundingSphere(h,size) {
    this.size = size;
    this.height = map(h,0,360,0,size);

    this.returnY = function(x,pos) {
      var a = this.size/2;
      var b = this.height/2;
      var yP = b*sqrt(1-((x*x)/(a*a)));
      if(x == 0){
        return(this.height);
      } else {
      return(yP*pos);
    }
    }
  } 
}
