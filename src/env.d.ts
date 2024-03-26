/// <reference types="@rsbuild/core/types" />

type Params = {
  type: 'audio' | 'video';
  stream: MediaStream | null;
  status: 'default' | 'loading' | 'active' | 'inactive' | 'error';
  error: Error | null;
};

interface WindowEventMap {
  stream: CustomEvent<{ params: Params }>;
}
