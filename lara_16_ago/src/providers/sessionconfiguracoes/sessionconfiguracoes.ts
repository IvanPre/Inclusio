import { Storage } from "@ionic/storage";

//pacote para transformar nossa classe em injetável
import { Injectable } from '@angular/core';

//import do nosso model configuracoes.ts
import { Configuracoes } from '../../app/models/model/configuracoes';

@Injectable()
export class SessionconfiguracoesProvider {

    constructor(public storage: Storage){

    }
    // setando uma seção e passando o tipo de usuário
    create(configuracoes: Configuracoes) {
        this.storage.set('configuracoes', configuracoes);
    }

    get(): Promise<any> {
        return this.storage.get('configuracoes');
    }

    // Quando deslogar deve remova do storage
    remove() {
        this.storage.remove('configuracoes');
    }

    exist() {
        this.get().then(res => {
            console.log('resultado >>> ', res);
            if(res) {
                console.log('resultado IF');
                return true;
            } else {
                console.log('resultado else');
                return false;
            }
        });
    }
}