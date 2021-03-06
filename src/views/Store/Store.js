import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { matchPath } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';

// Components
import { Container, Title } from 'views/Editor';

// Containers
import Form from './containers/Form';

// Entities
import { updateWebsiteSection } from 'entities/websites/actions';
import { getSectionById } from 'entities/websites/selector';

// Template
import { STORE } from 'template';

// Styles
import styles from './Store.scss';

const Store = ({ handleChange, id, initialValues, websiteId }) => (
  <div className={styles.Root}>
    <Title title="Store" />

    <Container>
      <Form
        key={id}
        form={`storeForm_${id}`}
        initialValues={initialValues}
        onChange={handleChange}
        websiteId={websiteId}
      />
    </Container>
  </div>
);

const mapStateToProps = (state: Object, { location }): Object => {
  const match = matchPath(get(location, 'pathname'), {
    path: '/:websiteId/editor/:sectionId/:id?'
  });

  const id = get(match, 'params.id');
  const websiteId = get(match, 'params.websiteId');
  const initialValues = getSectionById(state, websiteId, id || STORE);

  return { id, initialValues, websiteId };
};

export default compose(
  connect(mapStateToProps, { updateWebsiteSection }),
  withHandlers({
    handleChange: ({ id, updateWebsiteSection, websiteId }): func => (
      value: Object
    ): void => updateWebsiteSection(websiteId, id || STORE, value)
  })
)(Store);
