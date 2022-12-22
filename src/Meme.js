import React from "react"

import * as htmlToImage from "html-to-image";
import download from "downloadjs";

export default function Meme(){

	const [meme, setMeme] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "http://i.imgflip.com/1bij.jpg"
	})

	const [allMemes, setAllMemes] = React.useState([])

	React.useEffect(()=>{
		fetch("https://api.imgflip.com/get_memes")
		.then(res => res.json())
		.then(data => setAllMemes(data.data.memes))
	}, [])

	function getMemeImage(){
		const randomNumber = Math.floor(Math.random() * allMemes.length)
		const url = allMemes[randomNumber].url
		
		setMeme(prevMeme => ({
			...prevMeme,
			randomImage:url
		}))
	}
	function handleChange(event){
		const { name, value } = event.target
		setMeme(prevMeme => ({
			...prevMeme,
			[name]: value,
		}))
	}
	function downloadMemeImage(){
		htmlToImage
			.toPng(document.getElementById("my-meme"))
			.then(function (dataUrl) {
				download(dataUrl, 'my-node.png');
			});
	}

	return(
		<main className="Meme">
			<div className="meme-form">
				<input 
					type="text" 
					className="meme-form-input" 
					placeholder="Top text"
					onChange={handleChange}
					name= "topText"
					value = {meme.topText} 
				/>
				<input 
					type="text" 
					className="meme-form-input" 
					placeholder="Bottom text" 
					onChange={handleChange}
					name = "bottomText"
					value={meme.bottomText} 
				/>
				<button 
					className="meme-form-button"
					onClick = {getMemeImage}
				>
					Get a new meme image 
				</button>
			</div>
			<div className="meme" id="my-meme">
				<img src={meme.randomImage} alt="memeimage" className="meme--image" />
				<h2 className="meme--text top">{meme.topText}</h2>
				<h2 className="meme--text bottom">{meme.bottomText}</h2>
			</div>
			<button
				className="meme-download"
				onClick={downloadMemeImage}
			>
				Download meme
			</button>
		</main>
	)
}