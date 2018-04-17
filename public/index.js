function userRegistration() {
  $('body').on('submit', '#js-form', function(event) {
    event.preventDefault();
    const registerValues = {
      firstname: $('#js-fname').val(),
      lastname: $('#js-lname').val(),
      username: $('#js-uname').val(),
      password: $('#js-password').val()
    };

    $.ajax({
      url: '/api/users',
      data: JSON.stringify(registerValues),
      type: 'POST',
      contentType: 'application/json'
    }).done(function(error, data) {
      window.location = '/dashboard.html'
    });
  });
}

function userLogin() {
  $('body').on('submit', '#js-login-form', function(event) {
    event.preventDefault();
    const userValue = {
      username: $('#js-auth-username').val(),
      password: $('#js-auth-password').val()
      }
      $.ajax({
        url: '/api/auth/login',
        headers: { 'Authorization': 'Basic ' +  btoa(`${userValue.username}:${userValue.password}`)},
        type: 'POST',
        data: JSON.stringify(userValue),
        contentType: 'application/json'
      }).done(function(data, error) {
        window.location = '/dashboard.html'
        localStorage.token = data.authToken
      });
    });
  }

  // $('#js-login-button').click(function() {
  //   $('#log-body').fadeOut('slow');
  //   $('#dash-body').fadeIn('slow')
  //   console.log('YES');
  // })

$(function() {
  userLogin();
  userRegistration();
});
