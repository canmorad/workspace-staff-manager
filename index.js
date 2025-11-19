
function renderZones() {
    // const zones = document.getElementById('zones');
    const rectZones = zones.getBoundingClientRect();
    // const containerZones = document.getElementById('container-zones');
    const containerSVG = document.getElementById('container-svg');
    const rectSVG = containerSVG.getBoundingClientRect();
    let centreSalleSecurite = {};
    let centerSVG = {};
    const rayon = 250;
    const couleursZones = ["#13dff2ff", "#f213cdff", "#00693E", "#FFD700", "#4D4DFF"];


    centreSalleSecurite = {
        x: rectSVG.width / 2,
        y: rectSVG.height / 2
    };

    let positions = {
        centreSalleSecurite: { x: rectSVG.width * 0.2, y: rectSVG.height * 0.2, colour: "#13dff2ff" },
        centreSalleConference: { x: rectSVG.width * 0.8, y: rectSVG.height * 0.2, colour: "#f213cdff" },
        centreReception: { x: rectSVG.width * 0.2, y: rectSVG.height * 0.8, colour: "#00693E" },
        centreSalleServeurs: { x: rectSVG.width * 0.8, y: rectSVG.height * 0.8, colour: "#FFD700" },
        centreSallePersonnel: { x: rectSVG.width * 0.35, y: rectSVG.height * 0.5, colour: "#4D4DFF" },
        centreSalleArchives: { x: rectSVG.width * 0.65, y: rectSVG.height * 0.5, colour: "#119ec9ff" }
    };

    let circles = "";

    circles += `
            <circle cx="${positions.centreSalleArchives.x}" cy="${positions.centreSalleArchives.y}" r="50"
                    stroke="${positions.centreSalleArchives.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreSalleArchives.x}" y="${positions.centreSalleArchives.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Salle d'archives</text>
            <image x="${positions.centreSalleArchives.x - 35 / 2}" y="${positions.centreSalleArchives.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/archives.svg"/>

        `;

    circles += `
            <circle cx="${positions.centreSalleConference.x}" cy="${positions.centreSalleConference.y}" r="50"
                    stroke="${positions.centreSalleConference.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreSalleConference.x}" y="${positions.centreSalleConference.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Salle de conférence</text>
            <image x="${positions.centreSalleConference.x - 35 / 2}" y="${positions.centreSalleConference.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/conference.svg"/>

        
        `;

    circles += `
            <circle cx="${positions.centreReception.x}" cy="${positions.centreReception.y}" r="50"
                    stroke="${positions.centreReception.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreReception.x}" y="${positions.centreReception.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Réception</text>
            <image x="${positions.centreReception.x - 35 / 2}" y="${positions.centreReception.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/reception.svg"/>

        `;

    circles += `
            <circle cx="${positions.centreSalleServeurs.x}" cy="${positions.centreSalleServeurs.y}" r="50"
                    stroke="${positions.centreSalleServeurs.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreSalleServeurs.x}" y="${positions.centreSalleServeurs.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Salle des serveurs</text>
            
            <image x="${positions.centreSalleServeurs.x - 35 / 2}" y="${positions.centreSalleServeurs.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/server.svg"/>
        
        `;

    circles += `
            <circle cx="${positions.centreSallePersonnel.x}" cy="${positions.centreSallePersonnel.y}" r="50"
                    stroke="${positions.centreSallePersonnel.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreSallePersonnel.x}" y="${positions.centreSallePersonnel.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Salle du personnel</text>
            <image x="${positions.centreSallePersonnel.x - 35 / 2}" y="${positions.centreSallePersonnel.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/room.svg"/>

        `;

    circles += `
            <circle cx="${positions.centreSalleSecurite.x}" cy="${positions.centreSalleSecurite.y}" r="50"
                    stroke="${positions.centreSalleSecurite.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${positions.centreSalleSecurite.x}" y="${positions.centreSalleSecurite.y + 50 + 20} font-size="16" font-weight="bold" fill="#000" text-anchor="middle">Salle de sécurité</text>
            <image x="${positions.centreSalleSecurite.x - 35 / 2}" y="${positions.centreSalleSecurite.y - 35 / 2}" style="color:red;" width="35" height="35" href="svg_icon/security.svg"/>

        `;

    containerSVG.innerHTML = circles;
}

