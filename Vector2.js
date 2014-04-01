var Vector2 = function(x,y){
    this.x = x;
    this.y = y;
}
Vector2.prototype.length = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};
Vector2.prototype.scale = function(scale){
    this.x = this.x * scale;
    this.y = this.y * scale;
    return this;
}
Vector2.prototype.add = function(vec){
    return new Vector2(this.x + vec.x, this.y + vec.y);
}
Vector2.prototype.sub = function(vec){
    return new Vector2(this.x - vec.x, this.y - vec.y);
}
Vector2.add = function(vec1, vec2) {
    return new Vector2(vec1.x+vec2.x, vec1.y + vec2.y);
};
Vector2.sub = function(vec1, vec2) {
    return new Vector2(vec1.x-vec2.x, vec1.y-vec2.y);
};