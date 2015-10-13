$:.unshift File.join(File.dirname(__FILE__), 'lib')
require 'cldr-plurals/javascript-runtime/version'

Gem::Specification.new do |s|
  s.name     = "cldr-plurals-runtime-js"
  s.version  = ::CldrPlurals::JAVASCRIPT_RUNTIME_VERSION
  s.authors  = ["Cameron Dutro"]
  s.email    = ["camertron@gmail.com"]
  s.homepage = "http://github.com/camertron"

  s.description = s.summary = 'Javascript runtime methods for CLDR plural rules (see camertron/cldr-plurals).'

  s.platform = Gem::Platform::RUBY
  s.has_rdoc = true

  s.add_development_dependency 'therubyracer', '0.12.0'

  s.require_path = 'lib'
  s.files = Dir["{lib,spec}/**/*", "Gemfile", "History.txt", "LICENSE.txt", "README.md", "Rakefile", "cldr-plurals-runtime-js.gemspec"]
end
