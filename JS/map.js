document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const categorySelect = document.getElementById('category-select');
    const locationSelect = document.getElementById('location-select');
    const fromSelect = document.createElement('select');
    fromSelect.id = 'from-select';
    fromSelect.innerHTML = '<option value="current">Current Location</option><option value="maingate">Main Gate</option>';
    document.getElementById('building-selection').insertBefore(fromSelect, categorySelect);

    
    const map = L.map(mapContainer).setView([9.6914, 39.6576], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    
    const buildings = {
        dormitory: [
            { name: "Dormitory 01 (DO-01)", lat: 9.656149508719823, lng: 39.51883515415056     }, 
            { name: "Dormitory 02 (DO-02)", lat:  9.656530274424624, lng: 39.519194570163236 }, 
            { name: "Dormitory 03 (DO-03)", lat: 9.657196613371996, lng: 39.51977929173612} , 
            { name: "Dormitory 04 (DO-04)", lat: 9.657730741258602, lng: 39.520213809602204} , 
            { name: "Dormitory 05 (DO-05)", lat: 9.657529782346222, lng:  39.520648327464855} , 
            { name: "Dormitory 06 (DO-06)", lat: 9.657016807749244, lng: 39.52018698750827} , 
            { name: "Dormitory 07 (DO-07)", lat: 9.656625465778593, lng: 39.51983293591368} , 
            { name: "Dormitory 08 (DO-08)", lat: 9.656292295904626, lng: 39.519537892918194} , 
            { name: "Dormitory 09 (DO-09)", lat: 9.655858645733634, lng: 39.51909801063401} , 
            { name: "Dormitory 10 (DO-10)", lat: 9.655959125697567, lng: 39.51988658007155} , 
            { name: "Dormitory 11 (DO-11)", lat: 9.656477390316294, lng: 39.52031036910144} , 
            { name: "Dormitory 12 (DO-12)", lat: 9.657106710566694, lng: 39.52090581951052} , 
            { name: "Dormitory 13 (DO-13)", lat: 9.655462013980959, lng: 39.518733230183315} , 
            { name: "Dormitory 14 (DO-14)", lat: 9.654853844401227, lng: 39.51871713692901} , 
            { name: "Dormitory 15 (DO-15)", lat: 9.656905751280512, lng: 39.52125987110833} , 
            { name: "Dormitory 16 (DO-16)", lat: 9.65663075417686,  lng: 39.52088436184134} , 
            { name: "Dormitory 17 (DO-17)", lat: 9.656339891611317, lng: 39.520739522552645} , 
            { name: "Dormitory 18 (DO-18)", lat: 9.655937972016378, lng: 39.52085753975084} , 
            { name: "Dormitory 19 (DO-19)", lat:  9.655985567782928, lng: 39.52040692863046} , 
            { name: "Dormitory 20 (DO-20)", lat:  9.655800473097477, lng: 39.52024599608746} , 
            { name: "Dormitory 21 (DO-21)", lat: 9.65549903295781,  lng: 39.520042148206116} , 
            { name: "Dormitory 22 (DO-22)", lat: 9.65528749586051,  lng: 39.51980074939162} , 
            { name: "Dormitory 23 (DO-23)", lat: 9.65510240079137,  lng: 39.51966663893912} , 
            { name: "Dormitory 24 (DO-24)", lat:  9.65422980837543, lng:  39.519473519887114} , 
            { name: "Dormitory 25 (DO-25)", lat: 9.654890863435517, lng:  39.52006897028983} , 
            { name: "Dormitory 26 (DO-26)", lat: 9.655213457835643, lng:  39.520256724923314} , 
            { name: "Dormitory 27 (DO-27)", lat: 9.655573070901063, lng:  39.520669785117} , 
            { name: "Dormitory 28 (DO-28)", lat: 9.655779319408818, lng:  39.52104529437432} , 
            { name: "Dormitory 29 (DO-29)", lat: 9.656535562815598, lng:  39.521115031809614} , 
            { name: "Dormitory 30 (DO-30)", lat: 9.656313449545754, lng:  39.52135643062313} , 
            { name: "Dormitory 31 (DO-31)", lat: 9.656498543949267, lng:  39.52152272758423} , 
            { name: "Dormitory 32 (DO-32)", lat: 9.65667306143652,  lng:  39.521683660127216} , 
            { name: "Dormitory 33 (DO-33)", lat: 9.655996144617344, lng:  39.52153345642043} , 
            { name: "Dormitory 34 (DO-34)", lat: 9.65562595515632,  lng: 39.52133497295073} , 
            { name: "Dormitory 35 (DO-35)", lat: 9.655377399146992, lng: 39.52109893855434} , 
            { name: "Dormitory 36 (DO-36)", lat: 9.65519759255782,  lng: 39.52095409926565} , 
            { name: "Dormitory 37 (DO-37)", lat: 9.654922594059277, lng: 39.52071270045115} , 
            { name: "Dormitory 38 (DO-38)", lat: 9.65464230688225,  lng: 39.5205195814039} , 
            { name: "Dormitory 39 (DO-39)", lat: 9.654266827488025, lng: 39.520133343300714} , 
            { name: "Dormitory 40 (DO-40)", lat: 9.653632213465913,  lng:  39.52016552980728} , 
            { name: "Dormitory 41 (DO-41)", lat: 9.654282692813187,  lng:  39.52077707347066} , 
        ],
        department: [
            { name: "Civil Engineering Department", lat: 9.657001085188176, lng: 39.52548477348901 },
            { name: "IS Department", lat: 9.657738984047587,lng: 39.52183233814087 },   
            { name: "SE Department", lat: 9.657738984047587,lng: 39.52183233814087 },
            { name: "CS Department", lat: 9.657738984047587,lng: 39.52183233814087 },
        ],
        office: [
            { name: "College of Computing", lat: 9.658798994519898, lng: 39.522021618463256 },
            { name: "College of Law", lat: 9.658418231380749, lng: 39.52205380497185 },
            { name: "College of Engineering", lat: 9.655789896270234, lng: 39.52416738566915 },    
        ],
        building: [ 
            { name: "Graduation Hall", lat: 9.657118609473995, lng: 39.52329834992976},  
            { name: "SE-01", lat: 9.659457706626888, lng: 39.52168213443969},  
            { name: "SE-02", lat:  9.659552897158136, lng: 39.52212738114198 },  
            { name: "SE-03", lat: 9.65911925118671, lng: 39.522030821616184 },   
            { name: "SE-04", lat:  9.659304285935612, lng: 39.5224646644865 }, 
            { name: "SE-10", lat: 9.657622521210634, lng: 39.524983482574044 }, 
        ],
        cafe: [
            { name: "Main Cafe", lat: 9.655710569916678, lng: 39.52331444320927 },  
            { name: "Markan Fast Food", lat: 9.65783386486651, lng: 39.519275036398014 },   
            { name: "Megenagna Lounge", lat: 9.65695334691405, lng: 39.525073972351564 },  
            { name: "Men's Lounge", lat: 9.655319226446766, lng: 39.52174803311253 },  
            { name: "Girl's Lounge", lat: 9.657207190163783, lng: 39.51906582406814 },  
            { name: "Megezez Lounge", lat: 9.657036639256678, lng: 39.52414324577444 }, 
        ],
        library: [
            { name: "Tesfa G/Silasie(Main) Library", lat: 9.656583158502176, lng: 39.52387234267913},   
            { name: "Kebede (Social) Library", lat: 9.657697688824788, lng: 39.52141007476972 }, 
            { name: "Female Library", lat: 9.658263546215661, lng: 39.520734158090264 },
        ],
    };

  
    function populateAndAttach(selectElement, category) {
        selectElement.innerHTML = ""; 

        buildings[category].forEach(building => {
            const option = document.createElement('option');
            option.value = JSON.stringify({ lat: building.lat, lng: building.lng });
            option.text = building.name;
            selectElement.appendChild(option);
        });

       
        selectElement.addEventListener('change', () => {
            updateRoute(); 
        });
    }

    populateAndAttach(locationSelect, categorySelect.value); 

    categorySelect.addEventListener('change', () => {
        const selectedCategory = categorySelect.value;
        populateAndAttach(locationSelect, selectedCategory); 
    });


   
    let routingControl;

    function showRoute(startLatLng, destinationLatLng) {
        if (routingControl) {
            map.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
            waypoints: [
                startLatLng,
                destinationLatLng
            ],
            routeWhileDragging: true,
            showAlternatives: false,
            addWaypoints: false
        }).addTo(map);
    }

    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(L.latLng(position.coords.latitude, position.coords.longitude)),
                    error => reject(error)
                );
            } else {
                reject("Geolocation is not supported by this browser.");
            }
        });
    }

    async function updateRoute() {
        const selectedLocation = locationSelect.value;
        const { lat, lng } = JSON.parse(selectedLocation);
        const destinationLatLng = L.latLng(lat, lng);

        const fromValue = fromSelect.value;
        let startLatLng;

        if (fromValue === 'current') {
            try {
                startLatLng = await getCurrentLocation();
            } catch (error) {
                alert(error); 
                return; 
            }
        } else {
            startLatLng = L.latLng(9.65896028989104, 39.519415852401586);   
        }

        showRoute(startLatLng, destinationLatLng);
    }


    fromSelect.addEventListener('change', updateRoute); 
    categorySelect.addEventListener('change', updateRoute); 
    locationSelect.addEventListener('change', updateRoute); 

});