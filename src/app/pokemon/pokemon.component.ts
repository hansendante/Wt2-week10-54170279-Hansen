import { Component, OnInit } from "@angular/core";

import { PokemonService } from "./pokemon.service";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "ns-items",
    templateUrl: "./pokemon.component.html",
})
export class PokemonComponent implements OnInit {
    // variable pokemons untuk menampung seluruh pokemon dari database secara berkala , namun tidak bisa autoupdate, gunakan observable untuk autoupdate
    pokemons = [];
    //variable pokemon$ bisa diobserve , artinya, setiap isinya berubah, maka akan tercermin ke htmlnya
    pokemons$: BehaviorSubject<Array<any>>;
    //counter utk load more pokemon
    idxstart = 0;
    constructor(private ps: PokemonService) {
        //ketika pertamma kali jjalan, kosongkan isinya
        this.pokemons$ = new BehaviorSubject([]);
    }

    ngOnInit(): void {
        this.ps.getPokemons().subscribe(
            (response) =>{
                //masukan seluruh pokemon yang baru didapat dalam variable pokemons
                this.pokemons.push( ... response.results);
                //update observable pokemons$
                this.pokemons$.next(this.pokemons);
            });
    }

    loadMore(){
        console.log("load more called");
        //tambahkan counter
        this.idxstart += 20;
        this.ps.getPokemons(this.idxstart).subscribe(
            (response) =>{
                //masukan seluruh pokemon yang baru didapat dalam variable pokemons
                this.pokemons.push( ... response.results);
                //update observable pokemons$
                this.pokemons$.next(this.pokemons);
            });
    }
}
