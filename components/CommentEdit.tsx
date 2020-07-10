import React, { useCallback, useContext } from 'react';
import CommentTable from './CommentTable';
import { RecordingContext } from '../contexts/RecordingContext';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		controls: {
			margin: theme.spacing(1),
			position: 'relative',
		}
	})
)

const CommentEdit = props => {
	const classes = useStyles()
	const { recordingIndex } = props
	const recordings = useContext(RecordingContext)
	const take = recordings.takes[recordingIndex]
	const handleCommentDelete = useCallback((index: number) => {
		const comments = [...take.comments]
		comments.splice(index, 1)
		recordings.update(recordingIndex, {
			...take,
			comments
		})
	}, [recordingIndex])
	const handleCommentEdit = useCallback((index: number, name: string, value: number | string) => {
		const comments = [...take.comments]
		comments[index][name] = value
		recordings.update(recordingIndex, {
			...take,
			comments
		})
	}, [recordingIndex])

	const handleCommentsDownload = () => {
		var a = document.createElement("a");
		a.download = `${take.name}.json`;
		a.href = URL.createObjectURL(new Blob([JSON.stringify(take.comments)], { type: "text.plain" }));
		a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
		a.click();
	}

	const handleAudioDownload = () => {
		var a = document.createElement("a");
		a.download = `${take.name}.webm`;
		a.href = take.audio.href;
		a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
		a.click();
	}

	return (<>
		<div className={classes.controls}>
			<Button
				onClick={handleCommentsDownload}
				variant="contained"
				color="primary"
			>
				Download Script
			</Button>
			<Button
				onClick={handleAudioDownload}
				variant="contained"
				color="primary"
			>
				Download Audio
			</Button>
		</div>
		<CommentTable comments={take.comments} onDelete={handleCommentDelete} onEdit={handleCommentEdit} />
	</>
	)
}

export default CommentEdit
