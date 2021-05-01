export default function(ctx) {
    const links = new Map([
      ['/discord', 'https://discord.gg/6TCAZUD'],
    ]);

    let fullPath = ctx.route.fullPath;
    if(fullPath.endsWith('/')) fullPath = fullPath.slice(0,-1);

    if(links.has(fullPath)) {
        ctx.redirect(301, links.get(fullPath));
    }
}
