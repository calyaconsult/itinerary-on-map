function createGridOverlay() { // extracted-a.js
    const overlay = document.getElementById('grid-overlay');
    overlay.innerHTML = '';

    // Create horizontal lines
    const rowSpacing = 100 / config.rows;
    for (let i = 1; i < config.rows; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line horizontal-line';
        line.style.top = `${i * rowSpacing}%`;
        line.style.backgroundColor = config.color;
        line.style.height = `${config.thickness}px`;
        overlay.appendChild(line);
    }

    // Create vertical lines
    const columnSpacing = 100 / config.columns;
    for (let i = 1; i < config.columns; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line vertical-line';
        line.style.left = `${i * columnSpacing}%`;
        line.style.backgroundColor = config.color;
        line.style.width = `${config.thickness}px`;
        overlay.appendChild(line);
    }
}
