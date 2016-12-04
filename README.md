# Welcome to Gaia-Js!

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Gaia-js** is a [NodeJs](http://nodejs.org) library for climate control in terrariums, aquariums, vivariums and grow rooms using a [RaspberryPi](http://www.raspberrypi.org)

----------

## Getting Started

### Installation

To start using GaiaJs you only need to install the main module:

    npm install gaia-js

After install the core module you need to install the controllers module for add basic functionality:

	npm install gaia-js-controllers

## Examples

### PID controller

The best way to control values like temperature or humidity is using a [PID](https://en.wikipedia.org/wiki/PID_controller) controller:

```javascript
var Gaia = require('gaia-js');
var PidController = require('gaia-js-controllers').PidController;

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
```

The use of this controller is recommended whenever is possible to adjust the output level of the device used to control the desired values

You can change the PID direction in the constructor options or with the direction setter:

```javascript
var temperatureZone1 = new PidController({
	name: 'Temperature_Zone1',
	direction: PidController.REVERSE
	...
});

temperatureZone1.setDirection(PidController.DIRECT);
```

### Level controller

The use of this controller is recommended when the device used to control the desired values have only on/off states.

```javascript
var Gaia = require('gaia-js');
var LevelController = require('gaia-js-controllers').LevelController;

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
```

### Time interval controller

Use this controller to perform actions depending on a time interval, such as turning lights on and off

```javascript
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
```

## People

Author [Vicente Giner Tendero](https://github.com/vginert)

## License

  [MIT](LICENSE)
