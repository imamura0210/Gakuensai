enchant();
window.onload = function() {
  var game_ = new Game(320, 320); // 表示領域の大きさを設定
  game_.fps = 24;                 // ゲームの進行スピードを設定
  game_.preload('./img/chara2.png', './img/start.png', './img/gameover.png','./img/bg1.png', './img/bg2.png', './img/hurdle.png', './img/minihurdle.png', './img/bird.png'); // ゲームに使う素材を、あらかじめ読み込む
  game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行

    /*
    タイトルシーン
    */
    var createStartScene = function() {
        var scene = new Scene();                                // 新しいシーンを作る
        scene.backgroundColor = '#fcc800';                      // シーンの背景色を設定

        // スタート画像設定
        var startImage = new Sprite(236, 48);                   // スプライトを作る
        startImage.image = game_.assets['./img/start.png'];     // スタート画像を設定
        startImage.x = 42;                                      // 横位置調整
        startImage.y = 136;                                     // 縦位置調整
        scene.addChild(startImage);                             // シーンに追加

        // タイトルラベル設定
        var title = new Label('KURE RUNNER');                   // ラベルを作る
        title.textAlign = 'center';                             // 文字を中央寄せ
        title.color = '#ffffff';                                // 文字を白色に
        title.x = 0;                                            // 横位置調整
        title.y = 96;                                           // 縦位置調整
        title.font = '28px Impact';                         // 28pxのゴシック体にする
        scene.addChild(title);                                  // シーンに追加

        // サブタイトルラベル設定
        var subTitle = new Label('- クリックで障害物を避けよう  -');// ラベルを作る
        subTitle.textAlign = 'center';                          // 文字中央寄せ
        subTitle.x = 0;                                            // 横位置調整
        subTitle.y = 196;                                       // 縦位置調整
        subTitle.font = '14px Impact';                      // 14pxのゴシック体にする
        scene.addChild(subTitle);                               // シーンに追加

        //ランキングラベル設定
        var toRankScene = new Label('RANKING');
        toRankScene.textAlign = 'center';
        toRankScene.x = 0;
        toRankScene.y = 226;
        toRankScene.font = '20px Impact';
        scene.addChild(toRankScene);


        // スタート画像にタッチイベントを設定
        startImage.addEventListener(Event.TOUCH_START, function(e) {
          game_.replaceScene(createGameScene());
        });

        //ランキングラベルにタッチイベントを設定
        toRankScene.addEventListener(Event.TOUCH_START, function(e){
          game_.replaceScene(createRankScene());
        })
        // タイトルシーンを返す
        return scene;
      };
    /*
    ゲームシーン
    */
    var createGameScene = function() {
        var GROUND_LINE = 250;                                 // 地平線の高さ（固定）
        var SCROLL_SPEED = 10  　　　　　　　　　　　　　　　　　 // スクロールの速さ
        var scene = new Scene();                           　　// 新しいシーンを作る
        var scroll = 0; 　　　　　　　　　　　　　　　　　　　　  // スクロール量を記録する変数
        scene.backgroundColor = '#8cc820';

        // スクロールする背景1の設定
        var bg1 = new Sprite(320, 320);
        bg1.image = game_.assets['./img/bg1.png'];
        bg1.x = 0;
        bg1.y = 0;
        scene.addChild(bg1);

        // スクロールする背景2の設定
        var bg2 = new Sprite(320, 320);
        bg2.image = game_.assets['./img/bg2.png'];
        bg2.x = 320;
        bg2.y = 0;
        scene.addChild(bg2);

        // スコア表示用ラベルの設定
        var scoreLabel = new Label("");
        scoreLabel.color = '#000000';
        scoreLabel.font = '15px Impact';
        scoreLabel.x = 250;
        scene.addChild(scoreLabel);

        // ハードルの設定
        var hurdleA = new Sprite(50, 75);
        hurdleA.image = game_.assets['./img/hurdle.png'];
        hurdleA.x = -hurdleA.width;                  //画面外に隠しておく
        hurdleA.y = (GROUND_LINE - hurdleA.height) * 1.1;
        scene.addChild(hurdleA);

        // ハードルの設定2
        var hurdleB = new Sprite(50, 75);
        hurdleB.image = game_.assets['./img/hurdle.png'];
        hurdleB.x = -hurdleB.width;                  //画面外に隠しておく
        hurdleB.y = (GROUND_LINE - hurdleB.height) * 1.1;
        scene.addChild(hurdleB);

        // ハードルの設定3
        var hurdleC = new Sprite(50, 75);
        hurdleC.image = game_.assets['./img/hurdle.png'];
        hurdleC.x = -hurdleC.width;                  //画面外に隠しておく
        hurdleC.y = (GROUND_LINE - hurdleC.height) * 1.1;
        scene.addChild(hurdleC);

        // ミニハードルの設定
        var miniHurdleA = new Sprite(45, 35);
        miniHurdleA.image = game_.assets['./img/minihurdle.png'];
        miniHurdleA.x = -miniHurdleA.width;                //画面外に隠しておく
        miniHurdleA.y = (GROUND_LINE - miniHurdleA.height) * 1.02;
        scene.addChild(miniHurdleA);

        // ミニハードルの設定２
        var miniHurdleB = new Sprite(45, 35);
        miniHurdleB.image = game_.assets['./img/minihurdle.png'];
        miniHurdleB.x = -miniHurdleB.width;                //画面外に隠しておく
        miniHurdleB.y = (GROUND_LINE - miniHurdleB.height) * 1.02;
        scene.addChild(miniHurdleB);

        // ミニハードルの設定３
        var miniHurdleC = new Sprite(45, 35);
        miniHurdleC.image = game_.assets['./img/minihurdle.png'];
        miniHurdleC.x = -miniHurdleC.width;
        miniHurdleC.y = (GROUND_LINE - miniHurdleC.height) * 1.02;
        scene.addChild(miniHurdleC);

        // 鳥の設定
        var bird1 = new Sprite(64, 32);
        bird1.image = game_.assets['./img/bird.png'];
        bird1.x = -bird1.width;
        bird1.y = 150;
        scene.addChild(bird1);

        // 鳥の設定2
        var bird2 = new Sprite(64, 32);
        bird2.image = game_.assets['./img/bird.png'];
        bird2.x = -bird1.width;
        bird2.y = 150;
        scene.addChild(bird2);

        // 鳥の設定3
        var bird3 = new Sprite(64, 32);
        bird3.image = game_.assets['./img/bird.png'];
        bird3.x = -bird3.width;
        bird3.y = 190;
        scene.addChild(bird3);

        // くれの設定
        var Kure = new Sprite(32, 32);
        Kure.image = game_.assets['./img/chara2.png'];
        Kure.x = 80;
        Kure.y = GROUND_LINE - Kure.height;
        scene.addChild(Kure);

        // くれの当たり判定用スプライトの設定
        var Kure_hit = new Sprite(1, 1)
        Kure_hit.x = Kure.x + Kure.width / 2;
        Kure_hit.y = Kure.y + Kure.height / 2;
        scene.addChild(Kure_hit);

        // くれがやられた関数
        var KureDead = function() {
          game_.pushScene(createGameoverScene(scroll));
        }

        //障害物が複数出現する際の処理に使用するフラグ
        var miniFlag = 0;
        var hurFlag = 0;
        var birFlag = 0;

        // シーンに毎フレームイベントを設定
        scene.addEventListener(Event.ENTER_FRAME, function() {
          scroll += SCROLL_SPEED / 10;
          scoreLabel.text = 'SCORE:'+scroll.toString(); // スコア表示を更新

          // 当たり判定用スプライトをくれの上下中心に置く
          Kure_hit.x = Kure.x + Kure.width/2;
          Kure_hit.y = Kure.y + Kure.height/2;

          // 障害物の出現タイミング
          //分岐処理で難易度調整
          if(scroll < 500){
            if(scroll % 40 === 0 && scroll % 120 != 0){
              if(miniFlag === 0){
                miniHurdleA.x = 320;
                miniFlag++;
              } else if(miniFlag === 1){
                miniHurdleB.x = 320;
                miniFlag++;
              } else {
                miniHurdleC.x = 320;
                miniFlag = 0;
              }
              }
            if(scroll % 120 === 0){
              if(hurFlag === 0){
                hurdleA.x = 320;
                hurFlag++;
              } else if(hurFlag == 1){
                hurdleB.x = 320;
                hurFlag++;
              } else {
                hurdleC.x = 320;
                hurFlag = 0;
              }
            }
          } else if(scroll >= 500 && scroll < 1000){
            if(scroll % 40 === 0 && scroll % 80 != 0 && scroll % 120 != 0 && scroll % 160 != 0){
              if(miniFlag === 0){
                miniHurdleA.x = 320;
                miniFlag++;
              } else if(miniFlag === 1){
                miniHurdleB.x = 320;
                miniFlag++;
              } else {
                miniHurdleC.x = 320;
                miniFlag = 0;
              }
            }
            if((scroll % 80 === 0 || scroll % 120 === 0) && scroll % 160 != 0){
              if(hurFlag === 0){
                hurdleA.x = 320;
                hurFlag++;
              } else if(hurFlag === 1){
                hurdleB.x = 320;
                hurFlag++;
              } else {
                hurdleC.x = 320;
                hurFlag = 0;
              }
            }
            if(scroll % 160 === 0){
              if(birFlag === 0){
                bird1.x = 320;
                birFlag++;
              }else{
                bird2.x = 320;
                birFlag--;
              }
            }
          } else if(scroll >= 1000 && scroll < 1500){
            if(scroll % 30 === 0 && scroll % 90 != 0 && scroll % 120 != 0){
              if(miniFlag === 0){
                miniHurdleA.x = 320;
                miniFlag++;
              } else if(miniFlag === 1){
                miniHurdleB.x = 320;
                miniFlag++;
              } else {
                miniHurdleC.x = 320;
                miniFlag = 0;
              }
            }
            if(scroll % 90 === 0 && scroll % 120 != 0){
              if(hurFlag === 0){
                hurdleA.x = 320;
                hurFlag++;
              } else if(hurFlag === 1){
                hurdleB.x = 320;
                hurFlag++;
              } else {
                hurdleC.x = 320;
                hurFlag = 0;
              }
            }
            if(scroll % 120 === 0){
              if(birFlag === 0){
                bird1.x = 320;
                birFlag++;
              }else{
                bird2.x = 320;
                birFlag--;
              }
            }
          }else if(scroll >= 1500){
            if(scroll % 30 === 0 && scroll % 90 != 0 && scroll % 120 != 0){
              if(hurFlag === 0){
                hurdleA.x = 320;
                hurFlag++;
              } else if(hurFlag === 1){
                hurdleB.x = 320;
                hurFlag++;
              } else {
                hurdleC.x = 320;
                hurFlag = 0;
              }
            }
            if(scroll % 90 === 0 && scroll % 120 != 0){
              bird1.x = 320;
            }
            if(scroll % 120 === 0){
              bird3.x = 320;
            }
          }


          // 障害物のスクロールと、くれとの接触の設定
          if (hurdleA.x > -hurdleA.width) {       // ハードルが出現している（画面内にある）とき
            hurdleA.x -= SCROLL_SPEED;         // ハードルをスクロール
            if (hurdleA.intersect(Kure_hit)) { // ハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (hurdleB.x > -hurdleB.width) {       // ハードルが出現している（画面内にある）とき
            hurdleB.x -= SCROLL_SPEED;         // ハードルをスクロール
            if (hurdleB.intersect(Kure_hit)) { // ハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (hurdleC.x > -hurdleC.width) {       // ハードルが出現している（画面内にある）とき
            hurdleC.x -= SCROLL_SPEED;         // ハードルをスクロール
            if (hurdleC.intersect(Kure_hit)) { // ハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (miniHurdleA.x > -miniHurdleA.width) {     // ミニハードルが出現している（画面内にある）とき
            miniHurdleA.x -= SCROLL_SPEED;        // ミニハードルをスクロール
            if (miniHurdleA.intersect(Kure_hit)) {// ミニハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (miniHurdleB.x > -miniHurdleB.width) {     // ミニハードルが出現している（画面内にある）とき
            miniHurdleB.x -= SCROLL_SPEED;        // ミニハードルをスクロール
            if (miniHurdleB.intersect(Kure_hit)) {// ミニハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (miniHurdleC.x > -miniHurdleC.width) {     // ミニハードルが出現している（画面内にある）とき
            miniHurdleC.x -= SCROLL_SPEED;        // ミニハードルをスクロール
            if (miniHurdleC.intersect(Kure_hit)) {// ミニハードルとくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (bird1.x > -bird1.width) {           // 鳥が出現している（画面内にある）とき
            bird1.x -= SCROLL_SPEED * 1.2;     // 鳥を1.2倍速でスクロール
            if(scroll % 10 === 0){
              if (bird1.frame > 0) {             // 鳥のフレーム番号を0, 1, 0, 1と切り替えて羽ばたかせる
                bird1.frame = 0;
              } else {
                bird1.frame = 1;
              }
            }

            if (bird1.intersect(Kure_hit)) {   // 鳥とくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (bird2.x > -bird2.width) {           // 鳥が出現している（画面内にある）とき
            bird2.x -= SCROLL_SPEED * 1.2;     // 鳥を1.2倍速でスクロール
            if(scroll % 10 === 0){
              if (bird2.frame > 0) {             // 鳥のフレーム番号を0, 1, 0, 1と切り替えて羽ばたかせる
                bird2.frame = 0;
              } else {
                bird2.frame = 1;
              }
            }

            if (bird2.intersect(Kure_hit)) {   // 鳥とくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }
          if (bird3.x > -bird3.width) {           // 鳥が出現している（画面内にある）とき
            bird3.x -= SCROLL_SPEED * 1.2;     // 鳥を1.2倍速でスクロール
            if(scroll % 10 === 0){
              if (bird3.frame > 0) {             // 鳥のフレーム番号を0, 1, 0, 1と切り替えて羽ばたかせる
                bird3.frame = 0;
              } else {
                bird3.frame = 1;
              }
            }

            if (bird3.intersect(Kure_hit)) {   // 鳥とくれがぶつかったとき
              KureDead();                   // くれがやられた関数を実行
            }
          }

          // くれのアニメーション
          if(scroll % 3 == 1){
            Kure.frame ++;
            if (Kure.frame > 2) {
              Kure.frame = 0;
            }
          }

          // 背景をスクロールさせる
          bg1.x -= SCROLL_SPEED;                // 背景1をスクロール
          bg2.x -= SCROLL_SPEED;                // 背景2をスクロール
          if (bg1.x <= -320) {                  // 背景1が画面外に出たら
            bg1.x = 320;                      // 画面右端に移動
          }
          if (bg2.x <= -320) {                  // 背景2が画面外に出たら
            bg2.x = 320;                      // 画面右端に移動
          }
        });

        // シーンにタッチイベントを追加
        scene.addEventListener(Event.TOUCH_START, function(e){
          // くれをジャンプさせる
          Kure.tl.moveBy(0, -80, 6, enchant.Easing.CUBIC_EASEOUT) // 12フレームかけて現在の位置から上に120px移動
          .moveBy(0, 80, 6, enchant.Easing.CUBIC_EASEIN);   // 12フレームかけて現在の位置から下に120px移動
          // 以下はコメントアウトまたは削除
          // タッチでゲームオーバーシーンに遷移(仮)
          // game_.pushScene(createGameoverScene());// ゲームオーバーシーンをゲームシーンに重ねる(push)
        });

        // ゲームシーンを返す
        return scene;
      };
    /**
    * ゲームオーバーシーン
    *
    * ゲームオーバーシーンを作り、返す関数です。
    * createGameoverScore(※引数) ※引数にスコアを入れると画面にスコアが表示されます
    * ※は任意の名前でOKで、カンマ区切りで複数設定できます。
    * 例) var createGameoverScore = function (resultScore, test1, test2) {
    */
    var createGameoverScene = function(resultScore) {
        var scene = new Scene();                                   // 新しいシーンを作る
        scene.backgroundColor = '#303030';                         // シーンの背景色を設定
        // ゲームオーバーラベル設定
        var gameover = new Label('GAMEOVER');                   // スプライトを作る
        gameover.textAlign = 'center';
        gameover.color = '#ffffff';
        gameover.x = 0;                                      // 横位置調整
        gameover.y = 0;                                     // 縦位置調整
        gameover.font = '30px Impact';
        scene.addChild(gameover);                             // シーンに追加

        //ランキング
        var rankHead = new Label('rank');
        rankHead.color = '#ffffff';
        rankHead.x = 25;
        rankHead.y = 60;
        rankHead.font = '20px Impact';
        scene.addChild(rankHead);

        var firstRank = new Label('1');
        firstRank.color = '#ffffff';
        firstRank.x = 36;
        firstRank.y = 90;
        firstRank.font = '20px Impact';
        scene.addChild(firstRank);

        var secondRank = new Label('2');
        secondRank.color = '#ffffff';
        secondRank.x = 36;
        secondRank.y = 120;
        secondRank.font = '20px Impact';
        scene.addChild(secondRank);

        var thirdRank = new Label('3');
        thirdRank.color = '#ffffff';
        thirdRank.x = 36;
        thirdRank.y = 150;
        thirdRank.font = '20px Impact';
        scene.addChild(thirdRank);

        var fourthRank = new Label('4');
        fourthRank.color = '#ffffff';
        fourthRank.x = 36;
        fourthRank.y = 180;
        fourthRank.font = '20px Impact';
        scene.addChild(fourthRank);

        var fifthRank = new Label('5');
        fifthRank.color = '#ffffff';
        fifthRank.x = 36;
        fifthRank.y = 210;
        fifthRank.font = '20px Impact';
        scene.addChild(fifthRank);

        //名前
        var nameHead = new Label('name');
        nameHead.color = "#ffffff";
        nameHead.x = 100;
        nameHead.y = 60;
        nameHead.font = '20px Impact';
        scene.addChild(nameHead);

        var firstName = new Label('くさの');
        firstName.color = "#ffffff";
        firstName.x = 100;
        firstName.y = 90;
        firstName.font = '15px Impact';
        scene.addChild(firstName);

        var secondName = new Label('かわぐち');
        secondName.color = '#ffffff';
        secondName.x = 100;
        secondName.y = 120;
        secondName.font = '15px Impact';
        scene.addChild(secondName);

        var thirdName = new Label('いまむら');
        thirdName.color = '#ffffff';
        thirdName.x = 100;
        thirdName.y = 150;
        thirdName.font = '15px Impact';
        scene.addChild(thirdName);

        var fourthName = new Label('なかざわ');
        fourthName.color = '#ffffff';
        fourthName.x = 100;
        fourthName.y = 180;
        fourthName.font = '15px Impact';
        scene.addChild(fourthName);

        var fifthName = new Label('かまた');
        fifthName.color = '#ffffff';
        fifthName.x = 100;
        fifthName.y = 210;
        fifthName.font = '15px Impact';
        scene.addChild(fifthName);

        //スコア
        var scoreHead = new Label('score');
        scoreHead.color = '#ffffff';
        scoreHead.x = 200;
        scoreHead.y = 60;
        scoreHead.font = '20px Impact';
        scene.addChild(scoreHead);

        var firstScore = new Label('10000');
        firstScore.color = "#ffffff";
        firstScore.x = 200;
        firstScore.y = 90;
        firstScore.font = '15px Impact';
        scene.addChild(firstScore);

        var secondScore = new Label('9000');
        secondScore.color = '#ffffff';
        secondScore.x = 200;
        secondScore.y = 120;
        secondScore.font = '15px Impact';
        scene.addChild(secondScore);

        var thirdScore = new Label('8000');
        thirdScore.color = '#ffffff';
        thirdScore.x = 200;
        thirdScore.y = 150;
        thirdScore.font = '15px Impact';
        scene.addChild(thirdScore);

        var fourthScore = new Label('7000');
        fourthScore.color = '#ffffff';
        fourthScore.x = 200;
        fourthScore.y = 180;
        fourthScore.font = '15px Impact';
        scene.addChild(fourthScore);

        var fifthScore = new Label('0');
        fifthScore.color = '#ffffff';
        fifthScore.x = 200;
        fifthScore.y = 210;
        fifthScore.font = '15px Impact';
        scene.addChild(fifthScore);

        // スコアラベル設定
        var label = new Label('YOUR SCORE:'+resultScore);            // ラベルを作る スコアを代入
        label.textAlign = 'center';                                // 文字を中央寄せ
        label.color = '#fff';                                      // 文字を白色に
        label.x = 0;                                               // 横位置調整
        label.y = 240;                                              // 縦位置調整
        label.font = '25px Impact';                            // 40pxのゴシック体にする
        scene.addChild(label);                                     // シーンに追加

        // リトライラベル(ボタン)設定
        var retryLabel = new Label('RETRY');                  // ラベルを作る
        retryLabel.color = '#ffffff';                                 // 文字を白色に
        retryLabel.x = 10;                                          // 横位置調整
        retryLabel.y = 285;                                        // 縦位置調整
        retryLabel.font = '25px Impact';                       // 20pxのゴシック体にする
        scene.addChild(retryLabel);                                // シーンに追加

        //タイトルに戻るラベル(ボタン)設定
        var exit = new Label("EXIT");
        exit.color = '#ffffff';
        exit.x = 260;
        exit.y = 285;
        exit.font = '25px Impact';
        scene.addChild(exit);

        // リトライラベルにタッチイベントを設定
        retryLabel.addEventListener(Event.TOUCH_START, function(e) {
          game_.replaceScene(createGameScene());    // 現在表示しているシーンをタイトルシーンに置き換える
        });

        //タイトルに戻るタッチイベント設定
        exit.addEventListener(Event.TOUCH_START,function(e){
          game_.replaceScene(createStartScene());
        })
        return scene;
      };
      /*
      ランキングシーン
      */
      var createRankScene = function() {
          var scene = new Scene();                                   // 新しいシーンを作る
          scene.backgroundColor = '#303030';                         // シーンの背景色を設定
          // スコアランキング設定
          var ranking = new Label('SCORE RANKING');                   // スプライトを作る
          ranking.textAlign = 'center';
          ranking.color = '#ffffff';
          ranking.x = 0;                                      // 横位置調整
          ranking.y = 10;                                     // 縦位置調整
          ranking.font = '30px Impact';
          scene.addChild(ranking);                             // シーンに追加

          //ランキング
          var rankHead = new Label('rank');
          rankHead.color = '#ffffff';
          rankHead.x = 25;
          rankHead.y = 60;
          rankHead.font = '20px Impact';
          scene.addChild(rankHead);

          var firstRank = new Label('1');
          firstRank.color = '#ffffff';
          firstRank.x = 36;
          firstRank.y = 90;
          firstRank.font = '20px Impact';
          scene.addChild(firstRank);

          var secondRank = new Label('2');
          secondRank.color = '#ffffff';
          secondRank.x = 36;
          secondRank.y = 120;
          secondRank.font = '20px Impact';
          scene.addChild(secondRank);

          var thirdRank = new Label('3');
          thirdRank.color = '#ffffff';
          thirdRank.x = 36;
          thirdRank.y = 150;
          thirdRank.font = '20px Impact';
          scene.addChild(thirdRank);

          var fourthRank = new Label('4');
          fourthRank.color = '#ffffff';
          fourthRank.x = 36;
          fourthRank.y = 180;
          fourthRank.font = '20px Impact';
          scene.addChild(fourthRank);

          var fifthRank = new Label('5');
          fifthRank.color = '#ffffff';
          fifthRank.x = 36;
          fifthRank.y = 210;
          fifthRank.font = '20px Impact';
          scene.addChild(fifthRank);

          //名前
          var nameHead = new Label('name');
          nameHead.color = "#ffffff";
          nameHead.x = 100;
          nameHead.y = 60;
          nameHead.font = '20px Impact';
          scene.addChild(nameHead);

          var firstName = new Label('くさの');
          firstName.color = "#ffffff";
          firstName.x = 100;
          firstName.y = 90;
          firstName.font = '15px Impact';
          scene.addChild(firstName);

          var secondName = new Label('かわぐち');
          secondName.color = '#ffffff';
          secondName.x = 100;
          secondName.y = 120;
          secondName.font = '15px Impact';
          scene.addChild(secondName);

          var thirdName = new Label('いまむら');
          thirdName.color = '#ffffff';
          thirdName.x = 100;
          thirdName.y = 150;
          thirdName.font = '15px Impact';
          scene.addChild(thirdName);

          var fourthName = new Label('なかざわ');
          fourthName.color = '#ffffff';
          fourthName.x = 100;
          fourthName.y = 180;
          fourthName.font = '15px Impact';
          scene.addChild(fourthName);

          var fifthName = new Label('かまた');
          fifthName.color = '#ffffff';
          fifthName.x = 100;
          fifthName.y = 210;
          fifthName.font = '15px Impact';
          scene.addChild(fifthName);

          //スコア
          var scoreHead = new Label('score');
          scoreHead.color = '#ffffff';
          scoreHead.x = 200;
          scoreHead.y = 60;
          scoreHead.font = '20px Impact';
          scene.addChild(scoreHead);

          var firstScore = new Label('10000');
          firstScore.color = "#ffffff";
          firstScore.x = 200;
          firstScore.y = 90;
          firstScore.font = '15px Impact';
          scene.addChild(firstScore);

          var secondScore = new Label('9000');
          secondScore.color = '#ffffff';
          secondScore.x = 200;
          secondScore.y = 120;
          secondScore.font = '15px Impact';
          scene.addChild(secondScore);

          var thirdScore = new Label('8000');
          thirdScore.color = '#ffffff';
          thirdScore.x = 200;
          thirdScore.y = 150;
          thirdScore.font = '15px Impact';
          scene.addChild(thirdScore);

          var fourthScore = new Label('7000');
          fourthScore.color = '#ffffff';
          fourthScore.x = 200;
          fourthScore.y = 180;
          fourthScore.font = '15px Impact';
          scene.addChild(fourthScore);

          var fifthScore = new Label('0');
          fifthScore.color = '#ffffff';
          fifthScore.x = 200;
          fifthScore.y = 210;
          fifthScore.font = '15px Impact';
          scene.addChild(fifthScore);



          // リトライラベル(ボタン)設定
          var playLabel = new Label('GAME PLAY');                  // ラベルを作る
          playLabel.color = '#ffffff';                                 // 文字を白色に
          playLabel.x = 10;                                          // 横位置調整
          playLabel.y = 285;                                        // 縦位置調整
          playLabel.font = '25px Impact';                       // 20pxのゴシック体にする
          scene.addChild(playLabel);                                // シーンに追加

          //タイトルに戻るラベル(ボタン)設定
          var exit = new Label("EXIT");
          exit.color = '#ffffff';
          exit.x = 265;
          exit.y = 285;
          exit.font = '25px Impact';
          scene.addChild(exit);

          // リトライラベルにタッチイベントを設定
          playLabel.addEventListener(Event.TOUCH_START, function(e) {
            game_.replaceScene(createGameScene());
          });

          //タイトルに戻るタッチイベント設定
          exit.addEventListener(Event.TOUCH_START,function(e){
            game_.replaceScene(createStartScene());
          })
          return scene;
        };
    game_.replaceScene(createStartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
  }


  game_.start(); // ゲームをスタートさせます
};
