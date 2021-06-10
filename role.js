
class Role {
	constructor(name,attack,defense,rbImmune,decImmune,controlImmune,unique,ability,uses,faction,type,description) {
		//attack and defense are numbers from 0 to 3 (0 - None, 3 - Unstoppabble / Invincinble)
		//immunities and uniqueness are booleans.
		//factions: town, mafia, coven, neutral
		//type: 
		//Town: Investigative, Killing, Protective, Support
		//Mafia: Deception, Killing, Support
		//Neutral: Benign, Evil, Killing, Chaos
		//Coven: Evil
		this.name = name;
		this.baseattack = attack;
		this.basedefense = defense;
		this.attack = this.baseattack;
		this.defense = this.basedefense;
		this.rbImmune = rbImmune;
		this.decImmune = decImmune;
		this.controlImmune = controlImmune;
		this.unique = unique;
		this.ability = ability;
		this.uses = uses;
		this.faction = faction;
		this.type = type;
		this.description = description;
	}
	ability() {
		return this.ability
	}
	help() {
		var message = `Role: ${this.name}\nFaction: ${this.faction}  Type: ${this.type}\n`
		message += `Attack: ${this.convert(this.attack,"attack")}, Defense: ${this.convert(this.defense,"defense")}`
		message += `\n\nAbout: ${this.description}`
		console.log(message)
	}
	convert(stat,type) {
		//attack stat or defense stat
		switch(stat) {
			case 0:
				return "None"
			case 1:
				return "Basic"
			case 2:
				return "Powerful"
			case 3:
				if (type == "attack") {
					return "Unstoppable"
				}
				else if (type == "defense") {
					return "Invincinble"
				}
		}
	}
}
module.exports = Role;