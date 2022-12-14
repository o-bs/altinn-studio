import React, { useEffect, useState } from 'react';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AltinnSpinner from 'app-shared/components/AltinnSpinner';
import { post } from 'app-shared/utils/networking';
import { getLanguageFromKey } from 'app-shared/utils/language';
import type { SelectedContext } from '../resources/fetchDashboardResources/dashboardSlice';
import { DashboardActions } from '../resources/fetchDashboardResources/dashboardSlice';
import { fetchLanguage } from '../resources/fetchLanguage/languageSlice';
import type { IHeaderContext } from 'app-shared/navigation/main-header/Header';
import AppHeader, {
  HeaderContext,
  SelectedContextType,
} from 'app-shared/navigation/main-header/Header';
import { userHasAccessToSelectedContext } from '../common/utils';
import { generateClassName, theme } from '../common/utils/muiUtils';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { CenterContainer } from '../common/components/CenterContainer';
import { Footer } from '../common/components/Footer';
import './App.css';
import { useGetOrganizationsQuery } from '../services/organizationApi';
import { Dashboard } from '../features/dashboard/Dashboard';
import { DataModellingContainer } from '../features/standaloneDataModelling/DataModelling';
import { CreateService } from '../features/createService/CreateService';
import classes from './App.module.css';

import {
  frontendLangPath,
  userCurrentPath,
  userLogoutAfterPath,
  userLogoutPath,
  userReposPath,
} from 'app-shared/api-paths';
import { Button } from '@altinn/altinn-design-system';

export const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.dashboard.user);
  const language = useAppSelector((state) => state.language.language);
  const selectedContext = useAppSelector((state) => state.dashboard.selectedContext);
  const { data: orgs = [], isLoading: isLoadingOrganizations } = useGetOrganizationsQuery();

  const setSelectedContext = (newSelectedContext: SelectedContext) =>
    dispatch(
      DashboardActions.setSelectedContext({
        selectedContext: newSelectedContext,
      })
    );

  if (!isLoadingOrganizations && !userHasAccessToSelectedContext({ selectedContext, orgs })) {
    setSelectedContext(SelectedContextType.Self);
  }

  const headerContextValue: IHeaderContext = {
    selectableOrgs: orgs,
    selectedContext,
    setSelectedContext,
    user,
  };

  useEffect(() => {
    dispatch(DashboardActions.fetchCurrentUser({ url: userCurrentPath() }));
    dispatch(fetchLanguage({ url: frontendLangPath('nb') }));
    dispatch(DashboardActions.fetchServices({ url: userReposPath() }));
  }, [dispatch]);

  const [showLogOutButton, setShowLogoutButton] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        setShowLogoutButton(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [user]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        {user && !isLoadingOrganizations ? (
          <div className={classes.root}>
            <HeaderContext.Provider value={headerContextValue}>
              <AppHeader language={language} />
            </HeaderContext.Provider>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <CenterContainer>
                      <Dashboard />
                    </CenterContainer>
                    <Footer />
                  </>
                }
              />
              <Route path='/datamodelling/:org/:repoName' element={<DataModellingContainer />} />
              <Route path='/new' element={<CreateService />} />
            </Routes>
          </div>
        ) : (
          <CenterContainer>
            <AltinnSpinner spinnerText={getLanguageFromKey('dashboard.loading', language)} />
            {showLogOutButton && (
              <Button
                onClick={() =>
                  post(userLogoutPath()).then(() => window.location.assign(userLogoutAfterPath()))
                }
              >
                {getLanguageFromKey('dashboard.logout', language)}
              </Button>
            )}
          </CenterContainer>
        )}
      </ThemeProvider>
    </StylesProvider>
  );
};
