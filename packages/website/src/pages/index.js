import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';
import HomepageFeatures from '../components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className="row padding-horiz--md">
          <div className="col col--7">
            <div className={clsx(styles.relative, 'row')}>
              <div className="col">
                <h1 className={styles.tagline}>
                  The extension <br /> makes it easy to <br /> use
                  proxies
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h2>
                  It helps you to manage your proxies with ease.
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className={styles.heroButtons}>
                  <Link
                    to="docs/introduction"
                    className={styles.getStarted}
                  >
                    Get Started
                  </Link>
                  <iframe
                    src="https://ghbtns.com/github-btn.html?user=SoftwareSheba&repo=proxy-manager-extension&type=star&count=true&size=large"
                    frameBorder="0"
                    scrolling="0"
                    width="170"
                    height="30"
                    title="GitHub"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(styles.relative, 'col', 'col--5')}
          ></div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main className={styles.features}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
