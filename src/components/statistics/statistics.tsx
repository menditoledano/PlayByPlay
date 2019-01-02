import { Component, State, Prop } from '@stencil/core';
import { statistic } from './interfaces';

const mockStatistics: statistic[] = [{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 55,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 11,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 55,
  awayValue: 232,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 88,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 1,
  awayValue: 32,
}]

@Component({
  tag: 'pbp-statistics',
  styleUrl: 'statistics.css'
})
export class Statistics {
  @Prop() open: boolean
  @State() statistics: statistic[]

  componentWillLoad() {
    this.statistics = mockStatistics;
  }

  render() {
    return (
      <div class={`statistics-overlay ${this.open && 'open'}`}>
        <h4 class="title">Statistics</h4>
        {this.statistics.map(statistic => statistic.type === 'progress' && <pbp-progress data={statistic} />
        )}
      </div>
    );
  }
}
