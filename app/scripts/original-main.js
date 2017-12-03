/* jshint devel:true */

/**************************  Dynamic Performance and Growth Data **************************/

// TODO ERROR HANDLING OF MISSING JSON DATA ETC
function performanceData(obj) {
  'use strict';
  var index_no = JSON.stringify(obj.performance.index_no),
    indexYoy = JSON.stringify(obj.performance.indexYoy),
    sales = JSON.stringify(obj.performance.sales),
    transactions = JSON.stringify(obj.performance.transactions),
    ticketSize = JSON.stringify(obj.performance.ticketSize),
    spendPerCard = JSON.stringify(obj.performance.spendPerCard);

  $('.perf_index').html(index_no);
  if (indexYoy > 0) {
    $('.perf_flux').html('+' + indexYoy + '%');
  } else {
    $('.perf_flux').html(indexYoy + '%');
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
  $('#perform_index .index_wrap, #perform_index .perform_wells_wrap').removeClass('div_fade');
}

var sectorGrowthJSON;

$.ajax({
  url: '../scripts/performance.json',
  dataType: 'json',
  success: function (data) {
    'use strict';
    performanceData(data);
    sectorGrowthJSON = data;
  },
  error: function (req, status, err) {
    'use strict';
    $('#errorModal').modal();
    console.log('something went wrong', status, err);
  }
});


/**************************  X Axis Chart Rotation on Window.resize ***********************/

var width = $(window).width();
if (width >= 1024) {
  var barRotate = {
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
      rotate: 0,
      multiline: false
    },
    centered: true,
    height: 30
  };
}
if (width <= 1023 && width >= 631) {
  var barRotate = {
    type: 'category',
    tick: {
      rotate: 0,
      multiline: true
    },
    centered: true,
    height: 120
  };
  var lineRotate = {
    type: 'category',
    tick: {
      rotate: 35,
      multiline: false
    },
    centered: true,
    height: 60
  };
}
if (width <= 630 && width >= 480) {
  var barRotate = {
    type: 'category',
    tick: {
      rotate: 45,
      multiline: true
    },
    centered: true,
    height: 90
  };
  var lineRotate = {
    type: 'category',
    tick: {
      rotate: 45,
      multiline: false
    },
    centered: true,
    height: 50
  };
}
if (width <= 479) {
  var barRotate = {
    type: 'category',
    tick: {
      rotate: 90,
      multiline: true
    },
    centered: true,
    height: 20
  };
  var lineRotate = {
    type: 'category',
    tick: {
      rotate: 90,
      multiline: false
    },
    centered: true,
    height: 0
  };
}


/**************************  All Chart JSON Data *****************/

var barChartJSON, lineCharJSON, sector1JSON, sector2JSON, sector3JSON;
$.ajax({
  url: '../scripts/charts.json',
  async: false,
  dataType: 'json',
  success: function (data) {
    'use strict';
    barChartJSON = data.customerAcquisition;
    lineCharJSON = data.spendPerCardByIndustry;
    sector1JSON = data.salesbyIndustry;
    sector2JSON = data.transactionsByIndustry;
    sector3JSON = data.avgTicketByIndustry;
  },
  error: function (req, status, err) {
    'use strict';
    $('#errorModal').modal();
    console.log('something went wrong', status, err);
  }
});

/**************************  Chart Maps **************************/
var growthMap = new Datamap({
  scope: 'usa',
  element: document.getElementById('chart_map'),
  dataType: 'json',
  geographyConfig: {
    borderWidth: 0,
    popupTemplate: function (geography, data) {
      'use strict';
      return '<div class="hoverinfo">' + data.region + '<br>' + data.growth + '%';
    },
    highlightOnHover: false,
  },
  responsive: false,
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
  },
});

// custom state names - currently blank
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

// shows state labels
growthMap.labels({
  'customLabelText': USdata
});

// shows map legend
growthMap.legend();

// resizes map on window resize
$(window).on('resize', function () {
  'use strict';
  growthMap.resize();
});

$('.toggleSales').css({
  'background-color': '#00A9E0',
  'color': '#fff'
});

// initial map view
$.ajax({
  url: '../scripts/maps.json',
  dataType: 'json',
  success: function (data) {
    'use strict';
    var salesStringData = data.sales;
    growthMap.updateChoropleth(salesStringData);
  },
  error: function (req, status, err) {
    'use strict';
    $('#errorModal').modal();
    console.log('something went wrong', status, err);
  }
});

