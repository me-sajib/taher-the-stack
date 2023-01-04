const resultDownloader = (
  result: string,
  fileName: string,
  type = 'octet-stream'
) => {
  const blob: Blob = new Blob([result], { type });
  const href: string = URL.createObjectURL(blob);

  const anchorElement: HTMLAnchorElement = Object.assign(
    document.createElement('a'),
    {
      href,
      download: fileName
    }
  );

  anchorElement.click();
  URL.revokeObjectURL(href);
};

export default resultDownloader;
