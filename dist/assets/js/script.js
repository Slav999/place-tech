"use strict"

$('a[href^="#"]').click(function() {
  $("html, body").animate({
    scrollTop: $($(this).attr("href")).offset().top + "px"
  }, {
    duration: 1000
  });
  return false;
});

$(".sectionFAQItem__q").click(function () {
  $(this).toggleClass('active').parent().find('.sectionFAQItem__a').stop(false, true).slideToggle(200);
});