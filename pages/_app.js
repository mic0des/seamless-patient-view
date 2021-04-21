import '../styles/styles.css';
import { ThemeProvider } from '@material-ui/core/styles';
import muiTheme from '../styles/muiTheme';

export default function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={muiTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}