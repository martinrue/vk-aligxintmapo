const map = (() => {
  const setDimensions = (selector, width) => {
    const ratio = 2.15;
    const height = Math.floor(width / ratio);

    const element = document.querySelector(`${selector} svg`);
    element.setAttribute("width", `${width}`);
    element.setAttribute("height", `${height}`);

    return {
      width: width,
      height: height,
    };
  };

  const render = (selector, width, data, onSelect) => {
    const showSelection = (country) => {
      if (!country) {
        onSelect(null);
        return;
      }

      const total = data.countries[country] || 0;
      onSelect({ country, total });
    };

    return new Promise((resolve, reject) => {
      const dimensions = setDimensions(selector, width);

      d3.queue()
        .defer(d3.json, "map-data/world-110m.json")
        .defer(d3.csv, "map-data/country-names.csv")
        .await((err, world, names) => {
          if (err) {
            return reject({
              err: err,
              msg: "Io fuŝiĝis dum ni ŝargis la map-datumon.",
            });
          }

          const countries = topojson
            .feature(world, world.objects.countries)
            .features.filter((d) => {
              return names.some((n) => {
                if (d.id === n.id) {
                  const lando = landoj[n["alpha-2"]];

                  if (lando) {
                    d.name = lando.name;
                    return true;
                  }

                  return false;
                }
              });
            });

          const projection = d3
            .geoNaturalEarth1()
            .fitSize(
              [dimensions.width, dimensions.height],
              topojson.feature(world, world.objects.countries)
            );

          d3.select(`${selector} svg > *`).remove();

          const path = d3.geoPath().projection(projection);
          const svg = d3.select(`${selector} svg`).append("g");

          svg
            .selectAll("path")
            .data(countries)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "#FFF")
            .attr("stroke-width", 1)
            .attr("fill", (d) => {
              const entry = data.countries[d.name];
              return entry ? "#48903C" : "#DDD";
            })
            .on("mouseover", function (d) {
              const entry = data.countries[d.name];
              d3.select(this).attr("fill", entry ? "#5DA551" : "#DDD");
              showSelection(d.name);
            })
            .on("mouseout", function (d) {
              const entry = data.countries[d.name];
              d3.select(this).attr("fill", entry ? "#48903C" : "#DDD");
              showSelection();
            })
            .on("click", function (d) {
              showSelection(d.name);
            });

          resolve();
        });
    });
  };

  return {
    render,
  };
})();
