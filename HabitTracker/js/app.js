function Habit(name, duration, days, type){
    this.name = name;
    this.duration = duration;
    this.days = days;
    this.type = type;
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

var main = function() {

  $("#add").click(function() {
    document.getElementById('modal').style.display = 'block';
  })

  $(".close").click(function () {
    document.getElementById('modal').style.display = 'none';
  })  

  $("#createhabit").submit(function(e) {
    e.preventDefault();

    var form = new FormData(document.getElementById("createhabit"));
    var name = form.get("name");
    var end = form.get("end");
    var days = [];
    var type = form.get("type");

    $.each($("input[name='days']:checked"), function () {
      days.push($(this).val());
    });

    var habit = new Habit(name, end, days, type);

    console.log(habit);

    $("#main ul").append('<li><div class="habit"><h2 class="habitname">' +habit.name + '</h2><p>' + habit.duration +' days remaining</p><p>'+ habit.days +'</p><p>'+ habit.type + '</p></div></li>');
    document.getElementById('modal').style.display = 'none';
  })
}

$(document).ready(main);
 