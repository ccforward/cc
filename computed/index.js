const Dep = {
  target: null
}

const trace = function(msg) {
  console.log("[ TRACE ] " + msg);
}

function defineReactive(obj, key, val) {
  const deps = []
  Object.defineProperty(obj, key, {
    get: function() {

      if (Dep.target && deps.indexOf(Dep.target) == -1) {
        trace("Adding target to deps for " + key)
        deps.push(Dep.target);
      }

      trace("Getting value of " + key);
      return val;
    },
    set: function(newValue) {
      trace("Setting value of " + key + ". value: " + newValue);
      val = newValue;

      for (var i = 0; i < deps.length; i++) {
        deps[i]();
      }
    }
  })
};

function defineComputed(obj, key, computeFunc, callbackFunc) {
  var onDependencyUpdated = function() {
    trace("Dependency updated for " + key + ". Recomputing.");
    var value = computeFunc();
    callbackFunc(value);
  };

  Object.defineProperty(obj, key, {
    get: function() {
      trace("Getting computed property :" + key);

      Dep.target = onDependencyUpdated;

      var value = computeFunc();

      Dep.target = null;

      return value;
    },
    set: function() {
      console.warn('nope!');
    }
  })
}








var person = {};
defineReactive(person, 'age', 16);
defineReactive(person, 'name', 'Tink');

defineComputed(person, 'status', function() {
  if (person.age > 18) {
    return 'man'
  } else {
    return 'boy'
  }
}, function(newValue) {
  console.log("The person's status is now: " + newValue)
});

console.log("Current age: " + person.age)
console.log("Current status: " + person.status)

// change age
console.log("Changing age");
person.age = 20;


console.log("Changing name");
person.country = "Jack";
