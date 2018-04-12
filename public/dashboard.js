const API_KEY = "kLvHt2puR01mwrVfJM2yyP2m7CkQ1KvuIAAERSrc";
const SEARCH_URL = "https://api.fda.gov/drug/label.json";

function getDataFromApi(input, callback) {
  const query = {
    url: SEARCH_URL,
    data: {
      // key: API_KEY,
      search: `openfda.brand_name:${input}`,
      limit: 4
    },
  };
  $.getJSON(SEARCH_URL, query.data, searchMedications);
}

function searchMedicationHandler() {
  $('#js-dashboard-search-form').submit(function(event) {
    event.preventDefault();
    const searchMedName = $('#js-dashboard-search').val();
    getDataFromApi(searchMedName);
    event.target.reset();
    const medSearchList = searchMedications(searchMedName);
    $('.js-search-list').append(medSearchList);
  });
}

function generateItemElement(item, itemIndex, template) {
  return `<li class="js-item-index-element" data-item-index="${item._id}">
    <span class="medication-item js-medication-item">Name: ${item.name}</span>TEST<br>
    <span class="medication-item js-medication-item">Generic: ${item.gname}</span><br>
    <span class="medication-item js-medication-item">Route: ${item.route}</span><br>
    <span class="medication-item js-medication-item">Active Ingredient: ${item.active}</span>
    <div class="medication-item-controls">
    <button class="medication-item-delete js-item-delete">
    <span class="button-label">delete</span>
    </button>
    </div>
  </li>`;
}

function searchMedications(data) {
  let searchResults = ''
  let searchMeds = data.results
  if (!searchMeds) return
  for (let i = 0; i < searchMeds.length; i += 1) {
    searchResults += generateSearchElement(searchMeds[i], i);
  }
  $('#js-display').append(searchResults);
  return searchResults;
}

function generateSearchElement(item, itemIndex, template) {
  console.log(item);
  console.log(item.brand_name);
  return `<form class="js-add-form col-6">
  <li class="js-item-index-element" data-item-index=${itemIndex}">
    <span class="medication-item js-medication-item">Name: ${item.openfda.brand_name}</span><br>
    <span class="medication-item js-medication-item">Generic: ${item.openfda.generic_name}</span><br>
    <span class="medication-item js-medication-item">Route: ${item.openfda.route}</span><br>
    <span class="medication-item js-medication-item">Active Ingredient: ${item.openfda.substance_name}</span>
    <div class="medication-item-controls">
    <button class="button-label">Add to list</button><br>
    </div>
      <label for="frequency">Frequency</label>
      <input type="text" id="user-frequency" class="user-entry"/><br>
      <label for="dosage">Dosage</label>
      <input type="text" id="user-dosage" class="user-entry"/><br>
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
    url: 'http://localhost:8081/api/users/medication',
    type: 'GET',
    contentType: 'application/json',
    headers: {
        Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
    console.log(error);
    console.log(data);
    const medicationString = generateMedicationString(data);
    $('.js-medication-list').html(medicationString);
  });
}

function addNewMedication(medName) {
  $.ajax({
    url: 'http://localhost:8081/api/users/medication',
    data: JSON.stringify(medName),
    type: 'POST',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
    console.log(error);
    console.log(data);
  });
}

function addMedicationHandler() {
  $('body').on('submit', '.js-add-form', function(event) {
    event.preventDefault();

    const newMedName = $('.js-medication-list').val();
    $('.js-medication-list').val('');
    console.log('test');
    console.log();
    const addMed = {
      name: $(this).find('#brand-name').val(),
      form: $(this).find('#dosage-form').val(),
      gname: $(this).find('#generic-name').val(), //fix this//
      route: $(this).find('#route').val(),
      active: $(this).find('#substance-name').val(),
      fdaid: ''
    }
    addNewMedication(addMed);
    $('#js-display').html('');
    renderMedicationList(newMedName);
  });
}

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return itemIndexString //what is this?//
}

function deleteMedication(itemIndex) {
  $.ajax({
    url: 'http://localhost:8081/api/users/medication/' + itemIndex,
    type: 'DELETE',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    }
  }).done(function(data, error) {
    console.log(error);
    console.log(data);
  });
}

function deleteMedicationHandler() {
  $('.js-medication-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteMedication(itemIndex);
    renderMedicationList();
  });
}

function handleMedicationList() {
  renderMedicationList();
  addMedicationHandler();
  deleteMedicationHandler();
  searchMedicationHandler();
}

$(handleMedicationList);
