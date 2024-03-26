export type Params = {
  type: 'audio' | 'video';
  stream: MediaStream | null;
  status: 'default' | 'loading' | 'active' | 'inactive' | 'error';
  error: Error | null;
};

export class Base {
  private instance: CustomEvent<{ params: Params }>;
  private stream: MediaStream | null;
  private status: 'default' | 'loading' | 'active' | 'inactive' | 'error';
  private error: Error | null;
  private type: 'audio' | 'video';

  constructor({ type }: { type: 'audio' | 'video' }) {
    this.instance = new CustomEvent('stream', {
      detail: { params: { type: type, stream: null, status: 'default', error: null } },
    });
    this.stream = null;
    this.status = 'default';
    this.error = null;
    this.type = type;
  }

  private dispatch() {
    this.instance.detail.params = {
      ...this.instance.detail.params,
      type: this.type,
      stream: this.stream,
      status: this.status,
      error: this.error,
    };
    window.dispatchEvent(this.instance);
  }

  public async get(constraints?: MediaStreamConstraints | undefined) {
    if (this.stream) {
      return;
    }

    try {
      this.status = 'loading';
      this.dispatch();

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.status = 'active';
      this.dispatch();
    } catch (error) {
      this.status = 'error';

      if (error instanceof Error) {
        this.error = error;
        this.dispatch();
      }
    }
  }

  public close() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
      this.status = 'inactive';
      this.dispatch();
    }
  }
}
