var canvas = document.getElementById("land");
var land = canvas.getContext('2d');
var zhuan_lenght = 30;
var zhuan_height = 20;
var box_lenght = 60;
var land_x = 150;
var land_y = 20;


function draw_background(land, x_len, y_len) {
  land.save();
  land.beginPath();
  land.fillStyle = "#8cb9ce";
  land.fillRect(0, 0, x_len, y_len);
  land.closePath();
  land.restore();
}

function zhuan_builder(x, y, first_draw_len, last_draw_len) {
  var obj = {
    x: x,
    y: y,
    x_len: zhuan_lenght,
    y_len: zhuan_height,
    first_draw_len: first_draw_len,
    last_draw_len: last_draw_len,
    first_draw: function(land) {
      land.save();
      land.beginPath();
      land.fillStyle = "#f6c26d";
      land.fillRect(this.x, this.y, this.first_draw_len, this.y_len);
      land.closePath();
      land.restore();
      this.x = this.x + this.first_draw_len + 1;
    },
    normal_draw: function(land) {
      land.save();
      land.beginPath();
      land.fillStyle = "#f6c26d";
      land.fillRect(this.x, this.y, this.x_len, this.y_len);
      land.closePath();
      land.restore();
      this.x = this.x +  this.x_len + 1;
    },
    last_draw: function(land) {
      land.save();
      land.beginPath();
      land.fillStyle = "#f6c26d";
      land.fillRect(this.x, this.y, this.last_draw_len, this.y_len);
      land.closePath();
      land.restore();
      this.x = this.x +  this.last_draw_len + 1;
    }
  };
  return obj;
}

function first_zhuan(x, y) {
  return zhuan_builder(x, y, zhuan_lenght / 3, zhuan_lenght / 3 * 2);
}

function middle_zhuan(x, y) {
  return zhuan_builder(x, y, zhuan_lenght / 3 * 2, zhuan_lenght / 3);
}

function draw_line_wall(land, box_x, box_y, times) {
  var pixel = box_x_y_to_pixel(box_x, box_y);
  var x = pixel['x'];
  var y = pixel['y'];
  var first = first_zhuan(x, y);
  var second = middle_zhuan(x, y + zhuan_height + 1);
  var third = first_zhuan(x, y + (zhuan_height + 1) * 2);
  for(var i = 0 ; i < times; i ++) {
    if(i == 0 ) {
      first.first_draw(land);
      second.first_draw(land);
      third.first_draw(land);
    }else if(i == times - 1) {
      first.last_draw(land);
      second.last_draw(land);
      third.last_draw(land);
    }else {
      first.normal_draw(land);
      second.normal_draw(land);
      third.normal_draw(land);
    }

  }
}

function box(land, box_x, box_y, in_circle = false) {
  var pixel = box_x_y_to_pixel(box_x, box_y);
  var x = pixel["x"];
  var y = pixel["y"];

  land.save();
  land.beginPath();
  land.lineWidth = 4;
  if(in_circle){
    land.fillStyle= "#ec79d6";
    land.strokeStyle = "#ec79d6";
  }else {
    land.fillStyle = "#fbfbf0";
    land.strokeStyle = "#fbf9eb";
  }
  var box_x = x + 2;
  var box_y = y + 2;
  var box_len = box_lenght - 2;
  land.strokeRect(box_x, box_y, box_len, box_len);
  land.strokeRect(x + box_lenght / 4 + 2, y + box_lenght / 4 + 2, box_lenght / 2 - 2, box_lenght / 2 - 2);
  land.fillRect(box_x + 2, box_y + 2, box_lenght / 4 - 2, box_lenght / 4 -2 );
  land.closePath();
  land.restore();
}

function circle(land, x, y) {
  land.save();
  var pixel = box_x_y_to_pixel(x, y);
  land.beginPath();
  var circle_x = pixel["x"] + 30;
  var circle_y = pixel["y"] + 30;

  land.arc(circle_x, circle_y, 20, 0, Math.PI * 2);
  land.fillStyle= "#ec79d6";
  land.fill();
  land.closePath();
  land.restore();
}

