import { AltinnRepositoryType } from '../types/global';

export interface TopBarMenuItem {
  key: TopBarMenu;
  link: string;
  repoTypes?: AltinnRepositoryType[];
}

export enum TopBarMenu {
  About = 'top_menu.about',
  Create = 'top_menu.create',
  Datamodel = 'top_menu.datamodel',
  Text = 'top_menu.texts',
  Deploy = 'top_menu.deploy',
  None = '',
}

export const menu: TopBarMenuItem[] = [
  {
    key: TopBarMenu.About,
    link: '/',
    repoTypes: [AltinnRepositoryType.App],
  },
  {
    key: TopBarMenu.Create,
    link: '/ui-editor',
    repoTypes: [AltinnRepositoryType.App],
  },
  {
    key: TopBarMenu.Datamodel,
    link: '/datamodel',
    repoTypes: [AltinnRepositoryType.Datamodels, AltinnRepositoryType.App],
  },
  {
    key: TopBarMenu.Text,
    link: '/texts',
    repoTypes: [AltinnRepositoryType.App],
  },
  {
    key: TopBarMenu.Deploy,
    link: '/deploy',
    repoTypes: [AltinnRepositoryType.App],
  },
];
