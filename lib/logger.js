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

var Logger = module.exports = {

	colors: {
		log: '\x1b[0m',
		error: '\x1b[31m',
		debug: '\x1b[34m'
	},

	level: {
		log: true,
		debug: true
	},

	log: function log(tag, message) {
		if(Logger.level.log) {
			writeLog(tag, message, Logger.colors.log);
		}
	},

	error: function error(tag, message) {
		if(Logger.level.log) {
			writeLog(tag, message, Logger.colors.error);
		}
	},

	debug: function debug(tag, message) {
		if(Logger.level.log && Logger.level.debug) {
			writeLog(tag, message, Logger.colors.debug);
		}
	}
}

function writeLog(tag, message, color) {
	var prefix = new Date().toISOString() + " : " + tag + " - ";
	console.log(color, prefix + message, '\x1b[0m');
}