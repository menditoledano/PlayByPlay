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
      // <div class="container">
      //   <div class="row">
      //     <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> 

      <div class="buttons ">
        <button onClick={this.onViewChange} class={this.buttonClass('bird') +'btn btn-primary '} value="bird">Birds Eye view</button>
        <button onClick={this.onViewChange} class={this.buttonClass('camera')+'btn btn-primary btn-lg'} value="camera">Camera view</button>
        <div class="d-none d-lg-block d-xl-block">
        <button onClick={this.onViewChange} class={this.buttonClass('side')+'btn btn-primary btn-lg '} value="side">Side view</button>
        </div>
      </div>
      // </div>
      
      // </div>
      // </div>
    );
  }
}
