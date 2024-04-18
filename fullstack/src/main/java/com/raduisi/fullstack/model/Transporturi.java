package com.raduisi.fullstack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Transporturi {
    @Id
    @GeneratedValue
    private long id;
    private String tip;
    private int locuri;
    private String specificatii;
    private long id_tren;
    private long id_angajat;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public int getLocuri() {
        return locuri;
    }

    public void setLocuri(int locuri) {
        this.locuri = locuri;
    }

    public String getSpecificatii() {
        return specificatii;
    }

    public void setSpecificatii(String specificatii) {
        this.specificatii = specificatii;
    }

    public long getId_tren() {
        return id_tren;
    }

    public void setId_tren(long id_tren) {
        this.id_tren = id_tren;
    }

    public long getId_angajat() {
        return id_angajat;
    }

    public void setId_angajat(long id_angajat) {
        this.id_angajat = id_angajat;
    }
}
