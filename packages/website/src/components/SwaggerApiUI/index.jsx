import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SwaggerUI from 'swagger-ui-react';
import React from 'react';

const SwaggerApiUI = ({ envVariable, placeholder }) => {
  const { siteConfig } = useDocusaurusContext();
  const apiUrl = siteConfig.customFields[envVariable] ?? placeholder;

  return <SwaggerUI url={`${apiUrl}/docs-json`} />;
};

export default SwaggerApiUI;