function man(land, box_x, box_y, in_circle) {
  var pixel = box_x_y_to_pixel(box_x, box_y);
  var x = pixel['x'];
  var y = pixel['y'];
  land.save();
  land.beginPath();
  if(in_circle){
    land.fillStyle= "#ec79d6";
    land.strokeStyle = "#ec79d6";
  }

  land.moveTo(x + 30 - 20, y + 30);
  land.lineTo(x + 30 + 20, y + 30);
  land.stroke();
  land.closePath();

  land.beginPath();
  land.moveTo(x + 30, y + 30 - 10);
  land.lineTo(x + 30, y + 30 + 20);
  land.stroke();
  land.closePath();

  land.beginPath();
  land.moveTo(x + 30, y + 30 + 20);
  land.lineTo(x + 30 - 10, y + 30 + 30);
  land.stroke();
  land.closePath();

  land.beginPath();
  land.moveTo(x + 30, y + 30 + 20);
  land.lineTo(x + 30 + 10, y + 30 + 30);
  land.stroke();
  land.closePath();

  land.beginPath();

  land.arc(x + 30, y + 30 - 20, 10, 0, Math.PI * 2);
  land.fill();
  land.closePath();

  land.restore();
}

function box_x_y_to_pixel(box_x, box_y) {
  var x = land_x + (box_len) * box_x;
  var y = land_y + (box_len + line_height) * box_y;
  return {"x": x, "y": y};
}

var box_len = 62;
var line_height = 3;

var land_1 = {
  data: [['', 'w', 'w', 'w', 'w', 'w', 'w', '', ''],
         ['', 'w', 'p', 'p', 'p', 'p', 'w', 'w', ''],
         ['w', 'w', 'p', 'w', 'w', 'b', 'p', 'w', ''],
         ['w', 'p', 'p', 'p', 'b', 'p', 'm', 'w', ''],
         ['w', 'p', 'p', 'w', 'b', 'p', 'p', 'w', ''],
         ['w', 'p', 'p', 'p', 'p', 'p', 'p', 'w', ''],
         ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
        ],
  targets: [[2, 2], [2, 3], [3, 3]],
};

var land_2 = {
  data: [['', 'w', 'w', 'w', 'w', 'w', 'w', '', ''],
         ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
         ['w', 'w', 'p', 'p', 'p', 'p', 'w', 'w', ''],
         ['w', 'w', 'm', 'w', 'p', 'b', 'w', 'w', ''],
         ['w', 'w', 'p', 'p', 'b', 'p', 'w', 'w', ''],
         ['w', 'w', 'p', 'w', 'b', 'p', 'w', 'w', ''],
         ['w', 'w', 'p', 'p', 'p', 'p', 'w', 'w', ''],
         ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
         ['', 'w', 'w', 'w', 'w', 'w', 'w', '', ''],
        ],
  targets: [[4, 2], [4, 5], [5, 3]],
};

var land_3 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'p', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'p', 'w', 'w', ''],
    ['w', 'p', 'p', 'p', 'p', 'b', 'w', 'w', ''],
    ['w', 'p', 'p', 'b', 'm', 'p', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'b', 'w', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'p', 'p', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[2, 3], [4, 3], [4, 5]],
};

var land_4 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'p', 'p', 'p', 'b', 'p', 'w',  ''],
    ['w', 'p', 'p', 'w', 'p', 'p', 'w',  ''],
    ['w', 'm', 'b', 'b', 'p', 'p', 'w',  ''],
    ['w', 'w', 'p', 'p', 'p', 'w', 'w',  ''],
    ['w', 'w', 'p', 'p', 'p', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
  ],
  targets: [[2, 1], [4, 1], [3, 3]],
};


var land_11 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'p', 'w', 'w', 'w', 'p', 'w',  ''],
    ['w', 'p', 'w', 'p', 'p', 'p', 'w',  ''],
    ['w', 'p', 'b', 'b', 'p', 'm', 'w',  ''],
    ['w', 'p', 'p', 'b', 'p', 'p', 'w',  ''],
    ['w', 'p', 'p', 'w', 'p', 'p', 'w',  ''],
    ['w', 'p', 'p', 'w', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
  ],
  targets: [[1, 1], [5, 1], [5, 2]],
};