function renderPhoto() {
    const inputURL = document.getElementById('photo-url');
    const containerSVG = document.getElementById('svg-photo');
    const containerPhoto = document.getElementById('content-photo');
    inputURL.addEventListener('input', () => {
        const value = inputURL.value.trim();
        containerPhoto.style.display = 'flex'
        const rectSVG = containerSVG.getBoundingClientRect();
        containerSVG.innerHTML = "";

        if (value.length > 0) {
            const imgSize = 55;

            containerSVG.innerHTML += `<circle cx="${rectSVG.width / 2}" cy="${rectSVG.height / 2}" r="35"
                    stroke="#bcbaba" stroke-width="2" stroke-dasharray="20,10,5,5,5,10" fill="#f5f2f2" id="circle-render"></circle>                       
                 `;
            containerSVG.innerHTML += `<image x="${rectSVG.width / 2 - imgSize / 2}" y="${rectSVG.height / 2 - imgSize / 2}"  clip-path="circle(50%)" width="${imgSize}" height="${imgSize}" href="${value}"/>`;
        } else {
            containerSVG.innerHTML = "";
            containerPhoto.style.display = 'none'
        }

    });
};

function ajouterBlockExperince() {
    const experieces = document.getElementById('experieces');
    const ajouterExperienceBtn = document.getElementById('ajouter-experience-btn');

    ajouterExperienceBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const nouveauBlock = document.createElement('div');
        nouveauBlock.classList.add('experiece-item');

        nouveauBlock.innerHTML = `
               <button class="remove-experience-btn">
                    <i class="fa-solid fa-x"></i>
                </button>
                
                <p>Expériences :</p>
                <div class="box-input">
                    <div class="content-box">
                        <label for="entreprise">Entreprise :</label>
                        <input type="text" class="entreprise">
                    </div>

                    <div class="content-box">
                        <label for="role">Role :</label>
                        <input type="text" class="role">
                    </div>

                    <div class="content-box">
                        <label for="form">Du :</label>
                        <input type="date" class="form">
                    </div>

                    <div class="content-box">
                        <label for="to">Au :</label>
                        <input type="date" class="to">
                    </div>
                 </div>
        `;

        nouveauBlock.querySelector('.remove-experience-btn').addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(() => {
                nouveauBlock.remove();
            })
        }, 200);

        experieces.appendChild(nouveauBlock);

    })

}

function openModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'flex';
    document.getElementById('div-blur').classList.add('blur-active');
}

function closeModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'none';
    document.getElementById('div-blur').classList.remove('blur-active');
}

ajouterBlockExperince();
renderPhoto();
renderZones();

function initApp() {
    const ajouterEmployeBtn = document.getElementById('ajouter-employe-btn');
    const removeModaleBtn = document.getElementById('remove-modale-add-employe-btn');
    const rechercherEmploye = document.getElementById('rechercher-employe');
    const sauvegarderEmployeBtn = document.getElementById('sauvegarder-employe-btn');
    const formInfoEmploye = document.getElementById('form-info-employe');
    

    ajouterEmployeBtn.addEventListener('click', openModaleEmploye);

    removeModaleBtn.addEventListener('click', closeModaleEmploye);

    rechercherEmploye.addEventListener('input', function () {
        if (rechercherEmploye.value.trim().length > 0)
            document.getElementById('icon-search').style.display = 'none';
        else
            document.getElementById('icon-search').style.display = 'block';
    });

    
}

initApp();



