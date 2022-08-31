import type { EnhancedStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as schemaReducer } from './features/editor/schemaEditorSlice';

export const store: EnhancedStore = configureStore({
  reducer: schemaReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.onSaveSchema'],
      },
    }),
});
