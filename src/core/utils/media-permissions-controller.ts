class MediaPermissionsController {
  private updatePermissions(
    params: { microphone: PermissionState; camera: PermissionState },
    callback?: (params: { microphone: PermissionState; camera: PermissionState }) => void
  ) {
    if (callback) {
      callback(params);
    }
  }

  private subscribeUpdatePermissions(
    microphonePermission: PermissionStatus,
    cameraPermission: PermissionStatus,
    callback?: (params: { microphone: PermissionState; camera: PermissionState }) => void
  ) {
    microphonePermission.addEventListener('change', (event) => {
      console.log('LOGS: Microphone permission change.', { event });

      this.updatePermissions({ microphone: microphonePermission.state, camera: cameraPermission.state }, callback);
    });

    cameraPermission.addEventListener('change', (event) => {
      console.log('LOGS: Camera permission change.', { event });

      this.updatePermissions({ microphone: microphonePermission.state, camera: cameraPermission.state }, callback);
    });
  }

  public async getPermissions(
    callback?: (params: { microphone: PermissionState; camera: PermissionState }) => void
  ): Promise<void> {
    try {
      const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      this.updatePermissions({ microphone: microphonePermission.state, camera: cameraPermission.state }, callback);
      this.subscribeUpdatePermissions(microphonePermission, cameraPermission, callback);
    } catch (error) {
      this.updatePermissions({ microphone: 'prompt', camera: 'prompt' }, callback);
    }
  }
}

export const mediaPermissions = new MediaPermissionsController();
