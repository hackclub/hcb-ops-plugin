/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/content.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./src/app/content.ts":
/*!****************************!*\
  !*** ./src/app/content.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bankV1GoogleWorkspace_1 = __webpack_require__(/*! ./content/bankV1GoogleWorkspace */ "./src/app/content/bankV1GoogleWorkspace.ts");
const bankV1GoogleWorkspaceEdit_1 = __webpack_require__(/*! ./content/bankV1GoogleWorkspaceEdit */ "./src/app/content/bankV1GoogleWorkspaceEdit.ts");
const bankProjectSearch_1 = __webpack_require__(/*! ./content/bankProjectSearch */ "./src/app/content/bankProjectSearch.ts");
const bankV1TransactionEdit_1 = __webpack_require__(/*! ./content/bankV1TransactionEdit */ "./src/app/content/bankV1TransactionEdit.ts");
const expensifyReport_1 = __webpack_require__(/*! ./content/expensifyReport */ "./src/app/content/expensifyReport.ts");
const svbBillPayAddIndivHaveBank_1 = __webpack_require__(/*! ./content/svbBillPayAddIndivHaveBank */ "./src/app/content/svbBillPayAddIndivHaveBank.ts");
const svbBillPayAddPayeeActivationCode_1 = __webpack_require__(/*! ./content/svbBillPayAddPayeeActivationCode */ "./src/app/content/svbBillPayAddPayeeActivationCode.ts");
const bankV2GoogleWorkspaceEdit_1 = __webpack_require__(/*! ./content/bankV2GoogleWorkspaceEdit */ "./src/app/content/bankV2GoogleWorkspaceEdit.ts");
const bankV2TransactionEdit_1 = __webpack_require__(/*! ./content/bankV2TransactionEdit */ "./src/app/content/bankV2TransactionEdit.ts");
const bankV2GoogleWorkspace_1 = __webpack_require__(/*! ./content/bankV2GoogleWorkspace */ "./src/app/content/bankV2GoogleWorkspace.ts");
function checkPath() {
    chrome.runtime.sendMessage({}, (response) => {
        var checkReady = setInterval(() => {
            if (document.readyState === 'complete') {
                clearInterval(checkReady);
                // match path to content function
                const matches = [
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/g_suites$/,
                        func: bankV1GoogleWorkspace_1.default,
                    },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/.*\/g_suites\/.*\/edit/,
                        func: bankV1GoogleWorkspaceEdit_1.default,
                    },
                    {
                        regex: /https:\/\/www\.businessbillpay-e\.com\/V2\/Payees\/AddIndividual\.aspx.*/,
                        func: svbBillPayAddIndivHaveBank_1.default,
                    },
                    {
                        regex: /https:\/\/www\.businessbillpay-e\.com\/V2\/Payees\/ActivationCode\.aspx.*/,
                        func: svbBillPayAddPayeeActivationCode_1.default,
                    },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/transactions\/.*\/edit/,
                        func: bankV1TransactionEdit_1.default,
                    },
                    // {
                    // 	regex: /https:\/\/bank\.hackclub\.com\/.*/,
                    // 	func: bankEventCopyName,
                    // },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/events.*[?&]name=.*/,
                        func: bankProjectSearch_1.default,
                    },
                    {
                        regex: /https:\/\/.*expensify\.com\/report.*/,
                        func: expensifyReport_1.default,
                    },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/admin\/.*\/google_workspace_process/,
                        func: bankV2GoogleWorkspaceEdit_1.default,
                    },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/admin\/.*\/transaction/,
                        func: bankV2TransactionEdit_1.default,
                    },
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/admin\/google_workspaces/,
                        func: bankV2GoogleWorkspace_1.default,
                    },
                ];
                const url = window.location.href;
                var matchesSpecificContent = false;
                for (let item of matches) {
                    if (item.regex instanceof RegExp) {
                        if (url.match(item.regex)) {
                            matchesSpecificContent = true;
                            console.log('Hack Club Bank Ops Plugin is running on this page!');
                            console.log('Running function:', item.func.name + '()');
                            // inject common css/scripts into page
                            injectCommon();
                            // run content specific function
                            item.func();
                        }
                    }
                    else if (Array.isArray(item.regex)) {
                        var matched = false;
                        item.regex.forEach((r) => {
                            if (url.match(r.regex)) {
                                // don't run same function multiple times per page
                                if (matched) {
                                    return;
                                }
                                matchesSpecificContent = true;
                                console.log('Hack Club Bank Ops Plugin is running on this page!');
                                // inject common css/scripts into page
                                injectCommon();
                                // run content specific function
                                item.func();
                                matched = true;
                            }
                        });
                    }
                }
                if (!matchesSpecificContent) {
                    console.log('Hack Club Bank Ops Plugin is installed, but not active on this page.');
                }
            }
        });
    });
}
checkPath();
// check path on SPA page change
let url = window.location.href;
['click', 'popstate', 'onload'].forEach((evt) => window.addEventListener(evt, function () {
    requestAnimationFrame(() => {
        if (url !== location.href) {
            checkPath();
        }
        url = location.href;
    });
}, true));
function injectCommon() {
    const customCss = document.createElement('style');
    customCss.innerText = `
		.hcb-plugin-tools {
			padding: 0.5rem;
			border-radius: 0.5rem;
			border: 1px dashed #ff3737;
			background: rgba(241,87,15,0.125);'
		}
	`;
    document.head.appendChild(customCss);
}


/***/ }),

/***/ "./src/app/content/bankProjectSearch.ts":
/*!**********************************************!*\
  !*** ./src/app/content/bankProjectSearch.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bankProjectSearch() {
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    if (nameParam !== null && nameParam !== '') {
        search(nameParam);
    }
}
function search(name) {
    console.log('Searching for', name);
    const searchInput = (document.querySelector(".filterbar > input[type='search']"));
    searchInput.value = name;
    searchInput.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true,
    }));
}
exports.default = bankProjectSearch;


/***/ }),

/***/ "./src/app/content/bankV1GoogleWorkspace.ts":
/*!**************************************************!*\
  !*** ./src/app/content/bankV1GoogleWorkspace.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
const g_verify_auth_1 = __webpack_require__(/*! ../helpers/g-verify-auth */ "./src/app/helpers/g-verify-auth.ts");
const options_1 = __webpack_require__(/*! ../helpers/options */ "./src/app/helpers/options.ts");
function bankV1GoogleWorkspace() {
    const events = processTable();
    console.log(events);
    options_1.default.bankAutoVerifyGoogleWorkspace.get().then((value) => {
        value && verifyAll(events);
    });
}
const tableRowAttributeName = 'data-hcb-plugin-row-num';
function processTable() {
    var rows = Array.prototype.slice.call(document.querySelectorAll('table tr'));
    var data = [];
    // get rid of table heading
    rows.shift();
    // process
    for (let [index, row] of rows.entries()) {
        var cols = Array.prototype.slice.call(row.querySelectorAll('td'));
        data.push({
            eventName: cols[0].firstElementChild.innerText,
            eventSlug: cols[0].firstElementChild['href'],
            domain: cols[1].innerText,
            key: cols[2].innerText,
            status: cols[3].innerText,
            deleted: row.classList.contains('shade-red'),
            rowNum: index,
        });
        row.setAttribute(tableRowAttributeName, `${index}`);
    }
    return data;
}
function verifyAll(events) {
    var numVerified = 0;
    var verifyErrors = {};
    var verifyPromises = [];
    for (let event of events) {
        if (!event.deleted && event.status === 'verifying') {
            numVerified++;
            const promise = verify(event);
            verifyPromises.push(promise);
            promise.catch((res) => {
                // track errors
                verifyErrors[res.status] = res.data;
            });
        }
    }
    // display the number of domains sent to G-Verify on this page load
    const displayNumVerified = document.createElement('p');
    displayNumVerified.innerText = `G-Verify: ${numVerified} Domains`;
    document
        .querySelector('main')
        .insertBefore(displayNumVerified, document.querySelector('table'));
    // alert users of errors that have built up
    Promise.all(verifyPromises).catch(() => {
        Object.keys(verifyErrors).forEach((err) => {
            switch (err) {
                case '401':
                    alert('Hack Club Bank Operations Plugin: UH OH!\nG-Verify Authentication Key not found\n\nPlease visit the plugin settings to set your authentication key.');
                    break;
                case '403':
                    alert('Hack Club Bank Operations Plugin: UH OH!\nInvalid G-Verify Authentication Key\n\nPlease visit the plugin settings to double check your authentication key. Contact Gary for help!');
                    break;
                default:
                    alert(`Hack Club Bank Operations Plugin: UH OH!\nG-Verify Error\n\n${JSON.stringify(verifyErrors[err])}`);
                    break;
            }
        });
    });
    function verify(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const authKey = yield g_verify_auth_1.getKey();
                try {
                    setRowStatus(event, 'loading');
                    const res = yield axios_1.default.get('https://gverify.bank.engineering/verify/' + event.domain, typeof authKey !== 'undefined' && authKey !== ''
                        ? {
                            headers: {
                                authorization: yield g_verify_auth_1.getKey(),
                            },
                        }
                        : null);
                    print(res.data);
                    setRowStatus(event, 'verified');
                    resolve(res.data);
                }
                catch (error) {
                    print(error.response.data);
                    // 400 from G-Verify (and Google) means verification token was not found in domain DNS
                    // (no request error)
                    if (error.response.status === 400) {
                        setRowStatus(event, 'failed', error.response.data.error.message.join(' '));
                        resolve(error.response.data);
                        return;
                    }
                    // if there's error, but not 400, there's an issue!
                    setRowStatus(event, 'failed', error.response.data.error);
                    return reject(error.response);
                }
            }));
            function print(data) {
                // console.group("Verify: " + event.domain);
                // console.log(data);
                // console.groupEnd();
            }
        });
    }
}
function setRowStatus(event, status, message = undefined) {
    const statusInjectLoc = document.querySelector(`tr[${tableRowAttributeName}="${event.rowNum}"]`).firstElementChild;
    var statusDisplayText = '<strong>G-Verify</strong>: ';
    switch (status) {
        case 'loading':
            statusDisplayText += 'LOADING...';
            break;
        case 'verified':
            statusDisplayText += 'SUCCESSFUL';
            break;
        case 'failed':
            statusDisplayText += 'FAILED';
            break;
    }
    message && (statusDisplayText += ` (${message})`);
    var tempDiv = document.createElement('div');
    const uniqueId = `hcb-plugin-google-workspace-g-verify-${event.domain.replace(/\W+(?!$)/g, '_D-O-T_')}`;
    tempDiv.innerHTML = `<div id="${uniqueId}">${statusDisplayText}</div>`;
    const preexistingElement = document.querySelector(`#${uniqueId}`);
    preexistingElement && preexistingElement.remove();
    statusInjectLoc.appendChild(tempDiv.firstElementChild);
}
exports.default = bankV1GoogleWorkspace;


/***/ }),

/***/ "./src/app/content/bankV1GoogleWorkspaceEdit.ts":
/*!******************************************************!*\
  !*** ./src/app/content/bankV1GoogleWorkspaceEdit.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
const g_verify_auth_1 = __webpack_require__(/*! ../helpers/g-verify-auth */ "./src/app/helpers/g-verify-auth.ts");
function bankV1GoogleWorkspaceEdit() {
    return __awaiter(this, void 0, void 0, function* () {
        processDomain();
        // listen for changes to the domain field
        // TODO: watch out for too many requests/max out api limit
        document.querySelector('#g_suite_domain').addEventListener('input', (e) => {
            processDomain();
        });
    });
}
function processDomain() {
    return __awaiter(this, void 0, void 0, function* () {
        // get domain of current Google Worksapce
        const domain = document.querySelector('#g_suite_domain')
            .value;
        // get verification key from g-verify
        if (domain !== '') {
            displayToken('LOADING...');
            var domainKey = (yield getToken(domain)).token;
            displayToken(domainKey);
            console.log(domain, domainKey);
        }
        else {
            displayToken('NO DOMAIN');
        }
    });
}
function displayToken(domainKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var content = `
	<div class="hcb-plugin-tools mt3" id="generatedDomainKeyWrapper">
		<h4>Verification Token</h4>
		<pre id="generatedDomainKey" onclick="
			(function() {
				navigator.clipboard.writeText('${domainKey}');
			})();
			"
			style="cursor: pointer"
		>${domainKey}</pre>
	</div>
	`;
        var displayElement = document.createElement('div');
        displayElement.innerHTML = content;
        // remove pre-existing
        const preexisting = document.querySelector(`#generatedDomainKeyWrapper`);
        preexisting && preexisting.remove();
        const form = document.querySelector('form');
        form.parentElement.insertBefore(displayElement.firstElementChild, form.nextElementSibling);
    });
}
function getToken(domain) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield axios_1.default.get('https://gverify.bank.engineering/token/' + domain, {
            headers: {
                authorization: yield g_verify_auth_1.getKey(),
            },
        })).data;
    });
}
exports.default = bankV1GoogleWorkspaceEdit;


