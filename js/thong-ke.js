function load_count () {
    // body... 
    $.ajax({
        url : "module/function/count-thongke.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            $('#totalpost').text(result['post']);
            $('#totalhost').text(result['host']);
            $('#totalguest').text(result['guest']);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}

function creat_chart () {
    // body... 
    var data = [];
    var label = [];
    $.ajax({
            url : "module/function/data-type-chart.php",
            type : 'post',
            dataType : 'json',
            data : {
            },
            success : function (result){
                $.each(result, function (key, item){
                    data.push(item.total);
                    label.push(item.loai_phong);
                });

                const ctx = document.getElementById('myChart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                      data: {
                        labels: label,
                        datasets: [{
                          label: '',
                          data: data,
                          backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                            ],
                          fill: false,
                          borderColor: 'rgb(75, 192, 192)',
                        }]
                      },
                      options: {
                          animation: {
                              tension: {
                                  duration: 1500,
                                  easing: 'linear',
                                  from: 1,
                                  to: 0,
                                  loop: true
                              }
                          },
                          scales: {
                            yAxes: [{
                                  id: 'y-axis-0',
                                  ticks: {
                                    beginAtZero:true,
                                    mirror:false,
                                    suggestedMin: 0
                                  }
                                }],
                          },
                          legend: {
                            display: false,
                            position : 'bottom',
                            labels: {
                                padding : 20
                            }
                          },
                          title: {
                            display: true,
                            text: 'Biểu đồ đếm số lượng bài viết theo loại phòng',
                            fontColor: '#333',
                            fontSize: 20,
                            padding: 20
                          }
                      }
                });

            },
            error : function (result) {
                alert("sai");
            }
        });
}

//hàm convert ngày sang form yyyy-mm-dd
function convert(){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
}

//đặt max value cho input là ngày hiện tại
var today = convert();
$('.countpost .input-group input').attr('max', today);


//kiểm tra ngày nhập so với ngày hiện tại
$('.countpost .input-group input').blur(function(event) {
    /* Act on the event */
    var date = $(this).val();
    var today = convert();
    if (date > today) {
        alert('ngày không hợp lệ');
        this.focus();
    }
});


//kiểm tra khoảng cách ngày
$('.countpost .btn').click(function(event) {
    /* Act on the event */
    var pre = $('#start').val();
    var next = $('#end').val();

    if (pre > next) {
        alert('khoảng thời gian không hợp lệ');
        console.log(pre);
    } else {
        //gửi lên server nè
        $.ajax({
            url : "module/function/count-post-intime.php",
            type : 'post',
            dataType : 'text',
            data : {
                pre : pre,
                next : next
            },
            success : function (result){
                $('#result-check').text(result + ' bài viết')
            },
            error : function (result) {
                alert("lỗi");
            }
        });
    }
});


$(document).ready(function() {

    load_count();
    creat_chart();
});