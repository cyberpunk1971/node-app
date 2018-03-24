function addTooList() {
  $('body').on('submit', '#js-form', function(event) {
    event.preventDefault();
    const registerValues = {
      firstName: $('#js-fname').val(),
      lastName: $('#js-lname').val(),
      userName: $('#js-uname').val(),
      passWord: $('#js-password').val()
      // email: $('#js-email').val();
    };
  $.ajax('/api/users', registerValues);
  });
}

$('#js-submit').on('click', function() {
  addTooList();
});
