type DevicesState = 'default' | 'loading' | 'success';

/**
 * Класс для получения списка медиаустройств.
 */
class MediaDevicesController {
  private audioInputDevices: MediaDeviceInfo[] | null = null;
  private audioOutputDevices: MediaDeviceInfo[] | null = null;
  private videoInputDevices: MediaDeviceInfo[] | null = null;
  private audioInputDevicesState: DevicesState = 'default';
  private audioOutputDevicesState: DevicesState = 'default';
  private videoInputDevicesState: DevicesState = 'default';
  private audioInputDevicesCallback:
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void)
    | undefined;
  private audioOutputDevicesCallback:
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void)
    | undefined;
  private videoInputDevicesCallback:
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void)
    | undefined;

  constructor() {
    this.updateDevices();
  }

  /**
   * Метод который обновляет список медиаустройств.
   */
  private updateDevices(): void {
    navigator.mediaDevices.addEventListener('devicechange', (event) => {
      console.log('LOGS: Device change', { event });

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
   * Метод который обновляет состояние списка медиаустройств.
   *
   * @param type тип устройства.
   * @param state состояние устройства.
   * @param callback функция которая возвращает список медиаустройств и состояние.
   */
  private updateState(
    type: MediaDeviceKind,
    state: 'default' | 'loading' | 'success',
    callback?: (params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void
  ): void {
    if (type === 'audioinput') {
      this.audioInputDevicesState = state;

      if (callback) {
        callback({ devices: this.audioInputDevices, state: this.audioInputDevicesState });
      }
    }

    if (type === 'audiooutput') {
      this.audioOutputDevicesState = state;

      if (callback) {
        callback({ devices: this.audioOutputDevices, state: this.audioOutputDevicesState });
      }
    }

    if (type === 'videoinput') {
      this.videoInputDevicesState = state;

      if (callback) {
        callback({ devices: this.videoInputDevices, state: this.videoInputDevicesState });
      }
    }
  }

  /**
   * Метод который получает список аудиоустройств ввода.
   *
   * @param callback возвращает список аудиоустройств ввода.
   */
  public async getAudioInputDevices(
    callback?: (params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void
  ): Promise<void> {
    this.updateState('audioinput', 'loading', callback);

    const devices = await navigator.mediaDevices.enumerateDevices();

    this.audioInputDevices = devices.filter((value) => value.kind === 'audioinput');

    this.audioInputDevicesCallback = callback;

    this.updateState('audioinput', 'success', callback);
  }

  /**
   * Метод который получает список аудиоустройств вывода.
   *
   * @param callback возвращает список аудиоустройств вывода.
   */
  public async getAudioOutputDevices(
    callback?: (params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void
  ): Promise<void> {
    this.updateState('audiooutput', 'loading', callback);

    const devices = await navigator.mediaDevices.enumerateDevices();

    this.audioOutputDevices = devices.filter((value) => value.kind === 'audiooutput');

    this.audioOutputDevicesCallback = callback;

    this.updateState('audiooutput', 'success', callback);
  }

  /**
   * Метод который получает список видеоустройств ввода.
   *
   * @param callback возвращает список видеоустройств ввода.
   */
  public async getVideoInputDevices(
    callback?: (params: { devices: MediaDeviceInfo[] | null; state: DevicesState }) => void
  ): Promise<void> {
    this.updateState('videoinput', 'loading', callback);

    const devices = await navigator.mediaDevices.enumerateDevices();

    this.videoInputDevices = devices.filter((value) => value.kind === 'videoinput');

    this.videoInputDevicesCallback = callback;

    this.updateState('videoinput', 'success', callback);
  }
}

export const mediaDevices = new MediaDevicesController();
