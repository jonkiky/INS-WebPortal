/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_CASE_DETAIL_DATA_QUERY, dataRoot, caseIDField, filesOfSamples,
} from '../../bento/caseDetailData';
import { fetchDataForCaseDetailDataTable } from './caseDetailState';

// const CaseDetailContainer = ({ match }) => {
//   const { loading, error, data } = useQuery(GET_CASE_DETAIL_DATA_QUERY, {
//     variables: { [caseIDField]: match.params.id },
//   });

//   if (loading) return <CircularProgress />;
//   if (error || !data || data[dataRoot][caseIDField] !== match.params.id) {
//     return (
//       <Typography variant="h5" color="error" size="sm">
//         {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
//       </Typography>
//     );
//   }

//   return <CaseDetailView data={data[dataRoot]} filesOfSamples={data[filesOfSamples]} />;
// };

class CaseDetailController extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataForCaseDetailDataTable());
  }

  render() {
    const {
      isLoading, hasError, error, isFetched, match,
    } = this.props;

    const { loading, dataError, data } = useQuery(GET_CASE_DETAIL_DATA_QUERY, {
      variables: { [caseIDField]: match.params.id },
    });

    if (loading) return <CircularProgress />;

    if (dataError || !data || data[dataRoot][caseIDField] !== match.params.id) {
      return (
        <Typography variant="h5" color="error" size="sm">
          {dataError ? `An error has occurred in loading stats component: ${dataError}` : 'Recieved wrong data'}
        </Typography>
      );
    }

    if (hasError) {
      return (
        <Typography variant="headline" color="error" size="sm">
          {error && `An error has occurred in loading case detail component: ${error}`}
        </Typography>
      );
    }

    if (isLoading) {
      return <CircularProgress />;
    }

    if (isFetched) {
      return (
        <CaseDetailView data={data[dataRoot]} filesOfSamples={data[filesOfSamples]} />
      );
    }

    return (
      <Typography variant="headline" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }
}

function mapStateToProps(state) {
  const {
    isLoading, isFetched, hasError, error,
  } = state.caseDetail;

  const { isSidebarOpened } = state.layout;
  return {
    isLoading,
    hasError,
    error,
    isFetched,
    isSidebarOpened,
  };
}

export default connect(mapStateToProps)(CaseDetailController);
