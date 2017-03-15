let Animal = (function () {

  let animalType = Symbol('type');

  return class Animal {

    constructor (name, type) {
      this.name = name;
      this[animalType] = type;
    }

    get type () {
      return this[animalType];
    }

  };

}());

module.exports = Animal;
