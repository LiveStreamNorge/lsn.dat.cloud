export const AVAILABLE_TEAMS = (function () {
  return [
    {
      name: "Gutta",
      value: "gutta",
      image: "/teams/gutta.png",
    },
    {
      name: "MSI Gaming",
      value: "MSI Gaming",
    },
    {
      name: "Sensation",
      value: "sensation",
    },
    {
      name: "LiveStreamNorge",
      value: "livestreamnorge",
    },
    {
      name: "KAOS",
      value: "KAOS",
    },
    {
      name: "Pepegas",
      value: "pepegas",
    },
    {
      name: "Fnatic Network",
      value: "Fnatic Network",
    },
    {
      name: "Twisted8",
      value: "Twisted8",
    },
    {
      name: "Ambush Esport",
      value: "Ambush Esport",
    },
  ].sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
})();
