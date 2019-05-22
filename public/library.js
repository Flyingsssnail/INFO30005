// lazy load
$(".resource-container .resource-row").slice(3).hide();

var mincount = 0;
var maxcount = 1;


$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 50) {
        $(".resource-container .resource-row").slice(mincount, maxcount).slideDown(100);

        mincount = mincount + 0;
        maxcount = maxcount + 1;
        //Loads 1 variable at a time

    }
});

$(function() {
    var selectedClass = "";
    $("p").click(function(){
        selectedClass = $(this).attr("data-rel");
        $(".resource-container").fadeTo(100, 0.1);
        $(".resource-container .resource").not("."+selectedClass).fadeOut();
        setTimeout(function() {
            $("."+selectedClass).fadeIn();
            $(".resource-container").fadeTo(500, 1);
        }, 500);

    });
});

