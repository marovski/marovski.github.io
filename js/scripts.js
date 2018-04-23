
//Filtering Recents Works Script

    $(".filter-button").on("click", function () {
        "use strict";
        var value = $(this).attr("data-filter");
        
        if (value === "all")
        {
            $(".filter").show("1000");
        }
        else
        {
            $(".filter").not("." +value).hide("3000");
            $(".filter").filter("." +value).show("3000");     
        }

        if ($(".filter-button").removeClass("active")) {
            $(this).removeClass("active");
        }
            $(this).addClass("active");

    });


    //ADDED FROM Brittany Chiang
    const introHeight = document.querySelector('.header').offsetHeight;
    const topButton = document.getElementById('top-button');
    const $topButton = $('#top-button');
  
    window.addEventListener(
      'scroll',
      function() {
        if (window.scrollY < introHeight) {
          $topButton.fadeIn();
        } else {
          $topButton.fadeOut();
        }
      },
      false
    );

    //SCROLL UP
  topButton.addEventListener('click', function() {
        $('html, body').animate({ scrollTop: 750 }, 0 );
      });  
    