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
const bankEventCopyName_1 = __webpack_require__(/*! ./content/bankEventCopyName */ "./src/app/content/bankEventCopyName.ts");
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
                    {
                        regex: /https:\/\/bank\.hackclub\.com\/.*/,
                        func: bankEventCopyName_1.default,
                    },
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

/***/ "./src/app/content/bankEventCopyName.ts":
/*!**********************************************!*\
  !*** ./src/app/content/bankEventCopyName.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function bankEventCopyName() {
    if (onEventPage()) {
        const nameElement = (document.querySelector('main.container > aside > a > h1.primary'));
        const name = nameElement.innerText;
        var copyElement = document.createElement('span');
        copyElement.className = 'badge bg-muted ml0 mb2';
        copyElement.innerText = 'copy project name';
        copyElement.style.cursor = 'pointer';
        copyElement.addEventListener('click', function () {
            navigator.clipboard.writeText(`${name.trim()}`);
        });
        var copyElementWrapper = document.createElement('div');
        copyElementWrapper.appendChild(copyElement);
        nameElement.parentElement.parentElement.insertBefore(copyElementWrapper, nameElement.parentElement.nextElementSibling);
    }
}
function onEventPage() {
    if (document.querySelector('main.container > aside > a > h1.primary') &&
        document.querySelector("main.container > aside > nav > a[aria-label='Edit project settings']")) {
        return true;
    }
    return false;
}
exports.default = bankEventCopyName;


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
                    const res = yield axios_1.default.get('https://g-verify.herokuapp.com/verify/' + event.domain, typeof authKey !== 'undefined' && authKey !== ''
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
        return (yield axios_1.default.get('https://g-verify.herokuapp.com/token/' + domain, {
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
                    const res = yield axios_1.default.get('https://g-verify.herokuapp.com/verify/' + event.domain, typeof authKey !== 'undefined' && authKey !== ''
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
        return (yield axios_1.default.get('https://g-verify.herokuapp.com/token/' + domain, {
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
						<a href='https://bank.hackclub.com/events?name=\` + policyName + \`' target='_blank'>\` + policyName + \`</a>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0F4aW9zRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvYmFua0V2ZW50Q29weU5hbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtQcm9qZWN0U2VhcmNoLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC9iYW5rVjFHb29nbGVXb3Jrc3BhY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2JhbmtWMVRyYW5zYWN0aW9uRWRpdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvYmFua1YyR29vZ2xlV29ya3NwYWNlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC9iYW5rVjJHb29nbGVXb3Jrc3BhY2VFZGl0LnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvY29udGVudC9iYW5rVjJUcmFuc2FjdGlvbkVkaXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L2V4cGVuc2lmeVJlcG9ydC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwL2NvbnRlbnQvc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmsudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9jb250ZW50L3N2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaGVscGVycy9nLXZlcmlmeS1hdXRoLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaGVscGVycy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlWQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztRQUNsQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQztRQUN0QixZQUFZO0tBQ1osQ0FBQztBQUNILENBQUM7QUFFRCxrQkFBZTtJQUNkLDZCQUE2QixFQUFFLFNBQVMsQ0FDdkMsK0JBQStCLEVBQy9CLElBQUksQ0FDSjtJQUNELDBCQUEwQixFQUFFLFNBQVMsQ0FDcEMsNEJBQTRCLEVBQzVCLElBQUksQ0FDSjtJQUNELGdDQUFnQyxFQUFFLFNBQVMsQ0FDMUMsa0NBQWtDLEVBQ2xDLEtBQUssQ0FDTDtDQUNELENBQUMiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC9jb250ZW50LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiAodHlwZW9mIHBheWxvYWQgPT09ICdvYmplY3QnKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsImltcG9ydCBiYW5rRXZlbnRDb3B5TmFtZSBmcm9tICcuL2NvbnRlbnQvYmFua0V2ZW50Q29weU5hbWUnO1xyXG5pbXBvcnQgYmFua1YxR29vZ2xlV29ya3NwYWNlIGZyb20gJy4vY29udGVudC9iYW5rVjFHb29nbGVXb3Jrc3BhY2UnO1xyXG5pbXBvcnQgYmFua1YxR29vZ2xlV29ya3NwYWNlRWRpdCBmcm9tICcuL2NvbnRlbnQvYmFua1YxR29vZ2xlV29ya3NwYWNlRWRpdCc7XHJcbmltcG9ydCBiYW5rUHJvamVjdFNlYXJjaCBmcm9tICcuL2NvbnRlbnQvYmFua1Byb2plY3RTZWFyY2gnO1xyXG5pbXBvcnQgYmFua1YxVHJhbnNhY3Rpb25FZGl0IGZyb20gJy4vY29udGVudC9iYW5rVjFUcmFuc2FjdGlvbkVkaXQnO1xyXG5pbXBvcnQgZXhwZW5zaWZ5UmVwb3J0IGZyb20gJy4vY29udGVudC9leHBlbnNpZnlSZXBvcnQnO1xyXG5pbXBvcnQgc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmsgZnJvbSAnLi9jb250ZW50L3N2YkJpbGxQYXlBZGRJbmRpdkhhdmVCYW5rJztcclxuaW1wb3J0IHN2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlIGZyb20gJy4vY29udGVudC9zdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZSc7XHJcbmltcG9ydCBiYW5rVjJHb29nbGVXb3Jrc3BhY2VFZGl0IGZyb20gJy4vY29udGVudC9iYW5rVjJHb29nbGVXb3Jrc3BhY2VFZGl0JztcclxuaW1wb3J0IGJhbmtWMlRyYW5zYWN0aW9uRWRpdCBmcm9tICcuL2NvbnRlbnQvYmFua1YyVHJhbnNhY3Rpb25FZGl0JztcclxuaW1wb3J0IGJhbmtWMkdvb2dsZVdvcmtzcGFjZSBmcm9tICcuL2NvbnRlbnQvYmFua1YyR29vZ2xlV29ya3NwYWNlJztcclxuXHJcbmZ1bmN0aW9uIGNoZWNrUGF0aCgpIHtcclxuXHRjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgKHJlc3BvbnNlKSA9PiB7XHJcblx0XHR2YXIgY2hlY2tSZWFkeSA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHRcdFx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0XHRjbGVhckludGVydmFsKGNoZWNrUmVhZHkpO1xyXG5cclxuXHRcdFx0XHQvLyBtYXRjaCBwYXRoIHRvIGNvbnRlbnQgZnVuY3Rpb25cclxuXHRcdFx0XHRjb25zdCBtYXRjaGVzID0gW1xyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL2JhbmtcXC5oYWNrY2x1YlxcLmNvbVxcL2dfc3VpdGVzJC8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMUdvb2dsZVdvcmtzcGFjZSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvLipcXC9nX3N1aXRlc1xcLy4qXFwvZWRpdC8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMUdvb2dsZVdvcmtzcGFjZUVkaXQsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL3d3d1xcLmJ1c2luZXNzYmlsbHBheS1lXFwuY29tXFwvVjJcXC9QYXllZXNcXC9BZGRJbmRpdmlkdWFsXFwuYXNweC4qLyxcclxuXHRcdFx0XHRcdFx0ZnVuYzogc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmssXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL3d3d1xcLmJ1c2luZXNzYmlsbHBheS1lXFwuY29tXFwvVjJcXC9QYXllZXNcXC9BY3RpdmF0aW9uQ29kZVxcLmFzcHguKi8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IHN2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlLFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0cmVnZXg6IC9odHRwczpcXC9cXC9iYW5rXFwuaGFja2NsdWJcXC5jb21cXC90cmFuc2FjdGlvbnNcXC8uKlxcL2VkaXQvLFxyXG5cdFx0XHRcdFx0XHRmdW5jOiBiYW5rVjFUcmFuc2FjdGlvbkVkaXQsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL2JhbmtcXC5oYWNrY2x1YlxcLmNvbVxcLy4qLyxcclxuXHRcdFx0XHRcdFx0ZnVuYzogYmFua0V2ZW50Q29weU5hbWUsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL2JhbmtcXC5oYWNrY2x1YlxcLmNvbVxcL2V2ZW50cy4qWz8mXW5hbWU9LiovLFxyXG5cdFx0XHRcdFx0XHRmdW5jOiBiYW5rUHJvamVjdFNlYXJjaCxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvLipleHBlbnNpZnlcXC5jb21cXC9yZXBvcnQuKi8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGV4cGVuc2lmeVJlcG9ydCxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvYWRtaW5cXC8uKlxcL2dvb2dsZV93b3Jrc3BhY2VfcHJvY2Vzcy8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMkdvb2dsZVdvcmtzcGFjZUVkaXQsXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRyZWdleDogL2h0dHBzOlxcL1xcL2JhbmtcXC5oYWNrY2x1YlxcLmNvbVxcL2FkbWluXFwvLipcXC90cmFuc2FjdGlvbi8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMlRyYW5zYWN0aW9uRWRpdCxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHJlZ2V4OiAvaHR0cHM6XFwvXFwvYmFua1xcLmhhY2tjbHViXFwuY29tXFwvYWRtaW5cXC9nb29nbGVfd29ya3NwYWNlcy8sXHJcblx0XHRcdFx0XHRcdGZ1bmM6IGJhbmtWMkdvb2dsZVdvcmtzcGFjZSxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0Y29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcblx0XHRcdFx0dmFyIG1hdGNoZXNTcGVjaWZpY0NvbnRlbnQgPSBmYWxzZTtcclxuXHRcdFx0XHRmb3IgKGxldCBpdGVtIG9mIG1hdGNoZXMpIHtcclxuXHRcdFx0XHRcdGlmIChpdGVtLnJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcblx0XHRcdFx0XHRcdGlmICh1cmwubWF0Y2goaXRlbS5yZWdleCkpIHtcclxuXHRcdFx0XHRcdFx0XHRtYXRjaGVzU3BlY2lmaWNDb250ZW50ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnSGFjayBDbHViIEJhbmsgT3BzIFBsdWdpbiBpcyBydW5uaW5nIG9uIHRoaXMgcGFnZSEnKTtcclxuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnUnVubmluZyBmdW5jdGlvbjonLCBpdGVtLmZ1bmMubmFtZSArICcoKScpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBpbmplY3QgY29tbW9uIGNzcy9zY3JpcHRzIGludG8gcGFnZVxyXG5cdFx0XHRcdFx0XHRcdGluamVjdENvbW1vbigpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHQvLyBydW4gY29udGVudCBzcGVjaWZpYyBmdW5jdGlvblxyXG5cdFx0XHRcdFx0XHRcdGl0ZW0uZnVuYygpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaXRlbS5yZWdleCkpIHtcclxuXHRcdFx0XHRcdFx0dmFyIG1hdGNoZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0aW50ZXJmYWNlIG1hdGNoT2JqIHtcclxuXHRcdFx0XHRcdFx0XHRyZWdleDogUmVnRXhwO1xyXG5cdFx0XHRcdFx0XHRcdGZ1bmM6IEZ1bmN0aW9uO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCg8QXJyYXk8bWF0Y2hPYmo+Pml0ZW0ucmVnZXgpLmZvckVhY2goKHIpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpZiAodXJsLm1hdGNoKHIucmVnZXgpKSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBkb24ndCBydW4gc2FtZSBmdW5jdGlvbiBtdWx0aXBsZSB0aW1lcyBwZXIgcGFnZVxyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKG1hdGNoZWQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0bWF0Y2hlc1NwZWNpZmljQ29udGVudCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcclxuXHRcdFx0XHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wcyBQbHVnaW4gaXMgcnVubmluZyBvbiB0aGlzIHBhZ2UhJ1xyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdFx0XHQvLyBpbmplY3QgY29tbW9uIGNzcy9zY3JpcHRzIGludG8gcGFnZVxyXG5cdFx0XHRcdFx0XHRcdFx0aW5qZWN0Q29tbW9uKCk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gcnVuIGNvbnRlbnQgc3BlY2lmaWMgZnVuY3Rpb25cclxuXHRcdFx0XHRcdFx0XHRcdGl0ZW0uZnVuYygpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdG1hdGNoZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghbWF0Y2hlc1NwZWNpZmljQ29udGVudCkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXHJcblx0XHRcdFx0XHRcdCdIYWNrIENsdWIgQmFuayBPcHMgUGx1Z2luIGlzIGluc3RhbGxlZCwgYnV0IG5vdCBhY3RpdmUgb24gdGhpcyBwYWdlLidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG5jaGVja1BhdGgoKTtcclxuXHJcbi8vIGNoZWNrIHBhdGggb24gU1BBIHBhZ2UgY2hhbmdlXHJcbmxldCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuWydjbGljaycsICdwb3BzdGF0ZScsICdvbmxvYWQnXS5mb3JFYWNoKChldnQpID0+XHJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXHJcblx0XHRldnQsXHJcblx0XHRmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcblx0XHRcdFx0aWYgKHVybCAhPT0gbG9jYXRpb24uaHJlZikge1xyXG5cdFx0XHRcdFx0Y2hlY2tQYXRoKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHVybCA9IGxvY2F0aW9uLmhyZWY7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRydWVcclxuXHQpXHJcbik7XHJcblxyXG5mdW5jdGlvbiBpbmplY3RDb21tb24oKSB7XHJcblx0Y29uc3QgY3VzdG9tQ3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuXHRjdXN0b21Dc3MuaW5uZXJUZXh0ID0gYFxyXG5cdFx0LmhjYi1wbHVnaW4tdG9vbHMge1xyXG5cdFx0XHRwYWRkaW5nOiAwLjVyZW07XHJcblx0XHRcdGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcclxuXHRcdFx0Ym9yZGVyOiAxcHggZGFzaGVkICNmZjM3Mzc7XHJcblx0XHRcdGJhY2tncm91bmQ6IHJnYmEoMjQxLDg3LDE1LDAuMTI1KTsnXHJcblx0XHR9XHJcblx0YDtcclxuXHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGN1c3RvbUNzcyk7XHJcbn1cclxuIiwiZnVuY3Rpb24gYmFua0V2ZW50Q29weU5hbWUoKSB7XG5cdGlmIChvbkV2ZW50UGFnZSgpKSB7XG5cdFx0Y29uc3QgbmFtZUVsZW1lbnQgPSA8SFRNTEhlYWRFbGVtZW50Pihcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4uY29udGFpbmVyID4gYXNpZGUgPiBhID4gaDEucHJpbWFyeScpXG5cdFx0KTtcblx0XHRjb25zdCBuYW1lID0gbmFtZUVsZW1lbnQuaW5uZXJUZXh0O1xuXG5cdFx0dmFyIGNvcHlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdGNvcHlFbGVtZW50LmNsYXNzTmFtZSA9ICdiYWRnZSBiZy1tdXRlZCBtbDAgbWIyJztcblx0XHRjb3B5RWxlbWVudC5pbm5lclRleHQgPSAnY29weSBwcm9qZWN0IG5hbWUnO1xuXHRcdGNvcHlFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblx0XHRjb3B5RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGAke25hbWUudHJpbSgpfWApO1xuXHRcdH0pO1xuXG5cdFx0dmFyIGNvcHlFbGVtZW50V3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGNvcHlFbGVtZW50V3JhcHBlci5hcHBlbmRDaGlsZChjb3B5RWxlbWVudCk7XG5cblx0XHRuYW1lRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0Y29weUVsZW1lbnRXcmFwcGVyLFxuXHRcdFx0bmFtZUVsZW1lbnQucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcblx0XHQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIG9uRXZlbnRQYWdlKCk6IGJvb2xlYW4ge1xuXHRpZiAoXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbi5jb250YWluZXIgPiBhc2lkZSA+IGEgPiBoMS5wcmltYXJ5JykgJiZcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XCJtYWluLmNvbnRhaW5lciA+IGFzaWRlID4gbmF2ID4gYVthcmlhLWxhYmVsPSdFZGl0IHByb2plY3Qgc2V0dGluZ3MnXVwiXG5cdFx0KVxuXHQpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtFdmVudENvcHlOYW1lO1xuIiwiZnVuY3Rpb24gYmFua1Byb2plY3RTZWFyY2goKSB7XG5cdGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cblx0Y29uc3QgbmFtZVBhcmFtID0gcGFyYW1zLmdldCgnbmFtZScpO1xuXHRpZiAobmFtZVBhcmFtICE9PSBudWxsICYmIG5hbWVQYXJhbSAhPT0gJycpIHtcblx0XHRzZWFyY2gobmFtZVBhcmFtKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZWFyY2gobmFtZSkge1xuXHRjb25zb2xlLmxvZygnU2VhcmNoaW5nIGZvcicsIG5hbWUpO1xuXG5cdGNvbnN0IHNlYXJjaElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyYmFyID4gaW5wdXRbdHlwZT0nc2VhcmNoJ11cIilcblx0KTtcblxuXHRzZWFyY2hJbnB1dC52YWx1ZSA9IG5hbWU7XG5cdHNlYXJjaElucHV0LmRpc3BhdGNoRXZlbnQoXG5cdFx0bmV3IEV2ZW50KCdpbnB1dCcsIHtcblx0XHRcdGJ1YmJsZXM6IHRydWUsXG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRcdH0pXG5cdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhbmtQcm9qZWN0U2VhcmNoO1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgZ2V0S2V5IH0gZnJvbSAnLi4vaGVscGVycy9nLXZlcmlmeS1hdXRoJztcclxuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vaGVscGVycy9vcHRpb25zJztcclxuXHJcbmZ1bmN0aW9uIGJhbmtWMUdvb2dsZVdvcmtzcGFjZSgpIHtcclxuXHRjb25zdCBldmVudHMgPSBwcm9jZXNzVGFibGUoKTtcclxuXHRjb25zb2xlLmxvZyhldmVudHMpO1xyXG5cclxuXHRvcHRpb25zLmJhbmtBdXRvVmVyaWZ5R29vZ2xlV29ya3NwYWNlLmdldCgpLnRoZW4oKHZhbHVlKSA9PiB7XHJcblx0XHR2YWx1ZSAmJiB2ZXJpZnlBbGwoZXZlbnRzKTtcclxuXHR9KTtcclxufVxyXG5cclxuY29uc3QgdGFibGVSb3dBdHRyaWJ1dGVOYW1lID0gJ2RhdGEtaGNiLXBsdWdpbi1yb3ctbnVtJztcclxuZnVuY3Rpb24gcHJvY2Vzc1RhYmxlKCkge1xyXG5cdHZhciByb3dzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUgdHInKSk7XHJcblx0dmFyIGRhdGEgPSBbXTtcclxuXHJcblx0Ly8gZ2V0IHJpZCBvZiB0YWJsZSBoZWFkaW5nXHJcblx0cm93cy5zaGlmdCgpO1xyXG5cclxuXHQvLyBwcm9jZXNzXHJcblx0Zm9yIChsZXQgW2luZGV4LCByb3ddIG9mIHJvd3MuZW50cmllcygpKSB7XHJcblx0XHR2YXIgY29scyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHRcdGRhdGEucHVzaCh7XHJcblx0XHRcdGV2ZW50TmFtZTogY29sc1swXS5maXJzdEVsZW1lbnRDaGlsZC5pbm5lclRleHQsXHJcblx0XHRcdGV2ZW50U2x1ZzogY29sc1swXS5maXJzdEVsZW1lbnRDaGlsZFsnaHJlZiddLFxyXG5cdFx0XHRkb21haW46IGNvbHNbMV0uaW5uZXJUZXh0LFxyXG5cdFx0XHRrZXk6IGNvbHNbMl0uaW5uZXJUZXh0LFxyXG5cdFx0XHRzdGF0dXM6IGNvbHNbM10uaW5uZXJUZXh0LFxyXG5cdFx0XHRkZWxldGVkOiByb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaGFkZS1yZWQnKSxcclxuXHRcdFx0cm93TnVtOiBpbmRleCxcclxuXHRcdH0pO1xyXG5cdFx0cm93LnNldEF0dHJpYnV0ZSh0YWJsZVJvd0F0dHJpYnV0ZU5hbWUsIGAke2luZGV4fWApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlcmlmeUFsbChldmVudHMpIHtcclxuXHR2YXIgbnVtVmVyaWZpZWQgPSAwO1xyXG5cclxuXHR2YXIgdmVyaWZ5RXJyb3JzID0ge307XHJcblx0dmFyIHZlcmlmeVByb21pc2VzID0gW107XHJcblx0Zm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XHJcblx0XHRpZiAoIWV2ZW50LmRlbGV0ZWQgJiYgZXZlbnQuc3RhdHVzID09PSAndmVyaWZ5aW5nJykge1xyXG5cdFx0XHRudW1WZXJpZmllZCsrO1xyXG5cclxuXHRcdFx0Y29uc3QgcHJvbWlzZSA9IHZlcmlmeShldmVudCk7XHJcblx0XHRcdHZlcmlmeVByb21pc2VzLnB1c2gocHJvbWlzZSk7XHJcblx0XHRcdHByb21pc2UuY2F0Y2goKHJlcykgPT4ge1xyXG5cdFx0XHRcdC8vIHRyYWNrIGVycm9yc1xyXG5cdFx0XHRcdHZlcmlmeUVycm9yc1tyZXMuc3RhdHVzXSA9IHJlcy5kYXRhO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIGRpc3BsYXkgdGhlIG51bWJlciBvZiBkb21haW5zIHNlbnQgdG8gRy1WZXJpZnkgb24gdGhpcyBwYWdlIGxvYWRcclxuXHRjb25zdCBkaXNwbGF5TnVtVmVyaWZpZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblx0ZGlzcGxheU51bVZlcmlmaWVkLmlubmVyVGV4dCA9IGBHLVZlcmlmeTogJHtudW1WZXJpZmllZH0gRG9tYWluc2A7XHJcblx0ZG9jdW1lbnRcclxuXHRcdC5xdWVyeVNlbGVjdG9yKCdtYWluJylcclxuXHRcdC5pbnNlcnRCZWZvcmUoZGlzcGxheU51bVZlcmlmaWVkLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpKTtcclxuXHJcblx0Ly8gYWxlcnQgdXNlcnMgb2YgZXJyb3JzIHRoYXQgaGF2ZSBidWlsdCB1cFxyXG5cclxuXHRQcm9taXNlLmFsbCh2ZXJpZnlQcm9taXNlcykuY2F0Y2goKCkgPT4ge1xyXG5cdFx0T2JqZWN0LmtleXModmVyaWZ5RXJyb3JzKS5mb3JFYWNoKChlcnIpID0+IHtcclxuXHRcdFx0c3dpdGNoIChlcnIpIHtcclxuXHRcdFx0XHRjYXNlICc0MDEnOlxyXG5cdFx0XHRcdFx0YWxlcnQoXHJcblx0XHRcdFx0XHRcdCdIYWNrIENsdWIgQmFuayBPcGVyYXRpb25zIFBsdWdpbjogVUggT0ghXFxuRy1WZXJpZnkgQXV0aGVudGljYXRpb24gS2V5IG5vdCBmb3VuZFxcblxcblBsZWFzZSB2aXNpdCB0aGUgcGx1Z2luIHNldHRpbmdzIHRvIHNldCB5b3VyIGF1dGhlbnRpY2F0aW9uIGtleS4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRcdGNhc2UgJzQwMyc6XHJcblx0XHRcdFx0XHRhbGVydChcclxuXHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wZXJhdGlvbnMgUGx1Z2luOiBVSCBPSCFcXG5JbnZhbGlkIEctVmVyaWZ5IEF1dGhlbnRpY2F0aW9uIEtleVxcblxcblBsZWFzZSB2aXNpdCB0aGUgcGx1Z2luIHNldHRpbmdzIHRvIGRvdWJsZSBjaGVjayB5b3VyIGF1dGhlbnRpY2F0aW9uIGtleS4gQ29udGFjdCBHYXJ5IGZvciBoZWxwISdcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdGFsZXJ0KFxyXG5cdFx0XHRcdFx0XHRgSGFjayBDbHViIEJhbmsgT3BlcmF0aW9ucyBQbHVnaW46IFVIIE9IIVxcbkctVmVyaWZ5IEVycm9yXFxuXFxuJHtKU09OLnN0cmluZ2lmeShcclxuXHRcdFx0XHRcdFx0XHR2ZXJpZnlFcnJvcnNbZXJyXVxyXG5cdFx0XHRcdFx0XHQpfWBcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cdGFzeW5jIGZ1bmN0aW9uIHZlcmlmeShldmVudCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0Y29uc3QgYXV0aEtleSA9IGF3YWl0IGdldEtleSgpO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHNldFJvd1N0YXR1cyhldmVudCwgJ2xvYWRpbmcnKTtcclxuXHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoXHJcblx0XHRcdFx0XHQnaHR0cHM6Ly9nLXZlcmlmeS5oZXJva3VhcHAuY29tL3ZlcmlmeS8nICsgZXZlbnQuZG9tYWluLFxyXG5cdFx0XHRcdFx0dHlwZW9mIGF1dGhLZXkgIT09ICd1bmRlZmluZWQnICYmIGF1dGhLZXkgIT09ICcnXHJcblx0XHRcdFx0XHRcdD8ge1xyXG5cdFx0XHRcdFx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRhdXRob3JpemF0aW9uOiBhd2FpdCBnZXRLZXkoKSxcclxuXHRcdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdCAgfVxyXG5cdFx0XHRcdFx0XHQ6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdHByaW50KHJlcy5kYXRhKTtcclxuXHRcdFx0XHRzZXRSb3dTdGF0dXMoZXZlbnQsICd2ZXJpZmllZCcpO1xyXG5cdFx0XHRcdHJlc29sdmUocmVzLmRhdGEpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRcdHByaW50KGVycm9yLnJlc3BvbnNlLmRhdGEpO1xyXG5cclxuXHRcdFx0XHQvLyA0MDAgZnJvbSBHLVZlcmlmeSAoYW5kIEdvb2dsZSkgbWVhbnMgdmVyaWZpY2F0aW9uIHRva2VuIHdhcyBub3QgZm91bmQgaW4gZG9tYWluIEROU1xyXG5cdFx0XHRcdC8vIChubyByZXF1ZXN0IGVycm9yKVxyXG5cdFx0XHRcdGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG5cdFx0XHRcdFx0c2V0Um93U3RhdHVzKFxyXG5cdFx0XHRcdFx0XHRldmVudCxcclxuXHRcdFx0XHRcdFx0J2ZhaWxlZCcsXHJcblx0XHRcdFx0XHRcdGVycm9yLnJlc3BvbnNlLmRhdGEuZXJyb3IubWVzc2FnZS5qb2luKCcgJylcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRyZXNvbHZlKGVycm9yLnJlc3BvbnNlLmRhdGEpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gaWYgdGhlcmUncyBlcnJvciwgYnV0IG5vdCA0MDAsIHRoZXJlJ3MgYW4gaXNzdWUhXHJcblx0XHRcdFx0c2V0Um93U3RhdHVzKGV2ZW50LCAnZmFpbGVkJywgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvcik7XHJcblx0XHRcdFx0cmV0dXJuIHJlamVjdChlcnJvci5yZXNwb25zZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGZ1bmN0aW9uIHByaW50KGRhdGEpIHtcclxuXHRcdFx0Ly8gY29uc29sZS5ncm91cChcIlZlcmlmeTogXCIgKyBldmVudC5kb21haW4pO1xyXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0Ly8gY29uc29sZS5ncm91cEVuZCgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Um93U3RhdHVzKGV2ZW50LCBzdGF0dXMsIG1lc3NhZ2UgPSB1bmRlZmluZWQpIHtcclxuXHRjb25zdCBzdGF0dXNJbmplY3RMb2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG5cdFx0YHRyWyR7dGFibGVSb3dBdHRyaWJ1dGVOYW1lfT1cIiR7ZXZlbnQucm93TnVtfVwiXWBcclxuXHQpLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuXHR2YXIgc3RhdHVzRGlzcGxheVRleHQgPSAnPHN0cm9uZz5HLVZlcmlmeTwvc3Ryb25nPjogJztcclxuXHRzd2l0Y2ggKHN0YXR1cykge1xyXG5cdFx0Y2FzZSAnbG9hZGluZyc6XHJcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdMT0FESU5HLi4uJztcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICd2ZXJpZmllZCc6XHJcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdTVUNDRVNTRlVMJztcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdmYWlsZWQnOlxyXG5cdFx0XHRzdGF0dXNEaXNwbGF5VGV4dCArPSAnRkFJTEVEJztcclxuXHRcdFx0YnJlYWs7XHJcblx0fVxyXG5cdG1lc3NhZ2UgJiYgKHN0YXR1c0Rpc3BsYXlUZXh0ICs9IGAgKCR7bWVzc2FnZX0pYCk7XHJcblxyXG5cdHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0Y29uc3QgdW5pcXVlSWQgPSBgaGNiLXBsdWdpbi1nb29nbGUtd29ya3NwYWNlLWctdmVyaWZ5LSR7ZXZlbnQuZG9tYWluLnJlcGxhY2UoXHJcblx0XHQvXFxXKyg/ISQpL2csXHJcblx0XHQnX0QtTy1UXydcclxuXHQpfWA7XHJcblx0dGVtcERpdi5pbm5lckhUTUwgPSBgPGRpdiBpZD1cIiR7dW5pcXVlSWR9XCI+JHtzdGF0dXNEaXNwbGF5VGV4dH08L2Rpdj5gO1xyXG5cdGNvbnN0IHByZWV4aXN0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3VuaXF1ZUlkfWApO1xyXG5cdHByZWV4aXN0aW5nRWxlbWVudCAmJiBwcmVleGlzdGluZ0VsZW1lbnQucmVtb3ZlKCk7XHJcblx0c3RhdHVzSW5qZWN0TG9jLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RFbGVtZW50Q2hpbGQpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBiYW5rVjFHb29nbGVXb3Jrc3BhY2U7XHJcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBnZXRLZXkgfSBmcm9tICcuLi9oZWxwZXJzL2ctdmVyaWZ5LWF1dGgnO1xuXG5hc3luYyBmdW5jdGlvbiBiYW5rVjFHb29nbGVXb3Jrc3BhY2VFZGl0KCkge1xuXHRwcm9jZXNzRG9tYWluKCk7XG5cblx0Ly8gbGlzdGVuIGZvciBjaGFuZ2VzIHRvIHRoZSBkb21haW4gZmllbGRcblx0Ly8gVE9ETzogd2F0Y2ggb3V0IGZvciB0b28gbWFueSByZXF1ZXN0cy9tYXggb3V0IGFwaSBsaW1pdFxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ19zdWl0ZV9kb21haW4nKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG5cdFx0cHJvY2Vzc0RvbWFpbigpO1xuXHR9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0RvbWFpbigpIHtcblx0Ly8gZ2V0IGRvbWFpbiBvZiBjdXJyZW50IEdvb2dsZSBXb3Jrc2FwY2Vcblx0Y29uc3QgZG9tYWluID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnX3N1aXRlX2RvbWFpbicpKVxuXHRcdC52YWx1ZTtcblxuXHQvLyBnZXQgdmVyaWZpY2F0aW9uIGtleSBmcm9tIGctdmVyaWZ5XG5cdGlmIChkb21haW4gIT09ICcnKSB7XG5cdFx0ZGlzcGxheVRva2VuKCdMT0FESU5HLi4uJyk7XG5cdFx0dmFyIGRvbWFpbktleSA9IChhd2FpdCBnZXRUb2tlbihkb21haW4pKS50b2tlbjtcblx0XHRkaXNwbGF5VG9rZW4oZG9tYWluS2V5KTtcblx0XHRjb25zb2xlLmxvZyhkb21haW4sIGRvbWFpbktleSk7XG5cdH0gZWxzZSB7XG5cdFx0ZGlzcGxheVRva2VuKCdOTyBET01BSU4nKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5VG9rZW4oZG9tYWluS2V5KSB7XG5cdHZhciBjb250ZW50ID0gYFxuXHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIiBpZD1cImdlbmVyYXRlZERvbWFpbktleVdyYXBwZXJcIj5cblx0XHQ8aDQ+VmVyaWZpY2F0aW9uIFRva2VuPC9oND5cblx0XHQ8cHJlIGlkPVwiZ2VuZXJhdGVkRG9tYWluS2V5XCIgb25jbGljaz1cIlxuXHRcdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCgnJHtkb21haW5LZXl9Jyk7XG5cdFx0XHR9KSgpO1xuXHRcdFx0XCJcblx0XHRcdHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCJcblx0XHQ+JHtkb21haW5LZXl9PC9wcmU+XG5cdDwvZGl2PlxuXHRgO1xuXG5cdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdC8vIHJlbW92ZSBwcmUtZXhpc3Rpbmdcblx0Y29uc3QgcHJlZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZ2VuZXJhdGVkRG9tYWluS2V5V3JhcHBlcmApO1xuXHRwcmVleGlzdGluZyAmJiBwcmVleGlzdGluZy5yZW1vdmUoKTtcblxuXHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRmb3JtLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdGRpc3BsYXlFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkLFxuXHRcdGZvcm0ubmV4dEVsZW1lbnRTaWJsaW5nXG5cdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRva2VuKGRvbWFpbikge1xuXHRyZXR1cm4gKFxuXHRcdGF3YWl0IGF4aW9zLmdldCgnaHR0cHM6Ly9nLXZlcmlmeS5oZXJva3VhcHAuY29tL3Rva2VuLycgKyBkb21haW4sIHtcblx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0YXV0aG9yaXphdGlvbjogYXdhaXQgZ2V0S2V5KCksXG5cdFx0XHR9LFxuXHRcdH0pXG5cdCkuZGF0YTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFua1YxR29vZ2xlV29ya3NwYWNlRWRpdDtcbiIsImZ1bmN0aW9uIGJhbmtWMVRyYW5zYWN0aW9uRWRpdCgpIHtcblx0Y29uc3Qgb3JpZ2luYWxOYW1lID0gZ2V0T3JpZ2luYWxOYW1lKCk7XG5cblx0cXVpY2tBc3NpZ25CdXR0b25zKCk7XG5cdGV4cGVuc2lmeVJlcG9ydChvcmlnaW5hbE5hbWUpO1xufVxuXG5mdW5jdGlvbiBnZXRPcmlnaW5hbE5hbWUoKTogU3RyaW5nIHtcblx0cmV0dXJuICg8SFRNTFByZUVsZW1lbnQ+KFxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWluZXIgPiBwcmUuYmctc21va2UubXQwJylcblx0KSkuaW5uZXJUZXh0O1xufVxuXG5mdW5jdGlvbiBxdWlja0Fzc2lnbkJ1dHRvbnMoKSB7XG5cdGNvbnN0IG9wdGlvbnMgPSBbXG5cdFx0e1xuXHRcdFx0bmFtZTogJ0hRJyxcblx0XHRcdGV2ZW50SWQ6IDE4Myxcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdCYW5rJyxcblx0XHRcdGV2ZW50SWQ6IDYzNixcblx0XHR9LFxuXHRcdHtcblx0XHRcdG5hbWU6ICdOb3QgZXZlbnQtcmVsYXRlZCcsXG5cdFx0XHRldmVudElkOiBudWxsLFxuXHRcdH0sXG5cdF07XG5cblx0Ly8gaW5qZWN0IHJldXNlYWJsZSBhc3NpZ24gc2NyaXB0XG5cdHZhciBzY3JpcHRJbmplY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0c2NyaXB0SW5qZWN0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0Jztcblx0c2NyaXB0SW5qZWN0LmlubmVyVGV4dCA9IGBcblx0XHRmdW5jdGlvbiBhc3NpZ24oZXZlbnQpe1xuXHRcdFx0aWYoZXZlbnQgIT09IG51bGwpIHtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc2FjdGlvbl9pc19ldmVudF9yZWxhdGVkXCIpLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyYW5zYWN0aW9uX2ZlZV9yZWxhdGlvbnNoaXBfYXR0cmlidXRlc19ldmVudF9pZCA+IG9wdGlvblt2YWx1ZT0nXCIgKyBldmVudCArIFwiJ11cIikuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc2FjdGlvbl9pc19ldmVudF9yZWxhdGVkXCIpLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0cmFuc2FjdGlvbl9mZWVfcmVsYXRpb25zaGlwX2F0dHJpYnV0ZXNfZXZlbnRfaWQgPiBvcHRpb25cIikuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0YDtcblx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRJbmplY3QpO1xuXG5cdC8vIGJ1aWxkIGluamVjdGVkIGJ1dHRvbnNcblx0dmFyIGNvbnRlbnQgPSBgXG5cdDxkaXYgY2xhc3M9XCJoY2ItcGx1Z2luLXRvb2xzIG10M1wiPlxuXHRcdDxkaXYgY2xhc3M9XCJidG4tZ3JvdXAgY2VudGVyXCI+YDtcblx0b3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcblx0XHRjb250ZW50ICs9IGBcblx0XHRcdDxzcGFuIGNsYXNzPVwiYnRuIGJnLWFjY2VudFwiXG5cdFx0XHRcdG9uQ2xpY2s9XCJhc3NpZ24oJHtvcHRpb24uZXZlbnRJZH0pXCJcblx0XHRcdD4ke29wdGlvbi5uYW1lfTwvc3Bhbj5cblx0XHRgO1xuXHR9KTtcblx0Y29udGVudCArPSBgPC9kaXY+PC9kaXY+YDtcblxuXHQvLyBpbmplY3QgdGhlIGJ1dHRvbnNcblx0dmFyIGRpc3BsYXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpc3BsYXlFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhaW5lciA+IGgxJykucGFyZW50RWxlbWVudDtcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpc3BsYXlFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cblxuZnVuY3Rpb24gZXhwZW5zaWZ5UmVwb3J0KG9yaWdpbmFsTmFtZTogU3RyaW5nKSB7XG5cdGNvbnN0IHJlZ2V4TWF0Y2ggPSBvcmlnaW5hbE5hbWUubWF0Y2goL0V4cGVuc2lmeSBSKFxcZCopIFRoZSBIYWNrIEZvdW5kYXRpb24vKTtcblxuXHRpZiAocmVnZXhNYXRjaCkge1xuXHRcdGNvbnNvbGUubG9nKCdUaGlzIGlzIGFuIEV4cGVuc2lmeSBSZXBvcnQgd2l0aCBpZCAnICsgcmVnZXhNYXRjaFsxXSk7XG5cdFx0Y29uc3QgZXhwZW5zaWZ5UmVwb3J0VXJsID0gYGh0dHBzOi8vd3d3LmV4cGVuc2lmeS5jb20vcmVwb3J0P3BhcmFtPXslMjJwYWdlUmVwb3J0SUQlMjI6JTIyJHtyZWdleE1hdGNoWzFdfSUyMiwlMjJrZWVwQ29sbGVjdGlvbiUyMjp0cnVlfWA7XG5cblx0XHR2YXIgY29udGVudCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIj5cblx0XHRcdDxwPlZpc2l0XG5cdFx0XHRcdDxhIGhyZWY9XCIke2V4cGVuc2lmeVJlcG9ydFVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5FeHBlbnNpZnkgUmVwb3J0ICgke3JlZ2V4TWF0Y2hbMV19KTwvYT4uXG5cdFx0XHQ8L3A+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpc3BsYXlFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0XHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyID4gaDEnKS5wYXJlbnRFbGVtZW50O1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXNwbGF5RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFua1YxVHJhbnNhY3Rpb25FZGl0O1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgZ2V0S2V5IH0gZnJvbSAnLi4vaGVscGVycy9nLXZlcmlmeS1hdXRoJztcclxuaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi4vaGVscGVycy9vcHRpb25zJztcclxuXHJcbmZ1bmN0aW9uIGJhbmtWMUdvb2dsZVdvcmtzcGFjZSgpIHtcclxuXHRjb25zdCBldmVudHMgPSBwcm9jZXNzVGFibGUoKTtcclxuXHRjb25zb2xlLmxvZyhldmVudHMpO1xyXG5cclxuXHRvcHRpb25zLmJhbmtBdXRvVmVyaWZ5R29vZ2xlV29ya3NwYWNlLmdldCgpLnRoZW4oKHZhbHVlKSA9PiB7XHJcblx0XHR2YWx1ZSAmJiB2ZXJpZnlBbGwoZXZlbnRzKTtcclxuXHR9KTtcclxufVxyXG5cclxuY29uc3QgdGFibGVSb3dBdHRyaWJ1dGVOYW1lID0gJ2RhdGEtaGNiLXBsdWdpbi1yb3ctbnVtJztcclxuZnVuY3Rpb24gcHJvY2Vzc1RhYmxlKCkge1xyXG5cdHZhciByb3dzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndGFibGUgdHInKSk7XHJcblx0dmFyIGRhdGEgPSBbXTtcclxuXHJcblx0Ly8gZ2V0IHJpZCBvZiB0YWJsZSBoZWFkaW5nXHJcblx0cm93cy5zaGlmdCgpO1xyXG5cclxuXHQvLyBwcm9jZXNzXHJcblx0Zm9yIChsZXQgW2luZGV4LCByb3ddIG9mIHJvd3MuZW50cmllcygpKSB7XHJcblx0XHR2YXIgY29scyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpKTtcclxuXHRcdGNvbnN0IHByb2Nlc3NlZE5hbWUgPSAoPHN0cmluZz5jb2xzWzJdLmZpcnN0RWxlbWVudENoaWxkLmlubmVyVGV4dCkubWF0Y2goXHJcblx0XHRcdC9eKC4qKT86XFxzKFteOl0qKSQvXHJcblx0XHQpO1xyXG5cclxuXHRcdGRhdGEucHVzaCh7XHJcblx0XHRcdGlkOiBjb2xzWzBdLmlubmVyVGV4dCxcclxuXHRcdFx0ZGF0ZTogY29sc1sxXS5pbm5lclRleHQsXHJcblx0XHRcdGV2ZW50TmFtZTogcHJvY2Vzc2VkTmFtZVsxXSxcclxuXHRcdFx0ZG9tYWluOiBwcm9jZXNzZWROYW1lWzJdLFxyXG5cdFx0XHRldmVudFNsdWc6IGNvbHNbMl0uZmlyc3RFbGVtZW50Q2hpbGRbJ2hyZWYnXSxcclxuXHRcdFx0b3VJZDogY29sc1szXS5pbm5lclRleHQsXHJcblx0XHRcdG91UGF0aDogY29sc1s0XS5pbm5lclRleHQsXHJcblx0XHRcdGtleTogY29sc1s1XS5pbm5lclRleHQsXHJcblx0XHRcdHN0YXR1czogY29sc1s2XS5pbm5lclRleHQsXHJcblx0XHRcdGRlbGV0ZWQ6IHJvdy5zdHlsZS5iYWNrZ3JvdW5kID09PSAnI2ZmY2NjYycsXHJcblx0XHRcdHJvd051bTogaW5kZXgsXHJcblx0XHR9KTtcclxuXHRcdHJvdy5zZXRBdHRyaWJ1dGUodGFibGVSb3dBdHRyaWJ1dGVOYW1lLCBgJHtpbmRleH1gKTtcclxuXHR9XHJcblx0Y29uc29sZS5sb2coZGF0YSk7XHJcblxyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZXJpZnlBbGwoZXZlbnRzKSB7XHJcblx0dmFyIG51bVZlcmlmaWVkID0gMDtcclxuXHJcblx0dmFyIHZlcmlmeUVycm9ycyA9IHt9O1xyXG5cdHZhciB2ZXJpZnlQcm9taXNlcyA9IFtdO1xyXG5cdGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xyXG5cdFx0aWYgKCFldmVudC5kZWxldGVkICYmIGV2ZW50LnN0YXR1cyA9PT0gJ1ZFUklGWUlORycpIHtcclxuXHRcdFx0bnVtVmVyaWZpZWQrKztcclxuXHJcblx0XHRcdGNvbnN0IHByb21pc2UgPSB2ZXJpZnkoZXZlbnQpO1xyXG5cdFx0XHR2ZXJpZnlQcm9taXNlcy5wdXNoKHByb21pc2UpO1xyXG5cdFx0XHRwcm9taXNlLmNhdGNoKChyZXMpID0+IHtcclxuXHRcdFx0XHQvLyBUT0RPOiB0cmFjayBlcnJvcnNcclxuXHRcdFx0XHR2ZXJpZnlFcnJvcnNbcmVzLnN0YXR1c10gPSByZXMuZGF0YTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBkaXNwbGF5IHRoZSBudW1iZXIgb2YgZG9tYWlucyBzZW50IHRvIEctVmVyaWZ5IG9uIHRoaXMgcGFnZSBsb2FkXHJcblx0Y29uc3QgZGlzcGxheU51bVZlcmlmaWVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5cdGRpc3BsYXlOdW1WZXJpZmllZC5pbm5lclRleHQgPSBgRy1WZXJpZnk6ICR7bnVtVmVyaWZpZWR9IERvbWFpbnNgO1xyXG5cdGRvY3VtZW50XHJcblx0XHQucXVlcnlTZWxlY3RvcignYm9keScpXHJcblx0XHQuaW5zZXJ0QmVmb3JlKFxyXG5cdFx0XHRkaXNwbGF5TnVtVmVyaWZpZWQsXHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykubmV4dEVsZW1lbnRTaWJsaW5nXHJcblx0XHQpO1xyXG5cclxuXHQvLyBhbGVydCB1c2VycyBvZiBlcnJvcnMgdGhhdCBoYXZlIGJ1aWx0IHVwXHJcblxyXG5cdFByb21pc2UuYWxsKHZlcmlmeVByb21pc2VzKS5jYXRjaCgoKSA9PiB7XHJcblx0XHRPYmplY3Qua2V5cyh2ZXJpZnlFcnJvcnMpLmZvckVhY2goKGVycikgPT4ge1xyXG5cdFx0XHRzd2l0Y2ggKGVycikge1xyXG5cdFx0XHRcdGNhc2UgJzQwMSc6XHJcblx0XHRcdFx0XHRhbGVydChcclxuXHRcdFx0XHRcdFx0J0hhY2sgQ2x1YiBCYW5rIE9wZXJhdGlvbnMgUGx1Z2luOiBVSCBPSCFcXG5HLVZlcmlmeSBBdXRoZW50aWNhdGlvbiBLZXkgbm90IGZvdW5kXFxuXFxuUGxlYXNlIHZpc2l0IHRoZSBwbHVnaW4gc2V0dGluZ3MgdG8gc2V0IHlvdXIgYXV0aGVudGljYXRpb24ga2V5LidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdFx0Y2FzZSAnNDAzJzpcclxuXHRcdFx0XHRcdGFsZXJ0KFxyXG5cdFx0XHRcdFx0XHQnSGFjayBDbHViIEJhbmsgT3BlcmF0aW9ucyBQbHVnaW46IFVIIE9IIVxcbkludmFsaWQgRy1WZXJpZnkgQXV0aGVudGljYXRpb24gS2V5XFxuXFxuUGxlYXNlIHZpc2l0IHRoZSBwbHVnaW4gc2V0dGluZ3MgdG8gZG91YmxlIGNoZWNrIHlvdXIgYXV0aGVudGljYXRpb24ga2V5LiBDb250YWN0IEdhcnkgZm9yIGhlbHAhJ1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0YWxlcnQoXHJcblx0XHRcdFx0XHRcdGBIYWNrIENsdWIgQmFuayBPcGVyYXRpb25zIFBsdWdpbjogVUggT0ghXFxuRy1WZXJpZnkgRXJyb3JcXG5cXG4ke0pTT04uc3RyaW5naWZ5KFxyXG5cdFx0XHRcdFx0XHRcdHZlcmlmeUVycm9yc1tlcnJdXHJcblx0XHRcdFx0XHRcdCl9YFxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcblx0YXN5bmMgZnVuY3Rpb24gdmVyaWZ5KGV2ZW50KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRjb25zdCBhdXRoS2V5ID0gYXdhaXQgZ2V0S2V5KCk7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0c2V0Um93U3RhdHVzKGV2ZW50LCAnbG9hZGluZycpO1xyXG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChcclxuXHRcdFx0XHRcdCdodHRwczovL2ctdmVyaWZ5Lmhlcm9rdWFwcC5jb20vdmVyaWZ5LycgKyBldmVudC5kb21haW4sXHJcblx0XHRcdFx0XHR0eXBlb2YgYXV0aEtleSAhPT0gJ3VuZGVmaW5lZCcgJiYgYXV0aEtleSAhPT0gJydcclxuXHRcdFx0XHRcdFx0PyB7XHJcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGF1dGhvcml6YXRpb246IGF3YWl0IGdldEtleSgpLFxyXG5cdFx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0ICB9XHJcblx0XHRcdFx0XHRcdDogbnVsbFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0cHJpbnQocmVzLmRhdGEpO1xyXG5cdFx0XHRcdHNldFJvd1N0YXR1cyhldmVudCwgJ3ZlcmlmaWVkJyk7XHJcblx0XHRcdFx0cmVzb2x2ZShyZXMuZGF0YSk7XHJcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdFx0cHJpbnQoZXJyb3IucmVzcG9uc2UuZGF0YSk7XHJcblxyXG5cdFx0XHRcdC8vIDQwMCBmcm9tIEctVmVyaWZ5IChhbmQgR29vZ2xlKSBtZWFucyB2ZXJpZmljYXRpb24gdG9rZW4gd2FzIG5vdCBmb3VuZCBpbiBkb21haW4gRE5TXHJcblx0XHRcdFx0Ly8gKG5vIHJlcXVlc3QgZXJyb3IpXHJcblx0XHRcdFx0aWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XHJcblx0XHRcdFx0XHRzZXRSb3dTdGF0dXMoXHJcblx0XHRcdFx0XHRcdGV2ZW50LFxyXG5cdFx0XHRcdFx0XHQnZmFpbGVkJyxcclxuXHRcdFx0XHRcdFx0ZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvci5tZXNzYWdlLmpvaW4oJyAnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdHJlc29sdmUoZXJyb3IucmVzcG9uc2UuZGF0YSk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBpZiB0aGVyZSdzIGVycm9yLCBidXQgbm90IDQwMCwgdGhlcmUncyBhbiBpc3N1ZSFcclxuXHRcdFx0XHRzZXRSb3dTdGF0dXMoZXZlbnQsICdmYWlsZWQnLCBlcnJvci5yZXNwb25zZS5kYXRhLmVycm9yKTtcclxuXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycm9yLnJlc3BvbnNlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZnVuY3Rpb24gcHJpbnQoZGF0YSkge1xyXG5cdFx0XHQvLyBjb25zb2xlLmdyb3VwKFwiVmVyaWZ5OiBcIiArIGV2ZW50LmRvbWFpbik7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHQvLyBjb25zb2xlLmdyb3VwRW5kKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRSb3dTdGF0dXMoZXZlbnQsIHN0YXR1cywgbWVzc2FnZSA9IHVuZGVmaW5lZCkge1xyXG5cdGNvbnN0IHN0YXR1c0luamVjdExvYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcblx0XHRgdHJbJHt0YWJsZVJvd0F0dHJpYnV0ZU5hbWV9PVwiJHtldmVudC5yb3dOdW19XCJdYFxyXG5cdCkuY2hpbGRyZW5bMl07XHJcblxyXG5cdHZhciBzdGF0dXNEaXNwbGF5VGV4dCA9ICc8c3Ryb25nPkctVmVyaWZ5PC9zdHJvbmc+OiAnO1xyXG5cdHN3aXRjaCAoc3RhdHVzKSB7XHJcblx0XHRjYXNlICdsb2FkaW5nJzpcclxuXHRcdFx0c3RhdHVzRGlzcGxheVRleHQgKz0gJ0xPQURJTkcuLi4nO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ3ZlcmlmaWVkJzpcclxuXHRcdFx0c3RhdHVzRGlzcGxheVRleHQgKz0gJ1NVQ0NFU1NGVUwnO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ2ZhaWxlZCc6XHJcblx0XHRcdHN0YXR1c0Rpc3BsYXlUZXh0ICs9ICdGQUlMRUQnO1xyXG5cdFx0XHRicmVhaztcclxuXHR9XHJcblx0bWVzc2FnZSAmJiAoc3RhdHVzRGlzcGxheVRleHQgKz0gYCA8c21hbGw+KCR7bWVzc2FnZX0pPC9zbWFsbD5gKTtcclxuXHJcblx0dmFyIHRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRjb25zdCB1bmlxdWVJZCA9IGBoY2ItcGx1Z2luLWdvb2dsZS13b3Jrc3BhY2UtZy12ZXJpZnktJHtldmVudC5pZH1gO1xyXG5cdC8vIGNvbnN0IHVuaXF1ZUlkID0gYGhjYi1wbHVnaW4tZ29vZ2xlLXdvcmtzcGFjZS1nLXZlcmlmeS0ke2V2ZW50LmRvbWFpbi5yZXBsYWNlKFxyXG5cdC8vIFx0L1xcVysoPyEkKS9nLFxyXG5cdC8vIFx0J19ELU8tVF8nXHJcblx0Ly8gKX1gO1xyXG5cdHRlbXBEaXYuaW5uZXJIVE1MID0gYDxkaXYgaWQ9XCIke3VuaXF1ZUlkfVwiPiR7c3RhdHVzRGlzcGxheVRleHR9PC9kaXY+YDtcclxuXHRjb25zdCBwcmVleGlzdGluZ0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt1bmlxdWVJZH1gKTtcclxuXHRwcmVleGlzdGluZ0VsZW1lbnQgJiYgcHJlZXhpc3RpbmdFbGVtZW50LnJlbW92ZSgpO1xyXG5cdHN0YXR1c0luamVjdExvYy5hcHBlbmRDaGlsZCh0ZW1wRGl2LmZpcnN0RWxlbWVudENoaWxkKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYmFua1YxR29vZ2xlV29ya3NwYWNlO1xyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgZ2V0S2V5IH0gZnJvbSAnLi4vaGVscGVycy9nLXZlcmlmeS1hdXRoJztcblxuYXN5bmMgZnVuY3Rpb24gYmFua1YyR29vZ2xlV29ya3NwYWNlRWRpdCgpIHtcblx0cHJvY2Vzc0RvbWFpbigpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzRG9tYWluKCkge1xuXHRjb25zdCBkZXRhaWxzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuXG5cdC8vIGdldCBkb21haW4gb2YgY3VycmVudCBHb29nbGUgV29ya3NhcGNlXG5cdHZhciBkZXRhaWxzID0ge1xuXHRcdG5hbWU6ICcnLFxuXHRcdGRvbWFpbjogJycsXG5cdFx0a2V5OiAnJyxcblx0XHRvdUlkOiAnJyxcblx0XHRvdVBhdGg6ICcnLFxuXHR9O1xuXHRmb3IgKGxldCBpdGVtIG9mIGRldGFpbHNUYWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0cicpKSB7XG5cdFx0Y29uc3QgcGFpcnMgPSA8QXJyYXk8SFRNTFRhYmxlQ2VsbEVsZW1lbnQ+Pihcblx0XHRcdEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgndGQnKSlcblx0XHQpO1xuXG5cdFx0Ly8gZmlyc3QgdGRcblx0XHRjb25zdCBuYW1lID0gcGFpcnNbMF0uaW5uZXJUZXh0O1xuXHRcdGNvbnN0IGRhdGEgPSBwYWlyc1sxXS5pbm5lclRleHQ7XG5cdFx0c3dpdGNoIChuYW1lLnRyaW0oKSkge1xuXHRcdFx0Y2FzZSAnRXZlbnQ6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm5hbWUgPSBkYXRhO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgJ0RvbWFpbjonOiB7XG5cdFx0XHRcdGRldGFpbHMuZG9tYWluID0gZGF0YTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlICdWZXJpZmljYXRvbiBLZXk6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLmtleSA9IGRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSAnT1UgSUQ6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm91SWQgPSBkYXRhO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgJ09VIFBhdGg6Jzoge1xuXHRcdFx0XHRkZXRhaWxzLm91UGF0aCA9IGRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGdldCB2ZXJpZmljYXRpb24ga2V5IGZyb20gZy12ZXJpZnlcblx0aWYgKGRldGFpbHMuZG9tYWluICE9PSAnJykge1xuXHRcdGRpc3BsYXlUb2tlbignTE9BRElORy4uLicpO1xuXHRcdHZhciBkb21haW5LZXkgPSAoYXdhaXQgZ2V0VG9rZW4oZGV0YWlscy5kb21haW4udHJpbSgpKSkudG9rZW47XG5cdFx0ZGlzcGxheVRva2VuKGRvbWFpbktleSk7XG5cdFx0Y29uc29sZS5sb2coZGV0YWlscy5kb21haW4sIGRvbWFpbktleSk7XG5cdH0gZWxzZSB7XG5cdFx0ZGlzcGxheVRva2VuKCdOTyBET01BSU4nKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBkaXNwbGF5VG9rZW4oZG9tYWluS2V5KSB7XG5cdHZhciBjb250ZW50ID0gYFxuXHQ8ZGl2IGNsYXNzPVwiaGNiLXBsdWdpbi10b29scyBtdDNcIiBpZD1cImdlbmVyYXRlZERvbWFpbktleVdyYXBwZXJcIj5cblx0XHQ8aDQ+VmVyaWZpY2F0aW9uIFRva2VuPC9oND5cblx0XHQ8cHJlIGlkPVwiZ2VuZXJhdGVkRG9tYWluS2V5XCIgb25jbGljaz1cIlxuXHRcdFx0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCgnJHtkb21haW5LZXl9Jyk7XG5cdFx0XHR9KSgpO1xuXHRcdFx0XCJcblx0XHRcdHN0eWxlPVwiY3Vyc29yOiBwb2ludGVyXCJcblx0XHQ+JHtkb21haW5LZXl9PC9wcmU+XG5cdDwvZGl2PlxuXHRgO1xuXG5cdHZhciBkaXNwbGF5RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXNwbGF5RWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG5cdC8vIHJlbW92ZSBwcmUtZXhpc3Rpbmdcblx0Y29uc3QgcHJlZXhpc3RpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZ2VuZXJhdGVkRG9tYWluS2V5V3JhcHBlcmApO1xuXHRwcmVleGlzdGluZyAmJiBwcmVleGlzdGluZy5yZW1vdmUoKTtcblxuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpc3BsYXlFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW4oZG9tYWluKSB7XG5cdHJldHVybiAoXG5cdFx0YXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL2ctdmVyaWZ5Lmhlcm9rdWFwcC5jb20vdG9rZW4vJyArIGRvbWFpbiwge1xuXHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRhdXRob3JpemF0aW9uOiBhd2FpdCBnZXRLZXkoKSxcblx0XHRcdH0sXG5cdFx0fSlcblx0KS5kYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYW5rVjJHb29nbGVXb3Jrc3BhY2VFZGl0O1xuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZnVuY3Rpb24gYmFua1YyVHJhbnNhY3Rpb25FZGl0KCkge1xuXHRjb25zdCByYXdOYW1lID0gZ2V0UmF3TmFtZSgpO1xuXG5cdC8vIHF1aWNrQXNzaWduQnV0dG9ucygpO1xuXHRpZiAocmF3TmFtZSAhPT0gbnVsbCkge1xuXHRcdGV4cGVuc2lmeVJlcG9ydChyYXdOYW1lKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRSYXdOYW1lKCkge1xuXHRjb25zdCBwYXJhZ3JhcGhzID0gPEFycmF5PEhUTUxQYXJhZ3JhcGhFbGVtZW50Pj4oXG5cdFx0QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgncCcpKVxuXHQpO1xuXG5cdHZhciByYXdQbGFpZFRyYW5zYWN0aW9uOiBBcnJheTxOb2RlPjtcblx0cGFyYWdyYXBocy5mb3JFYWNoKChwKSA9PiB7XG5cdFx0aWYgKHAuaW5uZXJUZXh0ID09PSAnUmF3UGxhaWRUcmFuc2FjdGlvbicpIHtcblx0XHRcdHJhd1BsYWlkVHJhbnNhY3Rpb24gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcblx0XHRcdFx0cC5uZXh0RWxlbWVudFNpYmxpbmcuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGROb2Rlc1xuXHRcdFx0KTtcblx0XHR9XG5cdH0pO1xuXHRpZiAodHlwZW9mIHJhd1BsYWlkVHJhbnNhY3Rpb24gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcblxuXHR2YXIgbmFtZUVsZW1lbnQ6IE5vZGU7XG5cdHJhd1BsYWlkVHJhbnNhY3Rpb24uZm9yRWFjaCgoZSkgPT4ge1xuXHRcdGlmIChlLm5vZGVUeXBlID09PSAzICYmIGUubm9kZVZhbHVlLnN1YnN0cmluZygxKS50cmltKCkgPT09ICdcIm5hbWVcIicpIHtcblx0XHRcdG5hbWVFbGVtZW50ID0gZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAodHlwZW9mIG5hbWVFbGVtZW50ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIG51bGw7XG5cblx0Y29uc3QgbmFtZVZhbHVlID0gKDxIVE1MRWxlbWVudD5uYW1lRWxlbWVudC5uZXh0U2libGluZy5uZXh0U2libGluZylcblx0XHQuaW5uZXJIVE1MO1xuXG5cdHJldHVybiBuYW1lVmFsdWU7XG59XG5cbmZ1bmN0aW9uIHF1aWNrQXNzaWduQnV0dG9ucygpIHtcblx0Y29uc3Qgb3B0aW9ucyA9IFtcblx0XHR7XG5cdFx0XHRuYW1lOiAnSFEnLFxuXHRcdFx0ZXZlbnRJZDogMTgzLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ0JhbmsnLFxuXHRcdFx0ZXZlbnRJZDogNjM2LFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ05vdCBldmVudC1yZWxhdGVkJyxcblx0XHRcdGV2ZW50SWQ6IG51bGwsXG5cdFx0fSxcblx0XTtcblxuXHQvLyBpbmplY3QgcmV1c2VhYmxlIGFzc2lnbiBzY3JpcHRcblx0dmFyIHNjcmlwdEluamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRzY3JpcHRJbmplY3QudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuXHRzY3JpcHRJbmplY3QuaW5uZXJUZXh0ID0gYFxuXHRcdGZ1bmN0aW9uIGFzc2lnbihldmVudCl7XG5cdFx0XHRpZihldmVudCAhPT0gbnVsbCkge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyYW5zYWN0aW9uX2lzX2V2ZW50X3JlbGF0ZWRcIikuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdHJhbnNhY3Rpb25fZmVlX3JlbGF0aW9uc2hpcF9hdHRyaWJ1dGVzX2V2ZW50X2lkID4gb3B0aW9uW3ZhbHVlPSdcIiArIGV2ZW50ICsgXCInXVwiKS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyYW5zYWN0aW9uX2lzX2V2ZW50X3JlbGF0ZWRcIikuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyYW5zYWN0aW9uX2ZlZV9yZWxhdGlvbnNoaXBfYXR0cmlidXRlc19ldmVudF9pZCA+IG9wdGlvblwiKS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRgO1xuXHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEluamVjdCk7XG5cblx0Ly8gYnVpbGQgaW5qZWN0ZWQgYnV0dG9uc1xuXHR2YXIgY29udGVudCA9IGBcblx0PGRpdiBjbGFzcz1cImhjYi1wbHVnaW4tdG9vbHMgbXQzXCI+XG5cdFx0PGRpdiBjbGFzcz1cImJ0bi1ncm91cCBjZW50ZXJcIj5gO1xuXHRvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuXHRcdGNvbnRlbnQgKz0gYFxuXHRcdFx0PHNwYW4gY2xhc3M9XCJidG4gYmctYWNjZW50XCJcblx0XHRcdFx0b25DbGljaz1cImFzc2lnbigke29wdGlvbi5ldmVudElkfSlcIlxuXHRcdFx0PiR7b3B0aW9uLm5hbWV9PC9zcGFuPlxuXHRcdGA7XG5cdH0pO1xuXHRjb250ZW50ICs9IGA8L2Rpdj48L2Rpdj5gO1xuXG5cdC8vIGluamVjdCB0aGUgYnV0dG9uc1xuXHR2YXIgZGlzcGxheUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGlzcGxheUVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcblxuXHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyID4gaDEnKS5wYXJlbnRFbGVtZW50O1xuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGlzcGxheUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpO1xufVxuXG5mdW5jdGlvbiBleHBlbnNpZnlSZXBvcnQob3JpZ2luYWxOYW1lOiBTdHJpbmcpIHtcblx0Y29uc3QgcmVnZXhNYXRjaCA9IG9yaWdpbmFsTmFtZS5tYXRjaCgvRXhwZW5zaWZ5IFIoXFxkKikgVGhlIEhhY2sgRm91bmRhdGlvbi8pO1xuXG5cdGlmIChyZWdleE1hdGNoID09PSBudWxsKSByZXR1cm47XG5cblx0Y29uc29sZS5sb2coJ1RoaXMgaXMgYW4gRXhwZW5zaWZ5IFJlcG9ydCB3aXRoIGlkICcgKyByZWdleE1hdGNoWzFdKTtcblx0Y29uc3QgZXhwZW5zaWZ5UmVwb3J0VXJsID0gYGh0dHBzOi8vd3d3LmV4cGVuc2lmeS5jb20vcmVwb3J0P3BhcmFtPXslMjJwYWdlUmVwb3J0SUQlMjI6JTIyJHtyZWdleE1hdGNoWzFdfSUyMiwlMjJrZWVwQ29sbGVjdGlvbiUyMjp0cnVlfWA7XG5cblx0dmFyIGNvbnRlbnQgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImhjYi1wbHVnaW4tdG9vbHMgbXQzXCI+XG5cdFx0XHQ8cD5WaXNpdFxuXHRcdFx0XHQ8YSBocmVmPVwiJHtleHBlbnNpZnlSZXBvcnRVcmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+RXhwZW5zaWZ5IFJlcG9ydCAoJHtyZWdleE1hdGNoWzFdfSk8L2E+LlxuXHRcdFx0PC9wPlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0dmFyIGRpc3BsYXlFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpc3BsYXlFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cblx0Y29uc3QgdHhEZXRhaWxzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0YWJsZScpO1xuXHR0eERldGFpbHNUYWJsZS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShcblx0XHRkaXNwbGF5RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCxcblx0XHR0eERldGFpbHNUYWJsZS5uZXh0U2libGluZ1xuXHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYW5rVjJUcmFuc2FjdGlvbkVkaXQ7XG4iLCJmdW5jdGlvbiBleHBlbnNpZnlSZXBvcnQoKSB7XG5cdGxpbmtCYW5rUHJvamVjdFNlYXJjaCgpO1xufVxuZnVuY3Rpb24gbGlua0JhbmtQcm9qZWN0U2VhcmNoKCkge1xuXHRjb25zdCBpbmplY3RTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0aW5qZWN0U2NyaXB0LmlubmVyVGV4dCA9IGBcblx0ZnVuY3Rpb24gaW5qZWN0KCkge1xuXHRcdGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcblx0XHRcdGNvbnN0IGRpc3BsYXlMb2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XHRcIiNyZXBvcnRfaW52b2ljZV9kYXRlc19jb250YWluZXJcIlxuXHRcdFx0XHQpO1xuXHRcdFx0XHRpZiAoZGlzcGxheUxvYyA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0Y29uc3QgcG9saWN5TmFtZSA9IFBvbGljeS5nZXRDdXJyZW50KCkucG9saWN5Lm5hbWU7XG5cdFx0XHRcblx0XHRcdGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlua1RvSENCU2VhcmNoXCIpID09PSBudWxsKSB7XG5cdFx0XHRcdGNvbnN0IGRpc3BsYXlFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0ZGlzcGxheUVsZW0uY2xhc3NMaXN0LmFkZChcImhjYi1wbHVnaW4tdG9vbHNcIik7XG5cdFx0XHRcdGRpc3BsYXlFbGVtLmlkID0gXCJsaW5rVG9IQ0JTZWFyY2hcIjtcblx0XHRcdFx0ZGlzcGxheUVsZW0uaW5uZXJIVE1MID0gXFxgXG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHRTZWFyY2ggZm9yXG5cdFx0XHRcdFx0XHQ8YSBocmVmPSdodHRwczovL2JhbmsuaGFja2NsdWIuY29tL2V2ZW50cz9uYW1lPVxcYCArIHBvbGljeU5hbWUgKyBcXGAnIHRhcmdldD0nX2JsYW5rJz5cXGAgKyBwb2xpY3lOYW1lICsgXFxgPC9hPlxuXHRcdFx0XHRcdFx0b24gSGFjayBDbHViIEJhbmsuXG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcXGA7XG5cdFx0XHRcdGRpc3BsYXlMb2MuYXBwZW5kQ2hpbGQoZGlzcGxheUVsZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHRvYnNlcnZlci5kaXNjb25uZWN0KCk7XG5cdFx0fSk7XG5cblx0XHRvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcblx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdHN1YnRyZWU6IHRydWUsXG5cdFx0XHRhdHRyaWJ1dGVzOiBmYWxzZSxcblx0XHRcdGNoYXJhY3RlckRhdGE6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cdGluamVjdCgpO1xuXHRgO1xuXHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGluamVjdFNjcmlwdCk7XG59XG5leHBvcnQgZGVmYXVsdCBleHBlbnNpZnlSZXBvcnQ7XG4iLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9oZWxwZXJzL29wdGlvbnMnO1xyXG5cclxuY29uc3QgREVGQVVMVF9QQVlfRlJPTV9BQ0NPVU5UID0gJ0Zpc2NhbCBTcG9uc29yc2hpcCAyIC0gTmV3JztcclxuXHJcbmZ1bmN0aW9uIHN2YlBheUJpbGxBZGRJbmRpdkhhdmVCYW5rKCkge1xyXG5cdG9wdGlvbnMuc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmsuZ2V0KCkudGhlbigodmFsdWUpID0+IHtcclxuXHRcdGlmICghdmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENsaWNrIG9uIHRoZSBcIkkgaGF2ZSB0aGUgYmFuayBhY2NvdW50IGluZm9ybWF0aW9uXCIgc3dpdGNoXHJcblx0XHRjb25zdCBpSGF2ZUJhbmtJbmZvU3dpdGNoID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3RsMDBfRGVmYXVsdENvbnRlbnRfcmRvSUhhdmVUaGVpckluZm9Gb3JtJylcclxuXHRcdCk7XHJcblx0XHRpZiAoIWlIYXZlQmFua0luZm9Td2l0Y2guY2hlY2tlZCkge1xyXG5cdFx0XHRpSGF2ZUJhbmtJbmZvU3dpdGNoLmNsaWNrKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU2VsZWN0IFwiRGVmYXVsdCBwYXkgZnJvbSBhY2NvdW50XCIgdG8gYmUgREVGQVVMVF9QQVlfRlJPTV9BQ0NPVU5UIChcIkZpc2NhbCBTcG9uc29yc2hpcCAtIDIgTmV3XCIpXHJcblx0XHRBcnJheS5wcm90b3R5cGUuc2xpY2VcclxuXHRcdFx0LmNhbGwoXHJcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcclxuXHRcdFx0XHRcdCcjY3RsMDBfRGVmYXVsdENvbnRlbnRfSUhhdmVUaGVpckluZm9Gb3JtX2RkRGVmYXVsdFBheUZyb20gPiBvcHRpb24nXHJcblx0XHRcdFx0KVxyXG5cdFx0XHQpXHJcblx0XHRcdC5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuXHRcdFx0XHRpZiAob3B0aW9uLmlubmVyVGV4dCA9PT0gREVGQVVMVF9QQVlfRlJPTV9BQ0NPVU5UKSB7XHJcblx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSAndHJ1ZSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHQvLyBBbGxvdyBwYXN0ZSB0byBjb25maXJtIGFjY291bnQvcm91dGluZyBudW1iZXIgaW5wdXRcclxuXHRcdGNvbnN0IGFjY291bnRDb25maXJtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG5cdFx0XHQnI2N0bDAwX0RlZmF1bHRDb250ZW50X0lIYXZlVGhlaXJJbmZvRm9ybV90eHRDb25maXJtQWNjb3VudE51bWJlcidcclxuXHRcdCk7XHJcblx0XHRjb25zdCByb3V0aW5nQ29uZmlybUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuXHRcdFx0JyNjdGwwMF9EZWZhdWx0Q29udGVudF9JSGF2ZVRoZWlySW5mb0Zvcm1fdHh0Q29uZmlybVJvdXRpbmdOdW1iZXInXHJcblx0XHQpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXHJcblx0XHRcdCdwYXN0ZScsXHJcblx0XHRcdGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5pc1NhbWVOb2RlKGFjY291bnRDb25maXJtSW5wdXQpIHx8XHJcblx0XHRcdFx0XHQoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkuaXNTYW1lTm9kZShyb3V0aW5nQ29uZmlybUlucHV0KVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0cnVlXHJcblx0XHQpO1xyXG5cdH0pO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHN2YlBheUJpbGxBZGRJbmRpdkhhdmVCYW5rO1xyXG4iLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuLi9oZWxwZXJzL29wdGlvbnMnO1xyXG5cclxuZnVuY3Rpb24gc3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGUoKSB7XHJcblx0b3B0aW9ucy5zdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZS5nZXQoKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG5cdFx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXV0b21hdGljYWxseSBjbGljayBvbiBcIlJlcXVlc3QgYWN0aXZhdGlvbiBjb2RlXCJcclxuXHRcdCg8SFRNTEFuY2hvckVsZW1lbnQ+KFxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3RsMDBfRGVmYXVsdENvbnRlbnRfcmVxdWVzdENvZGUnKVxyXG5cdFx0KSkuY2xpY2soKTtcclxuXHR9KTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBzdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZTtcclxuIiwiYXN5bmMgZnVuY3Rpb24gZ2V0S2V5KCk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdiYW5rT3BzUGx1Z2luX2dWZXJpZnlBdXRoS2V5JywgZnVuY3Rpb24gKGl0ZW1zKSB7XHJcblx0XHRcdHJldHVybiByZXNvbHZlKGl0ZW1zLmJhbmtPcHNQbHVnaW5fZ1ZlcmlmeUF1dGhLZXkpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEtleShrZXk6IHN0cmluZykge1xyXG5cdGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgYmFua09wc1BsdWdpbl9nVmVyaWZ5QXV0aEtleToga2V5IH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBnZXRLZXksIHNldEtleSB9O1xyXG4iLCJjb25zdCBzdG9yYWdlUHJlZml4ID0gJ2JhbmtPcHNQbHVnaW5fJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldDxUPihrZXk6IHN0cmluZyk6IFByb21pc2U8VD4ge1xyXG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChgJHtzdG9yYWdlUHJlZml4fSR7a2V5fWAsIGZ1bmN0aW9uIChpdGVtcykge1xyXG5cdFx0XHRyZXR1cm4gcmVzb2x2ZSg8VD5pdGVtc1tgJHtzdG9yYWdlUHJlZml4fSR7a2V5fWBdKTtcclxuXHRcdH0pO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlKSB7XHJcblx0Y29uc29sZS5sb2coa2V5LCB2YWx1ZSk7XHJcblx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBbYCR7c3RvcmFnZVByZWZpeH0ke2tleX1gXTogdmFsdWUgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU9iajxUPihrZXksIGRlZmF1bHRWYWx1ZTogVCkge1xyXG5cdHJldHVybiB7XHJcblx0XHRzZXQ6ICh2YWx1ZTogVCkgPT4gc2V0KGtleSwgdmFsdWUpLFxyXG5cdFx0Z2V0OiAoKSA9PiBnZXQ8VD4oa2V5KSxcclxuXHRcdGRlZmF1bHRWYWx1ZSxcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0YmFua0F1dG9WZXJpZnlHb29nbGVXb3Jrc3BhY2U6IGNyZWF0ZU9iajxib29sZWFuPihcclxuXHRcdCdiYW5rQXV0b1ZlcmlmeUdvb2dsZVdvcmtzcGFjZScsXHJcblx0XHR0cnVlXHJcblx0KSxcclxuXHRzdmJCaWxsUGF5QWRkSW5kaXZIYXZlQmFuazogY3JlYXRlT2JqPGJvb2xlYW4+KFxyXG5cdFx0J3N2YkJpbGxQYXlBZGRJbmRpdkhhdmVCYW5rJyxcclxuXHRcdHRydWVcclxuXHQpLFxyXG5cdHN2YkJpbGxQYXlBZGRQYXllZUFjdGl2YXRpb25Db2RlOiBjcmVhdGVPYmo8Ym9vbGVhbj4oXHJcblx0XHQnc3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGUnLFxyXG5cdFx0ZmFsc2VcclxuXHQpLFxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9