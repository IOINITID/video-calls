import { AudioStreamController } from './audio-stream-controller';
import { VideoStreamController } from './video-stream-controller';

class MediaPermissionsController {
  public async getPermissions(): Promise<{ microphone: PermissionState; camera: PermissionState }> {
    try {
      const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      // TODO: Добавить audioStreamController в класс
      if (microphonePermission.state !== 'granted') {
        await new AudioStreamController().requestPermission();
      }

      // TODO: Добавить videoStreamController в класс
      if (cameraPermission.state !== 'granted') {
        await new VideoStreamController().requestPermission();
      }

      return { microphone: microphonePermission.state, camera: cameraPermission.state };
    } catch (error) {
      console.error(error);

      return { microphone: 'prompt', camera: 'prompt' };
    }
  }
}

export const mediaPermissions = new MediaPermissionsController();
