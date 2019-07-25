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
}

// DRAW GRID: draw major, minor lines and display values
Graph.prototype.drawgrid = function() {

}

Graph.prototype.drawaxes = function() {

}