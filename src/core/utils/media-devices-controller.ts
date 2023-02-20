import { AudioStreamController } from './audio-stream-controller';
import { VideoStreamController } from './video-stream-controller';

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
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState; permission: PermissionState | null }) => void)
    | undefined;
  private audioOutputDevicesCallback:
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState; permission: PermissionState | null }) => void)
    | undefined;
  private videoInputDevicesCallback:
    | ((params: { devices: MediaDeviceInfo[] | null; state: DevicesState; permission: PermissionState | null }) => void)
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
    permission: PermissionState | null,
    callback?: (params: {
      devices: MediaDeviceInfo[] | null;
      state: DevicesState;
      permission: PermissionState | null;
    }) => void
  ): void {
    if (type === 'audioinput') {
      this.audioInputDevicesState = state;

      if (callback) {
        callback({ devices: this.audioInputDevices, state: this.audioInputDevicesState, permission });
      }
    }

    if (type === 'audiooutput') {
      this.audioOutputDevicesState = state;

      if (callback) {
        callback({ devices: this.audioOutputDevices, state: this.audioOutputDevicesState, permission });
      }
    }

    if (type === 'videoinput') {
      this.videoInputDevicesState = state;

      if (callback) {
        callback({ devices: this.videoInputDevices, state: this.videoInputDevicesState, permission });
      }
    }
  }

  /**
   * Метод который получает список аудиоустройств ввода.
   *
   * @param callback возвращает список аудиоустройств ввода.
   */
  public async getAudioInputDevices(
    callback?: (params: {
      devices: MediaDeviceInfo[] | null;
      state: DevicesState;
      permission: PermissionState | null;
    }) => void
  ): Promise<void> {
    try {
      this.updateState('audioinput', 'loading', null, callback);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const permission = await navigator.permissions.query({ name: 'microphone' });

      if (permission.state !== 'granted') {
        await new AudioStreamController().getPermission();
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      this.audioInputDevices = devices.filter((value) => value.kind === 'audioinput');

      this.audioInputDevicesCallback = callback;

      this.updateState('audioinput', 'success', permission.state, callback);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Метод который получает список аудиоустройств вывода.
   *
   * @param callback возвращает список аудиоустройств вывода.
   */
  public async getAudioOutputDevices(
    callback?: (params: {
      devices: MediaDeviceInfo[] | null;
      state: DevicesState;
      permission: PermissionState | null;
    }) => void
  ): Promise<void> {
    try {
      this.updateState('audiooutput', 'loading', null, callback);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const permission = await navigator.permissions.query({ name: 'microphone' });

      if (permission.state !== 'granted') {
        await new AudioStreamController().getPermission();
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      this.audioOutputDevices = devices.filter((value) => value.kind === 'audiooutput');

      this.audioOutputDevicesCallback = callback;

      this.updateState('audiooutput', 'success', permission.state, callback);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Метод который получает список видеоустройств ввода.
   *
   * @param callback возвращает список видеоустройств ввода.
   */
  public async getVideoInputDevices(
    callback?: (params: {
      devices: MediaDeviceInfo[] | null;
      state: DevicesState;
      permission: PermissionState | null;
    }) => void
  ): Promise<void> {
    await new VideoStreamController().getPermission();

    try {
      this.updateState('videoinput', 'loading', null, callback);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const permission = await navigator.permissions.query({ name: 'camera' });

      if (permission.state !== 'granted') {
        await new VideoStreamController().getPermission();
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      this.videoInputDevices = devices.filter((value) => value.kind === 'videoinput');

      this.videoInputDevicesCallback = callback;

      this.updateState('videoinput', 'success', permission.state, callback);
    } catch (error) {
      console.error(error);
    }
  }
}

export const mediaDevices = new MediaDevicesController();
