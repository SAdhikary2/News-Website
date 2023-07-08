const API_KEY="b13e6567aa724c85b5d5d55508034c7a";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardcontainer=document.getElementById("class-container");
    const cardtemplate=document.getElementById("template-news-card");

    cardcontainer.innerHTML=" ";

    articles.forEach((article) => {

        if(!article.urlToImage) return;

        const cardclone=cardtemplate.content.cloneNode(true);
        filldataIncard(cardclone,article);
        cardcontainer.appendChild(cardclone);
        
    });
}

 function filldataIncard(cardclone,article)
{
    const newsImg=cardclone.querySelector("#new-image");
    const newstittle=cardclone.querySelector("#news-tittle");
    const newsource=cardclone.querySelector("#news-source");
    const newsDesc=cardclone.querySelector("#news-desc");

    newsImg.src =article.urlToImage;
    newstittle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });
    newsource.innerHTML=`${article.source.name} 🙂 ${date}`;
    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}

let currentSelectiveNav=null;
function onnavitemclick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSelectiveNav?.classList.remove("active");
    currentSelectiveNav=navItem;
    currentSelectiveNav.classList.add("active");
}


const SearchText=document.getElementById("search-text");
const SearchButton=document.getElementById("search-button");

SearchButton.addEventListener("click",()=>{
    const query=SearchText.value;
    if(!query)return;
    fetchNews(query);

    currentSelectiveNav?.classList.remove("active");
    currentSelectiveNav=null;
})