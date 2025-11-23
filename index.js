
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
    role: {
        regex: /^.{1,}$/,
        errorMessage: "Veuillez sélectionner un rôle.",
        validMessage: "Rôle principal sélectionné."
    },
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

// let positions = {};
const zoneNoms = ["centreSalleSecurite", "centreSalleConference", "centreReception", "centreSalleServeurs", "centreSallePersonnel", "centreSalleArchives"];

const zoneInfo = {
    centreSalleSecurite: {
        icon: "svg_icon/security.svg",
        nom: "Salle de sécurité",
        restrictions: "agentSecurite,manager,nettoyage",
        colour: "#13dff2ff",
        limite: 2
    },
    centreSalleConference: {
        icon: "svg_icon/conference.svg",
        nom: "Salle de conférence",
        restrictions: "",
        colour: "#f213cdff",
        limite: 15
    },
    centreReception: {
        icon: "svg_icon/reception.svg",
        nom: "Réception",
        restrictions: "receptionniste,manager,nettoyage",
        colour: "#00693E",
        limite: 6
    },
    centreSalleServeurs: {
        icon: "svg_icon/server.svg",
        nom: "Salle des serveurs",
        restrictions: "technicien,manager,nettoyage",
        colour: "#FFD700",
        limite: 3
    },
    centreSallePersonnel: {
        icon: "svg_icon/room.svg",
        nom: "Salle du personnel",
        restrictions: "",
        colour: "#4D4DFF",
        limite: 8
    },
    centreSalleArchives: {
        icon: "svg_icon/archives.svg",
        nom: "Salle d'archives",
        restrictions: "receptionniste,technicien,agentSecurite,manager",
        colour: "#119ec9ff",
        limite: 4
    },
};

function renderCircleZone(zoneNom, zoneCentre) {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(SVG_NS, 'g');

    circle.innerHTML = `
            <circle class="${zoneNom}" cx="${zoneCentre.x}" cy="${zoneCentre.y}" r="50"
                    stroke="${zoneCentre.colour}" stroke-width="4" fill="#DDD"></circle>
            <text x="${zoneCentre.x}" y="${zoneCentre.y + 50 + 20}" font-size="16" font-weight="bold" fill="#000" text-anchor="middle">${zoneInfo[zoneNom].nom}</text>
            <image x="${zoneCentre.x - 35 / 2}" y="${zoneCentre.y - 35 / 2}" style="color:red;" width="35" height="35" href="${zoneInfo[zoneNom].icon}"/>
            <g id="group-slot-${zoneNom}">
            </g>

            <g class="add-btn" data-restrictions="${zoneInfo[zoneNom].restrictions}" limite-zone="${zoneInfo[zoneNom].limite}" nom-zone="${zoneNom}">
                 <circle class="add-circle" cx="${zoneCentre.x + 100}" cy="${zoneCentre.y + 20}" r="15" fill="${zoneCentre.colour}"></circle>
                <image  x="${zoneCentre.x + 100 - 20}" y="${zoneCentre.y}" width="40" height="40" href="svg_icon/add.svg"/>
            </g> 
    `;
    const addBtn = circle.querySelector('.add-btn');

    addBtn.addEventListener('click', () => {
        const dataRestrictions = addBtn.getAttribute('data-restrictions').split(',').filter(r => r.trim() !== "");
        const modaleZoneEmploye = document.getElementById('modale-zone-employe');
        const containerZoneEmploye = document.getElementById('container-zone-employe');
        const nbrEmployesZone = nombreEmployesZone(addBtn.getAttribute('nom-zone'));
        const limiteZone = addBtn.getAttribute('limite-zone');
        modaleZoneEmploye.style.display = 'flex';
        const employesData = getEmployeData();
        let nbrEmployes = 0;
        containerZoneEmploye.innerHTML = "";

        if (nbrEmployesZone >= limiteZone) {
            const textVide = document.createElement("p");
            textVide.style.fontSize = "20px";
            textVide.style.textAlign = "centre";
            textVide.style.color = "red";
            textVide.innerHTML = "La zone est pleine impossible d'ajouter plus d'employés.";
            containerZoneEmploye.appendChild(textVide);
        } else {

            if (!dataRestrictions.length) {
                employesData.forEach((employe) => {
                    if (employe.zoneID !== zoneNom) {
                        const employeCard = renderEmployeZoneItem(employe);
                        nbrEmployes++;
                        employeCard.addEventListener('click', () => {

                            removeEmployeToZone(employeCard, zoneNom);

                        });
                        containerZoneEmploye.appendChild(employeCard);
                    }
                });
            } else {
                employesData.forEach((employe) => {
                    if (dataRestrictions.includes(employe.role) && employe.zoneID !== zoneNom) {
                        const employeCard = renderEmployeZoneItem(employe);
                        nbrEmployes++;
                        employeCard.addEventListener('click', () => {

                            removeEmployeToZone(employeCard, zoneNom);

                        });
                        containerZoneEmploye.appendChild(employeCard);
                    }
                });

                if (nbrEmployes === 0) {
                    const textVide = document.createElement("p");
                    textVide.style.fontSize = "20px";
                    textVide.style.textAlign = "centre";
                    textVide.style.color = "red";
                    textVide.innerHTML = "Aucun employé assigné à cette zone";
                    containerZoneEmploye.appendChild(textVide);
                }
            }
        }

    });

    return circle;
}

