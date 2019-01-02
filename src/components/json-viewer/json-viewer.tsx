import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-json-viewer',
  styleUrl: 'json-viewer.css'
})
export class JsonViewer {

  @Prop() open: boolean = true;
  @Prop() items: any[];
  @Prop() onToggle: any;

  render() {
    return (
      <div class={`json-viewer ${this.open && 'open'}`}>
        <span class={`toggler ${this.open && 'open'}`} onClick={this.onToggle}>
          <svg width="32" height="56" viewBox="0 0 32 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.69927 7.46004L31 1.29879V53.7012L7.69927 47.54C3.75051 46.4958 1 42.9235 1 38.839V16.161C1 12.0765 3.75051 8.50419 7.69927 7.46004Z" fill="white" stroke="#3F3F3F" stroke-width="2"/>
            <path class="x" fill-rule="evenodd" clip-rule="evenodd" d="M17.0064 20.0018L15.0064 20.0008L15.0033 26.0008L15.0023 28.0008L17.0023 28.0018L23.0023 28.0049L23.0033 26.0049L17.0033 26.0018L17.0064 20.0018Z" fill="#3F3F3F"/>
            <path class="x" fill-rule="evenodd" clip-rule="evenodd" d="M14.9987 34.0007L16.9987 34.0017L17.0028 26.0017L15.0028 26.0007L15.0028 26.0007L9.0028 25.9977L9.00178 27.9977L15.0018 28.0007L14.9987 34.0007Z" fill="#3F3F3F"/>
          </svg>
        </span>
        <pre>{JSON.stringify(this.items, null, 2)}</pre>
      </div>
    );
  }
}
