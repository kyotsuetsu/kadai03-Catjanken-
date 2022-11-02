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

var result;
let judge;
const music = new Audio('sound/後出しただーん.m4a');
// 実装方針 2.自分の出す手の画像をクリックした時にジャンケンの試行回数を1回増やす必要がある
// クリックイベントでは引数を取得できないので、関数の外からでも参照できるように変数をグローバル化します
// グローバル変数については次のURLを確認してください
// https://qiita.com/Ken-768/items/7f41512ec045041b102e
var jankenCount = 0;
// 終了とする試行回数を設定する変数
var finishCount = 10;


// 実装方針
// 1.COMのじゃんけんを開始する処理は「じゃんけんに負けてね！」ボタンと
// 自分の出す手の画像をクリック時の2箇所で呼び出される必要がある
// catJankenというCOMがじゃんけんを開始する関数を作成します
var catJanken = function(){
    setTimeout(function(){
      $('.start').hide() 
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

    },6000);
    }
//＝＝＝＝＝＝ 繰り返し処理＝＝＝＝＝＝
// 手順①「じゃんけんに負けてね！」ボタンをクリックするとCOMのじゃんけんが開始する
  $('.start').click(function(){
    catJanken();
  })

  var view = "";
  var msg = "";

  // 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
  $("#jibun_goo").click(function(){
    console.log("クリックしました");

    if(result === 2 ){
        console.log("かち");
        view = "きみのかち！";
        console.log("表示");
      
    }else {
        console.log("まけ");
        view ="ざんねん";
        console.log("表示");
        
    }
    $("#echo").html(view);
    // 手順③クリックすると勝ち負けの判定後に①と同じくCOMのじゃんけんが開始する
    // この時にジャンケンの試行回数を1増やします
    jankenCount++


    // 手順④10回繰り返した時点で処理を終了する
    // 実装方針3.10回試行した時に処理を終了する
    // →ジャンケンの試行回数が10回の時はCOMのじゃんけんを開始しない
    // ひとまずCOMのじゃんけん処理を実施せずに処理が終わる旨をconsole.logに表示しています。
    // 10回未満の時はCOMのじゃんけんを開始する処理にしています。
    if(jankenCount == finishCount){
      msg = "終わり"
      console.log("終わり");
      $("#resultMsg").html(msg);

    }else if(view =="さんねん" ){
        msg = "終わり"
        console.log("lose終わり");
        $("#resultMsg").html(msg);
    
    }else{
      // msg = "もう1回！";
      $("#resultMsg").html(msg);
      setTimeout(function(){
        console.log("再スタート");
        // 実装方針5.前回の試行結果は表示する
        // →toggleを使用すると表示する→隠れるという表示になってしまうため、1回目の処理だけtoggleの処理を挟む
        if(jankenCount == 1){
          $('#echo').toggle();
          $("#resultMsg").toggle();
        }
      }
      ,1000);
      // 実装方針4.試行のたびに画像を隠す
      // →次の処理が開始する前に画像を隠す処理を入れる
      $('.img').hide();
      catJanken();
    }

    
  });

  // 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
  $("#jibun_choki").click(function(){
    console.log("クリックしました")

    if(result ===  0 ){
        console.log("かち");
        view = "きみのかち！";
        console.log("表示");
        
    }else {
        console.log("まけ");
        view = "ざんねん";
        console.log("表示");
    }

    $("#echo").html(view);
    // 手順③クリックすると勝ち負けの判定後に①と同じくCOMのじゃんけんが開始する
    // この時にジャンケンの試行回数を1増やします
    jankenCount++

    // 手順④10回繰り返した時点で処理を終了する
    // 実装方針3.10回試行した時に処理を終了する
    // →ジャンケンの試行回数が10回の時はCOMのじゃんけんを開始しない
    // ひとまずCOMのじゃんけん処理を実施せずに処理が終わる旨をconsole.logに表示しています。
    // 10回未満の時はCOMのじゃんけんを開始する処理にしています。
    if(jankenCount == finishCount){
      msg = "終わり"
      console.log("終わり");
      $("#resultMsg").html(msg);
    }else{
      msg = "";
      $("#resultMsg").html(msg);
      setTimeout(function(){
        console.log("再スタート");
        // 実装方針5.前回の試行結果は表示する
        // →toggleを使用すると表示する→隠れるという表示になってしまうため、1回目の処理だけtoggleの処理を挟む
        if(jankenCount == 1){
          $('#echo').toggle();
          $("#resultMsg").toggle();
        }
      }
      ,1000);
      // 実装方針4.試行のたびに画像を隠す
      // →次の処理が開始する前に画像を隠す処理を入れる
      $('.img').hide();
      catJanken();
    }
  });

  // 手順②COMの処理終了後、自分の出す手を決めて画像をクリックする
  $("#jibun_paa").click(function(){
      console.log("クリックしました");
      if(result ===  1 ){
          console.log("かち");
          view = "きみのかち！";
          console.log("表示");    
      }else {
          console.log("まけ");
          view = "ざんねん";
          console.log("表示");        
      }
    $("#echo").html(view);
    // 手順③クリックすると勝ち負けの判定後に①と同じくCOMのじゃんけんが開始する
    // この時にジャンケンの試行回数を1増やします
    jankenCount++

    // 手順④10回繰り返した時点で処理を終了する
    // 実装方針3.10回試行した時に処理を終了する
    // →ジャンケンの試行回数が10回の時はCOMのじゃんけんを開始しない
    // ひとまずCOMのじゃんけん処理を実施せずに処理が終わる旨をconsole.logに表示しています。
    // 10回未満の時はCOMのじゃんけんを開始する処理にしています。
    if(jankenCount == finishCount){
      msg = "終わり"
      console.log("終わり");
      $("#resultMsg").html(msg);
    }else{
      msg = "";
      $("#resultMsg").html(msg);
      setTimeout(function(){
        console.log("再スタート");
        // 実装方針5.前回の試行結果は表示する
        // →toggleを使用すると表示する→隠れるという表示になってしまうため、1回目の処理だけtoggleの処理を挟む
        if(jankenCount == 1){
          $('#echo').toggle();
          $("#resultMsg").toggle();
        }
      }
      ,1000);
      // 実装方針4.試行のたびに画像を隠す
      // →次の処理が開始する前に画像を隠す処理を入れる
      $('.img').hide();
      catJanken();
    }
  });

    // $('#resultMsg').click(function(){
    //   $('.img').hide();
    //   $('#echo').toggle();
    //   $("#resultMsg").toggle();
    //   $(".start").show();
    //   console.log("スタートボタン");  
    // })

    // 音声再生

    function audio() {
      document.getElementById('btn_audio').currentTime = 0; //連続クリックに対応
      document.getElementById('btn_audio').play(); //クリックしたら音を再生
  }

