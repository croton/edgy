export default async (request, context) => {
  return new Response(`Hello from ze edge of ze vorld!`, {
    headers: { 'content-type': 'text/html' }
  });
};