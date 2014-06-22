// Generated by CoffeeScript 1.7.1
(function() {
  var exports,
    __hasProp = {}.hasOwnProperty;

  exports = this;

  exports.publisher = {
    _subscribers: {
      any: []
    },
    on: function(type, fn, context) {
      if (type == null) {
        type = 'any';
      }
      fn = typeof fn === 'function' ? fn : context[fn];
      if (this._subscribers[type] == null) {
        this._subscribers[type] = [];
      }
      return this._subscribers[type].push({
        fn: fn,
        context: context || this
      });
    },
    remove: function(type, fn, context) {
      return this.visitSubscribers('unsubseribe', type, fn, context);
    },
    fire: function(type, publication) {
      return this.visitSubscribers('publish', type, publication);
    },
    visitSubscribers: function(action, type, arg) {
      var i, max, pubtype, subscribers, _i;
      if (type == null) {
        type = 'any';
      }
      pubtype = type;
      subscribers = this._subscribers[pubtype];
      max = subscribers != null ? subscribers.length : 0;
      for (i = _i = 0; 0 <= max ? _i < max : _i > max; i = 0 <= max ? ++_i : --_i) {
        if (action === 'publish') {
          subscribers[i].fn.call(subscribers[i].context, arg);
        } else {
          if (subscribers[i].fn === arg && subscribers[i].context === context) {
            subscribers.splice(i, 1);
          }
        }
      }
    }
  };

  exports.makePublisher = function(o) {
    var k;
    for (k in publisher) {
      if (!__hasProp.call(publisher, k)) continue;
      if (typeof publisher[k] === 'function') {
        o[k] = publisher[k];
      }
    }
    return o._subscribers = {
      any: []
    };
  };

}).call(this);
