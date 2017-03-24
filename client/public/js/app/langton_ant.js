'';
/********* Globales et config *********/

var app = new App({
    name:   'langton_ant',
    fps:    5
});
var loader = new ClassLoader(app.name);

//loader
loader.onload = app.main;

loader.include('js/app/class/Ant.js');
loader.include('js/app/class/AntHill.js');

/**************************************/
/**************** App *****************/

function setup() {
// dimensions et échelle
    addGlobal('w', 500);
    addGlobal('h', 500);
    addGlobal('scale', 5);
    var size_x = w/scale;
    var size_y = h/scale;

// affichage
    app.fps = 5;
    addGlobal('nb_iter', 1);

// grille
    var data = [];
    for (var i = 0; i < size_x; i++)
        data.push((new Array(size_y)).fill(1));

//Fourmis et fourmillières
    addGlobal('ant', new app.class.Ant(size_x / 2, size_y / 2, 1));
    addGlobal('anthill',  new app.class.AntHill(true, [{t: 0, v: 'left'},{t: 1, v: 'right'}]));

    anthill.spawn(data);
    ant.join(anthill);

// ajoute le canvas
    var ctx =  createCanvas(w,h);
    addGlobal('ctx', ctx);

// ajoute un bouton start/stop
    createButton('btn_stop', 'Stop', function() { 
        if ( anthill.alive ) this.innerText = 'Start';
        else this.innerText = 'Stop';
        anthill.alive = (!!anthill.alive) ? false : true;
    });

// ajoute un compteur d'itération
    var lbl = createLabel('iteration',0);
    addGlobal('lbl_iteration_count', lbl);

// ajoute un slider pour les fps
    createLabel('lbl_fps','fps:');
    createSlider('fps', 0, 30, app.fps, 1, function() {
        app.fps = (this.value == 0) ? 0.5 : this.value;
        clearInterval(app["draw_interval"]);
        app["draw_interval"] = setInterval(app.draw, 1000/app.fps);
    });

// ajoute un slider d'itération
    createLabel('lbl_nb_iter','nb iter:');
    createSlider('nb_iter', 0, 10, nb_iter, 1, function() {
        nb_iter = this.value
    });

};

function draw() {
    fillColor('white');
    ctx.fillRect(0,0,w,h);

    anthill.fast_forward(nb_iter);
    lbl_iteration_count.innerText = 'iteration '+anthill.age +' ';

    for (var y,x = 0; x < anthill.world.length; x++) 
        for(y = 0; y < anthill.world[x].length; y++) {
            if (anthill.world[x][y]) fillColor('white');
            else fillColor('black');

            ctx.fillRect(x*scale, h-scale-(y*scale), scale-1, scale-1);
        }

    fillColor('red');
    ctx.fillRect((ant.x*scale)+1, (h-scale)-(ant.y*scale)+1, Math.floor(scale*0.5), Math.floor(scale*0.5)); 
};
/**************************************/