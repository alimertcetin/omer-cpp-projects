window.onload = function() {
    const searchResultsOverlay = document.getElementById("searchResultsOverlay");
    // Function to fetch project names from the server
    function fetchProjectNames() {
        // Dynamically determine the base URL
        var baseURL = window.location.protocol + "//" + window.location.host + "/";
        var projectsDirectory = baseURL + "projects/";

        return fetch(projectsDirectory)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                return response.text();
            })
            .then(html => {
                // Extract project names from the HTML
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var links = doc.querySelectorAll("a");

                var projectNames = [];
                links.forEach(link => {
                    var projectName = link.href.split("/").slice(-2, -1)[0];
                    if (projectName) {
                        projectNames.push(projectName);
                    }
                });
                return projectNames;
            })
            .catch(error => {
                console.error("Error fetching projects:", error);
		console.log(projectsDirectory);
                return [];
            });
    }

    // Function to display project names as links in the overlay
    function displayProjectLinks(projectNames) {
        var searchResultsList = document.getElementById("searchResultsList");

        // Clear previous results
        searchResultsList.innerHTML = "";
	const linksHTML = projectNames.length ? projectNames.map(projectName => `<div><a href="${window.location.protocol}//${window.location.host}/projects/${projectName}/index.html">${projectName}</a></div>`).join('') : '<div>No Projects Found</div>';
            // Set innerHTML of searchResultsList
            searchResultsList.innerHTML = linksHTML;

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

        // Fetch project names
        fetchProjectNames().then(function(projectNames) {
            // Filter project names based on search term
            var filteredProjectNames = projectNames.filter(function(projectName) {
                return projectName.toLowerCase().includes(searchTerm);
            });

            // Display filtered project names
            displayProjectLinks(filteredProjectNames);
        });
    });
};
