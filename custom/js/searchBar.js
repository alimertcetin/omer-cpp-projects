window.onload = function() {
    
    // Extract project names
    const  projectNames = extractProjectNames();
    const searchResultsList = document.getElementById("searchResultsList");
    const searchResultsOverlay = document.getElementById("searchResultsOverlay");
    
    // Function to extract project names from the DOM
    function extractProjectNames() {
        var links = document.querySelectorAll('a[href^="projects/"]');
        var projectNames = Array.from(links).map(link => {
            var projectName = link.href.split("/").slice(-2, -1)[0];
            return projectName;
        });
        return projectNames;
    }

    // Function to display project names as links in the overlay
    function displayProjectLinks(filteredProjectNames) {
        // Clear previous results
        searchResultsList.innerHTML = "";

        // Check if any project names are found
        if (filteredProjectNames.length) {
            // Create HTML string for project name links
            const linksHTML = filteredProjectNames.map(projectName => `<div><a href="projects/${projectName}/index.html">${projectName}</a></div>`).join('');
            // Set innerHTML of searchResultsList
            searchResultsList.innerHTML = linksHTML;
        } else {
            // Display message if no projects found
            searchResultsList.innerHTML = '<div>No projects found</div>';
        }

        // Show search results overlay
        searchResultsOverlay.classList.add('show');
    }

    
        // Close search results overlay when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!event.target.closest('.search-container')) {
            searchResultsOverlay.classList.remove('show');
        }
    });

    // Prevent closing search results overlay when clicking inside it
    searchResultsOverlay.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    // Function to handle search input
    document.getElementById("searchInput").addEventListener("input", function() {
        var searchTerm = this.value.toLowerCase();

	if (!searchTerm.length)
	{
            searchResultsOverlay.classList.remove('show');
	    return;
	}
	

        // Filter project names based on search term
        var filteredProjectNames = projectNames.filter(function(projectName) {
            return projectName.toLowerCase().includes(searchTerm);
        });

        // Display filtered project names
        displayProjectLinks(filteredProjectNames);
    });
};
