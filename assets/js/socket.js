// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
import {Socket} from "phoenix";

let socket = new Socket("/socket", {params: {token: window.userToken}});

socket.connect();

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("rooms:lobby", {});
channel.join()
    .receive("ok", resp => { console.log("Joined successfully", resp); })
    .receive("error", resp => { console.log("Unable to join", resp); });

// canvas描画処理
var canvas = document.getElementById('sketch');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouseX = "";
var mouseY = "";
var defoalpha = 1.0;
var defosize = 4;
var color = (Math.random() * 0xFFFFFF | 0).toString(16);
var defocolor = "#" + ("000000" + color).slice(-6);

canvas.addEventListener('mousemove', onMove, false);
canvas.addEventListener('mousedown', onClick, false);
// canvas.addEventListener('mouseup', drawEnd, false);
// canvas.addEventListener('mouseout', drawEnd, false);

channel.on("move", msg => {
    draw(msg.x, msg.y, msg.color);
});

//マウス動いていて、かつ左クリック時に発火。
function onMove(e) {
    if (e.buttons === 1 || e.witch === 1) {
        var rect = e.target.getBoundingClientRect();
        var X = ~~(e.clientX - rect.left);
        var Y = ~~(e.clientY - rect.top);
        //draw 関数にマウスの位置を渡す
        channel.push("move", {x: X, y: Y, color: defocolor});
        draw(X, Y, defocolor);
    }
}

//マウスが左クリックされると発火。
function onClick(e) {
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var X = ~~(e.clientX - rect.left);
        var Y = ~~(e.clientY - rect.top);
        //draw 関数にマウスの位置を渡す
        channel.push("move", {x: X, y: Y, color: defocolor});
        draw(X, Y, defocolor);
    }
}

//渡されたマウス位置を元に直線を描く関数
function draw(X, Y, color) {
    ctx.beginPath();
    ctx.globalAlpha = defoalpha;
    ctx.moveTo(X, Y);
    //lineTo（ゴール地点）の決定、現在のマウス位置をゴール地点とする
    ctx.lineTo(X, Y);
    //直線の角を「丸」、サイズと色を決める
    ctx.lineCap = "round";
    ctx.lineWidth = defosize * 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

//左クリック終了、またはマウスが領域から外れた際、継続値を初期値に戻す
// function drawEnd() {
//     mouseX = "";
//     mouseY = "";
// }

channel.on("move", function(dt) {
});

export default socket;
