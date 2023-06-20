// ==============================|| OVERRIDES - ICON BUTTON ||============================== //

export default function IconButton(theme) {
    return {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: '#25282c',
                    color: '#5d5dff',
                    '&:hover': {
                        backgroundColor: '#5d5dff',
                        color: '#ebf1f5'
                    }
                },
                sizeLarge: {
                    width: theme.spacing(5.5),
                    height: theme.spacing(5.5),
                    fontSize: '1.25rem'
                },
                sizeMedium: {
                    width: theme.spacing(4.5),
                    height: theme.spacing(4.5),
                    fontSize: '1rem'
                },
                sizeSmall: {
                    width: theme.spacing(3.75),
                    height: theme.spacing(3.75),
                    fontSize: '0.75rem'
                }
            }
        }
    };
}
