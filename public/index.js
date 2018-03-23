function addTooList() {
  $('body').on('submit', '#js-form', function(event) {
    event.preventDefault();
    const registerValues = {
      firstName: $('#js-fname').val(),
      lastName: $('#js-lname').val(),
      userName: $('#js-uname').val(),
      passWord: $('#js-password').val()
    };
  $.ajax('/api/users', )
  });
}
