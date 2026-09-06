const F=`
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`,I=`
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uDepth;   // -1 = high above water · 0 = waterline · +1 = abyss
uniform vec2  uMouse;   // -1 .. 1

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i),              hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++){ s += a * noise(p); p *= 2.03; a *= 0.5; }
  return s;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 sv = vec2(uv.x * aspect, uv.y);      // square-ish space
  float t = uTime;
  float d = clamp(uDepth, -1.0, 1.0);
  float uWarm = smoothstep(0.0, -0.42, d);   // rising into air warms the light

  /* the horizon slides up and off as we sink — and it is never a straight line */
  float swell = sin(sv.x *  2.3 + t * 0.42) * 0.0085
              + sin(sv.x *  5.1 - t * 0.61) * 0.0048
              + sin(sv.x *  9.7 + t * 0.88) * 0.0026
              + sin(sv.x * 21.0 - t * 1.30) * 0.0011
              + (fbm(vec2(sv.x * 1.7, t * 0.09)) - 0.5) * 0.014;
  float horizon = 0.615 + d * 2.4 - max(-d, 0.0) * 0.9 + swell;

  /* ---------------- sky ---------------- */
  vec3 skyHigh = mix(vec3(0.29, 0.43, 0.56), vec3(0.42, 0.60, 0.80), uWarm);
  vec3 skyLow  = mix(vec3(0.62, 0.71, 0.76), vec3(0.96, 0.90, 0.80), uWarm);
  vec3 sky = mix(skyLow, skyHigh, smoothstep(horizon, horizon + 0.75, uv.y));

  /* on a narrow screen the sun moves further out of the way of the type */
  float narrow = step(uRes.x, uRes.y);
  float sunX   = mix(0.74, 0.90, narrow);
  float spread = mix(6.5, 9.5, narrow);
  vec2 sunP = vec2(sunX * aspect + uMouse.x * 0.05, horizon + 0.13 + uMouse.y * 0.02);
  float sd  = length(sv - sunP);
  sky += vec3(1.0, 0.93, 0.80) * exp(-sd * spread) * mix(0.40, 0.30, narrow);
  sky += vec3(1.0, 0.88, 0.72) * exp(-sd * 2.1) * 0.10;

  /* soft cloud banding, barely there */
  float cl = fbm(vec2(sv.x * 1.6 + t * 0.012, uv.y * 3.4));
  sky = mix(sky, sky + vec3(0.06), smoothstep(0.55, 0.9, cl) * 0.6);

  /* ---------------- water ---------------- */
  float below = max(horizon - uv.y, 0.0);
  float dd = clamp(d + below * 0.16, 0.0, 1.0);   // shading depth

  vec3 shallow = mix(vec3(0.24, 0.55, 0.60), vec3(0.30, 0.60, 0.66), uWarm);
  vec3 mid     = vec3(0.017, 0.115, 0.180);
  vec3 abyss   = vec3(0.004, 0.020, 0.036);

  vec3 water = mix(shallow, mid,   smoothstep(0.00, 0.42, dd));
  water      = mix(water,   abyss, smoothstep(0.42, 1.00, dd));

  float lit = 1.0 - smoothstep(0.02, 0.62, dd);   // how much light still reaches

  /* caustic ripple net drifting overhead */
  vec2 cq = vec2(sv.x * 3.2, uv.y * 5.0 - t * 0.22);
  float n = fbm(cq + fbm(cq * 0.6 + vec2(t * 0.05, 0.0)) * 1.3);
  water += vec3(0.45, 0.90, 1.00) * pow(n, 3.2) * 2.0 * 0.15 * lit;

  /* light shafts leaning in from above */
  float ray = 0.0;
  for (int i = 0; i < 4; i++){
    float fi = float(i);
    float x = sv.x - 0.30 - fi * 0.42 + sin(t * 0.06 + fi * 2.3) * 0.16
            + (horizon - uv.y) * 0.42;
    ray += exp(-abs(x) * 11.0) * (0.7 + 0.3 * sin(t * 0.3 + fi));
  }
  water += vec3(0.50, 0.86, 0.98) * ray * 0.085 * lit;

  /* the glitter band right under the surface */
  float band = exp(-below * 26.0);
  float gl = pow(fbm(vec2(sv.x * 30.0, uv.y * 60.0 + t * 1.4)), 4.0) * 6.0;
  float glitterX = exp(-abs(sv.x - sunP.x) * 1.5);
  water += vec3(1.0, 0.96, 0.88) * gl * band * glitterX * 0.85
         * (1.0 - smoothstep(0.0, 0.25, abs(d)));

  /* marine snow — only once it is dark enough to see it */
  float snowAmt = smoothstep(0.10, 0.45, dd);
  for (int L = 0; L < 3; L++){
    float fl = float(L);
    float sc = 16.0 + fl * 13.0;
    vec2 sp = sv * sc + vec2(fl * 31.7, t * (0.30 + fl * 0.16) + fl * 11.3);
    vec2 gi = floor(sp), gf = fract(sp);
    vec2 c  = vec2(hash(gi + fl * 3.1), hash(gi + fl * 7.7));
    float m = smoothstep(0.10, 0.0, length(gf - c));
    water += vec3(0.75, 0.90, 1.00) * m * step(0.90, hash(gi + fl * 1.3))
           * (0.34 - fl * 0.08) * snowAmt;
  }

  /* ---------------- composite ---------------- */
  float mask = smoothstep(horizon + 0.0016, horizon - 0.0016, uv.y);
  vec3 col = mix(sky, water, mask);

  /* vignette, deepening with depth */
  float v = length((uv - 0.5) * vec2(aspect * 0.85, 1.0));
  col *= 1.0 - smoothstep(0.35, 1.05, v) * (0.32 + max(d, 0.0) * 0.38 - uWarm * 0.22);

  /* film grain keeps the gradients from banding */
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.022;

  gl_FragColor = vec4(col, 1.0);
}
`,d=(()=>{let e,o,s={},t,i=0,n=0,l=[0,0],h=[0,0],k=performance.now(),u=!1;const L=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function w(a,c){const r=e.createShader(a);return e.shaderSource(r,c),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(e.getShaderInfoLog(r)),null)}function M(){const a=Math.min(window.devicePixelRatio||1,1.75),c=Math.floor(t.clientWidth*a),r=Math.floor(t.clientHeight*a);(t.width!==c||t.height!==r)&&(t.width=c,t.height=r,e.viewport(0,0,c,r))}function x(){u&&(M(),i+=(n-i)*.06,l[0]+=(h[0]-l[0])*.05,l[1]+=(h[1]-l[1])*.05,e.uniform2f(s.uRes,t.width,t.height),e.uniform1f(s.uTime,L?0:(performance.now()-k)/1e3),e.uniform1f(s.uDepth,i),e.uniform2f(s.uMouse,l[0],l[1]),e.drawArrays(e.TRIANGLE_STRIP,0,4),requestAnimationFrame(x))}function m(a){a.classList.add("water-fallback")}function S(a,c={}){if(u)return;if(t=a,n=i=c.depth||0,e=t.getContext("webgl",{antialias:!1,alpha:!1,depth:!1})||t.getContext("experimental-webgl"),!e)return m(t);const r=w(e.VERTEX_SHADER,F),y=w(e.FRAGMENT_SHADER,I);if(!r||!y||(o=e.createProgram(),e.attachShader(o,r),e.attachShader(o,y),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)))return m(t);e.useProgram(o);const T=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,T),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const b=e.getAttribLocation(o,"p");e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0),["uRes","uTime","uDepth","uMouse"].forEach(f=>s[f]=e.getUniformLocation(o,f)),window.matchMedia("(pointer: fine)").matches&&window.addEventListener("pointermove",f=>{h[0]=f.clientX/innerWidth*2-1,h[1]=f.clientY/innerHeight*2-1},{passive:!0}),u=!0,requestAnimationFrame(x)}return{init:S,set depth(a){n=Math.max(-1,Math.min(1,a))},get depth(){return n},get live(){return u},jump(a){n=i=Math.max(-1,Math.min(1,a))}}})();typeof window<"u"&&(window.Water=d);let v=0,E=0,p=null,g=!1;const P=.55;function A(){const e=document.documentElement.scrollHeight-window.innerHeight;return e>40?Math.min(1,Math.max(0,window.scrollY/e)):0}function _(){const e=document.getElementById("waterline");if(!e)return 0;const o=e.offsetTop,s=document.documentElement.scrollHeight-window.innerHeight,t=window.scrollY;return o<=0||s<=o?0:t<o?-.62*(1-t/o):P*((t-o)/(s-o))}function R(){p=null;const e=g?_():v+E*A();d.depth=e,document.dispatchEvent(new CustomEvent("axis",{detail:{depth:e,t:A()}}))}function q(){p||(p=requestAnimationFrame(R)),document.body.classList.toggle("scrolled",window.scrollY>24)}function z(){const e=document.getElementById("world");if(e){if(v=parseFloat(document.body.dataset.depth||"0"),E=parseFloat(document.body.dataset.drift||"0"),g=document.body.dataset.mode==="axis",d.live||d.init(e,{depth:v}),g){const o=document.getElementById("waterline");o&&!location.hash&&("scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo({top:o.offsetTop,behavior:"instant"}),d.jump(0))}R()}}function D(){const e=new IntersectionObserver(i=>{i.forEach(n=>{n.isIntersecting&&(n.target.classList.add("in"),e.unobserve(n.target))})},{threshold:.12,rootMargin:"0px 0px -6% 0px"});document.querySelectorAll("[data-rise]:not(.in)").forEach(i=>e.observe(i));const o=new IntersectionObserver(i=>i.forEach(n=>n.target.classList.toggle("lit",n.isIntersecting)),{threshold:.3});document.querySelectorAll(".specimen, .plate").forEach(i=>o.observe(i));const s=document.querySelector("footer"),t=document.querySelector(".readout");s&&t&&new IntersectionObserver(([i])=>t.classList.toggle("tuck",i.isIntersecting),{rootMargin:"0px 0px -12px 0px"}).observe(s)}window.addEventListener("scroll",q,{passive:!0});document.addEventListener("astro:page-load",()=>{z(),D()});
