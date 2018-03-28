function userRegistration() {
  $('body').on('submit', '#js-form', function(event) {
    event.preventDefault();
    const registerValues = {
      firstname: $('#js-fname').val(),
      lastname: $('#js-lname').val(),
      username: $('#js-uname').val(),
      password: $('#js-password').val()
      // email: $('#js-email').val();
    };

    $.ajax({
      url: 'http://localhost:8081/api/users',
      data: JSON.stringify(registerValues),
      type: 'POST',
      contentType: 'application/json'
    }).done(function(error, data) {
      // userDashboard();
      window.location = '/public/dashboard.html'
      console.log(error);
      console.log(data);
    });
  });
}

function userLogin() {
  $('body').on('submit', '#js-login-form', function(event) {
    event.preventDefault();
    // console.log('hello');
    const userValue = {
      username: $('#js-auth-username').val(),
      password: $('#js-auth-password').val()
      }
      console.log(userValue);
      $.ajax({
        url: 'http://localhost:8081/api/auth/login',
        headers: { 'Authorization': 'Basic ' +  btoa(`${userValue.username}:${userValue.password}`)},
        type: 'POST',
        data: JSON.stringify(userValue),
        contentType: 'application/json'
      }).done(function(data, error) {
        window.location = '/public/dashboard.html'
        localStorage.token = data.authToken
        console.log(error);
        console.log(data);
        // userDashboard(data);
      });

  });

}

// function userDashboard(data) {
//   let dashboardOwner = $('#js-fname').val();
//   let results =
//   $('#js-display').append(`Welcome ${dashboardOwner}`);
//   $.ajax({
//     url: 'http://localhost:8081/api/dashboard.html',
//     headers: {'Authorization': 'Bearer' + (`${localStorage.token}`)},
//     type: 'GET',
//     contentType: 'application/json'
//   });
//   return results;
// }

$(function() {
  userLogin();
  userRegistration();
});
