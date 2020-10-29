looker.plugins.visualizations.add({
  create: function(element, config) {

    // <style>タグを挿入
    var css = element.innerHTML =`
    <style>
      .hello-world-vis {
        //vertical centering
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        text-align:center;
      }
    </style>
    `;

    //textを中央に寄せるためのコンテナエレメントを作成
    var container = element.appendChild(document.createElement("div"));
    container.className = "hell-world-vis";

    //textを入れるためのエレメントを生成
    this._textElement = container.appendChild(document.createElement("div"));
  },
  //レンダリングの設定
  //このメソッドはビジュアライズが変更されたり、チャート描画されるアクションが起きたら呼ばれる（リサイズとか）
  //この例では最初のディメンションの最初のセルだけ利用する。
  //データセットの各行の配列のdataを利用する。
  //あとは、フィールド名やタイプなどのクエリーのメタデータを含むqueryResponseを使う

  //LookerCharts.Utils.htmlForCellというヘルパーメソッドも利用する。
  //セル内でのデータポイントの最適なhtml表現ができるように。自動的にドリルリンクやフォーマッティングやデータアクションをハンドルする
  updateAsync: function(data, element, config, queryResponse, details, done) {
      //最初のデータのセルを取得
      var firstRow = data[0];
      var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

      //ページ内にデータを挿入
      this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

      //レンダリング終了時は必ずかく
      done()
  }
})