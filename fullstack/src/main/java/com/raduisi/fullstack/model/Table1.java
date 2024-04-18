package com.raduisi.fullstack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Table1 {
    @Id
    @GeneratedValue
    private long id;
    //AICI DECLARI TU ALTE COLOANE DIN TABEL SI TIPU DE DATA

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    // FACI RESTU DE GETTERI SI SETTERI
}
