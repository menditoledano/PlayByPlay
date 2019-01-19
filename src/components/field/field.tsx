import { Component, Prop } from "@stencil/core";

@Component({
  tag: "pbp-field",
  styleUrl: "field.css"
})
export class Field {
  @Prop() view: "bird" | "camera" | "side";
  @Prop() jsonOpen: boolean;

  render() {
    return (
      <div class={`field-wrapper ${this.view} ${this.jsonOpen && "json-open"}`}>
        <div class="field">
          <div class="elements-holder">
            <slot />
          </div>
          {/* <pbp-net /> */}

          <svg  fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="14" width="388" height="179" fill="transparent" stroke="transparent" stroke-width="2"/>
            <rect x="301" y="14" width="88" height="179" fill="transparent" stroke="transparent" stroke-width="2"/>
            <rect x="1" y="14" width="88" height="179" fill="transparent" stroke="transparent" stroke-width="2"/>
            <rect x="1" y="14" width="388" height="21.1278" fill="transparent" stroke="transparent" stroke-width="2"/>
            <rect x="1" y="171.872" width="388" height="21.1278" fill="transparent" stroke="transparent" stroke-width="2"/>
            <path d="M90 103.5L300 103.5" stroke="transparent" stroke-width="2"/>
            <path d="M195 13L195 194" stroke="transparent"/>
            <path d="M195 4V202" stroke="transparent" stroke-width="4"/>
            <path d="M381 103.5H390" stroke="transparent" stroke-width="2"/>
            <path d="M0 103.5H9" stroke="transparent" stroke-width="2"/>
            <circle cx="195" cy="3" r="3" fill="transparent"/>
            <circle cx="195" cy="204" r="3" fill="transparent"/>
          </svg>
          {/* <svg xmlns="http://www.w3.org/2000/svg" class="svgField" viewBox="0 0 390 207">
            <path
              fill="transparent"
              fill-rule="evenodd"
              d="M877.593 462.273H442.286v14.532h-5.131v-14.248H1.802v-.284H.94V15.074h436.215V.543h5.131v14.531H878.456v447.199h-.863zM6.07 235.949h16.254v5.086H6.07v160.57h195.362V75.742H6.07v160.207zM437.155 20.16H6.07v50.496h431.085V20.16zm0 55.582H206.562v160.207h230.593V75.742zm0 165.293H206.562v160.57h230.593v-160.57zm0 165.656H6.07v50.78h431.085v-50.78zm5.131 50.497h431.039v-50.497H442.286v50.497zm0-55.583h230.57v-160.57h-230.57v160.57zm0-165.656h230.57V75.742h-230.57v160.207zM873.325 20.16H442.286v50.496h431.039V20.16zM677.986 75.742v325.863h195.339v-160.57h-16.253v-5.086h16.253V75.742H677.986z"
            />
          </svg> */}
        </div>
      </div>
    );
  }
}
