
const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.news_category.slice(0, 3).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick = "handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });
    // console.log(data.data.news_category);
};

const handleLoadNews = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    data.data.forEach((news) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl mb-4">
                <figure>
                    <img src=${news?.image_url} alt="news-images" />
                </figure>
                <div class="card-body">
                    <div class="title-btn-cols flex flex-row gap-4 justify-between">
                        <h2 class="card-title">${news?.title.slice(0, 35)}</h2>
                        <div class="badge badge-secondary text-white p-4">${news?.rating?.badge}</div>
                    </div>
                    <p>${news.details.slice(0, 70)}</p>
                    <h3>Total Views: ${news.total_view ? news.total_view : "no views"}</h3>
                    <div class="flex flex-row gap-4 justify-between">
                        <div class="flex flex-row gap-2">
                            <img src=${news?.author?.img} alt="author-images" class="rounded-full w-1/3">
                            <div class="flex flex-col">
                                <p>${news?.author?.name}</p>
                                <p>${news?.author?.published_date}</p>
                            </div>
                        </div>
                        <div class="card-actions ">
                            <button onclick="handleModal('${news._id}')" class="btn btn-neutral text-white">Details</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })

}

const handleModal = async (newsId) => {
    console.log(newsId);

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    console.log(data);

    const modalContainer = document.getElementById('modal-container');

    data.data.forEach((newsDetails)=>{

        const div = document.createElement('div');
        div.innerHTML = `
        
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
          <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">More....</h3>
            <p class="py-4">${newsDetails.author.name}</p>
            <p class="py-4">${newsDetails.details}</p>
            <div class="modal-action">
              <button class="btn">Close</button>
            </div>
          </form>
        </dialog>
        `;
    
        modalContainer.appendChild(div);
    
        const modal = document.getElementById('my_modal_5');
        modal.showModal();
    })
}

handleCategory();
handleLoadNews("01");