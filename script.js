const cars = [
  {
    name: "Toyota Vitz 2014",
    image: "https://i.pinimg.com/1200x/4f/9d/b3/4f9db321bd3e150571d7d8b0a93d7e52.jpg",
    price: "N$250/day",
  },
  {
    name: "Ford Ranger 4x4",
    image: "https://i.pinimg.com/1200x/a9/53/98/a95398555c623532ebf4586f1413df2d.jpg",
    price: "N$600/day",
  },
  {
    name: "Honda Fit Hybrid",
    image: "https://i.pinimg.com/1200x/ae/1f/6c/ae1f6c65ac6b7c238eec0d34156f7a91.jpg",
    price: "N$300/day",
  },
 {
    name: "Nissan March 2013",
    image: "https://i.pinimg.com/736x/28/d9/ac/28d9aca888f8a80f609281be0b81d6b7.jpg",
    price: "N$250/day",
  },
{
    name: "Toyota Corolla 2012",
    image: "https://i.pinimg.com/736x/8f/b1/df/8fb1df92beee03f5d2f1c79892bbe20b.jpg",
    price: "N$300/day",
  },
    {
    name: "Volkswagen Polo Vivo 2016",
    image: "https://i.pinimg.com/736x/3f/01/2e/3f012ec28fdbf7fb2e0bd929c69a0c0d.jpg",
    price: "N$280/day",
  },
    {
    name: "Hyundai Tucson 2017",
    image: "https://i.pinimg.com/736x/db/b2/02/dbb202c4d167b736108763a17f9a50e5.jpg",
    price: "N$500/day",
  },
    {
    name: "Toyota Avanza 7-Seater",
    image: "https://i.pinimg.com/736x/3a/40/cb/3a40cb18444db6c981229d07072c479b.jpg",
    price: "N$4500/day",
  },
    {
    name: "Mazda CX-5 2016",
    image: "https://i.pinimg.com/1200x/4d/fe/3c/4dfe3c54c1a7de9d45d66e2d83381cb3.jpg",
    price: "N$550/day",
  },
    {
    name: "Toyota Hilux Single Cab",
    image: "https://i.pinimg.com/736x/9a/f6/38/9af63806fc44eee3372acec491a67714.jpg",
    price: "N$600/day",
  },
    {
    name: "Isuzu KB 300 4x4",
    image: "https://i.pinimg.com/1200x/e4/7c/f5/e47cf54cbe0cb036208803196df8abd5.jpg",
    price: "N$650/day",
  },
    {
    name: "Toyota Land Cruiser 4x4(Safari Ready)",
    image: "https://i.pinimg.com/736x/fa/2d/01/fa2d01c10c1d34e0a6bd22a5e7e4a028.jpg",
    price: "N$950/day",
  },
    {
    name: "Ford Everest 2018",
    image: "https://i.pinimg.com/736x/e5/0f/54/e50f54803118e95fdb4d14da9aaff630.jpg",
    price: "N$800/day",
  }
];

const gallery = document.getElementById("car-gallery");

cars.forEach(car => {
  const div = document.createElement("div");
  div.className = "car-card";
  div.innerHTML = `
    <img src=\"${car.image}\" alt=\"${car.name}\" style=\"width: 100%; border-radius: 6px;\" />
    <h3>${car.name}</h3>
    <p>Price: ${car.price}</p>
    <a class=\"btn\" href=\"https://wa.me/264812833272?text=I'm%20interested%20in%20renting%20the%20${encodeURIComponent(car.name)}\">Rent on WhatsApp</a>
  `;
  gallery.appendChild(div);
});
