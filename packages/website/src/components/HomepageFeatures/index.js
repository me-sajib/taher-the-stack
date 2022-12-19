import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to use',
    description: (
      <>
        Proxy manager extension was
        designed from the ground up to
        be easily installed and used to
        connect your proxy up and
        running quickly.
      </>
    )
  },
  {
    title: 'One click connection',
    description: (
      <>
        Connect your browser with any
        proxy server through one click.
      </>
    )
  },
  {
    title: 'Fetch proxies from manager',
    description: (
      <>
        To retrieve all of your proxies
        from your proxy manager account,
        simply sign in.
      </>
    )
  }
];

function Feature({
  title,
  description
}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section
      className={styles.features}
    >
      <div className="container">
        <div className="row">
          {FeatureList.map(
            (props, idx) => (
              <Feature
                key={idx}
                {...props}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
