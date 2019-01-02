import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-angle-control',
  styleUrl: 'angle-control.css'
})
export class AngleControl {
  @Prop() onViewChange: (e: any) => void
  @Prop() view: string

  buttonClass = (value) => {
    return this.view === value ? 'active' : '';
  }

  render() {
    return (
      <div class="buttons">
        {/* <button onClick={this.onViewChange} class={this.buttonClass('bird')} value="bird">Birds Eye view</button> */}
        {/* <button onClick={this.onViewChange} class={this.buttonClass('camera')} value="camera">Camera view</button> */}
        {/* <button onClick={this.onViewChange} class={this.buttonClass('side')} value="side">Side view</button> */}
      </div>
    );
  }
}
