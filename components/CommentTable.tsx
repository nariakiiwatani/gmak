import React from 'react'
import CommentRow from './CommentRow'
import { List, ListItem, ListItemIcon, IconButton } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';

const CommentTable = (props: {
	comments: {
		time: number, duration: number, comment: string
	}[],
	onEdit: (index: number, key: string, value: number | string) => void,
	onDelete: (index: number) => void
}) => {
	const { comments, onEdit, onDelete } = props
	const handleEdit = (i, n, v) => {
		switch (n) {
			case "time": v *= 1000; break;
			case "duration": v *= 1000; break;
		}
		onEdit(i, n, v)
	}
	return (<>
		<List>
			{comments
				.map(c => ({
					...c,
					time: c.time / 1000,
					duration: c.duration / 1000
				}))
				.map((c, i) =>
					<ListItem key={i}>
						<ListItemIcon>
							<IconButton
								color="secondary"
								onClick={() => { onDelete(i) }}
							>
								<ClearIcon />
							</IconButton>
						</ListItemIcon>
						<CommentRow data={c} onEdit={(name, value) => handleEdit(i, name, value)} />
					</ListItem>)}
		</List>
	</>)
}

export default CommentTable