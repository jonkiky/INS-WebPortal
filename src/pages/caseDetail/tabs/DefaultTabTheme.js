const customTheme = {
  MuiTabs: {
    root: {
      borderBottom: '10px solid #40789c',
    },
  },
  MuiTab: {
    root: {
      marginTop: '15px',
      color: '#6E6E6E',
      height: '45px',
      overflow: 'hidden',
      background: '#EAEAEA',
      borderTop: '1px solid black',
      borderLeft: '1px solid black',
      borderRight: '1px solid black',
      fontWeight: '400',
      lineHeight: '18px',
      letterSpacing: '0.25px',
      marginRight: '10px',
      fontSize: '21px',
      width: '250px',
      textTransform: 'none',
      fontFamily: 'Lato',
      '&.Mui-selected': {
        fontWeight: 'bolder',
        '&.programs': {
          background: '#d6f2ea',
          color: '#10a075',
        },
        '&.projects': {
          background: '#f7d7f7',
          color: '#c92ec7',
        },
        '&.grants': {
          background: '#d6f2ea',
          color: '#10a075',
        },
        '&.publications': {
          background: '#cfedf9',
          color: '#0dafec',
        },
        '&.MuiTypography-body1': {
          color: 'red',
        },
      },
      '& span.programs_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.projects_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.grants_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
      '& span.publications_count': {
        marginLeft: '5px',
        fontSize: '17px',
      },
    },
  },
};

export { customTheme as default };
