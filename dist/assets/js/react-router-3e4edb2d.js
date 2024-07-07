import{r as n}from"./react-0fb5d424.js";import{i as v,g as k,r as F,j as y,p as O,m as J,A as I,s as T,a as _}from"./@remix-run-7c45f29c.js";/**
 * React Router v6.11.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function E(){return E=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},E.apply(this,arguments)}const U=n.createContext(null),W=n.createContext(null),R=n.createContext(null),b=n.createContext(null),C=n.createContext({outlet:null,matches:[],isDataRoute:!1}),L=n.createContext(null);function P(){return n.useContext(b)!=null}function D(){return P()||v(!1),n.useContext(b).location}function M(e){n.useContext(R).static||n.useLayoutEffect(e)}function re(){let{isDataRoute:e}=n.useContext(C);return e?H():q()}function q(){P()||v(!1);let e=n.useContext(U),{basename:t,navigator:r}=n.useContext(R),{matches:o}=n.useContext(C),{pathname:l}=D(),a=JSON.stringify(k(o).map(i=>i.pathnameBase)),c=n.useRef(!1);return M(()=>{c.current=!0}),n.useCallback(function(i,s){if(s===void 0&&(s={}),!c.current)return;if(typeof i=="number"){r.go(i);return}let d=F(i,JSON.parse(a),l,s.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:y([t,d.pathname])),(s.replace?r.replace:r.push)(d,s.state,s)},[t,r,a,l,e])}const z=n.createContext(null);function G(e){let t=n.useContext(C).outlet;return t&&n.createElement(z.Provider,{value:e},t)}function ne(e,t){return K(e,t)}function K(e,t,r){P()||v(!1);let{navigator:o}=n.useContext(R),{matches:l}=n.useContext(C),a=l[l.length-1],c=a?a.params:{};a&&a.pathname;let u=a?a.pathnameBase:"/";a&&a.route;let i=D(),s;if(t){var d;let f=typeof t=="string"?O(t):t;u==="/"||(d=f.pathname)!=null&&d.startsWith(u)||v(!1),s=f}else s=i;let h=s.pathname||"/",p=u==="/"?h:h.slice(u.length)||"/",g=J(e,{pathname:p}),m=Z(g&&g.map(f=>Object.assign({},f,{params:Object.assign({},c,f.params),pathname:y([u,o.encodeLocation?o.encodeLocation(f.pathname).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?u:y([u,o.encodeLocation?o.encodeLocation(f.pathnameBase).pathname:f.pathnameBase])})),l,r);return t&&m?n.createElement(b.Provider,{value:{location:E({pathname:"/",search:"",hash:"",state:null,key:"default"},s),navigationType:I.Pop}},m):m}function Q(){let e=S(),t=_(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,l={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},a=null;return n.createElement(n.Fragment,null,n.createElement("h2",null,"Unexpected Application Error!"),n.createElement("h3",{style:{fontStyle:"italic"}},t),r?n.createElement("pre",{style:l},r):null,a)}const V=n.createElement(Q,null);class X extends n.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,r){return r.location!==t.location||r.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||r.error,location:r.location,revalidation:t.revalidation||r.revalidation}}componentDidCatch(t,r){console.error("React Router caught the following error during render",t,r)}render(){return this.state.error?n.createElement(C.Provider,{value:this.props.routeContext},n.createElement(L.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Y(e){let{routeContext:t,match:r,children:o}=e,l=n.useContext(U);return l&&l.static&&l.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=r.route.id),n.createElement(C.Provider,{value:t},o)}function Z(e,t,r){var o;if(t===void 0&&(t=[]),r===void 0&&(r=null),e==null){var l;if((l=r)!=null&&l.errors)e=r.matches;else return null}let a=e,c=(o=r)==null?void 0:o.errors;if(c!=null){let u=a.findIndex(i=>i.route.id&&(c==null?void 0:c[i.route.id]));u>=0||v(!1),a=a.slice(0,Math.min(a.length,u+1))}return a.reduceRight((u,i,s)=>{let d=i.route.id?c==null?void 0:c[i.route.id]:null,h=null;r&&(h=i.route.errorElement||V);let p=t.concat(a.slice(0,s+1)),g=()=>{let m;return d?m=h:i.route.Component?m=n.createElement(i.route.Component,null):i.route.element?m=i.route.element:m=u,n.createElement(Y,{match:i,routeContext:{outlet:u,matches:p,isDataRoute:r!=null},children:m})};return r&&(i.route.ErrorBoundary||i.route.errorElement||s===0)?n.createElement(X,{location:r.location,revalidation:r.revalidation,component:h,error:d,children:g(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):g()},null)}var N;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"})(N||(N={}));var x;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"})(x||(x={}));function $(e){let t=n.useContext(U);return t||v(!1),t}function w(e){let t=n.useContext(W);return t||v(!1),t}function A(e){let t=n.useContext(C);return t||v(!1),t}function j(e){let t=A(),r=t.matches[t.matches.length-1];return r.route.id||v(!1),r.route.id}function S(){var e;let t=n.useContext(L),r=w(x.UseRouteError),o=j(x.UseRouteError);return t||((e=r.errors)==null?void 0:e[o])}function H(){let{router:e}=$(N.UseNavigateStable),t=j(x.UseNavigateStable),r=n.useRef(!1);return M(()=>{r.current=!0}),n.useCallback(function(l,a){a===void 0&&(a={}),r.current&&(typeof l=="number"?e.navigate(l):e.navigate(l,E({fromRouteId:t},a)))},[e,t])}function ae(e){return G(e.context)}function oe(e){let{basename:t="/",children:r=null,location:o,navigationType:l=I.Pop,navigator:a,static:c=!1}=e;P()&&v(!1);let u=t.replace(/^\/*/,"/"),i=n.useMemo(()=>({basename:u,navigator:a,static:c}),[u,a,c]);typeof o=="string"&&(o=O(o));let{pathname:s="/",search:d="",hash:h="",state:p=null,key:g="default"}=o,m=n.useMemo(()=>{let f=T(s,u);return f==null?null:{location:{pathname:f,search:d,hash:h,state:p,key:g},navigationType:l}},[u,s,d,h,p,g,l]);return m==null?null:n.createElement(R.Provider,{value:i},n.createElement(b.Provider,{children:r,value:m}))}var B;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(B||(B={}));new Promise(()=>{});export{ae as O,oe as R,D as a,ne as b,re as u};
