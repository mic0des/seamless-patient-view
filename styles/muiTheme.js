import { createMuiTheme } from '@material-ui/core/styles' 

const theme = createMuiTheme({
    breakpoints: {
        keys: ['xxxs', 'xxs', 'xs', 'sm', 'md', 'lg' , 'xl'],
        values: {
            xxxs: 0,
            xxs: 366,
            xs: 400,
            smxs: 440,
            sm: 600,
            mdsm: 875,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    }
})

export default theme 