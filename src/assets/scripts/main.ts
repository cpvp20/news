declare var Handlebars: any;
let templateSource = document.getElementById('container').innerHTML;
let template = Handlebars.compile(templateSource);

let url = "/news/Apple";

function getNews() {
  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        console.log("getNews response will be: ");
        console.log(response);
        return response.json();
      } else {
        console.log("Error fetching news in getNews function");
        console.log(response);
      }
    })
    .catch((err) => err);
}

function displayNews() {
  getNews()
    .then((data) => {
      console.log(data);
      document.getElementById('container').innerHTML = template({ title: 'ITESO News App', noticia: data["articles"] });
    })
    .catch((err) => console.log(err));
}

/*******************************INITIAL CALL BEFORE USER SEARCHES ANYTHING**********************************/
displayNews();

/*******************************SEARCH**********************************/

function search(searchInputValue) {
  //Consultar el endpoint "everything" con el parámetro de búsqueda especificado por el usuario
  url = `/news/${searchInputValue}`;
  displayNews();  //Mostrar en un Grid los resultados obtenidos al realizar la búsqueda
}


let searchInputValue: string = '';

document.querySelector('input').addEventListener('keyup', (event: KeyboardEvent) => {
  console.log((<KeyboardEvent>event).key);
  searchInputValue = (<HTMLInputElement>event.target).value;
  console.log("button clicked");
  console.log(searchInputValue);

  if ((<KeyboardEvent>event).key === 'Enter') {
    search(searchInputValue);
  }
});

document.getElementById('searchBtn').addEventListener('click', () => search(searchInputValue));














