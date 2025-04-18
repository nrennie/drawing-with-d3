function abacusPlot() {
  
  const width = globalConfig.settings.width;
  const height = globalConfig.settings.width;

  // Generate data
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  const data = d3.range(config.data.n * config.data.nCol).map(i => ({
    x: (-globalConfig.settings.width + 20) / 2 + ((globalConfig.settings.width - 20) / (config.data.nCol - 1)) * (i % config.data.nCol),
    y: d3.randomUniform((-globalConfig.settings.width + 20) / 2, (globalConfig.settings.width - 20) / 2)(),
    size: d3.randomUniform(config.data.rMin, config.data.rMax)()
  }));

  const abacusGrouped = d3.groups(data, d => d.x);

   // Plot
  const chartContainer = d3.select("#abacus")
    .style('background-color', config.style.bgCol)
    .style('padding', 10 + 'px')
    .style('width', globalConfig.settings.width + 20 + 'px');

  const svg = chartContainer
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("width", "100%")
    .style("height", "auto")
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  svg.selectAll('line')
    .data(abacusGrouped)
    .enter()
    .append('line')
    .attr('x1', d => d[0])
    .attr('x2', d => d[0])
    .attr('y1', d => d3.min(d[1], p => p.y))
    .attr('y2', d => d3.max(d[1], p => p.y))
    .attr('stroke', config.style.mainCol)
    .attr('stroke-width', config.style.strokeWidth);

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.size)
    .attr('fill', config.style.mainCol)
    .attr('fill-opacity', config.style.fillOpacity);

};

window.onload = function() {
  abacusPlot()
}