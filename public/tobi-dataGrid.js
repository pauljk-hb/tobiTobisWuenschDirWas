class ImgCellRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.classList.add('cellDiv');
    this.eGui.innerHTML = `
      <img src="images/${params.img}.webp" class="play" alt="">
      `;
    this.btn = this.eGui.querySelector('.play');
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }

  destroy() { }
}

const columnDefs = [
  { field: "songVal", headerName: 'Song' },
  { field: "bandVal", headerName: 'Künstler' },
  { field: "danceVal", headerName: 'Tanz' },
  { field: "nameVal", headerName: 'Name' },
  { field: "play", resizable: false, cellRenderer: ImgCellRenderer, cellRendererParams: { img: "sound" }, maxWidth: 90 },
  { field: "delete", resizable: false, cellRenderer: ImgCellRenderer, cellRendererParams: { img: "cancel" }, maxWidth: 90 }
];

// specify the data
const rowData = [];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  defaultColDef: { sortable: true, filter: true, resizable: true },
  animateRows: true,
  rowHeight: 60,

  onCellClicked: params => {
    console.log(params.data)
    let _id = params.data._id;
    console.log(_id);
    let Data = { _id };

    if (params.column.getColId() == 'play') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      };

      fetch('/tobi-change', options);

      document.location.reload();
    }

    if (params.column.getColId() == 'delete') {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
      };

      fetch('/tobi-remove', options);

      document.location.reload();
    }

    if (params.value != 'undifiend') {
      copyValue = params.value;
    }

  },  

  //Fehler bei event Handler
  // onCellDoubleClicked: params =>{
  //   console.log(params.value)
  //   if (params.value != 'undifiend') {
  //     console.log(params.value)
  //     copyValue = params.value;
  //     navigator.clipboard.writeText(copyValue);
  //   }
  // }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', buildGrid);

function buildGrid() {
  const gridDiv = document.querySelector('#Grid');
  tobiGetData();
  new agGrid.Grid(gridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
}

setInterval(update, 300000);

function update() {
  document.location.reload();
}

async function tobiGetData() {
  const data = await fetch('/tobi-wishes');
  const jsonData = await data.json();
  gridOptions.api.setRowData(jsonData);
  console.log(jsonData);
}

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
    document.getElementById('filter-text-box').value
  );
}

document.getElementById("dance").addEventListener('change', selectOption, false);

function selectOption() {
  const selectedOption = this.options[this.selectedIndex].value;
  console.log(selectedOption);
  if (selectedOption == 'alle') {
    gridOptions.api.setQuickFilter('');
  } else {
    gridOptions.api.setQuickFilter(selectedOption);
  }
}

let copyValue;
document.getElementById('copy').addEventListener('click', async () => {
  if (!copyValue) return;
  await navigator.clipboard.writeText(copyValue);
  document.getElementById('copy').innerText = 'Kopiert';
  setTimeout(() => {
    document.getElementById('copy').innerText = 'Kopieren';
  }, "1000")
})