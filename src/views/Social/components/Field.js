import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { compose, withHandlers, withState } from 'recompose';

// Components
import { Field } from 'components/Form';

// Utils
import { capitalize } from 'utils/string';

import styles from './Field.scss';

const SocialField = ({
  handleDropdownBlur,
  handleKeyDown,
  handleTriggerClick,
  isOpened,
  isPro,
  label,
  name,
  onChange,
  registerDropdown,
  value,
}) => (
  <div
    className={classNames(styles.Root, {
      [styles.RootIsFilled]: !!value,
      [styles.RootIsOpened]: !!isOpened,
      [styles.RootIsPro]: !!isPro,
    })}
  >
    <div
      className={styles.Trigger}
      onClick={handleTriggerClick}
      role="button"
      tabIndex={0}
    >
      <div
        className={classNames(
          styles.Icon,
          styles[`IconVariant${capitalize(name)}`]
        )}
      />

      <div className={styles.Info}>
        <div className={styles.Label}>
          {label}
        </div>

        <div className={styles.Value}>
          {value}
        </div>
      </div>

      {isPro ? (
        <div className={styles.Pro}>
          Pro
        </div>
      ) : (
        <div className={styles.Plus} />
      )}
    </div>

    {!isPro && (
      <div
        className={styles.Dropdown}
        onBlur={handleDropdownBlur}
        ref={registerDropdown}
        role="listbox"
        tabIndex={0}
      >
        {isOpened && (
          <input
            autoFocus
            className={styles.Input}
            name={name}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            type="text"
            value={value}
          />
        )}
      </div>
    )}
  </div>
);

SocialField.propTypes = {
  isPro: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
};

const ComposedSocialField = compose(
  withState('isBusied', 'setBusy', false),
  withState('isOpened', 'setOpen', false),
  withHandlers(() => {
    let dropdownRef;

    return {
      handleDropdownBlur: ({ setBusy, setOpen }) => (event: Object) => {
        if (!dropdownRef.contains(event.relatedTarget)) {
          setBusy(true);
          setOpen(false);

          setTimeout(() => setBusy(false), 200);
        }
      },
      handleKeyDown: ({ setOpen }) => event =>
        event.keyCode === 13 && setOpen(false),
      handleTriggerClick: ({ isBusied, isOpened, isPro, setOpen }) => () =>
        !isBusied && !isPro && setOpen(!isOpened),
      registerDropdown: () => (node: HTMLElement) => {
        dropdownRef = node;
      },
    };
  }),
)(SocialField);

export default ({ label, ...props }) => (
  <Field {...props} label={undefined}>
    <ComposedSocialField label={label} />
  </Field>
);