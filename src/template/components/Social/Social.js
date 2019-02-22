import classNames from 'classnames';
import { keys } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// Components
import Item from './components/Item';
import Link from '../Link';

// Entities
import { SOCIAL, VIEW } from 'entities/template/constants';

// Template
import {
  getSectionById,
  TemplateContext
} from 'template';

// Styles
import styles from './Social.scss';

const TemplateSocial = ({
  className,
  id,
}) => (
  <TemplateContext.Consumer>
    {({ data, isEditor, view, websiteId }) => {
      const { color, items } = getSectionById(data, id || SOCIAL);

      const rootClassNames = classNames(className, styles.Root, {
        [styles.RootViewDesktop]: view === VIEW.DESKTOP,
        [styles.RootViewMobile]: view === VIEW.MOBILE,
        [styles.RootViewTablet]: view === VIEW.TABLET,
      });

      return (
        <div className={rootClassNames}>
          <Link to={`/${websiteId}/editor/social${(id && `/${id}`) || ''}`}>
            <div className={styles.Container}>
              {keys(items).map((id: string): func => !!items[id] && (
                <Item {...items[id]}
                  color={color}
                  isEditor={isEditor}
                  key={id}
                  variant={id}
                />
              ))}
            </div>
          </Link>
        </div>
      );
    }}
  </TemplateContext.Consumer>
);

TemplateSocial.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

export default TemplateSocial;