function renderZones() {
    const containerSVG = document.getElementById('container-svg');
    const rectSVG = containerSVG.getBoundingClientRect();
    containerSVG.innerHTML = "";

    centreSalleSecurite = {
        x: rectSVG.width / 2,
        y: rectSVG.height / 2
    };

    const mobilePositions = {
        centreSalleSecurite: { x: rectSVG.width * 0.5, y: 220 * 1, colour: "#13dff2ff" },
        centreSalleConference: { x: rectSVG.width * 0.5, y: 220 * 2, colour: "#f213cdff" },
        centreReception: { x: rectSVG.width * 0.5, y: 220 * 3, colour: "#00693E" },
        centreSalleServeurs: { x: rectSVG.width * 0.5, y: 220 * 4, colour: "#FFD700" },
        centreSallePersonnel: { x: rectSVG.width * 0.5, y: 220 * 5, colour: "#4D4DFF" },
        centreSalleArchives: { x: rectSVG.width * 0.5, y: 220 * 6, colour: "#119ec9ff" }
    };

    const tablettePositions = {
        centreSalleSecurite: { x: rectSVG.width * 0.5, y: 220 * 1, colour: "#13dff2ff" },
        centreSalleConference: { x: rectSVG.width * 0.5, y: 220 * 2, colour: "#f213cdff" },
        centreReception: { x: rectSVG.width * 0.5, y: 220 * 3, colour: "#00693E" },
        centreSalleServeurs: { x: rectSVG.width * 0.5, y: 220 * 4, colour: "#FFD700" },
        centreSallePersonnel: { x: rectSVG.width * 0.5, y: 220 * 5, colour: "#4D4DFF" },
        centreSalleArchives: { x: rectSVG.width * 0.5, y: 220 * 6, colour: "#119ec9ff" }
    };

    const desktopPositions = {
        centreSalleSecurite: { x: rectSVG.width * 0.2, y: rectSVG.height * 0.2, colour: "#13dff2ff" },
        centreSalleConference: { x: rectSVG.width * 0.8, y: rectSVG.height * 0.2, colour: "#f213cdff" },
        centreReception: { x: rectSVG.width * 0.2, y: rectSVG.height * 0.8, colour: "#00693E" },
        centreSalleServeurs: { x: rectSVG.width * 0.8, y: rectSVG.height * 0.8, colour: "#FFD700" },
        centreSallePersonnel: { x: rectSVG.width * 0.35, y: rectSVG.height * 0.5, colour: "#4D4DFF" },
        centreSalleArchives: { x: rectSVG.width * 0.65, y: rectSVG.height * 0.5, colour: "#119ec9ff" }
    };

    if (window.innerWidth < 767) {

        zoneNoms.forEach((nom) => {
            const circleZone = renderCircleZone(nom, mobilePositions[nom]);
            containerSVG.appendChild(circleZone);
        });

        renderEmployeesZones(mobilePositions);

    } else if (window.innerWidth > 768 && window.innerWidth < 1023) {
        zoneNoms.forEach((nom) => {
            const circleZone = renderCircleZone(nom, tablettePositions[nom]);
            containerSVG.appendChild(circleZone);
        });

        renderEmployeesZones(mobilePositions);
    } else {
        zoneNoms.forEach((nom) => {
            const circleZone = renderCircleZone(nom, desktopPositions[nom]);
            containerSVG.appendChild(circleZone);
        });

        renderEmployeesZones(desktopPositions);
    }


}

