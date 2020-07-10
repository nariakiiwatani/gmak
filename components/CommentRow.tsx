import React from 'react'
import { TextField, Grid } from "@material-ui/core"

const CommentRow = props => {
	const { data: { time, duration, comment }, onEdit } = props
	return (<>
		<Grid container
			spacing={1}
			alignItems="center">
			<Grid item
				xs={1}>
				<TextField label="startTime" value={time.toFixed(2)} onChange={e => onEdit("time", e.target.value)} />
			</Grid>
			<Grid item
				xs={1}>
				<TextField label="duration" value={duration.toFixed(2)} onChange={e => onEdit("duration", e.target.value)} />
			</Grid>
			<Grid item
				xs={true}>
				<TextField fullWidth multiline label="text" value={comment} onChange={e => onEdit("comment", e.target.value)} />
			</Grid>
		</Grid>
	</>)
}

export default CommentRow