// calls json file onclick, imports new data view, and changes css.
$('.map_toggles .toggleSales').on('click', function () {
  'use strict';

  $.ajax({
    url: '../scripts/maps.json',
    dataType: 'json',
    success: function (data) {
      var salesStringData = data.sales;
      growthMap.updateChoropleth(salesStringData);
    },
    error: function (req, status, err) {
      $('#errorModal').modal();
      console.log('something went wrong', status, err);
    }
  });
  $('.toggleTransactions, .toggleAvgTicketSize').css({
    'background-color': '',
    'color': ''
  });
  $('.toggleSales').css({
    'background-color': '#00A9E0',
    'color': '#fff'
  });
});
$('.map_toggles .toggleTransactions').on('click', function () {
  'use strict';
  $.ajax({
    url: '../scripts/maps.json',
    dataType: 'json',
    success: function (data) {
      var transStringData = data.transactions;
      growthMap.updateChoropleth(transStringData);
    },
    error: function (req, status, err) {
      $('#errorModal').modal();
      console.log('something went wrong', status, err);
    }
  });
  $('.toggleSales, .toggleAvgTicketSize').css({
    'background-color': '',
    'color': ''
  });
  $('.toggleTransactions').css({
    'background-color': '#00A9E0',
    'color': '#fff'
  });
});
$('.map_toggles .toggleAvgTicketSize').on('click', function () {
  'use strict';
  $.ajax({
    url: '../scripts/maps.json',
    dataType: 'json',
    success: function (data) {
      var avgTicketStringData = data.avgTicketSize;
      growthMap.updateChoropleth(avgTicketStringData);
    },
    error: function (req, status, err) {
      $('#errorModal').modal();
      console.log('something went wrong', status, err);
    }
  });
  $('.toggleSales, .toggleTransactions').css({
    'background-color': '',
    'color': ''
  });
  $('.toggleAvgTicketSize').css({
    'background-color': '#00A9E0',
    'color': '#fff'
  });
});


/***** Colors *****/
var allColors = ['#f8b290', '#d4da99', '#c6c295', '#7fdaf8', '#7f9fb0'];

var linecol = ['#F79447', '#78BE20', '#c6c295', '#7fdaf8', '#7f9fb0'];

/**************************  Growth by Sector Charts **************************/

