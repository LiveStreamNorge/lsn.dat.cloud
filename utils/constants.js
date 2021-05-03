export const AVAILABLE_TEAMS = function() {
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
          value: "kaos",
        },
        {
          name: "Pepegas",
          value: "pepegas",
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
}();