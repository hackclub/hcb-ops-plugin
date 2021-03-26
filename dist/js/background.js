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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/background.ts":
/*!*******************************!*\
  !*** ./src/app/background.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = __webpack_require__(/*! ./helpers/options */ "./src/app/helpers/options.ts");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background got a message!');
    sendResponse({});
});
chrome.runtime.onInstalled.addListener((details) => {
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    const reason = details.reason;
    console.log(`Previous Version: ${previousVersion}`);
    console.log(`Current Version: ${currentVersion}`);
    switch (reason) {
        case 'install':
            console.log('New User installed the extension.');
            console.log('Setting default values.');
            setDefaultOptions();
            break;
        case 'update':
            console.log('User has updated their extension.');
            break;
        case 'chrome_update':
        case 'shared_module_update':
        default:
            console.log('Other install events within the browser');
            break;
    }
});
function setDefaultOptions() {
    Object.keys(options_1.default).forEach((option) => options_1.default[option].set(options_1.default[option].defaultValue));
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAvaGVscGVycy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSwrRkFBd0M7QUFFeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtJQUN0RSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDekMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxF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biBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiaW1wb3J0IG9wdGlvbnMgZnJvbSAnLi9oZWxwZXJzL29wdGlvbnMnO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKCdCYWNrZ3JvdW5kIGdvdCBhIG1lc3NhZ2UhJyk7XHJcblx0c2VuZFJlc3BvbnNlKHt9KTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoZGV0YWlscykgPT4ge1xyXG5cdGNvbnN0IGN1cnJlbnRWZXJzaW9uID0gY2hyb21lLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9uO1xyXG5cdGNvbnN0IHByZXZpb3VzVmVyc2lvbiA9IGRldGFpbHMucHJldmlvdXNWZXJzaW9uO1xyXG5cdGNvbnN0IHJlYXNvbiA9IGRldGFpbHMucmVhc29uO1xyXG5cclxuXHRjb25zb2xlLmxvZyhgUHJldmlvdXMgVmVyc2lvbjogJHtwcmV2aW91c1ZlcnNpb259YCk7XHJcblx0Y29uc29sZS5sb2coYEN1cnJlbnQgVmVyc2lvbjogJHtjdXJyZW50VmVyc2lvbn1gKTtcclxuXHJcblx0c3dpdGNoIChyZWFzb24pIHtcclxuXHRcdGNhc2UgJ2luc3RhbGwnOlxyXG5cdFx0XHRjb25zb2xlLmxvZygnTmV3IFVzZXIgaW5zdGFsbGVkIHRoZSBleHRlbnNpb24uJyk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdTZXR0aW5nIGRlZmF1bHQgdmFsdWVzLicpO1xyXG5cdFx0XHRzZXREZWZhdWx0T3B0aW9ucygpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ3VwZGF0ZSc6XHJcblx0XHRcdGNvbnNvbGUubG9nKCdVc2VyIGhhcyB1cGRhdGVkIHRoZWlyIGV4dGVuc2lvbi4nKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdjaHJvbWVfdXBkYXRlJzpcclxuXHRcdGNhc2UgJ3NoYXJlZF9tb2R1bGVfdXBkYXRlJzpcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGNvbnNvbGUubG9nKCdPdGhlciBpbnN0YWxsIGV2ZW50cyB3aXRoaW4gdGhlIGJyb3dzZXInKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0fVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKCkge1xyXG5cdE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT5cclxuXHRcdG9wdGlvbnNbb3B0aW9uXS5zZXQob3B0aW9uc1tvcHRpb25dLmRlZmF1bHRWYWx1ZSlcclxuXHQpO1xyXG59XHJcbiIsImNvbnN0IHN0b3JhZ2VQcmVmaXggPSAnYmFua09wc1BsdWdpbl8nO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0PFQ+KGtleTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KGAke3N0b3JhZ2VQcmVmaXh9JHtrZXl9YCwgZnVuY3Rpb24gKGl0ZW1zKSB7XHJcblx0XHRcdHJldHVybiByZXNvbHZlKDxUPml0ZW1zW2Ake3N0b3JhZ2VQcmVmaXh9JHtrZXl9YF0pO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldChrZXk6IHN0cmluZywgdmFsdWUpIHtcclxuXHRjb25zb2xlLmxvZyhrZXksIHZhbHVlKTtcclxuXHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7IFtgJHtzdG9yYWdlUHJlZml4fSR7a2V5fWBdOiB2YWx1ZSB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlT2JqPFQ+KGtleSwgZGVmYXVsdFZhbHVlOiBUKSB7XHJcblx0cmV0dXJuIHtcclxuXHRcdHNldDogKHZhbHVlOiBUKSA9PiBzZXQoa2V5LCB2YWx1ZSksXHJcblx0XHRnZXQ6ICgpID0+IGdldDxUPihrZXkpLFxyXG5cdFx0ZGVmYXVsdFZhbHVlLFxyXG5cdH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRiYW5rQXV0b1ZlcmlmeUdvb2dsZVdvcmtzcGFjZTogY3JlYXRlT2JqPGJvb2xlYW4+KFxyXG5cdFx0J2JhbmtBdXRvVmVyaWZ5R29vZ2xlV29ya3NwYWNlJyxcclxuXHRcdHRydWVcclxuXHQpLFxyXG5cdHN2YkJpbGxQYXlBZGRJbmRpdkhhdmVCYW5rOiBjcmVhdGVPYmo8Ym9vbGVhbj4oXHJcblx0XHQnc3ZiQmlsbFBheUFkZEluZGl2SGF2ZUJhbmsnLFxyXG5cdFx0dHJ1ZVxyXG5cdCksXHJcblx0c3ZiQmlsbFBheUFkZFBheWVlQWN0aXZhdGlvbkNvZGU6IGNyZWF0ZU9iajxib29sZWFuPihcclxuXHRcdCdzdmJCaWxsUGF5QWRkUGF5ZWVBY3RpdmF0aW9uQ29kZScsXHJcblx0XHRmYWxzZVxyXG5cdCksXHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=