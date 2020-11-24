#! /bin/bash

set -ev

npm install -g jasmine-node
jasmine-node spec/
