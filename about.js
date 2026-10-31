$(document).ready(function() {
  $('.faq-question').on('click', function() {
    
    let answer = $(this).next('.faq-answer');
    let isExpanded = $(this).attr('aria-expanded');
    answer.slideToggle(300);
    
    if (isExpanded === 'true') {
      $(this).attr('aria-expanded', 'false');
    } else {
      $(this).attr('aria-expanded', 'true');
    }
  });



  $('#contactForm').on('submit', function(event) {
    event.preventDefault(); 
    
    let name = $('#contactName').val().trim();
    let email = $('#contactEmail').val().trim();
    let message = $('#contactMessage').val().trim();
    
    let isValid = true;
    
    if (name.length < 2) {
      $('#nameError').fadeIn(200);
      isValid = false;
    } else {
      $('#nameError').fadeOut(200); 
    }

    if (email === "" || email.includes("@") === false || email.includes(".") === false) {
      $('#emailError').fadeIn(200);
      isValid = false;
    } else {
      $('#emailError').fadeOut(200);
    }

    if (message.length < 10) {
      $('#messageError').fadeIn(200);
      isValid = false;
    } else {
      $('#messageError').fadeOut(200);
    }

    if (isValid) {
      $('#successMessage').fadeIn(500);
      $('#contactForm')[0].reset();
    } else {
      $('#successMessage').fadeOut(200);
    }
    
  });

});
