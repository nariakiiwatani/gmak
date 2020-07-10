import { useState, useMemo, useEffect, useRef } from "react"
import React from 'react'

const InputEmulator = (props) => {
	const { onStart, onCancel, onFinish } = props
	const [text, setText] = useState("")

	const handleSubmit = e => {
		e.preventDefault()
		onFinish(text)
		setText("")
	}
	const handleChange = e => {
		const inputText = e.target.value
		if (text === "") {
			onStart()
		}
		if (inputText === "") {
			onCancel()
		}
		setText(inputText)
	}
	return (<>
		<div>{status}</div>
		<form onSubmit={handleSubmit}>
			<input value={text} onChange={handleChange} />
		</form>
	</>
	)
}

export default InputEmulator;