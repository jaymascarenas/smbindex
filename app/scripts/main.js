/*global $:false, jQuery:false, c3:false, Datamap:false, Clipboard:false, Gauge:false, countUp:false, console:false */

/**** Globals ****/

/* countup.js options */
var CountOptions = {
  useEasing: false,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: ''
};
var width = $('.gauge_wrapper').width();
var left;

/**** Gauge Function ****/

function draw(index_no) {
  'use strict';

  var height = width * 0.82;
  var gaugeWidth = width * 0.92;

  var c = document.getElementById('gauge'), l = 0.26, a = 0.4;
  c.width = gaugeWidth;
  c.height = height;
  if (width >= 1024) {
    c.width = gaugeWidth;
    c.height = height;
    l = 0.26;
    a = 0.4;
  }
  if (width <= 1023 && width >= 1000) {
    c.width = gaugeWidth;
    c.height = height;
    a = 0.39;
    l = 0.26;
  }
  if (width <= 999 && width >= 880) {
    c.width = gaugeWidth;
    c.height = height;
    a = 0.40;
    l = 0.25;
  }
  if (width <= 879 && width >= 768) {
    c.width = gaugeWidth;
    c.height = height;
    a = 0.39;
    l = 0.26;
  }
  if (width <= 768 && width >= 680) {
    c.width = gaugeWidth + 20;
    c.height = height + 20;
    a = 0.39;
    l = 0.26;
  }
  if (width <= 679 && width >= 571) {
    c.width = gaugeWidth + 20;
    c.height = height + 20;
    a = 0.37;
    l = 0.26;
  }
  if (width <= 570) {
    c.style.display = "none";
  }
  var opts = {
    angle: a, // The span of the gauge arc
    lineWidth: 0.00001, // The line thickness
    radiusScale: 2, // Relative radius
    pointer: {
      iconPath: '/images/tip.png',  // Icon image source
      length: l, // // Relative to gauge radius
      strokeWidth: 0.0001 // The thickness
    },
    strokeColor: '#E0E0E0',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support

  };
  var target = document.getElementById('gauge'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create gauge!
  gauge.minValue = 40; // set min gauge value
  gauge.maxValue = 60; // set max gauge value
  gauge.animationSpeed = 22; // set animation speed (32 is default value)
  gauge.set(index_no); // set actual value
}

function redraw() {
  'use strict';
  var timeoutHandle = null;
  var summaryValue = $('#gaugeValue').text();

  document.getElementById('gauge').getContext('2d').save();
  document.getElementById('gauge').getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
  document.getElementById('gauge').getContext('2d').clearRect(0, 0, document.getElementById('gauge').getContext('2d').canvas.width, document.getElementById('gauge').getContext('2d').canvas.height);
  document.getElementById('gauge').getContext('2d').restore();

  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(draw(summaryValue), 250);
    left.reset();
  }
}


jQuery(document).ready(function ($) {
  'use strict';

  function doOnOrientationChange() {

    switch (window.orientation) {
      case -90:
      case 90:
        // landscape
        redraw();
        break;
      default:
        // portrait
        redraw();
        break;
    }
  }

  window.addEventListener('orientationchange', doOnOrientationChange);
});

/**** View Chart anchor on Hover from Index Summary ****/
$(function () {
  'use strict';
  $('.left_border_inner', this).hover(
    function () {
      $(this).find('.double_arrow').fadeOut('fast');
    }, function () {
      $(this).find('.double_arrow').fadeIn('fast');
    }
  );
});


/**** Clipboard Link Shares ****/
$(function () {
  'use strict';
  var url = window.location.href;
  $('#clipboardSalesGrowth, #clipboardTransGrowth, #clipboardAvgTicketGrowth, #clipboardCustomerAcq, #clipboardSpendPerCard').prepend(url);
  // instantiates the tooltip
  $('.share_link').tooltip({
    trigger: 'click',
    placement: 'bottom'
  });

  function setTooltip(btn, message) {
    $(btn).tooltip('hide')
      .attr('data-original-title', message)
      .tooltip('show');
  }

  function hideTooltip(btn) {
    setTimeout(function () {
      $(btn).tooltip('hide');
    }, 1000);
  }

  // creates the Clipboard constructor
  var clipboard = new Clipboard('.share_link');

  // provides the success copy or error failure
  clipboard.on('success', function (e) {
    setTooltip(e.trigger, 'Copied.');
    hideTooltip(e.trigger);
  });

  clipboard.on('error', function (e) {
    setTooltip(e.trigger, 'Failed.');
    hideTooltip(e.trigger);
  });
});