function renderEmployeesZones(positions) {
    for (let i = 0; i < 6; i++) {
        renderEmployeesZone(zoneNoms[i], positions[zoneNoms[i]]);
    }
}

function nombreEmployesZone(zoneNom) {
    const employeData = getEmployeData();
    let count = 0;
    employeData.forEach((employe) => {
        if (employe.zoneID === zoneNom) {
            count++;
        }
    });
    return count;
}

function testZone() {

    setInterval(() => {
        zoneNoms.forEach((nom) => {
            if (nom !== "centreSalleConference" && nom !== "centreSallePersonnel") {
                const circleElement = document.querySelector(`.${nom}`);
                if (nombreEmployesZone(nom) === 0) {

                    if (circleElement) {
                        circleElement.style.stroke = 'white';
                        setTimeout(() => {
                            circleElement.style.stroke = 'red';
                        }, 100);
                    }

                } else {
                    circleElement.style.stroke = `${zoneInfo[nom].colour}`;
                }
            }

        });
    }, 3000);

}

function renderEmployeesZone(zoneNom, zoneCenter) {
    const containerSlot = document.getElementById(`group-slot-${zoneNom}`);
    const employesData = getEmployeData();
    const angles = [280, 220, 165];
    const SVG_NS = "http://www.w3.org/2000/svg";

    containerSlot.innerHTML = "";

    const employesZone = employesData.filter((employe) => {
        if (employe.zoneID === zoneNom)
            return employe;
    });

    if (employesZone.length <= 3) {

        for (let i = 0; i < employesZone.length; i++) {
            const angle = angles[i];
            const angleRad = angle * (Math.PI / 180);

            const employee_cx = zoneCenter.x + 80 * Math.cos(angleRad);
            const employee_cy = zoneCenter.y + 80 * Math.sin(angleRad);
            const groupEmploye = document.createElementNS(SVG_NS, 'g');
            groupEmploye.classList.add(`employee-group-${zoneNom}`);

            groupEmploye.innerHTML = `
                      <circle 
                        cx="${employee_cx}" cy="${employee_cy}" 
                        r="20" fill="#ddd" stroke="red" stroke-width="2"
                    />

                    <image 
                        class="info-employe"
                        data-employe-id="${employesZone[i].email}"
                        x="${employee_cx - 30 / 2}" y="${employee_cy - 30 / 2}" 
                        width="30" height="30" 
                        href="${employesZone[i].photoURL}"  
                    />
                    
                    <circle 
                        cx="${employee_cx}" cy="${employee_cy - 25}" 
                        r="8" fill="red" stroke="white"
                    />
                    
                    <image 
                        class="delete-employe-slot-btn"  
                        data-employe-id="${employesZone[i].email}"
                        x="${employee_cx - 7.5}" y="${employee_cy - 33}" 
                        width="15" height="15" 
                        stroke="blue"
                        href="svg_icon/delete.svg"  
                    />
           `;

            const deleteButton = groupEmploye.querySelector('.delete-employe-slot-btn');
            const infoEmploye = groupEmploye.querySelector('.info-employe');

            deleteButton.addEventListener('click', () => {
                const employeId = deleteButton.getAttribute('data-employe-id');
                removeEmployeCardZone(employeId);
            });

            infoEmploye.addEventListener('click', () => {
                const employeId = infoEmploye.getAttribute('data-employe-id');
                afficherDetailEmploye(employeId);

            });

            containerSlot.appendChild(groupEmploye);
        }
    } else {

        for (let i = 0; i < 3; i++) {
            const angle = angles[i];
            const angleRad = angle * (Math.PI / 180);

            const employee_cx = zoneCenter.x + 80 * Math.cos(angleRad);
            const employee_cy = zoneCenter.y + 80 * Math.sin(angleRad);
            const groupEmploye = document.createElementNS(SVG_NS, 'g');
            // groupEmploye.classList.add("employee-group-centreSalleSecurite");

            groupEmploye.innerHTML = `
                     <circle 
                        cx="${employee_cx}" cy="${employee_cy}" 
                        r="20" fill="#ddd" stroke="red" stroke-width="2"
                    />

                    <image 
                        class="info-employe"
                        data-employe-id="${employesZone[i].email}"
                        x="${employee_cx - 30 / 2}" y="${employee_cy - 30 / 2}" 
                        width="30" height="30" 
                        href="${employesZone[i].photoURL}"  
                    />
                    
                    <circle 
                        cx="${employee_cx}" cy="${employee_cy - 25}" 
                        r="8" fill="red" stroke="white"
                    />
                    
                    <image 
                        class="delete-employe-slot-btn"  
                        data-employe-id="${employesZone[i].email}"
                        x="${employee_cx - 7.5}" y="${employee_cy - 33}" 
                        width="15" height="15" 
                        stroke="blue"
                        href="svg_icon/delete.svg"  
                    />
           `;

            const deleteButton = groupEmploye.querySelector('.delete-employe-slot-btn');
            const infoEmploye = groupEmploye.querySelector('.info-employe');

            deleteButton.addEventListener('click', () => {
                const employeId = deleteButton.getAttribute('data-employe-id');
                removeEmployeCardZone(employeId);

            });

            infoEmploye.addEventListener('click', () => {
                const employeId = infoEmploye.getAttribute('data-employe-id');
                afficherDetailEmploye(employeId);

            });

            containerSlot.appendChild(groupEmploye);

        }

        const x = zoneCenter.x + 60 * Math.cos(330 * (Math.PI / 180));
        const y = zoneCenter.y + 60 * Math.sin(330 * (Math.PI / 180));

        const groupEmployeeSlotAdd = document.createElementNS(SVG_NS, 'g');
        // groupEmployeeSlotAdd.classList.add("employee-slot-sallesecurite-add");

        groupEmployeeSlotAdd.innerHTML += `
                            <circle  
                                data-zone="centreSalleSecurite"
                                cx="${x}" 
                                cy="${y}" 
                                r="25" 
                                fill="#ddd" 
                                stroke="white" 
                                stroke-width="1"
                            />
                            <text x="${x}" y="${y + 4}" font-size="16" font-weight="bold" fill="#11b3e9ff" text-anchor="middle">+${employesZone.length - 3} M</text>
                            `;

        groupEmployeeSlotAdd.addEventListener('click', () => {
            const modaleZoneEmploye = document.getElementById('modale-zone-employe');
            const containerZoneEmploye = document.getElementById('container-zone-employe');
            modaleZoneEmploye.style.display = 'flex';

            containerZoneEmploye.innerHTML = "";
            employesZone.forEach((employe) => {
                const employeCard = renderEmployeZone(employe);
                containerZoneEmploye.appendChild(employeCard);
            });
        });

        containerSlot.appendChild(groupEmployeeSlotAdd);
    }
}

