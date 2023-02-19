class MediaDevicesController {
  private audioInputDevices: MediaDeviceInfo[] | null = null;
  private audioOutputDevices: MediaDeviceInfo[] | null = null;
  private videoInputDevices: MediaDeviceInfo[] | null = null;
  private audioInputDevicesCallback: ((audioInputDevices: MediaDeviceInfo[] | null) => void) | undefined;
  private audioOutputDevicesCallback: ((audioOutputDevices: MediaDeviceInfo[] | null) => void) | undefined;
  private videoInputDevicesCallback: ((videoInputDevices: MediaDeviceInfo[] | null) => void) | undefined;

  constructor() {
    this.updateDevices();
  }

  /**
   * Метод который обновляет список медиаустройств.
   */
  private updateDevices(): void {
    navigator.mediaDevices.addEventListener('devicechange', (event) => {
      console.log('LOGS: devicechange', { event });

      if (this.audioInputDevices) {
        this.getAudioInputDevices(this.audioInputDevicesCallback);
      }

      if (this.audioOutputDevices) {
        this.getAudioOutputDevices(this.audioOutputDevicesCallback);
      }

      if (this.videoInputDevices) {
        this.getVideoInputDevices(this.videoInputDevicesCallback);
      }
    });
  }

  /**
   * Метод который получает список аудиоустройств ввода.
   *
   * @param callback возвращает список аудиоустройств ввода.
   */
  public async getAudioInputDevices(callback?: (audioInputDevices: MediaDeviceInfo[] | null) => void): Promise<void> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    this.audioInputDevices = devices.filter((value) => value.kind === 'audioinput');
    this.audioInputDevicesCallback = callback;

    if (callback) {
      callback(this.audioInputDevices);
    }
  }

  /**
   * Метод который получает список аудиоустройств вывода.
   *
   * @param callback возвращает список аудиоустройств вывода.
   */
  public async getAudioOutputDevices(callback?: (audioOutputDevices: MediaDeviceInfo[] | null) => void): Promise<void> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    this.audioOutputDevices = devices.filter((value) => value.kind === 'audiooutput');
    this.audioOutputDevicesCallback = callback;

    if (callback) {
      callback(this.audioOutputDevices);
    }
  }

  /**
   * Метод который получает список видеоустройств ввода.
   *
   * @param callback возвращает список видеоустройств ввода.
   */
  public async getVideoInputDevices(callback?: (videoInputDevices: MediaDeviceInfo[] | null) => void): Promise<void> {
    const devices = await navigator.mediaDevices.enumerateDevices();

    this.videoInputDevices = devices.filter((value) => value.kind === 'videoinput');
    this.videoInputDevicesCallback = callback;

    if (callback) {
      callback(this.videoInputDevices);
    }
  }
}

export const mediaDevices = new MediaDevicesController();
