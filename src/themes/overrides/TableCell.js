// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableCell(theme) {
    return {
        MuiTableCell: {
            ...(theme.palette.mode == 'light'
                ? {
                      styleOverrides: {
                          root: {
                              fontSize: '0.875rem',
                              padding: 12,
                              borderColor: theme.palette.divider
                          },
                          head: {
                              fontWeight: 600,
                              paddingTop: 20,
                              paddingBottom: 20
                          }
                      }
                  }
                : {
                      styleOverrides: {
                          root: {
                              fontSize: '0.875rem',
                              padding: 12,
                              borderColor: theme.palette.divider,
                              color: 'text.secondary'
                          },
                          head: {
                              fontWeight: 600,
                              paddingTop: 20,
                              paddingBottom: 20
                          }
                      }
                  })
        }
    };
}
