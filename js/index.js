$(function(){
    var lists=$('.lists');
    var todo=[];
    if(!localStorage.data){
        localStorage.data=JSON.stringify(todo);
    }else{
        todo = JSON.parse(localStorage.data);
        creat();
    }
    //创建 list
    function creat(){
        lists.empty();
        $.each(todo,function(i,v){
            $('<div class="list"><input type="text" value=""><div class="content"><span>'+v.title+'</span><div class="delete"></div></div><div class="cir"><div class="iconfont icon-wancheng3"></div></div><div class="iconfont1 icon-xiugai2"></div><div class="iconfont icon-wancheng2"></div></div>')
                .addClass(function(){
                    if(v.isFin){
                        return 'move-del';
                    }
                })
                .appendTo(lists);
            $('.lists .list .cir').addClass(function(){
                if(v.isDel){
                    return 'click';
                }
            })
        })
    }
    // 往todo添加数据
    var input=$('.input input');
    function push(){
        // if(input.val()){
            todo.push({title:input.val(),isFin:0,isDel:0});
            localStorage.data=JSON.stringify(todo);
            creat();
        // }
    }
    //点击添加
    var submit=$('.input .icon-tianjia');
    submit.on('touchstart',function(){
        push();
        input.val('');
    })
    //左右滑动
    var left;
    lists.on('touchstart','.list .content',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })
    lists.on('touchend','.list .content',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var i=$(this).closest('.list').index();
        if( n>left && n-left>=50 ){
            $(this).closest('.list').addClass('move-del');
            todo[i].isFin=1;
        }
        if( n<left && left-n>=50){
            $(this).closest('.list').removeClass('move-del');
            todo[i].isFin=0;
        }
        localStorage.data=JSON.stringify(todo);
    })

    //点击每个删除
    lists.on('touchstart','.list .cir',function(e){
        var i=$(this).closest('.list').index();
        var list=$(this).closest('.list');
        if(list.hasClass('click')){
            list.removeClass('click');
            todo[i].isDel=0;
        }else{
            list.addClass('click');
            todo[i].isDel=1;
        }
        localStorage.data=JSON.stringify(todo);
    })


    //设置
    var spans=$('.set span');
    var all=$('.set span:eq(0)');
    var completed=$('.set span:eq(1)');
    var completing=$('.set span:eq(2)');

    all.on('touchstart',function(){
        spans.removeClass('complete');
        $(this).addClass('complete');
        lists.find('.list').removeClass('small');
    })
    completed.on('touchstart',function(){
        spans.removeClass('complete');
        $(this).addClass('complete');
        lists.find('.list').removeClass('small');
        $.each(todo,function(i,v){
            if(!v.isFin){
                lists.find('.list:eq('+i+')').addClass('small')
            }
        })
    })
    completing.on('touchstart',function(){
        spans.removeClass('complete');
        $(this).addClass('complete');
        lists.find('.list').removeClass('small');
        $.each(todo,function(i,v){
            if(v.isFin){
                lists.find('.list:eq('+i+')').addClass('small')
            }
        })
    })

    // 全部删除
    var allDel=$('.set .cir');
    allDel.on('touchstart',function(){
        $(this).closest('.set').toggleClass('click');
        if($(this).closest('.set').hasClass('click')){
            $('.lists .list').addClass('click');
            for(var i in todo){
                todo[i].isDel=1;
            }
        }else{
            $('.lists .list').removeClass('click');
            for(var i in todo){
                todo[i].isDel=0;
            }
        }
        localStorage.data=JSON.stringify(todo);
    })

    // 修改
    lists.on('touchstart','.list .icon-xiugai2',function(){
        var i=$(this).closest('.list').index();
        var input=$(this).closest('.list').find('input');
        $(this).closest('.list').addClass('revise');
        input.val(todo[i].title);
    })
    lists.on('touchstart','.list .icon-wancheng2',function(){
        var i=$(this).closest('.list').index();
        var input=$(this).closest('.list').find('input');
        var content=$(this).closest('.list').find('.content span');
        $(this).closest('.list').removeClass('revise');
        if(!input.val()){
            content.text(todo[i].title);
        }else{
            content.text(input.val());
            todo[i].title=content.text();
            localStorage.data=JSON.stringify(todo);
        }
    })

    //选择删除
    var set=$('.set');
    var deletes=$('.set .icon-shanchu');

    deletes.on('touchstart',function(){
        set.removeClass('click');
        var del=[];
        var sur=[]
        var num=[];
        $.each(todo,function(i,v){
            if(v.isDel){
                del.push(v);
                num.push(i);
            }else{
                sur.push(v);
            }
        })
        for(var i=0;i<num.length;i++){
            lists.find('list').eq(num[i]).addClass('fly');
        }
        todo=sur;
        localStorage.data=JSON.stringify(todo);
        creat();

        console.log(todo)
    })



})