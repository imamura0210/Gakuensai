enchant();
window.onload = function() {
  var game_ = new Game(320, 320); // 表示領域の大きさを設定
  previewCenter(game_);   // ←この行で中央寄せを実施
  game_.fps = 24;                 // ゲームの進行スピードを設定
  game_.preload('./img/sky1.png',
                './img/sky2.png',
                './img/town.png',
                './img/road.png',
                './img/question.png',
                './img/setumei.png',
                './img/chara2.png',
                './img/start.png',
                './img/title.png',
                './img/ranking.png',
                './img/bg1.png',
                './img/hurdle.png',
                './img/minihurdle.png',
                './img/bird.png',
                './img/rocket.png'); // ゲームに使う素材を、あらかじめ読み込む

  game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行
    /*--タイトルシーン--*/
    var createStartScene = function() {
      var scene = new Scene();

      /*-----背景画像-----*/
      var bgImage = new Sprite(320, 320);
      bgImage.image = game_.assets['./img/bg1.png'];
      bgImage.x = 0;
      bgImage.y = 0;
      scene.addChild(bgImage);

      /*-----スタート画像-----*/
      var startImage = new Sprite(175, 53);
      startImage.image = game_.assets['./img/start.png'];
      startImage.x = 75;
      startImage.y = 120;
      scene.addChild(startImage);

      /*-----タイトルラベル-----*/
      var title = new Sprite(300, 79);
      title.image = game_.assets['./img/title.png'];
      title.x = 10;
      title.y = 10;
      scene.addChild(title);

      /*-----ランキングラベル-----*/
      var toRankScene = new Sprite(200, 52);
      toRankScene.image = game_.assets['./img/ranking.png'];
      toRankScene.x = 60;
      toRankScene.y = 200;
      scene.addChild(toRankScene);

      /*-----説明ラベル-----*/
      var question = new Sprite(30,30);
      question.image = game_.assets['./img/question.png'];
      question.x = 260;
      question.y = 270;
      scene.addChild(question);

      /*-----スタート画像にタッチイベントを設定-----*/
      startImage.addEventListener(Event.TOUCH_START, function(e) {
        game_.replaceScene(createGameScene());
      });

      /*-----ランキングラベルにタッチイベントを設定-----*/
      toRankScene.addEventListener(Event.TOUCH_START, function(e){
        game_.replaceScene(createRankScene());
      })

      /*-----説明ラベルにタッチイベントを設定-----*/
      question.addEventListener(Event.TOUCH_START, function(e){
        game_.replaceScene(createDescriptionScene());
      });
      return scene;
    };
    /*--ゲームシーン--*/
    var createGameScene = function() {
      var GROUND_LINE = 260; // 地平線の高さ
      var SCROLL_SPEED = 10;//スクロールの速さ
      var scene = new Scene();
      var scroll = 0;// スクロール量を記録する変数
      scene.backgroundColor = '#8cc820';

      /*-----上空-----*/
      var sky1 = new Sprite(320, 100);
      sky1.image = game_.assets['./img/sky1.png'];
      sky1.x = 0;
      sky1.y = 0;
      scene.addChild(sky1);

      var sky2 = new Sprite(320, 100);
      sky2.image = game_.assets['./img/sky1.png'];
      sky2.x = 320;
      sky2.y = 0;
      scene.addChild(sky2);

      var sky3 = new Sprite(320, 100);
      sky3.image = game_.assets['./img/sky1.png'];
      sky3.x = 640;
      sky3.y = 0;
      scene.addChild(sky3);

      /*-----下空-----*/
      var sky4 = new Sprite(320, 80);
      sky4.image = game_.assets['./img/sky2.png'];
      sky4.x = 0;
      sky4.y = 100;
      scene.addChild(sky4);

      var sky5 = new Sprite(320, 80);
      sky5.image = game_.assets['./img/sky2.png'];
      sky5.x = 320;
      sky5.y = 100;
      scene.addChild(sky5);

      var sky6 = new Sprite(320, 80);
      sky6.image = game_.assets['./img/sky2.png'];
      sky6.x = 640;
      sky6.y = 100;
      scene.addChild(sky6);

      /*-----街並-----*/
      var town1 = new Sprite(320, 35);
      town1.image = game_.assets['./img/town.png'];
      town1.x = 0;
      town1.y = 180;
      scene.addChild(town1);

      var town2 = new Sprite(320, 35);
      town2.image = game_.assets['./img/town.png'];
      town2.x = 320;
      town2.y = 180;
      scene.addChild(town2);

      var town3 = new Sprite(320, 35);
      town3.image = game_.assets['./img/town.png'];
      town3.x = 640;
      town3.y = 180;
      scene.addChild(town3);

      /*-----道-----*/
      var road1 = new Sprite(320, 105);
      road1.image = game_.assets['./img/road.png'];
      road1.x = 0;
      road1.y = 215;
      scene.addChild(road1);

      var road2 = new Sprite(320, 105);
      road2.image = game_.assets['./img/road.png'];
      road2.x = 320;
      road2.y = 215;
      scene.addChild(road2);

      var road3 = new Sprite(320, 105);
      road3.image = game_.assets['./img/road.png'];
      road3.x = 640;
      road3.y = 215;
      scene.addChild(road3);

      /*-----スコア表示用ラベル-----*/
      var scoreLabel = new Label("");
      scoreLabel.color = '#000000';
      scoreLabel.font = '15px Impact';
      scoreLabel.x = 250;
      scene.addChild(scoreLabel);

      /*-----ハードル-----*/
      var hurdleA = new Sprite(50, 75);
      hurdleA.image = game_.assets['./img/hurdle.png'];
      hurdleA.x = -hurdleA.width;
      hurdleA.y = (GROUND_LINE - hurdleA.height) * 1.1;
      scene.addChild(hurdleA);

      var hurdleB = new Sprite(50, 75);
      hurdleB.image = game_.assets['./img/hurdle.png'];
      hurdleB.x = -hurdleB.width;
      hurdleB.y = (GROUND_LINE - hurdleB.height) * 1.1;
      scene.addChild(hurdleB);

      var hurdleC = new Sprite(50, 75);
      hurdleC.image = game_.assets['./img/hurdle.png'];
      hurdleC.x = -hurdleC.width;
      hurdleC.y = (GROUND_LINE - hurdleC.height) * 1.1;
      scene.addChild(hurdleC);

      /*-----ミニハードル-----*/
      var miniHurdleA = new Sprite(45, 35);
      miniHurdleA.image = game_.assets['./img/minihurdle.png'];
      miniHurdleA.x = -miniHurdleA.width;
      miniHurdleA.y = (GROUND_LINE - miniHurdleA.height) * 1.02;
      scene.addChild(miniHurdleA);

      var miniHurdleB = new Sprite(45, 35);
      miniHurdleB.image = game_.assets['./img/minihurdle.png'];
      miniHurdleB.x = -miniHurdleB.width;
      miniHurdleB.y = (GROUND_LINE - miniHurdleB.height) * 1.02;
      scene.addChild(miniHurdleB);

      var miniHurdleC = new Sprite(45, 35);
      miniHurdleC.image = game_.assets['./img/minihurdle.png'];
      miniHurdleC.x = -miniHurdleC.width;
      miniHurdleC.y = (GROUND_LINE - miniHurdleC.height) * 1.02;
      scene.addChild(miniHurdleC);

      /*-----鳥-----*/
      var bird1 = new Sprite(64, 32);
      bird1.image = game_.assets['./img/bird.png'];
      bird1.x = -bird1.width;
      bird1.y = 150;
      scene.addChild(bird1);

      var bird2 = new Sprite(64, 32);
      bird2.image = game_.assets['./img/bird.png'];
      bird2.x = -bird1.width;
      bird2.y = 150;
      scene.addChild(bird2);

      var bird3 = new Sprite(64, 32);
      bird3.image = game_.assets['./img/bird.png'];
      bird3.x = -bird3.width;
      bird3.y = 190;
      scene.addChild(bird3);

      var bird4 = new Sprite(64, 32);
      bird4.image = game_.assets['./img/bird.png'];
      bird4.x = -bird3.width;
      bird4.y = GROUND_LINE - bird4.height;
      scene.addChild(bird4);

      /*-----ロケット-----*/
      var rocket1 = new Sprite(64, 32);
      rocket1.image = game_.assets['./img/rocket.png'];
      rocket1.x = -rocket1.width;
      rocket1.y = 190;
      scene.addChild(rocket1);

      var rocket2 = new Sprite(64, 32);
      rocket2.image = game_.assets['./img/rocket.png'];
      rocket2.x = -rocket2.width;
      rocket2.y = 150;
      scene.addChild(rocket2);

      var rocket3 = new Sprite(64, 32);
      rocket3.image = game_.assets['./img/rocket.png'];
      rocket3.x = -rocket3.width;
      rocket3.y = (GROUND_LINE - miniHurdleC.height) * 1.02;
      scene.addChild(rocket3);

      /*-----くれ-----*/
      var Kure = new Sprite(32, 32);
      Kure.image = game_.assets['./img/chara2.png'];
      Kure.x = 80;
      Kure.y = 228;
      scene.addChild(Kure);

      /*-----くれの当たり判定-----*/
      var Kure_hit = new Sprite(1, 1)
      Kure_hit.x = Kure.x + Kure.width / 2;
      Kure_hit.y = Kure.y + Kure.height / 2;
      scene.addChild(Kure_hit);

      /*-----くれがやられた関数-----*/
      var KureDead = function() {
        game_.pushScene(createGameoverScene(scroll));
      }

      //障害物が画面内に複数出現する際の処理に使用するフラグ
      var miniFlag = 0;
      var hurFlag = 0;
      var birFlag = 0;
      var rocFlag = 0;

      /*-----シーンに毎フレームイベントを設定-----*/
      scene.addEventListener(Event.ENTER_FRAME, function() {
        scroll += 1;
        scoreLabel.text = 'SCORE:'+scroll.toString(); // スコア表示を更新

        /*-----当たり判定用スプライトをくれの中心に置く-----*/
        Kure_hit.x = Kure.x + Kure.width/2;
        Kure_hit.y = Kure.y + Kure.height/2;

        /*-----スクロールスピード(難易度調整)-----*/
        if(scroll % 500 === 0 && scroll % 1000 != 0){
          SCROLL_SPEED *= 1.15;
        }

        /*-----障害物の出現タイミング(分岐処理で難易度調整)-----*/
        if(scroll < 1000){
          if(scroll % 40 === 0 && scroll % 120 != 0){
            switch(miniFlag){
              case 0:
                miniHurdleA.x = 320;
                miniFlag++;
                break;
              case 1:
                miniHurdleB.x = 320;
                miniFlag++;
                break;
              case 2:
                miniHurdleC.x = 320;
                miniFlag = 0;
                break;
            }
          }
          if(scroll % 120 === 0){
            switch(hurFlag){
              case 0:
                hurdleA.x = 320;
                hurFlag++;
                break;
              case 1:
                hurdleB.x = 320;
                hurFlag++;
                break;
              case 2:
                hurdleC.x = 320;
                hurFlag = 0;
                break;
            }
          }
        }else if(scroll >= 1000 && scroll < 2000){
          if(scroll % 35 === 0 && scroll % 105 != 0 && scroll % 140 != 0){
            switch(miniFlag){
              case 0:
                miniHurdleA.x = 320;
                miniFlag++;
                break;
              case 1:
                miniHurdleB.x = 320;
                miniFlag++;
                break;
              case 2:
                miniHurdleC.x = 320;
                miniFlag = 0;
                break;
            }
          }
          if(scroll % 105 === 0 && scroll % 140 != 0){
            switch(hurFlag){
              case 0:
                hurdleA.x = 320;
                hurFlag++;
                break;
              case 1:
                hurdleB.x = 320;
                hurFlag++;
                break;
              case 2:
                hurdleC.x = 320;
                hurFlag = 0;
                break;
            }
          }
          if(scroll % 140 === 0){
            if(birFlag === 0){
              bird1.x = 320;
              birFlag = 1;
            }else{
              bird2.x = 320;
              birFlag = 0;
            }
          }
        }else if(scroll >= 2011 && scroll < 3000){
          if(scroll % 30 == 0){
            rocFlag = Math.floor(Math.random()*4);
            if(rocFlag == 3){
              rocFlag = 2;
            }
            console.log(rocFlag);
            switch(rocFlag){
              case 0:
                rocket1.x = 320;
                break;
              case 1:
                rocket2.x = 320;
                break;
              case 2:
                rocket3.x = 320;
                break;
            }
          }
        }else if(scroll >= 3000 && scroll < 4000){
          if(scroll % 35 === 0 && scroll % 105 != 0 && scroll % 140 != 0){
            switch(hurFlag){
              case 0:
                hurdleA.x = 320;
                hurFlag++;
                break;
              case 1:
                hurdleB.x = 320;
                hurFlag++;
                break;
              case 2:
                hurdleC.x = 320;
                hurFlag = 0;
                break;
            }
          }
          if(scroll % 105 === 0 && scroll % 140 != 0){
            if(birFlag === 0){
              bird1.x = 320;
              birFlag = 1;
            }else{
              bird2.x = 320;
              birFlag = 0;
            }
          }
          if(scroll % 140 === 0){
            bird3.x = 320;
          }
        }else if(scroll >= 4000 && scroll < 5000){
          if(scroll % 30 == 0){
            rocFlag = Math.floor(Math.random()*3);
            console.log(rocFlag);
            switch(rocFlag){
              case 0:
                rocket1.x = 320;
                break;
              case 1:
                rocket2.x = 320;
                break;
              case 2:
                rocket3.x = 320;
                break;
            }
          }
        }else if(scroll >= 5000 && scroll < 6000){
          if(scroll % 30 === 0 && scroll % 60 != 0 && scroll % 75 != 0 && scroll % 105 != 0){
            switch(hurFlag){
              case 0:
                hurdleA.x = 320;
                hurFlag++;
                break;
              case 1:
                hurdleB.x = 320;
                hurFlag++;
                break;
              case 2:
                hurdleC.x = 320;
                hurFlag = 0;
                break;
            }
          }
          if(scroll % 60 === 0 && scroll % 75 != 0 && scroll % 105 != 0){
            if(birFlag === 0){
              bird1.x = 320;
              birFlag = 1;
            }else{
              bird2.x = 320;
              birFlag = 0;
            }
          }
          if(scroll % 75 === 0 && scroll % 105 != 0){
            bird3.x = 320;
          }
          if(scroll % 105 === 0){
            bird4.x = 320;
          }
        }else if(scroll >= 6000 && scroll < 7000){
          if(scroll % 30 == 0){
            rocFlag = Math.floor(Math.random()*3);
            console.log(rocFlag);
            switch(rocFlag){
              case 0:
                rocket1.x = 320;
                break;
              case 1:
                rocket2.x = 320;
                break;
              case 2:
                rocket3.x = 320;
                break;
            }
          }
        }else if(scroll >= 7000 && scroll < 8000){
          if(scroll % 25 === 0 && scroll % 75){
            switch(hurFlag){
              case 0:
                hurdleA.x = 320;
                hurFlag++;
                break;
              case 1:
                hurdleB.x = 320;
                hurFlag++;
                break;
              case 2:
                hurdleC.x = 320;
                hurFlag = 0;
                break;
            }
          }
          if(scroll % 75 === 0){
            birFlag = Math.floor(Math.random()*3)
            switch (birFlag) {
              case 0:
                bird1.x = 320;
                break;
              case 1:
                bird3.x = 320;
                break;
              case 2:
                bird4.x = 320;
                break;
            }
          }
        }else if(scroll >= 8000 && scroll < 9000){
          if(scroll % 30 == 0){
            rocFlag = Math.floor(Math.random()*3);
            console.log(rocFlag);
            switch(rocFlag){
              case 0:
                rocket1.x = 320;
                break;
              case 1:
                rocket2.x = 320;
                break;
              case 2:
                rocket3.x = 320;
                break;
            }
          }
        }else if(scroll >= 9000 && scroll < 10000){
          if(scroll % 25 === 0 && scroll % 50){
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
          if(scroll % 50){
            switch (birFlag) {
              case 0:
                bird1.x = 320;
                break;
              case 1:
                bird3.x = 320;
                break;
              case 2:
                bird4.x = 320;
                break;
            }
          }
        }else if(scroll >= 10000){
          if(scroll % 30 == 0){
            rocFlag = Math.floor(Math.random()*3);
            console.log(rocFlag);
            switch(rocFlag){
              case 0:
                rocket1.x = 320;
                break;
              case 1:
                rocket2.x = 320;
                break;
              case 2:
                rocket3.x = 320;
                break;
            }
          }
        }

        /*-----ハードルのスクロールと、接触の判定-----*/
        if (hurdleA.x > -hurdleA.width) {
          hurdleA.x -= SCROLL_SPEED;
          if (hurdleA.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (hurdleB.x > -hurdleB.width) {
          hurdleB.x -= SCROLL_SPEED;
          if (hurdleB.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (hurdleC.x > -hurdleC.width) {
          hurdleC.x -= SCROLL_SPEED;
          if (hurdleC.intersect(Kure_hit)) {
            KureDead();
          }
        }

        /*-----ミニハードルのスクロールと接触の判定-----*/
        if (miniHurdleA.x > -miniHurdleA.width) {
          miniHurdleA.x -= SCROLL_SPEED;
          if (miniHurdleA.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (miniHurdleB.x > -miniHurdleB.width) {
          miniHurdleB.x -= SCROLL_SPEED;
          if (miniHurdleB.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (miniHurdleC.x > -miniHurdleC.width) {
          miniHurdleC.x -= SCROLL_SPEED;
          if (miniHurdleC.intersect(Kure_hit)) {
            KureDead();
          }
        }

        /*-----鳥のスクロールと、接触の判定-----*/
        if (bird1.x > -bird1.width) {
          bird1.x -= SCROLL_SPEED * 1.1;     // 鳥を1.3倍速でスクロール
          //鳥のアニメーションの設定
          if(scroll % 10 === 0){
            if (bird1.frame > 0) {
              bird1.frame = 0;
            } else {
              bird1.frame = 1;
            }
          }
          if (bird1.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (bird2.x > -bird2.width) {
          bird2.x -= SCROLL_SPEED * 1.1;
          if(scroll % 10 === 0){
            if (bird2.frame > 0) {
              bird2.frame = 0;
            } else {
              bird2.frame = 1;
            }
          }
          if (bird2.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (bird3.x > -bird3.width) {
          bird3.x -= SCROLL_SPEED * 1.1;
          if(scroll % 10 === 0){
            if (bird3.frame > 0) {
              bird3.frame = 0;
            } else {
              bird3.frame = 1;
            }
          }
          if (bird3.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (bird4.x > -bird4.width) {
          bird4.x -= SCROLL_SPEED * 1.1;
          if(scroll % 10 === 0){
            if (bird4.frame > 0) {
              bird4.frame = 0;
            } else {
              bird4.frame = 1;
            }
          }
          if (bird4.intersect(Kure_hit)) {
            KureDead();
          }
        }

        /*-----ロケットのスクロールと、接触の判定-----*/
        if (rocket1.x > -rocket1.width) {
          rocket1.x -= SCROLL_SPEED * 1.3;
          if(scroll % 1 === 0){
            if (rocket1.frame > 0) {
              rocket1.frame = 0;
            } else {
              rocket1.frame = 1;
            }
          }
          if (rocket1.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (rocket2.x > -rocket2.width) {
          rocket2.x -= SCROLL_SPEED * 1.3;
          if(scroll % 1 === 0){
            if (rocket2.frame > 0) {
              rocket2.frame = 0;
            } else {
              rocket2.frame = 1;
            }
          }
          if (rocket2.intersect(Kure_hit)) {
            KureDead();
          }
        }
        if (rocket3.x > -rocket3.width) {
          rocket3.x -= SCROLL_SPEED * 1.3;
          if(scroll % 1 === 0){
            if (rocket3.frame > 0) {
              rocket3.frame = 0;
            } else {
              rocket3.frame = 1;
            }
          }
          if (rocket3.intersect(Kure_hit)) {
            KureDead();
          }
        }

        /*-----くれのアニメーション-----*/
        if(scroll % 3 == 1){
          Kure.frame ++;
          if (Kure.frame > 2) {
            Kure.frame = 0;
          }
        }

        /*-----上空のアニメーション------*/
        sky1.x -= (SCROLL_SPEED / 5);
        sky2.x -= (SCROLL_SPEED / 5);
        sky3.x -= (SCROLL_SPEED / 5);
        if(sky1.x <= -480){
          sky1.x = sky3.x + 320;
        }
        if(sky2.x <= -480){
          sky2.x = sky1.x + 320;
        }
        if(sky3.x <= -480){
          sky3.x = sky2.x + 320;
        }

        /*-----下空のアニメーション------*/
        sky4.x -= (SCROLL_SPEED / 5);
        sky5.x -= (SCROLL_SPEED / 5);
        sky6.x -= (SCROLL_SPEED / 5);
        if(sky4.x <= -480){
          sky4.x = sky6.x + 320;
        }
        if(sky5.x <= -480){
          sky5.x = sky4.x + 320;
        }
        if(sky6.x <= -480){
          sky6.x = sky5.x + 320;
        }

        /*-----街並のアニメーション------*/
        town1.x -= (SCROLL_SPEED / 3);
        town2.x -= (SCROLL_SPEED / 3);
        town3.x -= (SCROLL_SPEED / 3);
        if(town1.x <= -480){
          town1.x = town3.x + 320;
        }
        if(town2.x <= -480){
          town2.x = town1.x + 320;
        }
        if(town3.x <= -480){
          town3.x = town2.x + 320;
        }

        /*-----道のアニメーション------*/
        road1.x -= SCROLL_SPEED;
        road2.x -= SCROLL_SPEED;
        road3.x -= SCROLL_SPEED;
        if(road1.x <= -480){
          road1.x = road3.x + 320;
        }
        if(road2.x <= -480){
          road2.x = road1.x + 320;
        }
        if(road3.x <= -480){
          road3.x = road2.x + 320;
        }
      });


      /*-----キーを押したときにくれをジャンプさせる関数を呼ぶ-----*/
      document.onkeypress=kureJump;

      /*-----くれをジャンプさせる関数-----*/
      function kureJump(){
        // くれをジャンプさせる
        if(Math.ceil(Kure.y) == GROUND_LINE - Kure.height){
          Kure.tl.moveBy(0, -80, 6, enchant.Easing.CUBIC_EASEOUT);//6フレームかけて現在の位置から縦-80px,横0px移動
          Kure.tl.moveBy(0, 80, 8, enchant.Easing.CUBIC_EASEIN);//8フレームかけて現在の位置から縦80px,横0px移動
        }
      };
      return scene;
    };


    /*ゲームオーバーシーン*/
    var createGameoverScene = function(resultScore) {
      //myStorage = localStorage;
      //スコア
      var value=resultScore;

      //データの保存
      if(localStorage.getItem('rank1')==null){
        localStorage.setItem('rank1','0');
	    }
      if(localStorage.getItem('rank2')==null){
        localStorage.setItem('rank2','0');
      }
      if(localStorage.getItem('rank3')==null){
        localStorage.setItem('rank3','0');
      }
      if(localStorage.getItem('rank4')==null){
        localStorage.setItem('rank4','0');
      }
      if(localStorage.getItem('rank5')==null){
        localStorage.setItem('rank5','0');
      }


	//
	var rank1=Number(localStorage.getItem('rank1'));
	var rank2=Number(localStorage.getItem('rank2'));
	var rank3=Number(localStorage.getItem('rank3'));
	var rank4=Number(localStorage.getItem('rank4'));
	var rank5=Number(localStorage.getItem('rank5'));

	//
	if(rank1<=value){
	    localStorage.setItem('rank5',rank4);
	    localStorage.setItem('rank4',rank3);
	    localStorage.setItem('rank3',rank2);
	    localStorage.setItem('rank2',rank1);
	    localStorage.setItem('rank1',value);
	    //break;
	}
	else if(rank2<=value){
	    localStorage.setItem('rank5',rank4);
	    localStorage.setItem('rank4',rank3);
	    localStorage.setItem('rank3',rank2);
	    localStorage.setItem('rank2',value);
	    //break;
	}
	else if(rank3<=value){
	    localStorage.setItem('rank5',rank4);
	    localStorage.setItem('rank4',rank3);
	    localStorage.setItem('rank3',value);
	    //break;
	}
	else if(rank4<=value){
	    localStorage.setItem('rank5',rank4);
	    localStorage.setItem('rank4',value);
	    //break;
	}
	else if(rank5<=value){
	    localStorage.setItem('rank5',value);
	    //break;
	}

      var scene = new Scene();
      scene.backgroundColor = '#ffffff';

      // ゲームオーバーラベル設定
      var gameover = new Label('GAMEOVER');
      gameover.textAlign = 'center';
      gameover.color = '#000000';
      gameover.x = 0;                                      // 横位置調整
      gameover.y = 0;                                     // 縦位置調整
      gameover.font = '35px Impact';
      scene.addChild(gameover);                             // シーンに追加

      //ランキング
      var rankHead = new Label('RANK');
      rankHead.color = '#000000';
      rankHead.x = 60;
      rankHead.y = 50;
      rankHead.font = '30px Impact';
      scene.addChild(rankHead);

      var firstRank = new Label('1');
      firstRank.color = '#ffd700';
      firstRank.x = 78;
      firstRank.y = 82;
      firstRank.font = '35px Impact';
      scene.addChild(firstRank);

      var secondRank = new Label('2');
      secondRank.color = '#c0c0c0';
      secondRank.x = 79;
      secondRank.y = 123;
      secondRank.font = '30px Impact';
      scene.addChild(secondRank);

      var thirdRank = new Label('3');
      thirdRank.color = '#daa520';
      thirdRank.x = 80;
      thirdRank.y = 158;
      thirdRank.font = '25px Impact';
      scene.addChild(thirdRank);

      var fourthRank = new Label('4');
      fourthRank.color = '#000000';
      fourthRank.x = 81;
      fourthRank.y = 190;
      fourthRank.font = '20px Impact';
      scene.addChild(fourthRank);

      var fifthRank = new Label('5');
      fifthRank.color = '#000000';
      fifthRank.x = 81;
      fifthRank.y = 220;
      fifthRank.font = '20px Impact';
      scene.addChild(fifthRank);

      //スコア
      var scoreHead = new Label('SCORE');
      scoreHead.color = '#000000';
      scoreHead.x = 160;
      scoreHead.y = 50;
      scoreHead.font = '30px Impact';
      scene.addChild(scoreHead);

      var firstScore = new Label(localStorage.getItem('rank1'));
      firstScore.color = "#ff0000";
      firstScore.x = 160;
      firstScore.y = 87;
      firstScore.font = '30px Impact';
      scene.addChild(firstScore);

      var secondScore = new Label(localStorage.getItem('rank2'));
      secondScore.color = '#000000';
      secondScore.x = 160;
      secondScore.y = 123;
      secondScore.font = '30px Impact';
      scene.addChild(secondScore);

      var thirdScore = new Label(localStorage.getItem('rank3'));
      thirdScore.color = '#000000';
      thirdScore.x = 160;
      thirdScore.y = 158;
      thirdScore.font = '25px Impact';
      scene.addChild(thirdScore);

      var fourthScore = new Label(localStorage.getItem('rank4'));
      fourthScore.color = '#000000';
      fourthScore.x = 160;
      fourthScore.y = 190;
      fourthScore.font = '20px Impact';
      scene.addChild(fourthScore);

      var fifthScore = new Label(localStorage.getItem('rank5'));
      fifthScore.color = '#000000';
      fifthScore.x = 160;
      fifthScore.y = 220;
      fifthScore.font = '20px Impact';
      scene.addChild(fifthScore);

      // スコアラベル設定
      var label = new Label('YOUR SCORE:'+resultScore);            //スコアを代入
      label.textAlign = 'center';                                // 文字を中央寄せ
      label.color = '#000000';
      label.x = 0;                                               // 横位置調整
      label.y = 252;                                              // 縦位置調整
      label.font = '25px Impact';                            // 40pxのゴシック体にする
      scene.addChild(label);                                     // シーンに追加

      // リトライラベル(ボタン)設定
      var retryLabel = new Label('RETRY');                  // ラベルを作る
      retryLabel.color = '#000000';                                 // 文字を白色に
      retryLabel.x = 10;                                          // 横位置調整
      retryLabel.y = 285;                                        // 縦位置調整
      retryLabel.font = '25px Impact';                       // 20pxのゴシック体にする
      scene.addChild(retryLabel);                                // シーンに追加

      //タイトルに戻るラベル(ボタン)設定
      var exit = new Label("EXIT");
      exit.color = '#000000';
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
    /*ランキングシーン*/
    var createRankScene = function() {
      var scene = new Scene();                                   // 新しいシーンを作る
      scene.backgroundColor = '#ffffff';                         // シーンの背景色を設定
      // スコアランキング設定
      var ranking = new Label('SCORE RANKING');                   // スプライトを作る
      ranking.textAlign = 'center';
      ranking.color = '#000000';
      ranking.x = 0;                                      // 横位置調整
      ranking.y = 10;                                     // 縦位置調整
      ranking.font = '35px Impact';
      scene.addChild(ranking);                             // シーンに追加

      //ランキング
      var rankHead = new Label('RANK');
      rankHead.color = '#000000';
      rankHead.x = 55;
      rankHead.y = 50;
      rankHead.font = '30px Impact';
      scene.addChild(rankHead);

      var firstRank = new Label('1');
      firstRank.color = '#ffd700';
      firstRank.x = 78;
      firstRank.y = 85;
      firstRank.font = '35px Impact';
      scene.addChild(firstRank);

      var secondRank = new Label('2');
      secondRank.color = '#c0c0c0';
      secondRank.x = 79;
      secondRank.y = 125;
      secondRank.font = '30px Impact';
      scene.addChild(secondRank);

      var thirdRank = new Label('3');
      thirdRank.color = '#daa520';
      thirdRank.x = 80;
      thirdRank.y = 163;
      thirdRank.font = '25px Impact';
      scene.addChild(thirdRank);

      var fourthRank = new Label('4');
      fourthRank.color = '#000000';
      fourthRank.x = 81;
      fourthRank.y = 200;
      fourthRank.font = '20px Impact';
      scene.addChild(fourthRank);

      var fifthRank = new Label('5');
      fifthRank.color = '#000000';
      fifthRank.x = 81;
      fifthRank.y = 235;
      fifthRank.font = '20px Impact';
      scene.addChild(fifthRank);

      //スコア
      var scoreHead = new Label('SCORE');
      scoreHead.color = '#000000';
      scoreHead.x = 160;
      scoreHead.y = 50;
      scoreHead.font = '30px Impact';
      scene.addChild(scoreHead);

      var firstScore = new Label(localStorage.getItem('rank1'));
      firstScore.color = "#ff0000";
      firstScore.x = 160;
      firstScore.y = 88;
      firstScore.font = '30px Impact';
      scene.addChild(firstScore);

      var secondScore = new Label(localStorage.getItem('rank2'));
      secondScore.color = '#000000';
      secondScore.x = 160;
      secondScore.y = 125;
      secondScore.font = '30px Impact';
      scene.addChild(secondScore);

      var thirdScore = new Label(localStorage.getItem('rank3'));
      thirdScore.color = '#000000';
      thirdScore.x = 160;
      thirdScore.y = 163;
      thirdScore.font = '25px Impact';
      scene.addChild(thirdScore);

      var fourthScore = new Label(localStorage.getItem('rank4'));
      fourthScore.color = '#000000';
      fourthScore.x = 160;
      fourthScore.y = 200;
      fourthScore.font = '20px Impact';
      scene.addChild(fourthScore);

      var fifthScore = new Label(localStorage.getItem('rank5'));
      fifthScore.color = '#000000';
      fifthScore.x = 160;
      fifthScore.y = 235;
      fifthScore.font = '20px Impact';
      scene.addChild(fifthScore);

      // リトライラベル(ボタン)設定
      var playLabel = new Label('GAME PLAY');                  // ラベルを作る
      playLabel.color = '#000000';                                 // 文字を白色に
      playLabel.x = 10;                                          // 横位置調整
      playLabel.y = 285;                                        // 縦位置調整
      playLabel.font = '25px Impact';                       // 20pxのゴシック体にする
      scene.addChild(playLabel);                                // シーンに追加

      //タイトルに戻るラベル(ボタン)設定
      var exit = new Label("EXIT");
      exit.color = '#000000';
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
    /*説明シーン*/
    var createDescriptionScene = function() {
      var scene = new Scene();                        // 新しいシーンを作る

      // 背景画像を設定
      var bgImage = new Sprite(320, 320);
      bgImage.image = game_.assets['./img/setumei.png'];
      bgImage.x = 0;
      bgImage.y = 0;
      scene.addChild(bgImage);



      // リトライラベル(ボタン)設定
      var playLabel = new Label('GAME PLAY');                  // ラベルを作る
      playLabel.color = '#000000';                                 // 文字を黒色に
      playLabel.x = 10;                                          // 横位置調整
      playLabel.y = 285;                                        // 縦位置調整
      playLabel.font = '25px Impact';                       // 20pxのゴシック体にする
      scene.addChild(playLabel);                                // シーンに追加

      //タイトルに戻るラベル(ボタン)設定
      var exit = new Label("EXIT");
      exit.color = '#000000';
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


      // 説明シーンを返す
      return scene;
    };
  game_.replaceScene(createStartScene());
  }
  game_.start(); // ゲームをスタートさせます
};

function previewCenter ( game ){
    var left = ( window.innerWidth - ( game.width * game.scale )) / 2;
    var top=( window.innerHeight - ( game.height * game.scale ));
    $('#enchant-stage').css({
      "position":"absolute",
      "left":left+"px",
      "top":top+"px",
    });
    game._pageX = left;
    game._pageY = top;
    document.body.style.background = '#9ad9ea';
}
