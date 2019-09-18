
$(document).ready(function() {
        //global variables 
        // var rating;
        var response;
        var result;
        var name;
        var buttonNames = [];

        var url = "http://api.giphy.com/v1/gifs/search?q=";
        var apiKey = "&api_key=rsqtJvT0jn1MYMD9mJxESRmYqmjBXIhy&limit=10";


        //Capture search parameter and call the api
        $("#submit").on('click', function() {
            event.preventDefault();
            var name = $("#searchWindow").val();
            if (buttonNames.indexOf(name) === -1) {
                buttonNames.push(name);
            }
            
            console.log("name:"+name);
            renderButtons();
            search(name);
        });





                function search(searchParameter){
                //    if (buttonNames.indexOf(searchParameter) >= 0) return;

                    var queryUrl = url + searchParameter + apiKey;
                    
                    $.ajax({
                        url: queryUrl,
                        method: "GET"
                    }) .then(function(response) {
                        var result = response.data;
                        console.log(result)
                    
                        
                        
                        for (var i = 0; i < result.length; i++){
                                if (result[i].rating !== "r" && result[i].rating !== "pg-13"){
                                    var primary = result[i].images.original_still.url;
                                    var still = result[i].images.original_still.url;
                                    var animate = result[i].images.fixed_height_downsampled.url;
                                    console.log("Still-image:" + still);
                                    var image = $('<img>');
                                    var gifDiv = $('<div>');
                                    gifDiv.addClass('frame' + [i]);
                                    $('#gifBox').prepend(gifDiv);
                                    image.attr({ 'src': primary, 'data-still': still, 'data-animate': animate, 'data-state': 'still', 'width': 250, 'height': 250});
                                    // image.addClass("photo" + [i]);


                                    $('.frame' + [i]).prepend(image);
                                    var rating = result[i].rating;
                                    var p = $("<p>").text("Rating:  " + rating);
                                    image.append(p);

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
                buttonField.addClass("gif-button");
                buttonField.html(buttonNames[i]);
                $("#btnMenu").append(buttonField);
                };
            };
            


    //activate search feature of buttons based on the data-name


            $(document).on('click', ".gif-button", function(){
                var buttonID = $(this).attr('id');
                search(buttonID);
            }); 
     
            $(document).on('click', "img", function(){
                // alert("hello");

                // // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // // Then, set the image's data-state to animate
                // // Else set src to the data-still value
                if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                }
            });
 
});