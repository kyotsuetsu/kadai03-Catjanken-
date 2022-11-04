// 見づらくなるため、元から存在していたコメントは一部削除しています。

// 手順
// ①「じゃんけんに負けてね！」ボタンをクリックするとCOMのじゃんけんが開始する
// ②COMの処理終了後、自分の出す手を決めて画像をクリックする
// ③クリックすると勝ち負けの判定後に①と同じくCOMのじゃんけんが開始する
// ④10回繰り返した時点で処理を終了する

// 実装方針
// 1.COMのじゃんけんを開始する処理は「じゃんけんに負けてね！」ボタンと
// 自分の出す手の画像をクリック時の2箇所で呼び出される必要がある
// →関数化する
// 
// 2.自分の出す手の画像をクリックした時にジャンケンの試行回数を1回増やす必要がある
// →クリックイベントの際にジャンケンの試行回数を1増やす
// →ジャンケンの試行回数をグローバル化する
//
// 3.10回試行した時に処理を終了する
// →ジャンケンの試行回数が10回の時はCOMのじゃんけんを開始しない
//
// 4.試行のたびに画像を隠す
// →次の処理が開始する前に画像を隠す処理を入れる
//
// 5.前回の試行結果は表示する
// →toggleを使用すると表示する→隠れるという表示になってしまうため、1回目の処理だけtoggleの処理を挟む

let result;
// let judge;
const music = new Audio('sound/Tadanokoe.m4a');

// // スタートボタンを1回しかおせなくする
// (".start").disabled = true;

// 実装方針 2.自分の出す手の画像をクリックした時にジャンケンの試行回数を1回増やす必要がある
// クリックイベントでは引数を取得できないので、関数の外からでも参照できるように変数をグローバル化します
// グローバル変数については次のURLを確認してください
// https://qiita.com/Ken-768/items/7f41512ec045041b102e
// 終了とする試行回数を設定する変数
var finishCount = 10
var winCount = 0
var loseCount = 0



// 実装方針
// 1.COMのじゃんけんを開始する処理は「じゃんけんに負けてね！」ボタンと
// 自分の出す手の画像をクリック時の2箇所で呼び出される必要がある
// catJankenというCOMがじゃんけんを開始する関数を作成します

// --------[タイマ]-------------------------------------
let timer = $('#time_limit');

function countDown() {

    if (timer.val() > 0 ) {
        timer.val(timer.val() - 1);
        setTimeout(countDown, 20);
      // タイマーがゼロになった時の処理
    }else if(timer.val() == 0 && loseCount == 0 && winCount == 0) {
      msg = "ざんねん！もういっかい！";
          $("#oneMore").html(msg);
          console.log("もういっかい");
          timer.hide();
          $('.choises').hide();
          $('.img').hide();

    }else if(timer.val() == 0 && loseCount == 1 ) {
      msg = "もういっかい！";
          $("#oneMore").html(msg);
          console.log("もういっかい");
          timer.hide();
          $('.choises').hide();
          $('.img').hide();
          $("#resultMsg").hide();
    }

    
}

// もう一度スタート。
$("#oneMore").click(function(){
  $("#oneMore").hide();
  $("#resultMsg").hide();

  winCount = 0;

  catJanken();
})

// function timeUp(){
//   if(timer.val() == 0 && loseCount == 0){
//     msg = "もっと脳年齢を鍛えよう！";
//     $("#resultMsg").html(msg);

//   }else{
//     msg.hide();
//   }

// }



