class MediaPermissionsController {
  public async getPermissions(): Promise<{ microphone: PermissionState; camera: PermissionState }> {
    try {
      const microphonePermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      return { microphone: microphonePermission.state, camera: cameraPermission.state };
    } catch (error) {
      return { microphone: 'prompt', camera: 'prompt' };
    }
  }
}

export const mediaPermissions = new MediaPermissionsController();
