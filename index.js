$(function () {
 
  const $body         = $('body');
  const $themeToggle  = $('#themeToggle');
  const $userName     = $('#userName');
  const $welcomeMsg   = $('#welcomeMessage');
  const $welcomeErr   = $('#welcomeError');

  $themeToggle.on('click', function () {
    const $btn = $(this);
    const isDark = $body.toggleClass('dark-theme').hasClass('dark-theme');

    $btn.text(isDark ? 'Light mode' : 'Dark mode');
    $btn.attr('aria-pressed', isDark ? 'true' : 'false');
  });

  $('#welcomeForm').on('submit', function (e) {
    e.preventDefault();
    const name = ($userName.val() || '').trim();

    if (!name) {
      $welcomeErr.text('Please enter your name.');
      $welcomeMsg.text('');
      $userName.addClass('input-error').trigger('focus');
      return;
    }

    $welcomeErr.text('');
    $userName.removeClass('input-error');

    $welcomeMsg.text('Hello, ' + name + '! We are glad to see you at Nana Flowers.');
  });

  $('#clearWelcome').on('click', function () {
    $userName.val('');
    $welcomeMsg.text('');
    $welcomeErr.text('');
    $userName.removeClass('input-error').trigger('focus');
  });

  $userName.on('input', function () {
    if ($(this).val().trim()) {
      $welcomeErr.text('');
      $(this).removeClass('input-error');
    }
  });


  

  const $favForm   = $('#favForm');
  const $favInput  = $('#favInput');
  const $favList   = $('#flowerList');
  const $favCount  = $('#favCount');
  const $favEmpty  = $('#emptyFavourites');
  const $favError  = $('#flowerError');

  function updateFavState() {
    const count = $favList.children('li').length;
    $favCount.text(count);
    $favEmpty.toggle(count === 0);
  }

  $favForm.on('submit', function (e) {
    e.preventDefault();
    const text = ($favInput.val() || '').trim();

    if (!text) {
      $favError.text('Please enter a bouquet name.');
      $favInput.addClass('input-error').trigger('focus');
      return;
    }

    $favError.text('');
    $favInput.removeClass('input-error');


    const $li = $('<li>');
    $('<span>').text(text).appendTo($li);
    $('<button>')
      .attr('type', 'button')
      .addClass('remove-btn')
      .attr('aria-label', 'Remove ' + text)
      .text('Remove')
      .appendTo($li);

    $favList.append($li);   
    $favInput.val('').trigger('focus');
    updateFavState();
  });

  $favList.on('click', '.remove-btn', function () {
    $(this).closest('li').fadeOut(200, function () {
      $(this).remove();
      updateFavState();
    });
  });

  $favInput.on('input', function () {
    if ($(this).val().trim()) {
      $favError.text('');
      $(this).removeClass('input-error');
    }
  });

  updateFavState(); 
});
