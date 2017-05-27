import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ItemCotacao } from '../item-cotacao/item-cotacao';

@Component({
    selector: 'cotacao-list',
    templateUrl: 'cotacao.html'
})

export class Cotacao {
    icons: string[];
    items: Array<{ icon: string, nome: string, valor: number, fonte: string }>;

    constructor(public http: Http, public navCtrl: NavController) {
        this.items = [];
        console.log(this.getCotacoes());
    }


    itemTapped(event, item) {
        this.navCtrl.push(ItemCotacao, {
        item: item
        });
    }



    getCotacoes() {
        this.http.get('http://api.promasters.net.br/cotacao/v1/valores?alt=json')
            .map(res => res.json())
            .subscribe(data => {
                console.log(data);
                
                for (var key in data.valores) {
                let dado = data.valores[key];
                    this.items.push({
                        icon: this.getIcone(key),
                        nome: dado.nome,
                        valor: dado.valor,
                        fonte: dado.fonte
                    });
                }
            });
    }

    getIcone(key){
        let icone = '';
        if(key === 'BTC'){
            icone = 'logo-bitcoin';
        }else if(key === 'EUR'){
            icone = 'logo-euro';
        }else {
            icone = 'logo-usd';
        }
        return icone;
    }


}
