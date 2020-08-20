//Read data from jason
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
    var data = importedData;
    var metadata = data.metadata;
    var names = data.names;
    console.log(data)

    // First create the option element that we use later to create the dropdwn menu
    var selName = document.getElementById('selDataset');
    for (var i = 0; i < names.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = names[i];
        opt.value = names[i];
        selName.appendChild(opt);
    }
    //In order to incorporate default values we make an INT fucntion with subjet 940
    function init() {
        var newName = "940";
        console.log(newName);
        for (var i = 0; i < samples.length; i++) {
            var filteredData = samples.filter(samples => samples.id == newName);
            var filteredMetaData = metadata.filter(metadata => metadata.id == newName);
        }
        console.log(filteredMetaData)

        var filteredData0 = filteredData[0]
        console.log(filteredData0)

        var filterIds = filteredData[0].id;
        var filterOtu_ids = filteredData[0].otu_ids;
        var filterSample_values = filteredData[0].sample_values;
        var filterOtu_labels = filteredData[0].otu_labels;

        var x = filterSample_values.slice(0, 10).reverse()
        var y = filterOtu_ids.slice(0, 10).reverse()
        console.log(x)
        console.log(y)

        // Create the Trace
        var trace1 = {
            x: x,
            y: y,
            type: "bar",
            orientation: 'h'
        };
        // Create the data array for the plot
        var data1 = [trace1];

        // Define the plot layout
        var layout = {
            title: "Top 10 OTU per Subject",
            height: 600,
            width: 400,
            xaxis: {
                title: "Sample values",
            },
            yaxis: {
                title: "OTU ID",
                type: 'category'
            }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar", data1, layout);

        // Bubble Chart
        var trace2 = {
            x: filterOtu_ids,
            y: filterSample_values,
            mode: 'markers',
            text: filterOtu_labels['text'],
            marker: {
                size: filterSample_values,
                color: filterOtu_ids,
                colorscale: "Earth"
            }
        };

        var data2 = [trace2];

        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', data2, layout);
        // Insert demographic info
        var filteredMetaData0 = filteredMetaData[0];
        var age = filteredMetaData0.age;
        var bbtype = filteredMetaData0.bbtype;
        var ethnicity = filteredMetaData0.ethnicity;
        var gender = filteredMetaData0.gender;
        var id = filteredMetaData0.id;
        var location = filteredMetaData0.location;
        var wfreq = filteredMetaData0.wfreq;

        console.log(wfreq)

        var myList = new Array();
        myList.push(`id: ${id}`);
        myList.push(`ethnicity: ${ethnicity}`);
        myList.push(`gender: ${gender}`);
        myList.push(`age: ${age}`);
        myList.push(`location: ${location}`);
        myList.push(`wfreq: ${wfreq}`);
        console.log(myList)

        d3.select("#sample-metadata").html("");

        d3.select("#sample-metadata")
            .append("ul")
            .selectAll("li")
            .data(myList)
            .enter()
            .append("li")
            .text((function(d) { return d }))
            .classed("item", true)
            .attr("id", "list")

        // Enter a speed between 0 and 180
        var level = parseFloat(wfreq) * 20;
        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x3 = radius * Math.cos(radians);
        var y3 = radius * Math.sin(radians);
        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
            pathX = String(x3),
            space = ' ',
            pathY = String(y3),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);
        var data3 = [{
                type: 'scatter',
                x3: [0],
                y3: [0],
                marker: { size: 28, color: '850000' },
                showlegend: false,
                name: 'speed',
                text: level,
                hoverinfo: 'text+name'
            },
            {
                values: [
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50
                ],
                rotation: 90,
                text: ["8-9",
                    "7-8",
                    "6-7",
                    "5-6",
                    "4-5",
                    "3-4",
                    "2-3",
                    "1-2",
                    "0-1",
                    ""
                ],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ["rgba(128, 182, 134, 1)",
                        "rgba(133, 189, 140, 1)",
                        "rgba(135, 192, 128, 1)",
                        "rgba(183, 205, 140, 1)",
                        "rgba(214, 228, 149, 1)",
                        "rgba(229, 233, 177, 1)",
                        "rgba(233, 231, 201, 1)",
                        "rgba(244, 241, 229, 1)",
                        "rgba(247, 243, 236, 1)",
                        "rgba(255, 255, 255, 0)"
                    ]
                },
                labels: [
                    "8-9",
                    "7-8",
                    "6-7",
                    "5-6",
                    "4-5",
                    "3-4",
                    "2-3",
                    "1-2",
                    "0-1",
                    ""
                ],
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }
        ];
        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week',
            height: 600,
            width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        Plotly.newPlot('gauge', data3, layout);
    }

    //After the default option we put the dropdown menu
    var dropdownName = d3.select("#selDataset");

    var samples = data.samples;
    console.log(samples);

    for (x in samples) {
        var ids = samples[x].id;
    }

    var idss = samples[0].otu_ids;
    console.log(idss)
        //Incorporate an event listener so everytime the user selects a diferent option the information changes

    dropdownName.on("change", function() {

        var newName = d3.event.target.value;
        console.log(newName);
        for (var i = 0; i < samples.length; i++) {
            var filteredData = samples.filter(samples => samples.id == newName);
            var filteredMetaData = metadata.filter(metadata => metadata.id == newName);
        }
        console.log(filteredMetaData)

        var filteredData0 = filteredData[0]
        console.log(filteredData0)

        var filterIds = filteredData[0].id;
        var filterOtu_ids = filteredData[0].otu_ids;
        var filterSample_values = filteredData[0].sample_values;
        var filterOtu_labels = filteredData[0].otu_labels;

        var x = filterSample_values.slice(0, 10).reverse()
        var y = filterOtu_ids.slice(0, 10).reverse()
        console.log(x)
        console.log(y)

        // Create the Trace for the first chart
        var trace1 = {
            x: x,
            y: y,
            type: "bar",
            orientation: 'h'
        };
        // Create the data array for the plot
        var data1 = [trace1];

        // Define the plot layout
        var layout = {
            title: "Top 10 OTU per Subject",
            height: 600,
            width: 400,
            xaxis: {
                title: "Sample values",
            },
            yaxis: {
                title: "OTU ID",
                type: 'category'
            }
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data1, layout);

        // Bubble Chart
        var trace2 = {
            x: filterOtu_ids,
            y: filterSample_values,
            mode: 'markers',
            text: filterOtu_labels['text'],
            marker: {
                size: filterSample_values,
                color: filterOtu_ids,
                colorscale: "Earth"
            }
        };

        var data2 = [trace2];

        var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
        };

        Plotly.newPlot('bubble', data2, layout);

        // Insert demographic info
        var filteredMetaData0 = filteredMetaData[0];
        var age = filteredMetaData0.age;
        var bbtype = filteredMetaData0.bbtype;
        var ethnicity = filteredMetaData0.ethnicity;
        var gender = filteredMetaData0.gender;
        var id = filteredMetaData0.id;
        var location = filteredMetaData0.location;
        var wfreq = filteredMetaData0.wfreq;

        console.log(wfreq)

        var myList = new Array();
        myList.push(`id: ${id}`);
        myList.push(`ethnicity: ${ethnicity}`);
        myList.push(`gender: ${gender}`);
        myList.push(`age: ${age}`);
        myList.push(`location: ${location}`);
        myList.push(`wfreq: ${wfreq}`);
        console.log(myList)

        d3.select("#sample-metadata").html("");

        d3.select("#sample-metadata")
            .append("ul")
            .selectAll("li")
            .data(myList)
            .enter()
            .append("li")
            .text((function(d) { return d }))
            .classed("item", true)
            .attr("id", "list")

        // Set up for the value of the marker
        var level = parseFloat(wfreq) * 20;

        // Trig to calc marker point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x3 = radius * Math.cos(radians);
        var y3 = radius * Math.sin(radians);

        // Path: creating the triangle shape
        var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
            pathX = String(x3),
            space = ' ',
            pathY = String(y3),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX, space, pathY, pathEnd);
        // Setting data to plot gauge chart
        var data3 = [{
                type: 'scatter',
                x3: [0],
                y3: [0],
                marker: { size: 28, color: '850000' },
                showlegend: false,
                name: 'speed',
                text: level,
                hoverinfo: 'text+name'
            },
            {
                values: [
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50 / 9,
                    50
                ],
                rotation: 90,
                text: ["8-9",
                    "7-8",
                    "6-7",
                    "5-6",
                    "4-5",
                    "3-4",
                    "2-3",
                    "1-2",
                    "0-1",
                    ""
                ],
                textinfo: 'text',
                textposition: 'inside',
                marker: {
                    colors: ["rgba(128, 182, 134, 1)",
                        "rgba(133, 189, 140, 1)",
                        "rgba(135, 192, 128, 1)",
                        "rgba(183, 205, 140, 1)",
                        "rgba(214, 228, 149, 1)",
                        "rgba(229, 233, 177, 1)",
                        "rgba(233, 231, 201, 1)",
                        "rgba(244, 241, 229, 1)",
                        "rgba(247, 243, 236, 1)",
                        "rgba(255, 255, 255, 0)"
                    ]
                },
                labels: [
                    "8-9",
                    "7-8",
                    "6-7",
                    "5-6",
                    "4-5",
                    "3-4",
                    "2-3",
                    "1-2",
                    "0-1",
                    ""
                ],
                hoverinfo: 'label',
                hole: .5,
                type: 'pie',
                showlegend: false
            }
        ];
        var layout = {
            shapes: [{
                type: 'path',
                path: path,
                fillcolor: '850000',
                line: {
                    color: '850000'
                }
            }],
            title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week',
            height: 600,
            width: 500,
            xaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            },
            yaxis: {
                zeroline: false,
                showticklabels: false,
                showgrid: false,
                range: [-1, 1]
            }
        };

        Plotly.newPlot('gauge', data3, layout);
    });
    init();
});