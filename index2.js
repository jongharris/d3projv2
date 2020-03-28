//margins and radius
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 1000 - margin.right - margin.left,
    height = 1000 - margin.top - margin.bottom,
    radius = width/2;

var color = d3.scaleOrdinal()
    .range(["#FFC422","#E4012D","#8B2942","#A4A9AD", "#328261","#F47D30","#006D81","#00529B"]);

//Define svg

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate (" + width/2 + "," + height/2 +")");

//import the data

d3.csv("data2.csv").then(function(data) {
    data.forEach(function(d) {
        d.points = +d.points;
        d.team = d.team;
        d.pointsE = +d.pointsE;
        d.PDO = +d.PDO;
        d.GF = +d.GF;
        d.xGF = +d.xGF;
        d.SeasonResult = +d.SeasonResult;
    })

    let team1 = data[0].team;
    let team2 = data[1].team;
    let team3 = data[2].team;
    let team4 = data[3].team;
    let team5 = data[4].team;
    let team6 = data[5].team;
    let team7 = data[6].team;
    let team8 = data[7].team;
    let index = 0;
    for (let key in data[0]) {
        if (key != "team") {
            let temp = [{team: team1, [key]: data[0][key]}, {team: team2, [key]: data[1][key]},
                {team: team3, [key]: data[2][key]},
                {team: team4, [key]: data[3][key]},
                {team: team5, [key]: data[4][key]},
                {team: team6, [key]: data[5][key]},
                {team: team7, [key]: data[6][key]},
                {team: team8, [key]: data[7][key]}
            ];
            pieCharts(temp, index, key)
            index++;
        } else if (key == "team") {
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", 200)
                .attr('y', -340)
                .text(data[0][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", 460)
                .attr('y', -125)
                .text(data[1][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", 460)
                .attr('y', 150)
                .text(data[2][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", 275)
                .attr('y', 350)
                .text(data[3][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", -130)
                .attr('y', 350)
                .text(data[4][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", -320)
                .attr('y', 175)
                .text(data[5][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", -345)
                .attr('y', -110)
                .text(data[6][key]);
            svg.append("text")
                .attr("class", "team one")
                .attr("text-anchor", "end")
                .attr("x", -115)
                .attr('y', -340)
                .text(data[7][key]);

        }
    }

})

//Function to draw the pie charts

var pieCharts = function(data, index, key) {
    //actually create the pie charts
    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d[key];
        })

    //Define the arcs, this will define the inner and outer radius of each donut/pie
    var arc =  d3.arc()
        .outerRadius(((index + 1) * 60) - 23)
        .innerRadius(index * 60)
        .cornerRadius(10);

    //Enter and append the pies
    var g = svg.selectAll(".arc" + index)
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc" + index);

    g.append("path")
        .attr("d", arc)
        .attr("transform", function(path) {
            // console.log(path);
            middleAngle = -Math.PI/2 + (path.startAngle+path.endAngle)/2;
            dx = 3 * Math.cos(middleAngle);
            dy = 3 * Math.sin(middleAngle);
            // console.log("dx, dy: "+ dx +", "+dy);
            return "translate("+dx+", "+dy+")";
        })
        .style("fill", function(d) {return color(d.data.team);})

    //need to find a better way to center the text along a horizontal line instead of this.
    g.append("text")
        .attr("transform", function(d) {
            if (d.data[key] == 1 && key == "SeasonResult") {
                return "translate(" + arc.centroid(d) + ") translate(0, -17)";
            } else {
                return "translate(" + arc.centroid(d) + ")";
            }
        })
        .attr("dy", ".35em").style("text-anchor", "middle")
        .text(function(d) {
            if (d.data[key] != 0)
                return d.data[key];
            else
                return;
        });

    g.append("text")
        .attr("transform", function(d) {
            if (d.data[key] == 1 && key == "SeasonResult") {
                return "translate(" + arc.centroid(d) + ") translate(0, -62)";
            } else if (key == "points") {
                return "translate(" + arc.centroid(d) + ") translate(30, -40)"
            } else if (key == "pointsE") {
                return "translate(" + arc.centroid(d) + ") translate(50, -43)"
            } else if (key == "PDO") {
                return "translate(" + arc.centroid(d) + ") translate(75, -48)"
            } else if (key == "GF") {
                return "translate(" + arc.centroid(d) + ") translate(100, -53)"
            } else {
                return "translate(" + arc.centroid(d) + ") translate(125, -60)"

            }
        })
        .attr("dy", ".35em").style("text-anchor", "middle")
        .text(function(d) {
            if ((d.data[key] !=0 &&  d.data.team == "St. Louis Blues")) {
                return key
            } else if (d.data[key] !=0 && key == "SeasonResult" && d.data.team == "St. Louis Blues")
                return key;
            else
                return;
        })
}

