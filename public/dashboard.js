const API_KEY = "kLvHt2puR01mwrVfJM2yyP2m7CkQ1KvuIAAERSrc";
const SEARCH_URL = "https://api.fda.gov/drug/label.json";

function getDataFromApi(input, callback) {
  const query = {
    url: SEARCH_URL,
    data: {
      search: `openfda.brand_name:${input}`,
      limit: 4
    },
  };
  $.getJSON(SEARCH_URL, query.data, searchMedications)
  .fail(function() {
   alert('item not found');
  })
}

function searchMedicationHandler() {
  $('#js-dashboard-search-form').submit(function(event) {
    event.preventDefault();
    const searchMedName = $('#js-dashboard-search').val();
    getDataFromApi(searchMedName);
    event.target.reset();
    // const medSearchList = searchMedications(searchMedName);
    // $('.js-search-list').prepend(medSearchList);
    $('#results').html('Search Results:');
  });
}

// User medication list template //
function generateItemElement(item, itemIndex, template) {
  return `<li class="col-6 js-item-index-element   user-med-item" data-item-index="${item._id}">
    <span class="med-item js-medication-item"><b>Name:</b> ${item.name}</span>
    <span class="med-item js-medication-item"><b>Route:</b> ${item.route}</span>
    <span class="js-frequency">
    <b>Frequency:</b> ${item.frequency}</span>
    <span class="js-dosage"><b>Dosage:</b> ${item.dosage}</span>
    <div class="medication-item-controls">
    <button class="medication-item-delete js-item-delete">
    <span class="button-label">DELETE</span>
    </button>
    </div>
    </li>`;
}

function searchMedications(data) {
  console.log(data);
  let searchResults = ''
  let searchMeds = data.results
  if (!searchMeds) return
  for (let i = 0; i < searchMeds.length; i += 1) {
    searchResults += generateSearchElement(searchMeds[i], i);
  }
  $('#js-display').prepend(searchResults);
  return searchResults;
}

//Search results template//
function generateSearchElement(item, itemIndex, template) {
  return `<form class="js-add-form col-6">
  <li class="js-item-index-element">
    <span class="medication-item js-medication-item grid-item"><b>Name:</b> ${item.openfda.brand_name}</span><br>
    <span class="medication-item js-medication-item grid-item"><b>Generic:</b> ${item.openfda.generic_name}</span><br>
    <span class="medication-item js-medication-item grid-item"><b>Route:</b> ${item.openfda.route}</span><br>

      <input type="text" placeholder="Add frequency here" id="user-frequency"/><br>
      <input type="text" placeholder="Add Dosage here" id="user-dosage"/><br>
      <div class="medication-item-controls">
      <button class="button-label">Add to list</button><br>
      </div>
      <input type="hidden" id="route" value="${item.openfda.route}">
      <input type="hidden" id="brand-name" value="${item.openfda.brand_name}">
      <input type="hidden" id="generic-name" value="${item.openfda.generic_name}">
      <input type="hidden" id="substance-name" value="${item.openfda.substance_name}"></li>
      </form>`;
}

function generateMedicationString(medications) {
  let results = ''
  for (let i = 0; i < medications.length; i += 1) {
    results += generateItemElement(medications[i], i);
  }
  return results;
}

function renderMedicationList() {
  $.ajax({
    url: '/api/users/medication',
    type: 'GET',
    contentType: 'application/json',
    headers: {
        Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
    const medicationString = generateMedicationString(data);
    $('.js-medication-list').html(medicationString);
  });
}

function addNewMedication(medName) {
  $.ajax({
    url: '/api/users/medication',
    data: JSON.stringify(medName),
    type: 'POST',
    contentType: 'application/json',
    headers: {
    Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
    const newMedName = $('.js-medication-list').val();
    $('#js-display').html('');
    $('#results').html('');
    renderMedicationList(newMedName);
  });
}

function addMedicationHandler() {
  $('body').on('submit', '.js-add-form', function(event) {
    event.preventDefault();

    $('.js-medication-list').val('');
    const addMed = {
      name: $(this).find('#brand-name').val(),
      form: $(this).find('#dosage-form').val(),
      gname: $(this).find('#generic-name').val(), //fix this//
      route: $(this).find('#route').val(),
      active: $(this).find('#substance-name').val(),
      fdaid: '',
      frequency: $(this).find('#user-frequency').val(),
      dosage:$(this).find('#user-dosage').val()
    }
    addNewMedication(addMed);

  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return itemIndexString
}

function deleteMedication(itemIndex) {
  $.ajax({
    url: '/api/users/medication/' + itemIndex,
    type: 'DELETE',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
  });
}

function deleteMedicationHandler() {
  $('.js-medication-list').on('click', '.js-item-delete', event => {
    if(confirm('Are you sure you want to delete this medication?')) {
    const itemIndex =    getItemIndexFromElement(event.currentTarget);
    deleteMedication(itemIndex);
    renderMedicationList();
  }
});
}

function logOut() {
  $('#logout-btn').on('click', function() {
    localStorage.clear();
    window.location = '/index.html'
  });
}

function handleMedicationList() {
  renderMedicationList();
  addMedicationHandler();
  deleteMedicationHandler();
  searchMedicationHandler();
  logOut();
}


$(handleMedicationList);
