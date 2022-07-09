import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../../firebase";
import check from "../../../imgs/check.png";
import { GrUploadOption } from "react-icons/gr";
import {
    UpContainer,
    UpInput,
    UpButton,
    PreviewImg,
    ProgressContainer,
    CheckImg
}from './style'

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
	const inputRef = useRef();
	const [progress, setProgress] = useState(0);
	const [progressShow, setProgressShow] = useState(false);

	const handleUpload = () => {
		setProgressShow(true);
		const fileName = new Date().getTime() + value.name;
		const storageRef = ref(
			storage,
			type === "audio" ? `/audio/${fileName}` : `/images/${fileName}`
		);
		const uploadTask = uploadBytesResumable(storageRef, value);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploaded = Math.floor(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(uploaded);
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					handleInputState(name, url);
				});
			}
		);
	};

	return (
		<UpContainer>
			<UpInput
				type="file"
				ref={inputRef}
				onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
				vlaue={value}
				className="input"
				{...rest}
			/>
			<UpButton
				type="button"
				onClick={() => inputRef.current.click()}
				className="button"
			>
				<label htmlFor="file">
                	Imagen: <GrUploadOption className="icon" />
                </label>
			
			</UpButton>
			{type === "image" && value && (
				<PreviewImg
					src={typeof value === "string" ? value : URL.createObjectURL(value)}
					alt="file"
					className="preview_img"
				/>
			)}
			{value !== null && !progressShow && typeof value !== "string" && (
				<UpButton onClick={handleUpload} className="button">
					Upload
				</UpButton>
			)}
			{progressShow && progress < 100 && (
				<ProgressContainer>
					<p>{progress}%</p>
				</ProgressContainer>
			)}
			{progress === 100 && (
				<ProgressContainer>
					<CheckImg src={check} alt="check circle" className="check_img" />
				</ProgressContainer>
			)}
		</UpContainer>
	);
};

export default FileInput;