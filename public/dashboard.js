const STATE = {
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
  return `<li class="js-item-index-element" data-item-index=${itemIndex}">
    <span class="medication-item js-medication-item">${item.brand_name}</span>
    <div class="medication-item-controls">
    <button class="medication-item-delete js-item-delete">
    <span class="button-label">delete</span>
    </button>
    </div>
  </li>`;
}

function generateMedicationString(medicationList) {
  let results = ''
  for (let i = 0; i < medicationList.medications.length; i += 1) {
    results += generateItemElement(medicationList.medications[i], i);
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
  const medicationString = generateMedicationString(STATE);
  $('.js-medication-list').html(medicationString);
}

function addNewMedication(medName) {
  STATE.medications.push({medications: medName});//need to fix this//
}

function addMedicationHandler() {
  $('#js-medication-list-form').submit(function(event) {
    event.preventDefault();

    const newMedName = $('#js-medication-list-entry').val();//coming back as undefined and appears to delete index 0//
    $('#js-dashboard-search').val('');
    addNewMedication(newMedName);
    renderMedicationList();
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
  // addNewMedication();//was calling twice//
  deleteMedication();
  deleteMedicationHandler();
}

$(handleMedicationList);
