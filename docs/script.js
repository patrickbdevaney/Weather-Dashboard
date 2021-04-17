//allows you to store events
function getLocalStorage(key) {
   var value = localStorage.getItem(key);
   if (value) {
   
        $(`#text${key}`).text(value);
    }
}

$( document ).ready(function() {
    $("#today").text(moment().format("dddd, MMMM Do"));
    for (var i=9; i<18; i++) {
      // jquery code that creates rows
        var rows = $(`<div data-time=${i} id='${i}' class="row">`);
        // First column added
        var columnone = $('<div class="col-sm-2"> <p class="hour">' + setampm(i) + '</p>');
        // Second Column Added
        var columntwo = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add event here"></textarea>`);        
        // Third Column Added
        var columnthree = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        // adding columns to the rows
        rows.append(columnone);
        rows.append(columntwo);
        rows.append(columnthree);

        // adding rows within the container div
        $(".container").append(rows);

        getLocalStorage(i);
    }
// divides time into am and pm
    function setampm(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
      
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
setampm();

//makes colors indicate past or future timeblocks
function color(){
        var now = new Date().getHours();
        
        for (var i=9; i<18; i++) { 
        
            console.log(now, $(`#${i}`).data("time"));
        
        if ($(`#${i}`).data("time") == now){
            
            $(`#text${i}`).addClass( "present");
        
        } else if (now < $(`#${i}`).data("time")) {
        
            $(`#text${i}`).addClass( "future");
        
        }
    }
}

setInterval(function() {
    color();
}, 1000);

var save = $('.saveBtn');

save.on('click', function(){
   
    var id = $(this).attr('id');
   
    var text = $(this).parent().siblings().children(".description").val();

    localStorage.setItem(id, text);
});});