//------[じゃんけんの画像表示]--------------------------------------------------------------------------------------------
var catJanken = function(){


    setTimeout(function(){
      $('.start').hide(),
      $("#echo").hide();
      console.log("1秒経過しました")
    },1000);

    setTimeout(function(){
      $('.a').show();
      console.log("2秒経過しました")
    },1500);

    setTimeout(function(){
      music.play();

    },1500)

    setTimeout(function(){
      $('.a').hide();
      console.log("3秒経過しました")
    },3500);

    setTimeout(function(){
      $('.b').show();
      console.log("4秒経過しました")
    },4000);

    setTimeout(function(){
      $('.b').hide();
      console.log("5秒経過しました")
    },5000);

    // 手順②COMのじゃんけんが終了する
    setTimeout(function(){
      result = Math.floor(Math.random() * 3);
      console.log(result, "ランダムな図");
      
      if (result === 0) {
      console.log("グー");
      $(".neko_goo").show();
      } else if (result === 1) {
      console.log("チョキ");
      $(".neko_choki").show();
      } else if (result === 2) {
      console.log("パー");
      $(".neko_paa").show();
      } 
      
      // タイムリミットの開始
      timer.val(100);
      countDown();

      // 表示
      timer.show();
      $(".choises").show();

     

    },6000);

  }

//-----------------------------------------------------------------------------------------------------------------------------

//＝＝＝＝＝＝ 繰り返し処理＝＝＝＝＝＝
// 手順①「じゃんけんに負けてね！」ボタンをクリックするとCOMのじゃんけんが開始する---------------------------------------------------
  $('.start').click(function(){

    catJanken();
    
    
  })

  var view = "";
  var msg = "";
  var renshou = "";
  
//-----------------------------------------------------------------------------------------------------------------------------

//----[グーの処理]---------------------------------------------------------------------------------------------------------------
// 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
  $("#jibun_goo").click(function(){
    console.log("クリックしました");

    clearInterval(timer.val);
    
    

    if(result === 2 ){
        console.log("かち");
        view = "きみのかち！";
        $('.img').hide();
        console.log("表示");
        winCount++
        renshou ="連勝記録:" + winCount;


      console.log("time_limitにvalueをセット");
      $("#echo").html(view);
      $("#echo").show();

        
    }else {
        console.log("まけ");
        // view ="ざんねん";
        $('.img').hide();
        console.log("表示");
        console.log("lose表示");
        loseCount++
        
    }
    
    // $("#echo").show();

        // タイムリミットの値を戻す
        timer.val(100);
        timer.hide();
        console.log("time_limitを隠す");

    // 表示画面
    $("#renshou").html(renshou);
        


    //---[10回 or 負けでゲーム終了]--------------------------
    if(winCount == finishCount){
      msg = "クリア！！君の脳年齢は２０歳！"
      $("#resultMsg").html(msg);
      console.log("クリア！！");

    }else if(loseCount == 1){
      //正解回数に応じた脳年齢表示------------------------

      if(winCount == 0 || winCount == 1){
        msg = "ざんねん！きみの脳年齢は70歳！";
        $("#resultMsg").html(msg);
       }else if(winCount == 2 || winCount == 3){
         msg = "ざんねん！きみの脳年齢は60歳！"; 
        $("#resultMsg").html(msg);
       }else if(winCount == 4 || winCount == 5){ 
         msg = "ざんねん！きみの脳年齢は50歳！"; 
        $("#resultMsg").html(msg);
       }else if(winCount == 6 || winCount == 7){
         msg = "ざんねん！きみの脳年齢は40歳！";
        $("#resultMsg").html(msg);
       }else if(winCount == 8 || winCount == 9){
         msg = "おしい！きみの脳年齢は30歳！";
        $("#resultMsg").html(msg);
       }

       
 
       //-------------------------------------------------
    
    }else{
      $('.img').hide();
      catJanken();
      console.log("もう一回")
    }
  });

  
//---------------------------------------------------------------------------------------------------------------------------------

