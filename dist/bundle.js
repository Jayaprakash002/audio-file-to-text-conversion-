(()=>{function e(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,l=[],u=!0,i=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=c.call(r)).done)&&(l.push(n.value),l.length!==t);u=!0);}catch(e){i=!0,o=e}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(i)throw o}}return l}}(e,r)||function(e,r){if(e){if("string"==typeof e)return t(e,r);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}ReactDOM.render(React.createElement((function(){var t=e(React.useState(""),2),r=t[0],n=t[1],o=e(React.useState(null),2),c=o[0],a=o[1],l=React.useRef(null);return React.createElement("div",null,React.createElement("h1",null,"Audio to Text Converter"),React.createElement("input",{type:"file",accept:"audio/*",onChange:function(e){var t=e.target.files[0];if(t){var r=URL.createObjectURL(t);l.current.src=r}}}),React.createElement("audio",{ref:l,controls:!0,onPlay:function(){var e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.continuous=!1,e.interimResults=!1,e.lang="en-US",e.onresult=function(e){var t=e.results[0][0].transcript;n(t)},e.onerror=function(e){a("Error occurred in recognition: ".concat(e.error))},e.start(),l.current.onplay=function(){e.start()},l.current.onended=function(){e.stop()}}}),r&&React.createElement("p",null,"Transcript: ".concat(r)),c&&React.createElement("p",null,"Error: ".concat(c)))})),document.getElementById("root"))})();