/***/ }),

/***/ "./src/app/content/bankV1TransactionEdit.ts":
/*!**************************************************!*\
  !*** ./src/app/content/bankV1TransactionEdit.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bankV1TransactionEdit() {
    const originalName = getOriginalName();
    quickAssignButtons();
    expensifyReport(originalName);
}
function getOriginalName() {
    return (document.querySelector('.container > pre.bg-smoke.mt0')).innerText;
}
function quickAssignButtons() {
    const options = [
        {
            name: 'HQ',
            eventId: 183,
        },
        {
            name: 'Bank',
            eventId: 636,
        },
        {
            name: 'Not event-related',
            eventId: null,
        },
    ];
    // inject reuseable assign script
    var scriptInject = document.createElement('script');
    scriptInject.type = 'text/javascript';
    scriptInject.innerText = `
		function assign(event){
			if(event !== null) {
				document.querySelector("#transaction_is_event_related").checked = true;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option[value='" + event + "']").selected = true;
			} else {
				document.querySelector("#transaction_is_event_related").checked = false;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option").selected = true;
			}
		}
	`;
    document.head.appendChild(scriptInject);
    // build injected buttons
    var content = `
	<div class="hcb-plugin-tools mt3">
		<div class="btn-group center">`;
    options.forEach((option) => {
        content += `
			<span class="btn bg-accent"
				onClick="assign(${option.eventId})"
			>${option.name}</span>
		`;
    });
    content += `</div></div>`;
    // inject the buttons
    var displayElement = document.createElement('div');
    displayElement.innerHTML = content;
    const container = document.querySelector('.container > h1').parentElement;
    container.appendChild(displayElement.firstElementChild);
}
function expensifyReport(originalName) {
    const regexMatch = originalName.match(/Expensify R(\d*) The Hack Foundation/);
    if (regexMatch) {
        console.log('This is an Expensify Report with id ' + regexMatch[1]);
        const expensifyReportUrl = `https://www.expensify.com/report?param={%22pageReportID%22:%22${regexMatch[1]}%22,%22keepCollection%22:true}`;
        var content = `
		<div class="hcb-plugin-tools mt3">
			<p>Visit
				<a href="${expensifyReportUrl}" target="_blank">Expensify Report (${regexMatch[1]})</a>.
			</p>
		</div>
		`;
        var displayElement = document.createElement('div');
        displayElement.innerHTML = content;
        const container = document.querySelector('.container > h1').parentElement;
        container.appendChild(displayElement.firstElementChild);
    }
}
exports.default = bankV1TransactionEdit;


/***/ }),

/***/ "./src/app/content/bankV2GoogleWorkspace.ts":
/*!**************************************************!*\
  !*** ./src/app/content/bankV2GoogleWorkspace.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
const g_verify_auth_1 = __webpack_require__(/*! ../helpers/g-verify-auth */ "./src/app/helpers/g-verify-auth.ts");
const options_1 = __webpack_require__(/*! ../helpers/options */ "./src/app/helpers/options.ts");
function bankV1GoogleWorkspace() {
    const events = processTable();
    console.log(events);
    options_1.default.bankAutoVerifyGoogleWorkspace.get().then((value) => {
        value && verifyAll(events);
    });
}
const tableRowAttributeName = 'data-hcb-plugin-row-num';
function processTable() {
    var rows = Array.prototype.slice.call(document.querySelectorAll('table tr'));
    var data = [];
    // get rid of table heading
    rows.shift();
    // process
    for (let [index, row] of rows.entries()) {
        var cols = Array.prototype.slice.call(row.querySelectorAll('td'));
        const processedName = cols[2].firstElementChild.innerText.match(/^(.*)?:\s([^:]*)$/);
        data.push({
            id: cols[0].innerText,
            date: cols[1].innerText,
            eventName: processedName[1],
            domain: processedName[2],
            eventSlug: cols[2].firstElementChild['href'],
            ouId: cols[3].innerText,
            ouPath: cols[4].innerText,
            key: cols[5].innerText,
            status: cols[6].innerText,
            deleted: row.style.background === '#ffcccc',
            rowNum: index,
        });
        row.setAttribute(tableRowAttributeName, `${index}`);
    }
    console.log(data);
    return data;
}
function verifyAll(events) {
    var numVerified = 0;
    var verifyErrors = {};
    var verifyPromises = [];
    for (let event of events) {
        if (!event.deleted && event.status === 'VERIFYING') {
            numVerified++;
            const promise = verify(event);
            verifyPromises.push(promise);
            promise.catch((res) => {
                // TODO: track errors
                verifyErrors[res.status] = res.data;
            });
        }
    }
    // display the number of domains sent to G-Verify on this page load
    const displayNumVerified = document.createElement('p');
    displayNumVerified.innerText = `G-Verify: ${numVerified} Domains`;
    document
        .querySelector('body')
        .insertBefore(displayNumVerified, document.querySelector('h1').nextElementSibling);
    // alert users of errors that have built up
    Promise.all(verifyPromises).catch(() => {
        Object.keys(verifyErrors).forEach((err) => {
            switch (err) {
                case '401':
                    alert('Hack Club Bank Operations Plugin: UH OH!\nG-Verify Authentication Key not found\n\nPlease visit the plugin settings to set your authentication key.');
                    break;
                case '403':
                    alert('Hack Club Bank Operations Plugin: UH OH!\nInvalid G-Verify Authentication Key\n\nPlease visit the plugin settings to double check your authentication key. Contact Gary for help!');
                    break;
                default:
                    alert(`Hack Club Bank Operations Plugin: UH OH!\nG-Verify Error\n\n${JSON.stringify(verifyErrors[err])}`);
                    break;
            }
        });
    });
    function verify(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const authKey = yield g_verify_auth_1.getKey();
                try {
                    setRowStatus(event, 'loading');
                    const res = yield axios_1.default.get('https://gverify.bank.engineering/verify/' + event.domain, typeof authKey !== 'undefined' && authKey !== ''
                        ? {
                            headers: {
                                authorization: yield g_verify_auth_1.getKey(),
                            },
                        }
                        : null);
                    print(res.data);
                    setRowStatus(event, 'verified');
                    resolve(res.data);
                }
                catch (error) {
                    print(error.response.data);
                    // 400 from G-Verify (and Google) means verification token was not found in domain DNS
                    // (no request error)
                    if (error.response.status === 400) {
                        setRowStatus(event, 'failed', error.response.data.error.message.join(' '));
                        resolve(error.response.data);
                        return;
                    }
                    // if there's error, but not 400, there's an issue!
                    setRowStatus(event, 'failed', error.response.data.error);
                    return reject(error.response);
                }
            }));
            function print(data) {
                // console.group("Verify: " + event.domain);
                // console.log(data);
                // console.groupEnd();
            }
        });
    }
}
function setRowStatus(event, status, message = undefined) {
    const statusInjectLoc = document.querySelector(`tr[${tableRowAttributeName}="${event.rowNum}"]`).children[2];
    var statusDisplayText = '<strong>G-Verify</strong>: ';
    switch (status) {
        case 'loading':
            statusDisplayText += 'LOADING...';
            break;
        case 'verified':
            statusDisplayText += 'SUCCESSFUL';
            break;
        case 'failed':
            statusDisplayText += 'FAILED';
            break;
    }
    message && (statusDisplayText += ` <small>(${message})</small>`);
    var tempDiv = document.createElement('div');
    const uniqueId = `hcb-plugin-google-workspace-g-verify-${event.id}`;
    // const uniqueId = `hcb-plugin-google-workspace-g-verify-${event.domain.replace(
    // 	/\W+(?!$)/g,
    // 	'_D-O-T_'
    // )}`;
    tempDiv.innerHTML = `<div id="${uniqueId}">${statusDisplayText}</div>`;
    const preexistingElement = document.querySelector(`#${uniqueId}`);
    preexistingElement && preexistingElement.remove();
    statusInjectLoc.appendChild(tempDiv.firstElementChild);
}
exports.default = bankV1GoogleWorkspace;


/***/ }),

/***/ "./src/app/content/bankV2GoogleWorkspaceEdit.ts":
/*!******************************************************!*\
  !*** ./src/app/content/bankV2GoogleWorkspaceEdit.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
const g_verify_auth_1 = __webpack_require__(/*! ../helpers/g-verify-auth */ "./src/app/helpers/g-verify-auth.ts");
function bankV2GoogleWorkspaceEdit() {
    return __awaiter(this, void 0, void 0, function* () {
        processDomain();
    });
}
function processDomain() {
    return __awaiter(this, void 0, void 0, function* () {
        const detailsTable = document.querySelector('table');
        // get domain of current Google Worksapce
        var details = {
            name: '',
            domain: '',
            key: '',
            ouId: '',
            ouPath: '',
        };
        for (let item of detailsTable.querySelectorAll('tr')) {
            const pairs = (Array.prototype.slice.call(item.querySelectorAll('td')));
            // first td
            const name = pairs[0].innerText;
            const data = pairs[1].innerText;
            switch (name.trim()) {
                case 'Event:': {
                    details.name = data;
                    break;
                }
                case 'Domain:': {
                    details.domain = data;
                    break;
                }
                case 'Verificaton Key:': {
                    details.key = data;
                    break;
                }
                case 'OU ID:': {
                    details.ouId = data;
                    break;
                }
                case 'OU Path:': {
                    details.ouPath = data;
                    break;
                }
            }
        }
        // get verification key from g-verify
        if (details.domain !== '') {
            displayToken('LOADING...');
            var domainKey = (yield getToken(details.domain.trim())).token;
            displayToken(domainKey);
            console.log(details.domain, domainKey);
        }
        else {
            displayToken('NO DOMAIN');
        }
    });
}
function displayToken(domainKey) {
    return __awaiter(this, void 0, void 0, function* () {
        var content = `
	<div class="hcb-plugin-tools mt3" id="generatedDomainKeyWrapper">
		<h4>Verification Token</h4>
		<pre id="generatedDomainKey" onclick="
			(function() {
				navigator.clipboard.writeText('${domainKey}');
			})();
			"
			style="cursor: pointer"
		>${domainKey}</pre>
	</div>
	`;
        var displayElement = document.createElement('div');
        displayElement.innerHTML = content;
        // remove pre-existing
        const preexisting = document.querySelector(`#generatedDomainKeyWrapper`);
        preexisting && preexisting.remove();
        document.body.appendChild(displayElement.firstElementChild);
    });
}
function getToken(domain) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield axios_1.default.get('https://gverify.bank.engineering/token/' + domain, {
            headers: {
                authorization: yield g_verify_auth_1.getKey(),
            },
        })).data;
    });
}
exports.default = bankV2GoogleWorkspaceEdit;


/***/ }),

