import { AudioStreamController } from './audio-stream-controller';
import { mediaPermissions } from './media-permissions-controller';
import { VideoStreamController } from './video-stream-controller';

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
  private permissions: { microphone: PermissionState; camera: PermissionState } = {
    microphone: 'prompt',
    camera: 'prompt',
  };

  constructor() {
    this.subscribeUpdateDevices();
  }

  /**
   * Метод который обновляет список медиаустройств.
   */
  private subscribeUpdateDevices(): void {
    navigator.mediaDevices.addEventListener('devicechange', (event) => {
      if (this.audioInputDevices) {
        this.getDevices('audioinput', this.audioInputDevicesCallback);
        console.log('LOGS: Устройства audioInputDevices обновлены.', { event });
      }

      if (this.audioOutputDevices) {
        this.getDevices('audiooutput', this.audioOutputDevicesCallback);
        console.log('LOGS: Устройства audioOutputDevices обновлены.', { event });
      }

      if (this.videoInputDevices) {
        this.getDevices('videoinput', this.videoInputDevicesCallback);
        console.log('LOGS: Устройства videoInputDevices обновлены.', { event });
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
   * @param error ошибка получения списка медиаустройств.
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
    if (type === 'audioinput') {
      await mediaPermissions.getPermissions((params) => {
        this.permissions = params;
      });

      try {
        this.updateState([], 'idle', this.permissions, null, callback);

        // TODO: Добавить audioStreamController в класс
        if (this.permissions.microphone !== 'granted') {
          await new AudioStreamController().requestPermission();
        }

        this.updateState([], 'loading', this.permissions, null, callback);

        const devices = await navigator.mediaDevices.enumerateDevices();

        this.audioInputDevices = devices.filter((value) => value.kind === 'audioinput');
        this.audioInputDevicesCallback = callback;
        this.updateState(this.audioInputDevices, 'success', this.permissions, null, callback);
      } catch (error) {
        if (error instanceof DOMException) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }

        if (error instanceof Error) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }
      }
    }

    if (type === 'audiooutput') {
      await mediaPermissions.getPermissions((params) => {
        this.permissions = params;
      });

      try {
        this.updateState([], 'idle', this.permissions, null, callback);

        // TODO: Добавить audioStreamController в класс
        if (this.permissions.microphone !== 'granted') {
          await new AudioStreamController().requestPermission();
        }

        this.updateState([], 'loading', this.permissions, null, callback);

        const devices = await navigator.mediaDevices.enumerateDevices();

        this.audioOutputDevices = devices.filter((value) => value.kind === 'audiooutput');
        this.audioOutputDevicesCallback = callback;
        this.updateState(this.audioOutputDevices, 'success', this.permissions, null, callback);
      } catch (error) {
        if (error instanceof DOMException) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }

        if (error instanceof Error) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }
      }
    }

    if (type === 'videoinput') {
      await mediaPermissions.getPermissions((params) => {
        this.permissions = params;
      });

      try {
        this.updateState([], 'idle', this.permissions, null, callback);

        // TODO: Добавить videoStreamController в класс
        if (this.permissions.camera !== 'granted') {
          await new VideoStreamController().requestPermission();
        }

        this.updateState([], 'loading', this.permissions, null, callback);

        const devices = await navigator.mediaDevices.enumerateDevices();

        this.videoInputDevices = devices.filter((value) => value.kind === 'videoinput');
        this.videoInputDevicesCallback = callback;
        this.updateState(this.videoInputDevices, 'success', this.permissions, null, callback);
      } catch (error) {
        if (error instanceof DOMException) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }

        if (error instanceof Error) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }
      }
    }

    if (type === 'all') {
      await mediaPermissions.getPermissions((params) => {
        this.permissions = params;
      });

      try {
        this.updateState([], 'idle', this.permissions, null, callback);

        // TODO: Добавить audioStreamController в класс
        if (this.permissions.microphone !== 'granted') {
          await new AudioStreamController().requestPermission();
        }

        // TODO: Добавить videoStreamController в класс
        if (this.permissions.camera !== 'granted') {
          await new VideoStreamController().requestPermission();
        }

        this.updateState([], 'loading', this.permissions, null, callback);

        const devices = await navigator.mediaDevices.enumerateDevices();

        this.allDevices = devices;
        this.allDevicesCallback = callback;
        this.updateState(this.allDevices, 'success', this.permissions, null, callback);
      } catch (error) {
        if (error instanceof DOMException) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }

        if (error instanceof Error) {
          this.updateState([], 'error', this.permissions, error.message, callback);
          return;
        }
      }
    }
  }
}

export const mediaDevices = new MediaDevicesController();
