cldr-plurals-runtime-js
=================

[![Build Status](https://travis-ci.org/camertron/cldr-plurals-runtime-js.svg?branch=master)](http://travis-ci.org/camertron/cldr-plurals-runtime-js)

Javascript runtime methods for CLDR plural rules (see camertron/cldr-plurals).

## Installation

`gem install cldr-plurals-runtime-js`

## Usage

```javascript
const runtime = require('cldr-plurals-runtime');
```

## Functionality

The CLDR data set contains [plural information](http://unicode.org/cldr/trac/browser/tags/release-26-d04/common/supplemental/plurals.xml) for numerous languages in an expression-based [format](http://www.unicode.org/reports/tr35/tr35-numbers.html#Language_Plural_Rules) defined by Unicode's TR35. The document describes how to determine the various parts of a number and how to use those parts to determine the plural rule. The parts as they appear in TR35 are:

| Symbol | Value                                                          |
|:-------|----------------------------------------------------------------|
| n      | absolute value of the source number (integer and decimals).    |
| i      | integer digits of n.                                           |
| v      | number of visible fraction digits in n, with trailing zeros.   |
| w      | number of visible fraction digits in n, without trailing zeros.|
| f      | visible fractional digits in n, with trailing zeros.           |
| t      | visible fractional digits in n, without trailing zeros.        |

cldr-plurals-runtime-js is an implementation of these calculations in Javascript. Rules can be compiled into Javascript using the cldr-plurals rubygem:

```ruby
require 'cldr-plurals'

rules = CldrPlurals::Compiler::RuleList.new(:ru).tap do |rule_list|
  rule_list.add_rule(:one, 'v = 0 and i % 10 = 1 and i % 100 != 11')
  rule_list.add_rule(:few, 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14')
  rule_list.add_rule(:many, 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14')
end

js_code = rules.to_code(:javascript)
```

Once you've produced the Javascript code for the rule list, you can execute them like so:

```javascript
const runtime = require('cldr-plurals-runtime');
const rule = function() { ... }  // code generated above by cldr-plurals
console.log(rule('3', runtime))  // => "few"
```

## Requirements

No external requirements.

## Running Tests

`jasmine-node spec/` should do the trick.

## Authors

* Cameron C. Dutro: http://github.com/camertron
