class Habit {
    constructor(id, name, duration, frequency, good, succesful, unsuccesful, completed) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.frequency = frequency;
        this.good = good;
        this.succesful = succesful;
        this.unsuccesful = unsuccesful;
        this.completed = completed;
    }
}

var main = function() {

    var getSuccesRatio = (succesful, unsuccesful) => {
        if (succesful == 0 && unsuccesful == 0) {
            return 100
        } else {
            return Math.round(100 * (succesful / (succesful + unsuccesful)));
        }
    }
    
    var nextId = 0;
    var habitList;

    $('.sidebar-items li:nth-child(1) a').addClass('active');

    var indexInHabitList = function(id) {
        for (var i = 0; i < habitList.length; i++) {
            if (habitList[i].id == id) {
                return i;
            }
        }
        return -1;
    }

    var insertIntoHabitList = function(habit) {
        if (indexInHabitList(habit.id) == -1) {
            habitList.push(habit);            
        } else {
            return null;  
        }
    }

    var createHTML = function(habit) {
        insertIntoHabitList(habit);
        var link,
            freqText,
            text,
            btnClass,
            disabled;
        
        if (habit.good == 'true') {
            link = 'images/habit-card-bg.jpg';
            if (habit.completed == 'false') {
                text = 'I did it!';
                btnClass = 'good-button';
            } else {
                text = 'Habit Completed!!!';
                btnClass = '';
                disabled = 'disabled';
            }
        } else {
            link = 'images/habit-card-bad-bg.jpg';
            if (habit.completed == 'false') {
                text= 'I did not do it!'
                btnClass = '';
            } else {
                text = 'Another day conquered!!!';
                btnClass = '';
                disabled = 'disabled';
            }
        }
        switch (habit.frequency) {
            case 1: 
                freqText = 'Once'
                break;
            case 2: 
                freqText = 'Twice'
                break;
            case 3: 
                freqText = 'Three days'
                break;
            case 4: 
                freqText = 'Four days'
                break;
            case 5: 
                freqText = 'Five days'
                break;
            case 6: 
                freqText = 'Six days'
                break;
            case 7: 
                freqText = 'Seven days'
                break;
        }

        if (habit.completed == 'true') {
            text
        }
        return ('\
        <div class="habit-card" id="1">\
            <a href="#" class="habit-card-delete" id="' + habit.id + '"><i class="fas fa-trash-alt"></i></a>\
            <a class="habit-card-edit" id="' + habit.id + '"><i class="fas fa-edit"></i></a>\
            <img src="' + link + '" class="habit-card-img-top"></img>\
            <div class="card-block">\
                <div class="habit-card-rabbit-img"><img src="images/HabitRabbitLogoNewTransparent.png" alt="user"></div>\
                <h3 class="habit-card-title">' + habit.name + '</h3>\
                <p>' + freqText + ' a week</p>\
                <button ' + disabled + ' id="' + habit.id + '" class="button card-button complete-button ' + btnClass + '">' + text + '</button>\
                <div class="habit-card-stats">\
                    <div class="habit-card-stat">\
                        <h3 class="">' + habit.duration + '</h3><small>Days</small>\
                    </div>\
                    <div class="habit-card-stat">\
                        <h3 class="">23,469</h3><small>Followers</small>\
                    </div>\
                    <div class="habit-card-stat">\
                        <h3 class="">' + getSuccesRatio(habit.succesful, habit.unsuccesful) + '%</h3><small>Success</small>\
                    </div>\
                </div>\
            </div>\
        </div>'
        );
    }

    var input = $("<input>").attr("type", "hidden").attr("name", "id");
    $('#edithabit').append($(input));

    var getHabits = function(){
        $.getJSON('/dashboard/get', function(result) {
            habitList = [];
            var html = "";
            for( var i = 0; i < result.length; i++ ) {

                habit = new Habit(result[i].habit_id, result[i].name, result[i].duration, result[i].frequency, result[i].good, result[i].succesful, result[i].unsuccesful, result[i].complete);
                html += createHTML(habit)
                nextId = result[i].id + 1;
            }         
            $('.page-content').html(html); 
        })
    }

    getHabits();

    setInterval(() => { 
        $.get('/dashboard/reset', function() {
            getHabits()
        });
        console.log('refreshed')
    }, 10000)

    $(".add").click(function() {
        $('#create-modal').css('display', 'block');
    })

    $(".close").click(function () {
        $('.modal').css('display', 'none');
    })  

    $("#createhabit").submit(function(e) {
        e.preventDefault();

        var data = $('#createhabit').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        var newHabit = new Habit(nextId, data.name, data.duration, data.frequency, data.good)
        $('#habits').append(createHTML(newHabit))

        $.post('/dashboard/add', data)

        getHabits();

        document.getElementById('create-modal').style.display = 'none';
    })

    $(".page-content").on("click", ".habit-card-delete", function() {
        var id = this.id;

        $.post('/dashboard/delete', {id: id})

        getHabits();
    })

    $(".page-content").on("click", ".habit-card-edit", function() {
        var index = indexInHabitList(this.id);
        var habit = habitList[index];
        
        document.getElementById('edit-modal').style.display = 'block';
        $('#edit-modal input[name="name"]').attr('value', habit.name);
        $('#edit-modal input[name="duration"]').attr('value', habit.duration);
        $('#edit-modal input[name="duration"]').attr('value', habit.duration);
        $('#edit-modal option[value="'+ habit.frequency +'"]').attr('selected','selected');
        $('#edit-modal input[name="id"]').val(habit.id);
        if(habit.good == "true"){
            $('edit-modal input[value="true"]').attr('checked', true);
        } else {
            $('edit-modal input[value="false"]').attr('checked', true);
        }
    })

    $("#edithabit").submit(function(e) {
        e.preventDefault();

        var data = $('#edithabit').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        console.log(data);

        $.post("/dashboard/edit", data);

        getHabits();

        document.getElementById('edit-modal').style.display = 'none';
    })

    $("input").focus(function() {
        $(this).one("click", function(e){      
            $(this).select();
        });
    });

    $(".page-content").on("click", ".complete-button", function(e) {

        var id = this.id;

        console.log(id)

        $.post("/dashboard/complete", {id: id});

        getHabits();
    })

    setInterval(function() {

    }, 10000)
    
}

$(document).ready(main);
 