function sectors() {
  'use strict';

  /**************************  Growth by Sector Growth Data **************************/

  /*  function growthData(obj) {
   var sectorValueOne = obj.growth[1].percentage,
   sectorValueTwo = obj.growth[2].percentage,
   sectorValueThree = obj.growth[3].percentage,
   sectorKeyOne = obj.growth[1].type,
   sectorKeyTwo = obj.growth[2].type,
   sectorKeyThree = obj.growth[3].type;

   $('.sector_one_key').html(sectorKeyOne);
   $('.sector_two_key').html(sectorKeyTwo);
   $('.sector_three_key').html(sectorKeyThree);
   if (sectorValueOne > 0) {
   $('.sector_one_value').html('+' + sectorValueOne + '%');
   } else {
   $('.sector_one_value').html(sectorValueOne + '%');
   }
   if (sectorValueTwo > 0) {
   $('.sector_two_value').html('+' + sectorValueTwo + '%');
   } else {
   $('.sector_two_value').html(sectorValueTwo + '%');
   }
   if (sectorValueThree > 0) {
   $('.sector_three_value').html('+' + sectorValueThree + '%');
   } else {
   $('.sector_three_value').html(sectorValueThree + '%');
   }
   $('.sector_icons').removeClass('div_fade');
   }
   growthData(sectorGrowthJSON);*/

  /**************************  Growth by Sector Charts **************************/
  var sectorCharts = c3.generate({
    bindto: '#sector_charts',
    size: {
      height: 300
    },
    padding: {
      right: 40,
      left: 40,
      bottom: 80
    },
    data: {
      x: 'x',
      json: sector1JSON,
      mimeType: 'json',
      type: 'bar',
      labels: {
        format: function (v) {
          return v + '%';
        }
      },
      names: {
        data1: 'Sales'
      },
      color: function (color, d) {
        return allColors[d.index];

      },
    },
    legend: {
      show: false
    },
    transition: {
      duration: 500
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
        show: false,
        tick: {
          format: function (d) {
            return d + '%';
          }
        }
      },
      x: barRotate
    },
    tooltip: {
      show: false
    }
  });

  $('.toggleSalesSector').css({
    'background-color': '#00A9E0',
    'color': '#fff'
  });

  // calls json file onclick, imports new data view, and changes css.
  $('.sector_toggles .toggleSalesSector').on('click', function () {
    sectorCharts.unload({
      done: function () {
        sectorCharts.load({
          json: sector1JSON,
        });
      }
    });

    $('.toggleTransactionsSector, .toggleAvgTicketSizeSector').css({
      'background-color': '',
      'color': ''
    });
    $('.toggleSalesSector').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.sector_toggles .toggleTransactionsSector').on('click', function () {
    sectorCharts.unload({
      done: function () {
        sectorCharts.load({
          json: sector2JSON,
        });
      }
    });

    $('.toggleSalesSector, .toggleAvgTicketSizeSector').css({
      'background-color': '',
      'color': ''
    });
    $('.toggleTransactionsSector').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.sector_toggles .toggleAvgTicketSizeSector').on('click', function () {
    sectorCharts.unload({
      done: function () {
        sectorCharts.load({
          json: sector3JSON,
        });
      }
    });
    $('.toggleSalesSector, .toggleTransactionsSector').css({
      'background-color': '',
      'color': ''
    });
    $('.toggleAvgTicketSizeSector').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
}

/**************************  Customer Acquisition **************************/

function acquisition() {
  'use strict';
  var barChart = c3.generate({
    bindto: '#bar_chart',
    padding: {
      top: 20,
      right: 40,
      left: 40,
      bottom: 40
    },
    size: {
      height: 300
    },
    data: {
      x: 'x',
      json: barChartJSON,
      mimeType: 'json',
      type: 'bar',
      labels: {
        format: function (v) {
          return v + '%';
        }
      },
      color: function (color, d) {
        return allColors[d.index];
      },
    },
    legend: {
      show: false
    },
    transition: {
      duration: 2000
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
}

/**************************  Spend per Card **************************/

function spend() {
  'use strict';

  // dynamically add blue button values based on the json keys
  var lineKeys = Object.keys(lineCharJSON);
  var spendCat1 = lineKeys[1],
    spendCat2 = lineKeys[2],
    spendCat3 = lineKeys[3],
    spendCat4 = lineKeys[4],
    spendCat5 = lineKeys[5],
    spendCat6 = lineKeys[6];
  $('.spendCatAll').html('All');
  $('.spendCat1').html(spendCat1);
  $('.spendCat2').html(spendCat2);
  $('.spendCat3').html(spendCat3);
  $('.spendCat4').html(spendCat4);
  $('.spendCat5').html(spendCat5);
  $('.spendCat6').html(spendCat6);

  var lineChart = c3.generate({
    bindto: '#line_chart',
    padding: {
      top: 20,
      right: 40,
      left: 80,
      bottom: 10
    },
    data: {
      x: 'x',
      json: lineCharJSON,
      mimeType: 'json',
      labels: false
    },
    transition: {
      duration: 500
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
      height: 200,
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
  // initial button view
  $('.spendCatAll').css({
    'background-color': '#00A9E0',
    'color': '#fff'
  });
  $('.line_toggles .spendCatAll').on('click', function () {
    lineChart.show();
    $('.spendCat1, .spendCat2, .spendCat3, .spendCat4, .spendCat5, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCatAll').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat1').on('click', function () {
    lineChart.hide([spendCat2, spendCat3, spendCat4, spendCat5, spendCat6]);
    lineChart.show(spendCat1);
    $('.spendCatAll, .spendCat2, .spendCat3, .spendCat4, .spendCat5, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat1').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat2').on('click', function () {
    lineChart.hide([spendCat1, spendCat3, spendCat4, spendCat5, spendCat6]);
    lineChart.show(spendCat2);
    $('.spendCatAll, .spendCat1, .spendCat3, .spendCat4, .spendCat5, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat2').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat3').on('click', function () {
    lineChart.hide([spendCat1, spendCat2, spendCat4, spendCat5, spendCat6]);
    lineChart.show(spendCat3);
    $('.spendCatAll, .spendCat1, .spendCat2, .spendCat4, .spendCat5, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat3').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat4').on('click', function () {
    lineChart.hide([spendCat1, spendCat2, spendCat3, spendCat5, spendCat6]);
    lineChart.show(spendCat4);
    $('.spendCatAll, .spendCat1, .spendCat2, .spendCat3, .spendCat5, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat4').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat5').on('click', function () {
    lineChart.hide([spendCat1, spendCat2, spendCat3, spendCat4, spendCat6]);
    lineChart.show(spendCat5);
    $('.spendCatAll, .spendCat1, .spendCat2, .spendCat3, .spendCat4, .spendCat6').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat5').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
  $('.line_toggles .spendCat6').on('click', function () {
    lineChart.hide([spendCat1, spendCat2, spendCat3, spendCat4, spendCat5]);
    lineChart.show(spendCat6);
    $('.spendCatAll, .spendCat1, .spendCat2, .spendCat3, .spendCat4, .spendCat5').css({
      'background-color': '',
      'color': ''
    });
    $('.spendCat6').css({
      'background-color': '#00A9E0',
      'color': '#fff'
    });
  });
}

$(window).load(function () {
  'use strict';
  var accessToken = localStorage.getItem('accessToken');
  if (accessToken === null || accessToken === 0) {
    $('#growth_gradient').show();
  } else {
    $.get('../layouts/growth-by-sector.html', function (data) {
      $('#growth_by_sector').html(data);
      sectors();
      $('#growth_by_sector').css({
        'visibility': 'visible',
        'height': 'auto',
        'padding': '50px 0'
      });
    });
    $.get('../layouts/cust-acquisition.html', function (data) {
      $('#cust_acquisition').html(data);
      acquisition();
      $('#cust_acquisition').css({
        'visibility': 'visible',
        'height': 'auto',
        'padding': '50px 0'
      });
    });
    $.get('../layouts/spend-per-card.html', function (data) {
      $('#spend_per_card').html(data);
      spend();
      $('#spend_per_card').css({
        'visibility': 'visible',
        'height': 'auto',
        'padding': '50px 0'
      });
    });
    $.get('../layouts/about-mm.html', function (data) {
      $('#about_mm').html(data);
      spend();
      $('#about_mm').css({
        'visibility': 'visible',
        'height': 'auto',
        'padding': '50px 0'
      });
    });
  }
});

var validated = false;
$('#emailAddress').on('input', function () {
  'use strict';
  var email = $('#emailAddress').val();
  var pattern = new RegExp(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i);
  var res = pattern.test(email);
  if (res) {
    $('.email_error').css('visibility', 'hidden');
    validated = true;
    return validated;
  } else if (email === '') {
    $('.email_error').css('visibility', 'hidden');
  } else {
    $('.email_error').css('visibility', 'visible');
    validated = false;
    return validated;
  }
});

function submitForm() {
  'use strict';
  var emailAddress = $('#emailAddress').val();
  var params = {
    elqSiteId: '1843',
    elqFormName: 'mainstreet-monitor',
    emailAddress: emailAddress
  };
  $('.email_error').css('visibility', 'hidden');
  $('.email_form').hide();
  $('#growth_gradient .email_wrapper .email_signup').css({
    'border-radius': '50%',
    'height': '180px',
    'width': '200px',
    'transition': 'all 0.3s ease 0s',
    'min-height': '180px',
    'min-width': '200px'
  });
  $('.ajax_loader').show();
  $.ajax({
    type: 'GET',
    async: true,
    dataType: 'jsonp',
    url: 'https://s1843.t.eloqua.com/e/f2?',
    data: params,
    complete: function () {
      console.log(params);
      localStorage.setItem('accessToken', 1);
      $('#growth_gradient').hide();
      $.get('../layouts/growth-by-sector.html', function (data) {
        $('#growth_by_sector').html(data);
        sectors();
        $('#growth_by_sector').css({
          'visibility': 'visible',
          'height': 'auto',
          'padding': '50px 0'
        });
      });
      $.get('../layouts/cust-acquisition.html', function (data) {
        $('#cust_acquisition').html(data);
        acquisition();
        $('#cust_acquisition').css({
          'visibility': 'visible',
          'height': 'auto',
          'padding': '50px 0'
        });
      });
      $.get('../layouts/spend-per-card.html', function (data) {
        $('#spend_per_card').html(data);
        spend();
        $('#spend_per_card').css({
          'visibility': 'visible',
          'height': 'auto',
          'padding': '50px 0'
        });
      });
      $.get('../layouts/about-mm.html', function (data) {
        $('#about_mm').html(data);
        spend();
        $('#about_mm').css({
          'visibility': 'visible',
          'height': 'auto',
          'padding': '50px 0'
        });
      });
    }
  });
}

$('#emailForm').on('submit', function (e) {
  'use strict';
  e.preventDefault();
  if (validated === true) {
    submitForm();
  } else if (validated === false) {
  } else {
    alert('There was an error in your submission,\n please check and try again.');
  }
});
