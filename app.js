(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        let unsplashReq = new XMLHttpRequest();
        const clientID = '7afe00c1ebac8d0be88db8d4b87799981e0745f0a98a64dda045b6033c228837';
        unsplashReq.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}&client_id=${clientID}`);
        unsplashReq.onload = addImage;
        unsplashReq.onerror = error;
        unsplashReq.send();
    });
})();

function error() {
    const responseContainer = document.querySelector('#response-container');
    let div = document.createElement('div');
    div.innerHTML = '<p>sorry ,couldnt load the image</p>';
    responseContainer.appendChild(div);
}

function addImage() {
    const responseContainer = document.querySelector('#response-container');
    let data = JSON.parse(this.responseText);
    let div = document.createElement('div');
    div.innerHTML = '<img src=' + data.results[0].urls.regular + 'alt=' + data.results[0].description + '>';
    responseContainer.appendChild(div);
}

