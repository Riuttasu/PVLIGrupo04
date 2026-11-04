export default class Skill {
    constructor(skillData) {
        this.id = skillData.id;
        this.name = skillData.name;
        this.type = skillData.type;
        this.damage = skillData.damage;
        this.targetType = skillData.targetType; // "single" o "all"
        this.description = skillData.description;
    }
}