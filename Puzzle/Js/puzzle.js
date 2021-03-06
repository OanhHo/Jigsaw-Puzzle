function imageBlock(no, x, y) {
    //doi tuong chua toa do cua cac block image

    this.no = no;
    this.x = x;//toa do theo truc x
    this.y = y;//toa do theo truc y
    this.isSelected = false;//dax duoc select hay chua
}


function puzzle(canvasID, imageID, rows,columns) {

    var MAIN_IMG_WIDTH = 800;
    var MAIN_IMG_HEIGHT = 600;


    var BLOCK_IMG_WIDTH = 600;
    var BLOCK_IMG_HEIGHT = 450;


    var TOTAL_ROWS = rows;// 3;
    var TOTAL_COLUMNS = columns;  //4;
//kich thuoc luoi =30
    var TOTAL_PIECES = TOTAL_ROWS * TOTAL_COLUMNS;
//Lam tron so nguyen
    var IMG_WIDTH = Math.round(MAIN_IMG_WIDTH / TOTAL_COLUMNS);
    var IMG_HEIGHT = Math.round(MAIN_IMG_HEIGHT / TOTAL_ROWS);


    var BLOCK_WIDTH = 0; // Math.round(BLOCK_IMG_WIDTH / TOTAL_COLUMNS);
    var BLOCK_HEIGHT = 0; // Math.round(BLOCK_IMG_HEIGHT / TOTAL_ROWS);



    var image1;
    var canvas;
    var ctx;

    this.canvasID = canvasID;//canjigsaw
    this.imageID = imageID;//=img1

    this.top = 0;
    this.left = 0;

    this.imageBlockList = new Array();//length=0, array(0)


    this.blockList = new Array();

    this.selectedBlock = null;


    this.mySelf = this;
    //canvasID, imageID, top, left
    //imageblockList
    //blockList
    //initDrawing: f()
    //showPreview:f()

    this.initDrawing = function () {
        mySelf = this;
        selectedBlock = null;
        canvas = document.getElementById(canvasID);

        ctx = canvas.getContext('2d');

        canvas.onmousedown = handleOnMouseDown;
        canvas.onmouseup = handleOnMouseUp;
        canvas.onmouseout = handleOnMouseOut;
        canvas.onmousemove = handleOnMouseMove;

        image1 = document.getElementById(imageID);


        initializeNewGame();
    };
    
    function initializeNewGame() {

        // Set block 
        BLOCK_WIDTH = Math.round(BLOCK_IMG_WIDTH / TOTAL_COLUMNS);//=600:6
        BLOCK_HEIGHT = Math.round(BLOCK_IMG_HEIGHT / TOTAL_ROWS);//450:5

        SetImageBlock();//ve luoi
        DrawGame();
    }

    function SetImageBlock() {

        var total = TOTAL_PIECES;//=30
        imageBlockList = new Array();
        blockList = new Array();

        var x1 = BLOCK_IMG_WIDTH + 20;//=620
        var x2 = canvas.width - 100;//=750
        var y2 = BLOCK_IMG_HEIGHT-50;//=450
        for (var i = 0; i < total; i++) {//i=0

            var randomX = randomXtoY(x1, x2, 2);//=randomXtoY(620,750,2)=734
            var randomY = randomYtoX(0, y2, 2);//=14
       
            var imgBlock = new imageBlock(i, randomX, randomY);
            //imgBlock = imageBlock {no: 0, x: 734, y: 14, isSelected: false}, i = 0, randomX = 734, randomY

            imageBlockList.push(imgBlock);
            //imgBlock = imageBlock {no: 0, x: 734, y: 14, isSelected: false}

            var x = (i % TOTAL_COLUMNS) * BLOCK_WIDTH;//x = 200, i = 2
            //i%TOTAL_COLUMNS chia lay phan du
            var y = Math.floor(i / TOTAL_COLUMNS) * BLOCK_HEIGHT +BLOCK_HEIGHT;//=0
            //Lay phan nguyen cua so thap phan

            var block = new imageBlock(i, x, y);
            blockList.push(block);

        }

    }

    function DrawGame() {

        clear(ctx);
        drawLines();
        drawAllImages();

        if (selectedBlock) {//=null
            drawImageBlock(selectedBlock);
        }
    }

    function drawLines() {
       
       ctx.strokeStyle = "#e9e9e9";
        
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // draw verticle lines
        for (var i = 0; i <= TOTAL_COLUMNS; i++) {//i=6
            var x = BLOCK_WIDTH * i;//x=600
            ctx.moveTo(x, 0+BLOCK_HEIGHT);
            ctx.lineTo(x, 450 +BLOCK_HEIGHT);
            // bat dau ve duong doc tu toa do moveTo den toa do lineTo
        }

        // draw horizontal lines
        for (var i = 0; i <= TOTAL_ROWS; i++) {//i=6
            var y = BLOCK_HEIGHT * i;//y=450
            ctx.moveTo(0, y+BLOCK_HEIGHT);
            ctx.lineTo(600, y+BLOCK_HEIGHT);
        }


        ctx.closePath();
        ctx.stroke();
        //goi ham drawAllImage()
        //
    }

    function drawAllImages() {

        for (var i = 0; i < imageBlockList.length; i++) {
            var imgBlock = imageBlockList[i];
            //lenghth=30
            //imgBlock = imageBlock {no: 0, x: 634, y: 222, isSelected: false}
            if (imgBlock.isSelected == false) {

                drawImageBlock(imgBlock);
            }
        }
    }

    function drawImageBlock(imgBlock) {
        
        drawFinalImage(imgBlock.no, imgBlock.x, imgBlock.y, BLOCK_WIDTH, BLOCK_HEIGHT);
    }

    function drawFinalImage(index, destX, destY, destWidth, destHeight) {
    //index = 1, destX = 674, destY = 361, destWidth = 100, destHeight = 90

        ctx.save();

        var srcX = (index % TOTAL_COLUMNS) * IMG_WIDTH;//srcX = 133, index = 1
        var srcY = Math.floor(index / TOTAL_COLUMNS) * IMG_HEIGHT;

        ctx.drawImage(image1, srcX, srcY, IMG_WIDTH, IMG_HEIGHT, destX, destY, destWidth, destHeight);
        //srcX = 133, srcY = 0, destX = 674, destY = 361, destWidth = 100, destHeight=90

        ctx.restore();
    }

    function drawImage(image) {

        ctx.save();

        ctx.drawImage(image, 0, 0, BLOCK_WIDTH, BLOCK_WIDTH, 10, 10, 400, BLOCK_WIDTH);

        ctx.restore();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * on Mouse Cursor go out canvas event handler
     * @param {MouseEvent} e
     */
    function handleOnMouseOut(e) {

        // remove old selected
        if (selectedBlock != null) {

            imageBlockList[selectedBlock.no].isSelected = false;
            selectedBlock = null;
            DrawGame();

        }

    }

    /**
     * on Mouse Button Pressed event handler
     * @param {MouseEvent} e 
     */
    function handleOnMouseDown(e) {

        // remove old selected
        if (selectedBlock != null) {

            imageBlockList[selectedBlock.no].isSelected = false;

        }

        // Help understanding: compare log mouse position informations
        console.log("mouse page(" + e.pageX + "," +  e.pageY  + ")" + "client(" + e.clientX + "," +  e.clientY  + ")" + "offcet(" + e.offsetX + "," +  e.offsetY  + ")");

        selectedBlock = GetImageBlock(imageBlockList, e.offsetX, e.offsetY);
        // selectedBlock = GetImageBlock(imageBlockList, e.pageX, e.pageY);

        if (selectedBlock) {
            imageBlockList[selectedBlock.no].isSelected = true;
        }


    }

    /**
     * on Mouse Button Released event handler
     * @param {MouseEvent} e 
     */
    function handleOnMouseUp(e) {

        if (selectedBlock) {
            var index = selectedBlock.no;
            //   alert(index);

            var block = GetImageBlock(blockList, e.offsetX, e.offsetY);
            // var block = GetImageBlock(blockList, e.pageX, e.pageY);
            if (block) {

                var blockOldImage = GetImageBlockOnEqual(imageBlockList, block.x, block.y);
                if (blockOldImage == null) {
                    imageBlockList[index].x = block.x;
                    imageBlockList[index].y = block.y;
                }
            }
            else {
                imageBlockList[index].x = selectedBlock.x;
                imageBlockList[index].y = selectedBlock.y;
            }

            imageBlockList[index].isSelected = false;
            selectedBlock = null;
            DrawGame();

            if (isFinished()) {
                OnFinished();
            }

        }
    }

    /**
     * on Mouse move on canvas event handler
     * @param {MouseEvent} e 
     */
    function handleOnMouseMove(e) {

        if (selectedBlock) {

            // selectedBlock.x = e.pageX  - 25;
            // selectedBlock.y = e.pageY  - 25;
            selectedBlock.x = e.offsetX  - 25;
            selectedBlock.y = e.offsetY  - 25;

            DrawGame();

        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function clear(c) {
        c.clearRect(0, 0, canvas.width, canvas.height);
    }

    function randomYtoX(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal)) +70;
        var val = typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);

        return Math.round(val);
    }
    function randomXtoY(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        var val = typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);

        return Math.round(val);
    }


    function GetImageBlock(list, x, y) {

        //for (var i = 0; i < list.length; i++) {
        for (var i = list.length - 1; i >= 0; i--) {
            var imgBlock = list[i];

            var x1 = imgBlock.x;
            var x2 = x1 + BLOCK_WIDTH;

            var y1 = imgBlock.y;
            var y2 = y1 + BLOCK_HEIGHT;

            if (
                (x >= x1 && x <= x2) &&
                (y >= y1 && y <= y2)
            ) {
                //alert("found: " + imgBlock.no);

                var img = new imageBlock(imgBlock.no, imgBlock.x, imgBlock.y);
                //drawImageBlock(img);
                return img;

            }
        }

        return null;
    }


    function GetImageBlockOnEqual(list, x, y) {

        for (var i = 0; i < list.length; i++) {
            var imgBlock = list[i];

            var x1 = imgBlock.x;
            var y1 = imgBlock.y;

            if (
                (x == x1) &&
                (y == y1)
            ) {

                var img = new imageBlock(imgBlock.no, imgBlock.x, imgBlock.y);
                //drawImageBlock(img);
                return img;

            }
        }

        return null;
    }



    function isFinished() {

        var total = TOTAL_PIECES;

        for (var i = 0; i < total; i++) {

            var img = imageBlockList[i];
            var block = blockList[i];

            if (
                (img.x != block.x) ||
                (img.y != block.y)
                ) {
                return false;
            }

        }

        return true;
    }
    var interval = null,
        remove_width,
        remove_height;
    function OnFinished() {
        var points=document.getElementById("points"),
            score=document.getElementById("score-input"),
            old_score=score.value;

        alert("You are finished picture with "+ points.value + " point");
        
        score.value= Number(old_score)+ Number(points.value);
        checkCookie(score);
        remove_width = BLOCK_WIDTH;
        remove_height = BLOCK_HEIGHT;
        // Clear Board
        interval = setInterval(function () { mySelf.ClearGame(); }, 100);
    }

    this.ClearGame = function () {
        //   alert("f");
        remove_width -= 30;
        remove_height -= 20;

        if (remove_width > 0 && remove_height > 0) {

            clear(ctx);

            for (var i = 0; i < imageBlockList.length; i++) {
                var imgBlock = imageBlockList[i];

                imgBlock.x += 10;
                imgBlock.y += 10;

                drawFinalImage(imgBlock.no, imgBlock.x, imgBlock.y, remove_width, remove_height);
            }

            // DrawGame();
        } else {

            clearInterval(interval);
           
            // Restart game
            initializeNewGame(); 
          //  alert("Congrats....");

        }
    };
    ////////////////////////////////////////
    function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(score) {
  var user=getCookie("username");
  if (user != "") {
    document.getElementById("score-input").value=user;

  } else {
     user = document.getElementById("score-input").value
     if (user != "" && user != null) {
       setCookie("username", user, 30);
     }
  }
}
    
    

}