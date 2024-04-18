package com.raduisi.fullstack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Date;
import java.sql.Time;

@Entity
public class Calatorii {
    @Id
    @GeneratedValue
    private long id;
    private Date data_plecare;
    private Time ora_plecare;
    private Date data_sosire;
    private Time ora_sosire;
    private String loc_plecare;
    private String loc_sosire;
    private long id_transport;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getData_plecare() {
        return data_plecare;
    }

    public void setData_plecare(Date data_plecare) {
        this.data_plecare = data_plecare;
    }

    public Time getOra_plecare() {
        return ora_plecare;
    }

    public void setOra_plecare(Time ora_plecare) {
        this.ora_plecare = ora_plecare;
    }

    public Date getData_sosire() {
        return data_sosire;
    }

    public void setData_sosire(Date data_sosire) {
        this.data_sosire = data_sosire;
    }

    public Time getOra_sosire() {
        return ora_sosire;
    }

    public void setOra_sosire(Time ora_sosire) {
        this.ora_sosire = ora_sosire;
    }

    public String getLoc_plecare() {
        return loc_plecare;
    }

    public void setLoc_plecare(String loc_plecare) {
        this.loc_plecare = loc_plecare;
    }

    public String getLoc_sosire() {
        return loc_sosire;
    }

    public void setLoc_sosire(String loc_sosire) {
        this.loc_sosire = loc_sosire;
    }

    public long getId_transport() {
        return id_transport;
    }

    public void setId_transport(long id_transport) {
        this.id_transport = id_transport;
    }
}
