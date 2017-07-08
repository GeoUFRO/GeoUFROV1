import Dexie from 'dexie';

export class LocationAppDB extends Dexie{
	//crear db
	locations : Dexie.Table<ILocation,number>;
	constructor(){
		super("FavsDB");

		this.version(1).stores({
			locations: '++id'
		});
		this.version(3).stores({
			locations: '++id, idL'
		});

		this.locations.mapToClass(Location);
	}

}

export interface ILocation{
	//el id es opcional (para no error al llamar)
	id?: number
	idL: string;
}

export class Location implements ILocation{
	idL: string;

	//metodo a ejecutar cuando se crea locacio
	constructor(idL: string){
		this.idL = idL;
	}

	save(){
		return db.locations.add(this);
	}

	static remove(id){
		db.locations.where("idL").equals(id).delete();

	}

	//devuelve todas las locaciones en favs
	static all(){
		// retorna promise
		return db.locations.orderBy("id").reverse().toArray();
	}
}


export let db = new LocationAppDB();