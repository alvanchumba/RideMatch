  const gallery = document.getElementById("car-gallery");

function transformDriveLink(link) {
  if (!link) return '';

  link = link.trim().replace(/^"|"$/g, ''); // remove surrounding quotes

  let match = link.match(/\/file\/d\/(.*?)\/view/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  match = link.match(/open\?id=([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=view&id=${match[1]}`;

  return '';
}


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

  async function loadCarsFromSheet() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRfAej6ACHJb9_tQUdNZjaOd3fkj8udu2t5lOcS2mKRBAyXJmNpRH-GDx8T4VAt5RL1bFo347YorSNC/pub?output=csv';

    try {
      const response = await fetch(csvUrl);
      const csv = await response.text();

      const rows = csv.trim().split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1);

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

  document.addEventListener('DOMContentLoaded', loadCarsFromSheet);

