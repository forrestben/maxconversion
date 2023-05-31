// maxconversion.js

// Example code for the live external site
window.addEventListener('message', function (event) {
  const message = event.data;
  if (message.type === 'stylingChange') {
    const element = document.getElementById(message.elementId);
    if (element) {
      element.style[message.style] = message.value;
    }
  }
});

// Function to send styling change message to the parent window
function sendStylingChange(elementId, style, value) {
  const message = {
    type: 'stylingChange',
    elementId,
    style,
    value
  };
  parent.postMessage(message, '*');
}

// Example function to apply background color change
function applyBackgroundColor() {
  const elementId = 'element-id'; // Replace with the actual element ID
  const color = document.getElementById('background-color-input').value;
  sendStylingChange(elementId, 'background-color', color);
}

// Example function to apply text color change
function applyTextColor() {
  const elementId = 'element-id'; // Replace with the actual element ID
  const color = document.getElementById('text-color-input').value;
  sendStylingChange(elementId, 'color', color);
}

// Example function to apply border radius change
function applyBorderRadius() {
  const elementId = 'element-id'; // Replace with the actual element ID
  const radius = document.getElementById('border-radius-input').value;
  sendStylingChange(elementId, 'border-radius', radius);
}

// Additional functions in maxconversion.js if you have other functionalities

// ...
