WAF.define('ChartJS', ['waf-core/widget'], function(widget) {

    var ChartJS = widget.create('ChartJS', {
    	title: widget.property({
            type: 'string',
            defaultValue: 'chart title'
        }),
        subtitle: widget.property({
            type: 'string',
            defaultValue: 'chart sub-title'
        }),
        chartType: widget.property({
            type: 'enum',
            values: {
                pie: 'pie',
                radar: 'radar',
                line: 'line'
            },
            defaultValue: 'pie'
        }),
        dataSeries: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'label'
            }, {
                name: 'value1'
            }, {
                name: 'value2'
            }]
        }),
        verticalLines: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        horizontalLines: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        track: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        explode: widget.property({
            type: 'integer',
            defaultValue: 6
        }),
        init: function() {
            var $node = this.node;
            var dataSeries = this.dataSeries();
            
            if(typeof window.Designer!='undefined'){
            	
            this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            
            }
            this.title.onChange(function() {
               
               if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node, this.title(),this.subtitle(),elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
               } 
            });
            
            this.subtitle.onChange(function() {
               
               if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
               } 
            });
            
            
            this.chartType.onChange(function() {
                
                if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
            		
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null)
                this.update(this.chartType(),$node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                
                });
               } 
            });
            this.track.onChange(function() {
               
               if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
               } 
            });
            this.verticalLines.onChange(function() {
            	
            	if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
                
            }
            
            }); 
            this.horizontalLines.onChange(function() {
                
                if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
            }
            });
            this.explode.onChange(function() {
                
                if(typeof window.Designer!='undefined'){
            	this.render($node,this.title(),this.subtitle(),this.verticalLines(), this.horizontalLines(),this.track(),this.explode());
            	}else{
                this.dataSeries.getCollection(function(elements) {
                if(dataSeries.getCurrentElement()!=null && this.chartType()=='pie')
                this.updatepie($node,this.title(),this.subtitle(), elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode(),dataSeries.getCurrentElement().label.value);
                });
            }
            });
            
            
            if(typeof window.Designer=='undefined'){
            var x=this;
            dataSeries.addListener("onCurrentElementChange", function (event) {
            if(dataSeries.ID != null && x.chartType()=='pie'){
                x.dataSeries.getCollection(function(elements) {
                x.updatepie($node, this.title(),this.subtitle(),elements, x.verticalLines(), x.horizontalLines(), x.track(),this.explode(),dataSeries.label);
                
                });            
            }
            });
            }
            
           /* $node.attrchange({
            callback: function(e) {
		
		    alert('ee');
	        }
            
            });*/
            //this.items.getCollection(function(elements) { alert(elements.length)});
            /*this.items.addListener(function(event){
        if(event.eventKind === 'onAttributeChange') //only triggers this case
        alert("Are you sure you want to change this value?");
    });*/
           
            
            this.dataSeries.onPageChange(function(elements) {
            	//debugger;
                if (!elements.length) {
                	$node.innerHTML = ''; 
                	return;
                }
                this.update(this.chartType(),$node, this.title(),this.subtitle(),elements, this.verticalLines(), this.horizontalLines(), this.track(),this.explode());
            });
            
            /*this.items.onCurrentElementChange( function (event){
             //alert('t');
             });*/
        },
        render: function(container,title,subtitle,vl, hl, tr,exp) {
            
             switch(this.chartType()) {
             case 'pie' : 
                
                    var
                    d1 = [[0, 4]],
                    d2 = [[0, 3]],
                    d3 = [[0, 1.03]],
                    d4 = [[0, 3.5]],
                    datas = [{data: d1,label: 'Comedy'},{data: d2,label: 'Action'}, {data: d3,label: 'Romance',pie: {explode: exp + 50}}, {data: d4,label: 'Drama'}],
                    options = {HtmlText: false,grid: {verticalLines: vl,horizontalLines: hl},xaxis: {showLabels: false},yaxis: {showLabels: false},pie: {show: true,explode: exp},mouse: {track: tr},legend: {position: 'se',backgroundColor: '#D2E8FF'},title : title ,subtitle : subtitle};
                    graph;

                    graph = Flotr.draw(container,datas ,options );
                    break;

            
            case 'radar' : 
               
                    var
                    s1 = {label: 'Actual',data: [[0, 3],[1, 8],[2, 5],[3, 5],[4, 3],[5, 9]]},
                    s2 = {label: 'Target',data: [[0, 8],[1, 7],[2, 8], [3, 2],[4, 4],[5, 7]]},
                    datas = [s1, s2],
                    ticks = [[0, "Statutory"], [1, "External"], [2, "Videos"],[3, "Yippy"],[4, "Management"],[5, "oops"] ],
                    options = {radar: { show: true},grid: { circular: true, minorHorizontalLines: true},yaxis: {min: 0,max: 10, minorTickFreq: 2 }, xaxis: { ticks: ticks }, mouse: {  track: true},title : title ,subtitle : subtitle},
                    graph;
                    graph = Flotr.draw(container,datas ,options );
                    break;
            
            case 'line' : 
                    var
                    d1 = [[0, 3], [4, 8], [8, 5], [9, 13]], // First data series
                    d2 = [],                                // Second data series
                    i, graph;

                    // Generate first data set
                    for (i = 0; i < 14; i += 0.5) {
                         d2.push([i, Math.sin(i)]);
                    }

                    // Draw Graph
                    graph = Flotr.draw(container, [ d1, d2 ], {
                    xaxis: {
                    minorTickFreq: 4
                    }, 
                    grid: {
                    minorVerticalLines: true
                    },
                    title : title ,
                    subtitle : subtitle
                    });
             
                    break;
            
            default :
            break;
        }
        //}   else {this.items.mapElement( function (element) {alert(elements.length); });}
        }, 
        updatepie: function(container, title,subtitle, elements, vl, hl, tr,exp,explode) {
            var datas = [];
            
            var i = 0;
            while (i < elements.length) {
            	if(elements[i].label==explode){
            	datas.push({
                    data: [
                        [0, elements[i].value1]
                    ],
                    label: elements[i].label,
                    pie : {
                     explode : exp + 50
                    }
                });
                } else {
                datas.push({
                    data: [
                        [0, elements[i].value1]
                    ],
                    label: elements[i].label
                });
                }
                i++;
            }
            Flotr.draw(container, datas, {
                HtmlText: false,
                grid: {
                    verticalLines: vl,
                    horizontalLines: hl
                },
                xaxis: {
                    showLabels: false
                },
                yaxis: {
                    showLabels: false
                },
                pie: {
                    show: true,
                    explode: exp
                },
                mouse: {
                    track: tr
                },
                legend: {
                    position: 'se',
                    backgroundColor: '#D2E8FF'
                },
                title : title ,
                subtitle : subtitle
            });

        },
        updateradar: function(container,title,subtitle, elements) {
            //(function basic_radar(container) {
            // Fill series s1 and s2.
            // var
            //s1 = { label : 'Actual', data : [[0, 3], [1, 8], [2, 5], [3, 5], [4, 3], [5, 9]] },
            //s2 = { label : 'Target', data : [[0, 8], [1, 7], [2, 8], [3, 2], [4, 4], [5, 7]] },
            //graph, ticks;
            var datas1 = [];
            var datas2 = [];
            var d1
            var ticks = [];
            var i = 0;
            var max = 0;
            while (i < elements.length) {
                if (elements[i].value1 > max) max = elements[i].value1;
                if (elements[i].value2 > max) max = elements[i].value2;
                datas1.push([i, elements[i].value1]);
                datas2.push([i, elements[i].value2]);
                ticks.push([i, elements[i].label]);
                i++;
            }


            // Draw the graph.
            graph = Flotr.draw(container, [{
                label: 'value 1',
                data: datas1
            },{
                label: 'value 2',
                data: datas2
            }], {
                radar: {
                    show: true
                },
                grid: {
                    circular: true,
                    minorHorizontalLines: true
                },
                yaxis: {
                    min: 0,
                    max: max,
                    minorTickFreq: 2
                },
                xaxis: {
                    ticks: ticks
                },
                mouse: {
                    track: true
                },
                title : title ,
                subtitle : subtitle
            });
            //})(container);
        },
        updateline: function(container, title,subtitle,elements){
        var datas1 = [];
        var datas2 = [];
        var ticks = [];
        var i=0;
        while (i < elements.length) {
                
                datas1.push([i, elements[i].value1]);
                datas2.push([i, elements[i].value2]);
                ticks.push([i, elements[i].label]);
                i++;
            }
            graph = Flotr.draw(container, [datas1,datas2], {
            xaxis: {
            minorTickFreq: 4,
            ticks: ticks
            }, 
            grid: {
            minorVerticalLines: true
            },
            title : title ,
            subtitle : subtitle
            });
            
        },
        update : function(type,container, title,subtitle, elements, vl, hl, tr,exp,explode) {
            switch(type){
            case 'pie':  
            this.updatepie(container,title,subtitle, elements, vl, hl, tr,exp,explode);
            break;
            case 'radar':
            this.updateradar(container,title,subtitle, elements);
            break;
            case 'line' :
            this.updateline(container,title,subtitle, elements);
            break;
            default :
            break;
            }
        }

        //        ,
        //        /* Create a property */
        //        test: widget.property({
        //            onChange: function(newValue) {
        //                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
        //            }
        //        })
    });

    //    /* Map the custom event above to the DOM click event */
    //    ChartJS.mapDomEvents({
    //        'click': 'action'
    //    });
    return ChartJS;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */