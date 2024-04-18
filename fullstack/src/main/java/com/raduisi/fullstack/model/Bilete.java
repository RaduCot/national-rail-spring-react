package com.raduisi.fullstack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class Bilete {
    @Id
    @GeneratedValue
    private long id;
    private Date data_emitenta;
    private String clasa;
    private String vagon;
    private String loc;
    private float pret;
    private String tip_discount;
    private long id_calatorie;
    private long id_angajat;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getData_emitenta() {
        return data_emitenta;
    }

    public void setData_emitenta(Date data_emitenta) {
        this.data_emitenta = data_emitenta;
    }

    public String getClasa() {
        return clasa;
    }

    public void setClasa(String clasa) {
        this.clasa = clasa;
    }

    public String getVagon() {
        return vagon;
    }

    public void setVagon(String vagon) {
        this.vagon = vagon;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public float getPret() {
        return pret;
    }

    public void setPret(float pret) {
        this.pret = pret;
    }

    public String getTip_discount() {
        return tip_discount;
    }

    public void setTip_discount(String tip_discount) {
        this.tip_discount = tip_discount;
    }

    public long getId_calatorie() {
        return id_calatorie;
    }

    public void setId_calatorie(long id_calatorie) {
        this.id_calatorie = id_calatorie;
    }

    public long getId_angajat() {
        return id_angajat;
    }

    public void setId_angajat(long id_angajat) {
        this.id_angajat = id_angajat;
    }
}
