objects = [];
img = "";
Status = "";

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting object";
}
function modelLoaded() {
    console.log("model is loaded");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log("Error");
    }
    else {
        console.log(result);
        objects = result;
    }
}

function preload() {
    img = loadImage("kitchen.webp");
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status = Objects Detected";
            percent = floor(objects[i].confidence*100);
            console.log("percent = "+percent);
            fill("red");
            text(objects[i].label+" "+percent+"%",objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}