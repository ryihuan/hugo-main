---
title: GD Script教程笔记|Brackeys
date: "2025-09-23"
tags: ["Godot", "GD Script", ]
author: me
draft: false
table-of-contents: true
toc-auto-numbering: true
---
对照Brackeys的教程做的个人学习笔记

<small>本来写在星屑页面上，但觉得搭个博客来写会更好阅读一些，于是就搭了这个博客（？饺子醋）</small>

[YouTube的Brackeys频道](https://www.youtube.com/watch?v=e1zJS31tr88)  
[B站搬运熟肉](https://www.bilibili.com/BV1fx4y1p79u)

## Hello, World！
` func _ready()`
- 节点第一次进入场景时会调用此函数。可以在此放置需要游戏运行时立刻执行的代码。

`pass`
- 意味着什么都不做，出现在尚未填写的函数中

`print("Hello, World!")`
- 控制台会打印输入的信息

- gdscript使用tab缩进来确定代码的结构，并对大小写敏感

## Modifying nodes 1.0
- 调整字体大小：右侧栏-control-theme overrides-font sizes

- 通过脚本来编辑标签：1.引用label；2.获取label中的属性（右侧栏上有，鼠标停留会显示代码）  
引用：可以将左侧栏的laber拖拽到脚本中，通过`.text`来获取text属性  
也可以用这种方法改变其他的东西，如颜色  
有一个叫modulate的属性，可以用来修改立绘和UI的颜色（右侧栏-CanvasItem-Visibility-Modulate）
```gdscript
func _ready() -> void:
	$Label.text = "Hello, World!"
	$Label.modulate = Color.GREEN
```

## Input
- 项目-项目设置-输入映射  
在此可以添加动作，动作允许我们将键位绑定到某些事件上  
命名并添加动作，点击加号输入需要绑定的键位

- 在脚本中，需要创建一个输入函数，输入`func _input`回车，会自动补全  
这个函数会在每次游戏接收任何输入时调用。需要检查触发输入的事件是否是我们按下的操作：  
`if event.is_action_pressed():`括号会弹出可选的目标动作  
假设操作对象是label，需要在按键时将其颜色改为红色，则引用label，  
`$Label.modulate = Color.RED`

- 检查动作何时结束  
`if event.is_action_released():`  
利用相同的代码将颜色改回绿色  
`$Label.modulate = Color.GREEN`

## Variables 1.0
- 变量：保存信息的容器  
例如使用变量保存玩家角色的信息

- 将默认血量设置为100  
`var health = 100`  
然后可以在`_ready()`函数中打印这个变量  
`print(health)`

- 可以对血量进行计算  
```gdscript
health = 40
health = 20+30
health += 20
health -= 10
health *= 4
health /= 2
```

- 写一个每次按键减少血量的脚本
```gdscript
extends Node

var health: int = 100

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("my_action"):
		health -= 10
		print("Health: %d" % health)
```

## If-statements（条件语句）
- if语句检测一个条件是否被满足

- 可以用if语句对变量做出反应，如希望玩家在血量为0时死亡
```gdscript
if health <= 0:
	health = 0
	print("Game Over")
```  
此代码中使用`if health <= 0:`将血量与0比较。  
其他的比较还有：  
x == y 等于  
x > y 大于  
x >= y 大于等于  
x != y 不等于  
x < y 小于  
x <= y 小于等于  

- 可以使用`and`关键词添加另一个条件并确保两者都需要满足  
使用`or`确保只需要满足其中之一条件  
`if x == y or y > z` 

- 还可以使用`else`关键词来定义当条件不满足时发生什么  
```gdscript
else:
	print("You are still alive")
```

- 用`elif`合并else和if语句
```gdscript
if health <= 0:
	health = 0
	print("Game Over")
elif health < 50:
	print("Warning: Low Health")
else:
	print("You are still alive")
```

## Comments
- 在一行的上方或后方对代码进行注释  
`# This is a comment`

- 可以通过在代码前面加"#"暂时删除部分代码的执行  
编程规范：如果注释掉的是代码的话，不要在"#"后加空格  
`#print()`

- 可以选择多行代码，右键单击切换注释（godot内有效，vs code没找到这个功能）  
但：不能有一个完全空白的函数，需要添加关键字`pass`避免报错

## Variables 2.0
- 创建和声明变量时，需要考虑在哪里这样做  
如果在if语句内部声明一个变量，就只能在该if语句里使用该变量。这叫做**SCOPE**（范围）  
如果希望在脚本的各个地方都能读取变量，应该将其放在代码的顶部，在任何函数之外
```gdscript
extends Node

var script_variable = 100

func _ready():
	var ready _variable = 100
```

- gdscript的优点：可以声明变量而无需考虑数据类型
```gdscript
var godot_is_cool = true
var coolness = 9001
coolness = true
```

## DATA TYPES
- 在gdscript中，有四种经典数据类型：  
Boolean/bool（布尔变量）：表示true和false  
integer/int：表示整数  
float：表示小数  
string（字符串）：表示文字

- 从一种类型转为另一种类型：casting（类型转换）  
```gdscript
var number =42
var text = "Meaning of Life: " + str(number)
print(text)
```
通过`str()`将其转化为字符串，输出：Meaning of Life: 42

```gdscript
var pi = 3.14
print(int(pi))
```
将小数输出为整数。需要注意的是它只是去掉了小数点后的数字，不会进行四舍五入。

- 两种常见数据结构：Vector2和Vector3  
Vector2存储两个浮点数：x和y，  
Vector3存储三个浮点数：x和y和z  
```gdscript
var position = Vector3(3, -10, 5)
position.x += 2
print(position)
```

- 默认情况下，gdscript是动态类型，这意味着创建变量时，不需要定义它可以储存什么类型的数据  
然而，它也更容易出现错误，并且它的性能低于静态类型  
但gdscript允许我们定义变量的类型  
`var damage: int = 15`
也可以通过写`:= 15`来让godot自动确认数据类型，这称为推断类型，得出的结果是一样的，godot意识到15是个整数，于是将变量设置为int  
这也意味着该变量不能更改为其他类型。如果尝试将其设置为一个字符串，
```gdscript
var damage := 15

func _ready():
	damage = "A lot!"
```
将会报错。

- 在变量前添加`@export`可以将其暴露在检查器里。  
`@export var damage := 15`  
保存代码并点击左侧栏的节点（Node）,可以在右侧栏检查器中设置变量

![在检查器中设置变量](/w/250903.png)

如果`print(damage)`，可以看到通过检查器设置的值会在游戏中更新。可以按小圆圈恢复到默认值

- constant（常量）：定义一个不想改变的变量  
`const GRAVITY = -9.81`  
使用大写字母表示常量。  
常量不能被改写，否则会报错

## Functions
- 函数是编程的基础，它们允许您将代码捆绑在可重复利用的packages

- `func _ready()` `func _input()` 下划线表明这些函数不是由我们激活或调用的，而是由引擎本身

- 在godot中，可以创建自己的函数  
`func jump()` `func die()` `func shoot()` `func respawn()`

- 开始创建一个函数
```gdscript
func jump():
	#添加向上的力
	#播放声音
	#播放跳跃动画
	print("JUMP!")
```
为了不让每次按下空格就调用这个函数，于是在前面写input函数：
```gdscript
func _input(event):
	if event.is_action_pressed():
		jump()

func jump():
	#添加向上的力
	#播放声音
	#播放跳跃动画
	print("JUMP!")
```

- 在代码中，我们将给函数的输入称为参数（parameters），将输出称为返回值（returns）

- 创建一个将两个数字相加的函数`func add():`，在括号中添加参数`func add(num1, num2):`。在函数中，我们可以将它们加在一起并将它们储存在一个叫result的变量中
```gdscript
func add(num1, num2):
	var result = num1 + num2
	print(result)
```
可以在ready函数中调用add()：
```gdscript
func _ready():
	add(3, 5)
```
运行后会打印出8。

- 但该函数目前并不返回结果，只是打印结果。为了在ready函数访问并调用add函数的结果，我们将add函数的print替换为return。
```gdscript
func add(num1, num2):
	var result = num1 + num2
	return(result)

func _ready():
	var result = add(5, 10)
	print(result)
```

- 利用return还可以做更多的事：
```gdscript
func add(num1, num2):
	var result = num1 + num2
	return(result)

func _ready():
	var result = add(5, 10)
	result = add(result, 10)
	print(result)
```
打印25。

- 和声明变量时一样，也可以定义函数的参数和返回类型  
`func add(num1: int, num2: int) -> int:`  
使用箭头`->`来设置返回值类型

## Random numbers
- 函数randf给出0-1之间的随机数，非常适合为代码分配概率。（抽卡）
```gdscript
func _ready():
	var roll = randf()
	if roll <= 0.8:
		print("Common item")
	elif roll <= 0.95:
		print("Rare item")
	else:
		print("Legendary item")
```
<small> (真的没问题吗用这个代码抽了十次出了四次rare )</small>

- **（试着结合目前学的写了个按下按键抽卡的代码：**
```gdscript
extends Node

var roll: float = 0.0
var item_type: String = ""

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("my_action"):
		roll = randf()
		if roll <= 0.8:
			item_type = "Common item"
		elif roll <= 0.95:
			item_type = "Rare item"
		else:
			item_type = "Legendary item"
		print(item_type)
```
- 还可以使用`randf_range()`和`randi_range()`来得到一个指定范围内的随机整数或小数  
比如给角色随机生成身高可以用  
```gdscript
var character_height = randi_range(140, 210)
print("Your character is " + str(character_height) + "cm tall.")
```
- **GD的官方文档和编辑器是连着的。**  
这意味着按住ctrl并单击代码中想要了解更多信息的内容，它会在编辑器中直接打开官方文档

*未完待续*