import './Dropzone.css'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone({onDrop, dropStatement}) {
	const callback = useCallback(acceptedFiles => {
		if (onDrop) {
			onDrop(acceptedFiles[0])
		}
	}, [onDrop])
	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop: callback})

	return (
		<div className='DropZone' {...getRootProps()} style={{color: isDragActive ? 'green' : ''}}>
			< input {...getInputProps()} />
			<p>{dropStatement}</p>
		</div>
	)
}

export default Dropzone