import React from 'react';
import Helmet from 'react-helmet';

import {Greeting} from '../greeting';
import styles from './styles.css';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Hops Demo</title>
      </Helmet>
      <Greeting className={styles.headline} />
    </div>
  );
}
