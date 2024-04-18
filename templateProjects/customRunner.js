function createScript(src)
{
    var element = document.createElement('script');
    element.setAttribute('src', src);
    document.head.appendChild(element);
    return element;
}

function getLineEndingChar(text)
{
    var idx = text.indexOf('\n');
    if (idx < 1) return '\n';

    return text[idx - 1] === '\r' ? '\r\n' : '\n';
}

function readFile(file)
{
    return fetch(file)
	.then(result => {
	    if(result.ok)
	    {
		return result.text(); // return the promise here
	    }
	    else
	    {
		return Promise.reject("Error loading " + file); // reject the promise to continue the error handling flow
	    }
    })
	.then(text => {
	    return text;
	})
	.catch(error => {
        // Handle the error if needed
        alert(error); // Display the error message
	});
}

      var statusElement = document.getElementById('status');
      var progressElement = document.getElementById('progress');
      var spinnerElement = document.getElementById('spinner');

      var Module = {
        print: (function() {
          var element = document.getElementById('output');
          if (element) element.value = ''; // clear browser cache
          return (...args) => {
            var text = args.join(' ');
            // These replacements are necessary if you render to raw HTML
            //text = text.replace(/&/g, "&amp;");
            //text = text.replace(/</g, "&lt;");
            //text = text.replace(/>/g, "&gt;");
            //text = text.replace('\n', '<br>', 'g');
            console.log(text);
            if (element) {
		element.textContent += text + "\n";
            }
          };
        })(),
        setStatus: (text) => {
          if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
          if (text === Module.setStatus.last.text) return;
          var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
          var now = Date.now();
          if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
          Module.setStatus.last.time = now;
          Module.setStatus.last.text = text;
          if (m) {
              text = m[1];
	      if (progressElement)
	      {
		  progressElement.value = parseInt(m[2])*100
		  progressElement.max = parseInt(m[4])*100;
		  progressElement.hidden = false;
	      }
	      if (spinnerElement)
	      {
		  spinnerElement.hidden = false;
	      }
            
          } else {
	      if (progressElement)
	      {
            progressElement.value = null;
            progressElement.max = null;
            progressElement.hidden = true;
	      }
	      if (spinnerElement)
	      {
		  if (!text) spinnerElement.style.display = 'none';
	      }

          }
	    if (statusElement)
	    {
		statusElement.innerHTML = text;
	    }
        },
        totalDependencies: 0,
        monitorRunDependencies: (left) => {
          this.totalDependencies = Math.max(this.totalDependencies, left);
          Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
        }
      };
      Module.setStatus('Downloading...');
      window.onerror = (event) => {
        // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
          Module.setStatus('Exception thrown, see JavaScript console');
	  if (spinnerElement)
	  {
	      spinnerElement.style.display = 'none';
	  }
        Module.setStatus = (text) => {
          if (text) console.error('[post-exception status] ' + text);
        };
      };

if (!Module["arguments"]) Module["arguments"] = [];
var input = document.getElementById('user-input');

if (input.value.length > 0)
{
    var text = input.value;
    var lineEnding = getLineEndingChar(text);
    var splitted = text.split(lineEnding);
    splitted = splitted.filter(item => (item.trim() !== ""));
    
    var fileArgIdx = splitted.indexOf('-f');
    if (fileArgIdx != -1)
    {
	readFile(splitted[fileArgIdx + 1])
	    .then(fileContent => {
		Module['arguments'].push('-f');
		Module['arguments'].push(fileContent);
	    });
    }
    splitted.forEach(function(item) {
	if (item !== splitted[fileArgIdx] && item != splitted[fileArgIdx + 1])
	    {
		Module['arguments'].push(item);
	    }
           });
}


createScript('index.js');
