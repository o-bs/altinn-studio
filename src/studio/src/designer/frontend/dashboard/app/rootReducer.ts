import { dataModellingReducer } from 'altinn-shared/features/dataModelling/sagas';
import { dataModelsMetadataReducer } from 'altinn-shared/features/dataModelling/sagas/metadata';
import dashboardReducer from '../resources/fetchDashboardResources/dashboardSlice';
import languageReducer from '../resources/fetchLanguage/languageSlice';
import { designerApi } from '../services/designerApi';

export const rootReducer = {
  dashboard: dashboardReducer,
  language: languageReducer,
  dataModelling: dataModellingReducer,
  dataModelsMetadataState: dataModelsMetadataReducer,
  [designerApi.reducerPath]: designerApi.reducer,
};
