class Habit {
    constructor(id, name, duration, frequency, good) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.frequency = frequency;
        this.good = good;
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

var main = function() {

    var nextId = 0;
    var habitList;

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
            btnClass;
        if (habit.good == 'true') {
            link = 'images/habit-card-bg.jpg';
            text = 'I did it!';
            btnClass = 'good-button';
        } else {
            link = 'images/habit-card-bad-bg.jpg';
            text= 'I did not do it!'
            btnClass = '';
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
        return ('\
        <div class="habit-card" id="1">\
            <a href="#" class="habit-card-delete" id="' + habit.id + '"><i class="fas fa-trash-alt"></i></a>\
            <a class="habit-card-edit" id="' + habit.id + '"><i class="fas fa-edit"></i></a>\
            <img src="' + link + '" class="habit-card-img-top"></img>\
            <div class="card-block">\
                <div class="habit-card-rabbit-img"><img src="images/HabitRabbitLogoNewTransparent.png" alt="user"></div>\
                <h3 class="habit-card-title">' + habit.name + '</h3>\
                <p>' + freqText + ' a week</p>\
                <a href class="button card-button ' + btnClass + '">' + text + '</a>\
                <div class="habit-card-stats">\
                    <div class="habit-card-stat">\
                        <h3 class="">' + habit.duration + '</h3><small>Days</small>\
                    </div>\
                    <div class="habit-card-stat">\
                        <h3 class="">23,469</h3><small>Followers</small>\
                    </div>\
                    <div class="habit-card-stat">\
                        <h3 class="">67%</h3><small>Success</small>\
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
            console.log(result);
            habitList = [];
            var html = "";
            for( var i = 0; i < result.length; i++ ) {

                habit = new Habit(result[i].habit_id, result[i].name, result[i].duration, result[i].frequency, result[i].good);
                html += createHTML(habit)
                nextId = result[i].id + 1;
            }         
            $('.page-content').html(html); 
        })
    }

    getHabits();

    setInterval(() => { getHabits() }, 100000)

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
        $(this).one("click keyup", function(e){      
            $(this).select();
        });
    });
    
}

$(document).ready(main);
 