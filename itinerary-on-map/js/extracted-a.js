
    // Configuration
    const config = {
        rows: 40,     // Number of rows
        columns: 60,  // Number of columns
        color: 'rgba(128, 128, 255, 0.5)', // Grid line color
        thickness: 1  // Grid line thickness in pixels
    };

    // Click accumulator
    const clickAccu = () => {
        let accu = [];
        return (coords, action) => {
            if (action === 'add') {
                accu.push(coords);
                console.log('Added:', coords); // Debug log
                return true;
            } else if (action === 'clear') {
                accu = [];
                return false;
            } else {
                return [...accu]; // Return a copy
            }
        }
    };
    const addToAccu = clickAccu();

    // Initialize when image loads
    const init = () => {
        createGridOverlay();
        setupClickHandler();
        console.log('Initialized grid overlay'); // Debug log
    };

    document.getElementById('target-image').onload = init;
    if (document.getElementById('target-image').complete) init();

    // function createGridOverlay() => moved to create-grid-overlay.js

    function setupClickHandler() {
        const container = document.getElementById('image-container');
        // Remove previous listener to avoid duplicates
        container.removeEventListener('click', handleClick);
        container.addEventListener('click', handleClick);
        console.log('Click handler set up'); // Debug log
    }

    function handleClick(e) {
        const { row, column } = getCellCoordinates(e);
        addToAccu({ row, column }, 'add');
        updateCellHighlight(row, column);
        updateCoordinatesDisplay(row, column);
        const accuStatus = addToAccu();
        const clickIndicator = document.getElementById('clickindicator');
        clickIndicator.textContent = JSON.stringify(accuStatus,null,2);
        console.log('Current clicks:', accuStatus); // Debug log
    }

    function updateCellHighlight(row, column) {
        const highlight = document.getElementById('cell-highlight');
        highlight.style.display = 'block';
        highlight.style.left = `${(column - 1) * (100 / config.columns)}%`;
        highlight.style.top = `${(row - 1) * (100 / config.rows)}%`;
        highlight.style.width = `${100 / config.columns}%`;
        highlight.style.height = `${100 / config.rows}%`;
    }

    function updateCoordinatesDisplay(row, column) {
        const display = document.getElementById('coordinates-display');
        display.textContent = `Row: ${row}, Column: ${column}`;
        display.style.display = 'block';
    }

    function getCellCoordinates(e) {
        const image = document.getElementById('target-image');
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cellWidth = rect.width / config.columns;
        const cellHeight = rect.height / config.rows;

        const column = Math.min(config.columns, Math.max(1, Math.floor(x / cellWidth) + 1));
        const row = Math.min(config.rows, Math.max(1, Math.floor(y / cellHeight) + 1));

        return { row, column };
    }

    // Utility functions
    window.clearClicks = () => {
        const clickIndicator = document.getElementById('clickindicator');
        clickIndicator.innerHTML = '[ ]';
        addToAccu(null, 'clear');
        document.getElementById('cell-highlight').style.display = 'none';
        document.getElementById('coordinates-display').style.display = 'none';
        console.log('Cleared all clicks');
    };

    window.getClicks = () => addToAccu();
