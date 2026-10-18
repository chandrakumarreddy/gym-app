var __DEBUG_METADATA_RELEASE__ = "debugmetadata:32c8146ce6305cb3d4e1764db3e3364fa4d24494";
(function () {
  'use strict';
  try {
    throw new Error(__DEBUG_METADATA_RELEASE__);
  } catch (e) {
    e.name = 'LynxGetSourceMapReleaseError';
    if (typeof _SetSourceMapRelease === 'function') {
      _SetSourceMapRelease(e); // original filename from engine (e.g. 'lepus.js' or 'dynamic_component_name/main-thread.js')
      e.stack = "    at <eval> (file://main-thread.js:1:1)\n";
      _SetSourceMapRelease(e); // engineVersion > 2.13 reports an empty filename, so set it to the Rspeedy filename
    } else if (
      typeof lynxCoreInject !== 'undefined' &&
      typeof lynxCoreInject.tt.setSourceMapRelease === 'function'
    ) {
      lynxCoreInject.tt.setSourceMapRelease(e);
    }
  }
  if (typeof lynx !== 'undefined' &&
      typeof lynx.performance !== 'undefined' &&
      typeof lynx.performance.profileMark !== 'undefined') {
    lynx.performance.profileMark('[pluginDebugMetadata] SetSourceMapInfo', {
      args: {
        release: __DEBUG_METADATA_RELEASE__,
      }
    });
  }
})();
'use strict';var globDynamicComponentEntry=globDynamicComponentEntry||'__Card__';
"use strict";
var __webpack_modules__ = ({
"(react:main-thread)/./src/App.css"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);


},
"(react:main-thread)/./src/components/Button/Button.css"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);


},
"(react:main-thread)/./src/screens/Home/Home.css"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);


},
"(react:main-thread)/./src/theme/tokens.css"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);


},
"(react:main-thread)/./node_modules/@lynx-js/css-extract-webpack-plugin/runtime/hotModuleReplacement.lepus.cjs"() {
function main() {
    try {
        lynx.getJSContext().addEventListener('lynx.hmr.css', (event)=>{
            try {
                var { data: { cssId, content, deps, entry } } = event;
                // Update the css deps first because the css deps are updated actually.
                if (Array.isArray(deps[cssId])) deps[cssId].forEach((depCSSId)=>{
                    lynx.getDevtool().replaceStyleSheetByIdWithBase64(Number(depCSSId), content, entry);
                });
                lynx.getDevtool().replaceStyleSheetByIdWithBase64(Number(cssId), content, entry);
                __FlushElementTree();
            } catch (error) {
                // TODO: use webpack-dev-server logger
                console.error(error);
            }
        });
    } catch (error) {
        // TODO: use webpack-dev-server logger
        console.warn(`[HMR] no lynx.getJSContext() found, will not HMR CSS`);
        console.warn(error);
    }
}
main();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cloneElement: () => (cloneElement),
  createElement: () => (createElement)
});
/* import */ var _jsx_runtime_index_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var slice = /* @__PURE__ */ [].slice;
/**
 * Create an virtual node (used for JSX)
 * @param {VNode["type"]} type The node name or Component constructor for this
 * virtual node
 * @param {object | null | undefined} [props] The properties of the virtual node
 * @param {Array<import('.').ComponentChildren>} [children] The children of the
 * virtual node
 * @returns {VNode}
 */ function createElement(type, props, children) {
    var normalizedProps = {}, key, ref, i;
    for(i in props){
        if (i == 'key') key = props[i];
        else if (i == 'ref' && typeof type != 'function') ref = props[i];
        else normalizedProps[i] = props[i];
    }
    if (arguments.length > 2) normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
    // If a Component VNode, check for and apply defaultProps
    // Note: type may be undefined in development, must never error here.
    if (typeof type == 'function' && type.defaultProps != null) {
        for(i in type.defaultProps)if (normalizedProps[i] === undefined) normalizedProps[i] = type.defaultProps[i];
    }
    return (0,_jsx_runtime_index_js__rspack_import_0.jsx)(type, normalizedProps, key, ref, null);
}
/**
 * Clones the given VNode, optionally adding attributes/props and replacing its
 * children.
 * @param {VNode} vnode The virtual DOM element to clone
 * @param {object} props Attributes/props to add when cloning
 * @param {Array<ComponentChildren>} rest Any additional arguments will be used
 * as replacement children.
 * @returns {VNode}
 */ function cloneElement(vnode, props, children) {
    var normalizedProps = Object.assign({}, vnode.props), key, ref, i;
    var defaultProps;
    if (vnode.type && vnode.type.defaultProps) defaultProps = vnode.type.defaultProps;
    for(i in props){
        if (i == 'key') key = props[i];
        else if (i == 'ref' && typeof vnode.type != 'function') ref = props[i];
        else if (props[i] === undefined && defaultProps !== undefined) normalizedProps[i] = defaultProps[i];
        else normalizedProps[i] = props[i];
    }
    if (arguments.length > 2) normalizedProps.children = arguments.length > 3 ? slice.call(arguments, 2) : children;
    return (0,_jsx_runtime_index_js__rspack_import_0.jsx)(vnode.type, normalizedProps, key || vnode.key, ref || vnode.ref, null);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Fragment: () => (/* reexport safe */ preact__rspack_import_1.Fragment),
  jsx: () => (createVNode),
  jsxDEV: () => (createVNode),
  jsxs: () => (createVNode)
});
/* import */ var _lynx_js_react_internal__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js");
/* import */ var preact__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// Kept in sync with `REACT_ELEMENT_TYPE` in preact/compat, whose `isValidElement`
// compares against it. Inlined rather than imported so the main thread does not
// have to pull in compat.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
// A SnapshotInstance is the main thread's element, so it has to satisfy
// `isValidElement` too. Assigning per instance would add a property after the
// constructor has run, which costs a shape transition on a hot path, so put it
// on the prototype instead. Writable, so that the `$$typeof: undefined` in
// `renderToOpcodes` can still shadow it.
Object.defineProperty(_lynx_js_react_internal__rspack_import_0.SnapshotInstance.prototype, '$$typeof', {
    value: REACT_ELEMENT_TYPE,
    writable: true,
    configurable: true
});
function createVNode(type, props, _key) {
    if (typeof type === 'string') {
        var r = new _lynx_js_react_internal__rspack_import_0.SnapshotInstance(type);
        r.props = props;
        r[_lynx_js_react_internal__rspack_import_0.CHILDREN] = null;
        r[_lynx_js_react_internal__rspack_import_0.PARENT] = null;
        r[_lynx_js_react_internal__rspack_import_0.DIFF] = 0;
        r[_lynx_js_react_internal__rspack_import_0.DOM] = null;
        r[_lynx_js_react_internal__rspack_import_0.COMPONENT] = null;
        // r.__v = --vnodeId;
        r[_lynx_js_react_internal__rspack_import_0.INDEX] = -1;
        r[_lynx_js_react_internal__rspack_import_0.FLAGS] = 0;
        return r;
    } else if (typeof type === 'function') {
        var normalizedProps = props;
        if ('ref' in normalizedProps && 'prototype' in type && type.prototype.render) {
            normalizedProps = {};
            for(var i in props)if (i != 'ref') normalizedProps[i] = props[i];
        }
        var defaultProps;
        if (defaultProps = type.defaultProps) {
            for(var i1 in defaultProps)if (typeof normalizedProps[i1] === 'undefined') normalizedProps[i1] = defaultProps[i1];
        }
        return {
            type,
            props: normalizedProps,
            [_lynx_js_react_internal__rspack_import_0.CHILDREN]: null,
            [_lynx_js_react_internal__rspack_import_0.PARENT]: null,
            [_lynx_js_react_internal__rspack_import_0.DIFF]: 0,
            [_lynx_js_react_internal__rspack_import_0.DOM]: null,
            [_lynx_js_react_internal__rspack_import_0.COMPONENT]: null,
            constructor: void 0,
            // __v: --vnodeId,
            [_lynx_js_react_internal__rspack_import_0.INDEX]: -1,
            [_lynx_js_react_internal__rspack_import_0.FLAGS]: 0,
            $$typeof: REACT_ELEMENT_TYPE
        };
    }
}


// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/background-function/handle.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createBackgroundFunctionHandle: () => (createBackgroundFunctionHandle),
  resetBackgroundFunctionHandleIdForTesting: () => (resetBackgroundFunctionHandleIdForTesting)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var lastId = 0;
/**
 * Creates the serializable handle used by main-thread code to call a background function.
 */ function createBackgroundFunctionHandle(obj) {
    var _obj, _toJSON;
    var id = ++lastId;
    if (typeof obj !== 'function') return {
        _jsFnId: id,
        _error: `Argument of runOnBackground should be a function, but got [${typeof obj}] instead`
    };
    (_toJSON = (_obj = obj).toJSON) !== null && _toJSON !== void 0 ? _toJSON : _obj.toJSON = ()=>'[BackgroundFunction]';
    return {
        _jsFnId: id,
        _fn: obj
    };
}
function resetBackgroundFunctionHandleIdForTesting() {
    lastId = 0;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/background-function/run-on-background.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  registerBackgroundFunctionCtx: () => (registerBackgroundFunctionCtx),
  resetBackgroundFunctionRuntime: () => (resetBackgroundFunctionRuntime),
  runBackgroundFunction: () => (runBackgroundFunction),
  runOnBackground: () => (runOnBackground)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _worklet_runtime_bindings_bindings_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/bindings.js");
/* import */ var _worklet_runtime_bindings_events_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js");
/* import */ var _thread_function_call_return_value_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/thread-function-call/return-value.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




var cleanupBackgroundFunctionRuntime;
var unregisterBackgroundFunctionCleanup;
/**
 * @internal
 */ function runBackgroundFunction() {}
/**
 * @internal
 */ function registerBackgroundFunctionCtx() {}
function resetBackgroundFunctionRuntime() {
    cleanupBackgroundFunctionRuntime === null || cleanupBackgroundFunctionRuntime === void 0 ? void 0 : cleanupBackgroundFunctionRuntime();
    unregisterBackgroundFunctionCleanup === null || unregisterBackgroundFunctionCleanup === void 0 ? void 0 : unregisterBackgroundFunctionCleanup();
    unregisterBackgroundFunctionCleanup = undefined;
}
/**
 * `runOnBackground` allows triggering js functions on the background thread asynchronously.
 * @param f - The js function to be called.
 * @returns A function. Calling which with the arguments to be passed to the js function to trigger it on the background thread. This function returns a promise that resolves to the return value of the js function.
 * @public
 *
 * @example
 *
 * ```ts
 * import { runOnBackground } from '@lynx-js/react';
 *
 * async function someMainthreadFunction() {
 *   'main thread';
 *   const fn = runOnBackground(() => {
 *     return 'hello';
 *   });
 *   const result = await fn();
 * }
 * ```
 *
 * @group Functions
 */ function runOnBackground(f) {
    if (!(0,_utils_js__rspack_import_0.isSdkVersionGt)(2, 15)) throw new Error('runOnBackground requires Lynx sdk version 2.16.');
    var obj = f;
    if (obj._error) throw new Error(obj._error);
    return async (...params)=>{
        return new Promise((resolve)=>{
            var resolveId = (0,_thread_function_call_return_value_js__rspack_import_3.onFunctionCall)(resolve);
            if (obj._isFirstScreen) {
                (0,_worklet_runtime_bindings_bindings_js__rspack_import_1.delayRunOnBackground)(obj, (fnId, execId)=>{
                    dispatchRunBackgroundFunctionEvent(fnId, params, execId, resolveId);
                });
                return;
            }
            dispatchRunBackgroundFunctionEvent(obj._jsFnId, params, obj._execId, resolveId);
        });
    };
}
function dispatchRunBackgroundFunctionEvent(fnId, params, execId, resolveId) {
    lynx.getJSContext().dispatchEvent({
        type: _worklet_runtime_bindings_events_js__rspack_import_2.WorkletEvents.runOnBackground,
        data: JSON.stringify({
            obj: {
                _jsFnId: fnId,
                _execId: execId
            },
            params,
            resolveId
        })
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/capture-main-thread-object.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  captureMainThreadObject: () => (captureMainThreadObject)
});
/* import */ var _main_thread_object_handle_registry_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-object-handle-registry.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * Preserve opaque main-thread object handles when the worklet transform narrows a
 * captured member expression. Ordinary objects keep the transform's compact
 * fallback shape. The transform evaluates that shape lazily with
 * `captureMainThreadObject(source) ?? fallback`.
 *
 * @internal
 */ function captureMainThreadObject(source) {
    return (0,_main_thread_object_handle_registry_js__rspack_import_0.isMainThreadObjectHandle)(source) ? source : undefined;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/commit-context.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  globalCommitContext: () => (globalCommitContext),
  resetGlobalCommitContext: () => (resetGlobalCommitContext),
  takeGlobalFlushOptions: () => (takeGlobalFlushOptions)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var globalCommitContext = {
    ops: [],
    flushOptions: {}
};
function resetGlobalCommitContext() {
    globalCommitContext.ops = [];
    globalCommitContext.flushOptions = {};
    delete globalCommitContext.flowIds;
}
function takeGlobalFlushOptions() {
    var flushOptions = globalCommitContext.flushOptions;
    globalCommitContext.flushOptions = {};
    return flushOptions;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/compat/lynxComponent.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ComponentFromReactRuntime: () => (ComponentFromReactRuntime),
  wrapWithLynxComponent: () => (wrapWithLynxComponent)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function wrapWithLynxComponent(jsxSnapshot, jsxComponent) {
    var componentVNode = jsxComponent;
    var C = componentVNode.type;
    if (typeof C === 'function' && (C === ComponentFromReactRuntime || C.prototype instanceof ComponentFromReactRuntime)) {
        if (jsxSnapshot.length === 1) return jsxSnapshot(jsxComponent);
        else {
            // spread
            if (!componentVNode.props['removeComponentElement']) return jsxSnapshot(jsxComponent, takeComponentAttributes(componentVNode));
        }
    }
    return jsxComponent;
}
class ComponentFromReactRuntime extends preact__rspack_import_0.Component {
    /* v8 ignore next 3 -- marker component, never rendered directly. */ render() {
        return null;
    }
}
var __COMPONENT_ATTRIBUTES__ = /* @__PURE__ */ new Set([
    'name',
    'style',
    'class',
    'flatten',
    'clip-radius',
    'overlap',
    'user-interaction-enabled',
    'native-interaction-enabled',
    'block-native-event',
    'enableLayoutOnly',
    'cssAlignWithLegacyW3C',
    'intersection-observers',
    'trigger-global-event',
    'exposure-scene',
    'exposure-id',
    'exposure-screen-margin-top',
    'exposure-screen-margin-bottom',
    'exposure-screen-margin-left',
    'exposure-screen-margin-right',
    'focusable',
    'focus-index',
    'accessibility-label',
    'accessibility-element',
    'accessibility-traits',
    'enable-new-animator'
]);
function takeComponentAttributes(jsxComponent) {
    var attributes = {};
    Object.keys(jsxComponent.props).forEach((k)=>{
        // let re1 = Regex::new(r"^(global-bind|bind|catch|capture-bind|capture-catch)([A-Za-z]+)$").unwrap();
        // let re2 = Regex::new(r"^data-([A-Za-z]+)$").unwrap();
        if (__COMPONENT_ATTRIBUTES__.has(k) || k === 'id' || k === 'className' || k === 'dataSet' || k === 'data-set' || k === 'removeComponentElement' || /^(global-bind|bind|catch|capture-bind|capture-catch)([A-Za-z]+)$/.exec(k) || /^data-([A-Za-z]+)$/.exec(k)) {
            attributes[k] = jsxComponent.props[k];
            delete jsxComponent.props[k];
        }
    });
    return attributes;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/component.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  installComponentCompat: () => (installComponentCompat)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/* eslint-disable */ function installComponentCompat() {
    return;
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/forceRootRender.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runWithForceRootRender: () => (runWithForceRootRender)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


function runWithForceRootRender({ getRootVNode, setRootVNode, render }) {
    // Preact can skip root render if `_original` is unchanged; bumping it keeps
    // backend force renders aligned with Preact's own rerender path.
    var rootVNode = getRootVNode();
    if (rootVNode) {
        var newVNode = Object.assign({}, rootVNode);
        if (newVNode[_shared_render_constants_js__rspack_import_1.ORIGINAL] != null) {
            newVNode[_shared_render_constants_js__rspack_import_1.ORIGINAL] += 1;
            setRootVNode(newVNode);
        }
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var oldDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF2];
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF2] = (vnode, oldVNode)=>{
        /* v8 ignore start */ if (oldDiff) oldDiff(vnode, oldVNode);
        /* v8 ignore stop */ var c = oldVNode[_shared_render_constants_js__rspack_import_1.COMPONENT];
        if (c) c[_shared_render_constants_js__rspack_import_1.BITS] |= _shared_render_constants_js__rspack_import_1.COMPONENT_FORCE;
    };
    try {
        render();
    } finally{
        preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF2] = oldDiff;
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/globalProps.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createGlobalProps: () => (createGlobalProps),
  isGlobalPropsEventMode: () => (isGlobalPropsEventMode),
  updateGlobalProps: () => (updateGlobalProps)
});
/* import */ var _initData_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/initData.js");

function isGlobalPropsEventMode() {
    return  true && "reactive" === 'event';
}
function createGlobalProps(deps) {
    return isGlobalPropsEventMode() ? /* @__PURE__ */ (0,_initData_js__rspack_import_0.factory)(deps, '__globalProps', 'onGlobalPropsChanged') : /* @__PURE__ */ createFallbackGlobalProps(deps.useLynxGlobalEventListener);
}
function updateGlobalProps(newData, { forceRerender } = {}) {
    if (isGlobalPropsEventMode()) lynx.__globalProps = Object.assign({}, lynx.__globalProps, newData);
    else {
        Object.assign(lynx.__globalProps, newData);
        if (forceRerender) Promise.resolve().then(forceRerender);
    }
    lynx.getApp().GlobalEventEmitter.emit('onGlobalPropsChanged', [
        lynx.__globalProps
    ]);
}
function warnGlobalPropsMode() {}
function FallbackProvider({ children }) {
    warnGlobalPropsMode();
    return children;
}
function FallbackConsumer({ children }) {
    warnGlobalPropsMode();
    return children(lynx.__globalProps);
}
function useFallbackGlobalProps() {
    warnGlobalPropsMode();
    return lynx.__globalProps;
}
function createFallbackGlobalProps(useListener) {
    var useChanged = (callback)=>{};
    return {
        Provider: ()=>FallbackProvider,
        Consumer: ()=>FallbackConsumer,
        use: ()=>useFallbackGlobalProps,
        useChanged: ()=>useChanged
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  installMainThreadHooks: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.installMainThreadHooks),
  useCallback: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useCallback),
  useContext: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useContext),
  useDebugValue: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useDebugValue),
  useEffect: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useEffect),
  useErrorBoundary: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useErrorBoundary),
  useId: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useId),
  useImperativeHandle: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useImperativeHandle),
  useLayoutEffect: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useLayoutEffect),
  useMemo: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useMemo),
  useReducer: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useReducer),
  useRef: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useRef),
  useState: () => (/* reexport safe */ _mainThreadImpl_js__rspack_import_0.useState)
});
/* import */ var _mainThreadImpl_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThreadImpl.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

(0,_mainThreadImpl_js__rspack_import_0.installMainThreadHooks)();

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThreadImpl.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  installMainThreadHooks: () => (installMainThreadHooks),
  useCallback: () => (useCallback),
  useContext: () => (useContext),
  useDebugValue: () => (useDebugValue),
  useEffect: () => (useEffect),
  useErrorBoundary: () => (useErrorBoundary),
  useId: () => (useId),
  useImperativeHandle: () => (useImperativeHandle),
  useLayoutEffect: () => (useLayoutEffect),
  useMemo: () => (useMemo),
  useReducer: () => (useReducer),
  useRef: () => (useRef),
  useState: () => (useState)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements hooks in the main thread.
 * This module is modified from preact/hooks
 *
 * internal-preact/hooks/dist/hooks.mjs
 */ 


var currentIndex;
var currentComponent;
var currentHook;
var hooksInstalled = false;
var oldBeforeDiff;
var oldBeforeRender;
var oldAfterDiff;
var oldRoot;
function installMainThreadHooks() {
    if (hooksInstalled) return;
    hooksInstalled = true;
    /* eslint-disable @typescript-eslint/unbound-method */ oldBeforeDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF];
    oldBeforeRender = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.RENDER];
    oldAfterDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED];
    oldRoot = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.ROOT];
    /* eslint-enable @typescript-eslint/unbound-method */ preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF] = function(vnode) {
        currentComponent = null;
        if (oldBeforeDiff) oldBeforeDiff(vnode);
    };
    /* v8 ignore start */ preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.ROOT] = function(vnode, parentDom) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (vnode && parentDom[_shared_render_constants_js__rspack_import_1.CHILDREN] && parentDom[_shared_render_constants_js__rspack_import_1.CHILDREN][_shared_render_constants_js__rspack_import_1.MASK]) vnode[_shared_render_constants_js__rspack_import_1.MASK] = parentDom[_shared_render_constants_js__rspack_import_1.CHILDREN][_shared_render_constants_js__rspack_import_1.MASK];
        if (oldRoot) oldRoot(vnode, parentDom);
    };
    /* v8 ignore stop */ preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.RENDER] = function(vnode) {
        if (oldBeforeRender) oldBeforeRender(vnode);
        currentComponent = vnode[_shared_render_constants_js__rspack_import_1.COMPONENT];
        currentIndex = 0;
    };
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED] = function(vnode) {
        if (oldAfterDiff) oldAfterDiff(vnode);
        currentComponent = null;
    };
}
function getHookState(index, type) {
    var _currentComponent_HOOKS;
    if (preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.HOOK]) preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.HOOK](currentComponent, index, currentHook || type);
    currentHook = 0;
    var hooks = (_currentComponent_HOOKS = currentComponent[_shared_render_constants_js__rspack_import_1.HOOKS]) !== null && _currentComponent_HOOKS !== void 0 ? _currentComponent_HOOKS : currentComponent[_shared_render_constants_js__rspack_import_1.HOOKS] = {
        [_shared_render_constants_js__rspack_import_1.LIST]: [],
        [_shared_render_constants_js__rspack_import_1.PENDING_EFFECTS]: []
    };
    if (index >= hooks[_shared_render_constants_js__rspack_import_1.LIST].length) hooks[_shared_render_constants_js__rspack_import_1.LIST].push({});
    return hooks[_shared_render_constants_js__rspack_import_1.LIST][index];
}
function invokeOrReturn(arg, f) {
    return typeof f == 'function' ? f(arg) : f;
}
function useState(initialState) {
    currentHook = 1;
    return useReducer(_utils_js__rspack_import_2.noop, initialState);
}
function useReducer(_reducer, initialState, init) {
    var hookState = getHookState(currentIndex++, 2);
    if (!hookState[_shared_render_constants_js__rspack_import_1.COMPONENT]) {
        hookState[_shared_render_constants_js__rspack_import_1.VALUE] = [
            /* v8 ignore start */ init ? init(initialState) : invokeOrReturn(undefined, initialState),
            /* v8 ignore stop */ function(_action) {
                if (true) console.error('Cannot update state in main thread!');
            }
        ];
        hookState[_shared_render_constants_js__rspack_import_1.COMPONENT] = currentComponent;
    }
    return hookState[_shared_render_constants_js__rspack_import_1.VALUE];
}
function useRef(initialValue) {
    currentHook = 5;
    return useMemo(function() {
        return {
            current: initialValue
        };
    }, []);
}
// used for first screen and need not to cache value by args
function useMemo(factory, _args) {
    var state = getHookState(currentIndex++, 7);
    state[_shared_render_constants_js__rspack_import_1.VALUE] = factory();
    return state[_shared_render_constants_js__rspack_import_1.VALUE];
}
function useCallback(callback, args) {
    currentHook = 8;
    return useMemo(function() {
        return callback;
    }, args);
}
function useContext(context) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    var provider = currentComponent.context[context.__c];
    var state = getHookState(currentIndex++, 9);
    state['c'] = context;
    /* v8 ignore start */ if (!provider) return context.__;
    /* v8 ignore stop */ state[_shared_render_constants_js__rspack_import_1.VALUE] = true;
    return provider.props.value;
}
function useDebugValue(value, formatter) {
    if (preact__rspack_import_0.options.useDebugValue) /* v8 ignore start */ preact__rspack_import_0.options.useDebugValue(formatter ? formatter(value) : value);
}
function useErrorBoundary(cb) {
    var state = getHookState(currentIndex++, 10);
    state[_shared_render_constants_js__rspack_import_1.VALUE] = cb;
    return [
        undefined,
        _utils_js__rspack_import_2.noop
    ];
}
function useId() {
    var state = getHookState(currentIndex++, 11);
    if (!state[_shared_render_constants_js__rspack_import_1.VALUE]) {
        var _root_MASK;
        // Grab either the root node or the nearest async boundary node.
        var root = currentComponent[_shared_render_constants_js__rspack_import_1.VNODE];
        while(root !== null && !root[_shared_render_constants_js__rspack_import_1.MASK] && root[_shared_render_constants_js__rspack_import_1.PARENT] !== null)root = root[_shared_render_constants_js__rspack_import_1.PARENT];
        /**
         * init mask to [0, 0]
         * mask[0] will not change
         * mask[1] will auto increase
         */ var mask = (_root_MASK = root[_shared_render_constants_js__rspack_import_1.MASK]) !== null && _root_MASK !== void 0 ? _root_MASK : root[_shared_render_constants_js__rspack_import_1.MASK] = [
            0,
            0
        ];
        state[_shared_render_constants_js__rspack_import_1.VALUE] = 'P' + mask[0] + '-' + mask[1]++;
    }
    return state[_shared_render_constants_js__rspack_import_1.VALUE];
}
// background hooks
var useEffect = _utils_js__rspack_import_2.noop;
var useLayoutEffect = _utils_js__rspack_import_2.noop;
var useImperativeHandle = _utils_js__rspack_import_2.noop;

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useCallback: () => (/* reexport safe */ preact_hooks__rspack_import_0.useCallback),
  useContext: () => (/* reexport safe */ preact_hooks__rspack_import_0.useContext),
  useDebugValue: () => (/* reexport safe */ preact_hooks__rspack_import_0.useDebugValue),
  useEffect: () => (useEffect),
  useErrorBoundary: () => (/* reexport safe */ preact_hooks__rspack_import_0.useErrorBoundary),
  useId: () => (/* reexport safe */ preact_hooks__rspack_import_0.useId),
  useImperativeHandle: () => (/* reexport safe */ preact_hooks__rspack_import_0.useImperativeHandle),
  useLayoutEffect: () => (useLayoutEffect),
  useMemo: () => (/* reexport safe */ preact_hooks__rspack_import_0.useMemo),
  useReducer: () => (/* reexport safe */ preact_hooks__rspack_import_0.useReducer),
  useRef: () => (/* reexport safe */ preact_hooks__rspack_import_0.useRef),
  useState: () => (useState)
});
/* import */ var preact_hooks__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThread.js");
/* import */ var _shared_profile_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


// Cache profiled wrappers by the original preact setter to preserve stable
// identity without introducing extra hooks in component render flow.
/* @__PURE__ */ _shared_profile_js__rspack_import_1.isProfiling ? new WeakMap() : undefined;
var useState = preact_hooks__rspack_import_0.useState;
/**
 * Accepts a function that contains imperative, possibly effectful code.
 * The effects run after main thread dom update without blocking it.
 *
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change (using ===).
 *
 * @function
 * @public
 *
 * @group Hooks
 */ var useEffect = preact_hooks__rspack_import_0.useEffect;
/**
 * `useLayoutEffect` is now an alias of `useEffect`. Use `useEffect` instead.
 *
 * Accepts a function that contains imperative, possibly effectful code. The effects run after main thread dom update without blocking it.
 *
 * @param effect - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change (using ===).
 *
 * @function
 * @public
 *
 * @group Hooks
 *
 * @deprecated `useLayoutEffect` in the background thread cannot offer the precise timing for reading layout information and synchronously re-render, which is different from React.
 */ var useLayoutEffect = preact_hooks__rspack_import_0.useEffect;

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/useLynxGlobalEventListener.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useLynxGlobalEventListener: () => (useLynxGlobalEventListener)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * `useLynxGlobalEventListener` helps you `addListener` as early as possible.
 *
 * @example
 *
 * Use this hooks to listen to event 'exposure' and event 'disexposure'
 *
 * ```jsx
 * function App() {
 *   useLynxGlobalEventListener('exposure', (e) => {
 *     console.log("exposure", e)
 *   })
 *   useLynxGlobalEventListener('disexposure', (e) => {
 *     console.log("disexposure", e)
 *   })
 *   return (
 *     <view
 *       style='width: 100px; height: 100px; background-color: red;'
 *       exposure-id='a'
 *     />
 *   )
 * }
 * ```
 *
 * @param eventName - Event name to listen
 * @param listener - Event handler
 * @public
 *
 * @group Hooks
 */ function useLynxGlobalEventListener() {}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/initData.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RESET_WITH_INIT_DATA_IN_STATE_ERROR: () => (RESET_WITH_INIT_DATA_IN_STATE_ERROR),
  factory: () => (factory),
  hasWithInitDataInStateUsage: () => (hasWithInitDataInStateUsage),
  withInitDataInState: () => (withInitDataInState)
});
/* import */ var _commit_context_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/commit-context.js");

// for better reuse if runtime is changed
function factory({ createContext, useState, createElement, useLynxGlobalEventListener: useListener }, prop, eventName) {
    var Context = createContext({});
    var Provider = ({ children })=>{
        var [__, set] = useState(lynx[prop]);
        var handleChange = ()=>{
            if (prop === '__initData') _commit_context_js__rspack_import_0.globalCommitContext.flushOptions.triggerDataUpdated = true;
            set(lynx[prop]);
        };
        useChanged(handleChange);
        return createElement(Context.Provider, {
            value: __
        }, children);
    };
    var Consumer = Context.Consumer;
    var use = ()=>{
        var [__, set] = useState(lynx[prop]);
        useChanged(()=>{
            if (prop === '__initData') _commit_context_js__rspack_import_0.globalCommitContext.flushOptions.triggerDataUpdated = true;
            set(lynx[prop]);
        });
        return __;
    };
    var useChanged = (callback)=>{};
    return {
        /* v8 ignore next */ Context: ()=>Context,
        Provider: ()=>Provider,
        Consumer: ()=>Consumer,
        use: ()=>use,
        useChanged: ()=>useChanged
    };
}
// dev-only: lets the page-data reset paths report an error when a reset meets this HOC.
var usesWithInitDataInState = false;
/**
 * @internal
 */ function hasWithInitDataInStateUsage() {
    return usesWithInitDataInState;
}
/**
 * @internal
 */ var RESET_WITH_INIT_DATA_IN_STATE_ERROR = "Resetting page data does not clear the state injected by `withInitDataInState`: the HOC merges `lynx.__initData` into the component state and cannot drop keys removed by the reset. Use `useInitData()` instead, or avoid combining a data reset with `withInitDataInState`.";
/**
 * Higher-Order Component (HOC) that injects `initData` into the state of the given class component.
 *
 * This HOC checks if the provided component is a class component. If it is, it wraps the component
 * and injects the `initData` into its state. It also adds a listener
 * to update the state when data changes, and removes the listener when the component unmounts.
 *
 * @typeParam P - The type of the props of the wrapped component.
 * @typeParam S - The type of the state of the wrapped component.
 *
 * @param App - The class component to be wrapped by the HOC.
 *
 * @returns The original component if it is not a class component, otherwise a new class component
 *          with `initData` injection and state update functionality.
 *
 * @example
 * ```typescript
 * class App extends React.Component<MyProps, MyState> {
 *   // component implementation
 * }
 *
 * export default withInitDataInState(App);
 * ```
 * @public
 *
 * @group Functions
 */ function withInitDataInState(App) {
    var isClassComponent = 'prototype' in App && 'render' in App.prototype;
    /* v8 ignore next 4 */ if (!isClassComponent) return App;
    class C extends App {
        componentWillUnmount() {
            var _super_componentWillUnmount;
            (_super_componentWillUnmount = super.componentWillUnmount) === null || _super_componentWillUnmount === void 0 ? void 0 : _super_componentWillUnmount.call(this);
        }
        constructor(props){
            super(props);
            if (true) usesWithInitDataInState = true;
            this.state = {
                ...this.state,
                ...lynx.__initData
            };
        }
    }
    C.getDerivedStateFromProps = (props, state)=>{
        var _ref;
        var _App_getDerivedStateFromProps;
        var base = {
            ...state,
            ...lynx.__initData
        };
        // Compose with the wrapped component's own (or inherited) `getDerivedStateFromProps`
        // — passing it the freshened `initData` and letting its derived values win, matching
        // how it runs (and wins) on the background thread.
        var derived = (_ref = (_App_getDerivedStateFromProps = App.getDerivedStateFromProps) === null || _App_getDerivedStateFromProps === void 0 ? void 0 : _App_getDerivedStateFromProps.call(App, props, base)) !== null && _ref !== void 0 ? _ref : null;
        return {
            ...base,
            ...derived
        };
    };
    return C;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx-data-processors.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createProcessData: () => (createProcessData),
  isProcessingDefaultData: () => (isProcessingDefaultData)
});
/* import */ var _shared_profile_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");

// `true` only while the default data processor is running. `defaultDataProcessor` is
// invoked by the native side as a separate call *before* `renderPage` / `updatePage`,
// so a `markFirstScreenSyncReady()` made inside it must not sync the *previous* tree
// (still latched ready) — a re-render of the data being processed is imminent. The
// first-screen sync backend reads this to defer such a mark. Lives here (not in the
// backend) so `core` does not depend on a runtime backend.
var processingDefaultData = false;
function isProcessingDefaultData() {
    return processingDefaultData;
}
function createProcessData(dataProcessorDefinition) {
    var hasDefaultDataProcessorExecuted = false;
    return (data, processorName)=>{
        if (true) (0,_shared_profile_js__rspack_import_0.profileStart)('processData');
        var result;
        try {
            var _ref;
            var _dataProcessorDefinition_dataProcessors_processorName, _dataProcessorDefinition_dataProcessors;
            if (processorName) result = (_ref = dataProcessorDefinition === null || dataProcessorDefinition === void 0 ? void 0 : (_dataProcessorDefinition_dataProcessors = dataProcessorDefinition.dataProcessors) === null || _dataProcessorDefinition_dataProcessors === void 0 ? void 0 : (_dataProcessorDefinition_dataProcessors_processorName = _dataProcessorDefinition_dataProcessors[processorName]) === null || _dataProcessorDefinition_dataProcessors_processorName === void 0 ? void 0 : _dataProcessorDefinition_dataProcessors_processorName.call(_dataProcessorDefinition_dataProcessors, data)) !== null && _ref !== void 0 ? _ref : data;
            else {
                // a `markFirstScreenSyncReady()` made inside `defaultDataProcessor` must be
                // deferred until the data being processed renders (see `processingDefaultData`)
                processingDefaultData = true;
                try {
                    var _ref1;
                    var _dataProcessorDefinition_defaultDataProcessor;
                    result = (_ref1 = dataProcessorDefinition === null || dataProcessorDefinition === void 0 ? void 0 : (_dataProcessorDefinition_defaultDataProcessor = dataProcessorDefinition.defaultDataProcessor) === null || _dataProcessorDefinition_defaultDataProcessor === void 0 ? void 0 : _dataProcessorDefinition_defaultDataProcessor.call(dataProcessorDefinition, data)) !== null && _ref1 !== void 0 ? _ref1 : data;
                } finally{
                    processingDefaultData = false;
                }
            }
        } catch (error) {
            lynx.reportError(error);
            result = {};
        }
        if (true) (0,_shared_profile_js__rspack_import_0.profileEnd)();
        if (!hasDefaultDataProcessorExecuted) result = appendInitDataMetadata(result);
        if (!processorName) hasDefaultDataProcessorExecuted = true;
        return result;
    };
}
function appendInitDataMetadata(result) {
    // @ts-expect-error todo: add types to i18n logic
    var i18nResourceTranslation = globalThis.__I18N_RESOURCE_TRANSLATION__;
    if (i18nResourceTranslation) result = {
        ...result,
        __I18N_RESOURCE_TRANSLATION__: i18nResourceTranslation
    };
    // @ts-expect-error todo: add types to __EXTRACT_STR__
    if (false) { var extractStrIdentFlag }
    return result;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx-page-data.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyUpdatePageData: () => (applyUpdatePageData)
});
/* import */ var _initData_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/initData.js");
/* import */ var _utils_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var hasReportedResetWithInitDataInState = false;
function applyUpdatePageData(data, options) {
    if (options === null || options === void 0 ? void 0 : options.resetPageData) {
        if ( true && !hasReportedResetWithInitDataInState && (0,_initData_js__rspack_import_0.hasWithInitDataInStateUsage)()) {
            hasReportedResetWithInitDataInState = true;
            lynx.reportError(new Error(_initData_js__rspack_import_0.RESET_WITH_INIT_DATA_IN_STATE_ERROR));
        }
        lynx.__initData = {};
    }
    if (typeof data == 'object' && data !== null && !(0,_utils_js__rspack_import_1.isEmptyObject)(data)) {
        var _lynx, ___initData;
        (___initData = (_lynx = lynx).__initData) !== null && ___initData !== void 0 ? ___initData : _lynx.__initData = {};
        Object.assign(lynx.__initData, data);
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/dynamic-import.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  __dynamicImport: () => (__dynamicImport),
  loadDynamicJS: () => (loadDynamicJS)
});
/* import */ var _lazy_bundle_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/lazy-bundle.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function loadDynamicJS(url) {
    _ReportError(new Error(`A dynamic import (to "${url}") is leaked to Lepus bundle.`), {
        errorCode: 202
    });
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject();
}
function __dynamicImport(url, options) {
    var w = options === null || options === void 0 ? void 0 : options.with;
    var t = w === null || w === void 0 ? void 0 : w.type;
    if (t === 'component' || t === 'tsx' || t === 'jsx') return (0,_lazy_bundle_js__rspack_import_0.loadLazyBundle)(url, w === null || w === void 0 ? void 0 : w.mode);
    else return loadDynamicJS(url);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/lazy-bundle.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  loadLazyBundle: () => (loadLazyBundle),
  makeSyncThen: () => (makeSyncThen)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
// Inlined rather than imported from `snapshot/` so this `core/` module stays
// free of runtime-backend dependencies (enforced by
// `guardrails/snapshot-containment`). `PREPARE_LAZY_BUNDLE_MTS` must stay in
// sync with `snapshot/lifecycle/constant.ts`'s
// `LifecycleConstant.prepareLazyBundleMTS`, the lifecycle name the snapshot
// backend registers the main-thread prepare handler under.
var SECTION_MAIN_THREAD = 'main-thread';
var SECTION_CSS = 'CSS';
var LYNX_LAZY_SYNC_TIMEOUT_SECONDS = 5;
// Background-thread dedup cache: a `source` whose FetchBundle load fully
// succeeded maps to its exports, so a repeat load returns the same result
// without re-fetching or re-triggering the main-thread prepare. Only populated
// on success — a failed load stays out of the cache and can be retried, exactly
// like `prepareLazyBundleMTS`'s main-thread cache.
new Map();
/**
 * To make code below works
 * const App1 = lazy(() => import("./x").then(({App1}) => ({default: App1})))
 * const App2 = lazy(() => import("./x").then(({App2}) => ({default: App2})))
 * @internal
 */ var makeSyncThen = function(result) {
    return function(onF, _onR) {
        if (onF) {
            var ret;
            try {
                ret = onF(result);
            } catch (e) {
                // if (onR) {
                //   return Promise.resolve(onR(e));
                // }
                return Promise.reject(e);
            }
            if (ret && typeof ret.then === 'function' /* `thenable` object */ ) //   import("./x").then(() => new Promise(...))
            // )
            // Calling `then` and passing a callback is standard behavior
            // but in Lepus runtime the callback will never be called
            // So can be simplified to code below
            return ret;
            var p = Promise.resolve(ret);
            var then = makeSyncThen(ret);
            p.then = then;
            return p;
        }
        return this;
    };
};
/**
 * Load dynamic component from source. Designed to be used with `lazy`.
 *
 * The `mode` is threaded in by the chunk-loading runtime from the
 * `import(..., { with: { mode } })` import attribute (see `lynx_acm`), so each
 * lazy import carries its own mode instead of relying on shared mutable state.
 * @param source - where dynamic component template.js locates
 * @param mode - `'sync'` (first-screen blocking) or `'async'` (default)
 * @returns
 * @public
 */ var loadLazyBundle = /*#__PURE__*/ (()=>{
    // Default to QueryComponent when `__LAZY_BUNDLE_FETCHER__` is missing —
    // older react-webpack-plugin builds don't stamp it and they predate
    // FetchBundle support, so falling through to QueryComponent is the only
    // safe behavior.
    var useFetchBundle =  true && "QueryComponent" === 'FetchBundle';
    var impl = useFetchBundle ? loadLazyBundleWithFetchBundle : loadLazyBundleWithQueryComponent;
    lynx.loadLazyBundle = impl;
    function loadLazyBundleWithQueryComponent(source, mode) {
        {
            var query = __QueryComponent(source);
            var result;
            try {
                result = query.evalResult;
            } catch (e) {
                // Here we cannot return a rejected promise
                // (which will eventually be an unhandled rejection and cause unnecessary redbox)
                // But we still need a object in shape of Promise
                // So we return a Promise which will never resolve or reject,
                // which fit our principle "lepus run only once at first-screen" better
                return new Promise(()=>{});
            }
            var r = Promise.resolve(result);
            // Why we should modify the implementation of `then`?
            // We should make it `sync` so lepus first-screen render can use result above instantly
            // We also should keep promise shape
            r.then = makeSyncThen(result);
            return r;
        }
        // removed by dead control flow
{}
    }
    function loadLazyBundleWithFetchBundle(source, mode, host) {
        {
            if (mode !== 'sync') {
                // Fire the fetch and ignore the result so the request goes out early
                // and warms the native bundle cache; the background `async` path then
                // waits less. The main thread renders nothing here.
                try {
                    lynx.fetchBundle(source, {});
                } catch  {}
                return new Promise(()=>{});
            }
            var response;
            try {
                response = lynx.fetchBundle(source, {}).wait(LYNX_LAZY_SYNC_TIMEOUT_SECONDS);
            } catch  {
                return new Promise(()=>{});
            }
            if (!response || response.code !== 0) return new Promise(()=>{});
            var result;
            try {
                result = lynx.loadScript(SECTION_MAIN_THREAD, {
                    bundleName: response.url
                })(source);
                var styleSheet = __LoadStyleSheet(SECTION_CSS, response.url);
                if (styleSheet !== null) __AdoptStyleSheet(styleSheet);
            } catch  {
                return new Promise(()=>{});
            }
            var r = Promise.resolve(result);
            r.then = makeSyncThen(result);
            return r;
        }
        // removed by dead control flow
{}
    }
    return impl;
})();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-backend.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RUNTIME_BACKEND_ELEMENT_TEMPLATE: () => (RUNTIME_BACKEND_ELEMENT_TEMPLATE),
  RUNTIME_BACKEND_SNAPSHOT: () => (RUNTIME_BACKEND_SNAPSHOT),
  registerRuntimeBackend: () => (registerRuntimeBackend),
  sRuntimeBackend: () => (sRuntimeBackend)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var RUNTIME_BACKEND_SNAPSHOT = 'Snapshot';
var RUNTIME_BACKEND_ELEMENT_TEMPLATE = 'Element Template';
var sRuntimeBackend = Symbol.for('__REACT_LYNX_RUNTIME_BACKEND__');
function registerRuntimeBackend(backend) {
    var target = globalThis;
    var currentBackend = target[sRuntimeBackend];
    if (currentBackend !== undefined && currentBackend !== backend) throw new Error(`ReactLynx runtime backend mismatch: the current template uses ${currentBackend}, but this bundle was built for ${backend}. Snapshot and Element Template templates cannot share lazy bundles. Rebuild the main template and lazy bundle with the same elementTemplate setting.`);
    Object.defineProperty(target, sRuntimeBackend, {
        value: backend,
        enumerable: false,
        writable: false,
        configurable: true
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-version.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getRuntimeVersion: () => (getRuntimeVersion),
  registerRuntimeVersion: () => (registerRuntimeVersion),
  sRuntimeVersion: () => (sRuntimeVersion)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var sRuntimeVersion = Symbol.for('__REACT_LYNX_RUNTIME_VERSION__');
function getTarget() {
    return globalThis;
}
/**
 * Record the `@lynx-js/react` runtime version compiled into this bundle.
 *
 * Every lazy bundle bundles its own copy of the `@lynx-js/react` runtime. The
 * host template is loaded first, so the first registration wins and the
 * recorded value reflects the host's runtime version. This function only
 * records the version so it is available for later inspection; it does not
 * compare versions or throw.
 */ function registerRuntimeVersion(version) {
    // Older versions of the build plugin do not stamp `__RUNTIME_VERSION__`, so
    // there is nothing to record.
    if (!version) return;
    var target = getTarget();
    var currentVersion = target[sRuntimeVersion];
    // The host registers first; keep its version and let later lazy bundles be
    // no-ops so the recorded value always represents the host runtime.
    if (currentVersion !== undefined) return;
    Object.defineProperty(target, sRuntimeVersion, {
        value: version,
        enumerable: false,
        writable: false,
        configurable: true
    });
}
/**
 * Read the `@lynx-js/react` runtime version recorded by the host template, or
 * `undefined` when the host was built by a plugin that does not stamp it.
 */ function getRuntimeVersion() {
    return getTarget()[sRuntimeVersion];
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-object-handle-registry.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getMainThreadObjectHandleType: () => (getMainThreadObjectHandleType),
  isMainThreadObjectHandle: () => (isMainThreadObjectHandle),
  registerMainThreadObjectHandle: () => (registerMainThreadObjectHandle)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var mainThreadObjectHandleTypes;
function registerMainThreadObjectHandle(handle, type) {
    (mainThreadObjectHandleTypes !== null && mainThreadObjectHandleTypes !== void 0 ? mainThreadObjectHandleTypes : mainThreadObjectHandleTypes = new WeakMap()).set(handle, type);
}
function isMainThreadObjectHandle(value) {
    return typeof value === 'object' && value !== null && (mainThreadObjectHandleTypes === null || mainThreadObjectHandleTypes === void 0 ? void 0 : mainThreadObjectHandleTypes.has(value)) === true;
}
function getMainThreadObjectHandleType(value) {
    return typeof value === 'object' && value !== null ? mainThreadObjectHandleTypes === null || mainThreadObjectHandleTypes === void 0 ? void 0 : mainThreadObjectHandleTypes.get(value) : undefined;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-object.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MainThreadObjectHandle: () => (MainThreadObjectHandle),
  defineMainThreadObjectType: () => (defineMainThreadObjectType),
  useMainThreadObject: () => (useMainThreadObject)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _hooks_react_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js");
/* import */ var _main_thread_object_handle_registry_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-object-handle-registry.js");
/* import */ var _main_thread_ref_id_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref-id.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




var mainThreadObjectTypeDefinitions = new WeakMap();
/**
 * An opaque source-runtime handle for an object realized on the main thread.
 *
 * A handle has logical identity and is serializable, but it is not the target
 * object or an RPC stub. Capturing it in a main-thread function resolves it to
 * the corresponding local target object. Development builds may wrap the
 * background handle in a throwing guard solely to diagnose invalid access;
 * that guard never forwards operations between runtimes.
 *
 * @public
 */ class MainThreadObjectHandle {
    /**
     * The payload used to create the realized object.
     *
     * Readonly is a TypeScript contract; the value is not frozen at runtime.
     */ get creationPayload() {
        return this._initValue;
    }
    /** @internal */ toJSON() {
        return {
            _wvid: this._wvid,
            _initValue: this._initValue,
            _type: this._type
        };
    }
    /** @internal */ constructor(initialValue, type){
        this._wvid = (0,_main_thread_ref_id_js__rspack_import_3.allocateMainThreadRefId)();
        this._initValue = initialValue;
        this._type = type;
        (0,_main_thread_object_handle_registry_js__rspack_import_2.registerMainThreadObjectHandle)(this, type);
    }
}
class MainThreadObjectHandleImpl extends MainThreadObjectHandle {
    constructor(initialValue, type){
        super(initialValue, type);
    }
}
/**
 * Define a main-thread object type for use by a library-provided hook.
 *
 * @param definition - Stable type key and target-object factory function.
 * @returns An immutable object type definition.
 * @public
 */ function defineMainThreadObjectType(definition) {
    // Read accessor-backed fields once so validation and deferred registration
    // operate on the same definition values.
    var { type, create } = definition;
    if (typeof type !== 'string' || type.length === 0) throw new Error('MainThreadObject type must be a non-empty string.');
    if (type === 'main-thread') throw new Error('MainThreadObject type "main-thread" is reserved for MainThreadRef.');
    if (!isMainThreadLifecycleFunction(create)) throw new Error(`MainThreadObject type "${type}" must provide a create Main Thread Function.`);
    if (true) assertCaptureFreeLifecycleFunction(type, 'create', create);
    // Keep the validated fields independent from the caller-owned definition.
    // Registration may be deferred until the first main-thread hook use, so a
    // later mutation of `definition` must not change the type or factory that is
    // registered for this token.
    var validatedDefinition = Object.freeze({
        type,
        create
    });
    var objectType = Object.freeze({
        type,
        downcast (value) {
            return (0,_main_thread_object_handle_registry_js__rspack_import_2.getMainThreadObjectHandleType)(value) === type ? value : undefined;
        }
    });
    mainThreadObjectTypeDefinitions.set(objectType, validatedDefinition);
    registerMainThreadObjectDefinition(validatedDefinition);
    return objectType;
}
/**
 * Create a stable handle that resolves to an object of the supplied type in
 * main-thread functions.
 *
 * This primitive is intended for library hooks. The returned target type is
 * only callable in a main-thread function; it must not be used from the
 * background runtime.
 *
 * @param objectType - Definition used to realize the target object.
 * @param initialValue - JSON-serializable initialization payload.
 * @returns The main-thread-only target type.
 * @public
 */ function useMainThreadObject(objectType, initialValue) {
    return (0,_hooks_react_js__rspack_import_1.useMemo)(()=>{
        var definition = mainThreadObjectTypeDefinitions.get(objectType);
        if (definition === undefined) throw new Error(`Invalid MainThreadObject type token for "${objectType.type}". Create it with defineMainThreadObjectType().`);
        // A library module normally registers its type while the MTS bundle is
        // evaluated. Register again at the first hook use so runtimes that retain
        // the module but reset their per-page worklet registry remain correct.
        // The registry treats an equivalent duplicate as an idempotent lookup.
        registerMainThreadObjectDefinition(definition);
        var handle = new MainThreadObjectHandleImpl(initialValue, objectType.type);
        return guardBackgroundMainThreadObjectAccess(handle, objectType.type);
    }, []);
}
function registerMainThreadObjectDefinition(definition) {
    (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.registerMainThreadObjectType)(definition.type, definition.create);
}
function isMainThreadLifecycleFunction(value) {
    return typeof value === 'function' || typeof value === 'object' && value !== null && typeof value._wkltId === 'string';
}
function assertCaptureFreeLifecycleFunction(type, name, value) {
    if (typeof value === 'function') return;
    var descriptors = Object.getOwnPropertyDescriptors(value);
    var hasCaptures = Reflect.ownKeys(descriptors).some((key)=>{
        if (typeof key !== 'string') return true;
        if (key === '_wkltId' || key === '_workletType' || key === '_lepusWorkletHash') return false;
        if (key === '_c') {
            var descriptor = descriptors[key];
            var closure = 'value' in descriptor ? descriptor.value : undefined;
            return !('value' in descriptor) || closure !== undefined && (typeof closure !== 'object' || closure === null || Reflect.ownKeys(closure).length !== 0);
        }
        return true;
    });
    if (hasCaptures) throw new Error(`MainThreadObject ${name} function for "${type}" must not capture values. Import dependencies from a shared-runtime module instead.`);
}
function guardBackgroundMainThreadObjectAccess(handle, type) {
    return handle;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref-id.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  allocateMainThreadRefId: () => (allocateMainThreadRefId),
  clearMainThreadRefIdsForTesting: () => (clearMainThreadRefIdsForTesting)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var lastIdBG = 0;
var lastIdMT = 0;
/** @internal */ function allocateMainThreadRefId() {
    return --lastIdMT;
}
/** @internal */ function clearMainThreadRefIdsForTesting() {
    lastIdBG = lastIdMT = 0;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref-init-value.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addMainThreadRefInitValue: () => (addMainThreadRefInitValue),
  takeMainThreadRefInitValuePatch: () => (takeMainThreadRefInitValuePatch)
});
/* import */ var _mts_capability_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/mts-capability.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var mainThreadRefInitValuePatch = [];
/**
 * @internal
 */ function addMainThreadRefInitValue(id, value, type) {
    if (!(0,_mts_capability_js__rspack_import_0.isMtsEnabled)()) return;
    mainThreadRefInitValuePatch.push(type === undefined ? [
        id,
        value
    ] : [
        id,
        value,
        type
    ]);
}
/**
 * @internal
 */ function takeMainThreadRefInitValuePatch() {
    var patch = mainThreadRefInitValuePatch;
    mainThreadRefInitValuePatch = [];
    return patch;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  MainThreadRef: () => (MainThreadRef),
  clearMainThreadRefLastIdForTesting: () => (clearMainThreadRefLastIdForTesting),
  isMainThreadRef: () => (isMainThreadRef),
  useMainThreadRef: () => (useMainThreadRef)
});
/* import */ var _hooks_react_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js");
/* import */ var _main_thread_ref_id_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref-id.js");


function clearMainThreadRefLastIdForTesting() {
    (0,_main_thread_ref_id_js__rspack_import_1.clearMainThreadRefIdsForTesting)();
}
function isMainThreadRef(value) {
    return typeof value === 'object' && value !== null && typeof value._wvid === 'number';
}
/**
 * A `MainThreadRef` is a ref that can only be accessed on the main thread. It is used to preserve
 * states between main thread function calls.
 * The data saved in `current` property of the `MainThreadRef` can be read and written in
 * multiple main thread functions.
 * @public
 *
 * @group Types
 */ class MainThreadRef {
    get current() {
        if (true) /* v8 ignore next 3 */ throw new Error('MainThreadRef: value of a MainThreadRef cannot be accessed outside of main thread script.');
        // removed by dead control flow
{}
    }
    set current(_) {
        if (true) throw new Error('MainThreadRef: value of a MainThreadRef cannot be accessed outside of main thread script.');
    }
    /**
     * @internal
     */ toJSON() {
        return {
            _wvid: this._wvid
        };
    }
    constructor(initValue){
        this._initValue = initValue;
        this._type = 'main-thread';
        this._wvid = (0,_main_thread_ref_id_js__rspack_import_1.allocateMainThreadRefId)();
    }
}
function useMainThreadRef(initValue) {
    return (0,_hooks_react_js__rspack_import_0.useMemo)(()=>{
        return new MainThreadRef(initValue);
    }, []);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/mts-capability.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearMtsConfigCacheForTesting: () => (clearMtsConfigCacheForTesting),
  isMtsEnabled: () => (isMtsEnabled)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var mtsEnabled;
/**
 * @internal
 */ function isMtsEnabled() {
    return mtsEnabled !== null && mtsEnabled !== void 0 ? mtsEnabled : mtsEnabled = (0,_utils_js__rspack_import_0.isSdkVersionGt)(2, 13);
}
/**
 * @internal
 */ function clearMtsConfigCacheForTesting() {
    mtsEnabled = undefined;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/performance.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  PerfSpecificKey: () => (PerfSpecificKey),
  PerformanceTimingFlags: () => (PerformanceTimingFlags),
  PipelineOrigins: () => (PipelineOrigins),
  beginPipeline: () => (beginPipeline),
  globalPipelineOptions: () => (globalPipelineOptions),
  initTimingAPI: () => (initTimingAPI),
  markTiming: () => (markTiming),
  markTimingLegacy: () => (markTimingLegacy),
  resetTimingState: () => (resetTimingState),
  setPipeline: () => (setPipeline)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var PerformanceTimingFlags = {
    reactLynxHydrate: 'react_lynx_hydrate'
};
var PipelineOrigins = {
    reactLynxHydrate: 'reactLynxHydrate',
    updateTriggeredByBts: 'updateTriggeredByBts'
};
/**
 * @deprecated used by old timing api(setState timing flag)
 */ var PerfSpecificKey = '__lynx_timing_flag';
var timingFlag;
var shouldMarkDiffVdomStart = false;
var shouldMarkDiffVdomEnd = false;
var globalPipelineOptions;
var activeTimingAPIOptions;
var didInstallTimingAPIHooks = false;
/**
 * @deprecated used by old timing api(setState timing flag)
 */ function markTimingLegacy(key, timingFlag_) {
    var _lynx_getNativeApp_markTiming, _lynx_getNativeApp;
    switch(key){
        case 'updateSetStateTrigger':
            shouldMarkDiffVdomStart = true;
            shouldMarkDiffVdomEnd = true;
            timingFlag = timingFlag_;
            break;
        case 'updateDiffVdomStart':
            if (!shouldMarkDiffVdomStart) return;
            shouldMarkDiffVdomStart = false;
            break;
        case 'updateDiffVdomEnd':
            if (!shouldMarkDiffVdomEnd) return;
            shouldMarkDiffVdomEnd = false;
            break;
    }
    (_lynx_getNativeApp_markTiming = (_lynx_getNativeApp = lynx.getNativeApp()).markTiming) === null || _lynx_getNativeApp_markTiming === void 0 ? void 0 : _lynx_getNativeApp_markTiming.call(_lynx_getNativeApp, timingFlag, key);
}
function beginPipeline(needTimestamps, pipelineOrigin, timingFlag) {
    var _lynx_performance__generatePipelineOptions, _lynx_performance;
    globalPipelineOptions = (_lynx_performance = lynx.performance) === null || _lynx_performance === void 0 ? void 0 : (_lynx_performance__generatePipelineOptions = _lynx_performance._generatePipelineOptions) === null || _lynx_performance__generatePipelineOptions === void 0 ? void 0 : _lynx_performance__generatePipelineOptions.call(_lynx_performance);
    if (globalPipelineOptions) {
        var _lynx_performance__onPipelineStart, _lynx_performance1, _lynx_performance__onPipelineStart1, _lynx_performance2, _lynx_performance__bindPipelineIdWithTimingFlag, _lynx_performance3;
        globalPipelineOptions.needTimestamps = needTimestamps;
        globalPipelineOptions.pipelineOrigin = pipelineOrigin;
        globalPipelineOptions.dsl = 'reactLynx';
        switch(pipelineOrigin){
            case PipelineOrigins.reactLynxHydrate:
                globalPipelineOptions.stage = 'hydrate';
                break;
            case PipelineOrigins.updateTriggeredByBts:
                globalPipelineOptions.stage = 'update';
                break;
        }
        if ((0,_utils_js__rspack_import_2.isSdkVersionGt)(3, 0)) (_lynx_performance1 = lynx.performance) === null || _lynx_performance1 === void 0 ? void 0 : (_lynx_performance__onPipelineStart = _lynx_performance1._onPipelineStart) === null || _lynx_performance__onPipelineStart === void 0 ? void 0 : _lynx_performance__onPipelineStart.call(_lynx_performance1, globalPipelineOptions.pipelineID, globalPipelineOptions);
        else (_lynx_performance2 = lynx.performance) === null || _lynx_performance2 === void 0 ? void 0 : (_lynx_performance__onPipelineStart1 = _lynx_performance2._onPipelineStart) === null || _lynx_performance__onPipelineStart1 === void 0 ? void 0 : _lynx_performance__onPipelineStart1.call(_lynx_performance2, globalPipelineOptions.pipelineID);
        if (timingFlag) (_lynx_performance3 = lynx.performance) === null || _lynx_performance3 === void 0 ? void 0 : (_lynx_performance__bindPipelineIdWithTimingFlag = _lynx_performance3._bindPipelineIdWithTimingFlag) === null || _lynx_performance__bindPipelineIdWithTimingFlag === void 0 ? void 0 : _lynx_performance__bindPipelineIdWithTimingFlag.call(_lynx_performance3, globalPipelineOptions.pipelineID, timingFlag);
    }
}
function setPipeline(pipeline) {
    globalPipelineOptions = pipeline;
}
function resetTimingState() {
    timingFlag = undefined;
    shouldMarkDiffVdomStart = false;
    shouldMarkDiffVdomEnd = false;
    globalPipelineOptions = undefined;
}
function markTiming(timestampKey, force) {
    var _lynx_performance__markTiming, _lynx_performance;
    if (globalPipelineOptions && (force || globalPipelineOptions.needTimestamps)) (_lynx_performance = lynx.performance) === null || _lynx_performance === void 0 ? void 0 : (_lynx_performance__markTiming = _lynx_performance._markTiming) === null || _lynx_performance__markTiming === void 0 ? void 0 : _lynx_performance__markTiming.call(_lynx_performance, globalPipelineOptions.pipelineID, timestampKey);
}
function initTimingAPI(timingAPIOptions) {
    activeTimingAPIOptions = timingAPIOptions;
    resetTimingState();
    if (didInstallTimingAPIHooks) return;
    didInstallTimingAPIHooks = true;
    var helper = ()=>{
        var /* v8 ignore stop */ _timingAPIOptions_beginPipeline;
        var _$timingAPIOptions = activeTimingAPIOptions;
        /* v8 ignore start */ if (!_$timingAPIOptions) return;
        (_timingAPIOptions_beginPipeline = _$timingAPIOptions.beginPipeline) !== null && _timingAPIOptions_beginPipeline !== void 0 ? _timingAPIOptions_beginPipeline : beginPipeline;
    };
    var onHook = (old, ...args)=>{
        helper();
        /* v8 ignore start */ if (old) old(...args);
    /* v8 ignore stop */ };
    (0,_utils_js__rspack_import_2.hook)(preact__rspack_import_0.options, _shared_render_constants_js__rspack_import_1.RENDER_COMPONENT, onHook);
    (0,_utils_js__rspack_import_2.hook)(preact__rspack_import_0.options, _shared_render_constants_js__rspack_import_1.ROOT, onHook);
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/ref.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  OrdinaryRefEffectQueue: () => (OrdinaryRefEffectQueue),
  SelectorRefProxy: () => (SelectorRefProxy),
  applyOrdinaryRef: () => (applyOrdinaryRef),
  assertValidRef: () => (assertValidRef),
  normalizeRefValue: () => (normalizeRefValue)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
function assertValidRef(value) {
    if (typeof value === 'function' || typeof value === 'object' && value !== null && 'current' in value) return value;
    throw new Error(`Elements' "ref" property should be a function, or an object created ` + `by createRef(), but got [${typeof value}] instead`);
}
function normalizeRefValue(value) {
    if (value === null || value === undefined) return value;
    return assertValidRef(value);
}
function applyOrdinaryRef(ref, value, binding) {
    try {
        if (typeof ref === 'function') {
            var cleanup = binding.cleanup;
            var hasCleanup = typeof cleanup === 'function';
            binding.cleanup = undefined;
            if (hasCleanup) cleanup();
            if (!hasCleanup || value !== null) {
                var nextCleanup = ref(value);
                if (typeof nextCleanup === 'function') binding.cleanup = nextCleanup;
            }
        } else ref.current = value;
    } catch (error) {
        lynx.reportError(error);
    }
}
// Keeps the Snapshot/ET ordinary ref ordering shared without owning backend
// timing: each backend decides when to queue/flush and how to build the proxy.
class OrdinaryRefEffectQueue {
    queue(oldRef, newRef, owner, slot, token) {
        if (oldRef === newRef) return;
        var slots = this.bindings.get(owner);
        if (!slots) this.bindings.set(owner, slots = new Map());
        var binding = slots.get(slot);
        if (!binding) slots.set(slot, binding = {});
        if (oldRef) this.refsToClear.push([
            oldRef,
            binding
        ]);
        if (newRef) this.refsToApply.push([
            newRef,
            token,
            binding
        ]);
    }
    flush(createValue) {
        // Ref callbacks can synchronously trigger more work; detach this batch from
        // the queue before invoking user code so later effects stay in the next batch.
        var refsToClearNow = this.refsToClear.splice(0);
        var refsToApplyNow = this.refsToApply.splice(0);
        for (var [ref, binding] of refsToClearNow)applyOrdinaryRef(ref, null, binding);
        for (var [ref1, token, binding1] of refsToApplyNow)applyOrdinaryRef(ref1, createValue(token), binding1);
    }
    clear() {
        this.refsToClear.length = 0;
        this.refsToApply.length = 0;
    }
    hasPending() {
        return this.refsToClear.length > 0 || this.refsToApply.length > 0;
    }
    constructor(){
        // A host instance survives hydration's numeric ID remapping. Each ref slot
        // owns its cleanup independently, even when callbacks are shared.
        this.bindings = new WeakMap();
        this.refsToClear = [];
        this.refsToApply = [];
    }
}
class SelectorRefProxy {
    createProxy() {
        return new Proxy(this, {
            get: (target, prop, receiver)=>{
                if (typeof prop === 'symbol' || prop === 'then' || prop in target || typeof prop !== 'string') return Reflect.get(target, prop, receiver);
                return (...args)=>{
                    return target.createProxyTarget().setTask(prop, args);
                };
            }
        });
    }
    setTask(method, args) {
        this.task = (nodesRef)=>{
            var nodesRefMethod = nodesRef[method];
            return nodesRefMethod.apply(nodesRef, args);
        };
        return this;
    }
    exec() {
        this.runOrDelay(()=>{
            this.task(lynx.createSelectorQuery().select(this.selector)).exec();
        });
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/reload-version.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getReloadVersion: () => (getReloadVersion),
  increaseReloadVersion: () => (increaseReloadVersion)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var reloadVersion = 0;
function getReloadVersion() {
    return reloadVersion;
}
function increaseReloadVersion() {
    return ++reloadVersion;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/runtime-destroy.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  registerDestroyTask: () => (registerDestroyTask),
  runDestroyTasks: () => (runDestroyTasks)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var destroyTasks = new Set();
function registerDestroyTask(task) {
    destroyTasks.add(task);
    return ()=>{
        destroyTasks.delete(task);
    };
}
function runDestroyTasks() {
    var tasks = Array.from(destroyTasks);
    for (var task of tasks)task();
    destroyTasks.clear();
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/thread-function-call/main-thread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createRunOnMainThread: () => (createRunOnMainThread),
  delayedRunOnMainThreadData: () => (delayedRunOnMainThreadData),
  enqueueDelayedRunOnMainThreadData: () => (enqueueDelayedRunOnMainThreadData),
  takeDelayedRunOnMainThreadData: () => (takeDelayedRunOnMainThreadData)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var delayedRunOnMainThreadData = [];
function enqueueDelayedRunOnMainThreadData(data) {
    delayedRunOnMainThreadData.push(data);
}
function takeDelayedRunOnMainThreadData() {
    var data = delayedRunOnMainThreadData;
    delayedRunOnMainThreadData = [];
    return data;
}
/**
 * @internal
 */ function createRunOnMainThread(options) {
    return (fn)=>{
        throw new Error('runOnMainThread can only be used on the background thread.');
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/thread-function-call/return-value.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  dropFunctionCallReturnIds: () => (dropFunctionCallReturnIds),
  onFunctionCall: () => (onFunctionCall),
  resetFunctionCallReturnListener: () => (resetFunctionCallReturnListener)
});
/* import */ var _shared_index_map_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/index-map.js");
/* import */ var _worklet_runtime_bindings_events_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js");
/* import */ var _runtime_destroy_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/runtime-destroy.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var resolveMap;
var cleanupReturnValueListener;
var unregisterReturnValueCleanup;
function initReturnValueListener() {
    var context = lynx.getJSContext();
    resolveMap = new _shared_index_map_js__rspack_import_0.IndexMap();
    context.addEventListener(_worklet_runtime_bindings_events_js__rspack_import_1.WorkletEvents.FunctionCallRet, onFunctionCallRet);
    cleanupReturnValueListener = ()=>{
        context.removeEventListener(_worklet_runtime_bindings_events_js__rspack_import_1.WorkletEvents.FunctionCallRet, onFunctionCallRet);
        resolveMap = undefined;
        cleanupReturnValueListener = undefined;
    };
}
/**
 * @internal
 */ function onFunctionCall(resolve) {
    ensureFunctionCallReturnCleanup();
    if (!resolveMap) initReturnValueListener();
    return resolveMap.add(resolve);
}
function ensureFunctionCallReturnCleanup() {
    if (unregisterReturnValueCleanup) return;
    unregisterReturnValueCleanup = (0,_runtime_destroy_js__rspack_import_2.registerDestroyTask)(()=>{
        resetFunctionCallReturnListener();
    });
}
function resetFunctionCallReturnListener() {
    cleanupReturnValueListener === null || cleanupReturnValueListener === void 0 ? void 0 : cleanupReturnValueListener();
    unregisterReturnValueCleanup === null || unregisterReturnValueCleanup === void 0 ? void 0 : unregisterReturnValueCleanup();
    unregisterReturnValueCleanup = undefined;
}
function dropFunctionCallReturnIds(resolveIds) {
    if (!resolveMap) return;
    for (var resolveId of resolveIds)resolveMap.remove(resolveId);
    if (resolveMap.size === 0) resetFunctionCallReturnListener();
}
function onFunctionCallRet(event) {
    var data = JSON.parse(event.data);
    var map = resolveMap;
    if (!map) return;
    var resolve = map.get(data.resolveId);
    if (!resolve) return;
    map.remove(data.resolveId);
    resolve(data.returnValue);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Children: () => (/* reexport safe */ _snapshot_lynx_children_js__rspack_import_5.Children),
  Component: () => (/* reexport safe */ preact__rspack_import_9.Component),
  Fragment: () => (/* reexport safe */ preact_compat__rspack_import_2.Fragment),
  GlobalPropsConsumer: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.GlobalPropsConsumer),
  GlobalPropsProvider: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.GlobalPropsProvider),
  InitDataConsumer: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.InitDataConsumer),
  InitDataProvider: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.InitDataProvider),
  MainThreadRef: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.MainThreadRef),
  PureComponent: () => (/* reexport safe */ preact_compat__rspack_import_2.PureComponent),
  Suspense: () => (/* reexport safe */ _snapshot_lynx_suspense_js__rspack_import_8.Suspense),
  cloneElement: () => (/* reexport safe */ _snapshot_lynx_element_js__rspack_import_6.cloneElement),
  createContext: () => (/* reexport safe */ preact__rspack_import_9.createContext),
  createElement: () => (/* reexport safe */ _snapshot_lynx_element_js__rspack_import_6.createElement),
  createPortal: () => (/* reexport safe */ _snapshot_lynx_portals_js__rspack_import_7.createPortal),
  createRef: () => (/* reexport safe */ preact_compat__rspack_import_2.createRef),
  defineMainThreadObjectType: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.defineMainThreadObjectType),
  forwardRef: () => (/* reexport safe */ preact_compat__rspack_import_2.forwardRef),
  isValidElement: () => (/* reexport safe */ preact_compat__rspack_import_2.isValidElement),
  lazy: () => (/* reexport safe */ preact_compat__rspack_import_2.lazy),
  markFirstScreenSyncReady: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.markFirstScreenSyncReady),
  memo: () => (/* reexport safe */ preact_compat__rspack_import_2.memo),
  root: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.root),
  runOnBackground: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.runOnBackground),
  runOnMainThread: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.runOnMainThread),
  useCallback: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useCallback),
  useContext: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useContext),
  useDebugValue: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useDebugValue),
  useEffect: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useEffect),
  useErrorBoundary: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useErrorBoundary),
  useGlobalProps: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useGlobalProps),
  useGlobalPropsChanged: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useGlobalPropsChanged),
  useId: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useId),
  useImperativeHandle: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useImperativeHandle),
  useInitData: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useInitData),
  useInitDataChanged: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useInitDataChanged),
  useLayoutEffect: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useLayoutEffect),
  useLynxGlobalEventListener: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useLynxGlobalEventListener),
  useMainThreadObject: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useMainThreadObject),
  useMainThreadRef: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.useMainThreadRef),
  useMemo: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useMemo),
  useReducer: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useReducer),
  useRef: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useRef),
  useState: () => (/* reexport safe */ _core_hooks_react_js__rspack_import_4.useState),
  useSyncExternalStore: () => (/* reexport safe */ preact_compat__rspack_import_2.useSyncExternalStore),
  withInitDataInState: () => (/* reexport safe */ _lynx_api_js__rspack_import_10.withInitDataInState)
});
/* import */ var _runtime_marker_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/runtime-marker.js");
/* import */ var _lynx_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/lynx.js");
/* import */ var preact_compat__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
/* import */ var _core_component_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/component.js");
/* import */ var _core_hooks_react_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js");
/* import */ var _snapshot_lynx_children_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/children.js");
/* import */ var _snapshot_lynx_element_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/element.js");
/* import */ var _snapshot_lynx_portals_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/portals.js");
/* import */ var _snapshot_lynx_suspense_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/suspense.js");
/* import */ var preact__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _lynx_api_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/lynx-api.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.









(0,_core_component_js__rspack_import_3.installComponentCompat)();



/**
 * @internal
 */ /* export default */ __webpack_exports__["default"] = ({
    // hooks
    useState: _core_hooks_react_js__rspack_import_4.useState,
    useReducer: _core_hooks_react_js__rspack_import_4.useReducer,
    useEffect: _core_hooks_react_js__rspack_import_4.useEffect,
    useLayoutEffect: _core_hooks_react_js__rspack_import_4.useLayoutEffect,
    useRef: _core_hooks_react_js__rspack_import_4.useRef,
    useImperativeHandle: _core_hooks_react_js__rspack_import_4.useImperativeHandle,
    useMemo: _core_hooks_react_js__rspack_import_4.useMemo,
    useCallback: _core_hooks_react_js__rspack_import_4.useCallback,
    useContext: _core_hooks_react_js__rspack_import_4.useContext,
    useDebugValue: _core_hooks_react_js__rspack_import_4.useDebugValue,
    useSyncExternalStore: preact_compat__rspack_import_2.useSyncExternalStore,
    createContext: preact_compat__rspack_import_2.createContext,
    createRef: preact_compat__rspack_import_2.createRef,
    Fragment: preact_compat__rspack_import_2.Fragment,
    isValidElement: preact_compat__rspack_import_2.isValidElement,
    Children: _snapshot_lynx_children_js__rspack_import_5.Children,
    Component: preact_compat__rspack_import_2.Component,
    PureComponent: preact_compat__rspack_import_2.PureComponent,
    memo: preact_compat__rspack_import_2.memo,
    forwardRef: preact_compat__rspack_import_2.forwardRef,
    Suspense: _snapshot_lynx_suspense_js__rspack_import_8.Suspense,
    lazy: preact_compat__rspack_import_2.lazy,
    createElement: _snapshot_lynx_element_js__rspack_import_6.createElement,
    cloneElement: _snapshot_lynx_element_js__rspack_import_6.cloneElement,
    createPortal: _snapshot_lynx_portals_js__rspack_import_7.createPortal
});


// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BITS: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.BITS),
  BackgroundSnapshotInstance: () => (/* reexport safe */ _snapshot_snapshot_backgroundSnapshot_js__rspack_import_8.BackgroundSnapshotInstance),
  CHILDREN: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.CHILDREN),
  COMPONENT: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.COMPONENT),
  COMPONENT_DIRTY: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.COMPONENT_DIRTY),
  Component: () => (/* reexport safe */ preact__rspack_import_22.Component),
  DIFF: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.DIFF),
  DOM: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.DOM),
  FLAGS: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.FLAGS),
  INDEX: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.INDEX),
  PARENT: () => (/* reexport safe */ _shared_render_constants_js__rspack_import_14.PARENT),
  RUNTIME_BACKEND_ELEMENT_TEMPLATE: () => (/* reexport safe */ _core_lynx_runtime_backend_js__rspack_import_25.RUNTIME_BACKEND_ELEMENT_TEMPLATE),
  RUNTIME_BACKEND_SNAPSHOT: () => (/* reexport safe */ _core_lynx_runtime_backend_js__rspack_import_25.RUNTIME_BACKEND_SNAPSHOT),
  SnapshotInstance: () => (/* reexport safe */ _snapshot_snapshot_snapshot_js__rspack_import_12.SnapshotInstance),
  __ComponentIsPolyfill: () => (__ComponentIsPolyfill),
  __DynamicPartChildren: () => (__DynamicPartChildren),
  __DynamicPartChildren_0: () => (/* reexport safe */ _snapshot_snapshot_dynamicPartType_js__rspack_import_10.__DynamicPartChildren_0),
  __DynamicPartListChildren: () => (__DynamicPartListChildren),
  __DynamicPartListSlotV2: () => (__DynamicPartListSlotV2),
  __DynamicPartMultiChildren: () => (__DynamicPartMultiChildren),
  __DynamicPartSlot: () => (__DynamicPartSlot),
  __DynamicPartSlotV2: () => (__DynamicPartSlotV2),
  __DynamicPartSlotV2_0: () => (/* reexport safe */ _snapshot_snapshot_dynamicPartType_js__rspack_import_10.__DynamicPartSlotV2_0),
  __dynamicImport: () => (/* reexport safe */ _core_lynx_dynamic_import_js__rspack_import_23.__dynamicImport),
  __page: () => (/* reexport safe */ _snapshot_snapshot_definition_js__rspack_import_9.__page),
  __pageId: () => (/* reexport safe */ _snapshot_snapshot_definition_js__rspack_import_9.__pageId),
  __root: () => (/* reexport safe */ _root_js__rspack_import_6.__root),
  captureMainThreadObject: () => (/* reexport safe */ _core_capture_main_thread_object_js__rspack_import_30.captureMainThreadObject),
  createSnapshot: () => (/* reexport safe */ _snapshot_snapshot_definition_js__rspack_import_9.createSnapshot),
  getRuntimeVersion: () => (/* reexport safe */ _core_lynx_runtime_version_js__rspack_import_24.getRuntimeVersion),
  loadDynamicJS: () => (/* reexport safe */ _core_lynx_dynamic_import_js__rspack_import_23.loadDynamicJS),
  loadLazyBundle: () => (/* reexport safe */ _core_lynx_lazy_bundle_js__rspack_import_4.loadLazyBundle),
  options: () => (/* reexport safe */ preact__rspack_import_22.options),
  preactCloneElement: () => (/* reexport safe */ preact_compat__rspack_import_0.cloneElement),
  process: () => (/* reexport safe */ preact__rspack_import_22.process),
  registerRuntimeBackend: () => (/* reexport safe */ _core_lynx_runtime_backend_js__rspack_import_25.registerRuntimeBackend),
  registerRuntimeVersion: () => (/* reexport safe */ _core_lynx_runtime_version_js__rspack_import_24.registerRuntimeVersion),
  registerWorkletOnBackground: () => (/* reexport safe */ _snapshot_worklet_hmr_js__rspack_import_29.registerWorkletOnBackground),
  snapshotCreateList: () => (/* reexport safe */ _snapshot_snapshot_list_js__rspack_import_11.snapshotCreateList),
  snapshotCreatorMap: () => (/* reexport safe */ _snapshot_snapshot_snapshot_js__rspack_import_12.snapshotCreatorMap),
  snapshotManager: () => (/* reexport safe */ _snapshot_snapshot_definition_js__rspack_import_9.snapshotManager),
  transformRef: () => (/* reexport safe */ _snapshot_snapshot_ref_js__rspack_import_17.transformRef),
  transformToWorklet: () => (/* reexport safe */ _core_background_function_handle_js__rspack_import_28.createBackgroundFunctionHandle),
  updateEvent: () => (/* reexport safe */ _snapshot_snapshot_event_js__rspack_import_16.updateEvent),
  updateGesture: () => (/* reexport safe */ _snapshot_snapshot_gesture_js__rspack_import_20.updateGesture),
  updateListItemPlatformInfo: () => (/* reexport safe */ _snapshot_snapshot_platformInfo_js__rspack_import_21.updateListItemPlatformInfo),
  updateRef: () => (/* reexport safe */ _snapshot_snapshot_ref_js__rspack_import_17.updateRef),
  updateSpread: () => (/* reexport safe */ _snapshot_snapshot_spread_js__rspack_import_15.updateSpread),
  updateWorkletEvent: () => (/* reexport safe */ _snapshot_snapshot_workletEvent_js__rspack_import_18.updateWorkletEvent),
  updateWorkletRef: () => (/* reexport safe */ _snapshot_snapshot_workletRef_js__rspack_import_19.updateWorkletRef),
  withInitDataInState: () => (/* reexport safe */ _core_initData_js__rspack_import_26.withInitDataInState),
  wrapWithLynxComponent: () => (/* reexport safe */ _core_compat_lynxComponent_js__rspack_import_27.wrapWithLynxComponent)
});
/* import */ var preact_compat__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
/* import */ var _runtime_marker_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/runtime-marker.js");
/* import */ var _lynx_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/lynx.js");
/* import */ var _core_hooks_react_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js");
/* import */ var _core_lynx_lazy_bundle_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/lazy-bundle.js");
/* import */ var _internal_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js");
/* import */ var _root_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _snapshot_compat_componentIs_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/compat/componentIs.js");
/* import */ var _snapshot_snapshot_backgroundSnapshot_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/backgroundSnapshot.js");
/* import */ var _snapshot_snapshot_definition_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _snapshot_snapshot_dynamicPartType_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js");
/* import */ var _snapshot_snapshot_list_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/list.js");
/* import */ var _snapshot_snapshot_snapshot_js__rspack_import_12 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _snapshot_snapshot_snapshotCreatorMap_js__rspack_import_13 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotCreatorMap.js");
/* import */ var _shared_render_constants_js__rspack_import_14 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _snapshot_snapshot_spread_js__rspack_import_15 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/spread.js");
/* import */ var _snapshot_snapshot_event_js__rspack_import_16 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/event.js");
/* import */ var _snapshot_snapshot_ref_js__rspack_import_17 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _snapshot_snapshot_workletEvent_js__rspack_import_18 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletEvent.js");
/* import */ var _snapshot_snapshot_workletRef_js__rspack_import_19 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
/* import */ var _snapshot_snapshot_gesture_js__rspack_import_20 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/gesture.js");
/* import */ var _snapshot_snapshot_platformInfo_js__rspack_import_21 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/platformInfo.js");
/* import */ var preact__rspack_import_22 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _core_lynx_dynamic_import_js__rspack_import_23 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/dynamic-import.js");
/* import */ var _core_lynx_runtime_version_js__rspack_import_24 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-version.js");
/* import */ var _core_lynx_runtime_backend_js__rspack_import_25 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-backend.js");
/* import */ var _core_initData_js__rspack_import_26 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/initData.js");
/* import */ var _core_compat_lynxComponent_js__rspack_import_27 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/compat/lynxComponent.js");
/* import */ var _core_background_function_handle_js__rspack_import_28 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/background-function/handle.js");
/* import */ var _snapshot_worklet_hmr_js__rspack_import_29 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/hmr.js");
/* import */ var _core_capture_main_thread_object_js__rspack_import_30 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/capture-main-thread-object.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

















var __DynamicPartSlot = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.Slot;
var __DynamicPartMultiChildren = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.MultiChildren;
var __DynamicPartChildren = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.Children;
var __DynamicPartListChildren = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.ListChildren;

// v2 slot
var __DynamicPartSlotV2 = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.SlotV2;
var __DynamicPartListSlotV2 = _snapshot_snapshot_dynamicPartType_js__rspack_import_10.DynamicPartType.ListSlotV2;










// Re-exported so lazy bundle shells can reach the host runtime APIs
// via `target[sExportsReactInternal]`.




/**
 * @internal a polyfill for <component is=? />
 */ var __ComponentIsPolyfill = /* @__PURE__ */ (0,_snapshot_compat_componentIs_js__rspack_import_7.factory)({
    Suspense: preact_compat__rspack_import_0.Suspense,
    lazy: preact_compat__rspack_import_0.lazy,
    createElement: preact_compat__rspack_import_0.createElement,
    useMemo: _core_hooks_react_js__rspack_import_3.useMemo
}, _core_lynx_lazy_bundle_js__rspack_import_4.loadLazyBundle);




if (true) // stringified for cross-thread HMR and must not capture module bindings);
// register this namespace as that runtime. Production creators close over
// their own module's runtime import, so this reference is dropped there.
(0,_snapshot_snapshot_snapshotCreatorMap_js__rspack_import_13.setSnapshotCreatorRuntime)(_internal_js__rspack_import_5);
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/lynx-api.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GlobalPropsConsumer: () => (GlobalPropsConsumer),
  GlobalPropsProvider: () => (GlobalPropsProvider),
  InitDataConsumer: () => (InitDataConsumer),
  InitDataProvider: () => (InitDataProvider),
  MainThreadRef: () => (/* reexport safe */ _core_main_thread_ref_js__rspack_import_9.MainThreadRef),
  defineMainThreadObjectType: () => (/* reexport safe */ _core_main_thread_object_js__rspack_import_10.defineMainThreadObjectType),
  markFirstScreenSyncReady: () => (markFirstScreenSyncReady),
  root: () => (root),
  runOnBackground: () => (/* reexport safe */ _core_background_function_run_on_background_js__rspack_import_7.runOnBackground),
  runOnMainThread: () => (/* reexport safe */ _snapshot_worklet_call_runOnMainThread_js__rspack_import_8.runOnMainThread),
  useGlobalProps: () => (useGlobalProps),
  useGlobalPropsChanged: () => (useGlobalPropsChanged),
  useInitData: () => (useInitData),
  useInitDataChanged: () => (useInitDataChanged),
  useLynxGlobalEventListener: () => (/* reexport safe */ _core_hooks_useLynxGlobalEventListener_js__rspack_import_3.useLynxGlobalEventListener),
  useMainThreadObject: () => (/* reexport safe */ _core_main_thread_object_js__rspack_import_10.useMainThreadObject),
  useMainThreadRef: () => (/* reexport safe */ _core_main_thread_ref_js__rspack_import_9.useMainThreadRef),
  withInitDataInState: () => (/* reexport safe */ _core_initData_js__rspack_import_4.withInitDataInState)
});
/* import */ var preact_compat__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
/* import */ var preact_hooks__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThread.js");
/* import */ var _core_globalProps_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/globalProps.js");
/* import */ var _core_hooks_useLynxGlobalEventListener_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/useLynxGlobalEventListener.js");
/* import */ var _core_initData_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/initData.js");
/* import */ var _root_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _snapshot_lifecycle_event_firstScreenSync_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/firstScreenSync.js");
/* import */ var _core_background_function_run_on_background_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/background-function/run-on-background.js");
/* import */ var _snapshot_worklet_call_runOnMainThread_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/call/runOnMainThread.js");
/* import */ var _core_main_thread_ref_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref.js");
/* import */ var _core_main_thread_object_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-object.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.







/**
 * The default and only root of ReactLynx for you to render JSX
 * @example
 * ```ts
 * import { root } from "@lynx-js/react"
 * ```
 *
 * @public
 *
 * @group Functions
 */ var root = {
    render: (jsx)=>{
        _root_js__rspack_import_5.__root.__jsx = jsx;
    },
    /* v8 ignore next 3 */ registerDataProcessors: (dataProcessorDefinition)=>{
        lynx.registerDataProcessors(dataProcessorDefinition);
    }
};
/**
 * Mark the first screen as ready to sync when `firstScreenSyncTiming` is `'manual'`.
 *
 * The main thread holds the UI control until this is called, so the handover timing to
 * the background thread (for hydration) is fully controlled by the user. It can be called
 * from both threads (a background-thread call is forwarded to the main thread), is a no-op
 * unless `firstScreenSyncTiming` is `'manual'`, and has no further effect once called.
 *
 * @example
 *
 * ```ts
 * import { markFirstScreenSyncReady } from "@lynx-js/react"
 *
 * markFirstScreenSyncReady();
 * ```
 *
 * @public
 *
 * @group Functions
 */ function markFirstScreenSyncReady() {
    if (true) return;
    // removed by dead control flow
{}
}
var _InitData = /* @__PURE__ */ (0,_core_initData_js__rspack_import_4.factory)({
    createContext: preact_compat__rspack_import_0.createContext,
    useState: preact_hooks__rspack_import_1.useState,
    createElement: preact_compat__rspack_import_0.createElement,
    useLynxGlobalEventListener: _core_hooks_useLynxGlobalEventListener_js__rspack_import_3.useLynxGlobalEventListener
}, '__initData', 'onDataChanged');
/**
 * The {@link https://react.dev/reference/react/createContext#provider | Provider} Component that provide `initData`,
 * you must wrap your JSX inside it
 * @group Components
 *
 * @example
 *
 * ```ts
 * import { root } from "@lynx-js/react"
 *
 * function App() {
 *   return (
 *     <InitDataConsumer children={(initData) => <view>...</view>}/>
 *   )
 * }
 *
 * root.render(
 *   <InitDataProvider>
 *      <App/>
 *   </InitDataProvider>
 * );
 *
 * ```
 *
 * @public
 *
 * @function
 */ // @ts-expect-error make preact and react types work
var InitDataProvider = /* @__PURE__ */ _InitData.Provider();
/**
 * The {@link https://react.dev/reference/react/createContext#consumer | Consumer} Component that provide `initData`.
 * This should be used with {@link InitDataProvider}
 * @group Components
 * @public
 *
 * @function
 */ // @ts-expect-error make preact and react types work
var InitDataConsumer = /* @__PURE__ */ _InitData.Consumer();
/**
 * A React Hooks for you to get `initData`.
 * If `initData` is changed, a re-render will be triggered automatically.
 *
 * @example
 *
 * ```ts
 * function App() {
 *   const initData = useInitData();
 *
 *   initData.someProperty // use it
 * }
 * ```
 *
 * @function
 * @public
 *
 * @group Hooks
 */ var useInitData = /* @__PURE__ */ _InitData.use();
/**
 * A React Hooks for you to get notified when `initData` changed.
 *
 * @example
 * ```ts
 * function App() {
 *   useInitDataChanged((data) => {
 *     data.someProperty // can use it
 *   })
 * }
 * ```
 * @function
 * @public
 *
 * @group Hooks
 */ var useInitDataChanged = /* @__PURE__ */ _InitData.useChanged();
var _GlobalProps = /* @__PURE__ */ (0,_core_globalProps_js__rspack_import_2.createGlobalProps)({
    createContext: preact_compat__rspack_import_0.createContext,
    useState: preact_hooks__rspack_import_1.useState,
    createElement: preact_compat__rspack_import_0.createElement,
    useLynxGlobalEventListener: _core_hooks_useLynxGlobalEventListener_js__rspack_import_3.useLynxGlobalEventListener
});
/**
 * The {@link https://react.dev/reference/react/createContext#provider | Provider} Component that provide `lynx.__globalProps`.
 * Only needed with `globalPropsMode: 'event'`; in the default `'reactive'` mode it renders its children directly
 * and updates come from a full re-render.
 * @group Components
 *
 * @example
 *
 * With `globalPropsMode: 'event'`:
 *
 * ```ts
 * import { root } from "@lynx-js/react"
 *
 * function App() {
 *   return (
 *     <GlobalPropsConsumer children={(globalProps) => <view>...</view>}/>
 *   )
 * }
 *
 * root.render(
 *   <GlobalPropsProvider>
 *      <App/>
 *   </GlobalPropsProvider>
 * );
 *
 * ```
 *
 * @public
 *
 * @function
 */ // @ts-expect-error make preact and react types work
var GlobalPropsProvider = /* @__PURE__ */ _GlobalProps.Provider();
/**
 * The {@link https://react.dev/reference/react/createContext#consumer | Consumer} Component that provide `lynx.__globalProps`.
 * Only needed with `globalPropsMode: 'event'`, together with {@link GlobalPropsProvider}; in the default `'reactive'` mode
 * it calls `children` with `lynx.__globalProps` directly and updates come from a full re-render.
 * @group Components
 * @public
 *
 * @function
 */ // @ts-expect-error make preact and react types work
var GlobalPropsConsumer = /* @__PURE__ */ _GlobalProps.Consumer();
/**
 * A React Hooks for you to get `lynx.__globalProps`.
 * With `globalPropsMode: 'event'`, the component re-renders when `lynx.__globalProps` changes;
 * in the default `'reactive'` mode, updates arrive through a full re-render.
 *
 * @example
 *
 * ```ts
 * function App() {
 *   const globalProps = useGlobalProps();
 *
 *   globalProps.someProperty // use it
 * }
 * ```
 *
 * @function
 * @public
 *
 * @group Hooks
 */ var useGlobalProps = /* @__PURE__ */ _GlobalProps.use();
/**
 * A React Hooks for you to get notified when `__globalProps` changed.
 *
 * @example
 * ```ts
 * function App() {
 *   useGlobalPropsChanged((data) => {
 *     lynx.__globalProps.someProperty // can use lynx.__globalProps
 *     data.someProperty // can use data
 *   })
 * }
 * ```
 * @function
 * @public
 *
 * @group Hooks
 */ var useGlobalPropsChanged = /* @__PURE__ */ _GlobalProps.useChanged();






// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/lynx.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runWithForce: () => (/* reexport safe */ _snapshot_lynx_runWithForce_js__rspack_import_11.runWithForce)
});
/* import */ var _core_hooks_react_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/react.js");
/* import */ var _shared_component_stack_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/component-stack.js");
/* import */ var _snapshot_alog_elementPAPICall_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/elementPAPICall.js");
/* import */ var _snapshot_alog_index_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/index.js");
/* import */ var _snapshot_debug_profileHooks_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/profileHooks.js");
/* import */ var _snapshot_lifecycle_patch_updateMainThread_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/updateMainThread.js");
/* import */ var _snapshot_lynx_calledByNative_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/calledByNative.js");
/* import */ var _snapshot_lynx_env_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/env.js");
/* import */ var _snapshot_lynx_injectLepusMethods_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/injectLepusMethods.js");
/* import */ var _snapshot_lynx_prepareLazyBundleMTS_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/prepareLazyBundleMTS.js");
/* import */ var _snapshot_worklet_ref_updateInitValue_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/ref/updateInitValue.js");
/* import */ var _snapshot_lynx_runWithForce_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/runWithForce.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
// to make sure preact's hooks to register earlier than ours












// @ts-expect-error Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature
if (typeof globalThis.processEvalResult === 'undefined') globalThis.processEvalResult = (result, schema)=>{
    return result === null || result === void 0 ? void 0 : result(schema);
};
(0,_snapshot_lynx_calledByNative_js__rspack_import_6.injectCalledByNative)();
(0,_snapshot_lifecycle_patch_updateMainThread_js__rspack_import_5.injectUpdateMainThread)();
(0,_snapshot_worklet_ref_updateInitValue_js__rspack_import_10.injectUpdateMTRefInitValue)();
if (false) {}
// `injectLepusMethods` exposes the snapshot <-> element mapping that preact
// devtools relies on, so it must also run when devtools is enabled in
// production via `REACT_DEVTOOL=true`.
if (true) (0,_snapshot_lynx_injectLepusMethods_js__rspack_import_8.injectLepusMethods)();
if (true) (0,_shared_component_stack_js__rspack_import_1.setupComponentStack)();
// We are profiling both main-thread and background.
if (true) (0,_snapshot_debug_profileHooks_js__rspack_import_4.initProfileHook)();
if (false) {}
if (false) {}
(0,_snapshot_lynx_env_js__rspack_import_7.setupLynxEnv)();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  __root: () => (__root),
  setRoot: () => (setRoot)
});
/* import */ var _snapshot_snapshot_snapshot_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * The internal ReactLynx's root.
 * {@link @lynx-js/react!Root | root}.
 */ var __root;
function setRoot(root) {
    __root = root;
    // A fake ELEMENT_NODE to make preact/debug happy.
    if ( true && __root) __root.nodeType = 1;
}
setRoot(new _snapshot_snapshot_snapshot_js__rspack_import_0.SnapshotInstance('root'));

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/runtime-marker.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var _core_lynx_runtime_backend_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-backend.js");
/* import */ var _core_lynx_runtime_version_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx/runtime-version.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
// Side-effect entry that registers this bundle's runtime markers (backend,
// version, ...) on load. Imported once by the runtime entry so later-loaded
// lazy bundles register their own markers too.


(0,_core_lynx_runtime_backend_js__rspack_import_0.registerRuntimeBackend)(_core_lynx_runtime_backend_js__rspack_import_0.RUNTIME_BACKEND_SNAPSHOT);
// An older `react-webpack-plugin` may not stamp `__RUNTIME_VERSION__`. Guard
// with `typeof` so referencing it does not throw when the define is missing.
(0,_core_lynx_runtime_version_js__rspack_import_1.registerRuntimeVersion)( false ? 0 : "0.128.0");
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/attribute-name.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isEventPropKey: () => (isEventPropKey),
  isNamespacedEventPropKey: () => (isNamespacedEventPropKey),
  transformAttrName: () => (transformAttrName)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var lynxEventAttributeNameRegExp = /^(?:global-bind|bind|catch|capture-bind|capture-catch)[A-Za-z]+$/;
var namespacedEventKeyRegExp = /^[A-Za-z-]+:(?:global-bind|bind|catch|capture-bind|capture-catch)[A-Za-z]+$/;
function isEventPropKey(key) {
    return lynxEventAttributeNameRegExp.test(key);
}
function isNamespacedEventPropKey(key) {
    return namespacedEventKeyRegExp.test(key);
}
function isReactEventAttributeName(name) {
    if (name.length <= 2 || !name.startsWith('on')) return false;
    var code = name.charCodeAt(2);
    if (code < 65 || code > 90) return false;
    for(var index = 3; index < name.length; index++){
        code = name.charCodeAt(index);
        if ((code < 65 || code > 90) && (code < 97 || code > 122)) return false;
    }
    return true;
}
function toDashCase(name) {
    var index = 0;
    for(; index < name.length; index++){
        var code = name.charCodeAt(index);
        if (code >= 65 && code <= 90) break;
    }
    if (index === name.length) return name;
    var transformed = name.slice(0, index);
    for(; index < name.length; index++){
        var code1 = name.charCodeAt(index);
        if (code1 >= 65 && code1 <= 90) {
            if (index !== 0) transformed += '-';
            transformed += name[index].toLowerCase();
        } else transformed += name[index];
    }
    return transformed;
}
function transformAttrName(name) {
    var _lynx___runtime_configs__;
    var config = (_lynx___runtime_configs__ = lynx.__runtime_configs__) === null || _lynx___runtime_configs__ === void 0 ? void 0 : _lynx___runtime_configs__.transformBuiltinAttributeNames;
    // A disabled config keeps every name unchanged.
    if (!config) return name;
    // An object config applies rules in `rename > preserve > mode` order.
    if (config !== true) {
        var _config_preserve;
        if (config.rename && Object.prototype.hasOwnProperty.call(config.rename, name)) return config.rename[name];
        if (((_config_preserve = config.preserve) === null || _config_preserve === void 0 ? void 0 : _config_preserve.includes(name)) || config.mode === 'mapping-only') return name;
    }
    // Enabled configs keep native Lynx event names unchanged.
    if (isEventPropKey(name) || isNamespacedEventPropKey(name)) return name;
    // `true` and the default dash-case mode apply React-style event mappings.
    if (isReactEventAttributeName(name)) {
        if (name === 'onClick') return 'bindtap';
        else if (name === 'onCatchTap') return 'catchtap';
        return `bind${name.slice(2).toLowerCase()}`;
    }
    // Remaining names use dash-case when the transform is enabled.
    return toDashCase(name);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/component-stack.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getCurrentVNode: () => (getCurrentVNode),
  getDisplayName: () => (getDisplayName),
  getOwnerStack: () => (getOwnerStack),
  setupComponentStack: () => (setupComponentStack)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * @license
The MIT License (MIT)

Copyright (c) 2015-present Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */ 

/**
 * Get human readable name of the component/dom node
 */ function getDisplayName(vnode) {
    var _vnode_type_displayName;
    if (vnode.type === preact__rspack_import_0.Fragment) return 'Fragment';
    else if (typeof vnode.type == 'function') return (_vnode_type_displayName = vnode.type.displayName) !== null && _vnode_type_displayName !== void 0 ? _vnode_type_displayName : vnode.type.name;
    else if (typeof vnode.type == 'string') return vnode.type;
    return '#text';
}
/**
 * Used to keep track of the currently rendered `vnode` and print it
 * in debug messages.
 */ var renderStack = [];
/**
 * Keep track of the current owners. An owner describes a component
 * which was responsible to render a specific `vnode`. This exclude
 * children that are passed via `props.children`, because they belong
 * to the parent owner.
 *
 * ```jsx
 * const Foo = props => <div>{props.children}</div> // div's owner is Foo
 * const Bar = props => {
 *   return (
 *     <Foo><span /></Foo> // Foo's owner is Bar, span's owner is Bar
 *   )
 * }
 * ```
 *
 * Note: A `vnode` may be hoisted to the root scope due to compiler
 * optimization. In these cases the `_owner` will be different.
 */ var ownerStack = [];
/**
 * Get the currently rendered `vnode`
 */ function getCurrentVNode() {
    return renderStack.length > 0 ? renderStack[renderStack.length - 1] : null;
}
/**
 * Check if a `vnode` is a possible owner.
 */ function isPossibleOwner(vnode) {
    return typeof vnode.type == 'function' && vnode.type != preact__rspack_import_0.Fragment;
}
/**
 * Return the component stack that was captured up to this point.
 */ function getOwnerStack(vnode) {
    var stack = [
        vnode
    ];
    var next = vnode;
    while(next._owner != null){
        stack.push(next._owner);
        next = next._owner;
    }
    return stack.reduce((acc, owner)=>{
        acc += `  in ${getDisplayName(owner)}`;
        var source = owner.__source;
        if (source) acc += ` (at ${source.fileName}:${source.lineNumber})`;
        return acc += '\n';
    }, '');
}
/**
 * Setup code to capture the component trace while rendering. Note that
 * we cannot simply traverse `vnode._parent` upwards, because we have some
 * debug messages for `this.setState` where the `vnode` is `undefined`.
 */ function setupComponentStack() {
    /* eslint-disable @typescript-eslint/unbound-method */ var oldDiff = preact__rspack_import_0.options[_render_constants_js__rspack_import_1.DIFF];
    var oldDiffed = preact__rspack_import_0.options[_render_constants_js__rspack_import_1.DIFFED];
    var oldRoot = preact__rspack_import_0.options[_render_constants_js__rspack_import_1.ROOT];
    var oldVNode = preact__rspack_import_0.options.vnode;
    var oldRender = preact__rspack_import_0.options[_render_constants_js__rspack_import_1.RENDER];
    /* eslint-enable @typescript-eslint/unbound-method */ preact__rspack_import_0.options[_render_constants_js__rspack_import_1.DIFFED] = (vnode)=>{
        if (isPossibleOwner(vnode)) ownerStack.pop();
        renderStack.pop();
        if (oldDiffed) oldDiffed(vnode);
    };
    preact__rspack_import_0.options[_render_constants_js__rspack_import_1.DIFF] = (vnode)=>{
        if (isPossibleOwner(vnode)) renderStack.push(vnode);
        if (oldDiff) oldDiff(vnode);
    };
    preact__rspack_import_0.options[_render_constants_js__rspack_import_1.ROOT] = (vnode, parent)=>{
        ownerStack = [];
        if (oldRoot) oldRoot(vnode, parent);
    };
    preact__rspack_import_0.options.vnode = (vnode)=>{
        // Scheduled component updates clone the vnode before entering its render scope.
        // Preserve the original owner when Preact invokes this hook for that clone.
        if (vnode._owner === undefined) vnode._owner = ownerStack.length > 0 ? ownerStack[ownerStack.length - 1] : null;
        if (oldVNode) oldVNode(vnode);
    };
    preact__rspack_import_0.options[_render_constants_js__rspack_import_1.RENDER] = (vnode)=>{
        if (isPossibleOwner(vnode)) ownerStack.push(vnode);
        if (oldRender) oldRender(vnode);
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/index-map.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IndexMap: () => (IndexMap)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
class IndexMap {
    add(value) {
        var index = ++this.lastIndex;
        this.indexMap.set(index, value);
        return index;
    }
    get(index) {
        return this.indexMap.get(index);
    }
    remove(index) {
        this.indexMap.delete(index);
    }
    get size() {
        return this.indexMap.size;
    }
    constructor(){
        this.lastIndex = 0;
        this.indexMap = new Map();
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isProfiling: () => (isProfiling),
  profileEnd: () => (profileEnd),
  profileFlowId: () => (profileFlowId),
  profileStart: () => (profileStart)
});
var _lynx_performance_isProfileRecording, _lynx_performance;
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/* v8 ignore start */ var noop = ()=>{};
var noopFlowId = ()=>0;
/* v8 ignore end */ var isProfiling = /* @__PURE__ */ Boolean((_lynx_performance = lynx.performance) === null || _lynx_performance === void 0 ? void 0 : (_lynx_performance_isProfileRecording = _lynx_performance.isProfileRecording) === null || _lynx_performance_isProfileRecording === void 0 ? void 0 : _lynx_performance_isProfileRecording.call(_lynx_performance));
var profileStart = /* @__PURE__ */ (()=>{
    var p;
    if (!(p = lynx.performance) || typeof p.profileStart !== 'function') return noop;
    return p.profileStart.bind(p);
})();
var profileEnd = /* @__PURE__ */ (()=>{
    var p;
    if (!(p = lynx.performance) || typeof p.profileEnd !== 'function') return noop;
    return p.profileEnd.bind(p);
})();
var profileFlowId = /* @__PURE__ */ (()=>{
    var p;
    if (!(p = lynx.performance) || typeof p.profileFlowId !== 'function') return noopFlowId;
    return p.profileFlowId.bind(p);
})();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BITS: () => (BITS),
  CATCH_ERROR: () => (CATCH_ERROR),
  CHILDREN: () => (CHILDREN),
  CHILD_DID_SUSPEND: () => (CHILD_DID_SUSPEND),
  COMMIT: () => (COMMIT),
  COMPONENT: () => (COMPONENT),
  COMPONENT_DIRTY: () => (COMPONENT_DIRTY),
  COMPONENT_FORCE: () => (COMPONENT_FORCE),
  DIFF: () => (DIFF),
  DIFF2: () => (DIFF2),
  DIFFED: () => (DIFFED),
  DOM: () => (DOM),
  FLAGS: () => (FLAGS),
  GLOBAL_CONTEXT: () => (GLOBAL_CONTEXT),
  HOOK: () => (HOOK),
  HOOKS: () => (HOOKS),
  INDEX: () => (INDEX),
  LIST: () => (LIST),
  MASK: () => (MASK),
  NEXT_STATE: () => (NEXT_STATE),
  NEXT_VALUE: () => (NEXT_VALUE),
  ORIGINAL: () => (ORIGINAL),
  PARENT: () => (PARENT),
  PENDING_EFFECTS: () => (PENDING_EFFECTS),
  RENDER: () => (RENDER),
  RENDER_CALLBACKS: () => (RENDER_CALLBACKS),
  RENDER_COMPONENT: () => (RENDER_COMPONENT),
  ROOT: () => (ROOT),
  SKIP_EFFECTS: () => (SKIP_EFFECTS),
  VALUE: () => (VALUE),
  VNODE: () => (VNODE)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var DIFF = '__b';
var DIFF2 = '_diff2';
var RENDER = '__r';
var DIFFED = 'diffed';
var COMMIT = '__c';
var SKIP_EFFECTS = '__s';
var CATCH_ERROR = '__e';
var ROOT = '__';
var RENDER_COMPONENT = 'renderComponent';
// VNode properties
var COMPONENT = '__c';
var CHILDREN = '__k';
var PARENT = '__';
var MASK = '__m';
var DOM = '__e';
var ORIGINAL = '__v';
var INDEX = '__i';
var FLAGS = '__u';
// Component properties
var VNODE = '__v';
// Preact 11 merged the `_dirty` / `_force` / error booleans into a `_bits`
// bitfield (`COMPONENT_DIRTY = 1 << 3`, `COMPONENT_FORCE = 1 << 2`).
var BITS = '__g';
var COMPONENT_DIRTY = 8;
var COMPONENT_FORCE = 4;
var NEXT_STATE = '__s';
var GLOBAL_CONTEXT = '__n';
var CHILD_DID_SUSPEND = '__c';
var RENDER_CALLBACKS = '__h';
var HOOK = '__h';
// Hooks properties
var HOOKS = '__H';
var LIST = '__';
var VALUE = '__';
var NEXT_VALUE = '__N';
var PENDING_EFFECTS = '__h';
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/elementPAPICall.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initElementPAPICallAlog: () => (initElementPAPICallAlog)
});
/* import */ var _shared_profile_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var fiberElementPAPINameList = [
    '__CreatePage',
    '__CreateElement',
    '__CreateWrapperElement',
    '__CreateText',
    '__CreateImage',
    '__CreateView',
    '__CreateRawText',
    '__CreateList',
    '__AppendElement',
    '__InsertElementBefore',
    '__RemoveElement',
    '__ReplaceElement',
    '__FirstElement',
    '__LastElement',
    '__NextElement',
    '__GetPageElement',
    '__GetTemplateParts',
    '__AddDataset',
    '__SetDataset',
    '__GetDataset',
    '__SetAttribute',
    '__GetAttributes',
    '__GetAttributeByName',
    '__GetAttributeNames',
    '__SetClasses',
    '__SetCSSId',
    '__AddInlineStyle',
    '__SetInlineStyles',
    '__AddEvent',
    '__SetID',
    '__GetElementUniqueID',
    '__GetTag',
    '__FlushElementTree',
    '__UpdateListCallbacks',
    '__OnLifecycleEvent',
    '__QueryComponent',
    '__SetGestureDetector',
    '__RemoveGestureDetector'
];
function initElementPAPICallAlog(globalWithIndex = globalThis) {
    var count = 0;
    var fiberElementMap = new Map();
    function formatFiberElement(fiberElement) {
        var fiberElementInfo = fiberElementMap.get(fiberElement);
        return `${fiberElementInfo.tag}#${fiberElementInfo.uniqueId}`;
    }
    var filteredFiberElementPAPINameList = fiberElementPAPINameList.filter((fiberElementPAPIName)=>typeof globalWithIndex[fiberElementPAPIName] === 'function');
    var originalFiberElementPAPIs = filteredFiberElementPAPINameList.reduce((prev, fiberElementPAPIName)=>({
            ...prev,
            [fiberElementPAPIName]: globalWithIndex[fiberElementPAPIName]
        }), {});
    filteredFiberElementPAPINameList.forEach((fiberElementPAPIName)=>{
        var oldFiberElementPAPI = globalWithIndex[fiberElementPAPIName];
        if (typeof oldFiberElementPAPI === 'function') globalWithIndex[fiberElementPAPIName] = (...args)=>{
            var _console_alog, _console;
            if (true) (0,_shared_profile_js__rspack_import_0.profileStart)(`FiberElementPAPI: ${fiberElementPAPIName}`, {
                args: {
                    args: JSON.stringify(args)
                }
            });
            var result = oldFiberElementPAPI(...args);
            if (true) (0,_shared_profile_js__rspack_import_0.profileEnd)();
            var formattedArgs = [
                ...args
            ];
            for(var i = 0; i < formattedArgs.length; i++){
                var arg = formattedArgs[i];
                if (Array.isArray(arg)) formattedArgs[i] = '[' + arg.map((item)=>{
                    if (fiberElementMap.has(item)) return formatFiberElement(item);
                    return JSON.stringify(item);
                }).join(', ') + ']';
                else if (fiberElementMap.has(arg)) formattedArgs[i] = formatFiberElement(arg);
                else formattedArgs[i] = JSON.stringify(arg);
            }
            if (fiberElementPAPIName === '__CreatePage' || fiberElementPAPIName === '__CreateElement' || fiberElementPAPIName === '__CreateWrapperElement' || fiberElementPAPIName === '__CreateText' || fiberElementPAPIName === '__CreateImage' || fiberElementPAPIName === '__CreateView' || fiberElementPAPIName === '__CreateRawText' || fiberElementPAPIName === '__CreateList') fiberElementMap.set(result, {
                tag: originalFiberElementPAPIs['__GetTag'](result),
                uniqueId: originalFiberElementPAPIs['__GetElementUniqueID'](result)
            });
            var formattedResult;
            if (fiberElementMap.has(result)) formattedResult = formatFiberElement(result);
            else if (result !== null) formattedResult = JSON.stringify(result);
            (_console_alog = (_console = console).alog) === null || _console_alog === void 0 ? void 0 : _console_alog.call(_console, `[ReactLynxDebug] FiberElement API call #${++count}: ${fiberElementPAPIName}(${formattedArgs.join(', ')})${formattedResult == null ? '' : ` => ${formattedResult}`}`);
            return result;
        };
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initAlog: () => (initAlog)
});
/* import */ var _render_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/render.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function initAlog() {
    (0,_render_js__rspack_import_0.initRenderAlog)();
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/alog/render.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initRenderAlog: () => (initRenderAlog)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function initRenderAlog() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var oldAfterDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED];
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED] = function(vnode) {
        // Only log on component vnode
        if (typeof vnode.type === 'function') {
            var _console_alog, _console;
            var threadName = 'MainThread';
            var displayName = (0,_utils_js__rspack_import_2.getDisplayName)(vnode.type);
            (_console_alog = (_console = console).alog) === null || _console_alog === void 0 ? void 0 : _console_alog.call(_console, `[${threadName} Component Render] name: ${displayName}`);
        }
        oldAfterDiff === null || oldAfterDiff === void 0 ? void 0 : oldAfterDiff(vnode);
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/compat/componentIs.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  factory: () => (factory)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
// for better reuse if runtime is changed
function factory({ createElement, useMemo, Suspense, lazy }, loadLazyBundle) {
    /**
     * @internal a polyfill for <component is=? />
     */ var __ComponentIsPolyfill = ({ is, ...props })=>{
        if (typeof is !== 'string') {
            lynx.reportError(new Error('You must provide a string to props `is` when using syntax `<component is=? />`.'));
            return null;
        }
        // @ts-ignore
        var D = useMemo(()=>lazy(()=>loadLazyBundle(is)), [
            is
        ]);
        return createElement(Suspense, {
            key: is
        }, createElement(D, props));
    };
    return __ComponentIsPolyfill;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/describeInvalidValue.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  describeInvalidValue: () => (describeInvalidValue)
});
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
function describeInvalidValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'function') return `function ${value.name || '(anonymous)'}`;
    if (typeof value === 'string') return `string "${value}"`;
    if (typeof value === 'number' || typeof value === 'bigint' || typeof value === 'boolean') return `${typeof value} ${String(value)}`;
    if (typeof value === 'symbol') return `symbol ${String(value)}`;
    return `unexpected ${typeof value}`;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/formatPatch.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  prettyFormatSnapshotPatch: () => (prettyFormatSnapshotPatch)
});
/* import */ var _lifecycle_patch_snapshotPatch_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function prettyFormatSnapshotPatch(snapshotPatch) {
    var _loop = function(i1) {
        var op = snapshotPatch[i1];
        var config = _lifecycle_patch_snapshotPatch_js__rspack_import_0.SnapshotOperationParams[op];
        if (config) {
            var formattedOp = {
                op: config.name
            };
            config.params.forEach((param, index)=>{
                formattedOp[param] = snapshotPatch[i1 + 1 + index];
            });
            result.push(formattedOp);
            i1 += 1 + config.params.length;
        } else throw new Error(`Unknown snapshot operation: ${op}`);
        i = i1, void 0;
    };
    if (!snapshotPatch) return [];
    var result = [];
    for(var i = 0; i < snapshotPatch.length;)_loop(i);
    return result;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/profileHooks.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initProfileHook: () => (initProfileHook)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function initProfileHook() {
    // early-exit if required profiling APIs are unavailable
    var p;
    /* v8 ignore start */ if (!(p = lynx.performance) || typeof p.profileStart !== 'function' || typeof p.profileEnd !== 'function' || typeof p.profileMark !== 'function' || typeof p.profileFlowId !== 'function') return;
    /* v8 ignore stop */ var profileStart = p.profileStart.bind(p);
    var profileEnd = p.profileEnd.bind(p);
    p.profileMark.bind(p);
    p.profileFlowId.bind(p);
    // for each setState call, we will add a profiling trace and
    // attach a flowId to the component instance.
    // This allows us to trace the flow of its diffing, committing and patching.
    {
        Symbol('FLOW_ID');
        // These hot callbacks have fixed signatures; avoid collecting and spreading
        // an argument array for every host and component visited.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var oldDiff2 = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF2];
        preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFF2] = (vnode, oldVNode)=>{
            // We only add profiling trace for Component
            if (typeof vnode.type === 'function') {
                var profileOptions = {};
                profileStart(`ReactLynx::diff::${/* #__INLINE__ */ (0,_utils_js__rspack_import_2.getDisplayName)(vnode.type)}`, profileOptions);
            }
            oldDiff2 === null || oldDiff2 === void 0 ? void 0 : oldDiff2(vnode, oldVNode);
        };
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var oldDiffed = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED];
        preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED] = (vnode)=>{
            if (typeof vnode.type === 'function') profileEnd(); // for options[DIFF2]
            oldDiffed === null || oldDiffed === void 0 ? void 0 : oldDiffed(vnode);
        };
    }
    // Profile the user-provided `render`.
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var oldRender = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.RENDER];
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.RENDER] = (vnode)=>{
        // eslint-disable-next-line @typescript-eslint/unbound-method
        var originalRender = vnode[_shared_render_constants_js__rspack_import_1.COMPONENT].render;
        vnode[_shared_render_constants_js__rspack_import_1.COMPONENT].render = function render(props, state, context) {
            profileStart(`ReactLynx::render::${/* #__INLINE__ */ (0,_utils_js__rspack_import_2.getDisplayName)(vnode.type)}`);
            try {
                return originalRender.call(this, props, state, context);
            } finally{
                profileEnd();
                vnode[_shared_render_constants_js__rspack_import_1.COMPONENT].render = originalRender;
            }
        };
        oldRender === null || oldRender === void 0 ? void 0 : oldRender(vnode);
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/vnodeSource.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearSnapshotVNodeSource: () => (clearSnapshotVNodeSource),
  getSnapshotVNodeSource: () => (getSnapshotVNodeSource),
  moveSnapshotVNodeSource: () => (moveSnapshotVNodeSource),
  setupVNodeSourceHook: () => (setupVNodeSourceHook)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var snapshotVNodeSourceMap = /*#__PURE__*/ new Map();
var hookInstalled = false;
function formatSource(source) {
    if (!source.fileName) return undefined;
    if (typeof source.lineNumber === 'number' && typeof source.columnNumber === 'number') return `${source.fileName}:${source.lineNumber}:${source.columnNumber}`;
    if (typeof source.lineNumber === 'number') return `${source.fileName}:${source.lineNumber}`;
    return source.fileName;
}
function captureVNodeSource(vnode) {
    var _vnode_DOM;
    if (typeof vnode.type !== 'string') return;
    var source = vnode.__source;
    var id = (_vnode_DOM = vnode[_shared_render_constants_js__rspack_import_1.DOM]) === null || _vnode_DOM === void 0 ? void 0 : _vnode_DOM.__id;
    if (!source || typeof id !== 'number') return;
    var formattedSource = formatSource(source);
    if (formattedSource) snapshotVNodeSourceMap.set(id, formattedSource);
}
function setupVNodeSourceHook() {
    if (hookInstalled) return;
    hookInstalled = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var oldDiffed = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED];
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_1.DIFFED] = (vnode)=>{
        captureVNodeSource(vnode);
        oldDiffed === null || oldDiffed === void 0 ? void 0 : oldDiffed(vnode);
    };
}
function moveSnapshotVNodeSource(oldId, newId) {
    if (oldId === newId) return;
    var source = snapshotVNodeSourceMap.get(oldId);
    if (source) {
        snapshotVNodeSourceMap.set(newId, source);
        snapshotVNodeSourceMap.delete(oldId);
    }
}
function getSnapshotVNodeSource(id) {
    return snapshotVNodeSourceMap.get(id);
}
function clearSnapshotVNodeSource() {
    snapshotVNodeSourceMap.clear();
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/processGesture.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  processGesture: () => (processGesture),
  retainGestureWorkletCtx: () => (retainGestureWorkletCtx)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _types_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/types.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


function isSerializedGesture(gesture) {
    var _gesture___isSerialized;
    return (_gesture___isSerialized = gesture.__isSerialized) !== null && _gesture___isSerialized !== void 0 ? _gesture___isSerialized : false;
}
function getSerializedBaseGesture(gesture) {
    if (!gesture || !isSerializedGesture(gesture)) return undefined;
    if (gesture.type !== _types_js__rspack_import_1.GestureTypeInner.COMPOSED) return gesture;
    return undefined;
}
function appendUniqueSerializedBaseGestures(gesture, out, seenIds) {
    if (!gesture || !isSerializedGesture(gesture)) return;
    if (gesture.type === _types_js__rspack_import_1.GestureTypeInner.COMPOSED) {
        for (var subGesture of gesture.gestures)appendUniqueSerializedBaseGestures(subGesture, out, seenIds);
        return;
    }
    var baseGesture = gesture;
    if (seenIds.has(baseGesture.id)) return;
    seenIds.add(baseGesture.id);
    out.push(baseGesture);
}
function collectOldGestureInfo(oldGesture) {
    var uniqOldBaseGestures = [];
    var oldBaseGesturesById = new Map();
    appendOldGestureInfo(oldGesture, uniqOldBaseGestures, oldBaseGesturesById);
    return {
        uniqOldBaseGestures,
        oldBaseGesturesById
    };
}
function appendOldGestureInfo(gesture, out, byId) {
    if (!gesture || !isSerializedGesture(gesture)) return;
    if (gesture.type === _types_js__rspack_import_1.GestureTypeInner.COMPOSED) {
        for (var subGesture of gesture.gestures)appendOldGestureInfo(subGesture, out, byId);
        return;
    }
    var oldBaseGesture = gesture;
    if (!byId.has(oldBaseGesture.id)) {
        byId.set(oldBaseGesture.id, oldBaseGesture);
        out.push(oldBaseGesture);
    }
}
function consumeOldBaseGesture(baseGesture, uniqOldBaseGestures, oldBaseGesturesById) {
    var idMatchedOldBaseGesture = oldBaseGesturesById.get(baseGesture.id);
    if (idMatchedOldBaseGesture) {
        oldBaseGesturesById.delete(baseGesture.id);
        return idMatchedOldBaseGesture;
    }
    var fallbackOldBaseGesture = uniqOldBaseGestures.find((oldBaseGesture)=>oldBaseGesturesById.has(oldBaseGesture.id));
    if (!fallbackOldBaseGesture) return undefined;
    oldBaseGesturesById.delete(fallbackOldBaseGesture.id);
    return fallbackOldBaseGesture;
}
function retainGestureWorkletCtx(gesture) {
    var retainedBaseGestures = [];
    appendUniqueSerializedBaseGestures(gesture, retainedBaseGestures, new Set());
    for (var baseGesture of retainedBaseGestures)for (var key of Object.keys(baseGesture.callbacks)){
        var callback = baseGesture.callbacks[key];
        if (callback) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.retainWorkletCtx)(callback);
    }
}
function removeGestureDetector(dom, id) {
    // Keep compatibility with old runtimes where remove API is not exposed.
    if (typeof __RemoveGestureDetector === 'function') __RemoveGestureDetector(dom, id);
}
function clearLegacyGestureState(dom) {
    __SetAttribute(dom, 'has-react-gesture', null);
    // `flatten` may still be required by unrelated attrs from the same spread
    // (e.g. `clip-radius`), so only clear the gesture-specific legacy state here.
    // When `__RemoveGestureDetector` is available, let it own the detector cleanup
    // so we do not clobber an unrelated user-provided `gesture` attr.
    if (typeof __RemoveGestureDetector !== 'function') __SetAttribute(dom, 'gesture', null);
}
function getGestureInfo(gesture, oldGesture, isFirstScreen, dom) {
    var _ref, _ref1, _ref2;
    var _baseGesture_waitFor, _baseGesture_simultaneousWith, _baseGesture_continueWith;
    var config = {
        callbacks: []
    };
    var baseGesture = gesture;
    if (baseGesture.config) config.config = baseGesture.config;
    for (var key of Object.keys(baseGesture.callbacks)){
        var callback = baseGesture.callbacks[key];
        var oldCallback = oldGesture === null || oldGesture === void 0 ? void 0 : oldGesture.callbacks[key];
        (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.onWorkletCtxUpdate)(callback, oldCallback, isFirstScreen, dom);
        config.callbacks.push({
            name: key,
            callback: callback
        });
    }
    var relationMap = {
        waitFor: (_ref = baseGesture === null || baseGesture === void 0 ? void 0 : (_baseGesture_waitFor = baseGesture.waitFor) === null || _baseGesture_waitFor === void 0 ? void 0 : _baseGesture_waitFor.map((subGesture)=>subGesture.id)) !== null && _ref !== void 0 ? _ref : [],
        simultaneous: (_ref1 = baseGesture === null || baseGesture === void 0 ? void 0 : (_baseGesture_simultaneousWith = baseGesture.simultaneousWith) === null || _baseGesture_simultaneousWith === void 0 ? void 0 : _baseGesture_simultaneousWith.map((subGesture)=>subGesture.id)) !== null && _ref1 !== void 0 ? _ref1 : [],
        continueWith: (_ref2 = baseGesture === null || baseGesture === void 0 ? void 0 : (_baseGesture_continueWith = baseGesture.continueWith) === null || _baseGesture_continueWith === void 0 ? void 0 : _baseGesture_continueWith.map((subGesture)=>subGesture.id)) !== null && _ref2 !== void 0 ? _ref2 : []
    };
    return {
        config,
        relationMap
    };
}
function processGesture(dom, gesture, oldGesture, isFirstScreen, gestureOptions) {
    var domSet = (gestureOptions === null || gestureOptions === void 0 ? void 0 : gestureOptions.domSet) === true;
    if ((gestureOptions === null || gestureOptions === void 0 ? void 0 : gestureOptions.retainCallbacks) !== false) retainGestureWorkletCtx(gesture);
    if (!gesture || !isSerializedGesture(gesture)) {
        var { oldBaseGesturesById } = collectOldGestureInfo(oldGesture);
        for (var oldBaseGesture of oldBaseGesturesById.values())removeGestureDetector(dom, oldBaseGesture.id);
        // Clearing the attrs keeps the legacy main-thread state in sync when
        // gesture props disappear during spread/key-removal updates.
        if (!domSet && oldBaseGesturesById.size > 0) clearLegacyGestureState(dom);
        return;
    }
    var { uniqOldBaseGestures, oldBaseGesturesById: oldBaseGesturesById1 } = collectOldGestureInfo(oldGesture);
    // Fast path for the most common case: single base gesture update.
    var singleBaseGesture = getSerializedBaseGesture(gesture);
    var singleOldBaseGesture = getSerializedBaseGesture(oldGesture);
    if (singleBaseGesture && (!oldGesture || singleOldBaseGesture)) {
        if (!domSet) {
            __SetAttribute(dom, 'has-react-gesture', true);
            __SetAttribute(dom, 'flatten', false);
        }
        if (singleOldBaseGesture) removeGestureDetector(dom, singleOldBaseGesture.id);
        var { config, relationMap } = getGestureInfo(singleBaseGesture, singleOldBaseGesture, isFirstScreen, dom);
        __SetGestureDetector(dom, singleBaseGesture.id, singleBaseGesture.type, config, relationMap);
        return;
    }
    var uniqBaseGestures = [];
    appendUniqueSerializedBaseGestures(gesture, uniqBaseGestures, new Set());
    if (uniqBaseGestures.length === 0) {
        for (var oldBaseGesture1 of oldBaseGesturesById1.values())removeGestureDetector(dom, oldBaseGesture1.id);
        if (!domSet && oldBaseGesturesById1.size > 0) clearLegacyGestureState(dom);
        return;
    }
    if (!domSet) {
        __SetAttribute(dom, 'has-react-gesture', true);
        __SetAttribute(dom, 'flatten', false);
    }
    // On update, remove old detectors first to avoid stale callbacks.
    for (var oldBaseGesture2 of oldBaseGesturesById1.values())removeGestureDetector(dom, oldBaseGesture2.id);
    for (var baseGesture of uniqBaseGestures){
        var oldBaseGesture3 = consumeOldBaseGesture(baseGesture, uniqOldBaseGestures, oldBaseGesturesById1);
        var { config: config1, relationMap: relationMap1 } = getGestureInfo(baseGesture, oldBaseGesture3, isFirstScreen, dom);
        __SetGestureDetector(dom, baseGesture.id, baseGesture.type, config1, relationMap1);
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/processGestureBagkround.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  prepareGestureForCommit: () => (prepareGestureForCommit)
});
/* import */ var _types_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/types.js");
/* import */ var _worklet_ctx_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/ctx.js");


function prepareWorkletForCommit(value) {
    // Copy-on-commit: keep the background-side gesture/worklet objects clean.
    // `_execId` is injected into the payload object that will be sent to the main thread.
    var copy = {
        ...value
    };
    return (0,_worklet_ctx_js__rspack_import_1.onPostWorkletCtx)(copy);
}
function removeUndefinedFields(record) {
    var filteredEntries = Object.entries(record).filter(([, value])=>value !== undefined);
    return Object.fromEntries(filteredEntries);
}
function serializeCommittedGesture(gesture) {
    var _ref, _ref1, _ref2;
    var _baseGesture_simultaneousWith, _baseGesture_waitFor, _baseGesture_continueWith;
    if (gesture.type === _types_js__rspack_import_0.GestureTypeInner.COMPOSED) {
        var composed = gesture;
        return {
            type: composed.type,
            gestures: composed.gestures.map((subGesture)=>serializeCommittedGesture(subGesture)),
            __isSerialized: true
        };
    }
    var baseGesture = gesture;
    return removeUndefinedFields({
        config: baseGesture.config,
        id: baseGesture.id,
        type: baseGesture.type,
        simultaneousWith: (_ref = (_baseGesture_simultaneousWith = baseGesture.simultaneousWith) === null || _baseGesture_simultaneousWith === void 0 ? void 0 : _baseGesture_simultaneousWith.map((subGesture)=>({
                id: subGesture.id
            }))) !== null && _ref !== void 0 ? _ref : [],
        waitFor: (_ref1 = (_baseGesture_waitFor = baseGesture.waitFor) === null || _baseGesture_waitFor === void 0 ? void 0 : _baseGesture_waitFor.map((subGesture)=>({
                id: subGesture.id
            }))) !== null && _ref1 !== void 0 ? _ref1 : [],
        continueWith: (_ref2 = (_baseGesture_continueWith = baseGesture.continueWith) === null || _baseGesture_continueWith === void 0 ? void 0 : _baseGesture_continueWith.map((subGesture)=>({
                id: subGesture.id
            }))) !== null && _ref2 !== void 0 ? _ref2 : [],
        callbacks: baseGesture.callbacks,
        __isSerialized: true
    });
}
function attachCommittedSerializer(gesture) {
    var serialize = ()=>serializeCommittedGesture(gesture);
    return Object.assign(gesture, {
        serialize,
        toJSON: serialize
    });
}
/**
 * Prepare a gesture payload to be sent to the main thread.
 *
 * This function returns a copy of the input object and injects `_execId` into
 * its worklet callbacks. The background-side gesture object MUST NOT be mutated,
 * otherwise `_execId` churn would pollute the cached values and cause redundant patches.
 */ function prepareGestureForCommit(gesture) {
    if (gesture.type === _types_js__rspack_import_0.GestureTypeInner.COMPOSED) {
        var composed = gesture;
        var committed = {
            ...composed,
            gestures: composed.gestures.map((g)=>prepareGestureForCommit(g))
        };
        return attachCommittedSerializer(committed);
    }
    var baseGesture = gesture;
    var committedCallbacks = {
        ...baseGesture.callbacks
    };
    for (var name of Object.keys(committedCallbacks)){
        var callback = committedCallbacks[name];
        if (callback == null) continue;
        // `onPostWorkletCtx` may report errors and return null depending on runtime configuration.
        // Keep behavior consistent with the previous implementation (which used `!`).
        committedCallbacks[name] = prepareWorkletForCommit(callback);
    }
    var committed1 = {
        ...baseGesture,
        callbacks: committedCallbacks
    };
    return attachCommittedSerializer(committed1);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/types.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GestureTypeInner: () => (GestureTypeInner)
});
var GestureTypeInner = {
    COMPOSED: -1,
    PAN: 0,
    FLING: 1,
    DEFAULT: 2,
    TAP: 3,
    LONGPRESS: 4,
    ROTATION: 5,
    PINCH: 6,
    NATIVE: 7
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LifecycleConstant: () => (LifecycleConstant),
  NativeUpdateDataType: () => (NativeUpdateDataType)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var LifecycleConstant = {
    firstScreen: 'rLynxFirstScreen',
    updateFromRoot: 'updateFromRoot',
    globalEventFromLepus: 'globalEventFromLepus',
    // Signals the main thread to sync the first screen, sent by the background thread
    // (automatically in `jsReady` mode, or via `markFirstScreenSyncReady()` in `manual`).
    firstScreenSyncReady: 'rLynxFirstScreenSyncReady',
    patchUpdate: 'rLynxChange',
    publishEvent: 'rLynxPublishEvent',
    updateMTRefInitValue: 'rLynxChangeRefInitValue',
    prepareLazyBundleMTS: 'rLynxPrepareLazyBundleMTS'
};
var NativeUpdateDataType = {
    UPDATE: 0,
    RESET: 1
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/destroy.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  destroyBackground: () => (destroyBackground)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _root_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _event_delayEvents_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/delayEvents.js");
/* import */ var _event_delayLifecycleEvents_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/delayLifecycleEvents.js");
/* import */ var _patch_commit_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/commit.js");
/* import */ var _shared_profile_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _utils_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.







function destroyBackground() {
    if (true) (0,_shared_profile_js__rspack_import_5.profileStart)('ReactLynx::destroyBackground');
    (0,_utils_js__rspack_import_6.withSyncEffectFlush)(()=>{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (0,preact__rspack_import_0.render)(null, _root_js__rspack_import_1.__root);
    });
    _patch_commit_js__rspack_import_4.globalCommitTaskMap.forEach((task)=>{
        task();
    });
    _patch_commit_js__rspack_import_4.globalCommitTaskMap.clear();
    // Clear delayed events which should not be executed after destroyed.
    // This is important when the page is performing a reload.
    _event_delayLifecycleEvents_js__rspack_import_3.delayedLifecycleEvents.length = 0;
    if (_event_delayEvents_js__rspack_import_2.delayedEvents) _event_delayEvents_js__rspack_import_2.delayedEvents.length = 0;
    if (true) (0,_shared_profile_js__rspack_import_5.profileEnd)();
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/delayEvents.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  delayedEvents: () => (delayedEvents),
  delayedPublishEvent: () => (delayedPublishEvent)
});
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var delayedEvents;
function delayedPublishEvent(handlerName, data) {
    delayedEvents !== null && delayedEvents !== void 0 ? delayedEvents : delayedEvents = [];
    delayedEvents.push([
        handlerName,
        data
    ]);
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/delayLifecycleEvents.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  delayLifecycleEvent: () => (delayLifecycleEvent),
  delayedLifecycleEvents: () => (delayedLifecycleEvents)
});
var delayedLifecycleEvents = [];
function delayLifecycleEvent(type, data) {
    delayedLifecycleEvents.push([
        type,
        data
    ]);
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/firstScreenSync.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearFirstScreenEventIdSwap: () => (clearFirstScreenEventIdSwap),
  firstScreenEventIdSwap: () => (firstScreenEventIdSwap),
  isFirstScreenSynced: () => (isFirstScreenSynced),
  onFirstScreenSyncReady: () => (onFirstScreenSyncReady),
  onFirstScreenTreeReady: () => (onFirstScreenTreeReady),
  resetFirstScreenSyncState: () => (resetFirstScreenSyncState),
  resetFirstScreenTreeReady: () => (resetFirstScreenTreeReady),
  syncFirstScreen: () => (syncFirstScreen)
});
/* import */ var _core_lynx_data_processors_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx-data-processors.js");
/* import */ var _root_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _shared_profile_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _lifecycle_constant_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




// Initialized once at module load (`renderPage` runs once per runtime and does
// not reset), so a ready mark set before `renderPage` (e.g. in `defaultDataProcessor`)
// survives. In `'manual'` mode the first screen syncs only after both are true.
var isFirstScreenSynced = false;
var firstScreenEventIdSwap = {};
var isMarkedFirstScreenSyncReady = false;
var isFirstScreenTreeReady = false;
function syncFirstScreen() {
    isFirstScreenSynced = true;
    if (true) (0,_shared_profile_js__rspack_import_2.profileStart)('ReactLynx::serializeRoot');
    var root = JSON.stringify(_root_js__rspack_import_1.__root);
    if (true) (0,_shared_profile_js__rspack_import_2.profileEnd)();
    if (true) (0,_shared_profile_js__rspack_import_2.profileStart)('ReactLynx::transferRoot');
    __OnLifecycleEvent([
        _lifecycle_constant_js__rspack_import_3.LifecycleConstant.firstScreen,
        /* FIRST_SCREEN */ {
            root,
            firstScreenEventIdSwap
        }
    ]);
    if (true) (0,_shared_profile_js__rspack_import_2.profileEnd)();
    firstScreenEventIdSwap = {};
}
// ready signal: business/framework allows the handover. Syncs if the tree is ready.
function onFirstScreenSyncReady() {
    if (true) (0,_shared_profile_js__rspack_import_2.profileStart)('ReactLynx::onFirstScreenSyncReady');
    isMarkedFirstScreenSyncReady = true;
    // A mark made inside `defaultDataProcessor` (a native call before the upcoming render)
    // is recorded but not synced now; `onFirstScreenTreeReady` honors it once render ends.
    if (isFirstScreenTreeReady && !(0,_core_lynx_data_processors_js__rspack_import_0.isProcessingDefaultData)() && !isFirstScreenSynced) syncFirstScreen();
    if (true) (0,_shared_profile_js__rspack_import_2.profileEnd)();
}
// tree built (`renderPage` / `updatePage` done). Syncs if the ready signal already came.
function onFirstScreenTreeReady() {
    isFirstScreenTreeReady = true;
    if (isMarkedFirstScreenSyncReady && !isFirstScreenSynced) syncFirstScreen();
}
// the first-screen tree is being (re-)rendered, a mark during this period
// must not sync until the next `onFirstScreenTreeReady`
function resetFirstScreenTreeReady() {
    isFirstScreenTreeReady = false;
}
function clearFirstScreenEventIdSwap() {
    firstScreenEventIdSwap = {};
}
// Full reset of all first-screen state. Used by SSR hydration to re-initialize.
function resetFirstScreenSyncState() {
    isFirstScreenSynced = false;
    firstScreenEventIdSwap = {};
    isMarkedFirstScreenSyncReady = false;
    isFirstScreenTreeReady = false;
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/isRendering.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isRendering: () => (isRendering)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_render_constants_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var isRendering = /* @__PURE__ */ {
    value: false
};
var setIsRendering = ()=>{
    isRendering.value = true;
    // Make sure `isRendering` is set to false even if an error is thrown during rendering
    (0,_utils_js__rspack_import_2.lynxQueueMicrotask)(()=>{
        isRendering.value = false;
    });
};
var onRenderHook = (old, ...args)=>{
    /* v8 ignore next */ if (old) old(...args);
    setIsRendering();
};
(0,_utils_js__rspack_import_2.hook)(preact__rspack_import_0.options, _shared_render_constants_js__rspack_import_1.RENDER_COMPONENT, onRenderHook);
(0,_utils_js__rspack_import_2.hook)(preact__rspack_import_0.options, _shared_render_constants_js__rspack_import_1.ROOT, onRenderHook);
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/commit.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearCommitTaskId: () => (clearCommitTaskId),
  commitPatchUpdate: () => (commitPatchUpdate),
  genCommitTaskId: () => (genCommitTaskId),
  globalBackgroundSnapshotInstancesToRemove: () => (/* reexport safe */ _globalState_js__rspack_import_1.globalBackgroundSnapshotInstancesToRemove),
  globalCommitTaskMap: () => (globalCommitTaskMap),
  globalPatchOptions: () => (globalPatchOptions),
  removeCommitHookForTesting: () => (removeCommitHookForTesting),
  replaceCommitHook: () => (replaceCommitHook)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _globalState_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/globalState.js");
/* import */ var _core_performance_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/performance.js");
/* import */ var _core_reload_version_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/reload-version.js");
/* import */ var _shared_profile_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _shared_render_constants_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _utils_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements the commit phase of the rendering lifecycle.
 * This module patches Preact's commit phase to integrate with the snapshot system,
 * handling the collection and transmission of patches between threads.
 *
 * The commit phase is responsible for:
 * - Collecting patches from the snapshot system
 * - Managing commit tasks and their execution
 * - Coordinating with the native layer for updates
 * - Handling performance timing and pipeline options
 */ /**
 * This module patches Preact's commit phase by hacking into the internal of
 * its [options](https://preactjs.com/guide/v10/options/) API
 */ 






var globalCommitTaskMap = /*@__PURE__*/ new Map();
var nextCommitTaskId = 1;
var globalPatchOptions = {};
var commitHookInstalled = false;
var previousCommit;
/**
 * Replaces Preact's default commit hook with our custom implementation.
 * Calling it again is a no-op until {@link removeCommitHookForTesting} is called.
 */ function replaceCommitHook() {
    if (commitHookInstalled) return;
    commitHookInstalled = true;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    previousCommit = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_5.COMMIT];
    (0,_utils_js__rspack_import_6.hook)(preact__rspack_import_0.options, _shared_render_constants_js__rspack_import_5.COMMIT, (originalPreactCommit, vnode, commitQueue)=>{
        // for testing only
        commitQueue.length = 0;
        return;
    });
}
/**
 * Restores the commit option replaced by {@link replaceCommitHook} so tests
 * can clean up the global Preact `options` object. Assumes the matching
 * install was the most recent commit-option replacement; the snapshot and
 * ElementTemplate runtimes are separate entrypoints and never install their
 * commit hooks in the same context.
 */ function removeCommitHookForTesting() {
    if (!commitHookInstalled) return;
    commitHookInstalled = false;
    if (previousCommit) {
        preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_5.COMMIT] = previousCommit;
        previousCommit = undefined;
    } else delete preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_5.COMMIT];
}
/**
 * Prepares the patch update for transmission to the native layer
 */ function commitPatchUpdate(patchList, patchOptions) {
    // console.debug('********** JS update:');
    // printSnapshotInstance(
    //   (backgroundSnapshotInstanceManager.values.get(1) ?? backgroundSnapshotInstanceManager.values.get(-1))!,
    // );
    // console.debug('commitPatchUpdate:', prettyFormatSnapshotPatch(patchList.patchList[0]?.snapshotPatch));
    if (true) (0,_shared_profile_js__rspack_import_4.profileStart)('ReactLynx::commitChanges');
    (0,_core_performance_js__rspack_import_2.markTiming)('packChangesStart');
    var obj = {
        data: JSON.stringify(patchList),
        patchOptions: {
            ...patchOptions,
            reloadVersion: (0,_core_reload_version_js__rspack_import_3.getReloadVersion)()
        }
    };
    (0,_core_performance_js__rspack_import_2.markTiming)('packChangesEnd');
    if (_core_performance_js__rspack_import_2.globalPipelineOptions) {
        obj.patchOptions.pipelineOptions = _core_performance_js__rspack_import_2.globalPipelineOptions;
        (0,_core_performance_js__rspack_import_2.setPipeline)(undefined);
    }
    if (true) (0,_shared_profile_js__rspack_import_4.profileEnd)();
    return obj;
}
/**
 * Generates a unique ID for commit tasks
 */ function genCommitTaskId() {
    return nextCommitTaskId++;
}
/**
 * Resets the commit task ID counter
 */ function clearCommitTaskId() {
    nextCommitTaskId = 1;
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/error.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  addCtxNotFoundEventListener: () => (addCtxNotFoundEventListener),
  ctxNotFoundType: () => (ctxNotFoundType),
  removeCtxNotFoundEventListener: () => (removeCtxNotFoundEventListener),
  reportCtxNotFound: () => (reportCtxNotFound),
  sendCtxNotFoundEventToBackground: () => (sendCtxNotFoundEventToBackground)
});
/* import */ var _snapshot_backgroundSnapshot_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/backgroundSnapshot.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var ctxNotFoundType = 'Lynx.Error.CtxNotFound';
var errorMsg = 'snapshotPatchApply failed: ctx not found';
var ctxNotFoundEventListener = null;
function sendCtxNotFoundEventToBackground(id, options) {
    if (!lynx.getJSContext) throw new Error(errorMsg);
    lynx.getJSContext().dispatchEvent({
        type: ctxNotFoundType,
        data: {
            id,
            options
        }
    });
}
function reportCtxNotFound(data) {
    var _instance_type, _options_parent;
    var _instance_parentNode;
    var { id, options } = data;
    var instance = _snapshot_backgroundSnapshot_js__rspack_import_0.backgroundSnapshotInstanceManager.values.get(id);
    var snapshotType = (instance === null || instance === void 0 ? void 0 : instance.__snapshot_def) ? (_instance_type = instance.type) !== null && _instance_type !== void 0 ? _instance_type : 'null' : 'null';
    var { operation, commitId, isHydration, child, missingNode } = options;
    var parent = (_options_parent = options.parent) !== null && _options_parent !== void 0 ? _options_parent : instance === null || instance === void 0 ? void 0 : (_instance_parentNode = instance.parentNode) === null || _instance_parentNode === void 0 ? void 0 : _instance_parentNode.__id;
    var parentInfo = 'parent: null';
    if (parent !== undefined) {
        var _parentInstance_type;
        var parentInstance = _snapshot_backgroundSnapshot_js__rspack_import_0.backgroundSnapshotInstanceManager.values.get(parent);
        var parentType = (parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.__snapshot_def) ? (_parentInstance_type = parentInstance.type) !== null && _parentInstance_type !== void 0 ? _parentInstance_type : 'null' : 'null';
        var missingInfo = missingNode === undefined ? '' : `, missing: ${missingNode === 1 || missingNode === 3}`;
        parentInfo = `parent: { id: ${parent}, snapshot type: '${parentType}'${missingInfo} }`;
    }
    var ctxInfo = parentInfo;
    if (child !== undefined) {
        var _childInstance_type;
        var childInstance = _snapshot_backgroundSnapshot_js__rspack_import_0.backgroundSnapshotInstanceManager.values.get(child);
        var childType = (childInstance === null || childInstance === void 0 ? void 0 : childInstance.__snapshot_def) ? (_childInstance_type = childInstance.type) !== null && _childInstance_type !== void 0 ? _childInstance_type : 'null' : 'null';
        var missingInfo1 = missingNode === undefined ? '' : `, missing: ${missingNode === 2 || missingNode === 3}`;
        ctxInfo = `${parentInfo}, child: { id: ${child}, snapshot type: '${childType}'${missingInfo1} }`;
    }
    var message = `${errorMsg}, snapshot type: '${snapshotType}', ${ctxInfo}, operation: '${operation}', commitId: ${commitId}, isHydration: ${isHydration}`;
    if (true) message += '. You can set environment variable `REACT_ALOG=true` and restart your dev server for troubleshooting.';
    lynx.reportError(new Error(message));
}
function addCtxNotFoundEventListener() {
    var _lynx_getCoreContext, _lynx;
    ctxNotFoundEventListener = (e)=>{
        reportCtxNotFound(e.data);
    };
    (_lynx_getCoreContext = (_lynx = lynx).getCoreContext) === null || _lynx_getCoreContext === void 0 ? void 0 : _lynx_getCoreContext.call(_lynx).addEventListener(ctxNotFoundType, ctxNotFoundEventListener);
}
function removeCtxNotFoundEventListener() {
    var _lynx_getCoreContext, _lynx;
    var coreContext = (_lynx_getCoreContext = (_lynx = lynx).getCoreContext) === null || _lynx_getCoreContext === void 0 ? void 0 : _lynx_getCoreContext.call(_lynx);
    if (coreContext && ctxNotFoundEventListener) {
        coreContext.removeEventListener(ctxNotFoundType, ctxNotFoundEventListener);
        ctxNotFoundEventListener = null;
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/globalState.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  globalBackgroundSnapshotInstancesToRemove: () => (globalBackgroundSnapshotInstancesToRemove),
  setGlobalBackgroundSnapshotInstancesToRemove: () => (setGlobalBackgroundSnapshotInstancesToRemove)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Global state shared across modules to avoid circular dependencies
 */ /**
 * List of background snapshot instances to remove during commit phase
 */ var globalBackgroundSnapshotInstancesToRemove = [];
function setGlobalBackgroundSnapshotInstancesToRemove(ids) {
    globalBackgroundSnapshotInstancesToRemove = ids;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/isMainThreadHydrating.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isMainThreadHydrating: () => (isMainThreadHydrating),
  setMainThreadHydrating: () => (setMainThreadHydrating)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var isMainThreadHydrating = false;
function setMainThreadHydrating(isHydrating) {
    if (!isHydrating && isMainThreadHydrating) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.onHydrationFinished)();
    isMainThreadHydrating = isHydrating;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/nodesRefApply.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyNodesRefInsertBefore: () => (applyNodesRefInsertBefore),
  applyNodesRefRemoveChild: () => (applyNodesRefRemoveChild),
  resolveNodesRefHost: () => (resolveNodesRefHost)
});
/* import */ var _snapshot_list_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/list.js");
/* import */ var _snapshot_ref_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _snapshot_snapshot_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _snapshot_utils_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Apply-side handlers for the portal-only patch ops:
 *   - `nodesRefInsertBefore`
 *   - `nodesRefRemoveChild`
 * plus the shared selector lookup.
 *
 * Lives in its own module to keep `snapshotPatchApply.ts` focused on the
 * snapshot-tree ops (`CreateElement`/`InsertBefore`/`SetAttribute`/etc.).
 */ 



/**
 * Resolve a serialized NodesRef (the `identifier` string produced by
 * `serializeNodesRef`) to a single host FiberElement on the main thread.
 *
 * The identifier is treated as a CSS selector. This covers:
 *   - `RefProxy.selector` → `[react-ref-X-Y]` (a CSS attribute selector)
 *   - real `NodesRef` from `lynx.createSelectorQuery().select('#foo')`
 *
 * UNIQUE_ID / REF_ID-typed `NodesRef`s would need their respective Element
 * PAPIs (`__GetElementByUniqueId`, etc.) — TODO when needed.
 */ function resolveNodesRefHost(identifier) {
    var pageElement = __GetPageElement();
    if (!pageElement) return undefined;
    return __QuerySelector(pageElement, identifier, {});
}
function applyNodesRefInsertBefore(identifier, child, beforeId) {
    var host = resolveNodesRefHost(identifier);
    if (!host) throw new Error(`[createPortal] cannot resolve host for selector "${identifier}". ` + `The host element does not exist on the main thread — check that the ` + `\`NodesRef\` passed to \`createPortal\` points at a currently mounted element.`);
    if (!child.__elements) child.ensureElements();
    // `ensureElements` always sets `__element_root` for any registered
    // snapshot type, so the `!` is just there for the type checker.
    var childRoot = child.__element_root;
    // `beforeId` is `null` for append-style inserts: preact passes `before =
    // null`, our `before?.__id` evaluates to `undefined`, and the patch's JSON
    // round-trip turns that `undefined` slot into `null`. A numeric `beforeId`
    // is always the `__id` of a sibling that the background already inserted
    // into the same `fakeRoot` (its `nodesRefInsertBefore` ran earlier in this
    // same patch and both sides share `snapshotInstanceManager`) — so the
    // non-null assertions hold by framework invariant.
    if (beforeId != null) {
        __InsertElementBefore(host, childRoot, _snapshot_snapshot_js__rspack_import_2.snapshotInstanceManager.values.get(beforeId).__element_root);
        return;
    }
    __AppendElement(host, childRoot);
}
function applyNodesRefRemoveChild(identifier, child) {
    // The child was inserted by an earlier `nodesRefInsertBefore` op which
    // calls `ensureElements`, so `__element_root` is always set here.
    var childRoot = child.__element_root;
    // Mirror the worklet-ref teardown that `SnapshotInstance.removeChild`
    // runs. Without this, `main-thread:ref` callbacks on portaled subtrees
    // leak — `worklet._unmount` is never invoked, and any `WorkletRefImpl`
    // keeps pointing at the removed element.
    (0,_snapshot_ref_js__rspack_import_1.unref)(child, true);
    var host = resolveNodesRefHost(identifier);
    // If the host is gone, its entire DOM subtree (including this portaled
    // child) was already removed by whoever unmounted the host — the
    // `__RemoveElement` call would be a no-op. Skip it; we still clean up
    // the SI manager bookkeeping below.
    if (host) __RemoveElement(host, childRoot);
    // Portal children aren't linked into a `SnapshotInstance` parent tree, so
    // the regular `RemoveChild` traversal never reaches them. Mirror the
    // teardown that `SnapshotInstance.removeChild` runs (see snapshot.ts):
    // destroy any `<list>` holders (otherwise native list callbacks +
    // `gSignMap`/`gRecycleMap` leak), unlink sibling/parent pointers, drop
    // element refs, and remove from the manager.
    (0,_snapshot_utils_js__rspack_import_3.traverseSnapshotInstance)(child, (v)=>{
        if (v.__snapshot_def.isListHolder) (0,_snapshot_list_js__rspack_import_0.snapshotDestroyList)(v);
        // `__parent` / `__previousSibling` / `__nextSibling` are `private` on
        // `SnapshotInstance`; the cast mirrors the existing pattern in
        // `portals.ts`. Inner portal-subtree nodes (children of the portal
        // root) ARE linked into the SI tree on main thread via regular
        // `InsertBefore` ops, so the regular `removeChild` teardown nulls
        // these — mirror that here for parity.
        var link = v;
        link.__parent = null;
        link.__previousSibling = null;
        link.__nextSibling = null;
        delete v.__elements;
        delete v.__element_root;
        _snapshot_snapshot_js__rspack_import_2.snapshotInstanceManager.values["delete"](v.__id);
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SnapshotOperation: () => (SnapshotOperation),
  SnapshotOperationParams: () => (SnapshotOperationParams),
  __globalSnapshotPatch: () => (__globalSnapshotPatch),
  deinitGlobalSnapshotPatch: () => (deinitGlobalSnapshotPatch),
  initGlobalSnapshotPatch: () => (initGlobalSnapshotPatch),
  takeGlobalSnapshotPatch: () => (takeGlobalSnapshotPatch)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Defines the core patch operations for the snapshot system.
 * The patch operations are designed to be serializable and minimal, allowing
 * efficient transmission between threads and application to element tree.
 */ var SnapshotOperation = {
    CreateElement: 0,
    InsertBefore: 1,
    RemoveChild: 2,
    SetAttribute: 3,
    SetAttributes: 4,
    nodesRefInsertBefore: 5,
    nodesRefRemoveChild: 6,
    DEV_ONLY_AddSnapshot: 100,
    DEV_ONLY_RegisterWorklet: 101,
    DEV_ONLY_SetSnapshotEntryName: 102
};
var SnapshotOperationParams = /* @__PURE__ */ {
    [SnapshotOperation.CreateElement]: {
        name: 'CreateElement',
        params: [
            'type',
            /* string */ 'id' /* number */ 
        ]
    },
    [SnapshotOperation.InsertBefore]: {
        name: 'InsertBefore',
        params: [
            'parentId',
            /* number */ 'childId',
            /* number */ 'beforeId',
            /* number | undefined */ 'slotIndex'
        ]
    },
    [SnapshotOperation.RemoveChild]: {
        name: 'RemoveChild',
        params: [
            'parentId',
            /* number */ 'childId' /* number */ 
        ]
    },
    [SnapshotOperation.SetAttribute]: {
        name: 'SetAttribute',
        params: [
            'id',
            /* number */ 'dynamicPartIndex',
            /* number */ 'value' /* any */ 
        ]
    },
    [SnapshotOperation.SetAttributes]: {
        name: 'SetAttributes',
        params: [
            'id',
            /* number */ 'values' /* any */ 
        ]
    },
    [SnapshotOperation.nodesRefInsertBefore]: {
        name: 'nodesRefInsertBefore',
        params: [
            'identifier',
            /* string — CSS selector */ 'childId',
            /* number */ 'beforeId'
        ]
    },
    [SnapshotOperation.nodesRefRemoveChild]: {
        name: 'nodesRefRemoveChild',
        params: [
            'identifier',
            /* string — CSS selector */ 'childId'
        ]
    },
    [SnapshotOperation.DEV_ONLY_AddSnapshot]: {
        name: 'DEV_ONLY_AddSnapshot',
        params: [
            'uniqID',
            /* string */ 'snapshotCreator'
        ]
    },
    [SnapshotOperation.DEV_ONLY_RegisterWorklet]: {
        name: 'DEV_ONLY_RegisterWorklet',
        params: [
            'hash',
            /* string */ 'fnStr' /* string */ 
        ]
    },
    [SnapshotOperation.DEV_ONLY_SetSnapshotEntryName]: {
        name: 'DEV_ONLY_SetSnapshotEntryName',
        params: [
            'uniqID',
            /* string */ 'entryName' /* string */ 
        ]
    }
};
var __globalSnapshotPatch;
function takeGlobalSnapshotPatch() {
    if (__globalSnapshotPatch) {
        var list = __globalSnapshotPatch;
        __globalSnapshotPatch = [];
        return list;
    } else return undefined;
}
function initGlobalSnapshotPatch() {
    __globalSnapshotPatch = [];
}
function deinitGlobalSnapshotPatch() {
    __globalSnapshotPatch = undefined;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatchApply.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  snapshotPatchApply: () => (snapshotPatchApply)
});
/* import */ var _error_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/error.js");
/* import */ var _nodesRefApply_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/nodesRefApply.js");
/* import */ var _snapshotPatch_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
/* import */ var _snapshot_snapshot_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements the patch application logic for the snapshot system.
 * This module is responsible for interpreting and executing patch operations
 * that were generated in the background thread, applying them to the DOM
 * in the main thread.
 *
 * The module handles various operations like element creation, insertion,
 * removal, and attribute updates, ensuring they are applied in the correct
 * order and with proper error handling.
 */ 



/**
 * Applies a patch of snapshot operations to the main thread.
 * This is the counterpart to the patch generation in the background thread.
 * Each operation in the patch is processed sequentially to update the DOM.
 */ function snapshotPatchApply(snapshotPatch, commitId, isHydration) {
    var length = snapshotPatch.length;
    for(var i = 0; i < length; ++i)switch(snapshotPatch[i]){
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.CreateElement:
            {
                var type = snapshotPatch[++i];
                var id = snapshotPatch[++i];
                new _snapshot_snapshot_js__rspack_import_3.SnapshotInstance(type, id);
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.InsertBefore:
            {
                var parentId = snapshotPatch[++i];
                var childId = snapshotPatch[++i];
                var beforeId = snapshotPatch[++i];
                var __slotIndex = snapshotPatch[++i];
                var parent = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(parentId);
                var child = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(childId);
                var existingNode = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(beforeId);
                if (!parent || !child) (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(parent ? childId : parentId, {
                    operation: 'InsertBefore',
                    commitId,
                    isHydration,
                    parent: parentId,
                    child: childId,
                    missingNode: parent ? 2 : child ? 1 : 3
                });
                else {
                    child.__slotIndex = __slotIndex;
                    parent.insertBefore(child, existingNode);
                }
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.RemoveChild:
            {
                var parentId1 = snapshotPatch[++i];
                var childId1 = snapshotPatch[++i];
                var parent1 = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(parentId1);
                var child1 = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(childId1);
                if (!parent1 || !child1) (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(parent1 ? childId1 : parentId1, {
                    operation: 'RemoveChild',
                    commitId,
                    isHydration,
                    parent: parentId1,
                    child: childId1,
                    missingNode: parent1 ? 2 : child1 ? 1 : 3
                });
                else parent1.removeChild(child1);
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.nodesRefInsertBefore:
            {
                var identifier = snapshotPatch[++i];
                var childId2 = snapshotPatch[++i];
                var beforeId1 = snapshotPatch[++i];
                var child2 = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(childId2);
                if (child2) (0,_nodesRefApply_js__rspack_import_1.applyNodesRefInsertBefore)(identifier, child2, beforeId1);
                else (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(childId2, {
                    operation: 'nodesRefInsertBefore',
                    commitId,
                    isHydration
                });
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.nodesRefRemoveChild:
            {
                var identifier1 = snapshotPatch[++i];
                var childId3 = snapshotPatch[++i];
                var child3 = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(childId3);
                if (child3) (0,_nodesRefApply_js__rspack_import_1.applyNodesRefRemoveChild)(identifier1, child3);
                else (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(childId3, {
                    operation: 'nodesRefRemoveChild',
                    commitId,
                    isHydration
                });
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.SetAttribute:
            {
                var id1 = snapshotPatch[++i];
                var dynamicPartIndex = snapshotPatch[++i];
                var value = snapshotPatch[++i];
                var si = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(id1);
                if (si) si.setAttribute(dynamicPartIndex, value);
                else (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(id1, {
                    operation: 'SetAttribute',
                    commitId,
                    isHydration
                });
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.SetAttributes:
            {
                var id2 = snapshotPatch[++i];
                var values = snapshotPatch[++i];
                var si1 = _snapshot_snapshot_js__rspack_import_3.snapshotInstanceManager.values.get(id2);
                if (si1) si1.setAttribute('values', values);
                else (0,_error_js__rspack_import_0.sendCtxNotFoundEventToBackground)(id2, {
                    operation: 'SetAttributes',
                    commitId,
                    isHydration
                });
                break;
            }
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.DEV_ONLY_AddSnapshot:
            if (true) {
                var uniqID = snapshotPatch[++i];
                var snapshotCreator = snapshotPatch[++i];
                // HMR-related
                // Update the evaluated snapshots from JS.
                _snapshot_snapshot_js__rspack_import_3.snapshotCreatorMap[uniqID] = evaluate(snapshotCreator);
            }
            break;
        case _snapshotPatch_js__rspack_import_2.SnapshotOperation.DEV_ONLY_SetSnapshotEntryName:
            if (true) {
                var _snapshotCreatorMap_uniqID;
                var uniqID1 = snapshotPatch[++i];
                var entryName = snapshotPatch[++i];
                // HMR-related
                // Update the evaluated snapshot entryName from JS.
                var source = (_snapshotCreatorMap_uniqID = _snapshot_snapshot_js__rspack_import_3.snapshotCreatorMap[uniqID1]) === null || _snapshotCreatorMap_uniqID === void 0 ? void 0 : _snapshotCreatorMap_uniqID.toString();
                if (source === null || source === void 0 ? void 0 : source.includes('globDynamicComponentEntry')) try {
                    _snapshot_snapshot_js__rspack_import_3.snapshotCreatorMap[uniqID1] = evaluate(source.replace(/globDynamicComponentEntry/g, JSON.stringify(entryName)));
                } catch (e) {
                    console.warn(`[ReactLynx] failed to rewrite snapshot entryName for ${uniqID1}`, e);
                }
            }
            break;
    }
}
/* v8 ignore start */ /**
 * Deserializes a stringified snapshot creator for HMR.
 */ function evaluate(code) {
    if (true) // Direct `eval` is kept for the legacy `__runtime__ || require(...)`
    // fallback, which resolves `__webpack_require__` from this scope on
    // runtimes that call creators with a single argument.
    return eval(`(() => ${code})()`);
    // removed by dead control flow
{}
} /* v8 ignore stop */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/updateMainThread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  injectUpdateMainThread: () => (injectUpdateMainThread)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _isMainThreadHydrating_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/isMainThreadHydrating.js");
/* import */ var _snapshotPatchApply_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatchApply.js");
/* import */ var _core_performance_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/performance.js");
/* import */ var _core_reload_version_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/reload-version.js");
/* import */ var _debug_formatPatch_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/formatPatch.js");
/* import */ var _lifecycle_constant_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
/* import */ var _snapshot_definition_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _snapshot_workletRef_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
/* import */ var _worklet_functionality_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/functionality.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.











function updateMainThread({ data, patchOptions }) {
    var _console_alog, _console;
    if (patchOptions.reloadVersion < (0,_core_reload_version_js__rspack_import_4.getReloadVersion)()) return;
    var flowIds = patchOptions.flowIds;
    if (flowIds) lynx.performance.profileStart('ReactLynx::patch', {
        flowId: flowIds[0],
        flowIds
    });
    (0,_core_performance_js__rspack_import_3.setPipeline)(patchOptions.pipelineOptions);
    (0,_core_performance_js__rspack_import_3.markTiming)('mtsRenderStart');
    (0,_core_performance_js__rspack_import_3.markTiming)('parseChangesStart');
    var parsedData = JSON.parse(data);
    var { patchList, flushOptions = {}, delayedRunOnMainThreadData } = parsedData;
    if (false) {}
    (0,_core_performance_js__rspack_import_3.markTiming)('parseChangesEnd');
    (0,_core_performance_js__rspack_import_3.markTiming)('patchChangesStart');
    if (patchOptions.isHydration) (0,_isMainThreadHydrating_js__rspack_import_1.setMainThreadHydrating)(true);
    try {
        for (var { snapshotPatch, id } of patchList){
            _list_pendingListUpdates_js__rspack_import_7.__pendingListUpdates.clearAttachedLists();
            if (snapshotPatch) (0,_snapshotPatchApply_js__rspack_import_2.snapshotPatchApply)(snapshotPatch, id, patchOptions.isHydration === true);
            _list_pendingListUpdates_js__rspack_import_7.__pendingListUpdates.flush();
        // console.debug('********** Lepus updatePatch:');
        // printSnapshotInstance(snapshotInstanceManager.values.get(-1)!);
        }
    } finally{
        (0,_core_performance_js__rspack_import_3.markTiming)('patchChangesEnd');
        (0,_core_performance_js__rspack_import_3.markTiming)('mtsRenderEnd');
        if (patchOptions.isHydration) (0,_isMainThreadHydrating_js__rspack_import_1.setMainThreadHydrating)(false);
    }
    (0,_snapshot_workletRef_js__rspack_import_9.applyRefQueue)();
    if (delayedRunOnMainThreadData && (0,_worklet_functionality_js__rspack_import_10.isMtsEnabled)()) {
        (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.setEomShouldFlushElementTree)(false);
        for (var _$data of delayedRunOnMainThreadData)try {
            (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.runRunOnMainThreadTask)(_$data.worklet, _$data.params, _$data.resolveId);
        /* v8 ignore next 3 */ } catch (e) {
            lynx.reportError(e);
        }
        (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.setEomShouldFlushElementTree)(true);
    }
    if (patchOptions.pipelineOptions) flushOptions.pipelineOptions = patchOptions.pipelineOptions;
    __FlushElementTree(_snapshot_definition_js__rspack_import_8.__page, flushOptions);
    if (flowIds) lynx.performance.profileEnd();
}
function injectUpdateMainThread() {
    Object.assign(globalThis, {
        [_lifecycle_constant_js__rspack_import_6.LifecycleConstant.patchUpdate]: updateMainThread
    });
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/ref/delay.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RefProxy: () => (RefProxy),
  runDelayedUiOps: () => (runDelayedUiOps),
  shouldDelayUiOps: () => (shouldDelayUiOps)
});
/* import */ var _core_ref_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/ref.js");
/* import */ var _snapshot_snapshotInstanceHydrationMap_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceHydrationMap.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


/**
 * A flag to indicate whether UI operations should be delayed.
 * When set to true, UI operations will be queued in the `delayedUiOps` array
 * and executed later when `runDelayedUiOps` is called.
 * This is used before hydration to ensure UI operations are batched
 * and executed at the appropriate time.
 */ var shouldDelayUiOps = {
    value: true
};
/**
 * An array of functions that will be executed later when `runDelayedUiOps` is called.
 * These functions contain UI operations that need to be delayed.
 */ var delayedUiOps = [];
/**
 * Runs a task either immediately or delays it based on the `shouldDelayUiOps` flag.
 * @param task - The function to execute.
 */ function runOrDelay(task) {
    if (shouldDelayUiOps.value) delayedUiOps.push(task);
    else task();
}
/**
 * Executes all delayed UI operations.
 */ function runDelayedUiOps() {
    var tasks = delayedUiOps.slice();
    delayedUiOps.length = 0;
    shouldDelayUiOps.value = false;
    for (var task of tasks)task();
}
/**
 * A proxy class designed for managing and executing reference-based tasks.
 * It delays the execution of tasks until hydration is complete.
 */ class RefProxy extends _core_ref_js__rspack_import_0.SelectorRefProxy {
    createProxyTarget() {
        return new RefProxy(this.refAttr);
    }
    runOrDelay(task) {
        runOrDelay(task);
    }
    get selector() {
        var _hydrationMap_get;
        var realRefId = (_hydrationMap_get = _snapshot_snapshotInstanceHydrationMap_js__rspack_import_1.hydrationMap.get(this.refAttr[0])) !== null && _hydrationMap_get !== void 0 ? _hydrationMap_get : this.refAttr[0];
        return `[react-ref-${realRefId}-${this.refAttr[1]}]`;
    }
    constructor(refAttr){
        super();
        this.refAttr = refAttr;
        return this.createProxy();
    }
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/reload.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  reloadBackground: () => (reloadBackground),
  reloadMainThread: () => (reloadMainThread)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _destroy_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/destroy.js");
/* import */ var _render_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/render.js");
/* import */ var _core_reload_version_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/reload-version.js");
/* import */ var _root_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _shared_profile_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _utils_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _lifecycle_constant_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
/* import */ var _renderToOpcodes_hydrate_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
/* import */ var _snapshot_definition_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _snapshot_snapshot_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _snapshot_workletRef_js__rspack_import_12 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
/* import */ var _event_firstScreenSync_js__rspack_import_13 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/firstScreenSync.js");
/* import */ var _patch_snapshotPatch_js__rspack_import_14 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
/* import */ var _ref_delay_js__rspack_import_15 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/ref/delay.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements the reload (thinking of "refresh" in browser) for both main thread
 * and background thread.
 */ 















function reloadMainThread(data, options) {
    if (true) (0,_shared_profile_js__rspack_import_5.profileStart)('ReactLynx::reloadMainThread');
    (0,_core_reload_version_js__rspack_import_3.increaseReloadVersion)();
    if (typeof data == 'object' && data !== null && !(0,_utils_js__rspack_import_6.isEmptyObject)(data)) Object.assign(lynx.__initData, data);
    _snapshot_snapshot_js__rspack_import_11.snapshotInstanceManager.clear();
    _list_pendingListUpdates_js__rspack_import_8.__pendingListUpdates.clearAttachedLists();
    (0,_event_firstScreenSync_js__rspack_import_13.clearFirstScreenEventIdSwap)();
    var oldRoot = _root_js__rspack_import_4.__root;
    (0,_root_js__rspack_import_4.setRoot)(new _snapshot_snapshot_js__rspack_import_11.SnapshotInstance('root'));
    _root_js__rspack_import_4.__root.__jsx = oldRoot.__jsx;
    (0,_render_js__rspack_import_2.renderMainThread)();
    (0,_renderToOpcodes_hydrate_js__rspack_import_9.hydrate)(oldRoot, _root_js__rspack_import_4.__root, {
        skipUnRef: true
    });
    // always call this before `__FlushElementTree`
    _list_pendingListUpdates_js__rspack_import_8.__pendingListUpdates.flush();
    (0,_snapshot_workletRef_js__rspack_import_12.applyRefQueue)();
    if (typeof lepusng_gc === 'function') lepusng_gc();
    if (_event_firstScreenSync_js__rspack_import_13.isFirstScreenSynced) __OnLifecycleEvent([
        _lifecycle_constant_js__rspack_import_7.LifecycleConstant.firstScreen,
        /* FIRST_SCREEN */ {
            root: JSON.stringify(_root_js__rspack_import_4.__root)
        }
    ]);
    __FlushElementTree(_snapshot_definition_js__rspack_import_10.__page, options);
    if (true) (0,_shared_profile_js__rspack_import_5.profileEnd)();
    return;
}
function reloadBackground(updateData) {
    if (true) (0,_shared_profile_js__rspack_import_5.profileStart)('ReactLynx::reloadBackground');
    (0,_patch_snapshotPatch_js__rspack_import_14.deinitGlobalSnapshotPatch)();
    (0,_destroy_js__rspack_import_1.destroyBackground)();
    (0,_core_reload_version_js__rspack_import_3.increaseReloadVersion)();
    // COW when modify `lynx.__initData` to make sure Provider & Consumer works
    lynx.__initData = Object.assign({}, lynx.__initData, updateData);
    _ref_delay_js__rspack_import_15.shouldDelayUiOps.value = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (0,preact__rspack_import_0.render)(_root_js__rspack_import_4.__root.__jsx, _root_js__rspack_import_4.__root);
    if (true) (0,_shared_profile_js__rspack_import_5.profileEnd)();
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/render.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  renderMainThread: () => (renderMainThread)
});
/* import */ var _root_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _shared_profile_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _renderToOpcodes_index_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/index.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements the IFR (Instant First-Frame Rendering) on main thread.
 */ 


function renderMainThread() {
    var opcodes;
    try {
        if (true) (0,_shared_profile_js__rspack_import_1.profileStart)('ReactLynx::renderMainThread');
        opcodes = (0,_renderToOpcodes_index_js__rspack_import_2.render)(_root_js__rspack_import_0.__root.__jsx, undefined, _root_js__rspack_import_0.__root);
    } catch (e) {
        lynx.reportError(e);
        opcodes = [];
        _root_js__rspack_import_0.__root.removeChildren();
    } finally{
        if (true) (0,_shared_profile_js__rspack_import_1.profileEnd)();
    }
    if (false) {}
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/list.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearListGlobal: () => (clearListGlobal),
  componentAtIndexFactory: () => (componentAtIndexFactory),
  enqueueComponentFactory: () => (enqueueComponentFactory),
  gRecycleMap: () => (gRecycleMap),
  gSignMap: () => (gSignMap)
});
/* import */ var _utils_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _lifecycle_constant_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
/* import */ var _snapshot_workletRef_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var gSignMap = {};
var gRecycleMap = {};
var gParentWeakMap = /*#__PURE__*/ new WeakMap();
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
function clearListGlobal() {
    for(var key in gSignMap)delete gSignMap[key];
    for(var key1 in gRecycleMap)delete gRecycleMap[key1];
}
function componentAtIndexFactory(ctx, hydrateFunction) {
    // A hack workaround to ensure childCtx has no direct reference through `__parent` to list,
    // to avoid memory leak.
    // TODO(hzy): make `__parent` a WeakRef or `#__parent` in the future.
    ctx.forEach((childCtx)=>{
        if (gParentWeakMap.has(childCtx)) ;
        else {
            gParentWeakMap.set(childCtx, childCtx.parentNode);
            Object.defineProperty(childCtx, '__parent', {
                get: ()=>gParentWeakMap.get(childCtx),
                set: (value)=>{
                    gParentWeakMap.set(childCtx, value);
                }
            });
        }
    });
    var componentAtChildCtx = (list, listID, childCtx, operationID, enableReuseNotification, enableBatchRender = false, asyncFlush = false)=>{
        var _childCtx___listItemPlatformInfo, _platformInfo_reuseidentifier;
        var _childCtx___extraProps, _childCtx___extraProps1;
        var signMap = gSignMap[listID];
        var recycleMap = gRecycleMap[listID];
        /* v8 ignore start */ if (!signMap || !recycleMap) // Kept as a safeguard in case the callback is somehow invoked after list removal.
        throw new Error('componentAtIndex called on removed list');
        /* v8 ignore end */ var platformInfo = (_childCtx___listItemPlatformInfo = childCtx.__listItemPlatformInfo) !== null && _childCtx___listItemPlatformInfo !== void 0 ? _childCtx___listItemPlatformInfo : {};
        // The lifecycle of this `__extraProps.isReady`:
        // 0 -> Promise<number> -> 1
        // 0: The initial state, the list-item is not ready yet, we will send a event to background
        //    when `componentAtIndex` is called on it
        // Promise<number>: A promise that will be resolved when the list-item is ready
        // 1: The list-item is ready, we can use it to render the list
        if (((_childCtx___extraProps = childCtx.__extraProps) === null || _childCtx___extraProps === void 0 ? void 0 : _childCtx___extraProps['isReady']) === 0) {
            if (typeof __GetAttributeByName === 'function' && __GetAttributeByName(list, 'custom-list-name') === 'list-container') ;
            else throw new Error('Unsupported: `<list-item/>` with `defer={true}` must be used with `<list custom-list-name="list-container"/>`');
            // send a event to background to render the list-item
            __OnLifecycleEvent([
                _lifecycle_constant_js__rspack_import_1.LifecycleConstant.publishEvent,
                {
                    handlerName: `${childCtx.__id}:__extraProps:onComponentAtIndex`,
                    data: {}
                }
            ]);
            // use a promise to track the list-item's readiness
            var p;
            return p = new Promise((resolve)=>{
                Object.defineProperty(childCtx.__extraProps, 'isReady', {
                    set (isReady) {
                        if (isReady === 1) {
                            delete childCtx.__extraProps['isReady'];
                            childCtx.__extraProps['isReady'] = 1;
                            resolvedPromise.then(()=>{
                                // the cellIndex may be changed already, but the `childCtx` is the same
                                resolve(componentAtChildCtx(list, listID, childCtx, operationID, enableReuseNotification));
                            });
                        }
                    },
                    get () {
                        return p;
                    }
                });
            });
        } else if ((0,_utils_js__rspack_import_0.maybePromise)((_childCtx___extraProps1 = childCtx.__extraProps) === null || _childCtx___extraProps1 === void 0 ? void 0 : _childCtx___extraProps1['isReady'])) throw new Error('componentAtIndex was called on a pending deferred list item');
        var uniqID = childCtx.type + ((_platformInfo_reuseidentifier = platformInfo['reuse-identifier']) !== null && _platformInfo_reuseidentifier !== void 0 ? _platformInfo_reuseidentifier : '');
        var recycleSignMap = recycleMap.get(uniqID);
        if (childCtx.__elements) {
            /**
             * If this situation is encountered, there might be two cases:
             * 1. Reusing with itself
             *    In this case, enqueueComponent will be triggered first, followed by componentAtIndex.
             * 2. Moving
             *    In this case, the trigger order is uncertain; componentAtIndex might be triggered first, or enqueueComponent might be triggered first.
             *
             * When enqueueComponent is triggered first, there must be an item in the reuse pool with the same sign as here, which can be returned directly.
             * When componentAtIndex is triggered first, a clone needs to be made first, then follow the logic for adding or reusing. The cloned item will enter the reuse pool in the subsequent enqueueComponent.
             */ var root = childCtx.__elements[0];
            var sign = __GetElementUniqueID(root);
            if (recycleSignMap === null || recycleSignMap === void 0 ? void 0 : recycleSignMap.has(sign)) {
                signMap.set(sign, childCtx);
                recycleSignMap.delete(sign);
                if (!enableBatchRender) __FlushElementTree(root, {
                    triggerLayout: true,
                    operationID,
                    elementID: sign,
                    listID
                });
                else if (enableBatchRender && asyncFlush) __FlushElementTree(root, {
                    asyncFlush: true
                });
                // enableBatchRender == true && asyncFlush == false
                // in this case, no need to invoke __FlushElementTree because in the end of componentAtIndexes(), the list will invoke __FlushElementTree.
                return sign;
            } else {
                var newCtx = childCtx.takeElements();
                signMap.set(sign, newCtx);
            }
        }
        if (recycleSignMap && recycleSignMap.size > 0) {
            var _oldCtx___extraProps;
            var [first] = recycleSignMap;
            var [sign1, oldCtx] = first;
            recycleSignMap.delete(sign1);
            hydrateFunction(oldCtx, childCtx);
            oldCtx.unRenderElements();
            if (!oldCtx.__id) oldCtx.tearDown();
            else if (((_oldCtx___extraProps = oldCtx.__extraProps) === null || _oldCtx___extraProps === void 0 ? void 0 : _oldCtx___extraProps['isReady']) === 1) __OnLifecycleEvent([
                _lifecycle_constant_js__rspack_import_1.LifecycleConstant.publishEvent,
                {
                    handlerName: `${oldCtx.__id}:__extraProps:onRecycleComponent`,
                    data: {}
                }
            ]);
            var root1 = childCtx.__element_root;
            (0,_snapshot_workletRef_js__rspack_import_2.applyRefQueue)();
            // In the defer `list-item` scenario, `componentAtIndex` occurs with delay.
            // Within `componentAtIndex`, nodes that quickly appear and disappear due to re-layout will be enqueued again,
            // causing the mapping relationship between sign and SnapshotInstance to become corrupted.
            // This results in a SnapshotInstance without `__elements` being enqueued.
            signMap.set(sign1, childCtx);
            if (!enableBatchRender) {
                var flushOptions = {
                    triggerLayout: true,
                    operationID,
                    elementID: sign1,
                    listID
                };
                if (enableReuseNotification) flushOptions.listReuseNotification = {
                    listElement: list,
                    itemKey: platformInfo['item-key']
                };
                __FlushElementTree(root1, flushOptions);
            } else if (enableBatchRender && asyncFlush) {
                var flushOptions1 = {
                    asyncFlush: true
                };
                if (enableReuseNotification) flushOptions1.listReuseNotification = {
                    listElement: list,
                    itemKey: platformInfo['item-key']
                };
                __FlushElementTree(root1, flushOptions1);
            }
            return sign1;
        }
        childCtx.ensureElements();
        var root2 = childCtx.__element_root;
        __AppendElement(list, root2);
        var sign2 = __GetElementUniqueID(root2);
        (0,_snapshot_workletRef_js__rspack_import_2.applyRefQueue)();
        signMap.set(sign2, childCtx);
        if (!enableBatchRender) __FlushElementTree(root2, {
            triggerLayout: true,
            operationID,
            elementID: sign2,
            listID
        });
        else if (enableBatchRender && asyncFlush) __FlushElementTree(root2, {
            asyncFlush: true
        });
        return sign2;
    };
    function componentAtIndex(list, listID, cellIndex, operationID, enableReuseNotification) {
        var childCtx = ctx[cellIndex];
        if (!childCtx) throw new Error('childCtx not found');
        var r = componentAtChildCtx(list, listID, childCtx, operationID, enableReuseNotification);
        /* v8 ignore start */ if (false) {}
        else return typeof r === 'number' ? r : undefined;
    /* v8 ignore end */ }
    function componentAtIndexes(list, listID, cellIndexes, operationIDs, enableReuseNotification, asyncFlush) {
        var hasUnready = false;
        var p = [];
        cellIndexes.forEach((cellIndex, index)=>{
            var operationID = operationIDs[index];
            var childCtx = ctx[cellIndex];
            if (!childCtx) throw new Error('childCtx not found');
            var u = componentAtChildCtx(list, listID, childCtx, operationID, enableReuseNotification, true, asyncFlush);
            if (typeof u === 'number') ;
            else hasUnready = true;
            p.push(u);
        });
        // We need __FlushElementTree twice:
        // 1. The first time is sync, we flush the items that are ready, with unready items' uiSign as -1.
        // 2. The second time is async, with all the uiSigns.
        // NOTE: The `operationIDs` passed to __FlushElementTree must be the one passed in,
        // not the one generated by any code here, to workaround a bug of Lynx Engine.
        // So we CANNOT split the `operationIDs` into two parts: one for ready items, one for unready items.
        if (hasUnready) Promise.all(p).then((uiSigns)=>{
            __FlushElementTree(list, {
                triggerLayout: true,
                operationIDs,
                elementIDs: uiSigns,
                listID
            });
        });
        __FlushElementTree(list, {
            triggerLayout: true,
            operationIDs,
            elementIDs: cellIndexes.map((_, index)=>typeof p[index] === 'number' ? p[index] : -1),
            listID
        });
    }
    return [
        componentAtIndex,
        componentAtIndexes
    ];
}
function enqueueComponentFactory() {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    var enqueueComponent = (_, listID, sign)=>{
        var _childCtx___listItemPlatformInfo, _platformInfo_reuseidentifier;
        var signMap = gSignMap[listID];
        var recycleMap = gRecycleMap[listID];
        if (!signMap || !recycleMap) throw new Error('enqueueComponent called on removed list');
        var childCtx = signMap.get(sign);
        if (!childCtx) return;
        var platformInfo = (_childCtx___listItemPlatformInfo = childCtx.__listItemPlatformInfo) !== null && _childCtx___listItemPlatformInfo !== void 0 ? _childCtx___listItemPlatformInfo : {};
        var uniqID = childCtx.type + ((_platformInfo_reuseidentifier = platformInfo['reuse-identifier']) !== null && _platformInfo_reuseidentifier !== void 0 ? _platformInfo_reuseidentifier : '');
        if (!recycleMap.has(uniqID)) recycleMap.set(uniqID, new Map());
        recycleMap.get(uniqID).set(sign, childCtx);
    };
    return enqueueComponent;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/listUpdateInfo.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ListUpdateInfoRecording: () => (ListUpdateInfoRecording)
});
/* import */ var _list_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/list.js");
/* import */ var _shared_profile_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _renderToOpcodes_hydrate_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



class ListUpdateInfoRecording {
    // private __commitAndReset() {
    //   (this.__pendingAttributes ??= []).push(this.__toAttribute());
    //   this.oldChildNodes = this.list.childNodes;
    //   this.oldChildNodesSet = new Set(this.oldChildNodes);
    //   this.removeChild1.clear();
    //   this.removeChild2.clear();
    //   this.insertBefore.clear();
    //   this.appendChild.length = 0;
    //   this.platformInfoUpdate.clear();
    // }
    flush() {
        if (!this.list.__elements) return undefined;
        var elementIndex = this.list.__snapshot_def.slot[0][1];
        var listElement = this.list.__elements[elementIndex];
        // this.__pendingAttributes?.forEach(pendingAttribute => {
        //   __SetAttribute(listElement, "update-list-info", pendingAttribute);
        //   __FlushElementTree(listElement);
        // });
        var updateListInfo = this.__toAttribute();
        if (true) {
            var listID = __GetElementUniqueID(listElement);
            (0,_shared_profile_js__rspack_import_1.profileStart)(`ReactLynx::listFlush::updateListInfo`, {
                args: {
                    'list id': String(listID),
                    'update list info': JSON.stringify(updateListInfo)
                }
            });
        }
        if (false) { var _console, _console_alog, listID1 }
        __SetAttribute(listElement, 'update-list-info', updateListInfo);
        var [componentAtIndex, componentAtIndexes] = (0,_list_js__rspack_import_0.componentAtIndexFactory)(this.list.childNodes, _renderToOpcodes_hydrate_js__rspack_import_2.hydrate);
        __UpdateListCallbacks(listElement, componentAtIndex, (0,_list_js__rspack_import_0.enqueueComponentFactory)(), componentAtIndexes);
        if (true) (0,_shared_profile_js__rspack_import_1.profileEnd)();
        return this.list.__id;
    }
    getAttachedListId() {
        if (!this.list.__elements) return undefined;
        return this.list.__id;
    }
    onInsertBefore(newNode, existingNode) {
        if (newNode.parentNode) //   this.__commitAndReset();
        // }
        this.removeChild.add(newNode);
        if (existingNode) {
            var _this_insertBefore_get;
            // if (!this.oldChildNodesSet.has(existingNode)) {
            //   this.__commitAndReset();
            // }
            var newChildren = (_this_insertBefore_get = this.insertBefore.get(existingNode)) !== null && _this_insertBefore_get !== void 0 ? _this_insertBefore_get : [];
            newChildren.push(newNode);
            this.insertBefore.set(existingNode, newChildren);
        } else this.appendChild.push(newNode);
    }
    onRemoveChild(child) {
        // if (!this.oldChildNodesSet.has(child)) {
        //   this.__commitAndReset();
        // }
        this.removeChild.add(child);
    }
    onSetAttribute(child, attr, _oldAttr) {
        this.platformInfoUpdate.set(child, attr);
    }
    __toAttribute() {
        var { removeChild, insertBefore, appendChild, platformInfoUpdate } = this;
        var removals = [];
        var insertions = [];
        var updates = [];
        var j = 0;
        for(var i = 0; i < this.oldChildNodes.length; i++, j++){
            var _ref;
            var _insertBefore_get;
            var child = this.oldChildNodes[i];
            var insertedBefore = (_ref = (_insertBefore_get = insertBefore.get(child)) === null || _insertBefore_get === void 0 ? void 0 : _insertBefore_get.length) !== null && _ref !== void 0 ? _ref : 0;
            if (platformInfoUpdate.has(child)) updates.push({
                ...platformInfoUpdate.get(child),
                from: +j + insertedBefore,
                to: +j + insertedBefore,
                // no flush
                flush: false,
                type: child.type
            });
            if (insertBefore.has(child)) {
                var children = insertBefore.get(child);
                children.forEach((c)=>{
                    insertions.push({
                        position: j,
                        type: c.type,
                        ...c.__listItemPlatformInfo
                    });
                    j++;
                });
            }
            if (removeChild.has(child)) {
                removals.push(i);
                removeChild.delete(child);
                j--;
            }
        }
        for(var i1 = 0; i1 < appendChild.length; i1++){
            var child1 = appendChild[i1];
            insertions.push({
                position: j + i1,
                type: child1.type,
                ...child1.__listItemPlatformInfo
            });
        }
        insertions.sort((a, b)=>a.position - b.position);
        removals.sort((a, b)=>a - b);
        if (SystemInfo.lynxSdkVersion === '2.14' || SystemInfo.lynxSdkVersion === '2.15' || SystemInfo.lynxSdkVersion === '2.16' || SystemInfo.lynxSdkVersion === '2.17' || SystemInfo.lynxSdkVersion === '2.18') {
            var elementIndex = this.list.__snapshot_def.slot[0][1];
            var listElement = this.list.__elements[elementIndex];
            // `__GetAttributeByName` is available since Lynx 2.14
            if (__GetAttributeByName(listElement, 'custom-list-name') === 'list-container') {
                // `updateAction` must be full (not incremental) when Lynx version <= 2.18 and
                // when `custom-list-name` is `list-container` (available when Lynx version >= 2.14) is true,
                updates.length = 0;
                this.list.childNodes.forEach((child, index)=>{
                    updates.push({
                        ...child.__listItemPlatformInfo,
                        from: index,
                        to: index,
                        // no flush
                        flush: false,
                        type: child.type
                    });
                });
            }
        }
        return {
            insertAction: insertions,
            removeAction: removals,
            updateAction: updates
        };
    }
    toJSON() {
        // if (this.__pendingAttributes) {
        //   return [...this.__pendingAttributes, this.__toAttribute()];
        // } else {
        //   return [this.__toAttribute()];
        // }
        return [
            this.__toAttribute()
        ];
    }
    constructor(list){
        // private oldChildNodesSet: Set<SnapshotInstance>;
        this.removeChild = new Set();
        this.insertBefore = new Map();
        this.appendChild = [];
        this.platformInfoUpdate = new Map();
        this.list = list;
        this.oldChildNodes = list.childNodes;
    // this.oldChildNodesSet = new Set(this.oldChildNodes);
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  __pendingListUpdates: () => (__pendingListUpdates)
});
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var __pendingListUpdates = {
    values: {},
    clear (id) {
        if (this.values) delete this.values[id];
    },
    clearAttachedLists () {
        if (this.values) Object.values(this.values).map((update)=>update.getAttachedListId()).filter((id)=>id !== undefined).forEach((id)=>this.clear(id));
    },
    flush () {
        if (this.values) Object.values(this.values).map((update)=>update.flush()).filter((id)=>id !== undefined).forEach((id)=>this.clear(id));
    },
    flushWithId (id) {
        var _this_values_id;
        if (this.values && ((_this_values_id = this.values[id]) === null || _this_values_id === void 0 ? void 0 : _this_values_id.flush()) !== undefined) this.clear(id);
    },
    runWithoutUpdates (cb) {
        var old = this.values;
        this.values = null;
        try {
            cb();
        } finally{
            this.values = old;
        }
    }
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/calledByNative.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  injectCalledByNative: () => (injectCalledByNative)
});
/* import */ var _core_lynx_page_data_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx-page-data.js");
/* import */ var _core_performance_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/performance.js");
/* import */ var _root_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");
/* import */ var _lifecycle_constant_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
/* import */ var _lifecycle_event_firstScreenSync_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/event/firstScreenSync.js");
/* import */ var _lifecycle_reload_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/reload.js");
/* import */ var _lifecycle_render_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/render.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
/* import */ var _renderToOpcodes_hydrate_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
/* import */ var _renderToOpcodes_opcodes_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/opcodes.js");
/* import */ var _snapshot_definition_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _snapshot_snapshot_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _snapshot_workletRef_js__rspack_import_12 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.













function ssrEncode() {
    var { __opcodes } = _root_js__rspack_import_2.__root;
    delete _root_js__rspack_import_2.__root.__opcodes;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var oldToJSON = _snapshot_snapshot_js__rspack_import_11.SnapshotInstance.prototype.toJSON;
    _snapshot_snapshot_js__rspack_import_11.SnapshotInstance.prototype.toJSON = function() {
        return [
            this.type,
            this.__id,
            this.__elements
        ];
    };
    try {
        var replacer = (_key, value)=>{
            if (value && typeof value === 'object' && '_wkltId' in value) return null;
            return value;
        };
        return JSON.stringify({
            __opcodes,
            __root_values: _root_js__rspack_import_2.__root.__values
        }, replacer);
    } finally{
        _snapshot_snapshot_js__rspack_import_11.SnapshotInstance.prototype.toJSON = oldToJSON;
    }
}
function ssrHydrate(info) {
    var nativePage = __GetPageElement();
    if (!nativePage) throw new Error('SSR Hydration Failed! Please check if the SSR content loaded successfully!');
    (0,_lifecycle_event_firstScreenSync_js__rspack_import_4.resetFirstScreenSyncState)();
    (0,_snapshot_definition_js__rspack_import_10.setupPage)(nativePage);
    var refsMap = __GetTemplateParts(nativePage);
    var { __opcodes, __root_values } = JSON.parse(info);
    if (__root_values) _root_js__rspack_import_2.__root.setAttribute('values', __root_values);
    (0,_renderToOpcodes_opcodes_js__rspack_import_9.ssrHydrateByOpcodes)(__opcodes, _root_js__rspack_import_2.__root, refsMap);
    _root_js__rspack_import_2.__root.__elements = [
        nativePage
    ];
    _root_js__rspack_import_2.__root.__element_root = nativePage;
}
function injectCalledByNative() {
    if (false) {}
    var calledByNative = {
        renderPage,
        updatePage,
        updateGlobalProps,
        getPageData: function() {
            return null;
        },
        removeComponents: function() {},
        ... false ? 0 : {}
    };
    Object.assign(globalThis, calledByNative);
    Object.assign(globalThis, {
        [_lifecycle_constant_js__rspack_import_3.LifecycleConstant.firstScreenSyncReady]: _lifecycle_event_firstScreenSync_js__rspack_import_4.onFirstScreenSyncReady
    });
}
function renderPage(data) {
    lynx.__initData = data !== null && data !== void 0 ? data : {};
    (0,_snapshot_definition_js__rspack_import_10.setupPage)(__CreatePage('0', 0));
    _root_js__rspack_import_2.__root.ensureElements();
    (0,_lifecycle_render_js__rspack_import_6.renderMainThread)();
    // always call this before `__FlushElementTree`
    // (There is an implicit `__FlushElementTree` in `renderPage`)
    _list_pendingListUpdates_js__rspack_import_7.__pendingListUpdates.flush();
    (0,_snapshot_workletRef_js__rspack_import_12.applyRefQueue)();
    if (true) (0,_lifecycle_event_firstScreenSync_js__rspack_import_4.syncFirstScreen)();
    else // `rLynxFirstScreenSyncReady` signal.
    {}
}
function updatePage(data, options) {
    if (options === null || options === void 0 ? void 0 : options.reloadTemplate) {
        (0,_lifecycle_reload_js__rspack_import_5.reloadMainThread)(data, options);
        return;
    }
    (0,_core_lynx_page_data_js__rspack_import_0.applyUpdatePageData)(data, options);
    var flushOptions = options !== null && options !== void 0 ? options : {};
    if (!_lifecycle_event_firstScreenSync_js__rspack_import_4.isFirstScreenSynced) {
        if (false) // sync the half-rendered tree; it is deferred to `onFirstScreenTreeReady`
        {}
        var oldRoot = _root_js__rspack_import_2.__root;
        (0,_root_js__rspack_import_2.setRoot)(new _snapshot_snapshot_js__rspack_import_11.SnapshotInstance('root'));
        _root_js__rspack_import_2.__root.__jsx = oldRoot.__jsx;
        (0,_core_performance_js__rspack_import_1.setPipeline)(options === null || options === void 0 ? void 0 : options.pipelineOptions);
        (0,_core_performance_js__rspack_import_1.markTiming)('updateDiffVdomStart');
        _list_pendingListUpdates_js__rspack_import_7.__pendingListUpdates.clearAttachedLists();
        (0,_lifecycle_render_js__rspack_import_6.renderMainThread)();
        // As said by codename `firstScreenEventIdSwap`, this swap will only be used for event remap,
        // because ref & unref cause by previous render will be ignored
        (0,_renderToOpcodes_hydrate_js__rspack_import_8.hydrate)(oldRoot, _root_js__rspack_import_2.__root, {
            skipUnRef: true,
            swap: _lifecycle_event_firstScreenSync_js__rspack_import_4.firstScreenEventIdSwap
        });
        // always call this before `__FlushElementTree`
        _list_pendingListUpdates_js__rspack_import_7.__pendingListUpdates.flush();
        (0,_snapshot_workletRef_js__rspack_import_12.applyRefQueue)();
        if (false) {}
        flushOptions.triggerDataUpdated = true;
        (0,_core_performance_js__rspack_import_1.markTiming)('updateDiffVdomEnd');
        if (typeof lepusng_gc === 'function') lepusng_gc();
    }
    __FlushElementTree(_snapshot_definition_js__rspack_import_10.__page, flushOptions);
}
function updateGlobalProps(_data, options) {
    if (options) __FlushElementTree(_snapshot_definition_js__rspack_import_10.__page, options);
    else __FlushElementTree();
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/children.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Children: () => (Children)
});
/* import */ var preact_compat__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var mapFn = (children, fn)=>{
    var mapped = preact_compat__rspack_import_0.Children.map(children, fn, undefined);
    return mapped == null ? null : Object.freeze(mapped);
};
var Children = {
    map: mapFn,
    forEach: mapFn,
    count: preact_compat__rspack_import_0.Children.count,
    only: preact_compat__rspack_import_0.Children.only,
    toArray (children) {
        return Object.freeze(preact_compat__rspack_import_0.Children.toArray(children));
    }
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/element.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  cloneElement: () => (cloneElement),
  createElement: () => (createElement)
});
/* import */ var preact_compat__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
/* import */ var _lynx_js_react_lepus__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/index.js");
/* import */ var _snapshot_utils_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function splitProps(props, rest, initialKey) {
    var key = initialKey;
    var children = rest;
    var spreadProps = {};
    if (props && typeof props === 'object') {
        spreadProps = props;
        if ('key' in spreadProps) {
            var { key: keyValue, ...propsWithoutKey } = spreadProps;
            key = keyValue;
            spreadProps = propsWithoutKey;
        }
        if ('children' in spreadProps) {
            var { children: childrenValue, ...propsWithoutChildren } = spreadProps;
            if (rest.length === 0) children = [
                childrenValue
            ];
            spreadProps = propsWithoutChildren;
        }
    }
    return {
        key,
        children,
        spreadProps
    };
}
function pickChildrenProps(props) {
    var childrenProps;
    for(var name in props)if (name.startsWith('$')) {
        childrenProps !== null && childrenProps !== void 0 ? childrenProps : childrenProps = {};
        childrenProps[name] = props[name];
    }
    return childrenProps;
}
/**
 * Creates a ReactLynx element using the snapshot runtime.
 *
 * @function
 * @public
 *
 * @group Functions
 */ var createElement = function(type, props, ...rest) {
    var _baseCreateElement = _lynx_js_react_lepus__rspack_import_1.createElement;
    /**
     * for built-in element which would create snapshot instance
     *
     * 1. transform props to values
     * 2. transform children to $0 for slot v2
     */ if (typeof type === 'string') {
        var { key, children, spreadProps } = splitProps(props, rest);
        return _baseCreateElement(type, Object.assign({}, {
            key,
            values: [
                {
                    ...spreadProps,
                    __spread: true
                }
            ]
        }, children.length > 0 ? {
            $0: children.length > 1 ? children : children[0]
        } : undefined));
    }
    return _baseCreateElement(type, props, ...rest);
};
/**
 * Clones a ReactLynx element using the snapshot runtime.
 *
 * @function
 * @public
 *
 * @group Functions
 */ var cloneElement = function(vnode, props, ...rest) {
    var _preProps_values, _getCloneSnapshotInfo;
    var type = vnode.type;
    if (typeof type !== 'string') return (0,preact_compat__rspack_import_0.cloneElement)(vnode, props, ...rest);
    if (!props && rest.length === 0) {
        // no props, no children. clone directly
        var _baseCloneElement = _lynx_js_react_lepus__rspack_import_1.cloneElement;
        return _baseCloneElement(vnode, props, ...rest);
    }
    var preProps = vnode.props;
    var preValues = (_preProps_values = preProps.values) !== null && _preProps_values !== void 0 ? _preProps_values : [];
    var resolvedProps = splitProps(props, rest, vnode.key);
    var { key, spreadProps } = resolvedProps;
    var { children } = resolvedProps;
    // raw element, merge props and reset children
    if (!(0,_snapshot_utils_js__rspack_import_2.isCompiledSnapshot)(type)) {
        var _preValues_;
        var nextProps = {
            ...(_preValues_ = preValues[0]) !== null && _preValues_ !== void 0 ? _preValues_ : {},
            key,
            ...spreadProps
        };
        if (children.length === 0 && '$0' in preProps) children = [
            preProps.$0
        ];
        return createElement(type, nextProps, ...children);
    }
    // normal compiled snapshot
    var values = preValues.slice();
    var _baseCreateElement = _lynx_js_react_lepus__rspack_import_1.createElement;
    var { cloneSpreadIndex } = (_getCloneSnapshotInfo = (0,_snapshot_utils_js__rspack_import_2.getCloneSnapshotInfo)(type)) !== null && _getCloneSnapshotInfo !== void 0 ? _getCloneSnapshotInfo : {};
    var cloneType = type;
    if (cloneSpreadIndex === undefined) {
        cloneType = (0,_snapshot_utils_js__rspack_import_2.getCloneSnapshotType)(type, values.length);
        values.push({
            ...spreadProps,
            __spread: true
        });
    } else {
        var _preValues_cloneSpreadIndex;
        var preSpread = (_preValues_cloneSpreadIndex = preValues[cloneSpreadIndex]) !== null && _preValues_cloneSpreadIndex !== void 0 ? _preValues_cloneSpreadIndex : {};
        values[cloneSpreadIndex] = {
            ...preSpread,
            ...spreadProps,
            __spread: true
        };
    }
    if (children.length > 0) console.warn('cloneElement from compiled snapshot with children is not supported');
    return _baseCreateElement(cloneType, {
        key,
        ...pickChildrenProps(preProps),
        values
    });
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/env.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  setupLynxEnv: () => (setupLynxEnv)
});
/* import */ var _core_lynx_data_processors_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/lynx-data-processors.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function setupLynxEnv() {
    var _lynx_SystemInfo;
    lynx.__initData = {};
    // @ts-expect-error no type for lynx.SystemInfo
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    globalThis.SystemInfo = (_lynx_SystemInfo = lynx.SystemInfo) !== null && _lynx_SystemInfo !== void 0 ? _lynx_SystemInfo : {};
    lynx.reportError = function(e) {
        var error = e instanceof Error ? e : new Error(JSON.stringify(e));
        _ReportError(error, {
            errorCode: 1101
        });
    };
    lynx.triggerGlobalEventFromLepus = function(eventName, params) {
        __OnLifecycleEvent([
            'globalEventFromLepus',
            [
                eventName,
                params
            ]
        ]);
    };
    {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        function __name(empty) {
            return `Native${empty}Modules`;
        }
        // TODO(hongzhiyuan.hzy): make sure this is run before any other code (especially code access `NativeModules`)
        // @ts-expect-error hack
        if (typeof globalThis[__name('')] === 'undefined') globalThis[__name('')] = undefined;
    }
    lynx.registerDataProcessors = function(dataProcessorDefinition) {
        globalThis.processData = (0,_core_lynx_data_processors_js__rspack_import_0.createProcessData)(dataProcessorDefinition);
    };
    // register empty DataProcessors to make sure `globalThis.processData` is set
    lynx.registerDataProcessors();
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/injectLepusMethods.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  injectLepusMethods: () => (injectLepusMethods)
});
/* import */ var _snapshot_snapshotInstanceManager_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceManager.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function injectLepusMethods() {
    Object.assign(globalThis, {
        getUniqueIdListBySnapshotId,
        getSnapshotIdByUniqueId
    });
}
/**
 * Get the list of `unique_id` of the fiber element by the SnapshotInstance `__id`.
 */ function getUniqueIdListBySnapshotId({ snapshotId }) {
    var _si___elements;
    var si = _snapshot_snapshotInstanceManager_js__rspack_import_0.snapshotInstanceManager.values.get(snapshotId);
    if (si === null || si === void 0 ? void 0 : (_si___elements = si.__elements) === null || _si___elements === void 0 ? void 0 : _si___elements.length) {
        var uniqueIdList = [];
        for (var element of si.__elements){
            var uniqueId = __GetElementUniqueID(element);
            uniqueIdList.push(uniqueId);
        }
        return {
            uniqueIdList
        };
    }
    return null;
}
/**
 * Get the SnapshotInstance `__id` of the fiber element by the `unique_id`.
 */ function getSnapshotIdByUniqueId({ uniqueId }) {
    for (var si of _snapshot_snapshotInstanceManager_js__rspack_import_0.snapshotInstanceManager.values.values()){
        var _si___elements;
        if (si === null || si === void 0 ? void 0 : (_si___elements = si.__elements) === null || _si___elements === void 0 ? void 0 : _si___elements.length) for (var element of si.__elements){
            var unique_id = __GetElementUniqueID(element);
            if (unique_id === uniqueId) return {
                snapshotId: si.__id
            };
        }
    }
    return null;
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/lazyBundleConstants.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  LYNX_LAZY_SYNC_TIMEOUT_SECONDS: () => (LYNX_LAZY_SYNC_TIMEOUT_SECONDS),
  SECTION_BACKGROUND: () => (SECTION_BACKGROUND),
  SECTION_CSS: () => (SECTION_CSS),
  SECTION_MAIN_THREAD: () => (SECTION_MAIN_THREAD)
});
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var SECTION_MAIN_THREAD = 'main-thread';
var SECTION_BACKGROUND = 'background';
var SECTION_CSS = 'CSS';
var LYNX_LAZY_SYNC_TIMEOUT_SECONDS = 5;
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/nodesRef.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  serializeNodesRef: () => (serializeNodesRef)
});
/* import */ var _lifecycle_ref_delay_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/ref/delay.js");

/**
 * `_nodeSelectToken.type` values produced by Lynx core's selector query:
 *   - `0` = CSS selector (`select` / `selectAll` / `selectRoot`)
 *   - `1` = React ref (`selectReactRef`)
 *   - `2` = element unique id (`selectUniqueID`)
 *
 * We only support type `0` — the apply side resolves it via
 * `__QuerySelector`. Types `1` / `2` would need their own lookup PAPIs
 * (`__GetElementByUniqueId`, etc.) which we don't wire today.
 */ var NodeSelectType = {
    Selector: 0,
    ReactRef: 1,
    UniqueID: 2
};
var serializeNodesRef = (nodesRef)=>{
    if (nodesRef instanceof _lifecycle_ref_delay_js__rspack_import_0.RefProxy) return nodesRef.selector;
    var nodeSelectToken = nodesRef._nodeSelectToken;
    if (nodeSelectToken.type !== NodeSelectType.Selector) throw new Error(`[createPortal] unsupported NodesRef type ${nodeSelectToken.type} ` + `(identifier ${JSON.stringify(nodeSelectToken.identifier)}). ` + `Pass a CSS-selector NodesRef from \`lynx.createSelectorQuery().select(...)\` ` + `or a React ref instead.`);
    return nodeSelectToken.identifier;
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/portals.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearPendingPortalInsertBefore: () => (/* reexport safe */ _portalsPending_js__rspack_import_0.clearPendingPortalInsertBefore),
  createPortal: () => (createPortal)
});
/* import */ var _portalsPending_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/portalsPending.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * Renders `vnode` into `container` instead of the current component's position
 * in the element tree, while keeping it in the React tree.
 *
 * `container` is a `NodesRef`, obtained either from a callback `ref` or from
 * `lynx.createSelectorQuery().select(...)`.
 *
 * @remarks
 * Context still flows across the portal boundary, and state updates inside the
 * portal behave like they do in any other component. A few behaviors differ
 * from `react-dom`:
 *
 * - Events do not bubble along the React tree. ReactLynx follows Preact's
 *   approach, which has no synthetic event system, so events follow the actual
 *   element structure of the page.
 * - The portaled subtree renders on the background thread only, and does not
 *   participate in main-thread first-screen rendering.
 * - Mounting across pages or across native containers is not supported.
 *
 * @param vnode - The React node to render into `container`.
 * @param container - The `NodesRef` target to render into.
 * @returns A `ReactNode` placeholder to include in the JSX at the call site;
 * the rendered output goes into `container`.
 *
 * @public
 */ function createPortal(vnode, container) {
    return null;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/portalsPending.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearPendingPortalInsertBefore: () => (clearPendingPortalInsertBefore),
  pendingInsertBefore: () => (pendingInsertBefore)
});
/* import */ var _nodesRef_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/nodesRef.js");
/* import */ var _lifecycle_patch_snapshotPatch_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
/* import */ var _snapshot_reconstructInstanceTree_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/reconstructInstanceTree.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



/**
 * Tuples of `(container, child, before)` queued by `Portal`'s pre-hydrate
 * `fakeRoot.insertBefore` — the global patch buffer is `undefined` before
 * hydrate, so the BSI constructor's `CreateElement` push and our
 * `nodesRefInsertBefore` push would both be silently dropped. We hold them
 * here and replay during `clearPendingPortalInsertBefore` (called from
 * `hydrate()` once the global buffer is initialized).
 */ var pendingInsertBefore = [];
var clearPendingPortalInsertBefore = ()=>{
    var i = 0;
    while(i < pendingInsertBefore.length){
        var container = pendingInsertBefore[i++];
        var child = pendingInsertBefore[i++];
        var before = pendingInsertBefore[i++];
        // Replay the BSI subtree's `CreateElement` / `SetAttributes` / internal
        // `InsertBefore` ops — they were dropped pre-hydrate because
        // `__globalSnapshotPatch` was `undefined`. Pass `parentId=undefined` so
        // the topmost node is left orphan; we link it to the host element via
        // the following `nodesRefInsertBefore` instead.
        (0,_snapshot_reconstructInstanceTree_js__rspack_import_2.reconstructInstanceTree)([
            child
        ]);
        // Pre-hydrate `before` is effectively always undefined: preact's
        // initial diff appends each child sequentially, so the queued tuple's
        // third slot is undefined in normal flows. The `before?.__id` truthy
        // branch is exercised post-hydrate in the prepend-keyed-children test.
        /* v8 ignore start */ _lifecycle_patch_snapshotPatch_js__rspack_import_1.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_1.SnapshotOperation.nodesRefInsertBefore, (0,_nodesRef_js__rspack_import_0.serializeNodesRef)(container), child.__id, before === null || before === void 0 ? void 0 : before.__id);
    /* v8 ignore stop */ }
    pendingInsertBefore.length = 0;
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/prepareLazyBundleMTS.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  injectPrepareLazyBundleMTS: () => (injectPrepareLazyBundleMTS)
});
/* import */ var _lazyBundleConstants_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/lazyBundleConstants.js");
/* import */ var _lifecycle_constant_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var cache = new Set();
function prepareLazyBundleMTS(payload) {
    var { url, host } = payload;
    if (cache.has(url)) return;
    var handler;
    try {
        handler = lynx.fetchBundle(url, {});
    } catch  {
        // fetchBundle threw — the bundle never loaded. Leave `url` out of the
        // cache so a later prepare for the same url can retry.
        return;
    }
    // .then will be a sync function
    // since the bundle has been loaded in BTS
    handler.then((response)=>{
        var _globalThis_processEvalResultByHost;
        if (!response || response.code !== 0) return;
        // The bundle is now loaded in native (code === 0), so the native SDK
        // won't re-eval it. Only now mark it done — caching earlier would have
        // pinned a failed fetch/non-zero response and blocked the retry above.
        // A subsequent `loadScript` throw below is a BG-only bundle (deterministic,
        // not retryable), so caching here is still correct.
        cache.add(url);
        var loaded;
        try {
            var evaluate = lynx.loadScript(_lazyBundleConstants_js__rspack_import_0.SECTION_MAIN_THREAD, {
                bundleName: response.url
            });
            loaded = evaluate(url);
        } catch  {
            // BG-only bundle (no main-thread section)
            return;
        }
        // Route to the loading `host`'s handler — the chunk's modules install into
        // that host's registry. No host (e.g. a standalone component loaded
        // directly, self-contained in its own registry) → nothing to install here.
        var processEvalResult = host == null ? undefined : (_globalThis_processEvalResultByHost = globalThis.processEvalResultByHost) === null || _globalThis_processEvalResultByHost === void 0 ? void 0 : _globalThis_processEvalResultByHost[host];
        if (typeof processEvalResult === 'function') processEvalResult(()=>loaded, url);
        var styleSheet = __LoadStyleSheet(_lazyBundleConstants_js__rspack_import_0.SECTION_CSS, response.url);
        if (styleSheet !== null) __AdoptStyleSheet(styleSheet);
    });
}
/** @internal */ function injectPrepareLazyBundleMTS() {
    Object.assign(globalThis, {
        [_lifecycle_constant_js__rspack_import_1.LifecycleConstant.prepareLazyBundleMTS]: prepareLazyBundleMTS
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/runWithForce.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runWithForce: () => (runWithForce)
});
/* import */ var _core_forceRootRender_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/forceRootRender.js");
/* import */ var _root_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/root.js");


function runWithForce(cb) {
    (0,_core_forceRootRender_js__rspack_import_0.runWithForceRootRender)({
        getRootVNode: ()=>_root_js__rspack_import_1.__root.__jsx,
        setRootVNode: (vnode)=>{
            // @ts-expect-error: __root.__jsx is a Preact VNode during background force render.
            _root_js__rspack_import_1.__root.__jsx = vnode;
        },
        render: cb
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/suspense.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Suspense: () => (Suspense)
});
/* import */ var preact_compat__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs");
/* import */ var preact_hooks__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThread.js");
/* import */ var _lynx_js_react_lepus__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/index.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var Suspense = ({ children, fallback })=>{
    var __createElement = _lynx_js_react_lepus__rspack_import_2.createElement;
    (0,preact_hooks__rspack_import_1.useRef)(undefined);
    var newChildren = __createElement('wrapper', {
        $0: children
    });
    var newFallback = __createElement('wrapper', {
        $0: fallback
    });
    return __createElement(preact_compat__rspack_import_0.Suspense, {
        fallback: newFallback
    }, newChildren);
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  diffArrayAction: () => (diffArrayAction),
  diffArrayLepus: () => (diffArrayLepus),
  hydrate: () => (hydrate),
  isEmptyDiffResult: () => (isEmptyDiffResult)
});
/* import */ var _shared_profile_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _list_list_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/list.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
/* import */ var _snapshot_dynamicPartType_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js");
/* import */ var _snapshot_ref_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _utils_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.






var UNREACHABLE_ITEM_KEY_NOT_FOUND = 'UNREACHABLE_ITEM_KEY_NOT_FOUND';
function isEmptyDiffResult(diffResult) {
    var hasChanged = !(0,_utils_js__rspack_import_5.isEmptyObject)(diffResult.i) || !(0,_utils_js__rspack_import_5.isEmptyObject)(diffResult.m) || diffResult.r.length > 0;
    return !hasChanged;
}
function diffArrayLepus(before, after, isSameType, onDiffChildren, isListHasItemKey) {
    var lastPlacedIndex = 0;
    var result = {
        $$diff: true,
        i: {},
        r: [],
        m: {}
    };
    var beforeMap = {};
    for(var i = 0; i < before.length; i++){
        var _ref, _beforeMap, _key, _;
        var _node___listItemPlatformInfo;
        var node = before[i];
        var key = isListHasItemKey ? (_ref = (_node___listItemPlatformInfo = node.__listItemPlatformInfo) === null || _node___listItemPlatformInfo === void 0 ? void 0 : _node___listItemPlatformInfo['item-key']) !== null && _ref !== void 0 ? _ref : UNREACHABLE_ITEM_KEY_NOT_FOUND : node.type;
        ((_ = (_beforeMap = beforeMap)[_key = key]) !== null && _ !== void 0 ? _ : _beforeMap[_key] = new Set()).add([
            node,
            i
        ]);
    }
    for(var i1 = 0; i1 < after.length; i1++){
        var _ref1;
        var _afterNode___listItemPlatformInfo;
        var afterNode = after[i1];
        var key1 = isListHasItemKey ? (_ref1 = (_afterNode___listItemPlatformInfo = afterNode.__listItemPlatformInfo) === null || _afterNode___listItemPlatformInfo === void 0 ? void 0 : _afterNode___listItemPlatformInfo['item-key']) !== null && _ref1 !== void 0 ? _ref1 : UNREACHABLE_ITEM_KEY_NOT_FOUND : afterNode.type;
        var beforeNodes = beforeMap[key1];
        var beforeNode = void 0;
        if (beforeNodes && beforeNodes.size > 0 && ([beforeNode] = beforeNodes, beforeNode) && isSameType(beforeNode[0], afterNode)) {
            // Reuse old node
            beforeNodes.delete(beforeNode);
            var oldIndex = beforeNode[1];
            onDiffChildren(beforeNode[0], afterNode, oldIndex, i1);
            if (oldIndex < lastPlacedIndex) {
                result.m[oldIndex] = i1;
                continue;
            } else lastPlacedIndex = oldIndex;
        } else result.i[i1] = afterNode;
    }
    // Delete
    for(var k in beforeMap)for (var [, i2] of beforeMap[k])result.r.push(i2);
    return result;
}
// export function diffIterableLepus<A extends Typed, B extends Typed>(
//   before: A[],
//   after: Iterable<B>,
//   isSameType: (a: A, b: B) => boolean,
//   onDiffChildren: (a: A, b: B) => void
// ): DiffResult<B> {
//   let returnResult = EMPTY_DIFF_RESULT as DiffResult<B>;
//   let lastPlacedIndex = 0;
//   const result: DiffResult<B> = {
//     $$diff: true,
//     i: {},
//     r: [],
//     m: {},
//   };
//   const beforeMap: Record<string, Set<[A, number]>> = {};
//   for (let i = 0; i < before.length; i++) {
//     let node = before[i];
//     (beforeMap[node.type] ??= new Set()).add([node, i]);
//   }
//   let i = 0;
//   for (const afterNode of after) {
//     const beforeNodes = beforeMap[afterNode.type];
//     let beforeNode: [A, number];
//     if (beforeNodes && (([beforeNode] = beforeNodes), beforeNode) && isSameType(beforeNode[0], afterNode)) {
//       // Reuse old node
//       beforeNodes.delete(beforeNode);
//       const oldIndex = beforeNode[1];
//       onDiffChildren(beforeNode[0], afterNode);
//       if (oldIndex < lastPlacedIndex) {
//         result.m[oldIndex] = i;
//         returnResult = result;
//         i++;
//         continue;
//       } else {
//         lastPlacedIndex = oldIndex;
//       }
//     } else {
//       // Create new node
//       result.i[i] = afterNode;
//       returnResult = result;
//     }
//     i++;
//   }
//   // delete
//   for (const k in beforeMap) {
//     for (const [, i] of beforeMap[k]) {
//       result.r.push(i);
//       returnResult = result;
//     }
//   }
//   return result;
// }
function diffArrayAction(before, diffResult, onInsert, onRemove, onMove) {
    if (isEmptyDiffResult(diffResult)) return before;
    var deleteSet = new Set(diffResult.r);
    var { i: insertMap, m: placementMap } = diffResult;
    var moveTempMap = new Map();
    var old;
    var k = 0;
    old = before[k];
    // let current: T | null | undefined = null;
    var result = [];
    var i = 0; // index of the old list
    var j = 0; // index of the new list
    var remain = Object.keys(insertMap).length;
    while(old || remain > 0){
        var keep = false;
        if (old && deleteSet.has(j)) onRemove(old);
        else if (old && placementMap[j] !== undefined) {
            // save node to re-use
            moveTempMap.set(placementMap[j], old);
            remain++;
        } else {
            // insert node
            var newNode = old;
            if (moveTempMap.has(i)) {
                // insert re-used node
                newNode = moveTempMap.get(i);
                keep = true;
                onMove(newNode, old);
                remain--;
            } else if (insertMap[i] !== undefined) {
                // insert new node
                newNode = onInsert(insertMap[i], old);
                keep = true;
                remain--;
            }
            result.push(newNode);
            i++;
        }
        if (old && !keep) {
            old = before[++k];
            j++;
        }
    }
    return result;
}
function hydrate(before, after, options) {
    after.__elements = before.__elements;
    after.__element_root = before.__element_root;
    if (!(options === null || options === void 0 ? void 0 : options.skipUnRef)) (0,_snapshot_ref_js__rspack_import_4.unref)(before, false);
    var swap;
    if (swap = options === null || options === void 0 ? void 0 : options.swap) swap[before.__id] = after.__id;
    _list_pendingListUpdates_js__rspack_import_2.__pendingListUpdates.runWithoutUpdates(()=>{
        var _after___values;
        (_after___values = after.__values) === null || _after___values === void 0 ? void 0 : _after___values.forEach((value, index)=>{
            var old = before.__values[index];
            if (value !== old) {
                after.__values[index] = old;
                after.setAttribute(index, value);
            }
        });
    });
    var { slot } = after.__snapshot_def;
    if (!slot) return;
    var beforeChildNodes = before.childNodes;
    var afterChildNodes = after.childNodes;
    slot.forEach(([type, elementIndex], index)=>{
        switch(type){
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.Slot:
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.MultiChildren:
                {
                    // TODO: the following null assertions are not 100% safe
                    var v1 = beforeChildNodes[index];
                    var v2 = afterChildNodes[index];
                    hydrate(v1, v2, options);
                    break;
                }
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.SlotV2:
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.Children:
                {
                    var filteredBeforeChildNodes = beforeChildNodes;
                    var filteredAfterChildNodes = afterChildNodes;
                    if (type === _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.SlotV2) {
                        filteredBeforeChildNodes = beforeChildNodes.filter((v)=>v.__slotIndex === index);
                        filteredAfterChildNodes = afterChildNodes.filter((v)=>v.__slotIndex === index);
                    }
                    // Children match pairwise by type (the common case), so the diff is
                    // empty — do what `diffArrayLepus` + `diffArrayAction` would do without
                    // allocating the diff structures.
                    var length = filteredBeforeChildNodes.length;
                    if (length === filteredAfterChildNodes.length) {
                        var samePairwise = true;
                        for(var i = 0; i < length; i++)if (filteredBeforeChildNodes[i].type !== filteredAfterChildNodes[i].type) {
                            samePairwise = false;
                            break;
                        }
                        if (samePairwise) {
                            for(var i1 = 0; i1 < length; i1++)hydrate(filteredBeforeChildNodes[i1], filteredAfterChildNodes[i1], options);
                            break;
                        }
                    }
                    var diffResult = diffArrayLepus(filteredBeforeChildNodes, filteredAfterChildNodes, (a, b)=>a.type === b.type, (a, b)=>{
                        hydrate(a, b, options);
                    }, false);
                    diffArrayAction(filteredBeforeChildNodes, diffResult, (node, target)=>{
                        node.ensureElements();
                        __InsertElementBefore(before.__elements[elementIndex], node.__element_root, target === null || target === void 0 ? void 0 : target.__element_root);
                        return node;
                    }, (node)=>{
                        __RemoveElement(before.__elements[elementIndex], node.__element_root);
                    }, (node, target)=>{
                        __RemoveElement(before.__elements[elementIndex], node.__element_root);
                        __InsertElementBefore(before.__elements[elementIndex], node.__element_root, target === null || target === void 0 ? void 0 : target.__element_root);
                    });
                    break;
                }
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.ListSlotV2:
            case _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.ListChildren:
                {
                    var _console_alog, _console;
                    var filteredBeforeChildNodes1 = beforeChildNodes;
                    var filteredAfterChildNodes1 = afterChildNodes;
                    if (type === _snapshot_dynamicPartType_js__rspack_import_3.DynamicPartType.ListSlotV2) {
                        filteredBeforeChildNodes1 = beforeChildNodes.filter((v)=>v.__slotIndex === index);
                        filteredAfterChildNodes1 = afterChildNodes.filter((v)=>v.__slotIndex === index);
                    }
                    var removals = [];
                    var insertions = [];
                    var updateAction = [];
                    var listID = __GetElementUniqueID(before.__elements[elementIndex]);
                    var signMap = _list_list_js__rspack_import_1.gSignMap[listID];
                    var recycleMap = _list_list_js__rspack_import_1.gRecycleMap[listID];
                    var diffResult1 = diffArrayLepus(filteredBeforeChildNodes1, filteredAfterChildNodes1, (a, b)=>a.type === b.type, (a, b, _oldIndex, newIndex)=>{
                        if (JSON.stringify(a.__listItemPlatformInfo) !== JSON.stringify(b.__listItemPlatformInfo)) updateAction.push({
                            ...b.__listItemPlatformInfo,
                            from: newIndex,
                            to: newIndex,
                            // no flush
                            flush: false,
                            type: b.type
                        });
                        if (a.__elements) {
                            // transfer a's elements to b
                            hydrate(a, b, options);
                            // if a list-item has `elements`, it may be:
                            //   - `enqueueComponent` already called on it: so we need to update the `signMap` and the `recycleMap`
                            //   - `enqueueComponent` not called on it: update the `signMap`
                            var listItemID = __GetElementUniqueID(a.__element_root);
                            if (signMap.has(listItemID)) signMap.set(listItemID, b);
                            if (recycleMap.has(a.type)) {
                                var recycleSignMap = recycleMap.get(a.type);
                                // Should only update `list-item` in the recycling pool
                                // Because if an on-screen `list-item` is added to the recycling pool,
                                // it could cause a blank screen when reused next time, as it may still be visible.
                                if (recycleSignMap.has(listItemID)) recycleSignMap.set(listItemID, b);
                            }
                        }
                    }, true);
                    for (var i2 of diffResult1.r)removals.push(i2);
                    for(var i3 in diffResult1.i)insertions.push(Number(i3));
                    for(var i4 in diffResult1.m){
                        removals.push(Number(i4));
                        insertions.push(diffResult1.m[i4]);
                    }
                    insertions.sort((a, b)=>a - b);
                    removals.sort((a, b)=>a - b);
                    var info = {
                        insertAction: insertions.map((it)=>({
                                position: it,
                                type: afterChildNodes[it].type,
                                ...afterChildNodes[it].__listItemPlatformInfo
                            })),
                        removeAction: removals,
                        updateAction
                    };
                    if (true) (0,_shared_profile_js__rspack_import_0.profileStart)('ReactLynx::listHydrate::updateListInfo', {
                        args: {
                            'list id': String(listID),
                            'update list info': JSON.stringify(info)
                        }
                    });
                    if (false) {}
                    var listElement = before.__elements[elementIndex];
                    __SetAttribute(listElement, 'update-list-info', info);
                    var [componentAtIndex, componentAtIndexes] = (0,_list_list_js__rspack_import_1.componentAtIndexFactory)(afterChildNodes, hydrate);
                    __UpdateListCallbacks(listElement, componentAtIndex, (0,_list_list_js__rspack_import_1.enqueueComponentFactory)(), componentAtIndexes);
                    // The `before` & `after` target to the same list element, so we need to
                    // avoid the newly created list's (behind snapshot instance `after`) "update-list-info" being recorded.
                    _list_pendingListUpdates_js__rspack_import_2.__pendingListUpdates.clear(after.__id);
                    if (true) (0,_shared_profile_js__rspack_import_0.profileEnd)();
                    break;
                }
            default:
                throw new Error('Unexpected slot type: ' + type);
        }
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  __OpAttr: () => (__OpAttr),
  __OpBegin: () => (__OpBegin),
  __OpEnd: () => (__OpEnd),
  __OpText: () => (__OpText),
  render: () => (render),
  renderToStaticMarkup: () => (renderToStaticMarkup),
  renderToString: () => (renderToString)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _snapshot_snapshot_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _shared_render_constants_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Implements rendering to opcodes.
 * This module is modified from preact-render-to-string@6.0.3 to generate
 * opcodes instead of HTML strings for Lynx.
 */ // @ts-nocheck



/** @typedef {import('preact').VNode} VNode */ var EMPTY_ARR = [];
var isArray = /* @__PURE__ */ Array.isArray;
var assign = /* @__PURE__ */ Object.assign;
// Global state for the current render pass
var beforeDiff, beforeDiff2, afterDiff, renderHook, ummountHook;
/**
 * Render Preact JSX + Components to an HTML string.
 * @param {VNode} vnode	JSX Element / VNode to render
 * @param {object} [context] Initial root context object
 */ function renderToString(vnode, context, into) {
    // Performance optimization: `renderToString` is synchronous and we
    // therefore don't execute any effects. To do that we pass an empty
    // array to `options._commit` (`__c`). But we can go one step further
    // and avoid a lot of dirty checks and allocations by setting
    // `options._skipEffects` (`__s`) too.
    var previousSkipEffects = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.SKIP_EFFECTS];
    preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.SKIP_EFFECTS] = true;
    // store options hooks once before each synchronous render call
    beforeDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.DIFF];
    beforeDiff2 = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.DIFF2];
    afterDiff = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.DIFFED];
    renderHook = preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.RENDER];
    ummountHook = preact__rspack_import_0.options.unmount;
    var parent = (0,preact__rspack_import_0.h)(preact__rspack_import_0.Fragment, null);
    parent[_shared_render_constants_js__rspack_import_2.CHILDREN] = [
        vnode
    ];
    var opcodes = [];
    try {
        _renderToString(vnode, context || EMPTY_OBJ, 0, undefined, parent, opcodes, 0, into);
    } finally{
        // options._commit, we don't schedule any effects in this library right now,
        // so we can pass an empty queue to this hook.
        if (preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.COMMIT]) preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.COMMIT](vnode, EMPTY_ARR);
        preact__rspack_import_0.options[_shared_render_constants_js__rspack_import_2.SKIP_EFFECTS] = previousSkipEffects;
        EMPTY_ARR.length = 0;
    }
    return opcodes;
}
// Installed as setState/forceUpdate for function components
function markAsDirty() {
    this[_shared_render_constants_js__rspack_import_2.BITS] |= _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY;
}
var EMPTY_OBJ = {};
var __OpBegin = 0;
var __OpEnd = 1;
var __OpAttr = 2;
var __OpText = 3;
/**
 * @param {VNode} vnode
 * @param {Record<string, unknown>} context
 */ function renderClassComponent(vnode, context, globalContext) {
    var type = /** @type {import("preact").ComponentClass<typeof vnode.props>} */ vnode.type;
    var c;
    if (vnode[_shared_render_constants_js__rspack_import_2.COMPONENT]) {
        c = vnode[_shared_render_constants_js__rspack_import_2.COMPONENT];
        c.state = c[_shared_render_constants_js__rspack_import_2.NEXT_STATE];
    } else c = new type(vnode.props, context);
    vnode[_shared_render_constants_js__rspack_import_2.COMPONENT] = c;
    c[_shared_render_constants_js__rspack_import_2.VNODE] = vnode;
    c.props = vnode.props;
    c.context = context;
    c[_shared_render_constants_js__rspack_import_2.GLOBAL_CONTEXT] = globalContext;
    // turn off stateful re-rendering:
    c[_shared_render_constants_js__rspack_import_2.BITS] |= _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY;
    if (c.state == null) c.state = EMPTY_OBJ;
    if (c[_shared_render_constants_js__rspack_import_2.NEXT_STATE] == null) c[_shared_render_constants_js__rspack_import_2.NEXT_STATE] = c.state;
    if (type.getDerivedStateFromProps) c.state = assign({}, c.state, type.getDerivedStateFromProps(c.props, c.state));
    if (renderHook) renderHook(vnode);
    return c.render(c.props, c.state, context);
}
/**
 * Recursively render VNodes to HTML.
 * @param {VNode|any} vnode
 * @param {any} context
 * @param {number | true} slotIndex
 * @param {any} selectValue
 * @param {VNode} parent
 * @param {any[]} opcodes
 * @param {number} opcodesLength
 * @param {SnapshotInstance} into
 */ function _renderToString(vnode, context, slotIndex, selectValue, parent, opcodes, opcodesLength, into) {
    // Ignore non-rendered VNodes/values
    if (vnode == null || vnode === true || vnode === false || vnode === '') return;
    var vnodeType = typeof vnode;
    // Text VNodes: escape as HTML
    if (vnodeType !== 'object') {
        if (vnodeType === 'function') return;
        renderToTextNode(into, vnode, opcodes, slotIndex);
        return;
    }
    // Recurse into children / Arrays
    if (isArray(vnode)) {
        parent[_shared_render_constants_js__rspack_import_2.CHILDREN] = vnode;
        for(var i = 0; i < vnode.length; i++){
            var child = vnode[i];
            if (child == null || typeof child === 'boolean') continue;
            _renderToString(child, context, slotIndex === true ? i : slotIndex, selectValue, parent, opcodes, /* v8 ignore start */  false ? 0 : 0, /* v8 ignore end */ into);
        }
        return;
    }
    // VNodes have {constructor:undefined} to prevent JSON injection:
    // if (vnode.constructor !== undefined) return;
    vnode[_shared_render_constants_js__rspack_import_2.PARENT] = parent;
    if (beforeDiff) beforeDiff(vnode);
    if (beforeDiff2) beforeDiff2(vnode, EMPTY_OBJ);
    var type = vnode.type, props = vnode.props, cctx = context, contextType, rendered, component;
    // Invoke rendering on Components
    if (typeof type === 'function') {
        if (type === preact__rspack_import_0.Fragment) rendered = props.children;
        else {
            contextType = type.contextType;
            if (contextType != null) {
                var provider = context[contextType.__c];
                cctx = provider ? provider.props.value : contextType.__;
            }
            if (type.prototype && typeof type.prototype.render === 'function') {
                rendered = /**#__NOINLINE__**/ renderClassComponent(vnode, cctx, context);
                component = vnode[_shared_render_constants_js__rspack_import_2.COMPONENT];
            } else {
                component = {
                    [_shared_render_constants_js__rspack_import_2.VNODE]: vnode,
                    props,
                    context: cctx,
                    [_shared_render_constants_js__rspack_import_2.GLOBAL_CONTEXT]: context,
                    // silently drop state updates
                    setState: markAsDirty,
                    forceUpdate: markAsDirty,
                    [_shared_render_constants_js__rspack_import_2.BITS]: _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY,
                    // hooks
                    [_shared_render_constants_js__rspack_import_2.HOOK]: []
                };
                vnode[_shared_render_constants_js__rspack_import_2.COMPONENT] = component;
                component.constructor = type;
                component.render = doRender;
                // If a hook invokes setState() to invalidate the component during rendering,
                // re-render it up to 25 times to allow "settling" of memoized states.
                var count = 0;
                while(component[_shared_render_constants_js__rspack_import_2.BITS] & _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY && count++ < 25){
                    component[_shared_render_constants_js__rspack_import_2.BITS] &= ~_shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY;
                    if (renderHook) renderHook(vnode);
                    rendered = component.render(props, component.state, cctx);
                }
                component[_shared_render_constants_js__rspack_import_2.BITS] |= _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY;
            }
            if (component.getChildContext != null) context = assign({}, context, component.getChildContext());
        }
        // When a component returns a Fragment node we flatten it in core, so we
        // need to mirror that logic here too
        var isTopLevelFragment = rendered != null && rendered.type === preact__rspack_import_0.Fragment && rendered.key == null;
        rendered = isTopLevelFragment ? rendered.props.children : rendered;
        var lastChild = into.__lastChild;
        // Recurse into children before invoking the after-diff hook
        try {
            _renderToString(rendered, context, slotIndex, selectValue, vnode, opcodes, /* v8 ignore start */  false ? 0 : 0, /* v8 ignore end */ into);
        } catch (e) {
            // clear existing children
            into.removeChildren(lastChild ? lastChild.__nextSibling : into.__firstChild);
            if (e && typeof e === 'object' && e.then && component && /* _childDidSuspend */ component[_shared_render_constants_js__rspack_import_2.CHILD_DID_SUSPEND]) {
                component[_shared_render_constants_js__rspack_import_2.NEXT_STATE] = assign({}, component[_shared_render_constants_js__rspack_import_2.NEXT_STATE], {
                    /* _suspended */ __a: true
                });
                if (component[_shared_render_constants_js__rspack_import_2.BITS] & _shared_render_constants_js__rspack_import_2.COMPONENT_DIRTY) {
                    rendered = renderClassComponent(vnode, context);
                    component = vnode[_shared_render_constants_js__rspack_import_2.COMPONENT];
                    if (false) {}
                    _renderToString(rendered, context, slotIndex, selectValue, vnode, opcodes, /* v8 ignore start */  false ? 0 : 0, /* v8 ignore end */ into);
                }
            } else throw e;
        } finally{
            if (afterDiff) afterDiff(vnode);
            vnode[_shared_render_constants_js__rspack_import_2.PARENT] = undefined;
            if (ummountHook) ummountHook(vnode);
        }
        return;
    }
    var children;
    var hasNamedChildren = false;
    // hack for runtime test
    if (false) {}
    // already inserted
    if (vnode.__parent) vnode = new _snapshot_snapshot_js__rspack_import_1.SnapshotInstance(type);
    if (false) {}
    vnode.__slotIndex = slotIndex;
    into.insertBefore(vnode);
    for(var name in props){
        var v = props[name];
        switch(name){
            case 'children':
                children = v;
                continue;
            // VDOM-specific props
            /* c8 ignore next 5 */ case 'key':
            case 'ref':
            case '__self':
            case '__source':
                continue;
            default:
                if (name.startsWith('$')) {
                    children !== null && children !== void 0 ? children : children = [];
                    children[+name.slice(1)] = v;
                    hasNamedChildren = true;
                    continue;
                }
        }
        // write this attribute to the buffer
        if (v != null && v !== false && typeof v !== 'function') {
            if (false) {}
            vnode.setAttribute(name, v);
        }
    }
    var childrenType = typeof children;
    if (childrenType === 'string' || childrenType === 'number') renderToTextNode(vnode, children, opcodes, slotIndex);
    else if (children != null && children !== false && children !== true) {
        // recurse into this element VNode's children
        var _slotIndex = slotIndex;
        if (hasNamedChildren) {
            // @ts-expect-error children must be an array
            if (children.length === 1) {
                children = children[0];
                _slotIndex = 0;
            } else _slotIndex = true;
        }
        _renderToString(children, context, _slotIndex, selectValue, vnode, opcodes, /* v8 ignore start */  false ? 0 : 0, /* v8 ignore end */ vnode);
    }
    if (afterDiff) afterDiff(vnode);
    vnode[_shared_render_constants_js__rspack_import_2.PARENT] = undefined;
    if (ummountHook) ummountHook(vnode);
    if (false) {}
    vnode[_shared_render_constants_js__rspack_import_2.CHILDREN] = undefined;
    return;
}
/** The `.render()` method for a PFC backing instance. */ function doRender(props, state, context) {
    return this.constructor(props, context);
}
function renderToTextNode(into, text, opcodes, slotIndex) {
    var textNode = new _snapshot_snapshot_js__rspack_import_1.SnapshotInstance(null);
    textNode.__slotIndex = slotIndex;
    textNode.setAttribute(0, text);
    into.insertBefore(textNode);
    if (false) {}
}
/* export default */ __webpack_exports__["default"] = (renderToString);
var render = renderToString;
var renderToStaticMarkup = renderToString;
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/opcodes.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ssrHydrateByOpcodes: () => (ssrHydrateByOpcodes)
});
/* import */ var _hydrate_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
/* import */ var _list_list_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/list.js");
/* import */ var _shared_render_constants_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/render-constants.js");
/* import */ var _snapshot_snapshot_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




var OpcodeBegin = 0;
var OpcodeEnd = 1;
var OpcodeAttr = 2;
var OpcodeText = 3;
function ssrHydrateByOpcodes(opcodes, into, refMap) {
    var top = into;
    var stack = [
        into
    ];
    for(var i = 0; i < opcodes.length;){
        var opcode = opcodes[i];
        switch(opcode){
            case OpcodeBegin:
                {
                    var p = top;
                    var [type, __id, elements] = opcodes[i + 1];
                    top = new _snapshot_snapshot_js__rspack_import_3.SnapshotInstance(type, __id);
                    top.__pendingElements = elements;
                    top.__slotIndex = opcodes[i + 2];
                    p.insertBefore(top);
                    stack.push(top);
                    i += 3;
                    break;
                }
            case OpcodeEnd:
                {
                    // @ts-ignore
                    top[_shared_render_constants_js__rspack_import_2.CHILDREN] = undefined;
                    top.__elements = top.__pendingElements.map(({ ssrID })=>refMap[ssrID]);
                    top.__element_root = top.__elements[0];
                    delete top.__pendingElements;
                    if (top.__snapshot_def.isListHolder) {
                        var [, elementIndex] = top.__snapshot_def.slot[0];
                        var listElement = top.__elements[elementIndex];
                        var listElementUniqueID = __GetElementUniqueID(listElement);
                        var signMap = _list_list_js__rspack_import_1.gSignMap[listElementUniqueID] = new Map();
                        _list_list_js__rspack_import_1.gRecycleMap[listElementUniqueID] = new Map();
                        var enqueueFunc = (0,_list_list_js__rspack_import_1.enqueueComponentFactory)();
                        var [componentAtIndex, componentAtIndexes] = (0,_list_list_js__rspack_import_1.componentAtIndexFactory)(top.childNodes, _hydrate_js__rspack_import_0.hydrate);
                        for (var child of top.childNodes)if (child.__element_root) {
                            var childElementUniqueID = __GetElementUniqueID(child.__element_root);
                            signMap.set(childElementUniqueID, child);
                            enqueueFunc(listElement, listElementUniqueID, childElementUniqueID);
                        }
                        __UpdateListCallbacks(listElement, componentAtIndex, enqueueFunc, componentAtIndexes);
                    }
                    stack.pop();
                    var p1 = stack[stack.length - 1];
                    top = p1;
                    i += 1;
                    break;
                }
            case OpcodeAttr:
                {
                    var key = opcodes[i + 1];
                    var value = opcodes[i + 2];
                    top.setAttribute(key, value);
                    i += 3;
                    break;
                }
            case OpcodeText:
                {
                    var [[type1, __id1, elements1], text] = opcodes[i + 1];
                    var s = new _snapshot_snapshot_js__rspack_import_3.SnapshotInstance(type1, __id1);
                    s.__slotIndex = opcodes[i + 2];
                    s.setAttribute(0, text);
                    top.insertBefore(s);
                    s.__elements = elements1.map(({ ssrID })=>refMap[ssrID]);
                    s.__element_root = s.__elements[0];
                    i += 3;
                    break;
                }
        }
    }
} // export function renderOpcodesInto(opcodes: any[], into: SnapshotInstance): void {
//   let top: SnapshotInstance = into;
//   const stack: SnapshotInstance[] = [into];
//   for (let i = 0; i < opcodes.length;) {
//     const opcode = opcodes[i];
//     switch (opcode) {
//       case OpcodeBegin: {
//         const p = top;
//         top = opcodes[i + 1];
//         // @ts-ignore
//         if (top.__parent) {
//           // already inserted
//           top = new SnapshotInstance(top.type);
//           opcodes[i + 1] = top;
//         }
//         p.insertBefore(top);
//         stack.push(top);
//         i += 2;
//         break;
//       }
//       case OpcodeEnd: {
//         // @ts-ignore
//         top[CHILDREN] = undefined;
//         stack.pop();
//         const p = stack[stack.length - 1];
//         top = p!;
//         i += 1;
//         break;
//       }
//       case OpcodeAttr: {
//         const key = opcodes[i + 1];
//         const value = opcodes[i + 2];
//         top.setAttribute(key, value);
//         i += 3;
//         break;
//       }
//       case OpcodeText: {
//         const text = opcodes[i + 1];
//         const s = new SnapshotInstance(null as unknown as string);
//         if (__ENABLE_SSR__) {
//           // We need store the just created SnapshotInstance, or it will be lost when we leave the function
//           opcodes[i + 1] = [s, text];
//         }
//         s.setAttribute(0, text);
//         top.insertBefore(s);
//         i += 2;
//         break;
//       }
//     }
//   }
// }
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/backgroundSnapshot.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  BackgroundSnapshotInstance: () => (BackgroundSnapshotInstance),
  backgroundSnapshotInstanceManager: () => (backgroundSnapshotInstanceManager),
  hydrate: () => (hydrate)
});
/* import */ var _definition_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _dynamicPartType_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js");
/* import */ var _platformInfo_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/platformInfo.js");
/* import */ var _reconstructInstanceTree_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/reconstructInstanceTree.js");
/* import */ var _ref_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _snapshot_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js");
/* import */ var _snapshotCreatorMap_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotCreatorMap.js");
/* import */ var _snapshotInstanceHydrationMap_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceHydrationMap.js");
/* import */ var _spread_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/spread.js");
/* import */ var _utils_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js");
/* import */ var _core_performance_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/performance.js");
/* import */ var _shared_profile_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/profile.js");
/* import */ var _utils_js__rspack_import_12 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _debug_vnodeSource_js__rspack_import_13 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/vnodeSource.js");
/* import */ var _gesture_processGestureBagkround_js__rspack_import_14 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/processGestureBagkround.js");
/* import */ var _lifecycle_patch_globalState_js__rspack_import_15 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/globalState.js");
/* import */ var _lifecycle_patch_snapshotPatch_js__rspack_import_16 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
/* import */ var _lynx_portalsPending_js__rspack_import_17 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lynx/portalsPending.js");
/* import */ var _renderToOpcodes_hydrate_js__rspack_import_18 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
/* import */ var _worklet_ctx_js__rspack_import_19 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/ctx.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




















/**
 * Background snapshot instance manager that manages all background snapshot instances.
 */ var backgroundSnapshotInstanceManager = {
    nextId: 0,
    values: /* @__PURE__ */ new Map(),
    clear () {
        // not resetting `nextId` to prevent id collision
        this.values.clear();
        if (true) (0,_debug_vnodeSource_js__rspack_import_13.clearSnapshotVNodeSource)();
    },
    updateId (id, newId) {
        var values = this.values;
        var si = values.get(id);
        values.delete(id);
        values.set(newId, si);
        si.__id = newId;
        if (true) (0,_debug_vnodeSource_js__rspack_import_13.moveSnapshotVNodeSource)(id, newId);
    },
    getValueBySign (str) {
        var res = str === null || str === void 0 ? void 0 : str.split(':');
        if (!res || res.length != 2 && res.length != 3) throw new Error('Invalid ctx format: ' + str);
        var id = Number(res[0]);
        var expIndex = Number(res[1]);
        var ctx = this.values.get(id);
        if (!ctx) return null;
        /**
         * 1. normal event
         *  `${ctx.__id}:${expIndex}:${spreadKey}`
         * 2. defer list event
         *   ${ctx.__id}:__extraProps:onRecycleComponent`
         *   ${ctx.__id}:__extraProps:onComponentAtIndex`
         */ var spreadKey = res[2];
        if (res[1] === '__extraProps') {
            if (spreadKey) return ctx.__extraProps[spreadKey];
            throw new Error('unreachable');
        } else {
            if (spreadKey) return ctx.__values[expIndex][spreadKey];
            else return ctx.__values[expIndex];
        }
    }
};
function prepareWorkletForCommit(worklet) {
    // Copy-on-commit: do not mutate the background-side worklet ctx.
    // `_execId` is injected into the payload object that will be sent to the main thread.
    return (0,_worklet_ctx_js__rspack_import_19.onPostWorkletCtx)({
        ...worklet
    });
}
function prepareSpreadForCommit(spread, oldSpread) {
    var committed;
    for(var key in spread){
        var v = spread[key];
        if (key === '__lynx_timing_flag' && (oldSpread === null || oldSpread === void 0 ? void 0 : oldSpread[key]) != v && _core_performance_js__rspack_import_10.globalPipelineOptions) _core_performance_js__rspack_import_10.globalPipelineOptions.needTimestamps = true;
        if (!v || typeof v !== 'object') continue;
        var valueRecord = v;
        var committedValue = void 0;
        if ('_wkltId' in valueRecord) committedValue = prepareWorkletForCommit(v);
        else if ('__isGesture' in valueRecord) committedValue = (0,_gesture_processGestureBagkround_js__rspack_import_14.prepareGestureForCommit)(v);
        else continue;
        committed !== null && committed !== void 0 ? committed : committed = {
            ...spread
        };
        committed[key] = committedValue;
    }
    return committed !== null && committed !== void 0 ? committed : spread;
}
class BackgroundSnapshotInstance {
    get parentNode() {
        return this.__parent;
    }
    get nextSibling() {
        return this.__nextSibling;
    }
    // get isConnected() {
    //   return !!this.__parent;
    // }
    // contains(child: BackgroundSnapshotInstance): boolean {
    //   return child.parentNode === this;
    // }
    // Preact 11's `removeNode` calls `node.remove()` instead of
    // `parentNode.removeChild(node)`.
    remove() {
        var _this_parentNode;
        (_this_parentNode = this.parentNode) === null || _this_parentNode === void 0 ? void 0 : _this_parentNode.removeChild(this);
    }
    // This will be called in `lazy`/`Suspense`.
    appendChild(child) {
        return this.insertBefore(child);
    }
    insertBefore(node, beforeNode) {
        if (node.__removed_from_tree) {
            node.__removed_from_tree = false;
            // This is only called by `lazy`/`Suspense` through `appendChild` so beforeNode is always undefined.
            /* v8 ignore next */ (0,_reconstructInstanceTree_js__rspack_import_3.reconstructInstanceTree)([
                node
            ], this.__id, beforeNode === null || beforeNode === void 0 ? void 0 : beforeNode.__id);
        } else _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.InsertBefore, this.__id, node.__id, beforeNode === null || beforeNode === void 0 ? void 0 : beforeNode.__id, node.__slotIndex);
        // If the node already has a parent, remove it from its current parent
        var p = node.__parent;
        if (p) {
            if (node.__previousSibling) node.__previousSibling.__nextSibling = node.__nextSibling;
            else p.__firstChild = node.__nextSibling;
            if (node.__nextSibling) node.__nextSibling.__previousSibling = node.__previousSibling;
            else p.__lastChild = node.__previousSibling;
        }
        // If beforeNode is not provided, add the new node as the last child
        if (beforeNode) {
            // If beforeNode is provided, insert the new node before beforeNode
            if (beforeNode.__previousSibling) {
                beforeNode.__previousSibling.__nextSibling = node;
                node.__previousSibling = beforeNode.__previousSibling;
            } else {
                this.__firstChild = node;
                node.__previousSibling = null;
            }
            beforeNode.__previousSibling = node;
            node.__nextSibling = beforeNode;
            node.__parent = this;
        } else {
            if (this.__lastChild) {
                this.__lastChild.__nextSibling = node;
                node.__previousSibling = this.__lastChild;
            } else {
                this.__firstChild = node;
                node.__previousSibling = null;
            }
            this.__lastChild = node;
            node.__parent = this;
            node.__nextSibling = null;
        }
    }
    removeChild(node) {
        _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.RemoveChild, this.__id, node.__id);
        node.__removed_from_tree = true;
        if (node.__parent !== this) throw new Error('The node to be removed is not a child of this node.');
        if (node.__previousSibling) node.__previousSibling.__nextSibling = node.__nextSibling;
        else this.__firstChild = node.__nextSibling;
        if (node.__nextSibling) node.__nextSibling.__previousSibling = node.__previousSibling;
        else this.__lastChild = node.__previousSibling;
        node.__parent = null;
        node.__previousSibling = null;
        node.__nextSibling = null;
        (0,_utils_js__rspack_import_9.traverseSnapshotInstance)(node, (instance)=>{
            var _instance___snapshot_def_refAndSpreadIndexes;
            if (instance.__values) (_instance___snapshot_def_refAndSpreadIndexes = instance.__snapshot_def.refAndSpreadIndexes) === null || _instance___snapshot_def_refAndSpreadIndexes === void 0 ? void 0 : _instance___snapshot_def_refAndSpreadIndexes.forEach((index)=>{
                var ref = (0,_ref_js__rspack_import_4.getRefFromValue)(instance.__values[index]);
                if (ref) (0,_ref_js__rspack_import_4.queueRefAttrUpdate)(ref, null, instance, index);
            });
        });
        _lifecycle_patch_globalState_js__rspack_import_15.globalBackgroundSnapshotInstancesToRemove.push(node.__id);
    }
    tearDown() {
        (0,_utils_js__rspack_import_9.traverseSnapshotInstance)(this, (v)=>{
            v.__parent = null;
            v.__previousSibling = null;
            v.__nextSibling = null;
            backgroundSnapshotInstanceManager.values.delete(v.__id);
        });
    }
    get childNodes() {
        var nodes = [];
        var node = this.__firstChild;
        while(node){
            nodes.push(node);
            node = node.__nextSibling;
        }
        return nodes;
    }
    setAttribute(key, value) {
        if (true) (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::BSI::setAttribute');
        if (key === 'values') {
            var _this___snapshot_def_refAndSpreadIndexes;
            if (_lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch) {
                var oldValues = this.__values;
                if (oldValues) for(var index = 0; index < value.length; index++){
                    var { needUpdate, valueToCommit } = this.setAttributeImpl(value[index], oldValues[index], index);
                    if (needUpdate) _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, this.__id, index, valueToCommit);
                }
                else {
                    var patch = [];
                    var length = value.length;
                    for(var index1 = 0; index1 < length; ++index1){
                        var { valueToCommit: valueToCommit1 } = this.setAttributeImpl(value[index1], null, index1);
                        patch[index1] = valueToCommit1;
                    }
                    _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttributes, this.__id, patch);
                }
            } else (_this___snapshot_def_refAndSpreadIndexes = this.__snapshot_def.refAndSpreadIndexes) === null || _this___snapshot_def_refAndSpreadIndexes === void 0 ? void 0 : _this___snapshot_def_refAndSpreadIndexes.forEach((index)=>{
                var _this___values;
                // In first render, this.__values is undefined.
                // In next rerenders before hydration, this.__values is not undefined.
                var oldValue = (_this___values = this.__values) === null || _this___values === void 0 ? void 0 : _this___values[index];
                var v = value[index];
                (0,_ref_js__rspack_import_4.queueRefAttrUpdate)((0,_ref_js__rspack_import_4.getRefFromValue)(oldValue), (0,_ref_js__rspack_import_4.getRefFromValue)(v), this, index);
            });
            this.__values = value;
            this.syncListItemPlatformInfo();
            if (true) (0,_shared_profile_js__rspack_import_11.profileEnd)();
            return;
        }
        if (typeof key === 'string') {
            var _this___extraProps;
            if (key === '__listItemPlatformInfoIndex') {
                this.__listItemPlatformInfoIndex = value;
                this.syncListItemPlatformInfo();
                if (true) (0,_shared_profile_js__rspack_import_11.profileEnd)();
                return;
            }
            if (key === '__listItemPlatformInfo') {
                this.__listItemPlatformInfo = value;
                if (true) (0,_shared_profile_js__rspack_import_11.profileEnd)();
                return;
            }
            ((_this___extraProps = this.__extraProps) !== null && _this___extraProps !== void 0 ? _this___extraProps : this.__extraProps = {})[key] = value;
        } else {
            var // old path (`this.setAttribute(0, xxx)`)
            // is reserved as slow path
            _this___values;
            ((_this___values = this.__values) !== null && _this___values !== void 0 ? _this___values : this.__values = [])[key] = value;
            this.syncListItemPlatformInfo();
        }
        _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, this.__id, key, value);
        if (true) (0,_shared_profile_js__rspack_import_11.profileEnd)();
    }
    syncListItemPlatformInfo() {
        var _this___snapshot_def_refAndSpreadIndexes;
        if (this.__listItemPlatformInfoIndex === undefined || !this.__values) return;
        var index = this.__listItemPlatformInfoIndex;
        this.__listItemPlatformInfo = (0,_platformInfo_js__rspack_import_2.getListItemPlatformInfoFromIndexedValue)(this.__values[index], (_this___snapshot_def_refAndSpreadIndexes = this.__snapshot_def.refAndSpreadIndexes) === null || _this___snapshot_def_refAndSpreadIndexes === void 0 ? void 0 : _this___snapshot_def_refAndSpreadIndexes.includes(index));
    }
    setAttributeImpl(newValue, oldValue, index) {
        if (!newValue) {
            var oldRef = (0,_ref_js__rspack_import_4.getRefFromValue)(oldValue);
            if (oldRef) (0,_ref_js__rspack_import_4.queueRefAttrUpdate)(oldRef, null, this, index);
            return {
                needUpdate: oldValue !== newValue,
                valueToCommit: newValue
            };
        }
        var newType = typeof newValue;
        if (newType === 'object') {
            var newValueObj = newValue;
            if ('__spread' in newValueObj) {
                var oldSpread = oldValue === null || oldValue === void 0 ? void 0 : oldValue.__spread;
                var newSpread = (0,_spread_js__rspack_import_8.transformSpread)(this, index, newValueObj);
                var needUpdate = !(0,_utils_js__rspack_import_12.isDirectOrDeepEqual)(oldSpread, newSpread);
                // use __spread to cache the transform result for next diff
                newValueObj['__spread'] = newSpread;
                (0,_ref_js__rspack_import_4.queueRefAttrUpdate)(oldSpread && oldValue.ref, newValueObj['ref'], this, index);
                return {
                    needUpdate,
                    valueToCommit: needUpdate ? prepareSpreadForCommit(newSpread, oldSpread) : newSpread
                };
            }
            if ('__ref' in newValueObj) {
                (0,_ref_js__rspack_import_4.queueRefAttrUpdate)(oldValue, newValueObj, this, index);
                return {
                    needUpdate: false,
                    valueToCommit: 1
                };
            }
            if ('_wkltId' in newValueObj) {
                // Worklet ctx can be stable across rerenders (e.g. memoized by the user).
                // In that case we should NOT re-register / re-send it, otherwise `_execId` churn
                // will cause unnecessary patches.
                var needUpdate1 = oldValue !== newValue;
                return {
                    needUpdate: needUpdate1,
                    valueToCommit: needUpdate1 ? prepareWorkletForCommit(newValueObj) : newValue
                };
            }
            if ('__isGesture' in newValueObj) {
                // Gestures are large objects; if the reference is stable, avoid reprocessing and patching.
                var needUpdate2 = oldValue !== newValue;
                return {
                    needUpdate: needUpdate2,
                    valueToCommit: needUpdate2 ? (0,_gesture_processGestureBagkround_js__rspack_import_14.prepareGestureForCommit)(newValueObj) : newValue
                };
            }
            if ('__ltf' in newValueObj) {
                // __lynx_timing_flag
                if (_core_performance_js__rspack_import_10.globalPipelineOptions && (oldValue === null || oldValue === void 0 ? void 0 : oldValue.__ltf) != newValueObj['__ltf']) {
                    _core_performance_js__rspack_import_10.globalPipelineOptions.needTimestamps = true;
                    return {
                        needUpdate: true,
                        valueToCommit: newValue
                    };
                }
                return {
                    needUpdate: false,
                    valueToCommit: newValue
                };
            }
            return {
                needUpdate: !(0,_utils_js__rspack_import_12.isDirectOrDeepEqual)(oldValue, newValue),
                valueToCommit: newValue
            };
        }
        if (newType === 'function') {
            if (newValue.__ref) {
                (0,_ref_js__rspack_import_4.queueRefAttrUpdate)(oldValue, newValue, this, index);
                return {
                    needUpdate: false,
                    valueToCommit: 1
                };
            }
            /* event */ return {
                needUpdate: !oldValue,
                valueToCommit: 1
            };
        }
        return {
            needUpdate: oldValue !== newValue,
            valueToCommit: newValue
        };
    }
    constructor(type){
        this.__slotIndex = 0;
        this.__parent = null;
        this.__firstChild = null;
        this.__lastChild = null;
        this.__previousSibling = null;
        this.__nextSibling = null;
        this.type = type;
        // Suspense uses 'div'
        if (!_definition_js__rspack_import_0.snapshotManager.values.has(type) && type !== 'div') {
            if (_snapshot_js__rspack_import_5.snapshotCreatorMap[type]) _snapshot_js__rspack_import_5.snapshotCreatorMap[type](type, _snapshotCreatorMap_js__rspack_import_6.snapshotCreatorRuntime);
            else if ((0,_utils_js__rspack_import_9.isCloneSnapshot)(type)) (0,_definition_js__rspack_import_0.createCloneSnapshot)(type);
            else if ((0,_utils_js__rspack_import_9.isCompiledSnapshot)(type)) throw new Error('BackgroundSnapshot not found: ' + type);
            else (0,_definition_js__rspack_import_0.createRuntimeSnapshot)(type);
        }
        this.__snapshot_def = _definition_js__rspack_import_0.snapshotManager.values.get(type);
        var id = this.__id = backgroundSnapshotInstanceManager.nextId += 1;
        backgroundSnapshotInstanceManager.values.set(id, this);
        _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.CreateElement, type, id);
    }
}
function hydrate(before, after) {
    var shouldProfile =  true && true;
    if (shouldProfile) (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::BSI::hydrate');
    try {
        (0,_lifecycle_patch_snapshotPatch_js__rspack_import_16.initGlobalSnapshotPatch)();
        var helper = (before, after)=>{
            var _before_children;
            var // handle value by index
            _after___values;
            _snapshotInstanceHydrationMap_js__rspack_import_7.hydrationMap.set(after.__id, before.id);
            backgroundSnapshotInstanceManager.updateId(after.__id, before.id);
            (_after___values = after.__values) === null || _after___values === void 0 ? void 0 : _after___values.forEach((value, index)=>{
                var _before_values;
                // render with different root would cause different values length
                var old = (_before_values = before.values) === null || _before_values === void 0 ? void 0 : _before_values[index];
                if (value) {
                    if (typeof value === 'object') {
                        if ('__spread' in value) {
                            // `value.__spread` my contain event ids using snapshot ids before hydration. Remove it.
                            delete value.__spread;
                            var __spread = (0,_spread_js__rspack_import_8.transformSpread)(after, index, value);
                            // Cache a clean spread for future diffs. For the patch payload, create a committed copy
                            // with runtime fields (e.g. `_execId`) injected.
                            after.__values[index]['__spread'] = __spread;
                            value = prepareSpreadForCommit(__spread, old);
                        } else if ('__ref' in value) value = old;
                        else if ('_wkltId' in value) value = prepareWorkletForCommit(value);
                        else if ('__isGesture' in value) value = (0,_gesture_processGestureBagkround_js__rspack_import_14.prepareGestureForCommit)(value);
                    } else if (typeof value === 'function') {
                        if ('__ref' in value) value = old;
                        else value = `${after.__id}:${index}:`;
                    }
                }
                if (!(0,_utils_js__rspack_import_12.isDirectOrDeepEqual)(value, old)) {
                    if (value === undefined && old === null) ;
                    else if (shouldProfile) {
                        var _getSnapshotVNodeSource;
                        (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::hydrate::setAttribute', {
                            args: {
                                id: String(after.__id),
                                snapshotType: String(after.type),
                                source: (_getSnapshotVNodeSource = (0,_debug_vnodeSource_js__rspack_import_13.getSnapshotVNodeSource)(after.__id)) !== null && _getSnapshotVNodeSource !== void 0 ? _getSnapshotVNodeSource : '',
                                dynamicPartIndex: String(index),
                                valueType: value === null ? 'null' : typeof value
                            }
                        });
                        try {
                            _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, after.__id, index, value);
                        } finally{
                            (0,_shared_profile_js__rspack_import_11.profileEnd)();
                        }
                    } else _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, after.__id, index, value);
                }
            });
            // handle extraProps as attributes and set by key
            if (after.__extraProps) for(var key in after.__extraProps){
                var _before_extraProps;
                var value = after.__extraProps[key];
                var old = (_before_extraProps = before.extraProps) === null || _before_extraProps === void 0 ? void 0 : _before_extraProps[key];
                if (!(0,_utils_js__rspack_import_12.isDirectOrDeepEqual)(value, old)) {
                    if (shouldProfile) {
                        var _getSnapshotVNodeSource;
                        (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::hydrate::setAttribute', {
                            args: {
                                id: String(after.__id),
                                snapshotType: String(after.type),
                                source: (_getSnapshotVNodeSource = (0,_debug_vnodeSource_js__rspack_import_13.getSnapshotVNodeSource)(after.__id)) !== null && _getSnapshotVNodeSource !== void 0 ? _getSnapshotVNodeSource : '',
                                dynamicPartIndex: key,
                                valueType: value === null ? 'null' : typeof value
                            }
                        });
                        try {
                            _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, after.__id, key, value);
                        } finally{
                            (0,_shared_profile_js__rspack_import_11.profileEnd)();
                        }
                    } else _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.SetAttribute, after.__id, key, value);
                }
            }
            var { slot } = after.__snapshot_def;
            var beforeChildNodes = (_before_children = before.children) !== null && _before_children !== void 0 ? _before_children : [];
            var afterChildNodes = after.childNodes;
            if (!slot) return;
            // Hoisted out of the loop: none of this depends on the slot entry.
            var diffChildren = (filteredBeforeChildNodes, filteredAfterChildNodes, isListHasItemKey)=>{
                var diffResult = (0,_renderToOpcodes_hydrate_js__rspack_import_18.diffArrayLepus)(filteredBeforeChildNodes, filteredAfterChildNodes, (a, b)=>a.type === b.type, (a, b)=>{
                    helper(a, b);
                }, isListHasItemKey);
                (0,_renderToOpcodes_hydrate_js__rspack_import_18.diffArrayAction)(filteredBeforeChildNodes, diffResult, (node, target)=>{
                    var _getSnapshotVNodeSource;
                    if (shouldProfile) (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::BSI::reconstructInstanceTree', {
                        args: {
                            id: String(node.__id),
                            snapshotType: String(node.type),
                            source: (_getSnapshotVNodeSource = (0,_debug_vnodeSource_js__rspack_import_13.getSnapshotVNodeSource)(node.__id)) !== null && _getSnapshotVNodeSource !== void 0 ? _getSnapshotVNodeSource : ''
                        }
                    });
                    try {
                        (0,_reconstructInstanceTree_js__rspack_import_3.reconstructInstanceTree)([
                            node
                        ], before.id, target === null || target === void 0 ? void 0 : target.id);
                    } finally{
                        if (shouldProfile) (0,_shared_profile_js__rspack_import_11.profileEnd)();
                    }
                    return undefined;
                }, (node)=>{
                    if (shouldProfile) {
                        var _getSnapshotVNodeSource;
                        (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::hydrate::removeChild', {
                            args: {
                                id: String(node.id),
                                snapshotType: String(node.type),
                                source: (_getSnapshotVNodeSource = (0,_debug_vnodeSource_js__rspack_import_13.getSnapshotVNodeSource)(node.id)) !== null && _getSnapshotVNodeSource !== void 0 ? _getSnapshotVNodeSource : '',
                                parentId: String(before.id)
                            }
                        });
                        try {
                            _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.RemoveChild, before.id, node.id);
                        } finally{
                            (0,_shared_profile_js__rspack_import_11.profileEnd)();
                        }
                    } else _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.RemoveChild, before.id, node.id);
                }, (node, target)=>{
                    var _node_slotIndex;
                    // changedList.push([SnapshotOperation.RemoveChild, before.id, node.id]);
                    if (shouldProfile) {
                        var _getSnapshotVNodeSource, _ref;
                        (0,_shared_profile_js__rspack_import_11.profileStart)('ReactLynx::hydrate::insertBefore', {
                            args: {
                                id: String(node.id),
                                snapshotType: String(node.type),
                                source: (_getSnapshotVNodeSource = (0,_debug_vnodeSource_js__rspack_import_13.getSnapshotVNodeSource)(node.id)) !== null && _getSnapshotVNodeSource !== void 0 ? _getSnapshotVNodeSource : '',
                                parentId: String(before.id),
                                targetId: String((_ref = target === null || target === void 0 ? void 0 : target.id) !== null && _ref !== void 0 ? _ref : '')
                            }
                        });
                        try {
                            var _node_slotIndex1;
                            _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.InsertBefore, before.id, node.id, target === null || target === void 0 ? void 0 : target.id, (_node_slotIndex1 = node.slotIndex) !== null && _node_slotIndex1 !== void 0 ? _node_slotIndex1 : 0);
                        } finally{
                            (0,_shared_profile_js__rspack_import_11.profileEnd)();
                        }
                    } else _lifecycle_patch_snapshotPatch_js__rspack_import_16.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_16.SnapshotOperation.InsertBefore, before.id, node.id, target === null || target === void 0 ? void 0 : target.id, (_node_slotIndex = node.slotIndex) !== null && _node_slotIndex !== void 0 ? _node_slotIndex : 0);
                });
            };
            slot.forEach(([type], index)=>{
                switch(type){
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.Slot:
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.MultiChildren:
                        {
                            // TODO: the following null assertions are not 100% safe
                            var v1 = beforeChildNodes[index];
                            var v2 = afterChildNodes[index];
                            helper(v1, v2);
                            break;
                        }
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.SlotV2:
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.Children:
                        {
                            var filteredBeforeChildNodes = beforeChildNodes;
                            var filteredAfterChildNodes = afterChildNodes;
                            if (type === _dynamicPartType_js__rspack_import_1.DynamicPartType.SlotV2) {
                                filteredBeforeChildNodes = beforeChildNodes.filter((v)=>{
                                    var _v_slotIndex;
                                    return ((_v_slotIndex = v.slotIndex) !== null && _v_slotIndex !== void 0 ? _v_slotIndex : 0) === index;
                                });
                                filteredAfterChildNodes = afterChildNodes.filter((v)=>v.__slotIndex === index);
                            }
                            // Children match pairwise by type, so the diff is empty — do what
                            // `diffArrayLepus` + `diffArrayAction` would do without allocating
                            // the diff structures.
                            var length = filteredBeforeChildNodes.length;
                            if (length === filteredAfterChildNodes.length) {
                                var samePairwise = true;
                                for(var i = 0; i < length; i++)if (filteredBeforeChildNodes[i].type !== filteredAfterChildNodes[i].type) {
                                    samePairwise = false;
                                    break;
                                }
                                if (samePairwise) {
                                    for(var i1 = 0; i1 < length; i1++)helper(filteredBeforeChildNodes[i1], filteredAfterChildNodes[i1]);
                                    break;
                                }
                            }
                            diffChildren(filteredBeforeChildNodes, filteredAfterChildNodes, false);
                            break;
                        }
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.ListSlotV2:
                    case _dynamicPartType_js__rspack_import_1.DynamicPartType.ListChildren:
                        {
                            var filteredBeforeChildNodes1 = beforeChildNodes;
                            var filteredAfterChildNodes1 = afterChildNodes;
                            if (type === _dynamicPartType_js__rspack_import_1.DynamicPartType.ListSlotV2) {
                                filteredBeforeChildNodes1 = beforeChildNodes.filter((v)=>{
                                    var _v_slotIndex;
                                    return ((_v_slotIndex = v.slotIndex) !== null && _v_slotIndex !== void 0 ? _v_slotIndex : 0) === index;
                                });
                                filteredAfterChildNodes1 = afterChildNodes.filter((v)=>v.__slotIndex === index);
                            }
                            diffChildren(filteredBeforeChildNodes1, filteredAfterChildNodes1, true);
                            break;
                        }
                    default:
                        throw new Error('Unexpected slot type: ' + type);
                }
            });
        };
        helper(before, after);
        // Hydration should not trigger ref updates. They were incorrectly triggered when using `setAttribute` to add values to the patch list.
        (0,_ref_js__rspack_import_4.clearQueuedRefs)();
        (0,_lynx_portalsPending_js__rspack_import_17.clearPendingPortalInsertBefore)();
        return (0,_lifecycle_patch_snapshotPatch_js__rspack_import_16.takeGlobalSnapshotPatch)();
    } finally{
        if (shouldProfile) (0,_shared_profile_js__rspack_import_11.profileEnd)();
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/constants.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CLONE_SNAPSHOT: () => (CLONE_SNAPSHOT),
  COMPILED_SNAPSHOT: () => (COMPILED_SNAPSHOT),
  DEFAULT_CSS_ID: () => (DEFAULT_CSS_ID),
  DEFAULT_ENTRY_NAME: () => (DEFAULT_ENTRY_NAME)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Constants for snapshot system.
 */ /**
 * Default entry name for snapshots.
 */ var DEFAULT_ENTRY_NAME = '__Card__';
/**
 * Default CSS ID for snapshots.
 */ var DEFAULT_CSS_ID = 0;
/**
 * Default snapshot type for compiled snapshots.
 */ var COMPILED_SNAPSHOT = '__snapshot';
/**
 * Default snapshot type for clone snapshots.
 */ var CLONE_SNAPSHOT = '__clone';
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  __page: () => (__page),
  __pageId: () => (__pageId),
  clearPage: () => (clearPage),
  createCloneSnapshot: () => (createCloneSnapshot),
  createRuntimeSnapshot: () => (createRuntimeSnapshot),
  createSnapshot: () => (createSnapshot),
  setupPage: () => (setupPage),
  snapshotManager: () => (snapshotManager)
});
/* import */ var _dynamicPartType_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js");
/* import */ var _list_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/list.js");
/* import */ var _snapshotCreatorMap_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotCreatorMap.js");
/* import */ var _spread_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/spread.js");
/* import */ var _utils_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Snapshot manager that manages all snapshot definitions.
 */ 




var __page;
var __pageId = 0;
function setupPage(page) {
    __page = page;
    __pageId = __GetElementUniqueID(page);
}
function clearPage() {
    __page = undefined;
    __pageId = 0;
}
/**
 * Manager for snapshot definitions
 */ var snapshotManager = {
    values: /* @__PURE__ */ new Map([
        [
            'root',
            {
                create () {
                    /* v8 ignore stop */ return [
                        __page
                    ];
                },
                update: [],
                slot: _dynamicPartType_js__rspack_import_0.__DynamicPartChildren_0,
                isListHolder: false,
                cssId: 0
            }
        ],
        [
            'wrapper',
            {
                create () {
                    /* v8 ignore stop */ return [
                        __CreateWrapperElement(__pageId)
                    ];
                },
                update: [],
                slot: _dynamicPartType_js__rspack_import_0.__DynamicPartChildren_0,
                isListHolder: false
            }
        ],
        [
            null,
            {
                create () {
                    /* v8 ignore stop */ return [
                        __CreateRawText('')
                    ];
                },
                update: [
                    (ctx)=>{
                        /* v8 ignore stop */ if (ctx.__elements) __SetAttribute(ctx.__elements[0], 'text', ctx.__values[0]);
                    }
                ],
                slot: [],
                isListHolder: false
            }
        ]
    ])
};
/**
 * Creates a new snapshot definition and adds it to the manager
 */ function createSnapshot(uniqID, create, update, slot, cssId, entryName, refAndSpreadIndexes, isLazySnapshotSupported = false) {
    if (!isLazySnapshotSupported) uniqID = (0,_utils_js__rspack_import_4.entryUniqID)(uniqID, entryName);
    var s = {
        create,
        update,
        slot,
        cssId,
        entryName,
        refAndSpreadIndexes
    };
    snapshotManager.values.set(uniqID, s);
    if (slot && slot[0]) {
        var v = slot[0][0];
        if (v === _dynamicPartType_js__rspack_import_0.DynamicPartType.ListChildren || v === _dynamicPartType_js__rspack_import_0.DynamicPartType.ListSlotV2) s.isListHolder = true;
        s.isSlotV2 = slot.every(([type])=>type === _dynamicPartType_js__rspack_import_0.DynamicPartType.SlotV2 || type === _dynamicPartType_js__rspack_import_0.DynamicPartType.ListSlotV2);
    }
    return uniqID;
}
function createRuntimeSnapshot(type) {
    var isListHolder = type === 'list';
    snapshotManager.values.set(type, {
        create (snapshotInstance) {
            // Keep runtime-created element creation consistent with the compiled snapshot path
            // (see swc_plugin_snapshot tag dispatch).
            switch(type){
                case 'view':
                    return [
                        __CreateView(__pageId)
                    ];
                case 'scroll-view':
                case 'x-scroll-view':
                    return [
                        __CreateScrollView(__pageId)
                    ];
                case 'image':
                    return [
                        __CreateImage(__pageId)
                    ];
                case 'text':
                    return [
                        __CreateText(__pageId)
                    ];
                case 'wrapper':
                    return [
                        __CreateWrapperElement(__pageId)
                    ];
                case 'list':
                    return [
                        (0,_list_js__rspack_import_1.snapshotCreateList)(__pageId, snapshotInstance, 0)
                    ];
                case 'frame':
                    return [
                        __CreateFrame(__pageId)
                    ];
                default:
                    return [
                        __CreateElement(type, __pageId)
                    ];
            }
        /* v8 ignore stop */ },
        update: [
            (ctx, index, oldValue)=>{
                /* v8 ignore stop */ (0,_spread_js__rspack_import_3.updateSpread)(ctx, index, oldValue, 0, false);
            }
        ],
        slot: isListHolder ? _dynamicPartType_js__rspack_import_0.__DynamicPartListSlotV2_0 : _dynamicPartType_js__rspack_import_0.__DynamicPartSlotV2_0,
        isListHolder,
        refAndSpreadIndexes: [
            0
        ]
    });
}
function createCloneSnapshot(type) {
    var _originalDef_update, _originalDef_refAndSpreadIndexes;
    /* v8 ignore start */ if (snapshotManager.values.has(type)) return;
    /* v8 ignore stop */ var cloneSnapshotInfo = (0,_utils_js__rspack_import_4.getCloneSnapshotInfo)(type);
    if (!cloneSnapshotInfo) throw new Error(`Invalid clone snapshot type: ${type}`);
    var { originalType, cloneSpreadIndex } = cloneSnapshotInfo;
    // get the original snapshot definition
    var originalDef = snapshotManager.values.get(originalType);
    if (!originalDef) {
        var _snapshotCreatorMap_originalType;
        (_snapshotCreatorMap_originalType = _snapshotCreatorMap_js__rspack_import_2.snapshotCreatorMap[originalType]) === null || _snapshotCreatorMap_originalType === void 0 ? void 0 : _snapshotCreatorMap_originalType.call(_snapshotCreatorMap_js__rspack_import_2.snapshotCreatorMap, originalType, _snapshotCreatorMap_js__rspack_import_2.snapshotCreatorRuntime);
        originalDef = snapshotManager.values.get(originalType);
    }
    if (!originalDef) throw new Error('Snapshot not found: ' + originalType);
    // clone the original snapshot definition with spread updater
    var originalDefUpdate = (_originalDef_update = originalDef.update) !== null && _originalDef_update !== void 0 ? _originalDef_update : [];
    var update = originalDefUpdate.slice();
    update[cloneSpreadIndex] = (ctx, index, oldValue)=>{
        /* v8 ignore stop */ (0,_spread_js__rspack_import_3.updateSpread)(ctx, index, oldValue, 0, false);
    };
    var s = {
        ...originalDef,
        update,
        refAndSpreadIndexes: [
            ...(_originalDef_refAndSpreadIndexes = originalDef.refAndSpreadIndexes) !== null && _originalDef_refAndSpreadIndexes !== void 0 ? _originalDef_refAndSpreadIndexes : [],
            cloneSpreadIndex
        ]
    };
    snapshotManager.values.set(type, s);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  DynamicPartType: () => (DynamicPartType),
  __DynamicPartChildren_0: () => (__DynamicPartChildren_0),
  __DynamicPartListChildren_0: () => (__DynamicPartListChildren_0),
  __DynamicPartListSlotV2_0: () => (__DynamicPartListSlotV2_0),
  __DynamicPartSlotV2_0: () => (__DynamicPartSlotV2_0)
});
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Types of dynamic parts that can be updated in a snapshot
 * These are determined at compile time through static analysis
 */ var DynamicPartType = {
    Attr: 0,
    Spread: 1,
    Slot: 2,
    Children: 3,
    ListChildren: 4,
    MultiChildren: 5,
    SlotV2: 6,
    ListSlotV2: 7
};
/**
 * Default dynamic part for children
 */ var __DynamicPartChildren_0 = [
    [
        DynamicPartType.Children,
        0
    ]
];
/**
 * Default dynamic part for list children
 */ var __DynamicPartListChildren_0 = [
    [
        DynamicPartType.ListChildren,
        0
    ]
];
/**
 * Dynamic part for slot v2
 */ var __DynamicPartSlotV2_0 = [
    [
        DynamicPartType.SlotV2,
        0
    ]
];
/**
 * Dynamic part for list slot v2
 */ var __DynamicPartListSlotV2_0 = [
    [
        DynamicPartType.ListSlotV2,
        0
    ]
];
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/event.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  updateEvent: () => (updateEvent)
});
function updateEvent(snapshot, expIndex, _oldValue, elementIndex, eventType, eventName, spreadKey) {
    var value = snapshot.__values[expIndex];
    var event;
    if (!value) event = undefined;
    else if (typeof value === 'string') event = value;
    else event = `${snapshot.__id}:${expIndex}:${spreadKey}`;
    // todo: reuseId?
    snapshot.__values[expIndex] = event;
    if (snapshot.__elements) __AddEvent(snapshot.__elements[elementIndex], eventType, eventName, event);
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/gesture.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  updateGesture: () => (updateGesture)
});
/* import */ var _gesture_processGesture_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/processGesture.js");
/* import */ var _lifecycle_patch_isMainThreadHydrating_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/isMainThreadHydrating.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


function updateGesture(snapshot, expIndex, oldValue, elementIndex, workletType) {
    var value = snapshot.__values[expIndex];
    if (workletType === 'main-thread') (0,_gesture_processGesture_js__rspack_import_0.retainGestureWorkletCtx)(value);
    if (!snapshot.__elements) return;
    if (workletType === 'main-thread') (0,_gesture_processGesture_js__rspack_import_0.processGesture)(snapshot.__elements[elementIndex], value, oldValue, _lifecycle_patch_isMainThreadHydrating_js__rspack_import_1.isMainThreadHydrating, {
        domSet: false,
        retainCallbacks: false
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/list.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  snapshotCreateList: () => (snapshotCreateList),
  snapshotDestroyList: () => (snapshotDestroyList)
});
/* import */ var _list_list_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/list.js");
/* import */ var _renderToOpcodes_hydrate_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/renderToOpcodes/hydrate.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var destroyLifetimeHandlerMap = /*#__PURE__*/ new Map();
function snapshotCreateList(pageId, _ctx, _expIndex) {
    var signMap = new Map();
    var recycleMap = new Map();
    var [componentAtIndex, componentAtIndexes] = (0,_list_list_js__rspack_import_0.componentAtIndexFactory)([], _renderToOpcodes_hydrate_js__rspack_import_1.hydrate);
    var list = __CreateList(pageId, componentAtIndex, (0,_list_list_js__rspack_import_0.enqueueComponentFactory)(), {}, componentAtIndexes);
    var listID = __GetElementUniqueID(list);
    if (typeof lynx !== 'undefined' && typeof lynx.getNative === 'function') {
        var _lynx_getNative;
        var cb = ()=>{
            __UpdateListCallbacks(list, null, null, null);
            destroyLifetimeHandlerMap.delete(listID);
        };
        (_lynx_getNative = lynx.getNative()) === null || _lynx_getNative === void 0 ? void 0 : _lynx_getNative.addEventListener('__DestroyLifetime', cb);
        destroyLifetimeHandlerMap.set(listID, cb);
    }
    _list_list_js__rspack_import_0.gSignMap[listID] = signMap;
    _list_list_js__rspack_import_0.gRecycleMap[listID] = recycleMap;
    return list;
}
function snapshotDestroyList(si) {
    var _si___elements;
    var [, elementIndex] = si.__snapshot_def.slot[0];
    var list = (_si___elements = si.__elements) === null || _si___elements === void 0 ? void 0 : _si___elements[elementIndex];
    // `takeElements` and hydration transfer the rendered elements to a new
    // SnapshotInstance while leaving the old instance tree available for
    // teardown. Only the instance that still owns the list element may clean up
    // its callbacks and recycling state.
    if (list === undefined) return;
    var listID = __GetElementUniqueID(list);
    __UpdateListCallbacks(list, ()=>-1, ()=>{}, ()=>{});
    if (typeof lynx !== 'undefined' && typeof lynx.getNative === 'function') {
        var cb = destroyLifetimeHandlerMap.get(listID);
        if (cb) {
            var _lynx_getNative;
            (_lynx_getNative = lynx.getNative()) === null || _lynx_getNative === void 0 ? void 0 : _lynx_getNative.removeEventListener('__DestroyLifetime', cb);
            destroyLifetimeHandlerMap.delete(listID);
        }
    }
    delete _list_list_js__rspack_import_0.gSignMap[listID];
    delete _list_list_js__rspack_import_0.gRecycleMap[listID];
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/platformInfo.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  extractListItemPlatformInfo: () => (extractListItemPlatformInfo),
  getListItemPlatformInfoFromIndexedValue: () => (getListItemPlatformInfoFromIndexedValue),
  platformInfoAttributes: () => (platformInfoAttributes),
  updateListItemPlatformInfo: () => (updateListItemPlatformInfo)
});
/* import */ var _shared_attribute_name_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/attribute-name.js");
/* import */ var _list_listUpdateInfo_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/listUpdateInfo.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var platformInfoVirtualAttributes = /* @__PURE__ */ new Set([
    'reuse-identifier',
    'recyclable'
]);
var platformInfoAttributes = /* @__PURE__ */ new Set([
    'reuse-identifier',
    'full-span',
    'item-key',
    'sticky-top',
    'sticky-bottom',
    'estimated-height',
    'estimated-height-px',
    'estimated-main-axis-size-px',
    'recyclable'
]);
function collectListItemPlatformInfo(object, transformAttributeNames = false) {
    var result = {};
    for(var key in object){
        var transformedKey = transformAttributeNames ? (0,_shared_attribute_name_js__rspack_import_0.transformAttrName)(key) : key;
        if (platformInfoAttributes.has(transformedKey)) result[transformedKey] = object[key];
    }
    return result;
}
function extractListItemPlatformInfo(value) {
    if (value && typeof value === 'object') return collectListItemPlatformInfo(value);
    return value;
}
function getListItemPlatformInfoFromIndexedValue(value, isSpreadValue = false) {
    if (value && typeof value === 'object' && '__spread' in value) return collectListItemPlatformInfo(value, true);
    if (isSpreadValue) return extractListItemPlatformInfo(value);
    return value;
}
function updateListItemPlatformInfo(ctx, index, oldValue, elementIndex) {
    var newValue = ctx.__listItemPlatformInfo = getListItemPlatformInfoFromIndexedValue(ctx.__values[index]);
    if (_list_pendingListUpdates_js__rspack_import_2.__pendingListUpdates.values) {
        var __pendingListUpdates_values, _list___id, _;
        var list = ctx.parentNode;
        if (list === null || list === void 0 ? void 0 : list.__snapshot_def.isListHolder) ((_ = (__pendingListUpdates_values = _list_pendingListUpdates_js__rspack_import_2.__pendingListUpdates.values)[_list___id = list.__id]) !== null && _ !== void 0 ? _ : __pendingListUpdates_values[_list___id] = new _list_listUpdateInfo_js__rspack_import_1.ListUpdateInfoRecording(list)).onSetAttribute(ctx, newValue, oldValue);
    }
    // In this updater, unlike `updateSpread`, the shape of the value is guaranteed to be an fixed object.
    // No adding / removing keys.
    if (ctx.__elements) {
        var e = ctx.__elements[elementIndex];
        var value = ctx.__values[index];
        for(var k in value){
            if (platformInfoVirtualAttributes.has(k)) continue;
            __SetAttribute(e, k, value[k]);
        }
    }
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/reconstructInstanceTree.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  reconstructInstanceTree: () => (reconstructInstanceTree)
});
/* import */ var _lifecycle_patch_snapshotPatch_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function reconstructInstanceTree(afters, parentId, targetId) {
    for (var child of afters){
        var id = child.__id;
        _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_0.SnapshotOperation.CreateElement, child.type, id);
        var values = child.__values;
        if (values) {
            child.__values = undefined;
            child.setAttribute('values', values);
        }
        var extraProps = child.__extraProps;
        for(var key in extraProps)child.setAttribute(key, extraProps[key]);
        reconstructInstanceTree(child.childNodes, id);
        // Skip the parent link when `parentId` is `undefined` — used by portal,
        // where the topmost reconstructed node has no BSI parent (it is attached
        // to a NodesRef-resolved host element via `nodesRefInsertBefore`).
        if (parentId !== undefined) _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch === null || _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch === void 0 ? void 0 : _lifecycle_patch_snapshotPatch_js__rspack_import_0.__globalSnapshotPatch.push(_lifecycle_patch_snapshotPatch_js__rspack_import_0.SnapshotOperation.InsertBefore, parentId, id, targetId, child.__slotIndex);
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyQueuedRefs: () => (applyQueuedRefs),
  clearQueuedRefs: () => (clearQueuedRefs),
  getRefFromValue: () => (getRefFromValue),
  queueRefAttrUpdate: () => (queueRefAttrUpdate),
  transformRef: () => (transformRef),
  unref: () => (unref),
  updateRef: () => (updateRef)
});
/* import */ var _workletRef_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
/* import */ var _core_ref_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/ref.js");
/* import */ var _lifecycle_ref_delay_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/ref/delay.js");



var refEffectQueue = /*#__PURE__*/ new _core_ref_js__rspack_import_1.OrdinaryRefEffectQueue();
function unref(snapshot, recursive) {
    var _snapshot___worklet_ref_set, _snapshot___worklet_ref_set1;
    (_snapshot___worklet_ref_set = snapshot.__worklet_ref_set) === null || _snapshot___worklet_ref_set === void 0 ? void 0 : _snapshot___worklet_ref_set.forEach((v)=>{
        if (v) (0,_workletRef_js__rspack_import_0.workletUnRef)(v);
    });
    (_snapshot___worklet_ref_set1 = snapshot.__worklet_ref_set) === null || _snapshot___worklet_ref_set1 === void 0 ? void 0 : _snapshot___worklet_ref_set1.clear();
    if (recursive) snapshot.childNodes.forEach((it)=>{
        unref(it, recursive);
    });
}
function updateRef(snapshot, expIndex, oldValue, elementIndex) {
    var value = snapshot.__values[expIndex];
    var ref;
    if (typeof value === 'string') ref = value;
    else ref = `react-ref-${snapshot.__id}-${expIndex}`;
    snapshot.__values[expIndex] = ref;
    if (snapshot.__elements && oldValue !== ref) {
        if (oldValue) __SetAttribute(snapshot.__elements[elementIndex], oldValue, undefined);
        if (ref) __SetAttribute(snapshot.__elements[elementIndex], ref, 1);
    }
}
function getRefFromValue(val) {
    var _val_ref;
    if (!val || typeof val !== 'object' && typeof val !== 'function') return null;
    if ('__spread' in val && 'ref' in val) return (_val_ref = val.ref) !== null && _val_ref !== void 0 ? _val_ref : null;
    if ('__ref' in val) return val;
    return null;
}
function transformRef(ref) {
    var validRef = (0,_core_ref_js__rspack_import_1.normalizeRefValue)(ref);
    if (validRef === undefined || validRef === null) return validRef;
    if ('__ref' in validRef) return validRef;
    return Object.defineProperty(validRef, '__ref', {
        value: 1
    });
}
function applyQueuedRefs() {
    if (!refEffectQueue.hasPending()) return;
    refEffectQueue.flush((value)=>new _lifecycle_ref_delay_js__rspack_import_2.RefProxy(value));
}
function queueRefAttrUpdate(oldRef, newRef, snapshot, expIndex) {
    refEffectQueue.queue(oldRef, newRef, snapshot, expIndex, [
        snapshot.__id,
        expIndex
    ]);
}
function clearQueuedRefs() {
    refEffectQueue.clear();
}
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshot.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SnapshotInstance: () => (SnapshotInstance),
  snapshotCreatorMap: () => (/* reexport safe */ _snapshotCreatorMap_js__rspack_import_6.snapshotCreatorMap),
  snapshotInstanceManager: () => (/* reexport safe */ _snapshotInstanceManager_js__rspack_import_7.snapshotInstanceManager)
});
/* import */ var _constants_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/constants.js");
/* import */ var _definition_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/definition.js");
/* import */ var _dynamicPartType_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/dynamicPartType.js");
/* import */ var _list_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/list.js");
/* import */ var _platformInfo_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/platformInfo.js");
/* import */ var _ref_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _snapshotCreatorMap_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotCreatorMap.js");
/* import */ var _snapshotInstanceManager_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceManager.js");
/* import */ var _utils_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js");
/* import */ var _utils_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _list_listUpdateInfo_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/listUpdateInfo.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.












function isRemovedSnapshot(value, removedSnapshots) {
    return (typeof value === 'object' || typeof value === 'function') && value !== null && removedSnapshots.has(value);
}
function clearRemovedSnapshotsFromArray(values, removedSnapshots, seen = new WeakSet()) {
    if (seen.has(values)) return false;
    seen.add(values);
    var changed = false;
    values.forEach((value, index)=>{
        if (isRemovedSnapshot(value, removedSnapshots)) {
            values[index] = undefined;
            changed = true;
        } else if (Array.isArray(value) && clearRemovedSnapshotsFromArray(value, removedSnapshots, seen)) changed = true;
    });
    return changed;
}
function collectRemovedSnapshots(removedChild) {
    var removedSnapshots = new WeakSet();
    (0,_utils_js__rspack_import_8.traverseSnapshotInstance)(removedChild, (snapshot)=>{
        removedSnapshots.add(snapshot);
    });
    return removedSnapshots;
}
function clearTransientChildPropRefs(owner, removedSnapshots) {
    var props = owner.props;
    if (!props) return;
    for (var key of Object.keys(props)){
        // Named child props are transient staging refs. Once a child subtree is
        // removed, they must not keep the old snapshots alive.
        if (!key.startsWith('$')) continue;
        var value = props[key];
        if (isRemovedSnapshot(value, removedSnapshots)) delete props[key];
        else if (Array.isArray(value)) clearRemovedSnapshotsFromArray(value, removedSnapshots);
    }
}


/**
 * The runtime instance of a {@link Snapshot} on the main thread that manages
 * the actual elements and handles updates to dynamic parts.
 *
 * This class is designed to be compatible with Preact's {@link ContainerNode}
 * interface for Preact's renderer to operate upon.
 */ class SnapshotInstance {
    ensureElements() {
        var { create, slot, isListHolder, cssId } = this.__snapshot_def;
        // FetchBundle intentionally removes CSS scope of entryName
        var useFetchBundle =  true && "QueryComponent" === 'FetchBundle';
        var entryName = useFetchBundle ? undefined : this.__snapshot_def.entryName;
        var elements = create(this);
        this.__elements = elements;
        this.__element_root = elements[0];
        if (cssId === undefined) {
            if (entryName !== _constants_js__rspack_import_0.DEFAULT_ENTRY_NAME && entryName !== undefined) __SetCSSId(this.__elements, _constants_js__rspack_import_0.DEFAULT_CSS_ID, entryName);
        } else if (entryName !== _constants_js__rspack_import_0.DEFAULT_ENTRY_NAME && entryName !== undefined) __SetCSSId(this.__elements, cssId, entryName);
        else __SetCSSId(this.__elements, cssId);
        if (entryName !== _constants_js__rspack_import_0.DEFAULT_ENTRY_NAME && entryName !== undefined && this.parentNode && entryName !== this.parentNode.__snapshot_def.entryName) __SetAttribute(this.__element_root, 'lazy-bundle-url', this.__snapshot_def.entryName);
        _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.runWithoutUpdates(()=>{
            var values = this.__values;
            if (values) {
                this.__values = undefined;
                this.setAttribute('values', values);
            }
        });
        if (isListHolder) {
            // never recurse into list's children
            // In nested list scenarios, there are some `list` that are lazily created.
            // We need to `flush` them during `ensureElements`.
            // Also, `flush` is a safe operation since it checks if the `list` is in `__pendingListUpdates`.
            if (_list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values && !_list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values[this.__id] && this.__firstChild !== null) {
                var child = this.__firstChild;
                while(child){
                    var __pendingListUpdates_values, _this___id, _;
                    ((_ = (__pendingListUpdates_values = _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values)[_this___id = this.__id]) !== null && _ !== void 0 ? _ : __pendingListUpdates_values[_this___id] = new _list_listUpdateInfo_js__rspack_import_10.ListUpdateInfoRecording(this)).onInsertBefore(child);
                    child = child.__nextSibling;
                }
            }
            _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.flushWithId(this.__id);
        } else {
            var index = 0;
            var child1 = this.__firstChild;
            while(child1){
                child1.ensureElements();
                var [type, elementIndex] = slot[this.__snapshot_def.isSlotV2 ? child1.__slotIndex : index];
                switch(type){
                    case _dynamicPartType_js__rspack_import_2.DynamicPartType.Slot:
                        __ReplaceElement(child1.__element_root, elements[elementIndex]);
                        elements[elementIndex] = child1.__element_root;
                        index++;
                        break;
                    /* v8 ignore start */ case _dynamicPartType_js__rspack_import_2.DynamicPartType.MultiChildren:
                        if (__GetTag(elements[elementIndex]) === 'wrapper') __ReplaceElement(child1.__element_root, elements[elementIndex]);
                        else __AppendElement(elements[elementIndex], child1.__element_root);
                        index++;
                        break;
                    /* v8 ignore end */ case _dynamicPartType_js__rspack_import_2.DynamicPartType.Children:
                    case _dynamicPartType_js__rspack_import_2.DynamicPartType.ListChildren:
                    case _dynamicPartType_js__rspack_import_2.DynamicPartType.SlotV2:
                    case _dynamicPartType_js__rspack_import_2.DynamicPartType.ListSlotV2:
                        __AppendElement(elements[elementIndex], child1.__element_root);
                        break;
                    default:
                        throw new Error('Unexpected slot type: ' + type);
                }
                child1 = child1.__nextSibling;
            }
        }
    }
    unRenderElements() {
        var { isListHolder } = this.__snapshot_def;
        this.__elements = undefined;
        this.__element_root = undefined;
        if (isListHolder) ;
        else {
            var child = this.__firstChild;
            while(child){
                child.unRenderElements();
                child = child.__nextSibling;
            }
        }
    }
    takeElements() {
        var a = Object.create(SnapshotInstance.prototype);
        a.__id = this.__id;
        a.__snapshot_def = this.__snapshot_def;
        a.__values = this.__values;
        a.__slotIndex = this.__slotIndex;
        // all clear
        a.__parent = null;
        a.__firstChild = null;
        a.__lastChild = null;
        a.__nextSibling = null;
        a.__previousSibling = null;
        this.childNodes.map((c)=>c.takeElements()).forEach((node)=>a.__insertBefore(node));
        a.__elements = this.__elements;
        a.__element_root = this.__element_root;
        this.__elements = undefined;
        this.__element_root = undefined;
        return a;
    }
    tearDown() {
        (0,_utils_js__rspack_import_8.traverseSnapshotInstance)(this, (v)=>{
            v.__parent = null;
            v.__previousSibling = null;
            v.__nextSibling = null;
        });
    }
    get parentNode() {
        return this.__parent;
    }
    get nextSibling() {
        return this.__nextSibling;
    }
    // get isConnected() {
    //   return !!this.__parent;
    // }
    contains(child) {
        return child.parentNode === this;
    }
    // Preact 11's `removeNode` calls `node.remove()` instead of
    // `parentNode.removeChild(node)`.
    remove() {
        var _this_parentNode;
        (_this_parentNode = this.parentNode) === null || _this_parentNode === void 0 ? void 0 : _this_parentNode.removeChild(this);
    }
    get childNodes() {
        var nodes = [];
        var node = this.__firstChild;
        while(node){
            nodes.push(node);
            node = node.__nextSibling;
        }
        return nodes;
    }
    __insertBefore(node, beforeNode) {
        // If the node already has a parent, remove it from its current parent
        if (node.__parent) node.__parent.__removeChild(node);
        // If beforeNode is not provided, add the new node as the last child
        if (beforeNode) {
            // If beforeNode is provided, insert the new node before beforeNode
            if (beforeNode.__previousSibling) {
                beforeNode.__previousSibling.__nextSibling = node;
                node.__previousSibling = beforeNode.__previousSibling;
            } else {
                this.__firstChild = node;
                node.__previousSibling = null;
            }
            beforeNode.__previousSibling = node;
            node.__nextSibling = beforeNode;
            node.__parent = this;
        } else {
            if (this.__lastChild) {
                this.__lastChild.__nextSibling = node;
                node.__previousSibling = this.__lastChild;
            } else {
                this.__firstChild = node;
                node.__previousSibling = null;
            }
            this.__lastChild = node;
            node.__parent = this;
            node.__nextSibling = null;
        }
    }
    __removeChild(node) {
        if (node.__parent !== this) throw new Error('The node to be removed is not a child of this node.');
        if (node.__previousSibling) node.__previousSibling.__nextSibling = node.__nextSibling;
        else this.__firstChild = node.__nextSibling;
        if (node.__nextSibling) node.__nextSibling.__previousSibling = node.__previousSibling;
        else this.__lastChild = node.__previousSibling;
        node.__parent = null;
        node.__previousSibling = null;
        node.__nextSibling = null;
    }
    insertBefore(newNode, existingNode) {
        var __snapshot_def = this.__snapshot_def;
        if (__snapshot_def.isListHolder) {
            var __pendingListUpdates_values, _this___id, _;
            if (_list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values) ((_ = (__pendingListUpdates_values = _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values)[_this___id = this.__id]) !== null && _ !== void 0 ? _ : __pendingListUpdates_values[_this___id] = new _list_listUpdateInfo_js__rspack_import_10.ListUpdateInfoRecording(this)).onInsertBefore(newNode, existingNode);
            this.__insertBefore(newNode, existingNode);
            return;
        }
        var shouldRemove = newNode.__parent === this;
        this.__insertBefore(newNode, existingNode);
        var __elements = this.__elements;
        if (__elements) {
            if (!newNode.__elements) newNode.ensureElements();
        } else return;
        var count = __snapshot_def.slot.length;
        if (count === 1 || __snapshot_def.isSlotV2) {
            var [, elementIndex] = __snapshot_def.slot[typeof newNode.__slotIndex === 'number' ? newNode.__slotIndex : 0];
            var parent = __elements[elementIndex];
            if (shouldRemove) __RemoveElement(parent, newNode.__element_root);
            if (existingNode) {
                // SlotV2: each slot has its own wrapper. `existingNode` may live in a
                // different wrapper — `insertBefore(node, ref)` across wrappers throws,
                // so fall back to `append` (DOM auto-detaches the node from old parent).
                if (__snapshot_def.isSlotV2 && newNode.__slotIndex !== existingNode.__slotIndex) __AppendElement(parent, newNode.__element_root);
                else __InsertElementBefore(parent, newNode.__element_root, existingNode.__element_root);
            } else __AppendElement(parent, newNode.__element_root);
        } else if (count > 1) {
            var index = this.__current_slot_index++;
            var [s, elementIndex1] = __snapshot_def.slot[index];
            if (s === _dynamicPartType_js__rspack_import_2.DynamicPartType.Slot) {
                __ReplaceElement(newNode.__element_root, __elements[elementIndex1]);
                __elements[elementIndex1] = newNode.__element_root;
            /* v8 ignore start */ } else if (s === _dynamicPartType_js__rspack_import_2.DynamicPartType.MultiChildren) {
                if (__GetTag(__elements[elementIndex1]) === 'wrapper') __ReplaceElement(newNode.__element_root, __elements[elementIndex1]);
                else __AppendElement(__elements[elementIndex1], newNode.__element_root);
            }
        /* v8 ignore end */ }
    }
    removeChild(child) {
        var __snapshot_def = this.__snapshot_def;
        var removedSnapshots = collectRemovedSnapshots(child);
        clearTransientChildPropRefs(this, removedSnapshots);
        if (__snapshot_def.isListHolder) {
            var __pendingListUpdates_values, _this___id, _;
            if (_list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values) ((_ = (__pendingListUpdates_values = _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values)[_this___id = this.__id]) !== null && _ !== void 0 ? _ : __pendingListUpdates_values[_this___id] = new _list_listUpdateInfo_js__rspack_import_10.ListUpdateInfoRecording(this)).onRemoveChild(child);
            // Native elements may be recycled later, but React-owned worklet refs end
            // at the logical removal boundary.
            (0,_ref_js__rspack_import_5.unref)(child, true);
            this.__removeChild(child);
            (0,_utils_js__rspack_import_8.traverseSnapshotInstance)(child, (v)=>{
                clearTransientChildPropRefs(v, removedSnapshots);
                _snapshotInstanceManager_js__rspack_import_7.snapshotInstanceManager.values["delete"](v.__id);
            });
            // mark this child as deleted
            child.__id = 0;
            return;
        }
        (0,_ref_js__rspack_import_5.unref)(child, true);
        if (this.__elements) {
            var [, elementIndex] = __snapshot_def.slot[typeof child.__slotIndex === 'number' ? child.__slotIndex : 0];
            __RemoveElement(this.__elements[elementIndex], child.__element_root);
        }
        this.__removeChild(child);
        (0,_utils_js__rspack_import_8.traverseSnapshotInstance)(child, (v)=>{
            if (v.__snapshot_def.isListHolder) (0,_list_js__rspack_import_3.snapshotDestroyList)(v);
            clearTransientChildPropRefs(v, removedSnapshots);
            v.__parent = null;
            v.__previousSibling = null;
            v.__nextSibling = null;
            delete v.__elements;
            delete v.__element_root;
            _snapshotInstanceManager_js__rspack_import_7.snapshotInstanceManager.values["delete"](v.__id);
        });
    }
    // remove all children from start or this.__firstChild
    removeChildren(start = this.__firstChild) {
        var nodeToRemove = start;
        while(nodeToRemove){
            var next = nodeToRemove.__nextSibling;
            this.removeChild(nodeToRemove);
            nodeToRemove = next;
        }
    }
    setAttribute(key, value) {
        var _this___values;
        if (key === 'values') {
            var oldValues = this.__values;
            var values = value;
            this.__values = values;
            if (oldValues) for(var index = 0; index < values.length; index++)this.callUpdateIfNotDirectOrDeepEqual(index, oldValues[index], values[index]);
            else for(var index1 = 0; index1 < values.length; index1++)this.callUpdateIfNotDirectOrDeepEqual(index1, undefined, values[index1]);
            this.syncListItemPlatformInfo();
            return;
        }
        if (typeof key === 'string') {
            var // for more flexible usage, we allow setting non-indexed attributes
            _this___extraProps;
            if (key === '__listItemPlatformInfoIndex') {
                this.__listItemPlatformInfoIndex = value;
                this.syncListItemPlatformInfo();
                return;
            }
            if (key === '__listItemPlatformInfo') {
                this.__listItemPlatformInfo = value;
                return;
            }
            ((_this___extraProps = this.__extraProps) !== null && _this___extraProps !== void 0 ? _this___extraProps : this.__extraProps = {})[key] = value;
            return;
        }
        (_this___values = this.__values) !== null && _this___values !== void 0 ? _this___values : this.__values = [];
        this.callUpdateIfNotDirectOrDeepEqual(key, this.__values[key], this.__values[key] = value);
        this.syncListItemPlatformInfo();
    }
    syncListItemPlatformInfo() {
        var _this___snapshot_def_refAndSpreadIndexes;
        if (this.__listItemPlatformInfoIndex === undefined || !this.__values) return;
        var index = this.__listItemPlatformInfoIndex;
        this.__listItemPlatformInfo = (0,_platformInfo_js__rspack_import_4.getListItemPlatformInfoFromIndexedValue)(this.__values[index], (_this___snapshot_def_refAndSpreadIndexes = this.__snapshot_def.refAndSpreadIndexes) === null || _this___snapshot_def_refAndSpreadIndexes === void 0 ? void 0 : _this___snapshot_def_refAndSpreadIndexes.includes(index));
    }
    toJSON() {
        var json = {
            id: this.__id,
            type: this.type,
            values: this.__values,
            extraProps: this.__extraProps,
            children: this.__firstChild ? this.childNodes : undefined
        };
        // To save serialize time, we only serialize slotIndex if it is not 0
        if (this.__slotIndex > 0) json.slotIndex = this.__slotIndex;
        if (this.__listItemPlatformInfo) json.__listItemPlatformInfo = this.__listItemPlatformInfo;
        return json;
    }
    callUpdateIfNotDirectOrDeepEqual(index, oldValue, newValue) {
        if ((0,_utils_js__rspack_import_9.isDirectOrDeepEqual)(oldValue, newValue)) ;
        else this.__snapshot_def.update[index](this, index, oldValue);
    }
    constructor(type, id){
        // current slot index for dynamic parts
        // only increment when inserting dynamic parts
        // when removing dynamic parts, the slot index will not change
        // cause there would be a wrapper to keep the slot index stable
        this.__current_slot_index = 0;
        this.__slotIndex = 0;
        // onCreate?: () => void;
        // onAttach?: () => void;
        // onDetach?: () => void;
        // onRef?: () => void;
        // onUnref?: () => void;
        this.__parent = null;
        this.__firstChild = null;
        this.__lastChild = null;
        this.__previousSibling = null;
        this.__nextSibling = null;
        this.type = type;
        // Suspense uses 'div'
        if (!_definition_js__rspack_import_1.snapshotManager.values.has(type) && type !== 'div') {
            if (_snapshotCreatorMap_js__rspack_import_6.snapshotCreatorMap[type]) _snapshotCreatorMap_js__rspack_import_6.snapshotCreatorMap[type](type, _snapshotCreatorMap_js__rspack_import_6.snapshotCreatorRuntime);
            else if ((0,_utils_js__rspack_import_8.isCloneSnapshot)(type)) (0,_definition_js__rspack_import_1.createCloneSnapshot)(type);
            else if ((0,_utils_js__rspack_import_8.isCompiledSnapshot)(type)) {
                var message = 'Snapshot not found: ' + type;
                if (true) message += '. You can set environment variable `REACT_ALOG=true` and restart your dev server for troubleshooting.';
                throw new Error(message);
            } else (0,_definition_js__rspack_import_1.createRuntimeSnapshot)(type);
        }
        this.__snapshot_def = _definition_js__rspack_import_1.snapshotManager.values.get(type);
        id !== null && id !== void 0 ? id : id = _snapshotInstanceManager_js__rspack_import_7.snapshotInstanceManager.nextId -= 1;
        this.__id = id;
        _snapshotInstanceManager_js__rspack_import_7.snapshotInstanceManager.values.set(id, this);
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotCreatorMap.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  devOnlySentSnapshots: () => (devOnlySentSnapshots),
  setSnapshotCreatorMap: () => (setSnapshotCreatorMap),
  setSnapshotCreatorRuntime: () => (setSnapshotCreatorRuntime),
  snapshotCreatorMap: () => (snapshotCreatorMap),
  snapshotCreatorRuntime: () => (snapshotCreatorRuntime)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var snapshotCreatorMap = {};
function setSnapshotCreatorMap(map) {
    snapshotCreatorMap = map;
}
/**
 * Set only in `__DEV__` (by `internal.js` registering its own namespace), so
 * production keeps no reference to the full runtime namespace.
 */ var snapshotCreatorRuntime;
function setSnapshotCreatorRuntime(runtime) {
    snapshotCreatorRuntime = runtime;
}
var devOnlySentSnapshots = new Set();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceHydrationMap.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  hydrationMap: () => (hydrationMap)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * A map to store hydration states between snapshot instances.
 * K->V: main thread snapshotInstance IDs -> background snapshotInstance IDs.
 *
 * The map is used by the ref system to translate between snapshot instance IDs when
 * operations need to cross the thread boundary during the commit phase.
 */ var hydrationMap = /*#__PURE__*/ new Map();
/**
 * @internal
 */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/snapshotInstanceManager.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  snapshotInstanceManager: () => (snapshotInstanceManager)
});
/* import */ var _debug_vnodeSource_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/vnodeSource.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

var snapshotInstanceManager = {
    nextId: 0,
    values: /* @__PURE__ */ new Map(),
    clear () {
        // not resetting `nextId` to prevent id collision
        this.values.clear();
        if (true) (0,_debug_vnodeSource_js__rspack_import_0.clearSnapshotVNodeSource)();
    }
};
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/spread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  transformSpread: () => (transformSpread),
  updateSpread: () => (updateSpread)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _event_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/event.js");
/* import */ var _gesture_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/gesture.js");
/* import */ var _platformInfo_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/platformInfo.js");
/* import */ var _ref_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/ref.js");
/* import */ var _workletEvent_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletEvent.js");
/* import */ var _workletRef_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js");
/* import */ var _shared_attribute_name_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/attribute-name.js");
/* import */ var _utils_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
/* import */ var _gesture_processGesture_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/gesture/processGesture.js");
/* import */ var _list_listUpdateInfo_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/listUpdateInfo.js");
/* import */ var _list_pendingListUpdates_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/list/pendingListUpdates.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Handles JSX spread operator in the snapshot system.
 *
 * Spread operators in JSX (e.g., <div {...props}>) are transformed into
 * optimized attribute updates at compile time, avoiding runtime object spreads.
 */ 











// eslint-disable-next-line regexp/no-unused-capturing-group
var eventRegExp = /^(([A-Za-z-]*):)?(bind|catch|capture-bind|capture-catch|global-bind)([A-Za-z]+)$/;
var eventTypeMap = {
    bind: 'bindEvent',
    catch: 'catchEvent',
    'capture-bind': 'capture-bind',
    'capture-catch': 'capture-catch',
    'global-bind': 'global-bindEvent'
};
function retainSpreadWorkletCtx(newValue, oldValue) {
    var match = null;
    for(var key in newValue){
        var value = newValue[key];
        if (value === oldValue[key]) continue;
        if (key.endsWith(':ref')) {
            if (key.slice(0, -4) === 'main-thread' && value && value._wkltId) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.retainWorkletCtx)(value);
        } else if (key.endsWith(':gesture')) {
            if (key.slice(0, -8) === 'main-thread') (0,_gesture_processGesture_js__rspack_import_9.retainGestureWorkletCtx)(value);
        } else if ((match = eventRegExp.exec(key)) && match[2] === 'main-thread' && value !== null && value !== undefined && typeof value === 'object') (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.retainWorkletCtx)(value);
    }
}
function updateSpread(snapshot, index, oldValue, elementIndex, isListItem = false) {
    var _loop = function(key) {
        var v = newValue[key];
        if (v !== oldValue[key]) {
            if (key === 'className') __SetClasses(snapshot.__elements[elementIndex], v);
            else if (key === 'style') {
                if (!(0,_utils_js__rspack_import_8.isDirectOrDeepEqual)(v, oldValue[key])) __SetInlineStyles(snapshot.__elements[elementIndex], v);
            } else if (key === 'id') __SetID(snapshot.__elements[elementIndex], v);
            else if (key.startsWith('data-')) ;
            else if (key === 'ref') {
                var fakeSnapshot = {
                    __values: {
                        get [index] () {
                            return v;
                        },
                        set [index] (value){
                            // Modifications to the ref value should be reflected in the corresponding position of the spread.
                            newValue[key] = value;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                (0,_ref_js__rspack_import_4.updateRef)(fakeSnapshot, index, oldValue[key], elementIndex);
            } else if (key.endsWith(':ref')) {
                var _snapshot, ___worklet_ref_set;
                (___worklet_ref_set = (_snapshot = snapshot).__worklet_ref_set) !== null && ___worklet_ref_set !== void 0 ? ___worklet_ref_set : _snapshot.__worklet_ref_set = new Set();
                var fakeSnapshot1 = {
                    __values: {
                        get [index] () {
                            return v;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements,
                    __worklet_ref_set: snapshot.__worklet_ref_set
                };
                (0,_workletRef_js__rspack_import_6.updateWorkletRef)(fakeSnapshot1, index, oldValue[key], elementIndex, key.slice(0, -4));
            } else if (key.endsWith(':gesture')) {
                var workletType = key.slice(0, -8);
                var fakeSnapshot2 = {
                    __values: {
                        get [index] () {
                            return v;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                (0,_gesture_js__rspack_import_2.updateGesture)(fakeSnapshot2, index, oldValue[key], elementIndex, workletType);
            } else if (match = eventRegExp.exec(key)) {
                var workletType1 = match[2];
                var eventType = eventTypeMap[match[3]];
                var eventName = match[4];
                var fakeSnapshot3 = {
                    __values: {
                        get [index] () {
                            return v;
                        },
                        set [index] (value){
                            // Modifications to the event value should be reflected in the corresponding position of the spread.
                            newValue[key] = value;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                if (workletType1) (0,_workletEvent_js__rspack_import_5.updateWorkletEvent)(fakeSnapshot3, index, oldValue[key], elementIndex, workletType1, eventType, eventName);
                else (0,_event_js__rspack_import_1.updateEvent)(fakeSnapshot3, index, oldValue[key], elementIndex, eventType, eventName, key);
            } else if (_platformInfo_js__rspack_import_3.platformInfoAttributes.has(key)) ;
            else __SetAttribute(snapshot.__elements[elementIndex], key, v);
        }
        // collect data regardless of whether it has changed
        if (key.startsWith('data-')) dataset[key.slice(5)] = v;
    }, _loop1 = function(key1) {
        if (!(key1 in newValue)) {
            if (key1 === 'className') __SetClasses(snapshot.__elements[elementIndex], '');
            else if (key1 === 'style') __SetInlineStyles(snapshot.__elements[elementIndex], '');
            else if (key1 === 'id') __SetID(snapshot.__elements[elementIndex], null);
            else if (key1.startsWith('data-')) ;
            else if (key1 === 'ref') {
                var fakeSnapshot = {
                    __values: {
                        get [index] () {
                            return undefined;
                        },
                        set [index] (value){
                            // Modifications to the ref value should be reflected in the corresponding position of the spread.
                            newValue[key1] = value;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                (0,_ref_js__rspack_import_4.updateRef)(fakeSnapshot, index, oldValue[key1], elementIndex);
            } else if (key1.endsWith(':ref')) {
                var _snapshot, ___worklet_ref_set;
                (___worklet_ref_set = (_snapshot = snapshot).__worklet_ref_set) !== null && ___worklet_ref_set !== void 0 ? ___worklet_ref_set : _snapshot.__worklet_ref_set = new Set();
                var fakeSnapshot1 = {
                    __values: {
                        get [index] () {
                            return undefined;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements,
                    __worklet_ref_set: snapshot.__worklet_ref_set
                };
                (0,_workletRef_js__rspack_import_6.updateWorkletRef)(fakeSnapshot1, index, oldValue[key1], elementIndex, key1.slice(0, -4));
            } else if (key1.endsWith(':gesture')) {
                var workletType = key1.slice(0, -8);
                var fakeSnapshot2 = {
                    __values: {
                        get [index] () {
                            return undefined;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                (0,_gesture_js__rspack_import_2.updateGesture)(fakeSnapshot2, index, oldValue[key1], elementIndex, workletType);
            } else if (match = eventRegExp.exec(key1)) {
                var workletType1 = match[2];
                var eventType = eventTypeMap[match[3]];
                var eventName = match[4];
                var fakeSnapshot3 = {
                    __values: {
                        get [index] () {
                            return undefined;
                        },
                        set [index] (value){
                            newValue[key1] = value;
                        }
                    },
                    __id: snapshot.__id,
                    __elements: snapshot.__elements
                };
                if (workletType1) (0,_workletEvent_js__rspack_import_5.updateWorkletEvent)(fakeSnapshot3, index, oldValue[key1], elementIndex, workletType1, eventType, eventName);
                else (0,_event_js__rspack_import_1.updateEvent)(fakeSnapshot3, index, oldValue[key1], elementIndex, eventType, eventName, key1);
            } else if (_platformInfo_js__rspack_import_3.platformInfoAttributes.has(key1)) ;
            else __SetAttribute(snapshot.__elements[elementIndex], key1, null);
        }
        // collect data regardless of whether it has changed
        if (key1.startsWith('data-')) hasOldDataset = true;
    };
    oldValue !== null && oldValue !== void 0 ? oldValue : oldValue = {};
    var newValue = snapshot.__values[index]; // compiler guarantee this must be an object;
    var list = snapshot.parentNode;
    if (list === null || list === void 0 ? void 0 : list.__snapshot_def.isListHolder) {
        var oldPlatformInfo = (0,_platformInfo_js__rspack_import_3.getListItemPlatformInfoFromIndexedValue)(oldValue, true);
        var platformInfo = (0,_platformInfo_js__rspack_import_3.getListItemPlatformInfoFromIndexedValue)(newValue, true);
        if (!(0,_utils_js__rspack_import_8.isDirectOrDeepEqual)(oldPlatformInfo, platformInfo)) {
            var __pendingListUpdates_values, _list___id, _;
            if (_list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values) ((_ = (__pendingListUpdates_values = _list_pendingListUpdates_js__rspack_import_11.__pendingListUpdates.values)[_list___id = list.__id]) !== null && _ !== void 0 ? _ : __pendingListUpdates_values[_list___id] = new _list_listUpdateInfo_js__rspack_import_10.ListUpdateInfoRecording(list)).onSetAttribute(snapshot, platformInfo, oldPlatformInfo);
            snapshot.__listItemPlatformInfo = platformInfo;
            // The fakeSnapshot is missing `__parent`, so no `ListUpdateInfoRecording#onSetAttribute` will be called
            var fakeSnapshot = {
                __values: {
                    get [index] () {
                        return platformInfo;
                    }
                },
                __id: snapshot.__id,
                __elements: snapshot.__elements
            };
            (0,_platformInfo_js__rspack_import_3.updateListItemPlatformInfo)(fakeSnapshot, index, oldPlatformInfo, elementIndex);
        }
    } else if (isListItem) {
        // Only seed list-item platform info before the snapshot is attached to a list holder.
        // Non-platform spread attributes continue through the normal update loop below.
        var platformInfo1 = (0,_platformInfo_js__rspack_import_3.getListItemPlatformInfoFromIndexedValue)(newValue, true);
        snapshot.__listItemPlatformInfo = platformInfo1;
    }
    if ('__spread' in newValue) {
        // first screen
        newValue = transformSpread(snapshot, index, newValue);
        snapshot.__values[index] = newValue;
    }
    if (!snapshot.__elements) {
        retainSpreadWorkletCtx(newValue, oldValue);
        return;
    }
    var dataset = {};
    var match = null;
    for(var key in newValue)_loop(key);
    var hasOldDataset = false;
    for(var key1 in oldValue)_loop1(key1);
    // TODO: compare dataset before commit it to native?
    if (hasOldDataset || !(0,_utils_js__rspack_import_8.isEmptyObject)(dataset)) __SetDataset(snapshot.__elements[elementIndex], dataset);
}
function transformSpread(snapshot, index, spread) {
    var result = {};
    var hasNoFlattenAttributes = false;
    for(var key in spread){
        var value = spread[key];
        if (key === '__spread') ;
        else if (key === 'class' || key === 'className') {
            value !== null && value !== void 0 ? value : value = '';
            result['className'] = value;
        } else if (key === 'ref') result[key] = value ? 1 : undefined;
        else if (key === '__self' || key === '__source') ;
        else if (typeof value === 'function') {
            var transformedKey = (0,_shared_attribute_name_js__rspack_import_7.transformAttrName)(key);
            result[transformedKey] = `${snapshot.__id}:${index}:${key}`;
        } else {
            var transformedKey1 = (0,_shared_attribute_name_js__rspack_import_7.transformAttrName)(key);
            if (!hasNoFlattenAttributes) switch(transformedKey1){
                case 'name':
                case 'clip-radius':
                case 'overlap':
                case 'exposure-scene':
                case 'exposure-id':
                    hasNoFlattenAttributes = true;
            }
            result[transformedKey1] = value;
        }
    }
    if (hasNoFlattenAttributes) result['flatten'] = false;
    return result;
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/utils.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  entryUniqID: () => (entryUniqID),
  getCloneSnapshotInfo: () => (getCloneSnapshotInfo),
  getCloneSnapshotType: () => (getCloneSnapshotType),
  isCloneSnapshot: () => (isCloneSnapshot),
  isCompiledSnapshot: () => (isCompiledSnapshot),
  traverseSnapshotInstance: () => (traverseSnapshotInstance)
});
/* import */ var _constants_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/constants.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Utility functions for snapshot system.
 */ 
/**
 * Generates a unique ID for a snapshot entry by combining the entry name and unique ID.
 */ function entryUniqID(uniqID, entryName) {
    return entryName ? `${entryName}:${uniqID}` : uniqID;
}
/**
 * Traverses a snapshot instance tree and calls the callback for each node.
 */ function traverseSnapshotInstance(si, callback) {
    // Walk the sibling chain instead of materializing a `childNodes` array per
    // node. The callback may detach the visited node, so the first child and each
    // next sibling are captured before the corresponding callback runs.
    var child = si.__firstChild;
    callback(si);
    while(child){
        var next = child.__nextSibling;
        traverseSnapshotInstance(child, callback);
        child = next;
    }
}
var isCompiledSnapshot = (type)=>type.includes(_constants_js__rspack_import_0.COMPILED_SNAPSHOT);
var isCloneSnapshot = (type)=>type.startsWith(`${_constants_js__rspack_import_0.CLONE_SNAPSHOT}_`);
function getCloneSnapshotInfo(type) {
    // Format: `${CLONE_SNAPSHOT}_${cloneSpreadIndex}_${originalType}`.
    var match = new RegExp(`^${_constants_js__rspack_import_0.CLONE_SNAPSHOT}_(0|[1-9]\\d*)_(.+)$`).exec(type);
    if (!match) return undefined;
    var cloneSpreadIndexString = match[1];
    var cloneSpreadIndex = Number(cloneSpreadIndexString);
    var originalType = match[2];
    if (!isCompiledSnapshot(originalType)) return undefined;
    return {
        originalType,
        cloneSpreadIndex
    };
}
function getCloneSnapshotType(type, cloneSpreadIndex) {
    return isCloneSnapshot(type) ? type : `${_constants_js__rspack_import_0.CLONE_SNAPSHOT}_${cloneSpreadIndex}_${type}`;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletEvent.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  updateWorkletEvent: () => (updateWorkletEvent)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _debug_describeInvalidValue_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/debug/describeInvalidValue.js");
/* import */ var _lifecycle_patch_isMainThreadHydrating_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/isMainThreadHydrating.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function formatEventAttribute(workletType, eventType, eventName) {
    var suffix = eventType.endsWith('Event') ? eventType.slice(0, -5) : eventType;
    return `${workletType}:${suffix}${eventName}`;
}
function reportInvalidWorkletValue(snapshot, elementIndex, workletType, eventType, eventName, value) {
    var _snapshot___elements;
    var eventAttr = formatEventAttribute(workletType, eventType, eventName);
    var element = (_snapshot___elements = snapshot.__elements) === null || _snapshot___elements === void 0 ? void 0 : _snapshot___elements[elementIndex];
    var elementTag = element ? __GetTag(element) : 'unknown';
    var elementId = snapshot.__id;
    var snapshotName = snapshot.type;
    var message = `"${eventAttr}" on <${elementTag}> (snapshot ${elementId} "${snapshotName}") expected ` + 'a main-thread function but received ' + `${(0,_debug_describeInvalidValue_js__rspack_import_1.describeInvalidValue)(value)}. Did you forget to add a "main thread" directive to the handler?`;
    lynx.reportError(new Error(message));
}
function updateWorkletEvent(snapshot, expIndex, oldValue, elementIndex, workletType, eventType, eventName) {
    var rawValue = snapshot.__values[expIndex];
    if ( true && rawValue !== null && rawValue !== undefined && typeof rawValue !== 'object') {
        if (!snapshot.__elements) return;
        reportInvalidWorkletValue(snapshot, elementIndex, workletType, eventType, eventName, rawValue);
        return;
    }
    var value = rawValue !== null && rawValue !== void 0 ? rawValue : {};
    value._workletType = workletType;
    if (workletType === 'main-thread') (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.retainWorkletCtx)(value);
    if (!snapshot.__elements) return;
    if (workletType === 'main-thread') {
        (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.onWorkletCtxUpdate)(value, oldValue, _lifecycle_patch_isMainThreadHydrating_js__rspack_import_2.isMainThreadHydrating, snapshot.__elements[elementIndex]);
        var event = {
            type: 'worklet',
            value
        };
        __AddEvent(snapshot.__elements[elementIndex], eventType, eventName, event);
    }
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/snapshot/workletRef.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  applyRefQueue: () => (applyRefQueue),
  updateWorkletRef: () => (updateWorkletRef),
  workletUnRef: () => (workletUnRef)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _lifecycle_patch_isMainThreadHydrating_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/isMainThreadHydrating.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var mtRefQueue = [];
function applyRefQueue() {
    var queue = mtRefQueue;
    mtRefQueue = [];
    for(var i = 0; i < queue.length; i += 2){
        var worklet = queue[i];
        var element = queue[i + 1];
        if ('_wvid' in worklet) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.updateWorkletRef)(worklet, element);
        else if ('_wkltId' in worklet) worklet._unmount = (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.runWorkletCtx)(worklet, [
            {
                elementRefptr: element
            }
        ]);
    }
}
function addToRefQueue(worklet, element) {
    mtRefQueue.push(worklet, element);
}
function workletUnRef(value) {
    if ('_wvid' in value) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.updateWorkletRef)(value, null);
    else if ('_wkltId' in value) {
        if (typeof value._unmount == 'function') value._unmount();
        else (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.runWorkletCtx)(value, [
            null
        ]);
    }
}
function updateWorkletRef(snapshot, expIndex, oldValue, elementIndex, workletType) {
    var _snapshot___worklet_ref_set;
    var value = snapshot.__values[expIndex];
    if (workletType === 'main-thread' && value && value._wkltId) (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.retainWorkletCtx)(value);
    if (!snapshot.__elements) return;
    if (oldValue && ((_snapshot___worklet_ref_set = snapshot.__worklet_ref_set) === null || _snapshot___worklet_ref_set === void 0 ? void 0 : _snapshot___worklet_ref_set.has(oldValue))) {
        var _snapshot___worklet_ref_set1;
        workletUnRef(oldValue);
        (_snapshot___worklet_ref_set1 = snapshot.__worklet_ref_set) === null || _snapshot___worklet_ref_set1 === void 0 ? void 0 : _snapshot___worklet_ref_set1.delete(oldValue);
    }
    if (value === null || value === undefined) ;
    else if (value._wvid) {
        var element = snapshot.__elements[elementIndex];
        addToRefQueue(value, element);
    } else if (value._wkltId) {
        var element1 = snapshot.__elements[elementIndex];
        (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.onWorkletCtxUpdate)(value, oldValue, _lifecycle_patch_isMainThreadHydrating_js__rspack_import_1.isMainThreadHydrating, element1);
        addToRefQueue(value, element1);
    /* v8 ignore next 3 */ } else if (value._type === '__LEPUS__' || value._lepusWorkletHash) ;
    else throw new Error('MainThreadRef: main-thread:ref must be of type MainThreadRef or main-thread function.');
    if (value) {
        var _snapshot, ___worklet_ref_set;
        (___worklet_ref_set = (_snapshot = snapshot).__worklet_ref_set) !== null && ___worklet_ref_set !== void 0 ? ___worklet_ref_set : _snapshot.__worklet_ref_set = new Set();
        snapshot.__worklet_ref_set.add(value);
    }
    // Add an arbitrary attribute to avoid this element being layout-only
    __SetAttribute(snapshot.__elements[elementIndex], 'has-react-ref', true);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/call/runOnMainThread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runOnMainThread: () => (runOnMainThread)
});
/* import */ var _core_thread_function_call_main_thread_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/thread-function-call/main-thread.js");
/* import */ var _lifecycle_isRendering_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/isRendering.js");
/* import */ var _lifecycle_patch_snapshotPatch_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/patch/snapshotPatch.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



var runOnMainThreadImpl = (0,_core_thread_function_call_main_thread_js__rspack_import_0.createRunOnMainThread)({
    shouldDispatchRunOnMainThreadDirectly () {
        return _lifecycle_patch_snapshotPatch_js__rspack_import_2.__globalSnapshotPatch !== undefined && !_lifecycle_isRendering_js__rspack_import_1.isRendering.value;
    }
});
/**
 * `runOnMainThread` allows triggering main thread functions on the main thread asynchronously.
 * @param fn - The main thread functions to be called.
 * @returns A function. Calling which with the arguments to be passed to the main thread function to trigger it on the main thread. This function returns a promise that resolves to the return value of the main thread function.
 * @example
 * ```ts
 * import { runOnMainThread } from '@lynx-js/react';
 *
 * async function someFunction() {
 *   const fn = runOnMainThread(() => {
 *     'main thread';
 *     return 'hello';
 *   });
 *   const result = await fn();
 * }
 * ```
 * @public
 *
 * @group Functions
 */ function runOnMainThread(fn) {
    return runOnMainThreadImpl(fn);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/ctx.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  onPostWorkletCtx: () => (onPostWorkletCtx)
});
/* import */ var _functionality_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/functionality.js");
/* import */ var _core_background_function_run_on_background_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/background-function/run-on-background.js");


/**
 * @internal
 */ function onPostWorkletCtx(afterValue) {
    if (!(0,_functionality_js__rspack_import_0.isMtsEnabled)() && afterValue) {
        lynx.reportError(new Error('Main thread script requires Lynx sdk version 2.14'));
        return null;
    }
    if (!afterValue || !(0,_functionality_js__rspack_import_0.isRunOnBackgroundEnabled)()) return afterValue;
    (0,_core_background_function_run_on_background_js__rspack_import_1.registerBackgroundFunctionCtx)(afterValue);
    return afterValue;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/functionality.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearConfigCacheForTesting: () => (clearConfigCacheForTesting),
  isMtsEnabled: () => (/* reexport safe */ _core_mts_capability_js__rspack_import_0.isMtsEnabled),
  isRunOnBackgroundEnabled: () => (isRunOnBackgroundEnabled)
});
/* import */ var _core_mts_capability_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/mts-capability.js");
/* import */ var _utils_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


var runOnBackgroundEnabled;
/**
 * @internal
 */ function isRunOnBackgroundEnabled() {
    return runOnBackgroundEnabled !== null && runOnBackgroundEnabled !== void 0 ? runOnBackgroundEnabled : runOnBackgroundEnabled = (0,_utils_js__rspack_import_1.isSdkVersionGt)(2, 15);
}
function clearConfigCacheForTesting() {
    (0,_core_mts_capability_js__rspack_import_0.clearMtsConfigCacheForTesting)();
    runOnBackgroundEnabled = undefined;
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/hmr.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  registerWorkletOnBackground: () => (registerWorkletOnBackground)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
// import { __globalSnapshotPatch } from '../lifecycle/patch/snapshotPatch.js';
// const workletHashSet: Set<string> = /* @__PURE__ */ new Set();
/* v8 ignore start */ /**
 * @internal
 */ // disable hmr until bugs are fixed
// TODO: re-enable hmr or change a way to impl it; also need to fix the test case DEV_ONLY_RegisterWorklet
function registerWorkletOnBackground(_type, _hash, _fn) {
// if (workletHashSet.has(hash)) {
//   return;
// }
// workletHashSet.add(hash);
// if (__globalSnapshotPatch) {
//   __globalSnapshotPatch.push(
//     SnapshotOperation.DEV_ONLY_RegisterWorklet,
//     hash,
//     // We use `Function.prototype.toString` to serialize the function for Lepus.
//     fn.toString(),
//   );
// }
}
/* v8 ignore stop */ 
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/worklet/ref/updateInitValue.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  injectUpdateMTRefInitValue: () => (injectUpdateMTRefInitValue),
  sendMTRefInitValueToMainThread: () => (sendMTRefInitValueToMainThread)
});
/* import */ var _lynx_js_react_worklet_runtime_bindings__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
/* import */ var _core_main_thread_ref_init_value_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/main-thread-ref-init-value.js");
/* import */ var _lifecycle_constant_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/snapshot/lifecycle/constant.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function updateMTRefInitValue({ data }) {
    // This update ignores reloadVersion check.
    // MainThreadRefs created before reloadTemplate may still be referenced by user in some cases after reloadTemplate.
    var patch = JSON.parse(data);
    (0,_lynx_js_react_worklet_runtime_bindings__rspack_import_0.updateWorkletRefInitValueChanges)(patch);
}
function injectUpdateMTRefInitValue() {
    Object.assign(globalThis, {
        [_lifecycle_constant_js__rspack_import_2.LifecycleConstant.updateMTRefInitValue]: updateMTRefInitValue
    });
}
function sendMTRefInitValueToMainThread() {
    var patch = (0,_core_main_thread_ref_init_value_js__rspack_import_1.takeMainThreadRefInitValuePatch)();
    if (patch.length === 0) return;
    var data = JSON.stringify(patch);
    lynx.getNativeApp().callLepusMethod(_lifecycle_constant_js__rspack_import_2.LifecycleConstant.updateMTRefInitValue, {
        data
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/utils.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getDisplayName: () => (getDisplayName),
  hook: () => (hook),
  isDirectOrDeepEqual: () => (isDirectOrDeepEqual),
  isEmptyObject: () => (isEmptyObject),
  isSdkVersionGt: () => (isSdkVersionGt),
  lynxQueueMicrotask: () => (lynxQueueMicrotask),
  maybePromise: () => (maybePromise),
  noop: () => (noop),
  pick: () => (pick),
  withSyncEffectFlush: () => (withSyncEffectFlush)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var _shared_component_stack_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/shared/component-stack.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


/* v8 ignore start */ var noop = ()=>{};
/* v8 ignore end */ function isDirectOrDeepEqual(a, b) {
    if (a === b) return true;
    try {
        if (typeof a == 'object' && a !== null && typeof b == 'object' && b !== null && JSON.stringify(a) === JSON.stringify(b)) return true;
    } catch (error) {
        if ( true && /circular|cyclic/i.test(error.message)) {
            // JavaScript engines give this different errors name and messages:
            // PrimJS: "circular reference"
            // JavaScriptCore: "JSON.stringify cannot serialize cyclic structures"
            // V8: "Converting circular structure to JSON"
            var vnode = (0,_shared_component_stack_js__rspack_import_1.getCurrentVNode)();
            if (vnode) {
                var stack = (0,_shared_component_stack_js__rspack_import_1.getOwnerStack)(vnode);
                error.message += `\n\n${stack}`;
            }
        }
        throw error;
    }
    return false;
}
function isEmptyObject(obj) {
    for(var _ in obj)return false;
    return true;
}
function isSdkVersionGt(major, minor) {
    var _SystemInfo_lynxSdkVersion;
    var lynxSdkVersion = (_SystemInfo_lynxSdkVersion = SystemInfo.lynxSdkVersion) !== null && _SystemInfo_lynxSdkVersion !== void 0 ? _SystemInfo_lynxSdkVersion : '1.0';
    var version = lynxSdkVersion.split('.');
    return Number(version[0]) > major || Number(version[0]) == major && Number(version[1]) > minor;
}
function pick(obj, keys) {
    var result = {};
    for (var key of keys)if (key in obj) result[key] = obj[key];
    return result;
}
function maybePromise(value) {
    return typeof value === 'object' && value !== null && typeof value.then === 'function';
}
function getDisplayName(type) {
    var _type_displayName;
    return (_type_displayName = type.displayName) !== null && _type_displayName !== void 0 ? _type_displayName : type.name;
}
function hook(object, key, fn) {
    var oldFn = object[key];
    object[key] = function(...args) {
        return fn.call(this, oldFn, ...args);
    };
}
/**
 * Runs `fn` with Preact's after-paint scheduler switched to synchronous.
 *
 * Preact 11 defers passive-effect cleanups of unmounted components to that
 * flush. Page destroy is the one path with no later turn to run them in:
 * `callDestroyLifetimeFun` returns and native tears the runtime down, so a
 * deferred cleanup would never run at all.
 */ function withSyncEffectFlush(fn) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var previousRequestAnimationFrame = preact__rspack_import_0.options.requestAnimationFrame;
    preact__rspack_import_0.options.requestAnimationFrame = (cb)=>{
        cb();
    };
    try {
        return fn();
    } finally{
        if (previousRequestAnimationFrame) preact__rspack_import_0.options.requestAnimationFrame = previousRequestAnimationFrame;
        else delete preact__rspack_import_0.options.requestAnimationFrame;
    }
}
var lynxQueueMicrotask = /* @__PURE__ */ (()=>{
    if (lynx.queueMicrotask) return (fn)=>lynx.queueMicrotask(fn);
    else if (typeof globalThis.Promise === 'function') {
        var resolved = globalThis.Promise.resolve();
        /* v8 ignore start */ return (fn)=>{
            // Schedule as a microtask, and surface exceptions like queueMicrotask would.
            resolved.then(fn).catch((err)=>{
                setTimeout(()=>{
                    throw err;
                }, 0);
            });
        };
    } else return (fn)=>{
        setTimeout(fn, 0);
    };
/* v8 ignore stop */ })();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/animation/animation.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Animation: () => (Animation),
  AnimationOperation: () => (AnimationOperation)
});
var AnimationOperation;
(function(AnimationOperation) {
    AnimationOperation[AnimationOperation["START"] = 0] = "START";
    AnimationOperation[AnimationOperation["PLAY"] = 1] = "PLAY";
    AnimationOperation[AnimationOperation["PAUSE"] = 2] = "PAUSE";
    AnimationOperation[AnimationOperation["CANCEL"] = 3] = "CANCEL";
})(AnimationOperation || (AnimationOperation = {}));
class Animation {
    cancel() {
        // @ts-expect-error accessing private member 'element'
        return __ElementAnimate(this.effect.target.element, [
            AnimationOperation.CANCEL,
            this.id
        ]);
    }
    pause() {
        // @ts-expect-error accessing private member 'element'
        return __ElementAnimate(this.effect.target.element, [
            AnimationOperation.PAUSE,
            this.id
        ]);
    }
    play() {
        // @ts-expect-error accessing private member 'element'
        return __ElementAnimate(this.effect.target.element, [
            AnimationOperation.PLAY,
            this.id
        ]);
    }
    start() {
        // @ts-expect-error accessing private member 'element'
        return __ElementAnimate(this.effect.target.element, [
            AnimationOperation.START,
            this.id,
            this.effect.keyframes,
            this.effect.options
        ]);
    }
    constructor(effect){
        this.effect = effect;
        this.id = '__lynx-inner-js-animation-' + Animation.count++;
        this.start();
    }
}
Animation.count = 0;
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/animation/effect.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  KeyframeEffect: () => (KeyframeEffect)
});
class KeyframeEffect {
    constructor(target, keyframes, options){
        this.target = target;
        this.keyframes = keyframes;
        this.options = options;
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/element.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Element: () => (Element),
  setShouldFlush: () => (setShouldFlush)
});
/* import */ var _animation_animation_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/animation/animation.js");
/* import */ var _animation_effect_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/animation/effect.js");
/* import */ var _utils_mainThreadFlushLoopGuard_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/mainThreadFlushLoopGuard.js");
/* import */ var _utils_version_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/version.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




var willFlush = false;
var shouldFlush = true;
function setShouldFlush(value) {
    shouldFlush = value;
}
class Element {
    setAttribute(name, value) {
        /* v8 ignore next 3 */ if (true) (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)(`element:setAttribute ${name}`);
        __SetAttribute(this.element, name, value);
        this.flushElementTree();
    }
    setStyleProperty(name, value) {
        /* v8 ignore next 3 */ if (true) (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)(`element:setStyleProperty ${name}`);
        __AddInlineStyle(this.element, name, value);
        this.flushElementTree();
    }
    setStyleProperties(styles) {
        /* v8 ignore next 5 */ if (true) (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)(`element:setStyleProperties keys=${Object.keys(styles).length}`);
        for(var key in styles)__AddInlineStyle(this.element, key, styles[key]);
        this.flushElementTree();
    }
    getAttribute(attributeName) {
        return __GetAttributeByName(this.element, attributeName);
    }
    getAttributeNames() {
        return __GetAttributeNames(this.element);
    }
    querySelector(selector) {
        var ref = __QuerySelector(this.element, selector, {});
        return ref ? new Element(ref) : null;
    }
    querySelectorAll(selector) {
        return __QuerySelectorAll(this.element, selector, {}).map((element)=>{
            return new Element(element);
        });
    }
    getComputedStyleProperty(key) {
        if (!(0,_utils_version_js__rspack_import_3.isSdkVersionGt)(3, 4)) throw new Error('getComputedStyleProperty requires Lynx sdk version 3.5');
        if (!key) throw new Error('getComputedStyleProperty: key is required');
        return __GetComputedStyleByKey(this.element, key);
    }
    animate(keyframes, options) {
        var normalizedOptions = typeof options === 'number' ? {
            duration: options
        } : options !== null && options !== void 0 ? options : {};
        return new _animation_animation_js__rspack_import_0.Animation(new _animation_effect_js__rspack_import_1.KeyframeEffect(this, keyframes, normalizedOptions));
    }
    invoke(methodName, params) {
        /* v8 ignore next 3 */ if (true) (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)(`element:invoke ${methodName}`);
        return new Promise((resolve, reject)=>{
            __InvokeUIMethod(this.element, methodName, params !== null && params !== void 0 ? params : {}, (res)=>{
                if (res.code === 0) resolve(res.data);
                else reject(new Error('UI method invoke: ' + JSON.stringify(res)));
            });
            this.flushElementTree();
        });
    }
    flushElementTree() {
        if (willFlush || !shouldFlush) return;
        willFlush = true;
        Promise.resolve().then(()=>{
            willFlush = false;
            if (true) {
                (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)('render');
                var error = (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopOnFlushMicrotask)();
                if (error) {
                    // Stop scheduling further flushes so we can surface the error.
                    // This is DEV-only behavior guarded internally by the dev guard.
                    shouldFlush = false;
                    (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopReport)(error);
                    return;
                }
            }
            __FlushElementTree();
        });
    }
    constructor(element){
        // In Lynx versions prior to and including 2.15,
        // a crash occurs when printing or transferring refCounted across threads.
        // Bypass this problem by hiding the element object.
        Object.defineProperty(this, 'element', {
            get () {
                return element;
            }
        });
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/lepusQuerySelector.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  querySelector: () => (querySelector),
  querySelectorAll: () => (querySelectorAll)
});
/* import */ var _element_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/element.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

class PageElement {
    static get() {
        var _PageElement, _pageElement;
        (_pageElement = (_PageElement = PageElement).pageElement) !== null && _pageElement !== void 0 ? _pageElement : _PageElement.pageElement = __GetPageElement();
        return PageElement.pageElement;
    }
}
function querySelector(cssSelector) {
    var pageElement = PageElement.get();
    if (!pageElement) return null;
    var element = __QuerySelector(pageElement, cssSelector, {});
    return element ? new _element_js__rspack_import_0.Element(element) : null;
}
function querySelectorAll(cssSelector) {
    var pageElement = PageElement.get();
    if (!pageElement) return [];
    return __QuerySelectorAll(pageElement, cssSelector, {}).map((element)=>{
        return new _element_js__rspack_import_0.Element(element);
    });
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/lynxApi.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initApiEnv: () => (initApiEnv)
});
/* import */ var _lepusQuerySelector_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/lepusQuerySelector.js");
/* import */ var _utils_version_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/version.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


function initApiEnv() {
    var _lynx_clearInterval;
    // @ts-expect-error type
    lynx.querySelector = _lepusQuerySelector_js__rspack_import_0.querySelector;
    // @ts-expect-error type
    lynx.querySelectorAll = _lepusQuerySelector_js__rspack_import_0.querySelectorAll;
    // @ts-expect-error type
    globalThis.setTimeout = lynx.setTimeout;
    // @ts-expect-error type
    globalThis.setInterval = lynx.setInterval;
    // @ts-expect-error type
    globalThis.clearTimeout = lynx.clearTimeout;
    // In lynx 2.14 `clearInterval` is mistakenly spelled as `clearTimeInterval`. This is fixed in lynx 2.15.
    // @ts-expect-error type
    globalThis.clearInterval = (_lynx_clearInterval = lynx.clearInterval) !== null && _lynx_clearInterval !== void 0 ? _lynx_clearInterval : lynx.clearTimeInterval;
    {
        // @ts-expect-error type
        var requestAnimationFrame = lynx.requestAnimationFrame;
        // @ts-expect-error type
        lynx.requestAnimationFrame = globalThis.requestAnimationFrame = (callback)=>{
            if (!(0,_utils_version_js__rspack_import_1.isSdkVersionGt)(2, 15)) throw new Error('requestAnimationFrame in main thread script requires Lynx sdk version 2.16');
            return requestAnimationFrame(callback);
        };
    }
    // @ts-expect-error type
    globalThis.cancelAnimationFrame = lynx.cancelAnimationFrame;
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/bindings.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearFirstScreenMainThreadRefs: () => (clearFirstScreenMainThreadRefs),
  delayRunOnBackground: () => (delayRunOnBackground),
  registerMainThreadObjectType: () => (registerMainThreadObjectType),
  registerWorklet: () => (registerWorklet),
  runRunOnMainThreadTask: () => (runRunOnMainThreadTask),
  runWorkletCtx: () => (runWorkletCtx),
  setEomShouldFlushElementTree: () => (setEomShouldFlushElementTree),
  updateWorkletRef: () => (updateWorkletRef),
  updateWorkletRefInitValueChanges: () => (updateWorkletRefInitValueChanges)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
/**
 * Executes the worklet ctx.
 * @param worklet - The Worklet ctx to run.
 * @param params - An array as parameters of the worklet run.
 */ function runWorkletCtx(worklet, params) {
    var _globalThis_runWorklet, _globalThis;
    return (_globalThis_runWorklet = (_globalThis = globalThis).runWorklet) === null || _globalThis_runWorklet === void 0 ? void 0 : _globalThis_runWorklet.call(_globalThis, worklet, params);
}
/**
 * Save an element to a `WorkletRef`.
 *
 * @param workletRef - The `WorkletRef` to be updated.
 * @param element - The element.
 * @internal
 */ function updateWorkletRef(workletRef, element) {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._refImpl.updateWorkletRef(workletRef, element);
}
/**
 * Update the initial value of the `WorkletRef`.
 *
 * @param patch - An array containing the index and new value of the worklet value.
 */ function updateWorkletRefInitValueChanges(patch) {
    var _globalThis_lynxWorkletImpl;
    if (patch) (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._refImpl.updateWorkletRefInitValueChanges(patch);
}
/**
 * Register a definition for an opaque main-thread object type.
 *
 * @internal
 */ function registerMainThreadObjectType(type, create) {
    globalThis.lynxWorkletImpl._refImpl.registerMainThreadObjectType(type, create);
}
/**
 * Releases the temporary negative-ID MainThreadRefs after hydration handoff.
 */ function clearFirstScreenMainThreadRefs() {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._refImpl.clearFirstScreenWorkletRefMap();
}
/**
 * Register a worklet.
 *
 * @internal
 */ function registerWorklet(type, id, worklet) {
    globalThis.registerWorklet(type, id, worklet);
}
/**
 * Delay a runOnBackground after hydration.
 *
 * @internal
 */ function delayRunOnBackground(fnObj, fn) {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._runOnBackgroundDelayImpl.delayRunOnBackground(fnObj, fn);
}
/**
 * Set whether EOM operations should flush the element tree.
 *
 * @internal
 */ function setEomShouldFlushElementTree(value) {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._eomImpl.setShouldFlush(value);
}
/**
 * Runs a task on the main thread.
 *
 * @internal
 */ function runRunOnMainThreadTask(task, params, resolveId) {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._runRunOnMainThreadTask(task, params, resolveId);
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkletEvents: () => (WorkletEvents)
});
var WorkletEvents;
(function(WorkletEvents) {
    WorkletEvents["runWorkletCtx"] = "Lynx.Worklet.runWorkletCtx";
    WorkletEvents["runOnBackground"] = "Lynx.Worklet.runOnBackground";
    WorkletEvents["FunctionCallRet"] = "Lynx.Worklet.FunctionCallRet";
    WorkletEvents["releaseBackgroundWorkletCtx"] = "Lynx.Worklet.releaseBackgroundWorkletCtx";
    WorkletEvents["releaseWorkletRef"] = "Lynx.Worklet.releaseWorkletRef";
})(WorkletEvents || (WorkletEvents = {}));

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  WorkletEvents: () => (/* reexport safe */ _events_js__rspack_import_2.WorkletEvents),
  clearDelayedRunOnBackgroundFunctions: () => (/* reexport safe */ _observers_js__rspack_import_1.clearDelayedRunOnBackgroundFunctions),
  clearFirstScreenMainThreadRefs: () => (/* reexport safe */ _bindings_js__rspack_import_0.clearFirstScreenMainThreadRefs),
  delayRunOnBackground: () => (/* reexport safe */ _bindings_js__rspack_import_0.delayRunOnBackground),
  flushDelayedRunOnBackgroundFunctions: () => (/* reexport safe */ _observers_js__rspack_import_1.flushDelayedRunOnBackgroundFunctions),
  hydrateWorkletCtx: () => (/* reexport safe */ _observers_js__rspack_import_1.hydrateWorkletCtx),
  onHydrationFinished: () => (/* reexport safe */ _observers_js__rspack_import_1.onHydrationFinished),
  onWorkletCtxUpdate: () => (/* reexport safe */ _observers_js__rspack_import_1.onWorkletCtxUpdate),
  registerMainThreadObjectType: () => (/* reexport safe */ _bindings_js__rspack_import_0.registerMainThreadObjectType),
  registerWorklet: () => (/* reexport safe */ _bindings_js__rspack_import_0.registerWorklet),
  retainWorkletCtx: () => (/* reexport safe */ _observers_js__rspack_import_1.retainWorkletCtx),
  runRunOnMainThreadTask: () => (/* reexport safe */ _bindings_js__rspack_import_0.runRunOnMainThreadTask),
  runWorkletCtx: () => (/* reexport safe */ _bindings_js__rspack_import_0.runWorkletCtx),
  setEomShouldFlushElementTree: () => (/* reexport safe */ _bindings_js__rspack_import_0.setEomShouldFlushElementTree),
  updateWorkletRef: () => (/* reexport safe */ _bindings_js__rspack_import_0.updateWorkletRef),
  updateWorkletRefInitValueChanges: () => (/* reexport safe */ _bindings_js__rspack_import_0.updateWorkletRefInitValueChanges)
});
/* import */ var _bindings_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/bindings.js");
/* import */ var _observers_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/observers.js");
/* import */ var _events_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/observers.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearDelayedRunOnBackgroundFunctions: () => (clearDelayedRunOnBackgroundFunctions),
  flushDelayedRunOnBackgroundFunctions: () => (flushDelayedRunOnBackgroundFunctions),
  hydrateWorkletCtx: () => (hydrateWorkletCtx),
  onHydrationFinished: () => (onHydrationFinished),
  onWorkletCtxUpdate: () => (onWorkletCtxUpdate),
  retainWorkletCtx: () => (retainWorkletCtx)
});
/* import */ var _bindings_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/bindings.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/**
 * Hydrates a new worklet ctx from the first-screen ctx without requiring a
 * native Element. Backends compose their own replay semantics around this.
 */ function hydrateWorkletCtx(worklet, oldWorklet) {
    var _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._hydrateCtx(worklet, oldWorklet);
}
/**
 * This function must be called when a worklet context is updated.
 *
 * @param worklet - The worklet to be updated
 * @param oldWorklet - The old worklet context
 * @param isFirstScreen - Whether it is before the hydration is finished
 * @param element - The element
 */ function onWorkletCtxUpdate(worklet, oldWorklet, isFirstScreen, element) {
    var _globalThis_lynxWorkletImpl;
    if (isFirstScreen && oldWorklet) hydrateWorkletCtx(worklet, oldWorklet);
    // For old version dynamic component compatibility.
    if (isFirstScreen) (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._eventDelayImpl.runDelayedWorklet(worklet, element);
}
function retainWorkletCtx(worklet) {
    var _globalThis_lynxWorkletImpl__jsFunctionLifecycleManager, _globalThis_lynxWorkletImpl;
    if (worklet._execId !== undefined) (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : (_globalThis_lynxWorkletImpl__jsFunctionLifecycleManager = _globalThis_lynxWorkletImpl._jsFunctionLifecycleManager) === null || _globalThis_lynxWorkletImpl__jsFunctionLifecycleManager === void 0 ? void 0 : _globalThis_lynxWorkletImpl__jsFunctionLifecycleManager.addRef(worklet._execId, worklet);
}
function flushDelayedRunOnBackgroundFunctions() {
    var _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_runDelayedBackgroundFunctions, _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl, _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : (_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl = _globalThis_lynxWorkletImpl._runOnBackgroundDelayImpl) === null || _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl === void 0 ? void 0 : (_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_runDelayedBackgroundFunctions = _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl.runDelayedBackgroundFunctions) === null || _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_runDelayedBackgroundFunctions === void 0 ? void 0 : _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_runDelayedBackgroundFunctions.call(_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl);
}
function clearDelayedRunOnBackgroundFunctions() {
    var _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_clearDelayedBackgroundFunctions, _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl, _globalThis_lynxWorkletImpl;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : (_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl = _globalThis_lynxWorkletImpl._runOnBackgroundDelayImpl) === null || _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl === void 0 ? void 0 : (_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_clearDelayedBackgroundFunctions = _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl.clearDelayedBackgroundFunctions) === null || _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_clearDelayedBackgroundFunctions === void 0 ? void 0 : _globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl_clearDelayedBackgroundFunctions.call(_globalThis_lynxWorkletImpl__runOnBackgroundDelayImpl);
}
/**
 * This must be called when the hydration is finished.
 */ function onHydrationFinished() {
    var _globalThis_lynxWorkletImpl, // For old version dynamic component compatibility.
    _globalThis_lynxWorkletImpl1;
    (_globalThis_lynxWorkletImpl = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl === void 0 ? void 0 : _globalThis_lynxWorkletImpl._runOnBackgroundDelayImpl.runDelayedBackgroundFunctions();
    (0,_bindings_js__rspack_import_0.clearFirstScreenMainThreadRefs)();
    (_globalThis_lynxWorkletImpl1 = globalThis.lynxWorkletImpl) === null || _globalThis_lynxWorkletImpl1 === void 0 ? void 0 : _globalThis_lynxWorkletImpl1._eventDelayImpl.clearDelayedWorklets();
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/types.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RunWorkletSource: () => (RunWorkletSource)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var RunWorkletSource;
(function(RunWorkletSource) {
    RunWorkletSource[RunWorkletSource["NONE"] = 0] = "NONE";
    RunWorkletSource[RunWorkletSource["EVENT"] = 1] = "EVENT";
    RunWorkletSource[RunWorkletSource["GESTURE"] = 2] = "GESTURE";
})(RunWorkletSource || (RunWorkletSource = {}));
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/delayRunOnBackground.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initRunOnBackgroundDelay: () => (initRunOnBackgroundDelay)
});
var impl;
function initRunOnBackgroundDelay() {
    return impl = {
        delayedBackgroundFunctionArray: [],
        clearDelayedBackgroundFunctions,
        delayRunOnBackground,
        runDelayedBackgroundFunctions
    };
}
function delayRunOnBackground(fnObj, task) {
    var _fnObj, __delayIndices;
    impl.delayedBackgroundFunctionArray.push({
        task
    });
    var delayIndices = (__delayIndices = (_fnObj = fnObj)._delayIndices) !== null && __delayIndices !== void 0 ? __delayIndices : _fnObj._delayIndices = [];
    delayIndices.push(impl.delayedBackgroundFunctionArray.length - 1);
}
function clearDelayedBackgroundFunctions() {
    impl.delayedBackgroundFunctionArray.length = 0;
}
function runDelayedBackgroundFunctions() {
    for (var details of impl.delayedBackgroundFunctionArray)if (details === null || details === void 0 ? void 0 : details.jsFnHandle) details.task(details.jsFnHandle._jsFnId, details.jsFnHandle._execId);
    clearDelayedBackgroundFunctions();
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/delayWorkletEvent.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  clearDelayedWorklets: () => (clearDelayedWorklets),
  delayExecUntilJsReady: () => (delayExecUntilJsReady),
  initEventDelay: () => (initEventDelay),
  runDelayedWorklet: () => (runDelayedWorklet)
});
/* import */ var _utils_profile_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js");

var impl;
function initEventDelay() {
    return impl = {
        _delayedWorkletParamsMap: new Map(),
        runDelayedWorklet,
        clearDelayedWorklets
    };
}
function delayExecUntilJsReady(hash, params) {
    (0,_utils_profile_js__rspack_import_0.profile)('delayExecUntilJsReady: ' + hash, ()=>{
        var map = impl._delayedWorkletParamsMap;
        var paramVec = map.get(hash);
        if (paramVec) paramVec.push(params);
        else map.set(hash, [
            params
        ]);
    });
}
function runDelayedWorklet(worklet, element) {
    (0,_utils_profile_js__rspack_import_0.profile)('commitDelayedWorklet', ()=>{
        var paramsVec = impl._delayedWorkletParamsMap.get(worklet._wkltId);
        if (paramsVec === undefined) return;
        var leftParamsVec = [];
        paramsVec.forEach((params)=>{
            var _firstParam_currentTarget;
            var firstParam = params[0];
            if ((firstParam === null || firstParam === void 0 ? void 0 : (_firstParam_currentTarget = firstParam.currentTarget) === null || _firstParam_currentTarget === void 0 ? void 0 : _firstParam_currentTarget.elementRefptr) === element) setTimeout(()=>{
                (0,_utils_profile_js__rspack_import_0.profile)('runDelayedWorklet', ()=>{
                    runWorklet(worklet, params);
                });
            }, 0);
            else leftParamsVec.push(params);
        });
        impl._delayedWorkletParamsMap.set(worklet._wkltId, leftParamsVec);
    });
}
function clearDelayedWorklets() {
    impl._delayedWorkletParamsMap.clear();
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/eomImpl.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initEomImpl: () => (initEomImpl)
});
/* import */ var _api_element_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/element.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function initEomImpl() {
    return {
        setShouldFlush: _api_element_js__rspack_import_0.setShouldFlush
    };
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/eventPropagation.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  EventResult: () => (EventResult),
  addEventMethodsIfNeeded: () => (addEventMethodsIfNeeded),
  isEventObject: () => (isEventObject)
});
/* import */ var _bindings_types_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/types.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// EventResult enum values
var EventResult = {
    kDefault: 0x0,
    kStopPropagationMask: 0x1,
    kStopImmediatePropagationMask: 0x2
};
function isEventObject(ctx, options) {
    if (!Array.isArray(ctx) || typeof ctx[0] !== 'object' || ctx[0] === null) return false;
    if (options && options.source === _bindings_types_js__rspack_import_0.RunWorkletSource.EVENT) return true;
    return false;
}
/**
 * Add event methods to an event object if needed
 * @param ctx The event object to enhance
 * @param options The run worklet options
 * @returns A tuple of boolean and the event return result
 */ function addEventMethodsIfNeeded(ctx, options) {
    if (!isEventObject(ctx, options)) return [
        false,
        {}
    ];
    var eventCtx = {};
    var eventObj = ctx[0];
    // Add stopPropagation method
    eventObj['stopPropagation'] = function() {
        var _eventCtx__eventReturnResult;
        eventCtx._eventReturnResult = ((_eventCtx__eventReturnResult = eventCtx._eventReturnResult) !== null && _eventCtx__eventReturnResult !== void 0 ? _eventCtx__eventReturnResult : EventResult.kDefault) | EventResult.kStopPropagationMask;
    };
    // Add stopImmediatePropagation method
    eventObj['stopImmediatePropagation'] = function() {
        var _eventCtx__eventReturnResult;
        eventCtx._eventReturnResult = ((_eventCtx__eventReturnResult = eventCtx._eventReturnResult) !== null && _eventCtx__eventReturnResult !== void 0 ? _eventCtx__eventReturnResult : EventResult.kDefault) | EventResult.kStopImmediatePropagationMask;
    };
    return [
        true,
        eventCtx
    ];
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/hydrate.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  hydrateCtx: () => (hydrateCtx)
});
/* import */ var _utils_profile_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js");
/* import */ var _workletRef_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRef.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.


/**
 * Hydrates a Worklet context with data from a first-screen Worklet context.
 * This process is typically used to run all delayed `runOnBackground` functions
 * and initialize `WorkletRef` values modified before hydration.
 *
 * @param ctx The target Worklet context to be hydrated.
 * @param firstScreenCtx The Worklet context from the first screen rendering,
 *                       containing the data to hydrate with.
 */ function hydrateCtx(ctx, firstScreenCtx) {
    (0,_utils_profile_js__rspack_import_0.profile)('hydrateCtx', ()=>{
        hydrateCtxImpl(ctx, firstScreenCtx, ctx._execId);
    });
}
function hydrateCtxImpl(ctx, firstScreenCtx, execId) {
    if (!ctx || typeof ctx !== 'object' || !firstScreenCtx || typeof firstScreenCtx !== 'object') return;
    var ctxObj = ctx;
    var firstScreenCtxObj = firstScreenCtx;
    if (ctxObj['_wkltId'] && ctxObj['_wkltId'] !== firstScreenCtxObj['_wkltId']) return;
    // Typed handles (including `_type: 'main-thread'` mutable cells) hydrate
    // atomically without walking their initialization payload. Untyped legacy
    // refs continue through the existing `_wvid` path below.
    if (isTypedWorkletRefDescriptor(ctxObj)) {
        hydrateWorkletValueHandle(ctxObj, firstScreenCtxObj);
        return;
    }
    for(var key in ctx){
        if (key === '_wvid') hydrateMainThreadRef(ctxObj[key], firstScreenCtxObj);
        else if (key === '_jsFn') hydrateDelayRunOnBackgroundTasks(ctxObj[key], firstScreenCtxObj[key], execId);
        else {
            var firstScreenValue = typeof firstScreenCtxObj[key] === 'function' ? firstScreenCtxObj[key].boundCtx : firstScreenCtxObj[key];
            hydrateCtxImpl(ctxObj[key], firstScreenValue, execId);
        }
    }
}
function isTypedWorkletRefDescriptor(value) {
    var descriptor = value;
    return typeof descriptor._wvid === 'number' && typeof descriptor._type === 'string';
}
/**
 * Hydrates a WorkletRef on the main thread.
 * This maps the positive-ID background handle to the target realized during
 * first-screen rendering, while leaving an unused first-screen handle alone.
 */ function hydrateMainThreadRef(refId, value) {
    if ('_initValue' in value) return;
    lynxWorkletImpl._refImpl._workletRefMap[refId] = value;
}
/**
 * Hydrates a typed worklet handle on the main thread.
 * The target is the object or mutable cell realized from the matching first-screen handle.
 */ function hydrateWorkletValueHandle(handle, value) {
    if (!(0,_workletRef_js__rspack_import_1.isHydratedWorkletValue)(value)) return;
    (0,_workletRef_js__rspack_import_1.hydrateWorkletValue)(handle, value);
}
/**
 * Hydrates delayed `runOnBackground` tasks.
 * This function ensures that any `runOnBackground` calls that were delayed
 * during the first-screen rendering are correctly associated with their
 * respective JavaScript function handles in the hydrated Worklet context.
 */ function hydrateDelayRunOnBackgroundTasks(fnObjs, firstScreenFnObjs, execId) {
    for(var fnName in fnObjs){
        var fnObj = fnObjs[fnName];
        var firstScreenFnObj = firstScreenFnObjs[fnName];
        if (!(firstScreenFnObj === null || firstScreenFnObj === void 0 ? void 0 : firstScreenFnObj._delayIndices)) {
            if (firstScreenFnObj) {
                firstScreenFnObj._isFirstScreen = false;
                firstScreenFnObj._execId = execId;
                Object.assign(firstScreenFnObj, fnObj);
            }
            continue;
        }
        for (var index of firstScreenFnObj._delayIndices){
            var details = lynxWorkletImpl._runOnBackgroundDelayImpl.delayedBackgroundFunctionArray[index];
            if (!details) continue;
            fnObj._execId = execId;
            details.jsFnHandle = fnObj;
        }
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/index.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  registerWorklet: () => (registerWorklet)
});
/* import */ var _api_lynxApi_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/lynxApi.js");
/* import */ var _listeners_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/listeners.js");
/* import */ var _workletRuntime_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRuntime.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



if (globalThis.lynxWorkletImpl === undefined) {
    (0,_workletRuntime_js__rspack_import_2.initWorklet)();
    (0,_api_lynxApi_js__rspack_import_0.initApiEnv)();
    (0,_listeners_js__rspack_import_1.initEventListeners)();
}
/**
 * Registers compiler-generated main-thread functions with the initialized host runtime.
 *
 * @internal
 */ var registerWorklet = globalThis.registerWorkletInternal;
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/jsFunctionLifecycle.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  JsFunctionLifecycleManager: () => (JsFunctionLifecycleManager),
  isRunOnBackgroundEnabled: () => (isRunOnBackgroundEnabled)
});
/* import */ var _bindings_events_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js");
/* import */ var _utils_profile_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js");
/* import */ var _utils_version_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/version.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



/**
 * `JsFunctionLifecycleManager` monitors references to JS function handles to be called by `runOnBackground()`.
 * In JS context, functions to be called by `runOnBackground()` is referenced by `JsFnHandle`s and finally by `execId`.
 * When all `JsFnHandle`s in lepus are released, an event will be sent to JS context to de-ref the `execId`,
 * resulting a de-ref to the js function in JS context.
 */ class JsFunctionLifecycleManager {
    addRef(execId, objToRef) {
        var _this_execIdRefCount_get;
        if (this.retainedObjects.has(objToRef)) return;
        this.retainedObjects.add(objToRef);
        this.execIdRefCount.set(execId, ((_this_execIdRefCount_get = this.execIdRefCount.get(execId)) !== null && _this_execIdRefCount_get !== void 0 ? _this_execIdRefCount_get : 0) + 1);
        this.registry.register(objToRef, execId);
    }
    removeRef(execId) {
        var rc = this.execIdRefCount.get(execId);
        if (rc > 1) {
            this.execIdRefCount.set(execId, rc - 1);
            return;
        }
        this.execIdRefCount.delete(execId);
        this.execIdSetToFire.add(execId);
        if (!this.willFire) {
            this.willFire = true;
            Promise.resolve().then(()=>{
                this.fire();
            });
        }
    }
    fire() {
        (0,_utils_profile_js__rspack_import_1.profile)('JsFunctionLifecycleManager.fire', ()=>{
            lynx.getJSContext().dispatchEvent({
                type: _bindings_events_js__rspack_import_0.WorkletEvents.releaseBackgroundWorkletCtx,
                data: Array.from(this.execIdSetToFire)
            });
            this.execIdSetToFire.clear();
            this.willFire = false;
        });
    }
    constructor(){
        this.execIdRefCount = new Map();
        this.execIdSetToFire = new Set();
        this.retainedObjects = new WeakSet();
        this.willFire = false;
        this.registry = new FinalizationRegistry(this.removeRef.bind(this));
    }
}
function isRunOnBackgroundEnabled() {
    return (0,_utils_version_js__rspack_import_2.isSdkVersionGt)(2, 15);
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/listeners.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initEventListeners: () => (initEventListeners)
});
/* import */ var _bindings_events_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/events.js");
/* import */ var _runOnMainThread_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/runOnMainThread.js");
/* import */ var _workletRef_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRef.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.



function initEventListeners() {
    var jsContext = lynx.getJSContext();
    jsContext.addEventListener(_bindings_events_js__rspack_import_0.WorkletEvents.runWorkletCtx, (event)=>{
        var data = JSON.parse(event.data);
        (0,_runOnMainThread_js__rspack_import_1.runRunOnMainThreadTask)(data.worklet, data.params, data.resolveId);
    });
    jsContext.addEventListener(_bindings_events_js__rspack_import_0.WorkletEvents.releaseWorkletRef, (event)=>{
        (0,_workletRef_js__rspack_import_2.removeValueFromWorkletRefMap)(event.data.id);
    });
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/mainThreadObject.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  assertCompatibleMainThreadObject: () => (assertCompatibleMainThreadObject),
  createMainThreadObject: () => (createMainThreadObject),
  initMainThreadObjects: () => (initMainThreadObjects),
  isRealizedMainThreadObject: () => (isRealizedMainThreadObject),
  registerMainThreadObjectType: () => (registerMainThreadObjectType)
});
var mainThreadObjectDefinitions = new Map();
// The brand belongs to the target, not an individual handle. Other handles or
// captured contexts may still own the target after one ref-map entry is removed.
var realizedMainThreadObjectTypes = new WeakMap();
function registerMainThreadObjectType(type, create) {
    if (type === 'main-thread') throw new Error('MainThreadObject type "main-thread" is reserved for MainThreadRef.');
    var registered = mainThreadObjectDefinitions.get(type);
    if (registered) {
        if (getFactoryRegistrationIdentity(registered.create) !== getFactoryRegistrationIdentity(create)) throw new Error(`Conflicting MainThreadObject registration for type "${type}". A type key must always use the same create function.`);
        return;
    }
    mainThreadObjectDefinitions.set(type, {
        create
    });
}
function getFactoryRegistrationIdentity(factory) {
    if (typeof factory === 'function') return Function.prototype.toString.call(factory);
    return `worklet:${factory._wkltId}`;
}
function resolveFactoryFunction(factory) {
    if (typeof factory === 'function') return factory;
    if (!('_wkltId' in factory) || '_lepusWorkletHash' in factory) throw new Error('Cannot resolve an invalid Main Thread Function.');
    // Factories are capture-free, so they need neither context traversal nor binding.
    // Resolve on first use: the compiler registers worklets after module evaluation.
    return lynxWorkletImpl._workletMap[factory._wkltId];
}
function getMainThreadObjectFactory(definition) {
    var _definition, _resolvedCreate;
    return (_resolvedCreate = (_definition = definition).resolvedCreate) !== null && _resolvedCreate !== void 0 ? _resolvedCreate : _definition.resolvedCreate = resolveFactoryFunction(definition.create);
}
function createMainThreadObject(refImpl) {
    var type = refImpl._type;
    var definition = mainThreadObjectDefinitions.get(type);
    if (!definition) throw new Error(`MainThreadObject type is not registered: "${type}". Define the type in a module evaluated on the main thread before initializing its handle.`);
    var value = getMainThreadObjectFactory(definition)(refImpl._initValue);
    if (typeof value !== 'object' || value === null) throw new Error(`MainThreadObject type "${type}" created a non-object value.`);
    realizedMainThreadObjectTypes.set(value, type);
    return value;
}
function isRealizedMainThreadObject(value) {
    return realizedMainThreadObjectTypes.has(value);
}
function assertCompatibleMainThreadObject(handle, value, operation) {
    var actualType = realizedMainThreadObjectTypes.get(value);
    var expectedType = handle._type;
    if (actualType !== expectedType) throw new Error(`MainThreadObject type mismatch during ${operation} for handle ${handle._wvid}: background handle expects type "${expectedType}", but the main-thread target is type "${actualType}".`);
}
function initMainThreadObjects() {
    mainThreadObjectDefinitions.clear();
    realizedMainThreadObjectTypes = new WeakMap();
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/runOnMainThread.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  runRunOnMainThreadTask: () => (runRunOnMainThreadTask)
});
/* import */ var _bindings_index_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/index.js");
// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

function runRunOnMainThreadTask(task, params, resolveId) {
    var returnValue;
    try {
        returnValue = runWorklet(task, params);
    } finally{
        // TODO: Should be more proper to reject the promise if there is an error.
        lynx.getJSContext().dispatchEvent({
            type: _bindings_index_js__rspack_import_0.WorkletEvents.FunctionCallRet,
            data: JSON.stringify({
                resolveId,
                returnValue
            })
        });
    }
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/mainThreadFlushLoopGuard.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  mainThreadFlushLoopMark: () => (mainThreadFlushLoopMark),
  mainThreadFlushLoopOnFlushMicrotask: () => (mainThreadFlushLoopOnFlushMicrotask),
  mainThreadFlushLoopReport: () => (mainThreadFlushLoopReport),
  mainThreadFlushLoopReset: () => (mainThreadFlushLoopReset)
});
// Copyright 2026 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
var TRACE_LIMIT = 256;
var DEFAULT_FLUSH_LIMIT = 256;
var trace = [];
var flushCountInWindow = 0;
var resetScheduled = false;
var trippedError = null;
function pushTrace(marker) {
    trace.push(marker);
    if (trace.length > TRACE_LIMIT) trace = trace.slice(trace.length - TRACE_LIMIT);
}
function compressTrace(markers) {
    if (markers.length === 0) return '';
    var out = [];
    // Display most-recent-first to make loops easier to read.
    var prev = markers[markers.length - 1];
    var count = 1;
    for(var i = markers.length - 2; i >= 0; i--){
        var cur = markers[i];
        if (cur === prev) {
            count++;
            continue;
        }
        out.push(count === 1 ? prev : `${prev} x${count}`);
        prev = cur;
        count = 1;
    }
    out.push(count === 1 ? prev : `${prev} x${count}`);
    return out.join(' <- ');
}
function mainThreadFlushLoopMark(marker) {
    if (true) pushTrace(marker);
}
function mainThreadFlushLoopOnFlushMicrotask() {
    /* v8 ignore next 1 */ if (false) {}
    if (trippedError) return trippedError;
    if (!resetScheduled) {
        resetScheduled = true;
        setTimeout(()=>{
            mainThreadFlushLoopReset();
        }, 0);
    }
    flushCountInWindow++;
    var limit = DEFAULT_FLUSH_LIMIT;
    if (flushCountInWindow > limit) {
        var traceText = compressTrace(trace);
        trippedError = new Error(`[ReactLynx][DEV] MainThread flush loop detected: render executed ${flushCountInWindow} times without yielding (limit=${limit}). Trace: ${traceText}`);
        return trippedError;
    }
    return null;
}
function mainThreadFlushLoopReport(error) {
    if (true) setTimeout(()=>{
        throw error;
    }, 0);
}
function mainThreadFlushLoopReset() {
    trace = [];
    flushCountInWindow = 0;
    resetScheduled = false;
    trippedError = null;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  profile: () => (profile)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
function profile(sliceName, f) {
    /* v8 ignore next 9 */ // TODO: change it to __PROFILE__
    if (true) {
        var _console_profile, _console;
        (_console_profile = (_console = console).profile) === null || _console_profile === void 0 ? void 0 : _console_profile.call(_console, sliceName);
        try {
            return f();
        } finally{
            var _console_profileEnd, _console1;
            (_console_profileEnd = (_console1 = console).profileEnd) === null || _console_profileEnd === void 0 ? void 0 : _console_profileEnd.call(_console1);
        }
    } else {}
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/version.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  isSdkVersionGt: () => (isSdkVersionGt)
});
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
function isSdkVersionGt(major, minor) {
    var _SystemInfo_lynxSdkVersion;
    var lynxSdkVersion = (_SystemInfo_lynxSdkVersion = SystemInfo.lynxSdkVersion) !== null && _SystemInfo_lynxSdkVersion !== void 0 ? _SystemInfo_lynxSdkVersion : '1.0';
    var version = lynxSdkVersion.split('.');
    return Number(version[0]) > major || Number(version[0]) == major && Number(version[1]) > minor;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRef.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  createWorkletRef: () => (createWorkletRef),
  getFromWorkletRefMap: () => (getFromWorkletRefMap),
  hydrateWorkletValue: () => (hydrateWorkletValue),
  initWorkletRef: () => (initWorkletRef),
  isHydratedWorkletValue: () => (isHydratedWorkletValue),
  removeValueFromWorkletRefMap: () => (removeValueFromWorkletRefMap),
  updateWorkletRefInitValueChanges: () => (updateWorkletRefInitValueChanges)
});
/* import */ var _api_element_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/element.js");
/* import */ var _mainThreadObject_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/mainThreadObject.js");
/* import */ var _utils_mainThreadFlushLoopGuard_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/mainThreadFlushLoopGuard.js");
/* import */ var _utils_profile_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.




var impl;
function initWorkletRef() {
    (0,_mainThreadObject_js__rspack_import_1.initMainThreadObjects)();
    return impl = {
        _workletRefMap: {},
        /**
         * Map of worklet refs that are created during first screen rendering.
         * These refs are created with negative IDs and need to be hydrated
         * when the app starts. The map is cleared after hydration is complete
         * to free up memory.
         */ _firstScreenWorkletRefMap: {},
        updateWorkletRef,
        updateWorkletRefInitValueChanges,
        registerMainThreadObjectType: _mainThreadObject_js__rspack_import_1.registerMainThreadObjectType,
        clearFirstScreenWorkletRefMap
    };
}
var createWorkletRef = (id, value)=>{
    var ref = {
        current: value,
        _wvid: id
    };
    return ref;
};
function createWorkletValue(refImpl) {
    return !refImpl._type || refImpl._type === 'main-thread' ? createWorkletRef(refImpl._wvid, refImpl._initValue) : (0,_mainThreadObject_js__rspack_import_1.createMainThreadObject)(refImpl);
}
function isMutableCell(value) {
    return typeof value === 'object' && value !== null && typeof value._wvid === 'number' && Object.prototype.hasOwnProperty.call(value, 'current');
}
function isHydratedWorkletValue(value) {
    return typeof value === 'object' && value !== null && ((0,_mainThreadObject_js__rspack_import_1.isRealizedMainThreadObject)(value) || isMutableCell(value));
}
function assertCompatibleWorkletValue(handle, value, operation) {
    var actualKind;
    if ((0,_mainThreadObject_js__rspack_import_1.isRealizedMainThreadObject)(value)) actualKind = 'typed-object';
    else if (isMutableCell(value)) actualKind = 'mutable-cell';
    if (!actualKind) throw new Error(`Cannot apply MainThreadObject ${operation} for handle ${handle._wvid}: the existing target has no worklet-value metadata.`);
    var expectedType = handle._type;
    var expectedKind = !expectedType || expectedType === 'main-thread' ? 'mutable-cell' : 'typed-object';
    if (actualKind !== expectedKind) throw new Error(`Worklet value kind mismatch during ${operation} for handle ${handle._wvid}: background handle expects ${expectedKind}, but the main-thread target is ${actualKind}.`);
    if (actualKind === 'typed-object') (0,_mainThreadObject_js__rspack_import_1.assertCompatibleMainThreadObject)(handle, value, operation);
}
var getFromWorkletRefMap = (refImpl)=>{
    var _impl__firstScreenWorkletRefMap, _id, _;
    var id = refImpl._wvid;
    /* v8 ignore next 3 */ if (true) (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_2.mainThreadFlushLoopMark)(`MainThreadRef:get id=${id}`);
    var value;
    if (id < 0) // Might be called in two scenarios:
    // 1. In MTS events
    // 2. In `main-thread:ref`
    value = (_ = (_impl__firstScreenWorkletRefMap = impl._firstScreenWorkletRefMap)[_id = id]) !== null && _ !== void 0 ? _ : _impl__firstScreenWorkletRefMap[_id] = createWorkletValue(refImpl);
    else value = impl._workletRefMap[id];
    /* v8 ignore next 3 */ if ( true && value === undefined) throw new Error('MainThreadRef is not initialized: ' + id);
    return value;
};
function removeValueFromWorkletRefMap(id) {
    delete impl._workletRefMap[id];
}
function hydrateWorkletValue(handle, value) {
    assertCompatibleWorkletValue(handle, value, 'hydration');
    impl._workletRefMap[handle._wvid] = value;
}
/**
 * Create an element instance of the given element node, then set the worklet value to it.
 * This is called in `snapshotContextUpdateWorkletRef`.
 * @param handle handle of the worklet value.
 * @param element the element node.
 */ function updateWorkletRef(handle, element) {
    getFromWorkletRefMap(handle).current = element ? new _api_element_js__rspack_import_0.Element(element) : null;
}
function updateWorkletRefInitValueChanges(patch) {
    (0,_utils_profile_js__rspack_import_3.profile)('updateWorkletRefInitValueChanges', ()=>{
        var firstError;
        var hasError = false;
        patch.forEach(([id, value, type])=>{
            try {
                var handle = {
                    _wvid: id,
                    _initValue: value,
                    _type: type
                };
                var existing = impl._workletRefMap[id];
                if (existing) assertCompatibleWorkletValue(handle, existing, 'initialization patch');
                else impl._workletRefMap[id] = createWorkletValue(handle);
            } catch (error) {
                if (!hasError) {
                    firstError = error;
                    hasError = true;
                }
            }
        });
        if (hasError) throw firstError;
    });
}
function clearFirstScreenWorkletRefMap() {
    impl._firstScreenWorkletRefMap = {};
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRuntime.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  initWorklet: () => (initWorklet)
});
/* import */ var _api_element_js__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/api/element.js");
/* import */ var _bindings_types_js__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/bindings/types.js");
/* import */ var _delayRunOnBackground_js__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/delayRunOnBackground.js");
/* import */ var _delayWorkletEvent_js__rspack_import_3 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/delayWorkletEvent.js");
/* import */ var _eomImpl_js__rspack_import_4 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/eomImpl.js");
/* import */ var _eventPropagation_js__rspack_import_5 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/eventPropagation.js");
/* import */ var _hydrate_js__rspack_import_6 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/hydrate.js");
/* import */ var _jsFunctionLifecycle_js__rspack_import_7 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/jsFunctionLifecycle.js");
/* import */ var _mainThreadObject_js__rspack_import_8 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/mainThreadObject.js");
/* import */ var _runOnMainThread_js__rspack_import_9 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/runOnMainThread.js");
/* import */ var _utils_mainThreadFlushLoopGuard_js__rspack_import_10 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/mainThreadFlushLoopGuard.js");
/* import */ var _utils_profile_js__rspack_import_11 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/utils/profile.js");
/* import */ var _workletRef_js__rspack_import_12 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/workletRef.js");
// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.













function initWorklet() {
    globalThis.lynxWorkletImpl = {
        _workletMap: {},
        _refImpl: (0,_workletRef_js__rspack_import_12.initWorkletRef)(),
        _runOnBackgroundDelayImpl: (0,_delayRunOnBackground_js__rspack_import_2.initRunOnBackgroundDelay)(),
        _hydrateCtx: _hydrate_js__rspack_import_6.hydrateCtx,
        _eventDelayImpl: (0,_delayWorkletEvent_js__rspack_import_3.initEventDelay)(),
        _eomImpl: (0,_eomImpl_js__rspack_import_4.initEomImpl)(),
        _runRunOnMainThreadTask: _runOnMainThread_js__rspack_import_9.runRunOnMainThreadTask
    };
    if ((0,_jsFunctionLifecycle_js__rspack_import_7.isRunOnBackgroundEnabled)()) globalThis.lynxWorkletImpl._jsFunctionLifecycleManager = new _jsFunctionLifecycle_js__rspack_import_7.JsFunctionLifecycleManager();
    globalThis.registerWorklet = registerWorklet;
    globalThis.registerWorkletInternal = registerWorklet;
    globalThis.runWorklet = runWorklet;
}
/**
 * Register a worklet function, allowing it to be executed by `runWorklet()`.
 * This is called in lepus.js.
 * @param _type worklet type, 'main-thread' or 'ui'
 * @param id worklet hash
 * @param worklet worklet function
 */ function registerWorklet(_type, id, worklet) {
    lynxWorkletImpl._workletMap[id] = worklet;
}
/**
 * Entrance of all worklet calls.
 * Native event touch handler will call this function.
 * @param ctx worklet object.
 * @param params worklet params.
 * @param options run worklet options.
 */ function runWorklet(ctx, params, options) {
    if (!validateWorklet(ctx)) return;
    if (true) {
        if ((options === null || options === void 0 ? void 0 : options.source) === _bindings_types_js__rspack_import_1.RunWorkletSource.EVENT && Array.isArray(params)) {
            var first = params[0];
            var t = first.type;
            if (typeof t === 'string') (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_10.mainThreadFlushLoopMark)(`event:${t}`);
        }
        (0,_utils_mainThreadFlushLoopGuard_js__rspack_import_10.mainThreadFlushLoopMark)(`MainThreadFunction id=${String(ctx._wkltId)}`);
    }
    if ('_lepusWorkletHash' in ctx) {
        (0,_delayWorkletEvent_js__rspack_import_3.delayExecUntilJsReady)(ctx._lepusWorkletHash, params);
        return;
    }
    return runWorkletImpl(ctx, params, options);
}
function runWorkletImpl(ctx, params, options) {
    var worklet = (0,_utils_profile_js__rspack_import_11.profile)('transformWorkletCtx ' + ctx._wkltId, ()=>transformWorklet(ctx, true));
    var params_ = (0,_utils_profile_js__rspack_import_11.profile)('transformWorkletParams', ()=>transformWorklet(params || [], false));
    var [hasEventMethods, eventCtx] = (0,_eventPropagation_js__rspack_import_5.addEventMethodsIfNeeded)(params_, options);
    var result = (0,_utils_profile_js__rspack_import_11.profile)('runWorklet', ()=>worklet(...params_));
    if (hasEventMethods) return {
        returnValue: result,
        eventReturnResult: eventCtx._eventReturnResult
    };
    return result;
}
function validateWorklet(ctx) {
    return typeof ctx === 'object' && ctx !== null && ('_wkltId' in ctx || '_lepusWorkletHash' in ctx);
}
var workletCache = /*#__PURE__*/ new WeakMap();
function transformWorklet(ctx, isWorklet) {
    /* v8 ignore next 3 */ if (typeof ctx !== 'object' || ctx === null) return ctx;
    if (isWorklet) {
        var res = workletCache.get(ctx);
        if (res) return res;
    }
    var worklet = transformWorkletInner({
        main: ctx
    }, 0, ctx);
    if (isWorklet) workletCache.set(ctx, worklet.main);
    return worklet.main;
}
var transformWorkletInner = (value, depth, ctx)=>{
    var limit = 1000;
    if (++depth >= limit) throw new Error('Depth of value exceeds limit of ' + limit + '.');
    /* v8 ignore next 3 */ if (typeof value !== 'object' || value === null) return value;
    var obj = value;
    for(var key in obj){
        var subObj = obj[key];
        if (typeof subObj !== 'object' || subObj === null) continue;
        // A MainThreadObject initialization payload is user data. Resolve the
        // typed descriptor before walking it so payload properties that resemble
        // worklet metadata remain untouched. Legacy MainThreadRef descriptors retain
        // the existing recursive path.
        if ((0,_mainThreadObject_js__rspack_import_8.isRealizedMainThreadObject)(subObj)) continue;
        if (isMainThreadObjectDescriptor(subObj)) {
            obj = replaceCapturedProperty(obj, value, key, (0,_workletRef_js__rspack_import_12.getFromWorkletRefMap)(subObj));
            continue;
        }
        if (/** isEventTarget */ 'elementRefptr' in subObj) {
            obj[key] = new _api_element_js__rspack_import_0.Element(subObj.elementRefptr);
            continue;
        } else if (subObj instanceof _api_element_js__rspack_import_0.Element) continue;
        var transformedSubObj = transformWorkletInner(subObj, depth, ctx);
        var isWorkletRef = '_wvid' in subObj;
        if (isWorkletRef) {
            obj[key] = (0,_workletRef_js__rspack_import_12.getFromWorkletRefMap)(subObj);
            continue;
        }
        var isWorklet = '_wkltId' in subObj;
        if (isWorklet) {
            var isRootWorklet = subObj === ctx;
            var boundCtx = {
                ...transformedSubObj
            };
            // Keep the original context collectible. PrimJS traces WeakMap values even
            // when their keys are otherwise unreachable, so the cached function must not point back to its key.
            var boundWorklet = lynxWorkletImpl._workletMap[subObj._wkltId].bind(boundCtx);
            if (transformedSubObj !== subObj && obj === value && obj !== ctx) obj = copyAccessorCapture(obj);
            obj = replaceCapturedProperty(obj, value, key, boundWorklet);
            if (!isRootWorklet) // The original nested context can disappear after its parent replaces it with this function.
            boundWorklet.boundCtx = boundCtx;
            continue;
        }
        if (transformedSubObj !== subObj) {
            // The root context is runtime-owned: hydration must see its captured copy.
            if (obj === value && obj !== ctx) obj = copyAccessorCapture(obj);
            obj = replaceCapturedProperty(obj, value, key, transformedSubObj);
        }
        var isJsFn = '_jsFnId' in subObj;
        if (isJsFn) {
            var _lynxWorkletImpl__jsFunctionLifecycleManager;
            subObj['_execId'] = ctx._execId;
            (_lynxWorkletImpl__jsFunctionLifecycleManager = lynxWorkletImpl._jsFunctionLifecycleManager) === null || _lynxWorkletImpl__jsFunctionLifecycleManager === void 0 ? void 0 : _lynxWorkletImpl__jsFunctionLifecycleManager.addRef(ctx._execId, subObj);
            continue;
        }
    }
    return obj;
};
function replaceCapturedProperty(obj, source, key, value) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get) {
        // Getters can refresh handles or method receivers. Materialize the captured
        // value without consuming the source getter or invoking its setter.
        var capturedDescriptor = {
            value,
            writable: true,
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable
        };
        if (obj === source || !descriptor.configurable) {
            // Replace before defining the copy, including non-configurable getters.
            var descriptors = Object.getOwnPropertyDescriptors(obj);
            descriptors[key] = capturedDescriptor;
            return copyAccessorCapture(obj, descriptors);
        }
        Object.defineProperty(obj, key, capturedDescriptor);
    } else obj[key] = value;
    return obj;
}
function copyAccessorCapture(obj, descriptors = Object.getOwnPropertyDescriptors(obj)) {
    // Copy descriptors without evaluating getters a second time. Array ancestors
    // retain their array identity when a nested accessor requires a captured copy.
    return Object.defineProperties(Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj)), descriptors);
}
function isMainThreadObjectDescriptor(value) {
    var descriptor = value;
    return typeof descriptor._wvid === 'number' && typeof descriptor._type === 'string' && descriptor._type !== 'main-thread';
}

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/preact/compat/dist/compat.mjs"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Children: () => (Children),
  Component: () => (/* reexport safe */ preact__rspack_import_0.Component),
  Fragment: () => (/* reexport safe */ preact__rspack_import_0.Fragment),
  PureComponent: () => (PureComponent),
  StrictMode: () => (/* reexport safe */ preact__rspack_import_0.Fragment),
  Suspense: () => (Suspense),
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => (__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED),
  cloneElement: () => (cloneElement),
  createContext: () => (/* reexport safe */ preact__rspack_import_0.createContext),
  createElement: () => (/* reexport safe */ preact__rspack_import_0.createElement),
  createFactory: () => (createFactory),
  createPortal: () => (createPortal),
  createRef: () => (/* reexport safe */ preact__rspack_import_0.createRef),
  "default": () => (index),
  findDOMNode: () => (findDOMNode),
  flushSync: () => (flushSync),
  forwardRef: () => (forwardRef),
  hydrate: () => (hydrate),
  installMainThreadHooks: () => (/* reexport safe */ preact_hooks__rspack_import_1.installMainThreadHooks),
  isElement: () => (isElement),
  isFragment: () => (isFragment),
  isMemo: () => (isMemo),
  isValidElement: () => (isValidElement),
  lazy: () => (lazy),
  memo: () => (memo),
  render: () => (render),
  startTransition: () => (startTransition),
  unmountComponentAtNode: () => (unmountComponentAtNode),
  unstable_batchedUpdates: () => (unstable_batchedUpdates),
  use: () => (use),
  useCallback: () => (/* reexport safe */ preact_hooks__rspack_import_1.useCallback),
  useContext: () => (/* reexport safe */ preact_hooks__rspack_import_1.useContext),
  useDebugValue: () => (/* reexport safe */ preact_hooks__rspack_import_1.useDebugValue),
  useDeferredValue: () => (useDeferredValue),
  useEffect: () => (/* reexport safe */ preact_hooks__rspack_import_1.useEffect),
  useEffectEvent: () => (useEffectEvent),
  useErrorBoundary: () => (/* reexport safe */ preact_hooks__rspack_import_1.useErrorBoundary),
  useId: () => (/* reexport safe */ preact_hooks__rspack_import_1.useId),
  useImperativeHandle: () => (/* reexport safe */ preact_hooks__rspack_import_1.useImperativeHandle),
  useInsertionEffect: () => (useInsertionEffect),
  useLayoutEffect: () => (/* reexport safe */ preact_hooks__rspack_import_1.useLayoutEffect),
  useMemo: () => (/* reexport safe */ preact_hooks__rspack_import_1.useMemo),
  useReducer: () => (/* reexport safe */ preact_hooks__rspack_import_1.useReducer),
  useRef: () => (/* reexport safe */ preact_hooks__rspack_import_1.useRef),
  useState: () => (/* reexport safe */ preact_hooks__rspack_import_1.useState),
  useSyncExternalStore: () => (useSyncExternalStore),
  useTransition: () => (useTransition),
  version: () => (version)
});
/* import */ var preact__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/preact/dist/preact.mjs");
/* import */ var preact_hooks__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/core/hooks/mainThread.js");




var mapFn = function mapFn(children, fn, context) {
    if (children == null) return null;
    return (0,preact__rspack_import_0.toChildArray)((0,preact__rspack_import_0.toChildArray)(children).map(fn.bind(context)));
};
// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
    map: mapFn,
    forEach: mapFn,
    count: function count(children) {
        return children ? (0,preact__rspack_import_0.toChildArray)(children).length : 0;
    },
    only: function only(children) {
        var normalized = (0,preact__rspack_import_0.toChildArray)(children);
        if (normalized.length != 1) throw 'Children.only';
        return normalized[0];
    },
    toArray: preact__rspack_import_0.toChildArray
};
var assign = Object.assign;
/**
 * Check if two objects have a different shape
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */ function shallowDiffers(a, b) {
    for(var i in a)if (i != '__source' && a[i] !== b[i]) return true;
    for(var _i in b)if (_i != '__source' && !(_i in a)) return true;
    return false;
}
/**
 * Component class with a predefined `shouldComponentUpdate` implementation
 */ var PureComponent = /*#__PURE__*/ function() {
    function _PureComponent(p, c) {
        this.props = p;
        this.context = c;
    }
    _PureComponent.prototype = new preact__rspack_import_0.Component();
    // Some third-party libraries check if this property is present
    _PureComponent.prototype.isPureReactComponent = true;
    _PureComponent.prototype.shouldComponentUpdate = function(props, state) {
        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
    };
    return _PureComponent;
}();
var REACT_FORWARD_SYMBOL = Symbol.for('react.forward_ref');
/**
 * Pass ref down to a child. This is mainly used in libraries with HOCs that
 * wrap components. Using `forwardRef` there is an easy way to get a reference
 * of the wrapped component instead of one of the wrapper itself.
 * @param {import('./index').ForwardRefRenderFunction} fn
 * @returns {import('./internal').FunctionComponent}
 */ function forwardRef(fn) {
    function Forwarded(props) {
        var clone = assign({}, props);
        delete clone.ref;
        return fn(clone, props.ref || null);
    }
    // mobx-react checks for this being present
    Forwarded.$$typeof = REACT_FORWARD_SYMBOL;
    // mobx-react heavily relies on implementation details.
    // It expects an object here with a `render` property,
    // and prototype.render will fail. Without this
    // mobx-react throws.
    Forwarded.render = fn;
    Forwarded.prototype.isReactComponent = true;
    Forwarded.displayName = 'ForwardRef(' + (fn.displayName || fn.name) + ')';
    return Forwarded;
}
function startTransition(cb) {
    cb();
}
function useDeferredValue(val) {
    return val;
}
function useTransition() {
    return [
        false,
        startTransition
    ];
}
// TODO: in theory this should be done after a VNode is diffed as we want to insert
// styles/... before it attaches
var useInsertionEffect = preact_hooks__rspack_import_1.useLayoutEffect;
/**
 * @template {Function} T
 * @param {T} callback
 * @returns {T}
 */ function useEffectEvent(callback) {
    var ref = (0,preact_hooks__rspack_import_1.useRef)(callback);
    ref.current = callback;
    return /** @type {T} */ function() {
        return ref.current.apply(undefined, arguments);
    };
}
/**
 * Memoize a component, so that it only updates when the props actually have
 * changed. This was previously known as `React.pure`.
 * @param {import('./internal').FunctionComponent} c functional component
 * @param {(prev: object, next: object) => boolean} [comparer] Custom equality function
 * @returns {import('./internal').FunctionComponent}
 */ function memo(c, comparer) {
    function shouldUpdate(nextProps) {
        var ref = this.props.ref;
        if (ref != nextProps.ref && ref) typeof ref == 'function' ? ref(null) : ref.current = null;
        return comparer ? !comparer(this.props, nextProps) || ref != nextProps.ref : shallowDiffers(this.props, nextProps);
    }
    function Memoed(props) {
        this.shouldComponentUpdate = shouldUpdate;
        return (0,preact__rspack_import_0.createElement)(c, props);
    }
    Memoed.displayName = 'Memo(' + (c.displayName || c.name) + ')';
    Memoed.prototype.isReactComponent = true;
    Memoed.type = c;
    return Memoed;
}
/**
 * Create a `Portal` to continue rendering the vnode tree at a different DOM node
 * @param {import('./internal').VNode} vnode The vnode to render
 * @param {import('./internal').PreactElement} container The DOM node to continue rendering in to.
 */ function createPortal(vnode, container) {
    var el = (0,preact__rspack_import_0.createPortal)(vnode, container);
    el.containerInfo = container;
    return el;
}
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var MODE_HYDRATE$1 = 32;
var currentComponent, hydrationRoot, renderTrackingInitialized;
/**
 * This is taken from https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js#L84
 * on a high level this cuts out the warnings, ... and attempts a smaller implementation
 * @typedef {{ _value: any; _getSnapshot: () => any }} Store
 */ var useSyncExternalStore = /* @__PURE__ */ initRenderTracking(function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
    var serverRendering = preact__rspack_import_0.options.__s || hydrationRoot;
    var value = serverRendering ? (getServerSnapshot || getSnapshot)() : getSnapshot();
    /**
   * @typedef {{ _instance: Store }} StoreRef
   * @type {[StoreRef, (store: StoreRef) => void]}
   */ var _useState = (0,preact_hooks__rspack_import_1.useState)({
        _instance: {
            __: value,
            _getSnapshot: getSnapshot
        }
    }), _instance = _useState[0]._instance, forceUpdate = _useState[1];
    return value;
});
// Some libraries like `react-virtualized` explicitly check for this.
preact__rspack_import_0.Component.prototype.isReactComponent = true;
// `UNSAFE_*` lifecycle hooks
// Preact only ever invokes the unprefixed methods.
// Here we provide a base "fallback" implementation that calls any defined UNSAFE_ prefixed method.
// - If a component defines its own `componentDidMount()` (including via defineProperty), use that.
// - If a component defines `UNSAFE_componentDidMount()`, `componentDidMount` is the alias getter/setter.
// - If anything assigns to an `UNSAFE_*` property, the assignment is forwarded to the unprefixed property.
// See https://github.com/preactjs/preact/issues/1941
[
    'componentWillMount',
    'componentWillReceiveProps',
    'componentWillUpdate'
].forEach(function(key) {
    Object.defineProperty(preact__rspack_import_0.Component.prototype, key, {
        configurable: true,
        get: function get() {
            return this['UNSAFE_' + key];
        },
        set: function set(v) {
            Object.defineProperty(this, key, {
                configurable: true,
                writable: true,
                value: v
            });
        }
    });
});
/**
 * Proxy render() since React returns a Component reference.
 * @param {import('./internal').VNode} vnode VNode tree to render
 * @param {import('./internal').PreactElement} parent DOM node to render vnode tree into
 * @param {() => void} [callback] Optional callback that will be called after rendering
 * @returns {import('./internal').Component | null} The root component reference or null
 */ function render(vnode, parent, callback) {
    // React destroys any existing DOM nodes, see #1727
    // ...but only on the first render, see #1828
    if (parent.__k == null) parent.textContent = '';
    (0,preact__rspack_import_0.render)(vnode, parent);
    if (typeof callback == 'function') callback();
    return vnode ? vnode.__c : null;
}
function hydrate(vnode, parent, callback) {
    (0,preact__rspack_import_0.hydrate)(vnode, parent);
    if (typeof callback == 'function') callback();
    return vnode ? vnode.__c : null;
}
var oldEventHook = preact__rspack_import_0.options.event;
preact__rspack_import_0.options.event = function(e) {
    if (oldEventHook) e = oldEventHook(e);
    e.persist = function() {};
    e.isPropagationStopped = function isPropagationStopped() {
        return this.cancelBubble;
    };
    e.isDefaultPrevented = function isDefaultPrevented() {
        return this.defaultPrevented;
    };
    return e.nativeEvent = e;
};
var oldVNodeHook = preact__rspack_import_0.options.vnode;
preact__rspack_import_0.options.vnode = function(vnode) {
    // Lynx fork: DOM prop normalization (handleDomVNode: className, style px,
    // onchange→oninput, select value, ...) is removed — host element props pass
    // through untouched. Only function-component normalization remains.
    if (typeof vnode.type == 'function') {
        var shouldApplyRef = 'prototype' in vnode.type && vnode.type.prototype.render;
        if ('ref' in vnode.props && shouldApplyRef) {
            vnode.ref = vnode.props.ref;
            delete vnode.props.ref;
        }
        if (vnode.type.defaultProps) {
            var normalizedProps = assign({}, vnode.props);
            for(var i in vnode.type.defaultProps)if (normalizedProps[i] === undefined) normalizedProps[i] = vnode.type.defaultProps[i];
            vnode.props = normalizedProps;
        }
    }
    vnode.$$typeof = REACT_ELEMENT_TYPE;
    if (oldVNodeHook) oldVNodeHook(vnode);
};
// Only needed for react-relay and useSyncExternalStore hydration.
function initRenderTracking(value) {
    if (!renderTrackingInitialized) {
        renderTrackingInitialized = true;
        var oldBeforeRender = preact__rspack_import_0.options.__r;
        preact__rspack_import_0.options.__r = function(vnode) {
            if (oldBeforeRender) oldBeforeRender(vnode);
            if (vnode.__u & MODE_HYDRATE$1) hydrationRoot = vnode;
            currentComponent = vnode.__c;
        };
        var oldDiffed = preact__rspack_import_0.options.diffed;
        preact__rspack_import_0.options.diffed = function(vnode) {
            if (oldDiffed) oldDiffed(vnode);
            currentComponent = null;
            if (hydrationRoot == vnode) hydrationRoot = null;
        };
    }
    return value;
}
/**
 * Read the value of a Promise (suspending while pending) or a Context.
 * Unlike other hooks, `use` may be called conditionally.
 * @template T
 * @param {(Promise<T> & { status?: string, value?: T, reason?: any }) | import('../../src/internal').PreactContext} resource
 * @returns {T}
 */ var use = /* @__PURE__ */ initRenderTracking(function use(resource) {
    // A Context is a function without a `then`, a thenable has one.
    if (resource.then) {
        if (resource.status == 'fulfilled') return resource.value;
        if (resource.status == 'rejected') throw resource.reason;
        if (!resource.status) {
            resource.status = 'pending';
            resource.then(function(value) {
                resource.status = 'fulfilled';
                resource.value = value;
            }, function(reason) {
                resource.status = 'rejected';
                resource.reason = reason;
            });
        }
        throw resource;
    }
    var id = resource.__c;
    var provider = currentComponent.__n[id];
    if (!provider) return resource.__;
    // `use` runs on every render without hook state, while `provider.sub`
    // wraps `componentWillUnmount` on each call — mark the component so we
    // only subscribe it once.
    if (!currentComponent[id]) {
        currentComponent[id] = true;
        provider.sub(currentComponent);
    }
    return provider.props.value;
});
// This is a very very private internal function for React it
// is used to sort-of do runtime dependency injection.
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    ReactCurrentDispatcher: {
        current: {
            readContext: use,
            useCallback: preact_hooks__rspack_import_1.useCallback,
            useContext: preact_hooks__rspack_import_1.useContext,
            useDebugValue: preact_hooks__rspack_import_1.useDebugValue,
            useDeferredValue: useDeferredValue,
            useEffect: preact_hooks__rspack_import_1.useEffect,
            useId: preact_hooks__rspack_import_1.useId,
            useImperativeHandle: preact_hooks__rspack_import_1.useImperativeHandle,
            useInsertionEffect: useInsertionEffect,
            useLayoutEffect: preact_hooks__rspack_import_1.useLayoutEffect,
            useMemo: preact_hooks__rspack_import_1.useMemo,
            // useMutableSource, // experimental-only and replaced by uSES, likely not worth supporting
            useReducer: preact_hooks__rspack_import_1.useReducer,
            useRef: preact_hooks__rspack_import_1.useRef,
            useState: preact_hooks__rspack_import_1.useState,
            useSyncExternalStore: useSyncExternalStore,
            useTransition: useTransition
        }
    }
};
// Vnode._flags
/** Normal hydration that attaches to a DOM tree but does not diff it. */ var MODE_HYDRATE = 32;
/** Indicates that this vnode has been unmounted before indicating the loss of event listeners */ var FORCE_PROPS_REVALIDATE = 1;
/** Component should force update (skip shouldComponentUpdate) */ var COMPONENT_FORCE = 4;
var UNDEFINED = undefined;
function initSuspenseHooks() {
    var oldCatchError = preact__rspack_import_0.options.__e;
    preact__rspack_import_0.options.__e = function(error, newVNode, oldVNode, errorInfo) {
        if (error.then) {
            /** @type {import('./internal').Component} */ var component;
            var vnode = newVNode;
            while(vnode = vnode.__)if ((component = vnode.__c) && component.__c) {
                if (newVNode.__e == null) {
                    newVNode.__e = oldVNode.__e;
                    newVNode.__k = oldVNode.__k || [];
                }
                // Don't call oldCatchError if we found a Suspense
                return component.__c(error, newVNode);
            }
        }
        oldCatchError(error, newVNode, oldVNode, errorInfo);
    };
    var oldUnmount = preact__rspack_import_0.options.unmount;
    preact__rspack_import_0.options.unmount = function(vnode) {
        /** @type {import('./internal').Component} */ var component = vnode.__c;
        if (component) component.__z = true;
        if (component && component.__R) component.__R();
        if (oldUnmount) oldUnmount(vnode);
    };
}
function detachedClone(vnode, detachedParent, parentDom) {
    if (vnode) {
        if (vnode.__c && vnode.__c.__H) {
            vnode.__c.__H.__.forEach(function(effect) {
                if (typeof effect.__c == 'function') effect.__c();
            });
            vnode.__c.__H = null;
        }
        vnode = assign({
            constructor: UNDEFINED
        }, vnode);
        if (vnode.__c != null) {
            if (vnode.__c.__P == parentDom) vnode.__c.__P = detachedParent;
            vnode.__c.__g |= COMPONENT_FORCE;
            vnode.__c = null;
        }
        vnode.__k = vnode.__k && vnode.__k.map(function(child) {
            return detachedClone(child, detachedParent, parentDom);
        });
    }
    return vnode;
}
function removeOriginal(vnode, detachedParent, originalParent) {
    if (vnode && originalParent) {
        if (typeof vnode.type == 'string') vnode.__u |= FORCE_PROPS_REVALIDATE;
        vnode.__v = null;
        vnode.__k = vnode.__k && vnode.__k.map(function(child) {
            return removeOriginal(child, detachedParent, originalParent);
        });
        if (vnode.__c) {
            if (vnode.__c.__P == detachedParent) {
                if (vnode.__e) originalParent.appendChild(vnode.__e);
                vnode.__c.__g |= COMPONENT_FORCE;
                vnode.__c.__P = originalParent;
            }
        }
    }
    return vnode;
}
// having custom inheritance instead of a class here saves a lot of bytes
function createSuspense() {
    initSuspenseHooks();
    function Suspense() {
        // we do not call super here to golf some bytes...
        this.__u = 0;
        this._suspenders = null;
        this.__b = null;
    }
    // Things we do here to save some bytes but are not proper JS inheritance:
    // - call `new Component()` as the prototype
    // - do not set `Suspense.prototype.constructor` to `Suspense`
    Suspense.prototype = new preact__rspack_import_0.Component();
    /**
   * @this {import('./internal').SuspenseComponent}
   * @param {Promise} promise The thrown promise
   * @param {import('./internal').VNode<any, any>} suspendingVNode The suspending component
   */ Suspense.prototype.__c = function(promise, suspendingVNode) {
        var _this = this;
        var suspendingComponent = suspendingVNode.__c;
        if (this._suspenders == null) this._suspenders = [];
        this._suspenders.push(suspendingComponent);
        var resolved = false;
        var onResolved = function onResolved() {
            if (resolved || _this.__z) return;
            resolved = true;
            suspendingComponent.__R = null;
            onSuspensionComplete();
        };
        suspendingComponent.__R = onResolved;
        // Store and null _parentDom to prevent setState/forceUpdate from
        // scheduling renders while suspended. Render would be a no-op anyway
        // since renderComponent checks _parentDom, but this avoids queue churn.
        var originalParentDom = suspendingComponent.__P;
        suspendingComponent.__P = null;
        var onSuspensionComplete = function onSuspensionComplete() {
            if (!--_this.__u) {
                // If the suspension was during hydration we don't need to restore the
                // suspended children into the _children array
                if (_this.state.__a) {
                    var suspendedVNode = _this.state.__a;
                    _this.__v.__k[0] = removeOriginal(suspendedVNode, suspendedVNode.__c.__P, suspendedVNode.__c.__O);
                }
                _this.setState({
                    __a: _this.__b = null
                });
                var suspended;
                while(suspended = _this._suspenders.pop()){
                    // Restore _parentDom before forceUpdate so render can proceed
                    suspended.__P = originalParentDom;
                    suspended.forceUpdate();
                }
            }
        };
        /**
     * We do not set `suspended: true` during hydration because we want the actual markup
     * to remain on screen and hydrate it when the suspense actually gets resolved.
     * While in non-hydration cases the usual fallback -> component flow would occour.
     */ if (!this.__u++ && !(suspendingVNode.__u & MODE_HYDRATE)) this.setState({
            __a: this.__b = this.__v.__k[0]
        });
        promise.then(onResolved, onResolved);
    };
    Suspense.prototype.componentWillUnmount = function() {
        this._suspenders = [];
    };
    /**
   * @this {import('./internal').SuspenseComponent}
   * @param {import('./internal').SuspenseComponent["props"]} props
   * @param {import('./internal').SuspenseState} state
   */ Suspense.prototype.render = function(props, state) {
        if (this.__b) {
            // When the Suspense's _vnode was created by a call to createVNode
            // (i.e. due to a setState further up in the tree)
            // it's _children prop is null, in this case we "forget" about the parked vnodes to detach
            if (this.__v.__k) {
                var detachedParent = preact__rspack_import_0.options.document.createElement('div');
                var detachedComponent = this.__v.__k[0].__c;
                this.__v.__k[0] = detachedClone(this.__b, detachedParent, detachedComponent.__O = detachedComponent.__P);
            }
            this.__b = null;
        }
        return [
            (0,preact__rspack_import_0.createElement)(preact__rspack_import_0.Fragment, null, state.__a ? null : props.children),
            state.__a && (0,preact__rspack_import_0.createElement)(preact__rspack_import_0.Fragment, null, props.fallback)
        ];
    };
    return Suspense;
}
var Suspense = /* @__PURE__ */ createSuspense();
function lazy(loader) {
    var prom;
    var component = null;
    var error;
    var resolved;
    function Lazy(props) {
        if (!prom) {
            prom = loader();
            prom.then(function(exports) {
                if (exports) component = exports.default || exports;
                resolved = true;
            }, function(e) {
                error = e;
                resolved = true;
            });
        }
        if (error) throw error;
        if (!resolved) throw prom;
        return component ? (0,preact__rspack_import_0.createElement)(component, props) : null;
    }
    Lazy.displayName = 'Lazy';
    return Lazy;
}
var version = '19.0.0'; // trick libraries to think we are react
/**
 * Legacy version of createElement.
 * @param {import('./internal').VNode["type"]} type The node name or Component constructor
 */ function createFactory(type) {
    return preact__rspack_import_0.createElement.bind(null, type);
}
/**
 * Check if the passed element is a valid (p)react node.
 * @param {*} element The element to check
 * @returns {boolean}
 */ function isValidElement(element) {
    return !!element && element.$$typeof === REACT_ELEMENT_TYPE;
}
/**
 * Check if the passed element is a Fragment node.
 * @param {*} element The element to check
 * @returns {boolean}
 */ function isFragment(element) {
    return isValidElement(element) && element.type == preact__rspack_import_0.Fragment;
}
/**
 * Check if the passed element is a Memo node.
 * @param {*} element The element to check
 * @returns {boolean}
 */ function isMemo(element) {
    return !!element && typeof element.displayName == 'string' && element.displayName.indexOf('Memo(') == 0;
}
/**
 * Wrap `cloneElement` to abort if the passed element is not a valid element and apply
 * all vnode normalizations.
 * @param {import('./internal').VNode} element The vnode to clone
 * @param {object} props Props to add when cloning
 * @param {Array<import('./internal').ComponentChildren>} rest Optional component children
 */ function cloneElement(element) {
    if (!isValidElement(element)) return element;
    return preact__rspack_import_0.cloneElement.apply(null, arguments);
}
/**
 * Remove a component tree from the DOM, including state and event handlers.
 * @param {import('./internal').PreactElement} container
 * @returns {boolean}
 */ function unmountComponentAtNode(container) {
    if (container.__k) {
        (0,preact__rspack_import_0.render)(null, container);
        return true;
    }
    return false;
}
/**
 * Get the matching DOM node for a component
 * @param {import('./internal').Component} component
 * @returns {import('./internal').PreactElement | null}
 */ function findDOMNode(component) {
    return component && (component.__v && component.__v.__e || component.nodeType == 1 && component) || null;
}
/**
 * In React, `flushSync` flushes the entire tree and forces a rerender.
 * @template Arg
 * @template Result
 * @param {(arg: Arg) => Result} callback function that runs before the flush
 * @param {Arg} [arg] Optional argument that can be passed to the callback
 * @returns
 */ var flushSync = function flushSync(callback, arg) {
    var prevDebounce = preact__rspack_import_0.options.debounceRendering;
    // Capture the scheduled render callback so that all updates performed
    // inside the user callback are batched into a single synchronous commit
    // instead of every state setter rendering independently.
    var flush;
    preact__rspack_import_0.options.debounceRendering = function(cb) {
        flush = cb;
    };
    try {
        var res = callback(arg);
        if (flush) flush();
        return res;
    } finally{
        preact__rspack_import_0.options.debounceRendering = prevDebounce;
    }
};
/**
 * In React, `unstable_batchedUpdates` is a legacy feature that was made a no-op
 * outside of legacy mode in React 18 and a no-op across the board in React 19.
 * @template Arg
 * @template Result
 * @param {(arg: Arg) => Result} callback
 * @param {Arg} [arg]
 * @returns {Result}
 */ function unstable_batchedUpdates(callback, arg) {
    return callback(arg);
}
// compat to react-is
var isElement = isValidElement;
// React copies the named exports to the default one.
var index = {
    useState: preact_hooks__rspack_import_1.useState,
    useId: preact_hooks__rspack_import_1.useId,
    useReducer: preact_hooks__rspack_import_1.useReducer,
    useEffect: preact_hooks__rspack_import_1.useEffect,
    useLayoutEffect: preact_hooks__rspack_import_1.useLayoutEffect,
    useInsertionEffect: useInsertionEffect,
    useTransition: useTransition,
    useDeferredValue: useDeferredValue,
    useSyncExternalStore: useSyncExternalStore,
    useEffectEvent: useEffectEvent,
    startTransition: startTransition,
    useRef: preact_hooks__rspack_import_1.useRef,
    useImperativeHandle: preact_hooks__rspack_import_1.useImperativeHandle,
    useMemo: preact_hooks__rspack_import_1.useMemo,
    useCallback: preact_hooks__rspack_import_1.useCallback,
    useContext: preact_hooks__rspack_import_1.useContext,
    use: use,
    useDebugValue: preact_hooks__rspack_import_1.useDebugValue,
    version: version,
    Children: Children,
    render: render,
    hydrate: hydrate,
    unmountComponentAtNode: unmountComponentAtNode,
    createPortal: createPortal,
    createElement: preact__rspack_import_0.createElement,
    createContext: preact__rspack_import_0.createContext,
    createFactory: createFactory,
    cloneElement: cloneElement,
    createRef: preact__rspack_import_0.createRef,
    Fragment: preact__rspack_import_0.Fragment,
    isValidElement: isValidElement,
    isElement: isElement,
    isFragment: isFragment,
    isMemo: isMemo,
    findDOMNode: findDOMNode,
    Component: preact__rspack_import_0.Component,
    PureComponent: PureComponent,
    memo: memo,
    forwardRef: forwardRef,
    flushSync: flushSync,
    unstable_batchedUpdates: unstable_batchedUpdates,
    StrictMode: preact__rspack_import_0.Fragment,
    Suspense: Suspense,
    lazy: lazy,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
};
 //# sourceMappingURL=compat.mjs.map
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./node_modules/preact/dist/preact.mjs"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Component: () => (BaseComponent),
  Fragment: () => (Fragment),
  cloneElement: () => (cloneElement),
  createContext: () => (createContext),
  createElement: () => (createElement),
  createPortal: () => (createPortal),
  createRef: () => (createRef),
  h: () => (createElement),
  hydrate: () => (hydrate),
  isValidElement: () => (isValidElement),
  options: () => (options),
  process: () => (process),
  render: () => (render),
  toChildArray: () => (toChildArray)
});
// Vnode._flags
/** Normal hydration that attaches to a DOM tree but does not diff it. */ // component._bits
/** Component is processing an exception */ var COMPONENT_PROCESSING_EXCEPTION = 1;
/** Component has a pending error */ var COMPONENT_PENDING_ERROR = 2;
/** Component should force update (skip shouldComponentUpdate) */ var COMPONENT_FORCE = 4;
/** Component is queued for update */ var COMPONENT_DIRTY = 8;
var NULL = null;
var UNDEFINED = undefined;
var EMPTY_ARR = [];
// `typeof x < 'u'` is `!= 'undefined'`: every other typeof result sorts
// before "u", while "undefined" sorts after it.
typeof Element < 'u' && Element.prototype;
var isArray = Array.isArray;
var slice = EMPTY_ARR.slice;
var assign = Object.assign;
/**
 * Find the closest error boundary to a thrown error and call it
 * @param {object} error The thrown value
 * @param {import('../internal').VNode} vnode The vnode that threw the error that was caught (except
 * for unmounting when this parameter is the highest parent that was being
 * unmounted)
 * @param {import('../internal').VNode} [oldVNode]
 * @param {import('../internal').ErrorInfo} [errorInfo]
 */ function _catchError(error, vnode, oldVNode, errorInfo) {
    /** @type {import('../internal').Component} */ var component, /** @type {import('../internal').ComponentType} */ ctor, /** @type {number} */ handled;
    for(; vnode = vnode.__;)if ((component = vnode.__c) && !(component.__g & COMPONENT_PROCESSING_EXCEPTION)) {
        component.__g |= COMPONENT_FORCE;
        try {
            ctor = component.constructor;
            if (ctor && ctor.getDerivedStateFromError) {
                component.setState(ctor.getDerivedStateFromError(error));
                handled = component.__g & COMPONENT_DIRTY;
            }
            if (component.componentDidCatch) {
                component.componentDidCatch(error, errorInfo || {});
                handled = component.__g & COMPONENT_DIRTY;
            }
            // This is an error boundary. Mark it as having bailed out, and whether it was mid-hydration.
            if (handled) {
                component.__g |= COMPONENT_PENDING_ERROR;
                return;
            }
        } catch (e) {
            error = e;
        }
    }
    // Reset rerender count to 0, so that the next render will not be skipped
    // when we leverage prefresh
    resetRenderCount();
    throw error;
}
/**
 * The `option` object can potentially contain callback functions
 * that are called during various stages of our renderer. This is the
 * foundation on which all our addons like `preact/debug`, `preact/compat`,
 * and `preact/hooks` are based on. See the `Options` type in `internal.d.ts`
 * for a full list of available option hooks (most editors/IDEs allow you to
 * ctrl+click or cmd+click on mac the type definition below).
 * @type {import('./internal').Options}
 */ var options = {
    __e: _catchError
};
var vnodeId = 0;
/**
 * Create an virtual node (used for JSX)
 * @param {import('./internal').VNode["type"]} type The node name or Component constructor for this
 * virtual node
 * @param {object | null | undefined} [props] The properties of the virtual node
 * @param {Array<import('.').ComponentChildren>} [children] The children of the
 * virtual node
 * @returns {import('./internal').VNode}
 */ function createElement(type, props, children) {
    var normalizedProps = {}, key, ref, i, length = arguments.length;
    for(i in props){
        if (i == 'key') key = props[i];
        else if (i == 'ref' && typeof type != 'function') ref = props[i];
        else normalizedProps[i] = props[i];
    }
    if (length > 2) normalizedProps.children = length > 3 ? slice.call(arguments, 2) : children;
    return createVNode(type, normalizedProps, key, ref, NULL);
}
/**
 * Clones the given VNode, optionally adding attributes/props and replacing its
 * children.
 * @param {import('./internal').VNode} vnode The virtual DOM element to clone
 * @param {object} props Attributes/props to add when cloning
 * @param {Array<import('./internal').ComponentChildren>} children Any additional arguments will be used
 * as replacement children.
 * @returns {import('./internal').VNode}
 */ function cloneElement(vnode, props, children) {
    var normalizedProps = assign({}, vnode.props), key, ref, i, length = arguments.length;
    for(i in props){
        if (i == 'key') key = props[i];
        else if (i == 'ref' && typeof vnode.type != 'function') ref = props[i];
        else normalizedProps[i] = props[i];
    }
    if (length > 2) normalizedProps.children = length > 3 ? slice.call(arguments, 2) : children;
    return createVNode(vnode.type, normalizedProps, key !== UNDEFINED ? key : vnode.key, ref !== UNDEFINED ? ref : vnode.ref, NULL);
}
/**
 * Create a VNode (used internally by Preact)
 * @param {import('./internal').VNode["type"]} type The node name or Component
 * Constructor for this virtual node
 * @param {object | string | number | null} props The properties of this virtual node.
 * If this virtual node represents a text node, this is the text of the node (string or number).
 * @param {string | number | null} key The key for this virtual node, used when
 * diffing it against its children
 * @param {import('./internal').VNode["ref"]} ref The ref property that will
 * receive a reference to its created child
 * @returns {import('./internal').VNode}
 */ function createVNode(type, props, key, ref, original) {
    // V8 seems to be better at detecting type shapes if the object is allocated from the same call site
    // Do not inline into createElement and coerceToVNode!
    /** @type {import('./internal').VNode} */ var vnode = {
        type: type,
        props: props,
        key: key,
        ref: ref,
        __k: NULL,
        __: NULL,
        __b: 0,
        __e: NULL,
        __c: NULL,
        constructor: UNDEFINED,
        __v: original || ++vnodeId,
        __i: -1,
        __u: 0
    };
    // Only invoke the vnode hook if this was *not* a direct copy:
    if (!original && options.vnode) options.vnode(vnode);
    return vnode;
}
function createRef() {
    return {
        current: NULL
    };
}
function Fragment(props) {
    return props.children;
}
/**
 * Check if a the argument is a valid Preact VNode.
 * @param {*} vnode
 * @returns {vnode is VNode}
 */ var isValidElement = function isValidElement(vnode) {
    return vnode != NULL && vnode.constructor === UNDEFINED;
};
/**
 * Base Component class. Provides `setState()` and `forceUpdate()`, which
 * trigger rendering
 * @param {object} props The initial component props
 * @param {object} context The initial context from parent components'
 * getChildContext
 */ function BaseComponent(props, context) {
    this.props = props;
    this.context = context;
    this.__g = 0;
}
/**
 * Update component state and schedule a re-render.
 * @this {import('./internal').Component}
 * @param {object | ((s: object, p: object) => object)} update A hash of state
 * properties to update with new values or a function that given the current
 * state and props returns a new partial state
 * @param {() => void} [callback] A function to be called once component state is
 * updated
 */ BaseComponent.prototype.setState = function(update, callback) {
    // only clone state when copying to nextState the first time.
    var s = this.__s;
    if (!s || s == this.state) s = this.__s = assign({}, this.state);
    if (typeof update == 'function') // preventing us from mutating it, so we need to clone it. See #2716
    update = update(assign({}, s), this.props);
    if (update) assign(s, update);
    else return;
    if (this.__v) {
        if (callback) this.__k.push(callback);
        enqueueRender(this);
    }
};
/**
 * Immediately perform a synchronous re-render of the component
 * @this {import('./internal').Component}
 * @param {() => void} [callback] A function to be called after component is
 * re-rendered
 */ BaseComponent.prototype.forceUpdate = function(callback) {
    if (this.__v) {
        // Set render mode so that we can differentiate where the render request
        // is coming from. We need this because forceUpdate should never call
        // shouldComponentUpdate
        this.__g |= COMPONENT_FORCE;
        if (callback) this.__h.push(callback);
        enqueueRender(this);
    }
};
/**
 * Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
 * Virtual DOM is generally constructed via [JSX](https://jasonformat.com/wtf-is-jsx).
 * @param {object} props Props (eg: JSX attributes) received from parent
 * element/component
 * @param {object} state The component's current state
 * @param {object} context Context object, as returned by the nearest
 * ancestor's `getChildContext()`
 * @returns {ComponentChildren | void}
 */ BaseComponent.prototype.render = Fragment;
function resetRenderCount() {}
/**
 * Enqueue a rerender of a component
 * @param {import('./internal').Component} c The component to rerender
 */ function enqueueRender() {}
// Lynx JS runtimes are not browsers: `queueMicrotask` (an HTML API) may be
// missing, so fall back to a Promise-based microtask.
typeof queueMicrotask == 'function' && queueMicrotask;
/** Flush the render queue by rerendering all queued components */ function process() {}
/**
 * Flatten and loop through the children of a virtual node
 * @param {ComponentChildren} children The unflattened children of a virtual
 * node
 * @returns {VNode[]}
 */ function toChildArray(children, out) {
    out = out || [];
    if (children != NULL && typeof children != 'boolean') {
        if (isArray(children)) children.some(function(child) {
            toChildArray(child, out);
        });
        else out.push(children);
    }
    return out;
}
/**
 * Render a Preact virtual node into a DOM element
 * @param {import('./internal').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to render into
 */ function render() {}
/**
 * Update an existing DOM element with data from a Preact virtual node
 * @param {import('./internal').ComponentChild} vnode The virtual node to render
 * @param {import('./internal').PreactElement} parentDom The DOM element to update
 */ function hydrate() {}
var i = 0;
function createContext(defaultValue) {
    function Context(props) {
        if (!this.getChildContext) {
            /** @type {Set<import('./internal').Component> | null} */ var subs = new Set();
            var ctx = {};
            ctx[Context.__c] = this;
            this.getChildContext = function() {
                return ctx;
            };
            this.shouldComponentUpdate = function(_props) {
                // @ts-expect-error even
                if (this.props.value != _props.value) subs.forEach(function(c) {
                    c.__g |= COMPONENT_FORCE;
                    enqueueRender(c);
                });
            };
            this.sub = function(c) {
                subs.add(c);
                var old = c.componentWillUnmount;
                c.componentWillUnmount = function() {
                    subs.delete(c);
                    if (old) old.call(c);
                };
            };
        }
        return props.children;
    }
    Context.__c = '__cC' + i++;
    Context.__ = defaultValue;
    /** @type {import('./internal').FunctionComponent} */ Context.Consumer = function(props, contextValue) {
        return props.children(contextValue);
    };
    Context.Provider = Context.Consumer.contextType = Context;
    return Context;
}
/**
 * Portal component. A unique type is used instead of Fragment so that a
 * portal returned directly from a component isn't collapsed into the
 * component's children array by the Fragment unwrapping in `diff()`.
 * @param {object} props
 */ function Portal(props) {
    return props.children;
}
/**
 * Create a `Portal` to continue rendering the vnode tree at a different DOM node
 * @param {import('./internal').ComponentChildren} vnode The vnode to render
 * @param {import('./internal').PreactElement} container The DOM node to continue rendering in to
 */ function createPortal(vnode, container) {
    return createElement(Portal, {
        __P: container
    }, vnode);
}
 //# sourceMappingURL=preact.mjs.map
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./src/App.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  App: () => (App)
});
/* import */ var _lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js");
/* import */ var _lynx_js_react_internal__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js");
/* import */ var _theme_tokens_css__rspack_import_2 = __webpack_require__("(react:main-thread)/./src/theme/tokens.css");
/* import */ var _App_css__rspack_import_3 = __webpack_require__("(react:main-thread)/./src/App.css");
/* import */ var _screens_Home_Home_tsx__rspack_import_4 = __webpack_require__("(react:main-thread)/./src/screens/Home/Home.tsx");





var __snapshot_835da_c6b59_1 = "__snapshot_835da_c6b59_1";
_lynx_js_react_internal__rspack_import_1.snapshotCreatorMap[__snapshot_835da_c6b59_1] = (__snapshot_835da_c6b59_1, __runtime__)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).createSnapshot(__snapshot_835da_c6b59_1, function() {
        var pageId = (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__pageId;
        var el = __CreateView(pageId);
        __SetClasses(el, "app");
        return [
            el
        ];
    }, null, (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__DynamicPartSlotV2_0, undefined, globDynamicComponentEntry, null, true);
function App() {
    return /*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(__snapshot_835da_c6b59_1, {
        $0: /*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(_screens_Home_Home_tsx__rspack_import_4.Home, {}, void 0, false, {
            fileName: "/Users/chandra/Music/gym-app/src/App.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/Users/chandra/Music/gym-app/src/App.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./src/components/Button/Button.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Button: () => (Button)
});
/* import */ var _lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js");
/* import */ var _lynx_js_react_internal__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js");
/* import */ var _lynx_js_react_worklet_runtime_init__rspack_import_2 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/worklet-runtime/index.js");
/* import */ var _Button_css__rspack_import_3 = __webpack_require__("(react:main-thread)/./src/components/Button/Button.css");




var onPressIn = {
    _wkltId: "ac64:9311d:1"
};
var onPressOut = {
    _wkltId: "ac64:9311d:2"
};
var __snapshot_ac64d_9311d_1 = "__snapshot_ac64d_9311d_1";
_lynx_js_react_internal__rspack_import_1.snapshotCreatorMap[__snapshot_ac64d_9311d_1] = (__snapshot_ac64d_9311d_1, __runtime__)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).createSnapshot(__snapshot_ac64d_9311d_1, function() {
        var pageId = (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__pageId;
        var el = __CreateView(pageId);
        var el1 = __CreateText(pageId);
        __SetClasses(el1, "button-label");
        __AppendElement(el, el1);
        return [
            el,
            el1
        ];
    }, [
        function(ctx) {
            if (ctx.__elements) __SetClasses(ctx.__elements[0], ctx.__values[0] || '');
        },
        (snapshot, index, oldValue)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).updateEvent(snapshot, index, oldValue, 0, "bindEvent", "tap", ''),
        (snapshot, index, oldValue)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).updateWorkletEvent(snapshot, index, oldValue, 0, "main-thread", "bindEvent", "touchstart"),
        (snapshot, index, oldValue)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).updateWorkletEvent(snapshot, index, oldValue, 0, "main-thread", "bindEvent", "touchend"),
        (snapshot, index, oldValue)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).updateWorkletEvent(snapshot, index, oldValue, 0, "main-thread", "bindEvent", "touchcancel")
    ], [
        [
            (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__DynamicPartSlotV2,
            1
        ]
    ], undefined, globDynamicComponentEntry, null, true);
function Button({ label, variant = "primary", onTap }) {
    return /*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(__snapshot_ac64d_9311d_1, {
        values: [
            `button button-${variant}`,
            1,
            onPressIn,
            onPressOut,
            onPressOut
        ],
        $0: label
    }, void 0, false, {
        fileName: "/Users/chandra/Music/gym-app/src/components/Button/Button.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
(0,_lynx_js_react_worklet_runtime_init__rspack_import_2.registerWorklet)("main-thread", "ac64:9311d:1", function(event) {
    lynxWorkletImpl._workletMap["ac64:9311d:1"].bind(this);
    "main thread";
    event.currentTarget.setStyleProperty("opacity", "0.7");
});
(0,_lynx_js_react_worklet_runtime_init__rspack_import_2.registerWorklet)("main-thread", "ac64:9311d:2", function(event) {
    lynxWorkletImpl._workletMap["ac64:9311d:2"].bind(this);
    "main thread";
    event.currentTarget.setStyleProperty("opacity", "1");
});
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./src/index.tsx"(module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
/* import */ var _lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js");
/* import */ var _lynx_js_react__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/index.js");
/* import */ var _App_tsx__rspack_import_2 = __webpack_require__("(react:main-thread)/./src/App.tsx");



_lynx_js_react__rspack_import_1.root.render(/*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(_App_tsx__rspack_import_2.App, {}, void 0, false, {
    fileName: "/Users/chandra/Music/gym-app/src/index.tsx",
    lineNumber: 5,
    columnNumber: 13
}, undefined));
if (true) module.hot.accept();
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./src/screens/Home/Home.tsx"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Home: () => (Home)
});
/* import */ var _lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lepus/jsx-runtime/index.js");
/* import */ var _lynx_js_react_internal__rspack_import_1 = __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js");
/* import */ var _components_Button_Button_tsx__rspack_import_2 = __webpack_require__("(react:main-thread)/./src/components/Button/Button.tsx");
/* import */ var _utils_format_ts__rspack_import_3 = __webpack_require__("(react:main-thread)/./src/utils/format.ts");
/* import */ var _Home_css__rspack_import_4 = __webpack_require__("(react:main-thread)/./src/screens/Home/Home.css");





var __snapshot_fd46a_6dd2c_1 = "__snapshot_fd46a_6dd2c_1";
_lynx_js_react_internal__rspack_import_1.snapshotCreatorMap[__snapshot_fd46a_6dd2c_1] = (__snapshot_fd46a_6dd2c_1, __runtime__)=>(__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).createSnapshot(__snapshot_fd46a_6dd2c_1, function() {
        var pageId = (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__pageId;
        var el = __CreateView(pageId);
        __SetClasses(el, "home");
        var el1 = __CreateText(pageId);
        __SetClasses(el1, "home-title");
        __SetAttribute(el1, "text", "Hello world 😊");
        __AppendElement(el, el1);
        var el2 = __CreateText(pageId);
        __SetClasses(el2, "home-subtitle");
        __AppendElement(el, el2);
        var el3 = __CreateWrapperElement(pageId);
        __AppendElement(el, el3);
        return [
            el,
            el1,
            el2,
            el3
        ];
    }, null, [
        [
            (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__DynamicPartSlotV2,
            2
        ],
        [
            (__runtime__ || __webpack_require__("(react:main-thread)/./node_modules/@lynx-js/react/runtime/lib/internal.js")).__DynamicPartSlotV2,
            3
        ]
    ], undefined, globDynamicComponentEntry, null, true);
function Home() {
    return /*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(__snapshot_fd46a_6dd2c_1, {
        $0: (0,_utils_format_ts__rspack_import_3.greeting)(new Date()),
        $1: /*#__PURE__*/ (0,_lynx_js_react_lepus_jsx_dev_runtime__rspack_import_0.jsxDEV)(_components_Button_Button_tsx__rspack_import_2.Button, {
            label: "Start workout",
            onTap: ()=>console.log("start")
        }, void 0, false, {
            fileName: "/Users/chandra/Music/gym-app/src/screens/Home/Home.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/Users/chandra/Music/gym-app/src/screens/Home/Home.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},
"(react:main-thread)/./src/utils/format.ts"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDuration: () => (formatDuration),
  greeting: () => (greeting)
});
function greeting(date) {
    var h = date.getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon!";
    return "Good evening";
}
function formatDuration(totalSec) {
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}
// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
    globalThis.$RefreshReg$ = function() {};
    globalThis.$RefreshSig$ = function() {
        return function(type) {
            return type;
        };
    };
}


},

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
if (cachedModule.error !== undefined) throw cachedModule.error;
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
try {


        var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
        __webpack_require__.i.forEach(function(handler) { handler(execOptions); });
        module = execOptions.module;
        execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
      
} catch (e) {
module.error = e;
throw e;
}
// Return the exports of the module
return module.exports;

}

// expose the modules object (__webpack_modules__)
__webpack_require__.m = __webpack_modules__;

// expose the module cache
__webpack_require__.c = __webpack_module_cache__;

// expose the module execution interceptor
__webpack_require__.i = [];

// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, getters, values) => {
	var define = (defs, kind) => {
		for(var key in defs) {
			if(__webpack_require__.o(defs, key) && !__webpack_require__.o(exports, key)) {
				Object.defineProperty(exports, key, { enumerable: true, [kind]: defs[key] });
			}
		}
	};
	define(getters, "get");
	define(values, "value");
};
})();
// webpack/runtime/get_chunk_update_filename
(() => {
__webpack_require__.hu = (chunkId) => ('' + chunkId + '.' + __webpack_require__.h() + '.hot-update.js')
})();
// webpack/runtime/get_full_hash
(() => {
__webpack_require__.h = () => ("910eeec7db0e95a5")
})();
// webpack/runtime/get_main_filename/update manifest
(() => {
__webpack_require__.hmrF = function () {
            return "main__main-thread." + __webpack_require__.h() + ".hot-update.json";
         };
        
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/hot_module_replacement
(() => {
var currentModuleData = {};
var hmrInstalledModules = __webpack_require__.c;

// module and require creation
var currentChildModule;
var currentParents = [];

// status
var registeredStatusHandlers = [];
var currentStatus = "idle";

// while downloading
var blockingPromises = 0;
var blockingPromisesWaiting = [];

// The update info
var currentUpdateApplyHandlers;
var queuedInvalidatedModules;

__webpack_require__.hmrD = currentModuleData;

__webpack_require__.i.push(function (options) {
	var module = options.module;
	var require = rspackHmrCreateRequire(options.require, options.id);
	module.hot = createModuleHotObject(options.id, module);
	module.parents = currentParents;
	module.children = [];
	currentParents = [];
	options.require = require;
	
});

__webpack_require__.hmrC = {};
__webpack_require__.hmrI = {};

function rspackHmrCreateRequire(require, moduleId) {
	var me = hmrInstalledModules[moduleId];
	if (!me) return require;
	var fn = function (request) {
		if (me.hot.active) {
			if (hmrInstalledModules[request]) {
				var parents = hmrInstalledModules[request].parents;
				if (parents.indexOf(moduleId) === -1) {
					parents.push(moduleId);
				}
			} else {
				currentParents = [moduleId];
				currentChildModule = request;
			}
			if (me.children.indexOf(request) === -1) {
				me.children.push(request);
			}
		} else {
			console.warn(
				"[HMR] unexpected require(" +
				request +
				") from disposed module " +
				moduleId
			);
			currentParents = [];
		}
		return require(request);
	};
	var createPropertyDescriptor = function (name) {
		return {
			configurable: true,
			enumerable: true,
			get: function () {
				return require[name];
			},
			set: function (value) {
				require[name] = value;
			}
		};
	};
	for (var name in require) {
		if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
			Object.defineProperty(fn, name, createPropertyDescriptor(name));
		}
	}

	fn.e = function (chunkId, fetchPriority) {
		return trackBlockingPromise(require.e(chunkId, fetchPriority));
	};

	return fn;
}

function createModuleHotObject(moduleId, me) {
	var _main = currentChildModule !== moduleId;
	var hot = {
		_acceptedDependencies: {},
		_acceptedErrorHandlers: {},
		_declinedDependencies: {},
		_selfAccepted: false,
		_selfDeclined: false,
		_selfInvalidated: false,
		_disposeHandlers: [],
		_main: _main,
		_requireSelf: function () {
			currentParents = me.parents.slice();
			currentChildModule = _main ? undefined : moduleId;
			__webpack_require__(moduleId);
		},
		active: true,
		accept: function (dep, callback, errorHandler) {
			if (dep === undefined) hot._selfAccepted = true;
			else if (typeof dep === "function") hot._selfAccepted = dep;
			else if (typeof dep === "object" && dep !== null) {
				for (var i = 0; i < dep.length; i++) {
					hot._acceptedDependencies[dep[i]] = callback || function () { };
					hot._acceptedErrorHandlers[dep[i]] = errorHandler;
				}
			} else {
				hot._acceptedDependencies[dep] = callback || function () { };
				hot._acceptedErrorHandlers[dep] = errorHandler;
			}
		},
		decline: function (dep) {
			if (dep === undefined) hot._selfDeclined = true;
			else if (typeof dep === "object" && dep !== null)
				for (var i = 0; i < dep.length; i++)
					hot._declinedDependencies[dep[i]] = true;
			else hot._declinedDependencies[dep] = true;
		},
		dispose: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		addDisposeHandler: function (callback) {
			hot._disposeHandlers.push(callback);
		},
		removeDisposeHandler: function (callback) {
			var idx = hot._disposeHandlers.indexOf(callback);
			if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
		},
		invalidate: function () {
			this._selfInvalidated = true;
			switch (currentStatus) {
				case "idle":
					currentUpdateApplyHandlers = [];
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					setStatus("ready");
					break;
				case "ready":
					Object.keys(__webpack_require__.hmrI).forEach(function (key) {
						__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
					});
					break;
				case "prepare":
				case "check":
				case "dispose":
				case "apply":
					(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
						moduleId
					);
					break;
				default:
					break;
			}
		},
		check: hotCheck,
		apply: hotApply,
		status: function (l) {
			if (!l) return currentStatus;
			registeredStatusHandlers.push(l);
		},
		addStatusHandler: function (l) {
			registeredStatusHandlers.push(l);
		},
		removeStatusHandler: function (l) {
			var idx = registeredStatusHandlers.indexOf(l);
			if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
		},
		data: currentModuleData[moduleId]
	};
	currentChildModule = undefined;
	return hot;
}

function setStatus(newStatus) {
	currentStatus = newStatus;
	
	var results = [];
	for (var i = 0; i < registeredStatusHandlers.length; i++)
		results[i] = registeredStatusHandlers[i].call(null, newStatus);

	return Promise.all(results).then(function () { });
}

function unblock() {
	if (--blockingPromises === 0) {
		setStatus("ready").then(function () {
			if (blockingPromises === 0) {
				var list = blockingPromisesWaiting;
				blockingPromisesWaiting = [];
				for (var i = 0; i < list.length; i++) {
					list[i]();
				}
			}
		});
	}
}

function trackBlockingPromise(promise) {
	switch (currentStatus) {
		case "ready":
			setStatus("prepare");
		case "prepare":
			blockingPromises++;
			promise.then(unblock, unblock);
			return promise;
		default:
			return promise;
	}
}

function waitForBlockingPromises(fn) {
	if (blockingPromises === 0) return fn();
	return new Promise(function (resolve) {
		blockingPromisesWaiting.push(function () {
			resolve(fn());
		});
	});
}

function hotCheck(applyOnUpdate) {
	if (currentStatus !== "idle") {
		throw new Error("check() is only allowed in idle status");
	}
	
	return setStatus("check")
		.then(__webpack_require__.hmrM)
		.then(function (update) {
			if (!update) {
				return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
					function () {
						return null;
					}
				);
			}

			return setStatus("prepare").then(function () {
				var updatedModules = [];
				currentUpdateApplyHandlers = [];

				return Promise.all(
					Object.keys(__webpack_require__.hmrC).reduce(function (
						promises,
						key
					) {
						__webpack_require__.hmrC[key](
							update.c,
							update.r,
							update.m,
							promises,
							currentUpdateApplyHandlers,
							updatedModules,
							update.css,
							update.miniCss
						);
						return promises;
					},
						[])
				).then(function () {
					return waitForBlockingPromises(function () {
						if (applyOnUpdate) {
							return internalApply(applyOnUpdate);
						}
						return setStatus("ready").then(function () {
							return updatedModules;
						});
					});
				});
			});
		});
}

function hotApply(options) {
	if (currentStatus !== "ready") {
		return Promise.resolve().then(function () {
			throw new Error(
				"apply() is only allowed in ready status (state: " + currentStatus + ")"
			);
		});
	}
	return internalApply(options);
}

function internalApply(options) {
	options = options || {};
	applyInvalidatedModules();
	var results = currentUpdateApplyHandlers.map(function (handler) {
		return handler(options);
	});
	currentUpdateApplyHandlers = undefined;
	var errors = results
		.map(function (r) {
			return r.error;
		})
		.filter(Boolean);

	if (errors.length > 0) {
		return setStatus("abort").then(function () {
			throw errors[0];
		});
	}

	var disposePromise = setStatus("dispose");

	results.forEach(function (result) {
		if (result.dispose) result.dispose();
	});

	var applyPromise = setStatus("apply");

	var error;
	var reportError = function (err) {
		if (!error) error = err;
	};

	var outdatedModules = [];
	results.forEach(function (result) {
		if (result.apply) {
			var modules = result.apply(reportError);
			if (modules) {
				for (var i = 0; i < modules.length; i++) {
					outdatedModules.push(modules[i]);
				}
			}
		}
	});

	return Promise.all([disposePromise, applyPromise]).then(function () {
		if (error) {
			return setStatus("fail").then(function () {
				throw error;
			});
		}

		if (queuedInvalidatedModules) {
			return internalApply(options).then(function (list) {
				outdatedModules.forEach(function (moduleId) {
					if (list.indexOf(moduleId) < 0) list.push(moduleId);
				});
				return list;
			});
		}

		return setStatus("idle").then(function () {
			return outdatedModules;
		});
	});
}

function applyInvalidatedModules() {
	if (queuedInvalidatedModules) {
		if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
		Object.keys(__webpack_require__.hmrI).forEach(function (key) {
			queuedInvalidatedModules.forEach(function (moduleId) {
				__webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
			});
		});
		queuedInvalidatedModules = undefined;
		return true;
	}
}
// @ts-nocheck
__webpack_require__.i.push(function(options) {
  if (
    // This means this is in main-thread
    !globalThis.__PREFRESH__
    // Loading a module of background layer in main-thread, we replace the layer with the main-thread.
    && options.id.includes('(react:background)')
  ) {
    // We may serialize the snapshot from background to main-thread.
    // The `(react:background)` layer in the module id cannot be found in the main-thread.
    // Thus we replace it here to make HMR work.
    //
    // Maybe it is better to run chunk loading on main thread.
    options.id = options.id.replace(
      `(react:background)`, // This is replaced by ReactRefreshRspackPlugin
      '(react:main-thread)', // This is replaced by ReactRefreshRspackPlugin
    );
    const factory = __webpack_modules__[options.id];
    if (factory) {
      options.factory = factory;
    }
    return;
  }
  var originalFactory = options.factory;
  options.factory = function(moduleObject, moduleExports, webpackRequire) {
    var prevRefreshReg = globalThis.$RefreshReg$;
    var prevRefreshSig = globalThis.$RefreshSig$;
    globalThis.$RefreshSig$ = function() {
      var status = 'begin';
      var savedType;

      return function(type, key, forceReset, getCustomHooks) {
        // `globalThis.__PREFRESH__` may not exist when requiring `react`:
        //   - require('react-refresh')
        //     - require('react').options
        //       - require('useSyncExternalStore')
        //         - __REFRESH__.sign // not a function
        // TODO(wangqingyu): Replace globalThis.__PREFRESH__ with lynx.__PREFRESH__
        if (!globalThis.__PREFRESH__) {
          return type;
        }
        if (!savedType) savedType = type;

        status = globalThis.__PREFRESH__.sign(
          type || savedType,
          key,
          forceReset,
          getCustomHooks,
          status,
        );
        return type;
      };
    };
    var reg = function(currentModuleId) {
      globalThis.$RefreshReg$ = function(type, id) {
        // `globalThis.__PREFRESH__` may not exist when requiring `react`:
        //   - require('react-refresh')
        //     - require('react').options
        //       - require('useSyncExternalStore')
        //         - __REFRESH__.sign // not a function
        if (globalThis.__PREFRESH__) {
          globalThis.__PREFRESH__.register(type, currentModuleId + ' ' + id);
        }
      };
    };
    reg();
    try {
      originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
    } finally {
      globalThis.$RefreshReg$ = prevRefreshReg;
      globalThis.$RefreshSig$ = prevRefreshSig;
    }
  };
});

globalThis[Symbol.for('__LYNX_WEBPACK_MODULES__')] = __webpack_modules__;

// noop fns to prevent runtime errors during initialization
if (typeof globalThis !== "undefined") {
  globalThis.$RefreshReg$ = function () {};
  globalThis.$RefreshSig$ = function () {
    return function(type) {
      return type;
    };
  };
}
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
// webpack/runtime/public_path
(() => {
__webpack_require__.p = "http://192.168.29.191:3000/";
})();
// webpack/runtime/lynx async chunks
(() => {
// lynx async chunks ids
__webpack_require__.lynx_aci = {}
})();
// webpack/runtime/lynx chunk loading
(() => {
// object to store loaded chunks
// "1" means "loaded", otherwise not loaded yet
var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
	"main__main-thread": 1
};
// no on chunks loaded
// no chunk install function needed
// no chunk loading

    function loadUpdateChunk(chunkId, updatedModulesList) {
        return new Promise((resolve, reject) => {
            lynx.requireModuleAsync(__webpack_require__.p
                + __webpack_require__.hu(chunkId), (err, update) => {
                if (err) {
                    reject(err);
                    return;
                }
                var updatedModules = update.modules;
                var runtime = update.runtime;
                for (var moduleId in updatedModules) {
                    if (__webpack_require__.o(updatedModules, moduleId)) {
                        currentUpdate[moduleId] = updatedModules[moduleId];
                        if (updatedModulesList)
                            updatedModulesList.push(moduleId);
                    }
                }
                if (runtime)
                    currentUpdateRuntime.push(runtime);
                resolve();
            });
        });
    }

    var currentUpdateChunks;
    var currentUpdate;
    var currentUpdateRemovedChunks;
    var currentUpdateRuntime;
    function applyHandler(options) {
        if (__webpack_require__.f) {
            delete __webpack_require__.f.requireHmr;
        }
        currentUpdateChunks = undefined;
        function getAffectedModuleEffects(updateModuleId) {
            var outdatedModules = [updateModuleId];
            var outdatedDependencies = {};
            var queue = outdatedModules.map(function (id) {
                return {
                    chain: [id],
                    id: id,
                };
            });
            while (queue.length > 0) {
                var queueItem = queue.pop();
                var moduleId = queueItem.id;
                var chain = queueItem.chain;
                var module = __webpack_require__.c[moduleId];
                if (!module
                    || (module.hot._selfAccepted && !module.hot._selfInvalidated)) {
                    continue;
                }
                if (module.hot._selfDeclined) {
                    return {
                        type: 'self-declined',
                        chain: chain,
                        moduleId: moduleId,
                    };
                }
                if (module.hot._main) {
                    return {
                        type: 'unaccepted',
                        chain: chain,
                        moduleId: moduleId,
                    };
                }
                for (var i = 0; i < module.parents.length; i++) {
                    var parentId = module.parents[i];
                    var parent = __webpack_require__.c[parentId];
                    if (!parent)
                        continue;
                    if (parent.hot._declinedDependencies[moduleId]) {
                        return {
                            type: 'declined',
                            chain: chain.concat([parentId]),
                            moduleId: moduleId,
                            parentId: parentId,
                        };
                    }
                    if (outdatedModules.indexOf(parentId) !== -1)
                        continue;
                    if (parent.hot._acceptedDependencies[moduleId]) {
                        if (!outdatedDependencies[parentId]) {
                            outdatedDependencies[parentId] = [];
                        }
                        addAllToSet(outdatedDependencies[parentId], [moduleId]);
                        continue;
                    }
                    delete outdatedDependencies[parentId];
                    outdatedModules.push(parentId);
                    queue.push({
                        chain: chain.concat([parentId]),
                        id: parentId,
                    });
                }
            }
            return {
                type: 'accepted',
                moduleId: updateModuleId,
                outdatedModules: outdatedModules,
                outdatedDependencies: outdatedDependencies,
            };
        }
        function addAllToSet(a, b) {
            for (var i = 0; i < b.length; i++) {
                var item = b[i];
                if (a.indexOf(item) === -1)
                    a.push(item);
            }
        }
        // at begin all updates modules are outdated
        // the "outdated" status can propagate to parents if they don't accept the children
        var outdatedDependencies = {};
        var outdatedModules = [];
        var appliedUpdate = {};
        var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
            console.warn('[HMR] unexpected require(' + module.id + ') to disposed module');
        };
        for (var moduleId in currentUpdate) {
            if (__webpack_require__.o(currentUpdate, moduleId)) {
                var newModuleFactory = currentUpdate[moduleId];
                /** @type {TODO} */
                var result;
                if (newModuleFactory) {
                    result = getAffectedModuleEffects(moduleId);
                }
                else {
                    result = {
                        type: 'disposed',
                        moduleId: moduleId,
                    };
                }
                /** @type {Error|false} */
                var abortError = false;
                var doApply = false;
                var doDispose = false;
                var chainInfo = '';
                if (result.chain) {
                    chainInfo = '\nUpdate propagation: ' + result.chain.join(' -> ');
                }
                switch (result.type) {
                    case 'self-declined':
                        if (options.onDeclined)
                            options.onDeclined(result);
                        if (!options.ignoreDeclined) {
                            abortError = new Error('Aborted because of self decline: '
                                + result.moduleId
                                + chainInfo);
                        }
                        break;
                    case 'declined':
                        if (options.onDeclined)
                            options.onDeclined(result);
                        if (!options.ignoreDeclined) {
                            abortError = new Error('Aborted because of declined dependency: '
                                + result.moduleId
                                + ' in '
                                + result.parentId
                                + chainInfo);
                        }
                        break;
                    case 'unaccepted':
                        if (options.onUnaccepted)
                            options.onUnaccepted(result);
                        if (!options.ignoreUnaccepted) {
                            abortError = new Error('Aborted because ' + moduleId + ' is not accepted' + chainInfo);
                        }
                        break;
                    case 'accepted':
                        if (options.onAccepted)
                            options.onAccepted(result);
                        doApply = true;
                        break;
                    case 'disposed':
                        if (options.onDisposed)
                            options.onDisposed(result);
                        doDispose = true;
                        break;
                    default:
                        throw new Error('Un-exception type ' + result.type);
                }
                if (abortError) {
                    return {
                        error: abortError,
                    };
                }
                if (doApply) {
                    appliedUpdate[moduleId] = newModuleFactory;
                    addAllToSet(outdatedModules, result.outdatedModules);
                    for (moduleId in result.outdatedDependencies) {
                        if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
                            if (!outdatedDependencies[moduleId]) {
                                outdatedDependencies[moduleId] = [];
                            }
                            addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
                        }
                    }
                }
                if (doDispose) {
                    addAllToSet(outdatedModules, [result.moduleId]);
                    appliedUpdate[moduleId] = warnUnexpectedRequire;
                }
            }
        }
        currentUpdate = undefined;
        // Store self accepted outdated modules to require them later by the module system
        var outdatedSelfAcceptedModules = [];
        for (var j = 0; j < outdatedModules.length; j++) {
            var outdatedModuleId = outdatedModules[j];
            var module = __webpack_require__.c[outdatedModuleId];
            if (module
                && (module.hot._selfAccepted || module.hot._main)
                // removed self-accepted modules should not be required
                && appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire
                // when called invalidate self-accepting is not possible
                && !module.hot._selfInvalidated) {
                outdatedSelfAcceptedModules.push({
                    module: outdatedModuleId,
                    require: module.hot._requireSelf,
                    errorHandler: module.hot._selfAccepted,
                });
            }
        }
        var moduleOutdatedDependencies;
        return {
            dispose: function () {
                currentUpdateRemovedChunks.forEach(function (chunkId) {
                    delete installedChunks[chunkId];
                });
                currentUpdateRemovedChunks = undefined;
                var idx;
                var queue = outdatedModules.slice();
                while (queue.length > 0) {
                    var moduleId = queue.pop();
                    var module = __webpack_require__.c[moduleId];
                    if (!module)
                        continue;
                    var data = {};
                    // Call dispose handlers
                    var disposeHandlers = module.hot._disposeHandlers;
                    for (j = 0; j < disposeHandlers.length; j++) {
                        disposeHandlers[j].call(null, data);
                    }
                    __webpack_require__.hmrD[moduleId] = data;
                    // disable module (this disables requires from this module)
                    module.hot.active = false;
                    // remove module from cache
                    delete __webpack_require__.c[moduleId];
                    // when disposing there is no need to call dispose handler
                    delete outdatedDependencies[moduleId];
                    // remove "parents" references from all children
                    for (j = 0; j < module.children.length; j++) {
                        var child = __webpack_require__.c[module.children[j]];
                        if (!child)
                            continue;
                        idx = child.parents.indexOf(moduleId);
                        if (idx >= 0) {
                            child.parents.splice(idx, 1);
                        }
                    }
                }
                // remove outdated dependency from module children
                var dependency;
                for (var outdatedModuleId in outdatedDependencies) {
                    if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
                        module = __webpack_require__.c[outdatedModuleId];
                        if (module) {
                            moduleOutdatedDependencies =
                                outdatedDependencies[outdatedModuleId];
                            for (j = 0; j < moduleOutdatedDependencies.length; j++) {
                                dependency = moduleOutdatedDependencies[j];
                                idx = module.children.indexOf(dependency);
                                if (idx >= 0)
                                    module.children.splice(idx, 1);
                            }
                        }
                    }
                }
            },
            apply: function (reportError) {
                // insert new code
                for (var updateModuleId in appliedUpdate) {
                    if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
                        __webpack_require__.m[updateModuleId] =
                            appliedUpdate[updateModuleId];
                    }
                }
                // run new runtime modules
                for (var i = 0; i < currentUpdateRuntime.length; i++) {
                    currentUpdateRuntime[i](__webpack_require__);
                }
                // call accept handlers
                for (var outdatedModuleId in outdatedDependencies) {
                    if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
                        var module = __webpack_require__.c[outdatedModuleId];
                        if (module) {
                            moduleOutdatedDependencies =
                                outdatedDependencies[outdatedModuleId];
                            var callbacks = [];
                            var errorHandlers = [];
                            var dependenciesForCallbacks = [];
                            for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
                                var dependency = moduleOutdatedDependencies[j];
                                var acceptCallback = module.hot._acceptedDependencies[dependency];
                                var errorHandler = module.hot._acceptedErrorHandlers[dependency];
                                if (acceptCallback) {
                                    if (callbacks.indexOf(acceptCallback) !== -1)
                                        continue;
                                    callbacks.push(acceptCallback);
                                    errorHandlers.push(errorHandler);
                                    dependenciesForCallbacks.push(dependency);
                                }
                            }
                            for (var k = 0; k < callbacks.length; k++) {
                                try {
                                    callbacks[k].call(null, moduleOutdatedDependencies);
                                }
                                catch (err) {
                                    if (typeof errorHandlers[k] === 'function') {
                                        try {
                                            errorHandlers[k](err, {
                                                moduleId: outdatedModuleId,
                                                dependencyId: dependenciesForCallbacks[k],
                                            });
                                        }
                                        catch (err2) {
                                            if (options.onErrored) {
                                                options.onErrored({
                                                    type: 'accept-error-handler-errored',
                                                    moduleId: outdatedModuleId,
                                                    dependencyId: dependenciesForCallbacks[k],
                                                    error: err2,
                                                    originalError: err,
                                                });
                                            }
                                            if (!options.ignoreErrored) {
                                                reportError(err2);
                                                reportError(err);
                                            }
                                        }
                                    }
                                    else {
                                        if (options.onErrored) {
                                            options.onErrored({
                                                type: 'accept-errored',
                                                moduleId: outdatedModuleId,
                                                dependencyId: dependenciesForCallbacks[k],
                                                error: err,
                                            });
                                        }
                                        if (!options.ignoreErrored) {
                                            reportError(err);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // Load self accepted modules
                for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
                    var item = outdatedSelfAcceptedModules[o];
                    var moduleId = item.module;
                    try {
                        item.require(moduleId);
                    }
                    catch (err) {
                        if (typeof item.errorHandler === 'function') {
                            try {
                                item.errorHandler(err, {
                                    moduleId: moduleId,
                                    module: __webpack_require__.c[moduleId],
                                });
                            }
                            catch (err2) {
                                if (options.onErrored) {
                                    options.onErrored({
                                        type: 'self-accept-error-handler-errored',
                                        moduleId: moduleId,
                                        error: err2,
                                        originalError: err,
                                    });
                                }
                                if (!options.ignoreErrored) {
                                    reportError(err2);
                                    reportError(err);
                                }
                            }
                        }
                        else {
                            if (options.onErrored) {
                                options.onErrored({
                                    type: 'self-accept-errored',
                                    moduleId: moduleId,
                                    error: err,
                                });
                            }
                            if (!options.ignoreErrored) {
                                reportError(err);
                            }
                        }
                    }
                }
                return outdatedModules;
            },
        };
    }
    __webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
        if (!currentUpdate) {
            currentUpdate = {};
            currentUpdateRuntime = [];
            currentUpdateRemovedChunks = [];
            applyHandlers.push(applyHandler);
        }
        if (!__webpack_require__.o(currentUpdate, moduleId)) {
            currentUpdate[moduleId] = __webpack_require__.m[moduleId];
        }
    };
    __webpack_require__.hmrC.require = function (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
        applyHandlers.push(applyHandler);
        currentUpdateChunks = {};
        currentUpdateRemovedChunks = removedChunks;
        currentUpdate = removedModules.reduce(function (obj, key) {
            obj[key] = false;
            return obj;
        }, {});
        currentUpdateRuntime = [];
        chunkIds.forEach(function (chunkId) {
            if (__webpack_require__.o(installedChunks, chunkId)
                && installedChunks[chunkId] !== undefined) {
                promises.push(loadUpdateChunk(chunkId, updatedModulesList));
                currentUpdateChunks[chunkId] = true;
            }
            else {
                currentUpdateChunks[chunkId] = false;
            }
        });
        if (__webpack_require__.f) {
            __webpack_require__.f.requireHmr = function (chunkId, promises) {
                if (currentUpdateChunks
                    && __webpack_require__.o(currentUpdateChunks, chunkId)
                    && !currentUpdateChunks[chunkId]) {
                    promises.push(loadUpdateChunk(chunkId));
                    currentUpdateChunks[chunkId] = true;
                }
            };
        }
    };

    __webpack_require__.hmrM = function () {
        return new Promise((resolve, reject) => lynx.requireModuleAsync(__webpack_require__.p
            + __webpack_require__.hmrF(), (err, ret) => {
            if (err)
                return reject(err);
            resolve(ret);
        }))['catch'](function (err) {
            if (err.code !== 'MODULE_NOT_FOUND')
                throw err;
        });
    };
})();
// module cache are used so entry inlining is disabled
// startup
// Load entry module and return exports
__webpack_require__("(react:main-thread)/./node_modules/@lynx-js/css-extract-webpack-plugin/runtime/hotModuleReplacement.lepus.cjs");
var __webpack_exports__ = __webpack_require__("(react:main-thread)/./src/index.tsx");

//# sourceMappingURL=http://192.168.29.191:3000/.lynx/main/debug-metadata.json?field=source-map&path=.lynx%2Fmain%2Fmain-thread.js.map