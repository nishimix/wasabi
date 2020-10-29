// looker.plugins.visualizations.add({
//   create: function(element, config) {

//     // <style>タグを挿入
//     var css = element.innerHTML =`
//     <style>
//       .hello-world-vis {
//         //vertical centering
//         height:100%;
//         display:flex;
//         flex-direction:column;
//         justify-content:center;
//         text-align:center;
//       }
//     </style>
//     `;

//     //textを中央に寄せるためのコンテナエレメントを作成
//     var container = element.appendChild(document.createElement("div"));
//     container.className = "hell-world-vis";

//     //textを入れるためのエレメントを生成
//     this._textElement = container.appendChild(document.createElement("div"));
//   },
//   //レンダリングの設定
//   //このメソッドはビジュアライズが変更されたり、チャート描画されるアクションが起きたら呼ばれる（リサイズとか）
//   //この例では最初のディメンションの最初のセルだけ利用する。
//   //データセットの各行の配列のdataを利用する。
//   //あとは、フィールド名やタイプなどのクエリーのメタデータを含むqueryResponseを使う

//   //LookerCharts.Utils.htmlForCellというヘルパーメソッドも利用する。
//   //セル内でのデータポイントの最適なhtml表現ができるように。自動的にドリルリンクやフォーマッティングやデータアクションをハンドルする
//   updateAsync: function(data, element, config, queryResponse, details, done) {
//       //最初のデータのセルを取得
//       var firstRow = data[0];
//       var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

//       //ページ内にデータを挿入
//       this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

//       //レンダリング終了時は必ずかく
//       done()
//   }
// })
looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  // id: "hello_world",
  // label: "Hello World",
  // options: {
  //   font_size: {
  //     type: "string",
  //     label: "Font Size",
  //     values: [
  //       {"Large": "large"},
  //       {"Small": "small"}
  //     ],
  //     display: "radio",
  //     default: "large"
  //   }
  // },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    // Set the size to the user-selected size
    if (config.font_size == "small") {
      this._textElement.className = "hello-world-text-small";
    } else {
      this._textElement.className = "hello-world-text-large";
    }

    // We are done rendering! Let Looker know.
    done()
  }
});