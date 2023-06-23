// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
    const disabledStyle = {
        '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200]
        }
    };

    return {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: true
            },
            ...(theme.palette.mode == 'light'
                ? {
                      styleOverrides: {
                          root: {
                              fontWeight: 400
                          },
                          contained: {
                              ...disabledStyle
                          },
                          outlined: {
                              ...disabledStyle
                          }
                      }
                  }
                : {
                      styleOverrides: {
                          root: {
                              fontWeight: 400,
                              backgroundColor: '#5D5DF3',
                              color: 'white',
                              '&:hover': {
                                  backgroundColor: theme.palette.primary ? '#4b4acf' : '#25282c'
                              }
                          }
                      }
                  })
        }
    };
}
