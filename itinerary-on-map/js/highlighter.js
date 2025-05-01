/**
 * Highlighter Module - Responsible for highlighting cells
 */
const Highlighter = (function() {
    /**
     * Highlight multiple cells based on provided coordinates
     * @param {Array} cells - Array of objects with row and column properties
     */
    function highlightCells(cells) {
        if (!cells || !Array.isArray(cells)) {
            console.error('Invalid cells data provided for highlighting');
            return;
        }

        cells.forEach(cell => {
            const currentCell = Grid.getCell(cell.row, cell.column);
            if (currentCell) {
                currentCell.classList.add('highlighted');
            } else {
                console.warn(`Cell at row ${cell.row}, column ${cell.column} not found`);
            }
        });
    }

    /**
     * Clear all highlighted cells
     */
    function clearHighlights() {
        const highlightedCells = document.querySelectorAll('.highlighted');
        highlightedCells.forEach(cell => {
            cell.classList.remove('highlighted');
        });
    }

    // Public API
    return {
        highlight: highlightCells,
        clear: clearHighlights
    };
})();
