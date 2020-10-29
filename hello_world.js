looker.plugins.visualizations.add({
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    },
    color_range: {
      type: "array",
      label: "Color Range",
      display: "colors"
    },
   top_label: {
      type: "string",
      label: "Label (for top)",
      placeholder: "My Great Chart"
    },
    transport_mode: {
      type: "string",
      label: "Mode of Transport",
      display: "select",
      values: [
      	 {"Airplane": "airplane"},
      	 {"Car": "car"},
      	 {"Unicycle": "unicycle"}
      ],
      default: "unicycle"
    }
  },
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
          font-family: Impact,Charcoal;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
      </style>
    `;
    element.innerHTML += "<h3>CustomVis</h1>";

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
    // this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    var html = "";
    html +="<a href='https://saleseng.dev.looker.com/dashboards-next/1251?User+ID='>ここにDashboardの検索条件が埋め込めれば</a>";
    
    for(var row of data) {
      var cell = row[queryResponse.fields.dimensions[0].name];
      html += LookerCharts.Utils.htmlForCell(cell);
      html += "<br />";
    }
    this._textElement.innerHTML = html;

    console.log(queryResponse)

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