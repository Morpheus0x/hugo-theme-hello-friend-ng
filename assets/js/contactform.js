function submitForm(event) {
	event.preventDefault();

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
			returnMessage.className = ''
			if (xhr.status === 200) {
				returnMessage.classList.add('success')
			}
			if (xhr.status === 400) {
				returnMessage.classList.add('error')
			}
		} catch(err) {
			returnMessage.classList.add('error')
			returnMessage.innerHTML = "Unable to send.";
		}
		setTimeout(() => {
			const returnMessage = document.querySelector('#contactform-return-message');
			returnMessage.className = ''
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
	if (localStorage.getItem("cloudflare-turnstile-consent")) {
		askconsent.style.display = "none";
		loadCloudflareTurnstile();
	}
	if(askconsent) {
		document.querySelector("#consent-checkbox").addEventListener("click", function() {
			if (localStorage.getItem("cloudflare-turnstile-consent")) {
				return
			}
			localStorage.setItem("cloudflare-turnstile-consent", true);
			this.className = "checked";
			setTimeout(loadCloudflareTurnstile, 800);
		});
	}
}
