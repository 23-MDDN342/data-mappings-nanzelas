let img;

let rectangleWidth = 150; 
let rectangleHeight = 20; 
let gap = 100; 
let numRectangles = 5; 

let totalWidth = (rectangleWidth + gap) * numRectangles - gap; // overall width
let startX; // The starting x coordinate of the rectangle
let startY; // The starting y coordinate of the rectangle

let speed = 1; 
let xPositions = []; // Save the x-coordinate of the rectangle

let customImgs = [];

let statX =70


function preload() {
    img = loadImage("./star.png");

   
    startX = (960 - totalWidth) / 2;
    startY = 150;



    for (let i = 0; i < numRectangles; i++) {
        xPositions.push(map(i, 0, numRectangles - 1, startX, startX + totalWidth - rectangleWidth));
    }

    for (let i = 0; i <5 ; i++) {
        customImgs.push(new CustomImage(statX, 50, 50, 50, true, false)); 
        statX+=200;
    }
    statX=70;
    for (let i = 0; i <5 ; i++) {
        customImgs.push(new CustomImage(statX, 480, 50, 50, true, false)); 
        statX+=200;
    }

    statX=70;
    for (let i = 0; i <5 ; i++) {
        customImgs.push(new CustomImage(statX, 260, 50, 50, false, true)); 
        statX+=200;
    }


}

let cur_frac;

function draw_one_frame(cur_frac) {

    cur_frac = cur_frac;
    cur_frac = map(cur_frac,0,1,1,5);
    scale(float(canvasWidth) / 960.0);

    imageMode(CENTER);


    // Calculate the height of each rectangle
    var rectHeight = 540 / 5;

    // draw sky
    for (var i = 0; i < 5; i++) {
      
        if (i % 2 === 0) {
            fill(31, 31, 181); 
        } else {
            fill(33, 64, 221); 
        }
        rect(0, i * rectHeight, 960, rectHeight);
    }
    push();


    for (let i = 0; i < customImgs.length; i++) {
        customImgs[i].update();
        customImgs[i].display();
    }


    noStroke(); 
    fill(204, 204, 204);
    // Draw five rectangles
    for (let i = 0; i < numRectangles; i++) {
        let x = xPositions[i]; 
        let y = startY; 


        if((x+rectangleWidth<rectangleWidth)){
            if(rectangleWidth+x>0){
                rect(0,y,rectangleWidth+x,rectangleHeight)
            }

        }else{
            if((x+rectangleWidth-960>0)) {

                rect(x, y, rectangleWidth-(rectangleWidth+x-960) , rectangleHeight)

            }else{
                rect(x, y, rectangleWidth , rectangleHeight)
            }
        }

        // Update the x-coordinate of the rectangle so that it moves to the right
        x += speed;
        // // If the rectangle moves out of the canvas, move it to the left side of the canvas
        if (x > 960) {
            x = startX - rectangleWidth; 
        }
        xPositions[i] = x; 
    }


    translate(0, 220);
    // Draw five rectangles
    for (let i = 0; i < numRectangles; i++) {
        let x = xPositions[i]; 
        let y = startY; 


        if((x+rectangleWidth<rectangleWidth)){
            if(rectangleWidth+x>0){
                rect(0,y,rectangleWidth+x,rectangleHeight)
            }

        }else{
            if((x+rectangleWidth-960>0)) {

                    rect(x, y, rectangleWidth-(rectangleWidth+x-960) , rectangleHeight)

            }else{
                rect(x, y, rectangleWidth , rectangleHeight)
            }
        }

        // Update the x-coordinate of the rectangle so that it moves to the right
        x += speed;
        // If the rectangle moves out of the canvas, move it to the left side of the canvas
        if (x > 960) {
            x = startX - rectangleWidth; 
        }
        xPositions[i] = x; 
    }


    pop();

}


class CustomImage {
    constructor(x, y, width, height, isRotate, isScale) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.scale = 1;
        this.rotateSpeed = 1;
        this.zoomSpeed = 0.1;
        this.isRotate = isRotate;
        this.isScale = isScale;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        scale(this.scale);
        imageMode(CENTER);
        image(this.img, 0, 0, this.width, this.height);
        pop();
    }

    update() {
        if (this.isRotate) {
            if(cur_frac!=undefined){
                this.angle += cur_frac;
            }else{
                this.angle += this.rotateSpeed;
            }

        }
        if (this.isScale) {
            if(cur_frac!=undefined){
                this.scale += this.zoomSpeed*cur_frac;
            }else{
                this.scale += this.zoomSpeed;
            }


            if (this.scale > 1.2 || this.scale < 0.8) {
                this.zoomSpeed *= -1;
            }
        }


    }
}

