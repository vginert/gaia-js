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
var TimeIntervalController = require('gaia-js-controllers').TimeIntervalController;

// Create the new Time Interval controller
var mainLightsControl = new TimeIntervalController({
	name: 'Main_Lights_Control',
	intervals: [
		{
			start: '17:06',
			end: '17:07'
		},
		{
			start: '17:08',
			end: '17:09'
		}
	]
});

// Set the controller tick callback
mainLightsControl.onTick(function(isInInterval) {
	if(isInInterval) {
		// Switch lights on
	} else {
		// Switch lights off
	}
});

// Set the callback of the controller, this method is executed when the controller is started
mainLightsControl.isInInterval(function(isInInterval) {
	if(isInInterval) {
		// Set the lights on
	} else {
		// Set the lights off
	}
});

// Add the controller to the GaiaJs core
Gaia.controller(mainLightsControl);

// Start GaiaJs
Gaia.start();