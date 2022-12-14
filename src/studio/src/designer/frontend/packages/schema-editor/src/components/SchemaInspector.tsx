import React, { useEffect, useState } from 'react';
import { Panel, PanelVariant } from '@altinn/altinn-design-system';
import { AppBar } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import type { UiSchemaNode } from '@altinn/schema-model';
import { FieldType, ObjectKind } from '@altinn/schema-model';
import { getTranslation } from '../utils/language';
import { SchemaTab } from './common/SchemaTab';
import { ItemPropertiesTab } from './SchemaInspector/ItemPropertiesTab';
import { ItemFieldsTab } from './SchemaInspector/ItemFieldsTab';
import type { ILanguage } from '../types';
import classes from './SchemaInspector.module.css';
import { Divider } from 'app-shared/primitives';

export interface ISchemaInspectorProps {
  language: ILanguage;
  selectedItem?: UiSchemaNode;
}

export const SchemaInspector = ({ language, selectedItem }: ISchemaInspectorProps) => {
  const [tabIndex, setTabIndex] = useState('0');
  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    if (selectedItem) {
      if (tabIndex === '2' && selectedItem.fieldType !== FieldType.Object) {
        setTabIndex('0');
      }
    } else {
      setTabIndex('0');
    }
  }, [tabIndex, selectedItem]);

  return selectedItem ? (
    <div className={classes.root} data-testid='schema-inspector'>
      <Panel variant={PanelVariant.Warning} forceMobileLayout={true}>
        <span>{t('warning_under_development')}</span>
      </Panel>
      <TabContext value={tabIndex}>
        <AppBar position='static' color='default' className={classes.appBar}>
          <TabList onChange={(e: any, v: string) => setTabIndex(v)} aria-label='inspector tabs'>
            <SchemaTab label={t('properties')} value='0' />
            <SchemaTab
              label={t('fields')}
              value='2'
              hide={
                selectedItem.fieldType !== FieldType.Object ||
                selectedItem.objectKind === ObjectKind.Combination ||
                selectedItem.objectKind === ObjectKind.Reference
              }
            />
          </TabList>
        </AppBar>
        <TabPanel className={classes.tabPanel} value='0'>
          <ItemPropertiesTab selectedItem={selectedItem} language={language} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value='2'>
          <ItemFieldsTab selectedItem={selectedItem} language={language} />
        </TabPanel>
      </TabContext>
    </div>
  ) : (
    <div>
      <p className={classes.noItem} id='no-item-paragraph'>
        {t('no_item_selected')}
      </p>
      <Divider />
    </div>
  );
};