/***** Colors *****/
var allColors = ['#fb4f14', '#78be20', '#a2ad00', '#72cdf4', '#004165'];
var linecol = ['#fb4f14', '#78be20', '#a2ad00', '#72cdf4', '#004165'];

/**************************  X Axis Chart Rotation on Window.resize ***********************/


if (width >= 1024) {
  var barRotate = {
    show: false,
    type: 'category',
    tick: {
      rotate: 0,
      multiline: true
    },
    centered: true,
    height: 25
  };
  var lineRotate = {
    type: 'category',
    tick: {
      rotate: 45,
      multiline: false,
      xFormat: '%Y-%m-%d %H:%M:%S'
    },
    centered: true,
    height: 30
  };
}
if (width <= 1023 && width >= 631) {
  barRotate = {
    show: false,
    type: 'category',
    tick: {
      rotate: 0,
      multiline: true
    },
    centered: true,
    height: 120
  };
  lineRotate = {
    type: 'category',
    tick: {
      rotate: 35,
      multiline: false,
      xFormat: '%Y-%m-%d %H:%M:%S'
    },
    centered: true,
    height: 60
  };
}
if (width <= 630 && width >= 480) {
  barRotate = {
    show: false,
    type: 'category',
    tick: {
      rotate: 45,
      multiline: true
    },
    centered: true,
    height: 90
  };
  lineRotate = {
    type: 'category',
    tick: {
      rotate: 45,
      multiline: false,
      xFormat: '%Y-%m-%d %H:%M:%S'
    },
    centered: true,
    height: 50
  };
}
if (width <= 479) {
  barRotate = {
    show: false,
    type: 'category',
    tick: {
      rotate: 90,
      multiline: true
    },
    centered: true,
    height: 20
  };
  lineRotate = {
    type: 'category',
    tick: {
      rotate: 90,
      multiline: false,
      xFormat: '%Y-%m-%d %H:%M:%S'
    },
    centered: true,
    height: 0
  };
}

/**** custom state names - currently blank ****/
var USdata = {
  'AK': ' ',
  'AL': ' ',
  'AR': ' ',
  'AZ': ' ',
  'CA': ' ',
  'CO': ' ',
  'CT': ' ',
  'DC': ' ',
  'DE': ' ',
  'FL': ' ',
  'GA': ' ',
  'HI': ' ',
  'IA': ' ',
  'ID': ' ',
  'IL': ' ',
  'IN': ' ',
  'KS': ' ',
  'KY': ' ',
  'LA': ' ',
  'MA': ' ',
  'MD': ' ',
  'ME': ' ',
  'MI': ' ',
  'MN': ' ',
  'MO': ' ',
  'MS': ' ',
  'MT': ' ',
  'NC': ' ',
  'ND': ' ',
  'NE': ' ',
  'NH': ' ',
  'NJ': ' ',
  'NM': ' ',
  'NV': ' ',
  'NY': ' ',
  'OH': ' ',
  'OK': ' ',
  'OR': ' ',
  'PA': ' ',
  'RI': ' ',
  'SC': ' ',
  'SD': ' ',
  'TN': ' ',
  'TX': ' ',
  'UT': ' ',
  'VA': ' ',
  'VT': ' ',
  'WA': ' ',
  'WI': ' ',
  'WV': ' ',
  'WY': ' '
};


