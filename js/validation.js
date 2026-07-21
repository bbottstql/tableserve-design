// Reveal validation errors on submit — the static-pass stand-in for react-hook-form.
// Any <form novalidate> is validated; a valid form navigates to its data-success URL.
document.querySelectorAll("form[novalidate]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;

    form.querySelectorAll("input, select, textarea").forEach((control) => {
      const value = control.value.trim();
      const min = control.getAttribute("min");
      const invalid =
        (control.required && !value) ||
        (min && value !== "" && Number(value) < Number(min));

      control.classList.toggle("is-invalid", invalid);
      if (invalid) firstInvalid ??= control;
    });

    if (firstInvalid) {
      form.classList.add("was-validated");
      firstInvalid.focus();
    } else if (form.dataset.success)
      window.location.href = form.dataset.success;
  });
});
