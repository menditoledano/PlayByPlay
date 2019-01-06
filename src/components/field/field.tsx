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

          <svg  width="800px" height="400px" viewBox="0 0 368 207" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="14" width="388" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="301" y="14" width="88" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="14" width="88" height="179" fill="transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="14" width="388" height="21.1278" fill="#transparent" stroke="#FFF" stroke-width="2"/>
            <rect x="1" y="171.872" width="388" height="21.1278" fill="#transparent" stroke="#FFF" stroke-width="2"/>
            <path d="M90 103.5L300 103.5" stroke="#FFF" stroke-width="2"/>
            <path d="M195 13L195 194" stroke="#transparent"/>
            <path d="M195 4V202" stroke="#transparent" stroke-width="4"/>
            <path d="M381 103.5H390" stroke="#transparent" stroke-width="2"/>
            <path d="M0 103.5H9" stroke="#transparent" stroke-width="2"/>
            <circle cx="195" cy="3" r="3" fill="#transparent"/>
            <circle cx="195" cy="204" r="3" fill="#transparent"/>
          </svg>


 
        
  
        </div>
      </div>

    );
  }
}
