/* change default application behavior */
var defaultMode = "image";
var defaultSize = 32;
var defaultDisplay = "glyph"
var defaultEmoji = 100;
var backgroundColor = "hsb(0, 0%, 100%)";

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

    let hueValue = values[0];
    let satValue = values[1];
    let ligValue = values[2];
    let pointNum = 2*(round(map(satValue,0,100,1,13)));
    //console.log(this.satValue);
    let strokeFill = map(ligValue,0,100,0,90);
    let circFill = map(ligValue,0,100,40,95);
    let tightness = map(ligValue,0,100,-2,0.8);

    let strokeW = size/30;

    var bounding = new WaveBoundingSphere(ligValue,size);

    translate(size/2,size/2);

    rotate(hueValue);

    push();

    noStroke();
    strokeWeight(1);
    //strokeUniform(strokeFill);
    fillUniform(circFill);

    ellipse(0,0,size,size);

    noFill();

    curveTightness(0.1);

    strokeWeight(strokeW);
    strokeUniform(100);

    var pointX = -size/2;
    var pos = -1;
    beginShape();
    curveVertex(-size/2,0);
    for (var i = 1; i <= pointNum; i++) {
      if(i % 2 == 0){
        var pointY = bounding.returnY(pointX,pos,strokeW);
        pos = pos * -1;
      } else {
        var pointY = 0;
      }
      curveVertex(pointX, pointY);
      pointX += size/pointNum;
    }
    curveVertex(size/2,0);
    curveVertex(size/2,0);
    endShape();

    var outerStroke = size/30;

    strokeWeight(outerStroke);
    strokeUniform(100);
    noFill();

    ellipse(0,0,size+outerStroke,size+outerStroke);

    pop();
  }

  function WaveBoundingSphere(h,size) {
    this.height = map(h,0,100,0,size);

    this.returnY = function(x,pos,strokeW) {
    var a = size/2;
    var b = this.height/2;
    var xPos = x;
    var yP = b*sqrt(1-((x*x)/(a*a)));
    return((yP)*pos);
  
    //return((yP - strokeW)*pos);
    }

    this.returnMax = function(pos) {
      return(this.height/2*pos);
    }
  }

  function Wave(h,size) {
    this.height = map(h,0,100,0,size);

    this.returnY = function(x,pos,strokeW) {
    var a = size/2;
    var b = this.height/2;
    var xPos = x;
    var yP = b*sqrt(1-((x*x)/(a*a)));
    return((yP)*pos);
  
    //return((yP - strokeW)*pos);
    }

    this.returnMax = function(pos) {
      return(this.height/2*pos);
    }
  }
}
