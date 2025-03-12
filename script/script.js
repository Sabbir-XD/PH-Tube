function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");
    for(const activeButton of activeButtons){
        activeButton.classList.remove("active");
    }
}

//Button-catrogory-add-dynamicly-in-api
async function dynamicCatagory(){
    try{
        const response = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
        const data = await response.json();
        const catagory = data.categories;
        displayCatagory(catagory);
    }
    catch(error){
        console.error(error);
    }
}


//video-catagory-add-dynamicly-in-api
async function dynamicVideo(){
     fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(response => response.json())
        .then(data => {
            const videos = data.videos;
            displayVideo(videos);
        })
} 

const dynamicCatagoryVideos = async (id) => {
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
   
   fetch(url)
   .then(response => response.json())
   .then(data => {
    removeActiveClass();
    const clickBtn = document.getElementById(`btn-${id}`);
    clickBtn.classList.add("active");
    displayVideo(data.category);
   });
}



//Display-catagory-show-in-user-interface
function displayCatagory(catagorys){
    const catagoryContainer = document.getElementById("catagory-container");

    for(const cat of catagorys){
        const div =document.createElement("div");
        div.innerHTML =`
        <button id="btn-${cat.category_id}" onClick="dynamicCatagoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        catagoryContainer.appendChild(div);

    }
}


//Display-video-show-in-user-interface
const displayVideo =(videos)=>{
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";
     
    if(videos.length === 0){
        videoContainer.innerHTML = `
          <section class="py-16 col-span-full">
            <div class="flex flex-col justify-center items-center">
                <img src="asset/Icon.png" alt="">
                <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</p>
            </div>
          </section>`;
        return;
    }
    videos.forEach(video => {
        console.log(video);
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card">
            <figure class="relative">
              <img class="h-[200px] w-full object-cover"
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago</span>
            </figure>
            <div class="card-body flex-row px-1">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                      <img class="" src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                <div class="pl-3">
                    <h2 class="card-title">${video.title}</h2>
                    <p class="flex gap-2 text-sm text-[#17171770]">${video.authors[0].profile_name} 
                    ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=120&id=lalayI2ulYNt&format=png" alt="">` : ''}
                    </p>
                    <p class="text-sm text-[#17171770]">${video.others.views} views</p>
                  </div>
            </div>
        </div>
        `;
        videoContainer.appendChild(div);
    })
}


dynamicCatagory();
