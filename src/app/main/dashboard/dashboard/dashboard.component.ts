import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class DashboardComponent implements OnInit {

  datasets = [
    {
      label: 'Visitors',
      data: [190, 300, 340, 220, 290, 390, 250, 380, 410, 380, 320, 290],
      fill: 'start'

    },
    {
      label: 'Page views',
      data: [2200, 2900, 3900, 2500, 3800, 3200, 2900, 1900, 3000, 3400, 4100, 3800],
      fill: 'start'
    }
  ];

  labels = ['12am', '2am', '4am', '6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];

  options = {
    spanGaps: false,
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    tooltips: {
      position: 'nearest',
      mode: 'index',
      intersect: false
    },
    layout: {
      padding: {
        left: 24,
        right: 32
      }
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 2,
        hoverRadius: 4,
        hoverBorderWidth: 2
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: 'rgba(0,0,0,0.54)'
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            tickMarkLength: 16
          },
          ticks: {
            stepSize: 1000
          }
        }
      ]
    },
    plugins: {
      filler: {
        propagate: false
      }
    }
  };

  chartType = 'line';

  widget = {
    'currentRange': 'TW',
    'title': 'Task Distribution',
    'colorScheme': 'picnic',
    'ranges': {
      'TW': 'This Week',
      'LW': 'Last Week',
      '2W': '2 Weeks Ago'
    },
    'mainChart': {
      'TW': [
        {
          'name': 'Frontend',
          'value': 15
        },
        {
          'name': 'Backend',
          'value': 20
        },
        {
          'name': 'API',
          'value': 38
        },
        {
          'name': 'Issues',
          'value': 27
        }
      ],
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
