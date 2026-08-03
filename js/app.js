/* ========================
   THE CAT ALMANAC
   JavaScript
============================ */

/* =========================
   Student Information 
========================= */

document.getElementById("student-info").textContent =
"Created by Navpreet Kaur | Student ID: 200615861";

/* =========================
  API Configuration
============================ */
const API_KEY = "live_0SRP4ouqq31ztvv8COdHG3ZN29LccwnDkgoQMqjkoerU7f2MmjMZXY0R37if6epG";

const API_URL = "https://api.thecatapi.com/v1";

/* ======================
   FEtch Random Cat Function 
========================= */

async function fetchRandomCat() { 

    const loading = 
    document.getElementById("loading-text");

    loading.textContent="Loading cat specimen...";

    try{

        const response = await fetch(
            `${API_URL}/images/search`,
            {
                headers : {
                    "x-api-key":API_KEY
                }
            }
        );

        const data = await response.json();

        displayCat(data[0]);

        loading.textContent="";
    }
    
    catch(error){

        loading.textContent=
        "Unable to load cat.";
    }
}

/* ===========================
 Update User Interface
============================ */
function displayCat(cat){

    const container = 
    document.getElementById("specimen-card");

    container.innerHTML=`
    
    <div class="cat-card">
    
       <img src="${cat.url}"
       alt="Random cat">
       
       <div class="cat-card__info">
       
       <h3>Cat Specimen</h3>
       
       <p>
       A beautiful cat from TheCatAPI collection.
       </p>
       
       </div>
    </div>
       `;
}

/* =======================
  Load Breeds
======================= */

async function loadBreeds() {

    const select = 
    document.getElementById("breed-select");

    try{
        const response =
        await fetch(
            `${API_URL}/breeds`,
            {
                headers:{
                    "x-api-key":API_KEY
                }
            }
        );

        const breeds =
        await response.json();

        select.innerHTML =
        `<option value="">
        Choose a breed
        </option>`;

        breeds.forEach(breed=>{
           
            select.innerHTML +=
            `
            <option value="${breed.id}">
            ${breed.name}
            </option>
            `;
        });

    }
    catch(error){

        console.log(error);
    }
    
}

/* ===========================
   Breed Information
============================ */
async function getBreed(id) {

    const response =
    await fetch(`${API_URL}/breeds`,
            {
                headers:{
                    "x-api-key":API_KEY
                }
            }
        );

        const breeds = await response.json();

        const breed = breeds.find(b => b.id === id);

        document.getElementById(
            "dossier"
        ).hidden=false;
        
        document.getElementById(
            "dossier-name"
        ).textContent=breed.name;
        
        document.getElementById(
            "dossier-origin"
        ).textContent=
        "Origin: "+breed.origin;
        
        document.getElementById(
            "dossier-description"
        ).textContent=
        breed.description;
        
        document.getElementById(
            "dossier-lifespan"
        ).textContent=
        breed.life_span+" years";

        document.getElementById(
            "dossier-weight"
        ).textContent=
        breed.weight.metric+" kg";

        document.getElementById(
            "dossier-temperament"
        ).textContent=
        breed.temperament;

        createTraitChart(breed.temperament);
        

}

/* ===========================
   Create Breed Radar Chart
============================ */
let traitChart;

function createTraitChart(temperament){

    const ctx = document.getElementById("trait-chart");


    if(traitChart){
        traitChart.destroy();
    }


    const traits = temperament.split(",");

    const labels = traits.slice(0,5);


    const values = labels.map(() =>
        Math.floor(Math.random() * 5) + 1
    );


    traitChart = new Chart(ctx, {

        type: "radar",

        data: {

            labels: labels,

            datasets: [
                {
                    label: "Temperament Traits",
                    data: values,
                    borderWidth: 2
                }
            ]
        },

        options: {

            responsive:true,

            scales:{
                r:{
                    min:0,
                    max:5
                }
            }

        }

    });

}

/* ===========================
   Event Listeners
============================ */

document
.getElementById("new-specimen-btn")
.addEventListener(
"click",
fetchRandomCat
);


document
.getElementById("breed-select")
.addEventListener(
"change",
(event)=>{

    if(event.target.value){

        getBreed(event.target.value);
    
    }
}
);

/* =============================
  Start Application
============================== */

fetchRandomCat();

loadBreeds();