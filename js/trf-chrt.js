// Traffic Charts Variables

const trfChart = document.getElementById('trfChart').getContext('2d');
const dlyChart = document.getElementById('dlyChart').getContext('2d');
const mblUser = document.getElementById('mblUser').getContext('2d');
const filter = document.querySelector('.chrt-fltr');

// Traffic chart dataset objects
const hourly = { labels: ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
                   data: [750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250, 750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250]
               }
const daily = { labels: [ 'S','M','T','W','T','F','S'],
                  data: [ 300, 350, 500, 600, 750, 900, 850]
              }
const weekly = { labels: [ '30-5','6-12','13-19','20-26','27-3','4-10','11-17','18-24','25-31'],
                   data: [ 750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250]
               }
const monthly = { labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                    data: [600, 250, 300, 650, 400, 500, 700, 300, 350, 500, 600, 750]
                }

// Define filter/switch for "chart" navigation
filter.addEventListener('click', function (e) {
  let target = e.target;
  let li = document.getElementsByClassName('tab-fltr');

  for( let i = 0; i < li.length; i++) {
  li[i].classList.remove('selected');
  }
  target.classList.add('selected');
  switch(target.id) {
    case 'hourly': chartChange(hourly.data, hourly.labels);
          break;
    case 'daily': chartChange(daily.data, daily.labels);
          break;
    case 'monthly': chartChange(monthly.data, monthly.labels);
          break;
          default: chartChange(weekly.data, weekly.labels);
          break;
  }
});

// Define function for updating traffic chart
function chartChange(data, labels) {
  let info = userChart.config.data;
  info.datasets[0].data = data;
  info.labels = labels;
  userChart.update();
}
const config = {
  type: 'line',
  data:{

    labels:weekly.labels,
    datasets:[
              {
                data: weekly.data,
                backgroundColor: "rgba(75,80,192,0.2)", // Can be Array
                borderColor: "rgba(75,72,192,1)",
                borderWidth: 1,
                pointBackgroundColor: '#fff',
                lineTension: 0,
                pointRadius: 5,
                lineCap: 'round',
              }
            ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              position: 'left',
              'id': 'y-axis-0',

              gridLines: {
                offsetGridLines: true
              }
            }],
            xAxes: [{
              gridLines: {
                offsetGridLines: true
              }
            }]
          }
        }
      };

// Bar Chart
const dailyChart = new Chart(dlyChart, {
  type: 'bar',//
  data:{

    labels:[
            'S','M','T','W','T','F','S'
           ],
    datasets:[
              {
                data:[ 75, 100, 175, 125, 225, 200, 100
                     ],
                backgroundColor: "#6760a9", // Can be Array
              }
            ]
        },
  options:{
    responsive: true,
    legend: {
      display:false
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 50,
          suggestedMax: 250,
          maxTicksLimit: 5
        }
      }]
    }
  }
});

// Traffic Chart
const userChart = new Chart(trfChart, config);

// Pie Chart

const mobileChart = new Chart(mblUser, {
  type: 'doughnut',//
  data:{

    labels:[
            'PHONES','TABLETS','DESKTOP'
           ],
    datasets:[
              {
                data:[ 15,15,70
                     ],
                backgroundColor: [
                  '#7DBE6F',
                  'rgba(65, 182, 200, 1)',
                  '#6760a9',
                ]
              }
            ]
        },
  options:{
    responsive: true,
    legend: {
      display:false,
      position: 'right',
      labels: {
        boxWidth: 15
      }
    },
  }
});