/***/ "./src/app/content/bankV2TransactionEdit.ts":
/*!**************************************************!*\
  !*** ./src/app/content/bankV2TransactionEdit.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bankV2TransactionEdit() {
    const rawName = getRawName();
    // quickAssignButtons();
    if (rawName !== null) {
        expensifyReport(rawName);
    }
}
function getRawName() {
    const paragraphs = (Array.prototype.slice.call(document.querySelectorAll('p')));
    var rawPlaidTransaction;
    paragraphs.forEach((p) => {
        if (p.innerText === 'RawPlaidTransaction') {
            rawPlaidTransaction = Array.prototype.slice.call(p.nextElementSibling.firstElementChild.childNodes);
        }
    });
    if (typeof rawPlaidTransaction === 'undefined')
        return null;
    var nameElement;
    rawPlaidTransaction.forEach((e) => {
        if (e.nodeType === 3 && e.nodeValue.substring(1).trim() === '"name"') {
            nameElement = e;
        }
    });
    if (typeof nameElement === 'undefined')
        return null;
    const nameValue = nameElement.nextSibling.nextSibling
        .innerHTML;
    return nameValue;
}
function quickAssignButtons() {
    const options = [
        {
            name: 'HQ',
            eventId: 183,
        },
        {
            name: 'Bank',
            eventId: 636,
        },
        {
            name: 'Not event-related',
            eventId: null,
        },
    ];
    // inject reuseable assign script
    var scriptInject = document.createElement('script');
    scriptInject.type = 'text/javascript';
    scriptInject.innerText = `
		function assign(event){
			if(event !== null) {
				document.querySelector("#transaction_is_event_related").checked = true;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option[value='" + event + "']").selected = true;
			} else {
				document.querySelector("#transaction_is_event_related").checked = false;
				document.querySelector("#transaction_fee_relationship_attributes_event_id > option").selected = true;
			}
		}
	`;
    document.head.appendChild(scriptInject);
    // build injected buttons
    var content = `
	<div class="hcb-plugin-tools mt3">
		<div class="btn-group center">`;
    options.forEach((option) => {
        content += `
			<span class="btn bg-accent"
				onClick="assign(${option.eventId})"
			>${option.name}</span>
		`;
    });
    content += `</div></div>`;
    // inject the buttons
    var displayElement = document.createElement('div');
    displayElement.innerHTML = content;
    const container = document.querySelector('.container > h1').parentElement;
    container.appendChild(displayElement.firstElementChild);
}
function expensifyReport(originalName) {
    const regexMatch = originalName.match(/Expensify R(\d*) The Hack Foundation/);
    if (regexMatch === null)
        return;
    console.log('This is an Expensify Report with id ' + regexMatch[1]);
    const expensifyReportUrl = `https://www.expensify.com/report?param={%22pageReportID%22:%22${regexMatch[1]}%22,%22keepCollection%22:true}`;
    var content = `
		<div class="hcb-plugin-tools mt3">
			<p>Visit
				<a href="${expensifyReportUrl}" target="_blank">Expensify Report (${regexMatch[1]})</a>.
			</p>
		</div>
		`;
    var displayElement = document.createElement('div');
    displayElement.innerHTML = content;
    const txDetailsTable = document.querySelector('table');
    txDetailsTable.parentElement.insertBefore(displayElement.firstElementChild, txDetailsTable.nextSibling);
}
exports.default = bankV2TransactionEdit;


/***/ }),

/***/ "./src/app/content/expensifyReport.ts":
/*!********************************************!*\
  !*** ./src/app/content/expensifyReport.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function expensifyReport() {
    linkBankProjectSearch();
}
function linkBankProjectSearch() {
    const injectScript = document.createElement('script');
    injectScript.innerText = `
	function inject() {
		let observer = new MutationObserver((mutations) => {
			const displayLoc = document.querySelector(
				"#report_invoice_dates_container"
				);
				if (displayLoc === null) {
					return;
				}
			const policyName = Policy.getCurrent().policy.name;
			
			if(document.querySelector("#linkToHCBSearch") === null) {
				const displayElem = document.createElement("div");
				displayElem.classList.add("hcb-plugin-tools");
				displayElem.id = "linkToHCBSearch";
				displayElem.innerHTML = \`
					<p>
						Search for
						<a href='https://bank.hackclub.com/admin/events?q=\` + policyName + \`' target='_blank'>\` + policyName + \`</a>
						on Hack Club Bank.
					</p>
				\`;
				displayLoc.appendChild(displayElem);
			}

			observer.disconnect();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
			attributes: false,
			characterData: false,
		});
	}
	inject();
	`;
    document.head.appendChild(injectScript);
}
exports.default = expensifyReport;


/***/ }),

/***/ "./src/app/content/svbBillPayAddIndivHaveBank.ts":
/*!*******************************************************!*\
  !*** ./src/app/content/svbBillPayAddIndivHaveBank.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = __webpack_require__(/*! ../helpers/options */ "./src/app/helpers/options.ts");
const DEFAULT_PAY_FROM_ACCOUNT = 'Fiscal Sponsorship 2 - New';
function svbPayBillAddIndivHaveBank() {
    options_1.default.svbBillPayAddIndivHaveBank.get().then((value) => {
        if (!value) {
            return;
        }
        // Click on the "I have the bank account information" switch
        const iHaveBankInfoSwitch = (document.querySelector('#ctl00_DefaultContent_rdoIHaveTheirInfoForm'));
        if (!iHaveBankInfoSwitch.checked) {
            iHaveBankInfoSwitch.click();
        }
        // Select "Default pay from account" to be DEFAULT_PAY_FROM_ACCOUNT ("Fiscal Sponsorship - 2 New")
        Array.prototype.slice
            .call(document.querySelectorAll('#ctl00_DefaultContent_IHaveTheirInfoForm_ddDefaultPayFrom > option'))
            .forEach((option) => {
            if (option.innerText === DEFAULT_PAY_FROM_ACCOUNT) {
                option.selected = 'true';
            }
        });
        // Allow paste to confirm account/routing number input
        const accountConfirmInput = document.querySelector('#ctl00_DefaultContent_IHaveTheirInfoForm_txtConfirmAccountNumber');
        const routingConfirmInput = document.querySelector('#ctl00_DefaultContent_IHaveTheirInfoForm_txtConfirmRoutingNumber');
        window.addEventListener('paste', function (event) {
            if (event.target.isSameNode(accountConfirmInput) ||
                event.target.isSameNode(routingConfirmInput)) {
                event.stopPropagation();
            }
        }, true);
    });
}
exports.default = svbPayBillAddIndivHaveBank;


/***/ }),

/***/ "./src/app/content/svbBillPayAddPayeeActivationCode.ts":
/*!*************************************************************!*\
  !*** ./src/app/content/svbBillPayAddPayeeActivationCode.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = __webpack_require__(/*! ../helpers/options */ "./src/app/helpers/options.ts");
function svbBillPayAddPayeeActivationCode() {
    options_1.default.svbBillPayAddPayeeActivationCode.get().then((value) => {
        if (!value) {
            return;
        }
        // Automatically click on "Request activation code"
        (document.querySelector('#ctl00_DefaultContent_requestCode')).click();
    });
}
exports.default = svbBillPayAddPayeeActivationCode;


/***/ }),

/***/ "./src/app/helpers/g-verify-auth.ts":
/*!******************************************!*\
  !*** ./src/app/helpers/g-verify-auth.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setKey = exports.getKey = void 0;
function getKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get('bankOpsPlugin_gVerifyAuthKey', function (items) {
                return resolve(items.bankOpsPlugin_gVerifyAuthKey);
            });
        });
    });
}
exports.getKey = getKey;
function setKey(key) {
    chrome.storage.sync.set({ bankOpsPlugin_gVerifyAuthKey: key });
}
exports.setKey = setKey;


/***/ }),

