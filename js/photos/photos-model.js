// Generated by CoffeeScript 1.7.1
(function() {
  var exports,
    __hasProp = {}.hasOwnProperty;

  exports = this;

  exports.photosModel = {
    maxConcurrentRequest: 0,
    allRequestSize: 0,
    loadedSize: 0,
    photosURLArr: [],
    unloadedURLArr: [],
    photosArr: [],
    _state: {
      validated: false,
      completed: false
    },
    clear: function() {
      this.changeState({
        validated: false,
        completed: false
      });
      this.setProperties({
        maxConcurrentRequest: 0,
        allRequestSize: 0,
        loadedSize: 0,
        photosURLArr: [],
        unloadedURLArr: [],
        photosArr: []
      });
      return this.fire('clear', null);
    },
    incrementLoadedSize: function() {
      this.loadedSize++;
      this.fire('loadedincreased', photosModel.loadedSize);
      if (this.loadedSize === this.allRequestSize) {
        return this.changeState({
          completed: true
        });
      }
    },
    initPhotos: function(urlArr) {
      this.setProperties({
        photosURLArr: urlArr,
        allRequestSize: urlArr.length
      });
      this.validateProperties();
      return this.loadPhotos();
    },
    loadPhotos: function() {
      return this._load(this.maxConcurrentRequest);
    },
    loadNext: function() {
      return this._load(1);
    },
    _load: function(size) {
      if (this.unloadedURLArr.length === 0) {
        return;
      }
      return this.fire('delegateloading', this.unloadedURLArr.splice(0, size));
    },
    addPhoto: function(img) {
      this.photosArr.push(img);
      return this.incrementLoadedSize();
    },
    setProperties: function(props) {
      var k, v;
      for (k in props) {
        if (!__hasProp.call(props, k)) continue;
        v = props[k];
        if (this.hasOwnProperty(k)) {
          this[k] = v;
        }
      }
      return this.changeState({
        validated: false
      });
    },
    validateProperties: function() {
      var e;
      try {
        this.maxConcurrentRequest |= 0;
        this.allRequestSize |= 0;
        if (isNaN(this.maxConcurrentRequest)) {
          throw new Error('maxConcurrentRequest is Nan');
        }
        if (isNaN(this.allRequestSize)) {
          throw new Error('allRequestSize is Nan');
        }
        this.maxConcurrentRequest = this.maxConcurrentRequest > this.allRequestSize ? this.allRequestSize : this.maxConcurrentRequest > 0 ? this.maxConcurrentRequest : 0;
        this.unloadedURLArr = this.photosURLArr.slice();
        return this.changeState({
          validated: true
        });
      } catch (_error) {
        e = _error;
        console.log('Error in photosModel.validateProperties');
        console.log("message -> " + e.message);
        console.log("stack -> " + e.stack);
        console.log("fileName -> " + (e.fileName || e.sourceURL));
        return console.log("line -> " + (e.line || e.lineNumber));
      }
    },
    getNextPhoto: function(received) {
      return this._getPhotosArr(received, 1);
    },
    _getPhotosArr: function(received, length) {
      var i, j, res, sent, v, _i, _j, _len;
      sent = [];
      res = [];
      if (received != null) {
        if (typeof received === 'number') {
          res.push(this.photosArr[received].cloneNode());
          sent = [received];
        } else {
          j = 0;
          for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
            while (received[j]) {
              j++;
            }
            if (this.photosArr[j] == null) {
              break;
            }
            res[i] = this.photosArr[j].cloneNode();
            sent[i] = j;
          }
        }
      } else {
        res = this.photosArr.slice(0, length);
        for (i = _j = 0, _len = res.length; _j < _len; i = ++_j) {
          v = res[i];
          res[i] = v.cloneNode();
          sent[i] = i;
        }
      }
      res.sent = sent;
      return res;
    }
  };

  makePublisher(photosModel);

  makeStateful(photosModel);

}).call(this);
