import { Navigate, Route, Routes } from 'react-router-dom';
import { MediaSettings } from 'modules/media-settings';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MediaSettings />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
