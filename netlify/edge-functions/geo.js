const COUNTRY_LIST = ['NO', 'UK', 'ES'];
const baseurl = 'https://edgy-tutorial.netlify.app';
const DESTINATIONS = {
  NO: `${baseurl}/no/`,
  UK: `${baseurl}/uk/`,
  ES: `${baseurl}/es/`,
  ALL: `${baseurl}/default-page/`,
};
const OPTION = 'ous'; // name of parameter to be optionally provided on url

export default async (request, context) => {
  const url  = new URL(request.url);
  const override = filterCountry(url.searchParams.get(OPTION));
  context.log(`The url ${url} has option ${override}`);
  const countryCode = context.geo?.country?.code || 'ANY';
  const redirectTo = (COUNTRY_LIST.includes(countryCode) ? DESTINATIONS[countryCode] :
    (override ? DESTINATIONS[override.toUpperCase()] : DESTINATIONS.ALL));
  const msg=`Origin ${countryCode} ${(override ? 'overridden to '+override:'...')} goes to ${redirectTo}`;
  context.log(msg);
  return new Response(msg, {headers: { 'content-type': 'text/html' }});
};

function filterCountry(code) {
  if (!code) return null;
  const cocode=code.toUpperCase();
  if (COUNTRY_LIST.includes(cocode)) return cocode;
  return null;
}