function removeEmployeCardZone(employeId) {
    let employesData = getEmployeData();

    for (let i = 0; i < employesData.length; i++) {
        if (employesData[i].email === employeId) {
            employesData[i].zoneID = "unassigned";
            break;
        }
    }

    localStorage.setItem('employes', JSON.stringify(employesData));

    renderEmployeList();
    renderZones();
}

function renderEmployeZone(employe) {
    const cardEmploye = document.createElement('div');
    cardEmploye.classList.add('card-employe-zone');
    cardEmploye.innerHTML = `
                    <div class="content-info">
                        <div class="image-employe">
                            <img src="${employe.photoURL}" alt="" >
                        </div>

                        <div class="info-employe" data-employe-id="${employe.email}">
                            <span class="nom">${employe.nom}</span>
                            <span class="role">${employe.role}</span>
                        </div>
                    </div>

                    <div class="employe-btn">

                        <button class="delete-employe-btn" data-employe-id="${employe.email}">
                            <i class="fa-solid fa-x"></i>
                        </button>

                        <button class="info-employe-btn" data-employe-id="${employe.email}">
                            <i class="fa-solid fa-info"></i>
                        </button>

                    </div>
    `;

    cardEmploye.querySelector('.delete-employe-btn').addEventListener('click', () => {
        const employeId = cardEmploye.querySelector('.delete-employe-btn').getAttribute('data-employe-id');
        removeEmployeCardZone(employeId);
    });

    cardEmploye.querySelector('.info-employe').addEventListener('click', () => {
        const employeId = cardEmploye.querySelector('.info-employe').getAttribute('data-employe-id');
        afficherDetailEmploye(employeId);
    });

    return cardEmploye;
}

