
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


    var TOTAL_ROWS = rows;// 4;
    var TOTAL_COLUMNS = columns;  //4;

//kich thuoc luoi =30
    var TOTAL_PIECES = TOTAL_ROWS * TOTAL_COLUMNS;
//Lam tron so nguyen
    var IMG_WIDTH = Math.round(MAIN_IMG_WIDTH / TOTAL_COLUMNS);//=133
    var IMG_HEIGHT = Math.round(MAIN_IMG_HEIGHT / TOTAL_ROWS);
//=120

    var BLOCK_WIDTH = 0; // Math.round(BLOCK_IMG_WIDTH / TOTAL_COLUMNS);
    var BLOCK_HEIGHT = 0; // Math.round(BLOCK_IMG_HEIGHT / TOTAL_ROWS);



    var image1;
    var canvas;
    var ctx;

    this.canvasID = canvasID;//canjigsaw
    this.imageID = imageID;//=img1


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

        image1 = document.getElementById(imageID);


        initializeNewGame();
    };
    
    function initializeNewGame() {

        // Set block 
        BLOCK_WIDTH = Math.round(BLOCK_IMG_WIDTH / TOTAL_COLUMNS);//=600:6
        BLOCK_HEIGHT = Math.round(BLOCK_IMG_HEIGHT / TOTAL_ROWS);//450:5


        // Draw image
        SetImageBlock();//ve luoi
        DrawGame();
    }

    function SetImageBlock() {

        var total = TOTAL_PIECES;//=30
        imageBlockList = new Array();
        blockList = new Array();

        var x1 = BLOCK_IMG_WIDTH + 20;//=620
        var x2 = canvas.width - 50;//=750
        var y2 = BLOCK_IMG_HEIGHT;//=450
        for (var i = 0; i < total; i++) {//i=0

            var randomX = randomXtoY(x1, x2, 2);//=randomXtoY(620,750,2)=734
            var randomY = randomXtoY(0, y2, 2);//=14
       
            var imgBlock = new imageBlock(i, randomX, randomY);
            //imgBlock = imageBlock {no: 0, x: 734, y: 14, isSelected: false}, i = 0, randomX = 734, randomY

            imageBlockList.push(imgBlock);
            //imgBlock = imageBlock {no: 0, x: 734, y: 14, isSelected: false}

            var x = (i % TOTAL_COLUMNS) * BLOCK_WIDTH;//x = 200, i = 2
            //i%TOTAL_COLUMNS chia lay phan du
            var y = Math.floor(i / TOTAL_COLUMNS) * BLOCK_HEIGHT;//=0
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
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 450);
            // bat dau ve tu toa do moveTo den toa do lineTo
        }

        // draw horizontal lines
        for (var i = 0; i <= TOTAL_ROWS; i++) {//i=6
            var y = BLOCK_HEIGHT * i;//y=450
            ctx.moveTo(0, y);
            ctx.lineTo(600, y);
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

        ctx.drawImage(image, 0, 0, BLOCK_WIDTH, BLOCK_WIDTH, 10, 10, BLOCK_WIDTH, BLOCK_WIDTH);

        ctx.restore();
    }

    //////////////////////////////////////////////////////////////////////////////

    function clear(c) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.clearRect(p,q,width,height);
        // Ở trên,

        // p : Tọa độ x của góc trên bên trái của hình chữ nhật để xóa
        // q: Tọa độ y của góc trên bên trái của hình chữ nhật để xóa
        // width : Chiều rộng của hình chữ nhật để xóa
        // height : Chiều cao của hình chữ nhật để xóa
    }

    function randomXtoY(minVal, maxVal, floatVal) {
        //=randomXtoY(620,750,2)=734
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        var val = typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
        var xx=Math.round(val);

        return Math.round(val);
    }

}