/**** Spark Line Chart Functions ****/
function sparkLineFunction(overallBounds, salesOverall, transactionsOverall, avgTicketOverall, spendPerCardOverall) {
  'use strict';

  var overallMax, overallMin;
  // gets multidimensional array values
  Object.keys(overallBounds).forEach(function (key) {
    overallMax = overallBounds[key].max;
    overallMin = overallBounds[key].min;
  });
  var salesOverallChart = c3.generate({
    bindto: '#salesOverall',
    padding: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    size: {
      height: 80,
      width: 90
    },
    data: {
      x: 'x',
      json: salesOverall,
      mimeType: 'json',
      labels: false,
      type: 'bar'
    },
    bar: {
      width: 4
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: false,
        tick: {
          format: function (d) {
            return d + '%';
          }
        },
        max: overallMax,
        min: overallMin
      },
      x: {
        show: false,
        type: 'category'
      }
    },
    color: {
      pattern: ['#ffffff']
    },
    tooltip: {
      position: function (data, width, height, element) {
        return {top: 0, left: 100};
      }
    }
  });

  var transactionsOverallChart = c3.generate({
    bindto: '#transactionsOverall',
    padding: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    size: {
      height: 80,
      width: 90
    },
    data: {
      x: 'x',
      json: transactionsOverall,
      mimeType: 'json',
      labels: false,
      type: 'bar'
    },
    bar: {
      width: 4
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: false,
        tick: {
          format: function (d) {
            return d + '%';
          }
        },
        max: overallMax,
        min: overallMin
      },
      x: {
        show: false,
        type: 'category'
      }
    },
    color: {
      pattern: ['#ffffff']
    },
    tooltip: {
      position: function (data, width, height, element) {
        return {top: 0, left: 100};
      }
    }
  });

  var avgTicketOverallChart = c3.generate({
    bindto: '#avgTicketOverall',
    padding: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    size: {
      height: 80,
      width: 90
    },
    data: {
      x: 'x',
      json: avgTicketOverall,
      mimeType: 'json',
      labels: false,
      type: 'bar'
    },
    bar: {
      width: 4
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: false,
        tick: {
          format: function (d) {
            return d + '%';
          }
        },
        max: overallMax,
        min: overallMin
      },
      x: {
        show: false,
        type: 'category'
      }
    },
    color: {
      pattern: ['#ffffff']
    },
    tooltip: {
      position: function (data, width, height, element) {
        return {top: 0, left: 100};
      }
    }
  });

  var spendPerCardOverallChart = c3.generate({
    bindto: '#spendPerCardOverall',
    padding: {
      top: 5,
      right: 5,
      left: 5,
      bottom: 5
    },
    size: {
      height: 80,
      width: 90
    },
    data: {
      x: 'x',
      json: spendPerCardOverall,
      mimeType: 'json',
      labels: false,
      type: 'bar'
    },
    bar: {
      width: 4
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: false,
        tick: {
          format: function (d) {
            return d + '%';
          }
        },
        max: overallMax,
        min: overallMin
      },
      x: {
        show: false,
        type: 'category'
      }
    },
    color: {
      pattern: ['#ffffff']
    },
    tooltip: {
      position: function (data, width, height, element) {
        return {top: 0, left: 100};
      }
    }
  });
}

function performanceData(obj) {
  /**************************  Dynamic Performance Data **************************/
  'use strict';
  var index_no = JSON.stringify(obj.index),
    indexYoy = JSON.stringify(obj.indexYoy),
    sales = JSON.stringify(obj.sales),
    transactions = JSON.stringify(obj.transactions),
    ticketSize = JSON.stringify(obj.ticketSize),
    spendPerCard = JSON.stringify(obj.spendPerCard);


  if (width >= 570) {
    var left = new CountUp('gaugeValue', 0, index_no, 1, 2.2, CountOptions);
    if (!left.error) {
      left.start();
    } else {
      console.error(left.error);
    }
   } else {
     $('#gaugeValue').html(index_no);
   }

  draw(index_no);
  if (indexYoy > 0) {
    $('.yoy_value').html('+' + indexYoy + '%');
  } else {
    $('.yoy_value').html(indexYoy + '%');
  }

  if (sales > 0) {
    $('.perf_sales').html('+' + sales + '%');
  } else {
    $('.perf_sales').html(sales + '%');
  }

  if (transactions > 0) {
    $('.perf_transactions').html('+' + transactions + '%');
  } else {
    $('.perf_transactions').html(transactions + '%');
  }

  if (ticketSize > 0) {
    $('.perf_ticket').html('+' + ticketSize + '%');
  } else {
    $('.perf_ticket').html(ticketSize + '%');
  }

  if (spendPerCard > 0) {
    $('.perf_spend').html('+' + spendPerCard + '%');
  } else {
    $('.perf_spend').html(spendPerCard + '%');
  }
  //$('#perform_index .index_wrap, #perform_index .perform_wells_wrap').removeClass('div_fade');
}


function salesGrowthFunction(salesGrowth) {
  'use strict';
  // sales growth chart

  var salesGrowthChart = c3.generate({
    bindto: '#salesChart',
    padding: {
      top: 20,
      right: 40,
      left: 60,
      bottom: 20
    },
    data: {
      x: 'x',
      json: salesGrowth,
      mimeType: 'json',
      labels: false
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return d + '%';
          }
        }
      },
      x: lineRotate,
      height: 200
    },
    color: {
      pattern: linecol
    },
    tooltip: {
      format: {
        value: function (v) {
          return v + '%';
        }
      }
    }
  });
}

