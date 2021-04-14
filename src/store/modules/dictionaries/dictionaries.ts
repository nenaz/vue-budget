import {
  Commit,
  Dispatch,
  Module,
} from 'vuex';
import get from 'lodash.get';
import { RootState, Dictionaries, Dictionary } from '@/store/types';

const defaultDictionaiesState = () => ({
  positions: [],
  ownerships: [],
  sectors: [],
  specializations: [],
  category: [],
});

export const dictionaries: Module<Dictionaries, RootState> = {
  state: defaultDictionaiesState(),
  actions: {
    async dictionaryItemAdd({ dispatch }: {
      dispatch: Dispatch;
    }, params) {
      await dispatch('serverCommonAPI', {
        type: 'POST',
        params: {
          url: '/dictionary/add-dictionary-item',
          data: {
            ...params,
          },
        },
      });
    },
    async distionaryCompose({ dispatch }: {
      dispatch: Dispatch;
    }) {
      await Promise.all([
        dispatch('getDictionary', 'category'),
        // dispatch('getDictionary', 'sectors'),
        // dispatch('getDictionary', 'specializations'),
        // dispatch('getDictionary', 'positions'),
      ]).then((values: any[]) => {
        console.log('all dictionary response');
      }).catch((error: any) => {
        console.log('error', error);
      });
    },
    async getDictionary({ dispatch, commit }: {
      dispatch: Dispatch;
      commit: Commit;
    }, name: string) {
      if (name) {
        const dictionary = await dispatch('serverCommonAPI', {
          type: 'GET',
          params: {
            url: `/dictionary/${name}`,
          },
        });
        if (!get(dictionary, 'statusType')) {
          commit('updateDictionary', {
            name,
            dictionary,
          });
        }
        return dictionary;
      }
      return {};
    },
  },
  mutations: {
    updateDictionary(state, params: {
      name: string;
      dictionary: Dictionary[];
    }) {
      state[params.name] = params.dictionary;
    },
  },
};
