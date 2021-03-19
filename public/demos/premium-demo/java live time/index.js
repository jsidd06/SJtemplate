
// console.log("hello world");
// // alert("me");
// console.log(6+4,"hello world");
// console.warn("this is warning");
// console.error("this is error");
// var num1 = 70;
// var num2 = 30;
// console.log(num1+num2); 
// var num1 = 20;
// var num2 = 2.3;

// var str1 = "this is string";
// var str2 = "this is also a string";

// Object operator
// var marks = {
//     ravi: 23,
//     chacha: 00,
//     tau: 65
// }
// console.log(marks);

// Array operator
// var boolen1 = true;
// var boolen2 = false;
// console.log(boolen1,boolen2);

// var arr = [1,2,"string",4,5]
// console.log(arr);

// Arthmatic operator
var a = 10;
var b = 20;
// console.log("this value of a+b is", a+b);
// console.log("this value of a-b is", a-b);
// console.log("this value of a*b is", a*b);
// console.log("this value of a/b is", a/b);

// Assingment operator
var c =b;
c +=3
// console.log(c);
// comparision operator
var x = 44;
var y = 44.4;
// console.log(x == y);
// console.log(x >= y);
// console.log(x <= y);
// console.log(x > y);
// console.log(x < y);

// logical operator OR
// console.log(true || true);
// console.log(false || true);
// console.log(false || false);

// logical operator AND
// console.log(true && true);
// console.log(false && true);
// console.log(false && false);

// logical operator NOT 
// console.log(!true);
// console.log(!false);

// function in java script 
// DRY do not repeat yourself
// function avg (a,b) {
//         c = (a+b)/2;
//     return c;
// }

// c1 = avg(23,33);
// c2 = avg(12,33);
// // console.log(c1,c2); 

// var age = 22;
// if (age > 60) {
//     console.log ("you are not a kid ");
// }
// else if (age > 20) {
//     console.log("you never are a kid");
// }
// else if (age > 19) {
//     console.log("you  not a are a kid");
// }
// else if (age > 18) {
//     console.log("you ok are a kid");
// }
// else if (age > 17) {
//     console.log("you  the are a kid");
// }
// else {
//     console.log("you are special kid");
// }
// console.log("end of ladder");

var arr = [1,2,3,4,5];
// console.log(arr);
// for (var i=0;i<arr.length;i++) {
//     console.log(arr[i]);
// }

// arr.forEach(function(element){
//     console.log(element)
// })

let j = 0 ;
// while(j<arr.length){
//     console.log(arr[j]);
//     j++;
// } 
// do{
//     console.log(arr[j]);
//     j++;
// } while (j < arr.length); 
function avg(a,b) {
    return(a+b)/2;
}
// c1 = avg(23,56);
// c2 = avg(32,87);
// console.log(c1,c2);
function percentage(a,b) {
    return(a/b)%100;
}
c3 = percentage(3000,2341);
// console.log(c3); 
let myArr = ["hello", "string", 23, null, true];
// console.log(myArr.length);
// myArr.pop();
// myArr.push("sidd");
// myArr.shift();
const newLan = myArr.unshift("sidd");
// console.log(newLan);
// console.log(myArr);

//string method in javascript
let mybaby = "hello jiju sala";
console.log(mybaby.slice(1,5));
// console.log(mybaby.indexOf("jiju"));
// console.log(mybaby.lastIndexOf("sala"));