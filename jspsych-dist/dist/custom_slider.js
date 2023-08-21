jsPsych.plugins['confidence-slider'] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'confidence-slider',
        parameters: {
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: undefined,
                description: 'Any content here will be displayed above the slider.'
            }
        }
    }

    plugin.trial = function (display_element, trial) {

        var confidenceLevels = [
            'Not at all confident',
            'Slightly confident',
            'Somewhat confident',
            'Very confident',
            'Completely confident'
        ];

        var currentLevel = 0;

        // display prompt if there is one
        if (trial.prompt !== undefined) {
            display_element.innerHTML = trial.prompt;
        }

        // display slider
        var sliderHTML = '<div id="confidence-slider" style="font-size:20px; text-align:center; margin-top:50px;">' + confidenceLevels[currentLevel] + '</div>';
        display_element.innerHTML += sliderHTML;

        // handle keydown events
        var handleResponse = function (e) {
            e.preventDefault();
            if (e.keyCode == 38 && currentLevel < confidenceLevels.length - 1) { // Arrow Up
                currentLevel++;
            } else if (e.keyCode == 40 && currentLevel > 0) { // Arrow Down
                currentLevel--;
            } else if (e.keyCode == 13) { // Enter
                endTrial();
                return;
            }
            document.getElementById("confidence-slider").innerText = confidenceLevels[currentLevel];
        }

        var endTrial = function () {
            display_element.innerHTML = ''; // clear display
            document.removeEventListener('keydown', handleResponse); // remove event listener
            jsPsych.finishTrial({
                level: confidenceLevels[currentLevel],
                levelIndex: currentLevel
            });
        }

        // add event listener
        document.addEventListener('keydown', handleResponse);
    };

    return plugin;
})();
