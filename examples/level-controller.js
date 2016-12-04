/**
 * The MIT License
 *
 * Copyright (c) 2016 Vicente Giner Tendero
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var Gaia = require('gaia-js');
var LevelController = require('gaia-js-controllers').LevelController;

var humidity = 60;

// Create the new PID controller
var humidityZone1 = new LevelController({
	name: 'Humidity_Zone1',
	input: humidity, // The humidity input usually obtained from a sensor
	setPoint: 80 // The desired humidity 
});

// Set the controller callback
humidityZone1.onCheckLevel(function(controller, levelExceed) {
	controller.setInput(humidity); // Update the controller input

	// Use the PID output to modify the desired value
	if(levelExceed) {
		// The humidity is over the desired value
	} else {
		// The humidity is under the desired value
	}
});

// Add the controller to the GaiaJs core
Gaia.controller(humidityZone1);

// Start GaiaJs
Gaia.start();