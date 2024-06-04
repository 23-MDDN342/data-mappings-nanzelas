/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [0, 255, 255];
  this.mainColour1 = [143, 195, 32];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.nose_shift = -1;   // range is -10 to 10
  this.hair_shift = 1.5;   // range is -10 to 10
  this.face_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [0, 0, 0]
  this.eyebrowColour = [0, 0, 0]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    // head
    ellipseMode(CENTER);
    stroke(stroke_color);
   

    if( this.face_shift>0){
      fill(this.mainColour);

    }

    else{

      fill(this.mainColour1);
    }
   
    rectMode(CENTER)
    // rect(segment_average(positions.chin)[0]-0.4, 0, 4, 4,0.3);
    ellipse(segment_average(positions.chin)[0], 0, 3, 4);


    if(this.hair_shift>0){
      push()
      imageMode(CENTER)
      image (hair,segment_average(positions.chin)[0], -1, 4, 4)
      pop()
    }
    stroke(0);

  
    // mouth
    fill(0);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

    beginShape();

 
    curveVertex(segment_average(positions.bottom_lip)[0]-0.6, segment_average(positions.bottom_lip)[1]);
    curveVertex(segment_average(positions.bottom_lip)[0]-0.6, segment_average(positions.bottom_lip)[1]);
    curveVertex(segment_average(positions.bottom_lip)[0]-0.55, segment_average(positions.bottom_lip)[1]+0.2);


    curveVertex(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1]+0.25 * this.mouth_size);

    curveVertex(segment_average(positions.bottom_lip)[0]+0.55, segment_average(positions.bottom_lip)[1]+0.2);
  curveVertex(segment_average(positions.bottom_lip)[0]+0.6, segment_average(positions.bottom_lip)[1]);
  curveVertex(segment_average(positions.bottom_lip)[0]+0.6, segment_average(positions.bottom_lip)[1]);

  
  endShape();

    

    fill(0);
    stroke(0);
    strokeWeight(0.1);
    push ()
    translate (this.nose_shift*0.1,0)
    this.draw_segment(positions.nose_bridge);
    this.draw_segment(positions.nose_tip);

    pop ()

    strokeWeight(0.03);

   

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    noStroke();
    let curEyeShift = 0.08 * this.eye_shift;

   
    // console.log(this.num_eyes)
    if(this.num_eyes >1.5) {
      // fill(this.detailColour);
      // ellipse(left_eye_pos[0]-curEyeShift, left_eye_pos[1], 0.33, 0.5);
      // ellipse(right_eye_pos[0]+ curEyeShift, right_eye_pos[1], 0.33, 0.5);

     stroke(0)
     strokeWeight(0.1)
     line (left_eye_pos[0]-curEyeShift-0.2, left_eye_pos[1]-0.2,left_eye_pos[0]-curEyeShift, left_eye_pos[1])
     line (left_eye_pos[0]-curEyeShift-0.2, left_eye_pos[1]+0.2,left_eye_pos[0]-curEyeShift, left_eye_pos[1])


     line (right_eye_pos[0]+ curEyeShift+0.2, right_eye_pos[1]-0.2,right_eye_pos[0]+ curEyeShift, right_eye_pos[1])
     line (right_eye_pos[0]+ curEyeShift+0.2, right_eye_pos[1]+0.2,right_eye_pos[0]+ curEyeShift, right_eye_pos[1])
    }
    else {
      // let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      // let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      // fill(this.detailColour);
      // ellipse(eyePosX, eyePosY, 0.45, 0.27);

      // fill(this.mainColour);
      // ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
        ellipse(left_eye_pos[0]-curEyeShift, left_eye_pos[1], 0.33, 0.5);
      ellipse(right_eye_pos[0]+ curEyeShift, right_eye_pos[1], 0.33, 0.5);
    }

  fill(255,145,145)
  stroke(255,145,145)
    ellipse(segment_average(positions.chin)[0]-0.8,positions.nose_bridge[2][1]+0.3,0.4,0.4)
    ellipse(segment_average(positions.chin)[0]+0.8,positions.nose_bridge[2][1]+0.3,0.4,0.4)
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        // ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px/2, py/2, nx/2, ny/2);
        }
        else if(do_loop) {
          // let nx = segment[0][0];
          // let ny = segment[0][1];
          // line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = map(settings[0], 0, 100, 1, 2);
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0, 2);
    this.nose_shift = map(settings[3], 0, 100, -2, 2);
    this.hair_shift = map(settings[4], 0, 100, -2, 2);
    this.face_shift = map(settings[5], 0, 100, -2, 2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0, 2, 0, 100);
    settings[3] = map(this.nose_shift, -2, 2, 0, 100);
    settings[4] = map(this.hair_shift, -2, 2, 0, 100);
    settings[5] = map(this.face_shift, -2, 2, 0, 100);
    return settings;
  }
}
