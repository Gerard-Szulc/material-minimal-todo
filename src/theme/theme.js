import {createMuiTheme} from "@material-ui/core";

export const themeObject = ({prefersDarkMode}) => createMuiTheme({
    "palette": {
        "type": prefersDarkMode ? 'dark' : 'light',
    }
})
