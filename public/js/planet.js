const handlePlanetDeletion = () => {
  async function deletePlanet(event) {
    event.preventDefault();

    const password = prompt('Enter admin password to delete this planet:');
    if (!password) return;

    const url = event.currentTarget.href;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Planet destroyed successfully!");
        window.location.href = data.redirect_url || window.location.href;
      } else {
        alert(data.message || "Password incorrect. Deletion failed.");
      }
    } catch(error) {
      alert('Error destroying the planet');
    }
  }
  
  const deletePlanetLinks = document.querySelectorAll('.delete-planet');
  deletePlanetLinks.forEach((link) => {
    link.addEventListener('click', deletePlanet);
  })
}

document.addEventListener('DOMContentLoaded', handlePlanetDeletion);
