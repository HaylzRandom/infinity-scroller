const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let isReady = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'zd2yU-U-N6ihXrdNmod0cMLpSBkc-OF7iNRM5IHuWg0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

const updateAPIUrl = (pictureCount) => {
	apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;
};

// Check if all images are loaded
const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		isReady = true;
		loader.hidden = true;
	}
};

// Helper function to set attributes on DOM
const setAttributes = (element, attributes) => {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
	imagesLoaded = 0;
	totalImages = photosArray.length;

	photosArray.forEach((photo) => {
		// Create link to photo
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});

		// Create img for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		// Event Listener - check when each photo has finished loading
		img.addEventListener('load', imageLoaded);

		// Attach img inside link and then attach both to container
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
};

// Get Photos from Unsplash API
const getPhotos = async () => {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (isInitialLoad) {
			updateAPIUrl(30);
			isInitialLoad = false;
		}
	} catch (error) {
		// Catch Error
		alert('Something has went wrong');
	}
};

// Check if scrolling is near bottom of page -> Load more photos
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		isReady
	) {
		isReady = false;
		getPhotos();
	}
});

// On Load
getPhotos();
