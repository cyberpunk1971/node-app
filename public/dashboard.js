const STATE = {
  "searchMeds": [{
    "brand_name": "Tylenol",
    "dosage_form": "tablet",
    "generic_name": "Acetaminophen",
    "route": "oral",
    "substance_name": "Acetaminophen"
  }],
  "medications": [
    {
      "brand_name": "Tylenol",
      "dosage_form": "tablet",
      "generic_name": "Acetaminophen",
      "route": "oral",
      "substance_name": "Acetaminophen"
    },
    {
      "brand_name": "Prilosec",
      "dosage_form": "tablet",
      "generic_name": "Omeprazole",
      "route": "oral",
      "substance_name": "Omeprazole"
    },
    {
      "brand_name": "Lasix",
      "dosage_form": "tablet",
      "generic_name": "Furosemide",
      "route": "oral",
      "substance_name": "Furosemide"
    },
    {
      "brand_name": "Zestril",
      "dosage_form": "tablet",
      "generic_name": "Lisinopril",
      "route": "oral",
      "substance_name": "Lisinopril"
    },
  ],
  "userName": {
    "firstName": "Alex",
    "lastName": "Thomas"
  }
}




// $('#js-results').append();
function generateItemElement(item, itemIndex, template) {
  console.log(item);
  console.log(item.brand_name);
  return `<li class="js-item-index-element" data-item-index=${itemIndex}">
    <span class="medication-item js-medication-item">Name: ${item.brand_name}</span><br>
    <span class="medication-item js-medication-item">Form: ${item.dosage_form}</span><br>
    <span class="medication-item js-medication-item">Generic: ${item.generic_name}</span><br>
    <span class="medication-item js-medication-item">Route: ${item.route}</span><br>
    <span class="medication-item js-medication-item">Active Ingredient: ${item.substance_name}</span>
    <div class="medication-item-controls">
    <button class="medication-item-delete js-item-delete">
    <span class="button-label">delete</span>
    </button>
    </div>
  </li>`;
}

function searchMedications(searchTerm) {
  let searchResults = ''
  let searchMeds = STATE.searchMeds
  for (let i = 0; i < searchMeds.length; i += 1) {
    searchResults += generateSearchElement(searchMeds[i], i);
  }
  return searchResults;
}

function generateSearchElement(item, itemIndex, template) {
  console.log(item);
  console.log(item.brand_name);
  return `<li class="js-item-index-element" data-item-index=${itemIndex}">
    <span class="medication-item js-medication-item">Name: ${item.brand_name}</span><br>
    <span class="medication-item js-medication-item">Form: ${item.dosage_form}</span><br>
    <span class="medication-item js-medication-item">Generic: ${item.generic_name}</span><br>
    <span class="medication-item js-medication-item">Route: ${item.route}</span><br>
    <span class="medication-item js-medication-item">Active Ingredient: ${item.substance_name}</span>
    <div class="medication-item-controls">
    <button class="button-label">Add to list</button><br>
    </div>
      <input type="text" class="user-entry"/>Frequency<br>
      <input type="text" class="user-entry"/>Dosage<br>
  </li>`;
}

function generateMedicationString(medications) {
  let results = ''
  for (let i = 0; i < medications.length; i += 1) {
    results += generateItemElement(medications[i], i);
    // console.log(medicationList.medications[i]);
  }
  return results;

  // console.log(item);
  //   return generateItemElement(item, index);
  //
  //
  //
  // return items.join("");
}

function renderMedicationList() {
  const medicationString = generateMedicationString(STATE.medications);
  $('.js-medication-list').html(medicationString);
}

function addNewMedication(medName) {
  STATE.medications.push({brand_name: medName});

}

function addMedicationHandler() {
  $('#js-medication-list-form').submit(function(event) {
    event.preventDefault();
    const newMedName = $('#js-medication-list-entry').val();//coming back as undefined and appears to delete index 0//
    $('#js-medication-list-entry').val('');
    addNewMedication(newMedName);
    renderMedicationList();
  });
}
function searchMedicationHandler() {
  $('#js-dashboard-search-form').submit(function(event) {
    event.preventDefault();
    const searchMedName = $('#js-dashboard-search').val();
    event.target.reset();
    const medSearchList = searchMedications(searchMedName);
    $('.js-search-list').append(medSearchList);

  })
}


function getItemIndexFromElement(item) {
    const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
    return parseInt(itemIndexString, 10);
}

function deleteMedication(itemIndex) {
  STATE.medications.splice(itemIndex, 1);
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
  // addNewMedication();
  // deleteMedication();
  deleteMedicationHandler();
  searchMedicationHandler();
}

$(handleMedicationList);
