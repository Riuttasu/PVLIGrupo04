export default class Enemy {
    constructor(enemyData) {
        this.id = enemyData.id;
        this.name = enemyData.name;
        this.type = enemyData.type;
        this.maxHp = enemyData.maxHp;
        this.currentHp = 0;
        this.color = enemyData.color;
    }

    takeDamage(a, type) {
        if (type !== this.type) {
            //Si la skill es programacion
            if (type === 'Programming') {
                //Si el enemigo es de diseño, la skill hace la mitad de daño
                if (this.type === 'Design') {
                    a = a / 2;
                }
                //Si el enemigo es de gestion, la skill hace el doble de daño
                else {
                    a = a * 2;
                }
            }
            else if (type === 'Design') {
                //Si el enemigo es de gestion, la skill hace la mitad de daño
                if (this.type === 'Management') {
                    a = a / 2;
                }
                //Si el enemigo es de programacion, la skill hace el doble de daño
                else {
                    a = a * 2;
                }
            }
            else {
                //Si el enemigo es de programacion, la skill hace la mitad de daño
                if (this.type === 'Programming') {
                    a = a / 2;
                }
                //Si el enemigo es de diseño, la skill hace el doble de daño
                else {
                    a = a * 2;
                }
            }
        }
        
        this.currentHp = Math.min(this.maxHp, this.currentHp + a);
    }

    isComplete() {
        return this.currentHp >= this.maxHp;
    }
}