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
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                                'rgba(255, 159, 64, 0.5)'
                            ],
                          fill: false,
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
                            fontSize: 16,
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

function creat_chart_1 () {
    // body... 
    var data1 = [];
    var label1 = [];
    $.ajax({
            url : "module/function/data-price-chart.php",
            type : 'post',
            dataType : 'json',
            data : {
            },
            success : function (result){
                $.each(result, function (key, item){
                    if(item.type_of_price == 'A') {
                      label1.push('< 1 triệu');
                    } else if (item.type_of_price == 'B') {
                      label1.push('1 - 3 triệu');
                    } else if (item.type_of_price == 'C') {
                      label1.push('3 - 5 triệu');
                    } else label1.push('> 5 triệu');

                    data1.push(item.total);
                });

                console.log(data1);

                const ctx2 = document.getElementById('myChart1').getContext('2d');
                const myChart = new Chart(ctx2, {
                    type: 'pie',
                      data: {
                        labels: label1,
                        datasets: [{
                          label: '',
                          data: data1,
                          backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                            ],
                          fill: false,
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
                          // scales: {
                          //   yAxes: [{
                          //         id: 'y-axis-0',
                          //         ticks: {
                          //           beginAtZero:true,
                          //           mirror:false,
                          //           suggestedMin: 0
                          //         }
                          //       }],
                          // },
                          legend: {
                            display: true,
                            position : 'right',
                            labels: {
                                padding : 20
                            }
                          },
                          title: {
                            display: true,
                            text: 'Biểu đồ đếm số lượng bài viết theo khoảng giá',
                            fontColor: '#333',
                            fontSize: 16,
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

function maxHost () {
    // body... 
    $.ajax({
        url : "module/function/thongke-maxhost.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var html = `<tr>
                            <td>` + result['name'] + `</td>
                            <td>` + result['username'] + `</td>
                            <td>` + result['totalpost']+ `</td>
                        </tr>`

            $('.maxhost .bodypost').html(html);

        },
        error : function (result) {
            alert("lỗi");
        }
    });
}

function mostlikepost () {
    // body... 
    $.ajax({
        url : "module/function/thongke-mostlikepost.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var html = `<tr>
                            <td>` + result['name'] + `</td>
                            <td>` + result['tieu_de'] + `</td>
                            <td>` + result['gia_phong']+ `</td>
                            <td>` + result['totallike']+ `</td>
                        </tr>`

            $('.likepost .bodypost').html(html);

        },
        error : function (result) {
            alert("lỗi");
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
    creat_chart_1();
    maxHost();
    mostlikepost();
});