var land_10 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'p', 'm', 'w', ''],
    ['w', 'w', 'p', 'p', 'b', 'b', 'p', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'p', 'p', 'w', ''],
    ['w', 'w', 'w', 'p', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'b', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'p', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
  ],
  targets: [[4, 2], [4, 4], [4, 6]],
};

var land_7 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', '', '', '', '',  ''],
    ['w', 'm', 'p', 'p', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'p', 'w', 'b', 'p', 'p', 'p', 'p', 'w', ''],
    ['w', 'p', 'p', 'p', 'p', 'p', 'w', 'p', 'w', ''],
    ['w', 'w', 'p', 'b', 'w', 'p', 'b', 'p', 'w', ''],
    ['', 'w', 'w', 'p', 'p', 'p', 'w', 'w', 'w', ''],
    ['', '', 'w', 'w', 'w', 'w', 'w', '', '',  ''],
  ],
  targets: [[5, 2], [5, 3], [5, 4]],
};


var land_9 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'm', 'p', 'w', 'w', ''],
    ['w', 'w', 'p', 'w', 'p', 'w', 'p', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'b', 'p', 'w', 'w', ''],
    ['w', 'w', 'p', 'b', 'b', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
  ],
  targets: [[2, 5], [4, 2], [4, 3]],
};

var land_6 = {
  data: [
    ['', '', 'w', 'w', 'w', 'w', 'w', '', '',  ''],
    ['w', 'w', 'w', 'p', 'p', 'p', 'w', '', '', ''],
    ['w', 'p', 'p', 'p', 'm', 'p', 'w', '', '', ''],
    ['w', 'p', 'p', 'p', 'w', 'p', 'w', 'w', '', ''],
    ['w', 'w', 'b', 'w', 'p', 'p', 'p', 'w', 'w', ''],
    ['', 'w', 'p', 'p', 'p', 'b', 'p', 'p', 'w', ''],
    ['', 'w', 'p', 'b', 'p', 'w', 'b', 'p', 'w', ''],
    ['', 'w', 'w', 'w', 'p', 'p', 'p', 'w', 'w',  ''],
    ['', '', '', 'w', 'w', 'w', 'w', 'w', '',  ''],
  ],
  targets: [[4, 5], [5, 5], [6, 5], [5,4]],
};

var land_5 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'p', 'p', 'p', 'w', 'p', 'p', 'w',  ''],
    ['w', 'p', 'm', 'p', 'p', 'b', 'p', 'w',  ''],
    ['w', 'w', 'b', 'w', 'w', 'p', 'p', 'w', ''],
    ['', 'w', 'p', 'p', 'w', 'p', 'p', 'w', ''],
    ['', 'w', 'b', 'p', 'p', 'p', 'p', 'w',  ''],
    ['', 'w', 'p', 'p', 'p', 'p', 'p', 'w',  ''],
    ['', 'w', 'p', 'p', 'w', 'w', 'w', 'w',  ''],
    ['', 'w', 'w', 'w', 'w', '', '', '',  ''],
  ],
  targets: [[5, 3], [6, 3], [3, 4]],
};


var land_8 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'p', 'p', 'p', 'p', 'w', 'w',  ''],
    ['w', 'w', 'p', 'b', 'p', 'w', 'p', 'w', 'w',  ''],
    ['w', 'w', 'p', 'p', 'b', 'p', 'p', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'w', 'b', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'p', 'm', 'p', 'w', 'w', 'w',  ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',  ''],
  ],
  targets: [[3, 3], [3, 4], [5, 2]],
};


var land_12 = {
  data: [
    ['', '', '', 'w', 'w', 'w', 'w', 'w',  ''],
    ['', '', '', 'w', 'p', 'm', 'w', 'w', ''],
    ['w', 'w', 'w', 'w', 'p', 'p', 'p', 'w',  ''],
    ['w', 'p', 'p', 'w', 'b', 'b', 'p', 'w',  ''],
    ['w', 'p', 'p', 'p', 'p', 'p', 'w', 'w', ''],
    ['w', 'p', 'p', 'p', 'b', 'w', 'w', '',  ''],
    ['w', 'w', 'p', 'p', 'p', 'w', '', '',  ''],
    ['', 'w', 'w', 'w', 'w', 'w', '', '', ''],
  ],
  targets: [[1, 3], [1, 5], [2, 6]],
};

