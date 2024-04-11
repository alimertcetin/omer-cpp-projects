document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchResultsOverlay = document.getElementById("searchResultsOverlay");

    // Function to fetch project names and links from the "projects" folder
    function fetchProjectsFromFolder() {
        const projectsFolder = 'projects/'; // Path to the "projects" folder
        return fetch(projectsFolder)
            .then(response => {
                if (!response.ok) {
		    console.log(response.status, response.statusText);
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const projectLinks = Array.from(doc.querySelectorAll('a[href]'))
                    .map(link => {
                        const projectName = link.getAttribute('href');
                        const projectIndexPage = projectsFolder + projectName + '/index.html';
                        return { name: projectName, link: projectIndexPage };
                    });
                return projectLinks;
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }

    // Function to filter project names based on user input
    function filterProjects(query, projectNames) {
        return projectNames.filter(project => project.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResultsList = document.getElementById("searchResultsList");
        searchResultsList.innerHTML = results.length ? results.map(result => `<a href="${result.link}">${result.name}</a>`).join('') : '<div>No projects found</div>';
        searchResultsOverlay.classList.add('show');
    }

    // Event listener for input changes
    searchInput.addEventListener("input", function() {
        const query = this.value;
        fetchProjectsFromFolder()
            .then(projectLinks => {
                const filteredProjects = filterProjects(query, projectLinks);
                displaySearchResults(filteredProjects);
            });
    });

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
});


/*

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchResultsOverlay = document.getElementById("searchResultsOverlay");

    // Function to fetch project names from the "projects" folder
    function fetchProjectsFromFolder() {
        // Assume "projects" is a local folder in the same directory
        const projectLinks = document.querySelectorAll('a[href^="projects/"]');
        const projectNames = Array.from(projectLinks).map(link => {
            const projectName = link.getAttribute('href').split('/').pop();
            return projectName;
        });
        return Promise.resolve(projectNames);
    }

    // Function to filter project names based on user input
    function filterProjects(query, projectNames) {
        return projectNames.filter(project => project.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResultsList = document.getElementById("searchResultsList");
        searchResultsList.innerHTML = results.length ? results.map(result => `<div>${result}</div>`).join('') : '<div>No projects found</div>';
        searchResultsOverlay.classList.add('show');
    }

    // Event listener for input changes
    searchInput.addEventListener("input", function() {
        const query = this.value;
        fetchProjectsFromFolder()
            .then(projectNames => {
                const filteredProjects = filterProjects(query, projectNames);
                displaySearchResults(filteredProjects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    });

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
});
*/


/*

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchResultsOverlay = document.getElementById("searchResultsOverlay");

    // Function to fetch project names from the "projects" folder
    function fetchProjectsFromFolder() {
        // This function should be implemented as shown earlier
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'projects/'); // Assuming projects are stored in the "projects" folder
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const projectsHTML = xhr.response;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(projectsHTML, 'text/html');
                    const links = doc.querySelectorAll('a'); // Assuming project names are listed as links in the folder
                    const projectNames = Array.from(links).map(link => link.textContent);
                    resolve(projectNames);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function() {
                reject('Network error');
            };
            xhr.send();
        });
    }

    // Function to filter project names based on user input
    function filterProjects(query, projectNames) {
        // This function should be implemented as shown earlier
	return projectNames.filter(project => project.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to display search results
    function displaySearchResults(results) {
        const searchResultsList = document.getElementById("searchResultsList");
        searchResultsList.innerHTML = results.length ? results.map(result => `<div>${result}</div>`).join('') : '<div>No projects found</div>';
        searchResultsOverlay.classList.add('show');
    }

    // Event listener for input changes
    searchInput.addEventListener("input", function() {
        const query = this.value;
        fetchProjectsFromFolder()
            .then(projectNames => {
                const filteredProjects = filterProjects(query, projectNames);
                displaySearchResults(filteredProjects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    });

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
});

*/



/*
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    // Function to fetch project names from the "projects" folder
    function fetchProjectsFromFolder() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'projects/'); // Assuming projects are stored in the "projects" folder
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const projectsHTML = xhr.response;
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(projectsHTML, 'text/html');
                    const links = doc.querySelectorAll('a'); // Assuming project names are listed as links in the folder
                    const projectNames = Array.from(links).map(link => link.textContent);
                    resolve(projectNames);
                } else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function() {
                reject('Network error');
            };
            xhr.send();
        });
    }

    // Function to filter project names based on user input
    function filterProjects(query, projectNames) {
        return projectNames.filter(project => project.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to display search results
    function displaySearchResults(results) {
        searchResults.innerHTML = results.length ? results.map(result => `<div>${result}</div>`).join('') : '<div>No projects found</div>';
    }

    // Event listener for input changes
    searchInput.addEventListener("input", function() {
        const query = this.value;
        fetchProjectsFromFolder()
            .then(projectNames => {
                const filteredProjects = filterProjects(query, projectNames);
                displaySearchResults(filteredProjects);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    });
});
*/
