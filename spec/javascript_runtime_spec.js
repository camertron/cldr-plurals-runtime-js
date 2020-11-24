( () => {
  const runtime = require('../index');

  describe('CLDR plurals runtime', () => {
    describe('with an integer', () => {
      const num = '1';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(0);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(0);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(0);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(0);
      });
    });

    describe('with a zero decimal', () => {
      const num = '1.0';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(1);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(0);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(0);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(0);
      });
    });

    describe('with a double-precision zero decimal', () => {
      const num = '1.00';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(2);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(0);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(0);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(0);
      });
    });

    describe('with a non-zero decimal', () => {
      const num = '1.3';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1.3);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(1);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(1);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(3);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(3);
      });
    });

    describe('with a double-precision trailing zero decimal', () => {
      const num = '1.30';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1.3);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(2);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(1);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(30);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(3);
      });
    });

    describe('with a double-precision leading zero decimal', () => {
      const num = '1.03';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1.03);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(2);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(1);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(3);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(3);
      });
    });

    describe('with a triple-precision decimal', () => {
      const num = '1.230';

      it('#n returns n without trailing zeroes', () => {
        expect(runtime.n(num)).toEqual(1.23);
      });

      it('#i returns the int value', () => {
        expect(runtime.i(num)).toEqual(1);
      });

      it('#v returns num of visible fraction digits (with zeroes)', () => {
        expect(runtime.v(num)).toEqual(3);
      });

      it('#w returns num of visible fraction digits (without zeroes)', () => {
        expect(runtime.w(num)).toEqual(2);
      });

      it('#f returns visible fractional digits (with zeroes)', () => {
        expect(runtime.f(num)).toEqual(230);
      });

      it('#t returns visible fractional digits (without zeroes)', () => {
        expect(runtime.t(num)).toEqual(23);
      });
    });
  });
})();
