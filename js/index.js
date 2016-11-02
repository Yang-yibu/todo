

/*question
 * 点击add 生成的todo ? 变为全局变量最后一个值覆盖前边的
 * 左划右划是，todos为什么不用获取转化数据    全局变量？的原因
 */

/*全局变量的数组
 
 * 记录触摸起始位置
 * todos 长什么样？  [ {name: "买房", 0}, {} ]
 * var c = (todo.)? "done": "";
 * 
 * 右划 ----完成
 * ----todos[].stste = 
 * 左划----未完成*/
$(function(){
	var add = $(".add");
	
	var todos = [];
	
	if(localStorage.todos){
		todos = JSON.parse(localStorage.todos);
		render();
	}
	
	
	add.on("click", function(){
		var v = $("input").val();
		$.trim(v);  //去除开头结尾的空
		if(!v){
			return;
		}
		var todo = {name:"", state: 0}; 
		todo.name = v;
//		render()
		$("<li><div class='content'>"+v+"</div><div class='delete'></div></li>").appendTo(".ul");
		todos.push(todo);
		localStorage.todos = JSON.stringify(todos);
		$("input").val("");  //去除上一次输入的内容，相当于焦事件
	});
	

	
	var start;
	$(".ul").on("touchstart", "li", function(e){
		start = e.originalEvent.changedTouches[0].clientX;
	});
	var end;
	$(".ul").on("touchend", "li", function(e){
		end = e.originalEvent.changedTouches[0].clientX;
		if(end - start > 50){
//			todos = JSON.parse(localStorage.todos);
			$(this).addClass("done");
			todos[ $(this).index() ].state = 1;
		}
		if(end - start < -50){
//			todos = JSON.parse(localStorage.todos);
			$(this).removeClass("done");
			todos[ $(this).index() ].state = 0;
		}
		localStorage.todos = JSON.stringify(todos);
	});
	
//delete
	$(".delete").click(function(){
		var index = $(this).closest("li").index()
		todos.splice(index, 1);
		localStorage.todos = JSON.stringify(todos);
		$(this).closest("li").hide();
		console.log(index)
	})
	
//渲染
	function render(){
//		$(".ul").empty();
		for(var i = 0; i<todos.length; i++){
			var c = (todos[i].state)? "done": "";
			$("<li class="+c+"><div class='content'>"+todos[i].name+"</div><div class='delete'></div></li>").appendTo(".ul");
		}
	}
});