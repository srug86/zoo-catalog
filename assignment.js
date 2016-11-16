// put your javascript code here

// variables for all of the templates so we only have to compile
// them once on page load and can then use the same compiled 
// templates many times
var categories_template, animals_template, animal_template, about_template;

// variables to store the current displayed category and animal
var current_category = animals_data.category[0];
var current_animal = current_category.animals[0];

// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data){
    var html = template(data);
    $('#content').html(html);
}

Handlebars.registerHelper('categoryImage', function(animals) {
    return animals[0].image1;
});

// document read gets called when the whole document
// is loaded, so we put most of the code that needs to run
// in here
$(document).ready(function(){

    //
    // compile all of our templates ready for use
    //
    var source = $("#categories-template").html();
    categories_template = Handlebars.compile(source);

    source = $("#animals-template").html();
    animals_template = Handlebars.compile(source);

    source = $("#animal-template").html();
    animal_template = Handlebars.compile(source);

    source = $("#about-template").html();
    about_template = Handlebars.compile(source);

    //
    // clicking on the category tab shows the 
    // thumbnails of all the categories
    //
    $("#categories-tab").click(function () {

        // displays the categories template
        showTemplate(categories_template, animals_data);

        // make the categories tab the active one
        // first make the currently active tab inactive
        $(".nav-tabs .active").removeClass("active");
        // then make albums tab active
        $("#categories-tab").addClass("active");

        // add a click callback to each album 
        // thumbnail which displays the animals
        // template on that album
        $(".category-thumbnail").click(function (){
            
            // get the index (position in the array)
            // of the album we clicked on
            // "this" is the element that was clicked on
            // data("id") gets the attribute data-id
            // (which we set to the index of the album in
            // the array - @index)
            var index = $(this).data("id");

            // set the current category to this album
            current_category = animals_data.category[index];

            // displays the animals template
            showTemplate(animals_template, current_category);

            // add an on click al all the photo thumbnails
            // which displays the photo in a modal popup
            $(".animal-thumbnail").click(function (){
                // get the index (position in the array)
                // of the photo we clicked on
                // "this" is the element that was clicked on
                // data("id") gets the attribute data-id
                // (which we set to the index of the photo in
                // the array - @index)
                var index = $(this).data("id");

                // set the current photo to this photo
                current_animal = current_category.animals[index];
                
                // displays the single photo template
                showTemplate(animal_template, current_animal);
            });
        });
    });

    //
    // clicking on the animals tab shows all of the 
    // animals in the current category
    //
    $("#animals-tab").click(function () {
        
        // displays the animals template
        showTemplate(animals_template, current_category);

        // make the animals tab the active one
        // first make the currently active tab inactive
        $(".nav-tabs .active").removeClass("active");
        // then make animals tab active
        $("#animals-tab").addClass("active");

        // add an on click al all the animal thumbnails
        // which displays the animal in a modal popup
        $(".animal-thumbnail").click(function (){
            // get the index (position in the array)
            // of the photo we clicked on
            // "this" is the element that was clicked on
            // data("id") gets the attribute data-id
            // (which we set to the index of the photo in
            // the array - @index)
            var index = $(this).data("id");

            // set the current photo to this photo
            current_animal = current_category.animals[index];
            
            // displays the single photo template
            showTemplate(animal_template, current_animal);
        });
    });

    //
    // clicking on the about tab shows all of the 
    // animals in the current category
    //
    $("#about-tab").click(function () {
        showTemplate(about_template, current_category);
        $(".nav-tabs .active").removeClass("active");
        $("#about-tab").addClass("active");
    });

    // start the page by showing the albums view
    // we do this by virtually clicking on the 
    // albums tab
    $("#categories-tab").click();
});
