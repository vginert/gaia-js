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

var Log = require('./log');

var that;
var sensorUpdateIntervalDefaultTime = 500;
var controlIntervalDefaultTime = 1000;
var sensorUpdateInterval = null;
var controlInterval = null;

/**
 * Application prototype.
 */
var app = exports = module.exports = {};

app.init = function init() {
    that = this;
    this.controllers = new Array();
    this.sensorsDrivers = new Array();
    this.sensors = new Array();
}

app.start = function start() {
    sensorUpdateInterval = setInterval(updateSensorsDrivers, sensorUpdateIntervalDefaultTime);
    controlInterval = setInterval(control, controlIntervalDefaultTime);
}

app.addController = function(controller) {
    // TODO check controller
    this.controllers.push(controller);
}

app.addSensorDriver = function(sensorDriver) {
    // TODO check sensorDriver
    this.sensors.push(sensorDriver);
}

app.log = new Log();

var updateSensorsDrivers = function() {
    that.sensorsDrivers.forEach(function(sensorsDriver) {
        // TODO check method updateSensor
        sensorsDriver.getSensors();
    });
}

var control = function() {
    that.controllers.forEach(function(controller) {
        // TODO check method control
        controller.control();
    });
}
