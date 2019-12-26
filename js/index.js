$(function(){
  var OperatorStatus = false //是否按下運算子
  var OperatorEqualStage = false // 按下等號
  var NumberValue_first = 0 //按下運算子「前」輸入的數字 
  var NumberValue_secend = 0  //按下運算子「後」輸入的數字 
  var ScreenTotal = 0 //總和
  var Operators = "" //運算子儲存容器
  var PointLength_first = 0 //按下運算子前輸入的數字小數點的長度 
  var PointLength_secend = 0 //按下運算子後輸入的數字小數點的長度 
  var PointLengthMax = Math.max(PointLength_first, PointLength_secend) //兩組小數點長度，較長的那一個

  $(".ScreenTotal").text("0") //載入後顯示的數字
  // console.log($(".ScreenTotal").text().length) // console ".ScreenTotal" 長度


// 輸入數字
  $(".Number-btn").click(function(){
    if(OperatorEqualStage){
      OperatorEqualStage = false
      $(".ScreenTotal").text("")
    }
    if($(this).text() !== "0"){
      $(".AC").text("C")
    }
    
    if($(this).text() === "."){ //小數點判斷
      if($(".ScreenTotal").text() === "0"){
        $(".ScreenTotal").html( 0 + ".")
      }
      else if(ScreenTotal.indexOf(".") != -1){
        // console.log($(".ScreenTotal").text().indexOf("."))
        reak;
      }
    }
    
    if(OperatorStatus){ // 按下運算符號時進行
      NumberValue_secend = $(this).text()
      if($(".ScreenTotal").text().length === 0 || $(".ScreenTotal").text() === "0"){ // 還沒輸入數字時
        ScreenTotal = NumberValue_secend
        $(".ScreenTotal").text(ScreenTotal)
        
      }
      else{ //前面已經有輸入數字，接在前數字之後
        ScreenTotal = ScreenTotal + NumberValue_secend
        $(".ScreenTotal").text(ScreenTotal)
        NumberValue_secend = ScreenTotal
      }
      $(".Operator-btn").removeClass("click")
    }
    else{ // 沒有按運算符號時進行
      NumberValue_first = $(this).text()
      if($(".ScreenTotal").text().length === 0 || $(".ScreenTotal").text() === "0"){  // 還沒輸入數字時
        ScreenTotal = NumberValue_first
        $(".ScreenTotal").text(ScreenTotal)
      }
      else{ //前面已經有輸入數字，接在前數字之後
        ScreenTotal = ScreenTotal + NumberValue_first
        $(".ScreenTotal").text(ScreenTotal)
        NumberValue_first = ScreenTotal
      }
    }                     
  })

// Percentage
  $(".Percentage").click(function(){
    $(".Operator-btn").removeClass("click")
    if(Math.round(ScreenTotal) === Number(ScreenTotal)){
      ScreenTotal *= 0.01
    }
    else{
      PointLength_first = ScreenTotal.toString().split(".")[1].length
      ScreenTotal = (Number(ScreenTotal).toString().replace(".","") * 1) / Math.pow(10,(PointLength_first + 2))
    }
    NumberValue_first = ScreenTotal
    $(".ScreenTotal").text(ScreenTotal)
  })
  
// AC
  $(".AC").click(function(){
    $(".Operator-btn").removeClass("click")
    $(this).text("AC")
    OperatorStatus = false
    NumberValue_first = 0 
    NumberValue_secend = 0
    ScreenTotal = 0
    Operators = ""
    PointLength_first = 0
    PointLength_secend = 0
    PointLength = Math.max(PointLength_first, PointLength_secend)
    $(".ScreenTotal").text(ScreenTotal)
  })
  
//+-
  $(".PlusMinus").click(function(){
    $(".Operator-btn").removeClass("click")
    ScreenTotal *= -1
    NumberValue_first = ScreenTotal
    $(".ScreenTotal").text(ScreenTotal)
  })
  
// 運算元變色
  $(".Operator-btn").click(function(){
    Operators = $(this).text()
    $(".Operator-btn").removeClass("click")
    $(this).addClass("click")
    NumberValue_first = parseFloat(ScreenTotal)
    OperatorEqualStage = true
    OperatorStatus = true
    ScreenTotal = ""
  })
  $(".equal").click(function(){
    NumberValue_secend = parseFloat(NumberValue_secend)
    OperatorEqualStage = true
    switch(Operators) {
      case "+" :
        PointLength_first = NumberValue_first.toFixed(10).toString().split(".")[1].length
        PointLength_secend = NumberValue_secend.toFixed(10).toString().split(".")[1].length
        PointLengthMax = Math.max(PointLength_first, PointLength_secend)
        ScreenTotal = Math.round((NumberValue_first*Math.pow(10,PointLengthMax) + NumberValue_secend*Math.pow(10,PointLengthMax)))/Math.pow(10,PointLengthMax)
        $(".ScreenTotal").text(ScreenTotal)
        OperatorStatus = false
        NumberValue_first = ScreenTotal
        reak;
      case "-" :
        PointLength_first = NumberValue_first.toFixed(10).toString().split(".")[1].length
        PointLength_secend = NumberValue_secend.toFixed(10).toString().split(".")[1].length
        PointLengthMax = Math.max(PointLength_first, PointLength_secend)
        ScreenTotal = Math.round((NumberValue_first*Math.pow(10,PointLengthMax) - NumberValue_secend*Math.pow(10,PointLengthMax)))/Math.pow(10,PointLengthMax)
        $(".ScreenTotal").text(ScreenTotal)
        OperatorStatus = false
        NumberValue_first = ScreenTotal
        break;
      case "×" :
        if(Math.round(NumberValue_first) !== NumberValue_first &&  Math.round(NumberValue_secend) !== NumberValue_secend){
          PointLength_first = NumberValue_first.toString().split(".")[1].length
          PointLength_secend = NumberValue_secend.toString().split(".")[1].length
          ScreenTotal = (Number(NumberValue_first).toString().replace(".","")* Number(NumberValue_secend).toString().replace(".","")) / Math.pow(10,(PointLength_first + PointLength_secend))
        }
        else if(Math.round(NumberValue_first) === NumberValue_first &&  Math.round(NumberValue_secend) !== NumberValue_secend){ // NumberValue_first 為整數
          PointLength_secend = NumberValue_secend.toString().split(".")[1].length
          ScreenTotal = (NumberValue_first * Number(NumberValue_secend).toString().replace(".","")) / Math.pow(10,(PointLength_secend))
        }
        else if(Math.round(NumberValue_first) !== NumberValue_first &&  Math.round(NumberValue_secend) === NumberValue_secend){ // NumberValue_secend 為整數
          PointLength_first = NumberValue_first.toString().split(".")[1].length
          ScreenTotal = (Number(NumberValue_first).toString().replace(".","") * NumberValue_secend) / Math.pow(10,(PointLength_first))
        }
        else{ // 兩者皆為整數
          ScreenTotal = Number(NumberValue_first * NumberValue_secend)
        }
        $(".ScreenTotal").text(ScreenTotal) 
        OperatorStatus = false
        NumberValue_first = ScreenTotal
        break;
      case "÷" :
        PointLength_first = (Math.round(Number(NumberValue_first).toString().replace(".","")/NumberValue_first) +"").length
        PointLength_secend = (Math.round(Number(NumberValue_secend).toString().replace(".","")/NumberValue_secend) +"").length
        ScreenTotal = Number((Number(NumberValue_first).toString().replace(".","")) / Number(Number(NumberValue_secend).toString().replace(".",""))) * Math.pow(10,PointLength_secend - PointLength_first)
        $(".ScreenTotal").text(ScreenTotal)
        OperatorStatus = false
        NumberValue_first = ScreenTotal
        reak;
    }
  })
})

// 備用區