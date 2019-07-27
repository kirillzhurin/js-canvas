function Graph(context, xmin, xmax, ymin, ymax, x0, y0, xwidth, ywidth) {
  // VARIABLE DECLARATIONS	
  
  // canvas context on which to draw graph instance
  this.ctx = context;
  
  // location of origin (in pixels) in parent document
  this.x_origin = x0;
  this.y_origin = y0;
  
  // overall width and height of graph in pixels
  this.x_width = xwidth;
  this.y_width = ywidth;
  
  // scaling used in displaying values on the axes 
  this.x_displ_scal = (xmax - xmin) / xwidth;
  this.y_displ_scal = (ymax - ymin) / ywidth;
  
  // min and max of x and y relative to origin (in pixels)
  this.x_min_rel = xmin / this.x_displ_scal;
  this.x_max_rel = xmax / this.x_displ_scal;
  this.y_min_rel = ymin / this.y_displ_scal;
  this.y_max_rel = ymax / this.y_displ_scal;

  this.x_min = this.x_min_rel + this.x_origin;
  this.x_max = this.x_max_rel + this.x_origin;
  this.y_min = this.y_origin - this.y_min_rel;
  this.y_max = this.y_origin - this.y_max_rel;
  
  // width and height of textbox used for displaying values on the axes
	this.tw=15;
  this.th=20;
  this.txpos = this.x_origin - this.tw;
	this.typos = this.y_origin;	
}

// DRAW GRID: draw major, minor lines and display values
Graph.prototype.drawgrid = function(xmajor, xminor, ymajor, yminor) {
  var x_displ, y_displ, xx, yy;
  var x_tick_major = xmajor / this.x_displ_scal;
  var x_tick_minor = xminor / this.x_displ_scal;
  var y_tick_major = ymajor / this.y_displ_scal;
  var y_tick_minor = yminor / this.y_displ_scal;
  // draw major grid lines
  this.ctx.strokeStyle = '#999999';
  this.ctx.lineWidth = 1;		
  this.ctx.beginPath() ;			
  yy = this.y_max;
  do {
    this.ctx.moveTo(this.x_min, yy);
    this.ctx.lineTo(this.x_max, yy);
    yy += y_tick_major;
  } while (yy <= this.y_min);
  xx = this.x_min;
  do {
    this.ctx.moveTo(xx, this.y_min);
    this.ctx.lineTo(xx, this.y_max);
    xx += x_tick_major;
  } while (xx <= this.x_max);
  this.ctx.stroke();						
  // draw minor grid lines			
  this.ctx.strokeStyle = '#cccccc';
  this.ctx.lineWidth = 1;	
  this.ctx.beginPath() ;			
  yy = this.y_max;
  do {
    this.ctx.moveTo(this.x_min, yy);
    this.ctx.lineTo(this.x_max, yy);
    yy += y_tick_minor;
  } while (yy <= this.y_min);
  xx = this.x_min;
  do {
    this.ctx.moveTo(xx, this.y_min);
    this.ctx.lineTo(xx, this.y_max);
    xx += x_tick_minor;
  } while (xx <= this.x_max);
  this.ctx.stroke();	
  //display values
  this.ctx.font = "10pt Arial";
  this.ctx.fillStyle = '#000000';
  this.ctx.textAlign = "right";
  this.ctx.textBaseline = "top";		
  yy = this.y_max;	
  do {
    y_displ = (this.y_origin - yy) * this.y_displ_scal;
    this.ctx.fillText(y_displ, this.txpos + 5, yy - this.th / 2);
    yy += y_tick_major;
  } while (yy <= this.y_min);	
  this.ctx.textAlign = "left";
  this.ctx.textBaseline = "top";				
  xx = this.x_min;
  do {
    x_displ=(xx - this.x_origin) * this.x_displ_scal;
    this.ctx.fillText(x_displ, xx - this.tw + 10, this.typos + 5);			
    xx += x_tick_major;
  } while (xx <= this.x_max);
}

Graph.prototype.drawaxes = function() {
  if (typeof(xlabel) === 'undefined') var xlabel = 'x';
	if (typeof(ylabel) === 'undefined') var ylabel = 'y';		
  this.ctx.strokeStyle = '#000000';
  this.ctx.lineWidth = 2;
  this.ctx.beginPath() ;
  this.ctx.moveTo(this.x_min, this.y_origin);
  this.ctx.lineTo(this.x_max, this.y_origin);
  this.ctx.moveTo(this.x_origin, this.y_min);
  this.ctx.lineTo(this.x_origin, this.y_max);
  this.ctx.stroke();
  //axis labels
  this.ctx.font = "12pt Arial";
  this.ctx.fillStyle = '#000000';
  this.ctx.textAlign = "left";
  this.ctx.textBaseline = "top";
  this.ctx.fillText(xlabel, this.x_max + 0.75 * this.tw, this.typos - this.th / 2);
  this.ctx.fillText(ylabel, this.txpos + this.tw / 2 + 5, this.y_max - 1.5 * this.th);
}

Graph.prototype.plot = function (xArr, yArr, pColor, pDots, pLine){
  // the last three arguments have default values
  if (typeof(pColor) === 'undefined') var pColor = '#0000ff';
  if (typeof(pDots) === 'undefined') var pDots = true;
  if (typeof(pLine) === 'undefined') var pLine = true;
  var xpos = this.x_origin + xArr[0] / this.x_displ_scal;
  var ypos = this.y_origin - yArr[0] / this.y_displ_scal;
  this.ctx.strokeStyle = pColor;
  this.ctx.lineWidth = 1;
  this.ctx.beginPath();			
  this.ctx.moveTo(xpos, ypos);
  this.ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
  for (var i = 1; i < xArr.length; i++){
    xpos = this.x_origin + xArr[i] / this.x_displ_scal;
    ypos = this.y_origin - yArr[i] / this.y_displ_scal;
    if (pLine){
      this.ctx.lineTo(xpos, ypos);				
    }else{
      this.ctx.moveTo(xpos, ypos);
    }
    if (pDots){
      this.ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
    }
  }
  this.ctx.stroke();			
};	