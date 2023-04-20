//フォームの内容をDBに登録する
function resist() {
  //フォームの入力チェック。falseが返却されたら登録処理を中断。
  if (inputCheck() == false) {
    return;
  }

  //ラジオボタンの取得
  let radio = document.getElementsByName("balance");
  let balance;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked == true) {
      balance = radio[i].value;
      break;
    }
  }

  //フォームに入力された値を取得
  let date = document.getElementById("date");
  let amount = document.getElementById("amount");
  let memo = document.getElementById("memo");
  let category = document.getElementById("category");
  //ラジオボタンが収入を選択時はカテゴリを「収入」とする
  if (balance == "収入") {
    category = "収入";
  }

  //データベースにデータを登録する
  insertData(balance, date, category, amount, memo);

  //入手金一覧を作成
  createList();
}

//データの登録
function insertData(balance, date, category, amount, memo) {
  //一意のIDを現在の日時から作成
  let uniqueID = new Date().getTime().toString();
  console.log(uniqueID);
  //DBに登録するための連想配列のデータを作成
  let data = {
    id: uniqueID,
    balance: balance,
    date: String(date),
    category: category,
    amount: amount,
    memo: memo,
  };

  //データベースを開く
  let database = indexedDB.open(dbName, dbVersion);

  //データベースのひらけなかったときの処理
  database.onerror = function (event) {
    console.log("データベースに接続できませんでした");
  };

  //データベースを開いたらデータの登録を実行
  database.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readwrite");
    transaction.oncomplete = function (event) {
      console.log("トランザクション完了");
    };
    transaction.onerror = function (event) {
      console.log("トランザクションエラー");
    };
    let store = transaction.objectStore(storeName);
    let addData = store.add(data);
    addData.onsuccess = function () {
      console.log("データが登録できました");
      alert("登録しました");
    };
    addData.onerror = function () {
      console.log("データが登録できませんでした");
    };
    db.close();
  };
}

function createList() {
  //データベースからデータを全件取得
  let database = indexedDB.open(dbName);
  database.onsuccess = function (event) {
    let db = event.target.result;
    let transaction = db.transaction(storeName, "readonly");
    let store = transaction.objectStore(storeName);

    store.getAll().onsuccess = function (data) {
      console.log(data);
      let rows = data.target.result;
      let section = document.getElementById("list");
      //入出金一覧のテーブルを作る
      //バッククオートでヒアドキュメント
      // let table =
    };
  };
}