var land_13 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', '', '', '',  ''],
    ['w', 'p', 'p', 'p', 'w', 'w', 'w', 'w', ''],
    ['w', 'p', 'b', 'p', 'p', 'p', 'p', 'w',  ''],
    ['w', 'p', 'p', 'w', 'b', 'w', 'p', 'w',  ''],
    ['w', 'p', 'm', 'p', 'p', 'b', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[2, 1], [3, 1], [4, 4]],
};


var land_20 = {
  data: [
    ['', 'w', 'w', 'w', 'w', 'w', '', '',  ''],
    ['', 'w', 'p', 'm', 'p', 'w', 'w', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'p', 'p', 'w',  ''],
    ['w', 'p', 'p', 'b', 'p', 'b', 'p', 'w',  ''],
    ['w', 'w', 'b', 'w', 'p', 'w', 'w', 'w', ''],
    ['', 'w', 'p', 'p', 'p', 'w', '', '', ''],
    ['', 'w', 'w', 'w', 'w', 'w', '', '', ''],
  ],
  targets: [[1, 3], [3, 2], [4, 3]],
};


var land_16 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', '', '',   ''],
    ['w', 'p', 'p', 'p', 'w', 'w', 'w', ''],
    ['w', 'p', 'w', 'b', 'b', 'p', 'w', ''],
    ['w', 'p', 'p', 'p', 'm', 'p', 'w', ''],
    ['w', 'p', 'b', 'w', 'p', 'p', 'w', ''],
    ['w', 'w', 'p', 'p', 'p', 'w', 'w', ''],
    ['', 'w', 'w', 'w', 'w', 'w', '', ''],
  ],
  targets: [[1, 1], [1, 2], [3, 1]],
};



var land_19 = {
  data: [
    ['w', 'w', 'w', 'w', '', '', '',   '',''],
    ['w', 'p', 'p', 'w', '', '', '', '', ''],
    ['w', 'p', 'p', 'w', 'w', 'w', 'w', 'w', ''],
    ['w', 'p', 'p', 'b', 'p', 'p', 'p', 'w', ''],
    ['w', 'w', 'b', 'p', 'p', 'p', 'p', 'w', ''],
    ['', 'w', 'p', 'w', 'b', 'w', 'w', 'w', ''],
    ['', 'w', 'p', 'p', 'm', 'w', '', '', ''],
    ['', 'w', 'w', 'w', 'w', 'w', '', '', ''],
  ],
  targets: [[2, 3], [3, 3], [2, 6]],
};




var land_18 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',''],
    ['w', 'p', 'p', 'p', 'p', 'p', 'p', 'w', ''],
    ['w', 'p', 'w', 'p', 'w', 'p', 'p', 'w', ''],
    ['w', 'm', 'b', 'p', 'p', 'b', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'p', 'b', 'w', ''],
    ['', '', '', '', 'w', 'p', 'p', 'w', ''],
    ['', '', '', '', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[1, 1], [5, 1], [6, 3]],
};



