App.FilterToggleButton = function(options) {
  this.options = options;
  this.container = this.options.toggleButton.container;
  this.createToggleButton();
  this.setupResponsiveChecks();
  this.options.filter.container.attr('tabindex', '-1');
  if(this.options.startHidden) {
    this.hideMenu();
  }
};

App.FilterToggleButton.prototype.setupResponsiveChecks = function() {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery);
  this.mq.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mq);
};

App.FilterToggleButton.prototype.createToggleButton = function() {
  this.menuButton = $('<button class="govuk-button '+this.options.toggleButton.classes+'" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.showText+'</button>');
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
  this.options.toggleButton.container.append(this.menuButton);
};

App.FilterToggleButton.prototype.checkMode = function(mq) {
  if(mq.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};

App.FilterToggleButton.prototype.enableBigMode = function() {
  this.showMenu();
  this.removeCloseButton();
};

App.FilterToggleButton.prototype.enableSmallMode = function() {
  this.hideMenu();
  this.addCloseButton();
};

App.FilterToggleButton.prototype.addCloseButton = function() {
  if(this.options.closeButton) {
    this.closeButton = $('<button class="app-filter__close" type="button">'+this.options.closeButton.text+'</button>');
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
    this.options.closeButton.container.append(this.closeButton);
  }
};

App.FilterToggleButton.prototype.onCloseClick = function() {
  this.hideMenu();
  this.menuButton.focus();
};

App.FilterToggleButton.prototype.removeCloseButton = function() {
  if(this.closeButton) {
    this.closeButton.remove();
    this.closeButton = null;
  }
};

App.FilterToggleButton.prototype.hideMenu = function() {
  this.menuButton.attr('aria-expanded', 'false');
  this.options.filter.container.addClass('app-js-hidden');
  this.menuButton.text(this.options.toggleButton.showText);
};

App.FilterToggleButton.prototype.showMenu = function() {
  this.menuButton.attr('aria-expanded', 'true');
  this.options.filter.container.removeClass('app-js-hidden');
  this.menuButton.text(this.options.toggleButton.hideText);
};

App.FilterToggleButton.prototype.onMenuButtonClick = function() {
  this.toggle();
};

App.FilterToggleButton.prototype.toggle = function() {
  if(this.menuButton.attr('aria-expanded') == 'false') {
    this.showMenu();
    this.options.filter.container.focus();
  } else {
    this.hideMenu();
  }
};
