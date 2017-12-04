class Habit {
  constructor(name, duration, days, type, id) {
    this.name = name;
    this.duration = duration;
    this.days = days;
    this.type = type;
    this.id = id;
    this.succesful = 0;
    this.unsuccesful = 0;
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

// function Habit(name, duration, days, type, id){
//     this.name = name;
//     this.duration = duration;
//     this.days = days;
//     this.type = type;
//     this.id = id;
//     this.succesful = 0;
//     this.unsuccesful = 0;
// }

// Habit.prototype = {
//   constructor: Habit,
//   incrementSuccesful:function(){
//     this.succesful += 1;
//   },
//   incrementUnsuccesful:function(){
//     this.unsuccesful += 1;
//   }
// }
// 
// function HabitRabbit(name, color, avatar, lives) {
//     this.name = name;
//     this.color = color;
//     this.avatar = avatar;
//     this.lives = lives;
// }

var main = function() {
  var counter = 0;

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

    var habit = new Habit(name, end, days, type, counter);
    counter += 1;

    $("#main ul").append('\
    <li>\
      <div class="habit" id="habit_' + habit.id + '">\
        <a href="#" class="delete"  id="' + habit.id + '"><i class="fa fa-times" aria-hidden="true"></i></a>\
        <div class="habit-content">\
          <h2 class="habitname">' +habit.name + '</h2>\
          <p>' + habit.duration +' days remaining</p>\
          <p>'+ habit.days +'</p>\
          <p>'+ habit.type + '</p>\
        </div>\
      </div>\
    </li>'
    );
    document.getElementById('modal').style.display = 'none';
  })

  $("#main ul").on("click",".delete", function() {
    var id = this.id;

    $("#habit_" + id).parent().remove();
  })
}

$(document).ready(main);
 