function removeEmployeToZone(employeCard, zoneNom) {
    const modaleZoneEmploye = document.getElementById('modale-zone-employe');
    modaleZoneEmploye.style.display = 'flex';
    const employesData = getEmployeData();
    const employeId = employeCard.getAttribute('data-employe-id');

    for (let i = 0; i < employesData.length; i++) {
        if (employesData[i].email === employeId) {
            employesData[i].zoneID = zoneNom;
            break;
        }
    }

    localStorage.setItem('employes', JSON.stringify(employesData));
    setTimeout(() => {
        modaleZoneEmploye.style.display = 'none';
    }, 200);

    renderEmployeList();
    renderZones();
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

function renderExperinceCrad(exp) {
    const experieceCard = document.createElement('div');
    experieceCard.classList.add('experiece');

    experieceCard.innerHTML = `
                    <div>
                        <p>Entreprise : </p><span>${exp.entreprise}</span>
                    </div>

                    <div>
                        <p>Role :</p><span>${exp.role}</span>
                    </div>

                    <div>
                        <p>Période :</p><span>${exp.form} - ${exp.to}</span>
                    </div>
    `;

    return experieceCard;
}

function afficherDetailEmploye(employeId) {
    const modaleInfoEmploye = document.createElement('div');
    modaleInfoEmploye.classList.add('modale-info-employe');

    const employeData = getEmployeData();
    employeData.forEach((employe) => {
        if (employe.email === employeId) {
            modaleInfoEmploye.innerHTML = `
                <div class="container-info-employe">

                    <button class="remove-modale-info-employe-btn">
                        <i class="fa-solid fa-x"></i>
                    </button>

                    <div class="info-imp">
                        
                        <div class="image-employe">
                            <img src="${employe.photoURL}" alt="">
                        </div>

                        <div class="info-employe">
                            <span class="nom">${employe.nom}</span>
                            <span class="role">${employe.role}</span>
                        </div>
                    </div>

                   <hr>

                    <div class="info">
                        <div>
                            <p>Email : </p><span>${employe.email}</span>
                        </div>

                        <div>
                            <p>Téléphone : </p><span>${employe.telephone}</span>
                        </div>

                        <div>
                            <p>Emplacement actuel : </p><span>${employe.email}</span>
                        </div>
                    </div>
                    
                    <div class="experieces"> 

                    </div>
                </div>
   `;

            if (employe.experieces.length > 0) {
                modaleInfoEmploye.querySelector('.experieces').innerHTML += "<h3>Expériences</h3>"
                for (let i = 0; i < employe.experieces.length; i++) {
                    const experieceCard = renderExperinceCrad(employe.experieces[i]);
                    modaleInfoEmploye.querySelector('.experieces').appendChild(experieceCard);
                }

            }
        }
    });

    modaleInfoEmploye.querySelector('.remove-modale-info-employe-btn').addEventListener('click', () => {
        setTimeout(() => {
            modaleInfoEmploye.remove();
        }, 200);
    });

    document.body.appendChild(modaleInfoEmploye);

}

function openModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'flex';
    document.getElementById('div-blur').classList.add('blur-active');
}

