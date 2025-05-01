/**
 * Grid Module - Responsible for creating and managing the grid
 */
const Grid = (function() {
    // Configuration
    const config = {
        rows: 40,
        columns: 60,
        containerId: 'gridContainer'
    };

    /**
     * Creates the grid with the specified dimensions
     */
    function createGrid() {
        const container = document.getElementById(config.containerId);

        if (!container) {
            console.error('Grid container not found');
            return;
        }

        // Clear any existing content
        container.innerHTML = '';

        // Create cells
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.columns; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row + 1;
                cell.dataset.col = col + 1;
                cell.id = `${row+1}.${col+1}`;
                container.appendChild(cell);
            }
        }

        return container;
    }

    /**
     * Get a specific cell by its coordinates
     */
    function getCell(row, column) {
        return document.getElementById(`${row}.${column}`);
    }

    // Public API
    return {
        init: createGrid,
        getCell: getCell,
        config: config
    };
})();

// Initialize the grid when DOM is ready
document.addEventListener('DOMContentLoaded', Grid.init);
