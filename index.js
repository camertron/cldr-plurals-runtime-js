(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('cldr-plurals-runtime', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.cldrPluralsJsRuntime = mod.exports;
  }
})(this, function(exports) {
  function StrNum(sign, int, frac, exp) {
    this.sign = sign;
    this.int = int;
    this.frac = frac;
    this.exp = exp;

    this.intVal = function() {
      return parseInt(this.int);
    };

    this.fracVal = function() {
      return this.frac.replace(/^0*/, '');
    };

    this.applyExp = function() {
      let newInt, newFrac;

      if (this.exp > 0) {
        [newInt, newFrac] = this._shiftRight(this.exp);
      } else {
        [newInt, newFrac] = this._shiftLeft(Math.abs(this.exp));
      }

      return new StrNum(this.sign, newInt || '', newFrac || '', 0);
    };

    this.abs = function() {
      return new StrNum('', this.int, this.frac, this.exp);
    };

    this.toString = function() {
      let result = this.sign + this.int;

      if (this.frac != '') {
        result = result + '.' + this.frac;
      }

      if (this.exp != 0) {
        result = result + 'e' + this.exp.toString();
      }

      return result;
    };

    this.strip = function() {
      return new StrNum(
        this.sign, this.int, this.frac.replace(/0+$/, ''), this.exp
      );
    };

    this.toVal = function() {
      let str = this.sign + this.int;
      let num;

      if (this.frac == '') {
        num = parseInt(str);
      } else {
        num = parseFloat(str + '.' + this.frac);
      }

      return num * Math.pow(10, this.exp);
    };

    this._shiftRight = function(n) {
      if (n == 0) {
        return [this.int, this.frac];
      }

      let newInt = this.int + this.frac.slice(0, n - 1);

      if ((n - this.frac.length) > 0) {
        newInt = newInt + '0'.repeat(n - this.frac.length);
      }

      let newFrac = this.frac.slice(n);
      newFrac = (newFrac == '' && this.frac != '') ? '0' : newFrac;

      return [newInt, newFrac];
    };

    this._shiftLeft = function(n) {
      if (n == 0) {
        return [this.int, this.frac];
      }

      let newFrac = '';

      if ((n - this.int.length) > 0) {
        newFrac = newFrac + '0'.repeat(n - this.int.length);
      }

      newFrac = newFrac + this.int.slice(0, n - 1) + this.frac;

      let newInt = this.int.slice(n);
      newInt = newInt == '' ? '0' : newInt;

      return [newInt, newFrac];
    };
  };

  StrNum.fromString = function(str) {
    let sign, int, frac, exp;
    [_, sign, int, frac, exp] = str.match(/([+-])?(\d+)\.?(\d+)?[eEcC]?(-?\d+)?/);
    return new StrNum(sign || '', int, frac || '', exp || 0);
  };

  const buildArgsFor = exports.buildArgsFor = function(numStr) {
    const num = StrNum.fromString(numStr);

    return [
      n(num), i(num), f(num),
      t(num), v(num), w(num),
      e(num)
    ];
  }

  // absolute value of the source number (integer and decimals).
  const n = exports.n = function(num) {
    return _wrap(num).abs().strip().toVal();
  }

  // integer digits of n.
  const i = exports.i = function(num) {
    return _wrap(num).applyExp().intVal();
  }

  // visible fractional digits in n, with trailing zeros.
  const f = exports.f = function(num) {
    const fracVal = _wrap(num).applyExp().fracVal();
    return fracVal == '' ? 0 : parseInt(fracVal);
  }

  // visible fractional digits in n, without trailing zeros.
  const t = exports.t = function(num) {
    const fracVal = _wrap(num).applyExp().strip().fracVal();
    return fracVal == '' ? 0 : parseInt(fracVal);
  }

  // number of visible fraction digits in n, with trailing zeros.
  const v = exports.v = function(num) {
    return _wrap(num).applyExp().frac.length;
  }

  // number of visible fraction digits in n, without trailing zeros.
  const w = exports.w = function(num) {
    return _wrap(num).applyExp().strip().fracVal().length;
  }

  const e = exports.e = function(num) {
    return parseInt(_wrap(num).exp);
  }

  // private

  const _wrap = function(strOrNum) {
    if (strOrNum.constructor == StrNum) {
      return strOrNum;
    } else {
      return StrNum.fromString(strOrNum);
    }
  }
});
