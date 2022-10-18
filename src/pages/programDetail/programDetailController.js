/* eslint-disable max-len */
import React from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../bento/programDetailData';
import {
  GET_PROJECTS_OVERVIEW_QUERY,
} from '../../bento/dashboardTabData';

const ProgramDetailContainer = ({ match }) => {
  const { loading: programDetailsLoading, error: programDetailsError, data: programDetailsData } = useQuery(GET_PROGRAM_DETAIL_DATA_QUERY, {
    variables: { program_id: match.params.id },
  });

  const { loading: projectOverviewLoading, error: projectOverviewError, data: projectOverviewData } = useQuery(GET_PROJECTS_OVERVIEW_QUERY, {
    variables: { programs: [match.params.id], order_by: 'project_id', sort_direction: 'asc' },
  });

  const transformedData = _.cloneDeep(programDetailsData);

  if (programDetailsData) {
    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByDOCData = [...programDetailsData.projectCountInProgramByDOC].sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    let projectCountInProgramByFundedAmountData = [
      {
        group: '<$250k',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_1,
      },
      {
        group: '$250k to $499k',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_2,
      },
      {
        group: '$500k to $749k',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_3,
      },
      {
        group: '$750k to $999k',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_4,
      },
      {
        group: '>=$1M',
        subjects: programDetailsData.projectCountInProgramByFundedAmount[0].funded_amount_5,
      },
    ];

    // eslint-disable-next-line max-len
    projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    // eslint-disable-next-line max-len
    transformedData.projectCountInProgramByFundedAmountData = projectCountInProgramByFundedAmountData;
  }

  if (programDetailsLoading || projectOverviewLoading) return <CircularProgress />;
  if (programDetailsError || projectOverviewError || !programDetailsData || !projectOverviewData || programDetailsData.programDetail.program_id !== match.params.id) {
    return (
      <Typography variant="headline" color="error" size="sm">
        {programDetailsError ? `An error has occurred in loading stats component: ${programDetailsError}` : projectOverviewError ? `An error has occurred in loading stats component: ${projectOverviewError}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return <ProgramView data={[transformedData, projectOverviewData]} />;
};

export default ProgramDetailContainer;
