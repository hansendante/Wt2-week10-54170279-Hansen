import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: "root"
})
export class PokemonService {
    baseUrl = `https://pokeapi.co/api/v2`;

    constructor(private http: HttpClient){}

    getPokemons(idxstart=0){
        // kalo idxstart dioper, maka gunakan utk meload pokemon dari idx tsb
        if(idxstart){
            return this.http.get(`${this.baseUrl}/pokemon?offset=${idxstart}`);
        }
        //jika idxstart tdk dioper, artinya program baru dijalankan, load 20 pokemon pertama
        else{
            return this.http.get(`${this.baseUrl}/pokemon`)
        }
        
    }
    getPokemon(name: string){
        //dapatkan satu pokemon
        return this.http.get(`${this.baseUrl}/pokemon/${name}`);
    }   
}
