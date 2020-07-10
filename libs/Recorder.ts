class Recorder {
	mediaRecorder = null
	stream = null
	recordedChunks = [];

	start(constraints) {
		var handleSuccess = (stream) => {
			this.stream = stream
			const options = { mimeType: 'audio/webm' };
			this.recordedChunks = [];
			const mediaRecorder = new MediaRecorder(stream, options);

			mediaRecorder.addEventListener('dataavailable', (e) => {
				if (e.data.size > 0) {
					this.recordedChunks.push(e.data);
				}
			});

			mediaRecorder.start();
			this.mediaRecorder = mediaRecorder
		};

		navigator.mediaDevices.getUserMedia(constraints)
			.then(handleSuccess);
	}
	async stop(): Promise<URL> {
		return new Promise<URL>(resolve => {
			this.mediaRecorder.addEventListener('stop', () => {
				this.stream.getTracks().forEach(track => track.stop())
				resolve(new URL(URL.createObjectURL(new Blob(this.recordedChunks))))
			});
			this.mediaRecorder.stop();
		})
	}
}
export default Recorder