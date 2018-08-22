
$(document).ready( function() {

    ///////////////////
    // ROTATING TEXT //
    ///////////////////
    
    var textRotatorElement = $("[data-rotate-text]");
    var headerElement = textRotatorElement.children(":first");
    var textRotatorItems = textRotatorElement.data("rotateText").split(',');
    var textHTML= "";

    // Loop over all text parts and add to var
    $.each(textRotatorItems, function(index, value) {
        var span = $("<span/>").addClass("rotating-text__item").text(value);

        textHTML += span.get(0).outerHTML;
    });

    // Add html elements to container
    headerElement.html(textHTML);

    // Animate every 200ms
    var times = textRotatorItems.length - 1;
    var i = 0;
    var loop = setInterval(function() {
        times--;
        i++;
        if (times === 0) {
            clearInterval(loop);
        }

        headerElement.animate({
            marginTop: -(textRotatorElement.height() * i) + "px"
        }, 500);

    }, 1000);

    // Skip to end on window resize
    $(window).on("resize", function() {
        clearInterval(loop);

        headerElement.css({
            marginTop: -(textRotatorElement.height() * (textRotatorItems.length - 1)) + "px"
        });
    });

    //////////////////
    // AUTOCOMPLETE //
    //////////////////

    var autocompleteElement = $("[data-autocomplete]");
    var autocompleteOptions = {
        url: autocompleteElement.data("autocompleteOptions"),
        getValue: "name",
        template: {
            type: "links",
            fields: {
                link: "url"
            }
        },

        list: {
            maxNumberOfElements: 10,
            match: {
                enabled: true
            }
        },
    }

    autocompleteElement.easyAutocomplete(autocompleteOptions);

    // Skip to end on window resize
    $(window).on("resize", function() {
        autocompleteElement.easyAutocomplete(autocompleteOptions);
    });

    ///////////////
    // SCROLL TO //
    ///////////////

    $("[data-scroll-to]").on("click", function(e) {
        e.preventDefault();
        var element = $($(this).attr("href"));
        var offsetTop = element.offset().top;

        $("html, body").animate({
            scrollTop: offsetTop
        }, 200);
    });

    ////////////////////
    // SHOW ON SCROLL //
    ////////////////////

    $(window).on("scroll", function() {
        var scrollPosition = $(this).scrollTop();
        var element = $("[data-scroll-display]");
        var showAt = element.data("scrollDisplay");

        if (scrollPosition >= showAt) {
            element.show();
        } else {
            element.hide();
        }
    });





});
