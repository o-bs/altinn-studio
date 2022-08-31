import React from 'react';
import type { MergeReposProps } from './utils';
import { mergeRepos } from './utils';
import type { IRepository } from 'altinn-shared/types/global';

export const useAugmentReposWithStarred = ({
  repos,
  starredRepos,
}: MergeReposProps): IRepository[] => {
  return React.useMemo(() => {
    return mergeRepos({ repos, starredRepos });
  }, [repos, starredRepos]);
};
