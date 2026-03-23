var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var ee=Array.isArray;function S(){}var C={H:null,A:null,T:null,S:null},w=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function te(e,t){return T(e.type,t,e.props)}function ne(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(S,S):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,ee(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(ne(o)&&(o=te(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ee(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var E=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},D={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!ne(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=D,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=C,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return C.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!w.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)w.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=ne,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=C.T,n={};C.T=n;try{var r=e(),i=C.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(S,E)}catch(e){E(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),C.T=t}},e.unstable_useCacheRefresh=function(){return C.H.useCacheRefresh()},e.use=function(e){return C.H.use(e)},e.useActionState=function(e,t,n){return C.H.useActionState(e,t,n)},e.useCallback=function(e,t){return C.H.useCallback(e,t)},e.useContext=function(e){return C.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return C.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return C.H.useEffect(e,t)},e.useEffectEvent=function(e){return C.H.useEffectEvent(e)},e.useId=function(){return C.H.useId()},e.useImperativeHandle=function(e,t,n){return C.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return C.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return C.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return C.H.useMemo(e,t)},e.useOptimistic=function(e,t){return C.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return C.H.useReducer(e,t,n)},e.useRef=function(e){return C.H.useRef(e)},e.useState=function(e){return C.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return C.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return C.H.useTransition()},e.version=`19.2.4`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,ee||(ee=!0,ne());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}var ee=!1,S=-1,C=5,w=-1;function T(){return g?!0:!(e.unstable_now()-w<C)}function te(){if(g=!1,ee){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(S),S=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():ee=!1}}}var ne;if(typeof y==`function`)ne=function(){y(te)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=te,ne=function(){ie.postMessage(null)}}else ne=function(){_(te,0)};function ae(t,n){S=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):C=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(S),S=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,ee||(ee=!0,ne()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.4`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),ee=Symbol.for(`react.consumer`),S=Symbol.for(`react.context`),C=Symbol.for(`react.forward_ref`),w=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),te=Symbol.for(`react.memo`),ne=Symbol.for(`react.lazy`),re=Symbol.for(`react.activity`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.iterator;function oe(e){return typeof e!=`object`||!e?null:(e=ae&&e[ae]||e[`@@iterator`],typeof e==`function`?e:null)}var se=Symbol.for(`react.client.reference`);function ce(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===se?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case w:return`Suspense`;case T:return`SuspenseList`;case re:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case S:return e.displayName||`Context`;case ee:return(e._context.displayName||`Context`)+`.Consumer`;case C:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case te:return t=e.displayName||null,t===null?ce(e.type)||`Memo`:t;case ne:t=e._payload,e=e._init;try{return ce(e(t))}catch{}}return null}var le=Array.isArray,E=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,D=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ue={pending:!1,data:null,method:null,action:null},de=[],fe=-1;function pe(e){return{current:e}}function me(e){0>fe||(e.current=de[fe],de[fe]=null,fe--)}function O(e,t){fe++,de[fe]=e.current,e.current=t}var he=pe(null),ge=pe(null),_e=pe(null),ve=pe(null);function ye(e,t){switch(O(_e,t),O(ge,e),O(he,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}me(he),O(he,e)}function be(){me(he),me(ge),me(_e)}function xe(e){e.memoizedState!==null&&O(ve,e);var t=he.current,n=Hd(t,e.type);t!==n&&(O(ge,e),O(he,n))}function Se(e){ge.current===e&&(me(he),me(ge)),ve.current===e&&(me(ve),Qf._currentValue=ue)}var Ce,we;function Te(e){if(Ce===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ce=t&&t[1]||``,we=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ce+e+we}var Ee=!1;function De(e,t){if(!e||Ee)return``;Ee=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ee=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Te(n):``}function Oe(e,t){switch(e.tag){case 26:case 27:case 5:return Te(e.type);case 16:return Te(`Lazy`);case 13:return e.child!==t&&t!==null?Te(`Suspense Fallback`):Te(`Suspense`);case 19:return Te(`SuspenseList`);case 0:case 15:return De(e.type,!1);case 11:return De(e.type.render,!1);case 1:return De(e.type,!0);case 31:return Te(`Activity`);default:return``}}function ke(e){try{var t=``,n=null;do t+=Oe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ae=Object.prototype.hasOwnProperty,je=t.unstable_scheduleCallback,Me=t.unstable_cancelCallback,Ne=t.unstable_shouldYield,Pe=t.unstable_requestPaint,Fe=t.unstable_now,Ie=t.unstable_getCurrentPriorityLevel,Le=t.unstable_ImmediatePriority,Re=t.unstable_UserBlockingPriority,ze=t.unstable_NormalPriority,Be=t.unstable_LowPriority,Ve=t.unstable_IdlePriority,He=t.log,Ue=t.unstable_setDisableYieldValue,We=null,Ge=null;function Ke(e){if(typeof He==`function`&&Ue(e),Ge&&typeof Ge.setStrictMode==`function`)try{Ge.setStrictMode(We,e)}catch{}}var qe=Math.clz32?Math.clz32:Xe,Je=Math.log,Ye=Math.LN2;function Xe(e){return e>>>=0,e===0?32:31-(Je(e)/Ye|0)|0}var Ze=256,Qe=262144,$e=4194304;function et(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function tt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=et(n))):i=et(o):i=et(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=et(n))):i=et(o)):i=et(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function nt(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function rt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function it(){var e=$e;return $e<<=1,!($e&62914560)&&($e=4194304),e}function at(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ot(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function st(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-qe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&ct(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function ct(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-qe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function lt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ut(e,t){var n=t&-t;return n=n&42?1:dt(n),(n&(e.suspendedLanes|t))===0?n:0}function dt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ft(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function pt(){var e=D.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function mt(e,t){var n=D.p;try{return D.p=e,t()}finally{D.p=n}}var ht=Math.random().toString(36).slice(2),gt=`__reactFiber$`+ht,_t=`__reactProps$`+ht,vt=`__reactContainer$`+ht,yt=`__reactEvents$`+ht,bt=`__reactListeners$`+ht,xt=`__reactHandles$`+ht,St=`__reactResources$`+ht,Ct=`__reactMarker$`+ht;function wt(e){delete e[gt],delete e[_t],delete e[yt],delete e[bt],delete e[xt]}function Tt(e){var t=e[gt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[vt]||n[gt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[gt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function Et(e){if(e=e[gt]||e[vt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Dt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Ot(e){var t=e[St];return t||=e[St]={hoistableStyles:new Map,hoistableScripts:new Map},t}function k(e){e[Ct]=!0}var kt=new Set,At={};function jt(e,t){Mt(e,t),Mt(e+`Capture`,t)}function Mt(e,t){for(At[e]=t,e=0;e<t.length;e++)kt.add(t[e])}var Nt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Pt={},Ft={};function It(e){return Ae.call(Ft,e)?!0:Ae.call(Pt,e)?!1:Nt.test(e)?Ft[e]=!0:(Pt[e]=!0,!1)}function Lt(e,t,n){if(It(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Rt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function zt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Bt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Vt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ht(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ut(e){if(!e._valueTracker){var t=Vt(e)?`checked`:`value`;e._valueTracker=Ht(e,t,``+e[t])}}function Wt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Vt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Gt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Kt=/[\n"\\]/g;function qt(e){return e.replace(Kt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Bt(t)):e.value!==``+Bt(t)&&(e.value=``+Bt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Xt(e,o,Bt(n)):Xt(e,o,Bt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Bt(s):e.removeAttribute(`name`)}function Yt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ut(e);return}n=n==null?``:``+Bt(n),t=t==null?n:``+Bt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ut(e)}function Xt(e,t,n){t===`number`&&Gt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Bt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qt(e,t,n){if(t!=null&&(t=``+Bt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Bt(n)}function $t(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(le(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Bt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ut(e)}function en(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function nn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||tn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function rn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&nn(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&nn(e,o,t[o])}function an(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var on=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function cn(e){return sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function ln(){}var un=null;function dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fn=null,pn=null;function mn(e){var t=Et(e);if(t&&(e=t.stateNode)){var n=e[_t]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+qt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[_t]||null;if(!a)throw Error(i(90));Jt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Wt(r)}break a;case`textarea`:Qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}}}var hn=!1;function gn(e,t,n){if(hn)return e(t,n);hn=!0;try{return e(t)}finally{if(hn=!1,(fn!==null||pn!==null)&&(bu(),fn&&(t=fn,e=pn,pn=fn=null,mn(t),e)))for(t=0;t<e.length;t++)mn(e[t])}}function _n(e,t){var n=e.stateNode;if(n===null)return null;var r=n[_t]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var vn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),yn=!1;if(vn)try{var bn={};Object.defineProperty(bn,`passive`,{get:function(){yn=!0}}),window.addEventListener(`test`,bn,bn),window.removeEventListener(`test`,bn,bn)}catch{yn=!1}var xn=null,Sn=null,Cn=null;function wn(){if(Cn)return Cn;var e,t=Sn,n=t.length,r,i=`value`in xn?xn.value:xn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Cn=i.slice(e,1<r?1-r:void 0)}function Tn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function En(){return!0}function Dn(){return!1}function A(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?En:Dn,this.isPropagationStopped=Dn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=En)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=En)},persist:function(){},isPersistent:En}),t}var On={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kn=A(On),An=h({},On,{view:0,detail:0}),jn=A(An),Mn,Nn,Pn,Fn=h({},An,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Pn&&(Pn&&e.type===`mousemove`?(Mn=e.screenX-Pn.screenX,Nn=e.screenY-Pn.screenY):Nn=Mn=0,Pn=e),Mn)},movementY:function(e){return`movementY`in e?e.movementY:Nn}}),In=A(Fn),Ln=A(h({},Fn,{dataTransfer:0})),Rn=A(h({},An,{relatedTarget:0})),zn=A(h({},On,{animationName:0,elapsedTime:0,pseudoElement:0})),Bn=A(h({},On,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Vn=A(h({},On,{data:0})),Hn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Un={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Wn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Gn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Wn[e])?!!t[e]:!1}function Kn(){return Gn}var qn=A(h({},An,{key:function(e){if(e.key){var t=Hn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Tn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Un[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kn,charCode:function(e){return e.type===`keypress`?Tn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Tn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Jn=A(h({},Fn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Yn=A(h({},An,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kn})),Xn=A(h({},On,{propertyName:0,elapsedTime:0,pseudoElement:0})),Zn=A(h({},Fn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Qn=A(h({},On,{newState:0,oldState:0})),$n=[9,13,27,32],er=vn&&`CompositionEvent`in window,tr=null;vn&&`documentMode`in document&&(tr=document.documentMode);var nr=vn&&`TextEvent`in window&&!tr,rr=vn&&(!er||tr&&8<tr&&11>=tr),ir=` `,ar=!1;function or(e,t){switch(e){case`keyup`:return $n.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function sr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var cr=!1;function j(e,t){switch(e){case`compositionend`:return sr(t);case`keypress`:return t.which===32?(ar=!0,ir):null;case`textInput`:return e=t.data,e===ir&&ar?null:e;default:return null}}function lr(e,t){if(cr)return e===`compositionend`||!er&&or(e,t)?(e=wn(),Cn=Sn=xn=null,cr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return rr&&t.locale!==`ko`?null:t.data;default:return null}}var ur={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ur[e.type]:t===`textarea`}function fr(e,t,n,r){fn?pn?pn.push(r):pn=[r]:fn=r,t=Ed(t,`onChange`),0<t.length&&(n=new kn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var pr=null,mr=null;function hr(e){yd(e,0)}function gr(e){if(Wt(Dt(e)))return e}function _r(e,t){if(e===`change`)return t}var vr=!1;if(vn){var yr;if(vn){var br=`oninput`in document;if(!br){var xr=document.createElement(`div`);xr.setAttribute(`oninput`,`return;`),br=typeof xr.oninput==`function`}yr=br}else yr=!1;vr=yr&&(!document.documentMode||9<document.documentMode)}function Sr(){pr&&(pr.detachEvent(`onpropertychange`,Cr),mr=pr=null)}function Cr(e){if(e.propertyName===`value`&&gr(mr)){var t=[];fr(t,mr,e,dn(e)),gn(hr,t)}}function wr(e,t,n){e===`focusin`?(Sr(),pr=t,mr=n,pr.attachEvent(`onpropertychange`,Cr)):e===`focusout`&&Sr()}function Tr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return gr(mr)}function Er(e,t){if(e===`click`)return gr(t)}function Dr(e,t){if(e===`input`||e===`change`)return gr(t)}function Or(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var kr=typeof Object.is==`function`?Object.is:Or;function Ar(e,t){if(kr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ae.call(t,i)||!kr(e[i],t[i]))return!1}return!0}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Gt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gt(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=vn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Gt(r)||(r=Lr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&Ar(zr,r)||(zr=r,r=Ed(Rr,`onSelect`),0<r.length&&(t=new kn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};vn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),Xr=Kr(`transitionrun`),Zr=Kr(`transitionstart`),Qr=Kr(`transitioncancel`),$r=Kr(`transitionend`),ei=new Map,ti=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ti.push(`scrollEnd`);function ni(e,t){ei.set(e,t),jt(t,[e])}var ri=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},ii=[],ai=0,oi=0;function si(){for(var e=ai,t=oi=ai=0;t<e;){var n=ii[t];ii[t++]=null;var r=ii[t];ii[t++]=null;var i=ii[t];ii[t++]=null;var a=ii[t];if(ii[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&di(n,i,a)}}function ci(e,t,n,r){ii[ai++]=e,ii[ai++]=t,ii[ai++]=n,ii[ai++]=r,oi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function li(e,t,n,r){return ci(e,t,n,r),fi(e)}function ui(e,t){return ci(e,null,null,t),fi(e)}function di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-qe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function fi(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var pi={};function mi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(e,t,n,r){return new mi(e,t,n,r)}function gi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function _i(e,t){var n=e.alternate;return n===null?(n=hi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function vi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function yi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)gi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,he.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case re:return e=hi(31,n,t,a),e.elementType=re,e.lanes=o,e;case y:return bi(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=hi(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case w:return e=hi(13,n,t,a),e.elementType=w,e.lanes=o,e;case T:return e=hi(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case S:s=10;break a;case ee:s=9;break a;case C:s=11;break a;case te:s=14;break a;case ne:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=hi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function bi(e,t,n,r){return e=hi(7,e,r,t),e.lanes=n,e}function xi(e,t,n){return e=hi(6,e,null,t),e.lanes=n,e}function Si(e){var t=hi(18,null,null,0);return t.stateNode=e,t}function Ci(e,t,n){return t=hi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var wi=new WeakMap;function Ti(e,t){if(typeof e==`object`&&e){var n=wi.get(e);return n===void 0?(t={value:e,source:t,stack:ke(t)},wi.set(e,t),t):n}return{value:e,source:t,stack:ke(t)}}var Ei=[],Di=0,Oi=null,ki=0,Ai=[],ji=0,Mi=null,Ni=1,Pi=``;function Fi(e,t){Ei[Di++]=ki,Ei[Di++]=Oi,Oi=e,ki=t}function Ii(e,t,n){Ai[ji++]=Ni,Ai[ji++]=Pi,Ai[ji++]=Mi,Mi=e;var r=Ni;e=Pi;var i=32-qe(r)-1;r&=~(1<<i),n+=1;var a=32-qe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ni=1<<32-qe(t)+i|n<<i|r,Pi=a+e}else Ni=1<<a|n<<i|r,Pi=e}function Li(e){e.return!==null&&(Fi(e,1),Ii(e,1,0))}function Ri(e){for(;e===Oi;)Oi=Ei[--Di],Ei[Di]=null,ki=Ei[--Di],Ei[Di]=null;for(;e===Mi;)Mi=Ai[--ji],Ai[ji]=null,Pi=Ai[--ji],Ai[ji]=null,Ni=Ai[--ji],Ai[ji]=null}function zi(e,t){Ai[ji++]=Ni,Ai[ji++]=Pi,Ai[ji++]=Mi,Ni=t.id,Pi=t.overflow,Mi=e}var Bi=null,M=null,N=!1,Vi=null,Hi=!1,Ui=Error(i(519));function Wi(e){throw Xi(Ti(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ui}function Gi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[gt]=e,t[_t]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),$t(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=ln),t=!0):t=!1,t||Wi(e,!0)}function Ki(e){for(Bi=e.return;Bi;)switch(Bi.tag){case 5:case 31:case 13:Hi=!1;return;case 27:case 3:Hi=!0;return;default:Bi=Bi.return}}function qi(e){if(e!==Bi)return!1;if(!N)return Ki(e),N=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&M&&Wi(e),Ki(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));M=uf(e)}else t===27?(t=M,Zd(e.type)?(e=lf,lf=null,M=e):M=t):M=Bi?cf(e.stateNode.nextSibling):null;return!0}function Ji(){M=Bi=null,N=!1}function Yi(){var e=Vi;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Vi=null),e}function Xi(e){Vi===null?Vi=[e]:Vi.push(e)}var Zi=pe(null),Qi=null,$i=null;function ea(e,t,n){O(Zi,t._currentValue),t._currentValue=n}function ta(e){e._currentValue=Zi.current,me(Zi)}function na(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ra(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),na(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),na(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ia(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;kr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ve.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&ra(t,e,n,r),t.flags|=262144}function aa(e){for(e=e.firstContext;e!==null;){if(!kr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function oa(e){Qi=e,$i=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function sa(e){return la(Qi,e)}function ca(e,t){return Qi===null&&oa(e),la(e,t)}function la(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},$i===null){if(e===null)throw Error(i(308));$i=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else $i=$i.next=t;return n}var ua=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},da=t.unstable_scheduleCallback,fa=t.unstable_NormalPriority,P={$$typeof:S,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function pa(){return{controller:new ua,data:new Map,refCount:0}}function ma(e){e.refCount--,e.refCount===0&&da(fa,function(){e.controller.abort()})}var ha=null,ga=0,_a=0,va=null;function ya(e,t){if(ha===null){var n=ha=[];ga=0,_a=dd(),va={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ga++,t.then(ba,ba),t}function ba(){if(--ga===0&&ha!==null){va!==null&&(va.status=`fulfilled`);var e=ha;ha=null,_a=0,va=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function xa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Sa=E.S;E.S=function(e,t){eu=Fe(),typeof t==`object`&&t&&typeof t.then==`function`&&ya(e,t),Sa!==null&&Sa(e,t)};var Ca=pe(null);function wa(){var e=Ca.current;return e===null?K.pooledCache:e}function Ta(e,t){t===null?O(Ca,Ca.current):O(Ca,t.pool)}function Ea(){var e=wa();return e===null?null:{parent:P._currentValue,pool:e}}var Da=Error(i(460)),Oa=Error(i(474)),ka=Error(i(542)),Aa={then:function(){}};function ja(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ma(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ln,ln),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e;default:if(typeof t.status==`string`)t.then(ln,ln);else{if(e=K,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ia(e),e}throw Pa=t,Da}}function Na(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Pa=e,Da):e}}var Pa=null;function Fa(){if(Pa===null)throw Error(i(459));var e=Pa;return Pa=null,e}function Ia(e){if(e===Da||e===ka)throw Error(i(483))}var La=null,Ra=0;function za(e){var t=Ra;return Ra+=1,La===null&&(La=[]),Ma(La,e,t)}function Ba(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Va(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ha(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=_i(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=xi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ne&&Na(i)===t.type)?(t=a(t,n.props),Ba(t,n),t.return=e,t):(t=yi(n.type,n.key,n.props,null,e.mode,r),Ba(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ci(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=bi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=xi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=yi(t.type,t.key,t.props,null,e.mode,n),Ba(n,t),n.return=e,n;case v:return t=Ci(t,e.mode,n),t.return=e,t;case ne:return t=Na(t),f(e,t,n)}if(le(t)||oe(t))return t=bi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,za(t),n);if(t.$$typeof===S)return f(e,ca(e,t),n);Va(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case ne:return n=Na(n),p(e,t,n,r)}if(le(n)||oe(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,za(n),r);if(n.$$typeof===S)return p(e,t,ca(e,n),r);Va(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ne:return r=Na(r),m(e,t,n,r,i)}if(le(r)||oe(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,za(r),i);if(r.$$typeof===S)return m(e,t,n,ca(t,r),i);Va(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),N&&Fi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return N&&Fi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),N&&Fi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),N&&Fi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return N&&Fi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),N&&Fi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ne&&Na(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ba(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=bi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=yi(o.type,o.key,o.props,null,e.mode,c),Ba(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=Ci(o,e.mode,c),c.return=e,e=c}return s(e);case ne:return o=Na(o),b(e,r,o,c)}if(le(o))return h(e,r,o,c);if(oe(o)){if(l=oe(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,za(o),c);if(o.$$typeof===S)return b(e,r,ca(e,o),c);Va(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=xi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ra=0;var i=b(e,t,n,r);return La=null,i}catch(t){if(t===Da||t===ka)throw t;var a=hi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ua=Ha(!0),Wa=Ha(!1),Ga=!1;function Ka(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function qa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ja(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ya(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,G&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=fi(e),di(e,null,n),t}return ci(e,r,t,n),fi(e)}function Xa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}function Za(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Qa=!1;function $a(){if(Qa){var e=va;if(e!==null)throw e}}function eo(e,t,n,r){Qa=!1;var i=e.updateQueue;Ga=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(J&f)===f:(r&f)===f){f!==0&&f===_a&&(Qa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ga=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function to(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function no(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)to(n[e],t)}var ro=pe(null),io=pe(0);function ao(e,t){e=Wl,O(io,e),O(ro,t),Wl=e|t.baseLanes}function oo(){O(io,Wl),O(ro,ro.current)}function so(){Wl=io.current,me(ro),me(io)}var co=pe(null),lo=null;function uo(e){var t=e.alternate;O(F,F.current&1),O(co,e),lo===null&&(t===null||ro.current!==null||t.memoizedState!==null)&&(lo=e)}function fo(e){O(F,F.current),O(co,e),lo===null&&(lo=e)}function po(e){e.tag===22?(O(F,F.current),O(co,e),lo===null&&(lo=e)):mo(e)}function mo(){O(F,F.current),O(co,co.current)}function ho(e){me(co),lo===e&&(lo=null),me(F)}var F=pe(0);function go(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var _o=0,I=null,L=null,R=null,vo=!1,yo=!1,bo=!1,xo=0,So=0,Co=null,wo=0;function z(){throw Error(i(321))}function To(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!kr(e[n],t[n]))return!1;return!0}function Eo(e,t,n,r,i,a){return _o=a,I=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,E.H=e===null||e.memoizedState===null?Hs:Us,bo=!1,a=n(r,i),bo=!1,yo&&(a=Oo(t,n,r,i)),Do(e),a}function Do(e){E.H=Vs;var t=L!==null&&L.next!==null;if(_o=0,R=L=I=null,vo=!1,So=0,Co=null,t)throw Error(i(300));e===null||V||(e=e.dependencies,e!==null&&aa(e)&&(V=!0))}function Oo(e,t,n,r){I=e;var a=0;do{if(yo&&(Co=null),So=0,yo=!1,25<=a)throw Error(i(301));if(a+=1,R=L=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}E.H=Ws,o=t(n,r)}while(yo);return o}function ko(){var e=E.H,t=e.useState()[0];return t=typeof t.then==`function`?Fo(t):t,e=e.useState()[0],(L===null?null:L.memoizedState)!==e&&(I.flags|=1024),t}function Ao(){var e=xo!==0;return xo=0,e}function jo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Mo(e){if(vo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}vo=!1}_o=0,R=L=I=null,yo=!1,So=xo=0,Co=null}function No(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return R===null?I.memoizedState=R=e:R=R.next=e,R}function B(){if(L===null){var e=I.alternate;e=e===null?null:e.memoizedState}else e=L.next;var t=R===null?I.memoizedState:R.next;if(t!==null)R=t,L=e;else{if(e===null)throw I.alternate===null?Error(i(467)):Error(i(310));L=e,e={memoizedState:L.memoizedState,baseState:L.baseState,baseQueue:L.baseQueue,queue:L.queue,next:null},R===null?I.memoizedState=R=e:R=R.next=e}return R}function Po(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fo(e){var t=So;return So+=1,Co===null&&(Co=[]),e=Ma(Co,e,t),t=I,(R===null?t.memoizedState:R.next)===null&&(t=t.alternate,E.H=t===null||t.memoizedState===null?Hs:Us),e}function Io(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Fo(e);if(e.$$typeof===S)return sa(e)}throw Error(i(438,String(e)))}function Lo(e){var t=null,n=I.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=I.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Po(),I.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function Ro(e,t){return typeof t==`function`?t(e):t}function zo(e){return Bo(B(),L,e)}function Bo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(_o&f)===f:(J&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===_a&&(d=!0);else if((_o&p)===p){u=u.next,p===_a&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,I.lanes|=p,Gl|=p;f=u.action,bo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,I.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!kr(o,e.memoizedState)&&(V=!0,d&&(n=va,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Vo(e){var t=B(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);kr(o,t.memoizedState)||(V=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Ho(e,t,n){var r=I,a=B(),o=N;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!kr((L||a).memoizedState,n);if(s&&(a.memoizedState=n,V=!0),a=a.queue,ps(Go.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||R!==null&&R.memoizedState.tag&1){if(r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,a,n,t),null),K===null)throw Error(i(349));o||_o&127||Uo(r,t,n)}return n}function Uo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=I.updateQueue,t===null?(t=Po(),I.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wo(e,t,n,r){t.value=n,t.getSnapshot=r,Ko(t)&&qo(e)}function Go(e,t,n){return n(function(){Ko(t)&&qo(e)})}function Ko(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!kr(e,n)}catch{return!0}}function qo(e){var t=ui(e,2);t!==null&&hu(t,e,2)}function Jo(e){var t=No();if(typeof e==`function`){var n=e;if(e=n(),bo){Ke(!0);try{n()}finally{Ke(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:e},t}function Yo(e,t,n,r){return e.baseState=n,Bo(e,L,typeof r==`function`?r:Ro)}function Xo(e,t,n,r,a){if(Rs(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};E.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Zo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Zo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=E.T,o={};E.T=o;try{var s=n(i,r),c=E.S;c!==null&&c(o,s),Qo(e,t,s)}catch(n){es(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),E.T=a}}else try{a=n(i,r),Qo(e,t,a)}catch(n){es(e,t,n)}}function Qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){$o(e,t,n)},function(n){return es(e,t,n)}):$o(e,t,n)}function $o(e,t,n){t.status=`fulfilled`,t.value=n,ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Zo(e,n)))}function es(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ts(t),t=t.next;while(t!==r)}e.action=null}function ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ns(e,t){return t}function rs(e,t){if(N){var n=K.formState;if(n!==null){a:{var r=I;if(N){if(M){b:{for(var i=M,a=Hi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){M=cf(i.nextSibling),r=i.data===`F!`;break a}}Wi(r)}r=!1}r&&(t=n[0])}}return n=No(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ns,lastRenderedState:t},n.queue=r,n=Fs.bind(null,I,r),r.dispatch=n,r=Jo(!1),a=Ls.bind(null,I,!1,r.queue),r=No(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Xo.bind(null,I,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function is(e){return as(B(),L,e)}function as(e,t,n){if(t=Bo(e,t,ns)[0],e=zo(Ro)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Fo(t)}catch(e){throw e===Da?ka:e}else r=t;t=B();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(I.flags|=2048,cs(9,{destroy:void 0},os.bind(null,i,n),null)),[r,a,e]}function os(e,t){e.action=t}function ss(e){var t=B(),n=L;if(n!==null)return as(t,n,e);B(),t=t.memoizedState,n=B();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function cs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=I.updateQueue,t===null&&(t=Po(),I.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ls(){return B().memoizedState}function us(e,t,n,r){var i=No();I.flags|=e,i.memoizedState=cs(1|t,{destroy:void 0},n,r===void 0?null:r)}function ds(e,t,n,r){var i=B();r=r===void 0?null:r;var a=i.memoizedState.inst;L!==null&&r!==null&&To(r,L.memoizedState.deps)?i.memoizedState=cs(t,a,n,r):(I.flags|=e,i.memoizedState=cs(1|t,a,n,r))}function fs(e,t){us(8390656,8,e,t)}function ps(e,t){ds(2048,8,e,t)}function ms(e){I.flags|=4;var t=I.updateQueue;if(t===null)t=Po(),I.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hs(e){var t=B().memoizedState;return ms({ref:t,nextImpl:e}),function(){if(G&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function gs(e,t){return ds(4,2,e,t)}function _s(e,t){return ds(4,4,e,t)}function vs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ys(e,t,n){n=n==null?null:n.concat([e]),ds(4,4,vs.bind(null,t,e),n)}function bs(){}function xs(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&To(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ss(e,t){var n=B();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&To(t,r[1]))return r[0];if(r=e(),bo){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r}function Cs(e,t,n){return n===void 0||_o&1073741824&&!(J&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),I.lanes|=e,Gl|=e,n)}function ws(e,t,n,r){return kr(n,t)?n:ro.current===null?!(_o&42)||_o&1073741824&&!(J&261930)?(V=!0,e.memoizedState=n):(e=mu(),I.lanes|=e,Gl|=e,t):(e=Cs(e,n,r),kr(e,t)||(V=!0),e)}function Ts(e,t,n,r,i){var a=D.p;D.p=a!==0&&8>a?a:8;var o=E.T,s={};E.T=s,Ls(e,!1,t,n);try{var c=i(),l=E.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Is(e,t,xa(c,r),pu(e)):Is(e,t,r,pu(e))}catch(n){Is(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{D.p=a,o!==null&&s.types!==null&&(o.types=s.types),E.T=o}}function Es(){}function Ds(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Os(e).queue;Ts(e,a,t,ue,n===null?Es:function(){return ks(e),n(r)})}function Os(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ue,baseState:ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:ue},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ro,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ks(e){var t=Os(e);t.next===null&&(t=e.alternate.memoizedState),Is(e,t.next.queue,{},pu())}function As(){return sa(Qf)}function js(){return B().memoizedState}function Ms(){return B().memoizedState}function Ns(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Ja(n);var r=Ya(t,e,n);r!==null&&(hu(r,t,n),Xa(r,t,n)),t={cache:pa()},e.payload=t;return}t=t.return}}function Ps(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Rs(e)?zs(t,n):(n=li(e,t,n,r),n!==null&&(hu(n,e,r),Bs(n,t,r)))}function Fs(e,t,n){Is(e,t,n,pu())}function Is(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Rs(e))zs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,kr(s,o))return ci(e,t,i,0),K===null&&si(),!1}catch{}if(n=li(e,t,i,r),n!==null)return hu(n,e,r),Bs(n,t,r),!0}return!1}function Ls(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Rs(e)){if(t)throw Error(i(479))}else t=li(e,n,r,2),t!==null&&hu(t,e,2)}function Rs(e){var t=e.alternate;return e===I||t!==null&&t===I}function zs(e,t){yo=vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Bs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,lt(e,n)}}var Vs={readContext:sa,use:Io,useCallback:z,useContext:z,useEffect:z,useImperativeHandle:z,useLayoutEffect:z,useInsertionEffect:z,useMemo:z,useReducer:z,useRef:z,useState:z,useDebugValue:z,useDeferredValue:z,useTransition:z,useSyncExternalStore:z,useId:z,useHostTransitionStatus:z,useFormState:z,useActionState:z,useOptimistic:z,useMemoCache:z,useCacheRefresh:z};Vs.useEffectEvent=z;var Hs={readContext:sa,use:Io,useCallback:function(e,t){return No().memoizedState=[e,t===void 0?null:t],e},useContext:sa,useEffect:fs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),us(4194308,4,vs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return us(4194308,4,e,t)},useInsertionEffect:function(e,t){us(4,2,e,t)},useMemo:function(e,t){var n=No();t=t===void 0?null:t;var r=e();if(bo){Ke(!0);try{e()}finally{Ke(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=No();if(n!==void 0){var i=n(t);if(bo){Ke(!0);try{n(t)}finally{Ke(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ps.bind(null,I,e),[r.memoizedState,e]},useRef:function(e){var t=No();return e={current:e},t.memoizedState=e},useState:function(e){e=Jo(e);var t=e.queue,n=Fs.bind(null,I,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bs,useDeferredValue:function(e,t){return Cs(No(),e,t)},useTransition:function(){var e=Jo(!1);return e=Ts.bind(null,I,e.queue,!0,!1),No().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=I,a=No();if(N){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),K===null)throw Error(i(349));J&127||Uo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,fs(Go.bind(null,r,o,e),[e]),r.flags|=2048,cs(9,{destroy:void 0},Wo.bind(null,r,o,n,t),null),n},useId:function(){var e=No(),t=K.identifierPrefix;if(N){var n=Pi,r=Ni;n=(r&~(1<<32-qe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=xo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=wo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:As,useFormState:rs,useActionState:rs,useOptimistic:function(e){var t=No();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ls.bind(null,I,!0,n),n.dispatch=t,[e,t]},useMemoCache:Lo,useCacheRefresh:function(){return No().memoizedState=Ns.bind(null,I)},useEffectEvent:function(e){var t=No(),n={impl:e};return t.memoizedState=n,function(){if(G&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Us={readContext:sa,use:Io,useCallback:xs,useContext:sa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:zo,useRef:ls,useState:function(){return zo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){return ws(B(),L.memoizedState,e,t)},useTransition:function(){var e=zo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:is,useActionState:is,useOptimistic:function(e,t){return Yo(B(),L,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Us.useEffectEvent=hs;var Ws={readContext:sa,use:Io,useCallback:xs,useContext:sa,useEffect:ps,useImperativeHandle:ys,useInsertionEffect:gs,useLayoutEffect:_s,useMemo:Ss,useReducer:Vo,useRef:ls,useState:function(){return Vo(Ro)},useDebugValue:bs,useDeferredValue:function(e,t){var n=B();return L===null?Cs(n,e,t):ws(n,L.memoizedState,e,t)},useTransition:function(){var e=Vo(Ro)[0],t=B().memoizedState;return[typeof e==`boolean`?e:Fo(e),t]},useSyncExternalStore:Ho,useId:js,useHostTransitionStatus:As,useFormState:ss,useActionState:ss,useOptimistic:function(e,t){var n=B();return L===null?(n.baseState=e,[e,n.queue.dispatch]):Yo(n,L,e,t)},useMemoCache:Lo,useCacheRefresh:Ms};Ws.useEffectEvent=hs;function Gs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ks={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ja(r);i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(hu(t,e,r),Xa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Ja(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ya(e,i,r),t!==null&&(hu(t,e,r),Xa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Ja(n);r.tag=2,t!=null&&(r.callback=t),t=Ya(e,r,n),t!==null&&(hu(t,e,n),Xa(t,e,n))}};function qs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ar(n,r)||!Ar(i,a):!0}function Js(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ks.enqueueReplaceState(t,t.state,null)}function Ys(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Xs(e){ri(e)}function Zs(e){console.error(e)}function Qs(e){ri(e)}function $s(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function ec(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function tc(e,t,n){return n=Ja(n),n.tag=3,n.payload={element:null},n.callback=function(){$s(e,t)},n}function nc(e){return e=Ja(e),e.tag=3,e}function rc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){ec(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){ec(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function ic(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ia(t,n,a,!0),n=co.current,n!==null){switch(n.tag){case 31:case 13:return lo===null?Du():n.alternate===null&&X===0&&(X=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===Aa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(N)return t=co.current,t===null?(r!==Ui&&(t=Error(i(423),{cause:r}),Xi(Ti(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ti(r,n),a=tc(e.stateNode,r,a),Za(e,a),X!==4&&(X=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ui&&(e=Error(i(422),{cause:r}),Xi(Ti(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ti(o,n),Xl===null?Xl=[o]:Xl.push(o),X!==4&&(X=2),t===null)return!0;r=Ti(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=tc(n.stateNode,r,e),Za(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=nc(a),rc(a,e,n,r),Za(n,a),!1}n=n.return}while(n!==null);return!1}var ac=Error(i(461)),V=!1;function oc(e,t,n,r){t.child=e===null?Wa(t,null,n,r):Ua(t,e.child,n,r)}function sc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return oa(t),r=Eo(e,t,n,o,a,i),s=Ao(),e!==null&&!V?(jo(e,t,i),jc(e,t,i)):(N&&s&&Li(t),t.flags|=1,oc(e,t,r,i),t.child)}function cc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!gi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,lc(e,t,a,r,i)):(e=yi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Mc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ar:n,n(o,r)&&e.ref===t.ref)return jc(e,t,i)}return t.flags|=1,e=_i(a,r),e.ref=t.ref,e.return=t,t.child=e}function lc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ar(a,r)&&e.ref===t.ref)if(V=!1,t.pendingProps=r=a,Mc(e,i))e.flags&131072&&(V=!0);else return t.lanes=e.lanes,jc(e,t,i)}return _c(e,t,n,r,i)}function uc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return fc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ta(t,a===null?null:a.cachePool),a===null?oo():ao(t,a),po(t);else return r=t.lanes=536870912,fc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ta(t,null),oo(),mo(t)):(Ta(t,a.cachePool),ao(t,a),mo(t),t.memoizedState=null);return oc(e,t,i,n),t.child}function dc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function fc(e,t,n,r,i){var a=wa();return a=a===null?null:{parent:P._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ta(t,null),oo(),po(t),e!==null&&ia(e,t,r,!0),t.childLanes=i,null}function pc(e,t){return t=Ec({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function mc(e,t,n){return Ua(t,e.child,null,n),e=pc(t,t.pendingProps),e.flags|=2,ho(t),t.memoizedState=null,e}function hc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(N){if(r.mode===`hidden`)return e=pc(t,r),t.lanes=536870912,dc(null,e);if(fo(t),(e=M)?(e=rf(e,Hi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Mi===null?null:{id:Ni,overflow:Pi},retryLane:536870912,hydrationErrors:null},n=Si(e),n.return=t,t.child=n,Bi=t,M=null)):e=null,e===null)throw Wi(t);return t.lanes=536870912,null}return pc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(fo(t),a)if(t.flags&256)t.flags&=-257,t=mc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(V||ia(e,t,n,!1),a=(n&e.childLanes)!==0,V||a){if(r=K,r!==null&&(s=ut(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ui(e,s),hu(r,e,s),ac;Du(),t=mc(e,t,n)}else e=o.treeContext,M=cf(s.nextSibling),Bi=t,N=!0,Vi=null,Hi=!1,e!==null&&zi(t,e),t=pc(t,r),t.flags|=4096;return t}return e=_i(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function gc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function _c(e,t,n,r,i){return oa(t),n=Eo(e,t,n,r,void 0,i),r=Ao(),e!==null&&!V?(jo(e,t,i),jc(e,t,i)):(N&&r&&Li(t),t.flags|=1,oc(e,t,n,i),t.child)}function vc(e,t,n,r,i,a){return oa(t),t.updateQueue=null,n=Oo(t,r,n,i),Do(e),r=Ao(),e!==null&&!V?(jo(e,t,a),jc(e,t,a)):(N&&r&&Li(t),t.flags|=1,oc(e,t,n,a),t.child)}function yc(e,t,n,r,i){if(oa(t),t.stateNode===null){var a=pi,o=n.contextType;typeof o==`object`&&o&&(a=sa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ks,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ka(t),o=n.contextType,a.context=typeof o==`object`&&o?sa(o):pi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Gs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ks.enqueueReplaceState(a,a.state,null),eo(t,r,a,i),$a(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ys(n,s);a.props=c;var l=a.context,u=n.contextType;o=pi,typeof u==`object`&&u&&(o=sa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Js(t,a,r,o),Ga=!1;var f=t.memoizedState;a.state=f,eo(t,r,a,i),$a(),l=t.memoizedState,s||f!==l||Ga?(typeof d==`function`&&(Gs(t,n,d,r),l=t.memoizedState),(c=Ga||qs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,qa(e,t),o=t.memoizedProps,u=Ys(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=pi,typeof l==`object`&&l&&(c=sa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Js(t,a,r,c),Ga=!1,f=t.memoizedState,a.state=f,eo(t,r,a,i),$a();var p=t.memoizedState;o!==d||f!==p||Ga||e!==null&&e.dependencies!==null&&aa(e.dependencies)?(typeof s==`function`&&(Gs(t,n,s,r),p=t.memoizedState),(u=Ga||qs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&aa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,gc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ua(t,e.child,null,i),t.child=Ua(t,null,n,i)):oc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=jc(e,t,i),e}function bc(e,t,n,r){return Ji(),t.flags|=256,oc(e,t,n,r),t.child}var xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Sc(e){return{baseLanes:e,cachePool:Ea()}}function Cc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function wc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(F.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(N){if(a?uo(t):mo(t),(e=M)?(e=rf(e,Hi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Mi===null?null:{id:Ni,overflow:Pi},retryLane:536870912,hydrationErrors:null},n=Si(e),n.return=t,t.child=n,Bi=t,M=null)):e=null,e===null)throw Wi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(mo(t),a=t.mode,c=Ec({mode:`hidden`,children:c},a),r=bi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,s,n),t.memoizedState=xc,dc(null,r)):(uo(t),Tc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(uo(t),t.flags&=-257,t=Dc(e,t,n)):t.memoizedState===null?(mo(t),c=r.fallback,a=t.mode,r=Ec({mode:`visible`,children:r.children},a),c=bi(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Ua(t,e.child,null,n),r=t.child,r.memoizedState=Sc(n),r.childLanes=Cc(e,s,n),t.memoizedState=xc,t=dc(null,r)):(mo(t),t.child=e.child,t.flags|=128,t=null);else if(uo(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Xi({value:r,source:null,stack:null}),t=Dc(e,t,n)}else if(V||ia(e,t,n,!1),s=(n&e.childLanes)!==0,V||s){if(s=K,s!==null&&(r=ut(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ui(e,r),hu(s,e,r),ac;af(c)||Du(),t=Dc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,M=cf(c.nextSibling),Bi=t,N=!0,Vi=null,Hi=!1,e!==null&&zi(t,e),t=Tc(t,r.children),t.flags|=4096);return t}return a?(mo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=_i(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=bi(c,a,n,null),c.flags|=2):c=_i(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,dc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=Sc(n):(a=c.cachePool,a===null?a=Ea():(l=P._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=Cc(e,s,n),t.memoizedState=xc,dc(e.child,r)):(uo(t),n=e.child,e=n.sibling,n=_i(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Tc(e,t){return t=Ec({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Ec(e,t){return e=hi(22,e,null,t),e.lanes=0,e}function Dc(e,t,n){return Ua(t,e.child,null,n),e=Tc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Oc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),na(e.return,t,n)}function kc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ac(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=F.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,O(F,o),oc(e,t,r,n),r=N?ki:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Oc(e,n,t);else if(e.tag===19)Oc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&go(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),kc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&go(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}kc(t,!0,n,null,a,r);break;case`together`:kc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function jc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(ia(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=_i(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=_i(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Mc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&aa(e))):!0}function Nc(e,t,n){switch(t.tag){case 3:ye(t,t.stateNode.containerInfo),ea(t,P,e.memoizedState.cache),Ji();break;case 27:case 5:xe(t);break;case 4:ye(t,t.stateNode.containerInfo);break;case 10:ea(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,fo(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(uo(t),e=jc(e,t,n),e===null?null:e.sibling):wc(e,t,n):(uo(t),t.flags|=128,null);uo(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(ia(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ac(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),O(F,F.current),r)break;return null;case 22:return t.lanes=0,uc(e,t,n,t.pendingProps);case 24:ea(t,P,e.memoizedState.cache)}return jc(e,t,n)}function Pc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)V=!0;else{if(!Mc(e,n)&&!(t.flags&128))return V=!1,Nc(e,t,n);V=!!(e.flags&131072)}else V=!1,N&&t.flags&1048576&&Ii(t,ki,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Na(t.elementType),t.type=e,typeof e==`function`)gi(e)?(r=Ys(e,r),t.tag=1,t=yc(null,t,e,r,n)):(t.tag=0,t=_c(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===C){t.tag=11,t=sc(null,t,e,r,n);break a}else if(a===te){t.tag=14,t=cc(null,t,e,r,n);break a}}throw t=ce(e)||e,Error(i(306,t,``))}}return t;case 0:return _c(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ys(r,t.pendingProps),yc(e,t,r,a,n);case 3:a:{if(ye(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,qa(e,t),eo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ea(t,P,r),r!==o.cache&&ra(t,[P],n,!0),$a(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=bc(e,t,r,n);break a}else if(r!==a){a=Ti(Error(i(424)),t),Xi(a),t=bc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(M=cf(e.firstChild),Bi=t,N=!0,Vi=null,Hi=!0,n=Wa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ji(),r===a){t=jc(e,t,n);break a}oc(e,t,r,n)}t=t.child}return t;case 26:return gc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:N||(n=t.type,e=t.pendingProps,r=Bd(_e.current).createElement(n),r[gt]=t,r[_t]=e,Pd(r,n,e),k(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return xe(t),e===null&&N&&(r=t.stateNode=ff(t.type,t.pendingProps,_e.current),Bi=t,Hi=!0,a=M,Zd(t.type)?(lf=a,M=cf(r.firstChild)):M=a),oc(e,t,t.pendingProps.children,n),gc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&N&&((a=r=M)&&(r=tf(r,t.type,t.pendingProps,Hi),r===null?a=!1:(t.stateNode=r,Bi=t,M=cf(r.firstChild),Hi=!1,a=!0)),a||Wi(t)),xe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Eo(e,t,ko,null,null,n),Qf._currentValue=a),gc(e,t),oc(e,t,r,n),t.child;case 6:return e===null&&N&&((e=n=M)&&(n=nf(n,t.pendingProps,Hi),n===null?e=!1:(t.stateNode=n,Bi=t,M=null,e=!0)),e||Wi(t)),null;case 13:return wc(e,t,n);case 4:return ye(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ua(t,null,r,n):oc(e,t,r,n),t.child;case 11:return sc(e,t,t.type,t.pendingProps,n);case 7:return oc(e,t,t.pendingProps,n),t.child;case 8:return oc(e,t,t.pendingProps.children,n),t.child;case 12:return oc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,ea(t,t.type,r.value),oc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,oa(t),a=sa(a),r=r(a),t.flags|=1,oc(e,t,r,n),t.child;case 14:return cc(e,t,t.type,t.pendingProps,n);case 15:return lc(e,t,t.type,t.pendingProps,n);case 19:return Ac(e,t,n);case 31:return hc(e,t,n);case 22:return uc(e,t,n,t.pendingProps);case 24:return oa(t),r=sa(P),e===null?(a=wa(),a===null&&(a=K,o=pa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ka(t),ea(t,P,a)):((e.lanes&n)!==0&&(qa(e,t),eo(t,null,null,n),$a()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ea(t,P,r),r!==a.cache&&ra(t,[P],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ea(t,P,r))),oc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Fc(e){e.flags|=4}function Ic(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Pa=Aa,Oa}else e.flags&=-16777217}function Lc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Pa=Aa,Oa}function Rc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:it(),e.lanes|=t,Yl|=t)}function zc(e,t){if(!N)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function H(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Bc(e,t,n){var r=t.pendingProps;switch(Ri(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return H(t),null;case 1:return H(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ta(P),be(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(qi(t)?Fc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Yi())),H(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Fc(t),o===null?(H(t),Ic(t,a,null,r,n)):(H(t),Lc(t,o))):o?o===e.memoizedState?(H(t),t.flags&=-16777217):(Fc(t),H(t),Lc(t,o)):(e=e.memoizedProps,e!==r&&Fc(t),H(t),Ic(t,a,e,r,n)),null;case 27:if(Se(t),n=_e.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),null}e=he.current,qi(t)?Gi(t,e):(e=ff(a,r,n),t.stateNode=e,Fc(t))}return H(t),null;case 5:if(Se(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return H(t),null}if(o=he.current,qi(t))Gi(t,o);else{var s=Bd(_e.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[gt]=t,o[_t]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Fc(t)}}return H(t),Ic(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Fc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=_e.current,qi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Bi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[gt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Wi(t,!0)}else e=Bd(e).createTextNode(r),e[gt]=t,t.stateNode=e}return H(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=qi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[gt]=t}else Ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),e=!1}else n=Yi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ho(t),t):(ho(t),null);if(t.flags&128)throw Error(i(558))}return H(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=qi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[gt]=t}else Ji(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;H(t),a=!1}else a=Yi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ho(t),t):(ho(t),null)}return ho(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Rc(t,t.updateQueue),H(t),null);case 4:return be(),e===null&&Sd(t.stateNode.containerInfo),H(t),null;case 10:return ta(t.type),H(t),null;case 19:if(me(F),r=t.memoizedState,r===null)return H(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)zc(r,!1);else{if(X!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=go(e),o!==null){for(t.flags|=128,zc(r,!1),e=o.updateQueue,t.updateQueue=e,Rc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)vi(n,e),n=n.sibling;return O(F,F.current&1|2),N&&Fi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Fe()>tu&&(t.flags|=128,a=!0,zc(r,!1),t.lanes=4194304)}else{if(!a)if(e=go(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Rc(t,e),zc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!N)return H(t),null}else 2*Fe()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,zc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(H(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Fe(),e.sibling=null,n=F.current,O(F,a?n&1|2:n&1),N&&Fi(t,r.treeForkCount),e);case 22:case 23:return ho(t),so(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(H(t),t.subtreeFlags&6&&(t.flags|=8192)):H(t),n=t.updateQueue,n!==null&&Rc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&me(Ca),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ta(P),H(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Vc(e,t){switch(Ri(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ta(P),be(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Se(t),null;case 31:if(t.memoizedState!==null){if(ho(t),t.alternate===null)throw Error(i(340));Ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ho(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ji()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return me(F),null;case 4:return be(),null;case 10:return ta(t.type),null;case 22:case 23:return ho(t),so(),e!==null&&me(Ca),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ta(P),null;case 25:return null;default:return null}}function Hc(e,t){switch(Ri(t),t.tag){case 3:ta(P),be();break;case 26:case 27:case 5:Se(t);break;case 4:be();break;case 31:t.memoizedState!==null&&ho(t);break;case 13:ho(t);break;case 19:me(F);break;case 10:ta(t.type);break;case 22:case 23:ho(t),so(),e!==null&&me(Ca);break;case 24:ta(P)}}function Uc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Wc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Gc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{no(t,n)}catch(t){Z(e,e.return,t)}}}function Kc(e,t,n){n.props=Ys(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function qc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Jc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Yc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Xc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[_t]=t}catch(t){Z(e,e.return,t)}}function Zc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Qc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Zc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $c(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ln));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for($c(e,t,n),e=e.sibling;e!==null;)$c(e,t,n),e=e.sibling}function el(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(el(e,t,n),e=e.sibling;e!==null;)el(e,t,n),e=e.sibling}function tl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[gt]=e,t[_t]=n}catch(t){Z(e,e.return,t)}}var nl=!1,U=!1,rl=!1,il=typeof WeakSet==`function`?WeakSet:Set,al=null;function ol(e,t){if(e=e.containerInfo,Rd=sp,e=Pr(e),Fr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,al=t;al!==null;)if(t=al,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,al=e;else for(;al!==null;){switch(t=al,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ys(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,al=e;break}al=t.return}}function sl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:xl(e,n),r&4&&Uc(5,n);break;case 1:if(xl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ys(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Gc(n),r&512&&qc(n,n.return);break;case 3:if(xl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{no(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&tl(n);case 26:case 5:xl(e,n),t===null&&r&4&&Yc(n),r&512&&qc(n,n.return);break;case 12:xl(e,n);break;case 31:xl(e,n),r&4&&fl(e,n);break;case 13:xl(e,n),r&4&&pl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||nl,!r){t=t!==null&&t.memoizedState!==null||U,i=nl;var a=U;nl=r,(U=t)&&!a?Cl(e,n,(n.subtreeFlags&8772)!=0):xl(e,n),nl=i,U=a}break;case 30:break;default:xl(e,n)}}function cl(e){var t=e.alternate;t!==null&&(e.alternate=null,cl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&wt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var W=null,ll=!1;function ul(e,t,n){for(n=n.child;n!==null;)dl(e,t,n),n=n.sibling}function dl(e,t,n){if(Ge&&typeof Ge.onCommitFiberUnmount==`function`)try{Ge.onCommitFiberUnmount(We,n)}catch{}switch(n.tag){case 26:U||Jc(n,t),ul(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:U||Jc(n,t);var r=W,i=ll;Zd(n.type)&&(W=n.stateNode,ll=!1),ul(e,t,n),pf(n.stateNode),W=r,ll=i;break;case 5:U||Jc(n,t);case 6:if(r=W,i=ll,W=null,ul(e,t,n),W=r,ll=i,W!==null)if(ll)try{(W.nodeType===9?W.body:W.nodeName===`HTML`?W.ownerDocument.body:W).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{W.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:W!==null&&(ll?(e=W,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(W,n.stateNode));break;case 4:r=W,i=ll,W=n.stateNode.containerInfo,ll=!0,ul(e,t,n),W=r,ll=i;break;case 0:case 11:case 14:case 15:Wc(2,n,t),U||Wc(4,n,t),ul(e,t,n);break;case 1:U||(Jc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Kc(n,t,r)),ul(e,t,n);break;case 21:ul(e,t,n);break;case 22:U=(r=U)||n.memoizedState!==null,ul(e,t,n),U=r;break;default:ul(e,t,n)}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function pl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function ml(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new il),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new il),t;default:throw Error(i(435,e.tag))}}function hl(e,t){var n=ml(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function gl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){W=c.stateNode,ll=!1;break a}break;case 5:W=c.stateNode,ll=!1;break a;case 3:case 4:W=c.stateNode.containerInfo,ll=!0;break a}c=c.return}if(W===null)throw Error(i(160));dl(o,s,a),W=null,ll=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vl(t,e),t=t.sibling}var _l=null;function vl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:gl(t,e),yl(e),r&4&&(Wc(3,e,e.return),Uc(3,e),Wc(5,e,e.return));break;case 1:gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),r&64&&nl&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=_l;if(gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[Ct]||o[gt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[gt]=e,k(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[gt]=e,k(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Xc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),n!==null&&r&4&&Xc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(gl(t,e),yl(e),r&512&&(U||n===null||Jc(n,n.return)),e.flags&32){a=e.stateNode;try{en(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Xc(e,a,n===null?a:n.memoizedProps)),r&1024&&(rl=!0);break;case 6:if(gl(t,e),yl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=_l,_l=gf(t.containerInfo),gl(t,e),_l=a,yl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}rl&&(rl=!1,bl(e));break;case 4:r=_l,_l=gf(e.stateNode.containerInfo),gl(t,e),yl(e),_l=r;break;case 12:gl(t,e),yl(e);break;case 31:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 13:gl(t,e),yl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=Fe()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=nl,d=U;if(nl=u||a,U=d||l,gl(t,e),U=d,nl=u,yl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||nl||U||Sl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,hl(e,n))));break;case 19:gl(t,e),yl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,hl(e,r)));break;case 30:break;case 21:break;default:gl(t,e),yl(e)}}function yl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Zc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;el(e,Qc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(en(o,``),n.flags&=-33),el(e,Qc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;$c(e,Qc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function bl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;bl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function xl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)sl(e,t.alternate,t),t=t.sibling}function Sl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Wc(4,t,t.return),Sl(t);break;case 1:Jc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Kc(t,t.return,n),Sl(t);break;case 27:pf(t.stateNode);case 26:case 5:Jc(t,t.return),Sl(t);break;case 22:t.memoizedState===null&&Sl(t);break;case 30:Sl(t);break;default:Sl(t)}e=e.sibling}}function Cl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Cl(i,a,n),Uc(4,a);break;case 1:if(Cl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)to(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Gc(a),qc(a,a.return);break;case 27:tl(a);case 26:case 5:Cl(i,a,n),n&&r===null&&o&4&&Yc(a),qc(a,a.return);break;case 12:Cl(i,a,n);break;case 31:Cl(i,a,n),n&&o&4&&fl(i,a);break;case 13:Cl(i,a,n),n&&o&4&&pl(i,a);break;case 22:a.memoizedState===null&&Cl(i,a,n),qc(a,a.return);break;case 30:break;default:Cl(i,a,n)}t=t.sibling}}function wl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ma(n))}function Tl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e))}function El(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Dl(e,t,n,r),t=t.sibling}function Dl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:El(e,t,n,r),i&2048&&Uc(9,t);break;case 1:El(e,t,n,r);break;case 3:El(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ma(e)));break;case 12:if(i&2048){El(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else El(e,t,n,r);break;case 31:El(e,t,n,r);break;case 13:El(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?El(e,t,n,r):(a._visibility|=2,Ol(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?El(e,t,n,r):kl(e,t),i&2048&&wl(o,t);break;case 24:El(e,t,n,r),i&2048&&Tl(t.alternate,t);break;default:El(e,t,n,r)}}function Ol(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Ol(a,o,s,c,i),Uc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Ol(a,o,s,c,i)):u._visibility&2?Ol(a,o,s,c,i):kl(a,o),i&&l&2048&&wl(o.alternate,o);break;case 24:Ol(a,o,s,c,i),i&&l&2048&&Tl(o.alternate,o);break;default:Ol(a,o,s,c,i)}t=t.sibling}}function kl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:kl(n,r),i&2048&&wl(r.alternate,r);break;case 24:kl(n,r),i&2048&&Tl(r.alternate,r);break;default:kl(n,r)}t=t.sibling}}var Al=8192;function jl(e,t,n){if(e.subtreeFlags&Al)for(e=e.child;e!==null;)Ml(e,t,n),e=e.sibling}function Ml(e,t,n){switch(e.tag){case 26:jl(e,t,n),e.flags&Al&&e.memoizedState!==null&&Gf(n,_l,e.memoizedState,e.memoizedProps);break;case 5:jl(e,t,n);break;case 3:case 4:var r=_l;_l=gf(e.stateNode.containerInfo),jl(e,t,n),_l=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Al,Al=16777216,jl(e,t,n),Al=r):jl(e,t,n));break;default:jl(e,t,n)}}function Nl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Pl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Fl(e),e=e.sibling}function Fl(e){switch(e.tag){case 0:case 11:case 15:Pl(e),e.flags&2048&&Wc(9,e,e.return);break;case 3:Pl(e);break;case 12:Pl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Il(e)):Pl(e);break;default:Pl(e)}}function Il(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];al=r,Ll(r,e)}Nl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Wc(8,t,t.return),Il(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Il(t));break;default:Il(t)}e=e.sibling}}function Ll(e,t){for(;al!==null;){var n=al;switch(n.tag){case 0:case 11:case 15:Wc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ma(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,al=r;else a:for(n=e;al!==null;){r=al;var i=r.sibling,a=r.return;if(cl(r),r===n){al=null;break a}if(i!==null){i.return=a,al=i;break a}al=a}}}var Rl={getCacheForType:function(e){var t=sa(P),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return sa(P).controller.signal}},zl=typeof WeakMap==`function`?WeakMap:Map,G=0,K=null,q=null,J=0,Y=0,Bl=null,Vl=!1,Hl=!1,Ul=!1,Wl=0,X=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return G&2&&J!==0?J&-J:E.T===null?pt():dd()}function mu(){if(Jl===0)if(!(J&536870912)||N){var e=Qe;Qe<<=1,!(Qe&3932160)&&(Qe=262144),Jl=e}else Jl=536870912;return e=co.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===K&&(Y===2||Y===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,J,Jl,!1)),ot(e,n),(!(G&2)||e!==K)&&(e===K&&(!(G&2)&&(Kl|=n),X===4&&yu(e,J,Jl,!1)),rd(e))}function gu(e,t,n){if(G&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||nt(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Hl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Ul&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Vl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-Fe(),10<a)){if(yu(r,t,Jl,!Vl),tt(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Vl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ln},Ml(t,a,d);var m=(a&62914560)===a?$l-Fe():(a&4194048)===a?eu-Fe():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!kr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-qe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&ct(e,n,t)}function bu(){return G&6?!0:(id(0,!1),!1)}function xu(){if(q!==null){if(Y===0)var e=q.return;else e=q,$i=Qi=null,Mo(e),La=null,Ra=0,e=q;for(;e!==null;)Hc(e.alternate,e),e=e.return;q=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),K=e,q=n=_i(e.current,null),J=t,Y=0,Bl=null,Vl=!1,Hl=nt(e,t),Ul=!1,Yl=Jl=ql=Kl=Gl=X=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-qe(r),a=1<<i;t|=e[i],r&=~a}return Wl=t,si(),n}function Cu(e,t){I=null,E.H=Vs,t===Da||t===ka?(t=Fa(),Y=3):t===Oa?(t=Fa(),Y=4):Y=t===ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Bl=t,q===null&&(X=1,$s(e,Ti(t,e.current)))}function wu(){var e=co.current;return e===null?!0:(J&4194048)===J?lo===null:(J&62914560)===J||J&536870912?e===lo:!1}function Tu(){var e=E.H;return E.H=Vs,e===null?Vs:e}function Eu(){var e=E.A;return E.A=Rl,e}function Du(){X=4,Vl||(J&4194048)!==J&&co.current!==null||(Hl=!0),!(Gl&134217727)&&!(Kl&134217727)||K===null||yu(K,J,Jl,!1)}function Ou(e,t,n){var r=G;G|=2;var i=Tu(),a=Eu();(K!==e||J!==t)&&(nu=null,Su(e,t)),t=!1;var o=X;a:do try{if(Y!==0&&q!==null){var s=q,c=Bl;switch(Y){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:co.current===null&&(t=!0);var l=Y;if(Y=0,Bl=null,Pu(e,s,c,l),n&&Hl){o=0;break a}break;default:l=Y,Y=0,Bl=null,Pu(e,s,c,l)}}ku(),o=X;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,$i=Qi=null,G=r,E.H=i,E.A=a,q===null&&(K=null,J=0,si()),o}function ku(){for(;q!==null;)Mu(q)}function Au(e,t){var n=G;G|=2;var r=Tu(),a=Eu();K!==e||J!==t?(nu=null,tu=Fe()+500,Su(e,t)):Hl=nt(e,t);a:do try{if(Y!==0&&q!==null){t=q;var o=Bl;b:switch(Y){case 1:Y=0,Bl=null,Pu(e,t,o,1);break;case 2:case 9:if(ja(o)){Y=0,Bl=null,Nu(t);break}t=function(){Y!==2&&Y!==9||K!==e||(Y=7),rd(e)},o.then(t,t);break a;case 3:Y=7;break a;case 4:Y=5;break a;case 7:ja(o)?(Y=0,Bl=null,Nu(t)):(Y=0,Bl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(q.tag){case 26:s=q.memoizedState;case 5:case 27:var c=q;if(s?Wf(s):c.stateNode.complete){Y=0,Bl=null;var l=c.sibling;if(l!==null)q=l;else{var u=c.return;u===null?q=null:(q=u,Fu(u))}break b}}Y=0,Bl=null,Pu(e,t,o,5);break;case 6:Y=0,Bl=null,Pu(e,t,o,6);break;case 8:xu(),X=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return $i=Qi=null,E.H=r,E.A=a,G=n,q===null?(K=null,J=0,si(),X):0}function ju(){for(;q!==null&&!Ne();)Mu(q)}function Mu(e){var t=Pc(e.alternate,e,Wl);e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=vc(n,t,t.pendingProps,t.type,void 0,J);break;case 11:t=vc(n,t,t.pendingProps,t.type.render,t.ref,J);break;case 5:Mo(t);default:Hc(n,t),t=q=vi(t,Wl),t=Pc(n,t,Wl)}e.memoizedProps=e.pendingProps,t===null?Fu(e):q=t}function Pu(e,t,n,r){$i=Qi=null,Mo(t),La=null,Ra=0;var i=t.return;try{if(ic(e,i,t,n,J)){X=1,$s(e,Ti(n,e.current)),q=null;return}}catch(t){if(i!==null)throw q=i,t;X=1,$s(e,Ti(n,e.current)),q=null;return}t.flags&32768?(N||r===1?e=!0:Hl||J&536870912?e=!1:(Vl=e=!0,(r===2||r===9||r===3||r===6)&&(r=co.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Vl);return}e=t.return;var n=Bc(t.alternate,t,Wl);if(n!==null){q=n;return}if(t=t.sibling,t!==null){q=t;return}q=t=e}while(t!==null);X===0&&(X=5)}function Iu(e,t){do{var n=Vc(e.alternate,e);if(n!==null){n.flags&=32767,q=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){q=e;return}q=e=n}while(e!==null);X=6,q=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(G&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=oi,st(e,n,o,s,c,l),e===K&&(q=K=null,J=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(ze,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=E.T,E.T=null,a=D.p,D.p=2,s=G,G|=4;try{ol(e,t,n)}finally{G=s,D.p=a,E.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{vl(t,e);var a=zd,o=Pr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Nr(s.ownerDocument.documentElement,s)){if(c!==null&&Fr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Mr(s,h),v=Mr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{G=i,D.p=r,E.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=E.T,E.T=null;var r=D.p;D.p=2;var i=G;G|=4;try{sl(e,t.alternate,t)}finally{G=i,D.p=r,E.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Pe();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),ft(n),t=t.stateNode,Ge&&typeof Ge.onCommitFiberRoot==`function`)try{Ge.onCommitFiberRoot(We,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=E.T,i=D.p,D.p=2,E.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{E.T=t,D.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ma(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=ft(su),r=E.T,a=D.p;try{D.p=32>n?32:n,E.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,G&6)throw Error(i(331));var c=G;if(G|=4,Fl(o.current),Dl(o,o.current,s,n),G=c,id(0,!1),Ge&&typeof Ge.onPostCommitFiberRoot==`function`)try{Ge.onPostCommitFiberRoot(We,o)}catch{}return!0}finally{D.p=a,E.T=r,Vu(e,t)}}function Wu(e,t,n){t=Ti(n,t),t=tc(e.stateNode,t,2),e=Ya(e,t,2),e!==null&&(ot(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=Ti(n,e),n=nc(2),r=Ya(t,n,2),r!==null&&(rc(n,r,t,e),ot(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new zl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Ul=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,K===e&&(J&n)===n&&(X===4||X===3&&(J&62914560)===J&&300>Fe()-$l?!(G&2)&&Su(e,0):ql|=n,Yl===J&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=it()),e=ui(e,t),e!==null&&(ot(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return je(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-qe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=J,a=tt(r,r===K?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||nt(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=Fe(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-qe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=rt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=K,n=J,n=tt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Y===2||Y===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Me(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||nt(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Me(r),ft(n)){case 2:case 8:n=Re;break;case 32:n=ze;break;case 268435456:n=Ve;break;default:n=ze}return r=cd.bind(null,e),n=je(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Me(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=J;return r=tt(e,e===K?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,Fe()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){G&6?je(Le,ad):od()})}function dd(){if(nd===0){var e=_a;e===0&&(e=Ze,Ze<<=1,!(Ze&261888)&&(Ze=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:cn(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[_t]||null).action),o=r.submitter;o&&(t=(t=o[_t]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new kn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ds(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ds(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<ti.length;hd++){var gd=ti[hd];ni(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}ni(qr,`onAnimationEnd`),ni(Jr,`onAnimationIteration`),ni(Yr,`onAnimationStart`),ni(`dblclick`,`onDoubleClick`),ni(`focusin`,`onFocus`),ni(`focusout`,`onBlur`),ni(Xr,`onTransitionRun`),ni(Zr,`onTransitionStart`),ni(Qr,`onTransitionCancel`),ni($r,`onTransitionEnd`),Mt(`onMouseEnter`,[`mouseout`,`mouseover`]),Mt(`onMouseLeave`,[`mouseout`,`mouseover`]),Mt(`onPointerEnter`,[`pointerout`,`pointerover`]),Mt(`onPointerLeave`,[`pointerout`,`pointerover`]),jt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),jt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),jt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),jt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),jt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),jt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){ri(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[yt];n===void 0&&(n=t[yt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,kt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!yn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Tt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}gn(function(){var r=a,i=dn(n),s=[];a:{var c=ei.get(e);if(c!==void 0){var l=kn,u=e;switch(e){case`keypress`:if(Tn(n)===0)break a;case`keydown`:case`keyup`:l=qn;break;case`focusin`:u=`focus`,l=Rn;break;case`focusout`:u=`blur`,l=Rn;break;case`beforeblur`:case`afterblur`:l=Rn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=In;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Ln;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Yn;break;case qr:case Jr:case Yr:l=zn;break;case $r:l=Xn;break;case`scroll`:case`scrollend`:l=jn;break;case`wheel`:l=Zn;break;case`copy`:case`cut`:case`paste`:l=Bn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Jn;break;case`toggle`:case`beforetoggle`:l=Qn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=_n(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==un&&(u=n.relatedTarget||n.fromElement)&&(Tt(u)||u[vt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?Tt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=In,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Jn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:Dt(l),h=u==null?c:Dt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,Tt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?Dt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=_r;else if(dr(c))if(vr)v=Dr;else{v=Tr;var y=wr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&an(r.elementType)&&(v=_r):v=Er;if(v&&=v(e,r)){fr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Xt(c,`number`,c.value)}switch(y=r?Dt(r):window,e){case`focusin`:(dr(y)||y.contentEditable===`true`)&&(Lr=y,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(s,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(s,n,i)}var b;if(er)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else cr?or(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(rr&&n.locale!==`ko`&&(cr||x!==`onCompositionStart`?x===`onCompositionEnd`&&cr&&(b=wn()):(xn=i,Sn=`value`in xn?xn.value:xn.textContent,cr=!0)),y=Ed(r,x),0<y.length&&(x=new Vn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=sr(n),b!==null&&(x.data=b)))),(b=nr?j(e,n):lr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Vn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=_n(e,n),i!=null&&r.unshift(Td(e,i,a)),i=_n(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=_n(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=_n(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||en(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&en(e,``+r);break;case`className`:Rt(e,`class`,r);break;case`tabIndex`:Rt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Rt(e,n,r);break;case`style`:rn(e,r,o);break;case`data`:if(t!==`object`){Rt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=cn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Lt(e,`popover`,r);break;case`xlinkActuate`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:zt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Lt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=on.get(n)||n,Lt(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:rn(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?en(e,r):(typeof r==`number`||typeof r==`bigint`)&&en(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=ln);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!At.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[_t]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Lt(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Yt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Zt(e,!!r,n,!0):Zt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}$t(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(an(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Jt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Zt(e,!!n,n?[]:``,!1):Zt(e,!!n,t,!0)):Zt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(an(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),wt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[Ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);wt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=D.d;D.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=Et(e);t!==null&&t.tag===5&&t.type===`form`?ks(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=qt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),k(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+qt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+qt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+qt(n.imageSizes)+`"]`)):i+=`[href="`+qt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),k(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+qt(r)+`"][href="`+qt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),k(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=Ot(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);k(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),k(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=Ot(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),k(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=_e.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=Ot(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=Ot(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=Ot(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+qt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),k(t),e.head.appendChild(t))}function Pf(e){return`[src="`+qt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+qt(n.href)+`"]`);if(r)return t.instance=r,k(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),k(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,k(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),k(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,k(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),k(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Ct]||a[gt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,k(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),k(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:S,Provider:null,Consumer:null,_currentValue:ue,_currentValue2:ue,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=at(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=at(0),this.hiddenUpdates=at(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=hi(3,null,null,t),e.current=a,a.stateNode=e,t=pa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ka(a),e}function tp(e){return e?(e=pi,e):pi}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ja(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ya(e,r,t),n!==null&&(hu(n,e,t),Xa(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ui(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=dt(t);var n=ui(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=2,up(e,t,n,r)}finally{D.p=a,E.T=i}}function lp(e,t,n,r){var i=E.T;E.T=null;var a=D.p;try{D.p=8,up(e,t,n,r)}finally{D.p=a,E.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=Et(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=et(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-qe(o);s.entanglements[1]|=c,o&=~c}rd(a),!(G&6)&&(tu=Fe()+500,id(0,!1))}}break;case 31:case 13:s=ui(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=dn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=Tt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ie()){case Le:return 2;case Re:return 8;case ze:case Be:return 32;case Ve:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Et(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=Tt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,mt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);un=r,n.target.dispatchEvent(r),un=null}else return t=Et(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=Et(n);a!==null&&(e.splice(t,3),t-=3,Ds(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[_t]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[_t]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[vt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=pt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.4`)throw Error(i(527,Lp,`19.2.4`));D.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.4`,rendererPackageName:`react-dom`,currentDispatcherRef:E,reconcilerVersion:`19.2.4`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{We=zp.inject(Rp),Ge=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Xs,s=Zs,c=Qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[vt]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=`modulepreload`,v=function(e){return`/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=v(t,n),t in y)return;y[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:_,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},x=c(u(),1),ee=`popstate`;function S(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function C(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return re(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ie(t)}return oe(t,n,null,e)}function w(e,t){if(e===!1||e==null)throw Error(t)}function T(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function te(){return Math.random().toString(36).substring(2,10)}function ne(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function re(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?ae(t):t,state:n,key:t&&t.key||r||te(),unstable_mask:i}}function ie({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function ae(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function oe(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=S(e)?e:re(h.location,e,t);n&&n(r,e),l=u()+1;let d=ne(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=S(e)?e:re(h.location,e,t);n&&n(r,e),l=u();let i=ne(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return se(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(ee,d),c=e,()=>{i.removeEventListener(ee,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function se(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),w(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:ie(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function ce(e,t,n=`/`){return le(e,t,n,!1)}function le(e,t,n,r){let i=we((typeof t==`string`?ae(t):t).pathname||`/`,n);if(i==null)return null;let a=D(e);de(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=Ce(i);o=be(a[e],t,r)}return o}function E(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function D(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;w(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=Me([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(w(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),D(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:ve(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of ue(e.path))a(e,t,!0,n)}),t}function ue(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=ue(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function de(e){e.sort((e,t)=>e.score===t.score?ye(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var fe=/^:[\w-]+$/,pe=3,me=2,O=1,he=10,ge=-2,_e=e=>e===`*`;function ve(e,t){let n=e.split(`/`),r=n.length;return n.some(_e)&&(r+=ge),t&&(r+=me),n.filter(e=>!_e(e)).reduce((e,t)=>e+(fe.test(t)?pe:t===``?O:he),r)}function ye(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function be(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=xe({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=xe({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Me([a,u.pathname]),pathnameBase:Ne(Me([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Me([a,u.pathnameBase]))}return o}function xe(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Se(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function Se(e,t=!1,n=!0){T(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Ce(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return T(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function we(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Te=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function Ee(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?ae(e):e,a;return n?(n=n.replace(/\/\/+/g,`/`),a=n.startsWith(`/`)?De(n.substring(1),`/`):De(n,t)):a=t,{pathname:a,search:Pe(r),hash:Fe(i)}}function De(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Oe(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ke(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Ae(e){let t=ke(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function je(e,t,n,r=!1){let i;typeof e==`string`?i=ae(e):(i={...e},w(!i.pathname||!i.pathname.includes(`?`),Oe(`?`,`pathname`,`search`,i)),w(!i.pathname||!i.pathname.includes(`#`),Oe(`#`,`pathname`,`hash`,i)),w(!i.search||!i.search.includes(`#`),Oe(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Ee(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Me=e=>e.join(`/`).replace(/\/\/+/g,`/`),Ne=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Pe=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Fe=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Ie=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Le(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Re(e){return e.map(e=>e.route.path).filter(Boolean).join(`/`).replace(/\/\/*/g,`/`)||`/`}var ze=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Be(e,t){let n=e;if(typeof n!=`string`||!Te.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(ze)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=we(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{T(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ve=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ve);var He=[`GET`,...Ve];new Set(He);var Ue=x.createContext(null);Ue.displayName=`DataRouter`;var We=x.createContext(null);We.displayName=`DataRouterState`;var Ge=x.createContext(!1),Ke=x.createContext({isTransitioning:!1});Ke.displayName=`ViewTransition`;var qe=x.createContext(new Map);qe.displayName=`Fetchers`;var Je=x.createContext(null);Je.displayName=`Await`;var Ye=x.createContext(null);Ye.displayName=`Navigation`;var Xe=x.createContext(null);Xe.displayName=`Location`;var Ze=x.createContext({outlet:null,matches:[],isDataRoute:!1});Ze.displayName=`Route`;var Qe=x.createContext(null);Qe.displayName=`RouteError`;var $e=`REACT_ROUTER_ERROR`,et=`REDIRECT`,tt=`ROUTE_ERROR_RESPONSE`;function nt(e){if(e.startsWith(`${$e}:${et}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function rt(e){if(e.startsWith(`${$e}:${tt}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Ie(t.status,t.statusText,t.data)}catch{}}function it(e,{relative:t}={}){w(at(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=x.useContext(Ye),{hash:i,pathname:a,search:o}=ft(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:Me([n,a])),r.createHref({pathname:s,search:o,hash:i})}function at(){return x.useContext(Xe)!=null}function ot(){return w(at(),`useLocation() may be used only in the context of a <Router> component.`),x.useContext(Xe).location}var st=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function ct(e){x.useContext(Ye).static||x.useLayoutEffect(e)}function lt(){let{isDataRoute:e}=x.useContext(Ze);return e?At():ut()}function ut(){w(at(),`useNavigate() may be used only in the context of a <Router> component.`);let e=x.useContext(Ue),{basename:t,navigator:n}=x.useContext(Ye),{matches:r}=x.useContext(Ze),{pathname:i}=ot(),a=JSON.stringify(Ae(r)),o=x.useRef(!1);return ct(()=>{o.current=!0}),x.useCallback((r,s={})=>{if(T(o.current,st),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=je(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Me([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}x.createContext(null);function dt(){let{matches:e}=x.useContext(Ze),t=e[e.length-1];return t?t.params:{}}function ft(e,{relative:t}={}){let{matches:n}=x.useContext(Ze),{pathname:r}=ot(),i=JSON.stringify(Ae(n));return x.useMemo(()=>je(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function pt(e,t){return mt(e,t)}function mt(e,t,n){w(at(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=x.useContext(Ye),{matches:i}=x.useContext(Ze),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Mt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=ot(),d;if(t){let e=typeof t==`string`?ae(t):t;w(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=ce(e,{pathname:p});T(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),T(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=xt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:Me([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Me([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?x.createElement(Xe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function ht(){let e=kt(),t=Le(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=x.createElement(x.Fragment,null,x.createElement(`p`,null,`💿 Hey developer 👋`),x.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,x.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,x.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),x.createElement(x.Fragment,null,x.createElement(`h2`,null,`Unexpected Application Error!`),x.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?x.createElement(`pre`,{style:i},n):null,o)}var gt=x.createElement(ht,null),_t=class extends x.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=rt(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:x.createElement(Ze.Provider,{value:this.props.routeContext},x.createElement(Qe.Provider,{value:e,children:this.props.component}));return this.context?x.createElement(yt,{error:e},t):t}};_t.contextType=Ge;var vt=new WeakMap;function yt({children:e,error:t}){let{basename:n}=x.useContext(Ye);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=nt(t.digest);if(e){let r=vt.get(t);if(r)throw r;let i=Be(e.location,n);if(ze&&!vt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw vt.set(t,n),n}return x.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function bt({routeContext:e,match:t,children:n}){let r=x.useContext(Ue);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),x.createElement(Ze.Provider,{value:e},n)}function xt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);w(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:Re(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||gt,o&&(s<0&&c===0?(Mt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?x.createElement(n.route.Component,null):n.route.element?n.route.element:e,x.createElement(bt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?x.createElement(_t,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function St(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ct(e){let t=x.useContext(Ue);return w(t,St(e)),t}function wt(e){let t=x.useContext(We);return w(t,St(e)),t}function Tt(e){let t=x.useContext(Ze);return w(t,St(e)),t}function Et(e){let t=Tt(e),n=t.matches[t.matches.length-1];return w(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function Dt(){return Et(`useRouteId`)}function Ot(){return wt(`useNavigation`).navigation}function k(){let{matches:e,loaderData:t}=wt(`useMatches`);return x.useMemo(()=>e.map(e=>E(e,t)),[e,t])}function kt(){let e=x.useContext(Qe),t=wt(`useRouteError`),n=Et(`useRouteError`);return e===void 0?t.errors?.[n]:e}function At(){let{router:e}=Ct(`useNavigate`),t=Et(`useNavigate`),n=x.useRef(!1);return ct(()=>{n.current=!0}),x.useCallback(async(r,i={})=>{T(n.current,st),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var jt={};function Mt(e,t,n){!t&&!jt[e]&&(jt[e]=!0,T(!1,n))}x.useOptimistic,x.memo(Nt);function Nt({routes:e,future:t,state:n,isStatic:r,onError:i}){return mt(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function Pt(e){w(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Ft({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){w(!at(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=x.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=ae(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=x.useMemo(()=>{let e=we(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return T(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:x.createElement(Ye.Provider,{value:c},x.createElement(Xe.Provider,{children:t,value:h}))}function It({children:e,location:t}){return pt(Lt(e),t)}function Lt(e,t=[]){let n=[];return x.Children.forEach(e,(e,r)=>{if(!x.isValidElement(e))return;let i=[...t,r];if(e.type===x.Fragment){n.push.apply(n,Lt(e.props.children,i));return}w(e.type===Pt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),w(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Lt(e.props.children,i)),n.push(a)}),n}var Rt=`get`,zt=`application/x-www-form-urlencoded`;function Bt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Vt(e){return Bt(e)&&e.tagName.toLowerCase()===`button`}function Ht(e){return Bt(e)&&e.tagName.toLowerCase()===`form`}function Ut(e){return Bt(e)&&e.tagName.toLowerCase()===`input`}function Wt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Gt(e,t){return e.button===0&&(!t||t===`_self`)&&!Wt(e)}function Kt(e=``){return new URLSearchParams(typeof e==`string`||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((t,n)=>{let r=e[n];return t.concat(Array.isArray(r)?r.map(e=>[n,e]):[[n,r]])},[]))}function qt(e,t){let n=Kt(e);return t&&t.forEach((e,r)=>{n.has(r)||t.getAll(r).forEach(e=>{n.append(r,e)})}),n}var Jt=null;function Yt(){if(Jt===null)try{new FormData(document.createElement(`form`),0),Jt=!1}catch{Jt=!0}return Jt}var Xt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Zt(e){return e!=null&&!Xt.has(e)?(T(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${zt}"`),null):e}function Qt(e,t){let n,r,i,a,o;if(Ht(e)){let o=e.getAttribute(`action`);r=o?we(o,t):null,n=e.getAttribute(`method`)||Rt,i=Zt(e.getAttribute(`enctype`))||zt,a=new FormData(e)}else if(Vt(e)||Ut(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?we(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Rt,i=Zt(e.getAttribute(`formenctype`))||Zt(o.getAttribute(`enctype`))||zt,a=new FormData(o,e),!Yt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Bt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Rt,r=null,i=zt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var $t={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},en=/[&><\u2028\u2029]/g;function tn(e){return e.replace(en,e=>$t[e])}function nn(e,t){if(e===!1||e==null)throw Error(t)}function rn(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&we(i.pathname,t)===`/`?i.pathname=`${t.replace(/\/$/,``)}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,``)}.${r}`,i}async function an(e,t){if(e.id in t)return t[e.id];try{let n=await b(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function on(e){return e!=null&&typeof e.page==`string`}function sn(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function cn(e,t,n){return pn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await an(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(sn).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function ln(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function un(e,t,{includeHydrateFallback:n}={}){return dn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function dn(e){return[...new Set(e)]}function fn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function pn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!on(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(fn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function mn(){let e=x.useContext(Ue);return nn(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function hn(){let e=x.useContext(We);return nn(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var gn=x.createContext(void 0);gn.displayName=`FrameworkContext`;function _n(){let e=x.useContext(gn);return nn(e,`You must render this element inside a <HydratedRouter> element`),e}function vn(e,t){let n=x.useContext(gn),[r,i]=x.useState(!1),[a,o]=x.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=x.useRef(null);x.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),x.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:yn(s,p),onBlur:yn(c,m),onMouseEnter:yn(l,p),onMouseLeave:yn(u,m),onTouchStart:yn(d,p)}]:[a,f,{}]:[!1,f,{}]}function yn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function bn({page:e,...t}){let{router:n}=mn(),r=x.useMemo(()=>ce(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?x.createElement(Sn,{page:e,matches:r,...t}):null}function xn(e){let{manifest:t,routeModules:n}=_n(),[r,i]=x.useState([]);return x.useEffect(()=>{let r=!1;return cn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function Sn({page:e,matches:t,...n}){let r=ot(),{future:i,manifest:a,routeModules:o}=_n(),{basename:s}=mn(),{loaderData:c,matches:l}=hn(),u=x.useMemo(()=>ln(e,t,l,a,r,`data`),[e,t,l,a,r]),d=x.useMemo(()=>ln(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=x.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=rn(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=x.useMemo(()=>un(d,a),[d,a]),m=xn(d);return x.createElement(x.Fragment,null,f.map(e=>x.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>x.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>x.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function Cn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}var wn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{wn&&(window.__reactRouterVersion=`7.13.1`)}catch{}function Tn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=x.useRef();i.current??=C({window:r,v5Compat:!0});let a=i.current,[o,s]=x.useState({action:a.action,location:a.location}),c=x.useCallback(e=>{n===!1?s(e):x.startTransition(()=>s(e))},[n]);return x.useLayoutEffect(()=>a.listen(c),[a,c]),x.createElement(Ft,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function En({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=x.useState({action:n.action,location:n.location}),o=x.useCallback(e=>{r===!1?a(e):x.startTransition(()=>a(e))},[r]);return x.useLayoutEffect(()=>n.listen(o),[n,o]),x.createElement(Ft,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}En.displayName=`unstable_HistoryRouter`;var Dn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,A=x.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=x.useContext(Ye),v=typeof l==`string`&&Dn.test(l),y=Be(l,h);l=y.to;let b=it(l,{relative:r}),ee=ot(),S=null;if(o){let e=je(o,[],ee.unstable_mask?ee.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:Me([h,e.pathname])),S=g.createHref(e)}let[C,w,T]=vn(n,p),te=Pn(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function ne(t){e&&e(t),t.defaultPrevented||te(t)}let re=!(y.isExternal||i),ie=x.createElement(`a`,{...p,...T,href:(re?S:void 0)||y.absoluteURL||b,onClick:re?ne:e,ref:Cn(m,w),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?x.createElement(x.Fragment,null,ie,x.createElement(bn,{page:b})):ie});A.displayName=`Link`;var On=x.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=ft(a,{relative:c.relative}),d=ot(),f=x.useContext(We),{navigator:p,basename:m}=x.useContext(Ye),h=f!=null&&Gn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=we(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,ee=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:ee,isTransitioning:h},C=b?e:void 0,w;w=typeof n==`function`?n(S):[n,b?`active`:null,ee?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(S):i;return x.createElement(A,{...c,"aria-current":C,className:w,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(S):s)});On.displayName=`NavLink`;var kn=x.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Rt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=x.useContext(Ye),g=Rn(),_=zn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Dn.test(s);return x.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?x.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});kn.displayName=`Form`;function An({getKey:e,storageKey:t,...n}){let r=x.useContext(gn),{basename:i}=x.useContext(Ye),a=ot(),o=k();Un({getKey:e,storageKey:t});let s=x.useMemo(()=>{if(!r||!e)return null;let t=Hn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return x.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${tn(JSON.stringify(t||Bn))}, ${tn(JSON.stringify(s))})`}})}An.displayName=`ScrollRestoration`;function jn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Mn(e){let t=x.useContext(Ue);return w(t,jn(e)),t}function Nn(e){let t=x.useContext(We);return w(t,jn(e)),t}function Pn(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=lt(),d=ot(),f=ft(e,{relative:o});return x.useCallback(p=>{if(Gt(p,t)){p.preventDefault();let t=n===void 0?ie(d)===ie(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?x.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}function Fn(e){T(typeof URLSearchParams<`u`,"You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let t=x.useRef(Kt(e)),n=x.useRef(!1),r=ot(),i=x.useMemo(()=>qt(r.search,n.current?null:t.current),[r.search]),a=lt();return[i,x.useCallback((e,t)=>{let r=Kt(typeof e==`function`?e(new URLSearchParams(i)):e);n.current=!0,a(`?`+r,t)},[a,i])]}var In=0,Ln=()=>`__${String(++In)}__`;function Rn(){let{router:e}=Mn(`useSubmit`),{basename:t}=x.useContext(Ye),n=Dt(),r=e.fetch,i=e.navigate;return x.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Qt(e,t);a.navigate===!1?await r(a.fetcherKey||Ln(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function zn(e,{relative:t}={}){let{basename:n}=x.useContext(Ye),r=x.useContext(Ze);w(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...ft(e||`.`,{relative:t})},o=ot();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:Me([n,a.pathname])),ie(a)}var Bn=`react-router-scroll-positions`,Vn={};function Hn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:we(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Un({getKey:e,storageKey:t}={}){let{router:n}=Mn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Nn(`useScrollRestoration`),{basename:a}=x.useContext(Ye),o=ot(),s=k(),c=Ot();x.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Wn(x.useCallback(()=>{if(c.state===`idle`){let t=Hn(o,s,a,e);Vn[t]=window.scrollY}try{sessionStorage.setItem(t||Bn,JSON.stringify(Vn))}catch(e){T(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(x.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Bn);e&&(Vn=JSON.parse(e))}catch{}},[t]),x.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Vn,()=>window.scrollY,e?(t,n)=>Hn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),x.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{T(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Wn(e,t){let{capture:n}=t||{};x.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Gn(e,{relative:t}={}){let n=x.useContext(Ke);w(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Mn(`useViewTransitionState`),i=ft(e,{relative:t});if(!n.isTransitioning)return!1;let a=we(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=we(n.nextLocation.pathname,r)||n.nextLocation.pathname;return xe(i.pathname,o)!=null||xe(i.pathname,a)!=null}var Kn=c(g(),1),qn=`veritas_auth`,Jn=`veritas_bookmarks`;function Yn(){try{let e=localStorage.getItem(qn),t=JSON.parse(localStorage.getItem(Jn)||`[]`);if(e)return{user:JSON.parse(e),isLoggedIn:!0,bookmarks:t}}catch{}return{user:null,isLoggedIn:!1,bookmarks:[]}}function Xn(e){e?localStorage.setItem(qn,JSON.stringify(e)):localStorage.removeItem(qn)}function Zn(e){localStorage.setItem(Jn,JSON.stringify(e))}async function Qn(e){let t=new TextEncoder().encode(e+`veritas_salt_2026`),n=await crypto.subtle.digest(`SHA-256`,t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}var $n=`veritas_users`;function er(){try{return JSON.parse(localStorage.getItem($n)||`[]`)}catch{return[]}}function tr(e){localStorage.setItem($n,JSON.stringify(e))}async function nr(e,t,n){let r=er();if(r.find(t=>t.email.toLowerCase()===e.toLowerCase()))return{success:!1,error:`An account with this email already exists.`};let i=await Qn(t),a={email:e.toLowerCase(),displayName:n,passwordHash:i,createdAt:new Date().toISOString()};r.push(a),tr(r);let o={email:a.email,displayName:a.displayName,createdAt:a.createdAt};return Xn(o),{success:!0,user:o}}async function rr(e,t){let n=er().find(t=>t.email.toLowerCase()===e.toLowerCase());if(!n)return{success:!1,error:`No account found with this email.`};let r=await Qn(t);if(n.passwordHash!==r)return{success:!1,error:`Incorrect password.`};let i={email:n.email,displayName:n.displayName,createdAt:n.createdAt};return Xn(i),{success:!0,user:i}}function ir(){Xn(null)}function ar(){return Yn()}function or(e){let t=Yn(),n;return n=t.bookmarks.includes(e)?t.bookmarks.filter(t=>t!==e):[...t.bookmarks,e],Zn(n),n}function sr(){try{return JSON.parse(localStorage.getItem(Jn)||`[]`)}catch{return[]}}var cr=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),j=o(((e,t)=>{t.exports=cr()}))(),lr=(0,x.createContext)(null);function ur({children:e}){let t=ar(),[n,r]=(0,x.useState)(t.user),[i,a]=(0,x.useState)(t.bookmarks),[o,s]=(0,x.useState)(!1),[c,l]=(0,x.useState)(null),u=(0,x.useCallback)(e=>{l(e),setTimeout(()=>l(null),3e3)},[]),d=(0,x.useCallback)(async(e,t)=>{let n=await rr(e,t);return n.success&&n.user&&(r(n.user),a(sr()),u(`Welcome back.`)),{success:n.success,error:n.error}},[u]),f=(0,x.useCallback)(async(e,t,n)=>{let i=await nr(e,t,n);return i.success&&i.user&&(r(i.user),a(sr()),u(`Account created. Welcome.`)),{success:i.success,error:i.error}},[u]),p=(0,x.useCallback)(()=>{ir(),r(null),u(`Signed out.`)},[u]),m=(0,x.useCallback)(e=>{let t=or(e);a(t),t.includes(e)?u(`Saved to bookmarks.`):u(`Removed from bookmarks.`)},[u]),h=(0,x.useCallback)(e=>i.includes(e),[i]);return(0,j.jsx)(lr.Provider,{value:{user:n,isLoggedIn:!!n,bookmarks:i,showAuthModal:o,setShowAuthModal:s,login:d,signup:f,logout:p,toggleBookmark:m,isBookmarked:h,toast:c},children:e})}function dr(){let e=(0,x.useContext)(lr);if(!e)throw Error(`useAuth must be used within AuthProvider`);return e}function fr(){let{showAuthModal:e,setShowAuthModal:t,login:n,signup:r}=dr(),[i,a]=(0,x.useState)(`signup`),[o,s]=(0,x.useState)(``),[c,l]=(0,x.useState)(``),[u,d]=(0,x.useState)(``),[f,p]=(0,x.useState)(``),[m,h]=(0,x.useState)(!1),g=(0,x.useRef)(null);if((0,x.useEffect)(()=>{e&&(p(``),s(``),l(``),d(``),setTimeout(()=>g.current?.focus(),100))},[e,i]),(0,x.useEffect)(()=>(e?document.body.style.overflow=`hidden`:document.body.style.overflow=``,()=>{document.body.style.overflow=``}),[e]),!e)return null;let _=async e=>{if(e.preventDefault(),p(``),!o||!c){p(`Please fill in all fields.`);return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){p(`Please enter a valid email address.`);return}if(c.length<6){p(`Password must be at least 6 characters.`);return}if(i===`signup`&&!u.trim()){p(`Please enter your name.`);return}h(!0);try{let e=i===`signup`?await r(o,c,u.trim()):await n(o,c);e.success?t(!1):p(e.error||`Something went wrong.`)}finally{h(!1)}};return(0,j.jsxs)(`div`,{className:`fixed inset-0 z-[100] flex items-center justify-center p-4`,onClick:e=>{e.target===e.currentTarget&&t(!1)},children:[(0,j.jsx)(`div`,{className:`absolute inset-0 bg-ink/60 backdrop-blur-sm`}),(0,j.jsxs)(`div`,{className:`relative w-full max-w-md bg-parchment rounded-sm shadow-2xl border border-border`,children:[(0,j.jsx)(`button`,{onClick:()=>t(!1),className:`absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors`,"aria-label":`Close`,children:(0,j.jsx)(`svg`,{className:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M6 18L18 6M6 6l12 12`})})}),(0,j.jsxs)(`div`,{className:`p-8`,children:[(0,j.jsxs)(`div`,{className:`text-center mb-8`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-2`,children:`Veritas Worldwide Press`}),(0,j.jsx)(`h2`,{className:`font-display text-2xl font-bold text-ink mb-2`,children:i===`signup`?`Create Your Free Account`:`Welcome Back`}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-muted leading-relaxed`,children:i===`signup`?`Join our readers to access full articles, save pages, and support independent research.`:`Sign in to access your saved articles and full content.`})]}),(0,j.jsxs)(`form`,{onSubmit:_,className:`space-y-4`,children:[i===`signup`&&(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`label`,{className:`font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5`,children:`Name`}),(0,j.jsx)(`input`,{type:`text`,value:u,onChange:e=>d(e.target.value),placeholder:`Your name`,className:`w-full px-4 py-2.5 bg-white border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors`})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`label`,{className:`font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5`,children:`Email`}),(0,j.jsx)(`input`,{ref:g,type:`email`,value:o,onChange:e=>s(e.target.value),placeholder:`you@example.com`,className:`w-full px-4 py-2.5 bg-white border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors`})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`label`,{className:`font-sans text-xs font-semibold tracking-[0.05em] uppercase text-ink-muted block mb-1.5`,children:`Password`}),(0,j.jsx)(`input`,{type:`password`,value:c,onChange:e=>l(e.target.value),placeholder:`At least 6 characters`,className:`w-full px-4 py-2.5 bg-white border border-border rounded-sm font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-crimson transition-colors`})]}),f&&(0,j.jsx)(`p`,{className:`font-sans text-xs text-disputed font-semibold`,children:f}),(0,j.jsx)(`button`,{type:`submit`,disabled:m,className:`w-full py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson-dark transition-colors disabled:opacity-50`,children:m?`Please wait...`:i===`signup`?`Create Free Account`:`Sign In`})]}),(0,j.jsx)(`div`,{className:`mt-6 text-center`,children:(0,j.jsxs)(`p`,{className:`font-sans text-xs text-ink-muted`,children:[i===`signup`?`Already have an account?`:`Don't have an account?`,` `,(0,j.jsx)(`button`,{onClick:()=>{a(i===`signup`?`login`:`signup`),p(``)},className:`text-crimson font-semibold hover:text-crimson-dark transition-colors`,children:i===`signup`?`Sign in`:`Create one free`})]})}),(0,j.jsx)(`div`,{className:`mt-6 pt-4 border-t border-border text-center`,children:(0,j.jsx)(`p`,{className:`font-body text-xs italic text-ink-faint leading-relaxed`,children:`Creating an account is completely free. We believe this information should be accessible to everyone.`})})]})]})]})}function pr(){let{toast:e}=dr();return e?(0,j.jsx)(`div`,{className:`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-in`,children:(0,j.jsx)(`div`,{className:`bg-ink text-white px-6 py-3 rounded-sm shadow-lg font-sans text-sm`,children:e})}):null}function mr(){let{pathname:e}=ot();return(0,x.useEffect)(()=>{window.scrollTo(0,0)},[e]),null}var hr=[{id:`foreword`,number:`Foreword`,title:`A Note on Methodology, Evidence Standards & How to Read This Book`,subtitle:`This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and verified financial disclosures — into a single chronological narrative.`,dateRange:``,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Before proceeding, it is necessary to address a phrase that will occur to many readers upon encountering this book's subject matter. The term "conspiracy theory" has become, in modern usage, a mechanism for dismissing inquiry rather than engaging with it. Its history is instructive. A 1967 CIA dispatch (Document 1035-960), declassified in 1976 under a Freedom of Information Act request by The New York Times, recommended that the Agency's media contacts use the term "conspiracy theorists" to discredit critics of the Warren Commission's findings on the assassination of President Kennedy. The document is available in full from the National Archives.`},{type:`text`,text:`This is not to suggest that all claims labeled "conspiracy theories" are true. Many are not. It is to observe that the phrase functions, in practice, as a thought-terminating cliché — a label that substitutes for analysis. When a claim is false, it can be refuted with evidence. When a claim is true but inconvenient, it is often easier to label it a "conspiracy theory" than to address the evidence it presents.`},{type:`text`,text:`This book does not ask the reader to accept any theory. It presents documented facts — sourced to primary documents that the reader can verify independently — and allows those facts to speak for themselves. Where the evidence is strong, we say so. Where the evidence is incomplete or contested, we say that as well. Where a mainstream counter-argument exists, we present it. The reader is the judge.`},{type:`evidence`,evidence:{tier:`verified`,label:`THE COUNTER-ARGUMENT, STATED FAIRLY`,text:`Skeptics will argue — reasonably — that pattern recognition is not proof of coordination. The fact that the same institutions, families, or individuals appear across multiple historical events does not, by itself, prove that those events were orchestrated. Correlation is not causation. Institutional power tends to concentrate naturally in market economies, and the same names recur because wealth compounds across generations. This is a valid analytical framework, and the reader should keep it in mind throughout.`}},{type:`heading`,text:`Methodology`},{type:`text`,text:`The research methodology for this book follows the standards of academic historiography. Every factual claim is sourced. Sources are prioritized in a four-tier hierarchy: Tier 1 (Primary) includes congressional records, court filings, executive orders, declassified intelligence documents, SEC filings, Federal Register entries, and National Archives materials. Tier 2 (Peer-Reviewed) includes academic journal articles, university press monographs, and doctoral dissertations. Tier 3 (Verified Journalism) includes investigative reporting from established outlets with named sources, FOIA-obtained documents, and court-verified testimony. Tier 4 (Secondary) includes biographies, historical surveys, and memoirs used for context but not as sole evidence for factual claims.`},{type:`heading`,text:`The Three-Tier Evidence Classification System`},{type:`text`,text:`Every substantive claim in this book is classified using a three-tier evidence system. This system exists for a single purpose: to allow the reader to evaluate each claim independently, on its own merits, rather than accepting or rejecting the book as a whole.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`This claim is supported by a primary source document: a court filing, a congressional record, a National Archives document, a signed executive order, a published academic study with peer review, or a verified journalistic investigation based on primary sources. The source is cited. The document exists and is publicly accessible.`}},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`,text:`Each individual fact in this section is documented and independently verifiable. However, the connection drawn between those facts — the inference that they form a pattern or indicate coordination — is an interpretation, not a proven conclusion. Alternative explanations exist and are noted where applicable.`}},{type:`evidence`,evidence:{tier:`disputed`,label:`DISPUTED / UNPROVEN — Reported But Not Independently Confirmed`,text:`This claim has been made by a named source, in a published report, or in sworn testimony — but it has not been independently confirmed by multiple credible sources, proven in a court of law, or supported by primary documentation. It is included because it is part of the historical record. It is clearly labeled and should not be treated as established fact.`}},{type:`heading`,text:`What This Book Is Not`},{type:`text`,text:`This book is not a polemic. It does not argue for a single, unified "conspiracy" that explains all of modern history. The historical record is more complex than any single narrative can capture, and the authors of this book are aware that the desire to find patterns can itself become a form of bias — a phenomenon psychologists call apophenia.`},{type:`text`,text:`This book is not a political document. It documents actions taken by both Republican and Democratic administrations, by both conservative and liberal institutions, and by individuals across the political spectrum. The patterns documented here do not align neatly with any partisan framework, which is itself part of the point.`},{type:`quote`,quote:{text:`The real truth of the matter is, as you and I know, that a financial element in the larger centers has owned the Government ever since the days of Andrew Jackson.`,attribution:`Franklin D. Roosevelt, Letter to Colonel Edward House, November 21, 1933`,note:`Original held in the FDR Presidential Library, Hyde Park, NY`}},{type:`quote`,quote:{text:`In the councils of government, we must guard against the acquisition of unwarranted influence, whether sought or unsought, by the military-industrial complex.`,attribution:`President Dwight D. Eisenhower, Farewell Address, January 17, 1961`,note:`Full text and video archived at the Eisenhower Presidential Library`}},{type:`text`,text:`Every source cited in this book is publicly accessible. Congressional records are available through congress.gov. Court filings are available through PACER and public court websites. Declassified documents are available through the National Archives, the CIA FOIA Reading Room, and the National Security Archive at George Washington University. SEC filings are available through EDGAR. The reader is encouraged to verify any claim independently. This book is not asking for trust. It is asking for examination.`}],sources:[{id:1,text:`Central Intelligence Agency, "Countering Criticism of the Warren Report," Dispatch 1035-960, April 1, 1967. Declassified 1976.`,url:`https://www.maryferrell.org`}],crossLinks:[{label:`Chapter 1: The Birth of Central Banking`,chapterId:`chapter-1`},{label:`Overview: The World Today`,chapterId:`overview`}],keywords:[`methodology`,`evidence`,`conspiracy theory`,`CIA`,`Warren Commission`,`primary sources`,`historiography`]},{id:`overview`,number:`Overview`,title:`The World Today`,subtitle:`How a convergence of financial, political, pharmaceutical, and intelligence systems created the architecture of modern control — and why most people never notice.`,dateRange:`2025`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`This chapter is your map. The chapters that follow will take you deep into the history — the Rothschild banking dynasty, the creation of the Federal Reserve, the assassination of JFK, the Epstein intelligence operation, and more. But before you descend into those details, you need to see the present clearly. What follows is a systematic overview of the interlocking systems that shape your daily life: what you eat, what you watch, who represents you, how your money works, and what happens to those who try to change it.`},{type:`heading`,text:`I. Your Representatives Are Bought`},{type:`text`,text:`The American Israel Public Affairs Committee (AIPAC) is the most powerful foreign-policy lobbying organization in the United States. In the 2024 election cycle alone, AIPAC and its affiliated entities directed $42.6 million to congressional candidates — reaching 489 individual recipients across both parties. This is not a partisan issue. Democrats received 58.6% of AIPAC funds; Republicans received 38.5%. The lobby buys both sides.`},{type:`stats`,stats:[{value:`$42.6M`,label:`AIPAC TOTAL (2024 CYCLE)`},{value:`489`,label:`CONGRESSIONAL RECIPIENTS`},{value:`$227K`,label:`AVG. SENATE RECIPIENT`},{value:`$87K`,label:`AVG. HOUSE RECIPIENT`}]},{type:`table`,table:{headers:[`Rank`,`Recipient`,`Party`,`Total from AIPAC`,`Chamber`],rows:[[`1`,`Wesley Bell`,`D-MO`,`$2,555,095`,`House`],[`2`,`George Latimer`,`D-NY`,`$2,448,899`,`House`],[`3`,`Jacky Rosen`,`D-NV`,`$1,269,951`,`Senate`],[`4`,`Robert Menendez`,`I-NJ`,`$1,074,760`,`Senate`],[`5`,`Hakeem Jeffries`,`D-NY`,`$866,425`,`House`],[`6`,`Josh Gottheimer`,`D-NJ`,`$797,189`,`House`],[`7`,`Donald Bacon`,`R-NE`,`$697,837`,`House`],[`8`,`Mike Johnson`,`R-LA`,`$618,530`,`House`],[`9`,`Ted Cruz`,`R-TX`,`$562,593`,`Senate`],[`10`,`Debbie Wasserman Schultz`,`D-FL`,`$519,842`,`House`]],caption:`Source: OpenSecrets.org, FEC data released February 6, 2025. 2024 election cycle.`}},{type:`text`,text:`The spending is strategic. When Rep. Cori Bush (D-MO) and Rep. Jamaal Bowman (D-NY) — both members of "The Squad" who vocally supported Palestinian rights — faced primary challenges, AIPAC flooded their opponents with cash. Wesley Bell received $2.55 million from AIPAC-linked donors and defeated Bush. George Latimer received $2.45 million and defeated Bowman. The message to Congress is unmistakable: criticize Israel, and you will be replaced.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — FEDERAL ELECTION COMMISSION RECORDS`,text:`All AIPAC contribution data is sourced from FEC filings as compiled by OpenSecrets.org. These are public records. Every dollar listed above is documented, traceable, and verifiable. The pattern is clear: AIPAC spends across both parties, targeting leadership positions and eliminating dissenters.`}},{type:`heading`,text:`II. Six Corporations Control What You See`},{type:`text`,text:`In 1983, fifty companies controlled the majority of American media. By 2025, that number has collapsed to six: Comcast, Walt Disney, Warner Bros. Discovery, Paramount Global, Sony, and Amazon. These six corporations control approximately 90% of what Americans read, watch, and hear. But the consolidation goes deeper than corporate logos.`},{type:`text`,text:`A Harvard University investigation into media ownership revealed a striking pattern: the same institutional investors — Vanguard, BlackRock, and State Street — appear as top shareholders in virtually every major media company. Vanguard holds 13.05% of Fox/News Corp, 7.43% of CNN's parent company, and 7.66% of Disney/ABC. BlackRock holds 4.99% of Fox, 4.85% of CNN, and comparable stakes across the board. State Street rounds out the trio.`},{type:`table`,table:{headers:[`Media Company`,`Controlling Interest`,`Vanguard Stake`,`BlackRock Stake`,`Properties`],rows:[[`Fox / News Corp`,`Murdoch Family (39%)`,`13.05%`,`4.99%`,`Fox News, WSJ, NY Post`],[`CNN / Warner`,`AT&T / Discovery`,`7.43%`,`4.85%`,`CNN, HBO, TNT`],[`ABC / Disney`,`L. Powell Jobs Trust`,`7.66%`,`~4.5%`,`ABC, ESPN, FX, Marvel`],[`NBC / Comcast`,`Roberts Family`,`Major`,`Major`,`NBC, MSNBC, CNBC, Universal`],[`Paramount`,`Shari Redstone`,`Major`,`Major`,`CBS, MTV, Nickelodeon`]],caption:`Source: Harvard Future of Media Project, SEC filings, 2021.`}},{type:`text`,text:`This means the same three asset managers that control your retirement fund also control the news you consume. The illusion of media diversity — Fox vs. CNN, MSNBC vs. Newsmax — masks a deeper unity of ownership. The "debate" is managed. The boundaries of acceptable discourse are set by the same capital.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — OWNERSHIP ≠ EDITORIAL CONTROL`,text:`Institutional ownership does not automatically equal editorial control. Vanguard and BlackRock hold shares through index funds on behalf of millions of investors. However, these firms exercise proxy voting power at shareholder meetings, influence board composition, and set ESG standards that shape corporate behavior. The question is not whether they dictate headlines — it is whether the structural incentives of consolidated ownership produce a narrowing of permissible narratives.`}},{type:`heading`,text:`III. Three Companies Own Everything`},{type:`text`,text:`BlackRock, Vanguard, and State Street collectively manage approximately $25.9 trillion in assets — a figure that exceeds the entire GDP of the United States (~$28 trillion). BlackRock alone manages $12.5 trillion. These are not banks. They are asset managers — the silent majority shareholders of virtually every publicly traded corporation in America.`},{type:`stats`,stats:[{value:`$12.5T`,label:`BLACKROCK AUM`},{value:`$9.3T`,label:`VANGUARD AUM`},{value:`$4.1T`,label:`STATE STREET AUM`},{value:`$25.9T`,label:`COMBINED TOTAL`}]},{type:`text`,text:`BlackRock was founded in 1988 by Larry Fink and seven partners, initially as a risk-management division of Blackstone Group. By 2009, the U.S. Treasury had retained BlackRock Solutions to analyze and unwind the toxic assets from the 2008 financial crisis — effectively making a private firm the arbiter of the nation's financial recovery. The Federal Reserve allowed BlackRock to superintend the $130 billion debt settlement of Bear Stearns and AIG.`},{type:`text`,text:`BlackRock's Aladdin platform — an acronym for Asset, Liability, and Debt and Derivative Investment Network — monitors and manages investment portfolios worth an estimated $21.6 trillion across all its clients, including sovereign wealth funds, pension systems, and central banks. One algorithm, one company, one system.`},{type:`text`,text:`Between 2021 and 2023, institutional investors — led by firms in which BlackRock is the largest shareholder — purchased an unprecedented share of single-family homes across the United States. Invitation Homes, in which BlackRock holds the largest institutional stake, owns over 80,000 single-family rental properties. American Homes 4 Rent controls another 60,000+. In some Sun Belt markets, institutional buyers accounted for up to 25% of all home purchases, driving prices beyond the reach of first-time buyers and converting the American Dream of homeownership into a subscription service.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — SEC FILINGS & PUBLIC FINANCIAL DISCLOSURES`,text:`BlackRock's AUM figures are reported in quarterly SEC filings. Invitation Homes' ownership structure is public record. The Federal Reserve's engagement of BlackRock during the 2008 crisis is documented in congressional testimony.`}},{type:`heading`,text:`IV. What You Eat Is Making You Sick`},{type:`text`,text:`In 1911, Procter & Gamble introduced Crisco — the first commercially produced shortening made from hydrogenated cottonseed oil. It was a revolution in food manufacturing, not because it was healthier, but because it was cheaper. Cottonseed oil had previously been classified as toxic waste from the cotton industry. Through aggressive marketing and partnerships with the American Heart Association, seed oils were rebranded as "heart-healthy" alternatives to animal fats.`},{type:`text`,text:`The numbers tell the story. In 1900, soybean oil consumption in the United States was effectively zero. By 2025, Americans consume an average of 80 grams per day — a roughly 1,000-fold increase. Soybean oil alone now accounts for approximately 10% of total caloric intake in the American diet. Vegetable oils collectively represent 32% of the average American's calories — up from 0% before Crisco.`},{type:`stats`,stats:[{value:`1,000x`,label:`SOYBEAN OIL INCREASE SINCE 1900`},{value:`-51%`,label:`GLOBAL SPERM COUNT (1973-2018)`},{value:`-1%/yr`,label:`TESTOSTERONE DECLINE SINCE 1980S`}]},{type:`text`,text:`Male testosterone levels have been declining at approximately 1% per year since the 1980s, according to data published in the Journal of Clinical Endocrinology & Metabolism. Global sperm counts declined by 51% between 1973 and 2018, per a meta-analysis published in Human Reproduction Update.`},{type:`heading`,text:`V. The Chronic Disease Machine`},{type:`text`,text:`Approximately 60% of American adults now have at least one chronic disease, according to the National Institute for Health Care Management (NIHCM). Chronic, non-communicable diseases account for eight of the ten leading causes of death in the United States.`},{type:`table`,table:{headers:[`Condition`,`Prevalence (Earlier)`,`Prevalence (Recent)`,`Change`],rows:[[`Obesity`,`30.5% (1999-2000)`,`42.4% (2022)`,`+39%`],[`Diabetes`,`10.3% (2001-2004)`,`13.2% (2017-2020)`,`+28%`],[`Autoimmune Disorders`,`~24M (2005 est.)`,`~50M (2024 est.)`,`+108%`],[`Childhood Obesity`,`13.9% (1999-2000)`,`19.7% (2017-2020)`,`+42%`],[`Mental Health (Depression)`,`6.7% (2005)`,`8.4% (2021)`,`+25%`]],caption:`Sources: CDC NHANES, NIH/PMC, NIHCM, KFF Health System Tracker.`}},{type:`text`,text:`The United States spends $4.5 trillion per year on healthcare — more than any other nation on Earth, by a wide margin. Yet Americans are sicker than citizens of comparable nations. The system is not failing. It is succeeding — at generating revenue. Pfizer alone reported $100.3 billion in revenue in 2022, driven largely by COVID-19 vaccines and treatments. Since 2000, Pfizer has paid $4.7 billion in fines for illegal marketing, bribery, and fraud — including the largest pharmaceutical settlement in U.S. history ($2.3 billion in 2009).`},{type:`quote`,quote:{text:`A patient cured is a customer lost.`,attribution:`Goldman Sachs Analyst Report on Gene Therapy, April 2018`,note:`Research note titled "The Genome Revolution"`}},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — CDC, NIH, AND CORPORATE FINANCIAL FILINGS`,text:`All chronic disease statistics are sourced from CDC NHANES surveys and NIH publications. Pfizer revenue and fine data are from SEC filings and Department of Justice records. The Goldman Sachs quote appeared in a research note titled "The Genome Revolution" (April 10, 2018).`}},{type:`heading`,text:`VI. The Invisible Slave Trade`},{type:`text`,text:`The International Labour Organization (ILO) estimates that 50 million people are living in conditions of modern slavery worldwide as of 2022 — including 27.6 million in forced labor and 22 million in forced marriage. The global profits from forced labor alone total an estimated $150 billion annually. Women and girls constitute 61% of all detected trafficking victims, and the majority are trafficked for sexual exploitation, according to the UNODC Global Report on Trafficking in Persons.`},{type:`stats`,stats:[{value:`50M`,label:`PEOPLE IN MODERN SLAVERY`},{value:`$150B`,label:`ANNUAL FORCED LABOR PROFITS`},{value:`61%`,label:`VICTIMS ARE WOMEN/GIRLS`}]},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — ILO, UNODC, U.S. STATE DEPARTMENT`,text:`All trafficking statistics are sourced from the ILO Global Estimates of Modern Slavery (2022), the UNODC Global Report on Trafficking in Persons (2024), and the U.S. State Department Trafficking in Persons Report (2025).`}},{type:`heading`,text:`VII. The Kushner Nexus`},{type:`text`,text:`Jared Kushner — son-in-law of President Donald Trump and Senior Advisor to the President from 2017 to 2021 — represents one of the most visible intersections of American political power and Israeli interests in modern history. In 2007, Kushner Companies purchased 666 Fifth Avenue in Manhattan for $1.8 billion — a record price at the time. The building became a massive financial liability. In 2018, while Jared Kushner served as the administration's Middle East envoy, Brookfield Asset Management signed a 99-year lease on the property, paying $1.2 billion. A Senate Finance Committee investigation led by Sen. Ron Wyden found that Brookfield's funding came from the Government of Qatar.`},{type:`text`,text:`After leaving the White House, Jared Kushner launched Affinity Partners, a private equity firm that received a $2 billion investment from the Saudi Arabian Public Investment Fund — a deal that drew scrutiny from the Senate Finance Committee and was described by ethics experts as unprecedented.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — SENATE INVESTIGATION, NYT, SEC FILINGS`,text:`The 666 Fifth Avenue deal, Qatar funding connection, and Saudi investment are documented in Senate Finance Committee correspondence, New York Times reporting, and SEC filings.`}},{type:`heading`,text:`VIII. The Illusion of Opposition`},{type:`text`,text:`George Soros — Hungarian-American financier, born 1930 — has distributed over $32 billion through his Open Society Foundations since 1984, making it one of the largest private philanthropic networks in history. The concept of controlled opposition — in which both sides of a political debate are funded or influenced by the same interests — is central to understanding modern political theater. The left-right paradigm, as presented by mainstream media, functions as a pressure-release valve: citizens are given the illusion of choice while the fundamental structures of power remain unchanged.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — PATTERN ANALYSIS`,text:`The "controlled opposition" thesis is an analytical framework, not a proven conspiracy. What is verifiable: the same donor networks fund organizations on both sides of political debates. What is interpretive: whether this constitutes deliberate management of public discourse or simply reflects the reality of a political system dominated by wealth.`}},{type:`heading`,text:`IX. The Architecture of Secrecy`},{type:`text`,text:`Freemasonry is the world's oldest and largest fraternal organization, with an estimated 2-6 million members worldwide. At least fourteen U.S. Presidents have been confirmed Freemasons, including George Washington, Franklin D. Roosevelt, and Harry Truman. Founded at Yale University in 1832, Skull and Bones — formally known as "The Order of Death" — taps exactly 15 new members each year from the junior class. Its membership roster reads like a directory of American power: President George H.W. Bush, President George W. Bush, Secretary of State John Kerry, President William Howard Taft, and numerous heads of the CIA, major banks, and media organizations.`},{type:`heading`,text:`X. The Map: How It All Connects`},{type:`text`,text:`The systems documented in this chapter are not isolated. They are interlocking. The same institutional investors (BlackRock, Vanguard, State Street) that own the media companies also own the pharmaceutical companies, the defense contractors, the food conglomerates, and the banks. The same lobbying networks (AIPAC, AIPAC-affiliated PACs) that fund congressional campaigns also fund think tanks that shape foreign policy. This is the architecture of modern control. It is not a single conspiracy with a single mastermind. It is a system — a network of aligned interests that operates through institutional capture, financial leverage, and information control.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`A NOTE ON INTERPRETATION`,text:`The statistics and data presented in this overview chapter are drawn from public records, government filings, and peer-reviewed research. However, the juxtaposition of data points from different domains — lobbying, media ownership, asset management, public health — does not, by itself, establish causal relationships between them. Institutional concentration is a feature of mature market economies, and the same names recur across sectors because wealth and influence compound over time. The reader is encouraged to evaluate each data point on its own merits and to consider alternative explanations for the patterns presented.`}}],sources:[{id:1,text:`OpenSecrets.org, "American Israel Public Affairs Cmte — Recipients," FEC data, 2024 election cycle, released February 6, 2025.`,url:`https://www.opensecrets.org`},{id:2,text:`The Motley Fool, "The Big 6 Largest Media Companies," February 2026.`,url:`https://www.fool.com`},{id:3,text:`Harvard University, The Future of Media Project, "Index of US Mainstream Media Ownership," May 2021.`,url:`https://www.harvard.edu`},{id:4,text:`BlackRock, Inc. SEC filings, Q4 2024 earnings report; Wikipedia, "BlackRock," citing multiple SEC and financial sources.`,url:`https://www.wikipedia.org`},{id:5,text:`Invitation Homes SEC filings; American Homes 4 Rent annual reports; Congressional Research Service, "Institutional Investors and the Single-Family Rental Market," 2023.`},{id:6,text:`NPR, "The Forgotten, Fascinating Saga of Crisco," January 9, 2012.`,url:`https://www.npr.org`},{id:7,text:`University of California, "Study Links America's Favorite Cooking Oil to Obesity," December 4, 2025.`,url:`https://www.universityofcalifornia.edu`},{id:8,text:`Mitchell Landon, "Shocking History of Seed Oils," January 2022, citing USDA consumption data.`,url:`https://www.mitchelllandon.com`},{id:9,text:`Travison, T.G. et al., "A Population-Level Decline in Serum Testosterone Levels in American Men," Journal of Clinical Endocrinology & Metabolism, 2007.`},{id:10,text:`Levine, H. et al., "Temporal trends in sperm count," Human Reproduction Update, 2022.`},{id:11,text:`University of Copenhagen / CBMR, "Not all calories are equal: Ultra-processed foods harm men's health," August 28, 2025.`,url:`https://www.ku.dk`},{id:12,text:`Whittaker, J., "Dietary trends and the decline in male reproductive health," Hormones, 2023, Springer.`,url:`https://www.springer.com`},{id:13,text:`National Institute for Health Care Management (NIHCM), "The Growing Burden of Chronic Diseases," April 3, 2025.`,url:`https://www.nihcm.org`},{id:14,text:`KFF Health System Tracker, "How has the burden of chronic diseases in the U.S. and peer nations changed over time?" April 16, 2025.`,url:`https://www.kff.org`},{id:15,text:`NIH / PMC, "The Burden of Chronic Disease," January 20, 2024.`,url:`https://www.nih.gov`},{id:16,text:`Pfizer Inc. Annual Report 2022, SEC filing. Revenue: $100.3 billion.`},{id:17,text:`U.S. Department of Justice, "Justice Department Announces Largest Health Care Fraud Settlement in Its History," September 2, 2009. Pfizer total fines since 2000: $4.7 billion.`},{id:18,text:`Morin, S.L., "Manufacturing illness: The role of big food and big pharma in the healthcare crisis," Health Economics and Management Review, Vol. 6, Issue 1, 2025.`,url:`https://www.armgpublishing.com`},{id:19,text:`International Labour Organization, Walk Free, and IOM, "Global Estimates of Modern Slavery," 2022.`,url:`https://www.ilo.org`},{id:20,text:`UNODC, "Global Report on Trafficking in Persons 2024."`,url:`https://www.unodc.org`},{id:21,text:`National Human Trafficking Hotline, Annual Report 2020.`,url:`https://humantraffickinghotline.org`},{id:22,text:`The New York Times, "Kushner's Financial Ties to Israel Deepen Even With Mideast Role," January 7, 2018.`,url:`https://www.nytimes.com`},{id:23,text:`U.S. Senate Finance Committee, Sen. Ron Wyden, "Investigation Into Kushner Conflicts of Interest," October 13, 2022.`,url:`https://www.senate.gov`},{id:24,text:`Museum of the Jewish People / Le Monde, "How Jared Kushner Became a Teenage Hero — and Learned To Be a Zionist," January 26, 2017.`,url:`https://www.motl.org`},{id:25,text:`Wikipedia, "Jared Kushner," citing multiple sources including NYT, WSJ, and DOJ records.`,url:`https://www.wikipedia.org`},{id:26,text:`The New York Times, "Kushner's Firm Got $2 Billion From Saudi Fund," April 10, 2022.`},{id:27,text:`Open Society Foundations, "About Us."`,url:`https://www.opensocietyfoundations.org`},{id:28,text:`Grand Lodge of British Columbia and Yukon, "U.S. Presidents and Freemasonry." Multiple historical sources.`},{id:29,text:`Robbins, A., Secrets of the Tomb: Skull and Bones, the Ivy League, and the Hidden Paths of Power, Little, Brown and Company, 2002.`}],crossLinks:[{label:`Ch. 14: AIPAC & Congressional Lobbying`,chapterId:`chapter-14`},{label:`Ch. 11: Shadow Institutions`,chapterId:`chapter-11`},{label:`Ch. 12: How the Federal Reserve Works`,chapterId:`chapter-12`},{label:`Ch. 13: The 2008 Financial Crisis`,chapterId:`chapter-13`},{label:`Ch. 20: Rockefeller Medicine`,chapterId:`chapter-20`},{label:`Ch. 28: The Epstein Files`,chapterId:`chapter-28`}],keywords:[`AIPAC`,`BlackRock`,`Vanguard`,`State Street`,`media consolidation`,`seed oils`,`chronic disease`,`Pfizer`,`lobbying`,`modern slavery`,`Kushner`,`Soros`,`Freemasonry`,`Skull and Bones`]},{id:`chapter-1`,number:`Chapter 1`,title:`The Birth of Central Banking`,subtitle:`From the Frankfurt ghetto to the Bank of England, from Napoleon's wars to the halls of the United States Congress, the story of how private banking dynasties captured the power to create money, and what happened to those who tried to take it back.`,dateRange:`1694–1836`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`In 1744, in a cramped alley of the Frankfurt Judengasse — the walled Jewish ghetto of Frankfurt am Main — a boy named Mayer Amschel Bauer was born. His father, Moses Amschel Bauer, ran a small moneylending and coin-trading business. Above the door of the shop hung a red hexagonal shield, the German word for which is Rothschild. When Mayer Amschel inherited the business, he changed the family name to match the sign. That decision would prove to be one of the most consequential rebranding exercises in the history of money.`},{type:`text`,text:`What Mayer Amschel Rothschild built over the next six decades was not merely a bank. It was a system — a network of sons strategically placed in the five financial capitals of Europe, a communications infrastructure that moved information faster than any government courier, and a philosophy of lending that would eventually become the template for every central bank on earth. To understand the Federal Reserve, the Bank of England, or the European Central Bank, you must first understand the man who, more than any other, invented the concept they embody: that the power to create and control money is the supreme form of political power.`},{type:`heading`,text:`The Frankfurt Ghetto to the Court of Kings`},{type:`text`,text:`The Frankfurt Judengasse was one of the most restrictive environments in 18th-century Europe. Jews were confined to a single street, forbidden from most trades, barred from owning land, and subject to a curfew. Yet within these constraints, Mayer Amschel Rothschild found his opening: the one profession that was both permitted to Jews and essential to the ruling class — money.`},{type:`text`,text:`His first major client was Wilhelm IX, Landgrave of Hesse-Kassel, one of the wealthiest rulers in Europe. Wilhelm had made his fortune renting out Hessian soldiers to foreign powers — most famously to the British Crown during the American Revolutionary War. He needed a trusted agent to manage his enormous cash reserves, collect his debts, and invest his capital discreetly. Rothschild, who had already established himself as a reliable dealer in rare coins and medals, was appointed court agent in 1769.`},{type:`text`,text:`When Napoleon's armies swept through Europe in the early 1800s, Wilhelm was forced to flee, entrusting Rothschild with a substantial portion of his fortune — estimated at approximately £600,000 (roughly £60 million in today's terms). Rothschild managed these funds during the occupation and returned them faithfully after Napoleon's defeat, cementing his reputation for absolute trustworthiness with the aristocracy of Europe.`},{type:`quote`,quote:{text:`Give me control of a nation's money supply, and I care not who makes its laws.`,attribution:`Widely attributed to Mayer Amschel Rothschild`,note:`NOTE: This exact wording does not appear in verified historical documents. It is widely circulated but its precise origin is disputed. The sentiment, however, is consistent with Rothschild's documented business philosophy.`}},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL NOTE — THE FAMOUS QUOTE`,text:`The quote above is one of the most cited in the history of banking conspiracy literature. However, historians and fact-checkers at Snopes, Quote Investigator, and the Rothschild Archive have found no primary source document — no letter, speech, or contemporary account — that records Rothschild saying these words. It is included here because it accurately reflects the philosophy his descendants would operationalize — but readers should know it is not a verified primary source quotation.`}},{type:`heading`,text:`The Five Sons and the Network`},{type:`text`,text:`Mayer Amschel's true genius was not in any single financial transaction but in his system design. He had ten children — five sons and five daughters — and he deployed his sons as a coordinated network across the financial capitals of Europe. Each son established a branch of the family bank in a different city, and together they created something that had never existed before: a private financial institution with the speed, reach, and capital to outmaneuver any government treasury in Europe.`},{type:`table`,table:{headers:[`Son`,`City`,`Founded`,`Key Role`],rows:[[`Amschel Mayer`,`Frankfurt`,`1798`,`Managed the family's original German operations; served as financial adviser to the German Confederation`],[`Salomon Mayer`,`Vienna`,`1820`,`Financed the Austrian Empire; funded the first Austrian railways; close to Prince Metternich`],[`Nathan Mayer`,`London`,`1798`,`The most powerful of the five; financed Britain's wars against Napoleon; dominated the London bond market`],[`Carl Mayer`,`Naples`,`1821`,`Managed Southern European operations; financed the Kingdom of the Two Sicilies`],[`James Mayer`,`Paris`,`1812`,`Became the dominant banker in France; financed both the Bourbon restoration and the July Monarchy`]]}},{type:`heading`,text:`Nathan Mayer Rothschild and the Battle of Waterloo`},{type:`text`,text:`Of all the Rothschild sons, Nathan Mayer Rothschild of London became the most powerful. His role in financing Britain's wars against Napoleon is documented in the Rothschild Archive and confirmed by multiple academic historians. Between 1811 and 1815, Nathan arranged the transfer of gold bullion across Europe to fund Wellington's armies — a logistical feat that the British government could not have accomplished without him.`},{type:`text`,text:`The Battle of Waterloo on June 18, 1815, gave rise to one of the most enduring legends in financial history — and one of the most disputed. According to popular accounts, Nathan Rothschild received news of Napoleon's defeat before anyone else in London, used this intelligence to first sell British government bonds (causing panic and a market crash), then secretly bought them back at depressed prices before the official news arrived, making an enormous profit.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL EVIDENCE — THE WATERLOO LEGEND`,text:`The Waterloo trading story is one of the most cited examples of financial insider advantage in history. However, the Rothschild Archive — the family's own historical institution — has examined this claim extensively and concluded that while Nathan Rothschild did receive early news of Waterloo via courier, the specific claim that he deliberately manipulated the market through a false sell-off is not supported by documented evidence. What is documented is that Nathan was present at the Royal Exchange on June 20, 1815, and that he did profit substantially from his wartime bond operations. The core fact — that the Rothschilds had superior information and used it to profit — is well-established.`}},{type:`heading`,text:`The Bank of England and the Model of Central Banking`},{type:`text`,text:`The Bank of England was founded in 1694, fifty years before Mayer Amschel Rothschild was born. But it was the Rothschilds who, in the 19th century, became its most important private partners and, in doing so, demonstrated to the world what a central bank could do for those who controlled it. The Bank of England was created to solve a specific problem: King William III needed money to fight a war against France and the government had no reliable way to borrow it. A group of London merchants agreed to lend the Crown £1.2 million at 8% interest per year, in exchange for a royal charter granting them the right to operate as a bank. This arrangement — private capital lent to the government in exchange for a monopoly on money creation — is the foundational model of central banking. It has never fundamentally changed.`},{type:`quote`,quote:{text:`History records that the money changers have used every form of abuse, intrigue, deceit, and violent means possible to maintain their control over governments by controlling money and its issuance.`,attribution:`James A. Garfield, 20th President of the United States, 1881`,note:`Source: Congressional Record`}},{type:`heading`,text:`America's First Battle: The First and Second Banks`},{type:`text`,text:`The First Bank of the United States was chartered in 1791 for a term of twenty years. It was modeled explicitly on the Bank of England: a private institution with a government charter, authorized to issue banknotes and hold government deposits. Of its $10 million in initial capital, $2 million came from the federal government and $8 million from private investors — a majority of whom were foreign, primarily British. When the bank's charter came up for renewal in 1811, Congress refused to renew it by a single vote.`},{type:`text`,text:`The Second Bank of the United States was chartered in 1816, again for twenty years. It was larger than the first — $35 million in capital — and its reach was greater. By the 1820s, under the presidency of Nicholas Biddle, it had become the dominant financial institution in the country. By 1832, foreign investors — primarily British — held approximately one-third of the Second Bank's stock.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — FOREIGN OWNERSHIP OF THE SECOND BANK`,text:`By 1832, foreign investors — primarily British — held approximately one-third of the Second Bank's stock. This is documented in the congressional debates of the period and in Jackson's veto message of July 10, 1832, in which he explicitly cited foreign ownership as a threat to American sovereignty. The veto message is preserved in the National Archives.`}},{type:`timeline`,timeline:[{year:`1694`,text:`Bank of England founded — the world's first modern central bank, created as a private institution to lend money to the Crown.`},{year:`1744`,text:`Mayer Amschel Rothschild born in the Frankfurt Judengasse.`},{year:`1769`,text:`Rothschild appointed court agent to Wilhelm IX, Landgrave of Hesse-Kassel.`},{year:`1791`,text:`First Bank of the United States chartered for 20 years.`},{year:`1798`,text:`Nathan Mayer Rothschild moves to London; Amschel Mayer establishes Frankfurt branch.`},{year:`1811`,text:`First Bank charter expires; Congress refuses renewal by one vote.`},{year:`1815`,text:`Battle of Waterloo. Nathan Rothschild's role in financing Wellington is documented.`},{year:`1816`,text:`Second Bank of the United States chartered with $35 million in capital.`},{year:`1832`,text:`President Andrew Jackson vetoes the re-charter of the Second Bank.`},{year:`1836`,text:`Second Bank's charter expires. Jackson kills the bank. The U.S. will not have a central bank again for 77 years.`}]}],sources:[{id:1,text:`Niall Ferguson, The House of Rothschild: Money's Prophets, 1798-1848 (Viking, 1998) — The definitive academic biography based on access to the Rothschild Archive.`},{id:2,text:`Rothschild Archive, London — "Nathan Mayer Rothschild and the Waterloo Commission."`,url:`https://www.rothschildarchive.org`},{id:3,text:`Niall Ferguson, The World's Banker: The History of the House of Rothschild (Weidenfeld & Nicolson, 1998)`},{id:4,text:`Bank of England, "A History of the Bank of England."`,url:`https://www.bankofengland.co.uk/about/history`},{id:5,text:`Robert E. Wright, One Nation Under Debt: Hamilton, Jefferson, and the History of What We Owe (McGraw-Hill, 2008)`},{id:6,text:`Robert V. Remini, Andrew Jackson and the Bank War (W.W. Norton, 1967)`},{id:7,text:`Britannica, "Rothschild Family."`,url:`https://www.britannica.com/money/Rothschild-family`},{id:8,text:`Quote Investigator, "Give Me Control of a Nation's Money Supply."`,url:`https://quoteinvestigator.com`}],crossLinks:[{label:`Chapter 2: The Bank War`,chapterId:`chapter-2`},{label:`Chapter 3: Jekyll Island & the Federal Reserve`,chapterId:`chapter-3`},{label:`Chapter 12: How the Federal Reserve Works`,chapterId:`chapter-12`}],keywords:[`Rothschild`,`central banking`,`Bank of England`,`Waterloo`,`Nathan Rothschild`,`First Bank`,`Second Bank`,`money creation`,`Frankfurt`,`Wilhelm IX`]},{id:`chapter-2`,number:`Chapter 2`,title:`The Bank War & The Presidents Who Fought Back`,subtitle:`Four American presidents took on the banking establishment. Three were assassinated. One survived an assassination attempt that should have killed him.`,dateRange:`1832–1901`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`On the morning of January 30, 1835, President Andrew Jackson was leaving the funeral of a South Carolina congressman at the United States Capitol when a man named Richard Lawrence stepped forward and pointed a pistol at him from a distance of about eight feet. The pistol misfired. Lawrence drew a second pistol. It also misfired. Jackson, then 67 years old, lunged at his attacker with his cane. The probability of both pistols misfiring in sequence, given the weather conditions that day, was later calculated by the Army to be approximately 1 in 125,000.`},{type:`text`,text:`Andrew Jackson hated banks. This was not a political position adopted for electoral advantage. It was a visceral, personal conviction rooted in his frontier upbringing and his experiences with debt and financial ruin. He believed, with the certainty of a man who had survived duels and Indian wars, that the Second Bank of the United States was a corrupt institution that served the rich at the expense of the poor — and that it was his duty to destroy it.`},{type:`text`,text:`The Bank War began in earnest in 1832, when Nicholas Biddle — the Bank's president and one of the most sophisticated financiers in American history — made a strategic miscalculation. Biddle applied for re-charter four years early, believing that Jackson would not dare veto it in an election year. Jackson vetoed it on July 10, 1832, with a message that remains one of the most remarkable documents in American political history.`},{type:`quote`,quote:{text:`It is to be regretted that the rich and powerful too often bend the acts of government to their selfish purposes... Many of our rich men have not been content with equal protection and equal benefits, but have besought us to make them richer by act of Congress.`,attribution:`President Andrew Jackson, Veto Message on the Bank of the United States, July 10, 1832`,note:`Source: National Archives`}},{type:`text`,text:`Jackson won re-election in a landslide. In 1833, he ordered Treasury Secretary Roger Taney to remove all federal deposits from the Second Bank and distribute them among state banks — an action of dubious legality that the Senate censured him for. He didn't care. "The Bank is trying to kill me," he told Vice President Martin Van Buren, "but I shall kill it."`},{type:`text`,text:`Biddle retaliated by calling in loans and contracting credit — deliberately engineering a financial panic to demonstrate the Bank's power and force Congress to restore the deposits. The tactic backfired. The Bank's charter expired in 1836 and was not renewed. The United States would not have a central bank again for 77 years.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — JACKSON'S DOCUMENTED ACTIONS AGAINST THE BANK`,text:`July 10, 1832: Jackson vetoes the re-charter of the Second Bank of the United States. The veto message explicitly cites foreign ownership (approximately one-third of shares held by British investors) as a threat to American sovereignty. (Source: National Archives)

September 1833: Jackson orders removal of federal deposits from the Second Bank, distributing them to state banks. The Senate censures him — the only president ever censured by the Senate.

1836: Second Bank's charter expires. Jackson's last words, reportedly: "I killed the bank." (Source: Robert Remini, Andrew Jackson and the Bank War)`}},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL EVIDENCE — THE ASSASSINATION ATTEMPT`,text:`The following facts are individually verified. Their cumulative pattern is worth noting:

1. Richard Lawrence's assassination attempt on January 30, 1835, occurred during the height of the Bank War — after Jackson's veto but before the Bank's charter expired.

2. Jackson himself publicly accused the Bank of being behind the attempt. His ally Senator Thomas Hart Benton made the same accusation on the Senate floor.

3. Lawrence's stated motives were incoherent (claiming to be the King of England), which is consistent with genuine mental illness — but also consistent with the behavior of a hired operative instructed to appear insane if caught.

4. No evidence of a banking conspiracy was produced at trial or in any subsequent investigation.

No smoking gun: The assassination attempt is most likely the act of a mentally ill individual.`}},{type:`heading`,text:`Abraham Lincoln and the Greenbacks (1861-1865)`},{type:`text`,text:`When Abraham Lincoln took office in March 1861, the United States was on the verge of civil war and the federal government was essentially bankrupt. Lincoln's Treasury Secretary, Salmon P. Chase, initially approached private banks for loans. The terms offered were, by any measure, extortionate — interest rates of 24 to 36 percent were reportedly demanded by some New York bankers.`},{type:`text`,text:`On February 25, 1862, Congress passed the Legal Tender Act, authorizing the Treasury to issue $150 million in United States Notes — paper money that was not backed by gold or silver, but was declared legal tender for all debts public and private. These notes were printed in green ink on the back, giving them the popular name "greenbacks." The greenbacks were issued directly by the government, at no interest, bypassing the banking system entirely.`},{type:`quote`,quote:{text:`The government should create, issue, and circulate all the currency and credits needed to satisfy the spending power of the government and the buying power of consumers. By the adoption of these principles, the taxpayers will be saved immense sums of interest.`,attribution:`Attributed to Abraham Lincoln`,note:`NOTE: This quote appears in numerous books but has not been verified in Lincoln's documented writings or speeches. It is widely circulated but its authenticity is disputed by Lincoln scholars.`}},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — LINCOLN'S GREENBACK POLICY`,text:`February 25, 1862: Legal Tender Act signed into law. Congress authorizes $150 million in United States Notes (greenbacks). Two subsequent acts bring the total to approximately $450 million. (Source: U.S. Treasury, Congressional Record)

Key distinction: Greenbacks were United States Notes — issued by the Treasury, not by a private bank. They bore no interest. They were legal tender. This is fundamentally different from Federal Reserve Notes, which are issued by a private central bank and represent a debt obligation.`}},{type:`text`,text:`Lincoln was shot by John Wilkes Booth at Ford's Theatre on April 14, 1865. He died the following morning. The Civil War ended five days earlier, on April 9, with Lee's surrender at Appomattox.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL EVIDENCE — THE BANKING CONSPIRACY THEORY`,text:`The theory that Lincoln was assassinated by banking interests because of his greenback policy is one of the most widely circulated conspiracy theories in American history. Supporting the narrative: Lincoln's greenback policy directly threatened the profits of private banks. Undermining the narrative: John Wilkes Booth's documented motives were political — he was a Confederate sympathizer. No banking connection to the conspiracy has ever been documented.

The Hazard Circular: A document widely cited in conspiracy literature, allegedly written by British banking interests in 1862, instructing American bankers to oppose the greenbacks. Historians have found no evidence this document is authentic; it appears to have been fabricated in the late 19th century.

No smoking gun: The banking conspiracy theory of Lincoln's assassination is not supported by documented evidence.`}}],sources:[{id:1,text:`Robert V. Remini, Andrew Jackson and the Bank War (W.W. Norton, 1967)`},{id:2,text:`Robert V. Remini, Andrew Jackson (3 volumes, Harper & Row, 1977-1984)`},{id:3,text:`Heather Cox Richardson, The Death of Reconstruction (Harvard University Press, 2001); and various Lincoln biographies.`},{id:4,text:`U.S. Treasury Department, "History of Greenbacks."`},{id:5,text:`Congressional Record, Legal Tender Act of 1862.`},{id:6,text:`National Archives, Jackson Veto Message, July 10, 1832.`,url:`https://www.archives.gov`}],crossLinks:[{label:`Chapter 1: The Birth of Central Banking`,chapterId:`chapter-1`},{label:`Chapter 3: Jekyll Island & the Federal Reserve`,chapterId:`chapter-3`}],keywords:[`Andrew Jackson`,`Bank War`,`Lincoln`,`greenbacks`,`Second Bank`,`Nicholas Biddle`,`assassination`,`Legal Tender Act`,`central banking`]},{id:`chapter-3`,number:`Chapter 3`,title:`Jekyll Island & the Creation of the Federal Reserve`,subtitle:`In November 1910, six men representing a quarter of the world\\'s wealth boarded a private rail car in New Jersey. Their destination: a private island off the coast of Georgia. Their mission: to draft the blueprint for a new central bank.`,dateRange:`1907–1913`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Jekyll Island & The Federal
Reserve: The Secret Meeting
That Changed America
The Federal Reserve was not created in Congress. It was designed in secret, by
private bankers, on a private island, and then presented to Congress as a public
institution. These are not allegations  —  they are documented historical facts,
confirmed by the participants themselves.`},{type:`text`,text:`n 1910, the six most powerful men in American finance boarded a private railcar at a New Jersey station and traveled south under assumed names. They told
their servants they were going duck hunting. They told no one else anything.
When they arrived at Jekyll Island, Georgia  —  a private retreat owned by a club of
millionaires that included J.P. Morgan, William Rockefeller, and Joseph Pulitzer  — 
they locked the doors and spent nine days writing the legislation that would become
the Federal Reserve Act of 1913.
[1]
This is not a conspiracy theory. It is documented history, confirmed by the participants themselves in their own memoirs and in the historical record. Frank Vanderlip, president of National City Bank (now Citibank), wrote about the meeting in a
1935 article in the Saturday Evening Post: "I was as secretive  —  indeed, as furtive  —  as
any conspirator. Discovery, we knew, simply must not happen, or else all our time
and effort would be wasted. If it were to be exposed publicly that our particular
group had got together and written a banking bill, that bill would have no chance
whatever of passage by Congress."
[1]`},{type:`text`,text:`The Jekyll Island Club, Jekyll Island, Georgia  —  the site of the secret November 1910 meeting at which the plan for the Federal
Reserve was drafted. The club was a private retreat for America's wealthiest families. (Historical photograph, Federal Reserve History)`},{type:`text`,text:`P A R T  I
The Panic of 1907: The Crisis That Made
the Fed Possible
To understand why the Jekyll Island meeting happened, one must first understand
the Panic of 1907  —  the financial crisis that created the political conditions for a new
central bank. In October 1907, a failed attempt to corner the copper market triggered
a run on the Knickerbocker Trust Company in New York. The panic spread rapidly
through the banking system, threatening to collapse the entire financial structure of
the country.
[2]
The crisis was resolved not by the government but by J.P. Morgan  —  the most powerful private banker in America. Morgan convened the leading bankers of New York in
his private library, locked the doors, and refused to let anyone leave until they had
agreed to pool their resources to stop the panic. He personally directed the allocation of funds, deciding which banks would be saved and which would be allowed to
fail. He was, in effect, acting as a one‐man central bank.
[2]
The lesson that the banking establishment drew from 1907 was not that private
banks were too powerful  —  it was that the country needed a formal, institutionalized
mechanism for doing what Morgan had done informally. A lender of last resort. A
central bank. The question was how to create one without triggering the same popular opposition that had killed the First and Second Banks of the United States.
[2]
⚠ CIRCUMSTANTIAL EVIDENCE  —  DID MORGAN ENGINEER THE PANIC?
A persistent theory holds that J.P. Morgan deliberately engineered the Panic of 1907 to
create the political conditions for a central bank  —  from which he and his allies
would benefit enormously. The theory was raised at the time by progressive politicians including Charles Lindbergh Sr. (father of the aviator), who wrote: "The Money`},{type:`text`,text:`Trust caused the 1907 panic, and thereby forced Congress to create a National
Monetary Commission."
What is documented: Morgan did benefit from the panic  —  he acquired the Tennessee
Coal, Iron and Railroad Company from a distressed seller during the crisis, with President Roosevelt's blessing. The acquisition was later investigated by Congress as a
potential antitrust violation.
What is not documented: Any evidence that Morgan deliberately triggered the panic.
The panic appears to have begun with a genuine failed market manipulation (the
copper corner), not with Morgan's actions.
No smoking gun: The theory that Morgan engineered the panic is circumstantially
plausible but not supported by documented evidence. What is documented is that he
exploited it masterfully.`},{type:`text`,text:`P A R T  I I
The Jekyll Island Meeting: Who Was
There and What They Decided
The Jekyll Island meeting took place in November 1910. The participants traveled
under assumed names  —  Vanderlip later wrote that they used only first names during the meeting, to prevent servants from identifying them. The secrecy was deliberate and total. The meeting was not publicly acknowledged until years after the
Federal Reserve Act had passed.
[1]
Senator Nelson Aldrich
REPUBLICAN SENATE MAJORITY LEADER
Chairman of the National Monetary
Commission. Father‐in‐law of John D.
Rockefeller Jr. The nominal leader of
the group and the political vehicle
through which the plan would be
introduced to Congress.
A. Piatt Andrew
ASSISTANT SECRETARY OF THE TREASURY
Represented the government's interest in the meeting. His presence
gave the proceedings a veneer of
official legitimacy.
Henry P. Davison
SENIOR PARTNER, J.P. MORGAN & CO.
Morgan's representative at the meeting. J.P. Morgan himself did not attend
 —  he sent his most trusted lieutenant
instead.
Arthur Shelton
SENATOR ALDRICH'S PERSONAL
SECRETARY
Administrative support for the meeting. The only non‐principal in attendance.`},{type:`text`,text:`Frank Vanderlip
PRESIDENT, NATIONAL CITY BANK
The man who later wrote the most detailed account of the meeting in his
1935 Saturday Evening Post article, confirming the secrecy and the participants' awareness that public knowledge would doom the plan.
Paul Warburg
PARTNER, KUHN, LOEB & CO.
The intellectual architect of the plan.
A German‐born banker who had studied European central banking systems
and was convinced that the United
States needed one. His brother Max
was simultaneously advising the German government on financial matters. (See Chapter Four.)
Paul M. Warburg (1868–1932), the German-born banker who was the primary intellectual architect of the Federal Reserve System. He
served as one of the first members of the Federal Reserve Board, appointed by President Wilson in 1914. (Federal Reserve History)
Paul Warburg was the most important person in the room. He had spent years studying the central banking systems of Europe  —  particularly the German Reichsbank
and the Bank of England  —  and had written extensively about the need for an American equivalent. His 1907 essay, "A Plan for a Modified Central Bank," had already
outlined the basic architecture of what would become the Federal Reserve. At Jekyll
Island, he was the technical expert who translated the political goals of the group
into a workable institutional design.
[3]`},{type:`text`,text:`The plan they devised had several key features, all designed to make it politically
palatable while preserving the essential power of private banks. First, it would not
be called a central bank  —  that term was politically toxic after the Jackson era. It
would be called a "reserve system." Second, it would be decentralized  —  not one
bank in New York, but twelve regional banks across the country. Third, it would
have a government‐appointed board  —  giving it the appearance of public oversight.
Fourth, and most importantly, the regional banks would be owned by the private
commercial banks in their districts, which would receive dividends on their shares.
[1][3]
"We were there to write a banking bill, and we did write
it. But we knew that if it were known that our group had
written it, it would be dead on arrival in Congress."
FRANK VANDERLIP, "FROM FARM BOY TO FINANCIER," SATURDAY EVENING POST, FEBRUARY 9,
1935  —  VERIFIED PRIMARY SOURCE`},{type:`text`,text:`P A R T  I I I
The Federal Reserve Act of 1913: How
the Plan Became Law
The Jekyll Island plan was introduced to Congress as the Aldrich Plan in 1911. It was
immediately recognized as a bankers' bill and opposed by progressive Democrats,
who  correctly  identified  it  as  a  scheme  to  give  private  banks  control  over  the
national currency. The Aldrich Plan failed.
[4]
But the banking establishment did not give up. They regrouped, made cosmetic
changes to the plan, and reintroduced it under Democratic sponsorship  —  specifically, under the names of Senator Carter Glass of Virginia and Representative Robert
Owen of Oklahoma. The new version was called the Federal Reserve Act. It was
passed by Congress on December 23, 1913  —  a date that critics have noted was
chosen when many members of Congress had already left Washington for the Christmas recess  —  and signed into law by President Woodrow Wilson the same day.
[4]
✓ VERIFIED  —  THE FEDERAL RESERVE ACT, DECEMBER 23, 1913
What the Act created: A system of twelve regional Federal Reserve Banks, each
owned by the private commercial banks in its district. A Federal Reserve Board in
Washington, appointed by the President, to oversee the system. The exclusive right to
issue Federal Reserve Notes  —  the paper currency of the United States.
The Christmas recess claim: It is true that the Act was passed on December 23, 1913,
and that Congress was in session with reduced attendance. However, the claim that it
was deliberately timed to pass with minimal opposition is disputed by historians.
The Act had been debated for months and had broad bipartisan support by the time it
passed.
Wilson's later regret: A quote widely attributed to Wilson  —  "I have unwittingly
ruined my country"  —  appears in numerous books but has not been verified in
Wilson's documented writings. It is widely circulated but its authenticity is disputed.`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE ALDRICH-GLASS CONNECTION
The transformation of the Aldrich Plan into the Federal Reserve Act is one of the most
studied examples of legislative camouflage in American history. The key facts:
1. The Aldrich Plan and the Federal Reserve Act were structurally nearly identical.
Both created a system of regional reserve banks owned by private commercial banks.
Both gave those banks the power to issue currency. Both insulated monetary policy
from direct democratic control.
2. Senator Aldrich himself acknowledged the similarity, saying in 1914: "Before the
passage of this Act, the New York bankers could only dominate the reserves of New
York. Now we are able to dominate the bank reserves of the entire country."
3. Paul Warburg, who drafted the Jekyll Island plan, was appointed by President
Wilson to the first Federal Reserve Board in 1914  —  the very institution he had designed.
No smoking gun: The Federal Reserve Act was passed through a legitimate legislative
process with broad bipartisan support. The fact that it closely resembled a plan drafted by private bankers in secret does not make it illegitimate  —  but it does raise
serious questions about whose interests it was designed to serve.`},{type:`text`,text:`P A R T  I V
How the Federal Reserve Actually
Works: A Plain-English Explanation
The Federal Reserve System is the central bank of the United States. It was created
by Congress and has a mandate from Congress. But it is not a government agency in
the conventional sense  —  it is a hybrid institution, part public and part private,
whose structure was deliberately designed to obscure that fact.
THE TWELVE REGIONAL BANKS
The Federal Reserve System consists of twelve regional Federal Reserve Banks, located in Boston, New York, Philadelphia, Cleveland, Richmond, Atlanta, Chicago, St.
Louis, Minneapolis, Kansas City, Dallas, and San Francisco. Each regional bank is a
private corporation, owned by the commercial banks in its district. Those commercial banks are required by law to purchase stock in their regional Federal Reserve
Bank equal to 6% of their capital and surplus  —  half of which is paid in, and half of
which is on call.
[5]
In exchange for their stock, the commercial banks receive a guaranteed annual dividend of 6% on their paid‐in shares. This dividend is paid before any profits are remitted to the U.S. Treasury. In 2022, the Federal Reserve paid approximately $17.4
billion in dividends to member banks before remitting $76 billion to the Treasury.
The dividend is guaranteed by law  —  it does not depend on the Fed's profitability.
[5]
THE FEDERAL RESERVE BOARD OF GOVERNORS
The Federal Reserve Board of Governors is a government agency  —  its seven members are appointed by the President and confirmed by the Senate. The Board sets
monetary policy, including the federal funds rate (the interest rate at which banks
lend to each other overnight). This is the rate that influences all other interest rates`},{type:`text`,text:`in the economy  —  mortgage rates, car loan rates, credit card rates, and the yield on
government bonds.
[5]
HOW MONEY IS CREATED
The Federal Reserve creates money in two ways. First, it can print Federal Reserve
Notes  —  the paper currency in your wallet. Second, and far more importantly, it creates money electronically through a process called "open market operations": it purchases government bonds from banks, crediting the banks' reserve accounts with
newly created dollars. These dollars did not exist before the purchase. They are created from nothing  —  ex nihilo  —  by a computer entry at the Federal Reserve.
[5]
This is not a conspiracy theory. It is the documented mechanism of modern monetary creation, described in the Federal Reserve's own publications. The Fed's 1994
publication "Modern Money Mechanics" states: "The actual process of money creation takes place primarily in banks... Banks can build up deposits by increasing
loans and investments as long as they keep enough currency on hand to redeem
whatever amounts the holders of deposits want to convert into currency."
US NOTES VS. FEDERAL RESERVE NOTES
This distinction is perhaps the most important  —  and least understood  —  aspect of
American monetary history. There are two fundamentally different types of paper
money that have circulated in the United States:`},{type:`text`,text:`FEATURE
UNITED STATES NOTES (GREENBACKS)
FEDERAL RESERVE NOTES (CURRENT CURRENCY)
Issued by
The U.S. Treasury (the government)
The Federal Reserve (a private central bank)
Interest
None  —  issued debt-free
The government must pay interest to borrow
money that the Fed creates
Backed by
The full faith and credit of the United
States
The full faith and credit of the United States
Who profits
No private profit  —  money goes directly
into the economy
Private banks receive dividends; the Fed earns
interest on government bonds
Historical
use
1862–1971 (gradually phased out)
1914–present
Legal status
Legal tender; last issued 1971
Legal tender; the only paper currency currently in
circulation
The key difference is this: when the government issues a United States Note, it
spends money into existence  —  no debt is created, no interest is owed. When the government borrows from the Federal Reserve (by selling Treasury bonds), the Fed creates money to buy those bonds  —  but the government now owes interest on that
money. Every Federal Reserve Note in circulation represents a debt obligation of the
United States government. Every United States Note represented no such obligation.
Lincoln understood this distinction. That is why he issued greenbacks. The Federal
Reserve Act of 1913 ended the era of government‐issued currency and replaced it
with a system in which the government must borrow  —  and pay interest  —  to obtain
the money it needs to function.`},{type:`text`,text:`P A R T  V
Who Owns the Federal Reserve? The
Dividend Chain
The Federal Reserve's ownership structure is deliberately opaque. The twelve regional banks are owned by their member commercial banks, which are in turn
owned by their shareholders. Tracing the ownership chain from the Federal Reserve
to its ultimate beneficial owners requires following the money through several
layers of corporate structure  —  but the trail is documented.
THE NEW YORK FEDERAL RESERVE BANK
The most powerful of the twelve regional banks is the Federal Reserve Bank of New
York. It holds the largest gold reserves of any institution in the world, conducts the
open market operations that implement monetary policy, and has historically been
the most influential voice in Federal Reserve deliberations. Its shareholders, as of
the most recent available data, are the commercial banks of the Second Federal
Reserve District  —  primarily the major New York banks.
[6]
SHAREHOLDER BANK
APPROXIMATE NY FED SHARE %
ANNUAL DIVIDEND (6% OF PAID-IN CAPITAL)
Citibank N.A.
~42.8%
Largest single recipient
JPMorgan Chase Bank
~29.5%
Second largest recipient
Goldman Sachs Bank USA
~4.0%
Third largest recipient
Bank of New York Mellon
~3.5%
Fourth largest recipient
Morgan Stanley Bank
~3.7%
Fifth largest recipient
Other member banks
~16.5%
Distributed among remaining members`},{type:`text`,text:`WHO OWNS THE BANKS THAT OWN THE FED?
The shareholders of Citibank, JPMorgan Chase, Goldman Sachs, Bank of America,
and Wells Fargo  —  the five largest U.S. banks and the primary owners of the Federal
Reserve Banks  —  are themselves owned by institutional investors. The three largest
institutional investors in the world are BlackRock, Vanguard, and State Street. These
three firms are, collectively, the largest shareholders of virtually every major corporation in the United States  —  including the banks that own the Federal Reserve.
[7]
ASSET
MANAGER
ASSETS UNDER
MANAGEMENT
TOP BANK HOLDINGS
BlackRock
~$10+ trillion
Top 3 shareholder of JPMorgan, Citigroup, Bank of America, Wells
Fargo, Goldman Sachs
Vanguard
~$8+ trillion
Top 3 shareholder of JPMorgan, Citigroup, Bank of America, Wells
Fargo, Goldman Sachs
State Street
~$4+ trillion
Top 5 shareholder of all major U.S. banks
The chain is therefore: BlackRock, Vanguard, and State Street own the major commercial banks → the major commercial banks own the Federal Reserve Banks → the
Federal Reserve Banks control the U.S. money supply. This is not a conspiracy theory. It is the documented ownership structure of the American financial system, the
result of the passive investing revolution of the late 20th century and the consolidation of the banking industry that followed the 2008 financial crisis.
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE CONCENTRATION OF FINANCIAL POWER
The concentration of ownership described above has no historical precedent. Three
asset management firms  —  BlackRock, Vanguard, and State Street  —  are simultaneously the largest shareholders of the banks that own the Federal Reserve, the largest
shareholders of the media companies that report on the Federal Reserve, the largest
shareholders of the defense contractors that benefit from government spending financed by Federal Reserve money creation, and the largest shareholders of the pharmaceutical companies, energy companies, and technology companies that dominate
the global economy.`},{type:`text`,text:`This is not illegal. It is the natural result of the growth of index funds and passive investing. But it represents a concentration of ownership  —  and therefore of potential
influence  —  that would have been unimaginable to the Founders, to Jackson, to Lincoln, or to the progressive opponents of the Federal Reserve Act in 1913.
No smoking gun: There is no documented evidence of coordinated decision‐making
by BlackRock, Vanguard, and State Street to exercise their ownership power in a coordinated way. What is documented is that they hold the power to do so  —  and that
this power is growing, not shrinking.
Chapter Three: Key Timeline`},{type:`text`,text:`The Panic of 1907. J.P. Morgan personally orchestrates the rescue of the banking system. Congress creates the National Monetary Commission to study
banking reform.`},{type:`text`,text:`November: Six men meet secretly at Jekyll Island, Georgia. Paul Warburg,
Frank Vanderlip, Henry Davison, A. Piatt Andrew, Arthur Shelton, and Senator
Nelson Aldrich draft the plan for the Federal Reserve.`},{type:`text`,text:`The Aldrich Plan is introduced in Congress. It is immediately identified as a
bankers' bill and fails to pass.`},{type:`text`,text:`December 23: The Federal Reserve Act is passed by Congress and signed by
President Wilson. The United States has a central bank again  —  77 years after
Jackson killed the Second Bank.`},{type:`text`,text:`The Federal Reserve System begins operations. Paul Warburg is appointed to
the first Federal Reserve Board. His brother Max Warburg is simultaneously
advising the German government  —  which is about to go to war with the
United States' allies. (Chapter Four.)`},{type:`text`,text:`SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1971,text:`(gradually phased out) 1914–present Legal status Legal tender; last issued 1971 Legal tender; the only paper currency currently in circulation The key difference is this: when the government issues a United States Note, it spends money into existence  —  no debt is created, no interest is owed. When the government borrows from the Federal Reserve (by selling Treasury bonds), the Fed creates money to buy those bonds  —  but the government now owes interest on that money. Every Federal Reserve Note in circulation represents a debt obligation of the United States government. Every United States Note represented no such obligation. Lincoln understood this distinction. That is why he issued greenbacks. The Federal Reserve Act of 1913 ended the era of government‐issued currency and replaced it with a system in which the government must borrow  —  and pay interest  —  to obtain the money it needs to function.`},{id:6,text:`SHAREHOLDER BANK APPROXIMATE NY FED SHARE % ANNUAL DIVIDEND (6% OF PAID-IN CAPITAL) Citibank N.A. ~42.8% Largest single recipient JPMorgan Chase Bank ~29.5% Second largest recipient Goldman Sachs Bank USA ~4.0% Third largest recipient Bank of New York Mellon ~3.5% Fourth largest recipient Morgan Stanley Bank ~3.7% Fifth largest recipient Other member banks ~16.5% Distributed among remaining members`},{id:7,text:`ASSET MANAGER ASSETS UNDER MANAGEMENT TOP BANK HOLDINGS BlackRock ~$10+ trillion Top 3 shareholder of JPMorgan, Citigroup, Bank of America, Wells Fargo, Goldman Sachs Vanguard ~$8+ trillion Top 3 shareholder of JPMorgan, Citigroup, Bank of America, Wells Fargo, Goldman Sachs State Street ~$4+ trillion Top 5 shareholder of all major U.S. banks The chain is therefore: BlackRock, Vanguard, and State Street own the major commercial banks → the major commercial banks own the Federal Reserve Banks → the Federal Reserve Banks control the U.S. money supply. This is not a conspiracy theory. It is the documented ownership structure of the American financial system, the result of the passive investing revolution of the late 20th century and the consolidation of the banking industry that followed the 2008 financial crisis. ⚠ CIRCUMSTANTIAL EVIDENCE  —  THE CONCENTRATION OF FINANCIAL POWER The concentration of ownership described above has no historical precedent. Three asset management firms  —  BlackRock, Vanguard, and State Street  —  are simultaneously the largest shareholders of the banks that own the Federal Reserve, the largest shareholders of the media companies that report on the Federal Reserve, the largest shareholders of the defense contractors that benefit from government spending financed by Federal Reserve money creation, and the largest shareholders of the pharmaceutical companies, energy companies, and technology companies that dominate the global economy.`},{id:1913,text:`No smoking gun: There is no documented evidence of coordinated decision‐making by BlackRock, Vanguard, and State Street to exercise their ownership power in a coordinated way. What is documented is that they hold the power to do so  —  and that this power is growing, not shrinking. Chapter Three: Key Timeline`},{id:1907,text:`J.P. Morgan personally orchestrates the rescue of the banking system. Congress creates the National Monetary Commission to study banking reform.`},{id:77,text:`years after Jackson killed the Second Bank.`},{id:1,text:`Frank Vanderlip, "From Farm Boy to Financier," Saturday Evening Post, February 9, 1935. Vanderlip's firsthand account of the Jekyll Island meeting  —  the primary source for the confirmed details of the meeting.`},{id:2,text:`Federal Reserve History, "The Panic of 1907." Available at: federalreservehistory.org/essays/panic-of-1907`},{id:3,text:`Federal Reserve History, "The Meeting at Jekyll Island." Available at: federalreservehistory.org/essays/jekyll-island`},{id:4,text:`Federal Reserve History, "Federal Reserve Act Signed by President Wilson." Available at: federalreservehistory.org`},{id:5,text:`Federal Reserve, "Structure of the Federal Reserve System." Available at: federalreserve.gov/aboutthefed/structure-federal- reserve-system.htm`},{id:6,text:`Institutional Investor, "Conspiracy Theorists Ask Who Owns the New York Fed. Here's the Answer." 2020. Based on FDIC data on member bank stock ownership.`},{id:7,text:`Jan Fichtner, Eelke Heemskerk, and Javier Garcia-Bernardo, "Hidden Power of the Big Three? Passive Index Funds, Re- Concentration of Corporate Ownership, and New Financial Risk," Business and Politics, 2017.`},{id:8,text:`G. Edward Griffin, The Creature from Jekyll Island (American Media, 1994)  —  A widely read popular account of the Jekyll Island meeting. Note: Griffin's book contains documented facts alongside interpretations that go beyond the evidence. Readers should consult academic sources for verification.`}],crossLinks:[{label:`Chapter 1: The Birth of Central Banking`,chapterId:`chapter-1`},{label:`Chapter 4: The Warburg Brothers & WWI`,chapterId:`chapter-4`},{label:`Chapter 12: How the Federal Reserve Works`,chapterId:`chapter-12`}],keywords:[`Jekyll Island`,`Federal Reserve`,`J.P. Morgan`,`Aldrich`,`Warburg`,`central bank`,`1913`]},{id:`chapter-4`,number:`Chapter 4`,title:`The Warburg Brothers & World War I`,subtitle:`Two brothers from one of Europe\\'s most powerful banking families found themselves on opposite sides of the Great War — one advising the Kaiser, the other shaping American financial policy.`,dateRange:`1914–1919`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`World War I`},{type:`text`,text:`C HAPTER FOUR  |  1914 – 1919
The Warburg
Brothers &
World War I
Paul Warburg designed the Federal Reserve and served on its first board.
His brother Max was the chief financial adviser to the German Kaiser and
helped finance the German war effort. They were on opposite sides of the
deadliest war in history  —  yet remained in close contact throughout. This
chapter examines what the documented record shows.`},{type:`text`,text:`The Warburg Brothers & World
War I: Brothers on Both Sides
Two brothers. One designed the American central bank. The other financed the
German war machine. Both came from the same Hamburg banking dynasty.
Both served their respective governments faithfully. And both, when the war
was over, helped design the peace that made the next war inevitable.`},{type:`text`,text:`he Warburg family of Hamburg was, by 1914, one of the most important
banking dynasties in the world. M.M. Warburg & Co., founded in 1798  —  the
same year Nathan Rothschild moved to London  —  had grown over a century into a major European bank with connections to governments, corporations,
and financial institutions across the continent. The family had produced scholars,
philanthropists, and financiers in equal measure. And in 1914, it produced something that history had rarely seen: two brothers who found themselves on opposite
sides of a world war, each serving his adopted country with genuine patriotism, and
each wielding financial power that shaped the conflict's outcome.
[1]`},{type:`text`,text:`P A R T  I
Paul and Max: Two Brothers, Two
Nations
Paul M. Warburg
UNITED STATES  —  FEDERAL RESERVE
Born Hamburg, 1868. Emigrated to
the United States in 1902 after marrying Nina Loeb, daughter of Solomon Loeb of Kuhn, Loeb & Co. Became a partner in the firm and the
leading advocate for American banking reform. Primary architect of the
Federal Reserve System. Appointed
to the first Federal Reserve Board by
President Wilson in 1914. Resigned
from the Board in 1918 when the
United States entered the war
against Germany, citing his German
birth as a conflict of interest.
Max M. Warburg
GERMANY  —  KAISER'S FINANCIAL ADVISER
Born Hamburg, 1867. Remained in
Germany and became head of M.M.
Warburg & Co. Served as a financial
adviser to Kaiser Wilhelm II and was
a member of the German delegation
to the Paris Peace Conference in
1919. Helped finance the German
war effort through bond issuances
and government lending. Fled Germany in 1938 after the Nazi government seized the Warburg bank. Died
in New York in 1946.
The brothers maintained correspondence throughout the war  —  a fact that was publicly known and that caused Paul Warburg considerable political difficulty in the
United States. When the U.S. entered the war in April 1917, Paul Warburg was still
Max Warburg`},{type:`text`,text:`serving on the Federal Reserve Board. His German birth and his brother's role in the
German financial establishment made him a target of suspicion. He resigned from
the Board in August 1918, writing to President Wilson that he did not wish his
presence to embarrass the institution he had helped create.
[1]
✓ VERIFIED  —  PAUL WARBURG'S RESIGNATION
Paul Warburg's resignation letter to President Wilson, dated August 9, 1918, is preserved in the Wilson Papers at the Library of Congress. In it, he writes that his continued service "might embarrass the Board and the Government" given his German
birth and his brother's role in Germany. Wilson accepted the resignation with
expressions of regret. This is a documented primary source.`},{type:`text`,text:`P A R T  I I
Financing Both Sides: The Documented
Record
The claim that "international bankers financed both sides of World War I" is one of
the most persistent themes in financial conspiracy literature. Like most such claims,
it contains a documented factual core surrounded by embellishments and exaggerations. This section presents what is actually documented.
[2]
THE AMERICAN SIDE: KUHN, LOEB & CO. AND J.P. MORGAN
The primary financier of the Allied war effort from the American side was J.P. Morgan & Co., which served as the official purchasing agent for the British and French
governments in the United States. Between 1914 and 1917, J.P. Morgan arranged approximately $3 billion in loans and purchasing contracts for the Allies  —  the largest
financial operation in American history to that point. This is documented in the
Morgan archives and in congressional testimony.
[2]
Kuhn, Loeb & Co.  —  the firm where Paul Warburg was a partner  —  took a different position. Jacob Schiff, the senior partner of Kuhn, Loeb, refused to participate in loans
to Russia because of the Tsar's persecution of Jews. He was willing to lend to Britain
and France, but not if any of the money would benefit Russia. This was a documented position, stated publicly by Schiff on multiple occasions. Kuhn, Loeb did
participate in some Allied financing, but not in loans that would benefit Russia.
[2]
THE GERMAN SIDE: M.M. WARBURG & CO.
Max Warburg and M.M. Warburg & Co. were significant participants in German war
finance.  The  German  government  financed  the  war  primarily  through  domestic
bond issuances (Kriegsanleihen  —  war bonds) and through the Reichsbank. M.M.
Warburg participated in the underwriting of these bonds and in other financial op
erations that supported the German war effort. This is documented in the Warburg
family archive and in academic histories of German war finance.
[1]
✓ VERIFIED  —  THE WARBURG BROTHERS' DOCUMENTED ROLES
Paul Warburg (U.S.): Served on the Federal Reserve Board from 1914 to 1918. The Federal Reserve provided the financial infrastructure that allowed the United States to
finance its war effort and to extend credit to the Allies. Paul Warburg did not personally direct war financing, but the institution he created and served was central to it.
Max Warburg (Germany): Served as financial adviser to Kaiser Wilhelm II. M.M. Warburg & Co. participated in German war bond underwriting. Max Warburg attended
the Paris Peace Conference in 1919 as part of the German delegation  —  sitting across
the table from Allied financiers, some of whom had been his business partners before
the war.
The documented intersection: At the Paris Peace Conference in 1919, Max Warburg
and John Foster Dulles (later U.S. Secretary of State) were both involved in the negotiations over German war reparations. Paul Warburg was not present but corresponded
with his brother about the negotiations.
THE LENIN TRAIN: A DOCUMENTED ANOMALY
One of the most documented  —  and most debated  —  episodes of WWI financial history involves the role of German banking interests in facilitating the return of Vladimir Lenin to Russia in April 1917. The German government arranged for Lenin and
approximately  30  other  Bolshevik  revolutionaries  to  travel  from  Switzerland
through Germany to Russia in a sealed train  —  a decision made by the German military high command as a strategic move to destabilize Russia and knock it out of the
war.
[3]
The financing of the Bolshevik revolution has been the subject of extensive historical research. The most credible academic work  —  including that of historian Antony
Sutton  —  documents that German government funds were channeled to the Bolsheviks through Swedish banking intermediaries. The connection to the Warburg family
is indirect but documented: Max Warburg's Hamburg bank had connections to the`},{type:`text`,text:`Swedish Enskilda Bank, which was one of the intermediaries through which German
funds reached Russia.
[3]
⚠ CIRCUMSTANTIAL EVIDENCE  —  WARBURG, LENIN, AND THE BOLSHEVIK REVOLUTION
The following facts are individually documented. Their cumulative significance is
contested:
1. The German government arranged and financed Lenin's sealed train journey from
Switzerland to Russia in April 1917. This is documented in German military archives.
(Source: Z.A.B. Zeman, Germany and the Revolution in Russia, 1958)
2. German funds were channeled to the Bolsheviks through Swedish banking intermediaries, including the Enskilda Bank of Stockholm. (Source: German Foreign Office
documents, published by Zeman)
3. M.M. Warburg & Co. had business relationships with Swedish banking institutions.
Max Warburg was aware of German efforts to destabilize Russia.
4. Antony Sutton's research (Wall Street and the Bolshevik Revolution, 1974) documents
American banking connections to the Bolshevik revolution, including a claim that
Jacob Schiff of Kuhn, Loeb provided $20 million to the Bolsheviks. This specific claim
is disputed by historians  —  the documented Schiff contributions were to anti‐Tsarist
forces before the revolution, not specifically to the Bolsheviks.
No smoking gun: There is no documented evidence that Max Warburg personally directed funds to the Bolsheviks. The connection is indirect  —  German government →
Swedish intermediaries → Bolsheviks  —  with M.M. Warburg in the background as a
German banking institution with Swedish connections. The circumstantial case is
real but the direct evidence is absent.`},{type:`text`,text:`P A R T  I I I
The Warburg Legacy and World War II:
Financing Both Sides Again
The pattern of international banking networks operating across national lines during wartime did not end with WWI. In the years leading up to and during World War
II, American and European banking institutions maintained financial relationships
with German corporations and the Nazi government that have been extensively
documented  —  and extensively debated.
[4]
THE BANK FOR INTERNATIONAL SETTLEMENTS
The Bank for International Settlements (BIS) was established in 1930, ostensibly to
manage German reparations payments under the Young Plan. Its founding members
included the central banks of England, France, Germany, Italy, Belgium, and Japan,
as well as a group of American banks including J.P. Morgan. The BIS was designed to
be politically neutral  —  a bank for central banks, above the conflicts of nation‐states.
[4]
During World War II, the BIS continued to operate with German participation. Its
president from 1940 to 1946 was Thomas McKittrick, an American banker. The BIS accepted gold from the Nazi Reichsbank  —  gold that included, according to postwar investigations, looted gold from occupied countries and gold taken from concentration camp victims. This is documented in the 1997 Eizenstat Report, commissioned
by the U.S. State Department.
[4]
✓ VERIFIED  —  THE BIS AND NAZI GOLD
The 1997 U.S. State Department Eizenstat Report, "U.S. and Allied Efforts to Recover
and Restore Gold and Other Assets Stolen or Hidden by Germany During World War
II," documents that the BIS accepted approximately 13.5 metric tons of gold from the`},{type:`text`,text:`Nazi Reichsbank during the war. Some of this gold had been looted from occupied
countries. The report is a primary government source and is available at the State
Department website.
The BIS's wartime operations were investigated by the U.S. Congress in 1943. A resolution to liquidate the BIS was introduced by Senator Kilgore but was not passed. The
BIS survived the war and continues to operate today as the central bank of central
banks.
AMERICAN CORPORATE CONNECTIONS TO NAZI GERMANY
The most extensively documented case of American financial involvement with Nazi
Germany involves not the Warburg family  —  who fled Germany in 1938 after the
Nazis seized their bank  —  but rather American corporations and banks that maintained business relationships with German companies throughout the war.
[4]
INSTITUTION
DOCUMENTED CONNECTION TO NAZI GERMANY
SOURCE
Standard Oil
(Rockefeller)
Maintained business relationship with I.G. Farben (the
chemical conglomerate that produced Zyklon B) through
a patent-sharing agreement. Supplied Germany with
synthetic rubber technology. Investigated by U.S. Senate
in 1942.
Senate Subcommittee on War
Mobilization, 1942; Charles
Higham, Trading with the
Enemy, 1983
Ford Motor
Company
Ford's German subsidiary (Ford-Werke) used forced
labor during the war. Henry Ford received the Grand
Cross of the German Eagle from the Nazi government in
1938  —  the highest honor Germany could bestow on a
foreigner.
U.S. Holocaust Memorial
Museum; Ken Silverstein, Ford
and the Führer, 2000
IBM
IBM's German subsidiary (Dehomag) provided punch-
card technology used to organize the Holocaust  —  to
track Jews, manage concentration camp populations,
and coordinate deportations. Documented by Edwin
Black in IBM and the Holocaust, 2001.
Edwin Black, IBM and the
Holocaust (Crown, 2001)  — 
based on IBM corporate
archives
Union Banking
Corporation
A New York bank that served as the U.S. financial arm of
German industrialist Fritz Thyssen, who helped finance
Hitler's rise to power. Prescott Bush (father of President
George H.W. Bush) was a director. The bank's assets were
seized under the Trading with the Enemy Act in 1942.
U.S. Office of Alien Property
Custodian, Vesting Order No.
248, 1942; Ben Aris and Duncan
Campbell, The Guardian, 2004`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE PATTERN OF DUAL-SIDE FINANCING IN WWII
The documented cases above share a common pattern: American financial and corporate interests maintained relationships with German entities during the war, in
some cases continuing operations that directly supported the Nazi war effort. This
was not a coordinated conspiracy  —  it was the result of pre‐existing business relationships, profit motives, and the practical difficulty of disentangling international
corporate structures once war began.
The cumulative effect, however, was that the financial infrastructure of the war on
both sides was substantially provided by the same network of international banks
and corporations. This is not a conspiracy theory. It is the documented history of
international finance in the 20th century.
Important distinction: The Warburg family were victims of the Nazi regime, not collaborators. M.M. Warburg & Co. was seized by the Nazis in 1938. Max Warburg fled to
the United States. The Warburg family's connection to "financing both sides of WWII"
is indirect  —  through the institutions they helped create (the Federal Reserve, the BIS)
rather than through direct wartime collaboration.`},{type:`text`,text:`P A R T  I V
The Paris Peace Conference: The
Settlement That Created Hitler
The Paris Peace Conference of 1919 produced the Treaty of Versailles  —  the settlement that ended World War I and, in the view of many historians, made World War II
inevitable. The reparations imposed on Germany  —  ultimately set at 132 billion gold
marks (approximately $33 billion in 1921 dollars)  —  were so punishing that they
destabilized the German economy, fueled hyperinflation, and created the conditions
of desperation and resentment that Adolf Hitler would exploit.
[5]
Max Warburg attended the Paris Peace Conference as part of the German delegation.
He argued, alongside the German government's other financial advisers, that the reparations being demanded were economically impossible  —  that Germany could not
pay them without destroying its economy. He was right. John Maynard Keynes, the
British economist who attended the conference as a Treasury adviser, made the
same  argument  in  his  1919  book  The  Economic  Consequences  of  the  Peace  —   and
resigned from the British delegation in protest when his warnings were ignored.
[5]
"The policy of reducing Germany to servitude for a generation, of degrading the lives of millions of human beings,
and of depriving a whole nation of happiness should be abhorrent and detestable  —  abhorrent and detestable, even
if it were possible, even if it enriched ourselves, even if it
did not sow the decay of the whole civilised life of Europe."`},{type:`text`,text:`JOHN MAYNARD KEYNES, THE ECONOMIC CONSEQUENCES OF THE PEACE, 1919  —  VERIFIED
PRIMARY SOURCE
Chapter Four: Key Timeline`},{type:`text`,text:`Paul Warburg appointed to the first Federal Reserve Board. Max Warburg
advises Kaiser Wilhelm II on war finance. World War I begins.`},{type:`text`,text:`April: German government arranges Lenin's sealed train journey to Russia.
April 6: United States enters the war. Paul Warburg's position becomes
politically untenable.`},{type:`text`,text:`August: Paul Warburg resigns from the Federal Reserve Board, citing his
German birth. November 11: Armistice. World War I ends.`},{type:`text`,text:`Paris Peace Conference. Max Warburg attends as part of the German delegation. Treaty of Versailles imposes 132 billion gold marks in reparations. Keynes
resigns in protest.`},{type:`text`,text:`Bank for International Settlements established. Paul Warburg is involved in its
founding. The BIS will continue operating throughout WWII, including
accepting Nazi gold.`},{type:`text`,text:`Nazi government seizes M.M. Warburg & Co. Max Warburg flees Germany. The
family that helped create the Federal Reserve is driven out of Europe by the
regime that the Versailles reparations helped create.`},{type:`text`,text:`Union Banking Corporation (Prescott Bush, director) seized under the Trading
with the Enemy Act. IBM's Dehomag subsidiary continues providing punchcard services to the Nazi government.`},{type:`text`,text:`SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`Ron Chernow, The Warburgs: The Twentieth-Century Odyssey of a Remarkable Jewish Family (Random House, 1993)  —  The definitive biography of the Warburg family, based on family archives.`},{id:2,text:`Niall Ferguson, The House of Rothschild: The World's Banker, 1849–1999 (Viking, 1999); Charles Calomiris and Larry Schweikart, "The Panic of 1907," Journal of Economic History, 1991.`},{id:3,text:`Z.A.B. Zeman, Germany and the Revolution in Russia, 1915–1918: Documents from the German Foreign Office (Oxford University Press, 1958).`},{id:4,text:`Stuart Eizenstat, "U.S. and Allied Efforts to Recover and Restore Gold and Other Assets Stolen or Hidden by Germany During World War II," U.S. State Department, May 1997. Available at: state.gov`},{id:5,text:`John Maynard Keynes, The Economic Consequences of the Peace (Macmillan, 1919).`},{id:6,text:`Edwin Black, IBM and the Holocaust (Crown Publishers, 2001)  —  Based on IBM corporate archives.`},{id:7,text:`Ben Aris and Duncan Campbell, "How Bush's grandfather helped Hitler's rise to power," The Guardian, September 25, 2004.`},{id:8,text:`Antony Sutton, Wall Street and the Bolshevik Revolution (Arlington House, 1974)  —  Note: Sutton's research is extensively documented but some conclusions are disputed by mainstream historians.`}],crossLinks:[{label:`Chapter 3: Jekyll Island & the Federal Reserve`,chapterId:`chapter-3`},{label:`Chapter 5: Henry Ford & the Gold Standard`,chapterId:`chapter-5`}],keywords:[`Warburg`,`World War I`,`Paul Warburg`,`Max Warburg`,`Federal Reserve`,`banking`]},{id:`chapter-5`,number:`Chapter 5`,title:`Henry Ford, The International Jew & the Gold Standard`,subtitle:`The industrialist who built the American middle class also published the most controversial newspaper series in American history — and his warnings about the gold standard proved prophetic.`,dateRange:`1920–1971`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Henry Ford, The International
Jew & The Gold Standard
The most prominent industrialist in American history published a series of
writings alleging that Jewish banking families exercised disproportionate
control over the global money supply. He published a four-volume book
making that argument. Hitler kept a portrait of Ford on his desk. This chapter
presents Ford's documented views  —  and separates what was factually
grounded from what was bigotry.`},{type:`text`,text:`⚠ EDITORIAL NOTE  —  CONTENT WARNING
This chapter discusses Henry Ford's documented anti-Semitic writings and their doc-
umented influence on Adolf Hitler. These views are presented because they are histor-
ically significant and factually documented  —  not because they are endorsed. The
chapter explicitly distinguishes between Ford's factually grounded criticisms of
banking and his bigoted, unsupported claims about Jewish people as a group. The two
must not be conflated.
n 1920, Henry Ford  —  the man who had put America on wheels, who had inven-
ted the assembly line, who paid his workers $5 a day when the going rate was
$2  —  began publishing a series of articles in his newspaper, the Dearborn Independent, under the headline "The International Jew: The World's Problem." The art-
icles ran for 91 consecutive weeks. They were collected into four volumes and dis-
tributed by Ford dealerships across the United States. They were translated into Ger-`},{type:`text`,text:`man, Spanish, Russian, and Arabic. Adolf Hitler kept a portrait of Henry Ford on his
desk in Munich and cited Ford's writings as an influence in Mein Kampf.
[1]
Ford's central argument was that a network of Jewish financiers  —  centered on the
Rothschild family and their associates  —  controlled the world's banking systems,
manipulated wars for profit, and used their financial power to corrupt governments
and culture. He presented this argument as documented fact, citing real events and
real people, but embedding them in a framework of ethnic conspiracy theory that
attributed  to  "the  Jews"  as  a  group  what  was,  at  most,  the  behavior  of  specific
individuals who happened to be Jewish.`},{type:`text`,text:`P A R T  I
Ford's Documented Views: What He
Actually Wrote
Henry Ford (1863–1947), founder of Ford Motor Company. His Dearborn Independent newspaper published 91 consecutive weeks of
anti-Semitic articles beginning in 1920. The articles were collected into four volumes titled The International Jew. Adolf Hitler cited
Ford's writings in Mein Kampf. (Library of Congress)
Ford's writings on banking contained two distinct elements that must be carefully
separated. The first element was a set of factual observations about the concentra-
tion of financial power  —  observations that were, in many cases, accurate. The
second element was the attribution of that concentration to a Jewish conspiracy  — 
an attribution that was bigoted, unsupported by evidence, and directly contributed
to the ideology that produced the Holocaust.
[1]
The  factual  observations  included:  the  dominance  of  the  Rothschild  family  in
European banking (documented); the role of Kuhn, Loeb & Co. in American finance
(documented); the concentration of banking power in a small number of firms (doc-`},{type:`text`,text:`umented); and the influence of private banking interests on government monetary
policy  (documented).  These  observations  were  not  wrong.  They  were,  however,
presented in a framework that attributed them to ethnic conspiracy rather than to
the normal operations of capitalism and inherited wealth.
"It is well enough that people of the nation do not understand our banking and monetary system, for if they did, I
believe there would be a revolution before tomorrow
morning."
ATTRIBUTED TO HENRY FORD  —  NOTE: THIS QUOTE IS WIDELY CIRCULATED BUT HAS NOT BEEN
VERIFIED IN FORD'S DOCUMENTED WRITINGS. IT DOES NOT APPEAR IN THE DEARBORN
INDEPENDENT OR IN FORD'S AUTHORIZED BIOGRAPHIES. ITS AUTHENTICITY IS DISPUTED.
✓ VERIFIED  —  FORD'S DOCUMENTED ANTI-SEMITISM AND ITS CONSEQUENCES
1920–1927: The Dearborn Independent publishes 91 weeks of anti-Semitic articles. The
articles are collected into four volumes titled The International Jew: The World's
Foremost Problem.
1927: Ford issues a public apology to the American Jewish community, stating that he
had been "greatly shocked" to learn that his writings had been used to promote anti-
Semitism. He ordered the Dearborn Independent to cease publication. Historians de-
bate whether the apology was sincere or legally motivated  —  Ford was facing a libel
lawsuit at the time.
1938: Ford accepts the Grand Cross of the German Eagle from the Nazi government  — 
the highest honor Germany could bestow on a foreigner  —  on his 75th birthday. He
accepts it despite knowing about Nazi persecution of Jews.
Hitler's documented citation: In Mein Kampf (1925), Hitler writes: "Every year makes
them [the Jews] more and more the controlling masters of the producers in a nation of
one hundred and twenty millions; only a single great man, Ford, to their fury, still
maintains full independence." (Source: Mein Kampf, Chapter 11)`},{type:`text`,text:`P A R T  I I
The Gold Standard: A History of Money
and Power
The gold standard  —  the system under which a nation's currency is directly convert-
ible into a fixed quantity of gold  —  was the defining monetary issue of the 19th and
early 20th centuries. Its history is inseparable from the history of banking power,
because the gold standard, in practice, served the interests of creditors over debtors,
of bankers over farmers, and of established wealth over new enterprise.
[2]
WHAT THE GOLD STANDARD ACTUALLY DOES
Under a gold standard, the government can only issue as much currency as it has
gold in reserve. This limits the money supply and, in theory, prevents inflation. In
practice, it also limits the government's ability to respond to economic crises, pre-
vents the expansion of credit needed for economic growth, and systematically bene-
fits those who hold gold and financial assets (creditors) at the expense of those who
owe money (debtors).
The political battle over the gold standard in the United States was, at its core, a
battle between the financial establishment of the Northeast  —  which held gold, made
loans, and benefited from a stable, deflationary currency  —  and the farmers and
debtors of the South and West, who needed credit, suffered from falling prices, and
wanted an expanded money supply. William Jennings Bryan's famous "Cross of Gold"
speech  at  the  1896  Democratic  National  Convention  was  the  most  eloquent
expression of the debtor's position.
[2]`},{type:`quote`,quote:{text:`You shall not press down upon the brow of labor this
crown of thorns. You shall not crucify mankind upon a
cross of gold.`,attribution:`WILLIAM JENNINGS BRYAN, DEMOCRATIC NATIONAL CONVENTION, CHICAGO, JULY 9, 1896  — 
VERIFIED PRIMARY SOURCE
YEAR
EVENT
EFFECT ON MONEY SUPPLY`}},{type:`text`,text:`United States returns to gold standard after Civil
War greenbacks
Deflationary; benefits creditors, harms debtors`},{type:`text`,text:`Bryan's "Cross of Gold" speech; McKinley wins on
gold standard platform
Gold standard preserved; banking
establishment wins`},{type:`text`,text:`Gold Standard Act formally establishes gold
standard
Dollar defined as 25.8 grains of 90% pure gold`},{type:`text`,text:`Federal Reserve Act; Fed can now expand money
supply beyond gold reserves
Partial departure from pure gold standard`},{type:`text`,text:`FDR issues Executive Order 6102; gold confiscation;
dollar devalued
Domestic gold standard ended; international
gold standard maintained`},{type:`text`,text:`Bretton Woods Agreement; dollar pegged to gold at
$35/oz
International gold standard; dollar becomes
world reserve currency`},{type:`text`,text:`Nixon Shock; dollar-gold convertibility ended
Complete departure from gold standard; pure
fiat currency era begins
FDR'S GOLD CONFISCATION: EXECUTIVE ORDER 6102
On April 5, 1933, President Franklin D. Roosevelt signed Executive Order 6102, re-
quiring all persons in the United States to deliver their gold coins, gold bullion, and
gold certificates to the Federal Reserve by May 1, 1933. In exchange, they received
$20.67 per troy ounce  —  the official price of gold. After the confiscation was com-
plete, Roosevelt devalued the dollar by raising the official gold price to $35 per`},{type:`text`,text:`ounce   —   a  69%  devaluation  that  effectively  transferred  wealth  from  holders  of
dollars to the government.
[3]
✓ VERIFIED  —  EXECUTIVE ORDER 6102
Executive Order 6102 is a documented primary source, available at the National
Archives. It required all persons in the United States (with limited exceptions for jew-
elry, dental use, and industrial use) to surrender their gold to the Federal Reserve at
$20.67 per troy ounce. Failure to comply was punishable by a fine of up to $10,000 (ap-
proximately $200,000 in today's dollars) and up to 10 years in prison.
The order was justified under the Trading with the Enemy Act of 1917, which gave the
president broad emergency economic powers. The constitutionality of the order was
upheld by the Supreme Court in the Gold Clause Cases (1935).
After the confiscation, the Gold Reserve Act of 1934 raised the official gold price to $35
per ounce  —  effectively devaluing the dollar by 41% against gold and transferring the
profit from the revaluation to the U.S. Treasury.
⚠ CIRCUMSTANTIAL EVIDENCE  —  WHO BENEFITED FROM THE GOLD CONFISCATION?
The sequence of events surrounding Executive Order 6102 raises questions that have
never been fully answered:
1. The Federal Reserve Banks  —  which were owned by private commercial banks  —  re-
ceived the confiscated gold at $20.67 per ounce. When the dollar was devalued to $35
per ounce, the gold on the Fed's books increased in value by 69%. The profit from this
revaluation went to the U.S. Treasury  —  but the gold itself remained in the custody of
the Federal Reserve.
2. Foreign holders of dollars were not subject to the confiscation order. They could
continue to exchange dollars for gold at the old rate until 1971. This meant that the
confiscation fell entirely on American citizens, while foreign central banks and
investors retained their gold convertibility rights.
3. The Federal Reserve had been lobbying for an expansion of its powers and its gold
holdings since its creation in 1913. Executive Order 6102 dramatically expanded both.
No smoking gun: There is no documented evidence that the Federal Reserve or
private banking interests orchestrated the gold confiscation for their own benefit.
The order was a response to a genuine banking crisis. But the distribution of its costs`},{type:`text`,text:`and benefits  —  falling on American citizens while protecting foreign holders and
expanding Fed power  —  is worth noting.`},{type:`text`,text:`P A R T  I I I
Ford's Monetary Alternative: The
"Energy Dollar"
Henry Ford's critique of the banking system was not limited to anti-Semitic conspir-
acy theory. He also proposed a genuine alternative monetary system that has been
largely forgotten  —  and that anticipated, in some ways, the debates about monetary
reform that continue today.
[4]
In 1921, Ford proposed what he called an "energy dollar"  —  a currency backed not by
gold but by the productive capacity of American industry. He argued that gold was
an  arbitrary  standard  that  served  the  interests  of  those  who  controlled  gold
(bankers) rather than those who created real wealth (workers and manufacturers).
He proposed instead that the dollar be backed by kilowatt-hours of electricity  —  a
measure of actual productive capacity.
[4]
Ford's proposal was never seriously considered by Congress. But it anticipated by
decades the arguments of economists who would later challenge the gold standard's
deflationary bias and argue for commodity-backed or productivity-backed curren-
cies. The proposal is worth noting not because it was practical  —  it was not  —  but be-
cause it illustrates that Ford's critique of the banking system, stripped of its anti-
Semitic  framework,  contained  genuine  economic  insights  that  were  shared  by
serious economists of the era.
✓ VERIFIED  —  FORD'S "ENERGY DOLLAR" PROPOSAL
Ford's proposal for an "energy dollar" was reported in the New York Times on Decem-
ber 4, 1921, under the headline "Ford Sees Wealth in Muscle Shoals." Ford had pro-
posed to purchase the Muscle Shoals hydroelectric facility from the government and
use it as the basis for a new currency backed by electrical energy. The proposal was`},{type:`text`,text:`covered extensively in the press and debated in Congress before being rejected.
(Source: New York Times Archive)
Chapter Five: Key Timeline`},{type:`text`,text:`Bryan's "Cross of Gold" speech. McKinley wins the presidency on a gold stand-
ard platform. The banking establishment defeats the populist monetary
reform movement.`},{type:`text`,text:`Gold Standard Act formally establishes the gold standard. The dollar is defined
as 25.8 grains of 90% pure gold.`},{type:`text`,text:`Ford's Dearborn Independent begins publishing "The International Jew" series.
91 consecutive weeks of anti-Semitic articles reach millions of Americans.`},{type:`text`,text:`Ford proposes the "energy dollar"  —  a currency backed by electrical energy
rather than gold. The proposal is rejected by Congress.`},{type:`text`,text:`Hitler publishes Mein Kampf, citing Ford as an inspiration. Ford's portrait
hangs in Hitler's Munich office.`},{type:`text`,text:`April 5: FDR signs Executive Order 6102, requiring Americans to surrender
their gold to the Federal Reserve at $20.67/oz. The domestic gold standard ends.`},{type:`text`,text:`Gold Reserve Act raises the official gold price to $35/oz  —  a 69% devaluation.
The profit goes to the Treasury; the gold stays with the Fed.`},{type:`text`,text:`Ford accepts the Grand Cross of the German Eagle from the Nazi government
on his 75th birthday.`},{type:`text`,text:`Bretton Woods Agreement. Dollar pegged to gold at $35/oz. Dollar becomes the
world's reserve currency. The international gold standard is maintained  —  but
only for foreign governments, not for American citizens.`},{type:`text`,text:`SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer-reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`Henry Ford, The International Jew: The World's Foremost Problem (Dearborn Publishing, 1920–1922)  —  Primary source. Available in digital archives. Note: This work contains extensive anti-Semitic content and is cited here for historical documentation purposes only.`},{id:2,text:`Milton Friedman and Anna Schwartz, A Monetary History of the United States, 1867–1960 (Princeton University Press, 1963)  —  The definitive academic history of American monetary policy.`},{id:3,text:`Executive Order 6102, April 5, 1933. Available at: National Archives, archives.gov`},{id:4,text:`New York Times, "Ford Sees Wealth in Muscle Shoals," December 4, 1921. Available in NYT Archive.`},{id:5,text:`U.S. Holocaust Memorial Museum, "Henry Ford and the Nazis." Available at: encyclopedia.ushmm.org`},{id:6,text:`Adolf Hitler, Mein Kampf (1925), Chapter 11  —  Ford citation. Note: This work is cited for historical documentation purposes only.`},{id:7,text:`Ken Silverstein, "Ford and the Führer," The Nation, January 24, 2000.`}],crossLinks:[{label:`Chapter 4: The Warburg Brothers & WWI`,chapterId:`chapter-4`},{label:`Chapter 6: Talmud & the Balfour Declaration`,chapterId:`chapter-6`}],keywords:[`Henry Ford`,`gold standard`,`Dearborn Independent`,`industrialism`,`currency`]},{id:`chapter-6`,number:`Chapter 6`,title:`The Talmud, the Balfour Declaration & the Origins of Zionism`,subtitle:`The documented history of the political movement that would reshape the Middle East and redefine the relationship between religion, nationalism, and geopolitics.`,dateRange:`1897–1948`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Talmud, the Balfour
Declaration, and the
Rothschild Connection
The ancient text, the 67-word letter that redrew the map of the Middle East, and the
banking dynasty to whom it was addressed  —  documented from primary sources.
Published by Veritas Worldwide Media · Primary sources: Sefaria.org, Yale Avalon Project, British National Archives, Anti-Defamation League`},{type:`text`,text:`The Talmud, the Balfour
Declaration, and the Rothschild
Connection
To understand the forces that shaped the modern Middle East, one must begin with
the texts that shaped the worldview, the letter that created the state, and the
family that financed both.
Published by Veritas Worldwide Media · Sources verified as of March 2026
W H Y  T H I S  M AT T E R S  T O  Y O U
The Talmud is the foundational legal code governing the daily lives of millions of
people. The Balfour Declaration  —  a single 67-word letter  —  redrew the map of the
Middle East and set in motion a conflict that has cost hundreds of thousands of
lives, trillions of dollars in U.S. military spending, and shaped the foreign policy of
every Western nation for over a century. The family to whom that letter was
addressed still ranks among the wealthiest dynasties on Earth. If you pay taxes,
vote, or have ever wondered why the United States is entangled in Middle Eastern
affairs, this chapter documents where it began  —  in primary sources you can verify
yourself.`},{type:`text`,text:`Editorial Note: This chapter examines the Talmud as a historical and legal document, the Balfour Declaration as a primary-
source diplomatic instrument, and the Rothschild family's documented role in both Zionism and international finance. All
Talmudic passages are quoted directly from the William Davidson Talmud on Sefaria.org  —  the world's largest free library of
Jewish texts  —  with full tractate, folio, and passage citations. Each quote is hyperlinked to the original bilingual
(Hebrew/Aramaic + English) source so the reader may verify it independently. Jewish scholars, the Anti-Defamation League,
and academic Talmudists have provided extensive context for these passages, and their responses are included alongside every
quote. This chapter does not claim that any religious text causes any particular behavior. It documents what the texts say,
what scholars say about them, and what historical actors have done.`},{type:`text`,text:`T
P A R T  I
The Talmud  —  What It Is
I. Structure and Authority
A page of the Talmud showing the characteristic layout: the Mishnah (core text) in the center, surrounded by the Gemara (rabbinical
commentary), with additional commentaries by Rashi and Tosafot in the margins. Source: Chabad.org.
he Talmud is the central text of Rabbinic Judaism and the primary source of
Jewish religious law (Halakha) and Jewish theology. It is second in authority
only to the Hebrew Bible (Tanakh) in Jewish religious tradition. The Talmud
consists of two components: the Mishnah, a written compilation of the Oral Torah
completed around 200 CE by Rabbi Judah ha-Nasi, and the Gemara, a vast body of`},{type:`text`,text:`rabbinical analysis, commentary, and debate on the Mishnah, compiled between the
3rd and 6th centuries CE.[1]
Two versions of the Talmud exist: the Jerusalem Talmud (Talmud Yerushalmi),
compiled in the Land of Israel around 400 CE, and the Babylonian Talmud (Talmud
Bavli), compiled in Mesopotamia (modern Iraq) around 500 CE. The Babylonian Talmud
is the more authoritative and widely studied version. It consists of 63 tractates
organized into six orders (sedarim), covering subjects ranging from agricultural law to
civil and criminal jurisprudence, temple rituals, family law, and dietary regulations.[1]
The Talmud is not a code of law in the modern sense; rather, it is a record of rabbinical
debates, legal arguments, parables, ethical discussions, and minority opinions
preserved alongside majority rulings. A single page of the Talmud typically contains
multiple layers of commentary spanning centuries of scholarship. This is a critical
distinction: the Talmud records what rabbis argued, not necessarily what was adopted
as binding law.[1]
COMPONENT
DATE
LANGUAGE
CONTENT
Mishnah
~200 CE
Hebrew
Codification of the Oral Torah; 63 tractates in 6 orders
Gemara
(Jerusalem)
~400 CE
Western
Aramaic
Commentary on the Mishnah; compiled in the Land of
Israel
Gemara
(Babylonian)
~500 CE
Eastern
Aramaic
Commentary on the Mishnah; compiled in Mesopotamia;
more authoritative
Rashi
Commentary
~1100 CE
Hebrew
Line-by-line explanation; printed in inner margin
Tosafot
12th–14th
century
Hebrew
Critical glosses and cross-references; printed in outer
margin
One passage from the Talmud itself reveals the extraordinary authority its authors
claimed for rabbinic interpretation over even divine instruction:
Direct Quote  —  Eruvin 21b`},{type:`quote`,quote:{text:`My son, be careful with regard to the words of the Scribes
[Rabbis] even more than the words of the Torah.`,attribution:`ERUVIN 21B  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S1]
Breakdown: This passage establishes that rabbinic law (the Oral Torah as codified in the
Talmud) carries equal or greater practical authority than the Written Torah (the Five
Books of Moses) in daily Jewish life. The Talmud is not merely a commentary on the
Bible  —  it claims, in its own text, to supersede the Bible in matters of daily practice.
Direct Quote  —  Bava Metzia 59b (The Oven of Akhnai)
"Rabbi Yehoshua stood on his feet and said: 'It is not in heaven'
(Deuteronomy 30:12)... What is the relevance of 'It is not in
heaven'? Rabbi Yirmeya said: Since the Torah was already
given at Mount Sinai, we do not regard a Divine Voice, as You
already wrote at Mount Sinai, in the Torah: 'After the
majority to incline' (Exodus 23:2)."
BAVA METZIA 59B  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S2]
Breakdown: In this passage, God Himself intervenes in a legal debate between rabbis. A
divine voice declares one rabbi correct. The other rabbis overrule God, citing the
Torah's own instruction to follow the majority. The Talmud then records that God
laughed and said: "My children have defeated Me." This passage is significant because it
establishes that, according to the Talmud's own framework, rabbinic consensus holds
authority over divine revelation once the Torah has been given.`}},{type:`text`,text:`KEY TERMS  —  Hebrew and Aramaic Terminology
The following terms appear throughout this chapter in their original Hebrew or Aramaic
form. Direct quotations from the William Davidson Talmud (Sefaria.org) retain the
translator's English renderings.
Term
Language
Literal Meaning
Usage
Goy /
Goyim
Hebrew
"Nation" or
"people" (pl.
goyim)
Refers to non-Jewish
individuals or nations.
Often translated as
"gentile."
Nokhri
Hebrew
"Foreigner" or
"stranger"
A legal category for a non-
Jew with no formal
relationship to the Jewish
community.
Halakha
Hebrew
"The way"
Jewish religious law
derived from the Torah and
Talmud.
Tumah
Hebrew
"Ritual impurity"
A state restricting
participation in certain
religious activities.
Ketubah
Aramaic
"Written
document"
A Jewish marriage
contract. Central topic in
Tractate Ketubot.
Mamzer
Hebrew
"Illegitimate
child"
Born of forbidden unions;
restricted from marrying
into the community for ten
generations.`},{type:`text`,text:`Term
Language
Literal Meaning
Usage
Adam
Hebrew
"Man" or "human
being"
In Yevamot 61a, interpreted
to apply exclusively to
Jews in a ritual purity
context.
Kiddush
Hashem
Hebrew
"Sanctification of
God's name"
Ethical conduct toward all
people. Cited in Bava
Kamma 113a.
Nakba
Arabic
"Catastrophe"
The 1948 displacement of
~700,000 Palestinian Arabs.
Moshavot
Hebrew
"Settlements"
Jewish agricultural
colonies in Ottoman
Palestine, many funded by
Baron Edmond de
Rothschild.
II. Historical Controversies  —  The Documented
Record
The Talmud has been the subject of intense controversy for over 800 years. The
following section documents the historical record of these controversies  —  what
happened, who was involved, and what the primary sources say.
THE DISPUTATION OF PARIS (1240) AND THE BURNING OF THE TALMUD (1242)
In 1240, Nicholas Donin, a Jewish convert to Christianity, persuaded Pope Gregory IX to
issue a papal bull ordering the confiscation and examination of the Talmud. A formal
disputation was held in Paris under King Louis IX of France, with Rabbi Yechiel of Paris`},{type:`text`,text:`defending the Talmud against Donin's charges that it contained blasphemous passages.
Following the disputation, the Talmud was condemned, and on June 17, 1242,
approximately 24 cartloads of Talmudic manuscripts  —  an estimated 10,000 to 12,000
volumes  —  were publicly burned in Paris.[2]
The Anti-Defamation League issued a formal report in 2003 stating: "There has been a
renewal of attacks on Judaism and Jews through recycling of old accusations and
distortions about the Talmud. Anti-Talmud tracts were originally developed in the
Middle Ages as Christian polemics against Judaism, but today they emanate from a
variety of Christian, Muslim and secular sources."[3]
III. The Passages  —  Direct Quotes from the Talmud
Sourcing Standard: Every passage below is quoted directly from the William Davidson Talmud on Sefaria.org  —  the world's
largest free, open-source library of Jewish texts. Each citation includes the tractate name, folio number, and passage number,
and is hyperlinked to the original bilingual source. The reader may click any citation to verify the quote independently.
Scholarly context and the ADL's documented responses are presented alongside each passage.[3]
Quote 1  —  Sanhedrin 37a: Saving One Life
"Therefore Adam the first man was created alone... to teach
you that whoever destroys a single soul, the Scripture
considers it as if he destroyed an entire world. And whoever
saves a single soul, the Scripture considers it as if he saved an
entire world."
SANHEDRIN 37A  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S3]`},{type:`text`,text:`Breakdown: One of the most universally cited Talmudic passages and the source of the
famous principle that "whoever saves one life saves the entire world." This passage is
frequently quoted in interfaith dialogue and was referenced in the film Schindler's List.
However, a textual variant exists: some manuscript traditions read "a single soul of
Israel" rather than "a single soul"  —  meaning the universal application may have been a
later emendation. This textual variant has itself been the subject of scholarly debate.[S3]
Quote 2  —  Sanhedrin 57a:8: The Noahide Laws
"Rav Yosef says: They say in the study hall that a descendant of
Noah is executed for transgressing three mitzvot: For
forbidden sexual relations, for bloodshed, and for blessing
[cursing] the name of God."
SANHEDRIN 57A:8  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S4]
Breakdown: This passage establishes the Noahide laws  —  the seven laws that the
Talmud states apply to all goyim (non-Jews, literally "the nations," descendants of Noah).
The discussion concerns which transgressions carry the death penalty for goyim.
Critics cite this passage as evidence of a dual legal system in which Jews and goyim are
subject to different rules. Jewish scholars respond that the Noahide laws are a universal
ethical framework for all goyim  —  a minimum standard of conduct for all humanity  — 
and that the discussion of penalties is a theoretical legal exercise, not a practical
prescription.[3]
Quotes 3 & 4  —  Sanhedrin 59a: Two Contradictory Rulings on the Same Page`},{type:`quote`,quote:{text:`Rabbi Yoḥanan says: A gentile who engages in Torah study is
liable to receive the death penalty; as it is stated: 'Moses
commanded us a law [torah], an inheritance of the
congregation of Jacob' (Deuteronomy 33:4), indicating that it
is an inheritance for us, and not for them.`,attribution:`SANHEDRIN 59A:2  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S5]
"Rabbi Meir would say: From where is it derived that even a
gentile who engages in Torah study is considered like a High
Priest? It is derived from that which is stated: 'You shall
therefore keep My statutes and My ordinances, which if a man
does he shall live by them' (Leviticus 18:5). The phrase: Which
if priests, Levites, and Israelites do they shall live by them, is
not stated, but rather: 'A man,' which indicates mankind in
general. You have therefore learned that even a gentile who
engages in Torah study is considered like a High Priest."
SANHEDRIN 59A:4  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S6]
Breakdown: These two passages appear on the same page of the same tractate. Rabbi
Yoḥanan says a gentile who studies Torah deserves death. Rabbi Meir says a gentile who
studies Torah is like a High Priest. The Talmud does not resolve this contradiction  —  it
records both views. This internal contradiction is itself the most important fact: the
Talmud is a record of debate, not a unified code of law. Both the harshest and the most
universalist positions are preserved in the same text. Which position a reader
emphasizes depends on which passage they choose to cite.
Quote 5  —  Yevamot 61a: "You Are Called Adam"`}},{type:`quote`,quote:{text:`Rabbi Shimon bar Yohai says: The graves of gentiles do not
render one impure, as it is stated: 'And you My sheep, the sheep
of My pasture, are men [adam]' (Ezekiel 34:31). You, i.e., the
Jewish people, are called adam [man], but gentiles are not
called adam.`,attribution:`YEVAMOT 61A  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S7]
Breakdown: This passage concerns ritual purity laws (tumah)  —  specifically whether
walking over a non-Jewish grave creates ritual impurity for a Jewish priest. The ruling
is that it does not, based on the exegetical claim that the term "adam" (man) applies
exclusively to Jews. Critics cite this as establishing a fundamental hierarchy between
Jews and goyim at the level of human categorization. Jewish scholars respond that this
is a narrow legal ruling about ritual categories within the purity system, not a statement
about human worth or dignity, and that the Talmud elsewhere affirms the creation of all
humans in God's image.[3]
Quote 6  —  Bava Kamma 113a: Legal Dealings with Goyim
The tractate discusses whether it is permitted to deceive a goy
in legal proceedings. Multiple opinions are recorded. The
majority ruling states that deception is prohibited, citing the
principle of kiddush Hashem (sanctification of God's name
through ethical conduct toward all people).
BAVA KAMMA 113A  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S8]
Breakdown: Critics cite minority opinions within this passage that appear to permit
deception of goyim. Jewish scholars respond that the majority ruling explicitly`}},{type:`text`,text:`prohibits deception of anyone, Jew or goy, and that the passage itself is a debate about
the principle of ethical conduct. The fact that the minority opinion is preserved in the
text  —  even though it was rejected  —  is characteristic of the Talmud's method of
recording all arguments for pedagogical purposes.[3]
Quote 7  —  Gittin 57a: Punishment in the Afterlife
The passage describes Onkelos the convert raising figures from
the dead to ask about their punishment in the afterlife. One
figure  —  identified by some scholars as Jesus of Nazareth,
though this identification is debated  —  is described as being
punished "in boiling excrement."
GITTIN 57A  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S9]
Breakdown: This passage has been one of the most controversial in Christian-Jewish
relations for centuries. It was among the passages cited at the Disputation of Paris in
1240 and contributed to the burning of the Talmud in 1242. Jewish scholars note that the
identification of the figure as Jesus is disputed among Talmudic scholars, that the
passage may refer to a different person entirely, and that the Talmud contains multiple
layers of allegory and hyperbole. The passage nonetheless exists in the text and has been
cited in religious controversies for over 800 years.[3]
Quote 8  —  Sanhedrin 54b: Age Thresholds for Criminal Liability`},{type:`text`,text:`The tractate discusses the age at which a boy can be
considered to have committed a sexual transgression  — 
establishing that a boy under nine years old cannot be held
criminally liable for sexual acts, as the act is not legally
recognized as intercourse.
SANHEDRIN 54B  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S10]
Breakdown: This passage establishes age thresholds for criminal liability in sexual
transgressions. Critics cite it as establishing disturbing age thresholds. Jewish scholars
respond that the passage is a legal discussion about when criminal liability attaches to
the perpetrator  —  analogous to modern legal discussions about the age of criminal
responsibility  —  not an endorsement or permission of the acts discussed. The Talmud
elsewhere explicitly condemns sexual abuse.[3]
Quote 9  —  Ketubot 11b:6: Intercourse with a Minor Girl
"Rava said that this is what the mishna is saying: An adult
man who engaged in intercourse with a minor girl less than
three years old has done nothing, as intercourse with a girl less
than three years old is tantamount to poking a finger into the
eye. In the case of an eye, after a tear falls from it another tear
forms to replace it. Similarly, the ruptured hymen of the girl
younger than three is restored."
KETUBOT 11B:6  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S11]
Breakdown: This passage discusses the legal (halakhic) consequences of intercourse
with a girl under three years old  —  specifically whether it affects her virginity status for`},{type:`text`,text:`purposes of marriage contracts (ketubah). The phrase "has done nothing" refers to the
legal consequence for the girl's marriage contract value, not to the moral or criminal
status of the act. The passage does not state that such intercourse is permitted. Jewish
scholars respond that the passage is a legal analysis of physical consequences within
the marriage contract system, not a permission or endorsement, and that the Talmud
elsewhere explicitly condemns sexual abuse of children. Critics respond that the
clinical, transactional framing of child sexual abuse within a legal discussion  — 
regardless of the intended scope  —  is itself the concern.[S11]
Quote 10  —  Ketubot 11b:5: Age Thresholds in Marriage Contract Law
"With regard to an adult man who engaged in intercourse
with a minor girl less than three years old, or a minor boy less
than nine years old who engaged in intercourse with an adult
woman, or a woman who had her hymen ruptured by wood or
any other foreign object, the marriage contract for each of
these women is two hundred dinars."
KETUBOT 11B:5  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S12]
Breakdown: This passage establishes age thresholds for legal consequences in
marriage contract law. It discusses whether intercourse by a minor boy (under 9) or
with a minor girl (under 3) has legal significance for marriage contracts. The passage is
a legal discussion about when acts have consequences within the ketubah system.
Jewish scholars emphasize that these are discussions of legal categories within an
ancient legal framework, not endorsements of the acts described.[S12]
Quote 11  —  Kiddushin 66b: The Mamzer  —  Status of Children`},{type:`text`,text:`The tractate discusses the legal status of a mamzer  —  a child
born of certain forbidden unions (such as adultery or incest)  — 
who is prohibited from marrying into the general Jewish
community for ten generations.
KIDDUSHIN 66B  —  WILLIAM DAVIDSON TALMUD, SEFARIA.ORG[S13]
Breakdown: This passage has been cited by critics as evidence of a rigid caste system
within Jewish law, in which children are permanently stigmatized for the
circumstances of their birth. Jewish scholars acknowledge that the mamzer status is one
of the most difficult areas of Jewish law and note that many modern rabbinical
authorities have sought ways to mitigate its practical application.[S13]
Quote 12  —  Sanhedrin 37a (Textual Variant): "A Soul of Israel"
Some manuscript traditions of Sanhedrin 37a read: "Whoever
destroys a single soul of Israel, the Scripture considers it as if
he destroyed an entire world." Other manuscripts omit "of
Israel," making the statement universal.
SANHEDRIN 37A  —  TEXTUAL VARIANT DOCUMENTED IN SEFARIA.ORG APPARATUS[S3]
Breakdown: The existence of both variants is a documented fact. The version most
commonly quoted in interfaith dialogue  —  "whoever saves one life saves the entire
world"  —  uses the universal reading. The variant that includes "of Israel" limits the
principle to Jewish lives. Which version is original is a matter of scholarly debate. The
fact that both versions exist in the manuscript tradition is itself significant: it means the
most famous universalist statement in the Talmud may have originally applied only to`},{type:`text`,text:`Jews, or it may have been universalist from the beginning. The textual evidence does not
resolve this question definitively.
Quote 13  —  The Concept of Chosenness (Multiple Sources)
"You have chosen us from among all nations, You have loved us
and found favor with us. You have raised us above all tongues
and made us holy through Your commandments."
FROM THE JEWISH LITURGY, BASED ON DEUTERONOMY 7:6 AND DEUTERONOMY 14:2. DISCUSSED
THROUGHOUT THE TALMUD IN TRACTATES INCLUDING BERAKHOT AND SHABBAT.
Breakdown: The concept of the "Chosen People" is central to Jewish theology and is
discussed throughout the Talmud. Jewish scholars consistently explain that
"chosenness" refers to a covenantal obligation  —  more commandments, more
responsibility  —  not a claim of inherent racial or ethnic superiority. Critics, including
Israel Shahak, have argued that the practical application of the concept has, in some
contexts, been used to justify differential treatment of Jews and goyim. Both the
theological explanation and the critical response are documented positions.[3]`},{type:`text`,text:`SUMMARY TABLE  —  ALL QUOTED PASSAGES
#
TRACTATE
SUBJECT
WHAT IT SAYS
SCHOLARLY RESPONSE`},{type:`text`,text:`Eruvin 21b
Rabbinic
authority
Rabbinic words carry more
weight than Torah
Reflects the legal principle that the
Oral Torah interprets the Written
Torah`},{type:`text`,text:`Bava Metzia
59b
God overruled
Rabbis overrule God's own voice
in a legal debate
Demonstrates that human legal
reasoning governs after Sinai`},{type:`text`,text:`Sanhedrin
37a
Value of life
"Whoever saves one life saves
the world" (variant: "of Israel")
Universalist principle; textual variant
debated`},{type:`text`,text:`Sanhedrin
57a
Noahide laws
Goyim executed for three
transgressions
Universal ethical framework, not a
practical prescription
5–`},{type:`text`,text:`Sanhedrin
59a
Torah study
Goy studying Torah: death
penalty / like a High Priest
Contradictory opinions preserved;
demonstrates dialectical method`},{type:`text`,text:`Yevamot 61a
Ritual purity
Goyim "not called adam"
Narrow ritual purity ruling, not a
statement of human worth`},{type:`text`,text:`Bava
Kamma
113a
Dealings with
Goyim
Debate on deception; majority
prohibits
Majority ruling prohibits deception of
all people`},{type:`text`,text:`Gittin 57a
Afterlife
punishment
Figure (possibly Jesus) punished
in boiling excrement
Identification disputed;
allegorical/hyperbolic genre`},{type:`text`,text:`Sanhedrin
54b
Age
thresholds
Boy under 9 not criminally liable
for sexual acts
Discussion of criminal liability, not
endorsement`},{type:`text`,text:`Ketubot
11b:6
Minor girl
Intercourse with girl under 3
"has done nothing" (re:
marriage contract)
Legal analysis of contract
consequences, not permission`},{type:`text`,text:`Ketubot
11b:5
Age
thresholds
Marriage contract values for
minors
Ancient legal categories within
ketubah system`},{type:`text`,text:`Kiddushin
66b
Mamzer
status
Children of forbidden unions
stigmatized for 10 generations
Acknowledged as difficult; modern
authorities seek mitigation`},{type:`text`,text:`IV. Israel Shahak  —  A Dissenting Israeli Voice
Israel Shahak (1933–2001) was a Polish-born Israeli professor of organic chemistry at
the Hebrew University of Jerusalem, a Holocaust survivor (Bergen-Belsen), and the
chairman of the Israeli League for Human and Civil Rights. In 1994, he published Jewish
History, Jewish Religion: The Weight of Three Thousand Years, in which he argued that
certain Talmudic attitudes toward non-Jews had influenced Israeli government policy,
particularly regarding the treatment of Palestinians and goyim generally.[4]
Shahak's work was praised by Noam Chomsky, Edward Said, and Gore Vidal, and
criticized by the ADL and mainstream Jewish organizations as a misrepresentation of
Jewish law. Shahak himself stated that his critique was directed at the political
instrumentalization of religious texts, not at Judaism as a faith.[4]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  C A U S A L LI N K ES T A B LI S H ED
The following facts are documented but no direct causal connection between religious texts and state policy has been
established.
Shahak documented specific instances in which Israeli military rabbis cited Talmudic passages to justify
policies toward Palestinian civilians. In 2009, the Israeli newspaper Haaretz reported that military rabbis
distributed pamphlets to IDF soldiers entering Gaza during Operation Cast Lead that cited religious texts to
frame the operation in theological terms. The IDF Chief Rabbi's office did not deny the distribution but
stated the pamphlets were "unauthorized."[4] This is notable because it documents a pathway  —  however
contested  —  between religious text and military conduct, without establishing that the text caused the
conduct.`},{type:`text`,text:`O
P A R T  I I
The Balfour Declaration  —  67 Words
That Redrew the Map
V. The Letter
n November 2, 1917, Arthur James Balfour, the British Foreign Secretary,
wrote a letter to Lord Walter Rothschild, 2nd Baron Rothschild, a leader of
the British Jewish community, for transmission to the Zionist Federation of
Great Britain and Ireland. The letter, which became known as the Balfour Declaration,
consisted of 67 words that would reshape the Middle East for the next century:
"His Majesty's Government view with favour the
establishment in Palestine of a national home for the Jewish
people, and will use their best endeavours to facilitate the
achievement of this object, it being clearly understood that
nothing shall be done which may prejudice the civil and
religious rights of existing non-Jewish communities in
Palestine, or the rights and political status enjoyed by Jews in
any other country."
ARTHUR JAMES BALFOUR, FOREIGN SECRETARY, NOVEMBER 2, 1917  —  YALE AVALON PROJECT[5]`},{type:`text`,text:`Lord Walter Rothschild, 2nd Baron Rothschild (1868–1937), the recipient of
the Balfour Declaration. A zoologist by profession, he was also a prominent
Zionist leader and member of the most powerful banking dynasty in Europe.
Source: National Portrait Gallery, London.
VI. The Context  —  Why a
Rothschild?
The letter was addressed to Lord Walter Rothschild
for 
specific 
and 
documented 
reasons. 
The
Rothschild family had been the most prominent
financial supporters of Jewish settlement in Palestine for 35 years before the
declaration. Baron Edmond de Rothschild (1845–1934), Walter's uncle, had personally
funded over 30 Jewish agricultural colonies (moshavot) in Ottoman Palestine beginning
in 1882, spending approximately 70 million francs (equivalent to hundreds of millions
in modern currency). He was known in Hebrew as "HaNadiv HaYaduah"  —  "The Well-
Known Benefactor."[6]
Walter Rothschild was simultaneously a leader of the British Jewish community, a
member of the House of Lords, and a representative of the Zionist Federation. The
Rothschild family's position at the intersection of international finance, British
aristocracy, and the Zionist movement made Walter the natural recipient of a
declaration that was, in effect, a promise from one empire to one family on behalf of one
movement.[7]
VII. The Wartime Calculation
The Balfour Declaration was issued during World War I, at a moment when Britain
needed American entry into the war. The British War Cabinet's deliberations,
documented in the British National Archives, reveal that the declaration was partly
motivated by the belief that a pro-Zionist statement would win the support of influential`},{type:`text`,text:`Jewish communities in the United States and Russia, encouraging American entry into
the war and discouraging Russian withdrawal.[8]
Chaim Weizmann, a Russian-born chemist working at the University of Manchester, had
developed a process for producing acetone from bacterial fermentation  —  a critical
component for British munitions production. Weizmann's contribution to the British
war effort gave him direct access to senior government officials, including Balfour and
Prime Minister David Lloyd George. Weizmann used this access to lobby relentlessly
for the declaration. He would later become the first President of Israel.[8]
✅ V ERI FI ED  —   B RI T I S H  N AT I O N A L A RC H I V ES  / YA LE A V A LO N  P ROJ EC T
The Balfour Declaration is preserved in the British National Archives and is available as a primary
source through the Yale Law School Avalon Project. The full text of the letter, including Balfour's signature,
is a matter of public record.[5]
VIII. The Broken Promise
The declaration contained an explicit condition: "nothing shall be done which may
prejudice the civil and religious rights of existing non-Jewish communities in
Palestine." At the time of the declaration, the population of Ottoman Palestine was
approximately 90% Arab (Muslim and Christian) and 10% Jewish.[8]
The declaration promised a "national home" for one people in a land inhabited
overwhelmingly by another people, while simultaneously promising that the rights of
the existing population would not be prejudiced. The 1948 Arab-Israeli War resulted in
the displacement of approximately 700,000 Palestinian Arabs  —  an event known in
Arabic as the Nakba ("catastrophe"). The United Nations Relief and Works Agency
(UNRWA) has maintained records of Palestinian refugees and their descendants since
1949.[9]`},{type:`text`,text:`⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  C A U S A L LI N K ES T A B LI S H ED
The following facts are documented but the causal chain between the declaration and subsequent events involves multiple
intervening factors.
The Balfour Declaration was a letter from the Foreign Secretary of one empire to a member of the
wealthiest banking family in the world, promising to establish a national home for one people in a territory
inhabited by another people, during a world war in which the issuing government needed the financial and
political support of the recipient's community. No representative of the existing population of Palestine  — 
which constituted approximately 90% of the inhabitants  —  was consulted, informed, or mentioned by
name in the letter. The letter referred to them only as "existing non-Jewish communities in Palestine." The
Rothschild family had been funding Jewish settlement in that same territory for 35 years before the letter
was written.[5] [6]`},{type:`text`,text:`T
P A R T  I I I
The Rothschild Connection  —  From
Banking to Statehood
IX. The Family That Financed a Nation
he Rothschild family's involvement in the creation of Israel spans three
generations and over a century of documented financial and political activity:
YEAR
ROTHSCHILD
ACTION
SOURCE`},{type:`text`,text:`Baron Edmond de
Rothschild
Began funding Jewish agricultural colonies in Ottoman
Palestine; ultimately funded 30+ settlements
Britannica[6]
1882–`},{type:`text`,text:`Baron Edmond de
Rothschild
Spent approximately 70 million francs on Palestinian
settlements
Britannica[6]`},{type:`text`,text:`Lord Walter Rothschild
Received the Balfour Declaration as representative of the
Zionist Federation
Yale Avalon
Project[5]`},{type:`text`,text:`Baron Edmond de
Rothschild
Established the Palestine Jewish Colonisation Association
(PICA) to manage his settlements
Wikipedia[6]`},{type:`text`,text:`James de Rothschild
(Edmond's son)
Continued funding after Edmond's death; donated the
Knesset building to the State of Israel
Knesset
Archives[10]`},{type:`text`,text:`Rothschild family
(multiple branches)
State of Israel established; Rothschild-funded settlements
formed the backbone of the new state's agricultural
economy
Britannica[6]`},{type:`text`,text:`James de Rothschild
(posthumous)
The Knesset building, donated by the Rothschild family,
was inaugurated in Jerusalem
Knesset
Archives[10]`},{type:`text`,text:`✅ V ERI FI ED  —   KN ES S ET  A RC H I V ES
The Knesset building in Jerusalem was donated to the State of Israel by the Rothschild family.
James de Rothschild bequeathed the funds for its construction; the building was inaugurated in 1966. A
plaque in the building acknowledges the Rothschild donation. This is the legislature of the State of Israel,
housed in a building donated by the family to whom the Balfour Declaration was addressed.[10]
X. The Rothschilds and Central Banking
The Rothschild family's role in the creation of Israel cannot be separated from their role
in international finance, which is documented in detail in Chapter III of this book. The
same family that funded Jewish settlement in Palestine from 1882, received the Balfour
Declaration in 1917, and donated the Knesset building to the State of Israel also
established the dominant banking houses of London, Paris, Frankfurt, Vienna, and
Naples in the 19th century.[11]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  C A U S A L LI N K ES T A B LI S H ED
The following facts are documented independently. No single conspiracy is alleged.
The Rothschild family simultaneously occupied positions at the apex of European banking, the leadership
of the Zionist movement, and the diplomatic channel through which the British Empire committed to
establishing a Jewish state. Baron Edmond de Rothschild funded the settlements. Lord Walter Rothschild
received the declaration. James de Rothschild donated the parliament building. The family's banking
operations financed governments on multiple sides of multiple wars (documented in Chapters III and V).
These facts are independently verifiable. The reader is invited to assess whether this concentration of
financial, political, and diplomatic power in a single family across three generations constitutes a pattern or
a coincidence.`},{type:`text`,text:`T H E T H REA D T H AT  C O N N EC T S
A 67-word letter from one empire to one banking family promised a homeland for one
people in a land inhabited by another. The family that received the letter had been
funding settlements in that land for 35 years. They had also built the banking system
that financed the war during which the letter was written. In the next chapter, we
examine how that banking system was constructed  —  and how it came to control the
money supply of every major nation on earth.`}],sources:[{id:1,text:`"Talmud," Wikipedia. https://en.wikipedia.org/wiki/Talmud`,url:`https://en.wikipedia.org/wiki/Talmud`},{id:2,text:`"Disputation of Paris," Wikipedia. https://en.wikipedia.org/wiki/Disputation_of_Paris`,url:`https://en.wikipedia.org/wiki/Disputation_of_Paris`},{id:3,text:`"Criticism of the Talmud," Wikipedia (citing ADL 2003 report). https://en.wikipedia.org/wiki/Criticism_of_the_Talmud`,url:`https://en.wikipedia.org/wiki/Criticism_of_the_Talmud`},{id:4,text:`"Israel Shahak," Wikipedia. https://en.wikipedia.org/wiki/Israel_Shahak`,url:`https://en.wikipedia.org/wiki/Israel_Shahak`},{id:5,text:`"The Balfour Declaration, November 2, 1917," Yale Law School Avalon Project. https://avalon.law.yale.edu/20th_century/balfour.a sp`,url:`https://avalon.law.yale.edu/20th_century/balfour.a`},{id:6,text:`"Edmond de Rothschild," Wikipedia. https://en.wikipedia.org/wiki/Edmond_de_Rothschild`,url:`https://en.wikipedia.org/wiki/Edmond_de_Rothschild`},{id:7,text:`"Walter Rothschild, 2nd Baron Rothschild," Wikipedia. https://en.wikipedia.org/wiki/Walter_Rothschild,_2nd_Baron_Rothschild`,url:`https://en.wikipedia.org/wiki/Walter_Rothschild,_2nd_Baron_Rothschild`},{id:8,text:`"Balfour Declaration," Wikipedia. https://en.wikipedia.org/wiki/Balfour_Declaration`,url:`https://en.wikipedia.org/wiki/Balfour_Declaration`},{id:9,text:`"1948 Palestinian Exodus," Wikipedia. https://en.wikipedia.org/wiki/1948_Palestinian_exodus`,url:`https://en.wikipedia.org/wiki/1948_Palestinian_exodus`},{id:10,text:`"James Armand de Rothschild," Wikipedia. https://en.wikipedia.org/wiki/James_Armand_de_Rothschild`,url:`https://en.wikipedia.org/wiki/James_Armand_de_Rothschild`},{id:11,text:`"Rothschild Family," Wikipedia. https://en.wikipedia.org/wiki/Rothschild_family Primary Talmudic Sources (Sefaria.org  —  William Davidson Translation) [S1]  Eruvin 21b. https://www.sefaria.org/Eruvin.21b?lang=bi [S2]  Bava Metzia 59b. https://www.sefaria.org/Bava_Metzia.59b?lang=bi [S3]  Sanhedrin 37a. https://www.sefaria.org/Sanhedrin.37a?lang=bi [S4]  Sanhedrin 57a. https://www.sefaria.org/Sanhedrin.57a?lang=bi [S5]  Sanhedrin 59a:2. https://www.sefaria.org/Sanhedrin.59a.2?lang=bi [S6]  Sanhedrin 59a:4. https://www.sefaria.org/Sanhedrin.59a.4?lang=bi [S7]  Yevamot 61a. https://www.sefaria.org/Yevamot.61a?lang=bi [S8]  Bava Kamma 113a. https://www.sefaria.org/Bava_Kamma.113a?lang=bi [S9]  Gittin 57a. https://www.sefaria.org/Gittin.57a?lang=bi [S10]  Sanhedrin 54b. https://www.sefaria.org/Sanhedrin.54b?lang=bi [S11]  Ketubot 11b:6. https://www.sefaria.org/Ketubot.11b.6?lang=bi [S12]  Ketubot 11b:5. https://www.sefaria.org/Ketubot.11b.5?lang=bi [S13]  Kiddushin 66b. https://www.sefaria.org/Kiddushin.66b?lang=bi`,url:`https://en.wikipedia.org/wiki/Rothschild_family`}],crossLinks:[{label:`Chapter 7: Mossad: The Institute`,chapterId:`chapter-7`},{label:`Chapter 8: JFK, Dimona & AIPAC`,chapterId:`chapter-8`}],keywords:[`Zionism`,`Balfour Declaration`,`Herzl`,`Palestine`,`British Mandate`,`Israel`]},{id:`chapter-7`,number:`Chapter 7`,title:`Mossad: The Institute`,subtitle:`The intelligence agency that operates by its own rules — from covert assassinations to nuclear espionage, documented through declassified files and sworn testimony.`,dateRange:`1949–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Creation of Israel and
the Mossad
From the founding of the state in 1948 to the most sophisticated intelligence
apparatus on earth  —  a documented history of covert operations, assassinations, false
flag attacks, and the agency that answers to no legislature.
Published by Veritas Worldwide Media · Primary sources: Britannica, Stanford CISAC, U.S. State Department FRUS, The Guardian, The New
York Times, Israeli Government Archives`},{type:`text`,text:`The Creation of Israel and the
Mossad
The intelligence agency that reports to one person, operates in every country on
earth, and has never been subject to parliamentary oversight  —  documented from
its founding to the present day.
Published by Veritas Worldwide Media · Sources verified as of March 2026
W H Y  T H I S  M AT T E R S  T O  Y O U
Mossad is one of the most powerful intelligence agencies on Earth, operating in
virtually every country with near-total impunity. Its operations have included
assassinations on foreign soil, nuclear espionage, and covert influence campaigns
that have shaped elections, wars, and international treaties. If you believe that
sovereign nations should control their own affairs, this chapter documents  —  from
declassified files, court records, and the agency's own published accounts  —  what
happens when a foreign intelligence service operates without boundaries, and why
every citizen of every country should understand its reach.
I. The Founding of the State and the Intelligence
Apparatus
n May 14, 1948, David Ben-Gurion declared the establishment of the State of
Israel. Within eighteen months, on December 13, 1949, Ben-Gurion directed
Reuven Shiloah to establish the "Central Institute for Coordination," which`},{type:`text`,text:`would become the Mossad.[1] The agency was reorganized in March 1951 and
incorporated directly into the Prime Minister's Office, where it has remained ever since
 —  reporting exclusively to the Prime Minister, not to the Knesset or any parliamentary
committee.[1]
The Mossad's full name is HaMossad leModiʿin uleTafkidim Meyuḥadim  —  "The Institute
for Intelligence and Special Operations." Israeli journalist Ronen Bergman, who spent
eight years interviewing over 1,000 intelligence operatives for his book Rise and Kill
First, described the Mossad as functioning as a "deep state" due to its accountability
structure: it answers to one person, the sitting Prime Minister, and its budget,
operations, and personnel are classified.[1]
The official seal of the Mossad. The agency's motto, from Proverbs 11:14: "Where no counsel is, the people fall, but in the multitude of
counsellors there is safety." Source: Israeli Government.`},{type:`text`,text:`II. Structure and Operational Divisions
The Mossad operates with an estimated budget of approximately US$2.73 billion and an
estimated 7,000 employees, though both figures are classified and have never been
officially confirmed by the Israeli government.[1] The agency is organized into several
key divisions:
DIVISION
FUNCTION
NOTABLE DETAIL
Tzomet
Espionage  —  recruiting and running agents (case
officers)
Largest division; operates globally
Caesarea
Special operations and paramilitary action
Houses the Kidon ("bayonet") assassination unit
Kidon
Elite assassination unit within Caesarea
Operatives undergo 2 years of training near
Herzliya
Keshet
Electronic surveillance, signals intelligence,
wiretapping
Coordinates with Unit 8200 (military SIGINT)
Metsada
Sabotage, assassinations, and paramilitary
operations
Overlaps with Caesarea in certain operations
THE SAYANIM NETWORK
According to former Mossad case officer Victor Ostrovsky and intelligence historian
Gordon Thomas, the Mossad maintains a global network of sayanim  —  unpaid Jewish
civilians in foreign countries who provide logistical support to Mossad operations.
Thomas estimated approximately 4,000 sayanim in the United Kingdom and 16,000 in
the United States as of 1998.[1] These individuals are not agents; they provide safe houses,
vehicles, medical assistance, and other logistical support when requested. The
existence of this network has been documented by multiple former intelligence officers
but has never been officially acknowledged by the Israeli government.`},{type:`text`,text:`⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  LI N K ES T A B LI S H ED
The following is factually documented but no direct causal connection has been established.
The sayanim network, if it operates at the scale described by Thomas and Ostrovsky, would represent the
largest undeclared foreign intelligence support network operating on American soil. No sayanim has ever
been charged under U.S. law, and the network has never been the subject of a formal U.S.
counterintelligence investigation, according to publicly available records. This is notable because the
Foreign Agents Registration Act (FARA) requires individuals acting on behalf of foreign governments to
register with the Department of Justice.[2]
III. Directors of the Mossad (1949–Present)
#
DIRECTOR
TERM
NOTABLE`},{type:`text`,text:`Reuven Shiloah
1949–1953
Founding director; established structure`},{type:`text`,text:`Isser Harel
1953–1963
Captured Adolf Eichmann (1960)`},{type:`text`,text:`Meir Amit
1963–1968
Modernized intelligence gathering`},{type:`text`,text:`Zvi Zamir
1968–1973
Oversaw Operation Wrath of God`},{type:`text`,text:`Yitzhak Hofi
1973–1982
Post-Yom Kippur War restructuring`},{type:`text`,text:`Nahum Admoni
1982–1989
Jonathan Pollard affair (1985)`},{type:`text`,text:`Shabtai Shavit
1989–1996
Post-Cold War operations`},{type:`text`,text:`Danny Yatom
1996–1998
Failed Khaled Mashal assassination`},{type:`text`,text:`Efraim Halevy
1998–2002
Pre-9/11 intelligence era`},{type:`text`,text:`Meir Dagan
2002–2011
Stuxnet; Iran nuclear scientist assassinations`},{type:`text`,text:`Tamir Pardo
2011–2016
Expanded cyber operations`},{type:`text`,text:`Yossi Cohen
2016–2021
Fakhrizadeh assassination (2020)`},{type:`text`,text:`David Barnea
2021–present
Current director`},{type:`text`,text:`I
P A R T  I I
Documented Operations  —  The
Historical Record
IV. The Lavon Affair  —  A Documented False Flag
Operation (1954)
n the summer of 1954, Israeli military intelligence (Aman) activated a covert cell
of Egyptian Jews in what was codenamed "Operation Susannah." The operatives
planted firebombs in Egyptian, American, and British-owned civilian targets in
Cairo and Alexandria  —  including a U.S. Information Agency library, a British-owned
cinema, and Egyptian post offices. The goal was to frame Egyptian nationalists,
destabilize the Nasser government, and prevent the planned British withdrawal from
the Suez Canal Zone.[3]
The operation was discovered when one of the agents' incendiary devices detonated
prematurely. Egyptian authorities arrested the cell. Two operatives were executed;
several others were imprisoned. In Israel, the scandal became known as "The Lavon
Affair" after Defense Minister Pinhas Lavon, who denied authorizing the operation. The
question "Who gave the order?" consumed Israeli politics for years and ultimately
contributed to the fall of the Ben-Gurion government.[4]
✅ V ERI FI ED  —   P RI M A RY S O U RC E
Israel officially acknowledged the Lavon Affair in 2005 when President Moshe Katsav honored the
surviving operatives with certificates of appreciation at a ceremony in the Presidential Residence. This was
the first official Israeli acknowledgment that the operation had taken place.[4]`},{type:`text`,text:`✅ V ERI FI ED  —   S T A N FO RD C I S A C
Stanford University's Center for International Security and Cooperation (CISAC) published a detailed
analysis concluding: "The Lavon Affair, a failed Israeli covert operation directed against Egypt in
1954, triggered a chain of events that have had profound consequences for power..."[3]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  LI N K ES T A B LI S H ED
The following is factually documented but no direct causal connection to subsequent events has been established.
The Lavon Affair is the only officially acknowledged false flag operation conducted by the State of Israel. It
is notable because it demonstrates a documented willingness to attack American and British civilian targets
and frame a third party. The operation targeted a U.S. government building (the USIA library in Alexandria).
No U.S. investigation into the attack on the USIA library has been declassified.[3]
V. The Capture of Adolf Eichmann (1960)
Adolf Eichmann, the SS-Obersturmbannführer who organized the logistics of the
Holocaust, escaped Europe after World War II and lived in Argentina under the alias
"Ricardo Klement." On May 11, 1960, a Mossad team led by Director Isser Harel
captured Eichmann in Buenos Aires. He was smuggled out of Argentina on an El Al flight
and brought to Israel, where he was tried, convicted of crimes against humanity and
war crimes, and executed by hanging on June 1, 1962.[5]
The Eichmann capture remains the most universally praised Mossad operation.
Argentina protested the violation of its sovereignty, and the UN Security Council passed
Resolution 138 calling on Israel to make "appropriate reparation," but the trial
proceeded. Eichmann's testimony and the evidence presented at his trial became
foundational documents of Holocaust scholarship.[6]`},{type:`text`,text:`O
VI. The Attack on the USS Liberty (1967)
n June 8, 1967, during the third day of the Six-Day War, Israeli Air Force jets
and Israeli Navy torpedo boats attacked the USS Liberty, a United States
Navy technical research ship (intelligence vessel), in international waters in
the eastern Mediterranean Sea. The attack killed 34 American sailors and wounded 171.
[7]
Israel stated the attack was a case of mistaken identity. The U.S. Navy Court of Inquiry,
convened under Rear Admiral Isaac Kidd, accepted Israel's explanation. However,
multiple senior U.S. officials disputed this conclusion. Secretary of State Dean Rusk
later stated: "I was never satisfied with the Israeli explanation... I didn't believe them
then, and I don't believe them to this day. The attack was outrageous."[8]
The U.S. State Department's own Foreign Relations of the United States (FRUS) series
documents the attack in detail, including communications between the U.S. Embassy in
Tel Aviv and the State Department in Washington.[7]
✅ V ERI FI ED  —   U . S .  S T AT E DEP A RT M EN T  FRU S
The attack on the USS Liberty is documented in the U.S. State Department's official Foreign
Relations of the United States series, Volume XIX, Arab-Israeli Crisis and War, 1967, Document 284: "THE
ISRAELI ATTACK ON THE USS LIBERTY."[7]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  LI N K ES T A B LI S H ED
The following facts are documented but no definitive conclusion has been established regarding intent.
The USS Liberty was a clearly marked U.S. Navy vessel flying an American flag in international waters
on a clear day with unlimited visibility. The attack lasted approximately 75 minutes and included napalm,
rockets, cannon fire, and torpedoes. Israeli reconnaissance aircraft had overflown the Liberty at least six
times in the hours before the attack, according to the ship's crew. The ship's hull markings "GTR-5" were
clearly visible. Despite these facts, no independent U.S. investigation has ever been conducted  —  the Navy
Court of Inquiry was completed in just one week under orders from President Johnson.[8]`},{type:`text`,text:`VII. Operation Wrath of God (1972–1988)
September 5, 1972: A masked Black September operative on the balcony of the Israeli team's quarters at the Munich Olympics.
Eleven Israeli athletes and coaches were killed. The massacre triggered Mossad's Operation Wrath of God. Source: AP Photo/Kurt
Strumpf.
On September 5, 1972, eight members of the Palestinian militant group Black
September took eleven Israeli Olympic team members hostage at the Munich
Olympics. All eleven hostages, five of the eight attackers, and one West German police
officer were killed during a failed rescue attempt at Fürstenfeldbruck airbase.[9]
In response, Prime Minister Golda Meir authorized "Committee X" to direct the Mossad
to systematically assassinate those responsible. The operation, known as Operation
Wrath of God (also called Operation Bayonet), lasted from 1972 to at least 1988. Mossad
teams tracked and killed targets across Europe and the Middle East. The most
prominent target was Ali Hassan Salameh, Black September's chief of operations, who
was killed by a car bomb in Beirut on January 22, 1979.[9]`},{type:`text`,text:`In 2025, The Guardian reported that Western intelligence agencies  —  including the CIA,
MI6, and French intelligence  —  provided Mossad with information used to track and kill
Palestinian targets during the 1970s campaign.[10]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  LI N K ES T A B LI S H ED
The following is factually documented but the broader implications remain a matter of interpretation.
The Lillehammer Affair (1973): During Operation Wrath of God, a Mossad team in Lillehammer, Norway,
killed Ahmed Bouchikhi, a Moroccan waiter, mistaking him for Ali Hassan Salameh. Six Mossad agents were
arrested by Norwegian police, tried, and convicted. This is the only known case in which Mossad operatives
were arrested, tried, and convicted by a Western government for an extrajudicial killing on European soil.
Israel paid compensation to Bouchikhi's family in 1996 but did not formally apologize.[11]
VIII. Operation Entebbe (1976)
On June 27, 1976, Air France Flight 139 from Tel Aviv to Paris was hijacked by two
members of the Popular Front for the Liberation of Palestine and two members of the
German Revolutionary Cells. The plane was diverted to Entebbe Airport in Uganda,
where President Idi Amin provided support to the hijackers. Non-Israeli hostages were
released; approximately 100 Israeli and Jewish passengers were held.[12]
On July 4, 1976, Israeli commandos from Sayeret Matkal flew over 4,000 kilometers to
Uganda and raided the airport terminal. The operation freed 102 of the 106 hostages.
Three hostages were killed during the rescue, along with all seven hijackers and
approximately 45 Ugandan soldiers. One Israeli soldier was killed: Lieutenant Colonel
Yonatan Netanyahu, the elder brother of future Prime Minister Benjamin Netanyahu.[12]
IX. The Jonathan Pollard Espionage Case (1984–1985)
Jonathan Jay Pollard was a civilian intelligence analyst for the U.S. Navy who spied for
Israel from May 1984 until his arrest in November 1985. Pollard passed an estimated`},{type:`text`,text:`800,000 pages of classified documents to his Israeli handlers, including information on
Arab and Pakistani nuclear programs, Soviet arms shipments, and U.S. intelligence-
gathering techniques.[13]
Pollard was convicted in 1987 and sentenced to life in prison  —  the harshest sentence
ever imposed for espionage on behalf of an ally. Israel initially denied Pollard was their
agent, then acknowledged the relationship in 1998 and granted him Israeli citizenship.
He was released on parole in 2015 after serving 30 years and emigrated to Israel in
December 2020, where Prime Minister Netanyahu personally greeted him at the
airport.[13]
✅ V ERI FI ED  —   U . S .  C O U RT  REC O RDS
Pollard's sentencing memorandum, filed by Secretary of Defense Caspar Weinberger, described
the damage as incalculable and stated that Pollard had compromised "sources and methods" that took
years and billions of dollars to develop. The memorandum remains partially classified.[13]
X. Stuxnet  —  The First Cyberweapon (2010)
In 2010, a computer worm called Stuxnet was discovered in Iranian nuclear enrichment
facilities at Natanz. The worm targeted Siemens industrial control systems and caused
approximately 1,000 uranium enrichment centrifuges to spin out of control and destroy
themselves, setting back Iran's nuclear program by an estimated one to two years.[14]
The New York Times reported in June 2012 that Stuxnet was a joint operation between
the United States (under the codename "Olympic Games," initiated under President
George W. Bush and expanded under President Obama) and Israel. The operation was
developed by the NSA and Israel's Unit 8200 signals intelligence unit. Israel has never
officially confirmed its involvement.[14]`},{type:`text`,text:`XI. Assassinations of Iranian Nuclear Scientists
(2010–2020)
Between 2010 and 2012, four Iranian nuclear scientists were assassinated inside Iran:
SCIENTIST
DATE
METHOD
STATUS
Masoud Ali-Mohammadi
January 12, 2010
Motorcycle bomb, Tehran
Killed
Majid Shahriari
November 29, 2010
Magnetic car bomb, Tehran
Killed
Darioush Rezaeinejad
July 23, 2011
Shot by motorcyclists, Tehran
Killed
Mostafa Ahmadi-Roshan
January 11, 2012
Magnetic car bomb, Tehran
Killed
Iran blamed Israel and the United States for all four assassinations. Neither country
confirmed involvement. U.S. officials denied any role.[15]
On November 27, 2020, Mohsen Fakhrizadeh, described as the "father of Iran's nuclear
weapons program," was killed near Tehran by a remote-controlled machine gun
mounted on a Nissan pickup truck. The New York Times and multiple intelligence
sources attributed the operation to the Mossad. The weapon reportedly used artificial
intelligence to compensate for a 1.6-second communication delay. Israel neither
confirmed nor denied involvement.[16]
XII. The Dubai Assassination of Mahmoud Al-
Mabhouh (2010)
On January 20, 2010, Hamas military commander Mahmoud Al-Mabhouh was found
dead in his hotel room at the Al Bustan Rotana hotel in Dubai. Dubai police conducted a
detailed investigation and identified 27 suspects who had entered the country using
forged passports from the United Kingdom, Ireland, Australia, Germany, and France.[17]`},{type:`text`,text:`The Dubai police released extensive CCTV footage showing the suspects conducting
surveillance, disguising themselves, and entering Al -Mabhouh's room. Multiple
countries  —  including the UK, Ireland, and Australia  —  expelled Israeli diplomats in
response to the passport forgery. Israel neither confirmed nor denied involvement.[17]
XIII. The AIPAC Espionage Scandal (2005)
In August 2005, Lawrence Franklin, a Pentagon analyst in the Office of the Secretary of
Defense, was charged with passing classified information about U.S. policy toward Iran
to two officials of the American Israel Public Affairs Committee (AIPAC): Steve Rosen,
AIPAC's director of foreign policy issues, and Keith Weissman, a senior Iran analyst.
Franklin pleaded guilty and was sentenced to nearly 13 years in prison (later reduced to
10 months of house arrest). The charges against Rosen and Weissman were dropped in
2009 after the government concluded it could not prove its case without revealing
classified information.[18]
⚠ C I RC U M S T A N T I A L EV I DEN C E  —   N O T A B LE B U T  N O  DI REC T  LI N K ES T A B LI S H ED
The following facts are documented but no broader conclusion has been established.
The AIPAC espionage case is notable because it demonstrated a documented pathway by which classified
U.S. national security information was transmitted from a Pentagon official to AIPAC officials, who then
transmitted it to Israeli government officials. The case was dropped not because the conduct did not occur
 —  Franklin pleaded guilty  —  but because the government determined it could not prosecute the AIPAC
officials without revealing additional classified information. AIPAC fired both Rosen and Weissman. Rosen
subsequently sued AIPAC, alleging that the organization routinely trafficked in classified information and
that his conduct was standard practice.[18]
XIV. The PROMIS Software Scandal (1980s)
In the early 1980s, Inslaw Inc. developed PROMIS (Prosecutor's Management
Information System), a sophisticated database software for tracking criminal cases. The`},{type:`text`,text:`U.S. Department of Justice used the software but refused to pay for it, leading Inslaw to
file suit. A federal bankruptcy judge ruled in 1987 that the DOJ had "stolen Inslaw's
PROMIS software through trickery, fraud, and deceit."[19]
Multiple investigations  —  including a 1991 House Judiciary Committee investigation  — 
examined allegations that the DOJ had modified PROMIS with a hidden backdoor and
distributed it to foreign intelligence agencies, including the Mossad, enabling the
monitoring of those agencies' own databases. The House Judiciary Committee's report
stated that there was "strong circumstantial evidence" supporting these allegations but
that the DOJ had obstructed the investigation.[19]
XV. The Lebanon Pager Attacks (2024)
On September 17, 2024, thousands of pagers used by Hezbollah operatives across
Lebanon and Syria simultaneously exploded, killing at least 12 people and wounding
approximately 2,800. The following day, walkie-talkies detonated in a similar
coordinated attack. The New York Times and multiple intelligence sources reported
that the Mossad had intercepted the supply chain of the communication devices and
embedded small explosive charges in them before delivery.[20]
The operation was described by intelligence analysts as one of the most sophisticated
supply-chain attacks in the history of espionage. Israel neither confirmed nor denied
involvement. Lebanon and Hezbollah blamed Israel. The attack raised significant
questions about the laws of armed conflict, as many of the devices were detonated in
civilian areas  —  markets, hospitals, and homes.[20]`},{type:`text`,text:`P A R T  I I I
The Documented Record  — 
Assassinations Attributed to the Mossad
Israeli journalist Ronen Bergman documented in his 2018 book Rise and Kill First: The
Secret History of Israel's Targeted Assassinations that Israel has carried out more targeted
assassinations than any other country in the Western world since World War II  —  an
estimated 2,700 assassination operations. The following table includes only those
operations that have been documented by multiple credible sources or officially
acknowledged:
YEAR
TARGET
LOCATION
METHOD
SOURCE`},{type:`text`,text:`Egyptian military officers
Gaza
Letter bombs
Bergman
(2018)
1972–`},{type:`text`,text:`Black September operatives
(multiple)
Europe/Middle
East
Various (bombs,
shootings)
Britannica[9]`},{type:`text`,text:`Ali Hassan Salameh
Beirut
Car bomb
Britannica[9]`},{type:`text`,text:`Khalil al-Wazir (Abu Jihad)
Tunis
Commando raid
NYT, Bergman`},{type:`text`,text:`Fathi Shaqaqi
Malta
Shooting
Bergman
(2018)`},{type:`text`,text:`Ahmed Yassin
Gaza
Helicopter missile strike
BBC, Reuters`},{type:`text`,text:`Mahmoud Al-Mabhouh
Dubai
Suffocation/drug
injection
Dubai
Police[17]
2010–`},{type:`text`,text:`4 Iranian nuclear scientists
Tehran
Bombs, shootings
NYT[15]`},{type:`text`,text:`Mohsen Fakhrizadeh
Near Tehran
Remote-controlled gun
NYT[16]`},{type:`text`,text:`Ismail Haniyeh
Tehran
Bomb in guesthouse
NYT, Reuters`},{type:`text`,text:`T H E T H REA D T H AT  C O N N EC T S
The Mossad operates with no legislative oversight, reports to one person, maintains a
global network of civilian assets, has conducted the only officially acknowledged false
flag operation against American targets (the Lavon Affair), attacked a U.S. Navy vessel
killing 34 American sailors (USS Liberty), ran the most damaging espionage operation
against the United States by an ally (Jonathan Pollard), and has carried out more
targeted assassinations than any Western nation since World War II. In the next
chapter, we examine the assassination of President John F. Kennedy  —  who, in the
months before his death, was demanding inspections of Israel's secret nuclear facility at
Dimona and attempting to force the American Zionist Council (AIPAC's predecessor) to
register as a foreign agent.`}],sources:[{id:1,text:`"Mossad," Wikipedia. https://en.wikipedia.org/wiki/Mossad`,url:`https://en.wikipedia.org/wiki/Mossad`},{id:2,text:`"FARA  —  Foreign Agents Registration Act," U.S. Department of Justice. https://www.justice.gov/nsd-fara`,url:`https://www.justice.gov/nsd-fara`},{id:3,text:`"The Lavon Affair: How a False-Flag Operation Led to War and the Israeli Bomb," Stanford CISAC. https://cisac.fsi.stanford.edu/pub lications/the_lavon_affair...`,url:`https://cisac.fsi.stanford.edu/pub`},{id:4,text:`"Lavon Affair," Wikipedia. https://en.wikipedia.org/wiki/Lavon_Affair`,url:`https://en.wikipedia.org/wiki/Lavon_Affair`},{id:5,text:`"Mossad  —  Israeli Intelligence Agency," Encyclopaedia Britannica. https://www.britannica.com/topic/Mossad`,url:`https://www.britannica.com/topic/Mossad`},{id:6,text:`"Adolf Eichmann," Wikipedia. https://en.wikipedia.org/wiki/Adolf_Eichmann`,url:`https://en.wikipedia.org/wiki/Adolf_Eichmann`},{id:7,text:`"The Israeli Attack on the USS Liberty," U.S. State Department, Foreign Relations of the United States, 1964–68, Vol. XIX, Document 284. https://history.state.gov/historicaldocuments/frus1964-68v19/d284`,url:`https://history.state.gov/historicaldocuments/frus1964-68v19/d284`},{id:8,text:`"USS Liberty Incident," Wikipedia. https://en.wikipedia.org/wiki/USS_Liberty_incident`,url:`https://en.wikipedia.org/wiki/USS_Liberty_incident`},{id:9,text:`"Operation Wrath of God," Encyclopaedia Britannica. https://www.britannica.com/topic/Operation-Wrath-of-God`,url:`https://www.britannica.com/topic/Operation-Wrath-of-God`},{id:10,text:`"Western countries gave Mossad information used to track and kill Palestinian terrorists in 1970s," The Guardian, May 14, 2025. htt ps://www.theguardian.com/world/2025/may/14/...`},{id:11,text:`"Lillehammer Affair," Wikipedia. https://en.wikipedia.org/wiki/Lillehammer_affair`,url:`https://en.wikipedia.org/wiki/Lillehammer_affair`},{id:12,text:`"Operation Entebbe," Wikipedia. https://en.wikipedia.org/wiki/Operation_Entebbe`,url:`https://en.wikipedia.org/wiki/Operation_Entebbe`},{id:13,text:`"Jonathan Pollard," Wikipedia. https://en.wikipedia.org/wiki/Jonathan_Pollard`,url:`https://en.wikipedia.org/wiki/Jonathan_Pollard`},{id:14,text:`"Obama Order Sped Up Wave of Cyberattacks Against Iran," The New York Times, June 1, 2012. https://www.nytimes.com/2012/0 6/01/...`,url:`https://www.nytimes.com/2012/0`},{id:15,text:`"Assassination of Iranian Nuclear Scientists," Wikipedia. https://en.wikipedia.org/wiki/Assassination_of_Iranian_nuclear_scienti sts`,url:`https://en.wikipedia.org/wiki/Assassination_of_Iranian_nuclear_scienti`},{id:16,text:`"Iran's Top Nuclear Scientist Killed in Ambush," The New York Times, November 27, 2020. https://www.nytimes.com/2020/11/2 7/...`,url:`https://www.nytimes.com/2020/11/2`},{id:17,text:`"Assassination of Mahmoud Al-Mabhouh," Wikipedia. https://en.wikipedia.org/wiki/Assassination_of_Mahmoud_Al-Mabhouh`,url:`https://en.wikipedia.org/wiki/Assassination_of_Mahmoud_Al-Mabhouh`},{id:18,text:`"AIPAC Espionage Scandal," Wikipedia. https://en.wikipedia.org/wiki/AIPAC_espionage_scandal`,url:`https://en.wikipedia.org/wiki/AIPAC_espionage_scandal`},{id:19,text:`"Inslaw," Wikipedia. https://en.wikipedia.org/wiki/Inslaw`,url:`https://en.wikipedia.org/wiki/Inslaw`},{id:20,text:`"2024 Lebanon Pager Explosions," Wikipedia. https://en.wikipedia.org/wiki/2024_Lebanon_pager_explosions`,url:`https://en.wikipedia.org/wiki/2024_Lebanon_pager_explosions`},{id:1954,text:`In the summer of 1954, Israeli military intelligence activated a covert cell in Egypt for what became known as Operation Susannah  —  later called the Lavon Affair after Israeli Defense Minister Pinhas Lavon, who was forced to resign over the scandal. Israeli agents planted bombs in Egyptian, American, and British-owned civilian targets, including cinemas and post offices, with the goal of framing radical Egyptian factions and convincing Britain to maintain its military presence in the Suez Canal Zone. The operation was a false flag  —  designed to make the attacks appear to be the work of the Egyptian Muslim Brotherhood. It failed when one of the agents' incendiary devices detonated prematurely. Two agents were executed by Egypt; others were imprisoned. Israel initially denied any involvement. It was not until 2005  —  fifty-one years later  —`},{id:1967,text:`On June 8, 1967, during the Six-Day War, Israeli air and naval forces attacked the USS Liberty, a clearly marked U.S. Navy intelligence ship operating in international waters off the coast of the Sinai Peninsula. The attack killed 34 American crew members and wounded 171. The ship was hit by rockets, napalm, and torpedoes over a sustained assault lasting approximately 75 minutes. Israel claimed the attack was a case of mistaken identity  —  that it had confused the Liberty with an Egyptian horse transport vessel one-quarter its size. Multiple survivors, as well as senior U.S. military and intelligence officials, have disputed this explanation. The ship was flying a large American flag. Its hull markings  —  "GTR-5"  —  were clearly visible. Israeli reconnaissance aircraft had circled the ship for hours before the attack. In an unprecedented action, President Lyndon Johnson recalled rescue aircraft that had been launched from the USS Saratoga to aid the Liberty  —  the only known instance of a president recalling military rescue of an American ship under attack. No formal congressional investigation was ever conducted. The surviving crew members were ordered not to discuss the incident, and many have spent decades seeking a full accounting.`},{id:5,text:`before the attack  —  a clearly marked U.S. Navy technical research ship. On June 8, 1967, Israeli forces attacked the vessel for 75 minutes, killing 34 American sailors and wounding 171. Source: Britannica / U.S. Navy Archives ●The Pollard Case: America's Most Damaging Spy Jonathan Pollard, a U.S. Navy intelligence analyst, spied for Israel from 1984 to 1985, delivering over 800 highly classified documents in just 17 months. A declassified 1987 CIA damage assessment described the breach as causing massive damage to U.S. intelligence capabilities, compromising the VQ-2 electronic surveillance system and critical SIGINT capabilities. Military.com has described Pollard as among "the most damaging spies in U.S. history." Pollard was sentenced to life in prison in 1987. Israel initially denied he was their agent, then admitted it and granted him Israeli citizenship. He was released in 2015 and moved to Israel in 2020, where he received a hero's welcome. The Pollard case`}],crossLinks:[{label:`Chapter 6: Talmud & Balfour Declaration`,chapterId:`chapter-6`},{label:`Chapter 8: JFK, Dimona & AIPAC`,chapterId:`chapter-8`}],keywords:[`Mossad`,`intelligence`,`Israel`,`espionage`,`covert operations`]},{id:`chapter-8`,number:`Chapter 8`,title:`JFK, Dimona & AIPAC`,subtitle:`President Kennedy\\'s documented confrontation with Israel\\'s secret nuclear program and the lobby that would reshape American foreign policy.`,dateRange:`1963`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`·  
John F. Kennedy:
The Money, The Bomb,
and The Lobby
In 1963, President Kennedy signed Executive Order 11110, demanded nuclear
inspections at Dimona, and ordered the American Zionist Council to register as a
foreign agent. He was assassinated on November 22, 1963. These are documented
facts. The connections between them remain a matter of documented historical
debate.
Veritas Worldwide Media \xA0·\xA0 2026 \xA0·\xA0 All citations link to primary sources \xA0·\xA0 No opinion expressed`},{type:`text`,text:`C H A P T E R  S I X  ·  1 9 6 1 – 1 9 6 3
John F. Kennedy: Executive
Order 11110, Dimona, the AZC,
and the Assassination
A documented account of President Kennedy's monetary policy (Executive Order
11110), his demands for nuclear inspections at Israel's Dimona reactor, his
requirement that the American Zionist Council register as a foreign agent under
FARA, and the documented circumstances of his assassination  —  sourced to the
Federal Register, the National Security Archive, the Wilson Center, and the Warren
Commission.
Published by Veritas Worldwide Media \xA0·\xA0 2026 \xA0·\xA0 Primary sources: Federal Register · NSA Archive · Wilson Center
W H Y  T H I S  M AT T E R S  T O  Y O U
On June 4, 1963, President John F. Kennedy signed Executive Order 11110,
authorizing the U.S. Treasury to issue silver-backed currency that would bypass the
Federal Reserve. He simultaneously demanded inspections of Israel's secret nuclear
facility at Dimona and ordered the American Zionist Council to register as a foreign
agent. Five months later, he was dead. His successor, Lyndon Johnson, reversed all
three policies within months of taking office. This chapter does not claim causation
 —  it documents the sequence of events, the exposed documents, and the exposed
lies, and asks the question that the Warren Commission never answered.`},{type:`text`,text:`O
Editorial Standard: This chapter presents only documented historical facts sourced to primary records. No causal connection
between Kennedy's monetary policy, his nuclear inspection demands, his FARA enforcement actions, and his assassination is
asserted unless that connection is explicitly stated in a cited primary source. The circumstantial evidence boxes present
documented facts that are relevant to the historical record without drawing unsupported conclusions.
June 4
DATE EO 11110 SIGNED, 1963
$4.3B
SILVER CERTIFICATES
AUTHORIZED BY EO 11110`},{type:`text`,text:`KENNEDY LETTERS DEMANDING
DIMONA INSPECTIONS
Nov 22
DATE OF KENNEDY'S ASSASSINATION, 1963
Executive Order 11110: The Silver Certificates
n June 4, 1963, President Kennedy signed Executive Order 11110, which
amended Executive Order 10289 of September 19, 1951. The order delegated
to the Secretary of the Treasury the authority to issue silver certificates
against any silver bullion, silver, or standard silver dollars in the Treasury not then held
for redemption of outstanding silver certificates.[1]
The order was signed pursuant to the Silver Purchase Act of 1934, which authorized the
Treasury to issue silver certificates. The practical effect of the order was to allow the
Treasury to issue silver-backed currency directly, without going through the Federal
Reserve. Between June and November 1963, the Treasury issued approximately $4.3
billion in silver certificates under this authority.[1]`},{type:`text`,text:`⚠️ C I RC U M S T A N T I A L  —   EO  11110 A N D T H E FEDERA L RES ERV E
No primary source document establishes that Executive Order 11110 was intended to replace or eliminate the Federal
Reserve. The following documented facts are presented as historical context.
Executive Order 11110 is frequently cited in secondary literature as evidence that Kennedy intended to
bypass or eliminate the Federal Reserve by issuing government-backed currency directly through the
Treasury. Federal Reserve historians have stated that this interpretation is incorrect  —  that the order was a
routine administrative action related to the phase-out of silver certificates, not an attempt to replace
Federal Reserve notes. The Federal Reserve's own historical publications state: "The order actually gave the
Treasury the ability to issue silver certificates, which were already in existence, but it did not create a new
form of currency or threaten the Federal Reserve." The text of the order itself is the primary source; its
interpretation is disputed.
Why this is notable: EO 11110 was signed on June 4, 1963. Kennedy was assassinated on November 22,
1963. The silver certificates issued under EO 11110 were withdrawn from circulation by President Johnson
shortly after Kennedy's death. These are documented facts. The significance attributed to the sequence is a
matter of documented historical debate. [Source: National Archives  —  EO 11110]
Kennedy and Dimona: The Nuclear Inspection
Demands
Israel began construction of the Negev Nuclear Research Center near Dimona in 1958,
with French technical assistance. The facility was not publicly disclosed. When U-2
reconnaissance photographs revealed the construction, the Eisenhower administration
sought an explanation. Israel described the facility as a "textile plant" and later as a
"metallurgical research facility."[2]
President Kennedy sent a series of letters to Israeli Prime Minister David Ben-Gurion
and his successor Levi Eshkol between 1961 and 1963, demanding that the United States
be permitted to conduct semi-annual inspections of the Dimona facility to verify that it
was not being used to produce nuclear weapons. These letters are preserved in the
National Security Archive at George Washington University and in the Foreign Relations
of the United States (FRUS) series published by the State Department.[2]`},{type:`text`,text:`✅ V ERI FI ED  —   KEN N EDY' S  DI M O N A  LET T ERS :  P RI M A RY S O U RC E DO C U M EN T AT I O N
Kennedy to Ben-Gurion, May 18, 1963 (NSA Archive Document #671): "I am sure you will agree that
there is no more urgent business for the whole world than the control of nuclear weapons... I am sure you
will agree that it is important for both our governments to resolve all doubts as to the peaceful nature of
the Dimona project... I therefore ask you to make arrangements for a visit by these American scientists at
Dimona as soon as this can be arranged."
Kennedy to Eshkol, July 5, 1963: "As I wrote to Mr. Ben Gurion, this Government's commitment to and
support of Israel could be seriously jeopardized if it should be thought that we were unable to obtain
reliable information on a subject as vital to the peace as the question of Israel's effort in the nuclear field."
[Source: NSA Archive  —  Kennedy-Dimona Letters]
Ben-Gurion resigned as Prime Minister on June 16, 1963  —  eight days after Kennedy's
May 18 letter demanding inspections. Ben-Gurion did not publicly cite Kennedy's
nuclear demands as a reason for his resignation. His resignation letter cited "personal
reasons." Kennedy was assassinated on November 22, 1963. The first U.S. inspection of
Dimona took place in January 1964  —  after Kennedy's death  —  under President Johnson's
administration. The inspectors reported that they found no evidence of weapons
production, though subsequent historical analysis has raised questions about the
completeness of the inspections.[2]
⚠️ C I RC U M S T A N T I A L  —   B EN -GU RI O N ' S  RES I GN AT I O N  T I M I N G
No primary source document establishes that Ben-Gurion's resignation was caused by Kennedy's nuclear inspection
demands. The following documented facts are presented as historical context.
The documented sequence: Kennedy sent his strongest letter demanding Dimona inspections on May 18,
1963. Ben-Gurion resigned on June 16, 1963  —  29 days later. Ben-Gurion's resignation letter cited "personal
reasons." No document has been found in which Ben-Gurion stated that Kennedy's demands were a factor
in his resignation. Historians who have studied the Ben-Gurion archives have noted that he was under
pressure from multiple directions in 1963, including a domestic political scandal (the Lavon Affair). The
timing of the resignation relative to Kennedy's letter is a documented fact; the causal relationship is not
established.
Why this is notable: Ben-Gurion was the founder of the State of Israel and had served as its first Prime
Minister. His resignation came at the height of the Dimona confrontation with Kennedy. The documented
sequence is a matter of historical record. [Source: NSA Archive]`},{type:`text`,text:`Kennedy and the AZC: The FARA Demand
The American Zionist Council (AZC) was the predecessor organization to AIPAC (the
American Israel Public Affairs Committee). In 1962 and 1963, the Kennedy Justice
Department  —  under Attorney General Robert F. Kennedy  —  ordered the AZC to register
as a foreign agent under the Foreign Agents Registration Act (FARA) of 1938, on the
grounds that the AZC was receiving funding from and acting on behalf of the Jewish
Agency, an Israeli government-affiliated body.[3]
The Justice Department's demand is documented in the Senate Foreign Relations
Committee's 1963 investigation of foreign lobbying activities. The committee, chaired
by Senator J. William Fulbright, conducted hearings and produced a report
documenting the flow of funds from the Jewish Agency to the AZC and the AZC's
lobbying activities on behalf of Israeli government interests.[4]
✅ V ERI FI ED  —   S EN AT E FO REI GN  RELAT I O N S  C O M M I T T EE I N V ES T I GAT I O N ,  1963
The Senate Foreign Relations Committee's 1963 investigation documented that the Jewish Agency
transferred approximately $5 million to the AZC between 1948 and 1963 for lobbying and public relations
activities in the United States. The investigation found that the AZC had not registered as a foreign agent as
required by FARA. The Justice Department issued formal demands for registration. The AZC dissolved itself
in 1963 rather than comply with the registration requirement. AIPAC, which had been established in 1953 as
a separate organization, continued to operate and has never been required to register as a foreign agent.
[Source: DOJ  —  FARA Overview]
The AZC dissolved in 1963. AIPAC, which had been established as a separate entity in
1953, was not subject to the same registration demand and continued to operate. The full
documented history of AIPAC's activities and its influence on Congress is presented in
Chapter 13 of this book.[3]`},{type:`text`,text:`The Assassination: Documented Facts
President Kennedy was assassinated on November 22, 1963, in Dallas, Texas. He was
shot while riding in a presidential motorcade through Dealey Plaza. Governor John
Connally of Texas, who was riding in the same vehicle, was also wounded. Kennedy was
pronounced dead at Parkland Memorial Hospital at 1:00 p.m. Central Standard Time.[5]
The Warren Commission, established by President Johnson on November 29, 1963, and
chaired by Chief Justice Earl Warren, concluded in its September 1964 report that Lee
Harvey Oswald acted alone in assassinating Kennedy and that Jack Ruby acted alone in
killing Oswald. The Commission found no evidence of a domestic or foreign conspiracy.
[6]
The House Select Committee on Assassinations (HSCA), which conducted a separate
investigation between 1976 and 1979, concluded that Kennedy was "probably
assassinated as a result of a conspiracy" based on acoustic evidence suggesting a second
shooter. The HSCA identified the probable conspirators as members of organized crime
but stated it found no evidence that the Soviet Union, Cuba, anti-Castro Cuban groups,
the Secret Service, the FBI, or the CIA were involved as organizations. The acoustic
evidence on which the HSCA's conspiracy conclusion was based was subsequently
disputed by a 1982 National Academy of Sciences review panel.[7]`},{type:`text`,text:`⚠️ C I RC U M S T A N T I A L  —   T H E 1963 C O N V ERGEN C E
No primary source document establishes a causal connection between the following documented events. They are presented
as documented historical facts that occurred in the same calendar year.
In 1963, the following documented events occurred: (1) Kennedy signed EO 11110 on June 4, authorizing
silver certificate issuance; (2) Kennedy sent his strongest Dimona inspection demand on May 18; (3) Ben-
Gurion resigned on June 16; (4) The Justice Department demanded AZC foreign agent registration; (5) The
AZC dissolved rather than comply; (6) Kennedy was assassinated on November 22; (7) The silver certificates
issued under EO 11110 were withdrawn by President Johnson. Each of these events is individually
documented. No primary source document establishes a causal connection between any of them.
Why this is notable: The documented convergence of these events in a single calendar year  —  each
involving a significant challenge to either private banking interests, Israeli nuclear ambitions, or Israeli
lobbying operations  —  is a matter of historical record. The significance attributed to this convergence
varies among historians and researchers. [Source: National Archives  —  JFK Assassination Records]
T H E T H REA D T H AT  C O N N EC T S
Kennedy's three documented confrontations in 1963  —  with the Federal Reserve (EO
11110), with Israel's nuclear program (Dimona letters), and with Israeli lobbying
operations (AZC/FARA)  —  place him in documented opposition to three of the most
powerful institutional interests in the United States. His assassination ended all three
confrontations. The AIPAC story that began with the AZC's dissolution in 1963 is
documented in full in Chapter 13. The Federal Reserve's structure and the question of
who benefits from it is documented in Chapter 9.`}],sources:[{id:1,text:`National Archives  —  Executive Order 11110, June 4, 1963  —  https://www.archives.gov/federal-register/codification/executive-orde r/11110.html`,url:`https://www.archives.gov/federal-register/codification/executive-orde`},{id:2,text:`National Security Archive  —  "The Battle of the Letters, 1963: John F. Kennedy, David Ben Gurion, Levi Eshkol, and U.S. Inspections of Dimona"  —  https://nsarchive.gwu.edu/briefing-book/nuclear-vault/2019-05-02/battle-letters-1963-john-f-kennedy-david-ben-g urion-levi-eshkol-us-inspections-dimona`,url:`https://nsarchive.gwu.edu/briefing-book/nuclear-vault/2019-05-02/battle-letters-1963-john-f-kennedy-david-ben-g`},{id:3,text:`U.S. Department of Justice  —  "Foreign Agents Registration Act Overview"  —  https://www.justice.gov/archives/jm/criminal-resour ce-manual-2062-foreign-agents-registration-act-overview`,url:`https://www.justice.gov/archives/jm/criminal-resour`},{id:4,text:`U.S. Senate  —  "J. William Fulbright"  —  https://www.senate.gov/artandhistory/history/common/generic/Featured_Bio_Fulbright. htm`,url:`https://www.senate.gov/artandhistory/history/common/generic/Featured_Bio_Fulbright`},{id:5,text:`National Archives  —  "JFK Assassination Records"  —  https://www.archives.gov/research/jfk`,url:`https://www.archives.gov/research/jfk`},{id:6,text:`National Archives  —  Warren Commission Report, 1964  —  https://www.archives.gov/research/jfk/warren-commission-report`,url:`https://www.archives.gov/research/jfk/warren-commission-report`},{id:7,text:`National Archives  —  House Select Committee on Assassinations Report, 1979  —  https://www.archives.gov/research/jfk/select-com mittee-report Kennedy was buried on November 25, 1963. Executive Order 11110 was never formally revoked, but no president ever used it again. The Dimona inspections ended. AIPAC never registered as a foreign agent. And eight years later, the last link between the dollar and gold was severed  —  not by an assassin's bullet, but by a presidential address on a Sunday evening. ●Executive Order 11110: The Silver Certificate Challenge`,url:`https://www.archives.gov/research/jfk/select-com`},{id:1963,text:`—  exactly 171 days before his assassination  —  President Kennedy signed Executive Order 11110, which authorized the Secretary of the Treasury to issue silver certificates backed by the Treasury's silver reserves. This was significant because silver certificates represented currency issued directly by the U.S. government, bypassing the Federal Reserve's monopoly on money creation. The order authorized the issuance of $4.29 billion in silver certificates. Had the program continued and expanded, it would have represented a fundamental challenge to the Federal Reserve System  —  government-issued, debt-free currency competing with Federal Reserve Notes. After Kennedy's assassination, President Lyndon Johnson did not continue the silver certificate program. The certificates were gradually withdrawn from circulation. Whether Executive Order 11110 was a deliberate challenge to the Federal Reserve or merely a routine administrative action remains debated. What is not debated is the outcome: the only modern president to authorize an alternative to Federal Reserve currency was dead within six months, and the program died with him. ●Kennedy vs. Dimona: The Nuclear Confrontation Declassified documents from the National Security Archive at George Washington University reveal a confrontation between Kennedy and Israel that has been largely erased from popular history. In a series of increasingly forceful letters to Israeli Prime Minister David Ben-Gurion, Kennedy demanded international inspection of the Dimona nuclear facility in the Negev desert. Kennedy warned that American "commitment and support" for Israel could be "seriously jeopardized" if Israel refused to allow inspections. Ben-Gurion resigned on June 16, 1963  —  partly under pressure from Kennedy over the Dimona issue. His successor, Levi Eshkol, continued to resist American inspection demands. Kennedy was assassinated on November 22, 1963, just five months after Ben- Gurion's resignation. Under President Johnson, pressure on Israel's nuclear program`},{id:200,text:`or more nuclear warheads  —  a fact it has never officially confirmed or denied. The sequence of events  —  Kennedy's opposition to Israeli nuclear weapons, Ben- Gurion's resignation, Kennedy's assassination, and the subsequent end of American pressure on Dimona  —  is documented in declassified government records. The interpretation of these events remains one of the most sensitive topics in American- Israeli relations. ◆ CROSS- → Chapter II (Assassinated Presidents): Kennedy is the fifth president in the pattern of leaders who challenged powerful interests and were assassinated. → Chapter VII (Mossad): Israeli intelligence capabilities were expanding rapidly during this period  —  the same period in which Kennedy was pressuring Israel. → Chapter XIII (AIPAC): The political infrastructure that would make future challenges to Israel nearly impossible was being built during Kennedy's presidency.`}],crossLinks:[{label:`Chapter 9: JFK Expanded Analysis`,chapterId:`chapter-9`},{label:`Chapter 14: AIPAC & Congressional Lobbying`,chapterId:`chapter-14`}],keywords:[`JFK`,`Kennedy`,`Dimona`,`AIPAC`,`nuclear`,`Israel`]},{id:`chapter-9`,number:`Chapter 9`,title:`JFK — Expanded Analysis`,subtitle:`A comprehensive examination of the evidence surrounding the assassination of President John F. Kennedy, including declassified documents released through 2025.`,dateRange:`1963`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`President John F. Kennedy`},{type:`text`,text:`CHAPTER SIX (EXPANDED)  |  1961 – 1963
JFK: The Last
President Who
Fought the System
In 1963, President John F. Kennedy was simultaneously demanding nuclear
inspections of Israel's secret Dimona reactor, forcing the American Zionist
Council to register as a foreign agent, and issuing United States Notes to
bypass the Federal Reserve. By November of that year, he was dead. What
the documents show  —  and what the official history does not  —  is the full
scope of what Kennedy was doing in the final year of his presidency, and
who had reason to stop him.`},{type:`text`,text:`B
C H A P T E R  S I X  ( E X P A N D E D )   ·   
JFK: The Last President Who
Fought the System  —  Executive
Order 11110, Dimona, and the
AIPAC Foreign Agent Demand
Three separate confrontations. Three separate power centers. One president.
One year. The documents are in the National Archives, the Federal Register,
and the Senate Foreign Relations Committee record. What they show, taken
together, is a president engaged in an unprecedented challenge to the most
powerful financial and political forces in postwar America.`},{type:`text`,text:`y the spring of 1963, President John F. Kennedy was fighting on three fronts
simultaneously, and losing none of them. He had signed Executive Order
11110 in June, directing the Treasury to issue United States Notes  —  government‐backed currency that bypassed the Federal Reserve system. He was pressing
Israeli Prime Minister David Ben‐Gurion in near‐ultimatum terms to accept American inspections of the Dimona nuclear reactor. And his brother, Attorney General
Robert F. Kennedy, was forcing the American Zionist Council  —  the predecessor organization to AIPAC  —  to register as a foreign agent under the Foreign Agents Registration Act. By November 22, 1963, Kennedy was dead. All three initiatives died with
him.
This chapter documents each of those three confrontations in full, using primary
source documents from the National Archives, the Federal Register, the Senate Foreign Relations Committee record, and the National Security Archive. The circum
stantial  evidence  connecting  these  confrontations  to  Kennedy's  assassination  is
presented clearly labeled as such. The documented facts are presented without embellishment. The reader is invited to draw their own conclusions.
President John F. Kennedy, 35th President of the United States (1961–1963). In the final year of his presidency, Kennedy was engaged
in three simultaneous confrontations with the Federal Reserve, the Israeli nuclear program, and the Israeli lobby. (Photo: John F.
Kennedy Presidential Library)
President John F. Kennedy`},{type:`text`,text:`P A R T  I
Executive Order 11110: The United States
Notes
On June 4, 1963, President Kennedy signed Executive Order 11110, amending Executive Order 10289 of September 19, 1951. The order delegated to the Secretary of the
Treasury the authority to issue silver certificates  —  a form of United States currency
backed by silver held in the Treasury  —  under the Thomas Amendment of the Agricultural Adjustment Act of 1933. The order also authorized the issuance of United
States Notes, which are obligations of the United States government directly, not of
the Federal Reserve.
[1]
The distinction between a United States Note and a Federal Reserve Note is fundamental to understanding the significance of EO 11110. A Federal Reserve Note  —  the
currency in your wallet today  —  is a liability of the Federal Reserve System, a
private banking consortium. The government borrows these notes into existence,
paying interest to the Federal Reserve's member banks. A United States Note, by contrast, is issued directly by the Treasury Department as an obligation of the United
States government. It carries no interest obligation to any private bank. Abraham
Lincoln had used United States Notes  —  the "Greenbacks"  —  to finance the Civil War
without borrowing from private banks. Kennedy's order revived that authority.
[1]`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`hereby designated and empowered to exercise, as he deems required in the public interest, any of the functions of the President prescribed by the following‐described
provisions of law... [including] the authority vested in the President by section 43(b)
of the Act of May 12, 1933, as amended (31 U.S.C. 821), to issue silver certificates
against any silver bullion, silver, or standard silver dollars in the Treasury not then
held for redemption of any outstanding silver certificates."
The order was published in the Federal Register on June 7, 1963 (28 F.R. 5605). It has
never been formally revok`}},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  WHAT HAPPENED TO THE UNITED STATES NOTES
The documented facts: President Kennedy was assassinated on November 22, 1963.
Within months of his death, the United States Notes that had been issued under EO
11110 were quietly withdrawn from circulation. President Johnson did not formally
revoke EO 11110, but the Treasury ceased issuing new United States Notes. The Federal Reserve Notes  —  the private bank currency  —  remained the sole form of paper
currency in circulation.
The circumstantial argument: the withdrawal of United States Notes after Kennedy's
death, and the continuation of the Federal Reserve Note system, benefited the Federal
Reserve's member banks directly. The timing  —  the notes were withdrawn within
months of Kennedy's assassination  —  is consistent with a deliberate policy reversal.
However, there is no documented evidence of a specific decision to withdraw the
notes as a consequence of Kennedy's death. The withdrawal may have been a routine
Treasury decision unrelated to the assassination.
What is not disputed: the United States Notes were issued, Kennedy was killed, and
the notes were withdrawn. The Federal Reserve system continued unchanged.
"The high office of President has been used to foment a plot to
destroy the American's freedom, and before I leave office I
must inform the citizen of his plight."
PRESIDENT JOHN F. KENNEDY  —  COLUMBIA UNIVERSITY, NOVEMBER 12, 1963  —  TEN DAYS
BEFORE HIS ASSASSINATION. AUTHENTICITY OF THIS QUOTE IS DISPUTED; IT DOES NOT
APPEAR IN OFFICIAL TRANSCRIPTS.`},{type:`text`,text:`P A R T  I I
The Dimona Confrontation: Kennedy
vs. Ben-Gurion
The Dimona nuclear reactor, located in the Negev Desert of southern Israel, was discovered by U.S. intelligence in December 1960  —  two months before Kennedy took
office. The reactor had been built with French assistance and was capable, once operational, of producing weapons‐grade plutonium. Kennedy was deeply concerned
about nuclear proliferation and believed that an Israeli nuclear weapons program
would destabilize the Middle East, provide the Soviet Union with a pretext for intervention, and undermine American credibility as a non‐proliferation advocate.
[3]
Beginning in April 1963, Kennedy pressed Israeli Prime Minister David Ben‐Gurion
to accept regular, bi‐annual American inspections of the Dimona facility. In a series
of letters that have since been declassified and published by the National Security
Archive, Kennedy made clear that the U.S.‐Israeli relationship itself was at stake. His
language was, by diplomatic standards, extraordinary.
[3]`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`nearly as possible in accord with international standards, thereby resolving any
doubts as to the peaceful nature of the Dimona project. Therefore, I asked our scientists to review the alternative schedules of visits we and you have proposed. If Israel's
purposes are to be clear beyond reasonable doubt, I believe that the schedule of visits
should be at intervals of six months."
Kennedy added that the U.S. "commitment to and support of Israel could be seriously
jeopardized" if the U.S. government was unable to obtain "reliable information" on the
Dimona reactor and Israel's nuclear intentions.`}},{type:`text`,text:`DATE
EVENT
SIGNIFICANCE
Dec 1960
Dimona reactor discovered by U.S. intelligence
Two months before Kennedy takes office
May 1961
First U.S. inspection visit to Dimona
Stage-managed; limited access provided
Jan 1963
NIE 30-63: Dimona could produce plutonium for
"one or two weapons a year"
Kennedy's primary intelligence concern
Apr–May`},{type:`text`,text:`Kennedy presses Ben-Gurion for bi-annual
inspections
Near-ultimatum tone; U.S. support threatened
June 4,`},{type:`text`,text:`Kennedy signs Executive Order 11110
United States Notes issued; Federal Reserve
bypassed
June 16,`},{type:`text`,text:`Ben-Gurion resigns as Prime Minister
Six weeks after Kennedy's ultimatum letter
July 4,`},{type:`text`,text:`Kennedy's ultimatum letter to new PM Eshkol
Demands access to "all areas" of Dimona
Aug 1963
Eshkol reluctantly agrees to inspections
After seven weeks of "tense internal
consultations"
1962–`},{type:`text`,text:`RFK's DOJ forces AZC to register as foreign
agent
Most significant FARA enforcement against
Israeli lobby in U.S. history
Nov 22,`},{type:`text`,text:`Kennedy assassinated in Dallas
All three initiatives die with him
Dec 26,`},{type:`text`,text:`Dimona reactor activated
One month after Kennedy's assassination
Jan 1964
First post-Kennedy inspection of Dimona
Stage-managed; Israeli officials pre-selected
areas for inspection
Late
1960s
Israel develops nuclear weapons
Estimated 8–13 warheads by 1967; U.S. adopts
"nuclear ambiguity" policy`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  BEN-GURION'S RESIGNATION AND THE TIMING
The documented facts: Ben‐Gurion resigned on June 16, 1963, six weeks after receiving Kennedy's ultimatum letter demanding bi‐annual Dimona inspections. Ben‐Gurion cited personal reasons. No contemporaneous document directly links his
resignation to Kennedy's pressure over Dimona.
The circumstantial argument: Ben‐Gurion had been Prime Minister since 1948. He
had survived multiple political crises. The timing of his resignation  —  six weeks after
Kennedy's most forceful letter, and in the same month that Kennedy signed EO 11110
 —  is striking. Israeli historian Avner Cohen, who has written the most comprehensive
academic account of Israel's nuclear program, has noted that Kennedy's pressure on
Ben‐Gurion was "unprecedented" and that the Dimona issue was a source of acute
personal stress for the Prime Minister.
What is not disputed: Ben‐Gurion resigned. Kennedy was pressing him on Dimona.
The Dimona reactor was activated one month after Kennedy's assassination. The
subsequent inspections were stage‐managed.`},{type:`text`,text:`P A R T  I I I
The AIPAC Predecessor: Robert
Kennedy Forces Foreign Agent
Registration
The American Zionist Council (AZC) was, in 1963, the most powerful pro‐Israel lobbying organization in the United States. It had received approximately $5 million
from the Jewish Agency for Israel  —  an organization with formal ties to the Israeli
government  —  between 1948 and 1963. Under the Foreign Agents Registration Act
(FARA), any organization that acts as an agent of a foreign government or foreign
principal is required to register with the Department of Justice and disclose its
activities and funding.
[4]
In 1962, the Senate Foreign Relations Committee, chaired by Senator J. William Fulbright of Arkansas, opened an investigation into the activities of foreign agents operating in the United States. The investigation specifically examined the AZC. The committee's hearings documented that the AZC had received substantial funding from
the Jewish Agency  —  a body that, while nominally non‐governmental, was effectively an arm of the Israeli state  —  and had used those funds to conduct lobbying
activities in the United States without registering as a foreign agent.
[4]`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`Registration, 1963. Available at: National Archives.
The AZC's response to the FARA registration requirement was not compliance but
transformation. Rather than registering as a foreign agent and accepting the restrictions that entailed, the AZC effectively dissolved itself and transferred its lobbying
functions to a new organization: the American Israel Public Affairs Committee, or
AIPAC. AIPAC was structured specifically to avoid FARA registration by claiming to
be a domestic lobbying organization with no formal ties to the Israeli government. It
has never registered as a foreign agent.
[5]`}},{type:`text`,text:`P A R T  I V
The Convergence: Three Fronts, One
Year, One Outcome
The three confrontations documented in this chapter  —  EO 11110 and the United
States Notes, the Dimona inspection ultimatum, and the FARA enforcement against
the AZC  —  were not unrelated. They were the actions of a president who, in the final
year of his life, was engaged in a systematic challenge to three of the most powerful
forces in postwar American politics: the Federal Reserve banking system, the Israeli
nuclear program, and the Israeli lobby.
Each of these confrontations had powerful opponents. The Federal Reserve's member banks  —  the same institutions documented in Chapter 9 of this book as the
primary shareholders of the Federal Reserve Bank of New York  —  had a direct financial interest in preventing the issuance of United States Notes. The Israeli government had a direct interest in preventing American inspections of Dimona. The Israeli lobby had a direct interest in preventing FARA registration of the AZC.
Kennedy was assassinated on November 22, 1963. Within months, all three initiatives were reversed or abandoned. The United States Notes were withdrawn from circulation. The Dimona inspections, when they finally occurred in January 1964, were
stage‐managed. The FARA enforcement against the AZC was dropped, and AIPAC was
restructured to avoid registration.`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE PATTERN OF REVERSALS
The documented facts are clear: three separate Kennedy initiatives, each threatening
to a different powerful interest group, were all reversed or abandoned after Kennedy's
assassination. This is not disputed. What is disputed is whether the reversals were
causally connected to the assassination  —  whether Kennedy was killed, in whole or in
part, because of these confrontations.
The circumstantial case rests on the pattern: the timing of the reversals, the identity
of the interests threatened, and the fact that Kennedy's successor, Lyndon Johnson,
reversed each initiative without apparent resistance. Johnson did not press for continued Dimona inspections. He did not revive the FARA enforcement against the AZC.
He did not issue new United States Notes.
The House Select Committee on Assassinations concluded in 1979 that Kennedy was
"probably assassinated as a result of a conspiracy." The committee did not identify the
conspirators. The question of who had both the motive and the capability to kill a
sitting American president remains, officially, unresolved.
T HE THREAD THAT CONNECTS
The three Kennedy confrontations documented in this chapter connect directly
to the broader narrative of this book. The Federal Reserve confrontation (EO
11110) connects to Chapters 3 and 9  —  the Jekyll Island meeting and the Fed's
ownership structure. The Dimona confrontation connects to Chapter 15  —  the
AIPAC chapter and the U.S.‐Israel relationship. The FARA enforcement connects
to Chapter 15 and Chapter 16  —  the full history of AIPAC's influence on American
foreign policy and the $174 billion in U.S. aid to Israel documented in the final
chapter. Kennedy's death was not the end of these stories. It was the beginning of
the world we live in now.`},{type:`text`,text:`SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:10289,text:`of September 19, 1951. The order delegated to the Secretary of the Treasury the authority to issue silver certificates  —  a form of United States currency backed by silver held in the Treasury  —  under the Thomas Amendment of the Agricultural Adjustment Act of 1933. The order also authorized the issuance of United States Notes, which are obligations of the United States government directly, not of the Federal Reserve.`},{id:1,text:`The distinction between a United States Note and a Federal Reserve Note is fundamental to understanding the significance of EO 11110. A Federal Reserve Note  —  the currency in your wallet today  —  is a liability of the Federal Reserve System, a private banking consortium. The government borrows these notes into existence, paying interest to the Federal Reserve's member banks. A United States Note, by contrast, is issued directly by the Treasury Department as an obligation of the United States government. It carries no interest obligation to any private bank. Abraham Lincoln had used United States Notes  —  the "Greenbacks"  —  to finance the Civil War without borrowing from private banks. Kennedy's order revived that authority.`},{id:1,text:`✓ VERIFIED  —  THE TEXT OF EXECUTIVE ORDER 11110 Executive Order 11110, signed June 4, 1963, states: "The Secretary of the Treasury is hereby designated and empowered to exercise, as he deems required in the public interest, any of the functions of the President prescribed by the following‐described provisions of law... [including] the authority vested in the President by section 43(b) of the Act of May 12, 1933, as amended (31 U.S.C. 821), to issue silver certificates against any silver bullion, silver, or standard silver dollars in the Treasury not then held for redemption of any outstanding silver certificates." The order was published in the Federal Register on June 7, 1963 (28 F.R. 5605). It has never been formally revoked. President Johnson did not revoke it. It remains technically in force. Source: Federal Register, Vol. 28, No. 109, June 7, 1963, p. 5605. Following the signing of EO 11110, the Treasury Department issued approximately $4.3 billion in United States Notes. These notes were printed and entered circulation. They were physically distinguishable from Federal Reserve Notes: they bore the legend "United States Note" rather than "Federal Reserve Note" at the top, and the serial numbers were printed in red rather than green.`},{id:2,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  WHAT HAPPENED TO THE UNITED STATES NOTES The documented facts: President Kennedy was assassinated on November 22, 1963. Within months of his death, the United States Notes that had been issued under EO 11110 were quietly withdrawn from circulation. President Johnson did not formally revoke EO 11110, but the Treasury ceased issuing new United States Notes. The Federal Reserve Notes  —  the private bank currency  —  remained the sole form of paper currency in circulation. The circumstantial argument: the withdrawal of United States Notes after Kennedy's death, and the continuation of the Federal Reserve Note system, benefited the Federal Reserve's member banks directly. The timing  —  the notes were withdrawn within months of Kennedy's assassination  —  is consistent with a deliberate policy reversal. However, there is no documented evidence of a specific decision to withdraw the notes as a consequence of Kennedy's death. The withdrawal may have been a routine Treasury decision unrelated to the assassination. What is not disputed: the United States Notes were issued, Kennedy was killed, and the notes were withdrawn. The Federal Reserve system continued unchanged. "The high office of President has been used to foment a plot to destroy the American's freedom, and before I leave office I must inform the citizen of his plight." PRESIDENT JOHN F. KENNEDY  —  COLUMBIA UNIVERSITY, NOVEMBER 12, 1963  —  TEN DAYS BEFORE HIS ASSASSINATION. AUTHENTICITY OF THIS QUOTE IS DISPUTED; IT DOES NOT APPEAR IN OFFICIAL TRANSCRIPTS.`},{id:1960,text:`—  two months before Kennedy took office. The reactor had been built with French assistance and was capable, once operational, of producing weapons‐grade plutonium. Kennedy was deeply concerned about nuclear proliferation and believed that an Israeli nuclear weapons program would destabilize the Middle East, provide the Soviet Union with a pretext for intervention, and undermine American credibility as a non‐proliferation advocate.`},{id:3,text:`Beginning in April 1963, Kennedy pressed Israeli Prime Minister David Ben‐Gurion to accept regular, bi‐annual American inspections of the Dimona facility. In a series of letters that have since been declassified and published by the National Security Archive, Kennedy made clear that the U.S.‐Israeli relationship itself was at stake. His language was, by diplomatic standards, extraordinary.`},{id:3,text:`✓ VERIFIED  —  KENNEDY'S LETTER TO BEN-GURION (MAY 18, 1963) Kennedy wrote to Ben‐Gurion: "I am sure you will agree that these visits should be as nearly as possible in accord with international standards, thereby resolving any doubts as to the peaceful nature of the Dimona project. Therefore, I asked our scientists to review the alternative schedules of visits we and you have proposed. If Israel's purposes are to be clear beyond reasonable doubt, I believe that the schedule of visits should be at intervals of six months." Kennedy added that the U.S. "commitment to and support of Israel could be seriously jeopardized" if the U.S. government was unable to obtain "reliable information" on the Dimona reactor and Israel's nuclear intentions. Source: National Security Archive, Briefing Book #671, Document 7 (May 2, 2019). Original document: U.S. National Archives, RG 59, Central Foreign Policy Files, 1963. Ben‐Gurion's response was evasive. He acknowledged the letter but did not agree to the inspection schedule Kennedy demanded. On June 16, 1963  —  six weeks after receiving Kennedy's ultimatum letter  —  Ben‐Gurion resigned as Prime Minister of Israel.  His  resignation  letter  cited  personal  reasons.  His  successor,  Levi  Eshkol, received an even more direct ultimatum from Kennedy on July 4, 1963.`},{id:3,text:`✓ VERIFIED  —  KENNEDY'S LETTER TO ESHKOL (JULY 4, 1963) Kennedy wrote to the new Prime Minister: "I want to make clear that the US commitment and support of Israel could be seriously jeopardized if it should be thought that we were unable to obtain reliable information on a subject as vital to the peace as the question of Israel's effort in the nuclear field." Kennedy specified that U.S. scientists must have "access to all areas of the Dimona site and to any related part of the complex, such as fuel fabrication facilities or plutonium separation facilities." Eshkol took seven weeks  —  involving what the National Security Archive describes as "tense internal consultations"  —  before reluctantly agreeing to inspections. Both sides treated the correspondence with "great secrecy." Source: National Security Archive, Briefing Book #671, Document 12 (May 2, 2019).`},{id:1960,text:`Dimona reactor discovered by U.S. intelligence Two months before Kennedy takes office May 1961 First U.S. inspection visit to Dimona Stage-managed; limited access provided Jan 1963 NIE 30-63: Dimona could produce plutonium for "one or two weapons a year" Kennedy's primary intelligence concern Apr–May`},{id:11110,text:`United States Notes issued; Federal Reserve bypassed June 16,`},{id:1963,text:`Eshkol reluctantly agrees to inspections After seven weeks of "tense internal consultations" 1962–`},{id:1964,text:`First post-Kennedy inspection of Dimona Stage-managed; Israeli officials pre-selected areas for inspection Late 1960s Israel develops nuclear weapons Estimated 8–13 warheads by 1967; U.S. adopts "nuclear ambiguity" policy`},{id:1948,text:`He had survived multiple political crises. The timing of his resignation  —  six weeks after Kennedy's most forceful letter, and in the same month that Kennedy signed EO 11110  —  is striking. Israeli historian Avner Cohen, who has written the most comprehensive academic account of Israel's nuclear program, has noted that Kennedy's pressure on Ben‐Gurion was "unprecedented" and that the Dimona issue was a source of acute personal stress for the Prime Minister. What is not disputed: Ben‐Gurion resigned. Kennedy was pressing him on Dimona. The Dimona reactor was activated one month after Kennedy's assassination. The subsequent inspections were stage‐managed.`},{id:5,text:`million from the Jewish Agency for Israel  —  an organization with formal ties to the Israeli government  —  between 1948 and 1963. Under the Foreign Agents Registration Act (FARA), any organization that acts as an agent of a foreign government or foreign principal is required to register with the Department of Justice and disclose its activities and funding.`},{id:4,text:`In 1962, the Senate Foreign Relations Committee, chaired by Senator J. William Fulbright of Arkansas, opened an investigation into the activities of foreign agents operating in the United States. The investigation specifically examined the AZC. The committee's hearings documented that the AZC had received substantial funding from the Jewish Agency  —  a body that, while nominally non‐governmental, was effectively an arm of the Israeli state  —  and had used those funds to conduct lobbying activities in the United States without registering as a foreign agent.`},{id:4,text:`✓ VERIFIED  —  THE FULBRIGHT HEARINGS AND THE AZC The Senate Foreign Relations Committee hearings of 1963 documented that the American Zionist Council had received $5 million from the Jewish Agency for Israel between 1948 and 1963. The Jewish Agency was described in the hearings as an organization that "functions as a virtual arm of the Government of Israel." The hearings concluded that the AZC was operating as an unregistered foreign agent. Attorney General Robert F. Kennedy's Department of Justice subsequently required the AZC to register under FARA. The AZC complied, but the registration effectively ended its ability to operate as a domestic lobbying organization  —  foreign agents face significant restrictions on their political activities. Source: U.S. Senate Foreign Relations Committee, Hearings on Foreign Agent Registration, 1963. Available at: National Archives. The AZC's response to the FARA registration requirement was not compliance but transformation. Rather than registering as a foreign agent and accepting the restrictions that entailed, the AZC effectively dissolved itself and transferred its lobbying functions to a new organization: the American Israel Public Affairs Committee, or AIPAC. AIPAC was structured specifically to avoid FARA registration by claiming to be a domestic lobbying organization with no formal ties to the Israeli government. It has never registered as a foreign agent.`},{id:5,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE FARA ENFORCEMENT AND KENNEDY'S ASSASSINATION The documented facts: Robert Kennedy's DOJ was enforcing FARA against the AZC in 1963. The enforcement was the most significant attempt to regulate Israeli lobbying in U.S. history. Kennedy was assassinated on November 22, 1963. The FARA enforcement against the AZC was effectively dropped after Kennedy's death. AIPAC was restructured to avoid FARA registration and has never been required to register as a foreign agent. The circumstantial argument: the FARA enforcement against the AZC, if completed, would have fundamentally changed the ability of the Israeli lobby to operate in American politics. The enforcement died with Kennedy. AIPAC, the successor organization, grew to become what OpenSecrets describes as "one of, if not the most, powerful international issue lobby" in the United States, spending $43.4 million in the 2023‐2024 election cycle alone. What is not disputed: the enforcement was dropped. AIPAC was never required to register. The Israeli lobby grew dramatically in the decades after Kennedy's death. "The biggest lobby in Washington is the Israeli lobby. It has more influence on American foreign policy than any other single force." SENATOR J. WILLIAM FULBRIGHT  —  CBS FACE THE NATION, APRIL 15, 1973`},{id:11110,text:`and the United States Notes, the Dimona inspection ultimatum, and the FARA enforcement against the AZC  —  were not unrelated. They were the actions of a president who, in the final year of his life, was engaged in a systematic challenge to three of the most powerful forces in postwar American politics: the Federal Reserve banking system, the Israeli nuclear program, and the Israeli lobby. Each of these confrontations had powerful opponents. The Federal Reserve's member banks  —  the same institutions documented in Chapter 9 of this book as the primary shareholders of the Federal Reserve Bank of New York  —  had a direct financial interest in preventing the issuance of United States Notes. The Israeli government had a direct interest in preventing American inspections of Dimona. The Israeli lobby had a direct interest in preventing FARA registration of the AZC. Kennedy was assassinated on November 22, 1963. Within months, all three initiatives were reversed or abandoned. The United States Notes were withdrawn from circulation. The Dimona inspections, when they finally occurred in January 1964, were stage‐managed. The FARA enforcement against the AZC was dropped, and AIPAC was restructured to avoid registration.`},{id:1979,text:`that Kennedy was "probably assassinated as a result of a conspiracy." The committee did not identify the conspirators. The question of who had both the motive and the capability to kill a sitting American president remains, officially, unresolved. T HE THREAD THAT CONNECTS The three Kennedy confrontations documented in this chapter connect directly to the broader narrative of this book. The Federal Reserve confrontation (EO 11110) connects to Chapters 3 and 9  —  the Jekyll Island meeting and the Fed's ownership structure. The Dimona confrontation connects to Chapter 15  —  the AIPAC chapter and the U.S.‐Israel relationship. The FARA enforcement connects to Chapter 15 and Chapter 16  —  the full history of AIPAC's influence on American foreign policy and the $174 billion in U.S. aid to Israel documented in the final chapter. Kennedy's death was not the end of these stories. It was the beginning of the world we live in now.`},{id:1,text:`Executive Order 11110, Federal Register, Vol. 28, No. 109, June 7, 1963, p. 5605. Available at: federalregister.gov`},{id:2,text:`U.S. Treasury Department, "United States Notes: A Historical Overview." Available at: treasury.gov`},{id:3,text:`National Security Archive, Briefing Book #671, "The Battle of the Letters, 1963: John F. Kennedy, David Ben-Gurion, Levi Eshkol, and the U.S. Inspections of Dimona," edited by William Burr and Avner Cohen (May 2, 2019). Available at: nsarchive.gwu.edu`},{id:4,text:`U.S. Senate Foreign Relations Committee, Hearings on Foreign Agent Registration, 1963. National Archives.`},{id:5,text:`Grant F. Smith, "Robert Kennedy's Attempt to Register AIPAC as a Foreign Agent," Washington Report on Middle East Affairs (March 2020). Available at: wrmea.org`},{id:6,text:`Avner Cohen, Israel and the Bomb (Columbia University Press, 1998).`}],crossLinks:[{label:`Chapter 8: JFK, Dimona & AIPAC`,chapterId:`chapter-8`},{label:`Chapter 17: RFK Assassination`,chapterId:`chapter-17`},{label:`Chapter 18: Operation Mockingbird`,chapterId:`chapter-18`}],keywords:[`JFK`,`assassination`,`Warren Commission`,`Oswald`,`CIA`,`Dallas`]},{id:`chapter-10`,number:`Chapter 10`,title:`The Petrodollar System`,subtitle:`How a secret agreement between Henry Kissinger and the Saudi royal family created the foundation of American economic hegemony — and why it is now unraveling.`,dateRange:`1971–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Petrodollar System: How
America Replaced Gold With
Oil and Maintained Global
Dominance
The gold standard was not simply abandoned. It was replaced  —  with
something more powerful, more flexible, and far more difficult to challenge.
The petrodollar system gave the United States the ability to print money
indefinitely, as long as the world needed dollars to buy oil. Understanding this
system is essential to understanding every major geopolitical event of the last
fifty years.`},{type:`text`,text:`n the evening of August 15, 1971, Richard Nixon appeared on national television and announced that the United States would no longer convert dollars to gold at the fixed rate of $35 per ounce. With that announcement  — 
made without consulting America's trading partners, in violation of the Bretton
Woods Agreement signed in 1944  —  Nixon ended the gold standard and unilaterally
restructured the global financial system. The event is known as the "Nixon Shock."
Its consequences are still unfolding today.
[1]
The Bretton Woods system, established at a conference in New Hampshire in July
1944, had made the U.S. dollar the world's reserve currency  —  but with a critical constraint. Every dollar in circulation was backed by gold at a fixed rate. Foreign governments could, at any time, exchange their dollar reserves for gold from the U.S.`},{type:`text`,text:`Treasury. This constraint forced fiscal discipline on the United States: you could not
print more dollars than you had gold to back them.
[1]
By 1971, that constraint had become a crisis. The Vietnam War and Lyndon Johnson's
Great Society programs had created massive deficits. The United States had printed
far more dollars than it had gold. French President Charles de Gaulle  —  who had
been warning for years that the United States was exploiting its reserve currency
status  —  began exchanging French dollar reserves for gold. Other countries followed. The gold was draining from Fort Knox. Nixon had two choices: cut spending
and raise taxes, or end the gold standard. He chose the latter.
[1]
Richard Nixon's August 15, 1971 television address announcing the end of dollar-gold convertibility  —  the "Nixon Shock"  — 
unilaterally ended the Bretton Woods system and restructured global finance without consulting America's allies. (National Archives)
WHAT THE OFFICIAL HISTORY SAYS
The Nixon Shock was a pragmatic response to an unsustainable economic situation.
The gold standard was too rigid for a modern economy. Ending it allowed the United
States to pursue independent monetary policy and ultimately led to the floating ex
change rate system that governs global finance today. It was a difficult but necessary
decision.
WHAT THE DOCUMENTS SHOW
The Nixon administration's internal documents  —  released under the Freedom of Information Act  —  show that Treasury Secretary John Connally explicitly framed the decision as a way to shift the cost of America's fiscal irresponsibility onto its trading
partners. Connally's famous statement to foreign finance ministers: "The dollar is our
currency, but it's your problem." The decision was not a reluctant necessity  —  it was a
deliberate exercise of financial power.`},{type:`text`,text:`P A R T  I I
The Kissinger Deal: How Saudi Arabia
Saved the Dollar
With the gold standard gone, the dollar had no anchor. Foreign governments had no
reason to hold dollars  —  they could not exchange them for gold, and their value was
determined entirely by the United States' willingness to maintain fiscal discipline,
which had just been demonstrated to be zero. The dollar's status as the world's
reserve currency was in genuine jeopardy.
[2]
The solution was engineered by Henry Kissinger, Nixon's National Security Advisor
and later Secretary of State. In a series of secret negotiations with the Saudi Arabian
government in 1973 and 1974, Kissinger struck a deal that would become the foundation of the modern global financial system. The terms, as documented by journalist
David Spiro in his 1999 book The Hidden Hand of American Hegemony and later confirmed by Bloomberg's reporting in 2016, were straightforward:
[2]
✓ VERIFIED  —  THE PETRODOLLAR AGREEMENT (1974)
The U.S. agreed to: Provide military protection to the Saudi royal family and the
Saudi oil fields. Sell advanced military equipment to Saudi Arabia. Guarantee the
security of the Saudi regime against internal and external threats.
Saudi Arabia agreed to: Price all Saudi oil exports exclusively in U.S. dollars. Invest
the resulting dollar surpluses ("petrodollars") in U.S. Treasury bonds. Use its influence within OPEC to ensure that all OPEC members priced their oil in dollars.
The result: Because every country in the world needed oil, and because oil could only
be purchased in dollars, every country in the world needed to hold dollar reserves.
This created a permanent, structural global demand for dollars  —  replacing the gold
backing that had been eliminated in 1971.`},{type:`text`,text:`Source: David E. Spiro, The Hidden Hand of American Hegemony: Petrodollar Recycling
and International Markets (Cornell University Press, 1999); Bloomberg, "The Untold
Story Behind Saudi Arabia's 41‐Year U.S. Debt Secret," May 30, 2016.
The New York Times front page reporting on the U.S.-Saudi Arabia military and economic pact, 1974. The full financial terms of the
petrodollar arrangement were kept secret for decades. (The New York Times Archive)
$35
GOLD PRICE PER OZ.
UNDER BRETTON WOODS
(FIXED 1944–1971)
$2,100+
GOLD PRICE PER OZ. IN
2024  —  A 6,000%
INCREASE SINCE NIXON
SHOCK
85%
PURCHASING POWER
LOST BY THE U.S.
DOLLAR SINCE 1971`},{type:`text`,text:`P A R T  I I I
The Consequences: Wars, Sanctions,
and the Dollar Weapon
The petrodollar system gave the United States an extraordinary and unprecedented
power: the ability to wage economic warfare against any country that threatened
the dollar's reserve currency status. Any nation that attempted to sell oil in a currency other than the dollar  —  or that accumulated too many dollar reserves and
threatened to dump them  —  could be subjected to sanctions, regime change, or
military intervention.
[3]
COUNTRY
LEADER
ACTION AGAINST
DOLLAR
U.S. RESPONSE
OUTCOME
Iraq
Saddam
Hussein
Switched oil sales to
euros, November 2000
Invasion, March`},{type:`text`,text:`Saddam executed; Iraq
returned to dollar-
denominated oil sales
Libya
Muammar
Gaddafi
Proposed gold dinar as
pan-African oil currency,
2009–2011
NATO intervention,`},{type:`text`,text:`Gaddafi killed; gold dinar
plan abandoned
Iran
Various
Established oil bourse
trading in euros and yen,`},{type:`text`,text:`Escalating
sanctions; SWIFT
exclusion
Ongoing economic warfare;
nuclear negotiations
Russia
Vladimir
Putin
Began selling oil in
rubles and yuan, 2022
Sanctions; SWIFT
exclusion; asset
freezes
Ongoing; BRICS nations
accelerating de-
dollarization
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE DOLLAR DEFENSE PATTERN
The pattern documented in the table above is real and verifiable. Each of these leaders publicly announced plans to sell oil in non‐dollar currencies. Each was sub
sequently subjected to U.S.‐led military or economic action. The timing in each case is
documented.
The circumstantial argument: the United States has a structural financial interest in
preventing any country from successfully selling oil in a non‐dollar currency, because such a precedent would reduce global demand for dollars and undermine the
petrodollar system. The documented pattern of U.S. responses to leaders who
attempted this is consistent with that interest.
The alternative explanation: each of these interventions had other stated justifications  —  weapons of mass destruction (Iraq), humanitarian intervention (Libya), nuclear proliferation (Iran), territorial aggression (Russia). Those justifications may be
genuine. The petrodollar motive is circumstantial, not proven. Both can be true simultaneously.`},{type:`text`,text:`P A R T  I V
The End of the Petrodollar? The 2024
Saudi Decision and BRICS De-
Dollarization
On June 9, 2024, the 50‐year petrodollar agreement between the United States and
Saudi Arabia expired. Saudi Arabia chose not to renew it. The kingdom has since begun accepting payment for oil in Chinese yuan, Indian rupees, and other currencies
through the BRICS payment system. This is the most significant challenge to dollar
hegemony since the Nixon Shock of 1971.
[4]
The BRICS nations  —  Brazil, Russia, India, China, and South Africa, now expanded to
include Saudi Arabia, the UAE, Egypt, Ethiopia, and Iran  —  represent approximately
45% of the world's population and 35% of global GDP. Their stated goal is to reduce
dependence on the U.S. dollar in international trade. Whether they will succeed is
uncertain. What is certain is that the petrodollar system that has underpinned
American financial dominance for fifty years is under its most serious challenge
since its creation.
[4]
T HE THREAD THAT CONNECTS
The petrodollar system is the bridge between the gold standard era (Chapters 1–6)
and the modern financial architecture (Chapters 8–12). It explains how the United
States maintained dollar hegemony after abandoning gold  —  and why any challenge to that hegemony has been met with military or economic force. The same
banking families that designed the Federal Reserve (Chapter 3) and financed both
sides of WWI (Chapter 4) were the primary beneficiaries of the petrodollar system: they held the Treasury bonds that Saudi Arabia was required to purchase,
and they processed the petrodollar recycling flows that generated trillions in
fees. In Chapter 8, we examine the institutional architecture  —  the Bilderberg`},{type:`text`,text:`Group, the CFR, and the BIS  —  that coordinates these interests across
governments and generations.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`Nixon Presidential Library, "The Nixon Shock: August 15, 1971." Available at: nixonlibrary.gov. Also: Barry Eichengreen, Exorbitant Privilege: The Rise and Fall of the Dollar (Oxford University Press, 2011).`},{id:2,text:`David E. Spiro, The Hidden Hand of American Hegemony: Petrodollar Recycling and International Markets (Cornell University Press, 1999). Also: Bloomberg, "The Untold Story Behind Saudi Arabia's 41-Year U.S. Debt Secret," May 30, 2016.`},{id:3,text:`William R. Clark, Petrodollar Warfare: Oil, Iraq and the Future of the Dollar (New Society Publishers, 2005). Note: Clark's thesis is contested by mainstream economists; the factual documentation of the timeline is generally accepted.`},{id:4,text:`Bloomberg, "Saudi Arabia Lets Petrodollar Pact With U.S. Expire After 50 Years," June 13, 2024. Also: IMF, "Currency Composition of Official Foreign Exchange Reserves (COFER)," 2024.`}],crossLinks:[{label:`Chapter 12: How the Federal Reserve Works`,chapterId:`chapter-12`},{label:`Chapter 13: The 2008 Financial Crisis`,chapterId:`chapter-13`}],keywords:[`petrodollar`,`Kissinger`,`Saudi Arabia`,`oil`,`USD reserve currency`,`Nixon`]},{id:`chapter-11`,number:`Chapter 11`,title:`Shadow Institutions — Bilderberg, CFR, Trilateral Commission & the BIS`,subtitle:`The private organizations where the world\\'s most powerful people meet behind closed doors — documented through leaked attendee lists, founding charters, and their own publications.`,dateRange:`1921–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Shadow Institutions:
Bilderberg, the CFR, the Trilateral
Commission, and the Central
Bank of Central Banks
The financial dynasties documented in the preceding chapters did not operate
in isolation. They built institutions  —  formal, documented, publicly
acknowledged institutions  —  to coordinate their interests across governments
and generations. This chapter documents those institutions: what they are,
who founded them, who attends them, and what they have done.`},{type:`text`,text:`arroll Quigley was a professor of history at Georgetown University, a mentor to Bill Clinton, and one of the most respected academic historians of the
twentieth century. In 1966, he published a 1,300‐page book called  Tragedy
and Hope: A History of the World in Our Time. In it, he described, in explicit detail, the
network of international bankers who had controlled the governments of the Western world for more than a century. He was not a critic of this network. He was an admirer. He believed the public should know about it  —  and he believed the network's
goals were, on balance, beneficial.
[1]
Quigley wrote: "There does exist, and has existed for a generation, an international
Anglophile network which operates, to some extent, in the way the radical Right believes the Communists act. In fact, this network, which we may identify as the
Round Table Groups, has no aversion to cooperating with the Communists, or any
other groups, and frequently does so. I know of the operations of this network be
cause I have studied it for twenty years and was permitted for two years, in the early
1960's, to examine its papers and secret records."
[1]
"The powers of financial capitalism had a far-reaching aim,
nothing less than to create a world system of financial control
in private hands able to dominate the political system of each
country and the economy of the world as a whole."
CARROLL QUIGLEY, TRAGEDY AND HOPE, 1966  —  GEORGETOWN UNIVERSITY PROFESSOR AND
MENTOR TO BILL CLINTON
The Harold Pratt House at 58 East 68th Street in Manhattan  —  headquarters of the Council on Foreign Relations since 1945. The CFR
was founded in 1921 by the same banking network that created the Federal Reserve. Its members have included virtually every
Secretary of State, Treasury Secretary, and CIA Director since WWII. (CFR)`},{type:`text`,text:`The Four Institutions: What They Are and Who
Founded Them
The Council on Foreign Relations (CFR)
FOUNDED 1921  ·  NEW YORK, NY  ·  ~5,000 MEMBERS
The CFR was founded in 1921 by a group that included Elihu Root (former Secretary
of State and War), Paul Warburg (architect of the Federal Reserve), John W. Davis (J.P.
Morgan's personal attorney), and Walter Lippmann. Its founding was directly connected to the Paris Peace Conference of 1919, where the same banking network that had
financed WWI sought to shape the post‐war international order.
The CFR publishes Foreign Affairs, the most influential journal of international relations in the United States. Its members have included virtually every Secretary of
State, Treasury Secretary, National Security Advisor, and CIA Director since World
War II  —  regardless of which party was in power. Its membership list is public. Its
meeting transcripts are not.
Documented founding connection: Paul Warburg, who designed the Federal Reserve
in 1910 at Jekyll Island (Chapter 3) and whose brother Max financed both sides of
WWI (Chapter 4), was a founding member of the CFR.`},{type:`text`,text:`The Bilderberg Group
FOUNDED 1954  ·  ANNUAL MEETING, LOCATION VARIES  ·  ~130 ATTENDEES PER MEETING
The Bilderberg Group was founded in 1954 by Prince Bernhard of the Netherlands
and Polish émigré Joseph Retinger. Its first meeting was held at the Hotel de Bilderberg in Oosterbeek, Netherlands  —  hence the name. It meets annually, bringing together approximately 130 heads of state, finance ministers, central bank governors,
CEOs of major corporations, and senior intelligence officials from North America and
Europe.
The Bilderberg Group does not publish minutes of its meetings, does not issue press
releases, and does not publish a membership list. Attendees are asked not to discuss
what was said. The group's own website acknowledges its existence and describes it
as a forum for "informal discussions" on major policy issues.
What is documented: The attendee list for each annual meeting has been published
by the group since 2010 (and was leaked or reported by journalists before that). The
list consistently includes the heads of major central banks, the CEOs of the largest
financial institutions, and senior government officials from NATO countries.`},{type:`text`,text:`The Trilateral Commission
FOUNDED 1973  ·  NEW YORK / BRUSSELS / TOKYO  ·  ~390 MEMBERS
The Trilateral Commission was founded in 1973 by David Rockefeller, then chairman
of Chase Manhattan Bank, and Zbigniew Brzezinski, a Columbia University professor
who would later become Jimmy Carter's National Security Advisor. Its stated purpose
was to foster cooperation between North America, Western Europe, and Japan  —  the
three major economic blocs of the non‐communist world.
The Commission's 1975 report, The Crisis of Democracy, argued that Western democracies were suffering from an "excess of democracy"  —  too many people making too
many demands on governments. The report recommended reducing the "governability" problem by limiting public participation in policy‐making. This report is public
and available on the Commission's website.
Documented political influence: Jimmy Carter, a Trilateral Commission member, appointed 26 fellow Commission members to senior positions in his administration, including Brzezinski as National Security Advisor and Cyrus Vance as Secretary of
State.`},{type:`text`,text:`The Bank for International Settlements (BIS)
FOUNDED 1930  ·  BASEL, SWITZERLAND  ·  "THE CENTRAL BANK OF CENTRAL BANKS"
The Bank for International Settlements was founded in 1930, ostensibly to manage
German reparations payments under the Young Plan. Its founding was directly
shaped by the Warburg banking network: Hjalmar Schacht, the German central
banker who was a close associate of the Warburgs, was instrumental in its creation.
The BIS is owned by its member central banks  —  currently 63 central banks
representing approximately 95% of world GDP.
The BIS is headquartered in Basel, Switzerland, and enjoys extraordinary legal privileges: it is immune from search and seizure, its staff have diplomatic immunity, and
its archives are not subject to any national freedom of information laws. It coordinates monetary policy among the world's central banks and sets the international
banking standards (the Basel Accords) that govern how much capital banks must
hold.
The WWII controversy: During World War II, the BIS continued to operate under its
American president, Thomas McKittrick, facilitating financial transfers between Nazi
Germany and the Allied powers. A 1997 report by the Bretton Woods Commission
documented that the BIS transferred gold looted from occupied European countries
to Nazi Germany. The BIS has acknowledged this history.`},{type:`text`,text:`The Bank for International Settlements (BIS) tower in Basel, Switzerland  —  the "central bank of central banks." Founded in 1930, it
coordinates monetary policy among 63 central banks and sets the international banking standards that govern the global financial
system. Its archives are immune from any national freedom of information law. (BIS)`},{type:`text`,text:`P A R T  I I
The Warburg Connection: How the
Same Network Built All Four
Institutions
The most striking fact about these four institutions is not that they exist  —  it is that
the same network of banking families was involved in founding all of them. The
Warburg family, whose role in designing the Federal Reserve is documented in
Chapter 3, appears at the founding of each institution.
[2]
INSTITUTION
FOUNDED
WARBURG / BANKING NETWORK
CONNECTION
SOURCE
Federal Reserve`},{type:`text`,text:`Paul Warburg was the primary architect.
Designed at Jekyll Island in 1910.
G. Edward Griffin, The
Creature from Jekyll
Island; Congressional
Record
Council on
Foreign Relations`},{type:`text`,text:`Paul Warburg was a founding member. J.P.
Morgan's attorney was co-founder.
CFR founding documents;
Quigley, Tragedy and Hope
Bank for
International
Settlements`},{type:`text`,text:`Hjalmar Schacht (Warburg associate) was
instrumental in founding. BIS structure
designed by Warburg-connected bankers.
Adam LeBor, Tower of
Basel (2013)
Bilderberg Group`},{type:`text`,text:`David Rockefeller (Chase Manhattan) was a
key early participant. Rockefeller family had
deep ties to Warburg banking network
through Kuhn, Loeb & Co.
Daniel Estulin, The True
Story of the Bilderberg
Group; Bilderberg.org
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE COORDINATION QUESTION
The documented facts: the same banking network was involved in founding the Federal Reserve (1913), the CFR (1921), the BIS (1930), and the Bilderberg Group (1954).`},{type:`text`,text:`The membership of these institutions overlaps substantially. Their stated purposes  — 
monetary stability, international cooperation, policy coordination  —  are complementary.
The circumstantial argument: these institutions function as a coordinated system for
maintaining the financial and political dominance of the banking network that created them. The CFR shapes U.S. foreign policy. The BIS coordinates central bank
policy globally. The Bilderberg Group provides an off‐the‐record forum for the most
powerful individuals in the Western world to discuss policy without public accountability. The Trilateral Commission extends this coordination to Japan and the Pacific.
The alternative explanation: these institutions were founded by people who genuinely believed in international cooperation and financial stability, and their overlapping membership reflects the small size of the elite policy community rather than a
coordinated conspiracy. Carroll Quigley  —  who had access to the network's private
papers  —  believed the latter. He also believed the network's goals were broadly
beneficial. The reader must weigh the evidence.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
Defenders of organizations like the Council on Foreign Relations and the Bilderberg
Group argue that elite networking is a normal feature of democratic governance, and
that these organizations serve as forums for discussion rather than decision‐making
bodies. Political scientist Joseph Nye has argued that such institutions facilitate the
kind of informal diplomacy that can prevent conflicts. The reader should distinguish
between the documented facts about these organizations' membership and activities
and the interpretive claims about their influence on policy outcomes.
T HE THREAD THAT CONNECTS
The shadow institutions documented in this chapter are the organizational infrastructure of the financial network that runs through every chapter of this book.
They are the mechanism by which the same families and institutions have maintained their influence across generations and across changes in government. In
Chapter 9, we examine how the Federal Reserve actually works  —  and who receives the dividends. In Chapter 11, we document how the Lauder family  —  whose
connections to this network are extensive  —  funded the Israeli prime minister`},{type:`text`,text:`and placed a family member in line to chair the Federal Reserve. In Chapter 12,
we show how Jeffrey Epstein moved in the same circles as the members of these
institutions  —  and what that means.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`Carroll Quigley, Tragedy and Hope: A History of the World in Our Time (Macmillan, 1966). Available in full at archive.org.`},{id:2,text:`Adam LeBor, Tower of Basel: The Shadowy History of the Secret Bank That Runs the World (PublicAffairs, 2013).`},{id:3,text:`Bilderberg Meetings, official website: bilderbergmeetings.org. Annual attendee lists available from 2010 onward.`},{id:4,text:`Council on Foreign Relations, "History of CFR." Available at: cfr.org/history-cfr`},{id:5,text:`Michel Crozier, Samuel P. Huntington, and Joji Watanuki, The Crisis of Democracy: Report on the Governability of Democracies to the Trilateral Commission (New York University Press, 1975). Available at: trilateral.org`},{id:6,text:`Bretton Woods Commission, "Bretton Woods: Looking to the Future," 1994. The 1997 Eizenstat Report documented BIS gold transfers during WWII.`}],crossLinks:[{label:`Chapter 3: Jekyll Island & the Federal Reserve`,chapterId:`chapter-3`},{label:`Chapter 26: Bohemian Grove`,chapterId:`chapter-26`}],keywords:[`Bilderberg`,`CFR`,`Trilateral Commission`,`BIS`,`elite`,`globalism`]},{id:`chapter-12`,number:`Chapter 12`,title:`How the Federal Reserve Works`,subtitle:`A plain-English explainer on the institution that controls the American money supply, who owns it, and how it operates — stripped of jargon and presented with primary source documentation.`,dateRange:`Explainer`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Federal Reserve Building`},{type:`text`,text:`How the Federal
Reserve Works
The Federal Reserve is the most powerful financial institution in the
world. Most Americans have no idea how it works, who owns it, or who
receives the interest on the money it creates. This chapter explains it in
plain English  —  and follows the money all the way to BlackRock,
Vanguard, and State Street.`},{type:`text`,text:`How the Federal Reserve
Works: The Plain-English
Guide to Who Controls Your
Money
The Federal Reserve is not a government agency. It is not a private bank. It is
something in between  —  a hybrid institution that was specifically designed to
be difficult to understand and difficult to control. This chapter explains exactly
how it works, in language anyone can follow.`},{type:`text`,text:`hen you pull a dollar bill out of your wallet, look at the top. It says "Federal Reserve Note." Not "United States Note." Not "Treasury Note." Federal Reserve Note. That distinction  —  four words at the top of every piece
of paper currency in America  —  is the key to understanding the most consequential
financial arrangement in modern history. The money in your pocket is not issued by
the government of the United States. It is issued by a private banking cartel, lent to
the government at interest, and backed by nothing but the government's promise to
tax you enough to pay it back.
[1]`},{type:`text`,text:`P A R T  I
United States Notes vs. Federal Reserve
Notes: The Most Important Distinction
You Were Never Taught
There have been two fundamentally different types of paper money in American history. The first type  —  United States Notes  —  was issued directly by the U.S. Treasury.
It cost the government nothing to issue. No interest was paid to anyone. It was, in the
truest sense, the people's money. The second type  —  Federal Reserve Notes  —  is issued by the Federal Reserve. When the government needs money, it does not print
it. It borrows it from the Federal Reserve, paying interest on every dollar in circulation. That interest  —  paid by taxpayers  —  flows to the private banks that own the
Federal Reserve.
[1]`},{type:`text`,text:`FEATURE
UNITED STATES NOTE (GREENBACK)
FEDERAL RESERVE NOTE (CURRENT
DOLLAR)
Issued by
U.S. Treasury  —  the government
Federal Reserve  —  a private banking
institution
Interest
paid?
No. Issued debt-free.
Yes. Government pays interest to the Fed on
every dollar in circulation.
Backed by
The full faith and credit of the United States
government
The full faith and credit of the United States
government (same backing  —  but issued by a
private entity)
Who
benefits
The public  —  no interest cost
The private banks that own the Federal
Reserve  —  they receive interest payments
Historical
use
Issued by Lincoln during Civil War (1862–
1863); by Kennedy (1963); retired by
Johnson (1964)
Issued since 1914; the only form of paper
currency in the U.S. since 1971
Current
status
No longer issued. Last United States Notes
were retired from circulation in the 1990s.
All current U.S. paper currency
P LAIN ENGLISH: WHY THIS MATTERS
Imagine you need $1,000. You have two options:
Option A (United States Note): You print $1,000 yourself. You spend it. You owe nothing to anyone. The $1,000 circulates in the economy. Total cost to you: $0 in interest.
Option B (Federal Reserve Note): You borrow $1,000 from a private bank. You spend it.
You owe the bank $1,000 plus interest  —  let's say 5% per year. Every year, you pay the
bank $50 in interest. Over 20 years, you've paid the bank $1,000 in interest on top of
the original $1,000. Total cost to you: $2,000 for $1,000 of purchasing power.
The United States government uses Option B. For every dollar in circulation, the government  —  meaning taxpayers  —  pays interest to the Federal Reserve. The Federal Reserve's member banks receive those interest payments as dividends. Those member
banks are owned by shareholders. Those shareholders include the largest asset
management firms in the world: BlackRock, Vanguard, and State Street.`},{type:`text`,text:`P A R T  I I
How the Federal Reserve Actually
Works: Step by Step
H OW MONEY IS CREATED  —  THE ACTUAL PROCESS`},{type:`text`,text:`Congress authorizes spending
Congress passes a budget that spends more than the government collects in
taxes. This is called a deficit. In 2024, the U.S. deficit was approximately $1.8
trillion.`},{type:`text`,text:`Treasury issues bonds
To finance the deficit, the U.S. Treasury issues bonds  —  essentially IOUs. The
Treasury promises to pay back the face value of the bond plus interest.
These bonds are sold at auction.`},{type:`text`,text:`Federal Reserve buys the bonds
The Federal Reserve buys Treasury bonds  —  not with money it has, but with
money it creates out of nothing. This is called "open market operations." The
Fed credits the Treasury's account with newly created dollars. These dollars
did not exist before this transaction.`},{type:`text`,text:`Government spends the money
The Treasury spends the newly created dollars  —  on military contracts,
social programs, government salaries, etc. The money enters the economy.`},{type:`text`,text:`Banks multiply the money
When the new dollars are deposited in commercial banks, the banks are
required to keep only a fraction in reserve (historically 10%, now effectively
0% for large banks). They lend out the rest, creating new deposits. A $100
deposit can become $1,000 in circulation through this "fractional reserve"
process.`},{type:`text`,text:`Interest flows back to the Fed's owners
The Treasury pays interest on the bonds the Fed holds. The Fed remits most
of this interest back to the Treasury  —  but keeps a portion as operating
expenses and distributes 6% annual dividends to its member banks. Those
member banks are owned by shareholders. See Part III for where those
dividends ultimately go.`},{type:`text`,text:`Inflation erodes purchasing power
More dollars chasing the same amount of goods means each dollar buys
less. This is inflation. Since 1971, the dollar has lost approximately 85% of
its purchasing power. The people who benefit from inflation are those who
receive the new money first (banks, government contractors)  —  before
prices rise. The people who are harmed are those who receive it last (wage
earners, savers).`},{type:`text`,text:`P A R T  I I I
Who Owns the Federal Reserve:
Following the Money to BlackRock,
Vanguard, and State Street
The Federal Reserve System consists of a Board of Governors (a government agency)
and 12 regional Federal Reserve Banks (private institutions). The regional banks are
owned by their member banks  —  the commercial banks in each district that are required to purchase stock in their regional Fed. The member banks receive a 6%
annual dividend on their Fed stock, guaranteed by law.
[2]
6%
GUARANTEED ANNUAL
DIVIDEND TO MEMBER
BANKS`},{type:`text`,text:`REGIONAL FEDERAL
RESERVE BANKS
$7.4T
FED BALANCE SHEET
(2024)
THE NEW YORK FED: THE MOST POWERFUL BANK IN THE WORLD
The Federal Reserve Bank of New York is the most important of the 12 regional
banks. It conducts open market operations (buying and selling Treasury bonds to
control the money supply), holds the gold reserves of foreign governments, and
serves as the primary regulator of the largest U.S. banks. Its president is the only regional Fed president who is a permanent voting member of the Federal Open Market
Committee  —  the body that sets interest rates.
[2]
The New York Fed is owned by its member banks. According to research published
by Institutional Investor in 2022, the two largest shareholders of the New York Fed
are Citibank (approximately 42.8% of shares) and JPMorgan Chase (approximately`},{type:`text`,text:`29.5% of shares). Together, these two banks own approximately 72% of the New York
Federal Reserve.
[2]
✓ VERIFIED  —  NEW YORK FED OWNERSHIP
The Federal Reserve Act (12 U.S.C. § 287) requires all national banks and statechartered banks that are members of the Federal Reserve System to purchase stock in
their regional Federal Reserve Bank equal to 6% of their capital and surplus. This
stock pays a 6% annual dividend, guaranteed by law.
The Federal Reserve Bank of New York's largest shareholders, as documented by Institutional Investor (2022): Citibank N.A. (~42.8%), JPMorgan Chase Bank N.A. (~29.5%),
Goldman Sachs Bank USA (~4.0%), HSBC Bank USA (~4.0%), Bank of New York Mellon
(~3.0%). Total: approximately 83% of New York Fed shares are held by five banks.
Source: Institutional Investor, "Conspiracy Theorists Ask Who Owns the New York
Fed. Here's the Answer," 2022.
FOLLOWING THE MONEY: WHO OWNS CITIBANK AND JPMORGAN?
Citibank and JPMorgan Chase  —  the two largest owners of the New York Federal Reserve  —  are publicly traded companies. Their largest shareholders are institutional
asset managers. The three largest institutional shareholders of virtually every major
U.S. bank  —  and virtually every major U.S. corporation  —  are the same three firms:
BlackRock, Vanguard, and State Street.
[3]`},{type:`text`,text:`INSTITUTION
LARGEST SHAREHOLDERS (INSTITUTIONAL)
COMBINED
OWNERSHIP
SOURCE
Citigroup
(Citibank)
Vanguard (~8.5%), BlackRock (~7.2%), State
Street (~4.1%)
~19.8%
SEC 13F filings,`},{type:`text`,text:`JPMorgan Chase
Vanguard (~9.1%), BlackRock (~7.0%), State
Street (~4.3%)
~20.4%
SEC 13F filings,`},{type:`text`,text:`Goldman Sachs
Vanguard (~8.8%), BlackRock (~7.1%), State
Street (~4.5%)
~20.4%
SEC 13F filings,`},{type:`text`,text:`Bank of America
Berkshire Hathaway (~13%), Vanguard (~8.2%),
BlackRock (~6.8%)
~28.0%
SEC 13F filings,`},{type:`text`,text:`P LAIN ENGLISH: THE FULL CHAIN  —  FROM YOUR DOLLAR TO BLACKROCK
Step 1: You pay taxes. The government spends more than it collects, so it borrows
from the Federal Reserve.
Step 2: The Federal Reserve creates new dollars and buys Treasury bonds. The
government pays interest on those bonds.
Step 3: The Federal Reserve distributes 6% annual dividends to its member banks  — 
primarily Citibank and JPMorgan Chase.
Step 4: Citibank and JPMorgan Chase are publicly traded companies. Their largest
shareholders are BlackRock, Vanguard, and State Street.
Step 5: BlackRock, Vanguard, and State Street manage approximately $25 trillion in assets combined. They are the largest shareholders of virtually every major corporation
in the United States  —  banks, oil companies, pharmaceutical companies, media
companies, and defense contractors.
The result: A small number of asset management firms, through their ownership of
the banks that own the Federal Reserve, sit at the top of a financial pyramid that ultimately extracts wealth from every American taxpayer through the interest paid on
government debt.`},{type:`text`,text:`WHO OWNS BLACKROCK, VANGUARD, AND STATE STREET?
Vanguard is owned by its funds, which are owned by their investors  —  a structure
that makes it, in theory, owned by the public. BlackRock is a publicly traded company (ticker: BLK). State Street is also publicly traded (ticker: STT). The largest shareholders of BlackRock include Vanguard, which owns approximately 8% of BlackRock. The largest shareholders of Vanguard's parent structure are the funds themselves. This creates a circular ownership structure that is deliberately difficult to
trace to individual human beneficiaries.
[3]
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE CIRCULAR OWNERSHIP PROBLEM
The ownership structure of the "Big Three" asset managers  —  BlackRock, Vanguard,
State Street  —  is designed in a way that makes it extremely difficult to identify the ultimate human beneficiaries. This is not a conspiracy theory; it is a structural feature
of the modern financial system that has been documented by academic researchers.
A 2017 paper by researchers at the University of Amsterdam, published in the journal 
PLOS ONE, found that the "Big Three" collectively own 20% or more of the shares of
88% of S&P 500 companies. The paper concluded that this represents "a new kind of
universal ownership" that has no historical precedent.
The implication: a small number of asset management firms, through their crossownership of virtually every major corporation, have the ability to coordinate corporate behavior across industries  —  not through explicit coordination (which would
be illegal) but through the implicit influence of being the largest shareholder of every
major company simultaneously.
Source: Jan Fichtner, Eelke Heemskerk, and Javier Garcia‐Bernardo, "Hidden Power of
the Big Three? Passive Index Funds, Re‐concentration of Corporate Ownership, and
New Financial Risk," Business and Politics, 2017.`},{type:`text`,text:`M AINSTREAM POSITION & COUNTER-ARGUMENTS
The Warren Commission concluded that Lee Harvey Oswald acted alone. Subsequent
forensic analyses, including computer modeling of the bullet trajectories, have supported the single‐bullet theory. Kennedy's relationship with Israel, while documented, was one of many policy disputes he managed simultaneously. The reader
should note that the House Select Committee on Assassinations (1979) concluded a
conspiracy was "probable" based on acoustic evidence, but this finding was later
challenged by the National Academy of Sciences.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:0,text:`You have two options: Option A (United States Note): You print $1,000 yourself. You spend it. You owe nothing to anyone. The $1,000 circulates in the economy. Total cost to you: $0 in interest. Option B (Federal Reserve Note): You borrow $1,000 from a private bank. You spend it. You owe the bank $1,000 plus interest  —  let's say 5% per year. Every year, you pay the bank $50 in interest. Over 20 years, you've paid the bank $1,000 in interest on top of the original $1,000. Total cost to you: $2,000 for $1,000 of purchasing power. The United States government uses Option B. For every dollar in circulation, the government  —  meaning taxpayers  —  pays interest to the Federal Reserve. The Federal Reserve's member banks receive those interest payments as dividends. Those member banks are owned by shareholders. Those shareholders include the largest asset management firms in the world: BlackRock, Vanguard, and State Street.`},{id:1,text:`8 trillion.`},{id:100,text:`deposit can become $1,000 in circulation through this "fractional reserve" process.`},{id:12,text:`regional Federal Reserve Banks (private institutions). The regional banks are owned by their member banks  —  the commercial banks in each district that are required to purchase stock in their regional Fed. The member banks receive a 6% annual dividend on their Fed stock, guaranteed by law.`},{id:2,text:`6% GUARANTEED ANNUAL DIVIDEND TO MEMBER BANKS`},{id:7,text:`4T FED BALANCE SHEET (2024) THE NEW YORK FED: THE MOST POWERFUL BANK IN THE WORLD The Federal Reserve Bank of New York is the most important of the 12 regional banks. It conducts open market operations (buying and selling Treasury bonds to control the money supply), holds the gold reserves of foreign governments, and serves as the primary regulator of the largest U.S. banks. Its president is the only regional Fed president who is a permanent voting member of the Federal Open Market Committee  —  the body that sets interest rates.`},{id:2,text:`The New York Fed is owned by its member banks. According to research published by Institutional Investor in 2022, the two largest shareholders of the New York Fed are Citibank (approximately 42.8% of shares) and JPMorgan Chase (approximately`},{id:29,text:`5% of shares). Together, these two banks own approximately 72% of the New York Federal Reserve.`},{id:2,text:`✓ VERIFIED  —  NEW YORK FED OWNERSHIP The Federal Reserve Act (12 U.S.C. § 287) requires all national banks and statechartered banks that are members of the Federal Reserve System to purchase stock in their regional Federal Reserve Bank equal to 6% of their capital and surplus. This stock pays a 6% annual dividend, guaranteed by law. The Federal Reserve Bank of New York's largest shareholders, as documented by Institutional Investor (2022): Citibank N.A. (~42.8%), JPMorgan Chase Bank N.A. (~29.5%), Goldman Sachs Bank USA (~4.0%), HSBC Bank USA (~4.0%), Bank of New York Mellon (~3.0%). Total: approximately 83% of New York Fed shares are held by five banks. Source: Institutional Investor, "Conspiracy Theorists Ask Who Owns the New York Fed. Here's the Answer," 2022. FOLLOWING THE MONEY: WHO OWNS CITIBANK AND JPMORGAN? Citibank and JPMorgan Chase  —  the two largest owners of the New York Federal Reserve  —  are publicly traded companies. Their largest shareholders are institutional asset managers. The three largest institutional shareholders of virtually every major U.S. bank  —  and virtually every major U.S. corporation  —  are the same three firms: BlackRock, Vanguard, and State Street.`},{id:3,text:`INSTITUTION LARGEST SHAREHOLDERS (INSTITUTIONAL) COMBINED OWNERSHIP SOURCE Citigroup (Citibank) Vanguard (~8.5%), BlackRock (~7.2%), State Street (~4.1%) ~19.8% SEC 13F filings,`},{id:9,text:`1%), BlackRock (~7.0%), State Street (~4.3%) ~20.4% SEC 13F filings,`},{id:8,text:`8%), BlackRock (~7.1%), State Street (~4.5%) ~20.4% SEC 13F filings,`},{id:8,text:`2%), BlackRock (~6.8%) ~28.0% SEC 13F filings,`},{id:25,text:`trillion in assets combined. They are the largest shareholders of virtually every major corporation in the United States  —  banks, oil companies, pharmaceutical companies, media companies, and defense contractors. The result: A small number of asset management firms, through their ownership of the banks that own the Federal Reserve, sit at the top of a financial pyramid that ultimately extracts wealth from every American taxpayer through the interest paid on government debt.`},{id:3,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE CIRCULAR OWNERSHIP PROBLEM The ownership structure of the "Big Three" asset managers  —  BlackRock, Vanguard, State Street  —  is designed in a way that makes it extremely difficult to identify the ultimate human beneficiaries. This is not a conspiracy theory; it is a structural feature of the modern financial system that has been documented by academic researchers. A 2017 paper by researchers at the University of Amsterdam, published in the journal  PLOS ONE, found that the "Big Three" collectively own 20% or more of the shares of 88% of S&P 500 companies. The paper concluded that this represents "a new kind of universal ownership" that has no historical precedent. The implication: a small number of asset management firms, through their crossownership of virtually every major corporation, have the ability to coordinate corporate behavior across industries  —  not through explicit coordination (which would be illegal) but through the implicit influence of being the largest shareholder of every major company simultaneously. Source: Jan Fichtner, Eelke Heemskerk, and Javier Garcia‐Bernardo, "Hidden Power of the Big Three? Passive Index Funds, Re‐concentration of Corporate Ownership, and New Financial Risk," Business and Politics, 2017.`},{id:1979,text:`concluded a conspiracy was "probable" based on acoustic evidence, but this finding was later challenged by the National Academy of Sciences. SHARE THIS CHAPTER Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the chapter infographic, share it on social media, or send the full chapter to someone who needs to see it. veritasworldwide.com How to share: Download the chapter infographic image from veritasworldwide.com  —  optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations and our website for verification. Every claim in this book can be independently verified using the sources listed below.  Verify Everything: Every factual claim in this chapter is sourced from publicly available documents, government records, court filings, congressional testimony, or peer‐reviewed research. We encourage readers to verify every claim independently. Click any hyperlinked source below to access the original document. If a source link is broken, search the document title directly  —  primary sources are archived across multiple platforms.`},{id:1,text:`Federal Reserve Act of 1913, as amended. Available at: federalreserve.gov/aboutthefed/fract.htm. The primary legal document establishing the Federal Reserve System.`},{id:2,text:`Institutional Investor, "Conspiracy Theorists Ask Who Owns the New York Fed. Here's the Answer," 2022. Available at: institutionalinvestor.com`},{id:3,text:`Jan Fichtner, Eelke Heemskerk, and Javier Garcia-Bernardo, "Hidden Power of the Big Three? Passive Index Funds, Re- concentration of Corporate Ownership, and New Financial Risk," Business and Politics, Vol. 19, No. 2, 2017.`},{id:4,text:`Federal Reserve Bank of New York, "Annual Report 2023." Available at: newyorkfed.org/medialibrary/media/aboutthefed/annual/ annual23`},{id:5,text:`U.S. Securities and Exchange Commission, Form 13F filings for BlackRock, Vanguard, and State Street, 2024. Available at: sec.gov/ cgi-bin/browse-edgar`},{id:6,text:`G. Edward Griffin, The Creature from Jekyll Island: A Second Look at the Federal Reserve (American Media, 1994)  —  Note: This book is extensively cited in monetary reform literature. Some of its conclusions are disputed by mainstream economists, but its factual documentation of the Fed's structure is generally accurate.`}],crossLinks:[{label:`Chapter 1: The Birth of Central Banking`,chapterId:`chapter-1`},{label:`Chapter 3: Jekyll Island`,chapterId:`chapter-3`},{label:`Chapter 13: The 2008 Financial Crisis`,chapterId:`chapter-13`}],keywords:[`Federal Reserve`,`monetary policy`,`money creation`,`interest rates`,`FOMC`]},{id:`chapter-13`,number:`Chapter 13`,title:`The 2008 Financial Crisis`,subtitle:`How Wall Street\\'s reckless gambling crashed the global economy, how the government bailed out the banks with taxpayer money, and how no one went to prison.`,dateRange:`2007–2010`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The 2008 Crash: How the Banks
Destroyed the Economy, Got
Bailed Out, and Emerged More
Powerful Than Before
The 2008 financial crisis was not an accident. It was the predictable result of
deliberate decisions made by the largest financial institutions in the world,
enabled by regulators who had been systematically defanged over the
preceding two decades. What happened afterward  —  the bailouts, the lack of
prosecutions, the consolidation of financial power  —  was the most
consequential transfer of wealth in American history.`},{type:`text`,text:`he story of the 2008 financial crisis begins not in 2008 but in 1999, when the
Glass-Steagall Act was repealed. Glass-Steagall, passed in 1933 in direct re-
sponse to the banking speculation that caused the Great Depression, had for
sixty-six years separated commercial banking (taking deposits, making loans) from
investment banking (trading securities, underwriting bonds). Its repeal  —  through
the Gramm-Leach-Bliley Act, signed by President Bill Clinton  —  allowed the largest
banks to combine both functions. The architects of the repeal included Robert Ru-
bin, who had been co-chairman of Goldman Sachs before becoming Treasury Secret-
ary, and who joined Citigroup as a senior advisor immediately after leaving the
Treasury.
[1]
The repeal of Glass-Steagall was not the only deregulatory move that enabled the
2008 crisis. In 2000, the Commodity Futures Modernization Act exempted derivatives`},{type:`text`,text:`—  including the mortgage-backed securities that would cause the crash  —  from regu-
latory oversight. In 2004, the SEC relaxed the "net capital rule" for the five largest in-
vestment banks, allowing them to increase their leverage ratios from 12:1 to as high
as 40:1. These decisions were made by regulators who had been appointed by the
same financial industry they were supposed to regulate.
[1]
$700B
TARP BAILOUT
AUTHORIZED BY
CONGRESS, OCTOBER`},{type:`text`,text:`$16.1T
TOTAL SECRET FED
EMERGENCY LOANS TO
BANKS (GAO AUDIT, 2011)`},{type:`text`,text:`SENIOR BANK
EXECUTIVES
PROSECUTED FOR
CAUSING THE CRISIS
The Mechanism: How the Fraud Was Constructed
The  mechanism  of  the  2008  crisis  was,  in  retrospect,  straightforward.  Mortgage
lenders issued loans to borrowers who could not afford them  —  "NINJA loans" (No In-
come, No Job, No Assets)  —  because they had no intention of holding those loans. The
loans were immediately sold to investment banks, which bundled them into mort-
gage-backed securities (MBS) and collateralized debt obligations (CDOs). These se-
curities were then rated AAA by the credit rating agencies  —  Moody's, Standard &
Poor's, and Fitch  —  which were paid by the banks whose securities they were rating.
[2]
The AAA-rated securities were then sold to pension funds, insurance companies,
sovereign wealth funds, and other institutional investors around the world. When
the underlying mortgages began defaulting  —  as they inevitably would, because the
borrowers had never been able to afford them  —  the securities became worthless.
The institutions that held them were insolvent. The global financial system seized.
[2]
✓ VERIFIED  —  THE SENATE PERMANENT SUBCOMMITTEE INVESTIGATION (2011)
The U.S. Senate Permanent Subcommittee on Investigations, chaired by Senator Carl
Levin, published a 635-page report in April 2011 documenting the causes of the finan-`},{type:`text`,text:`cial crisis. The report found that Goldman Sachs had created mortgage securities it
knew were likely to fail, sold them to clients, and simultaneously bet against them us-
ing credit default swaps. The report referred Goldman Sachs to the Justice
Department for potential criminal prosecution.
The Justice Department declined to prosecute. Goldman Sachs paid a $550 million
civil settlement to the SEC in 2010  —  without admitting wrongdoing  —  and continued
operating.
Source: U.S. Senate Permanent Subcommittee on Investigations, "Wall Street and the
Financial Crisis: Anatomy of a Financial Collapse," April 13, 2011.`},{type:`text`,text:`P A R T  I I
The Bailout: Who Benefited and How
The government response to the 2008 crisis was coordinated by Treasury Secretary
Henry Paulson  —  the former CEO of Goldman Sachs  —  and Federal Reserve Chair-
man Ben Bernanke. The primary tool was the Troubled Asset Relief Program (TARP),
which authorized the Treasury to purchase up to $700 billion in "troubled assets"
from financial institutions. In practice, TARP became a direct capital injection into
the largest banks.
[3]
What was not disclosed at the time  —  and was only revealed through a 2011 audit by
the Government Accountability Office, the first audit of the Federal Reserve in its
history  —  was the scale of the secret emergency lending that the Fed had conducted
in parallel with TARP. The GAO found that the Federal Reserve had made $16.1 tril-
lion in secret emergency loans to financial institutions between 2007 and 2010. The
largest recipients included Citigroup ($2.5 trillion), Morgan Stanley ($2.0 trillion),
Merrill Lynch ($1.9 trillion), Bank of America ($1.3 trillion), and Goldman Sachs
($814 billion).
[3]`},{type:`text`,text:`INSTITUTION
SECRET FED
LOANS (GAO 2011)
TARP
RECEIVED
CRIMINAL
PROSECUTIONS
POST-CRISIS STATUS
Citigroup
$2.5 trillion
$45 billion
None (senior
executives)
Larger than pre-crisis
Morgan
Stanley
$2.0 trillion
$10 billion
None
Larger than pre-crisis
Merrill Lynch
$1.9 trillion
$10 billion (via
BofA)
None
Absorbed by Bank of
America
Bank of
America
$1.3 trillion
$45 billion
None (senior
executives)
Larger than pre-crisis
Goldman
Sachs
$814 billion
$10 billion
None (DOJ
declined)
Record profits 2009–2010
JPMorgan
Chase
$391 billion
$25 billion
None (senior
executives)
Acquired Bear Stearns &
WaMu; largest U.S. bank
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE REVOLVING DOOR
The documented facts: Treasury Secretary Henry Paulson was the former CEO of
Goldman Sachs. His predecessor, Robert Rubin, joined Citigroup immediately after
leaving the Treasury. Timothy Geithner, who succeeded Paulson as Treasury Secret-
ary, was the president of the Federal Reserve Bank of New York during the crisis  —  the
institution that coordinated the bailouts. After leaving the Treasury, Geithner joined
Warburg Pincus, the private equity firm founded by the Warburg banking family.
The circumstantial argument: the individuals who designed and implemented the
bailout had deep personal and financial ties to the institutions being bailed out. The
bailout terms  —  unlimited emergency lending at near-zero interest rates, no criminal
prosecutions, no executive compensation clawbacks  —  were extraordinarily favor-
able to those institutions. The pattern is consistent with regulatory capture: the
regulated industry effectively controls the regulator.
The alternative explanation: Paulson, Bernanke, and Geithner were genuinely trying
to prevent a complete collapse of the global financial system, and the bailout terms,
while politically unpopular, were economically necessary. Most mainstream econom-`},{type:`text`,text:`ists accept this explanation. The revolving door pattern is real regardless of which
explanation is correct.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
Mainstream economists offer multiple explanations for the 2008 crisis: inadequate
regulation, excessive risk-taking driven by misaligned incentives, failures of credit
rating agencies, and the inherent instability of complex financial instruments. The
government bailouts, while controversial, are defended by economists such as Ben
Bernanke and Timothy Geithner as necessary to prevent a complete collapse of the
global financial system. The Financial Crisis Inquiry Commission (2011) attributed
the crisis to systemic failures rather than deliberate manipulation. The reader should
weigh whether the documented evidence supports a narrative of institutional
negligence or intentional exploitation.
T HE THREAD THAT CONNECTS
The 2008 crisis is the modern culmination of the financial architecture docu-
mented in the preceding chapters. The same banks that were bailed out in 2008  — 
JPMorgan, Citigroup, Goldman Sachs  —  are the primary shareholders of the Feder-
al Reserve Bank of New York (Chapter 9). The deregulation that enabled the crisis
was championed by the same network of policy institutions  —  the CFR, the Trilat-
eral Commission  —  documented in Chapter 8. Timothy Geithner's post-Treasury
career at Warburg Pincus connects the crisis directly to the Warburg banking
dynasty documented in Chapter 4. And JPMorgan Chase  —  which emerged from
the crisis as the largest bank in the United States  —  is the same institution that
processed Jeffrey Epstein's payments for decades, as documented in Chapter 12.`},{type:`text`,text:`SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer-reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`U.S. Senate Permanent Subcommittee on Investigations, "Wall Street and the Financial Crisis: Anatomy of a Financial Collapse," April 13, 2011. Available at: hsgac.senate.gov`},{id:2,text:`Financial Crisis Inquiry Commission, "The Financial Crisis Inquiry Report," January 2011. Available at: fcic.law.stanford.edu`},{id:3,text:`U.S. Government Accountability Office, "Federal Reserve System: Opportunities Exist to Strengthen Policies and Processes for Managing Emergency Assistance," GAO-11-696, July 2011. Available at: gao.gov`},{id:4,text:`Michael Lewis, The Big Short: Inside the Doomsday Machine (W.W. Norton, 2010).`},{id:5,text:`Matt Taibbi, "The Great American Bubble Machine," Rolling Stone, April 5, 2010.`}],crossLinks:[{label:`Chapter 12: How the Federal Reserve Works`,chapterId:`chapter-12`},{label:`Chapter 10: The Petrodollar System`,chapterId:`chapter-10`}],keywords:[`2008 crisis`,`subprime`,`bailout`,`Lehman Brothers`,`TARP`,`Goldman Sachs`]},{id:`chapter-14`,number:`Chapter 14`,title:`AIPAC & Congressional Lobbying`,subtitle:`The most powerful foreign policy lobby in America — how it operates, who it funds, and what happens to those who oppose it.`,dateRange:`1963–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`U.S. Capitol Building`},{type:`text`,text:`CHAPTER FIFTEEN  |  1963 – 2026
AIPAC: The Lobby
That Rewrote
America
The American Israel Public Affairs Committee was born from the ashes of an
organization that the Kennedy administration forced to register as a foreign
agent. It has never registered. Today it spends over $43 million per election
cycle, has a dedicated lobbyist for virtually every member of Congress, and
has shaped every major piece of U.S. Middle East policy for sixty years. The
data is all public record. The question is why so few people have read it.`},{type:`text`,text:`AIPAC: The Lobby That Rewrote
America  —  From the AZC
Foreign Agent Case to $43
Million Per Election Cycle
Every dollar figure in this chapter is sourced to the Federal Election
Commission or OpenSecrets. Every vote is sourced to Congress.gov. Every
organizational fact is sourced to the Department of Justice or official
government records. The reader is encouraged to click every citation and verify
every claim independently.
  |  Sources: OpenSecrets, FEC, Congress.gov, DOJ FARA
$43.4M
AIPAC CONTRIBUTIONS
2023–2024 CYCLE
$174B
TOTAL U.S. AID
TO ISRAEL (ALL
TIME)
60+
YEARS
WITHOUT
FARA
REGISTRATION`},{type:`text`,text:`MEMBERS
OF
CONGRESS
WITH AIPAC
PRESENCE
n 1963, Attorney General Robert F. Kennedy's Department of Justice forced the
American Zionist Council  —  the most powerful pro-Israel lobbying organiza-
tion in the United States  —  to register as a foreign agent under the Foreign
Agents Registration Act. The AZC had received approximately $5 million from the
Jewish Agency for Israel, an organization the Senate Foreign Relations Committee
described as "a virtual arm of the Government of Israel."[1] The registration require-`},{type:`text`,text:`ment effectively ended the AZC's ability to operate as a domestic political lobbying
organization. Foreign agents face strict disclosure requirements and restrictions on
political activities.
The AZC's response was not compliance but transformation. Rather than accept the
restrictions of FARA registration, the organization dissolved itself and transferred its
functions to a new entity: the American Israel Public Affairs Committee, or AIPAC.
AIPAC was structured specifically to avoid FARA registration by claiming to be a do-
mestic lobbying organization with no formal ties to the Israeli government. It has
never registered as a foreign agent. In the sixty years since its founding, it has
grown from a small Washington office into what OpenSecrets describes as "one of, if
not the most, powerful international issue lobby" in the United States.[2]`},{type:`text`,text:`P A R T  I
How AIPAC Works: Structure, Funding,
and the Bundling Network
AIPAC itself is a 501(c)(4) nonprofit organization  —  a "social welfare" organization un-
der the Internal Revenue Code. As a 501(c)(4), it can engage in unlimited lobbying
but cannot make direct contributions to political campaigns. To circumvent this re-
striction, AIPAC operates through a network of affiliated political action committees,
bundlers,  and  independent  expenditure  groups  that  collectively  function  as  a
unified political operation.[2]
The most significant of these affiliated entities is the United Democracy Project
(UDP), a Super PAC that AIPAC launched in 2022. In the 2022 election cycle, UDP spent
over $100 million  —  making it one of the largest Super PACs in American political
history  —  primarily targeting progressive Democratic incumbents who had voted
against or criticized U.S. aid to Israel. The UDP's most prominent target was Repres-
entative  Jamaal  Bowman  of  New  York,  who  was  defeated  in  a  2024  Democratic
primary after UDP spent approximately $14.5 million against him  —  the most money
ever spent to defeat a sitting House member in a primary election.[3]`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`FEC filings released February 6, 2025.
American Israel Public Affairs Committee (AIPAC): $43,467,530 total contributions  — 
$25,213,571 to Democrats, $16,833,647 to Republicans.
J Street (liberal pro-Israel): $6,689,217  —  predominantly Democratic.
Republican Jewish Coalition: $5,602,725  —  predominantly Republican/conservative
groups.
NORPAC: $1,657,692  —  bipartisan.
Total pro-Israel lobby contributions, 2023-2024: approximately $60 million across all
organizations.
AIPAC lobbying spending, 2024: $3,324,268  —  registered lobbying expenditures only;
does not include Super PAC spending.`}},{type:`text`,text:`RANK
MEMBER OF CONGRESS
PARTY
CHAMBER
AMOUNT RECEIVED
SOURCE`},{type:`text`,text:`Bell, Wesley
D-MO
 — 
$2,744,534
OpenSecrets`},{type:`text`,text:`Latimer, George
D-NY
 — 
$2,538,736
OpenSecrets`},{type:`text`,text:`Harris, Kamala
D
President
$2,166,792
OpenSecrets`},{type:`text`,text:`Rosen, Jacky
D-NV
Senate
$1,463,766
OpenSecrets`},{type:`text`,text:`Jeffries, Hakeem
D-NY
House
$1,157,099
OpenSecrets`},{type:`text`,text:`Gottheimer, Josh
D-NJ
House
$1,130,747
OpenSecrets`},{type:`text`,text:`Menendez, Robert
I-NJ
Senate
$1,111,452
OpenSecrets`},{type:`text`,text:`Torres, Ritchie
D-NY
House
$1,100,833
OpenSecrets`},{type:`text`,text:`Cruz, Ted
R-TX
Senate
$1,034,811
OpenSecrets`},{type:`text`,text:`Casey, Bob
D-PA
Senate
$1,009,882
OpenSecrets`},{type:`text`,text:`Tester, Jon
D-MT
Senate
$974,224
OpenSecrets`},{type:`text`,text:`Bacon, Donald John
R-NE
House
$795,420
OpenSecrets`},{type:`text`,text:`Stefanik, Elise
R-NY
House
$774,178
OpenSecrets`},{type:`text`,text:`Schiff, Adam
D-CA
House
$759,466
OpenSecrets`},{type:`text`,text:`Ciscomani, Juan
R-AZ
House
$755,164
OpenSecrets`},{type:`text`,text:`Johnson, Mike
R-LA
House (Speaker)
$741,971
OpenSecrets`},{type:`text`,text:`Calvert, Ken
R-CA
House
$734,463
OpenSecrets`},{type:`text`,text:`Scalise, Steve
R-LA
House (Majority Leader)
$681,864
OpenSecrets`},{type:`text`,text:`Aguilar, Pete
D-CA
House (Caucus Chair)
$673,468
OpenSecrets`},{type:`text`,text:`Lawler, Mike
R-NY
House
$634,253
OpenSecrets
The data above represents only the 2023-2024 cycle. OpenSecrets maintains a com-
plete historical database going back to 1990. The full dataset  —  including every`},{type:`text`,text:`member of Congress and their cumulative lifetime receipts from pro-Israel PACs  —  is
publicly available at opensecrets.org/industries/recips.php?ind=Q05.[4]`},{type:`text`,text:`P A R T  I I I
The Votes: How Congress Voted on
Israel Aid After Receiving AIPAC Money
The following table documents key Congressional votes on U.S. aid to Israel, cross-
referenced  with  AIPAC  contribution  data.  All  vote  records  are  sourced  to  Con-
gress.gov. All contribution data is sourced to OpenSecrets and the FEC. The table
presents documented facts; the reader is invited to draw their own conclusions
about the relationship between campaign contributions and voting behavior.
LEGISLATION
DATE
WHAT IT DID
HOUSE
VOTE
SENATE
VOTE
SOURCE
H.J.Res. 75 (2002)
May`},{type:`text`,text:`Expressed solidarity with Israel;
endorsed military operations in
West Bank
352–21
Voice vote
Congress.gov
FY2004 Foreign
Ops (2003)
Jul`},{type:`text`,text:`$2.76B in military aid to Israel
339–82
97–3
Congress.gov
Iron Dome Funding
(2014)
Aug`},{type:`text`,text:`$225M emergency funding for Iron
Dome during Gaza war
395–8
Unanimous
Congress.gov
P.L. 118-50 (2024)
Apr`},{type:`text`,text:`$14.1B for Israel: $3.5B FMF +
$5.2B missile defense + $1.2B Iron
Beam
385–34
79–18
Congress.gov
FY2025 Continuing
Resolution
Mar`},{type:`text`,text:`Maintains $3.3B/year FMF to Israel;
reauthorizes loan guarantees
through 2030
217–213
54–46
Congress.gov`},{type:`text`,text:`MEMBERS WHO VOTED NO ON THE APRIL 2024 SUPPLEMENTAL  —  HOUSE (34 NO
VOTES)
The 34 House members who voted against P.L. 118-50 in April 2024 were predomin-
antly  progressive  Democrats.  The  complete  list  of  all  34  is  available  at
clerk.house.gov.[5] Notable  NO  votes  included:  Alexandria  Ocasio-Cortez  (D-NY),
Rashida Tlaib (D-MI), Ilhan Omar (D-MN), Cori Bush (D-MO), Jamaal Bowman (D-NY,
later defeated in primary), Summer Lee (D-PA), and Delia Ramirez (D-IL). All 34 NO
votes were Democrats. Zero Republicans voted against the bill.
SENATE NO VOTES (18) ON THE APRIL 2024 SUPPLEMENTAL
The 18 Senate NO votes included: Bernie Sanders (I-VT), Elizabeth Warren (D-MA),
Jeff Merkley (D-OR), Peter Welch (D-VT), Ed Markey (D-MA), Chris Van Hollen (D-MD),
Tim Kaine (D-VA), and others. The complete Senate roll call is available at senate.gov.
[6]`},{type:`text`,text:`P A R T  I V
The FARA Question: Why AIPAC Has
Never Registered as a Foreign Agent
The Foreign Agents Registration Act requires any person or organization that acts as
an agent of a foreign government or foreign principal to register with the Depart-
ment of Justice, disclose their activities, and label all political materials as coming
from a foreign agent.[7] The AZC, AIPAC's predecessor, was required to register in
1963 after the Senate Foreign Relations Committee documented that it had received
$5 million from the Jewish Agency for Israel  —  a body described as "a virtual arm of
the Government of Israel."[1]
AIPAC has never registered as a foreign agent. It argues that it is a domestic lobbying
organization with no formal ties to the Israeli government. The DOJ has never chal-
lenged this claim. Critics, including former Senator J. William Fulbright, have ar-
gued for decades that AIPAC functions as a de facto foreign agent regardless of its
formal legal status.`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE FARA GAP
The documented facts: AIPAC was founded in 1963, the same year the AZC was re-
quired to register as a foreign agent. AIPAC was structured specifically to avoid FARA
registration. AIPAC coordinates closely with the Israeli government on legislative pri-
orities  —  a fact acknowledged in AIPAC's own published materials. The Israeli govern-
ment has publicly praised AIPAC's legislative achievements. AIPAC's annual policy
conference is regularly attended by the Israeli Prime Minister.
The circumstantial argument: an organization that coordinates with a foreign govern-
ment on legislative priorities, receives guidance from that government's officials, and
works to advance that government's interests in the U.S. Congress would, under a
plain reading of FARA, appear to meet the definition of a foreign agent. The fact that
AIPAC has never been required to register  —  despite the AZC's forced registration in
1963  —  is a documented anomaly in DOJ enforcement history.
What is not disputed: AIPAC has never registered. The DOJ has never required it to.
The AZC was required to register. AIPAC was founded immediately after the AZC's
registration requirement.
Source: DOJ FARA Registrant Database  —  AIPAC does not appear.
"The biggest lobby in Washington is the Israeli lobby. It has
more influence on American foreign policy than any other
single force."
SENATOR J. WILLIAM FULBRIGHT  —  CBS FACE THE NATION, APRIL 15, 1973`},{type:`text`,text:`P A R T  V
The Bowman Case: $14.5 Million to
Defeat One Congressman
In the 2024 Democratic primary in New York's 16th Congressional District, AIPAC's
United Democracy Project Super PAC spent approximately $14.5 million to defeat in-
cumbent Representative Jamaal Bowman  —  the most money ever spent to defeat a
sitting House member in a primary election in American history.[3] Bowman had
been one of the most vocal critics of U.S. military aid to Israel in the House. He was
defeated by George Latimer, who received $2,538,736 in pro-Israel PAC contributions
 —  the second-highest total of any candidate in the 2023-2024 cycle.[4]
The Bowman case is documented fact, not circumstantial evidence. AIPAC's Super
PAC publicly announced its spending. The FEC records are publicly available. The
message to other members of Congress was explicit: vote against Israel aid, and face
a well-funded primary challenge. This is legal under current campaign finance law.
Whether it represents appropriate democratic participation or undue foreign-influ-
enced pressure on elected officials is a question this chapter presents without resol-
ution.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
AIPAC and its supporters argue that lobbying on behalf of Israel reflects the democrat-
ic right of citizens to petition their government, and that the U.S.-Israel relationship
serves genuine American strategic interests in the Middle East. Political scientists
such as Walter Russell Mead have argued that American support for Israel reflects
broad public sentiment, not merely lobbying influence. The reader should consider
whether the documented lobbying expenditures and campaign contributions
represent undue influence or normal democratic participation.`},{type:`text`,text:`T HE THREAD THAT CONNECTS
The AIPAC chapter connects directly to Chapter 6 (JFK)  —  the AZC foreign agent
enforcement that Kennedy's DOJ initiated, and which was abandoned after his as-
sassination. It connects to Chapter 16 (U.S. Aid to Israel)  —  the $174 billion in aid
that AIPAC has helped secure over sixty years. And it connects to Chapter 9 (Ep-
stein)  —  Ronald Lauder, whose son-in-law Kevin Warsh has been nominated as
Federal Reserve Chair, is a major AIPAC donor and the man who, according to the
Times of Israel, "helped make Netanyahu Prime Minister." The same names
appear in every chapter of this book.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer-reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`U.S. Senate Foreign Relations Committee, Hearings on Foreign Agent Registration, 1963. National Archives. archives.gov/ research/foreign-policy`},{id:2,text:`OpenSecrets, "Pro-Israel Industry Summary, 2023-2024." Federal Election Commission data released February 6, 2025. opensec rets.org/industries/indus.php?ind=Q05`},{id:3,text:`OpenSecrets, "NY-16 2024 Outside Spending." opensecrets.org/races/outside-spending?id=NY16&cycle=2024`},{id:4,text:`OpenSecrets, "Pro-Israel Top Recipients, 2023-2024." opensecrets.org/industries/recips.php?ind=Q05`},{id:5,text:`U.S. House of Representatives, Roll Call Vote 151, April 20, 2024 (P.L. 118-50). clerk.house.gov/evs/2024/roll151.xml`},{id:6,text:`U.S. Senate, Roll Call Vote 128, April 23, 2024 (P.L. 118-50). senate.gov`},{id:7,text:`U.S. Department of Justice, Foreign Agents Registration Act (FARA). justice.gov/nsd-fara`},{id:8,text:`Federal Election Commission  —  Campaign Finance Data. fec.gov`},{id:9,text:`Congress.gov  —  All legislative records and roll call votes. congress.gov`},{id:10,text:`Times of Israel, "Lauder helped make Netanyahu Prime Minister." timesofisrael.com`}],crossLinks:[{label:`Chapter 8: JFK, Dimona & AIPAC`,chapterId:`chapter-8`},{label:`Chapter 15: U.S. Foreign Aid to Israel`,chapterId:`chapter-15`}],keywords:[`AIPAC`,`lobbying`,`Congress`,`Israel`,`campaign finance`,`FEC`]},{id:`chapter-15`,number:`Chapter 15`,title:`U.S. Foreign Aid to Israel`,subtitle:`A comprehensive accounting of American taxpayer money sent to Israel — totaling over $300 billion in inflation-adjusted terms — and the legal framework that enables it.`,dateRange:`1948–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`U.S. Capitol`},{type:`text`,text:`CHAPTER SIXTEEN  |  2001 – 2026
The $174 Billion
Question: What
America Bought
for Israel
Since September 11, 2001, the United States has provided Israel with more
than $100 billion in direct aid  —  the largest cumulative assistance package to
any country in American history. This chapter documents exactly what was
bought, who voted for it, who funded the people who voted for it, and what
the Congressional Research Service says about what the American taxpayer
received in return.
By B.R.  |  Published March 2026  |  Sources: CRS, State Dept, DOD, FEC, Congress.gov`},{type:`text`,text:`The $174 Billion Question: A
Complete Accounting of U.S. Aid
to Israel Since 9/11  —  What Was
Bought, Who Voted, and Who
Funded the Voters
Every dollar figure in this chapter is sourced to the Congressional Research
Service, the State Department, the Department of Defense, or the Office of
Management and Budget. Every vote is sourced to Congress.gov. Every
contribution figure is sourced to OpenSecrets and the FEC. This is a chapter of
documented facts.
By B.R.  |  March 2026  |  Primary sources: CRS RL33222  ·  State Dept  ·  FEC  ·  OpenSecrets
$174B+
TOTAL U.S. AID
TO ISRAEL (ALL TIME)
$100B+
AID SINCE
SEPTEMBER 11, 2001
$3.8B
ANNUAL MILITARY
AID (2016 MOU)
$14.1B
EMERGENCY
SUPPLEMENTAL
APPROVED APRIL`},{type:`text`,text:`he United States has provided more cumulative foreign assistance to Israel
than to any other country since World War II. According to the Congressional Research Service  —  the nonpartisan research arm of Congress  —  total
U.S. aid to Israel from 1946 through fiscal year 2023 exceeded $174 billion, including
approximately  $124  billion  in  military  assistance,  $34  billion  in  economic`},{type:`text`,text:`assistance, and $16 billion in missile defense funding.[1] Since September 11, 2001,
the United States has provided Israel with more than $100 billion in direct assistance
 —  an average of more than $4 billion per year for twenty‐two consecutive years.
This chapter presents the complete accounting: what was purchased, under what legislative authority, with what votes, and by members of Congress who had received
what level of campaign contributions from pro‐Israel political action committees.
All data is public record. All sources are hyperlinked. The reader is encouraged to
verify every figure independently.`},{type:`text`,text:`P A R T  I
The Baseline: What the Congressional
Research Service Documents
The Congressional Research Service publishes an annual report  —  Report RL33222,
"U.S. Foreign Aid to Israel"  —  that is the definitive official accounting of all U.S.
assistance  to  Israel.[1] The  most  recent  edition,  updated  in  2024,  documents  the
following cumulative totals since 1946:
✓ VERIFIED  —  CONGRESSIONAL RESEARCH SERVICE REPORT RL33222 (2024)
Source: CRS Report RL33222, "U.S. Foreign Aid to Israel," Updated April 2024
Total cumulative U.S. aid to Israel (1946–FY2023): approximately $174 billion (current
dollars)
Military assistance (FMF  —  Foreign Military Financing): approximately $124 billion
Economic assistance (ESF  —  Economic Support Fund): approximately $34 billion
Missile defense co-development funding: approximately $16 billion
Annual military aid since 2016 MOU: $3.8 billion per year ($3.3B FMF + $500M missile
defense)
Note: Israel is the only country that receives its entire annual FMF allocation as a
lump sum at the start of the fiscal year, allowing it to earn interest on U.S. funds
before spending them  —  a unique arrangement documented in the CRS report.`},{type:`text`,text:`The 2016 Memorandum of Understanding: The
Largest Aid Package in U.S. History
On September 14, 2016, the Obama administration signed a ten‐year Memorandum
of Understanding with Israel committing the United States to provide $38 billion in
military assistance over the period 2019‐2028  —  $3.3 billion per year in Foreign
Military Financing plus $500 million per year in missile defense funding.[2] This was
described at the time as "the largest single pledge of military assistance in U.S. history." The MOU was not subject to a Congressional vote  —  it was an executive agreement signed by the Secretary of State. Congress appropriates the funds annually
through the foreign operations appropriations process.`},{type:`text`,text:`P A R T  I I
The Post-9/11 Accounting: $100 Billion
Since 2001
The following table documents annual U.S. military and economic aid to Israel from
FY2001 through FY2024, sourced to CRS Report RL33222 and annual State Department foreign operations budget justifications. All figures are in millions of current
U.S. dollars.`},{type:`text`,text:`FISCAL YEAR
MILITARY AID
(FMF)
MISSILE
DEFENSE
ECONOMIC AID
(ESF)
TOTAL
SOURCE
FY2001
$1,976M
$60M
$840M
$2,876M
CRS
RL33222
FY2002
$2,040M
$60M
$720M
$2,820M
CRS
RL33222
FY2003
$2,160M
$60M
$600M
$2,820M
CRS
RL33222
FY2004
$2,147M
$136M
$480M
$2,763M
CRS
RL33222
FY2005
$2,202M
$136M
$360M
$2,698M
CRS
RL33222
FY2006
$2,257M
$120M
$240M
$2,617M
CRS
RL33222
FY2007
$2,340M
$120M
$120M
$2,580M
CRS
RL33222
FY2008
$2,380M
$170M
$0
$2,550M
CRS
RL33222
FY2009
$2,550M
$195M
$0
$2,745M
CRS
RL33222
FY2010
$2,775M
$205M
$0
$2,980M
CRS
RL33222
FY2011
$3,000M
$235M
$0
$3,235M
CRS
RL33222
FY2012
$3,100M
$106M
$0
$3,206M
CRS
RL33222
FY2013
$3,100M
$211M
$0
$3,311M
CRS
RL33222
FY2014
$3,100M
$504M
$0
$3,604M
CRS
RL33222
FY2015
$3,100M
$619M
$0
$3,719M
CRS
RL33222`},{type:`text`,text:`FISCAL YEAR
MILITARY AID
(FMF)
MISSILE
DEFENSE
ECONOMIC AID
(ESF)
TOTAL
SOURCE
FY2016
$3,100M
$487M
$0
$3,587M
CRS
RL33222
FY2017
$3,175M
$500M
$0
$3,675M
CRS
RL33222
FY2018
$3,300M
$500M
$0
$3,800M
CRS
RL33222
FY2019
$3,300M
$500M
$0
$3,800M
CRS
RL33222
FY2020
$3,300M
$500M
$0
$3,800M
CRS
RL33222
FY2021
$3,300M
$500M
$0
$3,800M
CRS
RL33222
FY2022
$3,300M
$1,000M
$0
$4,300M
CRS
RL33222
FY2023
$3,300M
$500M
$0
$3,800M
CRS
RL33222
FY2024 (incl.
supplemental)
$3,300M +
$3,500M
$500M +
$6,700M
$0
$14,000M
P.L. 118-50`},{type:`text`,text:`P A R T  I I I
What Was Purchased: A Complete
Inventory of U.S.-Funded Weapons
Systems
U.S. Foreign Military Financing funds are used to purchase American‐made weapons
systems and military equipment. The following table documents the major weapons
systems and defense programs funded by U.S. taxpayers for Israel, sourced to Defense Security Cooperation Agency (DSCA) notifications and CRS reports.[3]`},{type:`text`,text:`SYSTEM / PROGRAM
U.S. FUNDING
(APPROX.)
DESCRIPTION
SOURCE
Iron Dome
$3.0B+
Short-range rocket and artillery shell interception system.
U.S. co-funded development and production since 2011.
Manufactured by Rafael Advanced Defense Systems (Israel)
and Raytheon (U.S.).
CRS
RL33222
David's Sling
$1.0B+
Medium-to-long range missile defense. Joint development
by Rafael and Raytheon. U.S. co-funded since 2006.
DSCA
Arrow 2 & Arrow 3
$2.5B+
Long-range ballistic missile defense. Joint U.S.-Israel
development. Boeing and IAI. U.S. co-funded since 1988.
CRS
RL33222
F-35I Adir (75
aircraft)
$7.5B+
Israel became the first export customer for the F-35. 75
aircraft contracted at approximately $100M each. Funded
through FMF.
DSCA
F-15I Ra'am (25
aircraft)
$2.0B+
Advanced strike aircraft. Boeing. Delivered 1998-2000,
funded through FMF.
DSCA
MK-84 2,000-lb
bombs
$320M
1,800 MK-84 bombs and 500 MK-82 bombs approved
October 2023. Delivery paused by Biden administration May
2024 due to Rafah concerns, then resumed.
DSCA
Iron Beam (Laser)
$1.2B
(FY2024)
High-energy laser air defense system. Included in P.L. 118-50
(April 2024 supplemental). Rafael Advanced Defense
Systems.
P.L.
118-50
Ammunition
(FY2024
supplemental)
$4.0B
Artillery shells, tank ammunition, small arms ammunition.
Included in P.L. 118-50.
P.L.
118-50
Loan Guarantees
$9.0B
U.S. guarantees on Israeli government bonds, allowing
Israel to borrow at U.S. Treasury rates. Active since 1992.
CRS
RL33222`},{type:`text`,text:`P A R T  I V
The Donor-Voter Chain: Who Funded
the People Who Voted for the Aid
The following table cross‐references the April 2024 supplemental vote (P.L. 118‐50,
$14.1 billion for Israel) with AIPAC contribution data for the key Congressional leaders who shepherded the bill to passage. All contribution data is from OpenSecrets,
sourced to FEC filings. All vote data is from Congress.gov.[4]
MEMBER
ROLE IN P.L. 118-50
PRO-ISRAEL PAC
(CAREER)
VOTE
SOURCE
Mike Johnson (R-
LA)
House Speaker  —  brought bill to floor
$741,971
YES
OpenSecrets
Steve Scalise (R-LA)
House Majority Leader
$681,864
YES
OpenSecrets
Hakeem Jeffries (D-
NY)
House Minority Leader  —  whipped
Democratic votes
$1,157,099
YES
OpenSecrets
Pete Aguilar (D-CA)
House Democratic Caucus Chair
$673,468
YES
OpenSecrets
Elise Stefanik (R-
NY)
House Republican Conference Chair
$774,178
YES
OpenSecrets
Josh Gottheimer
(D-NJ)
Led bipartisan push for passage
$1,130,747
YES
OpenSecrets
Ted Cruz (R-TX)
Senate Armed Services  —  key advocate
$1,034,811
YES
OpenSecrets`},{type:`text`,text:`⚠ CIRCUMSTANTIAL EVIDENCE  —  THE PATTERN
The documented facts: every Congressional leader who played a significant role in
passing P.L. 118‐50 had received substantial pro‐Israel PAC contributions. The bill
passed 385–34 in the House and 79–18 in the Senate. Every NO vote was a Democrat.
Zero Republicans voted against the bill. The 34 House members who voted NO had
collectively received significantly less pro‐Israel PAC money than the 385 who voted
YES.
What cannot be proven: whether the contributions caused the votes, or whether
members who were already supportive of Israel aid attracted contributions from proIsrael PACs. This is the fundamental question of campaign finance causality that
political science has debated for decades.
What can be documented: the correlation between pro‐Israel PAC contributions and
YES votes on Israel aid legislation is consistent across multiple election cycles and
multiple pieces of legislation. The data is public record. The reader is invited to
examine it at opensecrets.org.
"Israel is the largest cumulative recipient of U.S. foreign assistance since World War II. To date, the United States has
provided Israel $174 billion in bilateral assistance."
CONGRESSIONAL RESEARCH SERVICE, REPORT RL33222, APRIL 2024  —  CONGRESS.GOV/CRS-
PRODUCT/RL33222`},{type:`text`,text:`P A R T  V
The Unique Arrangements: What No
Other Country Gets
Israel receives U.S. military aid under terms that are unique in the history of U.S. foreign  assistance.  The  Congressional  Research  Service  documents  several
arrangements that apply exclusively to Israel:[1]
UNIQUE
ARRANGEMENT
WHAT IT MEANS
APPLIES TO
OTHER
COUNTRIES?
Lump-sum
disbursement
Israel receives its entire annual FMF allocation at the start of the fiscal
year, rather than in quarterly installments. This allows Israel to invest
the funds and earn interest before spending them  —  effectively a no-
cost loan from U.S. taxpayers.
No other country
Offshore
procurement (until
2026)
Israel was historically permitted to use up to 26.3% of its FMF to
purchase weapons from Israeli defense companies rather than
American ones  —  the only country with this waiver. The 2016 MOU
phased this out by 2026.
No other country
Cash flow financing
Israel can use FMF funds to pay for weapons contracts before the
weapons are delivered, allowing it to leverage U.S. funds for advance
payments.
No other country
Loan guarantees
The U.S. guarantees up to $9 billion in Israeli government bonds,
allowing Israel to borrow at U.S. Treasury rates  —  effectively
subsidizing Israel's cost of capital.
No other country
at this scale
Pre-positioned
equipment
The U.S. maintains approximately $1.8 billion in pre-positioned
military equipment in Israel that Israeli forces can access in
emergencies.
Limited to NATO
allies`},{type:`text`,text:`M AINSTREAM POSITION & COUNTER-ARGUMENTS
Supporters of U.S. aid to Israel argue that it serves American strategic interests by
maintaining a stable democratic ally in a volatile region, that much of the military aid
is spent on American‐made equipment (supporting U.S. jobs), and that Israel provides
valuable intelligence cooperation. The Congressional Research Service has documented these strategic rationales in multiple reports. The reader should evaluate
whether the documented aid levels and terms represent a sound strategic investment
or reflect the influence of domestic lobbying.
T HE THREAD THAT CONNECTS
This chapter connects directly to Chapter 15 (AIPAC)  —  the lobby that has secured
every major aid package documented here. It connects to Chapter 6 (JFK)  —  who
demanded inspections at Dimona and tried to force AIPAC's predecessor to register as a foreign agent, and was assassinated before either demand was met.
And it connects to Chapter 9 (Epstein)  —  where JPMorgan, the largest shareholder
of the New York Federal Reserve, processed Epstein's payments while simultaneously serving as the primary underwriter of Israeli government bonds. The financial architecture of American support for Israel runs through the same
institutions that appear in every other chapter of this book.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below.`},{type:`text`,text:`Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer‐reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`Congressional Research Service, "U.S. Foreign Aid to Israel," Report RL33222, Updated April 2024. congress.gov/crs-product/ RL33222`},{id:2,text:`U.S. Department of State, "The United States-Israel Relationship." 2016 MOU documentation. state.gov`},{id:3,text:`Defense Security Cooperation Agency, Major Arms Sales Notifications. dsca.mil/press-media/major-arms-sales`},{id:4,text:`OpenSecrets, "Pro-Israel Industry Summary." FEC data. opensecrets.org/industries/indus.php?ind=Q05`},{id:5,text:`P.L. 118-50, "National Security Supplemental Appropriations Act, 2024." Signed April 24, 2024. congress.gov/bill/118th-congress/ house-bill/815`},{id:6,text:`U.S. House of Representatives, Roll Call Vote 151, April 20, 2024. clerk.house.gov/evs/2024/roll151.xml`},{id:7,text:`U.S. Senate, Roll Call Vote 128, April 23, 2024. senate.gov`},{id:8,text:`Federal Election Commission  —  Campaign Finance Data. fec.gov`},{id:9,text:`U.S. Government Accountability Office, "Security Assistance: Observations on U.S. Security Assistance to Israel," GAO-16-729, September 2016. gao.gov/products/gao-16-729`},{id:10,text:`Office of Management and Budget, Annual Budget Justifications, FY2001–FY2025. whitehouse.gov/omb/budget`}],crossLinks:[{label:`Chapter 14: AIPAC & Congressional Lobbying`,chapterId:`chapter-14`},{label:`Chapter 16: The USS Liberty`,chapterId:`chapter-16`}],keywords:[`foreign aid`,`Israel`,`military aid`,`taxpayer`,`MOU`,`defense`]},{id:`chapter-16`,number:`Chapter 16`,title:`The USS Liberty Incident`,subtitle:`On June 8, 1967, Israeli forces attacked an American intelligence ship in international waters, killing 34 U.S. servicemen. The official investigation was classified for decades.`,dateRange:`1967`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The USS Liberty: Israel's
Attack on America
On June 8, 1967, Israeli forces attacked a U.S. Navy intelligence ship in international waters, killing 34 Americans and wounding 171. Israel called it a
mistake. The survivors, and the evidence, call it murder.`},{type:`text`,text:`The USS Liberty: Israel's Attack
on America
On June 8, 1967, in the midst of the Six-Day War, Israeli air and naval forces
launched a sustained, two-hour assault on the USS Liberty, an American in-
telligence  ship  operating  in  international  waters.  The  attack  killed  34
American sailors and wounded 171. Israel claimed it was a tragic case of
mistaken identity. But an overwhelming body of evidence, including declas-
sified documents and the sworn testimony of surviving crew members, tells a
different story: the attack was deliberate, and the truth was buried by a U.S.
administration desperate to protect its ally.`},{type:`text`,text:`★ W H Y  T H I S  
This chapter matters because it is a stark example of a U.S. ally attacking American forces and the subsequent political cover‐up that sacrificed truth for geopolitical strategy. It reveals a pattern of deception that has defined the U.S.‐Israel relationship for decades and raises critical questions about sovereignty,
accountability, and the real cost of strategic alliances. The Liberty incident
raises documented questions about the relationship between diplomatic considerations and the pursuit of accountability when allied nations are involved
in attacks on U.S. military personnel.`},{type:`heading`,text:`Americans Killed`},{type:`text`,text:`AMERICANS WOUNDED
8+
HOURS OF RECON`},{type:`text`,text:`ACCOUNTABILITY
he USS Liberty (AGTR‐5) was not a warship; she was a Victory‐class cargo
ship converted into one of the most sophisticated intelligence platforms
of her time, a floating outpost for the National Security Agency (NSA).
Her hull was packed with state‐of‐the‐art receivers, processors, and recorders, designed to hoover up signals intelligence (SIGINT) from across the electromagnetic
spectrum. Her mission on June 8, 1967, was critical: to sail along the coast of the
Sinai Peninsula and monitor the communications of all belligerents in the escalating Six‐Day War between Israel and its Arab neighbors. The ship was conspicuously American. She flew a large, five‐by‐eight‐foot American flag. Her hull numbers, GTR‐5, were painted in giant letters on her bow. The weather was a crystalclear Mediterranean summer day. For more than eight hours prior to the attack,
Israeli Air Force reconnaissance aircraft, including the French‐made Nord Noratlas, flew repeated, low‐level passes over the Liberty, sometimes flying so close
that the American sailors on deck could exchange waves with the Israeli pilots.
The crew had no reason to believe they were in danger. They were, after all, allies.
The brutal, two‐hour assault that followed was not a mistake; it was a calculated
act of extreme violence intended to erase the ship and its crew from the sea.
I. "A Deliberate, Cold-Blooded Murder"
The assault began without warning at approximately 2:00 PM local time. A flight
of unmarked, delta‐winged Dassault Mirage III fighter jets, the pride of the Israeli
Air Force, screamed in from the afternoon sun. Their first targets were not random. The 30mm cannon fire and rockets were precisely aimed at the Liberty's array of communications antennas, the forest of steel whips and dishes that were`},{type:`text`,text:`the ship's entire reason for being. Within minutes, the Liberty was electronically
deaf, unable to send or receive messages. The attackers also immediately neutralized the ship's only defensive armament: four .50‐caliber machine guns, whose
gunners were cut down in the first strafing runs. This was a clear, tactical move to
render the ship utterly defenseless and unable to call for help.
For the next twenty minutes, the jets made pass after pass, pouring thousands of
rounds into the ship's deck and superstructure. They were followed by a second
wave of slower, heavier Dassault Mystère jets, which dropped napalm‐like canisters that exploded into fireballs, incinerating everything they touched on the
deck. The ship became a slaughterhouse. Men were blown apart, burned alive, or
shredded by shrapnel. The decks ran with blood and fuel. Survivor accounts paint
a  horrific  picture  of  men  trying  to  fight  fires  while  being  strafed,  of  sailors
tending to the wounded while dodging rockets.
"The flag was flying. They knew who we were. They came
in, they saw the flag, they circled, came back and did it
again. They were trying to sink the ship and kill every man
on board."
 —  PETTY OFFICER PHILLIP F. TOURNEY, USS LIBERTY SURVIVOR [9]
As the air attack subsided, the crew spotted three Israeli motor torpedo boats approaching at high speed. The sailors initially thought help had arrived. But as the
boats closed in, they opened fire with their own machine guns and cannons. They
fired five torpedoes. Four missed. The fifth, however, struck the Liberty midship,
precisely in the area of the NSA's research spaces. The explosion tore a 40‐foot hole
in the starboard side, instantly killing 25 of the civilian and naval intelligence
specialists working in the classified compartments below the waterline. The tor
pedo's  placement  was  devastatingly  precise,  targeting  the  ship's  intelligencegathering heart.
✓ VERIFIED  —  SURVIVOR TESTIMONY & PHYSICAL EVIDENCE
Survivors consistently report that after the torpedo strike, as the order was given
to abandon ship, the Israeli torpedo boats circled the Liberty, machine‐gunning
the life rafts that had been lowered into the water. This act, a flagrant violation of
international law, demonstrates an intent not just to disable the ship, but to eliminate all witnesses. The physical evidence of the attack, including the 820 holes in
the hull (not including the torpedo hole) and the use of napalm, was documented
by the Navy upon the ship's arrival in Malta.[3]
TIME (LOCAL)
EVENT
DETAILS
~06:00-13:00
Israeli Reconnaissance
Multiple overflights by Israeli aircraft, some as low as 200 feet.
14:00
Air Attack Begins
Unmarked Mirage III jets attack with 30mm cannons and rockets.
14:05
Distress Call Sent
Liberty sends distress signal to Sixth Fleet, reporting attack.
14:24
Second Air Attack
Dassault Mystère jets attack with napalm-like bombs.
14:30
Fighters Recalled
Secretary McNamara recalls first U.S. fighter response.
14:59
Torpedo Boats Arrive
Three Israeli motor torpedo boats approach the Liberty.
15:15
Torpedo Strike
A torpedo hits starboard side, creating a 40-foot hole, killing 25.
~16:00
Attack Ceases
Israeli forces withdraw after circling and firing on crew in the water.
~16:30
Second Fighter Recall
McNamara recalls a second flight of U.S. rescue aircraft.`},{type:`text`,text:`II. The Cover-Up: "We Will Not Embarrass Our
Ally"
The cover‐up of the USS Liberty attack began while the ship was still under fire.
Twice, carrier‐based F‐4 Phantom jets were launched from the U.S. Sixth Fleet in
the Mediterranean to defend the Liberty. And twice, they were recalled by Secretary of Defense Robert McNamara, acting on the direct orders of President Lyndon
B. Johnson. The commander of the USS Saratoga, Admiral Geis, was so incensed by
the recall order that he demanded confirmation from the Secretary of Defense
himself. McNamara came on the line and was unambiguous. According to multiple sources who heard the exchange, Johnson's order was blunt: he would not
have his allies embarrassed.[3]
In the days that followed, the cover‐up solidified into official policy. The Navy
convened a Court of Inquiry that was a travesty of justice. It lasted less than a
week, and its lead counsel, Captain Ward Boston, later signed a sworn affidavit
stating that President Johnson and Secretary McNamara had ordered him to conclude that the attack was a case of mistaken identity. Key survivors, including the
ship's captain, William McGonagle (who would later receive the Medal of Honor
for his heroism), were never interviewed. The court's findings were a whitewash,
preordained from the highest levels of the U.S. government.
◐ CIRCUMSTANTIAL  —  GAG ORDERS AND THREATS
Surviving crew members were immediately isolated and sworn to secrecy,
threatened with court‐martial and imprisonment if they spoke to anyone, including their families, about what had happened. This official gag order remained in effect for years. The government's intense effort to silence its own sailors is one of
the most powerful indicators that there was something to hide. As Admiral
Thomas Moorer, former Chairman of the Joint Chiefs of Staff, would later state, "To
suggest that they couldn't identify the ship is... ridiculous. ... I've never seen a
cover‐up last that long."[5]`},{type:`text`,text:`III. The Motive: Silencing a Witness
Why would Israel, which relied so heavily on American support, attack a U.S.
ship? The official explanation of "mistaken identity" collapses under the slightest
scrutiny. The Liberty looked nothing like the supposed target, the aging Egyptian
freighter El Quseir. The Israeli pilots had hours of daylight to identify the ship.
The NSA intercepts confirm they did. The motive, therefore, must lie elsewhere.
The most compelling explanation, put forth by numerous high‐ranking military
and intelligence officials, is that the USS Liberty knew too much. Specifically, the
ship's SIGINT capabilities would have allowed it to monitor the Israeli military's
preparations for an invasion of the Syrian Golan Heights. This invasion was a direct violation of the ceasefire that the U.S. was attempting to broker. Furthermore,
there is evidence to suggest the Liberty may have intercepted communications
related to a far darker event: the execution of Egyptian prisoners of war by Israeli
forces in the Sinai town of El Arish. By sinking the Liberty and killing its entire
crew, Israel would eliminate the only American witness to these planned and
ongoing war crimes.
?  ALLEGED/DISPUTED  —  THE EL ARISH MASSACRES
While the Golan Heights motive is widely accepted in intelligence circles, the connection to the El Arish massacres is more contentious, yet significant. Israeli historian Gabby Bron and other journalists have documented reports of Israeli soldiers executing hundreds of Egyptian POWs on June 8, the same day as the Liberty
attack. If the Liberty's NSA specialists had intercepted evidence of this massacre, it
would have created a catastrophic international incident for Israel. This provides a
powerful, if horrifying, motive for ensuring the Liberty and its crew never made it
to port.[6]`},{type:`text`,text:`IV. The Long Shadow: A Betrayal Unanswered
For more than half a century, the survivors of the USS Liberty have fought for a
full, impartial congressional investigation into the attack. Their efforts have been
consistently blocked by political pressure, most notably from the powerful pro‐Israel lobby group, AIPAC. The official U.S. government position has remained unchanged since 1967. The surviving crew members have maintained that the U.S.
government prioritized diplomatic relations over a full accounting of the attack.
Multiple crew members have testified to this effect under oath.
The USS Liberty incident remains one of the most contested events in U.S.‐Israeli
relations. The surviving crew members have continued to advocate for a full congressional investigation. As of this writing, no such investigation has been conducted. The documentary record  —  including the testimony of the crew, the NSA
intercepts, and the findings of multiple independent investigations  —  is available
for the reader's examination.
"For many years I have remained silent about the USS
Liberty. I am a military man and I know that orders,
whether right or wrong, are to be obeyed. But I can no
longer remain silent. I am convinced that the American
people have the right to know the truth about this matter."
 —  ADMIRAL THOMAS H. MOORER, CHAIRMAN OF THE JOINT CHIEFS OF STAFF (1970-1974) [5]
V. A Legacy of Lies
The official narrative of the USS Liberty attack, that of a tragic accident, has been
thoroughly and repeatedly debunked by the very men who survived it, as well as`},{type:`text`,text:`by high‐ranking military officers and intelligence officials who had access to the
classified information. The Independent Commission of Inquiry, chaired by Admiral Thomas Moorer, concluded unanimously that the attack was deliberate. The
commission's report, presented in 2003, stated: "That Israel's attack was a deliberate attempt to destroy an American ship and kill her entire crew is supported by
overwhelming evidence."
The commission's findings, along with the sworn affidavit of Captain Ward Boston, present evidence that the initial investigation was constrained by political
considerations. The context for these decisions was rooted in the Cold War politics of the time and the burgeoning strategic alliance between the United States
and Israel. President Johnson, embroiled in the Vietnam War and facing a complex geopolitical chessboard in the Middle East, made a calculated decision that
the  life  of  34  American  servicemen  was  a  price  worth  paying  to  avoid  a
diplomatic crisis with a key ally.
✓ VERIFIED  —  THE MOORER COMMISSION
The Moorer Commission was an independent panel of distinguished military officers and intelligence experts, including a former Chairman of the Joint Chiefs of
Staff, a former Commandant of the Marine Corps, and a former U.S. Ambassador.
Their 2003 report is one of the most comprehensive and authoritative documents
on the Liberty incident, and its conclusions are unequivocal. The report is a matter
of public record and stands as a powerful indictment of the official story.[5]
The documentary record of the Liberty attack contains significant unresolved
questions. The surviving crew members, many of whom have reported long‐term
health consequences, have consistently requested a full congressional investigation. The tension between diplomatic considerations and accountability to military personnel documented in this incident has recurred in subsequent events
examined elsewhere in this book.`},{type:`text`,text:`M AINSTREAM POSITION & COUNTER-ARGUMENTS
The Israeli government has maintained since 1967 that the attack on the USS
Liberty was a case of mistaken identity during the fog of war. A joint U.S.‐Israeli investigation concluded the attack was not intentional. Defenders of this position
note that friendly fire incidents are common in wartime and that Israel had no strategic reason to attack an American vessel. The reader should evaluate the testimony of the surviving crew, the NSA intercept evidence, and the findings of
multiple independent investigations against the official explanation.
⬡ CROSS -
Mossad Operations → Ch. 6 (Mossad  —  The Institute) · AIPAC Lobbying → Ch. 12
(AIPAC Lobby) · U.S. Foreign Aid → Ch. 13 (U.S. Aid to Israel) · **JFK & Dimona**
→ Ch. 7 (JFK, Dimona & AIPAC)
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Ennes, James M. Assault on the Liberty: The True Story of the Israeli Attack on an American Intelligence Ship. Random House, 1979.`},{id:2,text:`NSA, "Attack on a Sigint Collector, the USS Liberty," Declassified Documents, https://www.nsa.gov/portals/75/documents/ news-features/declassified-documents/uss-liberty/chronology-events/attack-sigint.pdf`,url:`https://www.nsa.gov/portals/75/documents/`},{id:3,text:`Scott, James. The Attack on the Liberty: The Untold Story of Israel's Deadly 1967 Assault on a U.S. Spy Ship. Simon & Schuster, 2009.`},{id:4,text:`Rusk, Dean. As I Saw It. W. W. Norton & Company, 1990.`},{id:5,text:`Moorer, Thomas H. "Admiral Moorer's Statement on the USS Liberty." The Link, June-August 1997.`},{id:6,text:`Bamford, James. Body of Secrets: Anatomy of the Ultra-Secret National Security Agency. Doubleday, 2001.`},{id:7,text:`"USS Liberty: Dead in the Water." BBC Documentary, 2002.`},{id:8,text:`Congressional Record, House of Representatives, June 11, 2003, H5230-H5234.`},{id:9,text:`Tourney, Phillip F. What I Saw That Day: Israel's June 8, 1967 Holocaust of American Servicemen Aboard the USS Liberty and Its Aftermath. Liberty Publications, 2007.`},{id:10,text:`Boston, Ward. Sworn Affidavit, January 8, 2004.`}],crossLinks:[{label:`Chapter 15: U.S. Foreign Aid to Israel`,chapterId:`chapter-15`},{label:`Chapter 7: Mossad: The Institute`,chapterId:`chapter-7`}],keywords:[`USS Liberty`,`Israel`,`military`,`1967`,`Six-Day War`,`cover-up`]},{id:`chapter-17`,number:`Chapter 17`,title:`The Assassination of Robert F. Kennedy`,subtitle:`The evidence surrounding the murder of a presidential candidate who promised to reopen his brother\\'s assassination investigation.`,dateRange:`1968`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Assassination of
Robert F. Kennedy
The official story of a lone gunman is challenged by forensic evidence, eyewitness testimony, and a coroner's report that points to a second shooter.
Was  Sirhan  Sirhan  a  patsy  in  a  wider  conspiracy  to  eliminate  another
Kennedy?`},{type:`text`,text:`The Assassination of Robert F.
Kennedy
On June 5, 1968, Senator Robert F. Kennedy was shot and killed moments
after winning the California Democratic primary. The official narrative
blamed a lone gunman, Sirhan Sirhan. However, the forensic evidence  —  including the number of bullets recovered, the trajectory of the fatal wound,
and  the  autopsy  findings   —   raises  documented  questions  about  the
completeness of the official account.
 · Evidence tier: Verified / Circumstantial / Alleged
★ W H Y  T H I S  
The assassination of Robert F. Kennedy was a profound turning point in American history, a moment that extinguished a beacon of hope for a generation
grappling with war, social upheaval, and deep political division. For many,
RFK represented the last best chance to heal the country's wounds and pursue
a more just and peaceful path. Understanding the truth of what happened in
the pantry of the Ambassador Hotel is not merely an exercise in historical curiosity; it is a critical examination of the powerful, often hidden forces that
shape our political landscape. It forces us to question the narratives we are given and to consider the lengths to which powerful interests might go to silence
voices that challenge the status quo. The unresolved questions of RFK's murder
echo through the decades, reminding us that the pursuit of truth is a vital and
ongoing responsibility for any informed citizen.`},{type:`text`,text:`J
ust after midnight on June 5, 1968, in the hot, crowded, and chaotic pantry of
the Ambassador Hotel in Los Angeles, the life of Senator Robert F. Kennedy
was violently extinguished by an assassin's bullet. He had just delivered a
victory speech to a jubilant crowd, celebrating his win in the crucial California
Democratic presidential primary. As he took a shortcut through the pantry to
meet the press, a volley of shots rang out. The official story, cemented in the public mind and prosecuted by the Los Angeles Police Department (LAPD), is that a
24‐year‐old Palestinian immigrant named Sirhan Sirhan, acting alone out of political rage, fired the fatal shots. However, evidence compiled over five decades  —  by
journalists, forensic researchers, and participants in the original investigation  — 
has raised substantial questions about whether Sirhan Sirhan was the sole gunman. This chapter examines the LAPD's own case files, the official autopsy report
by Dr. Thomas Noguchi, eyewitness testimony, and independent forensic analyses. The reader is invited to evaluate the evidence and determine whether the
official account is consistent with the physical and testimonial record.
13+
BULLET IMPACTS
FOUND`},{type:`text`,text:`ROUNDS IN SIRHAN'S
GUN
< 3 IN.
DISTANCE OF FATAL
SHOT`},{type:`text`,text:`OTHER VICTIMS
WOUNDED
I. The Forensic Contradiction: More Bullets Than
the Gun
The most glaring and mathematically irrefutable contradiction in the official
story is the number of bullets fired. Sirhan Sirhan's .22 caliber Iver‐Johnson Cadet
revolver held a maximum of eight rounds. This is an undisputed fact. However,
the physical evidence and witness testimony from the crime scene indicate that
many more than eight shots were fired. Senator Kennedy was struck by three bullets, and a fourth passed through his jacket without entering his body. Five other`},{type:`text`,text:`people in the pantry were also wounded by gunfire: Paul Schrade, William Weisel,
Ira Goldstein, Irwin Stroll, and Elizabeth Evans. That alone accounts for all eight
of Sirhan's bullets, with none left to explain the bullet holes discovered in the
pantry's ceiling and door frames.
LAPD criminalist DeWayne Wolfer, the lead investigator at the scene, and FBI
agent William A. Bailey both documented bullet holes in the ceiling tiles of the
pantry. One tile had two holes that Wolfer concluded were made by bullets. These
tiles, along with door frames that also contained bullet holes, were subsequently
destroyed by the LAPD before they could be properly examined by independent
investigators or presented to the defense. This act of spoliation of evidence is, in
itself, a massive red flag. The official explanation was that the evidence was "lost"
or "disposed of" during renovations, a claim that strains credulity in a high‐profile assassination case. The inescapable conclusion is that there were more bullets
than could have come from the alleged murder weapon.
✓ VERIFIED  —  FBI & LAPD RECORDS
Internal FBI and LAPD records, though often conflicting and later altered, document more bullet impacts than could have come from Sirhan's eight‐shot revolver.
Declassified documents from the LAPD's investigation reveal that officers found
and marked bullet holes in the ceiling tiles and door frames of the pantry. These
crucial pieces of physical evidence were subsequently destroyed, preventing any
modern re‐examination. The official record, however, still contains the initial observations of these multiple bullet holes, a fact that fundamentally undermines
the lone‐gunman theory.[6][7]`},{type:`text`,text:`VICTIM/OBJECT
NUMBER OF
BULLETS
SOURCE / NOTES
Robert F.
Kennedy`},{type:`text`,text:`Official Autopsy Report. A fourth bullet passed through his suit coat.
Paul Schrade`},{type:`text`,text:`Wounded in the forehead.
William Weisel`},{type:`text`,text:`Wounded in the abdomen.
Ira Goldstein`},{type:`text`,text:`Wounded in the hip.
Irwin Stroll`},{type:`text`,text:`Wounded in the leg.
Elizabeth Evans`},{type:`text`,text:`Grazing head wound from a bullet fragment.
Ceiling Panel #1`},{type:`text`,text:`Documented by LAPD criminalist DeWayne Wolfer.
Ceiling Panel #2`},{type:`text`,text:`Also documented by Wolfer.
Door Frame`},{type:`text`,text:`Two bullet holes were identified in the center divider of the pantry
doors.
Minimum Total`},{type:`text`,text:`Four more than Sirhan's gun could hold. Some estimates are higher.
II. The Coroner's Bombshell: A Shot from Behind
The  most  significant  forensic  evidence  in  this  case  comes  from  the  official
autopsy, performed by Los Angeles County Chief Medical Examiner‐Coroner Dr.
Thomas Noguchi. Noguchi, who also performed autopsies in the cases of Marilyn
Monroe and Sharon Tate, was recognized as one of the foremost forensic pathologists in the United States. His findings in the Kennedy case were detailed and specific.
Dr.  Noguchi's  autopsy  report,  a  model  of  forensic  precision,  concluded  that
Kennedy was shot four times from the rear. Three of the bullets entered his back
and the fourth, the fatal shot, entered behind his right ear, traveling upward into
his brain at a steep angle. Critically, the powder burns (stippling) around the
entry wound of the fatal shot indicated a muzzle‐to‐target distance of no more`},{type:`text`,text:`than three inches, and likely closer to one inch. All credible eyewitnesses, including hotel maître d' Karl Uecker who was escorting Kennedy and holding his arm,
placed Sirhan several feet *in front* of the Senator. No witness saw Sirhan get
close enough to place a gun to the back of Kennedy's head. The physical evidence
of the autopsy is irreconcilable with the witness testimony of Sirhan's position.
"The fatal shot was fired from a distance of no more than
three inches, from behind the right ear, and at an upward
angle. Sirhan Sirhan was standing in front of Senator
Kennedy, several feet away. He could not have fired the
fatal shot."
 —  DR. THOMAS NOGUCHI, IN HIS MEMOIR "CORONER"
The LAPD's response to Noguchi's findings was not to investigate the discrepancy,
but to pressure him to change his report. They attempted to bully and discredit
him, but Noguchi refused to alter his scientific conclusions. His steadfast commitment to the truth ultimately cost him his job, but his findings remain the bedrock
of the case for a second gunman. The autopsy proves, beyond any reasonable
doubt, that whoever fired the fatal shot was standing directly behind Robert
Kennedy, a position Sirhan never occupied.
✓ VERIFIED  —  LOS ANGELES COUNTY AUTOPSY REPORT #68-5431
Dr. Noguchi's official autopsy report is a public record. It meticulously details the
location, trajectory, and muzzle distance of each wound. The report's conclusions,
which directly contradict the LAPD's official account of the shooting, have never
been successfully refuted by any credible forensic expert. Dr. Noguchi stood by his
findings for his entire career, despite immense professional and political pressure
to change them.[8]`},{type:`text`,text:`III. The Second Gunman: Thane Eugene Cesar
If Sirhan didn't fire the fatal shot, who did? The evidence points to one individual
who warrants examination: Thane Eugene Cesar, a security guard hired to protect
Kennedy that night. Cesar was walking directly behind Kennedy in the pantry, a
position consistent with the autopsy findings. He was armed with a .22 caliber
handgun, the same caliber as Sirhan's. He admitted to drawing his weapon and
that it may have discharged. Notably, Cesar sold his .22 revolver shortly after the
assassination, and the LAPD made no serious effort to recover it for testing.
Paul Schrade, the Kennedy aide who was shot in the forehead and survived, has
for decades been the most vocal proponent of the second gunman theory. He is
certain that Sirhan shot him, but that another gunman shot Kennedy. "Yes, he shot
me," Schrade has stated repeatedly. "But he did not shoot Robert Kennedy. The
evidence is clear that the LAPD has covered up the existence of a second gunman."
Schrade 's testimony, along with that of other witnesses and the forensic evidence, points directly at Thane Eugene Cesar as the man who fired the fatal shots
from behind.
WITNESS
OCCUPATION
KEY TESTIMONY REGARDING SECOND GUNMAN/SHOTS
Nina Rhodes-
Hughes
TV Actress
Stated unequivocally in a 2012 CNN interview that she heard 12-14 shots
and that the official story was a "cover-up." She was standing 12-15 feet
away.
Karl Uecker
Ambassador Hotel
Maitre d'
Testified that he was holding Sirhan's arm after the second shot and that
Sirhan could not have fired more rounds, yet the shooting continued.
Sandra
Serrano
Kennedy Volunteer
Reported seeing a woman in a polka-dot dress with a male companion
leaving the hotel moments after the shooting, exclaiming, "We shot him!
We shot Kennedy!"
Evan
Williams
Waiter
Told the LAPD he saw a man in a gold sweater with a gun, but his
testimony was ignored.`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`,text:`The Los Angeles Police Department's investigation into the RFK assassination has
been widely and credibly criticized as a textbook example of a cover‐up. From the
moment the shots were fired, the actions of the LAPD seemed geared not towards
finding the truth, but towards cementing a pre‐determined narrative of a lone
gunman. Key evidence was systematically destroyed, witnesses who contradicted
the official story were intimidated or ignored, and forensic procedures were procedurally deficient. The LAPD's special unit, known as "Special Unit Senator" or
SUS, was responsible for this investigati`}},{type:`text`,text:`The list of mishandled, "lost," or deliberately destroyed evidence is staggering. In
addition to the ceiling tiles and door frames, the LAPD burned over 2,400 photographs from the crime scene and investigation in 1988, just before the 20th anniversary of the assassination. The official reason given was to "save space." This
single act of destruction permanently eliminated a vast trove of potential evidence. Furthermore, the LAPD failed to properly investigate Thane Eugene Cesar,
never treating him as a suspect, and allowing him to sell the potential murder
weapon. This pattern of behavior goes far beyond mere incompetence; it points to
a deliberate and systematic effort to conceal the truth of what happened in the
pantry.
✗ ALLEGED/DISPUTED  —  THE HYPNOTIZED ASSASSIN
A controversial but persistent theory suggests that Sirhan Sirhan was a hypno‐programmed assassin, a real‐life "Manchurian Candidate" set up to be the patsy. This
theory is based on the work of Dr. Eduard Simson‐Kallas, a psychologist who examined Sirhan and found him to be highly susceptible to hypnosis. Sirhan himself
has always claimed to have no memory of the shooting, and his notebooks contain
pages of bizarre, repetitive automatic writing ("RFK must die"). While this theory
is compelling and fits the pattern of a conspiracy, it remains in the realm of speculation, as the evidence is largely psychological and circumstantial. However, it
provides a potential explanation for Sirhan's presence and actions in the pantry as
a diversion for the real assassin.
V. Cui Bono? Motives Beyond the Official
Narrative
The official motive attributed to Sirhan Sirhan was his anger over Kennedy's support for Israel during the 1967 Six‐Day War. While Sirhan was a Palestinian nationalist, many researchers and even some of Kennedy's own family believe this was a
convenient and simplistic cover story. If there was a conspiracy to eliminate
Robert Kennedy, who would have had the motive and the means? At the time of`},{type:`text`,text:`his death, RFK had made powerful enemies across the political and criminal spectrum.
As Attorney General, Robert Kennedy had waged a relentless and unprecedented
war on organized crime, securing hundreds of convictions against top Mafia leaders like Carlos Marcello and Santo Trafficante, who had both the motive and the
means to carry out an assassination. Furthermore, Kennedy had become a vocal
critic of the CIA in the wake of his brother's murder, privately expressing his belief that the agency was involved and vowing to "splinter the CIA into a thousand
pieces and scatter it to the winds." His entry into the 1968 presidential race was a
direct challenge to the incumbent, Lyndon B. Johnson, and the entire military‐industrial establishment that supported the Vietnam War. RFK's anti‐war platform
and his immense popularity with minority and working‐class voters made him a
profound threat to the existing power structure. His death conveniently removed
the single most powerful voice opposing the war and challenging the status quo.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
The official position of the Los Angeles District Attorney's office is that Sirhan
Sirhan acted alone. Supporters of this conclusion note that Sirhan was observed firing a weapon, that he had a documented motive (opposition to Kennedy's support
for Israel), and that eyewitness accounts in chaotic situations are notoriously unreliable. The additional bullets theory has been disputed by some forensic analysts
who argue that bullet fragments can create the appearance of additional projectiles. The reader should evaluate the autopsy findings, the ballistic evidence,
and the eyewitness testimony independently.
⬡ CROSS -
The Kennedy Legacy & Intelligence Community Oversight → Ch. 7 (JFK, Dimona & AIPAC) · Covert Operations & Plausible Deniability → Ch. 6 (Mossad  — 
The Institute) · The Silencing of Political Dissent → Ch. 18 (September 11, 2001)`},{type:`text`,text:`SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Documented by LAPD criminalist DeWayne Wolfer. Ceiling Panel #2`},{id:5431,text:`Dr. Noguchi's official autopsy report is a public record. It meticulously details the location, trajectory, and muzzle distance of each wound. The report's conclusions, which directly contradict the LAPD's official account of the shooting, have never been successfully refuted by any credible forensic expert. Dr. Noguchi stood by his findings for his entire career, despite immense professional and political pressure to change them.[8]`},{id:22,text:`caliber handgun, the same caliber as Sirhan's. He admitted to drawing his weapon and that it may have discharged. Notably, Cesar sold his .22 revolver shortly after the assassination, and the LAPD made no serious effort to recover it for testing. Paul Schrade, the Kennedy aide who was shot in the forehead and survived, has for decades been the most vocal proponent of the second gunman theory. He is certain that Sirhan shot him, but that another gunman shot Kennedy. "Yes, he shot me," Schrade has stated repeatedly. "But he did not shoot Robert Kennedy. The evidence is clear that the LAPD has covered up the existence of a second gunman." Schrade 's testimony, along with that of other witnesses and the forensic evidence, points directly at Thane Eugene Cesar as the man who fired the fatal shots from behind. WITNESS OCCUPATION KEY TESTIMONY REGARDING SECOND GUNMAN/SHOTS Nina Rhodes- Hughes TV Actress Stated unequivocally in a 2012 CNN interview that she heard 12-14 shots and that the official story was a "cover-up." She was standing 12-15 feet away. Karl Uecker Ambassador Hotel Maitre d' Testified that he was holding Sirhan's arm after the second shot and that Sirhan could not have fired more rounds, yet the shooting continued. Sandra Serrano Kennedy Volunteer Reported seeing a woman in a polka-dot dress with a male companion leaving the hotel moments after the shooting, exclaiming, "We shot him! We shot Kennedy!" Evan Williams Waiter Told the LAPD he saw a man in a gold sweater with a gun, but his testimony was ignored.`},{id:400,text:`photographs from the crime scene and investigation in 1988, just before the 20th anniversary of the assassination. The official reason given was to "save space." This single act of destruction permanently eliminated a vast trove of potential evidence. Furthermore, the LAPD failed to properly investigate Thane Eugene Cesar, never treating him as a suspect, and allowing him to sell the potential murder weapon. This pattern of behavior goes far beyond mere incompetence; it points to a deliberate and systematic effort to conceal the truth of what happened in the pantry. ✗ ALLEGED/DISPUTED  —  THE HYPNOTIZED ASSASSIN A controversial but persistent theory suggests that Sirhan Sirhan was a hypno‐programmed assassin, a real‐life "Manchurian Candidate" set up to be the patsy. This theory is based on the work of Dr. Eduard Simson‐Kallas, a psychologist who examined Sirhan and found him to be highly susceptible to hypnosis. Sirhan himself has always claimed to have no memory of the shooting, and his notebooks contain pages of bizarre, repetitive automatic writing ("RFK must die"). While this theory is compelling and fits the pattern of a conspiracy, it remains in the realm of speculation, as the evidence is largely psychological and circumstantial. However, it provides a potential explanation for Sirhan's presence and actions in the pantry as a diversion for the real assassin. V. Cui Bono? Motives Beyond the Official Narrative The official motive attributed to Sirhan Sirhan was his anger over Kennedy's support for Israel during the 1967 Six‐Day War. While Sirhan was a Palestinian nationalist, many researchers and even some of Kennedy's own family believe this was a convenient and simplistic cover story. If there was a conspiracy to eliminate Robert Kennedy, who would have had the motive and the means? At the time of`},{id:1968,text:`presidential race was a direct challenge to the incumbent, Lyndon B. Johnson, and the entire military‐industrial establishment that supported the Vietnam War. RFK's anti‐war platform and his immense popularity with minority and working‐class voters made him a profound threat to the existing power structure. His death conveniently removed the single most powerful voice opposing the war and challenging the status quo. M AINSTREAM POSITION & COUNTER-ARGUMENTS The official position of the Los Angeles District Attorney's office is that Sirhan Sirhan acted alone. Supporters of this conclusion note that Sirhan was observed firing a weapon, that he had a documented motive (opposition to Kennedy's support for Israel), and that eyewitness accounts in chaotic situations are notoriously unreliable. The additional bullets theory has been disputed by some forensic analysts who argue that bullet fragments can create the appearance of additional projectiles. The reader should evaluate the autopsy findings, the ballistic evidence, and the eyewitness testimony independently. ⬡ CROSS - The Kennedy Legacy & Intelligence Community Oversight → Ch. 7 (JFK, Dimona & AIPAC) · Covert Operations & Plausible Deniability → Ch. 6 (Mossad  —  The Institute) · The Silencing of Political Dissent → Ch. 18 (September 11, 2001)`},{id:1,text:`Noguchi, Thomas T. Coroner. Open Road Media, 2011.`},{id:2,text:`Ayton, Mel. The Forgotten Terrorist: Sirhan Sirhan and the Assassination of Robert F. Kennedy. Potomac Books, 2007.`},{id:3,text:`Kaiser, David. The Road to Dallas: The Assassination of John F. Kennedy. Harvard University Press, 2008.`},{id:4,text:`Schrade, Paul. Press Conference regarding the assassination of Robert F. Kennedy, June 4, 2018.`},{id:5,text:`Turner, William W., and John G. Christian. The Assassination of Robert F. Kennedy: A Searching Look at the Conspiracy and Cover-up, 1968-1978. Random House, 1978.`},{id:6,text:`Federal Bureau of Investigation. Robert F. Kennedy (Assassination) Part 03 (Final). FBI Vault, vault.fbi.gov.`},{id:7,text:`Los Angeles Police Department. Investigation Files on the Assassination of Robert F. Kennedy. California State Archives.`},{id:8,text:`Noguchi, Thomas T. Autopsy Report #68-5431. County of Los Angeles, Department of Chief Medical Examiner-Coroner, June 6, 1968.`}],crossLinks:[{label:`Chapter 9: JFK Expanded Analysis`,chapterId:`chapter-9`},{label:`Chapter 18: Operation Mockingbird`,chapterId:`chapter-18`}],keywords:[`RFK`,`Robert Kennedy`,`assassination`,`Sirhan Sirhan`,`1968`]},{id:`chapter-18`,number:`Chapter 18`,title:`Operation Mockingbird & CIA Media Influence`,subtitle:`The documented CIA program to infiltrate and influence American media — from the Cold War to the present day.`,dateRange:`1948–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`1975 Church Committee hearings. Over 400 journalists
on the CIA payroll. Carl Bernstein's 1977 Rolling Stone`},{type:`text`,text:`exposé.  How  narrative  control  was  institutionalized`},{type:`text`,text:`and its connection to modern media consolidation.`},{type:`text`,text:`B.R. | Research Correspondent · March 2026 · Evidence Classification: Multi-Tier`},{type:`text`,text:`C H A P T E R  2 0   —   T H E  D E E P  S T AT E ' S  O R C H E S T R A
Operation Mockingbird & The
CIA-Media Pipeline
The Cold War was a battle of ideologies, a shadowy conflict fought not just
with spies and soldiers, but with information. In this war of words and
ideas, the Central Intelligence Agency (CIA) sought to control the narrative,
to shape public opinion both at home and abroad. To do this, they turned to
the most powerful weapon in their arsenal: the American press. Operation
Mockingbird, a clandestine campaign to recruit journalists and infiltrate
media organizations, was the result. This was not a conspiracy theory, but a
documented program that was exposed by the Church Committee in 1975
and further detailed in Carl Bernstein's explosive 1977 Rolling Stone article.
The legacy of Mockingbird is a legacy of distrust, a legacy that continues to
haunt the relationship between the American people and the media to this
day.`},{type:`text`,text:`I
★ W H Y  T H I S  
This chapter matters because it reveals a documented history of the CIA's deliberate and systematic manipulation of the American press. It shows how the
very information you consume, the opinions you form, and the leaders you
elect may have been influenced by a hidden hand. Understanding Operation
Mockingbird is not about a historical curiosity; it is about recognizing the ongoing potential for propaganda and narrative control in a world of consolidated media and sophisticated information warfare. It is about learning to question the sources of your information and to think critically about the world
around you.
n 1975, the Church Committee, a Senate select committee chaired by Senator
Frank Church, was formed to investigate abuses by the CIA, NSA, FBI, and
IRS. The committee's final report revealed a shocking array of illegal activities, including assassination plots, secret surveillance of American citizens, and
the testing of drugs on unwitting subjects. But it was the committee's findings on
the CIA's relationship with the media that sent a chill down the spine of a nation
already reeling from the revelations of Watergate.
I. The Church Committee: A Glimpse into the
Shadows
The committee found that the CIA had maintained a network of several hundred
foreign individuals around the world who provided intelligence for the CIA and
were occasional assets for covert operations. These individuals provided the CIA
with direct access to a large number of newspapers and periodicals, scores of
press services and news agencies, radio and television stations, commercial book
publishers, and other foreign media outlets.`},{type:`text`,text:`400+
JOURNALISTS WHO
SECRETLY WORKED FOR
THE CIA
$1B+
CIA'S ANNUAL
PROPAGANDA BUDGET
IN THE 1970S`},{type:`text`,text:`CORPORATIONS THAT
CONTROL 90% OF US
MEDIA`},{type:`text`,text:`YEAR THE CHURCH
COMMITTEE EXPOSED
CIA ABUSES
II. Carl Bernstein's Exposé: The 400-Strong Media
Army
Two years after the Church Committee's report, investigative journalist Carl Bernstein, fresh off his Watergate fame, published a 25,000‐word article in Rolling
Stone titled "The CIA and the Media." Bernstein's investigation, based on CIA files,
revealed the staggering extent of the agency's media manipulation. He reported
that more than 400 American journalists had secretly carried out assignments for
the  CIA  over  the  preceding  25  years.  The  relationships  ranged  from  casual
contacts to formal, paid arrangements.
"Journalists provided a full range of clandestine services — 
from simple intelligence gathering to serving as go-
betweens with spies in Communist countries. Reporters
shared their notebooks with the CIA. Editors shared their
staffs. Some of the journalists were Pulitzer Prize winners,
distinguished reporters who considered themselves ambassadors-without-portfolio for their country."
 —  CARL BERNSTEIN, ROLLING STONE, 1977`},{type:`text`,text:`Bernstein's article named some of the most respected names in journalism and
media, including The New York Times, CBS, and Time magazine. He revealed that
the CIA had even created its own media outlets, or "fronts," to disseminate propaganda. The story sent shockwaves through the journalism world, further eroding
public trust in the media.
MEDIA OUTLET
ALLEGED INVOLVEMENT
SOURCE
The New York Times
Publisher Arthur Hays Sulzberger provided cover for agents
Carl Bernstein (1977)
CBS
CEO William Paley had a close relationship with the CIA
Carl Bernstein (1977)
Time & Life
Magazines
Henry Luce was a staunch anti-communist and CIA
collaborator
Various sources
Newsweek
Recruited journalists for intelligence gathering
Deborah Davis
(1979)
ABC
Used as a cover for CIA agents abroad
Church Committee
III. Institutionalizing Narrative Control
Operation Mockingbird was not just a rogue operation; it was part of a broader
strategy to institutionalize narrative control. The CIA's Office of Policy Coordination, under the direction of Frank Wisner, was at the heart of this effort. Wisner, a
charismatic and well‐connected figure, recruited influential journalists, academics, and cultural figures into his network. This network, which he referred to as
his "mighty Wurlitzer," could play any tune he wanted, creating a symphony of
propaganda that drowned out dissenting voices.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`"The CIA currently maintains a network of several hundred foreign individuals around the
world who provide intelligence for the CIA and at times attempt to influence opinion through the use of covert propaganda. These individuals provide the CIA with
direct access to a large number of newspapers and periodicals, scores of press services and news agencies, radio and television stations, commercial book
publishers, and other foreign media outlets."
The CIA's influence extended beyond the newsroom. The agency funded cultural
organizations, literary magazines, and academic institutions, all with t`}},{type:`text`,text:`IV. The Legacy of Mockingbird: Media
Consolidation and the Modern Propaganda
Pipeline
The revelations of the Church Committee and Carl Bernstein's reporting led to reforms aimed at curbing the CIA's power. The agency was officially prohibited
from using journalists for intelligence purposes. However, the legacy of Operation Mockingbird lives on. The concentration of media ownership in the hands of
a few powerful corporations has created a new kind of propaganda pipeline, one
that is arguably more effective than anything the CIA could have imagined.
"You could get a journalist cheaper than a good call girl, for
a couple hundred dollars a month."
 —  CIA OPERATIVE, QUOTED BY JOHN MARKS IN "THE SEARCH FOR THE MANCHURIAN
CANDIDATE"
Today, just a handful of corporations control the vast majority of what Americans
see, hear, and read. This media consolidation has led to a homogenization of news
and opinion, with little room for alternative viewpoints. The line between journalism and entertainment has blurred, and the pressure to generate profits has often trumped the duty to inform the public. In this environment, it is easier than
ever for powerful interests, both foreign and domestic, to manipulate the media
and shape public opinion.
ROBERT MAXWELL: THE INTELLIGENCE-PUBLISHING NEXUS
The  CIA's  media  manipulation  did  not  end  with  newspapers  and  television.
Robert Maxwell  —  born Jan Ludvik Hyman Binyamin Hoch, a British media baron`},{type:`text`,text:`and documented Mossad intelligence asset  —  built Pergamon Press into one of the
world's largest academic publishers. Maxwell's empire controlled hundreds of scientific journals, effectively gatekeeping what research reached the public. His
daughter, Ghislaine Maxwell, would later be convicted of sex trafficking in connection with Jeffrey Epstein. The intelligence community's penetration of media
extended from newsrooms to the very journals that shape scientific consensus
and public health policy. (See Ch. 0: The World Today and Ch. 16: Epstein Files for
the full Maxwell‐Pergamon analysis.)
⬡ CROSS -
Maxwell/Pergamon academic publishing → Ch. 0 (The World Today), Ch. 17
(Rockefeller Medicine) · Shadow Institutions → Ch. 9 (Bilderberg, CFR,
Trilateral) · Intelligence-linked operations → Ch. 17 (Epstein Files) · The 28
Pages & 9/11 → Ch. 18 (September 11, 2001)
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below.`},{type:`text`,text:`Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1979,text:`ABC Used as a cover for CIA agents abroad Church Committee III. Institutionalizing Narrative Control Operation Mockingbird was not just a rogue operation; it was part of a broader strategy to institutionalize narrative control. The CIA's Office of Policy Coordination, under the direction of Frank Wisner, was at the heart of this effort. Wisner, a charismatic and well‐connected figure, recruited influential journalists, academics, and cultural figures into his network. This network, which he referred to as his "mighty Wurlitzer," could play any tune he wanted, creating a symphony of propaganda that drowned out dissenting voices.`},{id:1961,text:`Oversaw the expansion of CIA covert operations, including Mockingbird Cord Meyer CIA official Principal operative for Operation Mockingbird, according to Deborah Davis Philip Graham Publisher, The Washington Post Allegedly recruited by Wisner to run the project within the industry Carl Bernstein Investigative Journalist Exposed the extent of CIA media manipulation in his 1977 Rolling Stone article`},{id:0,text:`(The World Today), Ch. 17 (Rockefeller Medicine) · Shadow Institutions → Ch. 9 (Bilderberg, CFR, Trilateral) · Intelligence-linked operations → Ch. 17 (Epstein Files) · The 28 Pages & 9/11 → Ch. 18 (September 11, 2001) SHARE THIS CHAPTER Every chapter of this book is designed to be shared independently. Download the chapter infographic, share it on social media, or send the full chapter to someone who needs to see it. veritasworldwide.com How to share: Download the chapter infographic image from veritasworldwide.com  —  optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations and our website for verification. Every claim in this book can be independently verified using the sources listed below.`},{id:1,text:`Church Committee, "Final Report of the Select Committee to Study Governmental Operations with Respect to Intelligence Activities," U.S. Senate, 94th Congress, 2nd Session, 1976.`},{id:2,text:`Bernstein, Carl. "The CIA and the Media." Rolling Stone, 20 Oct. 1977.`},{id:3,text:`Davis, Deborah. Katharine the Great: Katharine Graham and Her Washington Post Empire. Harcourt Brace Jovanovich, 1979.`},{id:4,text:`Hadley, David P. The Rising Clamor: The American Press, the Central Intelligence Agency, and the Cold War. University Press of Kentucky, 2019.`},{id:5,text:`"Operation Mockingbird." Wikipedia, Wikimedia Foundation, 2 Mar. 2026, en.wikipedia.org/wiki/Operation_Mockingbird.`},{id:6,text:`"One Dollar a Word? That'll Be $28,000." Longreads, 27 July 2018, longreads.com/2018/07/27/one-dollar-a-word-thatll- be-28000/.`},{id:7,text:`SELECT COMMITTEE TO STUDY GOVERNMENTAL OPERATIONS WITH RESPECT TO INTELLIGENCE ACTIVITIES, U.S. SENATE. "Final Report: Book I: Foreign and Military Intelligence." 1976.`},{id:8,text:`Marks, John. The Search for the "Manchurian Candidate": The CIA and Mind Control. Times Books, 1979.`},{id:9,text:`Wilford, Hugh. The Mighty Wurlitzer: How the CIA Played America. Harvard University Press, 2008.`},{id:10,text:`Saunders, Frances Stonor. The Cultural Cold War: The CIA and the World of Arts and Letters. The New Press, 2013. '''`}],crossLinks:[{label:`Chapter 19: MKUltra`,chapterId:`chapter-19`},{label:`Chapter 27: The Surveillance State`,chapterId:`chapter-27`}],keywords:[`Operation Mockingbird`,`CIA`,`media`,`propaganda`,`journalism`,`Church Committee`]},{id:`chapter-19`,number:`Chapter 19`,title:`MKUltra & Government Mind Control Programs`,subtitle:`The CIA\\'s documented program of human experimentation — using drugs, torture, and psychological manipulation on unwitting American citizens.`,dateRange:`1953–1973`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`MKUltra: Mind Control & The
American Experiment
How the CIA spent $25 million over two decades drugging, torturing, and
psychologically breaking American citizens  —  and why the program's legacy
extends far beyond the Cold War.`},{type:`text`,text:`★ W H Y  T H I S  
MKUltra is not ancient history. It is documented proof that the United States
government conducted illegal medical experiments on its own citizens
without their knowledge or consent  —  and then destroyed the evidence. The
program's techniques of behavioral manipulation, pharmaceutical coercion,
and institutional cover-up established patterns that persist in intelligence op-
erations today. If a government did this once, and was caught, and faced no
meaningful consequences, the question is not whether it could happen again  — 
it is whether it ever stopped.`},{type:`text`,text:`DOCUMENTED
SUBPROJECTS
80+
INSTITUTIONS
INVOLVED
$25M
PROGRAM BUDGET
(1953–73)
20,000
PAGES THAT SURVIVED
DESTRUCTION
n April 13, 1953, CIA Director Allen Dulles authorized a program that
would become the most extensive  —  and most illegal  —  series of human`},{type:`text`,text:`experiments ever conducted by the United States government. The program was
called MKUltra. Its stated objective was to develop techniques of mind control, be-
havioral modification, and interrogation that could be used against Cold War ad-
versaries. Its actual methods included administering LSD to unwitting subjects,
subjecting prisoners and mental patients to prolonged electroshock therapy, us-
ing sensory deprivation to break down personality structures, and employing
hypnosis to create programmable human agents. The program ran for twenty
years across at least 80 institutions  —  including 44 colleges and universities, 12
hospitals, 3 prisons, and numerous pharmaceutical companies.[1]
The man who ran MKUltra was Dr. Sidney Gottlieb, a chemist with a Ph.D. from
the California Institute of Technology. Gottlieb, who had a clubfoot and a stutter,
was described by colleagues as brilliant, eccentric, and utterly without moral re-
servation when it came to his work. He personally approved the dosing of unwit-
ting subjects with LSD, supervised experiments in which subjects were kept in
drug-induced comas for weeks, and authorized the use of techniques that would
today be classified as torture. When Gottlieb retired from the CIA in 1973, he and
Director Richard Helms ordered the destruction of all MKUltra files. The order
was carried out  —  but 20,000 pages survived due to a filing error that placed them
in a financial records archive rather than the operational files that were shredded.
[2]
✓ VERIFIED  —  CONGRESSIONAL RECORD
The existence of MKUltra was confirmed by the Church Committee (1975) and the
Senate Select Committee on Intelligence hearings (1977). CIA Director Stansfield
Turner testified before Congress that the program involved 149 subprojects at 80+
institutions. The surviving 20,000 pages of financial records were discovered in
1977 by a FOIA request filed by investigative journalist John Marks.`},{type:`text`,text:`Origins: From Paperclip to Mind Control
MKUltra did not emerge from a vacuum. It was the direct successor to Operation
Bluebird (1950) and Operation Artichoke (1951), both of which explored interroga-
tion techniques and behavioral modification. These programs were themselves
influenced by Operation Paperclip, the post-WWII program that brought over
1,600 German scientists to the United States  —  including researchers who had
conducted human experiments in Nazi concentration camps.[3]
The CIA's justification for MKUltra was the Cold War. Agency officials claimed that
the Soviet Union, China, and North Korea were developing mind control tech-
niques  —  a fear amplified by the apparent "brainwashing" of American POWs dur-
ing  the  Korean  War,  who  made  televised  confessions  denouncing  the  United
States. Whether the Communist threat was real or exaggerated, the CIA's response
was to launch a program that would make any totalitarian regime's efforts look
modest by comparison.
"I can assure you that the CIA's program of research in behavioral modification involved... the surreptitious administration of LSD to unwitting, non-volunteer subjects in normal
life settings."
ADMIRAL STANSFIELD TURNER, CIA DIRECTOR, TESTIMONY BEFORE THE SENATE SELECT
COMMITTEE ON INTELLIGENCE, AUGUST 3, 1977
The Subprojects: A Catalog of Horrors
The 149 documented MKUltra subprojects spanned an extraordinary range of re-
search  —  from the merely unethical to the genuinely monstrous. The program was`},{type:`text`,text:`administered through a network of front organizations, university grants, and
hospital contracts that allowed the CIA to maintain plausible deniability. Many of
the researchers involved did not know they were working for the intelligence
agency.[4]
SUBPROJECT
INSTITUTION
METHOD
STATUS
Subproject 68
McGill University (Allan
Memorial Institute)
Psychic driving, electroshock,
drug-induced comas lasting up to
88 days
Confirmed  —  Canadian
govt. paid $100K+ to
victims
Subproject 3
Various  —  Dr. Sidney
Gottlieb
LSD administration to unwitting
subjects
Confirmed  —  Church
Committee testimony
Operation
Midnight Climax
CIA safe houses, San
Francisco & New York
Prostitutes dosed clients with LSD;
CIA observed through one-way
mirrors
Confirmed  —  Senate
hearings, 1977
Subproject 58
Various prisons
LSD and mescaline administered
to prisoners
Confirmed  —  surviving
financial records
Subproject 119
Multiple universities
Research into "activating the
human organism by remote
electronic means"
Confirmed  —  FOIA
documents
Subproject 54
U.S. Navy
Studies on concussion-induced
amnesia
Confirmed  — 
declassified records
DR. DONALD EWEN CAMERON  —  THE MONTREAL EXPERIMENTS
Perhaps the most horrifying MKUltra subproject was conducted not in a CIA black
site but in a respected Canadian hospital. Dr. Donald Ewen Cameron, president of
both the American Psychiatric Association and the World Psychiatric Associ-
ation, ran experiments at McGill University's Allan Memorial Institute from 1957
to 1964 under CIA funding (Subproject 68). Cameron's technique, which he called
"psychic driving," involved three phases: first, he used massive electroshock treat-
ments  —  up to 40 times the normal therapeutic dose  —  to "de-pattern" patients, es-
sentially erasing their existing personality. Second, he placed patients in drug-in-
duced comas lasting up to 88 days using barbiturates and chlorpromazine. Third,`},{type:`text`,text:`he played recorded messages on continuous loops through speakers placed under
patients' pillows  —  sometimes for weeks  —  in an attempt to reprogram their beha-
vior.[5]
Cameron's patients were not intelligence targets. They were ordinary Canadians
who had checked into the Allan Memorial Institute for treatment of depression,
anxiety, and other common conditions. Many emerged unable to recognize their
own families, unable to control their bladders, and unable to recall basic bio-
graphical information. Some never recovered. In 1992, the Canadian government
paid $100,000 each to 77 of Cameron's victims. The CIA has never compensated
any of them.
✓ VERIFIED  —  COURT RECORDS & GOVERNMENT SETTLEMENT
In 2017, the Canadian Supreme Court allowed a class-action lawsuit by MKUltra
victims to proceed. Survivors testified that Cameron's treatments left them unable
to function as adults. Patient records show electroshock treatments administered
at 150 volts  —  40 times the standard therapeutic dose  —  multiple times per day for
weeks. The CIA's funding of Cameron's work was confirmed by surviving financial
records showing payments routed through the Society for the Investigation of
Human Ecology, a CIA front organization.
OPERATION MIDNIGHT CLIMAX
Under the direction of narcotics agent George Hunter White, the CIA established
safe houses in San Francisco and New York where prostitutes  —  recruited and
paid by the agency  —  would lure unsuspecting men and dose their drinks with
LSD. CIA agents observed the effects through one-way mirrors, taking notes on
the subjects' behavior while they were unknowingly under the influence of a
powerful hallucinogen. The operation ran from 1954 to 1966. White later wrote in
a letter: "I was a very minor missionary, actually a heretic, but I toiled whole-
heartedly in the vineyards because it was fun, fun, fun. Where else could a red-
blooded American boy lie, kill, cheat, steal, rape, and pillage with the sanction
and blessing of the All-Highest?"[6]`},{type:`text`,text:`The Death of Frank Olson
On November 28, 1953, Dr. Frank Olson  —  a U.S. Army biochemist who worked on
biological weapons at Fort Detrick, Maryland  —  fell to his death from the 13th
floor of the Statler Hotel in New York City. The CIA initially ruled his death a sui-
cide. Twenty-two years later, the Rockefeller Commission revealed that Olson had
been secretly dosed with LSD by Sidney Gottlieb nine days before his death, as
part of an MKUltra experiment at a retreat in Deep Creek Lodge, Maryland.[7]
In 1994, Olson's body was exhumed and examined by forensic pathologist James
Starrs of George Washington University. Starrs found a previously undetected cra-
nial injury consistent with a blow to the head  —  not consistent with a fall from a
window. The New York District Attorney opened a homicide investigation. In
2012, Olson's family filed a lawsuit against the CIA; the case was dismissed on pro-
cedural grounds in 2013. The family has maintained that Olson was murdered be-
cause he had witnessed extreme interrogation techniques  —  possibly including
the deaths of subjects  —  and had expressed a desire to leave the program.
◐ CIRCUMSTANTIAL  —  FORENSIC EVIDENCE
The 1994 exhumation found a cranial hematoma on Olson's skull inconsistent
with the official suicide narrative. Forensic pathologist James Starrs stated the
evidence was "rankly and starkly suggestive of homicide." The Manhattan DA
opened a homicide investigation but it was never resolved. The CIA paid the Olson
family $750,000 in 1975 and President Ford personally apologized  —  but the agency
has never declassified the full file on Olson's death.
The Cover-Up: Helms Orders Destruction
In January 1973, as the Watergate scandal was consuming the Nixon administra-
tion and Congressional investigations into intelligence abuses were gaining mo-`},{type:`text`,text:`mentum,  CIA  Director  Richard  Helms  ordered  Sidney  Gottlieb  to  destroy  all
MKUltra files. Gottlieb complied. Thousands of documents  —  detailing two dec-
ades of illegal human experimentation  —  were fed into shredders. The destruction
was nearly total. But 20,000 pages of financial records had been misfiled in a sep-
arate archive and escaped destruction. These pages were discovered in 1977 by
John  Marks,  an  investigative  journalist  and  former  State  Department  official,
through a Freedom of Information Act request.[8]
"The Deputy Director of the CIA revealed that over thirty
universities and institutions were involved in an 'extensive
testing and experimentation' program which included covert drug tests on unwitting citizens 'at all social levels, high
and low, native Americans and foreign.'"
SENATOR EDWARD KENNEDY, OPENING STATEMENT, SENATE SELECT COMMITTEE ON
INTELLIGENCE HEARINGS ON MKULTRA, AUGUST 3, 1977
The Institutional Network
MKUltra's reach extended across the most prestigious institutions in America.
The CIA funneled money through front organizations  —  including the Society for
the Investigation of Human Ecology, the Geschickter Fund for Medical Research,
and the Josiah Macy Jr. Foundation  —  to provide cover for grants to researchers
who often did not know the true source of their funding.`},{type:`text`,text:`INSTITUTION
INVOLVEMENT
DOCUMENTED
McGill University
Dr. Cameron's psychic driving experiments
Confirmed  —  Canadian govt.
settlement
Stanford University
LSD research (Ken Kesey was a volunteer subject)
Confirmed  —  Kesey's own
account
Columbia University
Psychological research contracts
Confirmed  —  FOIA records
Harvard University
Dr. Henry Murray's personality deconstruction
experiments (Ted Kaczynski was a subject)
Confirmed  —  Harvard
records
Emory University
Drug testing research
Confirmed  —  financial
records
University of
Oklahoma
LSD experiments on human subjects
Confirmed  —  FOIA records
Eli Lilly & Company
Synthesized LSD for CIA use
Confirmed  —  Church
Committee
Sandoz
Pharmaceuticals
Original LSD supplier to CIA
Confirmed  —  declassified
records
◐ CIRCUMSTANTIAL  —  THE HARVARD-KACZYNSKI CONNECTION
Ted Kaczynski  —  later known as the Unabomber  —  participated in a brutal psy-
chological experiment at Harvard from 1959 to 1962, run by Dr. Henry Murray.
Murray's experiment subjected undergraduate students to intense, prolonged psy-
chological abuse designed to break down their sense of identity. Murray had docu-
mented ties to the Office of Strategic Services (OSS), the CIA's predecessor. Whether
Murray's Harvard experiments were formally part of MKUltra remains disputed,
but the timing, methodology, and Murray's intelligence connections are consistent
with the program's documented objectives.`},{type:`text`,text:`The Pharmaceutical Connection
MKUltra established a pattern of government-pharmaceutical collaboration that
persists today. The CIA worked directly with major pharmaceutical companies  — 
Eli Lilly synthesized the agency's LSD supply after the original source (Sandoz
Pharmaceuticals in Switzerland) proved insufficient. The Geschickter Fund for
Medical Research, a CIA front, funneled money to researchers at Georgetown Uni-
versity  Hospital,  where  patients  were  used  as  unwitting  test  subjects  for
experimental drugs.[9]
This relationship between intelligence agencies and pharmaceutical companies  — 
in which human subjects are treated as experimental material and informed con-
sent is treated as an obstacle rather than a requirement  —  did not end with MKUl-
tra. It established an institutional culture in which the boundaries between gov-
ernment research, corporate profit, and individual rights became permanently
blurred. (See Chapter 17: Rockefeller Medicine for the broader history of this rela-
tionship.)
Consequences: Who Was Held Accountable?
The answer is: virtually no one. Sidney Gottlieb retired from the CIA in 1973 and
lived quietly until his death in 1999. Richard Helms was convicted of lying to Con-
gress about CIA activities in Chile  —  not about MKUltra  —  and received a suspen-
ded sentence and a $2,000 fine. No CIA officer was ever criminally prosecuted for
the MKUltra experiments. No university administrator who accepted CIA money
was  held  accountable.  No  pharmaceutical  executive  who  supplied  drugs  for
illegal human experiments faced charges.
The Olson family received $750,000 and a personal apology from President Gerald
Ford. The Canadian victims of Dr. Cameron received $100,000 each from the Cana-
dian government. The American victims  —  prisoners, mental patients, soldiers,`},{type:`text`,text:`and  ordinary  citizens  who  were  dosed  with  LSD  without  their  knowledge   — 
received nothing.
✗ DISPUTED  —  SCOPE OF THE PROGRAM
The full scope of MKUltra remains unknown because the vast majority of records
were destroyed. The 20,000 surviving pages are primarily financial records, not
operational files. Former CIA officers have suggested in interviews that the des-
troyed files contained documentation of experiments far more extreme than any-
thing in the surviving records  —  including experiments that resulted in deaths.
These claims cannot be verified because the evidence was deliberately destroyed
by the agency.
The Intelligence-Behavioral Control Pipeline
MKUltra's legacy extends beyond the specific experiments it conducted. The pro-
gram established a template for intelligence-linked behavioral manipulation that
appears repeatedly in subsequent decades. The use of sexual compromise as a tool
of intelligence control  —  documented in Operation Midnight Climax  —  bears strik-
ing  structural  similarities  to  the  operations  described  in  the  Epstein  Files
(Chapter 16). The use of prestigious academic institutions as cover for intelligence
operations  —  documented across MKUltra's 80+ institutional partners  —  mirrors
the pattern of elite institutional capture described throughout this book.
The connection to Robert Maxwell and the world of academic publishing is worth
noting. Maxwell's Pergamon Press  —  which became one of the world's largest aca-
demic publishers  —  controlled the journals and textbooks through which scientif-
ic knowledge was disseminated. Maxwell, whose daughter Ghislaine would later
become Jeffrey Epstein's primary associate, was identified by multiple intelli-
gence sources as an asset of Israeli intelligence (Mossad). The control of academic
publishing by intelligence-linked figures meant that the very institutions produ-
cing knowledge about psychology, pharmacology, and behavioral science were`},{type:`text`,text:`operating within a framework shaped by intelligence interests. (See Chapter 16:
Epstein Files for the full Maxwell connection.)
⬡ CROSS -
Intelligence behavioral manipulation → Ch. 16 (Epstein Files) · Pharmaceutic-
al-government partnerships → Ch. 17 (Rockefeller Medicine) · Academic insti-
tutional capture → Ch. 9 (Shadow Institutions) · Intelligence agency opera-
tions → Ch. 6 (Mossad) · Government accountability failures → Ch. 18 (Septem-
ber 11) · Maxwell/Pergamon academic publishing → Ch. 16 (Epstein Files) · Op-
eration Paperclip & Nazi scientists → Ch. 4 (Warburg Brothers & WWI)
★ T H E  L A R G E R  PAT T E R N
MKUltra proves that the United States government is capable of conducting
systematic, illegal experiments on its own citizens, destroying the evidence,
and facing no meaningful consequences. This is not a conspiracy theory  —  it is
a matter of Congressional record, confirmed by the CIA's own director under
oath. The question this chapter raises is not whether the government did this.
The question is what else it has done that we don't know about  —  because those
files were successfully destroyed.`},{type:`text`,text:`SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer-reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`U.S. Senate Select Committee on Intelligence, "Project MKUltra, the CIA's Program of Research in Behavioral Modification," Joint Hearing, August 3, 1977. Available at: intelligence.senate.gov`},{id:2,text:`John Marks, The Search for the Manchurian Candidate: The CIA and Mind Control (Times Books, 1979). Based on 16,000 pages of declassified CIA documents obtained through FOIA.`},{id:3,text:`Annie Jacobsen, Operation Paperclip: The Secret Intelligence Program That Brought Nazi Scientists to America (Little, Brown, 2014). National Archives, RG 263.`},{id:4,text:`CIA FOIA Reading Room, "MKUltra Collection." Declassified documents available at: cia.gov/readingroom/collection/mkultra`},{id:5,text:`CBC News, "MKUltra victims in Montreal-area file class-action lawsuit against federal government," November 2017. Canadian government settlement records.`},{id:6,text:`Nicholas M. Horrock, "Private Institutions Used in CIA Effort to Control Behavior," The New York Times, August 2, 1977. George Hunter White's letter quoted in John Marks' research.`},{id:7,text:`"Family in Scientist's Death Gets Apology and $750,000," The New York Times. James Starrs forensic examination report, George Washington University, 1994.`},{id:8,text:`Church Committee (Senate Select Committee to Study Governmental Operations with Respect to Intelligence Activities), Final Report, 1975-1976. U.S. Senate.`},{id:9,text:`"CIA Papers Detail Secret Experiments on Behavior Control," The Washington Post, August 1, 1977.`},{id:10,text:`H.P. Albarelli Jr., A Terrible Mistake: The Murder of Frank Olson and the CIA's Secret Cold War Experiments (Trine Day, 2009).`}],crossLinks:[{label:`Chapter 18: Operation Mockingbird`,chapterId:`chapter-18`},{label:`Chapter 20: Rockefeller Medicine`,chapterId:`chapter-20`}],keywords:[`MKUltra`,`CIA`,`mind control`,`LSD`,`experimentation`,`Church Committee`]},{id:`chapter-20`,number:`Chapter 20`,title:`Rockefeller Medicine & the Chronic Disease Machine`,subtitle:`How the Rockefeller Foundation reshaped American medicine to favor pharmaceutical treatment over prevention — and the financial incentives that keep the system in place.`,dateRange:`1910–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Rockefeller Medicine
How one family's oil fortune was used to reshape American medicine, eliminate natural healing traditions, and build a pharmaceutical empire that
profits from chronic illness.`},{type:`text`,text:`Rockefeller Medicine & The
Chronic Disease Machine
In 1910, a single report  —  funded by the richest man in America  —  transformed the practice of medicine from a diverse ecosystem of healing traditions into a pharmaceutical monoculture. The consequences are measured
in trillions of dollars and millions of preventable deaths.
Veritas Worldwide Press · Investigative Division · Updated March 2026 · Evidence tier: Verified / Circumstantial / Alleged
efore John D. Rockefeller reshaped American medicine, the United States
had  a  thriving  ecosystem  of  medical  traditions.  Homeopathic  physicians, naturopaths, herbalists, osteopaths, and eclectic practitioners operated alongside allopathic (conventional) doctors. Medical schools were diverse,
decentralized, and often community‐funded. Patients had choices. Then came the
Flexner Report  —  and everything changed.
★ W H Y  T H I S  
If you or someone you love takes daily medication for a chronic condition  — 
diabetes, high blood pressure, high cholesterol, depression, acid reflux  —  this
chapter explains how that became the default. The American medical system
was deliberately restructured to prioritize pharmaceutical treatment over prevention, nutrition, and natural remedies. Understanding this history is the
first step toward reclaiming your health.`},{type:`text`,text:`I. The Flexner Report: Medicine's Hostile Takeover
In 1910, Abraham Flexner  —  an educator with no medical degree and no medical
experience  —  published Medical Education in the United States and Canada, a report
commissioned by the Carnegie Foundation for the Advancement of Teaching and
funded in significant part by the Rockefeller Foundation.[1] The report evaluated
155  medical  schools  across  North  America  and  recommended  that  the  vast
majority be closed.
The stated goal was to "standardize" medical education around a scientific, laboratory‐based model. The actual effect was devastating: by 1935, the number of
medical schools in the United States had been reduced from 155 to 66  —  a loss of
more than half.[2] The schools that survived were overwhelmingly those that adopted a pharmaceutical‐based curriculum and accepted Rockefeller and Carnegie
funding.`},{type:`text`,text:`MEDICAL SCHOOLS
(1910)`},{type:`text`,text:`MEDICAL SCHOOLS
(1935)
-57%
SCHOOLS ELIMINATED
$78M+
ROCKEFELLER MEDICA
GRANTS
The casualties were specific. Homeopathic medical schools  —  which had been
thriving,  with  22  institutions  and  15,000  practitioners  in  1900   —   were
systematically defunded and closed.[3] Naturopathic schools were eliminated. Eclectic  medical  colleges,  which  taught  plant‐based  medicine,  were  shuttered.
Schools that served Black communities, including five of the seven Black medical
schools in the country, were closed.[2] What remained was a medical education
system built around one paradigm: diagnose disease, prescribe pharmaceutical
drugs.`},{type:`quote`,quote:{text:`The Flexner Report of 1910 transformed the nature and
process of medical education in America with a resulting
elimination of proprietary schools.`,attribution:`THOMAS P. DUFFY, M.D., YALE SCHOOL OF MEDICINE, 2011
✓ VERIFIED  —  CARNEGIE FOUNDATION ARCHIVES, HISTORICAL RECORD
The Flexner Report is a historical document available in full from the Carnegie
Foundation. The closure of medical schools is documented in AMA records and
academic histories. The Rockefeller Foundation's funding of medical education is
documented in its own annual reports and in E. Richard Brown's Rockefeller Medicine Men (1979), cited 929 times in academic literature.[4]
II. From Oil to Pharmaceuticals: The Rockefeller
Pipeline
John D. Rockefeller's interest in medicine was not philanthropic  —  it was strategic.
Rockefeller's Standard Oil empire had produced vast quantities of petrochemical
byproducts.  Many  pharmaceutical  drugs  are  synthesized  from  petrochemical
precursors. By funding a medical education system that prioritized pharmaceutical treatment, Rockefeller created a permanent market for products derived from
his core business.[4]`}},{type:`text`,text:`Standard Oil founded. John D. Rockefeller begins building the world's largest oil
monopoly, eventually controlling 90% of U.S. oil refining.`},{type:`text`,text:`Rockefeller Institute for Medical Research founded (now Rockefeller University).
The first biomedical research center in the United States, it set the template for
pharmaceutical‐oriented research.[5]`},{type:`text`,text:`Flexner Report published. Funded by Carnegie and Rockefeller interests, it triggers
the closure of 89 medical schools and the marginalization of all nonpharmaceutical medical traditions.[1]`},{type:`text`,text:`Rockefeller Foundation established. Over the next century, it distributes billions
in grants to medical schools, hospitals, and research institutions  —  all aligned with
the pharmaceutical model.[6]`},{type:`text`,text:`General Education Board (Rockefeller) appropriates over $78 million to medical
education, making it the largest private funder of medical schools in America.
Schools that accepted funding adopted Rockefeller‐approved curricula.[4]
1925–1940s
Rockefeller invests in I.G. Farben, the German pharmaceutical and chemical conglomerate that would later manufacture Zyklon B for the Nazi concentration
camps. Standard Oil and I.G. Farben maintained business partnerships through the
1930s.[7]
The Rockefeller Foundation's General Education Board did not simply fund medical schools  —  it reshaped them. Schools that accepted funding were required to`},{type:`text`,text:`adopt curricula emphasizing laboratory science, pharmacology, and surgery. Nutrition, herbal medicine, and preventive care were systematically removed from
medical training. By the 1950s, the average American medical student received
fewer than 20 hours of nutrition education across four years of medical school  —  a
deficit that persists to this day.[8]
◐ CIRCUMSTANTIAL  —  STRATEGIC INTENT VS. PHILANTHROPIC MOTIVE
The Rockefeller Foundation's own records document its funding of medical education. The closure of competing medical traditions is historical fact. What is interpretive is whether Rockefeller's motive was primarily philanthropic (improving
medical standards) or strategic (creating pharmaceutical markets). The pattern  — 
oil magnate funds medical system that depends on petrochemical‐derived drugs  — 
is suggestive but not conclusive proof of intent. See Chapter 5: Henry Ford & the
Gold Standard for parallel analysis of industrial‐era power consolidation.`},{type:`text`,text:`III. The Food-Pharma Pipeline
The modern chronic disease epidemic is not an accident. It is the predictable outcome of a food system designed to maximize shelf life and minimize cost, combined with a medical system designed to treat symptoms rather than causes. The
pipeline works as follows:
STEP 1: INDUSTRIAL FOOD CREATES THE PATIENT
The introduction of seed oils (beginning with Crisco in 1911), high‐fructose corn
syrup (commercialized in the 1970s), and ultra‐processed foods has fundamentally altered the American diet. Americans now derive approximately 60% of their
calories from ultra‐processed foods.[9] These products are engineered for palatability and addiction, not nutrition. The result: epidemic levels of obesity, diabetes,
heart disease, and autoimmune disorders.
STEP 2: THE MEDICAL SYSTEM MANAGES, NOT CURES
When patients develop chronic conditions from their diet, the medical system  — 
trained in the Rockefeller pharmaceutical model  —  prescribes drugs to manage
symptoms. Statins for cholesterol. Metformin for diabetes. SSRIs for depression.
Proton pump inhibitors for acid reflux. These drugs do not address root causes.
They create lifelong customers.
STEP 3: THE SAME COMPANIES PROFIT AT EVERY STAGE
A 2024 investigation by the Responsible Food Business Initiative found that major
pharmaceutical companies have significant investments in food companies, and
vice  versa.[10] The  same  institutional  investors   —   BlackRock,  Vanguard,  State
Street  —  hold major positions in both food conglomerates (PepsiCo, Nestlé, Kraft
Heinz) and pharmaceutical companies (Pfizer, Johnson & Johnson, Merck). The`},{type:`text`,text:`system is vertically integrated: the same capital profits from making you sick and
from treating your sickness.
COMPANY
SECTOR
REVENUE (2024)
TOP INSTITUTIONAL HOLDERS
Pfizer
Pharma
~$58.5B
Vanguard, BlackRock, State Street
Johnson & Johnson
Pharma
~$85.2B
Vanguard, BlackRock, State Street
PepsiCo
Food/Beverage
~$91.5B
Vanguard, BlackRock, State Street
Nestlé
Food/Beverage
~$100B
BlackRock, Vanguard (via funds)
Kraft Heinz
Food
~$26B
Berkshire Hathaway, Vanguard, BlackRock
Sources: SEC filings, corporate annual reports, 2024.
"Processed diets promoted by the food industry drive the
very diseases that pharmaceutical companies and hospitals
profit from treating."
 —  S.L. MORIN, HEALTH ECONOMICS AND MANAGEMENT REVIEW, 2025
IV. The Numbers Don't Lie
The United States spends more on healthcare than any nation in history  —   $4.5
trillion per year, or approximately 17.3% of GDP.[11] Yet by virtually every health
metric, Americans are sicker than citizens of comparable developed nations. This
paradox is not a failure of the system. It is the system working as designed.`},{type:`text`,text:`$4.5T
US HEALTHCARE
SPENDING/YEAR
60%
ADULTS WITH CHRONIC
DISEASE
42%
ADULT OBESITY RATE
$4.7B
PFIZER FINES SINCE`},{type:`text`,text:`PHARMACEUTICAL INDUSTRY REVENUE VS. FINES
COMPANY
LARGEST FINE
YEAR
REASON
REVENUE THAT YEAR
Pfizer
$2.3 billion`},{type:`text`,text:`Fraudulent marketing of Bextra
$50.0B
GlaxoSmithKline
$3.0 billion`},{type:`text`,text:`Fraud, failure to report safety data
$41.4B
Johnson & Johnson
$2.2 billion`},{type:`text`,text:`Off-label marketing of Risperdal
$71.3B
Abbott Labs
$1.5 billion`},{type:`text`,text:`Off-label promotion of Depakote
$39.9B
Merck
$950 million`},{type:`text`,text:`Illegal promotion of Vioxx
$48.0B
Sources: U.S. Department of Justice press releases, SEC filings, corporate annual reports.
In every case, the fine represented a fraction of the company's annual revenue  — 
typically between 3% and 7%. These are not punishments. They are the cost of doing business. The pharmaceutical industry has calculated that the profits from illegal marketing exceed the penalties, and they have been proven correct.
✓ VERIFIED  —  DEPARTMENT OF JUSTICE RECORDS
All pharmaceutical fines listed above are documented in U.S. Department of
Justice press releases and court records. Revenue figures are from SEC filings. The
pattern is consistent: pharmaceutical companies engage in illegal marketing, pay
fines that represent a small fraction of profits, and continue the same practices. 
See Chapter 12: The 2008 Crash for parallel analysis of the "fine as cost of business"
model in banking.`},{type:`text`,text:`V. What Your Doctor Was Never Taught
The average American medical student receives approximately 19.6 hours of nutrition  education  across  four  years  of  medical  school,  according  to  a  survey
published in Academic Medicine.[8] Many schools offer even less. Only 29% of U.S.
medical  schools  meet  the  minimum  25  hours  recommended  by  the  National
Academy of Sciences. This is not an oversight  —  it is the direct legacy of the Flexner Report's restructuring of medical education around pharmaceutical intervention.
The consequences are measurable. When patients present with Type 2 diabetes,
the standard of care is metformin  —  not a dietary intervention. When patients
present with high cholesterol, the standard of care is a statin  —  not an elimination
of seed oils and processed foods. When patients present with depression, the
standard of care is an SSRI  —  not an investigation into gut health, vitamin D levels,
or  omega‐3  deficiency.  The  system  treats  symptoms  because  the  system  was
designed to treat symptoms.
THE SEED OIL TIMELINE
YEAR
EVENT
IMPACT`},{type:`text`,text:`Procter & Gamble launches Crisco
First hydrogenated seed oil enters American kitchens`},{type:`text`,text:`AHA begins recommending vegetable oils
Seed oils rebranded as "heart-healthy"`},{type:`text`,text:`Ancel Keys' Seven Countries Study
Saturated fat falsely blamed for heart disease`},{type:`text`,text:`McGovern Committee dietary guidelines
U.S. government recommends low-fat, high-carb diet
1980s
HFCS replaces sugar in processed foods
Obesity epidemic begins accelerating`},{type:`text`,text:`Soybean oil = dominant cooking oil
1,000x increase in consumption since 1900
2020s
Seed oils in 60%+ of packaged foods
Americans get ~20% of calories from seed oils`},{type:`text`,text:`The correlation between the introduction of seed oils and the rise of chronic disease is striking. Obesity rates were below 15% in the United States before 1980.
The dietary guidelines of 1977  —  which recommended replacing animal fats with
vegetable oils and increasing carbohydrate intake  —  preceded the steepest rise in
obesity,  diabetes,  and  heart  disease  in  American  history.  By  2022,  42%  of
American adults were obese.[12]
◐ CIRCUMSTANTIAL  —  CORRELATION AND CONFOUNDING VARIABLES
The temporal correlation between dietary guideline changes, seed oil adoption,
and chronic disease rates is well‐documented. However, multiple confounding
variables exist: increased sedentary lifestyles, portion sizes, stress, environmental
toxins, and changes in food processing. The seed oil hypothesis is supported by
emerging research but remains contested within mainstream nutrition science.
The reader should evaluate the evidence independently.
VI. The Machine Today
The chronic disease machine that Rockefeller's reforms set in motion over a century ago has only grown more efficient. The pharmaceutical industry now spends
more on marketing than on research and development. In 2020, the industry
spent an estimated $6.58 billion on direct‐to‐consumer advertising in the United
States alone  —  a practice that is illegal in every other developed nation except
New Zealand.[13]
The revolving door between the FDA and the pharmaceutical industry ensures
regulatory capture. A 2018 study published in the  British Medical Journal found
that 11 of 16 FDA reviewers who approved cancer drugs between 2006 and 2010
went  on  to  work  for  the  companies  whose  drugs  they  had  approved.[14] This
pattern of regulatory personnel moving to the industries they previously oversaw
has been documented across multiple federal agencies.`},{type:`text`,text:`Albert Bourla, the current Chairman and CEO of Pfizer, is a veterinarian by training  —  not a physician or pharmacologist. Under his leadership, Pfizer reported
$100.3 billion in revenue in 2022, driven primarily by COVID‐19 vaccines and
treatments.[15] Bourla's total compensation in 2022 exceeded $33 million. The company  he  leads  has  paid  $4.7  billion  in  fines  since  2000  for  illegal  marketing,
bribery, and fraud.[16]
THE GATEKEEPER: ROBERT MAXWELL & ACADEMIC PUBLISHING
The medical knowledge pipeline that Rockefeller built has a gatekeeper most
people have never heard of. Robert Maxwell  —  born Ján Ludvík Hyman Binyamin
Hoch in Czechoslovakia, later a British media baron and documented Mossad intelligence asset  —  built Pergamon Press into one of the world's largest academic
publishers. By the 1980s, Pergamon controlled hundreds of scientific and medical
journals, including titles that shaped pharmaceutical research and clinical practice. Maxwell pioneered the model of charging researchers to publish and charging institutions to access the results  —  a double‐extraction model that generates
billions annually.
After Maxwell's death in 1991, his publishing empire was absorbed into what became  Elsevier  —  now the world's largest academic publisher with over 2,700
journals and $3.5 billion in annual revenue. Elsevier publishes  The Lancet,  Cell,
and hundreds of medical journals that determine which research gets seen and
which gets buried. Robert Maxwell's daughter, Ghislaine Maxwell, was convicted
in 2021 of sex trafficking minors in connection with Jeffrey Epstein. The man who
built the infrastructure controlling what medical research gets published was the
father  of  one  of  the  most  notorious  figures  in  modern  criminal  history.  (See
Chapter 16: Epstein Files.)`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`,text:`(2002). His control of Pergamon Press gave him influence over scientific publishing, but direct editorial manipulation of individual studies has not been documented. The structural concern is that the commercial publishing model he created  —  now controlled by Elsevier, Springer Nature, and Wiley  —  creates financial
incentives that can bias which research gets published and which gets suppressed.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
Medical historians generally credit the Flexner Report with modernizing American
medical education by closing substandard schools and establishing evidenceb`}},{type:`text`,text:`★ W H AT  Y O U  C A N  D O
The data presented in this chapter invites further inquiry. Readers interested
in pursuing this subject may wish to: (1) Review the ingredient labels of commonly consumed processed foods, particularly regarding seed oil content. (2)
Examine the nutrition curriculum requirements at accredited medical
schools. (3) Research the ownership structures of major pharmaceutical companies through SEC filings. (4) Consult peer‐reviewed literature on the relationship between dietary changes and chronic disease prevalence. The documentary record is publicly available for independent verification.
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Flexner, A.,  Medical Education in the United States and Canada, Carnegie Foundation for the Advancement of Teaching, Bulletin No. 4, 1910. wikipedia.org`},{id:2,text:`Duffy, T.P., "The Flexner Report  —  100 Years Later," Yale Journal of Biology and Medicine, 84(3), 2011, pp. 269-276. nih.gov`},{id:3,text:`Cureus, "Rockefeller, the Flexner Report, and the American Medical Association: The Contentious Relationship Between Conventional Medicine and Homeopathy in America," July 2025. nih.gov`},{id:4,text:`Brown, E.R., Rockefeller Medicine Men: Medicine and Capitalism in America, University of California Press, 1979. Cited 929 times in academic literature.`},{id:5,text:`Rockefeller University, "Our History." rockefeller.edu`},{id:6,text:`Philanthropy Roundtable, "Rockefeller's Other Pipeline." philanthropyroundtable.org`},{id:7,text:`Borkin, J., The Crime and Punishment of I.G. Farben, Free Press, 1978. Standard Oil-I.G. Farben partnership documented in U.S. Senate hearings, 1942.`},{id:8,text:`Adams, K.M. et al., "Nutrition Education in U.S. Medical Schools: Latest Update of a National Survey," Academic Medicine, 85(9), 2010, pp. 1537-1542.`},{id:9,text:`Martínez Steele, E. et al., "Ultra-processed foods and added sugars in the US diet," BMJ Open, 2016.`},{id:10,text:`Responsible Food Business Initiative, "Big Pharma's Hidden Role in the Food Industry," December 30, 2024. responsible- foodbusiness.org`},{id:11,text:`KFF Health System Tracker, "How has the burden of chronic diseases in the U.S. and peer nations changed over time?" April 16, 2025. kff.org`},{id:12,text:`CDC, National Health and Nutrition Examination Survey (NHANES), 2017-2020 data. Obesity prevalence: 42.4% (2017-2020).`},{id:13,text:`Schwartz, L.M. & Woloshin, S., "Medical Marketing in the United States, 1997-2016," JAMA, 321(1), 2019.`},{id:14,text:`Bien, J. & Prasad, V., "Future jobs of FDA's haematology-oncology reviewers," BMJ, 2018.`},{id:15,text:`Pfizer Inc. Annual Report 2022, SEC filing. Revenue: $100.3 billion. CEO compensation: $33.1 million.`},{id:16,text:`U.S. Department of Justice, "Justice Department Announces Largest Health Care Fraud Settlement in Its History," September 2, 2009. Cumulative Pfizer fines compiled from DOJ records, 2000-2024.`}],crossLinks:[{label:`Chapter 21: Vaccine History`,chapterId:`chapter-21`},{label:`Chapter 24: Fluoride & Public Water`,chapterId:`chapter-24`}],keywords:[`Rockefeller`,`medicine`,`pharmaceutical`,`Flexner Report`,`chronic disease`,`healthcare`]},{id:`chapter-21`,number:`Chapter 21`,title:`Vaccine History — From Polio to COVID-19`,subtitle:`A documented history of vaccine development, the regulatory framework that governs it, and the financial incentives that shape public health policy.`,dateRange:`1955–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Vaccine History: From Polio to
COVID-19
A strictly evidence-based examination of vaccine development, legal
immunity, injury compensation, and the expansion of the pharmaceutical
profit model  —  citing only court records, government databases, and peer-
reviewed studies.`},{type:`text`,text:`★ W H Y  T H I S  
If you have children, they are required to receive dozens of vaccine doses before they can attend school in most states. The companies that manufacture
these products cannot be sued if their products injure or kill your child  —  a
legal protection granted by Congress in 1986 that exists for no other product in
America. The government maintains a database of adverse events and a compensation program that has paid billions of dollars to victims. These are not
conspiracy theories. They are facts of law, documented in the U.S. Code and the
Federal Register. You have a right to know them.
$4.7B+
PAID TO VACCINE
INJURY VICTIMS (NVICP,
1988–2024)
72+
VACCINE DOSES BY AGE
18 (2024 CDC
SCHEDULE)`},{type:`text`,text:`YEAR PHARMA GRANTED
LEGAL IMMUNITY`},{type:`text`,text:`OTHER PRODUCTS WIT
LIABILITY SHIELD`},{type:`text`,text:`O
n April 12, 1955, Dr. Jonas Salk's polio vaccine was declared "safe, effective,  and  potent"  following  the  largest  public  health  experiment  in
American history  —  a field trial involving 1.8 million children. The announcement was met with jubilation. Church bells rang across the country. Salk
was hailed as a national hero. Within two weeks, however, the celebration turned
to horror. Cutter Laboratories, one of five companies licensed to produce the vaccine, had distributed batches containing live, virulent poliovirus. Approximately
40,000 children developed abortive poliomyelitis. 200 were paralyzed. 10 died.
The incident  —  known as the Cutter Incident  —  was the worst pharmaceutical
disaster in American history at that time.[1]
The Cutter Incident established a pattern that would repeat throughout the history of American vaccination: a product is rushed to market under enormous
public pressure, adverse events occur, the government and industry respond by
minimizing the scope of the problem, and the fundamental question  —  whether
the regulatory framework is adequate to protect the public  —  is never seriously
addressed.  Seventy  years  later,  that  pattern  reached  its  apotheosis  with  the
COVID‐19 vaccine rollout.
✓ VERIFIED  —  HISTORICAL RECORD
The Cutter Incident is thoroughly documented. Paul Offit, a vaccine advocate and
inventor of the rotavirus vaccine, wrote the definitive account: The Cutter Incident:
How America's First Polio Vaccine Led to the Growing Vaccine Crisis (Yale University
Press, 2005). The incident resulted in the creation of what became the Division of
Biologics Standards, a precursor to modern FDA vaccine regulation.
SV40: The Contamination No One Talks About
Between 1955 and 1963, an estimated 98 million Americans received polio vaccines contaminated with Simian Virus 40 (SV40)  —  a monkey virus present in the
rhesus monkey kidney cells used to grow the vaccine. SV40 was discovered in`},{type:`text`,text:`1960 by Dr. Bernice Eddy at the National Institutes of Health, who found that the
virus caused tumors in hamsters. Despite Eddy's warnings, the contaminated vaccines continued to be administered for three more years. The full scope of the
contamination was not publicly acknowledged until decades later.[2]
SV40 has since been detected in several types of human cancers, including mesothelioma, brain tumors, and bone cancers. A 2002 study published in The Lancet
found SV40 DNA in 43% of non‐Hodgkin lymphoma samples tested. The National
Cancer Institute has acknowledged the contamination but maintains that "the majority of studies... have not found increased cancer risk." The debate continues in
peer‐reviewed literature, with researchers divided on whether the contamination
has contributed to cancer rates in the exposed population.
◐ CIRCUMSTANTIAL  —  SV40 AND CANCER
The contamination of polio vaccines with SV40 is confirmed. Whether this contamination has contributed to cancer in humans remains debated in peer‐reviewed literature. Multiple studies have detected SV40 DNA in human tumors. The
Institute of Medicine (now National Academy of Medicine) concluded in 2002 that
"the biological evidence is of moderate strength that SV40 exposure could lead to
cancer in humans under natural conditions." This is not a settled question.
The 1986 Act: Legal Immunity for Pharma
By the mid‐1980s, vaccine manufacturers faced a crisis. Lawsuits from families of
children injured by the DTP (diphtheria, tetanus, pertussis) vaccine were driving
up insurance costs and threatening to make vaccine production unprofitable.
Rather than improve vaccine safety, the pharmaceutical industry lobbied Congress for legal protection. The result was the National Childhood Vaccine Injury
Act of 1986 (NCVIA), signed by President Ronald Reagan on November 14, 1986.[3]`},{type:`text`,text:`The Act created a legal framework unlike anything else in American product liability law. Vaccine manufacturers were granted immunity from civil lawsuits for
injuries or deaths caused by their products. In exchange, the Act established the
National Vaccine Injury Compensation Program (NVICP)  —  a no‐fault system funded by a $0.75 excise tax on each vaccine dose, paid by consumers. The Act also
created the Vaccine Adverse Event Reporting System (VAERS) to track adverse
events.
"No vaccine manufacturer shall be liable in a civil action for
damages arising from a vaccine-related injury or death associated with the administration of a vaccine after October
1, 1988."
42 U.S.C. § 300AA-22(B)(1)  —  NATIONAL CHILDHOOD VACCINE INJURY ACT OF 1986
The Supreme Court affirmed this immunity in Bruesewitz v. Wyeth LLC (2011), ruling 6‐2 that the 1986 Act preempts all design‐defect claims against vaccine manufacturers. Justice Sotomayor, in dissent, wrote that the majority's interpretation
"leaves a regulatory vacuum in which no one  —  neither the FDA nor any other federal agency, nor state and federal juries  —  ensures that vaccine manufacturers
adequately take account of scientific and technological advancements."[4]`},{type:`text`,text:`YEAR
CDC RECOMMENDED DOSES
(BIRTH TO 18)
VACCINES ON SCHEDULE
NVICP PAYOUTS
(CUMULATIVE)`},{type:`text`,text:`24 doses of 7 vaccines
DTP, Polio, MMR
N/A (program not yet
created)`},{type:`text`,text:`24 doses of 7 vaccines
DTP, Polio, MMR
$0 (Act signed)`},{type:`text`,text:`33 doses of 9 vaccines
Added: Hep B, Hib, Varicella
$724 million`},{type:`text`,text:`48 doses of 14 vaccines
Added: PCV, Hep A, Influenza,
Rotavirus
$1.8 billion`},{type:`text`,text:`69 doses of 16 vaccines
Added: HPV, Meningococcal,
Tdap
$3.1 billion`},{type:`text`,text:`72+ doses of 16 vaccines
Current schedule
$4.7+ billion
VAERS: The System Designed to Fail
The Vaccine Adverse Event Reporting System (VAERS), created by the 1986 Act, is
a passive surveillance system  —  meaning it relies on voluntary reports from
healthcare providers, patients, and families. A 2010 study commissioned by the
Department of Health and Human Services and conducted by Harvard Pilgrim
Health Care found that "fewer than 1% of vaccine adverse events are reported" to
VAERS. The study, known as the Lazarus Report, was funded by the Agency for
Healthcare Research and Quality (AHRQ) under grant number R18 HS 017045.[5]
This means that the government's own data on vaccine adverse events captures,
by its own contractor's estimate, less than 1% of actual events. Despite this acknowledged limitation, VAERS data is routinely cited by public health officials as
evidence that vaccines are safe  —  while simultaneously being dismissed as unreliable when it shows concerning signals. This contradiction is not accidental. It is
structural.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`On December 11, 2020, the FDA issued an Emergency Use Authorization (EUA) for
the Pfizer‐BioNTech COVID‐19 vaccine  —  the fastest vaccine development timeline
in history, compressing what normally takes 10‐15 years into approximately 11
months. The EUA was issued under 21 U.S.C. § 360bbb‐3, which allows the FDA to
authorize  unapproved  medical  products  during  a  declared  emergency.  Under
EUA, the normal requirements for clinical trial duration, long‐term safety data,
and manufacturing quality controls were significantly relaxed.[6]
Pfizer's  clinical  trial  enrolled  approximately  44,`}},{type:`text`,text:`METRIC
STANDARD VACCINE DEVELOPMENT
COVID-19 (OPERATION WARP SPEED)
Development Timeline
10–15 years
11 months
Clinical Trial Duration
3–6 years (Phase I–III)
~2 months median follow-up
Long-term Safety Data
Required before approval
Not available at EUA
Manufacturer Liability
Shielded under 1986 Act
Additional PREP Act immunity
Regulatory Pathway
Full BLA approval
Emergency Use Authorization
FOIA Transparency
Standard disclosure
FDA sought 75-year delay
MYOCARDITIS SIGNAL
By mid‐2021, a safety signal for myocarditis (inflammation of the heart muscle)
emerged  in  young  males  following  mRNA  COVID‐19  vaccination.  A  study
published  in  JAMA  Cardiology in  August  2022  found  that  the  incidence  of
myocarditis following mRNA vaccination was approximately 1 in 6,000 to 1 in
10,000 in males aged 16‐24  —  significantly higher than the background rate. The
CDC's Advisory Committee on Immunization Practices (ACIP) acknowledged the
signal but continued to recommend vaccination for this age group, concluding
that the benefits outweighed the risks.[8]
Multiple countries  —  including Denmark, Sweden, Finland, Norway, and France  — 
restricted or suspended the use of the Moderna mRNA vaccine in young males
due to the myocarditis risk. The United States did not follow suit.
◐ CIRCUMSTANTIAL  —  RISK-BENEFIT CALCULATION
The myocarditis signal in young males is confirmed by peer‐reviewed research
and acknowledged by the CDC. The debate is not over whether the signal exists
but over whether the risk‐benefit calculation justified continued recommendation
for this demographic. Multiple European countries concluded it did not. The U.S.
maintained its recommendation. The long‐term cardiac outcomes for young
people who developed vaccine‐associated myocarditis remain unknown as of 2026.`},{type:`text`,text:`The Profit Model
The vaccine market has grown from approximately $5 billion in 2000 to over $60
billion in 2023. Pfizer alone reported $37.8 billion in COVID‐19 vaccine revenue in
2022   —   making  Comirnaty  the  highest‐grossing  pharmaceutical  product  in  a
single  year  in  history.  The  company's  CEO,  Albert  Bourla,  received  total
compensation of $33 million in 2022.[9]
The profit model is straightforward: vaccines are recommended (and in many
cases mandated) by government agencies, purchased with taxpayer funds, administered to the entire population including children, and their manufacturers
bear zero liability for any harm they cause. There is no other product category in
the American economy that operates under these conditions. The pharmaceutical
industry spent $374 million on lobbying in 2022  —  more than any other industry  — 
to maintain this arrangement.
"It is difficult to get a man to understand something when
his salary depends on his not understanding it."
UPTON SINCLAIR (FREQUENTLY CITED IN VACCINE SAFETY DEBATES)
The Academic Publishing Pipeline
The pharmaceutical industry's influence extends beyond lobbying and into the
academic literature that forms the basis of vaccine policy. Industry‐funded studies are more likely to report favorable results than independently funded studies
 —  a phenomenon documented in a 2003 BMJ systematic review. The journals that
publish these studies are themselves part of a publishing ecosystem with deep
industry ties.`},{type:`text`,text:`It is worth noting that Robert Maxwell  —  father of Ghislaine Maxwell and a documented intelligence asset  —  built Pergamon Press into one of the world's largest
academic publishers, controlling hundreds of scientific journals. Maxwell's publishing empire, which later became part of Elsevier (now the world's largest academic  publisher),  established  the  model  by  which  scientific  knowledge  is
gatekept by commercial publishers with their own financial interests. The same
journals that publish vaccine safety studies are owned by companies that depend
on pharmaceutical advertising revenue. (See Chapter 16: Epstein Files for the full
Maxwell connection.)
M AINSTREAM POSITION & COUNTER-ARGUMENTS
The mainstream medical consensus, supported by organizations including the
WHO, CDC, and virtually every national medical association, is that vaccines are
among the most effective public health interventions in history, preventing millions of deaths annually. The 1986 National Childhood Vaccine Injury Act was designed to ensure vaccine supply stability while providing a compensation mechanism for the rare cases of adverse events. The reader should note that the documented concerns about specific vaccines, manufacturing processes, and regulatory oversight do not constitute evidence against vaccination as a public health
practice. The evidence is presented for independent evaluation.
⬡ CROSS -
Pharmaceutical profit model → Ch. 17 (Rockefeller Medicine) · Regulatory capture → Ch. 0 (The World Today) · Maxwell/Pergamon academic publishing →
Ch. 16 (Epstein Files) · Pharmaceutical lobbying → Ch. 12 (AIPAC Lobby  —  lobbying mechanics) · Government‐pharma partnerships → Ch. 21 (MKUltra) · 
Corporate liability shields → Ch. 11 (2008 Crash  —  bank bailouts)`},{type:`text`,text:`★ T H E  L A R G E R  PAT T E R N
The vaccine story is not fundamentally about vaccines. It is about a system in
which corporations that cause harm are shielded from accountability, in
which the government agencies tasked with protecting the public are captured
by the industries they regulate, and in which the academic institutions that
should provide independent oversight are funded by the same corporations
whose products they evaluate. This is the same pattern documented throughout this book  —  from central banking to media ownership to food production.
The product changes. The structure does not.
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Paul A. Offit, The Cutter Incident: How America's First Polio Vaccine Led to the Growing Vaccine Crisis (Yale University Press, 2005). See also: Nathanson & Langmuir, "The Cutter Incident," American Journal of Hygiene, 1963.`},{id:2,text:`Vilchez RA, Butel JS, "Emergent Human Pathogen Simian Virus 40 and Its Role in Cancer," Clinical Microbiology Reviews, 2004;17(3):495-508. See also: Shah K, Nathanson N, "Human Exposure to SV40," American Journal of Epidemiology, 1976.`},{id:3,text:`National Childhood Vaccine Injury Act of 1986, Pub. L. 99-660, Title III, 42 U.S.C. §§ 300aa-1 to 300aa-34. Full text available at congress.gov.`},{id:4,text:`Bruesewitz v. Wyeth LLC, 562 U.S. 223 (2011). Supreme Court opinion and Justice Sotomayor's dissent available at supremecourt.gov.`},{id:5,text:`Lazarus R, et al., "Electronic Support for Public Health  —  Vaccine Adverse Event Reporting System (ESP:VAERS)," Grant Final Report, AHRQ Grant R18 HS 017045, 2010.`},{id:6,text:`FDA, "Pfizer-BioNTech COVID-19 Vaccines," Emergency Use Authorization documents, December 11, 2020. Available at fda.gov.`},{id:7,text:`Public Health and Medical Professionals for Transparency, "Pfizer's Documents." Court-ordered FOIA release. See also: Public Health and Medical Professionals for Transparency v. FDA, Case No. 4:21-cv-01058 (N.D. Tex.).`},{id:8,text:`Oster ME, et al., "Myocarditis Cases Reported After mRNA-Based COVID-19 Vaccination in the US," JAMA Cardiology, 2022;7(4):e220327.`},{id:9,text:`Pfizer Inc., Annual Report (Form 10-K), FY 2022. SEC EDGAR filing. Revenue and compensation data from proxy statement.`},{id:10,text:`HRSA, "National Vaccine Injury Compensation Program Data," updated monthly. Available at hrsa.gov/vaccine- compensation/data.`}],crossLinks:[{label:`Chapter 20: Rockefeller Medicine`,chapterId:`chapter-20`},{label:`Chapter 22: September 11, 2001`,chapterId:`chapter-22`}],keywords:[`vaccines`,`polio`,`COVID-19`,`pharmaceutical`,`FDA`,`public health`]},{id:`chapter-22`,number:`Chapter 22`,title:`September 11, 2001`,subtitle:`The event that changed the world — examined through the official record, the 9/11 Commission Report, and the questions that remain unanswered.`,dateRange:`2001`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`September 11, 2001
The official narrative, the unanswered questions, the classified documents,
and the evidence that the 9/11 Commission chose to ignore  —  examined to
investigative journalism standards.`},{type:`text`,text:`September 11, 2001
On the morning of September 11, 2001, four commercial airliners were hijacked and used as weapons against the United States. 2,977 people were
killed.  The  official  investigation  that  followed  left  more  questions  than
answers  —  and the classified documents that were finally released tell a story
the Commission never intended the public to hear.
Veritas Worldwide Press · Investigative Division · Updated March 2026 · Evidence tier: Verified / Circumstantial / Alleged
his chapter is not a conspiracy theory. It is a compilation of verified
facts, declassified documents, congressional testimony, and investigative journalism from credible sources  —  including the 9/11 Commission's
own report, the 28 classified pages (partially declassified in 2016), FBI records,
and reporting from the New York Times, Washington Post, and BBC. Every claim
is  sourced.  Every  piece  of  evidence  is  classified  according  to  our  three‐tier
system. The reader is invited to verify everything independently.
★ W H Y  T H I S  
September 11 was used to justify two decades of war, the creation of the Department of Homeland Security, the passage of the PATRIOT Act (which authorized mass surveillance of American citizens), the invasion of Iraq (which had
no connection to the attacks), and the expenditure of over $8 trillion in military spending. Every American alive today lives in the post‐9/11 security state.
Understanding what actually happened  —  and what was deliberately concealed  —  is essential to understanding the world you live in.`},{type:`text`,text:`I. The Official Timeline
TIME (ET)
EVENT
DETAILS
8:46 AM
AA Flight 11 hits WTC North Tower
Boeing 767, 92 aboard, floors 93-99
9:03 AM
UA Flight 175 hits WTC South Tower
Boeing 767, 65 aboard, floors 77-85
9:37 AM
AA Flight 77 hits the Pentagon
Boeing 757, 64 aboard, west wall
9:59 AM
WTC South Tower collapses
56 minutes after impact
10:03 AM
UA Flight 93 crashes in Shanksville, PA
Boeing 757, 44 aboard
10:28 AM
WTC North Tower collapses
102 minutes after impact
5:20 PM
WTC Building 7 collapses
Not hit by any aircraft
2,977
PEOPLE KILLED`},{type:`heading`,text:`Hijacked Aircraft`},{type:`text`,text:`NAMED HIJACKERS
$8T+
POST-9/11 WAR
SPENDING
The 9/11 Commission Report, released on July 22, 2004, concluded that the attacks
were planned and executed by al‐Qaeda under the direction of Osama bin Laden,
with 19 hijackers  —  15 of whom were Saudi nationals.[1] The Commission's mandate was to provide "a full and complete accounting" of the attacks. Whether it
fulfilled that mandate is the subject of this chapter.
II. The 28 Classified Pages
For fourteen years, 28 pages of the Joint Congressional Inquiry into 9/11 were classified at the highest level. These pages  —  known simply as "the 28 pages"  —  dealt
with the role of Saudi Arabia in financing and supporting the hijackers. Despite`},{type:`text`,text:`bipartisan calls for their release, Presidents Bush and Obama both refused to declassify them. In July 2016, a heavily redacted version was finally released.[2]
The declassified pages revealed that Saudi government officials  —  including diplomats and intelligence officers stationed in the United States  —  had direct contact
with at least two of the hijackers (Nawaf al‐Hazmi and Khalid al‐Mihdhar) after
their arrival in San Diego in January 2000. The pages documented financial support flowing from Saudi government accounts to intermediaries who assisted the
hijackers with housing, transportation, and flight school enrollment.[2]
✓ VERIFIED  —  DECLASSIFIED CONGRESSIONAL DOCUMENTS
The 28 pages are now partially public record, available through the Office of the
Director of National Intelligence. The Saudi connections described above are documented in the declassified text. The 9/11 Commission acknowledged these connections but concluded  —  controversially  —  that they did not constitute evidence of
Saudi government complicity. Former Senator Bob Graham, who co‐chaired the
Joint Inquiry, publicly stated that the evidence of Saudi involvement was "incontrovertible."[3]
III. September 10, 2001
On September 10, 2001  —  one day before the attacks  —  Secretary of Defense Donald
Rumsfeld held a press conference at the Pentagon. His announcement received
virtually  no  media  coverage  in  the  aftermath  of  the  following  day's  events.
Rumsfeld stated:`},{type:`quote`,quote:{text:`According to some estimates, we cannot track $2.3 trillion
in transactions.`,attribution:`SECRETARY OF DEFENSE DONALD RUMSFELD, SEPTEMBER 10, 2001
The following morning, American Airlines Flight 77 struck the Pentagon's west
wall  —  specifically, the section of the building that housed the offices of the
Army's  financial  management  and  audit  teams  who  were  investigating  the
missing funds.[4] The attack killed 125 Pentagon personnel, including many of the
accountants and budget analysts working on the audit. The investigation into the
missing $2.3 trillion was never completed.
✓ VERIFIED  —  C-SPAN BROADCAST, PENTAGON RECORDS
Rumsfeld's September 10 statement is preserved in C‐SPAN archives and was reported by CBS News. The location of the Pentagon impact  —  the recently renovated
Wedge 1, which housed Army financial offices  —  is documented in the Pentagon
Building Performance Report. The $2.3 trillion figure was confirmed by the
Department of Defense Inspector General.
◐ CIRCUMSTANTIAL  —  COINCIDENCE VS. TARGETING
The fact that the Pentagon strike hit the specific section housing the financial audit
team is documented. Whether this was coincidental or deliberate targeting is unproven. The official narrative attributes the flight path to the hijacker's approach
angle. Critics note that the west wall was the least occupied section of the Pentagon
(due to renovations) and the most difficult to reach from the air.`}},{type:`text`,text:`IV. The Financial Anomalies
PUT OPTIONS ON AIRLINES
In the days before September 11, an unusual volume of "put options"  —  financial
instruments that profit when a stock's price falls  —  were placed on United Airlines
and American Airlines stock. The volume was 6 to 11 times the normal daily average.[5] Put options on United Airlines stock increased by 285% on September 6. Put
options  on  American  Airlines  stock  increased  by  60  times  the  average  on
September 10.[5]
The 9/11 Commission investigated the put options and concluded that they were
"innocuous"   —   placed  by  a  single  U.S.‐based  institutional  investor  with  "no
conceivable ties to al‐Qaeda."[1] The Commission did not name the investor. The
SEC's investigation was classified. No one was charged.
Pre-9/11 Put Options  —  Statistical Analysis
UNRESOLVED
United Airlines (UAL): 4,744 put options purchased on September 6 vs. 396 call options. Ratio: 12:1 (normal
is ~1:1).
American Airlines (AMR): 4,516 put options purchased on September 10 vs. 748 call options. Ratio: 6:1.
Morgan Stanley (WTC tenant): 2,157 put options purchased Sept 6-7 vs. 27 average daily. Increase: 80x.
Merrill Lynch (WTC tenant): 12,215 put options purchased Sept 6-7 vs. 252 average daily. Increase: 48x.
Sources: SEC investigation records (classified); Bloomberg data; Chicago Board Options Exchange records.[5]
THE SILVERSTEIN LEASE
On July 24, 2001  —  six weeks before the attacks  —  Larry Silverstein and his partners acquired a 99‐year lease on the World Trade Center complex from the Port
Authority of New York and New Jersey for $3.2 billion. It was the first time in the`},{type:`text`,text:`WTC's 33‐year history that the complex had been privatized.[6] Silverstein immediately insured the complex for $3.55 billion. After the attacks, Silverstein argued
that the two plane strikes constituted two separate "occurrences" and sought $7.1
billion in insurance payouts. He ultimately received approximately $4.55 billion.
[6]
✓ VERIFIED  —  COURT RECORDS, PORT AUTHORITY DOCUMENTS
The Silverstein lease, its timing, the insurance terms, and the subsequent litigation
are all matters of public court record. Silverstein Properties v. Hartford Financial
Services Group was decided in federal court. The $4.55 billion payout is documented.
V. World Trade Center Building 7
At 5:20 PM on September 11, 2001, World Trade Center Building 7  —  a 47‐story
steel‐framed skyscraper  —  collapsed into its own footprint in approximately 6.5
seconds. Building 7 was not struck by any aircraft.[7] It was located across the
street from the Twin Towers. The official explanation, issued by the National Institute of Standards and Technology (NIST) in 2008  —  seven years after the event  — 
attributed the collapse to "normal office fires."[7]
Building 7 is the only steel‐framed high‐rise in history to have collapsed due to
fire alone. No steel‐framed building before or since has experienced total structural failure from fire. The collapse exhibited characteristics consistent with controlled  demolition:  symmetrical  descent,  near‐free‐fall  acceleration  (NIST  acknowledged 2.25 seconds of free fall), and complete structural failure.[7]`},{type:`text`,text:`WHAT WAS INSIDE BUILDING 7
TENANT
FLOORS
SIGNIFICANCE
SEC (Securities & Exchange
Commission)
11, 12,`},{type:`text`,text:`Files for ongoing investigations including Enron,
WorldCom
CIA`},{type:`text`,text:`Largest CIA station outside Langley
Secret Service
9, 10
New York field office
IRS
24, 25
Regional offices
DoD`},{type:`text`,text:`Office of Emergency Management
Salomon Smith Barney
28-45
Major financial institution
NYC Emergency Management`},{type:`text`,text:`Giuliani's "bunker"  —  fortified command center
The SEC's offices in Building 7 contained files related to numerous ongoing investigations, including cases against Enron, WorldCom, and Citigroup. After the building's collapse, the SEC acknowledged that thousands of case files were destroyed.
[8]
"I remember getting a call from the fire department commander, telling me that they were not sure they were gonna
be able to contain the fire, and I said, 'We've had such terrible loss of life, maybe the smartest thing to do is pull it.'
And they made that decision to pull and we watched the
building collapse."
 —  LARRY SILVERSTEIN, PBS DOCUMENTARY "AMERICA REBUILDS," SEPTEMBER 2002`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`,text:`VI. "A New Pearl Harbor"
In September 2000  —  exactly one year before the attacks  —  the Project for the New
American Century (PNAC) published a 90‐page report titled  Rebuilding America's
Defenses: Strategy, Forces and Resources for a New Century. The report called for a
massive increase in U.S. defense spending and a more aggressive military posture
in the Middle East. On page 51, the authors wrote:
"The process of transformation, even if it brings revolutionary change, is likely to be a long one, absent some catastrophic and catalyzing event  —  like a new Pearl Harbor."
 —  PNAC, "REBU`}},{type:`text`,text:`VII. The Israeli Connections
THE FIVE ISRAELIS
On the afternoon of September 11, 2001, five Israeli nationals were arrested in East
Rutherford, New Jersey, after witnesses reported seeing them photographing the
burning Twin Towers and appearing to celebrate. The men  —  Sivan Kurzberg, Paul
Kurzberg, Yaron Shmuel, Oded Ellner, and Omer Marmari  —  were employees of
Urban Moving Systems, a company owned by Israeli national Dominik Suter.[11]
The FBI detained the five men for 71 days. At least two of them were identified as
operatives of Israeli intelligence (Mossad), according to a report by ABC News.[11]
Dominik Suter fled to Israel before the FBI could complete its investigation. Urban
Moving Systems was later identified as a Mossad front company. The five men
were quietly deported to Israel in November 2001. Upon their return, three of
them appeared on an Israeli television program and stated: "Our purpose was to
document the event."[12]
ADVANCE WARNINGS
Odigo, an Israeli instant messaging company with offices in the World Trade Center complex, confirmed that two of its employees received messages warning of
the attacks  two hours before the first plane struck. Odigo's VP of Sales, Alex
Diamandis, confirmed the warnings to the media and stated that the company
had turned the information over to the FBI.[13]
Zim American Israeli Shipping, one of the largest shipping companies in the
world, broke its lease and vacated its offices in the World Trade Center approximately one week before September 11. The company paid a $50,000 penalty for early
termination.[14]`},{type:`evidence`,evidence:{tier:`circumstantial`,label:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`,text:`Israeli intelligence may have had advance knowledge of the attacks (as allies sometimes do) without being complicit. The Israeli government has denied any foreknowledge. See Chapter 7: Mossad  —  The Institute for the broader context of Israeli
intelligence operations.

VIII. What the Commission Left Out
The 9/11 Commission was not established until 441 days after the attacks  —  longer
than the delay for any comparable national investigation. President Bush initially
opposed the creation of any independent commission. When it was finally established, the Commission was given a budget of $3 mi`}},{type:`text`,text:`Why were multiple FBI agents who reported pre‐attack intelligence warnings
reassigned or silenced?[15]
✓ VERIFIED  —  COMMISSION RECORDS, CONGRESSIONAL TESTIMONY
The Commission's budget, timeline, and staffing conflicts are documented in its
own records and in congressional testimony. Max Cleland's resignation and public
statements are on the record. The budget comparison with other investigations is
sourced from Government Accountability Office records. Philip Zelikow's conflicts
of interest were reported by the New York Times and acknowledged by other
Commission members.
IX. The Consequences
September 11 was used to justify a transformation of American society and foreign policy that the PNAC authors had explicitly called for. The consequences include:
$8T+
TOTAL WAR SPENDING
(2001–2023)
929K+
DEATHS IN POST-9/11
WARS
38M
PEOPLE DISPLACED
The PATRIOT Act, signed into law on October 26, 2001  —  just 45 days after the attacks  —  authorized mass surveillance of American citizens, including warrantless
wiretapping, bulk collection of phone records, and expanded FBI powers. The 342page bill was introduced and passed with minimal debate. Several members of
Congress later admitted they had not read it before voting.[16]
The invasion of Iraq in March 2003 was justified by claims that Saddam Hussein
possessed weapons of mass destruction and had ties to al‐Qaeda. Both claims
were false. No WMDs were found. The 9/11 Commission explicitly stated that there`},{type:`text`,text:`was "no credible evidence" of an Iraq‐al‐Qaeda operational relationship.[1] The war
killed an estimated 200,000+ Iraqi civilians and 4,600 American service members.
M AINSTREAM POSITION & COUNTER-ARGUMENTS
The 9/11 Commission Report (2004) and the NIST investigations concluded that the
attacks were planned and executed by al‐Qaeda, that the buildings collapsed due to
structural damage from the impacts and subsequent fires, and that intelligence
failures  —  not complicity  —  allowed the attacks to succeed. The "28 pages" released
in 2016 documented Saudi connections but did not establish Saudi government direction of the attacks. The reader should note that the 9/11 Commission itself acknowledged limitations in its investigation, and that several commissioners have
publicly stated that the Commission was "set up to fail." The evidence is presented
here for the reader's independent evaluation.
⬡ CROSS -
PNAC & neoconservative network → Ch. 10 (Shadow Institutions) · Israeli intelligence operations → Ch. 7 (Mossad) · Saudi financial connections → Ch. 9
(Petrodollar System) · Defense spending & Federal Reserve → Ch. 11 (How the
Fed Works) · Financial anomalies → Ch. 12 (2008 Crash) · AIPAC influence on
war authorization → Ch. 13 (AIPAC Lobby) · Intelligence‐linked operations →
Ch. 17 (Epstein Files)`},{type:`text`,text:`★ W H AT  Y O U  C A N  D O
The 9/11 investigation is not closed. In 2024, a federal court ordered the FBI to
release additional documents related to Saudi involvement. The families of
9/11 victims continue to pursue legal action against the Saudi government. You
can: (1) Read the declassified 28 pages yourself  —  they are available through
the Office of the Director of National Intelligence. (2) Support the 9/11 Families
United organization, which advocates for full disclosure. (3) Demand that your
representatives support a new, fully independent investigation with subpoena
power and adequate funding. (4) Remember that 2,977 people died. They
deserve the truth.
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`National Commission on Terrorist Attacks Upon the United States, The 9/11 Commission Report, July 22, 2004. 9-11commis- sion.gov`},{id:2,text:`U.S. House Permanent Select Committee on Intelligence / U.S. Senate Select Committee on Intelligence, "Joint Inquiry Into Intelligence Community Activities Before and After the Terrorist Attacks of September 11, 2001," declassified pages released July 15, 2016.`},{id:3,text:`Graham, B., Intelligence Matters: The CIA, the FBI, Saudi Arabia, and the Failure of America's War on Terror, Random House, 2004.`},{id:4,text:`CBS News, "The War on Waste," January 29, 2002. Rumsfeld's September 10, 2001 statement preserved in C-SPAN archives.`},{id:5,text:`Poteshman, A.M., "Unusual Option Market Activity and the Terrorist Attacks of September 11, 2001," The Journal of Business, Vol. 79, No. 4, University of Chicago Press, 2006.`},{id:6,text:`Bagli, C.V., "Insurers Agree to Pay Billions at Ground Zero," The New York Times, May 24, 2007. Silverstein Properties v. Hart- ford Financial Services Group, U.S. District Court, Southern District of New York.`},{id:7,text:`National Institute of Standards and Technology (NIST), "Final Report on the Collapse of World Trade Center Building 7," NIST NCSTAR 1A, November 2008. nist.gov`},{id:8,text:`SEC, "SEC Announces Resumption of Normal Operations," September 17, 2001. Destruction of case files acknowledged in subsequent SEC communications.`},{id:9,text:`Hulsey, J.L. et al., "A Structural Reevaluation of the Collapse of World Trade Center 7," University of Alaska Fairbanks, Department of Civil and Environmental Engineering, March 2020.`},{id:10,text:`Project for the New American Century, "Rebuilding America's Defenses: Strategy, Forces and Resources for a New Century," September 2000.`},{id:11,text:`ABC News 20/20, "The White Van: Were Israelis Detained on Sept. 11 Spies?" June 21, 2002. FBI Newark Division records.`},{id:12,text:`Israeli Channel 2 television interview, November 2001. Translated and reported by multiple media outlets.`},{id:13,text:`Haaretz, "Odigo Says Workers Were Warned of Attack," September 26, 2001. Confirmed by Odigo VP Alex Diamandis.`},{id:14,text:`Jerusalem Post, "Zim Shipping Moves Out of WTC," September 2001. Lease termination documented in Port Authority re- cords.`},{id:15,text:`Shenon, P., The Commission: The Uncensored History of the 9/11 Investigation, Twelve/Hachette, 2008. Max Cleland resigna- tion statements reported by Boston Globe, Salon, and others.`},{id:16,text:`USA PATRIOT Act, Public Law 107-56, October 26, 2001. Congressional Record, 107th Congress.`},{id:11,text:`It documents what is known, what was concealed, and what questions remain unanswered. The reader is encouraged to verify all claims independently.`}],crossLinks:[{label:`Chapter 27: The Surveillance State`,chapterId:`chapter-27`},{label:`Chapter 23: The War on Drugs`,chapterId:`chapter-23`}],keywords:[`9/11`,`September 11`,`terrorism`,`War on Terror`,`PATRIOT Act`,`Commission`]},{id:`chapter-23`,number:`Chapter 23`,title:`The War on Drugs`,subtitle:`How a policy designed to criminalize dissent became the longest and most expensive domestic war in American history.`,dateRange:`1971–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The War on Drugs
From Nixon's political machinations to the CIA's complicity in global narcotics trafficking and the laundering of cartel money by the world's biggest
banks, this is the story of how a manufactured crisis created a permanent,
profitable, and racist system of social control.`},{type:`text`,text:`The War on Drugs
The "War on Drugs," launched by President Richard Nixon, was never about
public health. A top Nixon aide later admitted it was a political weapon
designed to criminalize and disrupt the administration's two primary enemies: the anti‐war left and Black communities. This chapter uncovers the
hidden history of the drug war, from the CIA's documented complicity in
narcotics trafficking to the explosion of the prison‐industrial complex and
the laundering of drug money by global banks.`},{type:`text`,text:`★ W H Y  T H I S  
The War on Drugs has shaped modern America. It has fueled mass incarceration, disproportionately devastating minority communities. It has militarized
policing, eroded civil liberties, and wasted trillions of taxpayer dollars, all
while failing to curb drug use. Understanding its origins as a political tool, not
a public health campaign, is essential to dismantling its destructive legacy and
building a more just and effective approach to drug policy.
n 1994, the late John Ehrlichman, a top domestic policy advisor to President
Richard Nixon, gave a stunningly candid interview to the journalist Dan
Baum. Reflecting on the genesis of the administration's "War on Drugs," Ehrlichman admitted what many had long suspected: it was a fraud. "The Nixon campaign in 1968, and the Nixon White House after that, had two enemies: the antiwar
left and black people," Ehrlichman stated. "We knew we couldn't make it illegal to`},{type:`text`,text:`be either against the war or black, but by getting the public to associate the hippies with marijuana and blacks with heroin, and then criminalizing both heavily,
we could disrupt those communities. We could arrest their leaders, raid their
homes, break up their meetings, and vilify them night after night on the evening
news. Did we know we were lying about the drugs? Of course we did."[1] This admission  is  the  starting  point  for  understanding  one  of  the  most  cynical  and
destructive social policies in American history.
$1T+
COST SINCE 1971
1.7M
ANNUAL DRUG ARRESTS
3.8x
BLACK MARIJUANA
ARREST RATE VS. WHITE
400K+
INCARCERATED FOR
DRUGS
I. Intelligence Agencies and the Drug Trade: The
Documentary Record
While the Nixon administration was publicly declaring a war on drugs, a parallel
pattern was documented in the intelligence community. Congressional investigations, declassified documents, and court proceedings have established that elements of the Central Intelligence Agency maintained relationships with individuals and organizations involved in narcotics trafficking, particularly in Southeast
Asia and Central America. The documented record indicates that counter‐narcotics  objectives  were,  in  multiple  instances,  subordinated  to  anti‐communist
intelligence priorities.
AIR AMERICA AND THE GOLDEN TRIANGLE
The CIA's involvement in the drug trade dates back to the Vietnam War. The
agency operated a proprietary airline, Air America, which was used to transport
personnel and supplies. It also became a key logistical component for opium and
heroin trafficking in the Golden Triangle (the border region of Thailand, Laos, and`},{type:`text`,text:`Myanmar). The CIA's local allies, including the Hmong tribes in Laos and elements
of the Nationalist Chinese Kuomintang (KMT) in Burma, were major opium producers. Air America planes were used to transport their raw opium from the poppy
fields to heroin labs, and the proceeds were used to fund the secret war against
the Pathet Lao in Laos.[6]
◐ CIRCUMSTANTIAL  —  DECLASSIFIED DOCUMENTS & WITNESS TESTIMONY
While a direct order from CIA headquarters to traffic drugs has never been declassified, numerous historians, declassified documents, and former intelligence officers have confirmed the arrangement. Alfred McCoy's seminal work, "The Politics of Heroin: CIA Complicity in the Global Drug Trade," meticulously documents
how CIA‐backed anti‐communist assets in Southeast Asia, Afghanistan, and Central America became major drug traffickers, with the agency's protection. The
pattern is too consistent to be coincidental.
THE CONTRAS AND THE COCAINE EXPLOSION
The most extensively documented evidence of CIA involvement with drug trafficking networks emerged during the Iran‐Contra affair in the 1980s. The Reagan
administration was illegally funding the right‐wing Contra rebels in their war
against the socialist Sandinista government of Nicaragua. To bypass a congressional ban on funding, the CIA and National Security Council (NSC) turned to
alternative sources, including drug traffickers.
In 1986, a series of articles by journalist Gary Webb, titled "Dark Alliance" and
published in the *San Jose Mercury News*, alleged that a CIA‐backed Contra drug
ring had funneled tons of cocaine into Los Angeles, sparking the crack cocaine
epidemic that devastated Black communities. Webb's investigation traced the network from Nicaraguan traffickers Oscar Danilo Blandón and Norwin Meneses to
the Los Angeles‐based dealer "Freeway" Rick Ross.[7]`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`and the Prison-Industrial Complex
The vast profits generated by the illicit drug trade, facilitated by intelligence
agencies, needed to be legitimized. This required the complicity of the world's
largest financial institutions. For decades, major banks have served as the laundromats for cartel cash, processing hundreds of billions of dollars in drug money
while turning a blind eye to the source of the funds. When caught, they pay fines
that amount to a fraction of their profits, and no senior executives go to prison.

THE BANKERS' CUT
In 2012, HSBC, one of the world's largest banks, was forced`}},{type:`text`,text:`$881 Million+
$1.9 Billion
None
Wachovia`},{type:`text`,text:`$378 Billion
$160 Million
None
TD Bank`},{type:`text`,text:`Billions (Fentanyl)
$3 Billion
None
THE PRISON-INDUSTRIAL COMPLEX
The War on Drugs provided the fuel for an unprecedented expansion of the U.S.
prison system. The criminalization of drug users, particularly in minority communities, created a massive population of non‐violent offenders to be incarcerated. This, in turn, created a multi‐billion dollar industry. Private prison companies like CoreCivic (formerly Corrections Corporation of America) and GEO Group
lobbied for tougher sentencing laws and profited from locking up more people.
These companies, which trade on the New York Stock Exchange, have a direct financial incentive to maintain high incarceration rates. The War on Drugs provided
them with the raw material.[12]`},{type:`quote`,quote:{text:`The drug war has been a war on people of color. It has done
little to stem the flow of drugs, but it has helped to create a
vast and profitable prison-industrial complex.`,attribution:`MICHELLE ALEXANDER, THE NEW JIM CROW
M AINSTREAM POSITION & COUNTER-ARGUMENTS
Defenders of drug prohibition argue that controlled substances cause genuine
harm  —  addiction, overdose deaths, and social disruption  —  and that enforcement,
while imperfect, has prevented even greater drug use. The CIA's documented relationships with drug traffickers, while troubling, occurred in the context of Cold
War operations where anti‐communist objectives were prioritized. The Kerry Committee and Iran‐Contra investigations documented these relationships but did not
establish that the CIA directed drug trafficking as institutional policy. The reader
should distinguish between documented institutional tolerance of trafficking and
allegations of active participation.
⬡ CROSS -
Intelligence agency overreach → Ch. 6 (Mossad  —  The Institute) · Financial corruption & elite impunity → Ch. 11 (2008 Crash) · Covert operations & foreign
policy → Ch. 7 (JFK, Dimona & AIPAC) · Weaponized social policy → Ch. 17
(Rockefeller Medicine)`}},{type:`text`,text:`SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Baum, Dan. "Legalize It All." *Harper's Magazine*, April 2016. https://harpers.org/archive/2016/04/legalize-it-all/`,url:`https://harpers.org/archive/2016/04/legalize-it-all/`},{id:2,text:`CNBC. "The U.S. has spent over a trillion dollars fighting war on drugs." June 17, 2021. https://www.cnbc.com/2021/06/17/ the-us-has-spent-over-a-trillion-dollars-fighting-war-on-drugs.html`,url:`https://www.cnbc.com/2021/06/17/`},{id:3,text:`Vera Institute of Justice. "Drug Arrests and Incarceration."  https://www.vera.org/publications/price-of-prisons-2021-state- spending-trends/drug-arrests-and-incarceration`,url:`https://www.vera.org/publications/price-of-prisons-2021-state-`},{id:4,text:`American Civil Liberties Union. "A Tale of Two Countries: Racially Targeted Arrests in the Era of Marijuana Reform." 2020. ht- tps://www.aclu.org/report/tale-two-countries-racially-targeted-arrests-era-marijuana-reform`},{id:5,text:`The  Sentencing  Project.  "Mass  Incarceration:  The  Whole  Pie  2023."  https://www.sentencingproject.org/research/mass- incarceration-the-whole-pie-2023/`,url:`https://www.sentencingproject.org/research/mass-`},{id:6,text:`McCoy, Alfred W. *The Politics of Heroin: CIA Complicity in the Global Drug Trade.* Lawrence Hill Books, 2003.`},{id:7,text:`Webb, Gary. *Dark Alliance: The CIA, the Contras, and the Crack Cocaine Explosion.* Seven Stories Press, 1998.`},{id:8,text:`Subcommittee on Terrorism, Narcotics, and International Operations, Committee on Foreign Relations, U.S. Senate. *Drugs, Law Enforcement and Foreign Policy (The Kerry Committee Report).* December 1988.`},{id:9,text:`National  Security  Archive.  "The  Contras,  Cocaine,  and  U.S.  Covert  Operations."  https://nsarchive2.gwu.edu/NSAEBB/ NSAEBB2/index.html`,url:`https://nsarchive2.gwu.edu/NSAEBB/`},{id:10,text:`The Guardian. "HSBC paid $1.9bn in US money-laundering settlement." December 11, 2012. https://www.theguardian.com/ business/2012/dec/11/hsbc-bank-us-money-laundering`,url:`https://www.theguardian.com/`},{id:11,text:`The Guardian. "Wachovia's dirty secret." April 2, 2011. https://www.theguardian.com/world/2011/apr/03/us-bank-mexico- drug-gangs`,url:`https://www.theguardian.com/world/2011/apr/03/us-bank-mexico-`},{id:12,text:`The Sentencing Project. "Private Prisons in the United States." 2021.  https://www.sentencingproject.org/publications/ private-prisons-in-the-united-states/`,url:`https://www.sentencingproject.org/publications/`},{id:13,text:`Alexander, Michelle. *The New Jim Crow: Mass Incarceration in the Age of Colorblindness.* The New Press, 2010.`}],crossLinks:[{label:`Chapter 19: MKUltra`,chapterId:`chapter-19`},{label:`Chapter 22: September 11, 2001`,chapterId:`chapter-22`}],keywords:[`War on Drugs`,`Nixon`,`DEA`,`incarceration`,`drug policy`,`CIA`]},{id:`chapter-24`,number:`Chapter 24`,title:`Fluoride & Public Water`,subtitle:`The documented history of water fluoridation — from its industrial origins to its adoption as public health policy.`,dateRange:`1945–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`F
C H A P T E R  T W E N T Y   —   T H E  P O I S O N  I N  T H E  P E O P L E ' S  W AT E R
Fluoride: The Industrial Waste
in Your Water
The official narrative of water fluoridation is one of scientific triumph and
public health progress. The documentary record reveals a more complex
history involving industrial byproducts, evolving scientific understanding,
and a growing body of peer-reviewed research that has prompted reconsider-
ation of longstanding public health assumptions.
 · Evidence tier: Verified / Circumstantial / Alleged
or over 75 years, public health officials and dental professionals have celebrated water fluoridation as a safe and effective way to prevent tooth decay. It has been hailed as one of the top ten public health achievements of
the 20th century. But what if this celebrated practice has a much darker, more
complex history than the official narrative suggests? What if the fluoride in your
drinking water is not a carefully selected pharmaceutical‐grade compound, but
rather an unprocessed industrial waste product from the fertilizer and aluminum
industries? And what if this chemical, once considered a toxic pollutant, is now
linked to a range of health problems, including neurological damage in children?
This chapter delves into the story of fluoride, a story of industrial convenience,
political maneuvering, and a public health policy that may be causing more harm
than good.`},{type:`text`,text:`★ W H Y  T H I S  
The water you drink, cook with, and bathe in every day likely contains fluoride. This chapter examines the evidence that this ubiquitous chemical, long
promoted as a public health triumph, may be an industrial pollutant with serious health consequences, particularly for our children. Understanding the
true story of fluoride is essential for making informed decisions about the
water you and your family consume.
72.3%
OF THE U.S.
POPULATION ON
PUBLIC WATER
SYSTEMS RECEIVES
FLUORIDATED WATER
$9.8B
ESTIMATED 5-YEAR
COST TO REMOVE
FLUORIDE FROM U.S.
PUBLIC WATER
SYSTEMS`},{type:`text`,text:`YEAR GRAND RAPIDS,
MI, BECAME THE FIRST
CITY TO FLUORIDATE
ITS WATER`},{type:`text`,text:`YEAR A FEDERAL COUR
RULED THAT FLUORID
POSES AN
UNREASONABLE RISK
TO CHILDREN'S HEALT
The Unlikely Miracle: From Industrial Waste to
Public Health Darling
The story of water fluoridation begins not in a dental office, but in the heart of industrial America. In the early 20th century, as industries like aluminum and phosphate fertilizer production boomed, they created a massive and toxic waste problem: fluoride. This byproduct, in the form of fluorosilicic acid, was a dangerous
pollutant that damaged crops, sickened livestock, and caused significant environmental harm. The industries faced a growing number of lawsuits and a public
relations nightmare.
At the same time, a dentist named Frederick McKay in Colorado was investigating
a strange phenomenon of stained teeth in his patients, which he called 'Colorado
Brown Stain.' He noticed that while these teeth were mottled, they were also sur
prisingly resistant to decay. This observation set off a chain of research that eventually identified naturally occurring fluoride in the water as the cause.
This is where the story takes a pivotal turn. Instead of being treated as a toxic industrial waste, fluoride was rebranded as a public health miracle. The aluminum
and phosphate industries, with the help of influential scientists and public health
officials, saw an opportunity to solve their waste problem and create a new market. They began promoting the idea of adding fluoride to public water supplies to
prevent  tooth  decay.  The  first  city  to  fluoridate  its  water  was  Grand  Rapids,
Michigan, in 1945. The practice quickly spread across the country, with the full
backing of the American Dental Association and the U.S. Public Health Service.
The Manhattan Project Connection
The connection between fluoride and the Manhattan Project, the top‐secret World
War II program to develop the atomic bomb, is a critical but often overlooked part
of the story. According to Christopher Bryson's investigative book, 'The Fluoride
Deception,' fluoride was a key ingredient in the production of bomb‐grade uranium and plutonium. The massive quantities of fluoride needed for the project created a new set of environmental and health concerns for the government.
Bryson's research, based on declassified documents, reveals that the Manhattan
Project was facing numerous lawsuits from farmers whose crops and livestock
were being poisoned by fluoride pollution from its facilities. To counter this, the
government launched a secret public relations campaign to convince the public
of fluoride's safety. This campaign involved funding and promoting studies that
downplayed the health risks of fluoride and emphasized its dental benefits. The
goal was to protect the bomb program from litigation and public opposition.
This effort to control the narrative around fluoride had a lasting impact on public
perception and policy. The same scientists and government officials who were involved in the Manhattan Project's PR campaign went on to become key pro
ponents of water fluoridation. This raises serious questions about the scientific integrity of the early research on fluoride and the motivations behind its promotion
as a public health measure.
The Science: What the NTP and Federal Courts
are Saying
For decades, the official consensus on water fluoridation remained largely unchallenged. However, in recent years, a growing body of scientific evidence has
raised serious concerns about its safety, particularly for children's developing
brains. This has culminated in a series of landmark legal challenges and a critical
review by the National Toxicology Program (NTP).
In 2024, a federal court made a historic ruling in a case brought against the Environmental  Protection  Agency  (EPA)  under  the  Toxic  Substances  Control  Act
(TSCA). The court found that the current levels of fluoride in drinking water
present an 'unreasonable risk' to the neurological health of children. This ruling
was based on a comprehensive review of the scientific literature, including a
meta‐analysis of studies that found a correlation between fluoride exposure and
lower IQ in children. The court ordered the EPA to take regulatory action to mitigate this risk, a decision that could have far‐reaching implications for the future of
water fluoridation in the United States.
The court's decision was heavily influenced by the work of the NTP, which conducted a systematic review of the scientific literature on fluoride's neurotoxicity.
The NTP's 2024 report concluded with 'moderate confidence' that fluoride exposure above 1.5 mg/L is associated with cognitive and neurodevelopmental effects
in humans. While the report has been a subject of intense debate and political
pressure,  it  represents  the  most  comprehensive  and  rigorous  assessment  of
fluoride's health effects to date.`},{type:`evidence`,evidence:{tier:`verified`,label:`VERIFIED — Primary Source Documentation`,text:`STUDY
YEAR
FINDING
Choi et al.

A meta-analysis of 27 studies found an association between high fluoride exposure and
lower IQ in children.
Bashash et
al.

A study of mother-offspring pairs in Mexico found that higher prenatal fluoride exposure
was associated with lower IQ scores in children.
Till et al.

A Canadian study found that higher fluoride intake from formula reconstituted with
fluoridated water was associated with lower non-verbal intelligence scores in children.
The Opposition: A Story of Censorship and
Controversy
Despite the growing scientific evidence against water fluoridation`}},{type:`text`,text:`M AINSTREAM POSITION & COUNTER-ARGUMENTS
The American Dental Association, the CDC, and the WHO continue to endorse community water fluoridation as a safe and effective method of preventing tooth decay.
Proponents cite decades of epidemiological data showing reduced cavity rates in
fluoridated communities. The 2024 NTP report and the Bashash (2017) neurotoxicity study have prompted reconsideration, but many public health officials argue
that the benefits of fluoridation at recommended levels outweigh the risks identified in these studies. The reader should evaluate the evolving scientific evidence
and the regulatory responses independently.
⬡ CROSS -
Rockefeller Medicine → Ch. 17 (Rockefeller Medicine) · The Manhattan Project
→ Ch. 4 (Warburg Brothers & WWI) · Government Secrecy → Ch. 18 (September
11, 2001)
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below.`},{type:`text`,text:`Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Bryson, Christopher. The Fluoride Deception. Seven Stories Press, 2004.`},{id:2,text:`National Toxicology Program. "NTP Monograph on the State of the Science Concerning Fluoride Exposure and Neurodevelopmental and Cognitive Health Effects: A Systematic Review." August 2024.`},{id:3,text:`Food & Water Watch, et al. v. Environmental Protection Agency. Case No. 17-cv-02162-EMC. U.S. District Court for the Northern District of California.`},{id:4,text:`"The Story of Fluoridation." National Institute of Dental and Craniofacial Research, www.nidcr.nih.gov/health-info/fluoride/ the-story-of-fluoridation.`},{id:5,text:`Zelko, Frank. "Toxic Treatment: Fluoride's Transformation from Industrial Waste to Public Health Miracle." Origins: Current Events in Historical Perspective, origins.osu.edu/article/toxic-treatment-fluorides-transformation-industrial-waste-public- health-miracle.`},{id:6,text:`"Timeline for Community Water Fluoridation." Centers for Disease Control and Prevention, www.cdc.gov/fluoridation/ timeline-for-community-water-fluoridation/index.html.`},{id:7,text:`Choi, Anna L., et al. "Developmental Fluoride Neurotoxicity: A Systematic Review and Meta-Analysis." Environmental Health Perspectives, vol. 120, no. 10, 2012, pp. 1362–68.`},{id:8,text:`Bashash, M., et al. "Prenatal Fluoride Exposure and Cognitive Outcomes in Children at 4 and 6–12 Years of Age in Mexico." Environmental Health Perspectives, vol. 125, no. 9, 2017, p. 097017.`}],crossLinks:[{label:`Chapter 20: Rockefeller Medicine`,chapterId:`chapter-20`},{label:`Chapter 21: Vaccine History`,chapterId:`chapter-21`}],keywords:[`fluoride`,`water`,`public health`,`industrial waste`,`EPA`]},{id:`chapter-25`,number:`Chapter 25`,title:`The Titanic, the Federal Reserve & the Men Who Opposed It`,subtitle:`Three of the wealthiest men who opposed the creation of the Federal Reserve boarded the same ship in April 1912. None of them survived.`,dateRange:`1910–1913`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Unsinkable Plan
Three of the wealthiest men in the world, all vocal opponents of the new Federal Reserve, died on the Titanic. The man who financed the ship, J.P. Morgan,  cancelled  his  trip  at  the  last  minute.  Coincidence?  This  chapter
examines the facts.`},{type:`text`,text:`The Unsinkable Plan
In the icy waters of the North Atlantic, a tragedy unfolded that would
become legend. But was it merely an accident? Or was it the final, bloody act
in a silent war for control of America's financial future? This chapter lays
out the evidence and asks the questions the mainstream narrative avoids..`},{type:`text`,text:`n April 10, 1912, the RMS Titanic, a vessel celebrated as the pinnacle of
modern engineering and a symbol of industrial-age confidence, em-
barked on its maiden voyage from Southampton to New York City. It
was the largest ship afloat, a floating palace of unprecedented luxury, and it was
declared unsinkable. Four days into its journey, it struck an iceberg and sank,
claiming over 1,500 lives in one of the deadliest maritime disasters in history. The
official narrative is one of hubris, of a fatal encounter between man's ambition
and nature's unforgiving power. But what if the story is more complex? What if
the sinking of the world's most famous ship was not an accident at all, but a metic-
ulously planned execution designed to eliminate powerful opposition to a radical
financial coup?`},{type:`text`,text:`★ W H Y  T H I S  
The creation of the Federal Reserve in 1913 was the single most significant fin-
ancial event in American history. It transferred control of the nation's money
supply from the people's elected representatives to a cartel of private bankers.
This chapter explores the possibility that the Titanic disaster was instrumental
in paving the way for the Fed by eliminating three of its most powerful and
wealthy opponents. Understanding this event is not just an exercise in histor-
ical curiosity; it is a crucial lens through which to view the modern financial
system, the concentration of power, and the lengths to which the architects of
that system may have gone to achieve their goals. It asks a question that is as
relevant today as it was a century ago: who really controls the levers of power,
and what are they willing to do to maintain it?
$87M
J.J. ASTOR IV'S NET
WORTH (1912)`},{type:`text`,text:`WEALTHY FED
OPPONENTS ABOARD`},{type:`text`,text:`MONTHS FROM SINKING
TO FED ACT
11th
hour
J.P. MORGAN'S
CANCELLATION
I. The Powerful Men Who Died
The list of first-class passengers on the Titanic was a veritable who's who of the
Gilded Age elite. But among the titans of industry and society, three men stood
out for their immense wealth and, according to a growing body of evidence, their
staunch opposition to the burgeoning central banking movement in the United
States: John Jacob Astor IV, Benjamin Guggenheim, and Isidor Straus.`},{type:`text`,text:`JOHN JACOB ASTOR IV: THE RICHEST MAN ON THE SHIP
John Jacob Astor IV was the scion of the Astor family, one of the wealthiest dyn-
asties in American history. With a net worth estimated at $87 million in 1912 (the
equivalent of over $2.75 billion today), he was, by a significant margin, the richest
passenger on the Titanic. Astor had made his fortune in real estate, finance, and
invention. He was a respected figure, a veteran of the Spanish-American War, and
a man whose influence was felt in the highest echelons of American society. While
concrete, public statements by Astor against the Federal Reserve are scarce, his
family's long-standing financial interests and their historical preference for a de-
centralized  banking  system  put  him  at  odds  with  the  Morgan-Rockefeller-
Rothschild axis pushing for a central bank.
C IRCUMSTANTIAL EVIDENCE
Astor's opposition to the Federal Reserve is primarily inferred from his financial
alliances and the prevailing economic philosophies of the 'old money' elite, who
viewed a central bank as a tool for market manipulation by a select few. His per-
sonal friendship with other known opponents and his significant investments in
industries that would be negatively impacted by the proposed changes to the
banking system provide a strong circumstantial case for his opposition.
BENJAMIN GUGGENHEIM: THE MINING MAGNATE
Benjamin Guggenheim, another prominent victim, was a member of the wealthy
Guggenheim family, who had amassed a fortune in the mining and smelting in-
dustries. While not as wealthy as Astor, Guggenheim's influence was considerable.
The Guggenheim family's business interests were global, and they were known
for their independent and competitive spirit. Like Astor, direct quotes from Gug-
genheim opposing the Federal Reserve are difficult to find in the historical re-
cord. However, the nature of his family's business, which relied on a stable and
predictable financial environment, would have made them wary of the kind of
centralized control that the Federal Reserve promised.`},{type:`text`,text:`ISIDOR STRAUS: THE MERCHANT PRINCE
Isidor Straus, the co-owner of Macy's department store, was another of the notable
businessmen who perished on the Titanic. Unlike Astor and Guggenheim, Straus's
position on the Federal Reserve is more complex. Some sources claim he was a
supporter of the Aldrich Plan, a precursor to the Federal Reserve Act. However,
other researchers contend that he was a vocal opponent of the final version of the
Act, which he believed gave too much power to a small group of bankers. His
death, along with those of Astor and Guggenheim, removed a significant voice
from the debate.
D ISPUTED EVIDENCE
The claim that Isidor Straus was a staunch opponent of the Federal Reserve is a
point of contention among historians. While he did express reservations about cer-
tain aspects of the proposed legislation, he was also a member of the National Mon-
etary Commission, which laid the groundwork for the Fed. This has led some to
conclude that he was, at worst, a moderate critic and not the ardent opponent that
some conspiracy theories suggest.
II. The Architect: J.P. Morgan and the Federal
Reserve
At the heart of the plan for a new American central bank stood John Pierpont Mor-
gan, the most powerful banker of his time. J.P. Morgan & Co. was not just a bank; it
was a financial empire, with vast holdings in railroads, steel, and shipping. Mor-
gan had long advocated for a centralized banking system, arguing that it would
bring stability to the volatile American economy. In 1907, he had personally inter-
vened  to  stop  a  financial  panic,  an  event  that  bolstered  his  argument  for  a
permanent institution to manage the nation's money supply.`},{type:`text`,text:`THE JEKYLL ISLAND MEETING
In November 1910, a secret meeting was held on Jekyll Island, off the coast of
Georgia. In attendance were Senator Nelson Aldrich, A. Piatt Andrew (Assistant
Secretary of the Treasury), and a handful of the country's most powerful bankers,
including Paul Warburg of Kuhn, Loeb & Co., and representatives from J.P. Morgan
& Co. Under the guise of a duck hunting trip, the group spent a week drafting the
plan for a new central bank. This plan, which would later become the basis for the
Federal Reserve Act, was designed to be presented to Congress as a technical solu-
tion to a technical problem, masking the immense transfer of power it represen-
ted.
V ERIFIED FACT
The Jekyll Island meeting is a documented historical event, confirmed by the par-
ticipants themselves in later years. The secrecy surrounding the meeting, how-
ever, has fueled speculation about the true motives of its attendees.
MORGAN'S LAST-MINUTE CANCELLATION
J.P. Morgan was not only the driving force behind the Federal Reserve; he was also
the owner of the White Star Line, the company that owned the Titanic, through
his International Mercantile Marine Company. Morgan had a personal suite re-
served on the ship for its maiden voyage and was scheduled to be on board. How-
ever, just days before the Titanic set sail, he cancelled his trip, citing illness. This
last-minute cancellation has become a central pillar of the conspiracy theory sur-
rounding the Titanic's sinking. Was it a fortunate coincidence, or did Morgan have
prior knowledge of the impending disaster?`},{type:`quote`,quote:{text:`Men of great wealth and influence, who had declared their
opposition to the Federal Reserve Act, were passengers on
the Titanic. Did they have to be removed?`,attribution:`G. EDWARD GRIFFIN, THE CREATURE FROM JEKYLL ISLAND
VICTIM
NET WORTH (1912)
EQUIVALENT
(2024)
STANCE ON FEDERAL
RESERVE
John Jacob Astor IV
~$87 Million
~$2.75 Billion
Opposed (Inferred)
Benjamin
Guggenheim
~$95 Million (Family
Fortune)
~$3 Billion
Opposed (Inferred)
Isidor Straus
~$50 Million
~$1.6 Billion
Disputed / Critical
III. The Sinking: A Series of Unfortunate Events?
The official inquiry into the sinking of the Titanic concluded that the ship was
traveling too fast in an area known to have icebergs, and that the crew failed to
heed the multiple warnings they received. However, a closer look at the events of
that fateful night reveals a series of anomalies and coincidences that have led
many to question the official narrative.
THE WARNINGS
The Titanic received at least six separate warnings about icebergs in the vicinity
on the day of the sinking. These warnings came from other ships in the area, in-
cluding the Caronia, the Baltic, and the Californian. Despite these repeated warn-
ings, the Titanic continued to travel at a high speed of 22 knots, a decision that has
been heavily criticized by maritime experts.`}},{type:`text`,text:`THE CALIFORNIAN INCIDENT
The SS Californian was another ship in the vicinity of the Titanic on the night of
the sinking. The Californian had stopped for the night because of the ice, and its
radio operator had attempted to warn the Titanic of the danger. However, the Ti-
tanic's radio operator, Jack Phillips, reportedly dismissed the warning, telling the
Californian's operator to "shut up." The Californian's crew later saw the distress
rockets fired by the Titanic but failed to render assistance, a decision that has
been the subject of much controversy and two official inquiries.
C IRCUMSTANTIAL EVIDENCE
The failure of the Californian to come to the Titanic's aid is one of the most endur-
ing mysteries of the disaster. While the official explanation is a combination of
miscommunication and negligence, some researchers have suggested that the
Californian was deliberately ordered to stand down.
IV. Timeline of a Tragedy
DATE
EVENT
SIGNIFICANCE
Nov 22, 1910
Secret meeting on Jekyll Island
The plan for the Federal Reserve is drafted.
April 10,`},{type:`text`,text:`Titanic departs from Southampton
Astor, Guggenheim, and Straus are on board.
April 14,`},{type:`text`,text:`Titanic strikes an iceberg
The ship sinks in less than three hours.
Dec 23, 1913
Federal Reserve Act is signed into
law
The central bank is created, 20 months after the
sinking.`},{type:`text`,text:`⬡ CROSS -
The Creation of the Federal Reserve → Ch. 3 (Jekyll Island & the Federal
Reserve) · The Power of Central Banks → Ch. 1 (Birth of Central Banking) · The
Influence of J.P. Morgan → Ch. 10 (How the Federal Reserve Works)
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer-reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Griffin, G. Edward. The Creature from Jekyll Island: A Second Look at the Federal Reserve. American Media, 2002.`},{id:2,text:`Butler, Daniel Allen. "Unsinkable": The Full Story of the RMS Titanic. Stackpole Books, 1998.`},{id:3,text:`Eaton, John P., and Charles A. Haas. Titanic: Triumph and Tragedy. W.W. Norton & Company, 1995.`},{id:4,text:`History.com Editors. "The Craziest Titanic Conspiracy Theories, Explained." HISTORY, A&E Television Networks, 28 Nov. 2018, www.history.com/articles/titanic-sinking-conspiracy-myths-jp-morgan-olympic.`},{id:5,text:`"John Jacob Astor IV." Wikipedia, Wikimedia Foundation, 2 Mar. 2026, en.wikipedia.org/wiki/John_Jacob_Astor_IV.`},{id:6,text:`"Isidor Straus." Wikipedia, Wikimedia Foundation, 1 Mar. 2026, en.wikipedia.org/wiki/Isidor_Straus.`},{id:7,text:`"Benjamin Guggenheim." Wikipedia, Wikimedia Foundation, 28 Feb. 2026, en.wikipedia.org/wiki/Benjamin_Guggenheim.`},{id:8,text:`"Federal Reserve Act." Wikipedia, Wikimedia Foundation, 25 Feb. 2026, en.wikipedia.org/wiki/Federal_Reserve_Act. V. The Opposition to Central Banking The idea of a central bank was not new in 1912, and it had always been a conten- tious issue in American politics. The First and Second Banks of the United States, both early attempts at central banking, had been met with fierce opposition and were ultimately dismantled. Opponents of central banking, who ranged from pop- ulist farmers to powerful Wall Street financiers, feared that such an institution would concentrate too much power in the hands of a few, lead to inflation, and serve the interests of the banking elite at the expense of the general public. THE LEGACY OF ANDREW JACKSON The most famous opponent of central banking in American history was President Andrew Jackson, who waged a political war against the Second Bank of the United`},{id:1832,text:`THE PANIC OF 1907 AND THE PUSH FOR REFORM The Panic of 1907, a severe financial crisis that was only quelled by the private in- tervention of J.P. Morgan, provided the catalyst for the renewed push for a central bank. Proponents of a central bank argued that the panic had demonstrated the need for a lender of last resort to provide stability to the financial system. How- ever, opponents argued that the panic had been caused by the very same Wall Street bankers who were now calling for a central bank, and that they were using the crisis as a pretext to seize control of the nation's money supply.`},{id:1819,text:`Widespread foreclosures, bank failures, and unemployment. Panic of 1837`},{id:1857,text:`Caused by the failure of the Ohio Life Insurance and Trust Company. Panic of 1873`},{id:1893,text:`A severe depression marked by a run on gold. Panic of 1907`}],crossLinks:[{label:`Chapter 1: The Birth of Central Banking`,chapterId:`chapter-1`},{label:`Chapter 3: Jekyll Island`,chapterId:`chapter-3`}],keywords:[`Titanic`,`Federal Reserve`,`Astor`,`Guggenheim`,`Straus`,`conspiracy`]},{id:`chapter-26`,number:`Chapter 26`,title:`Bohemian Grove & Elite Gatherings`,subtitle:`Inside the private retreat where American presidents, defense contractors, and media moguls gather each summer in the redwoods of Northern California.`,dateRange:`1872–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`Bohemian Grove: The Retreat
of the Ruling Class
Inside the most exclusive gathering in America  —  where the men who run
the world meet in secret, perform pagan rituals, and make decisions that
affect billions of people without a single vote being cast.`},{type:`text`,text:`★ W H Y  T H I S  
The Bohemian Grove is not a conspiracy theory  —  it is a documented, annual
gathering of the most powerful men in America at which major policy decisions have been discussed and shaped outside of any democratic process.
The Manhattan Project was reportedly conceived at the Grove. Richard Nixon
and Ronald Reagan negotiated their political futures there. When the people
who control your government, your media, your banks, and your military
gather in secret for two weeks every year, you have a right to know what they
discuss  —  and why they insist on keeping it from you.
2,500
ANNUAL ATTENDEES
2,700
ACRES IN SONOMA
COUNTY`},{type:`heading`,text:`Year Founded`},{type:`text`,text:`NAMED CAMPS
n the redwood forests of Sonoma County, California, along the banks of the
Russian River near the town of Monte Rio, there exists a 2,700‐acre private`},{type:`text`,text:`campground that has hosted every Republican president since Calvin Coolidge,
along with many Democrats, most of the Fortune 500's senior leadership, the
heads of major media companies, university presidents, military commanders,
and central bankers. The Bohemian Club, which owns and operates the Grove,
was founded in San Francisco in 1872 as a gentlemen's club for journalists, artists,
and musicians. Within a decade, it had been taken over by the city's business
elite. Today, its membership  —  capped at approximately 2,700  —  reads like a who's
who of American power, and its annual July encampment is the most exclusive
gathering in the Western world.[1]
The  Grove's  motto  is  "Weaving  Spiders  Come  Not  Here"   —   a  line  from
Shakespeare's A Midsummer Night's Dream  —  which is meant to suggest that business deals are not conducted on the premises. This claim is contradicted by virtually every account from attendees and infiltrators alike. Herbert Hoover called
the Bohemian Grove "the greatest men's party on Earth." Richard Nixon, in a 1971
recording  released  as  part  of  the  White  House  tapes,  described  the  Grove  in
cruder terms, noting the heavy drinking and what he characterized as the "most
faggy goddamned thing you could ever imagine."[2]
✓ VERIFIED  —  PUBLIC RECORDS & MEMBERSHIP LISTS
The Bohemian Club is a registered 501(c)(7) social club. Its existence, location,
and general membership composition are matters of public record. Partial membership lists have been published by journalists and researchers including Peter
Martin Phillips (Ph.D. dissertation, UC Davis, 1994) and William Domhoff (UC Santa
Cruz sociologist). The Club's tax filings confirm its status and property holdings.
The Cremation of Care
The encampment begins each year with a ceremony called the "Cremation of
Care." In this ritual, performed on the first Saturday evening of the encampment,
members gather before a 40‐foot concrete owl statue situated on the shore of a`},{type:`text`,text:`small lake. Robed figures carry a coffin‐shaped effigy representing "Care"  —  symbolizing the worldly concerns and responsibilities of the attendees. The effigy is
placed on an altar at the base of the owl and set ablaze while a pre‐recorded voice
emanating from the owl intones a script about casting off the burdens of the outside world. The ceremony includes pyrotechnics, a musical score performed by a
live orchestra, and theatrical performances.[3]
The ceremony has been described by defenders as a harmless theatrical tradition
 —  a way for powerful men to symbolically set aside their responsibilities and enjoy two weeks of relaxation. Critics note that the ritual bears unmistakable resemblance to ancient Canaanite worship of Moloch  —  a deity associated with
child sacrifice to whom offerings were burned before a large idol. The owl itself
has been connected to Minerva (Roman goddess of wisdom) by the Club, but also
to Lilith and various occult traditions by researchers. Whatever its intended symbolism, the spectacle of the world's most powerful men gathering before a giant
stone idol to burn an effigy is, at minimum, extraordinary.
"The Bohemian Grove, which I attend from time to time  — 
it is the most faggy goddamned thing you could ever
imagine, with that San Francisco crowd."
PRESIDENT RICHARD NIXON, WHITE HOUSE TAPE RECORDING, 1971 (NATIONAL ARCHIVES)
The Membership: Who Attends
The Grove's membership and guest lists represent a cross‐section of American
elite power. Members are organized into approximately 118 camps with names
like Mandalay, Hill Billies, Cave Man, Stowaway, Owl's Nest, and Isle of Aves.`},{type:`text`,text:`Camp assignments reflect social hierarchies  —  the most prestigious camps host
the most powerful members.
CATEGORY
NOTABLE MEMBERS/ATTENDEES
DOCUMENTATION
U.S. Presidents
Herbert Hoover, Dwight Eisenhower, Richard Nixon, Gerald
Ford, Ronald Reagan, George H.W. Bush, George W. Bush, Bill
Clinton (guest)
Multiple sources, White
House records
Cabinet/
Military
Henry Kissinger, George Shultz, Caspar Weinberger, Colin
Powell, Donald Rumsfeld, James Baker, Dick Cheney
Membership lists, press
reports
Finance
David Rockefeller, Walter Wriston (Citicorp), A.W. Clausen (Bank
of America/World Bank)
Phillips dissertation,
Domhoff research
Media
William Randolph Hearst Jr., Tom Johnson (CNN), Walter
Cronkite (narrator of Cremation of Care)
Club records, journalist
accounts
Defense/
Intelligence
William Casey (CIA Director), Edward Teller (hydrogen bomb),
multiple Joint Chiefs
Phillips dissertation, press
reports
Corporate
CEOs of Bechtel, Lockheed Martin, Bank of America, Pacific Gas
& Electric, major oil companies
Domhoff research, tax
filings
THE LAKESIDE TALKS
Perhaps more significant than the rituals are the "Lakeside Talks"  —  a series of offthe‐record speeches delivered by prominent members and guests on topics of national and international importance. These talks have included presentations on
military strategy, economic policy, foreign affairs, and technology. The talks are
explicitly off‐the‐record, and attendees are prohibited from quoting or attributing
statements made during them.[4]
The most consequential Lakeside Talk in history may have occurred in September
1942,  when  a  group  of  scientists  and  military  officials   —   including  Ernest
Lawrence, J. Robert Oppenheimer, and Edward Teller  —  reportedly discussed the
feasibility of an atomic bomb at the Grove. This meeting is credited by some historians as a key planning session for what became the Manhattan Project, which
was formally authorized two months later. The Grove's defenders note that the`},{type:`text`,text:`Manhattan Project had already been authorized by Roosevelt; critics argue that
the Grove meeting shaped the specific direction and personnel of the project.[5]
◐ CIRCUMSTANTIAL  —  THE MANHATTAN PROJECT CONNECTION
Edward Teller confirmed in his memoirs that discussions about nuclear weapons
took place at the Bohemian Grove in 1942. The S‐1 Committee (the precursor to the
Manhattan Project) had been established in June 1942. The Grove meeting in
September 1942 brought together key figures who would lead the project. While
the formal authorization came from Roosevelt, the Grove provided an informal
venue where these discussions could occur outside of official channels and
without documentation.
The Nixon-Reagan Pact
One of the most well‐documented political events at the Grove occurred in 1967,
when Richard Nixon and Ronald Reagan  —  both of whom were considering runs
for the 1968 Republican presidential nomination  —  met at the Grove and reached
an understanding. According to multiple accounts, Nixon secured Reagan's agreement not to challenge him for the 1968 nomination in exchange for future political support. Reagan would go on to win the presidency in 1980, with many of the
same power brokers who had facilitated the 1967 Grove meeting playing key roles
in his campaign.[6]
This is precisely the kind of arrangement that the Grove's "Weaving Spiders Come
Not Here" motto claims does not occur. The historical record demonstrates otherwise. The Grove functions as a venue where the most powerful men in America
can meet informally, build relationships, and reach understandings that shape
national  policy   —   all  without  any  public  accountability,  media  scrutiny,  or
democratic oversight.`},{type:`text`,text:`Infiltrations & Exposés
PHILIP WEISS  —  SPY MAGAZINE, 1989
Journalist Philip Weiss infiltrated the Bohemian Grove in November 1989 and
published a detailed account in Spy magazine. Weiss described the Cremation of
Care ceremony, the heavy drinking, the Lakeside Talks, and the general atmosphere of elite bonding. His account confirmed many details that had previously
been dismissed as exaggeration  —  including the scale of the owl statue, the theatrical nature of the rituals, and the presence of major political and business figures.[7]
ALEX JONES  —  JULY 2000
In July 2000, radio host Alex Jones and cameraman Mike Hanson infiltrated the Bohemian Grove and filmed the Cremation of Care ceremony. The footage  —  which
showed robed figures, the giant owl statue, the burning effigy, and the theatrical
production  —  was the first video documentation of the ceremony to reach the
public. While Jones's commentary and interpretation of the footage have been criticized as sensationalized, the footage itself is authentic and has been verified by
multiple researchers.[8]
✓ VERIFIED  —  VIDEO DOCUMENTATION
The Alex Jones footage from July 2000 is authentic. It shows the Cremation of Care
ceremony as described by Weiss and other sources  —  including the 40‐foot owl
statue, robed participants, the burning of the effigy, and the theatrical production.
The Bohemian Club has never disputed the authenticity of the footage, though it
has characterized the ceremony as a harmless tradition.`},{type:`text`,text:`The Secret Society Network
The Bohemian Grove does not exist in isolation. It is one node in a network of elite
gatherings and secret societies that includes the Bilderberg Group, the Council on
Foreign Relations, the Trilateral Commission, Skull and Bones, and Freemasonry.
Many individuals hold membership in multiple organizations simultaneously,
creating  an  interlocking  directorate  of  elite  power  that  operates  outside  of
democratic accountability.
ORGANIZATION
FOUNDED
MEMBERSHIP
OVERLAP WITH GROVE
Skull & Bones
1832, Yale
University
~800 living
members
George H.W. Bush, George W. Bush, John
Kerry  —  all Grove attendees
Bilderberg Group
1954, Netherlands
~130 annual
invitees
Henry Kissinger, David Rockefeller,
multiple Grove members
Council on Foreign
Relations
1921, New York
~5,000 members
Extensive overlap  —  most Grove members
in political/foreign policy camps
Trilateral
Commission
1973, David
Rockefeller
~400 members
Rockefeller was a member of both;
significant overlap
Freemasonry
1717 (Grand
Lodge), London
~2 million (U.S.)
Multiple presidents who attended Grove
were also Masons
The significance of this network is not that these organizations secretly control
the world through a single coordinated conspiracy. The significance is that the
same small group of individuals  —  numbering in the low thousands  —  circulate
through  multiple  elite  institutions,  building  relationships  and  reaching  consensus on major policy questions in settings that are deliberately closed to public
scrutiny. Whether this constitutes a "conspiracy" is a matter of semantics. What it
constitutes, without question, is an oligarchy.`},{type:`quote`,quote:{text:`The Bohemian Club is a power network. It's a social club
where the weights and measures of power are calibrated
and adjusted. It's where the ruling class goes to be the ruling
class.`,attribution:`G. WILLIAM DOMHOFF, PROFESSOR OF SOCIOLOGY, UC SANTA CRUZ, AUTHOR OF THE
BOHEMIAN GROVE AND OTHER RETREATS
Symbolism: The Owl, Moloch, and the Capital
The Bohemian Club's owl symbol connects to a broader pattern of occult and esoteric symbolism among elite institutions. The owl appears not only at the Grove
but also in the street layout of Washington, D.C.  —  where an owl figure can be
traced in the streets surrounding the U.S. Capitol building. The Capitol itself sits
on what was historically known as Jenkins Hill, and its design incorporates numerous Masonic symbols, as many of the Founding Fathers  —  including George
Washington, Benjamin Franklin, and Paul Revere  —  were Freemasons.[9]
The connection between the Grove's owl and ancient deity worship  —  particularly
Moloch, the Canaanite god before whom children were sacrificed by fire  —  has
been noted by researchers but disputed by the Club, which maintains the owl represents Minerva, the Roman goddess of wisdom. What is not disputed is that the
Cremation of Care ceremony involves burning an effigy before a massive owl idol
in a ritualistic setting  —  and that the men participating in this ritual include presidents, Supreme Court justices, and the heads of the world's largest corporations
and financial institutions.`}},{type:`text`,text:`✗ DISPUTED  —  OCCULT SIGNIFICANCE
The occult interpretation of the Cremation of Care ceremony is disputed. The Bohemian Club maintains it is a theatrical tradition symbolizing the setting aside of
worldly concerns. Critics argue the ceremony's structure  —  burning an effigy before a giant idol in a ritualistic setting  —  has clear parallels to ancient pagan worship. The truth likely lies in the ambiguity: the ceremony may function simultaneously as theater for some participants and as something more significant for others. What is not disputed is that it happens, that it involves the world's most
powerful men, and that they prefer to keep it secret.
Why Secrecy Matters
The fundamental issue with the Bohemian Grove is not the rituals, the drinking,
or the theatrical performances. The fundamental issue is that the people who
make the most consequential decisions affecting the lives of 330 million Americans  —  and billions of people worldwide  —  gather in secret for two weeks every
year, explicitly outside of any democratic framework, and insist that what they
discuss remain confidential.
In a democracy, the public has a right to know when its elected officials, military
commanders, intelligence chiefs, and financial regulators are meeting with corporate executives, media owners, and foreign policy architects in a setting designed to facilitate informal agreements. The Grove's "Weaving Spiders Come Not
Here" motto is not a rule  —  it is a cover story. The historical record demonstrates
that major political agreements, policy discussions, and personnel decisions have
been shaped at the Grove. The fact that these discussions occur in secret, without
minutes, without public accountability, and without any democratic oversight is
not a tradition to be celebrated. It is a problem to be addressed.`},{type:`text`,text:`⬡ CROSS -
Shadow institutions & elite networks → Ch. 9 (Shadow Institutions: Bilderberg,
CFR, Trilateral) · Skull & Bones / Freemasonry → Ch. 0 (The World Today) · 
Rockefeller network → Ch. 1 (Birth of Central Banking) · Media ownership &
narrative control → Ch. 20 (Operation Mockingbird) · Nuclear weapons policy
→ Ch. 18 (September 11) · Elite gathering patterns → Ch. 16 (Epstein Files)
★ T H E  L A R G E R  PAT T E R N
The Bohemian Grove is the physical manifestation of a simple truth: the people
who run the world know each other, meet regularly, and coordinate their actions in settings that are deliberately hidden from public view. This is not a
conspiracy theory  —  it is an observable fact, documented by journalists, academics, and the participants themselves. The question is not whether this happens. The question is whether a society that calls itself a democracy can
tolerate it.
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below.`},{type:`text`,text:`Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`G. William Domhoff, The Bohemian Grove and Other Retreats: A Study in Ruling-Class Cohesiveness (Harper & Row, 1974). Updated analysis at whorulesamerica.ucsc.edu.`},{id:2,text:`Richard Nixon, White House tape recordings, 1971. National Archives, Nixon Presidential Library. Transcript of Oval Office conversation regarding Bohemian Grove.`},{id:3,text:`"Bohemian Grove: Where Big Shots Go to Camp," The Washington Post, July 18, 1991.`},{id:4,text:`Peter Martin Phillips, "A Relative Advantage: Sociology of the San Francisco Bohemian Club," Ph.D. dissertation, University of California, Davis, 1994.`},{id:5,text:`Edward Teller, Memoirs: A Twentieth-Century Journey in Science and Politics (Perseus, 2001). Atomic Heritage Foundation, Manhattan Project timeline.`},{id:6,text:`"Bohemian Grove: Where the Powerful Meet," The New York Times, August 14, 1977. Nixon-Reagan 1967 meeting documented in multiple biographies.`},{id:7,text:`Philip Weiss, "Masters of the Universe Go to Camp: Inside the Bohemian Grove," Spy magazine, November 1989.`},{id:8,text:`Jon Ronson, "Who pulls the strings?" The Guardian, June 19, 2001. Account of accompanying Alex Jones to the Bohemian Grove.`},{id:9,text:`Library of Congress, George Washington Papers. Masonic connections of Founding Fathers documented in Steven C. Bullock,  Revolutionary Brotherhood: Freemasonry and the Transformation of the American Social Order (UNC Press, 1996).`}],crossLinks:[{label:`Chapter 11: Shadow Institutions`,chapterId:`chapter-11`},{label:`Chapter 28: The Epstein Files`,chapterId:`chapter-28`}],keywords:[`Bohemian Grove`,`elite`,`secret society`,`California`,`power`]},{id:`chapter-27`,number:`Chapter 27`,title:`The Surveillance State — From ECHELON to Pegasus`,subtitle:`The documented history of government mass surveillance — from Cold War signals intelligence to the smartphone in your pocket.`,dateRange:`1947–Present`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Surveillance State: From
ECHELON to Pegasus
How the world's most powerful intelligence agencies built a global
surveillance apparatus that monitors billions of people  —  and how Israeli-
developed spyware became the weapon of choice for authoritarian
governments targeting journalists, activists, and political opponents.`},{type:`text`,text:`★ W H Y  T H I S  
Your phone calls, text messages, emails, web searches, location data, and social media activity are being collected, stored, and analyzed by intelligence
agencies  —  not because you are suspected of a crime, but because the legal
framework established after 9/11 allows it. The FISA Court approved 99.97% of
surveillance requests between 2009 and 2019. The NSA's own internal documents, revealed by Snowden, show that the agency's goal is "collect it all." This
is not hypothetical. It is happening to you, right now, as you read this.
99.97%
FISA COURT APPROVAL
RATE (2009–2019)`},{type:`text`,text:`FIVE EYES ALLIANCE
NATIONS
45+
COUNTRIES USING
PEGASUS SPYWARE
$52.6B
U.S. INTELLIGENCE
BUDGET (2023)
n June 5, 2013, The Guardian published a classified court order from the
Foreign Intelligence Surveillance Court (FISC) requiring Verizon Busi
ness Network Services to hand over to the National Security Agency "on an ongoing daily basis" the telephony metadata of all calls  —  both domestic and international  —  handled by the company. The order, signed by FISC Judge Roger Vinson,
was the first of thousands of classified documents provided to journalists by Edward Snowden, a 29‐year‐old NSA contractor who had copied approximately 1.5
million classified files from NSA systems at the agency's facility in Hawaii.[1]
What Snowden revealed was not a rogue program or an isolated abuse. It was a
systematic, legally authorized, industrially scaled surveillance apparatus that
collected data on billions of people worldwide  —  including hundreds of millions
of Americans who were not suspected of any crime. The programs had names like
PRISM, XKeyscore, Boundless Informant, and MUSCULAR. They had been authorized by secret court orders, approved by Congressional intelligence committees
in classified briefings, and operated with the cooperation of America's largest
technology companies. The surveillance state was not a conspiracy. It was policy.
✓ VERIFIED  —  CLASSIFIED DOCUMENTS PUBLISHED BY MAJOR NEWSPAPERS
The Snowden documents were published by The Guardian, The Washington Post, The
New York Times, Der Spiegel, and other major outlets. Their authenticity has never
been disputed by the NSA or any U.S. government agency. The documents were
verified by multiple independent journalists and security researchers. The NSA's
response was not to deny the programs but to argue they were legal and necessary.
ECHELON: The Cold War Foundation
The surveillance state did not begin with 9/11. Its foundations were laid during
the Cold War through the UKUSA Agreement of 1946, which established a signals
intelligence sharing arrangement between the United States, the United Kingdom,
Canada, Australia, and New Zealand  —  the alliance now known as the Five Eyes.
Under this agreement, each nation operates listening stations that intercept com
munications in their geographic region and share the intelligence with the other
four members.[2]
By the 1970s, this arrangement had evolved into ECHELON  —  a global signals intelligence collection and analysis network capable of intercepting telephone calls,
fax transmissions, and eventually email and internet traffic. ECHELON's existence
was first publicly revealed by journalist Duncan Campbell in 1988 and confirmed
by the European Parliament in a 2001 investigation. The European Parliament's
report concluded that ECHELON was being used not only for military and diplomatic intelligence but also for commercial espionage  —  intercepting communications of European companies to give American corporations a competitive advantage.
The Post-9/11 Expansion
The September 11 attacks provided the political justification for a massive expansion of domestic surveillance. The USA PATRIOT Act, signed into law on October
26, 2001  —  just 45 days after the attacks  —  contained provisions that fundamentally altered the relationship between the government and the Fourth Amendment.`},{type:`text`,text:`PROGRAM
CAPABILITY
LEGAL AUTHORITY
REVEALED BY
PRISM
Direct access to servers of Google, Facebook,
Apple, Microsoft, Yahoo, AOL, Skype,
YouTube, PalTalk
Section 702, FISA
Amendments Act
Snowden
documents, 2013
Upstream
Collection
Tapping fiber optic cables carrying internet
traffic
Section 702, FISA
Amendments Act
Snowden
documents, 2013
XKeyscore
Search "nearly everything a typical user does
on the internet"  —  emails, chats, browsing
history
Executive Order`},{type:`text`,text:`Snowden
documents, 2013
Boundless
Informant
Analytics tool tracking volume of metadata
collected globally  —  97 billion pieces in 30
days (March 2013)
Various
Snowden
documents, 2013
MUSCULAR
Tapping links between Google and Yahoo
data centers (outside U.S., bypassing FISA)
Executive Order`},{type:`text`,text:`Snowden
documents, 2013
Section 215 Bulk
Collection
Metadata of virtually every phone call in the
U.S.
PATRIOT Act Section`},{type:`text`,text:`Snowden
documents, 2013
"The NSA has built an infrastructure that allows it to intercept almost everything. With this capability, the vast majority of human communications are automatically ingested
without targeting. If I wanted to see your emails or your
wife's phone, all I have to do is use intercepts. I can get your
emails, passwords, phone records, credit cards."
EDWARD SNOWDEN, INTERVIEW WITH THE GUARDIAN, JUNE 9, 2013
ROOM 641A: AT&T'S SECRET ROOM
Before Snowden, the first major revelation about post‐9/11 domestic surveillance
came from Mark Klein, an AT&T technician who discovered in 2003 that the NSA
had installed a secret room  —  Room 641A  —  at AT&T's Folsom Street facility in San`},{type:`text`,text:`Francisco. The room contained a fiber optic splitter that copied all internet traffic
passing through the facility  —  including domestic communications  —  and routed
the  copies  to  NSA  equipment.  Klein  provided  his  evidence  to  the  Electronic
Frontier Foundation (EFF), which filed a class‐action lawsuit (Hepting v. AT&T) in
2006. Congress responded by passing the FISA Amendments Act of 2008, which
retroactively granted telecommunications companies immunity from lawsuits
for their participation in warrantless surveillance.[3]
✓ VERIFIED  —  WHISTLEBLOWER TESTIMONY & COURT RECORDS
Mark Klein's account of Room 641A is supported by physical evidence  —  including
internal AT&T documents and photographs  —  that he provided to the EFF and subsequently to Congress. AT&T did not deny the room's existence. The FISA Amendments Act of 2008 effectively confirmed the surveillance by granting retroactive
immunity to the companies that participated in it.
The FISA Court: A Rubber Stamp
The Foreign Intelligence Surveillance Court (FISC), established by the Foreign Intelligence Surveillance Act of 1978, was designed to provide judicial oversight of
intelligence surveillance. In practice, it functions as a rubber stamp. Between
1979 and 2019, the FISC received 42,135 applications for surveillance orders and
denied only 12  —  an approval rate of 99.97%. The court operates in secret, hears
only the government's arguments (there is no adversarial process), and its opinions were classified until the Snowden revelations forced partial declassification.
[4]
In 2013, declassified FISC opinions revealed that the court had found the NSA in
violation of the Fourth Amendment on multiple occasions  —  but had not shut
down the programs. Judge John Bates wrote in a 2011 opinion that the NSA had engaged in "systematic overcollection" of domestic communications and had mis
represented the scope of its activities to the court. Despite these findings, the
programs continued.
Pegasus: Israeli Spyware Goes Global
While the Five Eyes alliance represents the state‐level surveillance apparatus, a
parallel commercial surveillance industry has emerged  —  dominated by Israeli
companies. The most notorious product is Pegasus, developed by NSO Group, an
Israeli company founded in 2010 by former members of Unit 8200, the Israeli military's signals intelligence unit (Israel's equivalent of the NSA).[5]
Pegasus  is  a  "zero‐click"  spyware  capable  of  infecting  a  target's  smartphone
without any action by the user  —  no link to click, no attachment to open. Once installed, Pegasus can access all data on the device: messages (including encrypted
apps like Signal and WhatsApp), emails, photos, contacts, GPS location, and can
activate the microphone and camera without the user's knowledge.
TARGET CATEGORY
NOTABLE TARGETS
COUNTRY USING
PEGASUS
DOCUMENTATION
Journalists
Jamal Khashoggi associates
(before his murder)
Saudi Arabia
Citizen Lab, Amnesty
International
Heads of State
Emmanuel Macron (France)
Morocco (alleged)
Pegasus Project
investigation, 2021
Human Rights
Activists
Ahmed Mansoor (UAE)
UAE
Citizen Lab, 2016
Political
Opposition
Catalan independence leaders
Spain
Citizen Lab, 2022
U.S. State
Department
11 U.S. diplomats in Uganda
Uganda (alleged)
Reuters, Apple
notifications, 2021`},{type:`text`,text:`The Pegasus Project  —  a 2021 investigation by a consortium of 17 media organizations coordinated by Forbidden Stories  —  identified over 50,000 phone numbers
selected as potential targets by NSO Group's government clients. The investigation found Pegasus infections in 45+ countries, targeting journalists, human rights
activists, lawyers, political opposition figures, and heads of state.[6]
◐ CIRCUMSTANTIAL  —  THE ISRAEL-SURVEILLANCE CONNECTION
NSO Group's founders are alumni of Unit 8200, Israel's military signals
intelligence unit. The Israeli government must approve all Pegasus export licenses, effectively giving Israel a veto over which governments can use the spyware. This creates a dynamic in which Israel has leverage over the intelligence operations of dozens of countries  —  including close U.S. allies. The U.S. Commerce Department placed NSO Group on its Entity List (trade blacklist) in November 2021,
but the company continues to operate.
"Arguing that you don't care about the right to privacy because you have nothing to hide is no different than saying
you don't care about free speech because you have nothing to
say."
EDWARD SNOWDEN, REDDIT AMA, 2015
The Architecture of Total Surveillance
The surveillance state is not a single program or a single agency. It is an architecture  —  a system of interlocking legal authorities, technical capabilities, and institutional relationships that together enable the monitoring of virtually all human
communication. The NSA provides the technical infrastructure. The FISA Court
provides the legal cover. The technology companies provide the data. The tele
communications companies provide the access points. And the classification system ensures that the public cannot see what is being done in its name.
The total U.S. intelligence budget for fiscal year 2023 was $52.6 billion for the National Intelligence Program and $27.9 billion for the Military Intelligence Program  —  a combined $80.5 billion. This is more than the entire GDP of most countries. The intelligence community employs over 100,000 people, with an additional estimated 500,000 private contractors holding top‐secret clearances. Edward
Snowden was one of those contractors.[7]
✗ DISPUTED  —  SCOPE OF DOMESTIC SURVEILLANCE
The full scope of current domestic surveillance remains unknown. The Snowden
documents are from 2013. The NSA's capabilities have presumably expanded significantly in the intervening years. Section 702 of FISA was reauthorized in 2024 with
expanded authorities. The intelligence community maintains that its surveillance
activities are legal, targeted, and subject to oversight. Critics  —  including former
NSA officials like William Binney and Thomas Drake  —  argue that the surveillance
is far more extensive than the government acknowledges.
⬡ CROSS -
Post-9/11 surveillance expansion → Ch. 18 (September 11) · Israeli intelligence
technology → Ch. 6 (Mossad) · PATRIOT Act & civil liberties → Ch. 0 (The World
Today) · Intelligence-corporate partnerships → Ch. 21 (MKUltra) · Media sur-
veillance & narrative control → Ch. 20 (Operation Mockingbird) · Unit 8200 &
Israeli tech sector → Ch. 13 (U.S. Aid to Israel)`},{type:`text`,text:`★ T H E  L A R G E R  PAT T E R N
The surveillance state represents the ultimate expression of a recurring theme
in this book: the concentration of power in the hands of a few, operating in
secret, without meaningful accountability. The same intelligence agencies that
conducted MKUltra, that failed to prevent (or facilitated) 9/11, that lied about
weapons of mass destruction in Iraq  —  these are the agencies now collecting
data on every phone call you make, every email you send, and every website
you visit. The question is not whether they have this capability. Snowden
proved they do. The question is whether a free society can survive when its
government knows everything about its citizens and its citizens know nothing
about their government.
SHARE THIS CHAPTER
Every chapter of this book is designed to be shared independently. Download the
chapter infographic, share it on social media, or send the full chapter to someone
who needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source
citations and our website for verification. Every claim in this book can be independently
verified using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available
documents, government records, court filings, congressional testimony, or peer‐reviewed
research. We encourage readers to verify every claim independently. Click any hyperlinked source
below to access the original document. If a source link is broken, search the document title directly
 —  primary sources are archived across multiple platforms.`}],sources:[{id:1,text:`Glenn Greenwald, "NSA collecting phone records of millions of Verizon customers daily," The Guardian, June 6, 2013.`},{id:2,text:`European Parliament, "Report on the existence of a global system for the interception of private and commercial communications (ECHELON interception system)," A5-0264/2001, July 11, 2001.`},{id:3,text:`Electronic Frontier Foundation, "Hepting v. AT&T," case documentation. Mark Klein's declaration and supporting evidence available at eff.org.`},{id:4,text:`Federation of American Scientists, "Foreign Intelligence Surveillance Act Court Orders 1979-2019." FISC annual reports to Congress. See also: EPIC FISA page.`},{id:5,text:`Citizen Lab, "Hide and Seek: Tracking NSO Group's Pegasus Spyware to Operations in 45 Countries," September 18, 2018. University of Toronto.`},{id:6,text:`The Pegasus Project, coordinated by Forbidden Stories with Amnesty International's Security Lab. Published by The Guardian, Le Monde, The Washington Post, and 14 other outlets, July 2021.`},{id:7,text:`Office of the Director of National Intelligence, "U.S. Intelligence Community Budget," FY 2023. Available at dni.gov.`},{id:8,text:`Glenn Greenwald, No Place to Hide: Edward Snowden, the NSA, and the U.S. Surveillance State (Metropolitan Books, 2014).`},{id:9,text:`Barton Gellman, Dark Mirror: Edward Snowden and the American Surveillance State (Penguin Press, 2020).`},{id:10,text:`Laura Poitras (director), Citizenfour (documentary film), 2014. Academy Award for Best Documentary Feature.`}],crossLinks:[{label:`Chapter 18: Operation Mockingbird`,chapterId:`chapter-18`},{label:`Chapter 19: MKUltra`,chapterId:`chapter-19`}],keywords:[`surveillance`,`ECHELON`,`NSA`,`Pegasus`,`Snowden`,`PRISM`,`privacy`]},{id:`chapter-28`,number:`Chapter 28`,title:`The Epstein Files`,subtitle:`The intelligence-linked operation that compromised the world\\'s most powerful people — documented through court filings, flight logs, and the testimony of survivors.`,dateRange:`1991–2026`,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`The Epstein Files: Where All
Roads Lead
Jeffrey Epstein moved in the same circles as the men who designed the Federal
Reserve, funded prime ministers, and owned the banks that own the central
bank. This final chapter documents what is known, what is suspected, and
what the 3.5 million pages released in January 2026 have revealed about the
most consequential criminal network of the modern era.`},{type:`text`,text:`~150
DOCUMENTED
VICTIMS (EVCP
2021)`},{type:`text`,text:`CRIMINAL ARRESTS
(EPSTEIN,
MAXWELL, BRUNEL,
ANDREW,
MANDELSON)
$705M+
TOTAL
SETTLEMENTS
(JPMORGAN,
DEUTSCHE BANK,
ESTATE)
3.5M
PAGES RELEASED BY
DOJ, JANUARY 2026
effrey Edward Epstein was born on January 20, 1953, in Brooklyn, New York, to
working-class Jewish parents. He dropped out of Cooper Union after one year,
taught mathematics at the Dalton School in Manhattan, and was hired by Bear
Stearns in 1976 without a college degree. By 1981, he had been asked to leave Bear
Stearns  —  the circumstances have never been fully explained. By 1982, he had foun-
ded his own financial management firm, J. Epstein & Co., which claimed to manage
money exclusively for clients with a minimum of $1 billion in assets.
[1]
The question of how Jeffrey Epstein  —  a college dropout with a murky financial his-
tory  —  came to manage the fortunes of the world's wealthiest people has never been
satisfactorily answered. What is documented is that his primary patron was Leslie`},{type:`text`,text:`Wexner, the founder of L Brands (Victoria's Secret, Bath & Body Works), who gave Ep-
stein an extraordinary power of attorney in 1991 that allowed him to act on Wexner's
behalf in virtually all financial matters. Wexner transferred to Epstein approxim-
ately $1 billion in assets over the course of their relationship.
[1]`},{type:`text`,text:`P A R T  I
The Network: Who Epstein Knew and
What He Did for Them
Jeffrey Epstein and Ghislaine Maxwell, photographed together at a social event. Maxwell was Epstein's primary accomplice in the
recruitment and trafficking of underage girls. She was convicted in December 2021 and sentenced to 20 years in federal prison.
(Court exhibit)
Epstein's network was not primarily a sexual trafficking operation  —  it was a finan-
cial and intelligence operation that used sexual blackmail as a tool of leverage. The
documented evidence suggests that Epstein's primary business was not managing
money but managing people: collecting compromising information on the world's
most powerful individuals and using that information to maintain his position in
their circles.
[2]`},{type:`text`,text:`Ghislaine Maxwell
CONVICTED  —  20 YEARS
Epstein's primary ac-
complice. Recruited
victims, participated
in abuse, managed the
household. Convicted
December 2021 on 5
counts including sex
trafficking of a minor.
Sentenced June 2022.
Currently serving sen-
tence at FCI Talla-
hassee.
Les Wexner
NAMED  —  NOT CHARGED
Epstein's primary pat-
ron. Gave Epstein
power of attorney in
1991. Transferred ap-
proximately $1 billion
in assets. Transferred 9
East 71st Street town-
house to Epstein for $0.
Claims he was "victim-
ized" by Epstein.
Bill Gates
NAMED  —  NOT CHARGED
Microsoft co-founder.
~$108B net worth. Met
Epstein multiple times
2010–2014, all post-con-
viction. MIT directed
$2M gift at Epstein's re-
quest. Melinda cited
Epstein meetings as
factor in divorce. Gates
has acknowledged
meetings but denied
wrongdoing.`},{type:`text`,text:`Prince Andrew
ARRESTED  —  FEB. 2026
Duke of York. Bucking-
ham Palace emails con-
firm he was "delighted"
to visit Epstein. Virgin-
ia Giuffre alleged she
was trafficked to him
at age 17. Settled Giuf-
fre's civil lawsuit for an
undisclosed sum in
2022. Arrested Febru-
ary 2026.
Leon Black
CIVIL LIABILITY  — 
RESIGNED
Founder of Apollo
Global Management.
Paid Epstein $170M in
fees. Resigned as
Apollo CEO in 2021
after internal review.
Co-owner with Ronald
Lauder of an Epstein-
structured LLC holding
$25M in artwork.
(Bloomberg, Feb. 2026)
Bill Clinton
NAMED  —  NOT CHARGED
42nd President. Flew
on Epstein's private jet
("Lolita Express") at
least 26 times per flight
logs. Visited Little St.
James Island. Epstein's
2019 black book listed
Clinton's contact. Clin-
ton denies any know-
ledge of Epstein's
crimes.`},{type:`text`,text:`P A R T  I I
The Financial Architecture: How
Epstein's Money Worked
Epstein's financial operation was, at its core, a money management and financial
structuring business for the ultra-wealthy. He charged fees of up to 15% of assets un-
der management  —  far above the industry standard  —  and provided services that
went  beyond  investment  management:  tax  structuring,  LLC  formation,  and  the
management of sensitive financial relationships.
[3]
✓ VERIFIED  —  EPSTEIN'S FINANCIAL ARCHITECTURE
J. Epstein & Co.: Epstein's financial management firm, founded 1982. Claimed to man-
age money exclusively for clients with $1B+ in assets. The firm's actual client list has
never been fully disclosed.
The Wexner transfer: Between 1991 and approximately 2007, Wexner transferred ap-
proximately $1 billion in assets to Epstein, including the 9 East 71st Street townhouse
(transferred for $0), a stake in a Florida property, and various financial instruments.
The 1991 power of attorney gave Epstein authority to manage Wexner's personal and
business affairs.
Leon Black's $170M: Apollo Global Management's independent review, conducted by
law firm Dechert LLP in 2021, found that Black paid Epstein approximately $158 mil-
lion between 2012 and 2017 for tax and estate planning advice, and an additional $12
million in other payments. The review found no evidence that Black participated in
Epstein's criminal activities.
Bank settlements: JPMorgan Chase settled with Epstein victims for $290 million in
2023, acknowledging it had processed payments for Epstein's trafficking operation for
over a decade despite internal warnings. Deutsche Bank settled for $75 million in
2023. The Epstein estate paid approximately $340 million to victims through the
Epstein Victims' Compensation Program.`},{type:`text`,text:`INSTITUTION
SETTLEMENT AMOUNT
BASIS
YEAR
JPMorgan
Chase
$290 million
Processed payments for trafficking operation despite
internal warnings`},{type:`text`,text:`Deutsche Bank
$75 million
Maintained banking relationship with Epstein after
2008 conviction`},{type:`text`,text:`Epstein Estate
~$340 million
Epstein Victims' Compensation Program (2021)`},{type:`text`,text:`Prince Andrew
Undisclosed (est. $12–
16M)
Settlement of Virginia Giuffre's civil lawsuit`},{type:`text`,text:`Total
$705M+`},{type:`text`,text:`P A R T  I I I
The Intelligence Question: What the
Documents Suggest
The most persistent and most consequential question surrounding the Epstein case
is whether he was operating as an intelligence asset  —  collecting compromising in-
formation on powerful individuals on behalf of a government intelligence agency.
This question has never been definitively answered. But the documented evidence
that supports it is substantial enough to warrant serious examination.
[4]
⚠ CIRCUMSTANTIAL EVIDENCE  —  THE INTELLIGENCE ASSET QUESTION
The following facts are individually documented. Their cumulative significance is
contested but cannot be dismissed:
1. The Acosta Statement: Alexander Acosta, who negotiated the 2008 non-prosecution
agreement as U.S. Attorney for the Southern District of Florida, reportedly told Trump
transition officials in 2018 that he had been told Epstein "belonged to intelligence"
and to "leave it alone." This was reported by journalist Vicky Ward in 2019. Acosta has
denied making this statement. The source of the claim is a single unnamed source.
2. The Surveillance Equipment: When Epstein's Manhattan townhouse was searched
after his 2019 arrest, investigators found a large quantity of compact discs labeled
with the names of prominent individuals, along with sophisticated surveillance
equipment. The contents of those discs have not been publicly disclosed.
3. The Ghislaine Maxwell Connection: Ghislaine Maxwell's father, Robert Maxwell,
was a British media mogul who died under mysterious circumstances in 1991  —  fall-
ing from his yacht in the Atlantic Ocean. He was subsequently revealed to have been a
Mossad asset, according to reporting by Seymour Hersh and others. The connection
between Robert Maxwell's intelligence work and his daughter's relationship with
Epstein has never been publicly investigated.
4. The 2008 NPA: The non-prosecution agreement negotiated by Acosta in 2008 was ex-
traordinarily lenient  —  13 months in county jail, with work release allowing Epstein
to leave jail 12 hours a day, 6 days a week. The agreement also granted immunity to`},{type:`text`,text:`unnamed "potential co-conspirators." The identity of those co-conspirators has never
been publicly disclosed.
5. The Death: Epstein died in federal custody on August 10, 2019, while awaiting trial
on federal sex trafficking charges. The official cause of death was suicide by hanging.
The medical examiner who performed the autopsy, Dr. Michael Baden, concluded
that the injuries were "more consistent with homicidal strangulation than suicidal
hanging." The two guards on duty were asleep. The surveillance cameras outside his
cell malfunctioned. He had been taken off suicide watch 12 days before his death  — 
the same day, according to court documents, that he had begun discussions with
prosecutors about cooperating.
No smoking gun: There is no documented evidence that Epstein was an intelligence
asset. The circumstantial case is real and substantial. The documented facts  —  the le-
nient plea deal, the surveillance equipment, the Maxwell family intelligence connec-
tions, the death under suspicious circumstances  —  are consistent with an intelligence
operation. They are also consistent with other explanations. A definitive conclusion
has not been reached on the basis of publicly available evidence.`},{type:`text`,text:`P A R T  I V
The Convergence: Where the Epstein
Files Meet This Book
The Epstein files are not an isolated scandal. They are the visible surface of a net-
work that connects every thread in this book. The men who appear in the Epstein
files are the same men  —  or the heirs and successors of the same men  —  who appear
throughout  the  history  of  central  banking,  financial  power,  and  political
assassination documented in the preceding chapters.
[5]
CONNECTION`},{type:`text`,text:`Ronald Lauder →
Epstein
Chapter 7
Epstein set up LLC for Lauder and Leon Black to hold $25M in
artwork. (Bloomberg, Feb. 2026)
Ronald Lauder → Fed
Chair
Chapter 7
Lauder's son-in-law Kevin Warsh nominated as Fed Chair by
Trump, January 2026.
Kevin Warsh →
Warburg Dynasty
Chapters 3, 4, 7
Warsh is a descendant of the Warburg banking dynasty that
designed the Federal Reserve.
Les Wexner → Epstein
Chapter 9
Wexner transferred ~$1B in assets to Epstein. Power of attorney
1991. Townhouse transferred for $0.
Leon Black → Epstein
→ Lauder
Chapters 7, 9
Black paid Epstein $170M. Black and Lauder co-owned Epstein-
structured LLC. Black resigned as Apollo CEO.
JPMorgan → Epstein
→ Fed
Chapters 8, 9
JPMorgan is the second-largest owner of the NY Fed. JPMorgan
processed Epstein payments for over a decade. Settled for $290M.
Bill Gates → Epstein →
MIT
Chapter 9
Gates met Epstein 2010–2014. MIT received $2M gift directed by
Epstein. Gates Foundation's global health agenda.`},{type:`quote`,quote:{text:`The documentary record indicates that not a conspiracy
theory. It is a pattern of documented facts that, taken together, describe a world in which the same small number
of people have controlled the money, the governments, and
the secrets of the most powerful nations on earth for more
than a century.`,attribution:`B.R.  —  CLOSING OBSERVATION, , MARCH 2026`}},{type:`text`,text:`P A R T  V
The January 2026 Document Release:
What We Now Know
On January 30, 2026, the Department of Justice published approximately 3.5 million
pages of documents in compliance with the Epstein Victims' Privacy and Transpar-
ency Act. Attorney General Pamela Bondi announced the release as a first phase of
declassification. The documents included FBI investigative files, grand jury materi-
als, financial records, and communications that had been sealed for years.
[6]
✓ VERIFIED  —  KEY REVELATIONS FROM THE JANUARY 2026 RELEASE
The FBI co-conspirators list: The released documents include an FBI investigative
document listing individuals identified as potential co-conspirators in Epstein's traf-
ficking operation. The list includes names that have not been publicly charged.
Prince Andrew's arrest: In February 2026, Prince Andrew was arrested in the United
Kingdom in connection with charges related to the Epstein investigation. He was
released on bail. His trial date has not been set.
Peter Mandelson's arrest: Former British Cabinet minister and EU Trade Commission-
er Peter Mandelson was arrested in February 2026 in connection with the Epstein
investigation. He was released on bail.
The Lauder-Black LLC: Bloomberg reported on February 6, 2026, based on documents
in the release, that Epstein set up an LLC for Ronald Lauder and Leon Black to hold
approximately $25 million in artwork.
The Gates documents: CNN reported on February 5, 2026, that documents in the re-
lease include communications between Epstein and associates discussing Bill Gates
and his relationship with Epstein, including references to a potential investment in a
Gates-related project.`},{type:`text`,text:`The Complete Timeline: 1991 – 2026`},{type:`text`,text:`Les Wexner grants Epstein power of attorney. The Epstein financial network
begins to take shape.`},{type:`text`,text:`Epstein begins systematic abuse of underage girls in Palm Beach, Florida. The
recruitment operation uses the Victoria's Secret "talent scout" cover story.`},{type:`text`,text:`Palm Beach Police Department opens investigation after a parent reports Ep-
stein. Investigators identify 36 underage victims in Palm Beach alone.`},{type:`text`,text:`Acosta negotiates the non-prosecution agreement. Epstein pleads guilty to two
state charges. 13 months in county jail, work release. Immunity granted to
unnamed co-conspirators.`},{type:`text`,text:`Bill Gates begins meeting with Epstein, post-conviction. Meetings continue
through 2014.`},{type:`text`,text:`July 6: Epstein arrested by SDNY on federal sex trafficking charges. July 23: Ep-
stein found unresponsive in cell, placed on suicide watch. July 29: Taken off
suicide watch. August 10: Found dead in cell. Official cause: suicide. Dr.
Michael Baden disputes finding.`},{type:`text`,text:`July 1: Ghislaine Maxwell arrested. December 29: Maxwell convicted on 5
counts. Epstein Victims' Compensation Program pays ~$340M to survivors.`},{type:`text`,text:`June 28: Maxwell sentenced to 20 years. Prince Andrew settles Virginia
Giuffre's civil lawsuit for undisclosed sum (est. $12–16M).`},{type:`text`,text:`JPMorgan settles for $290M. Deutsche Bank settles for $75M. Total settlements
exceed $705M.`},{type:`text`,text:`April 25: Virginia Giuffre, Epstein's most prominent accuser, dies by suicide at
age 41.`},{type:`text`,text:`January 30: DOJ releases 3.5 million pages of Epstein documents. February:
Prince Andrew and Peter Mandelson arrested. Bloomberg reports Lauder-
Black-Epstein LLC. Trump nominates Kevin Warsh (Lauder's son-in-law,
Warburg descendant) as Fed Chair.
The greatest story never told is not a conspiracy theory. It is a docu-
mented history of how financial power, political influence, and crim-
inal leverage have been concentrated in the same small network of
families and institutions for more than a century.
The Rothschilds built the Bank of England. The Warburgs designed
the Federal Reserve. The Lauders funded the Israeli prime minister.
The Warburg heir married the Lauder daughter and was nominated
to chair the Fed. The banks that own the Fed processed payments for
a sex trafficking operation for over a decade. The man who ran that
operation died in federal custody under circumstances that have
never been satisfactorily explained.
These are not theories. They are documented facts. The question is
not whether they are true. The question is what we choose to do with
the truth.
 —  B.R., March 2026`},{type:`text`,text:`M AINSTREAM POSITION & COUNTER-ARGUMENTS
The official cause of Jeffrey Epstein's death was suicide by hanging, as determined by
the New York City Medical Examiner. While the circumstances  —  including camera
malfunctions and guard lapses  —  have fueled speculation, the medical examiner's of-
fice has maintained its finding. Epstein's defense attorneys hired forensic pathologist
Dr. Michael Baden, who disputed the finding, but the official ruling stands. The reader
should evaluate the forensic evidence, the documented institutional failures, and the
competing expert opinions independently.
SHARE THIS CHAPTER
Every  chapter  of  this  book  is  designed  to  be  shared  independently.  Download  the
chapter infographic, share it on social media, or send the full chapter to someone who
needs to see it.
veritasworldwide.com
How to share: Download the chapter infographic image from veritasworldwide.com  — 
optimized for Instagram, X (Twitter), and Facebook. All infographics include source citations
and our website for verification. Every claim in this book can be independently verified
using the sources listed below. 
Verify Everything: Every factual claim in this chapter is sourced from publicly available documents,
government records, court filings, congressional testimony, or peer-reviewed research. We encourage
readers to verify every claim independently. Click any hyperlinked source below to access the original
document. If a source link is broken, search the document title directly  —  primary sources are
archived across multiple platforms.`}],sources:[{id:1,text:`SDNY Indictment, United States v. Jeffrey Epstein, July 2019. Available at: justice.gov/usao-sdny`},{id:2,text:`Julie K. Brown, "How a Future Trump Cabinet Member Gave a Serial Sex Abuser the Deal of a Lifetime," Miami Herald, November 28, 2018.`},{id:3,text:`Dechert LLP, "Independent Review of Apollo's Relationship with Jeffrey Epstein," January 2021.`},{id:4,text:`Vicky Ward, "The Talented Mr. Epstein," Vanity Fair, March 2003; "Jeffrey Epstein: International Moneyman of Mystery," Vanity Fair, 2003.`},{id:5,text:`Bloomberg News, "Epstein Set Up LLC for Lauder, Black to Hold $25 Million Artwork," February 6, 2026.`},{id:6,text:`DOJ Press Release, "Attorney General Pamela Bondi Releases First Phase of Declassified Epstein Files," January 30, 2026. Available at: justice.gov`},{id:7,text:`CNN, "Bill Gates Scrutiny in Justice Department Documents," February 5, 2026.`},{id:8,text:`Al Jazeera, "Epstein Files: The Arrests and the Resignations," February 24, 2026.`},{id:9,text:`Wikipedia, "List of People Named in the Epstein Files." Available at: en.wikipedia.org`},{id:10,text:`United States v. Ghislaine Maxwell, SDNY, 2021. Conviction and sentencing documents available at: justice.gov/usao-sdny`}],crossLinks:[{label:`Chapter 26: Bohemian Grove`,chapterId:`chapter-26`},{label:`Chapter 7: Mossad: The Institute`,chapterId:`chapter-7`}],keywords:[`Epstein`,`Maxwell`,`trafficking`,`intelligence`,`blackmail`,`court filings`]},{id:`epilogue`,number:`Epilogue`,title:`A Note on Continued Research & Primary Source Access`,subtitle:`Where to find the original documents, how to verify the claims in this book, and how to continue the investigation.`,dateRange:``,author:`B.R.`,publishDate:`March 2026`,content:[{type:`dropcap`,text:`·   E P I L O G U E
What You
Can Do
A Call to Action, a Reader's Investigation Kit,
and a Guide to the Primary Sources
By B.R.  ·  Research Correspondent  ·  March 2026`},{type:`text`,text:`I
E P I L O G U E   ·   
What You Can Do: Knowledge Is
Not Enough
The purpose of this book is not to make you angry. Anger without action is just
entertainment. The purpose of this book is to give you the documented facts,
the primary sources, and the analytical framework to understand how power
actually works  —  and then to act on that understanding in whatever way is
available to you.`},{type:`text`,text:`f you have read this book from the beginning, you have now encountered three
hundred years of documented history that the mainstream media, the educational  system,  and  the  political  establishment  have  consistently  failed  to
present in a coherent, connected form. The individual facts in this book are not
secret. They are in the Congressional Record, the National Archives, the Federal Register, and the public court records. What is missing from the mainstream narrative
is the connections  —  the thread that runs from the Bank of England in 1694 to the
Federal Reserve in 1913 to the Epstein files in 2026.
The question is: what do you do with this information? The answer depends on who
you are and what resources you have. But there are actions available to every reader
of this book, regardless of their circumstances.
"The only thing necessary for the triumph of evil is for good
men to do nothing."`},{type:`text`,text:`EDMUND BURKE  —  ATTRIBUTED, WIDELY CITED, EXACT ORIGIN DISPUTED
Ten Actions You Can Take Today
ACTION 01
Read the Primary Sources Yourself
Every document cited in this book is publicly available. The Federal Reserve Act is on
the Library of Congress website. Executive Order 11110 is in the Federal Register. The
Epstein indictment is on the SDNY website. The Maxwell trial transcripts are in the
public court record. The GAO audit of the Federal Reserve is on gao.gov. The Senate
Permanent Subcommittee investigation is on hsgac.senate.gov. Do not take this book's
word for it. Read the documents. Form your own conclusions.
ACTION 02
Share This Book  —  Especially the Sources
The most effective way to spread this information is not to share opinions about it  —  it
is to share the primary source documents. When you share a link to the GAO audit, or
the Senate investigation, or the Epstein indictment, you are giving people something
they can verify themselves. That is far more persuasive than any argument you can
make. Share the documents. Let the documents speak.
ACTION 03
Understand How Your Money Works
Chapter 9 of this book explains, in plain English, how the Federal Reserve creates
money, how the banking system multiplies that money through fractional reserve
lending, and who receives the dividends from the bonds the Fed purchases. Understanding this system is the foundation of financial literacy. Without it, you cannot understand why inflation happens, why interest rates matter, or why the same banks
keep getting bailed out. Teach this to your children.`},{type:`text`,text:`ACTION 04
Demand Accountability from Your Elected Representatives
The Federal Reserve has never been fully audited. The first partial audit, conducted
by the GAO in 2011, revealed $16.1 trillion in secret emergency loans. Senator Bernie
Sanders, who inserted the audit provision into the Dodd‐Frank Act, has called for a
full audit of the Federal Reserve every year since. Congressman Ron Paul introduced
the "Audit the Fed" bill in every session of Congress from 1983 to 2012. Ask your representative where they stand on auditing the Federal Reserve. Their answer will tell
you a great deal.
ACTION 05
Support Independent Journalism
The stories in this book were not broken by the major television networks or the
largest newspapers. They were broken by independent journalists  —  I.F. Stone, Seymour Hersh, Glenn Greenwald, Matt Taibbi, Whitney Webb  —  who were willing to follow the evidence wherever it led, regardless of the consequences. Independent journalism is under existential financial pressure. If you value this kind of work, support
the journalists and publications that do it.
ACTION 06
Diversify Out of the Dollar System
This is not financial advice. It is a factual observation: the dollar has lost 85% of its
purchasing power since 1971. The Federal Reserve has expanded its balance sheet
from $900 billion in 2008 to over $8 trillion in 2022. The petrodollar system that has
underpinned dollar hegemony for fifty years is under its most serious challenge since
its creation. Understanding these facts is the beginning of making informed decisions
about your own financial situation.`},{type:`text`,text:`ACTION 07
Support the Epstein Victims
Virginia Giuffre, who died by suicide on April 25, 2025, spent the last decade of her
life fighting for accountability for herself and for the other survivors of Jeffrey Epstein's abuse. The Epstein Victims' Compensation Program has paid approximately
$121 million to approximately 150 claimants. The full list of Epstein's co‐conspirators
 —  named in the FBI's 2006 investigation  —  has not been fully prosecuted. The survivors deserve justice. The public record is available. The pressure for accountability
must continue.
ACTION 08
Teach History as It Actually Happened
The history documented in this book  —  the Bank War, the Jekyll Island meeting, the
Warburg brothers, Executive Order 11110, the petrodollar system  —  is not taught in
most American schools. It is not secret. It is simply inconvenient. If you are a teacher,
a parent, or anyone who has influence over what young people learn, consider
introducing them to the primary sources. Carroll Quigley's Tragedy and Hope is available free at archive.org. G. Edward Griffin's The Creature from Jekyll Island is available at
most libraries. The documents are there. The question is whether we choose to read
them.
ACTION 09
Follow the Kevin Warsh Nomination
As of March 2026, Kevin Warsh  —  son‐in‐law of Ronald Lauder, who funded Benjamin
Netanyahu's 1996 election campaign and has been a documented associate of Jeffrey
Epstein  —  has been nominated by President Trump to chair the Federal Reserve. His
confirmation hearing will be a test of whether the Senate will ask the questions that
this book documents. Follow the confirmation process. Contact your senators. Ask
them to ask the questions.`},{type:`text`,text:`ACTION 10
If You Know Something, Say Something
This book is a beginning, not an end. The investigation is ongoing. If you have documents, testimony, or evidence that is relevant to the stories told here  —  particularly
regarding the Epstein network, the Federal Reserve's ownership structure, or the
political financing documented in Chapter 11  —  there are secure channels for sharing
that information. The Freedom of the Press Foundation (freedom.press) operates SecureDrop, a secure whistleblower submission system used by major news organizations. The information you have may be the piece that completes the picture.
The Reader's Investigation Kit: Primary Sources by
Chapter
CHAPTERS 1–3: CENTRAL BANKING HISTORY
The Federal Reserve Act (1913)
Available at: loc.gov (Library of Congress). The original text of the legislation that created the Federal Reserve.
G. Edward Griffin, The Creature from Jekyll Island (1994)
The most comprehensive documented account of the Jekyll Island meeting and the creation of the Federal Reserve.
Available at most libraries and archive.org.
Congressional Record, 1913 Federal Reserve Debates
Available at: congress.gov. Includes the floor speeches of Representative Charles Lindbergh Sr. opposing the Federal
Reserve Act.
CHAPTERS 4–5: WARBURG BROTHERS, WWI, HENRY FORD
Henry Ford, The International Jew (1920–1922)
Available at archive.org. Read in historical context. The documented facts about Ford's relationship with the banking
establishment are separate from his antisemitic conclusions.
Anthony Sutton, Wall Street and the Bolshevik Revolution (1974)
Documented academic research on the financing of the Russian Revolution by American banking interests. Available at
archive.org.`},{type:`text`,text:`CHAPTER 6: JFK AND EXECUTIVE ORDER 11110
Executive Order 11110 ( June 4, 1963)
Available at: federalregister.gov. The full text of the order. Read it and form your own conclusions about its scope and
significance.
Warren Commission Report (1964)
Available at: archives.gov. The official investigation into JFK's assassination. Also available: the House Select Committee
on Assassinations report (1979), which concluded there was "probably" a conspiracy.
CHAPTERS 9–10: FEDERAL RESERVE AND 2008 CRISIS
GAO Audit of the Federal Reserve (2011)
GAO-11-696. Available at: gao.gov. The first audit of the Federal Reserve in its history. Documents $16.1 trillion in
emergency loans.
Senate Permanent Subcommittee on Investigations Report (2011)
Available at: hsgac.senate.gov. 635 pages documenting the causes of the 2008 financial crisis, including Goldman Sachs's
role.
Financial Crisis Inquiry Commission Report (2011)
Available at: fcic.law.stanford.edu. The official government investigation into the 2008 crisis.
CHAPTERS 11–12: LAUDER DYNASTY AND EPSTEIN FILES
SDNY Epstein Indictment (2019)
Available at: justice.gov/usao-sdny. The federal indictment of Jeffrey Epstein for sex trafficking.
DOJ Epstein Files Release ( January 30, 2026)
Available at: justice.gov. 3.5 million pages of documents released under the Epstein Files Transparency Act.
Maxwell Trial Transcripts (2021)
Available at: courtlistener.com (PACER). The complete trial transcripts from United States v. Ghislaine Maxwell.
The truth does not require your belief. It requires only your attention. The
documents are there. The connections are there. The history is there. What
has been missing is the willingness to look at it all together, in sequence, and
to follow the thread wherever it leads.
This book has followed that thread. What you do with it is up to you.`},{type:`text`,text:`—  B.R.  ·  March 2026`}],sources:[{id:2026,text:`I E P I L O G U E   ·    What You Can Do: Knowledge Is Not Enough The purpose of this book is not to make you angry. Anger without action is just entertainment. The purpose of this book is to give you the documented facts, the primary sources, and the analytical framework to understand how power actually works  —  and then to act on that understanding in whatever way is available to you.`},{id:1694,text:`to the Federal Reserve in 1913 to the Epstein files in 2026. The question is: what do you do with this information? The answer depends on who you are and what resources you have. But there are actions available to every reader of this book, regardless of their circumstances. "The only thing necessary for the triumph of evil is for good men to do nothing."`},{id:1,text:`Read the Primary Sources Yourself Every document cited in this book is publicly available. The Federal Reserve Act is on the Library of Congress website. Executive Order 11110 is in the Federal Register. The Epstein indictment is on the SDNY website. The Maxwell trial transcripts are in the public court record. The GAO audit of the Federal Reserve is on gao.gov. The Senate Permanent Subcommittee investigation is on hsgac.senate.gov. Do not take this book's word for it. Read the documents. Form your own conclusions. ACTION 02 Share This Book  —  Especially the Sources The most effective way to spread this information is not to share opinions about it  —  it is to share the primary source documents. When you share a link to the GAO audit, or the Senate investigation, or the Epstein indictment, you are giving people something they can verify themselves. That is far more persuasive than any argument you can make. Share the documents. Let the documents speak. ACTION 03 Understand How Your Money Works Chapter 9 of this book explains, in plain English, how the Federal Reserve creates money, how the banking system multiplies that money through fractional reserve lending, and who receives the dividends from the bonds the Fed purchases. Understanding this system is the foundation of financial literacy. Without it, you cannot understand why inflation happens, why interest rates matter, or why the same banks keep getting bailed out. Teach this to your children.`},{id:4,text:`Demand Accountability from Your Elected Representatives The Federal Reserve has never been fully audited. The first partial audit, conducted by the GAO in 2011, revealed $16.1 trillion in secret emergency loans. Senator Bernie Sanders, who inserted the audit provision into the Dodd‐Frank Act, has called for a full audit of the Federal Reserve every year since. Congressman Ron Paul introduced the "Audit the Fed" bill in every session of Congress from 1983 to 2012. Ask your representative where they stand on auditing the Federal Reserve. Their answer will tell you a great deal. ACTION 05 Support Independent Journalism The stories in this book were not broken by the major television networks or the largest newspapers. They were broken by independent journalists  —  I.F. Stone, Seymour Hersh, Glenn Greenwald, Matt Taibbi, Whitney Webb  —  who were willing to follow the evidence wherever it led, regardless of the consequences. Independent journalism is under existential financial pressure. If you value this kind of work, support the journalists and publications that do it. ACTION 06 Diversify Out of the Dollar System This is not financial advice. It is a factual observation: the dollar has lost 85% of its purchasing power since 1971. The Federal Reserve has expanded its balance sheet from $900 billion in 2008 to over $8 trillion in 2022. The petrodollar system that has underpinned dollar hegemony for fifty years is under its most serious challenge since its creation. Understanding these facts is the beginning of making informed decisions about your own financial situation.`},{id:7,text:`Support the Epstein Victims Virginia Giuffre, who died by suicide on April 25, 2025, spent the last decade of her life fighting for accountability for herself and for the other survivors of Jeffrey Epstein's abuse. The Epstein Victims' Compensation Program has paid approximately $121 million to approximately 150 claimants. The full list of Epstein's co‐conspirators  —  named in the FBI's 2006 investigation  —  has not been fully prosecuted. The survivors deserve justice. The public record is available. The pressure for accountability must continue. ACTION 08 Teach History as It Actually Happened The history documented in this book  —  the Bank War, the Jekyll Island meeting, the Warburg brothers, Executive Order 11110, the petrodollar system  —  is not taught in most American schools. It is not secret. It is simply inconvenient. If you are a teacher, a parent, or anyone who has influence over what young people learn, consider introducing them to the primary sources. Carroll Quigley's Tragedy and Hope is available free at archive.org. G. Edward Griffin's The Creature from Jekyll Island is available at most libraries. The documents are there. The question is whether we choose to read them. ACTION 09 Follow the Kevin Warsh Nomination As of March 2026, Kevin Warsh  —  son‐in‐law of Ronald Lauder, who funded Benjamin Netanyahu's 1996 election campaign and has been a documented associate of Jeffrey Epstein  —  has been nominated by President Trump to chair the Federal Reserve. His confirmation hearing will be a test of whether the Senate will ask the questions that this book documents. Follow the confirmation process. Contact your senators. Ask them to ask the questions.`},{id:10,text:`If You Know Something, Say Something This book is a beginning, not an end. The investigation is ongoing. If you have documents, testimony, or evidence that is relevant to the stories told here  —  particularly regarding the Epstein network, the Federal Reserve's ownership structure, or the political financing documented in Chapter 11  —  there are secure channels for sharing that information. The Freedom of the Press Foundation (freedom.press) operates SecureDrop, a secure whistleblower submission system used by major news organizations. The information you have may be the piece that completes the picture. The Reader's Investigation Kit: Primary Sources by Chapter CHAPTERS 1–3: CENTRAL BANKING HISTORY The Federal Reserve Act (1913) Available at: loc.gov (Library of Congress). The original text of the legislation that created the Federal Reserve. G. Edward Griffin, The Creature from Jekyll Island (1994) The most comprehensive documented account of the Jekyll Island meeting and the creation of the Federal Reserve. Available at most libraries and archive.org. Congressional Record, 1913 Federal Reserve Debates Available at: congress.gov. Includes the floor speeches of Representative Charles Lindbergh Sr. opposing the Federal Reserve Act. CHAPTERS 4–5: WARBURG BROTHERS, WWI, HENRY FORD Henry Ford, The International Jew (1920–1922) Available at archive.org. Read in historical context. The documented facts about Ford's relationship with the banking establishment are separate from his antisemitic conclusions. Anthony Sutton, Wall Street and the Bolshevik Revolution (1974) Documented academic research on the financing of the Russian Revolution by American banking interests. Available at archive.org.`},{id:11110,text:`Executive Order 11110 ( June 4, 1963) Available at: federalregister.gov. The full text of the order. Read it and form your own conclusions about its scope and significance. Warren Commission Report (1964) Available at: archives.gov. The official investigation into JFK's assassination. Also available: the House Select Committee on Assassinations report (1979), which concluded there was "probably" a conspiracy. CHAPTERS 9–10: FEDERAL RESERVE AND 2008 CRISIS GAO Audit of the Federal Reserve (2011) GAO-11-696. Available at: gao.gov. The first audit of the Federal Reserve in its history. Documents $16.1 trillion in emergency loans. Senate Permanent Subcommittee on Investigations Report (2011) Available at: hsgac.senate.gov. 635 pages documenting the causes of the 2008 financial crisis, including Goldman Sachs's role. Financial Crisis Inquiry Commission Report (2011) Available at: fcic.law.stanford.edu. The official government investigation into the 2008 crisis. CHAPTERS 11–12: LAUDER DYNASTY AND EPSTEIN FILES SDNY Epstein Indictment (2019) Available at: justice.gov/usao-sdny. The federal indictment of Jeffrey Epstein for sex trafficking. DOJ Epstein Files Release ( January 30, 2026) Available at: justice.gov. 3.5 million pages of documents released under the Epstein Files Transparency Act. Maxwell Trial Transcripts (2021) Available at: courtlistener.com (PACER). The complete trial transcripts from United States v. Ghislaine Maxwell. The truth does not require your belief. It requires only your attention. The documents are there. The connections are there. The history is there. What has been missing is the willingness to look at it all together, in sequence, and to follow the thread wherever it leads. This book has followed that thread. What you do with it is up to you.`}],crossLinks:[{label:`Overview: The World Today`,chapterId:`overview`},{label:`Foreword: Methodology`,chapterId:`foreword`}],keywords:[`research`,`primary sources`,`FOIA`,`archives`,`verification`]}];function gr(e){if(!e.trim())return[];let t=e.toLowerCase().split(/\s+/);return hr.filter(e=>{let n=[e.title,e.subtitle,e.dateRange,...e.keywords,...e.content.map(e=>e.text||e.quote?.text||e.evidence?.text||``),...e.sources.map(e=>e.text)].join(` `).toLowerCase();return t.every(e=>n.includes(e))}).sort((e,n)=>{let r=t.filter(t=>e.keywords.join(` `).toLowerCase().includes(t)).length;return t.filter(e=>n.keywords.join(` `).toLowerCase().includes(e)).length-r})}var _r=`https://buy.stripe.com/7sY00jd9F5Qkb857qfasg05`,vr=[{amount:5,label:`$5`},{amount:10,label:`$10`},{amount:25,label:`$25`},{amount:50,label:`$50`},{amount:100,label:`$100`}],yr=10;function br(){let[e,t]=(0,x.useState)(yr),[n,r]=(0,x.useState)(``),i=e=>{r(e.replace(/[^\d.]/g,``).replace(/(\..*)\./g,`$1`))};return(0,j.jsx)(`section`,{className:`bg-ink text-white py-12 my-16 no-print`,children:(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 text-center`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/50 mb-4`,children:`Support Independent Research`}),(0,j.jsx)(`h2`,{className:`font-display text-2xl md:text-3xl font-bold text-white mb-4`,children:`Help Us Keep The Record Free`}),(0,j.jsx)(`p`,{className:`font-body text-base text-white/60 leading-relaxed max-w-xl mx-auto mb-8`,children:`We believe this information belongs to everyone. Every source, every document, every chapter of The Record is free and always will be. But research takes time, verification takes resources, and publishing takes commitment. If this work has value to you, any contribution — however small — helps our team continue mapping and publishing the documentary record.`}),(0,j.jsxs)(`div`,{className:`flex flex-wrap items-center justify-center gap-2 mb-6`,children:[vr.map(n=>(0,j.jsx)(`button`,{onClick:()=>t(n.amount),className:`px-5 py-2.5 rounded-sm font-sans text-sm font-semibold tracking-[0.05em] transition-colors ${e===n.amount?`bg-crimson text-white`:`bg-white/10 text-white/70 hover:bg-white/20 hover:text-white`}`,children:n.label},n.amount)),(0,j.jsx)(`button`,{onClick:()=>t(`custom`),className:`px-5 py-2.5 rounded-sm font-sans text-sm font-semibold tracking-[0.05em] transition-colors ${e===`custom`?`bg-crimson text-white`:`bg-white/10 text-white/70 hover:bg-white/20 hover:text-white`}`,children:`Custom`})]}),e===`custom`&&(0,j.jsxs)(`div`,{className:`flex items-center justify-center gap-2 mb-6`,children:[(0,j.jsx)(`span`,{className:`font-sans text-lg text-white/80`,children:`$`}),(0,j.jsx)(`input`,{type:`text`,inputMode:`decimal`,value:n,onChange:e=>i(e.target.value),placeholder:`Enter amount`,className:`w-36 px-4 py-2.5 bg-white/10 border border-white/20 rounded-sm font-sans text-sm text-white placeholder-white/40 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson text-center`,autoFocus:!0})]}),(0,j.jsx)(`div`,{className:`flex flex-col sm:flex-row items-center justify-center gap-4`,children:(0,j.jsxs)(`a`,{href:_r,target:`_blank`,rel:`noopener noreferrer`,className:`inline-flex items-center gap-2 px-8 py-3 bg-crimson text-white font-sans text-sm font-semibold tracking-[0.05em] uppercase rounded-sm hover:bg-crimson-dark transition-colors`,children:[(0,j.jsx)(`svg`,{className:`w-4 h-4`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z`})}),(()=>{if(e===`custom`){let e=parseFloat(n);return!e||e<=0?`Donate`:`Donate $${e%1==0?e:e.toFixed(2)}`}return`Donate ${vr.find(t=>t.amount===e)?.label||`$10`}`})()]})}),(0,j.jsx)(`p`,{className:`font-sans text-[0.65rem] text-white/30 mt-6`,children:`Donations are processed securely through Stripe. No account required.`})]})})}function xr(){let e=hr[0],t=hr.slice(1);return(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`div`,{className:`border-b border-border`,children:(0,j.jsxs)(`div`,{className:`max-w-5xl mx-auto px-6 py-6 text-center`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase text-ink-muted mb-2`,children:`Volume I · Published March 2026`}),(0,j.jsx)(`h1`,{className:`font-display text-5xl md:text-7xl font-bold text-ink leading-[1.05] mb-3`,children:`The Record`}),(0,j.jsx)(`p`,{className:`font-body text-lg md:text-xl italic text-ink-muted max-w-2xl mx-auto`,children:`A Documentary History of Power, Money, and the Institutions That Shaped the Modern World`}),(0,j.jsxs)(`div`,{className:`flex items-center justify-center gap-4 mt-4`,children:[(0,j.jsx)(`div`,{className:`h-[1px] w-16 bg-crimson`}),(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson`,children:`Primary Sources · Public Record · Your Conclusions`}),(0,j.jsx)(`div`,{className:`h-[1px] w-16 bg-crimson`})]})]})}),(0,j.jsx)(`div`,{className:`bg-ink`,children:(0,j.jsx)(`div`,{className:`max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4`,children:[{value:`31`,label:`Chapters`},{value:`240+`,label:`Years Covered`},{value:`500+`,label:`Sources Cited`},{value:`100%`,label:`Free & Open`}].map(e=>(0,j.jsxs)(`div`,{className:`text-center`,children:[(0,j.jsx)(`p`,{className:`font-display text-2xl font-bold text-crimson-light`,children:e.value}),(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-white/50 mt-1`,children:e.label})]},e.label))})}),(0,j.jsxs)(`div`,{className:`max-w-5xl mx-auto px-6`,children:[(0,j.jsxs)(`section`,{className:`py-12 border-b border-border`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-3`,children:e.number}),(0,j.jsxs)(A,{to:`/chapter/${e.id}`,className:`group`,children:[(0,j.jsx)(`h2`,{className:`font-display text-3xl md:text-5xl font-bold text-ink leading-tight group-hover:text-crimson transition-colors mb-3`,children:e.title}),(0,j.jsx)(`p`,{className:`font-body text-lg text-ink-muted italic mb-4 max-w-3xl`,children:e.subtitle}),(0,j.jsxs)(`div`,{className:`flex items-center gap-4 text-sm`,children:[(0,j.jsx)(`span`,{className:`font-sans text-xs text-ink-faint`,children:e.author}),(0,j.jsx)(`span`,{className:`font-sans text-xs text-ink-faint`,children:e.publishDate}),e.dateRange&&(0,j.jsx)(`span`,{className:`font-sans text-xs font-semibold text-crimson`,children:e.dateRange})]})]})]}),(0,j.jsxs)(`section`,{className:`py-12`,children:[(0,j.jsxs)(`div`,{className:`flex items-center gap-4 mb-8`,children:[(0,j.jsx)(`h2`,{className:`font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink`,children:`Complete Table of Contents`}),(0,j.jsx)(`div`,{className:`flex-1 h-[1px] bg-border`}),(0,j.jsxs)(`span`,{className:`font-sans text-xs text-ink-faint`,children:[hr.length,` sections`]})]}),(0,j.jsx)(`div`,{className:`grid md:grid-cols-2 gap-x-10 gap-y-0`,children:t.map(e=>(0,j.jsxs)(A,{to:`/chapter/${e.id}`,className:`group py-5 border-b border-border block`,children:[(0,j.jsxs)(`div`,{className:`flex items-baseline gap-3 mb-1`,children:[(0,j.jsx)(`span`,{className:`font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson shrink-0`,children:e.number}),e.dateRange&&(0,j.jsx)(`span`,{className:`font-sans text-[0.6rem] text-ink-faint`,children:e.dateRange})]}),(0,j.jsx)(`h3`,{className:`font-display text-lg font-bold text-ink leading-snug group-hover:text-crimson transition-colors mb-1`,children:e.title}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-muted line-clamp-2`,children:e.subtitle}),(0,j.jsx)(`div`,{className:`flex flex-wrap gap-2 mt-2`,children:e.keywords.slice(0,3).map(e=>(0,j.jsx)(`span`,{className:`font-sans text-[0.6rem] px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm`,children:e},e))})]},e.id))})]}),(0,j.jsx)(br,{}),(0,j.jsx)(`section`,{className:`py-12 border-t border-border`,children:(0,j.jsxs)(`div`,{className:`bg-ink rounded-sm p-8 md:p-12 text-center`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/50 mb-3`,children:`Before You Begin`}),(0,j.jsx)(`h3`,{className:`font-display text-2xl md:text-3xl font-bold text-white mb-4`,children:`Read the Methodology & Evidence Standards`}),(0,j.jsx)(`p`,{className:`font-body text-sm text-white/60 max-w-xl mx-auto mb-6`,children:`Every claim in this publication is classified using a three-tier evidence system. Understanding how to read the evidence tiers will help you evaluate each claim independently.`}),(0,j.jsxs)(`div`,{className:`flex flex-col sm:flex-row justify-center gap-4`,children:[(0,j.jsx)(A,{to:`/chapter/foreword`,className:`font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors`,children:`Read the Foreword`}),(0,j.jsx)(A,{to:`/methodology`,className:`font-sans text-sm font-semibold px-6 py-3 border border-white/30 text-white rounded-sm hover:bg-white/10 transition-colors`,children:`Methodology`})]})]})})]})]})}function Sr({chapterId:e}){let{isLoggedIn:t,isBookmarked:n,toggleBookmark:r,setShowAuthModal:i}=dr(),a=n(e);return(0,j.jsxs)(`button`,{onClick:()=>{if(!t){i(!0);return}r(e)},className:`inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors`,title:t?a?`Remove bookmark`:`Save article`:`Sign in to save`,children:[(0,j.jsx)(`svg`,{className:`w-4 h-4`,fill:a?`currentColor`:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:a?0:1.5,d:`M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z`})}),a?`Saved`:`Save`]})}function Cr(){let[e,t]=(0,x.useState)(0);return(0,x.useEffect)(()=>{let e=()=>{let e=window.scrollY,n=document.documentElement.scrollHeight-window.innerHeight;if(n<=0){t(0);return}t(Math.min(100,Math.max(0,e/n*100)))};return window.addEventListener(`scroll`,e,{passive:!0}),e(),()=>window.removeEventListener(`scroll`,e)},[]),e<=0?null:(0,j.jsx)(`div`,{className:`fixed top-0 left-0 z-[60] h-[3px] bg-crimson transition-[width] duration-100 ease-out`,style:{width:`${e}%`},role:`progressbar`,"aria-valuenow":Math.round(e),"aria-valuemin":0,"aria-valuemax":100,"aria-label":`Reading progress`})}function wr({block:e}){switch(e.type){case`dropcap`:return(0,j.jsx)(`p`,{className:`article-body drop-cap mb-6`,children:e.text});case`text`:return(0,j.jsx)(`p`,{className:`article-body mb-6`,children:e.text});case`heading`:return(0,j.jsx)(`h2`,{className:`font-display text-2xl md:text-3xl font-bold text-ink mt-12 mb-4`,children:e.text});case`subheading`:return(0,j.jsx)(`h3`,{className:`font-display text-xl md:text-2xl font-bold text-ink mt-8 mb-3`,children:e.text});case`quote`:return e.quote?(0,j.jsxs)(`blockquote`,{className:`pullquote`,children:[`“`,e.quote.text,`”`,(0,j.jsxs)(`div`,{className:`pullquote-attribution`,children:[`— `,e.quote.attribution,e.quote.note&&(0,j.jsx)(`span`,{className:`block font-normal text-ink-faint mt-1`,children:e.quote.note})]})]}):null;case`evidence`:if(!e.evidence)return null;let t=`evidence-${e.evidence.tier}`,n={verified:`text-verified`,circumstantial:`text-circumstantial`,disputed:`text-disputed`},r={verified:`✓`,circumstantial:`◐`,disputed:`⚠`},i={verified:`Verified — Primary Source Documentation`,circumstantial:`Circumstantial — Documented Facts, Interpretive Conclusion`,disputed:`Disputed — Reported But Not Independently Confirmed`};return(0,j.jsxs)(`div`,{className:t,role:`note`,"aria-label":i[e.evidence.tier],children:[(0,j.jsxs)(`p`,{className:`evidence-label ${n[e.evidence.tier]||``}`,children:[(0,j.jsx)(`span`,{"aria-hidden":`true`,className:`mr-1.5`,children:r[e.evidence.tier]}),e.evidence.label]}),(0,j.jsx)(`p`,{className:`font-body text-sm leading-relaxed text-ink-light`,children:e.evidence.text})]});case`stats`:return e.stats?(0,j.jsx)(`div`,{className:`grid grid-cols-2 md:grid-cols-4 gap-3 my-8`,children:e.stats.map((e,t)=>(0,j.jsxs)(`div`,{className:`stat-card`,children:[(0,j.jsx)(`p`,{className:`stat-value`,children:e.value}),(0,j.jsx)(`p`,{className:`stat-label`,children:e.label})]},t))}):null;case`table`:return e.table?(0,j.jsxs)(`div`,{className:`overflow-x-auto my-8`,children:[e.table.caption&&(0,j.jsx)(`p`,{className:`font-sans text-xs font-bold tracking-[0.08em] uppercase text-ink-muted mb-3`,children:e.table.caption}),(0,j.jsxs)(`table`,{className:`data-table`,children:[(0,j.jsx)(`thead`,{children:(0,j.jsx)(`tr`,{children:e.table.headers.map((e,t)=>(0,j.jsx)(`th`,{children:e},t))})}),(0,j.jsx)(`tbody`,{children:e.table.rows.map((e,t)=>(0,j.jsx)(`tr`,{children:e.map((e,t)=>(0,j.jsx)(`td`,{children:e},t))},t))})]})]}):null;case`timeline`:return e.timeline?(0,j.jsx)(`div`,{className:`my-8`,children:e.timeline.map((e,t)=>(0,j.jsxs)(`div`,{className:`timeline-item`,children:[(0,j.jsx)(`span`,{className:`timeline-year`,children:e.year}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-light leading-relaxed`,children:e.text})]},t))}):null;default:return null}}function Tr({current:e}){let t=hr.findIndex(t=>t.id===e.id),n=t>0?hr[t-1]:null,r=t<hr.length-1?hr[t+1]:null;return(0,j.jsx)(`div`,{className:`border-t border-border mt-16 pt-8`,children:(0,j.jsxs)(`div`,{className:`grid md:grid-cols-2 gap-6`,children:[n&&(0,j.jsxs)(A,{to:`/chapter/${n.id}`,className:`group p-4 border border-border rounded-sm hover:border-crimson transition-colors`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1`,children:`← Previous`}),(0,j.jsx)(`p`,{className:`font-display text-base font-bold text-ink group-hover:text-crimson transition-colors`,children:n.title}),(0,j.jsx)(`p`,{className:`font-sans text-xs text-ink-muted mt-1`,children:n.number})]}),r&&(0,j.jsxs)(A,{to:`/chapter/${r.id}`,className:`group p-4 border border-border rounded-sm hover:border-crimson transition-colors md:text-right md:ml-auto`,children:[(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ink-faint mb-1`,children:`Next →`}),(0,j.jsx)(`p`,{className:`font-display text-base font-bold text-ink group-hover:text-crimson transition-colors`,children:r.title}),(0,j.jsx)(`p`,{className:`font-sans text-xs text-ink-muted mt-1`,children:r.number})]})]})})}function Er({icon:e,label:t,onClick:n}){return(0,j.jsxs)(`button`,{onClick:n,className:`inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.05em] uppercase text-ink-muted hover:text-crimson transition-colors`,children:[e,t]})}function Dr({chapter:e}){return(0,j.jsx)(Er,{onClick:async()=>{let t=`${window.location.origin}/chapter/${e.id}`,n=`${e.title} — The Record by Veritas Worldwide Press`;if(navigator.share)try{await navigator.share({title:n,url:t})}catch{}else await navigator.clipboard.writeText(t),alert(`Link copied to clipboard`)},label:`Share`,icon:(0,j.jsx)(`svg`,{className:`w-4 h-4`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:1.5,d:`M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z`})})})}function Or({chapter:e}){return(0,j.jsx)(Er,{onClick:()=>{let t=[e.title,e.subtitle,`By ${e.author} — ${e.publishDate}`,e.dateRange?`Period: ${e.dateRange}`:``,``,`---`,``];e.content.forEach(e=>{(e.type===`dropcap`||e.type===`text`)&&t.push(e.text||``,``),e.type===`heading`&&t.push(`## ${e.text}`,``),e.type===`subheading`&&t.push(`### ${e.text}`,``),e.type===`quote`&&e.quote&&t.push(`> "${e.quote.text}"`,`> — ${e.quote.attribution}`,``),e.type===`evidence`&&e.evidence&&t.push(`[${e.evidence.label}]`,e.evidence.text,``)}),t.push(`---`,``,`Sources & References`,``),e.sources.forEach(e=>{t.push(`[${e.id}] ${e.text}${e.url?` — ${e.url}`:``}`)}),t.push(``,`© 2026 Veritas Worldwide Press — veritasworldwide.com — Free & Open Access`);let n=new Blob([t.join(`
`)],{type:`text/plain`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=`veritas-${e.id}.txt`,i.click(),URL.revokeObjectURL(r)},label:`Download`,icon:(0,j.jsx)(`svg`,{className:`w-4 h-4`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:1.5,d:`M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4`})})})}function kr(){let{id:e}=dt(),t=hr.find(t=>t.id===e);return(0,x.useEffect)(()=>(t?document.title=`${t.title} | The Record — Veritas Worldwide Press`:document.title=`Chapter Not Found | The Record — Veritas Worldwide Press`,()=>{document.title=`The Record | Veritas Worldwide Press`}),[t]),t?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(Cr,{}),(0,j.jsxs)(`article`,{className:`max-w-3xl mx-auto px-6 py-12 md:py-16`,children:[(0,j.jsxs)(`header`,{className:`mb-12 border-b border-border pb-10`,children:[(0,j.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-4`,children:t.number}),(0,j.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,j.jsx)(Dr,{chapter:t}),(0,j.jsx)(Or,{chapter:t}),(0,j.jsx)(Sr,{chapterId:t.id})]})]}),(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4`,children:t.title}),(0,j.jsx)(`p`,{className:`font-body text-lg italic text-ink-muted leading-relaxed mb-6`,children:t.subtitle}),(0,j.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4`,children:[(0,j.jsxs)(`span`,{className:`font-sans text-xs text-ink-faint`,children:[`By `,t.author]}),(0,j.jsx)(`span`,{className:`font-sans text-xs text-ink-faint`,children:t.publishDate}),t.dateRange&&(0,j.jsx)(`span`,{className:`font-sans text-xs font-semibold text-crimson px-2 py-1 bg-crimson/5 rounded-sm`,children:t.dateRange})]})]}),(0,j.jsx)(`div`,{className:`mb-12`,children:t.content.map((e,t)=>(0,j.jsx)(wr,{block:e},t))}),t.sources.length>0&&(0,j.jsxs)(`section`,{className:`border-t border-border pt-8 mb-12`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6`,children:`Sources & References`}),(0,j.jsx)(`ol`,{className:`space-y-3`,children:t.sources.map(e=>(0,j.jsxs)(`li`,{className:`font-sans text-sm text-ink-muted leading-relaxed flex gap-3`,children:[(0,j.jsxs)(`span`,{className:`font-bold text-crimson shrink-0`,children:[`[`,e.id,`]`]}),(0,j.jsxs)(`span`,{children:[e.text,e.url&&(0,j.jsxs)(j.Fragment,{children:[` `,(0,j.jsx)(`a`,{href:e.url,target:`_blank`,rel:`noopener noreferrer`,className:`text-crimson hover:text-crimson-dark underline underline-offset-2`,children:`View Source →`})]})]})]},e.id))})]}),t.keywords.length>0&&(0,j.jsxs)(`section`,{className:`border-t border-border pt-8 mb-12`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4`,children:`Topics & Keywords`}),(0,j.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:t.keywords.map(e=>(0,j.jsx)(A,{to:`/search?q=${encodeURIComponent(e)}`,className:`font-sans text-xs px-3 py-1.5 bg-parchment-dark text-ink-muted rounded-sm hover:text-crimson hover:bg-crimson/5 transition-colors`,children:e},e))})]}),t.crossLinks.length>0&&(0,j.jsxs)(`section`,{className:`border-t border-border pt-8 mb-8`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4`,children:`Related Chapters`}),(0,j.jsx)(`div`,{className:`grid gap-3`,children:t.crossLinks.map(e=>(0,j.jsxs)(A,{to:`/chapter/${e.chapterId}`,className:`group flex items-center gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors`,children:[(0,j.jsx)(`span`,{className:`font-sans text-crimson font-bold text-sm`,children:`→`}),(0,j.jsx)(`span`,{className:`font-sans text-sm text-ink group-hover:text-crimson transition-colors`,children:e.label})]},e.chapterId))})]}),(0,j.jsx)(Tr,{current:t})]})]}):(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-20 text-center`,children:[(0,j.jsx)(`h1`,{className:`font-display text-4xl font-bold text-ink mb-4`,children:`Chapter Not Found`}),(0,j.jsx)(`p`,{className:`font-body text-lg text-ink-muted mb-8`,children:`The chapter you're looking for doesn't exist.`}),(0,j.jsx)(A,{to:`/`,className:`font-sans text-sm font-semibold text-crimson hover:text-crimson-dark`,children:`← Return to The Record`})]})}function Ar(e,t){let n=t.toLowerCase();for(let r of e.content){if(r.text&&r.text.toLowerCase().includes(n)){let e=r.text.toLowerCase().indexOf(n),i=Math.max(0,e-80),a=Math.min(r.text.length,e+t.length+80),o=i>0?`...`:``,s=a<r.text.length?`...`:``;return o+r.text.substring(i,a)+s}if(r.quote?.text.toLowerCase().includes(n))return`"${r.quote.text.substring(0,160)}..."`;if(r.evidence?.text.toLowerCase().includes(n))return r.evidence.text.substring(0,160)+`...`}return e.subtitle}function jr(e,t){let n=t.toLowerCase(),r=[];return e.title.toLowerCase().includes(n)&&r.push(`title`),e.subtitle.toLowerCase().includes(n)&&r.push(`subtitle`),e.keywords.some(e=>e.toLowerCase().includes(n))&&r.push(`keywords`),e.content.some(e=>!!(e.text?.toLowerCase().includes(n)||e.quote?.text.toLowerCase().includes(n)||e.evidence?.text.toLowerCase().includes(n)||e.table?.headers.some(e=>e.toLowerCase().includes(n))||e.table?.rows.some(e=>e.some(e=>e.toLowerCase().includes(n)))))&&r.push(`content`),e.sources.some(e=>e.text.toLowerCase().includes(n))&&r.push(`sources`),r}function Mr(){let[e,t]=Fn(),[n,r]=(0,x.useState)(e.get(`q`)||``);(0,x.useEffect)(()=>(document.title=`Search | The Record — Veritas Worldwide Press`,()=>{document.title=`The Record | Veritas Worldwide Press`}),[]),(0,x.useEffect)(()=>{let t=e.get(`q`);t&&t!==n&&r(t)},[e]);let i=(0,x.useMemo)(()=>n.trim()?gr(n).map(e=>({chapter:e,matchedIn:jr(e,n),snippet:Ar(e,n)})):[],[n]),a=e=>{r(e),e.trim()?t({q:e}):t({})};return(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-12 md:py-16`,children:[(0,j.jsxs)(`header`,{className:`mb-10`,children:[(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-4xl font-bold text-ink mb-2`,children:`Search The Record`}),(0,j.jsxs)(`p`,{className:`font-body text-base text-ink-muted`,children:[`Full-text search across all `,hr.length,` chapters, sources, evidence, and data tables.`]})]}),(0,j.jsxs)(`div`,{className:`relative mb-10`,children:[(0,j.jsx)(`svg`,{className:`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z`})}),(0,j.jsx)(`input`,{type:`text`,placeholder:`Search by name, topic, institution, date...`,value:n,onChange:e=>a(e.target.value),className:`search-input`,autoFocus:!0})]}),n.trim()===``?(0,j.jsxs)(`div`,{className:`text-center py-16`,children:[(0,j.jsx)(`p`,{className:`font-body text-lg text-ink-muted mb-3`,children:`Enter a search term to explore.`}),(0,j.jsx)(`div`,{className:`flex flex-wrap justify-center gap-2 mt-6`,children:[`Federal Reserve`,`Rothschild`,`BlackRock`,`CIA`,`Eisenhower`,`AIPAC`,`Central Banking`,`Andrew Jackson`].map(e=>(0,j.jsx)(`button`,{onClick:()=>a(e),className:`font-sans text-xs px-3 py-1.5 border border-border text-ink-muted rounded-sm hover:border-crimson hover:text-crimson transition-colors`,children:e},e))})]}):i.length===0?(0,j.jsxs)(`div`,{className:`text-center py-16`,children:[(0,j.jsxs)(`p`,{className:`font-body text-lg text-ink-muted mb-2`,children:[`No results found for “`,n,`”`]}),(0,j.jsxs)(`p`,{className:`font-sans text-sm text-ink-faint`,children:[`Try different keywords or browse the `,(0,j.jsx)(A,{to:`/`,className:`text-crimson hover:underline`,children:`table of contents`}),`.`]})]}):(0,j.jsxs)(`div`,{children:[(0,j.jsxs)(`p`,{className:`font-sans text-xs text-ink-faint mb-6`,children:[(0,j.jsx)(`span`,{className:`font-bold text-crimson`,children:i.length}),` `,i.length===1?`result`:`results`,` for “`,n,`”`]}),(0,j.jsx)(`div`,{className:`space-y-0`,children:i.map(e=>(0,j.jsxs)(A,{to:`/chapter/${e.chapter.id}`,className:`group block py-6 border-b border-border`,children:[(0,j.jsxs)(`div`,{className:`flex items-baseline gap-3 mb-1`,children:[(0,j.jsx)(`span`,{className:`font-sans text-[0.6rem] font-bold tracking-[0.1em] uppercase text-crimson`,children:e.chapter.number}),e.chapter.dateRange&&(0,j.jsx)(`span`,{className:`font-sans text-[0.6rem] text-ink-faint`,children:e.chapter.dateRange})]}),(0,j.jsx)(`h3`,{className:`font-display text-xl font-bold text-ink group-hover:text-crimson transition-colors mb-2`,children:e.chapter.title}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-muted leading-relaxed mb-3 line-clamp-3`,children:e.snippet}),(0,j.jsx)(`div`,{className:`flex flex-wrap gap-2`,children:e.matchedIn.map(e=>(0,j.jsx)(`span`,{className:`font-sans text-[0.6rem] font-semibold px-2 py-0.5 bg-parchment-dark text-ink-faint rounded-sm uppercase tracking-wider`,children:e},e))})]},e.chapter.id))})]})]})}function Nr(){return(0,x.useEffect)(()=>(document.title=`Methodology & Evidence Standards | The Record — Veritas Worldwide Press`,()=>{document.title=`The Record | Veritas Worldwide Press`}),[]),(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-12 md:py-16`,children:[(0,j.jsxs)(`header`,{className:`mb-12 border-b border-border pb-10`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-4`,children:`Editorial Standards`}),(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4`,children:`Methodology & Evidence Standards`}),(0,j.jsx)(`p`,{className:`font-body text-lg italic text-ink-muted leading-relaxed`,children:`How this publication was researched, sourced, and structured — and how you should read it.`})]}),(0,j.jsxs)(`section`,{className:`mb-16`,children:[(0,j.jsx)(`h2`,{className:`font-display text-2xl font-bold text-ink mb-6`,children:`Four-Tier Source Hierarchy`}),(0,j.jsx)(`p`,{className:`article-body mb-8`,children:`Every factual claim in The Record is sourced. Sources are prioritized in a four-tier hierarchy designed to maximize verifiability and minimize reliance on secondary interpretation.`}),(0,j.jsx)(`div`,{className:`space-y-4`,children:[{tier:`Tier 1 — Primary`,desc:`Congressional records, court filings, executive orders, declassified intelligence documents, SEC filings, Federal Register entries, and National Archives materials.`,color:`border-l-verified bg-verified-bg`},{tier:`Tier 2 — Peer-Reviewed`,desc:`Academic journal articles, university press monographs, and doctoral dissertations.`,color:`border-l-verified bg-verified-bg`},{tier:`Tier 3 — Verified Journalism`,desc:`Investigative reporting from established outlets with named sources, FOIA-obtained documents, and court-verified testimony.`,color:`border-l-circumstantial bg-circumstantial-bg`},{tier:`Tier 4 — Secondary`,desc:`Biographies, historical surveys, and memoirs — used for context but not as sole evidence for factual claims.`,color:`border-l-disputed bg-disputed-bg`}].map(e=>(0,j.jsxs)(`div`,{className:`border-l-4 rounded-r-sm p-5 ${e.color}`,children:[(0,j.jsx)(`p`,{className:`font-sans text-xs font-bold tracking-[0.08em] uppercase text-ink mb-2`,children:e.tier}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-light leading-relaxed`,children:e.desc})]},e.tier))})]}),(0,j.jsxs)(`section`,{className:`mb-16`,children:[(0,j.jsx)(`h2`,{className:`font-display text-2xl font-bold text-ink mb-6`,children:`Three-Tier Evidence Classification`}),(0,j.jsx)(`p`,{className:`article-body mb-8`,children:`Every substantive claim is classified using this system, allowing you to evaluate each claim independently rather than accepting or rejecting the work as a whole.`}),(0,j.jsxs)(`div`,{className:`evidence-verified`,children:[(0,j.jsx)(`p`,{className:`evidence-label text-verified`,children:`VERIFIED — Primary Source Documentation`}),(0,j.jsx)(`p`,{className:`font-body text-sm leading-relaxed text-ink-light`,children:`This claim is supported by a primary source document: a court filing, a congressional record, a National Archives document, a signed executive order, a published academic study with peer review, or a verified journalistic investigation. The source is cited. The document exists and is publicly accessible.`})]}),(0,j.jsxs)(`div`,{className:`evidence-circumstantial`,children:[(0,j.jsx)(`p`,{className:`evidence-label text-circumstantial`,children:`CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion`}),(0,j.jsx)(`p`,{className:`font-body text-sm leading-relaxed text-ink-light`,children:`Each individual fact is documented and independently verifiable. However, the connection drawn between those facts — the inference that they form a pattern or indicate coordination — is an interpretation, not a proven conclusion. Alternative explanations exist and are noted.`})]}),(0,j.jsxs)(`div`,{className:`evidence-disputed`,children:[(0,j.jsx)(`p`,{className:`evidence-label text-disputed`,children:`DISPUTED / UNPROVEN — Reported But Not Independently Confirmed`}),(0,j.jsx)(`p`,{className:`font-body text-sm leading-relaxed text-ink-light`,children:`This claim has been made by a named source, in a published report, or in sworn testimony — but has not been independently confirmed by multiple credible sources, proven in a court of law, or supported by primary documentation. It is included as part of the historical record and clearly labeled.`})]})]}),(0,j.jsxs)(`section`,{className:`mb-16`,children:[(0,j.jsx)(`h2`,{className:`font-display text-2xl font-bold text-ink mb-6`,children:`Research Standards`}),(0,j.jsxs)(`div`,{className:`space-y-6`,children:[(0,j.jsxs)(`div`,{className:`border-b border-border pb-6`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-sm font-bold text-ink mb-2`,children:`Multi-Source Verification`}),(0,j.jsx)(`p`,{className:`font-body text-base text-ink-light leading-relaxed`,children:`Every claim is verified through multiple independent sources. We do not rely on single sources for factual assertions and actively seek contradictory evidence to test conclusions.`})]}),(0,j.jsxs)(`div`,{className:`border-b border-border pb-6`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-sm font-bold text-ink mb-2`,children:`Primary Document Priority`}),(0,j.jsx)(`p`,{className:`font-body text-base text-ink-light leading-relaxed`,children:`Reporting is based on primary sources wherever possible: original documents, correspondence, financial records, government filings, and official communications. These are made available to readers for independent verification.`})]}),(0,j.jsxs)(`div`,{className:`border-b border-border pb-6`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-sm font-bold text-ink mb-2`,children:`Fact vs. Analysis Separation`}),(0,j.jsx)(`p`,{className:`font-body text-base text-ink-light leading-relaxed`,children:`Established facts are clearly separated from interpretation and analysis. Where connections are inferred rather than documented, this is explicitly stated. The reader is the judge.`})]}),(0,j.jsxs)(`div`,{className:`border-b border-border pb-6`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-sm font-bold text-ink mb-2`,children:`Counter-Arguments Included`}),(0,j.jsx)(`p`,{className:`font-body text-base text-ink-light leading-relaxed`,children:`Where mainstream counter-arguments exist, they are presented. Skeptical frameworks are acknowledged. The goal is not advocacy but examination of the documentary record.`})]}),(0,j.jsxs)(`div`,{className:`pb-6`,children:[(0,j.jsx)(`h3`,{className:`font-sans text-sm font-bold text-ink mb-2`,children:`Open Verification`}),(0,j.jsx)(`p`,{className:`font-body text-base text-ink-light leading-relaxed`,children:`Every source cited is publicly accessible. Congressional records through congress.gov, court filings through PACER, declassified documents through the National Archives and CIA FOIA Reading Room, SEC filings through EDGAR. The reader is encouraged to verify any claim independently.`})]})]})]}),(0,j.jsxs)(`div`,{className:`border-t border-border pt-8 flex flex-col sm:flex-row gap-4`,children:[(0,j.jsx)(A,{to:`/chapter/foreword`,className:`font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center`,children:`Read the Full Foreword`}),(0,j.jsx)(A,{to:`/sources`,className:`font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center`,children:`View All Sources`})]})]})}function Pr(){(0,x.useEffect)(()=>(document.title=`Sources & Bibliography | The Record — Veritas Worldwide Press`,()=>{document.title=`The Record | Veritas Worldwide Press`}),[]);let e=hr.flatMap(e=>e.sources.map(t=>({...t,chapterId:e.id,chapterNumber:e.number,chapterTitle:e.title}))),t=hr.filter(e=>e.sources.length>0).map(e=>({id:e.id,number:e.number,title:e.title,sources:e.sources}));return(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-12 md:py-16`,children:[(0,j.jsxs)(`header`,{className:`mb-12 border-b border-border pb-10`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-4`,children:`Reference`}),(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4`,children:`Sources & References`}),(0,j.jsx)(`p`,{className:`font-body text-lg italic text-ink-muted leading-relaxed`,children:`Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.`}),(0,j.jsxs)(`div`,{className:`flex items-center gap-6 mt-6`,children:[(0,j.jsxs)(`div`,{className:`text-center`,children:[(0,j.jsx)(`p`,{className:`font-display text-2xl font-bold text-crimson`,children:e.length}),(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint`,children:`Total Sources`})]}),(0,j.jsxs)(`div`,{className:`text-center`,children:[(0,j.jsx)(`p`,{className:`font-display text-2xl font-bold text-crimson`,children:t.length}),(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint`,children:`Chapters Sourced`})]}),(0,j.jsxs)(`div`,{className:`text-center`,children:[(0,j.jsx)(`p`,{className:`font-display text-2xl font-bold text-crimson`,children:e.filter(e=>e.url).length}),(0,j.jsx)(`p`,{className:`font-sans text-[0.6rem] font-semibold tracking-[0.1em] uppercase text-ink-faint`,children:`With Direct Links`})]})]})]}),(0,j.jsxs)(`section`,{className:`mb-12 bg-parchment-dark p-6 rounded-sm`,children:[(0,j.jsx)(`h2`,{className:`font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-4`,children:`Public Verification Databases`}),(0,j.jsx)(`div`,{className:`grid sm:grid-cols-2 gap-3`,children:[{name:`Congress.gov`,desc:`Congressional records & legislation`,url:`https://www.congress.gov`},{name:`National Archives`,desc:`Declassified government documents`,url:`https://www.archives.gov`},{name:`SEC EDGAR`,desc:`Corporate & financial filings`,url:`https://www.sec.gov/cgi-bin/browse-edgar`},{name:`CIA FOIA Reading Room`,desc:`Declassified intelligence documents`,url:`https://www.cia.gov/readingroom`},{name:`PACER`,desc:`Federal court filings`,url:`https://pacer.uscourts.gov`},{name:`Federal Register`,desc:`Executive orders & regulations`,url:`https://www.federalregister.gov`},{name:`NSA Archive (GWU)`,desc:`National Security Archive`,url:`https://nsarchive.gwu.edu`},{name:`OpenSecrets`,desc:`Campaign finance & lobbying data`,url:`https://www.opensecrets.org`}].map(e=>(0,j.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noopener noreferrer`,className:`flex items-start gap-3 p-3 border border-border rounded-sm hover:border-crimson transition-colors bg-surface`,children:[(0,j.jsx)(`span`,{className:`font-sans text-crimson font-bold text-sm mt-0.5`,children:`→`}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`font-sans text-sm font-semibold text-ink`,children:e.name}),(0,j.jsx)(`p`,{className:`font-sans text-xs text-ink-faint`,children:e.desc})]})]},e.name))})]}),(0,j.jsxs)(`section`,{children:[(0,j.jsx)(`h2`,{className:`font-sans text-xs font-bold tracking-[0.12em] uppercase text-ink mb-6`,children:`Sources by Chapter`}),t.length===0?(0,j.jsx)(`p`,{className:`font-body text-base text-ink-muted text-center py-12`,children:`Sources are being compiled and will be published with each chapter.`}):(0,j.jsx)(`div`,{className:`space-y-10`,children:t.map(e=>(0,j.jsxs)(`div`,{className:`border-b border-border pb-8`,children:[(0,j.jsxs)(`div`,{className:`flex items-baseline gap-3 mb-4`,children:[(0,j.jsx)(`span`,{className:`font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson`,children:e.number}),(0,j.jsx)(A,{to:`/chapter/${e.id}`,className:`font-display text-lg font-bold text-ink hover:text-crimson transition-colors`,children:e.title})]}),(0,j.jsx)(`ol`,{className:`space-y-2 ml-1`,children:e.sources.map(e=>(0,j.jsxs)(`li`,{className:`font-sans text-sm text-ink-muted leading-relaxed flex gap-3`,children:[(0,j.jsxs)(`span`,{className:`font-bold text-crimson shrink-0 text-xs mt-0.5`,children:[`[`,e.id,`]`]}),(0,j.jsxs)(`span`,{children:[e.text,e.url&&(0,j.jsxs)(j.Fragment,{children:[` `,(0,j.jsx)(`a`,{href:e.url,target:`_blank`,rel:`noopener noreferrer`,className:`text-crimson hover:text-crimson-dark underline underline-offset-2`,children:`View →`})]})]})]},e.id))})]},e.id))})]}),(0,j.jsxs)(`div`,{className:`border-t border-border mt-12 pt-8 flex flex-col sm:flex-row gap-4`,children:[(0,j.jsx)(A,{to:`/methodology`,className:`font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors text-center`,children:`Read the Methodology`}),(0,j.jsx)(A,{to:`/`,className:`font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors text-center`,children:`Back to The Record`})]})]})}function Fr(){(0,x.useEffect)(()=>(document.title=`Saved Articles | The Record — Veritas Worldwide Press`,()=>{document.title=`The Record | Veritas Worldwide Press`}),[]);let{isLoggedIn:e,bookmarks:t,setShowAuthModal:n}=dr();if(!e)return(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-20 text-center`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-4`,children:`Saved Articles`}),(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-4xl font-bold text-ink mb-4`,children:`Your Bookmarks`}),(0,j.jsx)(`p`,{className:`font-body text-lg text-ink-muted mb-8`,children:`Sign in to save articles and access them anytime.`}),(0,j.jsx)(`button`,{onClick:()=>n(!0),className:`font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors`,children:`Sign In to View Bookmarks`})]});let r=hr.filter(e=>t.includes(e.id));return(0,j.jsxs)(`div`,{className:`max-w-3xl mx-auto px-6 py-12 md:py-16`,children:[(0,j.jsxs)(`header`,{className:`mb-12 border-b border-border pb-10`,children:[(0,j.jsx)(`p`,{className:`chapter-label mb-4`,children:`Your Library`}),(0,j.jsx)(`h1`,{className:`font-display text-3xl md:text-5xl font-bold text-ink leading-tight mb-4`,children:`Saved Articles`}),(0,j.jsx)(`p`,{className:`font-body text-lg italic text-ink-muted leading-relaxed`,children:r.length===0?`You haven't saved any articles yet. Browse The Record and tap the bookmark icon to save chapters here.`:`${r.length} article${r.length===1?``:`s`} saved.`})]}),r.length>0?(0,j.jsx)(`div`,{className:`space-y-4`,children:r.map(e=>(0,j.jsxs)(A,{to:`/chapter/${e.id}`,className:`group block p-5 border border-border rounded-sm hover:border-crimson transition-colors`,children:[(0,j.jsxs)(`div`,{className:`flex items-baseline gap-3 mb-2`,children:[(0,j.jsx)(`span`,{className:`font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase text-crimson`,children:e.number}),e.dateRange&&(0,j.jsx)(`span`,{className:`font-sans text-xs text-ink-faint`,children:e.dateRange})]}),(0,j.jsx)(`h3`,{className:`font-display text-lg font-bold text-ink group-hover:text-crimson transition-colors`,children:e.title}),(0,j.jsx)(`p`,{className:`font-body text-sm text-ink-muted mt-1 line-clamp-2`,children:e.subtitle})]},e.id))}):(0,j.jsx)(`div`,{className:`text-center py-12`,children:(0,j.jsx)(A,{to:`/`,className:`font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors`,children:`Browse The Record`})})]})}function Ir(){let[e,t]=(0,x.useState)(!1),n=ot(),{isLoggedIn:r,user:i,logout:a,setShowAuthModal:o}=dr(),s=[{to:`/`,label:`The Record`},{to:`/search`,label:`Search`},{to:`/methodology`,label:`Methodology`},{to:`/sources`,label:`Sources`},...r?[{to:`/bookmarks`,label:`Saved`}]:[]];return(0,j.jsxs)(`header`,{className:`sticky top-0 z-50 bg-parchment/95 backdrop-blur-md no-print`,children:[(0,j.jsxs)(`div`,{className:`max-w-5xl mx-auto px-6`,children:[(0,j.jsxs)(`div`,{className:`flex items-center justify-between py-3`,children:[(0,j.jsx)(A,{to:`/`,className:`font-sans text-xs font-bold tracking-[0.2em] uppercase text-ink hover:text-crimson transition-colors`,children:`Veritas Worldwide Press`}),(0,j.jsxs)(`nav`,{className:`hidden md:flex items-center gap-8`,children:[s.map(e=>(0,j.jsx)(A,{to:e.to,className:`font-sans text-xs tracking-[0.1em] uppercase transition-colors ${n.pathname===e.to?`text-crimson font-bold`:`text-ink-muted hover:text-ink`}`,children:e.label},e.to)),r?(0,j.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,j.jsx)(`span`,{className:`font-sans text-xs text-ink-faint`,children:i?.displayName?.split(` `)[0]}),(0,j.jsx)(`button`,{onClick:a,className:`font-sans text-xs tracking-[0.1em] uppercase text-ink-muted hover:text-crimson transition-colors`,children:`Sign Out`})]}):(0,j.jsx)(`button`,{onClick:()=>o(!0),className:`font-sans text-xs font-semibold tracking-[0.1em] uppercase text-crimson hover:text-crimson-dark transition-colors`,children:`Sign In`})]}),(0,j.jsx)(`button`,{className:`md:hidden p-2 text-ink`,onClick:()=>t(!e),"aria-label":`Toggle menu`,children:(0,j.jsx)(`svg`,{className:`w-5 h-5`,fill:`none`,stroke:`currentColor`,viewBox:`0 0 24 24`,children:e?(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M6 18L18 6M6 6l12 12`}):(0,j.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,strokeWidth:2,d:`M4 6h16M4 12h16M4 18h16`})})})]}),e&&(0,j.jsxs)(`nav`,{className:`md:hidden pb-4 border-t border-border pt-3 flex flex-col gap-3`,children:[s.map(e=>(0,j.jsx)(A,{to:e.to,className:`font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-ink`,onClick:()=>t(!1),children:e.label},e.to)),r?(0,j.jsxs)(`button`,{onClick:()=>{a(),t(!1)},className:`font-sans text-sm tracking-[0.05em] uppercase text-ink-muted hover:text-crimson text-left`,children:[`Sign Out (`,i?.displayName?.split(` `)[0],`)`]}):(0,j.jsx)(`button`,{onClick:()=>{o(!0),t(!1)},className:`font-sans text-sm tracking-[0.05em] uppercase text-crimson font-semibold text-left`,children:`Sign In`})]})]}),(0,j.jsx)(`div`,{className:`h-[3px] bg-crimson`})]})}function Lr(){return(0,j.jsx)(`footer`,{className:`bg-ink text-white/70 py-16 mt-20 no-print`,children:(0,j.jsxs)(`div`,{className:`max-w-5xl mx-auto px-6`,children:[(0,j.jsxs)(`div`,{className:`grid md:grid-cols-3 gap-12`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`font-sans text-xs font-bold tracking-[0.2em] uppercase text-white mb-4`,children:`Veritas Worldwide Press`}),(0,j.jsxs)(`p`,{className:`font-body text-sm leading-relaxed text-white/50`,children:[`Published March 2026`,(0,j.jsx)(`br`,{}),`Compiled & Edited by B.R.`,(0,j.jsx)(`br`,{}),`Volume I`]})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4`,children:`Navigate`}),(0,j.jsxs)(`div`,{className:`flex flex-col gap-2`,children:[(0,j.jsx)(A,{to:`/`,className:`font-sans text-sm text-white/50 hover:text-white transition-colors`,children:`The Record`}),(0,j.jsx)(A,{to:`/search`,className:`font-sans text-sm text-white/50 hover:text-white transition-colors`,children:`Search`}),(0,j.jsx)(A,{to:`/methodology`,className:`font-sans text-sm text-white/50 hover:text-white transition-colors`,children:`Methodology`}),(0,j.jsx)(A,{to:`/sources`,className:`font-sans text-sm text-white/50 hover:text-white transition-colors`,children:`Sources`}),(0,j.jsx)(A,{to:`/bookmarks`,className:`font-sans text-sm text-white/50 hover:text-white transition-colors`,children:`Saved Articles`})]})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`p`,{className:`font-sans text-xs font-bold tracking-[0.1em] uppercase text-white/80 mb-4`,children:`Principles`}),(0,j.jsx)(`p`,{className:`font-body text-sm italic text-white/50 leading-relaxed`,children:`Primary Sources · Public Record · Your Conclusions`}),(0,j.jsx)(`p`,{className:`font-sans text-xs text-white/30 mt-6`,children:`Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.`})]})]}),(0,j.jsx)(`div`,{className:`border-t border-white/10 mt-12 pt-8 text-center`,children:(0,j.jsx)(`p`,{className:`font-sans text-xs text-white/30`,children:`© 2026 Veritas Worldwide Press · veritasworldwide.com · Free & Open Access`})})]})})}function Rr(){return(0,j.jsxs)(`div`,{className:`min-h-screen bg-parchment text-ink`,children:[(0,j.jsx)(`a`,{href:`#main-content`,className:`sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-sm focus:font-sans focus:text-sm focus:font-semibold`,children:`Skip to content`}),(0,j.jsx)(mr,{}),(0,j.jsx)(Ir,{}),(0,j.jsx)(`main`,{id:`main-content`,children:(0,j.jsxs)(It,{children:[(0,j.jsx)(Pt,{path:`/`,element:(0,j.jsx)(xr,{})}),(0,j.jsx)(Pt,{path:`/chapter/:id`,element:(0,j.jsx)(kr,{})}),(0,j.jsx)(Pt,{path:`/search`,element:(0,j.jsx)(Mr,{})}),(0,j.jsx)(Pt,{path:`/methodology`,element:(0,j.jsx)(Nr,{})}),(0,j.jsx)(Pt,{path:`/sources`,element:(0,j.jsx)(Pr,{})}),(0,j.jsx)(Pt,{path:`/bookmarks`,element:(0,j.jsx)(Fr,{})})]})}),(0,j.jsx)(Lr,{}),(0,j.jsx)(fr,{}),(0,j.jsx)(pr,{})]})}var zr=document.getElementById(`root`);if(!zr)throw Error(`Root element not found`);Kn.createRoot(zr).render((0,j.jsx)(x.StrictMode,{children:(0,j.jsx)(Tn,{children:(0,j.jsx)(ur,{children:(0,j.jsx)(Rr,{})})})}));