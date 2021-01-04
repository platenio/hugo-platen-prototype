function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomEntry(tableName, column) {
  var table = getRollTable(tableName);
  var rows = table.rows.length;
  clearSelectedEntries(tableName, column);
  var entry = table.rows[getRandomInteger(1,rows)].cells[column];
  console.log(`${table.rows[0].cells[column].textContent}: ${entry.textContent}`);
  entry.classList.add("selected");
  setResultText(tableName);
}

function getRandomEntries(tableName) {
  var table = getRollTable(tableName);
  var columns = table.rows[0].cells.length;
  var i;
  for (i = 1; i < columns; i++) {
    getRandomEntry(tableName, i);
  }
  setResultText(tableName);
}

function getRollTable(name) {
  return document.getElementById(`rolltable-${name}`);
}

function selectEntry(tableName, row, column) {
  var table = getRollTable(tableName);
  clearSelectedEntries(tableName, column)
  table.rows[row].cells[column].classList.add("selected");
  setResultText(tableName);
}

function clearSelectedEntries(tableName, column=null) {
  var table = getRollTable(tableName);
  var selectedEntries = getSelectedEntries(tableName,column);
  for (let entry of selectedEntries) {
    entry.classList.remove("selected");
  }
  setResultText(tableName);
}

function getSelectedEntries(tableName, column=null) {
  var table = getRollTable(tableName);
  var selectedEntries = [];
  for (let row of table.rows) {
    if (column == null) {
      for (let entry of row.cells) {
        if (entry.classList.contains("selected")) {
          selectedEntries.push(entry);
        }
      }
    } else {
      entry = row.cells[column]
      if (entry.classList.contains("selected")) {
        selectedEntries.push(entry);
      }
    }
  }
  return selectedEntries;
}

function setResultText(tableName) {
  var table = getRollTable(tableName);
  var result = table.caption.children[1];
  var entries = []

  var columnCount = table.rows[0].cells.length;
  var i;
  for (i = 1; i < columnCount; i++) {
    entries.push(getSelectedEntries(tableName, i));
  }
  entries = entries.flat(2)

  var text = ""
  for (let entry of entries) {
    text += `${entry.dataset.prefix} ${entry.textContent}`
  }
  text += "."
  result.textContent = text
}

function toggleTableCollapse(tableName) {
  var collapser = document.getElementById(`rolltable-${tableName}-collapser`)
  var table = getRollTable(tableName);
  var body = table.lastElementChild;

  body.hidden = !body.hidden;

  // Toggle the button view, which is a font-awesome icon declaration
  if (collapser.firstElementChild.className.match("down")) {
    collapser.firstElementChild.className = "fa fa-caret-right";
  } else {
    collapser.firstElementChild.className = "fa fa-caret-down";
  }
}
