import styled from "styled-components";

export const UpContainer = styled.div`
	width: calc(100% - 20px);
	padding: 10px 5px;
	margin: 5px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
`;

export const UpInput = styled.input`
	display: none;
`;

export const UpButton  = styled.button`
	outline: none;
	font-size: 14px;
	font-weight: bold;
	background: transparent;
	padding: 10px;
	cursor: pointer;
    `;


export const PreviewImg  = styled.img `
	width: 100px;
	height: 100px;
	object-fit: contain;
`;

export const ProgressContainer  = styled.div `
	width: 100px;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: center;
`;

export const CheckImg  = styled.img `
	width: 60px;
	height: 60px;
`;