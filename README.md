# msisdn-formatter

[![Build Status](https://travis-ci.org/Dalee/msisdn-formatter.svg?branch=master)](https://travis-ci.org/Dalee/msisdn-formatter)

Two simple function to normalize and format msisdn.

## Install

```
$ npm install msisdn-formatter
```

## Usage

```js
import { clean, pretty } from 'msisdn-formatter';

const userNumber = '+7 926 000-00-00';

console.log(clean(userNumber)); // Prints: '9260000000'
console.log(pretty(userNumber, 'full')); // Prints: '+7 (926) 000-0000'
```

Available formats:
- clean: *79260000000*
- cleaner: *9260000000*
- short: *926 000-0000*
- usual: *(926) 000-0000*
- full: *+7 (926) 000-0000*

The library is built to support AMD, CommonJS and globals.
