//计算器页JS脚本

var formula = "";       //运算式字串
var result = "";        //运算结果字串

//获取按键对象
var one = document.getElementById("one");
var two = document.getElementById("two");
var three = document.getElementById("three");
var four = document.getElementById("four");
var five = document.getElementById("five");
var six = document.getElementById("six");
var seven = document.getElementById("seven");
var eight = document.getElementById("eight");
var nine = document.getElementById("nine");
var zero = document.getElementById("zero");
var zeros = document.getElementById("zeros");
var point = document.getElementById("point");

var jia = document.getElementById("jia");
var jian = document.getElementById("jian");
var cheng = document.getElementById("cheng");
var chu = document.getElementById("chu");
var yu = document.getElementById('yu');

var back = document.getElementById("back");
var clear = document.getElementById("clear");
var equal = document.getElementById("equal");

//添加点击方法
one.addEventListener('click',addOne);
two.addEventListener('click',addTwo);
three.addEventListener('click',addThree);
four.addEventListener('click',addFour);
five.addEventListener('click',addFive);
six.addEventListener('click',addSix);
seven.addEventListener('click',addSeven);
eight.addEventListener('click',addEight);
nine.addEventListener('click',addNine);
zero.addEventListener('click',addZero);
zeros.addEventListener('click',addZeros);
point.addEventListener('click',addPoint);

jia.addEventListener('click',addJia);
jian.addEventListener('click',addJian);
cheng.addEventListener('click',addCheng);
chu.addEventListener('click',addChu);
yu.addEventListener('click',addYu);

back.addEventListener('click',toBack);
clear.addEventListener('click',toClear);
equal.addEventListener('click',toEqual);
//加入数字1
function addOne(){
    formula += "1";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字2
function addTwo(){
    formula += "2";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字3
function addThree(){
    formula += "3";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字4
function addFour(){
    formula += "4";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字5
function addFive(){
    formula += "5";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字6
function addSix(){
    formula += "6";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字7
function addSeven(){
    formula += "7";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字8
function addEight(){
    formula += "8";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字9
function addNine(){
    document.getElementById("formula").innerHTML += "9";
    formula = document.getElementById("formula").innerHTML;
}
//加入数字0
function addZero(){
    formula += "0";
    document.getElementById("formula").innerHTML = formula;
}
//加入数字00
function addZeros(){
    formula += "00";
    document.getElementById("formula").innerHTML = formula;
}
//加入小数点.
function addPoint(){
    formula += ".";
    document.getElementById("formula").innerHTML = formula;
}
//加入运算符+
function addJia(){
    formula += "+";
    document.getElementById("formula").innerHTML = formula;
}
//加入运算符-
function addJian(){
    formula += "-";
    document.getElementById("formula").innerHTML = formula;
}
//加入运算符×
function addCheng(){
    formula += "×";
    document.getElementById("formula").innerHTML = formula;
}
//加入运算符÷
function addChu(){
    formula += "÷";
    document.getElementById("formula").innerHTML = formula;
}
//加入运算符%
function addYu(){
    formula += "%";
    document.getElementById("formula").innerHTML = formula;
}
//操作：回退一格
function toBack(){
    formula = formula.slice(0,formula.length-1);
    document.getElementById("formula").innerHTML = formula;
}
//操作：清空算式和结果
function toClear(){
    formula = "";
    result = "";
    document.getElementById("formula").innerHTML = formula;
    document.getElementById("result").innerHTML = result;
}
//操作：获取运算结果（核心）
function toEqual(){
    /*TO DO LIST:
        1.字串预处理（去掉多余空格，去掉两边的0）
        2.通过加减乘除进行分割（可变数组）
        3.组成运算式（要不就做两个数字运算算了？好麻烦/wul）
        4.注意错误的处理（除数为零、运算式过长……）
        5.结果显示
        6.需要设置文本框用户禁用吗？
    */
    var help = "";
    formula = formula.replace(/\s+/g,"");          //去除运算式中空格
    if(!isOperatorRight(formula)){
        toClear();
        alert("运算符输入有误。");
        return;
    }else{
        var ope = "";
        var res = 0;
        for(var i=0;i<formula.length;i++){
            if(formula[i]=="+" || formula[i]=="-" || formula[i]=="×" || formula[i]=="÷" || formula[i]=="%"){
                ope = formula[i];
                break;
            }
        }console.log("ope:",ope);            //打印获取运算符
        var arr_num = formula.split(ope,2);  //字串分割，两数字存储arr_res数组中
        var numA = parseFloat(arr_num[0]);
        var numB = parseFloat(arr_num[1]);
        if(numA==NaN || numB==NaN){
            toClear();
            alert("运算数输入有误。");
            return;
        }
        if(ope=="÷" && Math.abs(numB)<0.0000001){
            toClear();
            alert("被除数不可为零。");
            return;
        }
        //判定完成，运算结果
        if(ope == "+"){
            res = numA+numB;
        }else if(ope == "-"){
            res = numA-numB;
        }else if(ope == "×"){
            res = numA*numB;
        }else if(ope == "÷"){
            res = numA/numB;
        }else if(ope == "%"){
            res = numA%numB;
        }
        //结果输出
        result = numA.toString()+" "+ope+" "+numB.toString()+" = "+res.toString();
        document.getElementById("result").innerHTML = result;
    }    
}

//辅助函数：判断运算符是否合适
function isOperatorRight(x){
    //判定收尾字串非运算符
    var opes = "+-×÷%";
    if(opes.indexOf(x[0])!=-1 || opes.indexOf(x[x.length])!=-1){
        return false;
    }
    //判定是否只有一个运算符
    var cnt = 0;                //辅助计数变量
    for(var i=0;i<x.length;i++){
        if(opes.indexOf(x[i])!=-1){
            cnt++;
        }
    }if(cnt != 1){
        return false;
    }return true;
}