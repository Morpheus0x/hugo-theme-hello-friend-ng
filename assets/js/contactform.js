function submitForm(event) {
	event.preventDefault();

	const submitButton = document.querySelector('#contactform-submit');
	const returnMessage = document.querySelector('#contactform-return-message');
	const askconsent = document.querySelector('#askconsent');
	if (askconsent !== null && localStorage.getItem("cloudflare-turnstile-consent") !== "true") {
		returnMessage.style.color = 'red';
		returnMessage.innerHTML = i18n.contactform.error.askconsent;
		returnMessage.classList.add('visible');
		setTimeout(() => {
			const returnMessage = document.querySelector('#contactform-return-message');
			returnMessage.classList.remove('visible')
		}, 5000);
		submitButton.disabled = false;
		submitButton.value = i18n.contactform.submit;
		return
	}

	const form = event.target;
	const formData = new FormData(form);
	const xhr = new XMLHttpRequest();
	xhr.open(form.method, form.action);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.onreadystatechange = () => {
		if (xhr.readyState !== XMLHttpRequest.DONE) {
			console.log('readyState changed to: ', xhr.readyState)
			return
		}
		const returnMessage = document.querySelector('#contactform-return-message');
		const submitButton = document.querySelector('#contactform-submit');
		submitButton.disabled = false;
		submitButton.value = 'Submit'
		try {
			const json = JSON.parse(xhr.responseText);
			returnMessage.innerHTML = json.msg;
			if (xhr.status === 200) {
				returnMessage.style.color = 'green';
				var form = document.querySelector('#contactform form')
				form.reset()
			}
			if (xhr.status === 400) {
				returnMessage.style.color = 'red';
			}
		} catch(err) {
			returnMessage.style.color = 'red';
			returnMessage.innerHTML = "Unable to send.";
		}
		returnMessage.classList.add('visible')
		setTimeout(() => {
			const returnMessage = document.querySelector('#contactform-return-message');
			returnMessage.classList.remove('visible');
		}, 5000);
	};

	const submitButton = document.querySelector('#contactform-submit');
	submitButton.disabled = true;
	submitButton.value = 'Loading...'

	xhr.send(formData);
}
function loadCloudflareTurnstile() {
	const contactform = document.querySelector('#contactform');
	var cfjs = document.createElement("script");
	cfjs.type = "text/javascript";
	cfjs.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"
	cfjs.onload = () => {
		askconsent.style.display = "none";
	}
	contactform.appendChild(cfjs)
}

const turnstile = document.querySelector(".cf-turnstile");
if (turnstile) {
	turnstile.setAttribute("data-theme", document.documentElement.getAttribute("data-theme"));
	const askconsent = document.querySelector('#askconsent')
	if (localStorage.getItem("cloudflare-turnstile-consent") === "true") {
		askconsent.style.display = "none";
		loadCloudflareTurnstile();
	}
	if(askconsent) {
		document.querySelector("#consent-checkbox").addEventListener("click", function() {
			if (localStorage.getItem("cloudflare-turnstile-consent") === "true") {
				return
			}
			localStorage.setItem("cloudflare-turnstile-consent", "true");
			this.className = "checked";
			setTimeout(loadCloudflareTurnstile, 800);
		});
	}
}
