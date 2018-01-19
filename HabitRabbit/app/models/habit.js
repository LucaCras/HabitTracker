class Habit {
    constructor(name, duration, days, type) {
        this.name = name;
        this.duration = duration;
        this.days = days;
        this.type = type;
        this.succesful = 0;
        this.unsuccesful = 0;
      }

      getObject() {
        return {
          name: this.name,
          duration: this.duration,
          days: this.days,
          type: this.type,
          succesful: this.succesful,
          unsuccesful: this.unsuccesful
        }
      }

      reset(name, duration, days, type) {
        this.name = name;
        this.duration = duration;
        this.days = days;
        this.type = type;
      }
      
      incrementSuccesful(){
        this.succesful += 1;
      }

      incrementUnsuccesful(){
        this.unsuccesful += 1;
      }

      getSuccesRatio(){
        return this.succesful / this.duration;
      }

}

module.exports = function(name, duration, days, type, id) {
  return new Habit(name, duration, days, type, id);
}