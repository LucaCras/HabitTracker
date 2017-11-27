function Habit(name, duration, interval, good){
    this.name = name;
    this.duration = duration;
    this.interval = interval;
    this.good = good;
    this.succesful = 0;
    this.unsuccesful = 0;
}

Habit.prototype = {
  constructor: Habit,
  getName:function () {
  return this.name;
  },
  incrementSuccesful:function(){
    this.succesful += 1;
  },
  incrementUnsuccesful:function(){
    this.unsuccesful += 1;
  }
}

function HabitRabbit(name, color, avatar, lives) {
    this.name = name;
    this.color = color;
    this.avatar = avatar;
    this.lives = lives;
}

var habit = new Habit("Swimming", 69, 7, true);

var bram = new HabitRabbit("bram", "blue", "hello", 3);


console.log(habit.unsuccesful);
