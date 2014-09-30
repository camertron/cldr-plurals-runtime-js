cldr-plurals-runtime-js
=================

[![Build Status](https://travis-ci.org/camertron/cldr-plurals-runtime-js.svg?branch=master)](http://travis-ci.org/camertron/cldr-plurals-runtime-js)

Ruby runtime methods for CLDR plural rules (see camertron/cldr-plurals).

## Installation

`gem install cldr-plurals-runtime-js`

## Usage

```ruby
require 'cldr-plurals/javascript_runtime'
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

cldr-plurals-runtime-js is an implementation of these calculations in Javascript, packaged as a rubygem. You can get the source code for the runtime by querying the `CldrPlurals::JavascriptRuntime` module:

```ruby
CldrPlurals::JavascriptRuntime.source
```

The source code simply contains a single Javascript object. It isn't packaged as a CommonJs module or anything fancy like that - it's just a straight js object. This makes it easier to test in Ruby. Also, since all the users of this runtime currently just copy the source into larger projects, there's no need for a package. Let me know if you want one <3

When evaluated inside a Javascript environment like V8 (via [therubyracer](https://github.com/cowboyd/therubyracer)), the runtime can be passed to [cldr-plurals](https://github.com/camertron/cldr-plurals) to determine the plural form for a number:

```ruby
require 'v8'
require 'cldr-plurals'
require 'cldr-plurals/javascript_runtime'

context = V8::Context.new
runtime = context.eval(CldrPlurals::JavascriptRuntime.source)

rules = CldrPlurals::Compiler::RuleList.new(:ru).tap do |rule_list|
  rule_list.add_rule(:one, 'v = 0 and i % 10 = 1 and i % 100 != 11')
  rule_list.add_rule(:few, 'v = 0 and i % 10 = 2..4 and i % 100 != 12..14')
  rule_list.add_rule(:many, 'v = 0 and i % 10 = 0 or v = 0 and i % 10 = 5..9 or v = 0 and i % 100 = 11..14')
end

js_code = rules.to_code(:javascript)
js_obj = context.eval(js_code)

js_obj.call('3', runtime)  # => 'few'
```

## Requirements

No external requirements.

## Running Tests

`bundle exec rake` should do the trick. Alternatively you can run `bundle exec rspec`, which does the same thing.

## Authors

* Cameron C. Dutro: http://github.com/camertron
