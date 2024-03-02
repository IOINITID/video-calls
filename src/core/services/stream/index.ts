type Params = {
  stream: MediaStream | null;
  status: 'default' | 'loading' | 'active' | 'inactive' | 'error';
  error: Error | null;
};

export class Stream {
  private instance: CustomEvent<{ params: Params }>;
  private stream: MediaStream | null;
  private status: 'default' | 'loading' | 'active' | 'inactive' | 'error';

  constructor() {
    this.instance = new CustomEvent('stream', { detail: { params: { stream: null, status: 'default', error: null } } });
    this.stream = null;
    this.status = 'default';
  }

  private dispatch(params: Partial<Params> = {}) {
    this.instance.detail.params = {
      ...this.instance.detail.params,
      stream: this.stream,
      status: this.status,
      ...params,
    };
    window.dispatchEvent(this.instance);
  }

  public async get(constraints: MediaStreamConstraints = { audio: true, video: true }) {
    if (this.status !== 'default' && this.status !== 'inactive') {
      return;
    }

    this.status = 'loading';
    this.dispatch();

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.status = 'active';
      this.dispatch();
    } catch (error) {
      this.status = 'error';

      if (error instanceof DOMException) {
        this.dispatch({ error: { name: error.name, message: error.message } });
      }

      if (error instanceof Error) {
        this.dispatch({ error: { name: error.name, message: error.message } });
      }
    }
  }

  public close() {
    try {
      if (this.stream) {
        this.stream.getTracks().forEach((value) => value.stop());
        this.stream = null;
        this.status = 'inactive';
        this.dispatch();
      }
    } catch (error) {
      this.status = 'error';

      if (error instanceof DOMException) {
        this.dispatch({ error: { name: error.name, message: error.message } });
      }

      if (error instanceof Error) {
        this.dispatch({ error: { name: error.name, message: error.message } });
      }
    }
  }
}
