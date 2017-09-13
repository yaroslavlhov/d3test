(() => {
  "use strict";
  app.directive("pieChart", () => {
    return {
      restrict: "A",
      scope: {
        data: "="
      },
      link: (scope, element) => {
        let width,
          height,
          radius,
          pie,
          arc,
          svg,
          path;

        width = element[0].clientWidth;
        height = element[0].clientHeight;
        radius = Math.min(width, height) / 2;

        pie = d3.layout.pie()
          .value((d) => d.value)
          .sort(null);

        arc = d3.svg.arc()
          .outerRadius(radius);

        svg = d3.select(element[0])
          .append("svg")
          .attr({width: width, height: height})
          .append("g")
          .attr("transform", "translate(" + width * 0.5 + "," + height * 0.5 + ")");

        path = svg.datum(scope.data)
          .selectAll("path")
          .data(pie)
          .enter()
          .append("path")

          .attr({
            fill: (d, i) => scope.data [i].color || '#' + Math.floor(Math.random() * 16777215).toString(16),
            d: arc
          });

        scope.$watch(
          "data",
          () => {
            pie.value((d) => d.value);
            path = path.data(pie);
            path.attr("d", arc);
          },
          true
        );
      }
    };
  })
})();