//チョキの処理----------------------------------------------------------------------------------------------------------------------
// 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
  $("#jibun_choki").click(function(){
    console.log("クリックしました")


    if(result ===  0 ){
        console.log("かち");
        view = "きみのかち！";
        $('.img').hide();
        console.log("表示");
        winCount++
        renshou ="連勝記録:" + winCount

        $("#echo").html(view);
        $("#echo").show();
        
        
    }else {
        console.log("まけ");
        // view = "ざんねん";
        $('.img').hide();
        console.log("表示");
        loseCount++
        
    }

   
// タイムリミットの値を戻す
      timer.val(100);
      timer.hide();
      console.log("time_limitを隠す");

// 表示画面
$("#renshou").html(renshou);





    //---[10回 or 負けでゲーム終了]--------------------------
    if(winCount == finishCount){
      msg = "クリア！！君の脳年齢は２０歳！"
      $("#resultMsg").html(msg);
      console.log("クリア！！");

    }else if(loseCount == 1){
      //正解回数に応じた脳年齢表示------------------------

      if(winCount == 0 || winCount == 1){
        msg = "ざんねん！きみの脳年齢は70歳！";
        $("#resultMsg").html(msg);
       }else if(winCount == 2 || winCount == 3){
         msg = "ざんねん！きみの脳年齢は60歳！"; 
        $("#resultMsg").html(msg);
       }else if(winCount == 4 || winCount == 5){ 
         msg = "ざんねん！きみの脳年齢は50歳！"; 
        $("#resultMsg").html(msg);
       }else if(winCount == 6 || winCount == 7){
         msg = "ざんねん！きみの脳年齢は40歳！";
        $("#resultMsg").html(msg);
       }else if(winCount == 8 || winCount == 9){
         msg = "おしい！きみの脳年齢は30歳！";
        $("#resultMsg").html(msg);
       }
 
       //-------------------------------------------------
    
    }else{
      $('.img').hide();
      catJanken();
      console.log("もう一回")
    }
  });
//-------------------------------------------------------------------------------------------------------------------------------

//パーの処理-----------------------------------------------------------------------------------------------------------------------
// 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
$("#jibun_paa").click(function(){
  console.log("クリックしました")

  if(result ===  1 ){
      console.log("かち");
      view = "きみのかち！";
      $('.img').hide();
      console.log("表示");
      winCount++
      renshou ="連勝記録:" + winCount

    $("#echo").html(view);
     $("#echo").show();
      
      
  }else {
      console.log("まけ");
      // view = "ざんねん";
      $('.img').hide();
      console.log("表示");
      loseCount++
      
  }

  // $("#echo").html(view);
  // $("#echo").show();

  // 表示画面
  $("#renshou").html(renshou);



  timer.hide();
  console.log("time_limitを隠す");


  //---[10回 or 負けでゲーム終了]--------------------------
  if(winCount == finishCount){
    msg = "クリア！！君の脳年齢は２０歳！"
    $("#resultMsg").html(msg);
    console.log("クリア！！");

  }else if(loseCount == 1){
   //正解回数に応じた脳年齢表示------------------------

   if(winCount == 0 || winCount == 1){
    msg = "ざんねん！きみの脳年齢は70歳！";
    $("#resultMsg").html(msg);
   }else if(winCount == 2 || winCount == 3){
     msg = "ざんねん！きみの脳年齢は60歳！"; 
    $("#resultMsg").html(msg);
   }else if(winCount == 4 || winCount == 5){ 
     msg = "ざんねん！きみの脳年齢は50歳！"; 
    $("#resultMsg").html(msg);
   }else if(winCount == 6 || winCount == 7){
     msg = "ざんねん！きみの脳年齢は40歳！";
    $("#resultMsg").html(msg);
   }else if(winCount == 8 || winCount == 9){
     msg = "おしい！きみの脳年齢は30歳！";
    $("#resultMsg").html(msg);
   }

   //-------------------------------------------------
  
  }else{
    $('.img').hide();
    catJanken();
    console.log("もう一回")
  }
});
//-----------------------------------------------------------------------

// 繰り返しボタン


    

    // 音声再生

    function audio() {
      document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
      document.getElementById('btn_audio').play(); //クリックしたら音を再生
  }
