class Analyzer {
	recognition: any;
	continuous: boolean = true
	isFinish: boolean = false;
	constructor(callbackRefs: {
		start, cancel, finish, interim
	}) {
		const recognition = ((klass) => {
			return new klass();
			// @ts-ignore Property 'webkitSpeechRecognition' does not exist on type 'Window & typeof globalThis'.
		})(webkitSpeechRecognition || SpeechRecognition);

		recognition.interimResults = (callbackRefs.interim !== undefined);
		recognition.maxAlternatives = 1;
		recognition.continuous = false;

		recognition.onstart = () => {
			this.isFinish = false
		};

		recognition.onend = () => {
			if (this.continuous) {
				this.start();
			}
		};

		recognition.onerror = (e) => {
			callbackRefs.cancel.current();
			if (e.error === 'no-speech') {
				if (this.continuous) {
					this.start();
				}
			}
		};
		recognition.onspeechstart = () => {
			callbackRefs.start.current();
		}

		recognition.onspeechend = () => {
			setTimeout(() => {
				if (this.isFinish) { return; }
				if (this.continuous) {
					this.start();
				}
			}, 500);
		};
		recognition.onresult = (event) => {
			const result = event.results[event.results.length - 1];
			const transcript = result[0].transcript;
			if (result.isFinal) {
				this.isFinish = true
				callbackRefs.finish.current(transcript);
				if (this.continuous) {
					this.start();
				}
			}
			else {
				callbackRefs.interim.current(transcript);
			}
		}
		this.recognition = recognition;
	}
	start() {
		try {
			this.recognition.start();
		} catch (e) {
			//			console.info("speech error", e)
		}
	}
	stop(): void {
		this.recognition.stop();
	}
	setContinuous(c: boolean): void {
		this.continuous = c
	}
}
export default Analyzer