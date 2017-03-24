'use strict';
/**************************************/
/********** System Classes ************/
var app_name;

//Classe App
function App(_opt) {

    var opt = {
        name:       'empty_project',
        verbose:    true,
        fps:        30, 
        //global:     true,
        DOM:        true
    };
    for (var i in _opt) opt[i] = _opt[i];

    app_name = opt.name;
    this.name = opt.name;
    this.verbose = opt.verbose;
    this.fps = opt.fps;
    this.global = {};

    this.DOM = (opt.DOM) ? document.getElementById(this.name + '_DOM') : null;

    window[this.name] = {'app': this};

    this.main = this.__proto__.main.bind(this);
}

App.prototype.main = function() {
    if (this.verbose)
        console.log(this.name + ' app starting...');

    if (!!window['setup'])
        setup();
    else
        if (this.verbose)
            console.log('no setup');
};
App.prototype.draw = function() {
    if (!!window['draw']) 
        draw();
    else
        if (this.verbose)
            console.log('nothing to draw on');
};

//Classe ClassLoader
function ClassLoader(){
    window[app_name].app['loader'] = this;
    window[app_name].app['class'] = {};

    this.onload = function(){};

    this.pending = 0;
}

ClassLoader.prototype.include = function(file_path) {
    this.pending++;

    var classname = file_path.match(/([a-zA-Z0-9]*)\.js/)[1];

    var script_node = document.createElement('script');
    script_node.setAttribute('type', 'text/javascript');
    script_node.setAttribute('src', file_path);

    document.body.appendChild(script_node);

    var tm = setTimeout(check,5);

    function check() {
        if (!!window[classname]) {
            window[app_name].app.class[classname] = window[classname];
            this.loader.pending--;

            if(this.loader.pending == 0) {
                window[app_name].app.global[classname+'_loaded'] = true;
                loader.onload();
            }
        }  else {
            tm = setTimeout(check,5);
        }
    }
};



function createCanvas(w,h) {
    if (!!window[app_name].app.DOM) {
        var cnv = document.createElement('canvas');
        cnv.setAttribute('width',w);
        cnv.setAttribute('height',h);
        cnv.setAttribute('id','draw_canvas');

        window[app_name].app.DOM.appendChild(cnv);

        window[app_name].app["draw_interval"] = setInterval(app.draw, 1000/app.fps);
        
        window[app_name].app["contex"] = cnv.getContext('2d');
        return window[app_name].app["contex"];
    } else
        return null;
}

function createButton(name,text,callback) {
    if (!!window[app_name].app.DOM) {
        var btn = document.createElement('button');
        btn.setAttribute('id',name);
        btn.innerText = text;
        btn.onclick = callback;

        window[app_name].app.DOM.appendChild(btn);

        return btn;
    } else
        return null;
}

function createLabel(name,text,callback) {
    if (!!window[app_name].app.DOM) {
        var lbl = document.createElement('span');
        lbl.setAttribute('id',name);
        lbl.innerText = text;

        window[app_name].app.DOM.appendChild(lbl);

        return lbl;
    } else
        return null;
}

function createSlider(name,min,max,value,step,onchange) {
    if (!!window[app_name].app.DOM) {
        var sld = document.createElement('input');
        sld.setAttribute('type','range');
        sld.setAttribute('min',min);
        sld.setAttribute('max',max);
        sld.setAttribute('value',value);
        sld.setAttribute('step',step);
        sld.setAttribute('id',name);

        sld.onchange = onchange;

        window[app_name].app.DOM.appendChild(sld);

        return sld;
    } else
        return null;
}

function addGlobal(name, value, w_scope) {
    w_scope = (typeof w_scope !== 'undefined') ? w_scope : true;
    if (!!w_scope) window[name] = value;
    window[app_name].app.global[name] = value;
    //window[app_name].app.global = app.global;
}

function fillColor(color) {
    window[app_name].app["contex"].fillStyle = color;
}

function rect(x, y, w, h) {
    window[app_name].app["contex"].rect(x,y,w,h);
}
