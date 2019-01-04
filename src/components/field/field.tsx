import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'pbp-field',
  styleUrl: 'field.css'
})
export class Field {
  @Prop() view: 'bird' | 'camera' | 'side';
  @Prop() jsonOpen: boolean;

  render() {
    return (
      <div class={`field-wrapper ${this.view} ${this.jsonOpen && 'json-open'}`}>
        <div class="field">
          <div class="elements-holder">
            <slot />
          </div>
          {/* <pbp-net /> */}
          {/* <svg 
 xmlns="http://www.w3.org/2000/svg"
 
 width="913px" height="495px">
<path fill-rule="evenodd"  stroke="rgb(232, 232, 232)" stroke-width="0px" stroke-linecap="butt" stroke-linejoin="miter" fill="rgb(255, 255, 255)"
 d="M913.000,495.000 L-0.000,492.000 L2.000,486.000 L3.388,486.003 L137.788,264.945 L138.533,263.000 L138.970,263.001 L220.035,129.667 L220.000,129.667 L221.137,127.000 L221.656,127.001 L269.079,49.000 L269.000,49.000 L269.917,47.000 L270.294,47.001 L297.046,3.000 L297.000,3.000 L297.784,1.000 L338.636,1.085 L338.742,0.855 L339.985,1.088 L618.824,1.667 L619.037,2.089 L619.449,2.012 L776.392,264.333 L776.700,264.333 L778.136,267.248 L912.005,491.000 L911.243,490.901 L913.000,495.000 ZM450.505,486.988 L451.742,461.855 L460.201,461.502 L460.585,487.010 L788.952,487.733 L692.802,268.731 L222.389,267.266 L123.658,486.268 L450.505,486.988 ZM459.972,130.339 L459.600,263.671 L690.793,264.154 L632.255,130.821 L459.972,130.339 ZM630.915,127.770 L596.712,49.865 L460.198,49.504 L459.980,127.449 L630.915,127.770 ZM455.914,127.441 L456.725,49.495 L320.726,49.136 L285.569,127.121 L455.914,127.441 ZM284.340,129.847 L224.231,263.179 L454.497,263.660 L455.884,130.327 L284.340,129.847 ZM11.753,486.021 L115.106,486.249 L216.007,267.246 L142.854,267.018 L11.753,486.021 ZM145.251,263.014 L217.887,263.166 L279.318,129.833 L225.068,129.681 L145.251,263.014 ZM226.667,127.010 L280.572,127.112 L316.502,49.125 L273.359,49.012 L226.667,127.010 ZM300.896,3.012 L274.558,47.008 L317.443,47.084 L337.696,3.126 L300.896,3.012 ZM456.999,6.000 L457.239,3.496 L341.464,3.138 L321.648,47.092 L595.707,47.577 L576.517,3.865 L459.928,3.504 L460.000,5.972 L456.999,6.000 ZM616.771,3.990 L580.286,3.877 L599.911,47.584 L642.487,47.659 L616.771,3.990 ZM643.859,49.989 L600.940,49.876 L635.918,127.779 L689.728,127.880 L643.859,49.989 ZM691.558,130.988 L637.291,130.836 L697.157,264.167 L770.075,264.319 L691.558,130.988 ZM772.820,268.981 L699.215,268.751 L797.546,487.752 L901.787,487.982 L772.820,268.981 Z"/>
</svg> */}
          <svg  width="820px" height="400px" viewBox="0 0 368 207" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="14" width="388" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="301" y="14" width="88" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="14" width="88" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="14" width="388" height="21.1278" fill="#B0502D" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="171.872" width="388" height="21.1278" fill="#B0502D" stroke="#FFF" stroke-width="2"/>
            <path d="M90 103.5L300 103.5" stroke="#FFF" stroke-width="2"/>
            <path d="M195 13L195 194" stroke="#FFF"/>
            <path d="M195 4V202" stroke="#FFF" stroke-width="4"/>
            <path d="M381 103.5H390" stroke="#FFF" stroke-width="2"/>
            <path d="M0 103.5H9" stroke="#FFF" stroke-width="2"/>
            <circle cx="195" cy="3" r="3" fill="#FFF"/>
            <circle cx="195" cy="204" r="3" fill="#FFF"/>
          </svg>


 
        
  
        </div>
      </div>

    );
  }
}
