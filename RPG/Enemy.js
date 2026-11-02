export default class Enemy {
    constructor(enemyData) {
        this.id = enemyData.id;
        this.name = enemyData.name;
        this.type = enemyData.type;
        this.maxHp = enemyData.maxHp;
        this.currentHp = 0;
        this.color = enemyData.color;
    }

    takeDamage(a) {
        this.currentHp = Math.min(this.maxHp, this.currentHp + a);
    }

    isComplete() {
        return this.currentHp >= this.maxHp;
    }
}