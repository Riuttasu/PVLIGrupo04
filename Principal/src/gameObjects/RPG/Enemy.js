export default class Enemy {
    constructor(enemyData) {
        this.id = enemyData.id;
        this.name = enemyData.name;
        this.type = enemyData.type;
        this.maxHp = enemyData.maxHp;
        this.currentHp = 0;
        this.color = enemyData.color;
        this.sprite = enemyData.sprite || 'GithubBackground';
        this.freeze = 0;
        this.critMul = 2;
    }

    takeDamage(damage, type) {
        if (type !== this.type) {
            //Si la skill es programacion
            if (type === 'Programming') {
                //Si el enemigo es de diseño, la skill hace la mitad de daño
                if (this.type === 'Design') {
                    damage = damage / this.critMul;
                }
                //Si el enemigo es de gestion, la skill hace el doble de daño
                else {
                    damage = damage * this.critMul;
                }
            }
            else if (type === 'Design') {
                //Si el enemigo es de gestion, la skill hace la mitad de daño
                if (this.type === 'Management') {
                    damage = damage / this.critMul;
                }
                //Si el enemigo es de programacion, la skill hace el doble de daño
                else {
                    damage = damage * this.critMul;
                }
            }
            else {
                //Si el enemigo es de programacion, la skill hace la mitad de daño
                if (this.type === 'Programming') {
                    damage = damage / this.critMul;
                }
                //Si el enemigo es de diseño, la skill hace el doble de daño
                else {
                    damage = damage * this.critMul;
                }
            }
        }
        
        this.currentHp = Math.min(this.maxHp, this.currentHp + damage);
    }

    isComplete() {
        return this.currentHp >= this.maxHp;
    }
}