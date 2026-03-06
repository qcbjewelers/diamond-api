<h1 style="text-align:center;">Lab Grown Diamonds</h1>

<div id="diamond-grid" style="
display:grid;
grid-template-columns:repeat(auto-fill,minmax(250px,1fr));
gap:20px;
max-width:1200px;
margin:auto;
padding:20px;
"></div>

<script>

async function loadDiamonds(){

const response = await fetch("https://diamond-api-two.vercel.app/api/diamonds?page=1");
const data = await response.json();

let html = "";

data.Stock.slice(0,24).forEach(diamond => {

html += `
<div style="border:1px solid #eee;padding:15px;border-radius:8px;background:white;">
<h3>${diamond.Shape} ${diamond.Carat}ct</h3>

<p><strong>Color:</strong> ${diamond.Color}</p>
<p><strong>Clarity:</strong> ${diamond.Clarity}</p>
<p><strong>Cut:</strong> ${diamond.Cut}</p>

<p style="font-size:18px;font-weight:bold;">
$${diamond.Price}
</p>

<button style="
background:black;
color:white;
padding:10px 14px;
border:none;
cursor:pointer;
">
View Diamond
</button>

</div>
`;

});

document.getElementById("diamond-grid").innerHTML = html;

}

loadDiamonds();

</script>
