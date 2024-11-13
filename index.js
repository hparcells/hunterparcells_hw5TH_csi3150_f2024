/// ------------------------------
// Utility Functions
// ------------------------------

// Returns a random value from an array.
function randomOf(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Returns a unique array of values.
function unique(array) {
  return [...new Set(array)];
}

function inputToFilter(string) {
  const trimmed = string.trim();
  if(!trimmed) {
    return null;
  }

  const numberRegex = /\d+/;
  const match = trimmed.match(numberRegex);
  if(!match) {
    return null;
  }

  return parseInt(match[0]);
}

// ------------------------------
// HTML Elements
// ------------------------------
const yearMinInput = document.querySelector('#year-min');
const yearMaxInput = document.querySelector('#year-max');
const makeDropdown = document.querySelector('#make');
const mileageMinInput = document.querySelector('#mileage-min');
const mileageMaxInput = document.querySelector('#mileage-max');
const priceMinInput = document.querySelector('#price-min');
const priceMaxInput = document.querySelector('#price-max');
const colorDropdown = document.querySelector('#color');
const carsDiv = document.querySelector('#cars');

// ------------------------------
// App Functions
// ------------------------------

// Rename our dataset.
const DATA = usedCars;

// Called on load. Fills in dropdowns.
function onLoad() {
  const allMakes = unique(DATA.map((car) => car.make)).sort();
  const allColors = unique(DATA.map((car) => car.color)).sort();

  // Add makes to dropdown.
  for(const make of allMakes) {
    const option = document.createElement('option');
    option.value = make;
    option.innerText = make;
    makeDropdown.appendChild(option);
  }

  // Add colors to dropdown.
  for(const color of allColors) {
    const option = document.createElement('option');
    option.value = color;
    option.innerText = color;
    colorDropdown.appendChild(option);
  }
}

// Called when filter button is clicked.
function filter() {
  // Get filter values.
  const filters = {
    minYear: inputToFilter(yearMinInput.value),
    maxYear: inputToFilter(yearMaxInput.value),
    make: makeDropdown.value || null,
    minMileage: inputToFilter(mileageMinInput.value),
    maxMileage: inputToFilter(mileageMaxInput.value),
    minPrice: inputToFilter(priceMinInput.value),
    maxPrice: inputToFilter(priceMaxInput.value),
    color: colorDropdown.value || null
  };

  // Filter results.
  const results = DATA.filter((car) => {
    if(filters.minYear && car.year < filters.minYear) {
      return false;
    }

    if(filters.maxYear && car.year > filters.maxYear) {
      return false;
    }

    if(filters.make && car.make !== filters.make) {
      return false;
    }

    if(filters.minMileage && car.mileage < filters.minMileage) {
      return false;
    }

    if(filters.maxMileage && car.mileage > filters.maxMileage) {
      return false;
    }

    if(filters.minPrice && car.price < filters.minPrice) {
      return false;
    }

    if(filters.maxPrice && car.price > filters.maxPrice) {
      return false;
    }

    if(filters.color && car.color !== filters.color) {
      return false;
    }

    return true;
  });

  // Display results.
  carsDiv.innerText = results.map(result => JSON.stringify(result));
}
