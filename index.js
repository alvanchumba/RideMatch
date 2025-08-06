const gallery = document.getElementById("car-gallery");

// Converts Google Drive share links to direct image links
function transformDriveLink(link) {
  if (!link) return '';

  console.log("Original link from sheet:", link); // Debug output

  // Trim and remove quotes if any
  link = link.trim().replace(/^"|"$/g, '');

  // Match /file/d/FILE_ID/view pattern
  let match = link.match(/\/file\/d\/(.*?)\/view/);
  if (match) {
    console.log("Matched /file/d/...:", match[1]);
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  // Match open?id=FILE_ID pattern
  match = link.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (match) {
    console.log("Matched open?id=...:", match[1]);
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  console.warn("❌ Failed to extract image ID from link:", link);
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

// Fetches CSV data from published Google Sheet, parses, and displays cars
async function loadCarsFromSheet() {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfAej6ACHJb9_tQUdNZjaOd3fkj8udu2t5lOcS2mKRBAyXJmNpRH-GDx8T4VAt5RL1bFo347YorSNC/pub?output=csv';

  try {
    const response = await fetch(csvUrl);
    const csv = await response.text();

    // Parse CSV rows and columns
    const rows = csv.trim().split('\n').map(row => row.split(','));
    const headers = rows[0];
    const data = rows.slice(1);

    // Process each car entry
    data.forEach(row => {
      const car = {};
      headers.forEach((header, i) => {
        car[header.trim()] = row[i] ? row[i].trim() : '';
      });

      const carObj = {
        name: `${car['Car Make and Model']} (${car['Year of car']})`,
        image: transformDriveLink(car['Upload car Photos']),
        price: `N$${car['Daily Rental Price (N$)']}/day`
      };

      displayCarCard(carObj);
    });

  } catch (err) {
    console.error('Failed to fetch from Google Sheet:', err);
    gallery.innerHTML = "<p>Couldn't load live cars. Please try again later.</p>";
  }
}

// Load cars when the page is ready
document.addEventListener('DOMContentLoaded', loadCarsFromSheet);
