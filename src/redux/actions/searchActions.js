import * as types from './actionTypes';
import * as searchApi from '../../api/searchApi';
import * as participatingResourcesApi from '../../api/participatingResourcesApi';

export function loadSearchFiltersSuccess(resourcesList) {
  return { type: types.LOAD_RESOURCES_LIST_SUCCESS, resourcesList };
}

export function loadSearchResultsSuccess(searchResults) {
  return { type: types.LOAD_SEARCH_RESULTS_SUCCESS, searchResults };
}

export function runFullTextSearch(searchText) {
  return { type: types.RUN_FULL_TEXT_SEARCH, searchText };
}

export function applyResourcesFilter(filter) {
  return { type: types.UPDATE_RESOURCES_FILTER_SUCCESS, filter };
}

export function handleBubbleSearchTextRemove() {
  return { type: types.RUN_FULL_TEXT_SEARCH, searchText: '' };
}

export function handleBubbleResourcesRemove() {
  return { type: types.UPDATE_RESOURCES_FILTER_SUCCESS, filter: [] };
}

export function switchSorting(sorting) {
  return { type: types.SWITCH_SORTING, sorting };
}

export function switchSortingOrder(order) {
  return { type: types.SWITCH_SORTING_ORDER, order };
}

export function switchPage(pageInfo) {
  return { type: types.SWITCH_PAGE, pageInfo };
}

export function switchSize(pageInfo) {
  return { type: types.SWITCH_SIZE, pageInfo };
}

export function loadDatasetDetailSuccess(id, data) {
  const tmp = {};
  tmp[id] = data;
  return { type: types.LOAD_DATASET_DETAIL_SUCCESS, dataset: tmp };
}

export function loadSearchDataResources() {
  const func = function func(dispatch) {
    return participatingResourcesApi.getAllParticipatingResources()
      .then((searchResults) => {
        dispatch(loadSearchFiltersSuccess(searchResults.data.primary_disease));
      })
      .catch((error) => {
        throw error;
      });
  };
  return func;
}

export function loadFromUrlQuery(searchText, filters) {
  const func = function func(dispatch) {
    const searchCriteria = {};
    searchCriteria.search_text = searchText;
    searchCriteria.filters = {};
    if (Array.isArray(filters.filterByResource) && filters.filterByResource.length > 0) {
      searchCriteria.filters.primary_disease = filters.filterByResource;
    }
    searchCriteria.pageInfo = {};
    searchCriteria.pageInfo.page = filters.page ? filters.page : 1;
    searchCriteria.pageInfo.pageSize = filters.pageSize ? filters.pageSize : 10;
    searchCriteria.sort = {};
    searchCriteria.sort.name = 'Dataset';
    searchCriteria.sort.k = 'dataset_title.sort';
    if (filters.sortOrder) {
      searchCriteria.sort.v = filters.sortOrder;
    } else {
      searchCriteria.sort.v = 'asc';
    }
    return searchApi.searchCatalog(searchCriteria)
      .then((searchResults) => {
        dispatch(loadSearchResultsSuccess(searchResults.data));
        dispatch(runFullTextSearch(searchText));
        dispatch(applyResourcesFilter(searchCriteria.filters));
        dispatch(switchPage(searchResults.data.pageInfo));
        dispatch(switchSize(searchResults.data.pageInfo));
        dispatch(switchSorting(
          { name: searchResults.data.sort.name, k: searchResults.data.sort.k },
        ));
        dispatch(switchSortingOrder(searchResults.data.sort.v));
      })
      .catch((error) => {
        throw error;
      });
  };
  return func;
}

export function startFullTextSearch(searchText) {
  const func = function func(dispatch) {
    dispatch(runFullTextSearch(searchText));
  };
  return func;
}

export function bubbleSearchTextRemoveClick() {
  const func = function func(dispatch) {
    dispatch(handleBubbleSearchTextRemove());
  };
  return func;
}

export function bubbleResourcesRemoveClick() {
  const func = function func(dispatch) {
    dispatch(handleBubbleResourcesRemove());
  };
  return func;
}

export function changeSorting(sorting) {
  const func = function func(dispatch) {
    dispatch(switchSorting(sorting));
  };
  return func;
}

export function changeSortingOrder(order) {
  const func = function func(dispatch) {
    dispatch(switchSortingOrder(order));
  };
  return func;
}

export function pageSelect(pageInfo) {
  const func = function func(dispatch) {
    dispatch(switchPage(pageInfo));
  };
  return func;
}

export function sizeSelect(pageInfo) {
  const func = function func(dispatch) {
    dispatch(switchSize({ pageSize: pageInfo.pageSize ? pageInfo.pageSize : 10 }));
  };
  return func;
}

export function loadDatasetDetail(id) {
  const func = function func(dispatch) {
    return searchApi.getDatasetById(id)
      .then((searchResults) => {
        dispatch(loadDatasetDetailSuccess(id, searchResults.data));
      })
      .catch((error) => {
        throw error;
      });
  };
  return func;
}
