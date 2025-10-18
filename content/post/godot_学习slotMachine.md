---
title: 学习YouTube@brwxddev写的Godot项目（Slot Machine）
description: 呕吐式学习
date: 2025-10-13
tags: [Godot, Slot Machine,]
license: ""
categories: note
image: 
---
## 学习目的
前两天跟着Godot官方入门教程把“你的第一个2D游戏”做出来了（[帖子](https://ryihuan.github.io/p/%E7%AC%AC%E4%B8%80%E4%B8%AA2d%E6%B8%B8%E6%88%8F/)）  
虽然还是云里雾里，但我觉得我可以开始通过模仿别人开源的项目学习并制作一点别的小游戏（某种我觉得对的学习曲线）  

想做一个老虎机游戏 于是搜索到了YouTube`@brwxddev`写的[这个教程](https://www.youtube.com/watch?v=AcvvarHo5T8)  
作者也把项目文件放在GitHub上了（[链接](https://github.com//brwxisme/SlotMachineTutorial)）

我的目的是最终在学习基础上做出一个5x5的老虎机游戏（类似弹丸V3里的那个），并且钱是会花完的（Game Over），赢的钱可以兑换物品（通往Ending？）
## 学习中……
<details><summary>不堪入目的试图看懂代码过程</summary>

研究这个老虎机https://youtu.be/AcvvarHo5T8?si=IV7gAKmsuszX4gwE

### 看reel.gd
1. 原来脚本不用对应场景，哥们单独写了个signalbank脚本，里面放了开始roll和roll停止的信号，不过这个信号括号里的参数是怎么用的，增增哇嘎乃:bugcat_sweat: 
```gdscript
signal startRoll(slotID,duration)
signal rollFinished(slotID,result)
```

2. 然后在reel节点的脚本里ready函数就调用了开始roll的信号，遇到了没学过的名字就是这个callable  
reel1和reel2是代表白色和红色的卷轴，两个都会一起塞进一个滚筒里，有点不明白为什么要这么设计？这段代码应该是在说启动时的状态是显示红色卷轴，白色卷轴放到显示区域外？
```gdscript
func _ready():
    SigBank.startRoll.connect(Callable(self,"_startRoll"))
    reel1.position.y = -1000
    reel2.position.y = 0
```

3. 上次学到process函数是运行时每一帧都会刷新的函数（大意）
```gdscript
func _process(delta):
    if Input.is_action_just_released("ui_accept"):
        _startRoll(reelID,5)
        print("rollMe")
    
    match state:
        ROLLBACK:
            _roll(reel1,-MS)
            _roll(reel2,-MS)
            
            rollBackDuration -= delta
            if rollBackDuration <= 0:
                state = ROLL
        ROLL:
            _roll(reel1,MS)
            _roll(reel2,MS)
            
            rollDuration -= delta
            if rollDuration <= 0:
                state = STOP
                _stopRoll()
        STOP:
            pass
```
这么看起来`SigBank.startRoll.connect(Callable(self,"_startRoll"))`这行是定义了开始的roll信号？结合`signal startRoll(slotID,duration)`来看，`_startRoll(reelID,5)`的意思是开始roll`reelID`（整数），每个转轴的roll时间间隔5（单位是帧吗？）  
之前学过`match`可以给枚举的变量的值执行不同的代码，这里脚本顶部枚举了`enum {ROLL,STOP,ROLLBACK}`  
但是没能理解前面有下划线的这个是什么意思:bugcat_sweat:   
顶部也写了`var state`，但没看懂这里是什么意思……:zenzenwakannai:

4. 看了后面的代码
```gdscript
func _startRoll(reelNumber,dur):
    if reelNumber!= reelID : return
    
    reel1.position.y = -1000
    reel2.position.y = 0
    state = ROLLBACK
    rollDuration = dur
    print(reelID,reelNumber,dur)
    rollBackDuration = 0.25
    

func _roll(slot:Sprite2D,MSpeed):
    var newPOS2 = slot.position.y + MSpeed
    if newPOS2 >= 1000:
        newPOS2 =-1000
    slot.position.y = newPOS2

func _stopRoll():
    TWN = create_tween().set_trans(Tween.TRANS_SPRING).set_ease(Tween.EASE_OUT).set_parallel()
    var rng = randi_range(0,9)
    var dur = 1.5

    var finalPos = -100*rng
    
    var finalSlot
    var anotherSlot
    if reel1.position.y < reel2.position.y:
        finalSlot = reel1
        anotherSlot = reel2
    else:
        finalSlot = reel2
        anotherSlot = reel1
    
    finalSlot.z_index = 1
    anotherSlot.z_index = 0
    TWN.tween_property(finalSlot,"position:y",finalPos,dur)
    TWN.tween_property(anotherSlot,"position:y",finalPos+1000,dur)
    await TWN.finished
    print("Reeel ID",reelID," reel Image ", finalSlot.name ," POS : ",finalPos, " RNJESUS :",rng)
    SigBank.rollFinished.emit(reelID,rng)
```
好像有点明了了，前面match的里面调用的是这里的函数  
- 看一下_startRoll  
没看懂，应该是在定义转轴初始状态？？  

- 看一下_roll  
好像是在说如果图片往下转到屏幕下方显示区域外面，就把它刷新到屏幕上方显示区域外面（确保可持续  

- 看一下_stopRoll  
有必要去查一下tween的定义……这一行没看懂  
这个rng应该是指显示的图样0-9  
finalSlot取y值更小的卷轴？没看懂 不是有可能在屏幕外面吗:bugcat_sweat:还是说有部分代码确保最终显示的卷轴是在屏幕内且在另一个卷轴上方的  
tween相关的看不懂  
最后传回了一个roll结束的信号

### 看slot_machine_ui.gd  
这是一个用户界面节点（？）包括三个滚轴和spin按钮 bet按钮 结果显示

1.顶部
```gdscript
var reelResult1
var reelResult2
var reelResult3

var receivedHowManyTimes = 0

var betValue
var betResult
var winningMultiplier = 0
```
2. ready函数看起来是启动时接收roll结束的信号并收集数据？
```gdscript
func _ready():
    
    SigBank.rollFinished.connect(Callable(self,"_receiveNumber"))
    pass # Replace with function body.

```
3. 上面信号里用到了这个函数
```gdscript
func _receiveNumber(reelID,rngResult):
    receivedHowManyTimes +=1
    match reelID:
        1:
            reelResult1 = rngResult
        2:
            reelResult2 = rngResult
        3:
            reelResult3 = rngResult
    if receivedHowManyTimes <3:
        print(receivedHowManyTimes)
        
    else:
        receivedHowManyTimes = 0
        _calculateWinning()
```
应该是在说收集三个滚轴的结果，并只收集三次  
4. 上面的函数最后一行用到了这个函数
```gdscript
func _calculateWinning():
    betValue = int($betAmount.value)
    
    
    if reelResult1 == reelResult2 || reelResult2 == reelResult3:
        winningMultiplier = 5
    elif  reelResult1 == reelResult2 && reelResult2 == reelResult3:
        winningMultiplier = 100
    else :
        winningMultiplier = -1
    betResult = betValue * winningMultiplier
    if betResult>0:
        $Result.text = "+ "+str(betResult)
    else:
        $Result.text = "LMAO !!!!  "+str(betResult)
```
这里定义了结果赢不赢钱  
如果三个卷轴中有两个一样就赢5倍  
三个结果都一样赢100倍  
否则扣除下注的钱  
（嗯？这个意思是，赢钱的情况不会扣下注的钱？）  
如果赢钱，结果标签显示“+数字”，没有的话就嘲笑  
5. 最后一个函数  
```gdscript
func _on_spin_button_button_up():
    SigBank.startRoll.emit(1,2)
    SigBank.startRoll.emit(2,2.5)
    SigBank.startRoll.emit(3,3)
    pass # Replace with function body.
```
这个应该传的是系统带的按钮抬起的信号  
emit是什么意思（  
括号内的参数左边是reelID，右边是duration（这个duration到底是指哪里的间隔

</details>
<details><summary>查资料补充知识中</summary>

### 信号
#### emit  
emit：释放信号  
`signal_name.emit()`

因此：  
```gdscript
func _on_spin_button_button_up():
    SigBank.startRoll.emit(1,2)
    SigBank.startRoll.emit(2,2.5)
    SigBank.startRoll.emit(3,3)
    pass # Replace with function body.
```
的意思是当接收到spin按钮抬起信号时，释放`Sigbank.gd`脚本中的`startRoll`信号，参数为`(slotID, duration)`，即第一个滚轴开始滚动持续时间为2，第二个滚轴开始滚动持续时间为2.5，第三个滚轴开始滚动持续时间为3  

问了AI如何理解这里的duration单位是帧还是秒：  
1. 有小数，所以不会是帧
2. 有信号接收方要求duration的单位是秒（找了一下，应该是`_startroll`调用了`startRoll`信号，而`func _process(delta):`调用了`_startroll`，因此单位是秒）


</details>
*<small>学不完了明天学</small>*