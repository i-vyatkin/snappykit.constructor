import { get } from 'lodash';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Responsive from 'react-responsive';
import { matchPath, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { compose, lifecycle, withState } from 'recompose';
import url from 'url';

// Components
import Spinner from 'components/Spinner';
import Oops from './components/Oops';

// Containers
import Header from './containers/Header';

// Entities
import { fetchWebsites } from 'entities/websites';

// Views
import Search from 'views/Search';
import Website from 'views/Website';
import Websites from 'views/Websites';

// Styles
import styles from './Main.scss';

const Main = ({ isFetching, location, match, pageId }) => (
  <Fragment>
    {isFetching ? (
      <Spinner title="Fetching websites..." />
    ) : (
      <div className={styles.Root}>
        <Responsive maxWidth={1279}>
          <Oops />
        </Responsive>

        <Responsive minWidth={1280}>
          <div className={styles.Wrapper}>
            <Header />

            <div className={styles.Container}>
              <TransitionGroup>
                <CSSTransition
                  key={pageId}
                  classNames={{
                    enter: styles.ContainerAnimateEnter,
                    enterDone: styles.ContainerAnimateEnterDone,
                    exit: styles.ContainerAnimateExit,
                    exitActive: styles.ContainerAnimateExitActive
                  }}
                  timeout={{ enter: 400, exit: 400 }}
                  unmountOnExit
                >
                  <Switch>
                    <Route
                      component={Search}
                      path={url.resolve(match.url, '/search')}
                    />
                    <Route
                      component={Website}
                      path={url.resolve(match.url, '/:websiteId')}
                    />
                    <Route
                      component={Websites}
                      path={url.resolve(match.url, '/')}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </div>
        </Responsive>
      </div>
    )}
  </Fragment>
);

const mapStateToProps = ({ views }, { location }) => {
  const match = matchPath(get(location, 'pathname'), { path: '/:pageId' });

  return {
    isFetching: get(views, 'main.isFetching'),
    pageId: get(match, 'params.pageId', 'main')
  };
};

export default compose(
  connect(mapStateToProps, { fetchWebsites }),
  withState('fixLocation', 'setFixLocation', null),
  lifecycle({
    componentDidMount() {
      this.props.fetchWebsites();
    }
  })
)(Main);
