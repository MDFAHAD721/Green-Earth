// const cartHistory = [];

const cart = [];
let totalPrice = 0;

const manageSpinner = (status) => {
    if(status === true){
        document.getElementById("spinner").classList.remove("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
    }
}

const removeAll = () => {
    const classes = document.querySelectorAll(".trees-of-category");

    for(const tree of classes){
        tree.classList.remove("active");
    }
}

const loadPlantModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => showPlantModal(json.plants));
}

const showPlantModal = (plants) => {
    const modalContainer = document.getElementById("modal-container");

    modalContainer.innerHTML = `
        <div class="flex flex-col gap-1 justify-between p-2">
            <div> 
                <img src="${plants.image ? plants.image : 'Failed to load image'}" class="rounded-3xl" alt="About Green Earth">
            </div>

            <div class ="space-y-3">
                    <h1 onclick=loadPlantModal(${plants.id}) class="font-semibold text-2xl">${plants.name}</h1>
            <p class="text-[#1F2937]">${plants.description}</p>
            <div class="flex justify-between items-center">
              <p class="bg-[#DCFCE7] px-2 py-1 rounded-3xl text-[#15803D]">${plants.category}</p>
              <p>৳${plants.price}</p>
            </div>
    `
    document.getElementById("my_modal_5").showModal();
    ;
}


const loadPlantsById = (id) => {

    manageSpinner(true);

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

        manageSpinner(false);
        
    });
}

const showPlantsById = (plants) => {

    const plantsContainer = document.getElementById("plants-container");

    plantsContainer.innerHTML = "";

    showPlants(plants);

    
}


const loadCart = (id) => {

    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => {

        showCart(json.plants);

    });
}

const showCart = (plants) => {

    const existingPlant = cart.find((plant) => plant.id === plants.id);

    if(existingPlant) {
        existingPlant.quantity += 1;
    }
    else {
        plants.quantity = 1;
        cart.unshift(plants);
    }
    
    renderCart();
}    

const renderCart = () => {

    const priceContainer = document.getElementById("price-container");

    const cartContainer = document.getElementById("cart-container");

    totalPrice = 0;

    cartContainer.innerHTML = "";

    for(const plant of cart){

        totalPrice += plant.price * plant.quantity;

        cartContainer.innerHTML += `
        <div class="cart-box flex justify-between items-center p-2 rounded-xl bg-[#F0FDF4]"> 

            <div class="flex flex-col"> 
              <h1 class="text-lg font-semibold">${plant.name}</h1>
            <p class="font-light">৳${plant.price} x ${plant.quantity}</p>
            </div>

            <div onclick="removeFromCart(${plant.id})">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          `;
    }

    if(cart.length > 0){
        priceContainer.innerHTML= `
        <div class="flex justify-between items-center mt-3">
            <h1 class="text-lg font-semibold">Total :</h1>
            <p>৳${totalPrice}</p>
        </div>
        `
    }
    else{
        priceContainer.innerHTML = "";
    }
 
}

const removeFromCart = (id) => {
    const plantIndex = cart.findIndex((plant) => plant.id === id);

    document.getElementById("price-container").innerHTML = "";

    if(plantIndex !== -1){
        cart.splice(plantIndex, 1);
    }
    renderCart();
}


const loadPlants = () => {

    manageSpinner(true);

    const url = "https://openapi.programming-hero.com/api/plants";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {

        showPlants(json.plants)
        manageSpinner(false);

    });    
    

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

                <h1 onclick=loadPlantModal(${plant.id}) class="font-semibold text-2xl">${plant.name}</h1>

                <p class="text-[#1F2937]">${plant.description}</p>

            <div class="flex justify-between items-center">

              <p class="bg-[#DCFCE7] px-2 py-1 rounded-3xl text-[#15803D]">${plant.category}</p>
              <p>৳${plant.price}</p>
            </div>

            <button onclick="loadCart(${plant.id})" class="btn w-full rounded-3xl text-[#DCFCE7] bg-[#15803D] hover:bg-[#FACC15] hover:text-[#15803D]">Add to Cart</button>
            
            </div>  

        </div>
        `
        plantsContainer.appendChild(container);
    }

}

loadPlants();

const loadCategory = () => {

    manageSpinner(true);

    const url = "https://openapi.programming-hero.com/api/categories";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {

        showCategories(json.categories)
        manageSpinner(false);

    });   
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