function transactionGrowthFunction(transactionGrowth) {
  'use strict';
  /**************************  Growth by Sector Charts **************************/

  var transactionGrowthChart = c3.generate({
    bindto: '#transactionChart',
    padding: {
      top: 20,
      right: 40,
      left: 60,
      bottom: 20
    },
    data: {
      x: 'x',
      json: transactionGrowth,
      mimeType: 'json',
      labels: false
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return d + '%';
          }
        }
      },
      x: lineRotate,
      height: 200
    },
    color: {
      pattern: linecol
    },
    tooltip: {
      format: {
        value: function (v) {
          return v + '%';
        }
      }
    }
  });
}

function avgTicketGrowthFunction(avgTicketGrowth) {
  'use strict';
  /**************************  Growth by Sector Charts **************************/

  var avgTicketGrowthChart = c3.generate({
    bindto: '#avgTicketChart',
    padding: {
      top: 20,
      right: 40,
      left: 60,
      bottom: 20
    },
    data: {
      x: 'x',
      json: avgTicketGrowth,
      mimeType: 'json',
      labels: false
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return d + '%';
          }
        }
      },
      x: lineRotate,
      height: 200
    },
    color: {
      pattern: linecol
    },
    tooltip: {
      format: {
        value: function (v) {
          return v + '%';
        }
      }
    }
  });
}

function avgTicketAmountFunction(avgTicketAmountBounds, avgTicketAmountClothing, avgTicketAmountFood, avgTicketAmountGeneral, avgTicketAmountHealth, avgTicketAmountLeisure) {
  'use strict';
  // sales growth chart
  var keyNames = Object.keys(avgTicketAmountBounds),
    clothing = avgTicketAmountBounds[keyNames[0]],
    food = avgTicketAmountBounds[keyNames[1]],
    general = avgTicketAmountBounds[keyNames[2]],
    health = avgTicketAmountBounds[keyNames[3]],
    leisure = avgTicketAmountBounds[keyNames[4]];

  $('.amount_clothing').html(keyNames[0]);
  $('.amount_food').html(keyNames[1]);
  $('.amount_general').html(keyNames[2]);
  $('.amount_health').html(keyNames[3]);
  $('.amount_leisure').html(keyNames[4]);


  var avgTicketAmountClothingChart = c3.generate({
    bindto: '#avgTicketAmountClothing',
    data: {
      x: 'x',
      json: avgTicketAmountClothing,
      mimeType: 'json',
      labels: false
    },
    padding: {
      top: 20,
      right: 20,
      left: 80,
      bottom: 10
    },
    size: {
      height: 150
    },
    legend: {
      hide: true
    },
    grid: {
      x: {
        show: true
      }
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return '$' + d;
          },
          values: [clothing.min, clothing.max]
        },
        max: clothing.max,
        min: clothing.min
      },
      x: {
        show: false,
        type: 'category',
        centered: true,
        height: 30
      }
    },
    color: {
      pattern: [linecol[0]]
    },
    tooltip: {
      format: {
        value: function (v) {
          return '$' + v.toFixed(2);
        }
      }
    }
  });

  var avgTicketAmountFoodChart = c3.generate({
    bindto: '#avgTicketAmountFood',
    data: {
      x: 'x',
      json: avgTicketAmountFood,
      mimeType: 'json',
      labels: false
    },
    padding: {
      top: 20,
      right: 20,
      left: 80,
      bottom: 10
    },
    size: {
      height: 150
    },
    legend: {
      hide: true
    },
    grid: {
      x: {
        show: true
      }
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return '$' + d;
          },
          values: [food.min, food.max]
        },
        max: food.max,
        min: food.min

      },
      x: {
        show: false,
        type: 'category',
        centered: true,
        height: 30
      }
    },
    color: {
      pattern: [linecol[1]]
    },
    tooltip: {
      format: {
        value: function (v) {
          return '$' + v.toFixed(2);
        }
      }
    }
  });

  var avgTicketAmountGeneralChart = c3.generate({
    bindto: '#avgTicketAmountGeneral',
    data: {
      x: 'x',
      json: avgTicketAmountGeneral,
      mimeType: 'json',
      labels: false
    },
    padding: {
      top: 20,
      right: 20,
      left: 80,
      bottom: 10
    },
    size: {
      height: 150
    },
    legend: {
      hide: true
    },
    grid: {
      x: {
        show: true
      }
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return '$' + d;
          },
          values: [general.min, general.max]
        },
        max: general.max,
        min: general.min

      },
      x: {
        show: false,
        type: 'category',
        centered: true,
        height: 30
      }
    },
    color: {
      pattern: [linecol[2]]
    },
    tooltip: {
      format: {
        value: function (v) {
          return '$' + v.toFixed(2);
        }
      }
    }
  });

  var avgTicketAmountHealthChart = c3.generate({
    bindto: '#avgTicketAmountHealth',
    data: {
      x: 'x',
      json: avgTicketAmountHealth,
      mimeType: 'json',
      labels: false
    },
    padding: {
      top: 20,
      right: 20,
      left: 80,
      bottom: 10
    },
    size: {
      height: 150
    },
    legend: {
      hide: true
    },
    grid: {
      x: {
        show: true
      }
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return '$' + d;
          },
          values: [health.min, health.max]
        },
        max: health.max,
        min: health.min
      },
      x: {
        show: false,
        type: 'category',
        centered: true,
        height: 30
      }
    },
    color: {
      pattern: [linecol[3]]
    },
    tooltip: {
      format: {
        value: function (v) {
          return '$' + v.toFixed(2);
        }
      }
    }
  });

  var avgTicketAmountLeisureChart = c3.generate({
    bindto: '#avgTicketAmountLeisure',
    data: {
      x: 'x',
      json: avgTicketAmountLeisure,
      mimeType: 'json',
      labels: false
    },
    padding: {
      top: 20,
      right: 20,
      left: 80,
      bottom: 10
    },
    size: {
      height: 150
    },
    legend: {
      hide: true
    },
    grid: {
      x: {
        show: true
      }
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return '$' + d;
          },
          values: [leisure.min, leisure.max]
        },
        max: leisure.max,
        min: leisure.min
      },
      x: {
        type: 'category',
        tick: {
          rotate: 0,
          multiline: false,
          xFormat: '%Y-%m-%d %H:%M:%S',
          culling: {
            max: 6
          }
        },
        centered: true,
        height: 30
      }
    },
    color: {
      pattern: [linecol[4]]
    },
    tooltip: {
      format: {
        value: function (v) {
          return '$' + v.toFixed(2);
        }
      }
    }
  });

}

