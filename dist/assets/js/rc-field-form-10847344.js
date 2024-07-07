import{r as m}from"./react-0fb5d424.js";import{c as G,d as w,f as E,o as te,p as D,b as ee,h as fe,g as Re,i as Le,j as xe,a as ve,q as Ue,_ as ge,e as B}from"./@babel-25fffde3.js";import{a as _,E as H,F as j,x as We}from"./rc-util-48ba7f71.js";import{S as je}from"./async-validator-dee29e8b.js";var z="RC_FORM_INTERNAL_HOOKS",$=function(){_(!1,"Can not find FormContext. Please make sure you wrap Field under Form.")},J=m.createContext({getFieldValue:$,getFieldsValue:$,getFieldError:$,getFieldWarning:$,getFieldsError:$,isFieldsTouched:$,isFieldTouched:$,isFieldValidating:$,isFieldsValidating:$,resetFields:$,setFields:$,setFieldValue:$,setFieldsValue:$,validateFields:$,submit:$,getInternalHooks:function(){return $(),{dispatch:$,initEntityValue:$,registerField:$,useSubscribe:$,setInitialValues:$,destroyForm:$,setCallbacks:$,registerWatch:$,getFields:$,setValidateMessages:$,setPreserve:$,getInitialValue:$}}}),ae=m.createContext(null);function se(u){return u==null?[]:Array.isArray(u)?u:[u]}function He(u){return u&&!!u._init}var L="'${name}' is not a valid ${type}",$e={default:"Validation error on field '${name}'",required:"'${name}' is required",enum:"'${name}' must be one of [${enum}]",whitespace:"'${name}' cannot be empty",date:{format:"'${name}' is invalid for format date",parse:"'${name}' could not be parsed as date",invalid:"'${name}' is invalid date"},types:{string:L,method:L,array:L,object:L,number:L,date:L,boolean:L,integer:L,float:L,regexp:L,email:L,url:L,hex:L},string:{len:"'${name}' must be exactly ${len} characters",min:"'${name}' must be at least ${min} characters",max:"'${name}' cannot be longer than ${max} characters",range:"'${name}' must be between ${min} and ${max} characters"},number:{len:"'${name}' must equal ${len}",min:"'${name}' cannot be less than ${min}",max:"'${name}' cannot be greater than ${max}",range:"'${name}' must be between ${min} and ${max}"},array:{len:"'${name}' must be exactly ${len} in length",min:"'${name}' cannot be less than ${min} in length",max:"'${name}' cannot be greater than ${max} in length",range:"'${name}' must be between ${min} and ${max} in length"},pattern:{mismatch:"'${name}' does not match pattern ${pattern}"}};function re(u){return Array.isArray(u)?De(u):G(u)==="object"&&u!==null?_e(u):u}function _e(u){if(Object.getPrototypeOf(u)===Object.prototype){var i={};for(var t in u)i[t]=re(u[t]);return i}return u}function De(u){return u.map(function(i){return re(i)})}function O(u){return se(u)}function Ve(u,i){var t={};return i.forEach(function(r){var e=H(u,r);t=j(t,r,e)}),t}function Y(u,i){return u&&u.some(function(t){return Me(t,i)})}function Pe(u){return G(u)==="object"&&u!==null&&Object.getPrototypeOf(u)===Object.prototype}function Ne(u,i){var t=Array.isArray(u)?w(u):E({},u);return i&&Object.keys(i).forEach(function(r){var e=t[r],n=i[r],s=Pe(e)&&Pe(n);t[r]=s?Ne(e,n||{}):re(n)}),t}function Z(u){for(var i=arguments.length,t=new Array(i>1?i-1:0),r=1;r<i;r++)t[r-1]=arguments[r];return t.reduce(function(e,n){return Ne(e,n)},u)}function Me(u,i){return!u||!i||u.length!==i.length?!1:u.every(function(t,r){return i[r]===t})}function Ke(u,i){if(u===i)return!0;if(!u&&i||u&&!i||!u||!i||G(u)!=="object"||G(i)!=="object")return!1;var t=Object.keys(u),r=Object.keys(i),e=new Set([].concat(t,r));return w(e).every(function(n){var s=u[n],c=i[n];return typeof s=="function"&&typeof c=="function"?!0:s===c})}function ze(u){var i=arguments.length<=1?void 0:arguments[1];return i&&i.target&&G(i.target)==="object"&&u in i.target?i.target[u]:i}function Ce(u,i,t){var r=u.length;if(i<0||i>=r||t<0||t>=r)return u;var e=u[i],n=i-t;return n>0?[].concat(w(u.slice(0,t)),[e],w(u.slice(t,i)),w(u.slice(i+1,r))):n<0?[].concat(w(u.slice(0,i)),w(u.slice(i+1,t+1)),[e],w(u.slice(t+1,r))):u}var Ee=je;function qe(u,i){return u.replace(/\$\{\w+\}/g,function(t){var r=t.slice(2,-1);return i[r]})}var be="CODE_LOGIC_ERROR";function ue(u,i,t,r,e){return le.apply(this,arguments)}function le(){return le=te(D().mark(function u(i,t,r,e,n){var s,c,a,l,o,d,f,y,F;return D().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:return s=E({},r),delete s.ruleIndex,Ee.warning=function(){},s.validator&&(c=s.validator,s.validator=function(){try{return c.apply(void 0,arguments)}catch(h){return console.error(h),Promise.reject(be)}}),a=null,s&&s.type==="array"&&s.defaultField&&(a=s.defaultField,delete s.defaultField),l=new Ee(ee({},i,[s])),o=Z({},$e,e.validateMessages),l.messages(o),d=[],v.prev=10,v.next=13,Promise.resolve(l.validate(ee({},i,t),E({},e)));case 13:v.next=18;break;case 15:v.prev=15,v.t0=v.catch(10),v.t0.errors&&(d=v.t0.errors.map(function(h,g){var V=h.message,C=V===be?o.default:V;return m.isValidElement(C)?m.cloneElement(C,{key:"error_".concat(g)}):C}));case 18:if(!(!d.length&&a)){v.next=23;break}return v.next=21,Promise.all(t.map(function(h,g){return ue("".concat(i,".").concat(g),h,a,e,n)}));case 21:return f=v.sent,v.abrupt("return",f.reduce(function(h,g){return[].concat(w(h),w(g))},[]));case 23:return y=E(E({},r),{},{name:i,enum:(r.enum||[]).join(", ")},n),F=d.map(function(h){return typeof h=="string"?qe(h,y):h}),v.abrupt("return",F);case 26:case"end":return v.stop()}},u,null,[[10,15]])})),le.apply(this,arguments)}function Ge(u,i,t,r,e,n){var s=u.join("."),c=t.map(function(o,d){var f=o.validator,y=E(E({},o),{},{ruleIndex:d});return f&&(y.validator=function(F,p,v){var h=!1,g=function(){for(var N=arguments.length,P=new Array(N),R=0;R<N;R++)P[R]=arguments[R];Promise.resolve().then(function(){_(!h,"Your validator function has already return a promise. `callback` will be ignored."),h||v.apply(void 0,P)})},V=f(F,p,g);h=V&&typeof V.then=="function"&&typeof V.catch=="function",_(h,"`callback` is deprecated. Please return a promise instead."),h&&V.then(function(){v()}).catch(function(C){v(C||" ")})}),y}).sort(function(o,d){var f=o.warningOnly,y=o.ruleIndex,F=d.warningOnly,p=d.ruleIndex;return!!f==!!F?y-p:f?1:-1}),a;if(e===!0)a=new Promise(function(){var o=te(D().mark(function d(f,y){var F,p,v;return D().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:F=0;case 1:if(!(F<c.length)){g.next=12;break}return p=c[F],g.next=5,ue(s,i,p,r,n);case 5:if(v=g.sent,!v.length){g.next=9;break}return y([{errors:v,rule:p}]),g.abrupt("return");case 9:F+=1,g.next=1;break;case 12:f([]);case 13:case"end":return g.stop()}},d)}));return function(d,f){return o.apply(this,arguments)}}());else{var l=c.map(function(o){return ue(s,i,o,r,n).then(function(d){return{errors:d,rule:o}})});a=(e?Ye(l):Je(l)).then(function(o){return Promise.reject(o)})}return a.catch(function(o){return o}),a}function Je(u){return oe.apply(this,arguments)}function oe(){return oe=te(D().mark(function u(i){return D().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",Promise.all(i).then(function(e){var n,s=(n=[]).concat.apply(n,w(e));return s}));case 1:case"end":return r.stop()}},u)})),oe.apply(this,arguments)}function Ye(u){return ce.apply(this,arguments)}function ce(){return ce=te(D().mark(function u(i){var t;return D().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=0,e.abrupt("return",new Promise(function(n){i.forEach(function(s){s.then(function(c){c.errors.length&&n([c]),t+=1,t===i.length&&n([])})})}));case 2:case"end":return e.stop()}},u)})),ce.apply(this,arguments)}var Be=["name"],x=[];function we(u,i,t,r,e,n){return typeof u=="function"?u(i,t,"source"in n?{source:n.source}:{}):r!==e}var he=function(u){Le(t,u);var i=xe(t);function t(r){var e;if(ve(this,t),e=i.call(this,r),e.state={resetCount:0},e.cancelRegisterFunc=null,e.mounted=!1,e.touched=!1,e.dirty=!1,e.validatePromise=void 0,e.prevValidating=void 0,e.errors=x,e.warnings=x,e.cancelRegister=function(){var a=e.props,l=a.preserve,o=a.isListField,d=a.name;e.cancelRegisterFunc&&e.cancelRegisterFunc(o,l,O(d)),e.cancelRegisterFunc=null},e.getNamePath=function(){var a=e.props,l=a.name,o=a.fieldContext,d=o.prefixName,f=d===void 0?[]:d;return l!==void 0?[].concat(w(f),w(l)):[]},e.getRules=function(){var a=e.props,l=a.rules,o=l===void 0?[]:l,d=a.fieldContext;return o.map(function(f){return typeof f=="function"?f(d):f})},e.refresh=function(){e.mounted&&e.setState(function(a){var l=a.resetCount;return{resetCount:l+1}})},e.triggerMetaEvent=function(a){var l=e.props.onMetaChange;l==null||l(E(E({},e.getMeta()),{},{destroy:a}))},e.onStoreChange=function(a,l,o){var d=e.props,f=d.shouldUpdate,y=d.dependencies,F=y===void 0?[]:y,p=d.onReset,v=o.store,h=e.getNamePath(),g=e.getValue(a),V=e.getValue(v),C=l&&Y(l,h);switch(o.type==="valueUpdate"&&o.source==="external"&&g!==V&&(e.touched=!0,e.dirty=!0,e.validatePromise=null,e.errors=x,e.warnings=x,e.triggerMetaEvent()),o.type){case"reset":if(!l||C){e.touched=!1,e.dirty=!1,e.validatePromise=void 0,e.errors=x,e.warnings=x,e.triggerMetaEvent(),p==null||p(),e.refresh();return}break;case"remove":{if(f){e.reRender();return}break}case"setField":{if(C){var N=o.data;"touched"in N&&(e.touched=N.touched),"validating"in N&&!("originRCField"in N)&&(e.validatePromise=N.validating?Promise.resolve([]):null),"errors"in N&&(e.errors=N.errors||x),"warnings"in N&&(e.warnings=N.warnings||x),e.dirty=!0,e.triggerMetaEvent(),e.reRender();return}if(f&&!h.length&&we(f,a,v,g,V,o)){e.reRender();return}break}case"dependenciesUpdate":{var P=F.map(O);if(P.some(function(R){return Y(o.relatedFields,R)})){e.reRender();return}break}default:if(C||(!F.length||h.length||f)&&we(f,a,v,g,V,o)){e.reRender();return}break}f===!0&&e.reRender()},e.validateRules=function(a){var l=e.getNamePath(),o=e.getValue(),d=a||{},f=d.triggerName,y=d.validateOnly,F=y===void 0?!1:y,p=Promise.resolve().then(function(){if(!e.mounted)return[];var v=e.props,h=v.validateFirst,g=h===void 0?!1:h,V=v.messageVariables,C=e.getRules();f&&(C=C.filter(function(P){return P}).filter(function(P){var R=P.validateTrigger;if(!R)return!0;var S=se(R);return S.includes(f)}));var N=Ge(l,o,C,a,g,V);return N.catch(function(P){return P}).then(function(){var P=arguments.length>0&&arguments[0]!==void 0?arguments[0]:x;if(e.validatePromise===p){var R;e.validatePromise=null;var S=[],T=[];(R=P.forEach)===null||R===void 0||R.call(P,function(k){var M=k.rule.warningOnly,b=k.errors,A=b===void 0?x:b;M?T.push.apply(T,w(A)):S.push.apply(S,w(A))}),e.errors=S,e.warnings=T,e.triggerMetaEvent(),e.reRender()}}),N});return F||(e.validatePromise=p,e.dirty=!0,e.errors=x,e.warnings=x,e.triggerMetaEvent(),e.reRender()),p},e.isFieldValidating=function(){return!!e.validatePromise},e.isFieldTouched=function(){return e.touched},e.isFieldDirty=function(){if(e.dirty||e.props.initialValue!==void 0)return!0;var a=e.props.fieldContext,l=a.getInternalHooks(z),o=l.getInitialValue;return o(e.getNamePath())!==void 0},e.getErrors=function(){return e.errors},e.getWarnings=function(){return e.warnings},e.isListField=function(){return e.props.isListField},e.isList=function(){return e.props.isList},e.isPreserve=function(){return e.props.preserve},e.getMeta=function(){e.prevValidating=e.isFieldValidating();var a={touched:e.isFieldTouched(),validating:e.prevValidating,errors:e.errors,warnings:e.warnings,name:e.getNamePath(),validated:e.validatePromise===null};return a},e.getOnlyChild=function(a){if(typeof a=="function"){var l=e.getMeta();return E(E({},e.getOnlyChild(a(e.getControlled(),l,e.props.fieldContext))),{},{isFunction:!0})}var o=We(a);return o.length!==1||!m.isValidElement(o[0])?{child:o,isFunction:!1}:{child:o[0],isFunction:!1}},e.getValue=function(a){var l=e.props.fieldContext.getFieldsValue,o=e.getNamePath();return H(a||l(!0),o)},e.getControlled=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},l=e.props,o=l.trigger,d=l.validateTrigger,f=l.getValueFromEvent,y=l.normalize,F=l.valuePropName,p=l.getValueProps,v=l.fieldContext,h=d!==void 0?d:v.validateTrigger,g=e.getNamePath(),V=v.getInternalHooks,C=v.getFieldsValue,N=V(z),P=N.dispatch,R=e.getValue(),S=p||function(b){return ee({},F,b)},T=a[o],k=E(E({},a),S(R));k[o]=function(){e.touched=!0,e.dirty=!0,e.triggerMetaEvent();for(var b,A=arguments.length,I=new Array(A),W=0;W<A;W++)I[W]=arguments[W];f?b=f.apply(void 0,I):b=ze.apply(void 0,[F].concat(I)),y&&(b=y(b,R,C(!0))),P({type:"updateValue",namePath:g,value:b}),T&&T.apply(void 0,I)};var M=se(h||[]);return M.forEach(function(b){var A=k[b];k[b]=function(){A&&A.apply(void 0,arguments);var I=e.props.rules;I&&I.length&&P({type:"validateField",namePath:g,triggerName:b})}}),k},r.fieldContext){var n=r.fieldContext.getInternalHooks,s=n(z),c=s.initEntityValue;c(Ue(e))}return e}return ge(t,[{key:"componentDidMount",value:function(){var e=this.props,n=e.shouldUpdate,s=e.fieldContext;if(this.mounted=!0,s){var c=s.getInternalHooks,a=c(z),l=a.registerField;this.cancelRegisterFunc=l(this)}n===!0&&this.reRender()}},{key:"componentWillUnmount",value:function(){this.cancelRegister(),this.triggerMetaEvent(!0),this.mounted=!1}},{key:"reRender",value:function(){this.mounted&&this.forceUpdate()}},{key:"render",value:function(){var e=this.state.resetCount,n=this.props.children,s=this.getOnlyChild(n),c=s.child,a=s.isFunction,l;return a?l=c:m.isValidElement(c)?l=m.cloneElement(c,this.getControlled(c.props)):(_(!c,"`children` of Field is not validate ReactElement."),l=c),m.createElement(m.Fragment,{key:e},l)}}]),t}(m.Component);he.contextType=J;he.defaultProps={trigger:"onChange",valuePropName:"value"};function Oe(u){var i=u.name,t=fe(u,Be),r=m.useContext(J),e=m.useContext(ae),n=i!==void 0?O(i):void 0,s="keep";return t.isListField||(s="_".concat((n||[]).join("_"))),m.createElement(he,Re({key:s,name:n,isListField:!!e},t,{fieldContext:r}))}var Qe=function(i){var t=i.name,r=i.initialValue,e=i.children,n=i.rules,s=i.validateTrigger,c=i.isListField,a=m.useContext(J),l=m.useContext(ae),o=m.useRef({keys:[],id:0}),d=o.current,f=m.useMemo(function(){var v=O(a.prefixName)||[];return[].concat(w(v),w(O(t)))},[a.prefixName,t]),y=m.useMemo(function(){return E(E({},a),{},{prefixName:f})},[a,f]),F=m.useMemo(function(){return{getKey:function(h){var g=f.length,V=h[g];return[d.keys[V],h.slice(g+1)]}}},[f]);if(typeof e!="function")return _(!1,"Form.List only accepts function as children."),null;var p=function(h,g,V){var C=V.source;return C==="internal"?!1:h!==g};return m.createElement(ae.Provider,{value:F},m.createElement(J.Provider,{value:y},m.createElement(Oe,{name:[],shouldUpdate:p,rules:n,validateTrigger:s,initialValue:r,isList:!0,isListField:c??!!l},function(v,h){var g=v.value,V=g===void 0?[]:g,C=v.onChange,N=a.getFieldValue,P=function(){var k=N(f||[]);return k||[]},R={add:function(k,M){var b=P();M>=0&&M<=b.length?(d.keys=[].concat(w(d.keys.slice(0,M)),[d.id],w(d.keys.slice(M))),C([].concat(w(b.slice(0,M)),[k],w(b.slice(M))))):(d.keys=[].concat(w(d.keys),[d.id]),C([].concat(w(b),[k]))),d.id+=1},remove:function(k){var M=P(),b=new Set(Array.isArray(k)?k:[k]);b.size<=0||(d.keys=d.keys.filter(function(A,I){return!b.has(I)}),C(M.filter(function(A,I){return!b.has(I)})))},move:function(k,M){if(k!==M){var b=P();k<0||k>=b.length||M<0||M>=b.length||(d.keys=Ce(d.keys,k,M),C(Ce(b,k,M)))}}},S=V||[];return Array.isArray(S)||(S=[]),e(S.map(function(T,k){var M=d.keys[k];return M===void 0&&(d.keys[k]=d.id,M=d.keys[k],d.id+=1),{name:k,key:M,isListField:!0}}),R,h)})))};function Xe(u){var i=!1,t=u.length,r=[];return u.length?new Promise(function(e,n){u.forEach(function(s,c){s.catch(function(a){return i=!0,a}).then(function(a){t-=1,r[c]=a,!(t>0)&&(i&&n(r),e(r))})})}):Promise.resolve([])}var Se="__@field_split__";function ie(u){return u.map(function(i){return"".concat(G(i),":").concat(i)}).join(Se)}var q=function(){function u(){ve(this,u),this.kvs=new Map}return ge(u,[{key:"set",value:function(t,r){this.kvs.set(ie(t),r)}},{key:"get",value:function(t){return this.kvs.get(ie(t))}},{key:"update",value:function(t,r){var e=this.get(t),n=r(e);n?this.set(t,n):this.delete(t)}},{key:"delete",value:function(t){this.kvs.delete(ie(t))}},{key:"map",value:function(t){return w(this.kvs.entries()).map(function(r){var e=B(r,2),n=e[0],s=e[1],c=n.split(Se);return t({key:c.map(function(a){var l=a.match(/^([^:]*):(.*)$/),o=B(l,3),d=o[1],f=o[2];return d==="number"?Number(f):f}),value:s})})}},{key:"toJSON",value:function(){var t={};return this.map(function(r){var e=r.key,n=r.value;return t[e.join(".")]=n,null}),t}}]),u}(),Ze=["name"],et=ge(function u(i){var t=this;ve(this,u),this.formHooked=!1,this.forceRootUpdate=void 0,this.subscribable=!0,this.store={},this.fieldEntities=[],this.initialValues={},this.callbacks={},this.validateMessages=null,this.preserve=null,this.lastValidatePromise=null,this.getForm=function(){return{getFieldValue:t.getFieldValue,getFieldsValue:t.getFieldsValue,getFieldError:t.getFieldError,getFieldWarning:t.getFieldWarning,getFieldsError:t.getFieldsError,isFieldsTouched:t.isFieldsTouched,isFieldTouched:t.isFieldTouched,isFieldValidating:t.isFieldValidating,isFieldsValidating:t.isFieldsValidating,resetFields:t.resetFields,setFields:t.setFields,setFieldValue:t.setFieldValue,setFieldsValue:t.setFieldsValue,validateFields:t.validateFields,submit:t.submit,_init:!0,getInternalHooks:t.getInternalHooks}},this.getInternalHooks=function(r){return r===z?(t.formHooked=!0,{dispatch:t.dispatch,initEntityValue:t.initEntityValue,registerField:t.registerField,useSubscribe:t.useSubscribe,setInitialValues:t.setInitialValues,destroyForm:t.destroyForm,setCallbacks:t.setCallbacks,setValidateMessages:t.setValidateMessages,getFields:t.getFields,setPreserve:t.setPreserve,getInitialValue:t.getInitialValue,registerWatch:t.registerWatch}):(_(!1,"`getInternalHooks` is internal usage. Should not call directly."),null)},this.useSubscribe=function(r){t.subscribable=r},this.prevWithoutPreserves=null,this.setInitialValues=function(r,e){if(t.initialValues=r||{},e){var n,s=Z({},r,t.store);(n=t.prevWithoutPreserves)===null||n===void 0||n.map(function(c){var a=c.key;s=j(s,a,H(r,a))}),t.prevWithoutPreserves=null,t.updateStore(s)}},this.destroyForm=function(){var r=new q;t.getFieldEntities(!0).forEach(function(e){t.isMergedPreserve(e.isPreserve())||r.set(e.getNamePath(),!0)}),t.prevWithoutPreserves=r},this.getInitialValue=function(r){var e=H(t.initialValues,r);return r.length?re(e):e},this.setCallbacks=function(r){t.callbacks=r},this.setValidateMessages=function(r){t.validateMessages=r},this.setPreserve=function(r){t.preserve=r},this.watchList=[],this.registerWatch=function(r){return t.watchList.push(r),function(){t.watchList=t.watchList.filter(function(e){return e!==r})}},this.notifyWatch=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[];if(t.watchList.length){var e=t.getFieldsValue(),n=t.getFieldsValue(!0);t.watchList.forEach(function(s){s(e,n,r)})}},this.timeoutId=null,this.warningUnhooked=function(){},this.updateStore=function(r){t.store=r},this.getFieldEntities=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;return r?t.fieldEntities.filter(function(e){return e.getNamePath().length}):t.fieldEntities},this.getFieldsMap=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1,e=new q;return t.getFieldEntities(r).forEach(function(n){var s=n.getNamePath();e.set(s,n)}),e},this.getFieldEntitiesForNamePathList=function(r){if(!r)return t.getFieldEntities(!0);var e=t.getFieldsMap(!0);return r.map(function(n){var s=O(n);return e.get(s)||{INVALIDATE_NAME_PATH:O(n)}})},this.getFieldsValue=function(r,e){if(t.warningUnhooked(),r===!0&&!e)return t.store;var n=t.getFieldEntitiesForNamePathList(Array.isArray(r)?r:null),s=[];return n.forEach(function(c){var a,l="INVALIDATE_NAME_PATH"in c?c.INVALIDATE_NAME_PATH:c.getNamePath();if(!(!r&&(!((a=c.isListField)===null||a===void 0)&&a.call(c))))if(!e)s.push(l);else{var o="getMeta"in c?c.getMeta():null;e(o)&&s.push(l)}}),Ve(t.store,s.map(O))},this.getFieldValue=function(r){t.warningUnhooked();var e=O(r);return H(t.store,e)},this.getFieldsError=function(r){t.warningUnhooked();var e=t.getFieldEntitiesForNamePathList(r);return e.map(function(n,s){return n&&!("INVALIDATE_NAME_PATH"in n)?{name:n.getNamePath(),errors:n.getErrors(),warnings:n.getWarnings()}:{name:O(r[s]),errors:[],warnings:[]}})},this.getFieldError=function(r){t.warningUnhooked();var e=O(r),n=t.getFieldsError([e])[0];return n.errors},this.getFieldWarning=function(r){t.warningUnhooked();var e=O(r),n=t.getFieldsError([e])[0];return n.warnings},this.isFieldsTouched=function(){t.warningUnhooked();for(var r=arguments.length,e=new Array(r),n=0;n<r;n++)e[n]=arguments[n];var s=e[0],c=e[1],a,l=!1;e.length===0?a=null:e.length===1?Array.isArray(s)?(a=s.map(O),l=!1):(a=null,l=s):(a=s.map(O),l=c);var o=t.getFieldEntities(!0),d=function(v){return v.isFieldTouched()};if(!a)return l?o.every(d):o.some(d);var f=new q;a.forEach(function(p){f.set(p,[])}),o.forEach(function(p){var v=p.getNamePath();a.forEach(function(h){h.every(function(g,V){return v[V]===g})&&f.update(h,function(g){return[].concat(w(g),[p])})})});var y=function(v){return v.some(d)},F=f.map(function(p){var v=p.value;return v});return l?F.every(y):F.some(y)},this.isFieldTouched=function(r){return t.warningUnhooked(),t.isFieldsTouched([r])},this.isFieldsValidating=function(r){t.warningUnhooked();var e=t.getFieldEntities();if(!r)return e.some(function(s){return s.isFieldValidating()});var n=r.map(O);return e.some(function(s){var c=s.getNamePath();return Y(n,c)&&s.isFieldValidating()})},this.isFieldValidating=function(r){return t.warningUnhooked(),t.isFieldsValidating([r])},this.resetWithFieldInitialValue=function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=new q,n=t.getFieldEntities(!0);n.forEach(function(a){var l=a.props.initialValue,o=a.getNamePath();if(l!==void 0){var d=e.get(o)||new Set;d.add({entity:a,value:l}),e.set(o,d)}});var s=function(l){l.forEach(function(o){var d=o.props.initialValue;if(d!==void 0){var f=o.getNamePath(),y=t.getInitialValue(f);if(y!==void 0)_(!1,"Form already set 'initialValues' with path '".concat(f.join("."),"'. Field can not overwrite it."));else{var F=e.get(f);if(F&&F.size>1)_(!1,"Multiple Field with path '".concat(f.join("."),"' set 'initialValue'. Can not decide which one to pick."));else if(F){var p=t.getFieldValue(f);(!r.skipExist||p===void 0)&&t.updateStore(j(t.store,f,w(F)[0].value))}}}})},c;r.entities?c=r.entities:r.namePathList?(c=[],r.namePathList.forEach(function(a){var l=e.get(a);if(l){var o;(o=c).push.apply(o,w(w(l).map(function(d){return d.entity})))}})):c=n,s(c)},this.resetFields=function(r){t.warningUnhooked();var e=t.store;if(!r){t.updateStore(Z({},t.initialValues)),t.resetWithFieldInitialValue(),t.notifyObservers(e,null,{type:"reset"}),t.notifyWatch();return}var n=r.map(O);n.forEach(function(s){var c=t.getInitialValue(s);t.updateStore(j(t.store,s,c))}),t.resetWithFieldInitialValue({namePathList:n}),t.notifyObservers(e,n,{type:"reset"}),t.notifyWatch(n)},this.setFields=function(r){t.warningUnhooked();var e=t.store,n=[];r.forEach(function(s){var c=s.name,a=fe(s,Ze),l=O(c);n.push(l),"value"in a&&t.updateStore(j(t.store,l,a.value)),t.notifyObservers(e,[l],{type:"setField",data:s})}),t.notifyWatch(n)},this.getFields=function(){var r=t.getFieldEntities(!0),e=r.map(function(n){var s=n.getNamePath(),c=n.getMeta(),a=E(E({},c),{},{name:s,value:t.getFieldValue(s)});return Object.defineProperty(a,"originRCField",{value:!0}),a});return e},this.initEntityValue=function(r){var e=r.props.initialValue;if(e!==void 0){var n=r.getNamePath(),s=H(t.store,n);s===void 0&&t.updateStore(j(t.store,n,e))}},this.isMergedPreserve=function(r){var e=r!==void 0?r:t.preserve;return e??!0},this.registerField=function(r){t.fieldEntities.push(r);var e=r.getNamePath();if(t.notifyWatch([e]),r.props.initialValue!==void 0){var n=t.store;t.resetWithFieldInitialValue({entities:[r],skipExist:!0}),t.notifyObservers(n,[r.getNamePath()],{type:"valueUpdate",source:"internal"})}return function(s,c){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];if(t.fieldEntities=t.fieldEntities.filter(function(d){return d!==r}),!t.isMergedPreserve(c)&&(!s||a.length>1)){var l=s?void 0:t.getInitialValue(e);if(e.length&&t.getFieldValue(e)!==l&&t.fieldEntities.every(function(d){return!Me(d.getNamePath(),e)})){var o=t.store;t.updateStore(j(o,e,l,!0)),t.notifyObservers(o,[e],{type:"remove"}),t.triggerDependenciesUpdate(o,e)}}t.notifyWatch([e])}},this.dispatch=function(r){switch(r.type){case"updateValue":{var e=r.namePath,n=r.value;t.updateValue(e,n);break}case"validateField":{var s=r.namePath,c=r.triggerName;t.validateFields([s],{triggerName:c});break}}},this.notifyObservers=function(r,e,n){if(t.subscribable){var s=E(E({},n),{},{store:t.getFieldsValue(!0)});t.getFieldEntities().forEach(function(c){var a=c.onStoreChange;a(r,e,s)})}else t.forceRootUpdate()},this.triggerDependenciesUpdate=function(r,e){var n=t.getDependencyChildrenFields(e);return n.length&&t.validateFields(n),t.notifyObservers(r,n,{type:"dependenciesUpdate",relatedFields:[e].concat(w(n))}),n},this.updateValue=function(r,e){var n=O(r),s=t.store;t.updateStore(j(t.store,n,e)),t.notifyObservers(s,[n],{type:"valueUpdate",source:"internal"}),t.notifyWatch([n]);var c=t.triggerDependenciesUpdate(s,n),a=t.callbacks.onValuesChange;if(a){var l=Ve(t.store,[n]);a(l,t.getFieldsValue())}t.triggerOnFieldsChange([n].concat(w(c)))},this.setFieldsValue=function(r){t.warningUnhooked();var e=t.store;if(r){var n=Z(t.store,r);t.updateStore(n)}t.notifyObservers(e,null,{type:"valueUpdate",source:"external"}),t.notifyWatch()},this.setFieldValue=function(r,e){t.setFields([{name:r,value:e}])},this.getDependencyChildrenFields=function(r){var e=new Set,n=[],s=new q;t.getFieldEntities().forEach(function(a){var l=a.props.dependencies;(l||[]).forEach(function(o){var d=O(o);s.update(d,function(){var f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:new Set;return f.add(a),f})})});var c=function a(l){var o=s.get(l)||new Set;o.forEach(function(d){if(!e.has(d)){e.add(d);var f=d.getNamePath();d.isFieldDirty()&&f.length&&(n.push(f),a(f))}})};return c(r),n},this.triggerOnFieldsChange=function(r,e){var n=t.callbacks.onFieldsChange;if(n){var s=t.getFields();if(e){var c=new q;e.forEach(function(l){var o=l.name,d=l.errors;c.set(o,d)}),s.forEach(function(l){l.errors=c.get(l.name)||l.errors})}var a=s.filter(function(l){var o=l.name;return Y(r,o)});n(a,s)}},this.validateFields=function(r,e){t.warningUnhooked();var n,s;Array.isArray(r)||typeof r=="string"||typeof e=="string"?(n=r,s=e):s=r;var c=!!n,a=c?n.map(O):[],l=[];t.getFieldEntities(!0).forEach(function(f){var y;if(c||a.push(f.getNamePath()),!((y=s)===null||y===void 0)&&y.recursive&&c){var F=f.getNamePath();F.every(function(h,g){return n[g]===h||n[g]===void 0})&&a.push(F)}if(!(!f.props.rules||!f.props.rules.length)){var p=f.getNamePath();if(!c||Y(a,p)){var v=f.validateRules(E({validateMessages:E(E({},$e),t.validateMessages)},s));l.push(v.then(function(){return{name:p,errors:[],warnings:[]}}).catch(function(h){var g,V=[],C=[];return(g=h.forEach)===null||g===void 0||g.call(h,function(N){var P=N.rule.warningOnly,R=N.errors;P?C.push.apply(C,w(R)):V.push.apply(V,w(R))}),V.length?Promise.reject({name:p,errors:V,warnings:C}):{name:p,errors:V,warnings:C}}))}}});var o=Xe(l);t.lastValidatePromise=o,o.catch(function(f){return f}).then(function(f){var y=f.map(function(F){var p=F.name;return p});t.notifyObservers(t.store,y,{type:"validateFinish"}),t.triggerOnFieldsChange(y,f)});var d=o.then(function(){return t.lastValidatePromise===o?Promise.resolve(t.getFieldsValue(a)):Promise.reject([])}).catch(function(f){var y=f.filter(function(F){return F&&F.errors.length});return Promise.reject({values:t.getFieldsValue(a),errorFields:y,outOfDate:t.lastValidatePromise!==o})});return d.catch(function(f){return f}),t.triggerOnFieldsChange(a),d},this.submit=function(){t.warningUnhooked(),t.validateFields().then(function(r){var e=t.callbacks.onFinish;if(e)try{e(r)}catch(n){console.error(n)}}).catch(function(r){var e=t.callbacks.onFinishFailed;e&&e(r)})},this.forceRootUpdate=i});function Te(u){var i=m.useRef(),t=m.useState({}),r=B(t,2),e=r[1];if(!i.current)if(u)i.current=u;else{var n=function(){e({})},s=new et(n);i.current=s.getForm()}return[i.current]}var de=m.createContext({triggerFormChange:function(){},triggerFormFinish:function(){},registerForm:function(){},unregisterForm:function(){}}),tt=function(i){var t=i.validateMessages,r=i.onFormChange,e=i.onFormFinish,n=i.children,s=m.useContext(de),c=m.useRef({});return m.createElement(de.Provider,{value:E(E({},s),{},{validateMessages:E(E({},s.validateMessages),t),triggerFormChange:function(l,o){r&&r(l,{changedFields:o,forms:c.current}),s.triggerFormChange(l,o)},triggerFormFinish:function(l,o){e&&e(l,{values:o,forms:c.current}),s.triggerFormFinish(l,o)},registerForm:function(l,o){l&&(c.current=E(E({},c.current),{},ee({},l,o))),s.registerForm(l,o)},unregisterForm:function(l){var o=E({},c.current);delete o[l],c.current=o,s.unregisterForm(l)}})},n)},rt=["name","initialValues","fields","form","preserve","children","component","validateMessages","validateTrigger","onValuesChange","onFieldsChange","onFinish","onFinishFailed"],nt=function(i,t){var r=i.name,e=i.initialValues,n=i.fields,s=i.form,c=i.preserve,a=i.children,l=i.component,o=l===void 0?"form":l,d=i.validateMessages,f=i.validateTrigger,y=f===void 0?"onChange":f,F=i.onValuesChange,p=i.onFieldsChange,v=i.onFinish,h=i.onFinishFailed,g=fe(i,rt),V=m.useContext(de),C=Te(s),N=B(C,1),P=N[0],R=P.getInternalHooks(z),S=R.useSubscribe,T=R.setInitialValues,k=R.setCallbacks,M=R.setValidateMessages,b=R.setPreserve,A=R.destroyForm;m.useImperativeHandle(t,function(){return P}),m.useEffect(function(){return V.registerForm(r,P),function(){V.unregisterForm(r)}},[V,P,r]),M(E(E({},V.validateMessages),d)),k({onValuesChange:F,onFieldsChange:function(U){if(V.triggerFormChange(r,U),p){for(var K=arguments.length,ye=new Array(K>1?K-1:0),X=1;X<K;X++)ye[X-1]=arguments[X];p.apply(void 0,[U].concat(ye))}},onFinish:function(U){V.triggerFormFinish(r,U),v&&v(U)},onFinishFailed:h}),b(c);var I=m.useRef(null);T(e,!I.current),I.current||(I.current=!0),m.useEffect(function(){return A},[]);var W,me=typeof a=="function";if(me){var Ae=P.getFieldsValue(!0);W=a(Ae,P)}else W=a;S(!me);var pe=m.useRef();m.useEffect(function(){Ke(pe.current||[],n||[])||P.setFields(n||[]),pe.current=n},[n,P]);var Ie=m.useMemo(function(){return E(E({},P),{},{validateTrigger:y})},[P,y]),Fe=m.createElement(J.Provider,{value:Ie},W);return o===!1?Fe:m.createElement(o,Re({},g,{onSubmit:function(U){U.preventDefault(),U.stopPropagation(),P.submit()},onReset:function(U){var K;U.preventDefault(),P.resetFields(),(K=g.onReset)===null||K===void 0||K.call(g,U)}}),Fe)};function ke(u){try{return JSON.stringify(u)}catch{return Math.random()}}function it(){for(var u=arguments.length,i=new Array(u),t=0;t<u;t++)i[t]=arguments[t];var r=i[0],e=r===void 0?[]:r,n=i[1],s=n===void 0?{}:n,c=He(s)?{form:s}:s,a=c.form,l=m.useState(),o=B(l,2),d=o[0],f=o[1],y=m.useMemo(function(){return ke(d)},[d]),F=m.useRef(y);F.current=y;var p=m.useContext(J),v=a||p,h=v&&v._init,g=O(e),V=m.useRef(g);return V.current=g,m.useEffect(function(){if(h){var C=v.getFieldsValue,N=v.getInternalHooks,P=N(z),R=P.registerWatch,S=R(function(k,M){var b=H(c.preserve?M:k,V.current),A=ke(b);F.current!==A&&(F.current=A,f(b))}),T=H(c.preserve?C(!0):C(),V.current);return f(T),S}},[h]),d}var at=m.forwardRef(nt),Q=at;Q.FormProvider=tt;Q.Field=Oe;Q.List=Qe;Q.useForm=Te;Q.useWatch=it;export{J as C,tt as F,ae as L,Q as R,Oe as W,Qe as a,it as b,Z as s,Te as u};
