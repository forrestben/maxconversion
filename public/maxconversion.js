// Global variables to store the selected element and its original styling
let selectedElement = null;
let originalStyling = null;

// Function to handle element selection and display
function handleElementSelection(event) {
  const iframe = document.getElementById('screenshotFrame');
  const iframeDocument = iframe.contentWindow.document;
  const targetElement = event.target;

  // Remove any existing selection
  if (selectedElement) {
    selectedElement.classList.remove('selected-element');
  }

  // Store the selected element and its original styling
  selectedElement = targetElement;
  originalStyling = targetElement.getAttribute('style') || '';

  // Apply the selection styling
  selectedElement.classList.add('selected-element');

  // Display the selected element information
  const elementContainer = document.getElementById('elementContainer');
  elementContainer.textContent = `Selected Element: ${targetElement.tagName}`;
}

// Function to handle styling form submission
function handleStylingFormSubmit(event) {
  event.preventDefault();
  const propertySelect = document.getElementById('propertySelect');
  const selectedProperty = propertySelect.value;

  // Get the selected property input value
  let stylingValue = null;
  if (selectedProperty === 'background-color') {
    const backgroundColorInput = document.getElementById('backgroundColorInput');
    stylingValue = backgroundColorInput.value;
  } else if (selectedProperty === 'color') {
    const colorInput = document.getElementById('colorInput');
    stylingValue = colorInput.value;
  } else if (selectedProperty === 'border-radius') {
    const borderRadiusInput = document.getElementById('borderRadiusInput');
    stylingValue = borderRadiusInput.value;
  }

  // Apply the styling to the selected element within the iframe
  if (selectedElement && stylingValue !== null) {
    selectedElement.style[selectedProperty] = stylingValue;
  }
}

// Function to load the screenshot
function loadScreenshot(url) {
  const iframe = document.getElementById('screenshotFrame');
  iframe.src = url;
}

// Function to handle URL form submission
function handleUrlFormSubmit(event) {
  event.preventDefault();
  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value;
  loadScreenshot(url);
}

// Add event listeners
document.getElementById('urlForm').addEventListener('submit', handleUrlFormSubmit);
document.getElementById('stylingForm').addEventListener('submit', handleStylingFormSubmit);
