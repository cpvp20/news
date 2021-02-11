declare var Handlebars: any;

function getNews(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then(response => response.json()).then(data => {
      resolve(data);
    }).catch(error => {
      reject(error);
    })
  });
}

function search(searchInputValue) {
  //Consultar el endpoint "everything" con el parámetro de búsqueda especificado por el usuario
  let url = `https://newsapi.org/v2/everything?q=${searchInputValue}&sortBy=popularity&apiKey=f4e2bfd6e8394664a233b06e29bff473`;//
  template = Handlebars.compile(templateSource);
  getNews(url)
    .then(data => {
      //Mostrar en un Grid los resultados obtenidos al realizar la búsqueda
      document.getElementById('container').innerHTML = template({ title: 'ITESO News App', noticia: data['articles'] });
    }).catch(error => {
      console.log("error getting news: ", error);
    });

}//function search

/*******************************INITIAL CALL BEFORE USER SEARCHES ANYTHING**********************************/

let templateSource = document.getElementById('container').innerHTML;
let template = Handlebars.compile(templateSource);

getNews("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=f4e2bfd6e8394664a233b06e29bff473")
  .then(data => {
    document.getElementById('container').innerHTML = template({ title: 'ITESO News App', noticia: data['articles'] });
  }).catch(error => {
    console.log("error getting news: ", error);
  });

/*******************************SEARCH**********************************/

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














