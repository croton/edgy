const COUNTRY_LIST = ['FR', 'UK'];
const baseurl = 'http://localhost:8888';
const DESTINATIONS = {
  FR: `${baseurl}/fr/`,
  UK: `${baseurl}/uk/`,
  ALL: `${baseurl}/country-selector/`,
};
const OPTION = 'ous'; // name of parameter to be optionally provided on url

export default async (request, context) => {
  const url  = new URL(request.url);
  const override = filterCountry(url.searchParams.get(OPTION));
  context.log(`The url ${url} has option ${override}`);
  const countryCode = context.geo?.country?.code || 'ANY';
  const redirectTo = (COUNTRY_LIST.includes(countryCode) ? DESTINATIONS[countryCode] :
    (override ? DESTINATIONS[override.toUpperCase()] : DESTINATIONS.ALL));
  const msg = `Your country ${countryCode} or ${override || 'no override'} goes to ${redirectTo}`;

  return new Response(msg, {headers: { 'content-type': 'text/html' }});
};

function filterCountry(code) {
  if (!code) return null;
  const cocode=code.toUpperCase();
  if (COUNTRY_LIST.includes(cocode)) return cocode;
  return null;
}