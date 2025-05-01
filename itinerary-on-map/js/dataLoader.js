/**
 * DataLoader Module - Responsible for loading and processing data
 */
const DataLoader = (function() {
    // Configuration
    const config = {
        dataPath: 'data/itinerary-on-map-data.json',
        indicatorId: 'clickIndicator'
    };

    /**
     * Load data from JSON file
     */
    function loadData() {
        fetch(config.dataPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                processData(data);
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
                updateIndicator(`Error loading data: ${error.message}`);
            });
    }

    /**
     * Process the loaded data
     */
    function processData(data) {
        if (!data || !Array.isArray(data)) {
            console.error('Invalid data format');
            return;
        }

        // Update the click indicator
        updateIndicator(`
            <p>Data loaded from file <code>${config.dataPath}</code></p>
            <p>Data collected via <a href="itinerary-on-map-template-w-clickhandler.html">itinerary-on-map-template-w-clickhandler.html</a></p>
            <p>Total points: ${data.length}</p>
        `);

        // Highlight the cells
        Highlighter.highlight(data);
    }

    /**
     * Update the indicator element with new content
     */
    function updateIndicator(content) {
        const indicator = document.getElementById(config.indicatorId);
        if (indicator) {
            indicator.innerHTML = content;
        }
    }

    // Initialize data loading when DOM is ready
    function init() {
        loadData();
    }

    // Public API
    return {
        init: init,
        reload: loadData,
        setDataPath: function(path) {
            config.dataPath = path;
        }
    };
})();

// Initialize the data loader when DOM is ready
document.addEventListener('DOMContentLoaded', DataLoader.init);
