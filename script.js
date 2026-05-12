// const clickedCategory = document.getElementsByClassName("trees-of-category");
const removeAll = () => {
    const classes = document.querySelectorAll(".trees-of-category");

    for(const tree of classes){
        tree.classList.remove("active");
    }
}


const loadPlantsById = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => {

       
        removeAll();
        const clickedCategory = document.getElementById(`trees-${id}`);
        clickedCategory.classList.add("active");
         const allTrees = document.getElementById("all-trees");
        allTrees.classList.add("specialAlltrees");
        showPlantsById(json.plants);
        
    });
}

const showPlantsById = (plants) => {

    const plantsContainer = document.getElementById("plants-container");

    plantsContainer.innerHTML = "";

    for(const plant of plants){
        showPlants(plants);
    }
}

loadPlantsById();

const loadPlants = () => {
    const url = "https://openapi.programming-hero.com/api/plants";

    fetch(url)
    .then((res) => res.json())
    .then((json) => showPlants(json.plants));    
}

const showPlants = (plants) => {

    const plantsContainer = document.getElementById("plants-container");   

    plantsContainer.innerHTML = "";

    for(const plant of plants){
        const container = document.createElement("div");

        container.innerHTML=`
            <div class="flex flex-col gap-3 justify-between p-3 rounded-3xl bg-white h-full">
            <div> 
                <img src="${plant.image ? plant.image : 'Failed to load image'}" class="rounded-3xl" alt="About Green Earth">
            </div>

            <div class ="space-y-3">
                    <h1 class="font-semibold text-2xl">${plant.name}</h1>
            <p class="text-[#1F2937]">${plant.description}</p>
            <div class="flex justify-between items-center">
              <p class="bg-[#DCFCE7] px-2 py-1 rounded-3xl text-[#15803D]">${plant.category}</p>
              <p>৳${plant.price}</p>
            </div>
            <button class="btn btn-wide rounded-3xl text-[#DCFCE7] bg-[#15803D] hover:bg-[#FACC15] hover:text-[#15803D]">Add to Cart</button>
            </div>
          </div>
        `
        plantsContainer.appendChild(container);
    }
}

loadPlants();

const loadCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories";

    fetch(url)
    .then((res) => res.json())
    .then((json) => showCategories(json.categories));    
}

const showCategories = (categories) => {

    const categoryContainer = document.getElementById("category-container");

    categoryContainer.innerHTML = "";

    for(const category of categories){
        const container = document.createElement("div");
        container.innerHTML = `
            <p id="trees-${category.id}" onclick=loadPlantsById(${category.id}) class="text-black pl-3 py-2 hover:bg-[#15803D] hover:text-[#FACC15] rounded-md trees-of-category mt-2">${category.category_name}</p>  
        `
        categoryContainer.appendChild(container);
    }
}

loadCategory();

// toggling categories and all trees
document.getElementById("all-trees").addEventListener("click", function(){
    const allTrees = document.getElementById("all-trees");
    allTrees.classList.remove("specialAlltrees");
    loadPlants();
    removeAll();
}); 