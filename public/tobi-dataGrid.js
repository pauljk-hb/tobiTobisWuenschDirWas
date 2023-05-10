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

  }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', buildGrid);

function buildGrid() {
  const gridDiv = document.querySelector('#Grid');
  tobiGetData();
  new agGrid.Grid(gridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
}

async function tobiGetData() {
  const data = await fetch('/tobi-wishes');
  const jsonData = await data.json();
  gridOptions.api.setRowData(jsonData);
  console.log(jsonData);
}
