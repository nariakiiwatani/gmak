import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import CommentTable from './CommentTable';
import Comment from '../classes/Comment'
import InputEmulator from './InputEmulator';
import { makeStyles, Theme, createStyles, Button, CircularProgress } from '@material-ui/core';
import Mic from '@material-ui/icons/Mic'
import Analyzer from '../libs/Analyzer';
import Recorder from '../libs/Recorder';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		micWrapper: {
			margin: theme.spacing(1),
			position: 'relative',
		},
		micProgress: {
			position: 'absolute',
			top: 3,
			left: 7,
			zIndex: 1,
		}
	})
)

const VoiceInput = props => {
	const classes = useStyles();
	const { onResult } = props
	const [isRecording, setIsRecording] = useState(false)
	const [startTime, setStartTime] = useState(Date.now())
	const recorder = useMemo(() => new Recorder(), [])
	const handleStartRecording = () => {
		recorder.start({ audio: true, video: false })
		setStartTime(Date.now())
		setIsRecording(true)
	}
	const handleStopRecording = async () => {
		setIsRecording(false)
		const audioURL = await recorder.stop()
		onResult({ comments, audioURL })
		setComments([])
	}
	const toggleRecording = () => isRecording ? handleStopRecording() : handleStartRecording()

	const newComment = (): Comment => ({
		time: Date.now(),
		duration: 0,
		comment: ""
	})
	const [comments, setComments] = useState<Comment[]>([])
	const [pending, setPending] = useState<Comment>()
	const [isSpeechStarted, setSpeechStarted] = useState(false)

	const handleSpeechStart = isSpeechStarted ?
		() => {
			console.log("error: started without end")
		} :
		() => {
			setSpeechStarted(true)
			setPending(newComment())
		}
	const handleSpeechCancel = isSpeechStarted ?
		() => {
			setSpeechStarted(false)
		} :
		() => {
			console.log("error: canceled without start")
		}
	const handleSpeechInterim = (text) => {
	}
	const handleSpeechFinish = isSpeechStarted ?
		(text) => {
			setSpeechStarted(false)
			setComments(prev => [...prev, {
				...pending,
				time: pending.time - startTime,
				duration: Date.now() - pending.time,
				comment: text
			}])
		} :
		() => {
			console.log("error: finished without start")
		}
	const handleCommentDelete = useCallback((index: number) => {
		setComments(prev => {
			const copy = [...prev]
			copy.splice(index, 1)
			return copy
		})
	}, [])
	const handleCommentEdit = useCallback((index: number, name: string, value: number | string) => {
		setComments(prev => {
			const copy = [...prev]
			copy[index][name] = value
			return copy
		})
	}, [])

	const handleSpeechStartRef = useRef(handleSpeechStart)
	const handleSpeechStopRef = useRef(handleSpeechCancel)
	const handleSpeechInterimRef = useRef(handleSpeechInterim)
	const handleSpeechFinishRef = useRef(handleSpeechFinish)
	handleSpeechStartRef.current = handleSpeechStart
	handleSpeechStopRef.current = handleSpeechCancel
	handleSpeechInterimRef.current = handleSpeechInterim
	handleSpeechFinishRef.current = handleSpeechFinish
	const [analyzer, setAnalyzer] = useState(null)
	const [isAnalyzerImplemented, setAnalyzerImplemented] = useState(true)
	useEffect(() => {
		if (!Analyzer.IsImplemented()) {
			setAnalyzerImplemented(false)
			return
		}
		const a = (() => {
			if (analyzer === null) {
				const analyzerCallbacks = {
					start: handleSpeechStartRef,
					cancel: handleSpeechStopRef,
					finish: handleSpeechFinishRef,
					interim: handleSpeechInterimRef,
				}
				const ret = new Analyzer(analyzerCallbacks)
				setAnalyzer(ret)
				return ret
			}
			return analyzer
		})()
		a.setContinuous(isRecording)
		if (isRecording) {
			a.start()
			return () => {
				a.stop()
			}
		}
		else {
			a.stop()
		}
	}, [isRecording])

	return (
		isAnalyzerImplemented ?
			(<>
				<div
					className={classes.micWrapper}
				>
					<Button
						variant="contained"
						color={isRecording ? "primary" : "secondary"}
						startIcon={<Mic />}
						onClick={toggleRecording}
					>
						{isRecording ? "Stop Recording" : "Start New Recording"}
					</Button>
					{isRecording && <CircularProgress size={30} color="secondary" thickness={5} className={classes.micProgress} />}
				</div>

				<CommentTable comments={comments} onDelete={handleCommentDelete} onEdit={handleCommentEdit} />
			</>)
			: (<div>
				<p>It looks like your browser doesn't support SpeechRecognitionAPI.</p>
				<p>Please try with Google Chrome for Desktop.</p>
			</div>)
	)
}

export default VoiceInput
