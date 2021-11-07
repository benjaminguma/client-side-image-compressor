import { useState } from 'react';
import FileInput from '../components/FileInput';
import ImageOutput from '../components/ImageOutput';
import ImagePreviewer from '../components/imagePreviewer';
import { compressFile, download, readFileAsBase64 } from '../helpers/helpers';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [compressedImage, setCompressedImage] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const handleOnChange = (event) => {
		setSelectedImage(event.target.files[0]);
	};

	const handleCompressFile = async () => {
		if (selectedImage) {
			try {
				const compressedImageFile = await compressFile(selectedImage);

				setCompressedImage(compressedImageFile);
			} catch (error) {
				console.log({ error });
			}
		}
	};

	const handleDownload = () => {
		download(compressedImage);
	};

	const handleUpload = async () => {
		const fileInBase64 = await readFileAsBase64(compressedImage);
		setIsLoading(true);
		try {
			const res = await axios.post('/api/upload', {
				file: fileInBase64,
			});
			alert(res.data.message);
		} catch (error) {
			console.log({ error });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<section className={styles.container}>
			<FileInput handleOnChange={handleOnChange} />

			<article className={styles.previewer}>
				<aside>
					<ImagePreviewer imageFile={selectedImage} />
					<div className={styles['button-wrapper']}>
						{selectedImage && (
							<button onClick={handleCompressFile} className={styles.button}>
								Compress Image
							</button>
						)}
					</div>
				</aside>

				<aside>
					<ImagePreviewer imageFile={compressedImage} />
					<div className={styles['button-wrapper']}>
						{compressedImage && (
							<>
								<button onClick={handleDownload} className={styles.downloadBtn}>
									Download
								</button>
								<button
									className={styles.uploadBtn}
									onClick={handleUpload}
									disabled={isLoading}>
									{isLoading ? 'uploading...' : 'upload'}
								</button>
							</>
						)}
					</div>
				</aside>
			</article>
		</section>
	);
}
