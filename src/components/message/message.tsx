import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-message',
  styleUrl: 'message.css'
})
export class Message {
  @Prop() message: {
    date: Date
    text: string
    type?: 'ERROR' | 'INFO'
  }
  @Prop() jsonOpen: boolean;

  renderError = () => <svg class="error-icon" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8424 10.3128C14.2911 11.0627 13.7279 12 12.8319 12H1.16799C0.270212 12 -0.290323 11.0612 0.157434 10.3128L5.98945 0.562149C6.4383 -0.188062 7.56251 -0.186703 8.01056 0.562149L13.8424 10.3128ZM7 8.29688C6.38252 8.29688 5.88195 8.77957 5.88195 9.375C5.88195 9.97043 6.38252 10.4531 7 10.4531C7.61749 10.4531 8.11806 9.97043 8.11806 9.375C8.11806 8.77957 7.61749 8.29688 7 8.29688ZM5.93851 4.42158L6.11881 7.60908C6.12724 7.75823 6.25514 7.875 6.41004 7.875H7.58997C7.74487 7.875 7.87277 7.75823 7.8812 7.60908L8.0615 4.42158C8.07062 4.26047 7.93759 4.125 7.77027 4.125H6.22971C6.06239 4.125 5.92939 4.26047 5.93851 4.42158Z" fill="white"/></svg>


  render() {
    const { message = { date: new Date() } } = this;
    const { date = new Date() } = message;
    return (
      // <div class="container">
      // <div class="row">
      //   <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> 

      <div class={`message ${this.jsonOpen && 'open'} ${this.message && this.message.type}`}>
        {this.message && <p class="message-text">
          {this.message.type === 'ERROR' && this.renderError()}
          {this.message.text}
          {this.message.type === 'ERROR' && this.renderError()}
        </p>}
        {this.message && <span class="message-date">{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}</span>}
      </div>
      // </div>
      // </div>
      // </div>
    );
  }
}
