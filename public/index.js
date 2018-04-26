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
       userLoginAjaxCall(registerValues);
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
    userLoginAjaxCall(userValue);
  });
}

function userLoginAjaxCall(userValue) {
  $.ajax({
    url: '/api/auth/login',
    headers: {
      'Authorization': 'Basic ' + btoa(`${userValue.username}:${userValue.password}`)
    },
    type: 'POST',
    data: JSON.stringify(userValue),
    contentType: 'application/json'
  }).done(function(data, error) {
    window.location = '/dashboard.html'
    localStorage.token = data.authToken
  });
}

function tryIt() {
  $('#try-btn').on('click', function() {
    const demoValues = {
      username: 'demo',
      password: 'demo'
    }
    userLoginAjaxCall(demoValues);
  });
};

$(function() {
  userLogin();
  userRegistration();
  tryIt();
});
