import { Component, Prop } from '@stencil/core';
import { statistic } from './interfaces';


@Component({
  tag: 'pbp-progress',
  styleUrl: 'progress.css'
})
export class Progress {
  @Prop() data: statistic

  calcFillWidth = (homeValue, awayValue) => {
    const total = homeValue + awayValue;
    console.log(total);
    
    const percentage = homeValue >= awayValue ? (homeValue/total)*100 : (awayValue/total)*100;
    return percentage;
  }

  render() {
    const { homeValue, awayValue, label } = this.data;
    return (
      <div class="progress">
        <p>{label}</p>
        <div class="row">
          <p>{homeValue}</p>
          <span class="line">
            <span class={`filler ${homeValue > awayValue ? 'home' : 'away'}`} style={{ width: `${this.calcFillWidth(homeValue, awayValue)}%` }} />
          </span>
          <p>{awayValue}</p>
        </div>

      </div>

    );
  }
}
