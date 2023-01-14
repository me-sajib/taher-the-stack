import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to use',
    description: (
      <>
        SoftwareSheba Stack was designed from the ground up to be
        easily installed and used to running quickly.
      </>
    )
  },
  {
    title: 'Proxy service',
    description: (
      <>
        Mange and use proxies through extension & dashboard. It
        provides designated API to manager proxies.
      </>
    )
  },
  {
    title: 'Scraping service',
    description: (
      <>
        Scrape content from any website all over the world through api
        & chrome extension
      </>
    )
  }
];

function Feature({ title, description }) {
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
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
