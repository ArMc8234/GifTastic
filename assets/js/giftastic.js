
$(document).ready(function() {
//global variables 
var rating;
var response;
var result;
var name;
var buttonNames = [];

// var url = "http://api.giphy.com/v1/gifs/search?q=";
// var apiKey = "&api_key=CMscO2BGzrauqf455alnFa05I08&limit=10";


//Capture search parameter and call the api
$("#submit").on('click', function() {
    event.preventDefault();
    var name = $("#searchWindow").val();
    if (buttonNames.indexOf(name) === -1) {
        buttonNames.push(name);
    }
    
    console.log("name:"+name);
    search();
    renderButtons();
 
});





function search(){
    var name = $("#searchWindow").val();
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=rsqtJvT0jn1MYMD9mJxESRmYqmjBXIhy&limit=10";
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }) .then(function(response) {
        var result = response.data;
        console.log(result)
       
          
        
        for (var i = 0; i < result.length; i++){
                if (result[i].rating !== "r" && result[i].rating !== "pg-13"){
                    var imageURL = result[i].images.original_still.url;
                    var preview = result[i].images.fixed_height_downsampled.url;
                    console.log("imageURL" + imageURL);
                    var image = $('<img>');
                    image.attr('src', imageURL, 'data-alt', preview);
                    var gifHolder = [];
                    $.each(gif, function (index){
                        gifHolder[i] = new Image();
                        gifHolder[i].src = gif[i];
                    })

                    $('#gifBox').prepend(image);
                    rating = result[i].rating;
                    var p = $("<p>").text("Rating:  " + rating);
                    $("<img>").append(rating);

                };

            };
         
    });
};
//create a button based to button menu
    function renderButtons() {
        $("#btnMenu").empty();

        for (var i = 0; i < buttonNames.length; i++) {
    
        var name = $("#searchWindow").val();
        var buttonField = $("<button>" + buttonNames[i]+ "</button>");
        buttonField.attr("id", buttonNames[i]);
        buttonField.html(buttonNames[i]);
        $("#btnMenu").append(buttonField);
        };
    };
    
    //start and stop animation
    var getGif = function() {
        var gif = [];
        $('img').each(function(){
            var data = $(this).data('alt');
            gif.push(data);
        });
        return gif;
    }
    var gif = getGif();

    $('img').on('click', function() {
        var $this = $(this);
        $index = $this.index();
        $img = $this.childen('img');
        $imgSrc = $img.attr('src');
        $imgAlt = $img.attr('data-alt');
        $imgExt = $imgAlt.split('.');

        if($imgExt[1] === 'gif') {
            $img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
        }
        else {
            $img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
        }

    })


    //activate search feature of buttons based on the data-name

    $('button').on('click', function() {
        alert("hello");
    });
    // $("button").on("click", function() {
        // var buttonID = $(this).attr('id');
        // alert("hi");
        // search(buttonDataName);
        
        // console.log("button search name:"+ buttonID);
        // });
 
});