let page = 1;
const rows = 10;
var visiblePage = 0 ;
// Creating a table
var container = document.createElement("container");
container.setAttribute("class", "container");

var table = document.createElement("table");
table.setAttribute("class", "table");

var thead = document.createElement("thead");
thead.setAttribute("class", "thead-dark");

var tr = document.createElement("tr");

var th1 = createTdata("th", "ID");
var th2 = createTdata("th", "NAME");
var th3 = createTdata("th", "EMAIL");

tr.append(th1, th2, th3);
thead.append(tr);

var tbody = document.createElement("tbody");
tbody.setAttribute("class", "tbody");

table.append(thead, tbody);
container.append(table);
document.body.append(container);

 


// HTML request for pagination.
var pageRequest = new XMLHttpRequest();
pageRequest.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
  true);
pageRequest.send();
pageRequest.onload = function () {
  var data = JSON.parse(pageRequest.response);
 


  function listDisplay(rows_per_page, currentPage) {
    currentPage--;

    let currentTable = document.querySelector('tbody');
    currentTable.innerHTML = "";

    var current_button = document.querySelector('.pagenumbers button.active');
    current_button.classList.remove('active');
    var page_button = document.getElementById(currentPage+1);
    page_button.classList.add('active');
    //       for (var j=rows-1; j >= 0; j--) {
    //         currentTable.deleteRow(j);
    //       }
          
    let start = rows_per_page * currentPage;
    let end = start + parseInt(rows_per_page);
    var finalItems = [];
    for (var i = start; i < end; i++) {
      finalItems.push(data[i]);
    }
   
    for (var i = 0; i < finalItems.length; i++) {
      var tr1 = document.createElement("tr");
      var td = createTdata("th", finalItems[i].id);
      var td2 = createTdata("th", finalItems[i].name);
      var td3 = createTdata("th", finalItems[i].email);
      tr1.append(td, td2, td3);
      tbody.append(tr1);
    }
    visiblePage = currentPage+1;
    console.log(visiblePage+ "kkk");
  }

  var divPage = document.getElementById("pagination");
  let buttonCount = Math.ceil(data.length / rows);

  function pagePrev() {
    var prevButton = document.createElement('button');
             prevButton.setAttribute('value', 'prev');
            prevButton.innerHTML = "Prev";
            prevButton.addEventListener('click',function () {
              console.log(visiblePage, buttonCount);

              if (visiblePage > 1) {
                console.log(visiblePage+ "ddd");
                listDisplay(rows, --visiblePage);
              }
              // else alert("nokkodhu");
              
            });
            divPage.append(prevButton);
         document.body.append(divPage);     
  }   
 
  pagePrev();

  for (var j = 1; j <= buttonCount; j++) {
    pageButton(j);
  }

  
 

  function pageNext() {
    var nextButton = document.createElement('button');
             nextButton.setAttribute('value', 'next');
            nextButton.innerHTML = "Next";
            nextButton.addEventListener('click',function () {
              console.log(visiblePage, buttonCount);

              if (visiblePage < buttonCount) {
                console.log(visiblePage+ "ddd");
                listDisplay(rows, ++visiblePage);
              }
              // else alert("nokkodhu");
              
            });
            divPage.append(nextButton);
         document.body.append(divPage);     
  }

  
  function pageButton(value) {
    
    var pageButton = document.createElement("button");
    pageButton.setAttribute("id", `${value}`);
    pageButton.innerHTML = value;
    divPage.append(pageButton);
    document.body.append(divPage);
    if (page == value) pageButton.setAttribute("class", "active");
    pageButton.addEventListener("click", function () {
          page = value;
        //   page = green;
        //   console.log(green, value)
          listDisplay(`${rows}`, `${page}`);

          // var current_button = document.querySelector('.pagenumbers button.active');
          // current_button.classList.remove('active');
          // pageButton.classList.add('active')
          
        });
  return pageButton;
  }

  listDisplay(rows, page);
  pageNext();

};

// function of a cell creation
function createTdata(element, cValue) {
    var td = document.createElement(element);
    td.innerHTML = cValue;
    return td;
  }
  
