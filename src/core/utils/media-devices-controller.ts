import { mediaPermissions } from './media-permissions-controller';

type State = 'idle' | 'loading' | 'success' | 'error';
type Permissions = { microphone: PermissionState; camera: PermissionState };
type CallbackParams = { devices: MediaDeviceInfo[]; state: State; permissions: Permissions; error: string | null };
type Callback = (params: CallbackParams) => void;

/**
 * Класс для получения списка медиаустройств.
 */
class MediaDevicesController {
  private audioInputDevices: MediaDeviceInfo[] = [];
  private audioOutputDevices: MediaDeviceInfo[] = [];
  private videoInputDevices: MediaDeviceInfo[] = [];
  private allDevices: MediaDeviceInfo[] = [];
  private audioInputDevicesCallback?: Callback;
  private audioOutputDevicesCallback?: Callback;
  private videoInputDevicesCallback?: Callback;
  private allDevicesCallback?: Callback;

  constructor() {
    this.subscribeUpdateDevices();
  }

  /**
   * Метод который обновляет список медиаустройств.
   */
  private subscribeUpdateDevices(): void {
    navigator.mediaDevices.addEventListener('devicechange', (event) => {
      console.log('LOGS: Устройства обновлены.', { event });

      if (this.audioInputDevices) {
        this.getDevices('audioinput', this.audioInputDevicesCallback);
      }

      if (this.audioOutputDevices) {
        this.getDevices('audiooutput', this.audioOutputDevicesCallback);
      }

      if (this.videoInputDevices) {
        this.getDevices('videoinput', this.videoInputDevicesCallback);
      }

      if (this.allDevices) {
        this.getDevices('all', this.allDevicesCallback);
      }
    });
  }

  /**
   * Метод который обновляет состояние списка медиаустройств.
   *
   * @param devices список медиаустройств.
   * @param state состояние медиаустройств.
   * @param permissions разрешения для медиаустройств.
   * @param callback функция которая возвращает список медиаустройств и состояние.
   */
  private updateState(
    devices: MediaDeviceInfo[],
    state: State,
    permissions: Permissions,
    error: string | null,
    callback?: Callback
  ): void {
    if (callback) {
      callback({ devices, state, permissions, error });
    }
  }

  /**
   * Метод который получает список медиаустройств.
   *
   * @param type тип медиаустройства.
   * @param callback функция которая возвращает список медиаустройств и состояние.
   */
  public async getDevices(type: MediaDeviceKind | 'all', callback?: Callback): Promise<void> {
    const permissions = await mediaPermissions.getPermissions();

    this.updateState([], 'idle', permissions, null, callback);

    try {
      this.updateState([], 'loading', permissions, null, callback);

      const devices = await navigator.mediaDevices.enumerateDevices();

      switch (type) {
        case 'audioinput':
          this.audioInputDevices = devices.filter((value) => value.kind === 'audioinput');
          this.audioInputDevicesCallback = callback;
          this.updateState(this.audioInputDevices, 'success', permissions, null, callback);
          break;
        case 'audiooutput':
          this.audioOutputDevices = devices.filter((value) => value.kind === 'audiooutput');
          this.audioOutputDevicesCallback = callback;
          this.updateState(this.audioOutputDevices, 'success', permissions, null, callback);
          break;
        case 'videoinput':
          this.videoInputDevices = devices.filter((value) => value.kind === 'videoinput');
          this.videoInputDevicesCallback = callback;
          this.updateState(this.videoInputDevices, 'success', permissions, null, callback);
          break;
        case 'all':
          this.allDevices = devices;
          this.allDevicesCallback = callback;
          this.updateState(this.allDevices, 'success', permissions, null, callback);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        this.updateState([], 'error', permissions, error.message, callback);
      }
    }
  }
}

export const mediaDevices = new MediaDevicesController();
