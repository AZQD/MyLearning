$(function() {
    var initSecond = 3;
    var currentSecond;
    var stock = 3;
    var minStock = 2;
    var maxStock = 9;
    var paramN = Number(getParamByUrl('n'));
    if (paramN && paramN >= minStock && paramN <= maxStock) {
        stock = paramN
    }
    $('#currentTitle').html(stock + 'X' + stock);
    $('#maxNumber').html(stock * stock);
    var beginTime;
    var endTime;
    var enterKeyCodeBtn = 1;
    var focusedOne = true;
    var initKeyCodeFocus = false;
    $('.index-wrapper .part1-box').unbind('click').bind('click', function() {
        console.log('enterKeyCodeBtn', enterKeyCodeBtn);
        enterKeyCodeBtn = 2;
        gameFun()
    });
    $(document).keyup(function(e) {
        if (enterKeyCodeBtn === 1) {
            var e = e || event;
            console.log('enterKeyCodeBtn', enterKeyCodeBtn);
            if (e.keyCode === 13 || e.keyCode === 23) {
                enterKeyCodeBtn = 2;
                focusedOne = false;
                initKeyCodeFocus = true;
                gameFun()
            }
        }
    });
    $('.index-wrapper .part3-box .jump-ctrl .left').unbind('click').bind('click', function() {
        enterKeyCodeBtn = 1;
        $('.index-wrapper .part-box').hide().eq(0).show()
    });
    $(document).keyup(function(e) {
        if (enterKeyCodeBtn === 3) {
            var e = e || event;
            console.log('enterKeyCodeBtn', enterKeyCodeBtn);
            if (e.keyCode === 4 || e.keyCode === 27) {
                enterKeyCodeBtn = 1;
                $('.index-wrapper .part-box').hide().eq(0).show()
            }
        }
    });
    $('.index-wrapper .part3-box .jump-ctrl .right').unbind('click').bind('click', function() {
        console.log('enterKeyCodeBtn', enterKeyCodeBtn);
        enterKeyCodeBtn = 2;
        $('.index-wrapper .part-box').hide().eq(1).show();
        gameFun()
    });
    $(document).keyup(function(e) {
        if (enterKeyCodeBtn === 3) {
            var e = e || event;
            console.log('enterKeyCodeBtn', enterKeyCodeBtn);
            if (e.keyCode === 13 || e.keyCode === 23) {
                enterKeyCodeBtn = 2;
                $('.index-wrapper .part-box').hide().eq(1).show();
                gameFun()
            }
        }
    });

    function gameFun() {
        currentSecond = initSecond;
        $('#item-ul').empty();
        $('.index-wrapper .part2-box .part2-warp .count-box .count').html(initSecond);
        $('.index-wrapper .part-box').hide().eq(1).show();
        $('.index-wrapper .part2-box .part2-warp .part2-middle').hide().eq(0).show();
        var timer = setInterval(function() {
            currentSecond--;
            if (currentSecond === 0) {
                clearInterval(timer);
                currentSecond = initSecond;
                var numbersArr = [];
                for (var i = 0; i < stock * stock; i++) {
                    numbersArr.push(i + 1)
                }
                numbersArr = numbersArr.sort(function(a, b) {
                    return 0.5 - Math.random()
                });
                numbersArr = numbersArr.sort(function(a, b) {
                    return 0.5 - Math.random()
                });
                numbersArr = numbersArr.sort(function(a, b) {
                    return 0.5 - Math.random()
                });
                for (var j = 0; j < stock * stock; j++) {
                    $('#item-ul').append('<div class="item-li" num=' + numbersArr[j] + '>\n<div class="item-li-num">' + numbersArr[j] + '</div>\n</div>')
                }
                $('.index-wrapper .part2-box .part2-warp .part2-middle').hide().eq(1).show();
                var finalNeedLenTh;
                var itemUlWidth = parseInt($('#game-box').width());
                var itemClientHeight = $(window).height() - $('#tips-box').height() - $('#ctrl-box').height();
                var currentNumFontSize = 1;
                if (itemUlWidth >= itemClientHeight) {
                    finalNeedLenTh = itemClientHeight - 50;
                    if (stock > 4) {
                        currentNumFontSize = 0.1
                    }
                } else {
                    finalNeedLenTh = itemUlWidth;
                    if (stock > 5) {
                        currentNumFontSize = 0.5
                    }
                }
                $('#game-box').width(finalNeedLenTh).css('margin', '0 auto');
                var $itemLi = $('.index-wrapper .part2-box .part2-warp .game-box .item-ul .item-li');
                console.log(123, currentNumFontSize);
                $itemLi.css({
                    'width': finalNeedLenTh / stock + 'px',
                    'height': finalNeedLenTh / stock + 'px',
                    "fontSize": currentNumFontSize + 'rem'
                });
                beginTime = new Date();
                var clickOne = true;
                var currentNum = 1;
                var focusedItemIndex = 0;
                $itemLi.unbind('click').bind('click', function() {
                    focusedOne = false;
                    focusedItemIndex = $(this).index();
                    $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused');
                    checkItem($(this))
                });
                if (initKeyCodeFocus) {
                    $itemLi.removeClass('focused').eq(0).addClass('focused')
                }
                $(document).keyup(function(e) {
                    if (enterKeyCodeBtn === 2) {
                        if (focusedOne) {
                            focusedOne = false;
                            focusedItemIndex = 0;
                            $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused')
                        } else {
                            var e = e || event;
                            if (e.keyCode === 37) {
                                if (focusedItemIndex === 0) {
                                    focusedItemIndex = stock * stock - 1
                                } else {
                                    focusedItemIndex--
                                }
                                $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused')
                            }
                            if (e.keyCode === 39) {
                                if (focusedItemIndex === stock * stock - 1) {
                                    focusedItemIndex = 0
                                } else {
                                    focusedItemIndex++
                                }
                                $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused')
                            }
                            if (e.keyCode === 38) {
                                if (focusedItemIndex - stock < 0) {
                                    focusedItemIndex = (focusedItemIndex + stock * (stock - 1))
                                } else {
                                    focusedItemIndex -= stock
                                }
                                $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused')
                            }
                            if (e.keyCode === 40) {
                                if (focusedItemIndex + stock >= stock * stock) {
                                    focusedItemIndex = (focusedItemIndex + stock - stock * stock)
                                } else {
                                    focusedItemIndex += stock
                                }
                                $itemLi.removeClass('focused').eq(focusedItemIndex).addClass('focused')
                            }
                            if (e.keyCode === 13 || e.keyCode === 23) {
                                checkItem($itemLi.eq(focusedItemIndex))
                            }
                        }
                    }
                });

                function checkItem(thisItem) {
                    if (clickOne) {
                        if (parseInt(thisItem.attr('num')) === 1) {
                            clickOne = false;
                            currentNum++;
                            thisItem.addClass('checked')
                        }
                    } else {
                        if (parseInt(thisItem.attr('num')) === currentNum) {
                            currentNum++;
                            thisItem.addClass('checked');
                            if (currentNum > stock * stock) {
                                endTime = new Date();
                                $('.index-wrapper .part3-box .time .time-num').html((endTime - beginTime) / 1000);
                                setTimeout(function() {
                                    enterKeyCodeBtn = 3;
                                    console.log('enterKeyCodeBtn', enterKeyCodeBtn);
                                    $('.index-wrapper .part-box').hide().eq(2).show()
                                }, 0)
                            }
                        }
                    }
                    console.log('enterKeyCodeBtn', enterKeyCodeBtn)
                }
            } else {
                $('.index-wrapper .part2-box .part2-warp .count-box .count').html(currentSecond)
            }
        }, 1000)
    }
});