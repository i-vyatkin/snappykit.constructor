import React from 'react';

// Components
import { Container, Title } from 'views/Editor';
import Form from './components/Form';

import styles from './Social.scss';

const Social = () => (
  <div className={styles.Root}>
    <Title title="Social" />

    <Container>
      <Form onSubmit={values => console.log() /* eslint-disable-line */} />
    </Container>
  </div>
);

export default Social;