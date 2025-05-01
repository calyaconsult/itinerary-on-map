// Configuration
const config = {
    rows: 40,     // Number of rows
    columns: 60,  // Number of columns
    color: 'rgba(128, 128, 255, 0.5)', // Grid line color
    thickness: 1  // Grid line thickness in pixels
};
// Initialize when image loads
const init = () => {
    createGridOverlay();
    //setupClickHandler();
    console.log('Initialized grid overlay'); // Debug log
};

document.getElementById('target-image').onload = init;
if (document.getElementById('target-image').complete) init();

// function createGridOverlay() => moved to create-grid-overlay.js
