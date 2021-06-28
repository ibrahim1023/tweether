import React from 'react';
import { wrapper } from '../redux/reducers/store';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(MyApp);
