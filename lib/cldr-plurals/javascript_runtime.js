(function(context) {
  this.buildArgsFor = function(num_str) {
    return [
      this.n(num_str), this.i(num_str), this.f(num_str),
      this.t(num_str), this.v(num_str), this.w(num_str)
    ];
  }

  this.n = function(str) {
    if (str.indexOf('.') > -1) {
      return this.toNum(this._n(str).replace(/([0]+\.$)/, ''));
    } else {
      return this.toNum(this._n(str));
    }
  }

  this.i = function(str) {
    return this.toNum(this._i(str));
  }

  this.f = function(str) {
    return this.toNum(this._f(str));
  }

  this.t = function(str) {
    return this.toNum(this._t(str));
  }

  this.v = function(str) {
    return this.toNum(this._v(str));
  }

  this.w = function(str) {
    return this.toNum(this._w(str));
  }

  // private

  this.toNum = function(str) {
    if (str.length == 0) {
      return 0;
    } else {
      return str.indexOf('.') > -1 ? parseFloat(str) : parseInt(str);
    }
  }

  // absolute value of the source number (integer and decimals).
  this._n = function(str) {
    return /(-)?(.*)/.exec(str)[2];
  }

  /// integer digits of n.
  this._i = function(str) {
    return /([\d]+)(\..*)?/.exec(this._n(str))[1];
  }

  // visible fractional digits in n, with trailing zeros.
  this._f = function(str) {
    return /([\d]+\.?)(.*)/.exec(this._n(str))[2];
  }

  // visible fractional digits in n, without trailing zeros.
  this._t = function(str) {
    return this._f(str).replace(/([0]+$)/, '');
  }

  // number of visible fraction digits in n, with trailing zeros.
  this._v = function(str) {
    return this._f(str).length.toString();
  }

  // number of visible fraction digits in n, without trailing zeros.
  this._w = function(str) {
    return this._t(str).length.toString();
  }

  return this;
}).call({})
