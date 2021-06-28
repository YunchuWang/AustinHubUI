type UrlParameter = {
  query: string;
  page: string;
  orderBy: string;
};

export function readUrl(url: string): UrlParameter {
  const paramsMap = { query: '', page: '0', orderBy: 'TITLE' };
  const urlParams = url.split('?')[1].split('&');
  urlParams.forEach((urlParam) => {
    const contents = urlParam.split('=');
    if (contents && contents.length >= 1) {
      paramsMap[contents[0]] = contents.length === 2 ? contents[1] : '';
    }
  });

  return paramsMap;
}
