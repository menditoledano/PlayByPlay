import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-angle-control',
  styleUrl: 'angle-control.css'
})
export class AngleControl {
  @Prop() onViewChange: (e: any) => void
  @Prop() view: string
  @Prop() jsonOpen: boolean;
  

  buttonClass = (value) => {
    return this.view === value ? 'active ' : '';
  }

  render() {
    return (
      <div class={`buttons ${this.jsonOpen && 'open'}`} >
        <button onClick={this.onViewChange} class={this.buttonClass('bird') +'btn btn-primary '} value="bird">Birds Eye view</button>
        <button onClick={this.onViewChange} class={this.buttonClass('camera')+'btn btn-primary btn-lg'} value="camera">Camera view</button>
        <div class="d-none d-lg-block d-xl-block">
        <button onClick={this.onViewChange} class={this.buttonClass('side')+'btn btn-primary btn-lg '} value="side">Side view</button>
        </div>
      </div>
    );
  }
}
