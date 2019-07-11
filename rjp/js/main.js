enchant();
window.onload = function() {
    var game_ = new Game(320, 320); // 表示領域の大きさを設定
    game_.fps = 24;                 // ゲームの進行スピードを設定
    game_.preload('./img/chara2.png', './img/start.png', './img/gameover.png','./img/bgg7.png', './img/bgg8.png', './img/hurdle.png', './img/igaguri.png', './img/bird.png'); // ゲームに使う素材を、あらかじめ読み込む
    game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行します
        /**
        * タイトルシーン
        *
        * タイトルシーンを作り、返す関数です。
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
            var title = new Label('クレランナー');                     // ラベルを作る
            title.textAlign = 'center';                             // 文字を中央寄せ
            title.color = '#ffffff';                                // 文字を白色に
            title.x = 0;                                            // 横位置調整
            title.y = 96;                                           // 縦位置調整
            title.font = '28px sans-serif';                         // 28pxのゴシック体にする
            scene.addChild(title);                                  // シーンに追加
            // サブタイトルラベル設定
            var subTitle = new Label('- クリックで障害物を避けよう  -');  // ラベルを作る
            subTitle.textAlign = 'center';                          // 文字中央寄せ
            title.x = 0;                                            // 横位置調整
            subTitle.y = 196;                                       // 縦位置調整
            subTitle.font = '14px sans-serif';                      // 14pxのゴシック体にする
            scene.addChild(subTitle);                               // シーンに追加

            // スタート画像にタッチイベントを設定
            startImage.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(createGameScene());    // 現在表示しているシーンをゲームシーンに置き換える
            });
            // タイトルシーンを返します。
            return scene;
        };
        /**
        * ゲームシーン
        *
        * ゲームシーンを作り、返す関数です。
        */
        var createGameScene = function() {
          var GROUND_LINE = 250;   // 地平線の高さ（固定）
          var SCROLL_SPEED = 5;   // スクロールの速さ(固定)
          var scene = new Scene();                            // 新しいシーンを作る
          var scroll = 0; // スクロール量を記録する変数
          scene.backgroundColor = '#8cc820';

          // スクロールする背景1の設定
          var bg1 = new Sprite(320, 320);            // スプライトを作る
          bg1.image = game_.assets['./img/bgg7.png']; // 画像を設定
          bg1.x = 0;                                 // 横位置調整
          bg1.y = 0;                                 // 縦位置調整
          scene.addChild(bg1);                       // シーンに追加

          // スクロールする背景2の設定
          var bg2 = new Sprite(320, 320);            // スプライトを作る
          bg2.image = game_.assets['./img/bgg8.png']; // 画像を設定
          bg2.x = 320;                               // 横位置調整 320px右に配置(bg1の右隣に隙間なく並べる)
          bg2.y = 0;                                 // 縦位置調整
          scene.addChild(bg2);                       // シーンに追加

          // スコア表示用ラベルの設定
          var scoreLabel = new Label("");            // ラベルを作る
          scoreLabel.color = '#fff';                 // 白色に設定
          scene.addChild(scoreLabel);                // シーンに追加

          // ハードルの設定
          var hurdleA = new Sprite(50, 75);          // スプライトを作る
          hurdleA.image = game_.assets['./img/hurdle.png']; // 画像を設定
          hurdleA.x = -hurdleA.width;                  // 横位置調整 画面外に隠しておく
          hurdleA.y = (GROUND_LINE - hurdleA.height) * 1.1;    // 縦位置調整 ハードルの下端を地面の高さと合わせる
          scene.addChild(hurdleA);                    // シーンに追加

          // ハードルの設定2
          var hurdleB = new Sprite(50, 75);          // スプライトを作る
          hurdleB.image = game_.assets['./img/hurdle.png']; // 画像を設定
          hurdleB.x = -hurdleB.width;                  // 横位置調整 画面外に隠しておく
          hurdleB.y = (GROUND_LINE - hurdleB.height) * 1.1;    // 縦位置調整 ハードルの下端を地面の高さと合わせる
          scene.addChild(hurdleB);                    // シーンに追加

          // いがぐりの設定
          var igaguriA = new Sprite(45, 35);          // スプライトを作る
          igaguriA.image = game_.assets['./img/igaguri.png']; // 画像を設定
          igaguriA.x = -igaguriA.width;                // 横位置調整 画面外に隠しておく
          igaguriA.y = GROUND_LINE - igaguriA.height;  // 縦位置調整 いがぐり下端を地面の高さと合わせる
          scene.addChild(igaguriA);                   // シーンに追加

          // いがぐりの設定２
          var igaguriB = new Sprite(45, 35);          // スプライトを作る
          igaguriB.image = game_.assets['./img/igaguri.png']; // 画像を設定
          igaguriB.x = -igaguriB.width;                // 横位置調整 画面外に隠しておく
          igaguriB.y = GROUND_LINE - igaguriB.height;  // 縦位置調整 いがぐり下端を地面の高さと合わせる
          scene.addChild(igaguriB);                   // シーンに追加

          // いがぐりの設定３
          var igaguriC = new Sprite(45, 35);          // スプライトを作る
          igaguriC.image = game_.assets['./img/igaguri.png']; // 画像を設定
          igaguriC.x = -igaguriC.width;                // 横位置調整 画面外に隠しておく
          igaguriC.y = GROUND_LINE - igaguriC.height;  // 縦位置調整 いがぐり下端を地面の高さと合わせる
          scene.addChild(igaguriC);                   // シーンに追加

          // 鳥の設定
          var bird = new Sprite(64, 32);             // スプライトを作る
          bird.image = game_.assets['./img/bird.png']; // 画像を設定
          bird.x = -bird.width;                      // 鳥を左側の画面外に隠します
          bird.y = 150;                              // 鳥の飛ぶ高さを設定します
          scene.addChild(bird);                      // シーンに鳥を追加します

          // くまの設定
          var kuma = new Sprite(32, 32);             // スプライトを作る
          kuma.image = game_.assets['./img/chara2.png']; // 画像を設定
          kuma.x = 80;                               // 横位置調整 画面左側に配置
          kuma.y = GROUND_LINE - kuma.height;        // 縦位置調整 くまの下端を地面の高さに合わせる
          scene.addChild(kuma);                      // シーンに追加
          // くまの当たり判定用スプライトの設定
          var kuma_hit = new Sprite(1, 1);           // スプライトを作る（幅1, 高さ1）
          // kuma_hit.image =                        // 画像は設定しない（透明）
          kuma_hit.x = kuma.x + kuma.width / 2;      // 横位置調整 くまの左右中央に配置
          kuma_hit.y = kuma.y + kuma.height / 2;     // 縦位置調整くまの上下中央に配置
          scene.addChild(kuma_hit);                  // シーンに追加

          // くまがやられた関数
          var kumaDead = function() {
            /*alert("ヤラレチャッタ");*/              // ポップアップメッセージを出す
            kuma.frame = 3;                       // くまを涙目にする
            game_.pushScene(createGameoverScene(scroll)); // ゲームオーバーシーンをゲームシーンに重ねる（push）
          }

          var xx = 0;
          var igaFlag = 0;
          var hurFlag = 0;

          // シーンに毎フレームイベントを設定
          scene.addEventListener(Event.ENTER_FRAME, function() {
            scroll += SCROLL_SPEED * 2;                  // 走った距離を記録
            scoreLabel.text = scroll.toString(); // スコア表示を更新


            // 当たり判定用スプライトをくまの上下中心に置く
            kuma_hit.x = kuma.x + kuma.width/2;
            kuma_hit.y = kuma.y + kuma.height/2;


            // 障害物の出現タイミング
            if(scroll < 5000){
              if(scroll % 400 === 0 && scroll % 1200 != 0){

                if(igaFlag === 0){
                  igaguriA.x = 320;
                  igaFlag++;
                } else if(igaFlag === 1){
                  igaguriB.x = 320;
                  igaFlag++;
                } else {
                  igaguriC.x = 320;
                  igaFlag = 0;
                }
              }
              if(scroll % 1200 === 0){
                if(hurFlag === 0){
                  hurdleA.x = 320;
                  hurFlag++;
                } else {
                  hurdleB.x = 320;
                  hurFlag--;
                }
              }
            } else if(scroll >= 5000 && scroll < 10000){
              if(scroll % 400 === 0 && scroll % 800 != 0 && scroll % 1500 != 0){
                if(igaFlag === 0){
                  igaguriA.x = 320;
                  igaFlag++;
                } else if(igaFlag === 1){
                  igaguriB.x = 320;
                  igaFlag++;
                } else {
                  igaguriC.x = 320;
                  igaFlag = 0;
                }
              }
              if(scroll % 800 === 0 && scroll % 1500 != 0){
                if(hurFlag === 0){
                  hurdleA.x = 320;
                  hurFlag++;
                } else {
                  hurdleB.x = 320;
                  hurFlag--;
                }
              }
              if(scroll % 1500 === 0){
                bird.x = 320;
              }
            } else if(scroll >= 10000){
              if(scroll % 200 === 0 && scroll % 600 != 0 && scroll % 800 != 0){
                if(igaFlag === 0){
                  igaguriA.x = 320;
                  igaFlag++;
                } else if(igaFlag === 1){
                  igaguriB.x = 320;
                  igaFlag++;
                } else {
                  igaguriC.x = 320;
                  igaFlag = 0;
                }
              }
              if(scroll % 600 === 0 && scroll % 800 != 0){
                if(hurFlag === 0){
                  hurdleA.x = 320;
                  hurFlag++;
                } else {
                  hurdleB.x = 320;
                  hurFlag--;
                }
              }
              if(scroll % 800 === 0){
                bird.x = 320;
              }
            }


            // 障害物のスクロールと、くまとの接触の設定
            if (hurdleA.x > -hurdleA.width) {       // ハードルが出現している（画面内にある）とき
              hurdleA.x -= SCROLL_SPEED;         // ハードルをスクロール
              if (hurdleA.intersect(kuma_hit)) { // ハードルとくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }
            if (hurdleB.x > -hurdleB.width) {       // ハードルが出現している（画面内にある）とき
              hurdleB.x -= SCROLL_SPEED;         // ハードルをスクロール
              if (hurdleB.intersect(kuma_hit)) { // ハードルとくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }
            if (igaguriA.x > -igaguriA.width) {     // いがぐりが出現している（画面内にある）とき
              igaguriA.x -= SCROLL_SPEED;        // いがぐりをスクロール
              if (igaguriA.intersect(kuma_hit)) {// いがぐりとくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }
            if (igaguriB.x > -igaguriB.width) {     // いがぐりが出現している（画面内にある）とき
              igaguriB.x -= SCROLL_SPEED;        // いがぐりをスクロール
              if (igaguriB.intersect(kuma_hit)) {// いがぐりとくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }
            if (igaguriC.x > -igaguriC.width) {     // いがぐりが出現している（画面内にある）とき
              igaguriC.x -= SCROLL_SPEED;        // いがぐりをスクロール
              if (igaguriC.intersect(kuma_hit)) {// いがぐりとくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }
            if (bird.x > -bird.width) {           // 鳥が出現している（画面内にある）とき
              bird.x -= SCROLL_SPEED * 1.3;     // 鳥を1.2倍速でスクロール
              if(xx % 10 === 0){
                if (bird.frame > 0) {             // 鳥のフレーム番号を0, 1, 0, 1と切り替えて羽ばたかせる
                  bird.frame = 0;
                } else {
                  bird.frame = 1;
                }
              }
              xx++;

              if (bird.intersect(kuma_hit)) {   // 鳥とくまがぶつかったとき
                kumaDead();                   // くまがやられた関数を実行
              }
            }

            // くまのフレームを0, 1, 2, 0, 1, 2…… と繰り返します
            // 正確には0, 1, 2, 1, 0, 1, 2, 1, 0, 1…… ですが、
            // 0, 1, 2, 0, 1, 2…… でも十分走っているように見えるため、良いものとします
            if(xx % 3 == 1){
              kuma.frame ++;
              if (kuma.frame > 2) {
                kuma.frame = 0;
              }
              xx++;
            }else{
              xx++;
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
            // くまをジャンプさせる
            kuma.tl.moveBy(0, -80, 9, enchant.Easing.CUBIC_EASEOUT) // 12フレームかけて現在の位置から上に120px移動
            .moveBy(0, 80, 9, enchant.Easing.CUBIC_EASEIN);   // 12フレームかけて現在の位置から下に120px移動
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
            // ゲームオーバー画像設定
            var gameoverImage = new Sprite(189, 97);                   // スプライトを作る
            gameoverImage.image = game_.assets['./img/gameover.png'];  // ゲームオーバー画像を設定
            gameoverImage.x = 65;                                      // 横位置調整
            gameoverImage.y = 112;                                     // 縦位置調整
            scene.addChild(gameoverImage);                             // シーンに追加
            // スコアラベル設定
            var label = new Label(resultScore+'走りぬいた');            // ラベルを作る スコアを代入
            label.textAlign = 'center';                                // 文字を中央寄せ
            label.color = '#fff';                                      // 文字を白色に
            label.x = 0;                                               // 横位置調整
            label.y = 60;                                              // 縦位置調整
            label.font = '40px sans-serif';                            // 40pxのゴシック体にする
            scene.addChild(label);                                     // シーンに追加
            // リトライラベル(ボタン)設定
            var retryLabel = new Label('もう一度遊ぶ');                  // ラベルを作る
            retryLabel.color = '#fff';                                 // 文字を白色に
            retryLabel.x = 0;                                          // 横位置調整
            retryLabel.y = 300;                                        // 縦位置調整
            retryLabel.font = '20px sans-serif';                       // 20pxのゴシック体にする
            scene.addChild(retryLabel);                                // シーンに追加
            // リトライラベルにタッチイベントを設定
            retryLabel.addEventListener(Event.TOUCH_START, function(e) {
                game_.replaceScene(createStartScene());    // 現在表示しているシーンをタイトルシーンに置き換える
            });
            return scene;
        };
        game_.replaceScene(createStartScene());  // ゲームの_rootSceneをスタートシーンに置き換える
    }
    game_.start(); // ゲームをスタートさせます
};