var land_15 = {
  data: [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', '',''],
    ['w', 'p', 'p', 'p', 'm', 'p', 'w', '', ''],
    ['w', 'p', 'p', 'b', 'w', 'p', 'w', 'w', ''],
    ['w', 'p', 'w', 'p', 'b', 'p', 'p', 'w', ''],
    ['w', 'p', 'p', 'p', 'b', 'w', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'p', 'p', 'p', 'w', ''],
    ['', '', '', 'w', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[1, 1], [5, 1], [5, 3]],
};



var land_21 = {
  data: [
    ['', 'w', 'w', 'w', 'w', 'w', '',''],
    ['w', 'w', 'p', 'p', 'p', 'w', '',''],
    ['w', 'p', 'b', 'w', 'p', 'w', '', ''],
    ['w', 'p', 'p', 'p', 'm', 'w', 'w',''],
    ['w', 'p', 'b', 'p', 'p', 'p', 'w', ''],
    ['w', 'w', 'p', 'w', 'b', 'p', 'w',''],
    ['', 'w', 'p', 'p', 'p', 'w', 'w', ''],
    ['', 'w', 'w', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[2, 3], [2, 4], [2, 6]],
};


var land_22 = {
  data: [
    ['', 'w', 'w', 'w', 'w', '', '', '', ''],
    ['w', 'w', 'p', 'p', 'w', 'w', 'w','w',''],
    ['w', 'p', 'p', 'b', 'p', 'p', 'p', 'w',''],
    ['w', 'p', 'w', 'b', 'p', 'b', 'p','w', ''],
    ['w', 'm', 'p', 'p', 'w', 'p', 'p', 'w', ''],
    ['w', 'w', 'w', 'w', 'w', 'p', 'p','w', ''],
    ['', '', '', '', 'w', 'w', 'w', 'w', ''],
  ],
  targets: [[1, 2], [2, 2], [6, 2]],
};

var land_map = {
  data: undefined,
  targets: undefined,
  man: undefined,
  draw: function() {
    var that = this;
    this.data.forEach(function(row, y_index) {
      var w_counter = 0;
      var w_x_index = 0;
      row.forEach(function(value, x_index) {
        if(value == "w") {
          if(w_counter == 0) {
            w_x_index = x_index;
          }
          w_counter += 1;
        }else {
          if(w_counter != 0) {
            draw_line_wall(land, w_x_index, y_index, w_counter * 2 + 1);
            w_counter = 0;
          }

          if(value == "b") {
            var in_circle = that.x_y_in_cirle(x_index, y_index);
            box(land, x_index, y_index, in_circle);
          }else if (value == 'm') {
            var in_circle = that.x_y_in_cirle(x_index, y_index);
            that.man = {"x": x_index, "y": y_index};
            man(land, x_index, y_index), in_circle;
          }
        }
      })
    })

    this.targets.forEach(function(values) {
      var x_index = values[0];
      var y_index = values[1];
      if(that.data[y_index][x_index] !== "b" && that.data[y_index][x_index] != "m") {
        circle(land, x_index, y_index);
      }
    })
  },
  clear_x_y: function(x, y) {
    this.true_clear_x_y(x, y);
    if(this.x_y_in_cirle(x, y) && this.data[y][x] == "p") {
      circle(land, x, y);
    }
  },
  true_clear_x_y: function(x, y) {
    var pixel = box_x_y_to_pixel(x, y);
    land.clearRect(pixel['x'], pixel['y'], box_len, box_len);
    land.save();
    land.beginPath();
    land.fillStyle= "#8cb9ce";
    land.fillRect(pixel['x'], pixel['y'], box_len, box_len);
    land.fill();
    land.closePath();
    land.restore();
  },
  x_y_in_cirle: function(x, y){
    var in_circle_index = this.targets.findIndex(function(values) {return values[0] == x && values[1] == y;});
    var in_circle = in_circle_index > -1 ? true : false;
    return in_circle;
  },
  redraw_x_y: function(x, y){
    var pixel = box_x_y_to_pixel(x, y);
    var value = this.data[y][x];
    var in_circle = this.x_y_in_cirle(x, y);
    this.true_clear_x_y(x, y);
    if(value == "b") {
      box(land, x, y, in_circle);
    }else if (value == 'm') {
      man(land, x, y, in_circle);
    }else {
      if(in_circle){
        circle(land, x, y);
      }
    }
  },
  win_game: function() {
    var that = this;
    var sign = this.targets.every(function(values) {
      return that.data[values[1]][values[0]] == "b";
    });
    if(sign) {
      window.alert('win the game');
    }
  },
  up: function() {
    if(this.can_man_move(this.man['x'], this.man['y'], 'up')) {
      console.log("man localtions: " + "x: " + this.man['x'] + " y: " + this.man['y']);

      this.move(this.man['x'], this.man['y'], 'up');
      var new_pos = this.move_pos(this.man['x'], this.man['y'], 'up');
      this.man = {"x": new_pos['x'], "y": new_pos['y']};

      console.log("man localtions: " + "x: " + this.man['x'] + " y: " + this.man['y']);
    }
  },
  right: function() {
    if(this.can_man_move(this.man['x'], this.man['y'], 'right')) {
      this.move(this.man['x'], this.man['y'], 'right');
      var new_pos = this.move_pos(this.man['x'], this.man['y'], 'right');
      this.man = {"x": new_pos['x'], "y": new_pos['y']};
    }
  },
  left: function() {
    if(this.can_man_move(this.man['x'], this.man['y'], 'left')) {
      this.move(this.man['x'], this.man['y'], 'left');
      var new_pos = this.move_pos(this.man['x'], this.man['y'], 'left');
      this.man = {"x": new_pos['x'], "y": new_pos['y']};
    }
  },
  down: function() {
    if(this.can_man_move(this.man['x'], this.man['y'], 'down')) {
      this.move(this.man['x'], this.man['y'], 'down');
      var new_pos = this.move_pos(this.man['x'], this.man['y'], 'down');
      this.man = {"x": new_pos['x'], "y": new_pos['y']};
    }
  },
  move: function(x, y, arrow) {
    console.log("move: " + " x:" + x + ' y:' + y + " data is: " + this.data[y][x]);
    if(this.data[y][x] == "w" || this.data[y][x] == '') {
      return false;
    }else if(this.data[y][x] == 'b' || this.data[y][x] == 'm') {
      var new_pos = this.move_pos(x, y, arrow);
      var sign = this.move(new_pos['x'], new_pos['y'], arrow);
      if(sign) {
        console.log("move success " + " x:" + x + ' y:' + y + " data is: " + this.data[y][x] + " new_pos: y: " + new_pos['y'] + " new_pos x: " + new_pos['x']);
        this.data[new_pos['y']][new_pos['x']] = this.data[y][x];
        this.data[y][x] = 'p';
        this.redraw_x_y(new_pos['x'], new_pos['y']);
        this.clear_x_y(x, y);
      }
      return sign;
    }else {
      return true;
    }
  },
  can_move: function(x, y, arrow, times = 0){
    if(this.data[y][x] == "w" || this.data[y][x] == '') {
      return false;
    }else if(this.data[y][x] == 'b') {
      if(times == 0) {
        var new_pos = this.move_pos(x, y, arrow);
        return this.can_move(new_pos['x'], new_pos['y'], arrow, times + 1);
      }else {
        return false;
      }
    }else {
      return true;
    }
  },
  can_man_move: function(x, y, arrow) {
    var pos = this.move_pos(x, y, arrow);
    var sign = this.can_move(pos['x'], pos['y'], arrow);
    console.log("can man move x: " + x + ' y' + y + " arrow" + arrow + " post:" + pos['x'] + ' y:' + pos['y'] + " sign: " + sign);
    return sign;
  },
  move_pos: function(x, y, arrow) {
    if(arrow == 'up') {
      return {"x": x, "y": y - 1};
    }else if(arrow == 'down') {
      return {"x": x, "y": y + 1};
    }else if(arrow == 'left') {
      return {"x": x - 1, y: y};
    }else if(arrow == 'right') {
      return {"x": x + 1, y: y};
    }
  }
};



document.addEventListener("keydown", function(event)  {
  if(["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].indexOf(event.key) > -1){
    handleKeyAction(event.key);
    event.preventDefault();
    land_map.win_game();
  }
})

function handleKeyAction(key) {
  if(key == "ArrowRight"){
    land_map.right();
  }else if (key == "ArrowLeft") {
    land_map.left();
  }else if (key == "ArrowUp") {
    land_map.up();
  } else if (key == "ArrowDown") {
    land_map.down();
  }
}


var game_index = 1;
function next_checkpoint() {
  game_index = max_checkpoint_limit(game_index);
  try {
    var data = eval('land_' + game_index);
    if(data['data']) {
      land_map['data'] = data['data'];
      land_map['targets'] = data['targets'];
      draw_background(land, canvas.width, canvas.height);
      land_map.draw();
    }
  }catch(error) {}
  game_index += 1;
}

function go_special_checkpoint() {
  var dom = document.getElementById('checkpoint');
  if(dom.value) {
    var target_checkpoint = Number.parseInt(dom.value);
    game_index = max_checkpoint_limit(target_checkpoint);
    next_checkpoint();
  }
}

function max_checkpoint_limit(checkpoint) {
  if(checkpoint >= 22 || checkpoint <= 0){
    return  1;
  }else {
    return checkpoint;
  }
}

next_checkpoint();