function closeModaleEmploye() {
    document.getElementById('section-ajouter-employe').style.display = 'none';
    document.getElementById('div-blur').classList.remove('blur-active');
    const formInfoEmploye = document.getElementById('form-info-employe');
    const containerPhoto = document.getElementById('content-photo');
    const experieces = document.getElementById('experieces');
    experieces.innerHTML = "";
    formInfoEmploye.querySelectorAll('input').forEach((input) => {
        input.style.border = "1px solid #bcbaba";
    });
    formInfoEmploye.querySelector('select').style.border = "1px solid #bcbaba";

    formInfoEmploye.reset();

    containerPhoto.style.display = 'none'
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
        zoneID: 'unassigned',
        nom: nomCompletInput,
        role: roleInput,
        email: emailInput,
        telephone: telephoneInput,
        photoURL: photoURLInput,
        experieces: experiecesTAB
    });

    localStorage.setItem('employes', JSON.stringify(employeData));

    setTimeout(() => {
        document.querySelector('.valid').style.display = 'none';
    }, 3000);

    setTimeout(() => {
        closeModaleEmploye();
    }, 4000);

    renderEmployeList();
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
    });

    if (!validationInput(formInfoEmploye.querySelector('#role'))) {
        isvalide = false;
    }


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

function renderEmployeItem(employe) {
    const cardEmploye = document.createElement('div');
    cardEmploye.classList.add('card-employe');

    cardEmploye.innerHTML = `
                    <div class="content-info">
                        <div class="image-employe">
                            <img src="${employe.photoURL}" alt="" >
                        </div>

                        <div class="info-employe" data-employe-id="${employe.email}">
                            <span class="nom">${employe.nom}</span>
                            <span class="role">${employe.role}</span>
                        </div>
                    </div>

                    <div class="employe-btn">

                        <button class="delete-employe-btn" data-employe-id="${employe.email}">
                            <i class="fa-solid fa-x"></i>
                        </button>

                        <button class="edit-employe-btn" data-employe-id="${employe.email}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                    </div>
    `;

    cardEmploye.querySelector('.info-employe').addEventListener('click', () => {
        const employeId = cardEmploye.querySelector('.info-employe').getAttribute('data-employe-id');
        afficherDetailEmploye(employeId);
    });

    return cardEmploye;
}


function renderEmployeZoneItem(employe) {
    const cardEmploye = document.createElement('div');
    cardEmploye.classList.add('card-employe-zone');
    cardEmploye.setAttribute('data-employe-id', employe.email);

    cardEmploye.innerHTML = `
                    <div class="image-employe-zone">
                        <img src="${employe.photoURL}" alt="">
                    </div>

                    <div class="info-employe-zone">
                        <span class="nom">${employe.nom}</span>
                        <span class="role">${employe.role}</span>
                    </div>
    `;

    return cardEmploye;
}