/*function acquisition(custAcquisition) {
  /!**************************  Customer Acquisition **************************!/
  'use strict';
  var barChart = c3.generate({
    bindto: '#customerAcqChart',
    padding: {
      top: 20,
      right: 40,
      left: 40,
      bottom: 20
    },
    data: {
      x: 'x',
      json: custAcquisition,
      mimeType: 'json',
      type: 'bar',
      labels: {
        format: function (v) {
          return v + '%';
        }
      },
      color: function (color, d) {
        return allColors[d.index];
      }
    },
    legend: {
      show: false
    },
    transition: {
      duration: 1500
    },
    bar: {
      width: {
        ratio: 0.5
      }
    },
    grid: {
      y: {
        lines: [{
          value: 0
        }]
      }
    },
    axis: {
      y: {
        show: false
      },
      x: barRotate
    },
    tooltip: {
      show: false
    }
  });
}*/

function spendPerCardFunction(spendPerCard) {
  'use strict';
  var lineChart = c3.generate({
    bindto: '#spendPerCardChart',
    padding: {
      top: 20,
      right: 20,
      left: 70,
      bottom: 20
    },
    data: {
      x: 'x',
      json: spendPerCard,
      mimeType: 'json',
      labels: false
    },
    legend: {
      hide: true
    },
    axis: {
      y: {
        show: true,
        tick: {
          format: function (d) {
            return d + '%';
          }
        }
      },
      x: lineRotate,
      height: 200
    },
    color: {
      pattern: linecol
    },
    tooltip: {
      format: {
        value: function (v) {
          return v + '%';
        }
      }
    }
  });
}


/**** sales growth map ****/
var salesGrowthMap = new Datamap({
  scope: 'usa',
  element: document.getElementById('salesMap'),
  dataType: 'json',
  responsive: true,
  geographyConfig: {
    borderWidth: 0,
    popupTemplate: function (geography, data) {
      'use strict';
      return '<div class="hover_info"><table><tbody><tr><th colspan="2">' + data.region + '</th></tr><tr><td>' + data.growth + '%</td></tr></tbody></table></div>';
    },
    highlightOnHover: false
  },
  fills: {
    '>10%': '#004165',
    '10%': '#2B617F',
    '8%': '#558098',
    '6%': '#80A0B2',
    '4%': '#AAC0CC',
    '2%': '#D4DFE5',
    '-2%': '#FEC4B1',
    '-4%': '#FDA78A',
    '-6%': '#FC8A62',
    '-8%': '#FC6C3B',
    '-10%': '#FB4F14',
    '<-10%': '#C93F10',
    defaultFill: '#004165'
  }
});

// shows state labels
salesGrowthMap.labels({
  'customLabelText': USdata
});

// shows map legend
//salesGrowthMap.legend();

