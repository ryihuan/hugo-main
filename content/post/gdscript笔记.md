---
title: GD Script学习笔记（教程 by Brackeys）
description: 对照Brackeys的GD Script视频教程做的个人学习笔记
date: "2025-09-23"
tags: ["Godot", "GD Script", ]
categories: ["note"]
draft: false
---
_本来写在星屑页面上，但觉得搭个博客来写会更好阅读一些，于是就搭了这个博客（？饺子醋）_

教程来源：  

[YouTube-Brackeys: How to program in Godot - GDScript Tutorial](https://www.youtube.com/watch?v=e1zJS31tr88)  
<details><summary>B站搬运熟肉</summary>
{{<bilibili BV1fx4y1p79u 0 1 >}}</details>

## Hello, World！
- ` func _ready()`  
    节点第一次进入场景时会调用此函数。可以在此放置需要游戏运行时立刻执行的代码。

- `pass`  
    意味着什么都不做，出现在尚未填写的函数中

- `print("Hello, World!")`  
    控制台会打印输入的信息

- gdscript使用tab缩进来确定代码的结构，并对大小写敏感

## Modifying nodes 1.0（修改节点1.0）
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
    ```  
    x == y 等于  
    x > y 大于  
    x >= y 大于等于  
    x != y 不等于  
    x < y 小于  
    x <= y 小于等于  
    ```

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

    ![在检查器中设置变量](/p/250903.png)

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
## Arrays
- 数组：可以容纳多个事物的变量。可以用于存储整个元素列表。

- 制作一个用于保存玩家物品的列表：  
    `var items = ["Potion", 3, 6]`  
    GD Script的列表可以包含不同类型的变量。

    但如果想将数组限制为特定类型，我们可以进行定义:  
    `var items: Array[String] = ["Potion", "Feather", "Stolen harp"]`

- 使用索引来访问数组中的元素：当你向数组添加一个元素时，它会根据它在数组中的位置自动分配一个数字。  
    如在`var items: Array[String] = ["Potion", "Feather", "Stolen harp"]`中，三个元素的索引依次为0、1、2。  

    因此，要想访问并打印数组中的第一个元素：
    ```gdscript
    var items: Array[String] = ["Potion", "Feather", "Stolen harp"]
    print(items[0])
    ```
    打印出`Potion`。

- 更改元素：
    ```gdscript
    var items: Array[String] = ["Potion", "Feather", "Stolen harp"]
    items[1] = "Smelly Sock"
    items[2] = "Staff"
    ```

- 查找、删除或添加新元素：
    ```gdscript
    items.remove_at(1) # 删除索引为1的元素
    items.append("Overpowered Sword") # 添加新元素（将被加到列表的最后）
    ```

- 数组有时会变得很长很难管理。可以用循环（Loops）来帮助解决这个问题。

## Loops
- 循环允许我们多次重复代码，可以用来逐个访问列表中的元素。

    比如打印`var items: Array[String] = ["Potion", "Feather", "Stolen harp"]`列表中的所有元素，可以用for循环：
    ```gdscript
    for item in items:
        print(item)
    ```

    添加更多功能，如仅打印长度超过六个字母的物品：
    ```gdscript
    for item in items:
        if item.length() > 6:
            print(item)
    ```
    这将只会打印`Stolen harp`。

- 创建会运行一定次数的代码循环：
    ```gdscript
    for n in 8:
        print(n)
    ```
    打印出的变量n将从0开始一直增加到7（运行了8次）。我们说n是for循环的当前循环。

- while循环：只要满足特定条件就会一直重复此过程的循环。

    如使用while循环使玻璃杯装满半杯水：
    ```gdscript
    var glass := 0.0

    while glass < 0.5:
        glass += randf_range(0.01, 0.2)
        print(glass)
        
    print("The glass is now half full!")
    ```
    以下是一次运行的结果：  
    ```
    0.18732265214986  
    0.30365408708942  
    0.37735687756539  
    0.46053994937302  
    0.6523261380621  
    The glass is now half full!
    ```
- 使用while循环时，注意不要创建无限循环。这容易导致程序崩溃。  
    如注释掉上面的代码中往杯子里添加随机数的一行，运行后将无限输出0并报错，godot可能会无法响应。

- 使用`break` `continue`关键字：  
    `break`：跳出循环并继续执行后面的代码  
    `continue`：立即跳到循环的下一次迭代

    如果想要检查杯子是否被倒了20%满：
    ```gdscript
    var glass := 0.0

    while glass < 0.5:
        glass += randf_range(0.01, 0.2)

        if glass > 0.2:
            break
                
        print(glass)

    print("The glass is now half full!")
    ```
    运行结果：  
    ```
    0.0389682989115  
    0.09942385229739  
    The glass is now half full!  
    ```

- 虽然数组非常适合储存元素列表，但有时使用索引访问每个元素会容易搞混，有时用字典更合适
## Dictionaries
- 字典会保存很多对的“索引（key）”和“数值（value）”。  
    key：想要查找的词  
    value：这个词的定义

- 创建空字典：`var my_dict = {}`  

    可以在大括号内添加“键值对（key-value pairs）”  
    例如：游戏中有多名玩家，使用字典来跟踪他们  
    key：用户名；value：等级
    ```gdscript
    var players = {
        "Crook": 1, 
        "Villain": 35, 
        "Boss": 100,
    }
    ```
    要想获取玩家的等级，只需输入用户名即可  
    `print(players["Villain"])

- 分配新值或添加条目
    ```gdscript
    players["Villain"] = 50
    players["Dwayne"] = 999
    ```
- 像数组一样，可以用`for循环`遍历字典。这样做时实际上是在循环所有字典中的key，即用户名。
    ```gdscript
    for username in players:
        print(username + ": " + str(players[username]))
    ```
    这样会打印出整个字典：
    ```
    Crook: 1
    Villain: 50
    Boss: 100
    Dwayne: 999
    ```
- 就像数组一样，可以在同一个字典中拥有多种数据类型的键和值  
    甚至可以数组套数组，或者字典套字典
- 比如不仅想存储玩家的等级，还想存储其他信息（如生命值），只需用另一个字典来替换值即可：
    ```gdscript
    var players = {
        "Crook": 	{"Level": 1, "Health": 80}, # 使用缩进来保持代码简洁
        "Villain":	{"Level": 50, "Health": 150}, 
        "Boss": 	{"Level": 100, "Health": 500},
    }
    ```
    现在我们可以使用两个键来访问一个值：
    `print(players["Boss"]["Health"])`
    打印出500。  
    这样我们就可以想办法构建有关游戏中正在发生的情况的数据，例如玩家统计数据、库存、增益等。
## Enums
- 枚举：在游戏中定义标签和状态的便捷方法  

    假设我们正在制作游戏，游戏里有一堆单位，我们需要一种方法将每个单位标记为敌对、中立或盟友。可以创建一个定义这些标签的枚举。  
    在脚本顶部（进入节点和func_ready中间）写一个enum：
    `enum { ALLY, NEUTRAL, ENEMY }`  
    现在我们可以在游戏中使用这些状态。  

- 例如，我们可以创建一个名为“单位势力（unit_alignment）”的变量，并设置它等于上述状态中的哪一个：  
    `var unit_alignment = ALLY`

- 给enum命名，让代码井井有条：  
    `enum Alignment { ALLY, NEUTRAL, ENEMY }`    
    这时要访问这个枚举必须要进入势力枚举：  
    `var unit_alignment = Alignment.ALLY`

- 选择`Alignment.ALLY`作为默认值。在`ready内部`，可以检查单位势力是否等于`Alignment.ENEMY`。
    ```gdscript
    extends Node

    enum Alignment { ALLY, NEUTRAL, ENEMY }

    var unit_alignment = Alignment.ALLY

    func _ready() -> void:
        if unit_alignment == Alignment.ENEMY:
            print("You are not welcome here.")
        else:
            print("Welcome.")
    ```
    打印出"Welcome."，因为我们的部队目前是盟友

- 使用枚举要比使用字符串或整数来表示状态更安全，因为这样拼错了的话godot会报错

- 可以把枚举用在`@export`变量里：
    把`var unit_alignment = Alignment.ALLY`改为：`@export var unit_alignment : Alignment`，现在我们可以在右边栏检查器中设置我们的单位势力。  
    ![1](/p/251009.png)  
    如果在检查器中将势力设置为敌人，将会打印出"You are not welcome here."

- 上述的幕后实际是godot为正在枚举的每一个状态创建了一个常量：
    ```gdscript
    enum Alignment { ALLY, NEUTRAL, ENEMY }

    const ALLY = 0
    const NUETRAL = 1
    const ENEMY = 2

    @export var unit_alignment : Alignment
    ```
    所以枚举本质上是一堆值不断增加的常量。  
    如果我们打印这些状态中的一个：
    ```gdscript
    extends Node

    enum Alignment { ALLY, NEUTRAL, ENEMY }

    @export var unit_alignment : Alignment

    func _ready() -> void:
        print(Alignment.ENEMY)
    ```
    打印出2，即godot后台为第三个状态ENEMY设置的常量的值。

- 如果需要的话，我们甚至可以覆盖godot设置的默认值。如：
    `enum Alignment { ALLY = 1, NEUTRAL = 0, ENEMY = -1 }`

- 有了枚举之后，我们可以使用`match`语句。  
    match语句方便我们为每一个枚举状态使用不一样的代码

## Match
- Match（匹配）：相当于其他语言中的`switch`语句，允许我们根据变量的值执行不同的代码
- 可以使用match语句为枚举的不同值添加一些代码：  
    ```gdscript
    extends Node

    enum Alignment { ALLY, NEUTRAL, ENEMY }

    @export var my_alignment : Alignment

    func _ready() -> void:
        match my_alignment:
            Alignment.ALLY:
                print("Hello, friend!")
            Alignment.NEUTRAL:
                print("I come in peace!")
            Alignment.ENEMY:
                print("TASTE MY WRATH!")
            _: # 设置默认值，即不是上述任何一种情况时
                print("Who art thou?")
    ```
## Modifying nodes 2.0（修改节点2.0）
- 到目前为止，当我们需要访问节点时，我们是通过以下方式完成的：  
    将其拖动到脚本中，这会创建一个美元符号，后面跟着节点的路径  
    ![2](/p/25100902.png)![3](/p/25100903.png)  
    实际上，我们可以将此路径存储在变量中，只需将其拖至顶部并按住`Ctrl`键释放即可。这会自动创建一个带有节点名称和正确路径的变量：  
    `@onready var weapon = $Player/Weapon`
    godot对节点的创建有非常严格的顺序。如果我们打开游戏并尝试在武器节点被创建之前找到它，将会报错。`@onready`确保godot会等待所有子节点都被创建后再访问，这样就不会报错了。（即预加载）

- 美元符号`$`实际上是使用`get_node`函数的简写：  
    `@onready var weapon = $Player/Weapon` = `@onready var weapon = get_node(Player/Weapon)`

- 路径是相对的。我们的脚本位于主节点上，因此它在该节点之后立即启动。当然也可以在脚本里获取绝对路径：  
    `print(Weapon.get_path())`  
    这会打印从根节点开始到武器的绝对路径：`/root/Main/Player/Weapon`

- 路径对很多事情来说很有用，但有时也有点不灵活：  
  1. 如果重命名路径中的任何节点，路径就会失效。  
  2. 路径一般只用于访问子节点。  
  幸运的是，我们可以用`@export`关键字来引用其他节点：  
  `@export var my_node: Node`  
  然后在检查器中，我们可以为它分配我们想要的任何节点，或者只需要单击左侧栏中的节点名称并拖动到检查器上即可  
  ![5](/p/25100904.png)

- 我们还可以使用`is`关键字检查节点是否是某种类型：  
    ```gdscript
    extends Node

    @export var my_node: Node

    func _ready():
        if my_node is Node2D:
            print("Is 2D!")
    ```

- 我们甚至可以声明我们希望能够引用什么类型的节点。  
    例如我们只想引用立绘节点（sprite node），只需将类型改为`Sprite2D`：  
    `@export var my_node: Sprite2D`    
    这时在检查器中重置变量，现在只能给它分配立绘节点了。  
    这时运行游戏，仍然会打印出“Is 2D!”，这是因为`Sprite2D`继承自`Node2D`

## Signals
- 信号：节点可以互相发送的信息。用来通知发生了某个事件。

- Godot有很多内置信号。在右侧栏节点可以查看和连接信号。  
    信号连接成功时，脚本会多出一行函数并显示绿色箭头表示连接成功。  
    点击绿色箭头可以查看信号源。

- 可以为一个信号连接任意数量的函数，当信号发射时，所有函数都会被调用。  
    这允许我们以一种无需相互了解的方式将节点链接在一起。  
    按钮只需要发射信号，不需要了解哪些函数连接到了该信号。  
    这使得信号很适合和用于模块化的游戏。（called `Decoupling`: 去耦 / 解耦）

- 使用例：  
    假设我们正在扮演一个能够获得Xp并升级的角色，当升级时可能会有很多游戏系统需要更新：UI、数值、咒语、成就系统  
    从玩家脚本中调用这些内容会变得一团糟。  
    相反，可以创建一个名为`leveled_up`的信号，所有的系统都可以连接到这个信号，玩家升级时发出这个信号：
    ```gdscript
    signal leveled_up

    func level_up():
        # code here
        leveled_up.emit()
    ```
    在Node节点`Main`下添加子节点`Timer`，设置Timer的参数为Wait Time: 1；Autostart: on。  
    这样它会计时1秒，并当秒数归零时发出`_timed_out()`信号。  
    接入信号到Main节点：  
    ```gdscript
    extend Node

    var xp := 0

    func _on_timer_timeout():
        xp += 5
        print(xp)
        if xp >= 20:
            xp = 0
    ```
    运行时每秒经验+5，达到20后归零。  

    现在我们创建一个其他节点可以连接的信号。在顶部写`signal leveled_up()`，保存，可以看到主节点多了一个leveled_up()信号。  
    对于本示例，我们将其连接回Main节点。这会创建一个`_on_leveled_up()`函数，当信号发出时调用。
    ```gdscript
    extend Node

    signal leveled_up()

    var xp := 0

    func _on_timer_timeout():
        xp += 5
        print(xp)
        if xp >= 20:
            xp = 0
            leveled_up.emit()

    func _on_leveled_up():
        print("DING!")
    ```
    现在，达到20Xp时会发出信号并打印"DING!"

- 也可以通过代码来连接信号：  
    ```gdscript
    func _ready():
        leveled_up.connect(_on_leveled_up)
    ```
    断开连接：把`connect`改为`disconnect`即可。

- 也可以通过信号传递参数：  
    ```gdscript
    extend Node

    signal leveled_up(msg) # 括号内添加参数名

    var xp := 0

    func _ready():
        leveled_up.connect(_on_leveled_up)

    func _on_timer_timeout():
        xp += 5
        print(xp)
        if xp >= 20:
            xp = 0
            leveled_up.emit("GZ!") # 发出信号时参数的信息

    func _on_leveled_up():
        print(msg) # 不再打印ding，而是打印参数
    ```
## Get… Set… GO!
- Getter和Setter允许我们在变量更改时添加代码。  
    这意味着我们可以在修改或读取变量时做一些事情，例如将值限制在一定范围内或发出信号，让其它部分的代码知道变量发生了变化。
### Setter
- 常见例子：生命值  
  1. 限制生命值变量的范围：  
    ```gdscript
    var health := 100: # 添加生命值变量，默认为100
        set(value): # 命名被传入的值为value，即试图将变量更改为这个value值
            health = clamp(value, 0, 100) # 使用clamp()函数将生命值限制在0-100之间
    ```  
  2. 创建信号：  
    ```gdscript
    signal health_changed(new_health) # 创建生命值发生变化信号，输入新的生命值作为参数

    var health := 100: 
        set(value): 
            health = clamp(value, 0, 100) 
            health_changed.emit(health) # 信号释放时，改变生命值

    func _ready():
        health = -150 # 分配生命值-150

    func _on_health_changed(new_health): #连接信号并打印新的生命值
        print(new_health)
    ```
    运行后，会打印出0，  
    这是因为-150被限制在0-100之间，然后发出信号，信号会调用`_on_health_changed()`函数并打印新的生命值。
### Getter
- 常用于转换值。  
    ```gdscript
    var chance := 0.2
    var chance_pct: int: # 设置变量：机会百分比数
        get:
            return chance * 100

    func _ready():
        print(chance_pct)
        chance = 0.6
        print(chance_pct)
    ```
    打印出20、60。即`机会百分比变量完全取决于机会变量是多少`。  

    加入Setter：
    ```gdscript
    var chance := 0.2
    var chance_pct: int: 
        get:
            return chance * 100
        set(value):
            chance = float(value) / 100.0 # 注意由于chance是小数，因此要确保value也是小数

    func _ready():
        print(chance_pct)
        chance_pct = 40 # 现在可以直接通过修改机会百分比改变机会变量了。
        print(chance_pct)
    ```
    打印出20、40。  
    由于加入了Setter，`chance_pct`的value修改时，触发Setter：重新计算chance。  
    由于执行`print(chance_pct)`，为了获取`chance_pct`的值，再走一遍Getter：返回chance的值乘以100，因此第二个打印的值是40。
## Classes
- GD Script是一门面向对象的编程语言，这意味着我们通常尝试在包含的对象内构建代码，然后让它们彼此相互作用。我们主要使用`Classes`来完成此操作。

- 例：我们在制作一款RPG游戏，我们需要创建一堆可以互动的角色。因此我们创建一个角色类，这个类含有一些游戏中所有角色都应该具备的变量和逻辑：  
    |VARIABLES|FUNCTIONS|
    |---|---|
    |name|talk()|
    |health|die()|
    |dialogue|  

    我们获取这个类并创建实例（INSTANCES）。

- 实例是该类的特定版本。我们可以创建一个叫`POTION SELLER`的实例，`health = 50`，`talk("You can't handle my strongest potions!")`  
    你还可以创建更多别的实例，所有实例拥有相同的变量，但值不同：
    |INSTANCES|POTION SELLER|EX-ADVENTURER|KNIGHT|
    |---|---|---|---|
    |VARIABLES|health = 50|health = 30|health = 130|
    |FUNCTIONS|talk("You can't handle my strongest potions!")|talk("I used to be an adventurer like you!")|die()|

- 实际上你已经在Godot中遇到一堆类了。这是因为Godot的内置节点是类。所有的节点都是具有一堆变量和逻辑的自包含对象（Self-contain object），我们可以创建它们的实例。 <small>（这句机翻好奇怪但我也不知道怎么翻，后半句是从句- - All the nodes are… that we can create instances of. ）</small>  
    如果我们添加一个`SpriteNode`，我们就实例化了`Sprite`类。所以我们创建一个脚本的同时，我们也是在创建一个类。`（在技术上不是在创建一个类，但它的工作方式与类一样）`

- 在主节点下添加子节点`Character`。现在，为了更清楚地表明我们的脚本是一个定义角色的类，设置类名为"Character"：  
    ```gdscript
    class_name Character #注意C大写

    extends Node

    @export var profession : String #在检查器中加入变量：职业（字符串）
    @export var health: int #生命值：整数
    ```
    ![1](/p/251016.png)  
    我们可以通过复制此节点来创建更多实例。  
    <details><summary>此处弹幕讨论</summary>
    {{<chat position="left" name="弹幕">}}
    这么做的意义是什么？不能直接用字典吗？
    {{</chat>}}
    {{<chat position="left" name="弹幕">}} 
    字典只是一个索引，可以存放角色的基本信息但是功能性的逻辑还是要靠函数来实现啊。要写函数就得进脚本。
    {{</chat>}}
    {{<chat position="left" name="弹幕">}} 
    类是面向对象最重要的概念之一。类比下，类是蓝图，我们可根据蓝图，创造蓝图设计范围内的各式各样的实体。字典的主要功能仅是存储数据，而类则是创建新的实体（对象）。并且由于继承和多态的存在，有很多花活可整
    {{</chat>}}
    {{<chat position="left" name="弹幕">}} 
    字典内数据不方便改动和操作，所以倾向于放静态数据，类成员里面可以进行大量逻辑和数据的内容，放动态数据比较好。
    {{</chat>}}
    </details>

- 我们还可以给这个脚本一个函数：  
    ```gdscript
    class_name Character 

    extends Node

    @export var profession : String 
    @export var health: int 

    func die():
        health = 0
        print(profession + "died.")
    ```
    这就是我们的角色类，但目前还没有任何东西触发添加的这个函数。  

- 让我们进入主节点，在这里我们可以设置引用角色并调用die函数。  
    简单地把角色节点拖动到脚本中引用是可以的，但因为我们已经命名了角色类，因此可以使用`@export`关键词作为替代。  
    这样我们就可以在编辑器中建立连接，而不用担心路径改变的问题。
    ```gdscript {title="Main.gd"}
    extends Node

    @export var character_to_kill: Character

    func _ready():
        character_to_kill.die()
    ```
    保存后可以看到主节点检查器中可以选择哪个角色被杀死。

## Inner classes
- 内部类：存在于另一个类中的类。  
    主要被用来将变量捆绑在一起，也可以添加一点函数  
    内部类可以很好地替代字典，因为使用起来更安全

- 假设往角色类中添加一些装备（equipment），我们可以创建一个名为Equipment的内部类。
    ```gdscript {title="character.gd"}
    class_name Character 

    extends Node

    class Equipment:
        var armor := 10
        var weight := 5
    ```
    现在我们可以在脚本中使用Equipment内部类，利用它创建一些变量：  
    ```gdscript {title="character.gd"}
    class_name Character 

    extends Node

    var chest := Equipment.new() # 调用.new将创建一个Equipment类的实例
    var legs := Equipment.new()

    class Equipment:
        var armor := 10
        var weight := 5
    ```
    在`_ready`函数中可以访问这些类：  
    ```gdscript {title="character.gd"}
    class_name Character 

    extends Node

    var chest := Equipment.new() # 调用.new将创建一个Equipment类的实例
    var legs := Equipment.new()

    func _ready():
        chest.armor = 20
        print(chest.armor)
        print(legs.weight)

    class Equipment:
        var armor := 10
        var weight := 5
    ```
    这比使用字典更安全，因为GD Script会识别Equipment类中有一个weight变量，打错字可以在运行游戏之前报错。这被称为`类型安全（Type Safe）`。  
    
    保存并运行，可以看到每一个角色中的实例（即先前复制的角色节点）都将打印这两件装备。

## Inheritance
- 继承关系：从一个类中衍伸出另一个类的能力。  
    
    实际上我们已经在这么做了：脚本中的`extends Node`，即该脚本衍伸自Node类（在上节已学过Godot的节点本质上是类），意味着Node类的函数和变量也可以在脚本中使用

    Godot的可视化：可以查看节点的继承信息，甚至可以在列表中找到刚创建的Character类。这是因为当创建Character类时，本质上是在定义一个新的节点类型。  
    ![3](/p/25101703.png)
- 在实际使用中，需要确保脚本继承自正确的类，这样才能确保我们实现想要的目的  
  
    比如我们正在制作一个让玩家移动的脚本：  
    创建`CharacterBody2D`节点并添加脚本，脚本会自动`extends CharacterBody2D`。  
    现在我们可以访问这个节点中的所有功能（functionality），例如：`velocity` `move_and_slide()`（这个函数可以让节点在空间中移动）

## Composition
- 组合结构：尽管Godot对它的节点使用了继承关系，但还有更好的构建代码的方法。  
    Godot实际上非常倾向于使用另一种叫做组合结构的方式。

    Brackeys推荐的讲解Composition的频道：
    [YouTube-Bitlytic: How You Can Easily Make Your Code Simpler in Godot 4](https://www.youtube.com/watch?v=74y6zWZfQKk)
    <details><summary>B站搬运熟肉</summary>
    {{<bilibili BV1oz4y1N7WX 0 1>}}</details>

    _直接把笔记做在一起了吧_
- Inheritance（继承）和Composition（组合）是编程中常用的两种技巧，可以最大程度地复用代码。  
    虽然继承用得比较多，但很多情况下使用组合会更好。
- 例：创建Player和Enemy：
    |Player|Enemy|
    |---|---|
    |Attack|Attack|
    |Health|Health|
    |Hitbox|Hitbox|
    |User Input|AI Stuff|
- 如果使用继承，我们会把attack、health、hitbox抽象出来封到独立的类中。  
    暂且叫这个类Entity（实体），玩家和敌人都将继承这个类：
    <div style="display: flex; gap: 20px; justify-content: space-between;">

    <div style="flex: 1;">

    |Entity| 
    |---|
    |Attack| 
    |Health|
    |Hitbox|
    </div>
    <div style="flex: 1;">
    
    |Player|
    |---|
    |User Input|

    |Enemy|
    |---|
    |AI Stuff|
    </div>
    </div>
    这就将代码放在了一起，修改代码会同时影响玩家和敌人，而不需要在每一个类中慢慢改  

    如果只是这样，继承简直是完美方案，  
    但假如我们再定义一棵树，它也可以承受伤害，因此我们让它继承Entity类，然而这样会导致一些小问题：  
    它确实是有生命值和碰撞箱了，但它也具有了攻击的能力

    更大的问题是，玩家和敌人都是`CharacterBody2D`节点，而树是`StaticBody2D`节点，而在Godot中是不允许同时继承多个类的。  
    因为玩家和敌人是`CharacterBody2D`，那么Entity类也需要继承`CharacterBody2D`，这会导致树也得是`CharacterBody2D`的
- 如果使用组合，不抽象为一个大类（super class），而是使用多个组件（Components）:  
    | Components |
    | ------ |
    | AttackComponents |
    | HealthComponents |
    | HitboxComponents |

    <div style="display: flex; gap: 20px; justify-content: space-between;">

    <div style="flex: 1;">

    | Player     |
    | ---------- |
    |Attack| 
    |Health|
    |Hitbox|
    | User Input |
    </div>
    <div style="flex: 1;">

    | Enemy    |
    | -------- |
    |Attack| 
    |Health|
    |Hitbox|
    | AI Stuff |
    </div>
    <div style="flex: 1;">

    |Tree|
    |---|
    |Health|
    |Hitbox|

    </div>
    </div>
    组件对继承的类没有要求，可以各取所需。  

    在这个例子中使用组件比使用继承好得多，  
    但也有比较麻烦的事，比如怎么让碰撞箱检测到生命值组件以发送受伤信息，但这是值得的  

    在Godot中，这些组件都可以被处理为子节点，可以任意地添加到需要的节点中
    ![1](/p/25101801.png)
- 例子  
    *以后再看*
## Call down, signal up
- 往下用调用，往上用信号  
    编写GD Script时，遵循良好的编程习惯。这是节点之间通信时的一个经验法则。

    Godot中的每个节点都是一棵节点树。起点被称为根节点。  
    一个节点位于另一个节点上方，我们称它们有亲子关系。上面的是父节点，下面是子节点。
    ```bash
    Main # PARENT
    |--Player # CHILD
    |  |--Graphics # Player的CHILD
    |  |--Collider
    |--Enemy
    ```
- `往下用调用，往上用信号`意味着父节点应该调用子节点的函数，反之则不然。  
    相反，子节点应该用信号来与父节点交流，父节点可以根据接到这些信号的函数采取相应的行动。
- 同一级别的两个节点：`SIBLINGS`  
    这时，共同的PARENT负责将来自一个SIBLING发出的信号连接到另一个SIBLING的函数上。通常是在`_ready()`函数中完成的。
    ![2](/p/25101802.png)
## Styyyle
- 写码格式  
    [GDScript 编写风格指南](https://docs.godotengine.org/zh-cn/4.5/tutorials/scripting/gdscript/gdscript_styleguide.html)


*终于把这个视频看完了，短短一个小时让我啃了大半个月*