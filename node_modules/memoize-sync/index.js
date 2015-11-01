module.exports = memoize;

function memoize(fn, hash){
  var mem = {};

  !hash && ( hash = function(n){ return n; });

  memoizedFn.reset = function(){
    mem = {};
  };

  return memoizedFn;

  function memoizedFn(){
    var key = hash.apply(undefined, arguments);

    if( mem.hasOwnProperty(key) ){
      return mem[key];
    }

    return mem[ key ] = fn.apply(undefined, arguments);
  };

}
