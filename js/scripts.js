$(function () {

//Filtering Recents Works Script


$(".filter-button").on("click", function () {
  "use strict";
  var value = $(this).attr("data-filter");

  if (value === "all") {
    $(".filter").show("1000");
  }
  else {
    $(".filter").not("." + value).hide("3000");
    $(".filter").filter("." + value).show("3000");
  }

  if ($(".filter-button").removeClass("active")) {
    $(this).removeClass("active");
  }
  $(this).addClass("active");

});



function updateProgress(){
 
  document.getElementById('progress').style.width = document.querySelector('.skillbar').dataset.percentage ;
}

window.addEventListener('scroll', function(){
  var top = window.scrollY;
  var height = document.body.getBoundingClientRect().height - window.innerHeight;
  updateProgress();
});

});




    