/***/ "./src/app/helpers/options.ts":
/*!************************************!*\
  !*** ./src/app/helpers/options.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storagePrefix = 'bankOpsPlugin_';
function get(key) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(`${storagePrefix}${key}`, function (items) {
                return resolve(items[`${storagePrefix}${key}`]);
            });
        });
    });
}
function set(key, value) {
    console.log(key, value);
    chrome.storage.sync.set({ [`${storagePrefix}${key}`]: value });
}
function createObj(key, defaultValue) {
    return {
        set: (value) => set(key, value),
        get: () => get(key),
        defaultValue,
    };
}
exports.default = {
    bankAutoVerifyGoogleWorkspace: createObj('bankAutoVerifyGoogleWorkspace', true),
    svbBillPayAddIndivHaveBank: createObj('svbBillPayAddIndivHaveBank', true),
    svbBillPayAddPayeeActivationCode: createObj('svbBillPayAddPayeeActivationCode', false),
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvYmFua1Byb2plY3RTZWFyY2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtWMUdvb2dsZVdvcmtzcGFjZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvYmFua1YxR29vZ2xlV29ya3NwYWNlRWRpdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvYmFua1YxVHJhbnNhY3Rpb25FZGl0LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC9iYW5rVjJHb29nbGVXb3Jrc3BhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtWMkdvb2dsZVdvcmtzcGFjZUVkaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtWMlRyYW5zYWN0aW9uRWRpdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvZXhwZW5zaWZ5UmVwb3J0LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC9zdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvc3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9oZWxwZXJzL2ctdmVyaWZ5LWF1dGgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9oZWxwZXJzL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFB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QTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOVZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1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LEVBQUUsQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDO1FBQ3RCLFlBQVk7S0FDWixDQUFDO0FBQ0gsQ0FBQztBQUVELGtCQUFlO0lBQ2QsNkJBQTZCLEVBQUUsU0FBUyxDQUN2QywrQkFBK0IsRUFDL0IsSUFBSSxDQUNKO0lBQ0QsMEJBQTBCLEVBQUUsU0FBUyxDQUNwQyw0QkFBNEIsRUFDNUIsSUFBSSxDQUNKO0lBQ0QsZ0NBQWdDLEVBQUUsU0FBUyxDQUMxQyxrQ0FBa0MsRUFDbEMsS0FBSyxDQUNMO0NBQ0QsQ0FBQyIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwL2NvbnRlbnQudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuICh0eXBlb2YgcGF5bG9hZCA9PT0gJ29iamVjdCcpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiaW1wb3J0IGJhbmtFdmVudENvcHlOYW1lIGZyb20gJy4vY29udGVudC9iYW5rRXZlbnRDb3B5TmFtZSc7XG5pbXBvcnQgYmFua1YxR29vZ2xlV29ya3NwYWNlIGZyb20gJy4vY29udGVudC9iYW5rVjFHb29nbGVXb3Jrc3BhY2UnO1xuaW1wb3J0IGJhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQgZnJvbSAnLi9jb250ZW50L2JhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQnO1xuaW1wb3J0IGJhbmtQcm9qZWN0U2VhcmNoIGZyb20gJy4vY29udGVudC9iYW5rUHJvamVjdFNlYXJjaCc7XG5pbXBvcnQgYmFua1YxVHJhbnNhY3Rpb25FZGl0IGZyb20gJy4vY29udGVudC9iYW5rVjFUcmFuc2FjdGlvbkVkaXQnO1xuaW1wb3J0IGV4cGVuc2lmeVJlcG9ydCBmcm9tICcuL2NvbnRlbnQvZXhwZW5zaWZ5UmVwb3J0JztcbmltcG9ydCBzdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuayBmcm9tICcuL2NvbnRlbnQvc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmsnO1xuaW1wb3J0IHN2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlIGZyb20gJy4vY29udGVudC9zdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZSc7XG5pbXBvcnQgYmFua1YyR29vZ2xlV29ya3NwYWNlRWRpdCBmcm9tICcuL2NvbnRlbnQvYmFua1YyR29vZ2xlV29ya3NwYWNlRWRpdCc7XG5pbXBvcnQgYmFua1YyVHJhbnNhY3Rpb25FZGl0IGZyb20gJy4vY29udGVudC9iYW5rVjJUcmFuc2FjdGlvbkVkaXQnO1xuaW1wb3J0IGJhbmtWMkdvb2dsZVdvcmtzcGFjZSBmcm9tICcuL2NvbnRlbnQvYmFua1YyR29vZ2xlV29ya3NwYWNlJztcblxuZnVuY3Rpb24gY2hlY2tQYXRoKCkge1xuXHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgKHJlc3BvbnNlKSA9PiB7XG5cdFx0dmFyIGNoZWNrUmVhZHkgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRcdFx0XHRjbGVhckludGVydmFsKGNoZWNrUmVhZHkpO1xuXG5cdFx0XHRcdC8vIG1hdGNoIHBhdGggdG8gY29udGVudCBmdW5jdGlvblxuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvZ19zdWl0ZXMkLyxcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMUdvb2dsZVdvcmtzcGFjZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvLipcXC9nX3N1aXRlc1xcLy4qXFwvZWRpdC8sXG5cdFx0XHRcdFx0XHRmdW5jOiBiYW5rVjFHb29nbGVXb3Jrc3BhY2VFZGl0LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVnZXg6IC9odHRwczpcXC9cXC93d3dcXC5idXNpbmVzc2JpbGxwYXktZVxcLmNvbVxcL1YyXFwvUGF5ZWVzXFwvQWRkSW5kaXZpZHVhbFxcLmFzcHguKi8sXG5cdFx0XHRcdFx0XHRmdW5jOiBzdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuayxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvd3d3XFwuYnVzaW5lc3NiaWxscGF5LWVcXC5jb21cXC9WMlxcL1BheWVlc1xcL0FjdGl2YXRpb25Db2RlXFwuYXNweC4qLyxcblx0XHRcdFx0XHRcdGZ1bmM6IHN2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0cmVnZXg6IC9odHRwczpcXC9cXC9iYW5rXFwuaGFja2NsdWJcXC5jb21cXC90cmFuc2FjdGlvbnNcXC8uKlxcL2VkaXQvLFxuXHRcdFx0XHRcdFx0ZnVuYzogYmFua1YxVHJhbnNhY3Rpb25FZGl0LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly8ge1xuXHRcdFx0XHRcdC8vIFx0cmVnZXg6IC9odHRwczpcXC9cXC9iYW5rXFwuaGFja2NsdWJcXC5jb21cXC8uKi8sXG5cdFx0XHRcdFx0Ly8gXHRmdW5jOiBiYW5rRXZlbnRDb3B5TmFtZSxcblx0XHRcdFx0XHQvLyB9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvZXZlbnRzLipbPyZdbmFtZT0uKi8sXG5cdFx0XHRcdFx0XHRmdW5jOiBiYW5rUHJvamVjdFNlYXJjaCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvLipleHBlbnNpZnlcXC5jb21cXC9yZXBvcnQuKi8sXG5cdFx0XHRcdFx0XHRmdW5jOiBleHBlbnNpZnlSZXBvcnQsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL2JhbmtcXC5oYWNrY2x1YlxcLmNvbVxcL2FkbWluXFwvLipcXC9nb29nbGVfd29ya3NwYWNlX3Byb2Nlc3MvLFxuXHRcdFx0XHRcdFx0ZnVuYzogYmFua1YyR29vZ2xlV29ya3NwYWNlRWRpdCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvYWRtaW5cXC8uKlxcL3RyYW5zYWN0aW9uLyxcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMlRyYW5zYWN0aW9uRWRpdCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvYWRtaW5cXC9nb29nbGVfd29ya3NwYWNlcy8sXG5cdFx0XHRcdFx0XHRmdW5jOiBiYW5rVjJHb29nbGVXb3Jrc3BhY2UsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XTtcblxuXHRcdFx0XHRjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblx0XHRcdFx0dmFyIG1hdGNoZXNTcGVjaWZpY0NvbnRlbnQgPSBmYWxzZTtcblx0XHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBtYXRjaGVzKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW0ucmVnZXggaW5zdGFuY2VvZiBSZWdFeHApIHtcblx0XHRcdFx0XHRcdGlmICh1cmwubWF0Y2goaXRlbS5yZWdleCkpIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlc1NwZWNpZmljQ29udGVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdIYWNrIENsdWIgQmFuayBPcHMgUGx1Z2luIGlzIHJ1bm5pbmcgb24gdGhpcyBwYWdlIScpO1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnUnVubmluZyBmdW5jdGlvbjonLCBpdGVtLmZ1bmMubmFtZSArICcoKScpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGluamVjdCBjb21tb24gY3NzL3NjcmlwdHMgaW50byBwYWdlXG5cdFx0XHRcdFx0XHRcdGluamVjdENvbW1vbigpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIHJ1biBjb250ZW50IHNwZWNpZmljIGZ1bmN0aW9uXG5cdFx0XHRcdFx0XHRcdGl0ZW0uZnVuYygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpdGVtLnJlZ2V4KSkge1xuXHRcdFx0XHRcdFx0dmFyIG1hdGNoZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGludGVyZmFjZSBtYXRjaE9iaiB7XG5cdFx0XHRcdFx0XHRcdHJlZ2V4OiBSZWdFeHA7XG5cdFx0XHRcdFx0XHRcdGZ1bmM6IEZ1bmN0aW9uO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0KDxBcnJheTxtYXRjaE9iaj4+aXRlbS5yZWdleCkuZm9yRWFjaCgocikgPT4ge1xuXHRcdFx0XHRcdFx0XHRpZiAodXJsLm1hdGNoKHIucmVnZXgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gZG9uJ3QgcnVuIHNhbWUgZnVuY3Rpb24gbXVsdGlwbGUgdGltZXMgcGVyIHBhZ2Vcblx0XHRcdFx0XHRcdFx0XHRpZiAobWF0Y2hlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRtYXRjaGVzU3BlY2lmaWNDb250ZW50ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcblx0XHRcdFx0XHRcdFx0XHRcdCdIYWNrIENsdWIgQmFuayBPcHMgUGx1Z2luIGlzIHJ1bm5pbmcgb24gdGhpcyBwYWdlISdcblx0XHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gaW5qZWN0IGNvbW1vbiBjc3Mvc2NyaXB0cyBpbnRvIHBhZ2Vcblx0XHRcdFx0XHRcdFx0XHRpbmplY3RDb21tb24oKTtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIHJ1biBjb250ZW50IHNwZWNpZmljIGZ1bmN0aW9uXG5cdFx0XHRcdFx0XHRcdFx0aXRlbS5mdW5jKCk7XG5cblx0XHRcdFx0XHRcdFx0XHRtYXRjaGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghbWF0Y2hlc1NwZWNpZmljQ29udGVudCkge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wcyBQbHVnaW4gaXMgaW5zdGFsbGVkLCBidXQgbm90IGFjdGl2ZSBvbiB0aGlzIHBhZ2UuJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5jaGVja1BhdGgoKTtcblxuLy8gY2hlY2sgcGF0aCBvbiBTUEEgcGFnZSBjaGFuZ2VcbmxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcblsnY2xpY2snLCAncG9wc3RhdGUnLCAnb25sb2FkJ10uZm9yRWFjaCgoZXZ0KSA9PlxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRldnQsXG5cdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcblx0XHRcdFx0aWYgKHVybCAhPT0gbG9jYXRpb24uaHJlZikge1xuXHRcdFx0XHRcdGNoZWNrUGF0aCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHVybCA9IGxvY2F0aW9uLmhyZWY7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRydWVcblx0KVxuKTtcblxuZnVuY3Rpb24gaW5qZWN0Q29tbW9uKCkge1xuXHRjb25zdCBjdXN0b21Dc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRjdXN0b21Dc3MuaW5uZXJUZXh0ID0gYFxuXHRcdC5oY2ItcGx1Z2luLXRvb2xzIHtcblx0XHRcdHBhZGRpbmc6IDAuNXJlbTtcblx0XHRcdGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcblx0XHRcdGJvcmRlcjogMXB4IGRhc2hlZCAjZmYzNzM3O1xuXHRcdFx0YmFja2dyb3VuZDogcmdiYSgyNDEsODcsMTUsMC4xMjUpOydcblx0XHR9XG5cdGA7XG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY3VzdG9tQ3NzKTtcbn1cbiIsImZ1bmN0aW9uIGJhbmtQcm9qZWN0U2VhcmNoKCkge1xuXHRjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG5cdGNvbnN0IG5hbWVQYXJhbSA9IHBhcmFtcy5nZXQoJ25hbWUnKTtcblx0aWYgKG5hbWVQYXJhbSAhPT0gbnVsbCAmJiBuYW1lUGFyYW0gIT09ICcnKSB7XG5cdFx0c2VhcmNoKG5hbWVQYXJhbSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VhcmNoKG5hbWUpIHtcblx0Y29uc29sZS5sb2coJ1NlYXJjaGluZyBmb3InLCBuYW1lKTtcblxuXHRjb25zdCBzZWFyY2hJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50Pihcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlcmJhciA+IGlucHV0W3R5cGU9J3NlYXJjaCddXCIpXG5cdCk7XG5cblx0c2VhcmNoSW5wdXQudmFsdWUgPSBuYW1lO1xuXHRzZWFyY2hJbnB1dC5kaXNwYXRjaEV2ZW50KFxuXHRcdG5ldyBFdmVudCgnaW5wdXQnLCB7XG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHR9KVxuXHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYW5rUHJvamVjdFNlYXJjaDtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBnZXRLZXkgfSBmcm9tICcuLi9oZWxwZXJzL2ctdmVyaWZ5LWF1dGgnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vaGVscGVycy9vcHRpb25zJztcblxuZnVuY3Rpb24gYmFua1YxR29vZ2xlV29ya3NwYWNlKCkge1xuXHRjb25zdCBldmVudHMgPSBwcm9jZXNzVGFibGUoKTtcblx0Y29uc29sZS5sb2coZXZlbnRzKTtcblxuXHRvcHRpb25zLmJhbmtBdXRvVmVyaWZ5R29vZ2xlV29ya3NwYWNlLmdldCgpLnRoZW4oKHZhbHVlKSA9PiB7XG5cdFx0dmFsdWUgJiYgdmVyaWZ5QWxsKGV2ZW50cyk7XG5cdH0pO1xufVxuXG5jb25zdCB0YWJsZVJvd0F0dHJpYnV0ZU5hbWUgPSAnZGF0YS1oY2ItcGx1Z2luLXJvdy1udW0nO1xuZnVuY3Rpb24gcHJvY2Vzc1RhYmxlKCkge1xuXHR2YXIgcm93cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJykpO1xuXHR2YXIgZGF0YSA9IFtdO1xuXG5cdC8vIGdldCByaWQgb2YgdGFibGUgaGVhZGluZ1xuXHRyb3dzLnNoaWZ0KCk7XG5cblx0Ly8gcHJvY2Vzc1xuXHRmb3IgKGxldCBbaW5kZXgsIHJvd10gb2Ygcm93cy5lbnRyaWVzKCkpIHtcblx0XHR2YXIgY29scyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcblx0XHRkYXRhLnB1c2goe1xuXHRcdFx0ZXZlbnROYW1lOiBjb2xzWzBdLmZpcnN0RWxlbWVudENoaWxkLmlubmVyVGV4dCxcblx0XHRcdGV2ZW50U2x1ZzogY29sc1swXS5maXJzdEVsZW1lbnRDaGlsZFsnaHJlZiddLFxuXHRcdFx0ZG9tYWluOiBjb2xzWzFdLmlubmVyVGV4dCxcblx0XHRcdGtleTogY29sc1syXS5pbm5lclRleHQsXG5cdFx0XHRzdGF0dXM6IGNvbHNbM10uaW5uZXJUZXh0LFxuXHRcdFx0ZGVsZXRlZDogcm93LmNsYXNzTGlzdC5jb250YWlucygnc2hhZGUtcmVkJyksXG5cdFx0XHRyb3dOdW06IGluZGV4LFxuXHRcdH0pO1xuXHRcdHJvdy5zZXRBdHRyaWJ1dGUodGFibGVSb3dBdHRyaWJ1dGVOYW1lLCBgJHtpbmRleH1gKTtcblx0fVxuXG5cdHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnlBbGwoZXZlbnRzKSB7XG5cdHZhciBudW1WZXJpZmllZCA9IDA7XG5cblx0dmFyIHZlcmlmeUVycm9ycyA9IHt9O1xuXHR2YXIgdmVyaWZ5UHJvbWlzZXMgPSBbXTtcblx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG5cdFx0aWYgKCFldmVudC5kZWxldGVkICYmIGV2ZW50LnN0YXR1cyA9PT0gJ3ZlcmlmeWluZycpIHtcblx0XHRcdG51bVZlcmlmaWVkKys7XG5cblx0XHRcdGNvbnN0IHByb21pc2UgPSB2ZXJpZnkoZXZlbnQpO1xuXHRcdFx0dmVyaWZ5UHJvbWlzZXMucHVzaChwcm9taXNlKTtcblx0XHRcdHByb21pc2UuY2F0Y2goKHJlcykgPT4ge1xuXHRcdFx0XHQvLyB0cmFjayBlcnJvcnNcblx0XHRcdFx0dmVyaWZ5RXJyb3JzW3Jlcy5zdGF0dXNdID0gcmVzLmRhdGE7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyBkaXNwbGF5IHRoZSBudW1iZXIgb2YgZG9tYWlucyBzZW50IHRvIEctVmVyaWZ5IG9uIHRoaXMgcGFnZSBsb2FkXG5cdGNvbnN0IGRpc3BsYXlOdW1WZXJpZmllZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0ZGlzcGxheU51bVZlcmlmaWVkLmlubmVyVGV4dCA9IGBHLVZlcmlmeTogJHtudW1WZXJpZmllZH0gRG9tYWluc2A7XG5cdGRvY3VtZW50XG5cdFx0LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKVxuXHRcdC5pbnNlcnRCZWZvcmUoZGlzcGxheU51bVZlcmlmaWVkLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpKTtcblxuXHQvLyBhbGVydCB1c2VycyBvZiBlcnJvcnMgdGhhdCBoYXZlIGJ1aWx0IHVwXG5cblx0UHJvbWlzZS5hbGwodmVyaWZ5UHJvbWlzZXMpLmNhdGNoKCgpID0+IHtcblx0XHRPYmplY3Qua2V5cyh2ZXJpZnlFcnJvcnMpLmZvckVhY2goKGVycikgPT4ge1xuXHRcdFx0c3dpdGNoIChlcnIpIHtcblx0XHRcdFx0Y2FzZSAnNDAxJzpcblx0XHRcdFx0XHRhbGVydChcblx0XHRcdFx0XHRcdCdIYWNrIENsdWIgQmFuayBPcGVyYXRpb25zIFBsdWdpbjogVUggT0ghXFxuRy1WZXJpZnkgQXV0aGVudGljYXRpb24gS2V5IG5vdCBmb3VuZFxcblxcblBsZWFzZSB2aXNpdCB0aGUgcGx1Z2luIHNldHRpbmdzIHRvIHNldCB5b3VyIGF1dGhlbnRpY2F0aW9uIGtleS4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRjYXNlICc0MDMnOlxuXHRcdFx0XHRcdGFsZXJ0KFxuXHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wZXJhdGlvbnMgUGx1Z2luOiBVSCBPSCFcXG5JbnZhbGlkIEctVmVyaWZ5IEF1dGhlbnRpY2F0aW9uIEtleVxcblxcblBsZWFzZSB2aXNpdCB0aGUgcGx1Z2luIHNldHRpbmdzIHRvIGRvdWJsZSBjaGVjayB5b3VyIGF1dGhlbnRpY2F0aW9uIGtleS4gQ29udGFjdCBHYXJ5IGZvciBoZWxwISdcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0YWxlcnQoXG5cdFx0XHRcdFx0XHRgSGFjayBDbHViIEJhbmsgT3BlcmF0aW9ucyBQbHVnaW46IFVIIE9IIVxcbkctVmVyaWZ5IEVycm9yXFxuXFxuJHtKU09OLnN0cmluZ2lmeShcblx0XHRcdFx0XHRcdFx0dmVyaWZ5RXJyb3JzW2Vycl1cblx0XHRcdFx0XHRcdCl9YFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGFzeW5jIGZ1bmN0aW9uIHZlcmlmeShldmVudCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRjb25zdCBhdXRoS2V5ID0gYXdhaXQgZ2V0S2V5KCk7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXRSb3dTdGF0dXMoZXZlbnQsICdsb2FkaW5nJyk7XG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChcblx0XHRcdFx0XHQnaHR0cHM6Ly9ndmVyaWZ5LmJhbmsuZW5naW5lZXJpbmcvdmVyaWZ5LycgKyBldmVudC5kb21haW4sXG5cdFx0XHRcdFx0dHlwZW9mIGF1dGhLZXkgIT09ICd1bmRlZmluZWQnICYmIGF1dGhLZXkgIT09ICcnXG5cdFx0XHRcdFx0XHQ/IHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRhdXRob3JpemF0aW9uOiBhd2FpdCBnZXRLZXkoKSxcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ICB9XG5cdFx0XHRcdFx0XHQ6IG51bGxcblx0XHRcdFx0KTtcblx0XHRcdFx0cHJpbnQocmVzLmRhdGEpO1xuXHRcdFx0XHRzZXRSb3dTdGF0dXMoZXZlbnQsICd2ZXJpZmllZCcpO1xuXHRcdFx0XHRyZXNvbHZlKHJlcy5kYXRhKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHByaW50KGVycm9yLnJlc3BvbnNlLmRhdGEpO1xuXG5cdFx0XHRcdC8vIDQwMCBmcm9tIEctVmVyaWZ5IChhbmQgR29vZ2xlKSBtZWFucyB2ZXJpZmljYXRpb24gdG9rZW4gd2FzIG5vdCBmb3VuZCBpbiBkb21haW4gRE5TXG5cdFx0XHRcdC8vIChubyByZXF1ZXN0IGVycm9yKVxuXHRcdFx0XHRpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDApIHtcblx0XHRcdFx0XHRzZXRSb3dTdGF0dXMoXG5cdFx0XHRcdFx0XHRldmVudCxcblx0XHRcdFx0XHRcdCdmYWlsZWQnLFxuXHRcdFx0XHRcdFx0ZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLmpvaW4oJyAnKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0cmVzb2x2ZShlcnJvci5yZXNwb25zZS5kYXRhKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiB0aGVyZSdzIGVycm9yLCBidXQgbm90IDQwMCwgdGhlcmUncyBhbiBpc3N1ZSFcblx0XHRcdFx0c2V0Um93U3RhdHVzKGV2ZW50LCAnZmFpbGVkJywgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcik7XG5cdFx0XHRcdHJldHVybiByZWplY3QoZXJyb3IucmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gcHJpbnQoZGF0YSkge1xuXHRcdFx0Ly8gY29uc29sZS5ncm91cChcIlZlcmlmeTogXCIgKyBldmVudC5kb21haW4pO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHQvLyBjb25zb2xlLmdyb3VwRW5kKCk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldFJvd1N0YXR1cyhldmVudCwgc3RhdHVzLCBtZXNzYWdlID0gdW5kZWZpbmVkKSB7XG5cdGNvbnN0IHN0YXR1c0luamVjdExvYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0YHRyWyR7dGFibGVSb3dBdHRyaWJ1dGVOYW1lfT1cIiR7ZXZlbnQucm93TnVtfVwiXWBcblx0KS5maXJzdEVsZW1lbnRDaGlsZDtcblxuXHR2YXIgc3RhdHVzRGlzcGxheVRleHQgPSAnPHN0cm9uZz5HLVZlcmlmeTwvc3Ryb25nPjogJztcblx0c3dpdGNoIChzdGF0dXMpIHtcblx0XHRjYXNlICdsb2FkaW5nJzpcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdMT0FESU5HLi4uJztcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ3ZlcmlmaWVkJzpcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdTVUNDRVNTRlVMJztcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2ZhaWxlZCc6XG5cdFx0XHRzdGF0dXNEaXNwbGF5VGV4dCArPSAnRkFJTEVEJztcblx0XHRcdGJyZWFrO1xuXHR9XG5cdG1lc3NhZ2UgJiYgKHN0YXR1c0Rpc3BsYXlUZXh0ICs9IGAgKCR7bWVzc2FnZX0pYCk7XG5cblx0dmFyIHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29uc3QgdW5pcXVlSWQgPSBgaGNiLXBsdWdpbi1nb29nbGUtd29ya3NwYWNlLWctdmVyaWZ5LSR7ZXZlbnQuZG9tYWluLnJlcGxhY2UoXG5cdFx0L1xcVysoPyEkKS9nLFxuXHRcdCdfRC1PLVRfJ1xuXHQpfWA7XG5cdHRlbXBEaXYuaW5uZXJIVE1MID0gYDxkaXYgaWQ9XCIke3VuaXF1ZUlkfVwiPiR7c3RhdHVzRGlzcGxheVRleHR9PC9kaXY+YDtcblx0Y29uc3QgcHJlZXhpc3RpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7dW5pcXVlSWR9YCk7XG5cdHByZWV4aXN0aW5nRWxlbWVudCAmJiBwcmVleGlzdGluZ0VsZW1lbnQucmVtb3ZlKCk7XG5cdHN0YXR1c0luamVjdExvYy5hcHBlbmRDaGlsZCh0ZW1wRGl2LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFua1YxR29vZ2xlV29ya3NwYWNlO1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IGdldEtleSB9IGZyb20gJy4uL2hlbHBlcnMvZy12ZXJpZnktYXV0aCc7XG5cbmFzeW5jIGZ1bmN0aW9uIGJhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQoKSB7XG5cdHByb2Nlc3NEb21haW4oKTtcblxuXHQvLyBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gdGhlIGRvbWFpbiBmaWVsZFxuXHQvLyBUT0RPOiB3YXRjaCBvdXQgZm9yIHRvbyBtYW55IHJlcXVlc3RzL21heCBvdXQgYXBpIGxpbWl0XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnX3N1aXRlX2RvbWFpbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcblx0XHRwcm9jZXNzRG9tYWluKCk7XG5cdH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRG9tYWluKCkge1xuXHQvLyBnZXQgZG9tYWluIG9mIGN1cnJlbnQgR29vZ2xlIFdvcmtzYXBjZVxuXHRjb25zdCBkb21haW4gPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dfc3VpdGVfZG9tYWluJykpXG5cdFx0LnZhbHVlO1xuXG5cdC8vIGdldCB2ZXJpZmljYXRpb24ga2V5IGZyb20gZy12ZXJpZnlcblx0aWYgKGRvbWFpbiAhPT0gJycpIHtcblx0XHRkaXNwbGF5VG9rZW4oJ0xPQURJTkcuLi4nKTtcblx0XHR2YXIgZG9tYWluS2V5ID0gKGF3YWl0IGdldFRva2VuKGRvbWFpbikpLnRva2VuO1xuXHRcdGRpc3BsYXlUb2tlbihkb21haW5LZXkpO1xuXHRcdGNvbnNvbGUubG9nKGRvbWFpbiwgZG9tYWluS2V5KTtcblx0fSBlbHNlIHtcblx0XHRkaXNwbGF5VG9rZW4oJ05PIERPTUFJTicpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlUb2tlbihkb21haW5LZXkpIHtcblx0dmFyIGNvbnRlbnQgPSBgXG5cdDxkaXYgY2xhc3M9XCJoY2ItcGx1Z2luLXRvb2xzIG10M1wiIGlkPVwiZ2VuZXJhdGVkRG9tYWluS2V5V3JhcHBlclwiPlxuXHRcdDxoND5WZXJpZmljYXRpb24gVG9rZW48L2g0PlxuXHRcdDxwcmUgaWQ9XCJnZW5lcmF0ZWREb21haW5LZXlcIiBvbmNsaWNrPVwiXG5cdFx0XHQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCcke2RvbWFpbktleX0nKTtcblx0XHRcdH0pKCk7XG5cdFx0XHRcIlxuXHRcdFx0c3R5bGU9XCJjdXJzb3I6IHBvaW50ZXJcIlxuXHRcdD4ke2RvbWFpbktleX08L3ByZT5cblx0PC9kaXY+XG5cdGA7XG5cblx0dmFyIGRpc3BsYXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpc3BsYXlFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0Ly8gcmVtb3ZlIHByZS1leGlzdGluZ1xuXHRjb25zdCBwcmVleGlzdGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNnZW5lcmF0ZWREb21haW5LZXlXcmFwcGVyYCk7XG5cdHByZWV4aXN0aW5nICYmIHByZWV4aXN0aW5nLnJlbW92ZSgpO1xuXG5cdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG5cdGZvcm0ucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoXG5cdFx0ZGlzcGxheUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQsXG5cdFx0Zm9ybS5uZXh0RWxlbWVudFNpYmxpbmdcblx0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW4oZG9tYWluKSB7XG5cdHJldHVybiAoXG5cdFx0YXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL2d2ZXJpZnkuYmFuay5lbmdpbmVlcmluZy90b2tlbi8nICsgZG9tYWluLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdGF1dGhvcml6YXRpb246IGF3YWl0IGdldEtleSgpLFxuXHRcdFx0fSxcblx0XHR9KVxuXHQpLmRhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQ7XG4iLCJmdW5jdGlvbiBiYW5rVjFUcmFuc2FjdGlvbkVkaXQoKSB7XG5cdGNvbnN0IG9yaWdpbmFsTmFtZSA9IGdldE9yaWdpbmFsTmFtZSgpO1xuXG5cdHF1aWNrQXNzaWduQnV0dG9ucygpO1xuXHRleHBlbnNpZnlSZXBvcnQob3JpZ2luYWxOYW1lKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxOYW1lKCk6IFN0cmluZyB7XG5cdHJldHVybiAoPEhUTUxQcmVFbGVtZW50Pihcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyID4gcHJlLmJnLXNtb2tlLm10MCcpXG5cdCkpLmlubmVyVGV4dDtcbn1cblxuZnVuY3Rpb24gcXVpY2tBc3NpZ25CdXR0b25zKCkge1xuXHRjb25zdCBvcHRpb25zID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdIUScsXG5cdFx0XHRldmVudElkOiAxODMsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnQmFuaycsXG5cdFx0XHRldmVudElkOiA2MzYsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnTm90IGV2ZW50LXJlbGF0ZWQnLFxuXHRcdFx0ZXZlbnRJZDogbnVsbCxcblx0XHR9LFxuXHRdO1xuXG5cdC8vIGluamVjdCByZXVzZWFibGUgYXNzaWduIHNjcmlwdFxuXHR2YXIgc2NyaXB0SW5qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdHNjcmlwdEluamVjdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdHNjcmlwdEluamVjdC5pbm5lclRleHQgPSBgXG5cdFx0ZnVuY3Rpb24gYXNzaWduKGV2ZW50KXtcblx0XHRcdGlmKGV2ZW50ICE9PSBudWxsKSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25faXNfZXZlbnRfcmVsYXRlZFwiKS5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc2FjdGlvbl9mZWVfcmVsYXRpb25zaGlwX2F0dHJpYnV0ZXNfZXZlbnRfaWQgPiBvcHRpb25bdmFsdWU9J1wiICsgZXZlbnQgKyBcIiddXCIpLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25faXNfZXZlbnRfcmVsYXRlZFwiKS5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25fZmVlX3JlbGF0aW9uc2hpcF9hdHRyaWJ1dGVzX2V2ZW50X2lkID4gb3B0aW9uXCIpLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdGA7XG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0SW5qZWN0KTtcblxuXHQvLyBidWlsZCBpbmplY3RlZCBidXR0b25zXG5cdHZhciBjb250ZW50ID0gYFxuXHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGNlbnRlclwiPmA7XG5cdG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0Y29udGVudCArPSBgXG5cdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBiZy1hY2NlbnRcIlxuXHRcdFx0XHRvbkNsaWNrPVwiYXNzaWduKCR7b3B0aW9uLmV2ZW50SWR9KVwiXG5cdFx0XHQ+JHtvcHRpb24ubmFtZX08L3NwYW4+XG5cdFx0YDtcblx0fSk7XG5cdGNvbnRlbnQgKz0gYDwvZGl2PjwvZGl2PmA7XG5cblx0Ly8gaW5qZWN0IHRoZSBidXR0b25zXG5cdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXIgPiBoMScpLnBhcmVudEVsZW1lbnQ7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNwbGF5RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG59XG5cbmZ1bmN0aW9uIGV4cGVuc2lmeVJlcG9ydChvcmlnaW5hbE5hbWU6IFN0cmluZykge1xuXHRjb25zdCByZWdleE1hdGNoID0gb3JpZ2luYWxOYW1lLm1hdGNoKC9FeHBlbnNpZnkgUihcXGQqKSBUaGUgSGFjayBGb3VuZGF0aW9uLyk7XG5cblx0aWYgKHJlZ2V4TWF0Y2gpIHtcblx0XHRjb25zb2xlLmxvZygnVGhpcyBpcyBhbiBFeHBlbnNpZnkgUmVwb3J0IHdpdGggaWQgJyArIHJlZ2V4TWF0Y2hbMV0pO1xuXHRcdGNvbnN0IGV4cGVuc2lmeVJlcG9ydFVybCA9IGBodHRwczovL3d3dy5leHBlbnNpZnkuY29tL3JlcG9ydD9wYXJhbT17JTIycGFnZVJlcG9ydElEJTIyOiUyMiR7cmVnZXhNYXRjaFsxXX0lMjIsJTIya2VlcENvbGxlY3Rpb24lMjI6dHJ1ZX1gO1xuXG5cdFx0dmFyIGNvbnRlbnQgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImhjYi1wbHVnaW4tdG9vbHMgbXQzXCI+XG5cdFx0XHQ8cD5WaXNpdFxuXHRcdFx0XHQ8YSBocmVmPVwiJHtleHBlbnNpZnlSZXBvcnRVcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+RXhwZW5zaWZ5IFJlcG9ydCAoJHtyZWdleE1hdGNoWzFdfSk8L2E+LlxuXHRcdFx0PC9wPlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHR2YXIgZGlzcGxheUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lciA+IGgxJykucGFyZW50RWxlbWVudDtcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGlzcGxheUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtWMVRyYW5zYWN0aW9uRWRpdDtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBnZXRLZXkgfSBmcm9tICcuLi9oZWxwZXJzL2ctdmVyaWZ5LWF1dGgnO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vaGVscGVycy9vcHRpb25zJztcblxuZnVuY3Rpb24gYmFua1YxR29vZ2xlV29ya3NwYWNlKCkge1xuXHRjb25zdCBldmVudHMgPSBwcm9jZXNzVGFibGUoKTtcblx0Y29uc29sZS5sb2coZXZlbnRzKTtcblxuXHRvcHRpb25zLmJhbmtBdXRvVmVyaWZ5R29vZ2xlV29ya3NwYWNlLmdldCgpLnRoZW4oKHZhbHVlKSA9PiB7XG5cdFx0dmFsdWUgJiYgdmVyaWZ5QWxsKGV2ZW50cyk7XG5cdH0pO1xufVxuXG5jb25zdCB0YWJsZVJvd0F0dHJpYnV0ZU5hbWUgPSAnZGF0YS1oY2ItcGx1Z2luLXJvdy1udW0nO1xuZnVuY3Rpb24gcHJvY2Vzc1RhYmxlKCkge1xuXHR2YXIgcm93cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RhYmxlIHRyJykpO1xuXHR2YXIgZGF0YSA9IFtdO1xuXG5cdC8vIGdldCByaWQgb2YgdGFibGUgaGVhZGluZ1xuXHRyb3dzLnNoaWZ0KCk7XG5cblx0Ly8gcHJvY2Vzc1xuXHRmb3IgKGxldCBbaW5kZXgsIHJvd10gb2Ygcm93cy5lbnRyaWVzKCkpIHtcblx0XHR2YXIgY29scyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcblx0XHRjb25zdCBwcm9jZXNzZWROYW1lID0gKDxzdHJpbmc+Y29sc1syXS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQpLm1hdGNoKFxuXHRcdFx0L14oLiopPzpcXHMoW146XSopJC9cblx0XHQpO1xuXG5cdFx0ZGF0YS5wdXNoKHtcblx0XHRcdGlkOiBjb2xzWzBdLmlubmVyVGV4dCxcblx0XHRcdGRhdGU6IGNvbHNbMV0uaW5uZXJUZXh0LFxuXHRcdFx0ZXZlbnROYW1lOiBwcm9jZXNzZWROYW1lWzFdLFxuXHRcdFx0ZG9tYWluOiBwcm9jZXNzZWROYW1lWzJdLFxuXHRcdFx0ZXZlbnRTbHVnOiBjb2xzWzJdLmZpcnN0RWxlbWVudENoaWxkWydocmVmJ10sXG5cdFx0XHRvdUlkOiBjb2xzWzNdLmlubmVyVGV4dCxcblx0XHRcdG91UGF0aDogY29sc1s0XS5pbm5lclRleHQsXG5cdFx0XHRrZXk6IGNvbHNbNV0uaW5uZXJUZXh0LFxuXHRcdFx0c3RhdHVzOiBjb2xzWzZdLmlubmVyVGV4dCxcblx0XHRcdGRlbGV0ZWQ6IHJvdy5zdHlsZS5iYWNrZ3JvdW5kID09PSAnI2ZmY2NjYycsXG5cdFx0XHRyb3dOdW06IGluZGV4LFxuXHRcdH0pO1xuXHRcdHJvdy5zZXRBdHRyaWJ1dGUodGFibGVSb3dBdHRyaWJ1dGVOYW1lLCBgJHtpbmRleH1gKTtcblx0fVxuXHRjb25zb2xlLmxvZyhkYXRhKTtcblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5QWxsKGV2ZW50cykge1xuXHR2YXIgbnVtVmVyaWZpZWQgPSAwO1xuXG5cdHZhciB2ZXJpZnlFcnJvcnMgPSB7fTtcblx0dmFyIHZlcmlmeVByb21pc2VzID0gW107XG5cdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuXHRcdGlmICghZXZlbnQuZGVsZXRlZCAmJiBldmVudC5zdGF0dXMgPT09ICdWRVJJRllJTkcnKSB7XG5cdFx0XHRudW1WZXJpZmllZCsrO1xuXG5cdFx0XHRjb25zdCBwcm9taXNlID0gdmVyaWZ5KGV2ZW50KTtcblx0XHRcdHZlcmlmeVByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cdFx0XHRwcm9taXNlLmNhdGNoKChyZXMpID0+IHtcblx0XHRcdFx0Ly8gVE9ETzogdHJhY2sgZXJyb3JzXG5cdFx0XHRcdHZlcmlmeUVycm9yc1tyZXMuc3RhdHVzXSA9IHJlcy5kYXRhO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gZGlzcGxheSB0aGUgbnVtYmVyIG9mIGRvbWFpbnMgc2VudCB0byBHLVZlcmlmeSBvbiB0aGlzIHBhZ2UgbG9hZFxuXHRjb25zdCBkaXNwbGF5TnVtVmVyaWZpZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdGRpc3BsYXlOdW1WZXJpZmllZC5pbm5lclRleHQgPSBgRy1WZXJpZnk6ICR7bnVtVmVyaWZpZWR9IERvbWFpbnNgO1xuXHRkb2N1bWVudFxuXHRcdC5xdWVyeVNlbGVjdG9yKCdib2R5Jylcblx0XHQuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0ZGlzcGxheU51bVZlcmlmaWVkLFxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKS5uZXh0RWxlbWVudFNpYmxpbmdcblx0XHQpO1xuXG5cdC8vIGFsZXJ0IHVzZXJzIG9mIGVycm9ycyB0aGF0IGhhdmUgYnVpbHQgdXBcblxuXHRQcm9taXNlLmFsbCh2ZXJpZnlQcm9taXNlcykuY2F0Y2goKCkgPT4ge1xuXHRcdE9iamVjdC5rZXlzKHZlcmlmeUVycm9ycykuZm9yRWFjaCgoZXJyKSA9PiB7XG5cdFx0XHRzd2l0Y2ggKGVycikge1xuXHRcdFx0XHRjYXNlICc0MDEnOlxuXHRcdFx0XHRcdGFsZXJ0KFxuXHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wZXJhdGlvbnMgUGx1Z2luOiBVSCBPSCFcXG5HLVZlcmlmeSBBdXRoZW50aWNhdGlvbiBLZXkgbm90IGZvdW5kXFxuXFxuUGxlYXNlIHZpc2l0IHRoZSBwbHVnaW4gc2V0dGluZ3MgdG8gc2V0IHlvdXIgYXV0aGVudGljYXRpb24ga2V5Lidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgJzQwMyc6XG5cdFx0XHRcdFx0YWxlcnQoXG5cdFx0XHRcdFx0XHQnSGFjayBDbHViIEJhbmsgT3BlcmF0aW9ucyBQbHVnaW46IFVIIE9IIVxcbkludmFsaWQgRy1WZXJpZnkgQXV0aGVudGljYXRpb24gS2V5XFxuXFxuUGxlYXNlIHZpc2l0IHRoZSBwbHVnaW4gc2V0dGluZ3MgdG8gZG91YmxlIGNoZWNrIHlvdXIgYXV0aGVudGljYXRpb24ga2V5LiBDb250YWN0IEdhcnkgZm9yIGhlbHAhJ1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRhbGVydChcblx0XHRcdFx0XHRcdGBIYWNrIENsdWIgQmFuayBPcGVyYXRpb25zIFBsdWdpbjogVUggT0ghXFxuRy1WZXJpZnkgRXJyb3JcXG5cXG4ke0pTT04uc3RyaW5naWZ5KFxuXHRcdFx0XHRcdFx0XHR2ZXJpZnlFcnJvcnNbZXJyXVxuXHRcdFx0XHRcdFx0KX1gXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG5cblx0YXN5bmMgZnVuY3Rpb24gdmVyaWZ5KGV2ZW50KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGNvbnN0IGF1dGhLZXkgPSBhd2FpdCBnZXRLZXkoKTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHNldFJvd1N0YXR1cyhldmVudCwgJ2xvYWRpbmcnKTtcblx0XHRcdFx0Y29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KFxuXHRcdFx0XHRcdCdodHRwczovL2d2ZXJpZnkuYmFuay5lbmdpbmVlcmluZy92ZXJpZnkvJyArIGV2ZW50LmRvbWFpbixcblx0XHRcdFx0XHR0eXBlb2YgYXV0aEtleSAhPT0gJ3VuZGVmaW5lZCcgJiYgYXV0aEtleSAhPT0gJydcblx0XHRcdFx0XHRcdD8ge1xuXHRcdFx0XHRcdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHRcdFx0XHRcdGF1dGhvcml6YXRpb246IGF3YWl0IGdldEtleSgpLFxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHQgIH1cblx0XHRcdFx0XHRcdDogbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRwcmludChyZXMuZGF0YSk7XG5cdFx0XHRcdHNldFJvd1N0YXR1cyhldmVudCwgJ3ZlcmlmaWVkJyk7XG5cdFx0XHRcdHJlc29sdmUocmVzLmRhdGEpO1xuXHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0cHJpbnQoZXJyb3IucmVzcG9uc2UuZGF0YSk7XG5cblx0XHRcdFx0Ly8gNDAwIGZyb20gRy1WZXJpZnkgKGFuZCBHb29nbGUpIG1lYW5zIHZlcmlmaWNhdGlvbiB0b2tlbiB3YXMgbm90IGZvdW5kIGluIGRvbWFpbiBETlNcblx0XHRcdFx0Ly8gKG5vIHJlcXVlc3QgZXJyb3IpXG5cdFx0XHRcdGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xuXHRcdFx0XHRcdHNldFJvd1N0YXR1cyhcblx0XHRcdFx0XHRcdGV2ZW50LFxuXHRcdFx0XHRcdFx0J2ZhaWxlZCcsXG5cdFx0XHRcdFx0XHRlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yLm1lc3NhZ2Uuam9pbignICcpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRyZXNvbHZlKGVycm9yLnJlc3BvbnNlLmRhdGEpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIHRoZXJlJ3MgZXJyb3IsIGJ1dCBub3QgNDAwLCB0aGVyZSdzIGFuIGlzc3VlIVxuXHRcdFx0XHRzZXRSb3dTdGF0dXMoZXZlbnQsICdmYWlsZWQnLCBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yKTtcblx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnJvci5yZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRmdW5jdGlvbiBwcmludChkYXRhKSB7XG5cdFx0XHQvLyBjb25zb2xlLmdyb3VwKFwiVmVyaWZ5OiBcIiArIGV2ZW50LmRvbWFpbik7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRcdC8vIGNvbnNvbGUuZ3JvdXBFbmQoKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0Um93U3RhdHVzKGV2ZW50LCBzdGF0dXMsIG1lc3NhZ2UgPSB1bmRlZmluZWQpIHtcblx0Y29uc3Qgc3RhdHVzSW5qZWN0TG9jID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRgdHJbJHt0YWJsZVJvd0F0dHJpYnV0ZU5hbWV9PVwiJHtldmVudC5yb3dOdW19XCJdYFxuXHQpLmNoaWxkcmVuWzJdO1xuXG5cdHZhciBzdGF0dXNEaXNwbGF5VGV4dCA9ICc8c3Ryb25nPkctVmVyaWZ5PC9zdHJvbmc+OiAnO1xuXHRzd2l0Y2ggKHN0YXR1cykge1xuXHRcdGNhc2UgJ2xvYWRpbmcnOlxuXHRcdFx0c3RhdHVzRGlzcGxheVRleHQgKz0gJ0xPQURJTkcuLi4nO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAndmVyaWZpZWQnOlxuXHRcdFx0c3RhdHVzRGlzcGxheVRleHQgKz0gJ1NVQ0NFU1NGVUwnO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnZmFpbGVkJzpcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdGQUlMRUQnO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0bWVzc2FnZSAmJiAoc3RhdHVzRGlzcGxheVRleHQgKz0gYCA8c21hbGw+KCR7bWVzc2FnZX0pPC9zbWFsbD5gKTtcblxuXHR2YXIgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb25zdCB1bmlxdWVJZCA9IGBoY2ItcGx1Z2luLWdvb2dsZS13b3Jrc3BhY2UtZy12ZXJpZnktJHtldmVudC5pZH1gO1xuXHQvLyBjb25zdCB1bmlxdWVJZCA9IGBoY2ItcGx1Z2luLWdvb2dsZS13b3Jrc3BhY2UtZy12ZXJpZnktJHtldmVudC5kb21haW4ucmVwbGFjZShcblx0Ly8gXHQvXFxXKyg/ISQpL2csXG5cdC8vIFx0J19ELU8tVF8nXG5cdC8vICl9YDtcblx0dGVtcERpdi5pbm5lckhUTUwgPSBgPGRpdiBpZD1cIiR7dW5pcXVlSWR9XCI+JHtzdGF0dXNEaXNwbGF5VGV4dH08L2Rpdj5gO1xuXHRjb25zdCBwcmVleGlzdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt1bmlxdWVJZH1gKTtcblx0cHJlZXhpc3RpbmdFbGVtZW50ICYmIHByZWV4aXN0aW5nRWxlbWVudC5yZW1vdmUoKTtcblx0c3RhdHVzSW5qZWN0TG9jLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RFbGVtZW50Q2hpbGQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYW5rVjFHb29nbGVXb3Jrc3BhY2U7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgZ2V0S2V5IH0gZnJvbSAnLi4vaGVscGVycy9nLXZlcmlmeS1hdXRoJztcblxuYXN5bmMgZnVuY3Rpb24gYmFua1YyR29vZ2xlV29ya3NwYWNlRWRpdCgpIHtcblx0cHJvY2Vzc0RvbWFpbigpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRG9tYWluKCkge1xuXHRjb25zdCBkZXRhaWxzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuXG5cdC8vIGdldCBkb21haW4gb2YgY3VycmVudCBHb29nbGUgV29ya3NhcGNlXG5cdHZhciBkZXRhaWxzID0ge1xuXHRcdG5hbWU6ICcnLFxuXHRcdGRvbWFpbjogJycsXG5cdFx0a2V5OiAnJyxcblx0XHRvdUlkOiAnJyxcblx0XHRvdVBhdGg6ICcnLFxuXHR9O1xuXHRmb3IgKGxldCBpdGVtIG9mIGRldGFpbHNUYWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0cicpKSB7XG5cdFx0Y29uc3QgcGFpcnMgPSA8QXJyYXk8SFRNTFRhYmxlQ2VsbEVsZW1lbnQ+Pihcblx0XHRcdEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGQnKSlcblx0XHQpO1xuXG5cdFx0Ly8gZmlyc3QgdGRcblx0XHRjb25zdCBuYW1lID0gcGFpcnNbMF0uaW5uZXJUZXh0O1xuXHRcdGNvbnN0IGRhdGEgPSBwYWlyc1sxXS5pbm5lclRleHQ7XG5cdFx0c3dpdGNoIChuYW1lLnRyaW0oKSkge1xuXHRcdFx0Y2FzZSAnRXZlbnQ6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm5hbWUgPSBkYXRhO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgJ0RvbWFpbjonOiB7XG5cdFx0XHRcdGRldGFpbHMuZG9tYWluID0gZGF0YTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlICdWZXJpZmljYXRvbiBLZXk6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLmtleSA9IGRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSAnT1UgSUQ6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm91SWQgPSBkYXRhO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgJ09VIFBhdGg6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm91UGF0aCA9IGRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGdldCB2ZXJpZmljYXRpb24ga2V5IGZyb20gZy12ZXJpZnlcblx0aWYgKGRldGFpbHMuZG9tYWluICE9PSAnJykge1xuXHRcdGRpc3BsYXlUb2tlbignTE9BRElORy4uLicpO1xuXHRcdHZhciBkb21haW5LZXkgPSAoYXdhaXQgZ2V0VG9rZW4oZGV0YWlscy5kb21haW4udHJpbSgpKSkudG9rZW47XG5cdFx0ZGlzcGxheVRva2VuKGRvbWFpbktleSk7XG5cdFx0Y29uc29sZS5sb2coZGV0YWlscy5kb21haW4sIGRvbWFpbktleSk7XG5cdH0gZWxzZSB7XG5cdFx0ZGlzcGxheVRva2VuKCdOTyBET01BSU4nKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5VG9rZW4oZG9tYWluS2V5KSB7XG5cdHZhciBjb250ZW50ID0gYFxuXHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIiBpZD1cImdlbmVyYXRlZERvbWFpbktleVdyYXBwZXJcIj5cblx0XHQ8aDQ+VmVyaWZpY2F0aW9uIFRva2VuPC9oND5cblx0XHQ8cHJlIGlkPVwiZ2VuZXJhdGVkRG9tYWluS2V5XCIgb25jbGljaz1cIlxuXHRcdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCgnJHtkb21haW5LZXl9Jyk7XG5cdFx0XHR9KSgpO1xuXHRcdFx0XCJcblx0XHRcdHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCJcblx0XHQ+JHtkb21haW5LZXl9PC9wcmU+XG5cdDwvZGl2PlxuXHRgO1xuXG5cdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdC8vIHJlbW92ZSBwcmUtZXhpc3Rpbmdcblx0Y29uc3QgcHJlZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZ2VuZXJhdGVkRG9tYWluS2V5V3JhcHBlcmApO1xuXHRwcmVleGlzdGluZyAmJiBwcmVleGlzdGluZy5yZW1vdmUoKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpc3BsYXlFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW4oZG9tYWluKSB7XG5cdHJldHVybiAoXG5cdFx0YXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL2d2ZXJpZnkuYmFuay5lbmdpbmVlcmluZy90b2tlbi8nICsgZG9tYWluLCB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdGF1dGhvcml6YXRpb246IGF3YWl0IGdldEtleSgpLFxuXHRcdFx0fSxcblx0XHR9KVxuXHQpLmRhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtWMkdvb2dsZVdvcmtzcGFjZUVkaXQ7XG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5mdW5jdGlvbiBiYW5rVjJUcmFuc2FjdGlvbkVkaXQoKSB7XG5cdGNvbnN0IHJhd05hbWUgPSBnZXRSYXdOYW1lKCk7XG5cblx0Ly8gcXVpY2tBc3NpZ25CdXR0b25zKCk7XG5cdGlmIChyYXdOYW1lICE9PSBudWxsKSB7XG5cdFx0ZXhwZW5zaWZ5UmVwb3J0KHJhd05hbWUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFJhd05hbWUoKSB7XG5cdGNvbnN0IHBhcmFncmFwaHMgPSA8QXJyYXk8SFRNTFBhcmFncmFwaEVsZW1lbnQ+Pihcblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdwJykpXG5cdCk7XG5cblx0dmFyIHJhd1BsYWlkVHJhbnNhY3Rpb246IEFycmF5PE5vZGU+O1xuXHRwYXJhZ3JhcGhzLmZvckVhY2goKHApID0+IHtcblx0XHRpZiAocC5pbm5lclRleHQgPT09ICdSYXdQbGFpZFRyYW5zYWN0aW9uJykge1xuXHRcdFx0cmF3UGxhaWRUcmFuc2FjdGlvbiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuXHRcdFx0XHRwLm5leHRFbGVtZW50U2libGluZy5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZE5vZGVzXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG5cdGlmICh0eXBlb2YgcmF3UGxhaWRUcmFuc2FjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuXG5cdHZhciBuYW1lRWxlbWVudDogTm9kZTtcblx0cmF3UGxhaWRUcmFuc2FjdGlvbi5mb3JFYWNoKChlKSA9PiB7XG5cdFx0aWYgKGUubm9kZVR5cGUgPT09IDMgJiYgZS5ub2RlVmFsdWUuc3Vic3RyaW5nKDEpLnRyaW0oKSA9PT0gJ1wibmFtZVwiJykge1xuXHRcdFx0bmFtZUVsZW1lbnQgPSBlO1xuXHRcdH1cblx0fSk7XG5cdGlmICh0eXBlb2YgbmFtZUVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCBuYW1lVmFsdWUgPSAoPEhUTUxFbGVtZW50Pm5hbWVFbGVtZW50Lm5leHRTaWJsaW5nLm5leHRTaWJsaW5nKVxuXHRcdC5pbm5lckhUTUw7XG5cblx0cmV0dXJuIG5hbWVWYWx1ZTtcbn1cblxuZnVuY3Rpb24gcXVpY2tBc3NpZ25CdXR0b25zKCkge1xuXHRjb25zdCBvcHRpb25zID0gW1xuXHRcdHtcblx0XHRcdG5hbWU6ICdIUScsXG5cdFx0XHRldmVudElkOiAxODMsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnQmFuaycsXG5cdFx0XHRldmVudElkOiA2MzYsXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRuYW1lOiAnTm90IGV2ZW50LXJlbGF0ZWQnLFxuXHRcdFx0ZXZlbnRJZDogbnVsbCxcblx0XHR9LFxuXHRdO1xuXG5cdC8vIGluamVjdCByZXVzZWFibGUgYXNzaWduIHNjcmlwdFxuXHR2YXIgc2NyaXB0SW5qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdHNjcmlwdEluamVjdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG5cdHNjcmlwdEluamVjdC5pbm5lclRleHQgPSBgXG5cdFx0ZnVuY3Rpb24gYXNzaWduKGV2ZW50KXtcblx0XHRcdGlmKGV2ZW50ICE9PSBudWxsKSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25faXNfZXZlbnRfcmVsYXRlZFwiKS5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc2FjdGlvbl9mZWVfcmVsYXRpb25zaGlwX2F0dHJpYnV0ZXNfZXZlbnRfaWQgPiBvcHRpb25bdmFsdWU9J1wiICsgZXZlbnQgKyBcIiddXCIpLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25faXNfZXZlbnRfcmVsYXRlZFwiKS5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25fZmVlX3JlbGF0aW9uc2hpcF9hdHRyaWJ1dGVzX2V2ZW50X2lkID4gb3B0aW9uXCIpLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdGA7XG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0SW5qZWN0KTtcblxuXHQvLyBidWlsZCBpbmplY3RlZCBidXR0b25zXG5cdHZhciBjb250ZW50ID0gYFxuXHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwIGNlbnRlclwiPmA7XG5cdG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG5cdFx0Y29udGVudCArPSBgXG5cdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBiZy1hY2NlbnRcIlxuXHRcdFx0XHRvbkNsaWNrPVwiYXNzaWduKCR7b3B0aW9uLmV2ZW50SWR9KVwiXG5cdFx0XHQ+JHtvcHRpb24ubmFtZX08L3NwYW4+XG5cdFx0YDtcblx0fSk7XG5cdGNvbnRlbnQgKz0gYDwvZGl2PjwvZGl2PmA7XG5cblx0Ly8gaW5qZWN0IHRoZSBidXR0b25zXG5cdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXIgPiBoMScpLnBhcmVudEVsZW1lbnQ7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNwbGF5RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG59XG5cbmZ1bmN0aW9uIGV4cGVuc2lmeVJlcG9ydChvcmlnaW5hbE5hbWU6IFN0cmluZykge1xuXHRjb25zdCByZWdleE1hdGNoID0gb3JpZ2luYWxOYW1lLm1hdGNoKC9FeHBlbnNpZnkgUihcXGQqKSBUaGUgSGFjayBGb3VuZGF0aW9uLyk7XG5cblx0aWYgKHJlZ2V4TWF0Y2ggPT09IG51bGwpIHJldHVybjtcblxuXHRjb25zb2xlLmxvZygnVGhpcyBpcyBhbiBFeHBlbnNpZnkgUmVwb3J0IHdpdGggaWQgJyArIHJlZ2V4TWF0Y2hbMV0pO1xuXHRjb25zdCBleHBlbnNpZnlSZXBvcnRVcmwgPSBgaHR0cHM6Ly93d3cuZXhwZW5zaWZ5LmNvbS9yZXBvcnQ/cGFyYW09eyUyMnBhZ2VSZXBvcnRJRCUyMjolMjIke3JlZ2V4TWF0Y2hbMV19JTIyLCUyMmtlZXBDb2xsZWN0aW9uJTIyOnRydWV9YDtcblxuXHR2YXIgY29udGVudCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIj5cblx0XHRcdDxwPlZpc2l0XG5cdFx0XHRcdDxhIGhyZWY9XCIke2V4cGVuc2lmeVJlcG9ydFVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5FeHBlbnNpZnkgUmVwb3J0ICgke3JlZ2V4TWF0Y2hbMV19KTwvYT4uXG5cdFx0XHQ8L3A+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHR2YXIgZGlzcGxheUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGlzcGxheUVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcblxuXHRjb25zdCB0eERldGFpbHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RhYmxlJyk7XG5cdHR4RGV0YWlsc1RhYmxlLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdGRpc3BsYXlFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLFxuXHRcdHR4RGV0YWlsc1RhYmxlLm5leHRTaWJsaW5nXG5cdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtWMlRyYW5zYWN0aW9uRWRpdDtcbiIsImZ1bmN0aW9uIGV4cGVuc2lmeVJlcG9ydCgpIHtcblx0bGlua0JhbmtQcm9qZWN0U2VhcmNoKCk7XG59XG5mdW5jdGlvbiBsaW5rQmFua1Byb2plY3RTZWFyY2goKSB7XG5cdGNvbnN0IGluamVjdFNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRpbmplY3RTY3JpcHQuaW5uZXJUZXh0ID0gYFxuXHRmdW5jdGlvbiBpbmplY3QoKSB7XG5cdFx0bGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuXHRcdFx0Y29uc3QgZGlzcGxheUxvYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiI3JlcG9ydF9pbnZvaWNlX2RhdGVzX2NvbnRhaW5lclwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChkaXNwbGF5TG9jID09PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRjb25zdCBwb2xpY3lOYW1lID0gUG9saWN5LmdldEN1cnJlbnQoKS5wb2xpY3kubmFtZTtcblx0XHRcdFxuXHRcdFx0aWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaW5rVG9IQ0JTZWFyY2hcIikgPT09IG51bGwpIHtcblx0XHRcdFx0Y29uc3QgZGlzcGxheUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRkaXNwbGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwiaGNiLXBsdWdpbi10b29sc1wiKTtcblx0XHRcdFx0ZGlzcGxheUVsZW0uaWQgPSBcImxpbmtUb0hDQlNlYXJjaFwiO1xuXHRcdFx0XHRkaXNwbGF5RWxlbS5pbm5lckhUTUwgPSBcXGBcblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdFNlYXJjaCBmb3Jcblx0XHRcdFx0XHRcdDxhIGhyZWY9J2h0dHBzOi8vYmFuay5oYWNrY2x1Yi5jb20vYWRtaW4vZXZlbnRzP3E9XFxgICsgcG9saWN5TmFtZSArIFxcYCcgdGFyZ2V0PSdfYmxhbmsnPlxcYCArIHBvbGljeU5hbWUgKyBcXGA8L2E+XG5cdFx0XHRcdFx0XHRvbiBIYWNrIENsdWIgQmFuay5cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFxcYDtcblx0XHRcdFx0ZGlzcGxheUxvYy5hcHBlbmRDaGlsZChkaXNwbGF5RWxlbSk7XG5cdFx0XHR9XG5cblx0XHRcdG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHR9KTtcblxuXHRcdG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuXHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxuXHRcdFx0c3VidHJlZTogdHJ1ZSxcblx0XHRcdGF0dHJpYnV0ZXM6IGZhbHNlLFxuXHRcdFx0Y2hhcmFjdGVyRGF0YTogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblx0aW5qZWN0KCk7XG5cdGA7XG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoaW5qZWN0U2NyaXB0KTtcbn1cbmV4cG9ydCBkZWZhdWx0IGV4cGVuc2lmeVJlcG9ydDtcbiIsImltcG9ydCBvcHRpb25zIGZyb20gJy4uL2hlbHBlcnMvb3B0aW9ucyc7XG5cbmNvbnN0IERFRkFVTFRfUEFZX0ZST01fQUNDT1VOVCA9ICdGaXNjYWwgU3BvbnNvcnNoaXAgMiAtIE5ldyc7XG5cbmZ1bmN0aW9uIHN2YlBheUJpbGxBZGRJbmRpdkhhdmVCYW5rKCkge1xuXHRvcHRpb25zLnN2YkJpbGxQYXlBZGRJbmRpdkhhdmVCYW5rLmdldCgpLnRoZW4oKHZhbHVlKSA9PiB7XG5cdFx0aWYgKCF2YWx1ZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENsaWNrIG9uIHRoZSBcIkkgaGF2ZSB0aGUgYmFuayBhY2NvdW50IGluZm9ybWF0aW9uXCIgc3dpdGNoXG5cdFx0Y29uc3QgaUhhdmVCYW5rSW5mb1N3aXRjaCA9IDxIVE1MSW5wdXRFbGVtZW50Pihcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdGwwMF9EZWZhdWx0Q29udGVudF9yZG9JSGF2ZVRoZWlySW5mb0Zvcm0nKVxuXHRcdCk7XG5cdFx0aWYgKCFpSGF2ZUJhbmtJbmZvU3dpdGNoLmNoZWNrZWQpIHtcblx0XHRcdGlIYXZlQmFua0luZm9Td2l0Y2guY2xpY2soKTtcblx0XHR9XG5cblx0XHQvLyBTZWxlY3QgXCJEZWZhdWx0IHBheSBmcm9tIGFjY291bnRcIiB0byBiZSBERUZBVUxUX1BBWV9GUk9NX0FDQ09VTlQgKFwiRmlzY2FsIFNwb25zb3JzaGlwIC0gMiBOZXdcIilcblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2Vcblx0XHRcdC5jYWxsKFxuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcdFx0XHRcdCcjY3RsMDBfRGVmYXVsdENvbnRlbnRfSUhhdmVUaGVpckluZm9Gb3JtX2RkRGVmYXVsdFBheUZyb20gPiBvcHRpb24nXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHRcdC5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRcdFx0aWYgKG9wdGlvbi5pbm5lclRleHQgPT09IERFRkFVTFRfUEFZX0ZST01fQUNDT1VOVCkge1xuXHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9ICd0cnVlJztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHQvLyBBbGxvdyBwYXN0ZSB0byBjb25maXJtIGFjY291bnQvcm91dGluZyBudW1iZXIgaW5wdXRcblx0XHRjb25zdCBhY2NvdW50Q29uZmlybUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdCcjY3RsMDBfRGVmYXVsdENvbnRlbnRfSUhhdmVUaGVpckluZm9Gb3JtX3R4dENvbmZpcm1BY2NvdW50TnVtYmVyJ1xuXHRcdCk7XG5cdFx0Y29uc3Qgcm91dGluZ0NvbmZpcm1JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHQnI2N0bDAwX0RlZmF1bHRDb250ZW50X0lIYXZlVGhlaXJJbmZvRm9ybV90eHRDb25maXJtUm91dGluZ051bWJlcidcblx0XHQpO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0J3Bhc3RlJyxcblx0XHRcdGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLmlzU2FtZU5vZGUoYWNjb3VudENvbmZpcm1JbnB1dCkgfHxcblx0XHRcdFx0XHQoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkuaXNTYW1lTm9kZShyb3V0aW5nQ29uZmlybUlucHV0KVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRydWVcblx0XHQpO1xuXHR9KTtcbn1cbmV4cG9ydCBkZWZhdWx0IHN2YlBheUJpbGxBZGRJbmRpdkhhdmVCYW5rO1xuIiwiaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vaGVscGVycy9vcHRpb25zJztcblxuZnVuY3Rpb24gc3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGUoKSB7XG5cdG9wdGlvbnMuc3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGUuZ2V0KCkudGhlbigodmFsdWUpID0+IHtcblx0XHRpZiAoIXZhbHVlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQXV0b21hdGljYWxseSBjbGljayBvbiBcIlJlcXVlc3QgYWN0aXZhdGlvbiBjb2RlXCJcblx0XHQoPEhUTUxBbmNob3JFbGVtZW50Pihcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdGwwMF9EZWZhdWx0Q29udGVudF9yZXF1ZXN0Q29kZScpXG5cdFx0KSkuY2xpY2soKTtcblx0fSk7XG59XG5leHBvcnQgZGVmYXVsdCBzdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZTtcbiIsImFzeW5jIGZ1bmN0aW9uIGdldEtleSgpOiBQcm9taXNlPHN0cmluZz4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdiYW5rT3BzUGx1Z2luX2dWZXJpZnlBdXRoS2V5JywgZnVuY3Rpb24gKGl0ZW1zKSB7XG5cdFx0XHRyZXR1cm4gcmVzb2x2ZShpdGVtcy5iYW5rT3BzUGx1Z2luX2dWZXJpZnlBdXRoS2V5KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHNldEtleShrZXk6IHN0cmluZykge1xuXHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IGJhbmtPcHNQbHVnaW5fZ1ZlcmlmeUF1dGhLZXk6IGtleSB9KTtcbn1cblxuZXhwb3J0IHsgZ2V0S2V5LCBzZXRLZXkgfTtcbiIsImNvbnN0IHN0b3JhZ2VQcmVmaXggPSAnYmFua09wc1BsdWdpbl8nO1xuXG5hc3luYyBmdW5jdGlvbiBnZXQ8VD4oa2V5OiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChgJHtzdG9yYWdlUHJlZml4fSR7a2V5fWAsIGZ1bmN0aW9uIChpdGVtcykge1xuXHRcdFx0cmV0dXJuIHJlc29sdmUoPFQ+aXRlbXNbYCR7c3RvcmFnZVByZWZpeH0ke2tleX1gXSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlKSB7XG5cdGNvbnNvbGUubG9nKGtleSwgdmFsdWUpO1xuXHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtgJHtzdG9yYWdlUHJlZml4fSR7a2V5fWBdOiB2YWx1ZSB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqPFQ+KGtleSwgZGVmYXVsdFZhbHVlOiBUKSB7XG5cdHJldHVybiB7XG5cdFx0c2V0OiAodmFsdWU6IFQpID0+IHNldChrZXksIHZhbHVlKSxcblx0XHRnZXQ6ICgpID0+IGdldDxUPihrZXkpLFxuXHRcdGRlZmF1bHRWYWx1ZSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRiYW5rQXV0b1ZlcmlmeUdvb2dsZVdvcmtzcGFjZTogY3JlYXRlT2JqPGJvb2xlYW4+KFxuXHRcdCdiYW5rQXV0b1ZlcmlmeUdvb2dsZVdvcmtzcGFjZScsXG5cdFx0dHJ1ZVxuXHQpLFxuXHRzdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuazogY3JlYXRlT2JqPGJvb2xlYW4+KFxuXHRcdCdzdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuaycsXG5cdFx0dHJ1ZVxuXHQpLFxuXHRzdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZTogY3JlYXRlT2JqPGJvb2xlYW4+KFxuXHRcdCdzdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZScsXG5cdFx0ZmFsc2Vcblx0KSxcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9