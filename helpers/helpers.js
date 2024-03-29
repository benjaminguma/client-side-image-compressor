import imageCompression from 'browser-image-compression';

const defaultOptions = {
	maxSizeMB: 1,
	// useWebWorker: true,
	// maxWidthOrHeight:190
};

export function compressFile(imageFile, options = defaultOptions) {
	return imageCompression(imageFile, options);
}

export function download(file) {
	const url = window.URL.createObjectURL(file);
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', '');
	link.click();
	window.URL.revokeObjectURL(url);
}

export function readFileAsBase64(file) {
	return imageCompression.getDataUrlFromFile(file);
}
// new Promise((res, rej) => {
// 	const reader = new FileReader();

// 	reader.addEventListener('load', () => res(reader.result));
// 	reader.addEventListener('error', () => rej(reader.error));
// 	reader.readAsDataURL(file);
// });
