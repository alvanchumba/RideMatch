const gallery = document.getElementById("car-gallery");

function transformDriveLink(link) {
  if (!link) return '';
  link = link.trim().replace(/^"|"$/g, '');

  // Match /file/d/FILE_ID/
  let match = link.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  // Match open?id=FILE_ID
  match = link.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  console.warn("❌ Could not extract Google Drive ID:", link);
  return '';
}

// Creates and appends a car card to the gallery section
function displayCarCard(car) {
  const div = document.createElement("div");
  div.className = "car-card";
  div.innerHTML = `
    <img src="${car.image}" alt="${car.name}" style="width: 100%; border-radius: 6px;" />
    <h3>${car.name}</h3>
    <p>Price: ${car.price}</p>
    <a class="btn" href="https://wa.me/264812833272?text=I'm%20interested%20in%20renting%20the%20${encodeURIComponent(car.name)}">Rent on WhatsApp</a>
  `;
  gallery.appendChild(div);
}
//test display
function testDisplay() {
  const testCar = {
    name: "Honda fit (2024)",
    image: transformDriveLink("https://drive.google.com/open?id=1jy2uyYTH7Ssl15-Mlbu7wN8_-V12Fo2J"),
    price: "N$250/day"
  };
  displayCarCard(testCar);
}

document.addEventListener('DOMContentLoaded', testDisplay);



// Fetches CSV data from published Google Sheet, parses, and displays cars
async function loadCarsFromSheet() {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfAej6ACHJb9_tQUdNZjaOd3fkj8udu2t5lOcS2mKRBAyXJmNpRH-GDx8T4VAt5RL1bFo347YorSNC/pub?output=csv';

  try {
    const response = await fetch(csvUrl);
    const csv = await response.text();

    const rows = csv.trim().split('\n').map(row => row.split(','));
    
    // Normalize headers → lowercase + no spaces
    const headers = rows[0].map(h => h.trim().toLowerCase());
    const data = rows.slice(1);

    data.forEach(row => {
      const car = {};
      headers.forEach((header, i) => {
        car[header] = row[i] ? row[i].trim() : '';
      });

      const carObj = {
       name: `${car['Car Make and Model']} (${car['Year of car']})`,
       image: car['Public Image Link'] || transformDriveLink(car['upload car photos']),
       price: `N$${car['Daily Rental Price (N$)']}/day`
     };


      if (carObj.image) {
        displayCarCard(carObj);
      } else {
        console.warn(`🚫 Skipped ${carObj.name} — no valid image link`);
      }
    });

  } catch (err) {
    console.error('Failed to fetch from Google Sheet:', err);
    gallery.innerHTML = "<p>Couldn't load live cars. Please try again later.</p>";
  }
}
// Load cars when the page is ready
document.addEventListener('DOMContentLoaded', loadCarsFromSheet);
