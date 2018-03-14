$('#js-submit').on('click', function() {
  $('#js-form').submit(event => {
    event.preventDefault();
    createUser();
  });
});

function createUser() {
  
}