/**** transaction growth map ****/
var transactionGrowthMap = new Datamap({
  scope: 'usa',
  element: document.getElementById('transactionMap'),
  dataType: 'json',
  responsive: true,
  geographyConfig: {
    borderWidth: 0,
    popupTemplate: function (geography, data) {
      'use strict';
      return '<div class="hover_info"><table><tbody><tr><th colspan="2">' + data.region + '</th></tr><tr><td>' + data.growth + '%</td></tr></tbody></table></div>';
    },
    highlightOnHover: false
  },
  fills: {
    '>10%': '#004165',
    '10%': '#2B617F',
    '8%': '#558098',
    '6%': '#80A0B2',
    '4%': '#AAC0CC',
    '2%': '#D4DFE5',
    '-2%': '#FEC4B1',
    '-4%': '#FDA78A',
    '-6%': '#FC8A62',
    '-8%': '#FC6C3B',
    '-10%': '#FB4F14',
    '<-10%': '#C93F10',
    defaultFill: '#004165'
  }
});

// shows state labels
transactionGrowthMap.labels({
  'customLabelText': USdata
});

// shows map legend
//transactionGrowthMap.legend();

/**** average ticket growth map ****/
var avgTicketGrowthMap = new Datamap({
  scope: 'usa',
  element: document.getElementById('avgTicketMap'),
  dataType: 'json',
  responsive: true,
  geographyConfig: {
    borderWidth: 0,
    popupTemplate: function (geography, data) {
      'use strict';
      return '<div class="hover_info"><table><tbody><tr><th colspan="2">' + data.region + '</th></tr><tr><td>' + data.growth + '%</td></tr></tbody></table></div>';
    },
    highlightOnHover: false
  },
  fills: {
    '>10%': '#004165',
    '10%': '#2B617F',
    '8%': '#558098',
    '6%': '#80A0B2',
    '4%': '#AAC0CC',
    '2%': '#D4DFE5',
    '-2%': '#FEC4B1',
    '-4%': '#FDA78A',
    '-6%': '#FC8A62',
    '-8%': '#FC6C3B',
    '-10%': '#FB4F14',
    '<-10%': '#C93F10',
    defaultFill: '#004165'
  }
});

// shows state labels
avgTicketGrowthMap.labels({
  'customLabelText': USdata
});

// shows map legend
//avgTicketGrowthMap.legend();


/****  resizes map on window resize ****/
$(window).on('resize', function () {
  'use strict';
  salesGrowthMap.resize();
  transactionGrowthMap.resize();
  avgTicketGrowthMap.resize();
});