function renderEmployeList() {
    const containerStaff = document.getElementById('container-staff');

    const employeData = getEmployeData();
    containerStaff.innerHTML = "";
    employeData.forEach((employe) => {
        if (employe.zoneID === "unassigned") {
            const cardEmploye = renderEmployeItem(employe);
            containerStaff.appendChild(cardEmploye);
        }
    });
    attachEmployeListListneres();
}

function removeEmployeCard(employeId) {
    let employesData = getEmployeData();

    employesData = employesData.filter((e) => {
        if (e.email !== employeId) {
            return e;
        }
    });
    localStorage.setItem('employes', JSON.stringify(employesData));

    renderEmployeList();
}

function attachEmployeListListneres() {
    const editEmployeBtn = document.querySelectorAll('.edit-employe-btn');
    const deleteEmployeBtn = document.querySelectorAll('.delete-employe-btn');

    deleteEmployeBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const employeId = deleteBtn.getAttribute('data-employe-id');
            removeEmployeCard(employeId);
        })
    })
}

function estEmailExiste(email) {
    const employeData = getEmployeData();

    for (const employe of employeData) {
        if (employe.email === email) {
            return true;
        }
    }
    return false;
}


function initApp() {
    const ajouterEmployeBtn = document.getElementById('ajouter-employe-btn');
    const removeModaleBtn = document.getElementById('remove-modale-add-employe-btn');
    const rechercherEmploye = document.getElementById('rechercher-employe');
    const formInfoEmploye = document.getElementById('form-info-employe');
    const removeModaleZoneEmployeBtn = document.querySelector('.remove-modale-zone-employe-btn');
    const unassignedStaffBtn = document.getElementById('unassigned-staff-btn');
    const removeUnassignedStaffBtn = document.querySelector('.remove-unassigned-staff-btn');
    const ajouterEmployeMobileBtn = document.querySelector('.ajouter-employe-btn');

    removeUnassignedStaffBtn.addEventListener('click', () => {
        const unassignedStaffSection = document.querySelector('.unassigned-staff');

        unassignedStaffSection.style.display = 'none';

    });

    unassignedStaffBtn.addEventListener('click', () => {
        const unassignedStaffSection = document.querySelector('.unassigned-staff');

        unassignedStaffSection.style.display = 'block';

    });

    removeModaleZoneEmployeBtn.addEventListener('click', () => {
        const modaleZoneEmploye = document.getElementById('modale-zone-employe');
        modaleZoneEmploye.style.display = 'none';
    })

    ajouterEmployeBtn.addEventListener('click', openModaleEmploye);

    ajouterEmployeMobileBtn.addEventListener('click', openModaleEmploye);

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
                    if (input.type === "email" && estEmailExiste(value)) {
                        input.style.border = "3px solid red";
                        errorSpan.innerText = "Cette adresse email déjà utilisée";
                        errorSpan.style.color = 'red';

                        setTimeout(() => {
                            errorSpan.innerText = "";
                        }, 3000);
                        return;

                    }

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

    formInfoEmploye.querySelector('#role').addEventListener('change', () => {
        let errorSpan = formInfoEmploye.getElementsByClassName(formInfoEmploye.querySelector('#role').name)[0];
        document.getElementById('role').style.border = "3px solid green";
        errorSpan.innerText = validationRules[formInfoEmploye.querySelector('#role').name].validMessage;;
        errorSpan.style.color = 'green';

        setTimeout(() => {
            errorSpan.innerText = "";
        }, 3000);
    });

    window.addEventListener('resize', () => {

        setTimeout(() => {
            renderZones();
        }, 100);
    });

    ajouterBlockExperince();
    renderPhoto();
    renderZones();
    renderEmployeList();
    testZone();
}

initApp();



