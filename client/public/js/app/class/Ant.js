function Ant(x, y, type) {
    this.type = (!!type) ? type : 1;
    this.x = x;
    this.y = y;
    this.direction = 'up';
    this.hill = null;
};
 
Ant.prototype.work = function() { 
    if (!!this.hill) {
        if ((this.x < 0) || (this.x >= this.hill.world.length) ||
            (this.y < 0) || (this.y >= this.hill.world[0].length)) 
            return;

        var v = undefined;
        var old_x = this.x, old_y = this.y;

        for (var i = 0; i < this.hill.rules.length; i++) {
            if (this.hill.rules[i].t == this.hill.world[this.x][this.y])
                v = this.hill.rules[i].v;
        }
        v = (!!v) ? v : ((this.type) ? 'right' : 'left');

        switch(this.direction) {
            case 'up': 
                if (v == 'right') {
                    this.direction = 'right';
                    this.x++;
                } else {
                    this.direction = 'left';
                    this.x--;
                }
                break;
            case 'down': 
                if (v == 'right') {
                    this.direction = 'left';
                    this.x--;
                } else {
                    this.direction = 'right';
                    this.x++;
                }
                break;
            case 'left': 
                if (v == 'right') {
                    this.direction = 'up';
                    this.y++;
                } else {
                    this.direction = 'down';
                    this.y--;
                }
                break;
            case 'right': 
                if (v == 'right') {
                    this.direction = 'down';
                    this.y--;
                } else {
                    this.direction = 'up';
                    this.y++;
                }
                break;
            default:
                return;
        }

        this.hill.world[old_x][old_y] = (!!this.hill.world[old_x][old_y]) ? 0 : 1;
        //console.log(old_x+' '+old_y+' '+this.hill.world[old_x][old_y]);
    }
};

Ant.prototype.join = function(hill) {
    this.hill = hill;
    this.hill.ants.push(this);
};