const searchBouquet = document.getElementById("searchBouquet");
const bouquets = document.querySelectorAll(".products .box");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
searchBouquet.addEventListener("input", function(){
    let searchText = searchBouquet.value.trim().toLowerCase();
    let count = 0;
    bouquets.forEach(function(bouquet){
        let title = bouquet.querySelector("h3").textContent.toLowerCase();
        if(title.includes(searchText)){
            bouquet.style.display = "";
            count++;
        } else {
            bouquet.style.display = "none";
        }
    });
    resultCount.textContent = count + " bouquets found";
    noResults.hidden = count !== 0;
});

const flowerForm = document.getElementById("flowerForm");
const flowerInput = document.getElementById("flowerInput");
const flowerList = document.getElementById("flowerList");
const flowerCount = document.getElementById("flowerCount");
function addFlower(name){
    const li = document.createElement("li");
    li.textContent = name + " ";
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function(){
        li.remove();
        updateCount();
    });
    li.appendChild(removeBtn);
    flowerList.appendChild(li);
    updateCount();
}
flowerForm.addEventListener("submit", function(event){
    event.preventDefault();
    let flower = flowerInput.value.trim();
    if(flower === ""){
        alert("Please enter a flower name!");
        return;
    }
    addFlower(flower);
    flowerInput.value = "";
});

const favoriteButtons = document.querySelectorAll(".favorite-btn");
favoriteButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const bouquet = button.closest(".box");
        const bouquetName = bouquet.querySelector("h3").textContent;
        addFlower(bouquetName);
    });
});
function updateCount(){
    flowerCount.textContent = flowerList.children.length + " flowers added";
}
