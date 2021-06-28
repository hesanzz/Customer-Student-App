import React from 'react';
import Menu from './Menu';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

theme.typography.h3 = {
    fontSize: '60px',
    color: "purple"
};
theme.typography.h4 = {
    fontSize: '45px',
    color: "red"
};
theme.typography.h5 = {
    fontSize: '35px',
};
const textStyle = { marginBottom: '15px'}
const screenStyle = { padding: 20, margin: "200px auto" }
export default function Home() {
  return (
    <div>
      <Menu/>
      <Grid align="center" style={screenStyle}>
      <ThemeProvider theme={theme}>
        <Typography style={textStyle} variant="h3">Welcome To</Typography>
        <Typography style={textStyle} variant="h4">Customer App</Typography>
        <Typography style={textStyle} variant="h5">and</Typography>
        <Typography style={textStyle} variant="h4">Student App</Typography>
      </ThemeProvider>
      </Grid>
    </div>
  );
}
