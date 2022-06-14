const card = document.querySelector('.loading');
card.innerHTML = pesan('Loading....');
axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=a18da3f1c1fe4f25b1c98cc7854e2f73&i')
    .then(respon => {
        const news = respon.data.articles;
        let card = "";
        news.forEach(s => card += render(s));
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = card;

    })
    .catch(err =>{
        card.innerHTML = pesan(err.message);
    })
    .finally(() => {

    });

// Saat di klik
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
        
        const inputKeyword = document.querySelector('.input-keyword');
        const ambilData = await getAmbilData(inputKeyword.value);
        updateUi(ambilData);
});

function getAmbilData(keyword){
    return axios.get('https://newsapi.org/v2/everything?from=2022-06-06&to=2022-06-06&sortBy=popularity&apiKey=a18da3f1c1fe4f25b1c98cc7854e2f73&q=' + keyword)
    .then(respon => respon.data.articles);
}

function updateUi(ambilData){
    let card = "";
    ambilData.forEach(s => card += render(s));
    const newsContainer = document.querySelector('.news-container')
    newsContainer.innerHTML = card;
}

function render(s){
    return `<div class="col-md-4 ">
                        <div class="card-fluid mt-4 px-2 pb-2 " style="width: 20rem;">
                            <img src="${s.urlToImage}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${s.title}</h5>   
                                <h6 class="card-subtitle mb-2 text-muted mt-2">${s.author} - ${s.publishedAt}</h6>
                                <p class="card-text mt-3">${s.description}</p>
                                <a href="${s.url}" target="blank" class="btn btn-primary">Lihat berita</a>
                            </div>
                        </div>
                    </div>`;
}

function pesan(p){
    return '<p style="text-align: center; background-color: grey; color: white; font-size: 20px;">' + p + '</p>';
}
