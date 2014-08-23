/* ========================================================================
 * Scrolleffect.js v1.0.0
 * http://github.com/hizhi/Scrolleffect
 * ========================================================================
 * Licensed under MIT
 * ======================================================================== */

 // effectEle: which element
 // offset:  where trigger
 // effectClass: element css3 transition class
    
  var Scrolleffect = function (effectEle, offset, effectClass) {

    // is support css3 transition
    var el = document.createElement('transition');
    var supportTransition = el.style.transition !== undefined;
    if (!supportTransition) {
      return false;
    }

    this.$el = effectEle;
    this.triggerPos = offset;
    this.effectClass = effectClass;
    this.scrollTop = $(window).scrollTop();

    this.initEffect();
  };

  Scrolleffect.prototype.setupListener = function () {
    var _this = this;
    $(window).unbind('scroll').scroll(function () {
      var mark = _this.scrollTop;
      var currentTop = _this.scrollTop = $(window).scrollTop();
      // scroll direction up or down
      if (currentTop > mark) {
        _this.down();
      } else {
        _this.up();
      }
    })
  };

  Scrolleffect.prototype.up = function () {
    var _this = this;
    this.$el.each(function (index) {
      var effectPos = $(this).position().top - _this.triggerPos;
      if (_this.scrollTop < effectPos) {
        _this.inactiveEffect($(this))
      } else {
        return;
      }
    })
      
  };

  Scrolleffect.prototype.down = function () {
    var _this = this;
    this.$el.each(function (index) {
      var effectPos = $(this).position().top - _this.triggerPos;
      if (_this.scrollTop > effectPos) {
        _this.activeEffect($(this))
      } else {
        return;
      }
    })
      
  };

  // for first effect
  Scrolleffect.prototype.initEffect = function () {
    var _this = this;
    var scrollTop = this.scrollTop;
    this.$el.each(function (index) {
      var effectPos = $(this).position().top - _this.triggerPos;
      if (effectPos < scrollTop) {
        _this.activeEffect($(this));
      }
    })

    this.setupListener();
  };

  Scrolleffect.prototype.activeEffect = function ($el) {
    $el.addClass(this.effectClass);
  };

  Scrolleffect.prototype.inactiveEffect = function ($el) {
    $el.removeClass(this.effectClass);
  };

