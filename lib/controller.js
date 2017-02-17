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

var TAG = 'Controller';

var Logger = require("./logger");

var CONTROLLER_ID = 1;
var INTERVAL = 500;

function formatErrorMessage(name, message) {
  return ["Error in controller", "'" + name + "'", "- " + message].join(" ");
}

/**
 * Controller class
 *
 * @constructor Controller
 * @param {Object} [opts] controller options
 * @param {String} [opts.name] the controller's name
 * @param {Number} [opts.controlTimeInterval] the controller's control time interval
 */
var Controller = module.exports = function Controller(opts) {
	opts = opts || {};

	this.initController(opts);
  this.initAttributesAndCommands();
}

/**
 * A base control function. Must be overwritten by a descendent.
 *
 * @throws Error if not overridden by a child class
 * @return {void}
 */
Controller.prototype.control = function() {
  var message = formatErrorMessage(
    this.name,
    "Controller#control method must be overwritten by descendant classes."
  );

  throw new Error(message);
}

/**
 * A base start function. Must be overwritten by a descendent.
 *
 * @throws Error if not overridden by a child class
 * @return {void}
 */
Controller.prototype.start = function() {
  this.controlInterval = setInterval((function(self) {
       return function() {
           self.control();
       }
  })(this), this.controlTimeInterval);
  Logger.log(TAG, this.name + ' controller started.');
}

/**
 * A base halt function. Must be overwritten by a descendent.
 *
 * @throws Error if not overridden by a child class
 * @return {void}
 */
Controller.prototype.halt = function() {
  clearInterval(this.controlInterval);
}

/**
 * Parse the controller options.
 *
 * @param {Object} [opts] controller options
 * @param {String} [opts.name] the controller's name
 * @param {Number} [opts.controlTimeInterval] the controller's control time interval
 */
Controller.prototype.initController = function(opts) {
	this.name = opts.name || "Controller " + CONTROLLER_ID++;
  this.controlTimeInterval = opts.interval || INTERVAL;
  Logger.debug(TAG, "Controller name: " + this.name);
  Logger.debug(TAG, "Controller interval time: " + this.controlTimeInterval);
}

/**
 * Init the controller attributes and commands.
 */
Controller.prototype.initAttributesAndCommands = function() {
  this.attributes = {};
  this.commands = {};
}