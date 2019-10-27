$(function () {

  //自定义参数
  let point = 10; // 一共10个目标点
  let lineColor = '#bfa'; // 线条颜色
  let lineWidth = 2; // 线条粗细
  let animatEasing = 500; // 动画速度
  let animatDelay = 20; // 动画每个阶段停留时间
  let initLeftTime = 3;// 倒计时开始数字（进入页面即执行）
  let eaterIconLeft = './images/fish_left.png'; // 捕食者icon1
  let eaterIconRight = './images/fish_right.png'; // 捕食者icon2
  let foodIcon = './images/lemon.png'; // 食物icon

  // 业务参数
  let animatingFlag = false; // 动画是否在执行
  let $contentBox = $('#contentBox'); // 容器box
  let itemWidth = $contentBox.width(); // 子元素宽度
  let itemHeight = $contentBox.height() / (point / 2 - 1); // 子元素高度

  // 补充顶部边框，作为运动轨迹
  $contentBox.css({
    'borderTop': `${lineWidth}px solid ${lineColor}`
  });

  // 添加子元素，添加子元素图片
  for (let i = 0; i < point / 2 - 1; i++) {
    $contentBox.append('<div class="partItem"></div>');
    $('.partItem').eq(i).width(itemWidth).height(itemHeight).append('' +
      '<div class="border" style="height: ' + lineWidth + 'px; background: ' + lineColor + '"></div>' +
      '<img class="foodIcon foodIcon1" src='+foodIcon+' alt="foodIcon">' +
      '<img class="foodIcon foodIcon2" src='+foodIcon+' alt="foodIcon">'
    );
  }

  // 最后一个元素添加子元素图片
  $('.partItem:last-child').append('' +
    '<img class="foodIcon foodIcon3" src='+foodIcon+' alt="foodIcon">' +
    '<img class="foodIcon foodIcon4" src='+foodIcon+' alt="foodIcon">'
  );

  // 子元素，添加伪类样式，作为运动轨迹
  $(`<style>.partItem:before{
      width: ${lineWidth}px;
      height: ${Math.sqrt(Math.pow(itemWidth, 2) + Math.pow(itemHeight, 2))}px; /*斜线长度*/
      background-color: ${lineColor};
      transform: rotate(${getTanDeg(itemWidth / (itemHeight - lineWidth / 2)) + 'deg'});
    }</style>`).appendTo('head');


  var $foodIconArr = $('.foodIcon');// 食物的图标DOM数组
  var $eater = $('#eaterIcon').attr('src', eaterIconRight); // 猎人DOM（人或者鱼）

  // js控制捕食者初始化left,top,并保存，以便再次初始化；
  let rootFontSize = parseInt($('html').css('fontSize'));
  let eaterFontScale = 160;
  $eater.width(200 * rootFontSize / eaterFontScale);
  $eater.height(200 * rootFontSize / eaterFontScale);
  let eaterWidth = $eater.width(); // 捕食者宽度
  let eaterHeight = $eater.height(); // 捕食者高度
  let windowWidth = $(window).width(); // 视口宽度
  let windowHeight = $(window).height(); // 视口高度
  let eaterInitLeft = -eaterWidth/2 - (windowWidth - itemWidth) / 4; // 横向捕食者初始化left
  let eaterInitTop = -eaterHeight / 2; // 捕食者初始化top
  $eater.css({
    left: eaterInitLeft,
    top: eaterInitTop
  });


  $('.shadowBox .timeNum').text(initLeftTime);
  timerFun();
  // $('.shadowBox').hide();

  function timerFun () {
    let leftTime = 3;
    let timer = setInterval(function () {
      leftTime--;
      if (leftTime > 0) {
        $('.shadowBox .timeNum').text(leftTime);
      } else {
        clearInterval(timer);
        $('.shadowBox').hide();
        $('.shadowBox .timeNum').text(initLeftTime);
        eatingFood();
      }
    }, 1000);
  }


  // 开始吃食物动画
  function eatingFood () {
    animatingFlag = true;
    for (let i = 0; i < point; i++) {

      let left = i % 2 ? 0 : itemWidth; // 距离左侧距离
      let top = Math.ceil(i / 2) * itemHeight; // 距离顶部距离

      if (i === 0) {// 隐藏第一个食物
        $foodIconArr.eq(0).hide();
      }
      if (i < point - 1) { // 最后一次之前停止动画
        $eater.animate({
          left: left - eaterWidth / 2, // 减去自身边距的一半
          top: top - eaterHeight / 2 // 减去自身边距的一半
        }, animatEasing, 'linear', function () {
          $foodIconArr.eq(i + 1).hide();
          $eater.attr('src', `${i % 2 ? eaterIconRight : eaterIconLeft}`); // 更换图片
          console.log(i);
          if (i === point - 2) {
            console.log('最后一次');
            animatingFlag = false;
          }
        }).delay(animatDelay);
      }
    }
  }


  // 返回、再来一次
  $('.fixedBox .part').unbind('click').bind('click', function () {
    let index = $(this).index();
    if (index === 0) {
      alert('返回~');
    } else {
      if (!animatingFlag) { // 动画执行结束
        // 展示倒计时
        $('.shadowBox').show();
        timerFun();
        $eater.attr('src', eaterIconRight); // 更换图片
        // 显示所有食物
        for (let i = 0; i < $foodIconArr.length; i++) {
          $foodIconArr.eq(i).show();
        }
        // 重置捕食者位置
        $eater.css({
          left: eaterInitLeft,
          top: eaterInitTop
        });
      }
    }
  });

});