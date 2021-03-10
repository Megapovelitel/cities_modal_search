const $modal = $("#modal")[0];

$("#open-modal-btn").bind('click', () => {
  $modal.style.display = "flex";
});

$("#close-modal-btn").bind('click', () => {
  $modal.style.display = "none";
});

window.onclick = (event) => {
  if (event.target === $modal) {
    $modal.style.display = "none";
  }
}

