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

var Utils = module.exports = {

   /**
	* Provides class inheritance based on CoffeeScript's 
	* implementation of inheritance.
	*
	* Parent class methods/properites are available on Child.__super__.
	*
	* @param {Function} the child class
	* @param {Function} the parent class
	* @return {Function} the child class
	*/
	inherit: function inherit(child, parent) {
		var Constructor = function() {
		  	this.constructor = child;
		};

		for (var key in parent) {
			if (parent.hasOwnProperty(key)) {
				child[key] = parent[key];
			}
		}

		Constructor.prototype = parent.prototype;
		child.prototype = new Constructor();
		child.__super__ = parent.prototype;
		return child;
	}
}