//封装的很烂啊。。不看也罢
class Move {

    constructor(container) {
        this.mainDiv = $(container);
        this.length = parseInt($(this.mainDiv[0]).css('width')) || 0;
    }

    go(step = 1) {
        for (let i = 0; i < this.mainDiv.length; i++) {
            $(this.mainDiv[i]).css('left', parseInt($(this.mainDiv[i]).css('left')) - this.length * step + 'px');
        }
    }

    back(step = 1) {
        for (let i = 0; i < this.mainDiv.length; i++) {
            $(this.mainDiv[i]).css('left', parseInt($(this.mainDiv[i]).css('left')) + this.length * step + 'px');
        }
    }

}

//tab切换
let options = $('.options div');
let move = new Move('main div');
let isMoving = false;
$(window).resize(function() {
    location.reload();
  });
options.bind('click', function () {
    if (!isMoving) {
        isMoving = true;
        let active = $('.options .active');
        // move.length = parseInt($(move.mainDiv[2]).css('width'));
        if (!$(this).hasClass('active')) {
            if ($(this).prev().hasClass('active')) {
                move.go(1);
            } else if ($(this).next().hasClass('active')) {
                move.back(1);
            } else if (!$(this).prev().hasClass('active') && $(this).prev().prev().hasClass('active')) {
                move.go(2);
            } else {
                move.back(2);
            }
            $(this).addClass('active');
            active.removeClass('active');
            setTimeout(() => isMoving = false, 800);
        }
    }
})

//处理ajax请求不上时的请求
const disconnect = () => {
    $('.e-container, .r-container, .s-container').before(error);
    $('.e-container, .r-container, .s-container').css('display', 'none');
}

//插入数据

const hasData = array => !(array.length === 0);

let error = `<div class="error">
<div class="null"><img src="./img/null.png"></div>
<div class="tips">检查不到您的信息，<br>请检查绑定或网络状态</div>
</div>`

let goodNews = `<div class="error">
<div class="null"><img src="./img/goodnews.png"></div>
<div class="tips">您暂时还没有补考消息哦~</div>
</div>`

function insertData(res) {
    res = JSON.parse(res);
    let exams = res.exams;
    let reexams = res.reexams;
    let score = res.score;
    //考试查询页
    if (!hasData(exams)) {
        $('.e-container').before(error);
        $('.e-container').css('display', 'none');
    } else {
        for (let i = 0; i < exams.length; i++) {
            var eName = exams[i].name;
            var date = exams[i].date;
            var time = exams[i].time;
            var place = exams[i].place;
            var seat = exams[i].seat;
            var background = i % 2 === 0 ? '#f1f9ff' : '#fff';

            let eInfo = `<div class="e-info" style="background: ${background};">
    <div class="e-left">
    <div class="e-subject">${eName}</div>
    <div class="e-time">
        <img src="./img/time.png">
        <div class="date">${date}</div>
        <div class="time">${time}</div>
    </div>
    </div>
    <div class="e-right">
    <div class="class"><img src="./img/class.png">${place}</div>
    <div class="seat"><img src="./img/seat.png">${seat}</div>
    </div>
    </div>`

            $(eInfo).appendTo('.e-container');
        }
    }
    //补考查询页
    if (!hasData(reexams)) {
        $('.r-container').before(goodNews);
        $('.r-container').css('display', 'none');
    } else {
        for (let i = 0; i < reexams.length; i++) {
            var reeName = reexams[i].name;
            var redate = reexams[i].date;
            var retime = reexams[i].time;
            var replace = reexams[i].place;
            var reseat = reexams[i].seat;
            var rebackground = i % 2 === 0 ? '#f1f9ff' : '#fff';

            let eInfo = `<div class="e-info" style="background: ${rebackground};">
    <div class="e-left">
    <div class="e-subject">${reeName}</div>
    <div class="e-time">
        <img src="./img/time.png">
        <div class="date">${redate}</div>
        <div class="time">${retime}</div>
    </div>
    </div>
    <div class="e-right">
    <div class="class"><img src="./img/class.png">${replace}</div>
    <div class="seat"><img src="./img/seat.png">${reseat}</div>
    </div>
    </div>`

            $(eInfo).appendTo('.r-container');
        }
    }
    //成绩查询页
    if (!hasData(score)) {
        $('.s-container').before(error);
        $('.s-container').css('display', 'none');
    } else {
        for (let i = 0; i < score.length; i++) {
            var sscore = score[i].score;
            var sname = score[i].name;
            var stype = score[i].type;
            var img;
            if (stype === '理论') img = 'th';
            else img = 'ex';
            var sbackground = i % 2 === 0 ? '#f1f9ff' : '#fff';

            let sInfo = `<div class="e-info s-info" style="background: ${sbackground};">
            <div class="s-left">${sname}</div>
            <div class="s-right">
                <div class="s-score">${sscore}</div>
                <div class="s-type"><img src="./img/${img}.png"></div>
            </div>
            </div>`

            $(sInfo).appendTo('.s-container');
        }
    }
}

$.ajax({
    url: 'https://raw.githubusercontent.com/biteSMS/ExamAPI/master/api.json',
    method: 'get',
    success: function (res) {
        insertData(res);
    },
    error: function (err) {
        disconnect();
        console.log(err);
    }
})