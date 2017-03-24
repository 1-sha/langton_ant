function AntHill(alive, rules, ants) {
    this.ants = (!!ants) ? ants : [];
    this.alive = alive;
    this.rules = rules;
    this.world;
    this.age = 0;
}

AntHill.prototype.spawn = function(world) {
    this.world = world;
};

AntHill.prototype.step = function() {
    //console.log('new step');
    for (var i = 0; i < this.ants.length; i++)
        this.ants[i].work();
    this.age++;
};

AntHill.prototype.fast_forward = function(nb_steps) {
    if (this.alive) 
        for (var i = 0; i < nb_steps; i++) {
            this.step();
        }
};