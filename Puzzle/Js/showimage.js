
function jigsaw(canvasID, imageID, rows,columns) {
    var image1;
    var canvas;
    var ctx;

    this.canvasID = canvasID;
    this.imageID = imageID;
    this.mySelf = this;

    this.initDrawing = function () {
        mySelf = this;
        canvas = document.getElementById(canvasID);

        ctx = canvas.getContext('2d');
        image1 = document.getElementById(imageID);
    };
