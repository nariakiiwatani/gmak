import { createContext, useState, useCallback } from 'react';
import Take from "../classes/Take"

export const RecordingContext = createContext<{
	takes: Take[],
	create: (take: Take) => void,
	update: (index: number, take: Take) => void
}>({
	takes: [],
	create: undefined,
	update: undefined
});
const RecordingContextProvider = props => {
	const [takes, setTakes] = useState<Take[]>([])
	const create = useCallback((take) => {
		setTakes(prev => {
			console.info(prev, take, [{ ...take }, ...prev])
			return [{ ...take }, ...prev]
		})
	}, [])
	const update = useCallback((index, take) => {
		setTakes(prev => {
			const copy = [...prev]
			console.log(prev, [...prev], take, index)
			copy[index] = { ...take }
			return copy
		})
	}, [])
	return (
		<RecordingContext.Provider value={{
			takes, create, update
		}}>
			{props.children}
		</RecordingContext.Provider>
	)
}
export default RecordingContextProvider