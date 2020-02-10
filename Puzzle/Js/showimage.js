function imageBlock(number,x,y) {
  //return imageBlock object
  this.number=number;
  this.x=x;
  this.y=y;
  this.isSelect=false;
}

function puzzle(canvasID, imageID, totalRows, totalColumns) {
  //default image size
  var DEFAULT_IMAGE_WIDTH=800;
  var DEFAULT_IMAGE_HEIGHT=600;
//default grid  size
  var GRID_WIDTH=600;
  var GRID_HEIGHT=450;
//number of rows, columns
  var GRID_COLUMNS=totalColumns;
  var GRID_ROWS=totalRows;
  var NUMBER_BLOCK_IMAGE= GRID_ROWS * GRID_COLUMNS;
  //block image size
  var IMAGE_BLOCK_WIDTH=Math.round(DEFAULT_IMAGE_WIDTH / GRID_COLUMNS);
  var IMAGE_BLOCK_HEIGHT=Math.round(DEFAULT_IMAGE_HEIGHT / GRID_ROWS);
  //
  var BLOCK_WIDTH=0;
  var BLOCK_HEIGHT=0;

    //
    var image;
    var canvas;
    var ctx;

    this.canvasID = canvasID;
    this.imageID = imageID;


    this.imageBlockList = new Array();
    this.blockList = new Array();

    this.selectedBlock = null;

//return canvasID, imageID, imageBlocklist, blockList,selectedBlock;
    this.mySelf = this;
    this.initDrawing=function(){
      mySelf=this;
      selectedBlock=null;
      canvas=document.getElementById(canvasID);
      ctx=canvas.getContext('2d');
      image=document.getElementById(imageID);
      //Set block size
      BLOCK_WIDTH=Math.round(GRID_WIDTH / GRID_COLUMNS);
      BLOCK_HEIGHT=Math.round(GRID_HEIGHT / GRID_ROWS);

      setImageBlock();
      // draw image
      draw();

    };
//
function setImageBlock(){
  var number=NUMBER_BLOCK_IMAGE;
  imageBlocklist= new Array();
  blockList= new Array();
  //
  var x1=GRID_WIDTH +20;
  var x2=canvas.width -50;
  var y2=GRID_HEIGHT;
  //
  for(var i=0; i<number; i++){
    var randomX= random(x1,x2,2);
    var randomY=random(0,y2,2);
    var imagBlock= new imageBlock(i,randomX,randomY);
    //push imageBlock into imageBlockList()
    imageBlocklist.push(imagBlock);

    var x=(i % GRID_COLUMNS) *BLOCK_WIDTH;
    var y= Math.floor(i / GRID_COLUMNS) * BLOCK_HEIGHT;
    var block=new imageBlock(i,x,y);
    //push block into blockList()
    blockList.push(block);

  }
}
//
function draw(){
    clear(ctx);
    drawLine();
    drawAllImage();

    if(selectedBlock){
      drawImageBlock(selectedBlock);
    }

}
  //draw line of drid
function drawLine(){
  ctx.strokeStyle="#BDBDBD";
  ctx.lineWidth=1;
  ctx.beginPath();
// draw verticle lines
  for(var i=0; i<= GRID_COLUMNS; i++){
    var x=BLOCK_WIDTH * i;
    //draw line form (x,0) to (x,450)
    ctx.moveTo(x,0);
    ctx.lineTo(x,450);
  }
// draw horizontal lines
for(var i=0; i<=GRID_ROWS; i++){
  var y=BLOCK_HEIGHT * i;
  //draw line form (0,y) to (600,y)
  ctx.moveTo(0,y);
  ctx.lineTo(600,y);

}
ctx.closePath();
ctx.stroke();

}
//draw all Image
function drawAllImage(){
  for(var i=0; i<imageBlocklist.length; i++){
    var imagBlock=imageBlocklist[i];
    if(imagBlock.isSelect == false){
      drawImageBlock(imagBlock);
      //drawImage(valueBlock.i,valueBlock.x,valueBlock.y,BLOCK_WIDTH,BLOCK_HEIGHT);
    }
  }
}
//
function drawImageBlock(imagBlock) {
        
        drawFinalImage(imagBlock.number, imagBlock.x, imagBlock.y, BLOCK_WIDTH, BLOCK_HEIGHT);
}
//
function drawFinalImage(i,X,Y,Width,Height){
  ctx.save();
  var x=(i *GRID_COLUMNS) * IMAGE_BLOCK_WIDTH;
  var y=Math.floor(i / GRID_COLUMNS) * IMAGE_BLOCK_HEIGHT;
  ctx.drawImage(image,x,y,IMAGE_BLOCK_WIDTH,IMAGE_BLOCK_HEIGHT,X,Y,Width,Height);
  ctx.restore();
}
//
function drawImage(Image) {
  ctx.save();
  ctx.drawImage(Image, 0, 0, BLOCK_WIDTH, BLOCK_WIDTH, 10, 10, BLOCK_WIDTH, BLOCK_WIDTH);
  ctx.restore();
    }

function random(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        var val = typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
        return Math.round(val);
    }

function clear(c) {
c.clearRect(0, 0, canvas.width, canvas.height);
}
       
  
}