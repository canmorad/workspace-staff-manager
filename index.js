
let validationRules = {
    'nom-complet': {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
        errorMessage: "Nom invalide. Doit contenir au moins 3 caractères (lettres, espaces, tirets, apostrophes uniquement).",
        validMessage: "Nom complet valide."
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Email invalide. Format attendu : exemple@domaine.com.",
        validMessage: "Email valide."
    },
    telephone: {
        regex: /^(\+?\d{1,3}[- ]?)?(\d{9,15})$/,
        errorMessage: "Téléphone invalide. Doit contenir entre 9 et 15 chiffres avec ou sans indicatif pays.",
        validMessage: "Numéro de téléphone valide."
    },
    'photo-url': {
        regex: /^(http|https):\/\/[^ "']*\.(?:png|jpg|jpeg|gif|svg)$/i,
        errorMessage: "URL de photo invalide. Doit être un lien complet se terminant par une extension d'image (png, jpg, jpeg, gif, svg).",
        validMessage: "URL de photo valide."
    },
    // role: {
    //     regex: /^.{1,}$/,
    //     errorMessage: "Veuillez sélectionner un rôle.",
    //     validMessage: "Rôle principal sélectionné."
    // },
    'span-entreprise': {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'&,.-]{3,}$/,
        errorMessage: "Nom de l'entreprise invalide. Doit contenir au moins 3 caractères.",
        validMessage: "Nom de l'entreprise valide."
    },
    'role-experience': {
        regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/,
        errorMessage: "Rôle de l'expérience invalide. Doit contenir au moins 3 caractères.",
        validMessage: "Rôle de l'expérience valide."
    },
    'form-date': {
        regex: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
        errorMessage: "La date de début doit être antérieure à la date de fin.",
        validMessage: "Date 'Du' valide."
    },
    'to-date': {
        regex: /^[\d]{4}-[\d]{2}-[\d]{2}$/,
        errorMessage: "La date de fin doit être postérieure à la date de début.",
        validMessage: "Date 'Au' valide."
    }
};


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
                        <input type="text" class="entreprise" name="span-entreprise">
                        <span class="span-entreprise"></span>
                    </div>

                    <div class="content-box">
                        <label for="role">Role :</label>
                        <input type="text" class="role" name="role-experience">
                        <span class="role-experience"></span>
                    </div>

                    <div class="content-box">
                        <label for="form">Du :</label>
                        <input type="date" class="form" name="form-date">
                        <span class="form-date"></span>
                    </div>

                    <div class="content-box">
                        <label for="to">Au :</label>
                        <input type="date" class="to" name="to-date">
                        <span class="to-date"></span>
                    </div>
                 </div>
        `;

        nouveauBlock.querySelector('.remove-experience-btn').addEventListener('click', (e) => {
            e.preventDefault();
            setTimeout(() => {
                nouveauBlock.remove();
            })
        }, 200);

        nouveauBlock.querySelectorAll('input').forEach((input) => {
            if (input.type === 'date') return;

            input.addEventListener('input', () => {
                let value = input.value.trim();
                let regex = validationRules[input.name].regex;
                let errorSpan = nouveauBlock.querySelector('.' + input.name);
                console.log(errorSpan);
                errorSpan.innerHTML = "";

                if (value.length > 0) {
                    if (!value.match(regex)) {
                        input.style.border = "3px solid red";
                        errorSpan.innerText = validationRules[input.name].errorMessage;
                        errorSpan.style.color = 'red'
                    }
                    else {
                        input.style.border = "3px solid green";
                        errorSpan.innerText = validationRules[input.name].validMessage;
                        errorSpan.style.color = 'green';

                        setTimeout(() => {
                            errorSpan.innerText = "";
                        }, 3000);
                    }
                } else {
                    errorSpan.innerText = "";
                }

            });

        });

        let validationDate = function () {
            let dateDebut = nouveauBlock.querySelector('.form');
            let dateFin = nouveauBlock.querySelector('.to');
            let errorSpanForm = nouveauBlock.querySelector('.' + dateDebut.name);
            let errorSpanTo = nouveauBlock.querySelector('.' + dateFin.name);

            dateDebut.style.border = "";
            errorSpanForm.innerText = "";
            errorSpanForm.style.color = "";

            if (dateFin.value && dateDebut.value) {
                const debut = new Date(dateDebut.value);
                const fin = new Date(dateFin.value);

                if (debut > fin) {
                    dateDebut.style.border = "3px solid red";
                    dateFin.style.border = "3px solid red";

                    errorSpanForm.innerText = validationRules[dateDebut.name].errorMessage;
                    errorSpanTo.innerText = validationRules[dateFin.name].errorMessage;

                    errorSpanForm.style.color = 'red';
                    errorSpanTo.style.color = 'red';

                    setTimeout(() => {
                        errorSpanForm.innerText = "";
                        errorSpanTo.innerText = "";
                    }, 3000);

                } else {
                    dateDebut.style.border = "3px solid green";
                    dateFin.style.border = "3px solid green";

                    errorSpanForm.innerText = validationRules[dateDebut.name].validMessage;
                    errorSpanTo.innerText = validationRules[dateFin.name].validMessage;

                    errorSpanForm.style.color = 'green';
                    errorSpanTo.style.color = 'green';

                    setTimeout(() => {
                        errorSpanForm.innerText = "";
                        errorSpanTo.innerText = "";
                    }, 3000);
                }
            }
        }

        nouveauBlock.querySelector('.form').addEventListener('input', validationDate);
        nouveauBlock.querySelector('.to').addEventListener('input', validationDate);

        experieces.appendChild(nouveauBlock);

    });

}

function openModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'flex';
    document.getElementById('div-blur').classList.add('blur-active');
}

function closeModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'none';
    document.getElementById('div-blur').classList.remove('blur-active');
}

function saveEmployeData() {

    const nomCompletInput = document.getElementById('nom-complet').value.trim();
    const roleInput = document.getElementById('role').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const telephoneInput = document.getElementById('telephone').value.trim();
    const photoURLInput = document.getElementById('photo-url').value.trim();
    const experieces = document.getElementById('experieces');
    const employeData = getEmployeData();
    let experiecesTAB = [];

    experieces.querySelectorAll('.box-input').forEach((experiece) => {
        const entrepriseInput = experiece.querySelector('.entreprise').value.trim();
        const roleInput = experiece.querySelector('.role').value.trim();
        const formInput = experiece.querySelector('.form').value.trim();
        const toInput = experiece.querySelector('.to').value.trim();

        experiecesTAB.push(
            {
                entreprise: entrepriseInput,
                role: roleInput,
                form: formInput,
                to: toInput
            }
        );
    });

    employeData.push({
        nom: nomCompletInput,
        role: roleInput,
        email: emailInput,
        telephone: telephoneInput,
        photoUR: photoURLInput,
        experieces: experiecesTAB
    });

    localStorage.setItem('employes', JSON.stringify(employeData));

    setTimeout(() => {
        document.querySelector('.valid').style.display = 'none';
    }, 3000);

    setTimeout(() => {
        closeModaleEmploye();
    }, 5000);
}

function getEmployeData() {
    if (!localStorage.getItem('employes')) {
        return [];
    }
    return JSON.parse(localStorage.getItem('employes'));
}

function validationForm() {
    const formInfoEmploye = document.getElementById('form-info-employe');
    let isvalide = true;
    formInfoEmploye.querySelectorAll('input').forEach((input) => {

        if (input.style.borderColor === 'red' || !validationInput(input)) {
            isvalide = false;
        }

        // validationInput(input);
    });

    return isvalide;

}

function validationInput(input) {
    let value = input.value.trim();
    if (!value) {
        let errorSpan = document.querySelector('.' + input.name);

        errorSpan.innerHTML = "";

        input.style.border = "3px solid red";
        errorSpan.innerText = "Ce champ est obligatoire.";
        errorSpan.style.color = 'red'

        setTimeout(() => {
            errorSpan.innerText = "";
        }, 3000);

        return false
    }
    return true;
}

function initApp() {
    const ajouterEmployeBtn = document.getElementById('ajouter-employe-btn');
    const removeModaleBtn = document.getElementById('remove-modale-add-employe-btn');
    const rechercherEmploye = document.getElementById('rechercher-employe');
    const formInfoEmploye = document.getElementById('form-info-employe');


    ajouterEmployeBtn.addEventListener('click', openModaleEmploye);

    removeModaleBtn.addEventListener('click', closeModaleEmploye);

    rechercherEmploye.addEventListener('input', function () {
        if (rechercherEmploye.value.trim().length > 0)
            document.getElementById('icon-search').style.display = 'none';
        else
            document.getElementById('icon-search').style.display = 'block';
    });

    formInfoEmploye.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validationForm()) {
            document.querySelector('.erorr').style.display = 'block';

            setTimeout(() => {
                document.querySelector('.erorr').style.display = 'none';
            }, 3000);
        } else {
            document.querySelector('.valid').style.display = 'block';
            saveEmployeData();
        }
    });

    formInfoEmploye.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => {
            let value = input.value.trim();
            let regex = validationRules[input.name].regex;
            let errorSpan = document.getElementsByClassName(input.name)[0];

            errorSpan.innerHTML = "";

            if (value.length > 0) {
                if (!value.match(regex)) {
                    input.style.border = "3px solid red";
                    errorSpan.innerText = validationRules[input.name].errorMessage;
                    errorSpan.style.color = 'red'

                    setTimeout(() => {
                        errorSpan.innerText = "";
                    }, 3000);
                }
                else {
                    input.style.border = "3px solid green";
                    errorSpan.innerText = validationRules[input.name].validMessage;
                    errorSpan.style.color = 'green';
                    setTimeout(() => {
                        errorSpan.innerText = "";
                    }, 3000);
                }
            } else {
                errorSpan.innerText = "";
            }

        })
    });

    ajouterBlockExperince();
    renderPhoto();
    renderZones();

}

initApp();



