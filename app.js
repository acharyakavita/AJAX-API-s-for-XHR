(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        /*unsplash api*/
        let unsplashReq = new XMLHttpRequest();
        const clientID = '7afe00c1ebac8d0be88db8d4b87799981e0745f0a98a64dda045b6033c228837';
        unsplashReq.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}&client_id=${clientID}`);
        unsplashReq.onload = addImage;
        unsplashReq.onerror = error;
        unsplashReq.send();
        /*NY times API*/
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.onerror = error;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=f0f33f3526344777b33ab2d7eaf68fbe`);
        articleRequest.send();
    });
})();

function error() {
    const responseContainer = document.querySelector('#response-container');
    let div = document.createElement('div');
    div.innerHTML = '<p>sorry ,couldnt load the content</p>';
    responseContainer.appendChild(div);
}

function addImage() {
    const responseContainer = document.querySelector('#response-container');
    let data = JSON.parse(this.responseText);
    let div = document.createElement('div');
    div.innerHTML = `<figure><img src=${data.results[0].urls.regular}alt=${data.results[0].description}> 
                    <figcaption>Photo by ${data.results[0].user.name}</figcaption></figure>`;
    responseContainer.appendChild(div);
}


function addArticles() {
    const responseContainer = document.querySelector('#response-container');
    let data = JSON.parse(this.responseText);
    let ul = document.createElement('ul');
    for (let item of data.response.docs) {
        ul.innerHTML += `<li class="article"><h2><a href="${item.web_url}">${item.headline.main}</a></h2><p>${item.snippet}<p></li>`;
    }
    responseContainer.appendChild(ul);

}
