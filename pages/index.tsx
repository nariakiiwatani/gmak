import React, { useState, useCallback, useContext, createContext } from 'react';
import VoiceInput from '../components/VoiceInput';
import { Paper, Tabs, Tab } from '@material-ui/core';
import CommentEdit from '../components/CommentEdit';
import { RecordingContext } from "../contexts/RecordingContext"

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}
const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{children}
		</div>
	);
}
const Index = () => {
	const recordings = useContext(RecordingContext)
	const [tabIndex, setTabIndex] = useState(0)
	const handleTabChange = (e, v) => {
		setTabIndex(v)
	}
	const handleRecordingResult = ({ comments, audioURL }) => {
		if (comments.length === 0) {
			//			return;
		}
		recordings.create({
			name: `take-${recordings.takes.length + 1}`,
			comments: [...comments],
			audio: audioURL
		})
		setTabIndex(1)
	}
	return (<>
		<h1>GMAK(Beta)</h1>
		<div>
			<p>GMAK is for MAking Kaptions. for more informations, <a href="https://github.com/nariakiiwatani/gmak" target="_blank">see GitHub repository</a></p>
		</div>
		<Paper>
			<Tabs
				value={tabIndex}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab key="recent" label="+" />
				{recordings.takes.map((r, i) => (<Tab key={i} label={r.name} />))}
			</Tabs>
			<TabPanel key={0} value={tabIndex} index={0}>
				<VoiceInput onResult={handleRecordingResult} />
			</TabPanel>
			{recordings.takes.map((r, i) => (
				<TabPanel key={recordings.takes.length - i} value={tabIndex} index={i + 1}>
					<CommentEdit recordingIndex={i} />
				</TabPanel>
			))}
		</Paper>
	</>
	)
}

export default Index

