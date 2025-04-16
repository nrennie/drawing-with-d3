function nexusPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  // Generate data
  const data = d3.range(config.data.n).map(() => ({
    x: d3.randomUniform(-globalConfig.settings.width/2, globalConfig.settings.width/2)(),
    y: d3.randomUniform(-globalConfig.settings.width/2, globalConfig.settings.width/2)(),
    size: d3.randomUniform(config.data.rmin, config.data.rmax)(),
    fillCol: d3.randomUniform(0, 1)(),
    fillOpacity: d3.randomUniform(config.data.fillOpacityMin, config.data.fillOpacityMax)()
  }));

  let colour = d3.scaleOrdinal(config.style.colPalette);

  // Plot
  const chartContainer = d3.select("#nexus")
    .style('background-color', config.style.bgCol)
    .style('padding', 10 + 'px')
    .style('margin', 10 + 'px')
    .style('width', globalConfig.settings.width + 20 + 'px');

  const svg = chartContainer
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.size)
    .attr('fill', d => colour(d.fillCol))
    .attr('fill-opacity', d => d.fillOpacity);

};


