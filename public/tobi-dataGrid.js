const columnDefs = [
    { field: "songVal", headerName: 'Song' },
    { field: "bandVal", headerName: 'Künstler' },
    { field: "danceVal", headerName: 'Tanz' },
    { field: "nameVal", headerName: 'Name' },
    { field: "play", headerName: 'Play' },
    { field: "play", headerName: 'Delete' }
  ];
  
  // specify the data
  const rowData = [];
  
  // let the grid know which columns and what data to use
  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: {sortable: true, filter: true, resizable: true},
    animateRows: true,
  };
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', () => {
      const gridDiv = document.querySelector('#Grid');
      new agGrid.Grid(gridDiv, gridOptions);
      gridOptions.api.sizeColumnsToFit();
  });

  async function tobiGetData() {
    const data = await fetch('/tobi-wishes');
    const jsonData = await data.json();
    gridOptions.api.setRowData(jsonData);
    console.log(jsonData);
  }

  tobiGetData();
