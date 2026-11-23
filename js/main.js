function showContactToast() {
  const toastElement = document.getElementById('contactToast');

  if (toastElement) {
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
}