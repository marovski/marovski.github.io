$(function() {


  

    //ADDED FROM Brittany Chiang
  //   function myFunction(x) {


  //     document.querySelector(".example").style.backgroundColor = "red";
  // }

  const welcomeAHeight = document.querySelector('.header').offsetHeight;
  const topButton = document.getElementById('top-button');
  const $topButton = $('#top-button');

  window.addEventListener(
    'scroll',
    function() {
      if (window.scrollY > introHeight) {
        $topButton.fadeIn();
      } else {
        $topButton.fadeOut();
      }
    },
    false
  );

  //SCROLL DOWN
topButton.addEventListener('click', function() {
      $('html, body').animate({ scrollTop: 750 }, 0 );
    });  
  


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
  });







  
  
    