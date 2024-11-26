export default async (request, context) => {
  const url  = new URL(request.url);
  const urlmethod = url.searchParams.get('method');
  context.log(`The url ${url} has method ${urlmethod}`);
  if (urlmethod!=='transform') {
    context.log('Missing "transform" within url method:', urlmethod);
    return;
  }
  
  // Fetch hello-template.html whose filestem "hello-template" had been configured
  // as the path for this edge fn.
  const resp = await context.next();
  const page = await resp.text();
  const regx = /LOCATION_UNKNOWN/i;
  const yourloc = `${context.geo.city}, ${context.geo.country.name}`;
  const updatedPage = page.replace(regx, yourloc);

  return new Response(updatedPage, resp);
};