/**** Initial Load based on current Month/Year data ****/
$(document).ready(function () {
  'use strict';
  var overallBounds, salesOverall, transactionsOverall, avgTicketOverall, spendPerCardOverall, pageCopy,
    performanceIndex,
    custAcquisition, spendPerCard, salesGrowth, transactionGrowth, avgTicketGrowth, currentMonthData,
    avgTicketAmountBounds, avgTicketAmountClothing, avgTicketAmountFood, avgTicketAmountGeneral,
    avgTicketAmountHealth, avgTicketAmountLeisure;

  function currentData() {
    $.ajax({
      url: '../scripts/json/currentData.json',
      async: false,
      dataType: 'json',
      success: function (data) {

        // chart data
        pageCopy = data.pageCopy;
        overallBounds = data.overallBounds;
        salesOverall = data.salesOverall;
        transactionsOverall = data.transactionsOverall;
        avgTicketOverall = data.avgTicketOverall;
        spendPerCardOverall = data.spendPerCardOverall;
        performanceIndex = data.performanceIndex;
        salesGrowth = data.salesByIndustry;
        transactionGrowth = data.transactionsByIndustry;
        avgTicketGrowth = data.avgTicketByIndustry;
        avgTicketAmountBounds = data.avgTicketAmountBounds;
        avgTicketAmountClothing = data.avgTicketAmountClothing;
        avgTicketAmountFood = data.avgTicketAmountFood;
        avgTicketAmountGeneral = data.avgTicketAmountGeneral;
        avgTicketAmountHealth = data.avgTicketAmountHealth;
        avgTicketAmountLeisure = data.avgTicketAmountLeisure;


        //custAcquisition = data.customerAcquisition;
        spendPerCard = data.spendPerCardByIndustry;
        currentMonthData = data.currentMonth;

        $('.calendar_button').html(currentMonthData.month + " " + currentMonthData.year);
        $('.my1').html(currentMonthData.month);
        $('.my2').html(currentMonthData.year);
        // update legends

        var salesGrowthLegColor = '#salesGrowth li.leg_color';
        $(salesGrowthLegColor + 1).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(salesGrowth)[1] + '</li>');
        $(salesGrowthLegColor + 2).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(salesGrowth)[2] + '</li>');
        $(salesGrowthLegColor + 3).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(salesGrowth)[3] + '</li>');
        $(salesGrowthLegColor + 4).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(salesGrowth)[4] + '</li>');
        $(salesGrowthLegColor + 5).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(salesGrowth)[5] + '</li>');

        var transactionGrowthLegColor = '#transactionGrowth li.leg_color';
        $(transactionGrowthLegColor + 1).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(transactionGrowth)[1] + '</li>');
        $(transactionGrowthLegColor + 2).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(transactionGrowth)[2] + '</li>');
        $(transactionGrowthLegColor + 3).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(transactionGrowth)[3] + '</li>');
        $(transactionGrowthLegColor + 4).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(transactionGrowth)[4] + '</li>');
        $(transactionGrowthLegColor + 5).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(transactionGrowth)[5] + '</li>');

        var avgTicketGrowthLegColor = '#averageTicketGrowth li.leg_color';
        $(avgTicketGrowthLegColor + 1).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(avgTicketGrowth)[1] + '</li>');
        $(avgTicketGrowthLegColor + 2).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(avgTicketGrowth)[2] + '</li>');
        $(avgTicketGrowthLegColor + 3).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(avgTicketGrowth)[3] + '</li>');
        $(avgTicketGrowthLegColor + 4).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(avgTicketGrowth)[4] + '</li>');
        $(avgTicketGrowthLegColor + 5).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(avgTicketGrowth)[5] + '</li>');

        var spendLegColor = '#spendPerCard li.leg_color';
        $(spendLegColor + 1).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[1] + '</li>');
        $(spendLegColor + 2).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[2] + '</li>');
        $(spendLegColor + 3).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[3] + '</li>');
        $(spendLegColor + 4).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[4] + '</li>');
        $(spendLegColor + 5).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[5] + '</li>');

        // copy
        $('.msm_summary h4').html(pageCopy.msmSummary);
        $('.intro_heading').html(pageCopy.introHeading);
        $('.intro_copy').html(pageCopy.introCopy);


        // chart functions
        sparkLineFunction(overallBounds, salesOverall, transactionsOverall, avgTicketOverall, spendPerCardOverall);
        performanceData(performanceIndex);
        salesGrowthFunction(salesGrowth);
        transactionGrowthFunction(transactionGrowth);
        avgTicketGrowthFunction(avgTicketGrowth);
        avgTicketAmountFunction(avgTicketAmountBounds, avgTicketAmountClothing, avgTicketAmountFood, avgTicketAmountGeneral,
          avgTicketAmountHealth, avgTicketAmountLeisure);
        //acquisition(custAcquisition);
        spendPerCardFunction(spendPerCard);

        // map functions
        salesGrowthMap.updateChoropleth(data.salesMap);
        transactionGrowthMap.updateChoropleth(data.transactionsMap);
        avgTicketGrowthMap.updateChoropleth(data.avgTicketMap);

        $('header').removeClass('loading');

      },
      error: function (req, status, err) {
        $('header').removeClass('loading');
        $('#errorModal').modal();
        console.log('This file is missing', status, err);
      }
    });
  }

  currentData();

  $('.monthPicker').MonthPicker({
    MonthFormat: 'MM, yy',
    MinMonth: new Date('2016-02-01'),
    MaxMonth: -1,
    AltField: '#monthPicker',
    OnAfterChooseMonth: function () {
      var selectedMonth = $('#monthPicker').val(),
        splitMonthYear = selectedMonth.split(', '),
        selectMonth = splitMonthYear[0].toLowerCase(),
        selectedYear = splitMonthYear[1];
      $.ajax({
        url: '../scripts/json/' + selectMonth + selectedYear + '.json',
        async: false,
        dataType: 'json',
        success: function (data) {
          $('.calendar_button').html(selectedMonth.replace(',', ''));
          $('.my1').html(splitMonthYear[0]);
          $('.my2').html(selectedYear);

          pageCopy = data.pageCopy;
          overallBounds = data.overallBounds;
          salesOverall = data.salesOverall;
          transactionsOverall = data.transactionsOverall;
          avgTicketOverall = data.avgTicketOverall;
          spendPerCardOverall = data.spendPerCardOverall;
          performanceIndex = data.performanceIndex;
          //custAcquisition = data.customerAcquisition;
          spendPerCard = data.spendPerCardByIndustry;
          salesGrowth = data.salesByIndustry;
          transactionGrowth = data.transactionsByIndustry;
          avgTicketGrowth = data.avgTicketByIndustry;
          avgTicketAmountBounds = data.avgTicketAmountBounds;
          avgTicketAmountClothing = data.avgTicketAmountClothing;
          avgTicketAmountFood = data.avgTicketAmountFood;
          avgTicketAmountGeneral = data.avgTicketAmountGeneral;
          avgTicketAmountHealth = data.avgTicketAmountHealth;
          avgTicketAmountLeisure = data.avgTicketAmountLeisure;

          // update legends
          $.each(salesGrowth.x, function (key, value) {
            var salesNum = key + 1;
            $('#salesGrowth .leg_color' + salesNum).html('<i class="fa fa-circle" aria-hidden="true"></i>' + value + '</li>');
          });

          $.each(transactionGrowth.x, function (key, value) {
            var transNum = key + 1;
            $('#transactionGrowth .leg_color' + transNum).html('<i class="fa fa-circle" aria-hidden="true"></i>' + value + '</li>');
          });

          $.each(avgTicketGrowth.x, function (key, value) {
            var avgNum = key + 1;
            $('#averageTicketGrowth .leg_color' + avgNum).html('<i class="fa fa-circle" aria-hidden="true"></i>' + value + '</li>');
          });
          /*          $.each(custAcquisition.x, function (key, value) {
                      var custNum = key + 1;
                      $('#customerAcquisition .leg_color' + custNum).html('<i class="fa fa-circle" aria-hidden="true"></i>' + value + '</li>');
                    });*/

          var spendLegColor = '#spendPerCard li.leg_color';
          $(spendLegColor + 1).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[1] + '</li>');
          $(spendLegColor + 2).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[2] + '</li>');
          $(spendLegColor + 3).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[3] + '</li>');
          $(spendLegColor + 4).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[4] + '</li>');
          $(spendLegColor + 5).html('<i class="fa fa-circle" aria-hidden="true"></i>' + Object.keys(spendPerCard)[5] + '</li>');

          // copy
          $('.msm_summary h4').html(pageCopy.msmSummary);
          $('.intro_heading').html(pageCopy.introHeading);
          $('.intro_copy').html(pageCopy.introCopy);


          sparkLineFunction(overallBounds, salesOverall, transactionsOverall, avgTicketOverall, spendPerCardOverall);
          performanceData(performanceIndex);
          salesGrowthFunction(salesGrowth);
          transactionGrowthFunction(transactionGrowth);
          avgTicketGrowthFunction(avgTicketGrowth);
          avgTicketAmountFunction(avgTicketAmountBounds, avgTicketAmountClothing, avgTicketAmountFood, avgTicketAmountGeneral,
            avgTicketAmountHealth, avgTicketAmountLeisure);
          //acquisition(custAcquisition);
          spendPerCardFunction(spendPerCard);

          // map functions
          salesGrowthMap.updateChoropleth(data.salesMap);
          transactionGrowthMap.updateChoropleth(data.transactionsMap);
          avgTicketGrowthMap.updateChoropleth(data.avgTicketMap);

        },
        error: function (req, status, err) {
          $('#noDataModal').modal();
          setTimeout(function () {
            $('#noDataModal').modal('hide');
            currentData();
          }, 2000);
          console.log('This file is missing', status, err);
        }
      });
      $('.monthPicker').slideUp('fast');
    },
    Button: function () {
      return;
    }
  });
});

/****  show/hide monthpicker ****/

$(function () {
  'use strict';
  $('.calendar_button, #pickShow, .select_yoy').click(function () {
    $('.monthPicker').slideToggle('fast', function () {
    });
  });
});


/**** Smooth Anchor Scrolling ****/
$(function () {
  'use strict';
  $('a[href*="#"]:not([href="#"], [href="#deviceSlider"])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 40
        }, 800);
        return false;
      }
    }
  });
});

/****  Back to top jQuery ****/

$(function () {
  'use strict';
  var offset = 250;
  var duration = 300;
  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
      $('.back_to_top').fadeIn(duration);
    } else {
      $('.back_to_top').fadeOut(duration);
    }
  });
  $('.back_to_top').click(function (event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });
});

/**** Read More Button ****/
$(function () {
  'use strict';
  $('.read_more_icon').on('click', function () {
    $('.intro_copy_wrap').slideToggle('slow');
    $('.read_more').toggleClass('rotate');
    $('.intro_rule').toggleClass('block_show');
    $('html, body').animate({scrollTop: $('#introduction').position().top}, 'slow');
  });
});


