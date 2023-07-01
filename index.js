document.addEventListener("DOMContentLoaded", function () {
	const allForms = Array.from(document.querySelectorAll(".form"));
	const submitButtons = Array.from(document.querySelectorAll(".submit"));

	allForms.forEach((form) => {
		const formElements = Array.from(form.querySelectorAll(".form-element"));
		const submitButton = form.querySelector(".submit");

		form.addEventListener("input", (event) => {
			if (!form.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
			}

			form.classList.add("was-validated");
			formElements.forEach((elem) => {
				elem.classList.remove("was-validated");
			});
			toggleSubmitBtnStatus();
		});

		formElements.forEach((elem) => {
			elem.addEventListener("input", (event) => {
				event.target.classList.add("was-validated");
				toggleSubmitBtnStatus();
			});
		});

		function toggleSubmitBtnStatus() {
			if (form.checkValidity()) {
				submitButton.removeAttribute("disabled");
			} else {
				submitButton.setAttribute("disabled", "disabled");
			}
		}
	});

	const showPasswordSpans = Array.from(document.querySelectorAll(".show-pwd"));
	showPasswordSpans.forEach((showPasswordSpan) => {
		showPasswordSpan.addEventListener("click", handleClick);
	});

	function handleClick() {
		const passwordInput = this.previousElementSibling;
		const passwordType = passwordInput.getAttribute("type");

		if (passwordType === "password") {
			passwordInput.setAttribute("type", "text");
			this.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
		} else {
			passwordInput.setAttribute("type", "password");
			this.innerHTML = '<i class="bi bi-eye-fill"></i>';
		}
	}

	const workZones = Array.from(document.querySelectorAll(".form #zone"));
	const svgElems = Array.from(
		workZones.map((zone) => zone.previousElementSibling)
	);

	workZones.forEach((zone) => {
		zone.addEventListener("change", function () {
			const selectedZone = this.value;
			const form = this.closest(".form");
			const svgElem = form.querySelector(".zone-flag");

			if (selectedZone === "India") {
				svgElem.innerHTML =
					'<embed src="india-flag-icon.svg" type="image/svg+xml"/>';
			} else if (selectedZone === "Canada") {
				svgElem.innerHTML =
					'<embed src="canada-flag-icon.svg" type="image/svg+xml"/>';
			}
		});
	});

	const formSelects = Array.from(document.querySelectorAll(".form-select"));
	formSelects.forEach((formSelect) => {
		formSelect.addEventListener("change", function () {
			if (formSelect.value) {
				formSelect.classList.remove("inital-text");
			}
		});
	});

	const switchDiv = document.querySelector(".switch-div");
	const switchBtn = document.querySelector("#switch-btn");
	const signupForm = document.querySelector("#signup");
	const loginForm = document.querySelector("#signin");

	switchBtn.addEventListener("click", function (e) {
		e.preventDefault();

		const switchText = Array.from(switchDiv.childNodes).filter(
			(node) => node.nodeType === 3
		);
		if (signupForm.classList.contains("not-visible")) {
			// Sliding in from the right
			signupForm.classList.remove("not-visible");
			loginForm.classList.add("not-visible");
			switchText[0].nodeValue = "Already have an account? ";
			switchDiv.querySelector("a").textContent = "Sign in";

			signupForm.style.animation = "slideInRight 0.5s forwards";
			loginForm.style.animation = "slideOutLeft 0.5s forwards";
		} else {
			// Sliding in from the left
			signupForm.classList.add("not-visible");
			loginForm.classList.remove("not-visible");
			switchText[0].nodeValue = "Not a member? ";
			switchDiv.querySelector("a").textContent = "Sign up";

			signupForm.style.animation = "slideOutRight 0.5s forwards";
			loginForm.style.animation = "slideInLeft 0.5s forwards";
		}

		// Reset animation after it finishes
		setTimeout(() => {
			signupForm.style.animation = "";
			loginForm.style.animation = "";
		}, 500);

		allForms.forEach((form) => form.classList.toggle("needs-validation"));
	});
});
