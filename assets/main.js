$(function() {
  var wHeight = $(window).height();
  var wWidth = $(window).width();
  $('.page').height(wHeight);
  
  //type: 0 up,1,down,2,left,3,right
  function page(index, moveType) {
    this.index = index;
    this.$el = $('#page-' + index);
    this.moveType = moveType || 0;
    this.getNext();
    this.$el.on('touchstart', $.proxy(this.touchStart, this));
    this.$el.on('touchmove', $.proxy(this.touchMove, this));
    this.$el.on('touchend', $.proxy(this.touchEnd, this));
  }
  
  $.extend(page.prototype, {
    getNext: function() {
      if (this.moveType == 0 || this.moveType == 2) {
        this.$next = $('#page-' + (this.index + 1));
      } else {
        this.$next = $('#page-' + (this.index - 1));
      }
    },
    touchStart: function(event) {
      this.startXY = event.originalEvent.touches[0];
    },
    touchMove: function(event) {
      return;
      this.moveXY = event.originalEvent.touches[0];
      if (this.moveType == 0) {
        this.$el.css({
          x: 0,
          y: this.moveXY.pageY - this.startXY.pageY + 'px'
        });
        this.$next.css({
          x: 0,
          y: wHeight + this.moveXY.pageY - this.startXY.pageY + 'px'
        })
      } else if (this.moveType == 1) {
        if (this.startXY.pageY < this.endXY.pageY) {
          this.$el.transition({
            x: 0,
            y: wHeight + 'px',
            complete: function() {
              console.log('complete');
              _this.moveEnd();
            }
          });
          this.nextMove();
        }
      } else if (this.moveType == 2) {
        if (this.startXY.pageX > this.endXY.pageX) {
          this.$el.transition({
            x: - wWidth + 'px',
            y: 0,
            complete: function() {
              console.log('complete');
              _this.moveEnd();
            }
          });
          this.nextMove();
        }
      }
    },
    touchEnd: function(event) {
      console.log(event);
      this.endXY = event.originalEvent.changedTouches[0];
      this.doMove();
    },
    doMove: function() {
      var _this = this;
      if (this.moveType == 0) {
        if (this.startXY.pageY > this.endXY.pageY) {
          this.$el.transition({
            x: 0,
            y: - wHeight + 'px',
            complete: function() {
              console.log('complete');
              _this.moveEnd();
            }
          });
          this.nextMove();
        }
      } else if (this.moveType == 1) {
        if (this.startXY.pageY < this.endXY.pageY) {
          this.$el.transition({
            x: 0,
            y: wHeight + 'px',
            complete: function() {
              console.log('complete');
              _this.moveEnd();
            }
          });
          this.nextMove();
        }
      } else if (this.moveType == 2) {
        if (this.startXY.pageX > this.endXY.pageX) {
          this.$el.transition({
            x: - wWidth + 'px',
            y: 0,
            complete: function() {
              console.log('complete');
              _this.moveEnd();
            }
          });
          this.nextMove();
        }
      }
    },
    nextMove: function() {
      console.log(this.$next);
      if (!this.$next.size()) {
        return;
      }
      this.$next.show();
      if (this.moveType == 0) {
        this.$next.css({
          translate: [0, wHeight]
        });
        this.$next.transition({
          x: 0,
          y: 0
        });
      } else if (this.moveType == 1) {
        this.$next.css({
          translate: [0, - wHeight]
        });
        this.$next.transition({
          x: 0,
          y: 0
        });
      } else if (this.moveType == 2) {
        this.$next.css({
          translate: [wWidth, 0]
        });
        this.$next.transition({
          x: 0,
          y: 0
        });
      }
      
    },
    moveEnd: function() {
      this.$el.hide();
    }
  });
  new page(1, 0);
  new page(2, 2);
  new page(3, 1);
});
