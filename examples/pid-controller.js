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
var PidController = require('gaia-js-controllers').PidController;

var temperature = 20;

// Create the new PID controller
var temperatureZone1 = new PidController({
	name: 'Temperature_Zone1',
	input: temperature, // The temperature input usually obtained from a sensor
	setPoint: 23, // The desired temperature 
	kp: 500, // PID algorithm settings
	ki: 200,
	kd: 0,
	limits: { // The output limits used for control the temperature
		outMin: 0,
		outMax: 255
	}
});

// Set the controller callback
temperatureZone1.onCompute(function(controller, output) {
	controller.setInput(temperature); // Update the controller input
	// Use the PID output to modify the desired value
});

// Add the controller to the GaiaJs core
Gaia.controller(temperatureZone1);

// Start GaiaJs
Gaia.start();