function countdown(imgID){
    setTimeout('Decrement()',1000);  
}
function Decrement() {
    if (document.getElementById) {
        var minutes = document.getElementById("minutes"),
            seconds = document.getElementById("seconds"),
            points=document.getElementById("points");
            

        // if less than a minute remaining
        if (seconds < 59) {
            seconds.value = newSecs;
        } else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        if (newSecs<=0) {
            alert("Game is timeout.");
            location.reload();
        }
        points.value=getPoint();
        if (newSecs >0) {
            newSecs--;
            setTimeout('Decrement()',1000);  
          
        }
        
        
    }
}

function getminutes() {
    // minutes is seconds divided by 60, rounded down
    var mins = Math.floor(newSecs / 60);
    return mins;
}

function getseconds() {
    // take mins remaining (as seconds) away from total seconds remaining
    return newSecs-Math.round(minutes.value *60);
}

function getPoint(){
    var  newPoints=Math.ceil(newSecs/20);
     return newPoints;   
}

