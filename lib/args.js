'use strict';

let matcher = /^-([A-z0-9]*)$/,
    translate = {
      's': 'sort',
      't': 'taken',
      'a': 'available',
    },
    fs = require('fs');


module.exports = function(args){
  args = args.slice(2);
  let data = [];

  data = fs.readFileSync('/dev/stdin').toString();

  if (data) data = data
            .slice(0, -1)
            .split(/,(?:\r\n|\n|\r|\s)/);

  let options = args.filter(function(arg){
    if (matcher.test(arg)) return matcher.test(arg);
  }).join('').split('').slice(1)
  .map(function(key){
    return translate[key] || 'unknown';
  })
  .reduce(function(a,b){
    if (a.indexOf(b) < 0 && b !== 'unknown') a.push(b);
    return a;
  }, []);

  let domains = args.filter(function(arg){
    if (!matcher.test(arg)) return true;
  });

  if (data) domains = domains.concat(data);

  return {
    domains: domains,
    options: options
  };
};