const handleFighterDeletion = () => {
  async function deleteFighter(event) {
    event.preventDefault();

    const password = prompt('Enter admin password to remove this fighter:');
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
        alert("Fighter removed successfully!");
        window.location.href = data.redirect_url || window.location.href;
      } else {
        alert(data.message || "Password incorrect. Deletion failed.");
      }
    } catch (error) {
      alert('Error removing the fighter');
    }
  }
  
  const deleteFighterLinks = document.querySelectorAll('.delete-fighter');
  deleteFighterLinks.forEach((link) => {
    link.addEventListener('click', deleteFighter);
  })
}

document.addEventListener('DOMContentLoaded', handleFighterDeletion);
